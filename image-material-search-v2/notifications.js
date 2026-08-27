(() => {
  const storageKey = 'materialDownloadNotifications';
  const taskStorageKey = 'materialDownloadTasks';
  const databaseName = 'zhaocai-material-downloads';
  const trigger = document.querySelector('#notificationTrigger');
  const badge = document.querySelector('#notificationBadge');
  const panel = document.querySelector('#notificationPanel');
  const list = document.querySelector('#notificationList');
  const demoState = document.querySelector('#notificationDemoState');
  const clearReadButton = document.querySelector('#clearReadNotifications');
  if (!trigger || !badge || !panel || !list) return;

  let scrollGuardUntil = 0;
  let lastPointer = null;
  let autoCloseTimer = null;
  let autoCloseArmed = false;
  const demoReadIds = new Set();
  const demoClearedIds = new Set();

  function readNotifications() {
    try { return JSON.parse(localStorage.getItem(storageKey)) || []; }
    catch { return []; }
  }

  function writeNotifications(notifications) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(notifications));
      window.dispatchEvent(new CustomEvent('notifications-updated'));
    } catch {}
  }

  function sampleNotification(overrides) {
    return {
      id: `demo-${overrides.type || 'download'}-${overrides.status || 'message'}`,
      type: 'download',
      createdAt: new Date().toISOString(),
      unread: true,
      demo: true,
      ...overrides
    };
  }

  function mixedSamples() {
    const now = Date.now();
    return [
      sampleNotification({
        id:'demo-business-approved', type:'business', messageId:'business-approved', tab:'business',
        title:'物料报备申请审核通过',
        description:'您提交的在福华三路项目（测试）的产品报备申请已经审核通过，相关物料已经进入项目资料。项目负责人可继续补充物料参数、报价与使用位置，并在项目协作页面查看后续审核安排。',
        createdAt:new Date(now - 65000).toISOString()
      }),
      sampleNotification({
        id:'demo-download-ready', type:'download', taskId:'demo-task-ready', status:'ready', fileName:'物料清单_演示.xlsx',
        createdAt:new Date(now - 8 * 60000).toISOString()
      }),
      sampleNotification({
        id:'demo-system-maintenance', type:'system', messageId:'system-maintenance', tab:'system',
        title:'系统维护通知', description:'平台将于今晚23:00进行例行维护。', createdAt:new Date(now - 36 * 60000).toISOString()
      }),
      sampleNotification({
        id:'demo-download-failed', type:'download', taskId:'demo-task-failed', status:'failed', fileName:'物料清单_失败演示.xlsx',
        createdAt:new Date(now - 2 * 3600000).toISOString()
      }),
      sampleNotification({
        id:'demo-business-board', type:'business', messageId:'business-board', tab:'business',
        title:'物料板审核通过', description:'您提交的物料板已经审核通过。', createdAt:new Date(now - 20 * 3600000).toISOString(), unread:false
      }),
      sampleNotification({
        id:'demo-system-policy', type:'system', messageId:'system-policy', tab:'system',
        title:'平台规则更新', description:'兆材云库服务规则已更新，请查看本次调整的具体内容及生效时间。', createdAt:new Date(now - 26 * 3600000).toISOString(), unread:false
      })
    ];
  }

  function currentDemoState() {
    return demoState?.value || 'actual';
  }

  function visibleNotifications() {
    const state = currentDemoState();
    if (state === 'empty') return [];
    const applyDemoState = items => items
      .filter(item => !demoClearedIds.has(item.id))
      .map(item => demoReadIds.has(item.id) ? { ...item, unread:false } : item);
    if (state === 'generating') return applyDemoState([sampleNotification({ id:'demo-download-generating', taskId:'demo-task-generating', status:'generating', fileName:'物料清单_生成中.xlsx', unread:false })]);
    if (state === 'mixed') return applyDemoState(mixedSamples());
    if (state === 'success') return applyDemoState([sampleNotification({ id:'demo-download-ready', taskId:'demo-task-ready', status:'ready', fileName:'物料清单_演示.xlsx', unread:true })]);
    if (state === 'failed') return applyDemoState([sampleNotification({ id:'demo-download-failed', taskId:'demo-task-failed', status:'failed', fileName:'物料清单_失败演示.xlsx', unread:true })]);
    if (state === 'read') return applyDemoState(mixedSamples().map(item => ({ ...item, unread:false })));
    return readNotifications().slice().sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));
  }

  function normalizedNotification(notification) {
    if (notification.type === 'business' || notification.type === 'system') return notification;
    const generating = notification.status === 'generating';
    const failed = notification.status === 'failed';
    return {
      ...notification,
      type:'download',
      title:generating ? '物料清单生成中' : failed ? '物料清单生成失败' : '物料清单已生成',
      description:generating
        ? '您可以继续操作，生成完成后将在这里通知您。'
        : failed
          ? '可前往下载中心重新生成。'
          : '请前往下载中心下载，下载链接有效期为一年。',
      actionType:generating ? 'progress' : 'download-center',
      actionLabel:generating ? '查看生成进度' : '前往下载中心'
    };
  }

  function formatTime(value) {
    const time = new Date(value).getTime();
    const elapsed = Date.now() - time;
    if (Number.isFinite(time) && elapsed < 60000) return '刚刚';
    if (elapsed < 3600000) return `${Math.max(1, Math.floor(elapsed / 60000))}分钟前`;
    if (elapsed < 86400000) return `${Math.max(1, Math.floor(elapsed / 3600000))}小时前`;
    if (elapsed < 172800000) return `昨天 ${new Intl.DateTimeFormat('zh-CN', { hour:'2-digit', minute:'2-digit', hour12:false }).format(new Date(value))}`;
    return new Intl.DateTimeFormat('zh-CN', { month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hour12:false }).format(new Date(value));
  }

  function updateBadge(notifications) {
    const unreadCount = notifications.filter(item => item.unread).length;
    badge.hidden = unreadCount === 0;
    badge.textContent = unreadCount > 99 ? '99+' : String(unreadCount);
    trigger.setAttribute('aria-label', unreadCount ? `通知，${unreadCount} 条未读` : '通知，无未读消息');
  }

  function messageActionNeeded(item, body) {
    if (!['business','system'].includes(item.type)) return false;
    return body.scrollHeight > body.clientHeight + 1 || (item.description || '').length > 58;
  }

  function render() {
    const notifications = visibleNotifications().map(normalizedNotification);
    updateBadge(notifications);
    if (clearReadButton) {
      const clearableCount = notifications.filter(item => !item.unread && item.status !== 'generating').length;
      clearReadButton.disabled = clearableCount === 0;
      clearReadButton.setAttribute('aria-label', clearableCount ? `清除 ${clearableCount} 条已读通知` : '暂无已读通知可清除');
    }
    list.innerHTML = '';
    if (!notifications.length) {
      list.innerHTML = '<div class="notification-empty"><div><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5h14v9H9l-4 3v-12Z"/></svg><strong>暂无通知</strong><span>新的业务、系统或任务结果会显示在这里</span></div></div>';
      return;
    }
    notifications.forEach(notification => {
      const item = document.createElement('article');
      item.className = `notification-item notification-${notification.type}${notification.unread ? ' is-unread' : ''}${notification.status === 'generating' ? ' is-generating' : ''}`;
      item.dataset.notificationId = notification.id;
      item.dataset.notificationStatus = notification.status || '';
      item.tabIndex = 0;
      item.innerHTML = '<div class="notification-title-row"><strong></strong><i aria-label="未读"></i></div><button class="notification-clear" type="button" aria-label="清除此通知" title="清除此通知"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17"/></svg></button><p></p><div class="notification-meta"><time></time><button class="notification-action" type="button" hidden></button></div>';
      item.querySelector('.notification-clear').hidden = notification.status === 'generating';
      item.querySelector('strong').textContent = notification.title || '通知';
      const body = item.querySelector('p');
      body.textContent = notification.description || '';
      const time = item.querySelector('time');
      time.dateTime = notification.createdAt;
      time.textContent = formatTime(notification.createdAt);
      const action = item.querySelector('.notification-action');
      if (notification.actionType) {
        action.hidden = false;
        action.dataset.action = notification.actionType;
        action.textContent = notification.actionLabel;
      }
      list.appendChild(item);
      if (!notification.actionType && messageActionNeeded(notification, body)) {
        action.hidden = false;
        action.dataset.action = 'message';
        action.textContent = '查看完整消息';
      }
    });
  }

  function clearAutoClose() {
    clearTimeout(autoCloseTimer);
    autoCloseTimer = null;
  }

  function scheduleAutoClose() {
    clearAutoClose();
    autoCloseArmed = true;
    autoCloseTimer = setTimeout(() => {
      autoCloseArmed = false;
      setOpen(false);
    }, 6000);
  }

  function setOpen(open, { returnFocus = false, focusPanel = true } = {}) {
    panel.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
    if (!open) clearAutoClose();
    if (open && focusPanel) panel.focus({ preventScroll:true });
    else if (returnFocus) trigger.focus({ preventScroll:true });
  }

  function clearNotificationsByIds(ids) {
    if (!ids.length) return;
    if (currentDemoState() !== 'actual') {
      ids.forEach(id => demoClearedIds.add(id));
      render();
      return;
    }
    const notifications = readNotifications();
    const removed = notifications.filter(item => ids.includes(item.id));
    if (!removed.length) return;
    writeNotifications(notifications.filter(item => !ids.includes(item.id)));
    render();
  }

  function clearReadNotifications() {
    const ids = visibleNotifications()
      .filter(item => !item.unread && item.status !== 'generating')
      .map(item => item.id);
    clearNotificationsByIds(ids);
  }

  function markNotificationRead(id) {
    if (!id) return;
    if (currentDemoState() !== 'actual') {
      const item = list.querySelector(`[data-notification-id="${CSS.escape(id)}"]`);
      if (!item?.classList.contains('is-unread')) return;
      demoReadIds.add(id);
      item.classList.remove('is-unread');
      updateBadge(visibleNotifications());
      return;
    }
    const notifications = readNotifications();
    if (!notifications.some(item => item.id === id && item.unread)) return;
    writeNotifications(notifications.map(item => item.id === id ? { ...item, unread:false, readAt:new Date().toISOString() } : item));
    render();
  }

  function markNotificationReadByTask(taskId) {
    const match = readNotifications().find(item => item.taskId === taskId);
    if (match) markNotificationRead(match.id);
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(databaseName, 1);
      request.onupgradeneeded = () => request.result.createObjectStore('files');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
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

  async function demoFile() {
    if (!window.ExcelJS) return new Blob(['兆材云库物料清单演示'], { type:'text/plain;charset=utf-8' });
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('物料清单');
    sheet.addRow(['物料名称', '品牌', '分类']);
    sheet.addRow(['演示物料', '兆材云库', '家具']);
    const buffer = await workbook.xlsx.writeBuffer();
    return new Blob([buffer], { type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function downloadFromNotification(notification) {
    try {
      const blob = notification.demo ? await demoFile() : await readFile(notification.taskId);
      if (!blob) throw new Error('missing file');
      downloadBlob(blob, notification.fileName || '物料清单.xlsx');
      window.showToast?.('物料清单已开始下载');
    } catch {
      window.showToast?.('文件暂不可用，请前往下载中心重新生成');
    }
  }

  function retryTask(notification) {
    if (notification.demo) {
      window.showToast?.('已重新提交生成');
      return;
    }
    try {
      const tasks = JSON.parse(localStorage.getItem(taskStorageKey)) || [];
      localStorage.setItem(taskStorageKey, JSON.stringify(tasks.map(task => task.id === notification.taskId ? { ...task, status:'generating', createdAt:new Date().toISOString(), unread:false } : task)));
    } catch {}
    window.open(`download-center.html?retryTask=${encodeURIComponent(notification.taskId)}`, '_blank', 'noopener');
  }

  function openMessage(notification) {
    const tab = notification.tab || notification.type || 'business';
    const messageId = notification.messageId || notification.id;
    window.location.href = `message-center.html?tab=${encodeURIComponent(tab)}&messageId=${encodeURIComponent(messageId)}&from=notification&markRead=1`;
  }

  function enterUnreadItem(item) {
    if (Date.now() < scrollGuardUntil || !item.classList.contains('is-unread')) return;
    markNotificationRead(item.dataset.notificationId);
  }

  trigger.addEventListener('click', () => {
    autoCloseArmed = false;
    clearAutoClose();
    setOpen(panel.hidden);
  });
  demoState?.addEventListener('change', () => { demoReadIds.clear();demoClearedIds.clear();render(); });
  clearReadButton?.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    clearReadNotifications();
    setOpen(true, { focusPanel:false });
  });
  panel.addEventListener('pointerenter', () => { if (autoCloseArmed) clearAutoClose(); });
  panel.addEventListener('pointerleave', () => { if (autoCloseArmed) scheduleAutoClose(); });
  document.addEventListener('click', event => {
    if (!panel.hidden && !event.target.closest('.notification-anchor')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) setOpen(false, { returnFocus:true });
  });
  list.addEventListener('scroll', () => { scrollGuardUntil = Date.now() + 140; }, { passive:true });
  list.addEventListener('pointerover', event => {
    const item = event.target.closest('.notification-item');
    if (!item || item.contains(event.relatedTarget)) return;
    enterUnreadItem(item);
  });
  list.addEventListener('pointermove', event => {
    const item = event.target.closest('.notification-item');
    if (!item) return;
    const moved = !lastPointer || Math.abs(event.clientX - lastPointer.x) + Math.abs(event.clientY - lastPointer.y) > 2;
    lastPointer = { x:event.clientX, y:event.clientY };
    if (moved) enterUnreadItem(item);
  });
  list.addEventListener('click', async event => {
    const item = event.target.closest('.notification-item');
    if (!item) return;
    const id = item.dataset.notificationId;
    if (event.target.closest('.notification-clear')) {
      event.preventDefault();
      event.stopPropagation();
      clearNotificationsByIds([id]);
      setOpen(true, { focusPanel:false });
      return;
    }
    const notification = visibleNotifications().map(normalizedNotification).find(entry => entry.id === id);
    if (!notification) return;
    markNotificationRead(id);
    const action = event.target.closest('.notification-action');
    if (!action) return;
    if (['progress','download-center'].includes(action.dataset.action)) window.open('download-center.html', '_blank', 'noopener');
    if (action.dataset.action === 'message') openMessage(notification);
  });
  list.addEventListener('keydown', async event => {
    if (!['Enter',' '].includes(event.key) || event.target.closest('button')) return;
    const item = event.target.closest('.notification-item');
    if (!item) return;
    event.preventDefault();
    markNotificationRead(item.dataset.notificationId);
  });
  window.addEventListener('download-notifications-updated', render);
  window.addEventListener('notifications-updated', render);
  window.addEventListener('material-task-notification', event => {
    render();
    if (document.visibilityState !== 'visible') return;
    setOpen(true, { focusPanel:false });
    scheduleAutoClose();
  });
  window.addEventListener('storage', event => { if (event.key === storageKey) render(); });

  window.zhaocaiNotifications = { markRead:markNotificationRead, markReadByTask:markNotificationReadByTask, render, clearRead:clearReadNotifications };
  const requestedDemo = new URLSearchParams(location.search).get('notice');
  if (demoState && ['empty','generating','mixed','success','failed','read'].includes(requestedDemo)) demoState.value = requestedDemo;
  render();
})();
