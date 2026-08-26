(() => {
  const exportButton = document.querySelector('#exportButton');
  const exportButtonWrap = document.querySelector('#exportButtonWrap');
  const exportActionShell = document.querySelector('#exportActionShell');
  const exportHint = document.querySelector('#exportHint');
  const cancelExport = document.querySelector('#cancelExport');
  const exportStateDemo = document.querySelector('#exportStateDemo');
  const taskStorageKey = 'materialDownloadTasks';
  const notificationStorageKey = 'materialDownloadNotifications';
  const fileDatabaseName = 'zhaocai-material-downloads';
  let isExporting = false;
  let activeExport = null;
  let currentVersionTaskId = null;

  function readTasks() {
    try { return JSON.parse(localStorage.getItem(taskStorageKey)) || []; }
    catch { return []; }
  }

  function writeTasks(tasks) {
    try { localStorage.setItem(taskStorageKey, JSON.stringify(tasks.slice(0, 30))); }
    catch {}
  }

  function upsertDownloadNotification(task, status) {
    let notifications = [];
    try { notifications = JSON.parse(localStorage.getItem(notificationStorageKey)) || []; }
    catch {}
    const existing = notifications.find(item => item.taskId === task.id);
    const notification = {
      id: existing?.id || `download-notification-${task.id}`,
      type: 'download',
      taskId: task.id,
      fileName: task.fileName,
      status,
      createdAt: new Date().toISOString(),
      unread: true
    };
    try {
      localStorage.setItem(notificationStorageKey, JSON.stringify([notification, ...notifications.filter(item => item.taskId !== task.id)].slice(0, 100)));
      window.dispatchEvent(new Event('download-notifications-updated'));
    } catch {}
  }

  function updateTask(id, patch) {
    const tasks = readTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index >= 0) tasks[index] = { ...tasks[index], ...patch };
    else tasks.unshift({ id, ...patch });
    writeTasks(tasks);
    return tasks.find(task => task.id === id);
  }

  function latestReadyTask(signature = '') {
    return readTasks().find(task => task.status === 'ready' && (!signature || task.snapshotSignature === signature));
  }

  function currentVersionTask() {
    if (!currentVersionTaskId) return null;
    return readTasks().find(task => task.id === currentVersionTaskId && task.status === 'ready') || null;
  }

  function openFileDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(fileDatabaseName, 1);
      request.onupgradeneeded = () => request.result.createObjectStore('files');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function storeFile(id, blob) {
    const database = await openFileDatabase();
    await new Promise((resolve, reject) => {
      const transaction = database.transaction('files', 'readwrite');
      transaction.objectStore('files').put(blob, id);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
    });
    database.close();
  }

  async function readFile(id) {
    const database = await openFileDatabase();
    const blob = await new Promise((resolve, reject) => {
      const request = database.transaction('files').objectStore('files').get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
    database.close();
    return blob;
  }

  function snapshotSignature(sources) {
    return JSON.stringify(sources.map(source => ({
      name: source.name,
      materials: source.materials.map(item => `${item.id}:${item.group}`).sort()
    })));
  }

  function currentSnapshot() {
    const sources = exportSourcesSnapshot();
    return { sources, signature: snapshotSignature(sources) };
  }

  function demoStateActive() {
    return exportStateDemo && exportStateDemo.value !== 'auto';
  }

  function blockMaterialListMutation() {
    const generationLocked = isExporting || exportStateDemo?.value === 'generating';
    if (!generationLocked) return false;
    showToast('当前物料清单正在生成，如需修改，请先取消物料清单生成');
    return true;
  }

  function setExportHint(message) {
    const linkLabel = '下载中心';
    const linkIndex = message.indexOf(linkLabel);
    if (linkIndex < 0) {
      exportHint.textContent = message;
      return;
    }
    const link = document.createElement('a');
    link.href = 'download-center.html';
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = linkLabel;
    link.setAttribute('aria-label', '前往下载中心（新页面打开）');
    exportHint.replaceChildren(
      document.createTextNode(message.slice(0, linkIndex)),
      link,
      document.createTextNode(message.slice(linkIndex + linkLabel.length))
    );
  }

  function updateCancelControl(isGenerating) {
    cancelExport.hidden = !isGenerating;
    exportActionShell?.classList.toggle('is-generating', isGenerating);
  }

  function applyDemoState(total) {
    if (!demoStateActive()) return false;
    const demoState = exportStateDemo.value;
    const isEmpty = total === 0;
    const states = {
      empty: { label: '导出物料清单', hint: '请先选择至少一项物料，已生成的物料清单可在下载中心查看。', empty: true },
      initial: { label: '导出物料清单', hint: isEmpty ? '请先选择至少一项物料，已生成的物料清单可在下载中心查看。' : '将导出全部效果图及其对应的已选物料，已生成的物料清单可在下载中心查看。' },
      generating: { label: '正在生成物料清单…', hint: '您可以停留或离开此页面，后续可在下载中心查看生成进度。', loading: true },
      success: { label: '下载物料清单', hint: '物料清单已生成，可直接下载；生成记录可在下载中心查看。' },
      changed: { label: '导出物料清单', hint: '清单已更新，请重新导出物料清单；已生成的物料清单可在下载中心查看。' },
      failed: { label: '重新生成物料清单', hint: '物料清单生成失败，请稍后重试；生成记录可在下载中心查看。' }
    };
    const stateView = states[demoState] || states.initial;
    const emptyView = Boolean(stateView.empty || (demoState === 'initial' && isEmpty));
    exportButton.disabled = Boolean(stateView.loading || emptyView);
    exportButton.setAttribute('aria-busy', String(Boolean(stateView.loading)));
    exportButton.classList.toggle('is-loading', Boolean(stateView.loading));
    exportButton.querySelector('span').textContent = stateView.label;
    exportButtonWrap.classList.toggle('is-empty', emptyView);
    exportButtonWrap.title = emptyView ? '请先选择至少一项物料' : '';
    updateCancelControl(Boolean(stateView.loading));
    setExportHint(stateView.hint);
    return true;
  }

  function updateExportButton(total = totalSelected()) {
    if (!exportButton || !exportButtonWrap || !exportHint) return;
    if (exportStateDemo) exportStateDemo.disabled = isExporting;
    if (!isExporting && applyDemoState(total)) return;
    const isEmpty = total === 0;
    const snapshot = isEmpty ? null : currentSnapshot();
    const matchingTask = snapshot ? latestReadyTask(snapshot.signature) : null;
    if (matchingTask) currentVersionTaskId = matchingTask.id;
    const previousTask = currentVersionTask() || latestReadyTask();
    const hasChanges = Boolean(!isEmpty && previousTask && !matchingTask);
    exportButton.disabled = isExporting || isEmpty;
    exportButton.setAttribute('aria-busy', String(isExporting));
    exportButton.classList.toggle('is-loading', isExporting);
    exportButton.querySelector('span').textContent = isExporting
      ? '正在生成物料清单…'
      : matchingTask
        ? '下载物料清单'
        : hasChanges
          ? '导出物料清单'
          : '导出物料清单';
    exportButtonWrap.classList.toggle('is-empty', isEmpty && !isExporting);
    exportButtonWrap.title = isEmpty && !isExporting ? '请先选择至少一项物料' : '';
    updateCancelControl(isExporting);
    setExportHint(isExporting
      ? '您可以停留或离开此页面，后续可在下载中心查看生成进度。'
      : isEmpty
        ? '请先选择至少一项物料，已生成的物料清单可在下载中心查看。'
        : matchingTask
          ? '物料清单已生成，可直接下载；生成记录可在下载中心查看。'
          : hasChanges
            ? '清单已更新，请重新导出物料清单；已生成的物料清单可在下载中心查看。'
            : '将导出全部效果图及其对应的已选物料，已生成的物料清单可在下载中心查看。');
  }

  function exportSourcesSnapshot() {
    if (state.uploadIntent === 'materials') saveCurrentSource();
    const sources = state.imageSources.length
      ? state.imageSources
      : [{ name: state.imageName, url: state.imageUrl, objects: state.objects, selectedGroups: state.selectedGroups, groupMeta: state.groupMeta }];

    return sources.map((source, sourceIndex) => {
      const materials = [];
      source.selectedGroups.forEach((group, groupKey) => {
        const meta = source.groupMeta?.get(groupKey) || {
          label: source.objects?.find(object => object.id === groupKey)?.nameZh || '全图匹配',
          type: 'object'
        };
        group.forEach(item => materials.push({ group: meta.label, type: meta.type || 'object', ...item }));
      });
      return { name: source.name || `效果图 ${sourceIndex + 1}`, url: source.url, materials };
    });
  }

  async function imageUrlToJpegDataUrl(url) {
    if (!url) throw new Error('Missing effect image');
    const response = await fetch(url);
    if (!response.ok) throw new Error('Effect image could not be loaded');
    const bitmap = await createImageBitmap(await response.blob());
    const scale = Math.min(1, 960 / bitmap.width);
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();
    return { dataUrl: canvas.toDataURL('image/jpeg', .86), ratio: canvas.width / canvas.height };
  }

  function cellBorder() {
    const edge = { style: 'thin', color: { argb: 'FFE4E4DF' } };
    return { top: edge, left: edge, bottom: edge, right: edge };
  }

  function styleCell(cell, { bold = false, fill, color = 'FF333330' } = {}) {
    cell.font = { name: 'Microsoft YaHei', size: 10, bold, color: { argb: color } };
    cell.alignment = { vertical: 'middle', wrapText: true };
    cell.border = cellBorder();
    if (fill) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } };
  }

  async function buildMaterialsWorkbook(sources) {
    if (!window.ExcelJS) throw new Error('Excel generator unavailable');
    const workbook = new ExcelJS.Workbook();
    workbook.creator = '兆材云库';
    workbook.created = new Date();
    workbook.modified = new Date();

    const sheet = workbook.addWorksheet('物料清单', { views: [{ state: 'frozen', ySplit: 3, showGridLines: false }] });
    sheet.columns = [{ width: 18 }, { width: 18 }, { width: 23 }, { width: 30 }, { width: 19 }, { width: 18 }, { width: 18 }];
    sheet.mergeCells('A1:G2');
    Object.assign(sheet.getCell('A1'), {
      value: '兆材云库 · 物料清单',
      font: { name: 'Microsoft YaHei', size: 20, bold: true, color: { argb: 'FF1D1D1B' } },
      alignment: { vertical: 'middle' }
    });
    sheet.mergeCells('A3:G3');
    const itemCount = sources.reduce((sum, source) => sum + source.materials.length, 0);
    Object.assign(sheet.getCell('A3'), {
      value: `共 ${sources.length} 张效果图 · ${itemCount} 项已选物料 · 生成时间 ${new Intl.DateTimeFormat('zh-CN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())}`,
      font: { name: 'Microsoft YaHei', size: 10, color: { argb: 'FF777772' } },
      alignment: { vertical: 'middle' }
    });
    sheet.getRow(3).height = 24;

    let rowIndex = 5;
    for (let sourceIndex = 0; sourceIndex < sources.length; sourceIndex += 1) {
      const source = sources[sourceIndex];
      sheet.mergeCells(rowIndex, 1, rowIndex, 7);
      const sectionTitle = sheet.getCell(rowIndex, 1);
      sectionTitle.value = `效果图 ${sourceIndex + 1} · ${source.name}`;
      sectionTitle.font = { name: 'Microsoft YaHei', size: 12, bold: true, color: { argb: 'FF1D1D1B' } };
      sectionTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF4D300' } };
      sectionTitle.alignment = { vertical: 'middle' };
      sheet.getRow(rowIndex).height = 28;
      rowIndex += 1;

      sheet.mergeCells(rowIndex, 1, rowIndex, 2);
      const headers = ['效果图', '对应对象 / 区域', '物料名称', '品牌', '分类', '参考价格'];
      const headerCells = [sheet.getCell(rowIndex, 1), ...Array.from({ length: 5 }, (_, index) => sheet.getCell(rowIndex, index + 3))];
      headerCells.forEach((cell, index) => { cell.value = headers[index]; styleCell(cell, { bold: true, fill: 'FFF4F4F1', color: 'FF555550' }); });
      styleCell(sheet.getCell(rowIndex, 2), { bold: true, fill: 'FFF4F4F1', color: 'FF555550' });
      sheet.getRow(rowIndex).height = 24;

      const firstDataRow = rowIndex + 1;
      const dataRowCount = Math.max(6, source.materials.length);
      source.materials.forEach((item, itemIndex) => {
        const row = sheet.getRow(firstDataRow + itemIndex);
        row.height = 26;
        [item.group, item.name, item.brand, item.category || '—', item.price].forEach((value, columnIndex) => {
          const cell = row.getCell(columnIndex + 3);
          cell.value = value;
          styleCell(cell);
        });
      });
      if (!source.materials.length) {
        const emptyCell = sheet.getRow(firstDataRow).getCell(3);
        emptyCell.value = '该效果图暂无已选物料';
        styleCell(emptyCell, { color: 'FF888883' });
      }
      for (let offset = 0; offset < dataRowCount; offset += 1) {
        const row = sheet.getRow(firstDataRow + offset);
        if (!row.height) row.height = 26;
        styleCell(row.getCell(1));
        styleCell(row.getCell(2));
        if (offset >= source.materials.length) {
          for (let column = 3; column <= 7; column += 1) styleCell(row.getCell(column));
        }
      }

      try {
        const image = await imageUrlToJpegDataUrl(source.url);
        const imageId = workbook.addImage({ base64: image.dataUrl, extension: 'jpeg' });
        const availableWidth = 242;
        const availableHeight = dataRowCount * 26 * 96 / 72 - 12;
        const width = Math.min(availableWidth, availableHeight * image.ratio);
        sheet.addImage(imageId, {
          tl: { col: .12, row: firstDataRow - 1 + .18 },
          ext: { width, height: width / image.ratio },
          editAs: 'oneCell'
        });
      } catch {
        const imageFallback = sheet.getCell(firstDataRow, 1);
        imageFallback.value = '效果图未嵌入';
        imageFallback.font = { name: 'Microsoft YaHei', size: 9, color: { argb: 'FF888883' } };
        imageFallback.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      }
      rowIndex = firstDataRow + dataRowCount + 2;
    }

    sheet.pageSetup = {
      orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0, paperSize: 9,
      margins: { left: .3, right: .3, top: .5, bottom: .5, header: .2, footer: .2 }
    };
    return workbook.xlsx.writeBuffer();
  }

  function workbookBlob(buffer) {
    return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function taskFileName() {
    const parts = new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
    return `物料清单_${values.year}-${values.month}-${values.day}_${values.hour}${values.minute}.xlsx`;
  }

  async function downloadTask(task) {
    if (!task) return;
    try {
      const blob = await readFile(task.id);
      if (!blob) throw new Error('missing file');
      downloadBlob(blob, task.fileName);
      showToast('物料清单已开始下载');
      updateTask(task.id, { downloadedAt: new Date().toISOString(), unread: false });
    } catch {
      showToast('文件暂不可用，请重新生成物料清单');
    }
  }

  function waitForGeneration(token, duration = 1100) {
    return new Promise(resolve => {
      const timer = setTimeout(resolve, duration);
      token.cancelTimer = () => { clearTimeout(timer); resolve(); };
    });
  }

  async function exportMaterialsList() {
    if (demoStateActive()) {
      showToast('当前为演示状态，请通过下拉框切换状态');
      return;
    }
    if (isExporting || totalSelected() === 0) return;
    const existingSnapshot = currentSnapshot();
    const matchingTask = latestReadyTask(existingSnapshot.signature);
    if (matchingTask) {
      currentVersionTaskId = matchingTask.id;
      await downloadTask(matchingTask);
      return;
    }
    const token = { cancelled: false, cancelTimer: null };
    const itemCount = existingSnapshot.sources.reduce((sum, source) => sum + source.materials.length, 0);
    const task = {
      id: `material-list-${Date.now()}`,
      fileName: taskFileName(),
      source: '图找物料',
      itemCount,
      sourceCount: existingSnapshot.sources.length,
      createdAt: new Date().toISOString(),
      status: 'generating',
      snapshotSignature: existingSnapshot.signature,
      unread: false
    };
    updateTask(task.id, task);
    activeExport = { token, task };
    isExporting = true;
    updateExportButton();
    try {
      await waitForGeneration(token);
      if (token.cancelled) return;
      const buffer = await buildMaterialsWorkbook(existingSnapshot.sources);
      if (token.cancelled) return;
      const blob = workbookBlob(buffer);
      await storeFile(task.id, blob);
      updateTask(task.id, { status: 'ready', completedAt: new Date().toISOString(), unread: true });
      currentVersionTaskId = task.id;
      upsertDownloadNotification(task, 'ready');
      const latestSnapshot = totalSelected() ? currentSnapshot() : null;
      if (latestSnapshot?.signature === existingSnapshot.signature) {
        downloadBlob(blob, task.fileName);
        updateTask(task.id, { downloadedAt: new Date().toISOString(), unread: false });
      }
      showToast('物料清单已生成，可直接下载；生成记录可在下载中心查看。');
    } catch (error) {
      if (token.cancelled) return;
      console.error('Failed to export materials list', error);
      updateTask(task.id, { status: 'failed', error: '生成失败，请重新尝试' });
      upsertDownloadNotification(task, 'failed');
      showToast('物料清单生成失败，请稍后重试；生成记录可在下载中心查看。');
    } finally {
      if (activeExport?.token === token) {
        isExporting = false;
        activeExport = null;
        updateExportButton();
      }
    }
  }

  function cancelCurrentExport() {
    if (!activeExport && demoStateActive()) {
      exportStateDemo.value = 'initial';
      updateExportButton();
      showToast('已取消生成。');
      return;
    }
    if (!activeExport) return;
    const { token, task } = activeExport;
    token.cancelled = true;
    token.cancelTimer?.();
    updateTask(task.id, { status: 'cancelled', cancelledAt: new Date().toISOString(), unread: false });
    activeExport = null;
    isExporting = false;
    updateExportButton();
    showToast('已取消生成。');
  }

  window.updateExportButton = updateExportButton;
  window.blockMaterialListMutation = blockMaterialListMutation;
  exportButton?.addEventListener('click', exportMaterialsList);
  cancelExport?.addEventListener('click', cancelCurrentExport);
  exportStateDemo?.addEventListener('change', () => updateExportButton());
  updateExportButton();
})();
