(() => {
  const exportButton = document.querySelector('#exportButton');
  const exportButtonWrap = document.querySelector('#exportButtonWrap');
  const exportHint = document.querySelector('#exportHint');
  let isExporting = false;

  function updateExportButton(total = totalSelected()) {
    if (!exportButton || !exportButtonWrap || !exportHint) return;
    const isEmpty = total === 0;
    exportButton.disabled = isExporting || isEmpty;
    exportButton.setAttribute('aria-busy', String(isExporting));
    exportButton.classList.toggle('is-loading', isExporting);
    exportButton.querySelector('span').textContent = isExporting ? '正在生成物料清单…' : '导出物料清单';
    exportButtonWrap.classList.toggle('is-empty', isEmpty && !isExporting);
    exportButtonWrap.title = isEmpty && !isExporting ? '请先选择至少一项物料' : '';
    exportHint.textContent = isExporting
      ? '正在整理效果图与已选物料'
      : isEmpty
        ? '请先选择至少一项物料'
        : '将导出全部效果图及其对应的已选物料';
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
      rowIndex = firstDataRow + dataRowCount + 2;
    }

    sheet.pageSetup = {
      orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0, paperSize: 9,
      margins: { left: .3, right: .3, top: .5, bottom: .5, header: .2, footer: .2 }
    };
    return workbook.xlsx.writeBuffer();
  }

  function downloadWorkbook(buffer) {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).replaceAll('/', '-');
    link.href = url;
    link.download = `物料清单_${date}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function exportMaterialsList() {
    if (isExporting || totalSelected() === 0) return;
    isExporting = true;
    updateExportButton();
    try {
      const sources = exportSourcesSnapshot();
      await new Promise(resolve => setTimeout(resolve, 60));
      downloadWorkbook(await buildMaterialsWorkbook(sources));
      showToast('物料清单已生成');
    } catch (error) {
      console.error('Failed to export materials list', error);
      showToast('物料清单生成失败，请重试。');
    } finally {
      isExporting = false;
      updateExportButton();
    }
  }

  window.updateExportButton = updateExportButton;
  exportButton?.addEventListener('click', exportMaterialsList);
  updateExportButton();
})();
