(() => {
  const storageKey = 'materialDownloadNotifications';
  const trigger = document.querySelector('#notificationTrigger');
  const badge = document.querySelector('#notificationBadge');
  const panel = document.querySelector('#notificationPanel');
  const list = document.querySelector('#notificationList');
  const demoState = document.querySelector('#notificationDemoState');
  const markAllReadButton = document.querySelector('#markAllNotificationsRead');
  if (!trigger || !badge || !panel || !list) return;

  const demoReadIds = new Set();

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
      topUnread: true,
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
        title:'物料板审核通过', description:'您提交的物料板已经审核通过。', createdAt:new Date(now - 20 * 3600000).toISOString(), topUnread:false
      }),
      sampleNotification({
        id:'demo-system-policy', type:'system', messageId:'system-policy', tab:'system',
        title:'平台规则更新', description:'兆材云库服务规则已更新，请查看本次调整的具体内容及生效时间。', createdAt:new Date(now - 26 * 3600000).toISOString(), topUnread:false
      })
    ];
  }

  function currentDemoState() {
    return demoState?.value || 'actual';
  }

  function isTopUnread(notification) {
    return notification.topUnread ?? notification.unread ?? false;
  }

  function sixMonthsAgo() {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - 6);
    return cutoff.getTime();
  }

  function isInDisplayWindow(notification) {
    const createdAt = new Date(notification.createdAt).getTime();
    return Number.isFinite(createdAt) && createdAt >= sixMonthsAgo();
  }

  function notificationSource() {
    const state = currentDemoState();
    if (state === 'empty') return [];
    const applyDemoState = items => items
      .map(item => demoReadIds.has(item.id) ? { ...item, topUnread:false } : item);
    if (state === 'generating') return applyDemoState([sampleNotification({ id:'demo-download-generating', taskId:'demo-task-generating', status:'generating', fileName:'物料清单_生成中.xlsx', topUnread:false })]);
    if (state === 'mixed') return applyDemoState(mixedSamples());
    if (state === 'success') return applyDemoState([sampleNotification({ id:'demo-download-ready', taskId:'demo-task-ready', status:'ready', fileName:'物料清单_演示.xlsx', topUnread:true })]);
    if (state === 'failed') return applyDemoState([sampleNotification({ id:'demo-download-failed', taskId:'demo-task-failed', status:'failed', fileName:'物料清单_失败演示.xlsx', topUnread:true })]);
    if (state === 'read') return applyDemoState(mixedSamples().map(item => ({ ...item, topUnread:false })));
    return readNotifications();
  }

  function eligibleUnreadNotifications() {
    return notificationSource()
      .filter(notification => isTopUnread(notification) && isInDisplayWindow(notification))
      .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));
  }

  function visibleNotifications() {
    return eligibleUnreadNotifications().slice(0, 99);
  }

  function normalizedNotification(notification) {
    if (notification.type === 'business' || notification.type === 'system') return notification;
    const failed = notification.status === 'failed';
    return {
      ...notification,
      type:'download',
      title:failed ? '物料清单生成失败' : '物料清单已生成',
      description:failed
        ? '生成失败，请返回物料清单页面重新提交。'
        : '请前往下载中心下载，下载链接有效期为一年。',
      actionType:'download-center',
      actionLabel:'前往下载中心'
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
    const hasUnread = notifications.length > 0;
    badge.hidden = !hasUnread;
    badge.textContent = '';
    trigger.setAttribute('aria-label', hasUnread ? '通知，有未读消息' : '通知，无未读消息');
  }

  function messageActionNeeded(item, body) {
    if (!['business','system'].includes(item.type)) return false;
    return body.scrollHeight > body.clientHeight + 1 || (item.description || '').length > 58;
  }

  function render() {
    const notifications = visibleNotifications().map(normalizedNotification);
    const allEligibleUnread = eligibleUnreadNotifications();
    updateBadge(allEligibleUnread);
    if (markAllReadButton) {
      markAllReadButton.disabled = allEligibleUnread.length === 0;
      markAllReadButton.setAttribute('aria-label', allEligibleUnread.length ? '将近六个月内的所有未读通知标记为已读' : '暂无未读通知');
    }
    list.innerHTML = '';
    if (!notifications.length) {
      list.innerHTML = '<div class="notification-empty"><div><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5h14v9H9l-4 3v-12Z"/></svg><strong>暂无未读通知</strong><span>新的业务、系统或任务结果会显示在这里</span></div></div>';
      return;
    }
    notifications.forEach(notification => {
      const item = document.createElement('article');
      item.className = `notification-item notification-${notification.type} is-unread`;
      item.dataset.notificationId = notification.id;
      item.dataset.notificationStatus = notification.status || '';
      item.innerHTML = '<div class="notification-title-row"><strong></strong><i aria-label="未读"></i></div><button class="notification-clear" type="button" aria-label="将此通知标记为已读" title="标记为已读"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17"/></svg></button><p></p><div class="notification-meta"><time></time><button class="notification-action" type="button" hidden></button></div>';
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

  function setOpen(open, { returnFocus = false, focusPanel = true } = {}) {
    panel.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
    if (open && focusPanel) panel.focus({ preventScroll:true });
    else if (returnFocus) trigger.focus({ preventScroll:true });
  }

  function markAllNotificationsRead() {
    const unread = eligibleUnreadNotifications();
    if (!unread.length) return;
    if (currentDemoState() !== 'actual') {
      unread.forEach(item => demoReadIds.add(item.id));
      render();
      return;
    }
    const unreadIds = new Set(unread.map(item => item.id));
    const readAt = new Date().toISOString();
    writeNotifications(readNotifications().map(item => unreadIds.has(item.id)
      ? { ...item, topUnread:false, topReadAt:readAt }
      : item));
    render();
  }

  function markNotificationRead(id) {
    if (!id) return;
    if (currentDemoState() !== 'actual') {
      if (!eligibleUnreadNotifications().some(item => item.id === id)) return;
      demoReadIds.add(id);
      render();
      return;
    }
    const notifications = readNotifications();
    if (!notifications.some(item => item.id === id && isTopUnread(item))) return;
    writeNotifications(notifications.map(item => item.id === id
      ? { ...item, topUnread:false, topReadAt:new Date().toISOString() }
      : item));
    render();
  }

  function markNotificationReadByTask(taskId) {
    const match = readNotifications().find(item => item.taskId === taskId);
    if (match) markNotificationRead(match.id);
  }

  function openMessage(notification) {
    const tab = notification.tab || notification.type || 'business';
    const messageId = notification.messageId || notification.id;
    window.open(`message-center.html?tab=${encodeURIComponent(tab)}&messageId=${encodeURIComponent(messageId)}&from=notification`, '_blank', 'noopener');
  }

  trigger.addEventListener('click', () => {
    setOpen(panel.hidden);
  });
  demoState?.addEventListener('change', () => { demoReadIds.clear();render(); });
  markAllReadButton?.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    markAllNotificationsRead();
    setOpen(true, { focusPanel:false });
  });
  document.addEventListener('click', event => {
    if (!panel.hidden && !event.target.closest('.notification-anchor')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) setOpen(false, { returnFocus:true });
  });
  list.addEventListener('click', event => {
    const item = event.target.closest('.notification-item');
    if (!item) return;
    const id = item.dataset.notificationId;
    if (event.target.closest('.notification-clear')) {
      event.preventDefault();
      event.stopPropagation();
      markNotificationRead(id);
      setOpen(true, { focusPanel:false });
      return;
    }
    const action = event.target.closest('.notification-action');
    if (!action) return;
    const notification = visibleNotifications().map(normalizedNotification).find(entry => entry.id === id);
    if (!notification) return;
    markNotificationRead(id);
    if (action.dataset.action === 'download-center') {
      const taskId = notification.taskId ? `?taskId=${encodeURIComponent(notification.taskId)}&from=notification` : '';
      window.open(`download-center.html${taskId}`, '_blank', 'noopener');
    }
    if (action.dataset.action === 'message') openMessage(notification);
  });
  window.addEventListener('download-notifications-updated', render);
  window.addEventListener('notifications-updated', render);
  window.addEventListener('material-task-notification', render);
  window.addEventListener('storage', event => { if (event.key === storageKey) render(); });

  window.zhaocaiNotifications = { markRead:markNotificationRead, markReadByTask:markNotificationReadByTask, render, markAllRead:markAllNotificationsRead };
  const requestedDemo = new URLSearchParams(location.search).get('notice');
  if (demoState && ['empty','generating','mixed','success','failed','read'].includes(requestedDemo)) demoState.value = requestedDemo;
  render();
})();
