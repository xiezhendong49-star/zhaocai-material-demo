(() => {
  const storageKey = 'materialDownloadNotifications';
  const tabs = document.querySelector('#messageTabs');
  const list = document.querySelector('#messageList');
  if (!tabs || !list) return;

  const params = new URLSearchParams(location.search);
  let activeTab = params.get('tab') === 'system' ? 'system' : 'business';
  let targetMessageId = params.get('messageId') || '';
  let selectedNotificationId = '';
  let positioning = false;

  const seedMessages = [
    {
      id:'message-business-approved', type:'business', messageId:'business-approved', tab:'business', unread:true,
      title:'物料报备申请审核通过',
      description:'您提交的在福华三路项目（测试）的产品报备申请已经审核通过，相关物料已经进入项目资料。项目负责人可继续补充物料参数、报价与使用位置，并在项目协作页面查看后续审核安排。',
      createdAt:'2026-04-15T17:07:37+08:00'
    },
    {
      id:'message-business-board', type:'business', messageId:'business-board', tab:'business', unread:false,
      title:'物料板审核通过', description:'您提交的物料板已经审核通过。', createdAt:'2026-04-14T14:37:02+08:00'
    },
    {
      id:'message-system-maintenance', type:'system', messageId:'system-maintenance', tab:'system', unread:true,
      title:'【兆材云库】平台停服维护通知',
      description:'为进一步优化平台功能，提升设计服务质量与操作体验，平台将于2026-08-28 23:00至次日01:00进行例行维护。系统维护期间将临时关闭网站入口，暂停全部服务，不便之处，敬请谅解。',
      createdAt:'2026-04-15T17:07:37+08:00'
    },
    {
      id:'message-system-update', type:'system', messageId:'system-update', tab:'system', unread:false,
      title:'兆材云库平台新功能推送V2.16',
      description:'物料清单、项目协作及团队空间功能已完成升级。您可以在项目中快速管理物料编号、使用位置与替换方案，提高团队协作效率。',
      createdAt:'2025-09-19T16:36:23+08:00'
    }
  ];

  function readNotifications() {
    try { return JSON.parse(localStorage.getItem(storageKey)) || []; }
    catch { return []; }
  }

  function writeNotifications(notifications) {
    localStorage.setItem(storageKey, JSON.stringify(notifications.slice(0, 100)));
    window.dispatchEvent(new CustomEvent('notifications-updated'));
  }

  function ensureMessages() {
    const current = readNotifications();
    const existingIds = new Set(current.map(item => item.messageId));
    const additions = seedMessages.filter(item => !existingIds.has(item.messageId));
    if (additions.length) writeNotifications([...additions, ...current]);
  }

  function messages() {
    return readNotifications().filter(item => item.type === activeTab).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function formatTime(value) {
    return new Intl.DateTimeFormat('zh-CN', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false }).format(new Date(value)).replaceAll('/', '-');
  }

  function markRead(id) {
    const current = readNotifications();
    if (!current.some(item => item.id === id && item.unread)) return;
    writeNotifications(current.map(item => item.id === id ? { ...item, unread:false, readAt:new Date().toISOString() } : item));
    render();
  }

  function clearSelection() {
    if (!selectedNotificationId) return;
    selectedNotificationId = '';
    list.querySelectorAll('.is-target').forEach(item => item.classList.remove('is-target'));
  }

  function updateTabs() {
    const all = readNotifications();
    tabs.querySelectorAll('button').forEach(button => {
      const active = button.dataset.tab === activeTab;
      const unread = all.filter(item => item.type === button.dataset.tab && item.unread).length;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
      button.querySelector('span').textContent = unread ? `(${unread > 99 ? '99+' : unread})` : '';
    });
  }

  function render() {
    updateTabs();
    const data = messages();
    list.innerHTML = '';
    if (!data.length) {
      list.innerHTML = '<div class="message-empty">暂无消息</div>';
      return;
    }
    data.forEach(message => {
      const row = document.createElement('article');
      row.className = `message-row${message.unread ? ' is-unread' : ''}${message.id === selectedNotificationId ? ' is-target' : ''}`;
      row.dataset.notificationId = message.id;
      row.dataset.messageId = message.messageId;
      row.innerHTML = '<span class="message-row-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 10v4h3l5 4V6L7 10H4Z"/><path d="M16 9c1.5 1.7 1.5 4.3 0 6"/><path d="M19 6.5c3.2 3 3.2 8 0 11"/></svg></span><header><h2></h2><i class="message-unread-dot" aria-label="未读"></i><time></time></header><p></p>';
      row.querySelector('h2').textContent = message.title;
      row.querySelector('time').dateTime = message.createdAt;
      row.querySelector('time').textContent = formatTime(message.createdAt);
      row.querySelector('p').textContent = message.description;
      list.appendChild(row);
    });
  }

  function positionTarget() {
    if (!targetMessageId) return;
    let target = [...list.querySelectorAll('.message-row')].find(row => row.dataset.messageId === targetMessageId);
    if (!target) return;
    selectedNotificationId = target.dataset.notificationId;
    if (params.get('markRead') === '1') markRead(selectedNotificationId);
    target = list.querySelector(`[data-notification-id="${CSS.escape(selectedNotificationId)}"]`);
    if (!target) return;
    target.classList.add('is-target');
    positioning = true;
    requestAnimationFrame(() => {
      target.scrollIntoView({ block:'start' });
      setTimeout(() => { positioning = false; }, 250);
    });
  }

  tabs.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    activeTab = button.dataset.tab;
    targetMessageId = '';
    clearSelection();
    render();
  });
  list.addEventListener('pointerover', event => {
    const row = event.target.closest('.message-row');
    if (!row || row.contains(event.relatedTarget)) return;
    markRead(row.dataset.notificationId);
  });
  list.addEventListener('click', event => {
    const row = event.target.closest('.message-row');
    if (!row) return;
    if (selectedNotificationId && row.dataset.notificationId !== selectedNotificationId) clearSelection();
    markRead(row.dataset.notificationId);
  });
  window.addEventListener('wheel', () => { if (!positioning) clearSelection(); }, { passive:true });
  window.addEventListener('touchmove', () => { if (!positioning) clearSelection(); }, { passive:true });
  window.addEventListener('storage', event => { if (event.key === storageKey) render(); });

  ensureMessages();
  render();
  positionTarget();
})();
