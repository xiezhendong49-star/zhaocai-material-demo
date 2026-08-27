(() => {
  const storageKey = 'materialDownloadTasks';
  const notificationStorageKey = 'materialDownloadNotifications';
  const databaseName = 'zhaocai-material-downloads';
  const list = document.querySelector('#downloadList');
  const tabs = document.querySelector('#downloadTabs');
  const toast = document.querySelector('#downloadToast');
  const deleteConfirmBackdrop = document.querySelector('#deleteConfirmBackdrop');
  const deleteConfirmDialog = document.querySelector('#deleteConfirmDialog');
  const deleteConfirmDescription = document.querySelector('#deleteConfirmDescription');
  const deleteConfirmCancel = document.querySelector('#deleteConfirmCancel');
  const deleteConfirmSubmit = document.querySelector('#deleteConfirmSubmit');
  const downloadDemoState = document.querySelector('#downloadDemoState');
  let activeStatus = 'all';
  let demoMode = downloadDemoState?.value || 'actual';
  let demoInteractiveStatus = demoMode;
  let toastTimer;
  let pendingDeleteTask = null;
  let deleteTrigger = null;

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function readTasks() {
    try { return JSON.parse(localStorage.getItem(storageKey)) || []; }
    catch { return []; }
  }

  function writeTasks(tasks) {
    localStorage.setItem(storageKey, JSON.stringify(tasks.slice(0, 30)));
  }

  function markDownloadNotificationRead(taskId) {
    try {
      const notifications = JSON.parse(localStorage.getItem(notificationStorageKey)) || [];
      const next = notifications.map(item => item.taskId === taskId ? { ...item, unread:false, readAt:new Date().toISOString() } : item);
      localStorage.setItem(notificationStorageKey, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('notifications-updated'));
    } catch {}
  }

  function upsertDownloadNotification(task, status) {
    try {
      const notifications = JSON.parse(localStorage.getItem(notificationStorageKey)) || [];
      const existing = notifications.find(item => item.taskId === task.id);
      const notification = {
        id: existing?.id || `download-notification-${task.id}`,
        type: 'download',
        taskId: task.id,
        fileName: task.fileName,
        status,
        createdAt: new Date().toISOString(),
        unread: status === 'ready' || status === 'failed'
      };
      localStorage.setItem(notificationStorageKey, JSON.stringify([notification, ...notifications.filter(item => item.taskId !== task.id)]));
      window.dispatchEvent(new CustomEvent('download-notifications-updated'));
      window.dispatchEvent(new CustomEvent('material-task-notification', { detail:{ taskId:task.id, status } }));
    } catch {}
  }

  function removeDownloadNotification(taskId) {
    try {
      const notifications = JSON.parse(localStorage.getItem(notificationStorageKey)) || [];
      localStorage.setItem(notificationStorageKey, JSON.stringify(notifications.filter(item => item.taskId !== taskId)));
      window.dispatchEvent(new CustomEvent('notifications-updated'));
    } catch {}
  }

  function seedTasks() {
    if (readTasks().length || demoMode !== 'actual') return;
    const now = Date.now();
    writeTasks([
      { id:'demo-generating', fileName:'客厅软装物料清单.xlsx', source:'图找物料', itemCount:12, sourceCount:1, createdAt:new Date(now-45000).toISOString(), status:'generating', unread:false },
      { id:'demo-ready', fileName:'石材物料清单.xlsx', source:'图找物料', itemCount:8, sourceCount:1, createdAt:new Date(now-3600000).toISOString(), completedAt:new Date(now-3540000).toISOString(), expiresAt:oneYearLater(new Date(now-3540000)).toISOString(), status:'ready', unread:false },
      { id:'demo-failed', fileName:'灯具物料清单.xlsx', source:'图找物料', itemCount:6, sourceCount:1, createdAt:new Date(now-86400000).toISOString(), status:'failed', unread:false }
    ]);
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(databaseName, 1);
      request.onupgradeneeded = () => request.result.createObjectStore('files');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function storeFile(id, blob) {
    const database = await openDatabase();
    await new Promise((resolve, reject) => {
      const transaction = database.transaction('files', 'readwrite');
      transaction.objectStore('files').put(blob, id);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
    });
    database.close();
  }

  async function readFile(id) {
    const database = await openDatabase();
    const blob = await new Promise((resolve, reject) => {
      const request = database.transaction('files').objectStore('files').get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
    database.close();
    return blob;
  }

  async function deleteFile(id) {
    const database = await openDatabase();
    await new Promise((resolve, reject) => {
      const transaction = database.transaction('files', 'readwrite');
      transaction.objectStore('files').delete(id);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
    });
    database.close();
  }

  async function demoWorkbook(task) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('物料清单');
    sheet.columns = [{ width: 24 }, { width: 18 }, { width: 18 }, { width: 16 }];
    sheet.addRow(['物料名称', '品牌', '分类', '参考价格']);
    sheet.addRow(['演示物料', '兆材云库', '家具', '待询价']);
    sheet.addRow([`共 ${task.itemCount} 项物料`, '', '', '']);
    const buffer = await workbook.xlsx.writeBuffer();
    return new Blob([buffer], { type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  function formatTime(value) {
    return new Intl.DateTimeFormat('zh-CN', { month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hour12:false }).format(new Date(value));
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat('zh-CN', { year:'numeric', month:'2-digit', day:'2-digit' }).format(new Date(value));
  }

  function oneYearLater(value) {
    const date = new Date(value);
    date.setFullYear(date.getFullYear() + 1);
    return date;
  }

  function taskExpiresAt(task) {
    return task.expiresAt || oneYearLater(task.completedAt || task.createdAt).toISOString();
  }

  function effectiveTask(task) {
    if (task.status !== 'ready') return task;
    const expiresAt = taskExpiresAt(task);
    return { ...task, expiresAt, status:new Date(expiresAt).getTime() <= Date.now() ? 'expired' : 'ready' };
  }

  function statusCopy(status) {
    return { generating:'生成中', ready:'可下载', expired:'已失效', failed:'生成失败', cancelled:'已取消' }[status] || status;
  }

  function updateTask(id, patch) {
    const tasks = readTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index < 0) return;
    tasks[index] = { ...tasks[index], ...patch };
    writeTasks(tasks);
    render();
    return tasks[index];
  }

  function renderCounts(tasks) {
    const counts = { all:tasks.length, generating:0, ready:0, expired:0, failed:0 };
    tasks.forEach(task => { if (counts[task.status] !== undefined) counts[task.status] += 1; });
    tabs.querySelectorAll('button').forEach(button => button.querySelector('span').textContent = counts[button.dataset.status]);
  }

  function demoTasks() {
    if (demoMode === 'actual') return readTasks().map(effectiveTask);
    if (demoMode === 'empty') return [];
    const now = Date.now();
    const isExpiredDemo = demoInteractiveStatus === 'expired';
    const completedAt = new Date(now - (isExpiredDemo ? 366 * 86400000 : 45000)).toISOString();
    return [{
      id:'demo-download-center-task',
      fileName:'客厅软装物料清单.xlsx',
      source:'图找物料',
      itemCount:12,
      sourceCount:1,
      createdAt:new Date(now - (isExpiredDemo ? 367 * 86400000 : 45000)).toISOString(),
      completedAt,
      expiresAt:isExpiredDemo ? new Date(now - 86400000).toISOString() : oneYearLater(completedAt).toISOString(),
      status:demoInteractiveStatus,
      demo:true
    }];
  }

  function render() {
    const tasks = demoTasks();
    renderCounts(tasks);
    const visible = (activeStatus === 'all' ? tasks : tasks.filter(task => task.status === activeStatus))
      .slice()
      .sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime());
    list.innerHTML = '';
    if (!visible.length) {
      const allEmpty = activeStatus === 'all';
      const copy = allEmpty ? '暂无下载任务' : '暂无相关任务';
      const description = allEmpty ? '您创建的导出或下载任务会显示在这里' : '当前筛选条件下没有相关下载任务';
      list.innerHTML = `<div class="download-empty"><div><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 7h20l8 8v26H10zM30 7v9h8M24 20v13M18 27l6 6 6-6"/></svg><strong>${copy}</strong><span>${description}</span>${allEmpty ? '' : '<button type="button" data-empty-reset>查看全部</button>'}</div></div>`;
      return;
    }
    visible.forEach(task => {
      const row = document.createElement('article');
      row.className = 'download-row';
      row.dataset.taskId = task.id;
      row.innerHTML = `<div class="file-cell"><span class="file-type">XLSX</span><div class="file-copy"><strong></strong><span></span><small hidden></small></div></div><time class="time-cell"></time><span class="status-cell"><i></i><b></b></span><div class="row-actions"></div>`;
      row.querySelector('.file-copy strong').textContent = task.fileName;
      row.querySelector('.file-copy span').textContent = `${task.source || '图找物料'} · ${task.itemCount || 0} 件物料${task.sourceCount > 1 ? ` · ${task.sourceCount} 张效果图` : ''}`;
      const expiry = row.querySelector('.file-copy small');
      if (task.status === 'ready' || task.status === 'expired') {
        expiry.hidden = false;
        expiry.textContent = task.status === 'expired' ? `下载链接已于 ${formatDate(task.expiresAt)} 失效` : `有效期至 ${formatDate(task.expiresAt)}`;
        expiry.classList.toggle('is-expired', task.status === 'expired');
      }
      row.querySelector('time').dateTime = task.createdAt;
      row.querySelector('time').textContent = formatTime(task.createdAt);
      const status = row.querySelector('.status-cell');
      status.classList.add(`status-${task.status}`);
      status.querySelector('b').textContent = statusCopy(task.status);
      const actions = row.querySelector('.row-actions');
      if (task.status === 'ready') actions.innerHTML = '<button class="primary-action" type="button" data-action="download">下载</button><button class="delete-action" type="button" data-action="delete">删除</button>';
      else if (task.status === 'generating') actions.innerHTML = '<button class="outline-action" type="button" data-action="cancel">取消生成</button>';
      else actions.innerHTML = '<button class="outline-action" type="button" data-action="retry">重新生成</button><button class="delete-action" type="button" data-action="delete">删除</button>';
      list.appendChild(row);
    });
  }

  async function downloadTask(task) {
    if (effectiveTask(task).status === 'expired') {
      showToast('下载链接已失效，请重新生成');
      render();
      return;
    }
    let blob = await readFile(task.id);
    if (!blob) { blob = await demoWorkbook(task); await storeFile(task.id, blob); }
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = task.fileName; document.body.appendChild(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    updateTask(task.id, { downloadedAt:new Date().toISOString(), unread:false });
    showToast('物料清单已开始下载');
  }

  async function finishTask(id) {
    const task = readTasks().find(item => item.id === id);
    if (!task || task.status !== 'generating') return;
    const blob = await demoWorkbook(task);
    await storeFile(id, blob);
    const completedAt = new Date();
    updateTask(id, { status:'ready', completedAt:completedAt.toISOString(), expiresAt:oneYearLater(completedAt).toISOString(), unread:true });
    upsertDownloadNotification(task, 'ready');
  }

  function scheduleGeneratingTasks() {
    readTasks().filter(task => task.status === 'generating').forEach((task, index) => setTimeout(() => finishTask(task.id), 1800 + index * 400));
  }

  function openDeleteConfirm(task, trigger) {
    pendingDeleteTask = task;
    deleteTrigger = trigger;
    deleteConfirmDescription.textContent = '删除后，该物料清单将无法再次下载。';
    deleteConfirmBackdrop.hidden = false;
    deleteConfirmDialog.hidden = false;
    deleteConfirmDialog.inert = false;
    deleteConfirmCancel.focus();
  }

  function closeDeleteConfirm({ restoreFocus = true } = {}) {
    deleteConfirmBackdrop.hidden = true;
    deleteConfirmDialog.hidden = true;
    deleteConfirmDialog.inert = true;
    const trigger = deleteTrigger;
    pendingDeleteTask = null;
    deleteTrigger = null;
    if (restoreFocus && trigger?.isConnected) trigger.focus();
  }

  tabs.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    activeStatus = button.dataset.status;
    tabs.querySelectorAll('button').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    render();
  });

  list.addEventListener('click', async event => {
    const emptyReset = event.target.closest('[data-empty-reset]');
    if (emptyReset) {
      activeStatus = 'all';
      tabs.querySelectorAll('button').forEach(item => { const active = item.dataset.status === 'all'; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
      render();
      return;
    }
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const id = button.closest('.download-row').dataset.taskId;
    const task = demoMode === 'actual' ? readTasks().find(item => item.id === id) : demoTasks().find(item => item.id === id);
    if (!task) return;
    if (task.demo) {
      if (button.dataset.action === 'download') { await downloadTask(task); return; }
      if (button.dataset.action === 'cancel') { demoInteractiveStatus = 'cancelled'; render(); showToast('已取消生成'); return; }
      if (button.dataset.action === 'retry') { demoInteractiveStatus = 'generating'; render(); showToast('已重新提交生成'); setTimeout(() => { if (demoMode !== 'actual' && demoInteractiveStatus === 'generating') { demoInteractiveStatus = 'ready'; render(); } }, 1800); return; }
      if (button.dataset.action === 'delete') { demoMode = 'empty'; downloadDemoState.value = 'empty'; render(); showToast('已删除下载记录'); return; }
    }
    if (button.dataset.action === 'download') { markDownloadNotificationRead(id); await downloadTask(task); }
    if (button.dataset.action === 'cancel') { updateTask(id, { status:'cancelled', cancelledAt:new Date().toISOString(), unread:false }); removeDownloadNotification(id); showToast('已取消生成'); }
    if (button.dataset.action === 'retry') {
      markDownloadNotificationRead(id);
      const retriedTask = updateTask(id, { status:'generating', createdAt:new Date().toISOString(), completedAt:null, expiresAt:null, unread:false });
      upsertDownloadNotification(retriedTask, 'generating');
      setTimeout(() => finishTask(id), 1800);
      showToast('已重新提交生成');
    }
    if (button.dataset.action === 'delete') openDeleteConfirm(task, button);
  });

  deleteConfirmCancel.addEventListener('click', () => closeDeleteConfirm());
  deleteConfirmBackdrop.addEventListener('click', () => closeDeleteConfirm());
  deleteConfirmSubmit.addEventListener('click', async () => {
    if (!pendingDeleteTask) return;
    const taskId = pendingDeleteTask.id;
    writeTasks(readTasks().filter(item => item.id !== taskId));
    removeDownloadNotification(taskId);
    await deleteFile(taskId);
    closeDeleteConfirm({ restoreFocus:false });
    render();
    showToast('已删除下载记录');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !deleteConfirmDialog.hidden) closeDeleteConfirm();
  });

  downloadDemoState?.addEventListener('change', () => {
    demoMode = downloadDemoState.value;
    demoInteractiveStatus = demoMode;
    activeStatus = 'all';
    tabs.querySelectorAll('button').forEach(item => { const active = item.dataset.status === 'all'; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    const url = new URL(location.href);
    if (demoMode === 'actual') url.searchParams.delete('demo');
    else url.searchParams.set('demo', demoMode);
    history.replaceState(null, '', url);
    render();
  });

  const requestedDemoState = new URLSearchParams(location.search).get('demo');
  if (downloadDemoState && ['generating','ready','expired','failed','empty'].includes(requestedDemoState)) {
    downloadDemoState.value = requestedDemoState;
    demoMode = requestedDemoState;
    demoInteractiveStatus = requestedDemoState;
  }
  seedTasks();
  const initialTasks = readTasks();
  document.querySelector('#downloadNavDot').hidden = !initialTasks.some(task => task.unread);
  render();
  scheduleGeneratingTasks();
})();
