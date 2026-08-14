const categories = [
  ['▦','全部'],['▧','石材'],['▤','砖'],['▥','木材'],['▱','地板'],['⚑','涂料'],['▯','墙纸'],['▣','玻璃'],
  ['◩','金属'],['♨','特殊材料'],['▰','面料'],['▰','窗帘'],['♨','洁具'],['⬡','五金'],['╥','工程灯具'],['▥','开关面板'],
  ['◉','镜子'],['▥','室内分区'],['◫','门窗'],['♨','设备'],['◪','楼梯及配件'],['▧','电器'],['▱','壁炉及加热器'],['▰','家具'],
  ['♜','装饰灯具'],['▥','地毯'],['♘','艺术品'],['♣','艺术家作品'],['⌂','饰品'],['▦','纺织品'],['♜','建筑用材'],['♧','全屋定制']
];

const brands = [
  ['AUSTROFLAMM','奥地利 Austroflamm',[2,2,2,2]], ['LEXINGTON','莱克星顿 LEXINGTON HOME BRANDS',[3,4,4,3]],
  ['GROHE','高仪 GROHE',[0,5,0,5]], ['SieMatic','西曼帝克 SieMatic',[1,6,1,6]],
  ['Baker','贝克家具 Baker-McGuire',[4,3,4,3]], ['MIRAGE','米拉珥陶瓷 MIRAGE',[1,5,6,1]],
  ['Valcucine','万古奇 VALCUCINE',[6,1,6,1]], ['Visual Comfort','唯购康富 VISUALCOMFORT&CO.',[5,7,5,7]]
];

const materials = [
  {name:'粗麻布 · 奶茶色 · 打结',brand:'软装馆',price:'¥ 80–200 /m',tags:['popular'],texture:'repeating-linear-gradient(0deg,transparent 0 3px,#3b2517 4px 5px),repeating-linear-gradient(90deg,#c3a58b 0 3px,#6e4c35 4px 5px)'},
  {name:'微水泥 · 浅灰',brand:'万乐 · 微水泥',price:'¥ 110 /m²',tags:['popular','eco'],texture:'radial-gradient(circle at 20% 20%,#eee 0 3%,transparent 4%),linear-gradient(135deg,#deddd9,#f0efec 55%,#cac9c6)'},
  {name:'长虹玻璃 · 超白',brand:'玻璃玻晶',price:'¥ 50–160 /m²',tags:['popular'],texture:'repeating-linear-gradient(90deg,#49423d 0 5px,#d7d3ce 8px 13px,#77706b 16px 19px)'},
  {name:'橡木地板 · 自然色',brand:'GARTO 格桐',price:'¥ 400–900 /m²',tags:['eco'],texture:'repeating-linear-gradient(85deg,#b97442 0 2px,#cb8c57 5px 13px,#a65e30 15px 17px,#d49a68 20px 32px)'},
  {name:'科技卡拉大理石',brand:'石材 · 大理石',price:'¥ 300–1200 /m²',tags:['new'],texture:'linear-gradient(116deg,#f4f4f0 0 23%,#c8cdd1 24% 25%,#fff 27% 51%,#bcc3c6 52% 54%,#f7f6f2 56% 76%,#d2d5d4 77% 78%,#fff 80%)'},
  {name:'布艺墙纸 · 浅灰',brand:'墨纸',price:'¥ 95–145 /m²',tags:['eco'],texture:'repeating-linear-gradient(45deg,#c4c2bd 0 1px,#e9e7e2 1px 3px,#b8b6b1 3px 4px)'},
  {name:'压纹皮革 · 赤陶棕',brand:'Mastrotto',price:'¥ 260–580 /m²',tags:['new'],texture:'radial-gradient(ellipse at 10% 15%,transparent 0 6px,#5a2817 7px 8px,transparent 9px),linear-gradient(135deg,#7c432d,#4e261b)'},
  {name:'黄铜吊灯 · 暖光',brand:'Flos',price:'¥ 2180 /件',tags:['popular'],texture:'radial-gradient(circle at 50% 65%,#f9da8e 0 9%,transparent 10%),linear-gradient(90deg,#d5d0cc 0 48%,#39302c 49% 51%,#d7d2ce 52%)'},
  {name:'浮雕艺术漆 · 炭灰',brand:'Novacolor',price:'¥ 180–350 /m²',tags:['new','eco'],texture:'radial-gradient(circle at 20% 30%,#68645f 0 2px,transparent 3px),linear-gradient(145deg,#716e69,#3c3b39)'},
  {name:'拉丝不锈钢 · 暖银',brand:'Rimex',price:'¥ 320–650 /m²',tags:['new'],texture:'repeating-linear-gradient(90deg,#8c8984 0 1px,#dad6ce 2px 4px,#85827d 5px 6px)'},
  {name:'羊毛地毯 · 沙砾色',brand:'Kvadrat',price:'¥ 680–1400 /m²',tags:['eco'],texture:'repeating-radial-gradient(circle at 30% 40%,#8d7563 0 1px,#ad9887 2px 4px,#715b4b 5px)'},
  {name:'胡桃木饰面 · 烟熏棕',brand:'TABU',price:'¥ 280–760 /m²',tags:['popular','eco'],texture:'repeating-linear-gradient(93deg,#4e2a1f 0 3px,#78503c 5px 12px,#3d211a 14px 17px,#64412f 20px 28px)'}
];

const categoryGrid = document.querySelector('#categoryGrid');
categories.forEach(([icon,name],i) => {
  const card = document.createElement('button');
  card.className = `category-card${i === 0 ? ' active' : ''}`;
  card.innerHTML = `<span class="cat-icon">${icon}</span><span>${name}</span>`;
  card.addEventListener('click', () => {
    document.querySelectorAll('.category-card').forEach(el => el.classList.remove('active'));
    card.classList.add('active');
    showToast(name === '全部' ? '已展示全部物料' : `已筛选「${name}」类物料`);
    document.querySelector('#selection').scrollIntoView({behavior:'smooth', block:'start'});
  });
  categoryGrid.appendChild(card);
});

const brandGrid = document.querySelector('#brandGrid');
const spritePositions = ['0% 0%','33.333% 0%','66.666% 0%','100% 0%','0% 100%','33.333% 100%','66.666% 100%','100% 100%'];
brands.forEach(([logo,label,products], brandIndex) => {
  const parts = label.split(' '); const name = parts.shift(); const english = parts.join(' ');
  const card = document.createElement('article');
  card.className = 'brand-card';
  card.tabIndex = 0;
  card.setAttribute('role','link');
  if (brandIndex === 0) card.dataset.brand = 'austroflamm';
  card.innerHTML = `<div class="brand-card-head"><div class="brand-logo">${logo}</div><div class="brand-name"><strong>${name}</strong><span>${english}</span></div></div><div class="brand-products">${products.slice(0,3).map((product,i)=>`<div class="brand-product" style="--product-position:${spritePositions[product]}" role="img" aria-label="${name}代表产品 ${i+1}"></div>`).join('')}</div>`;
  const openBrand = () => {
    if (brandIndex === 0) {
      window.location.href = 'brand-austroflamm.html';
      return;
    }
    showToast(`正在查看品牌：${name}`);
  };
  card.addEventListener('click', openBrand);
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openBrand();
    }
  });
  brandGrid.appendChild(card);
});

let activeFilter = 'all';
const materialGrid = document.querySelector('#materialGrid');
function renderMaterials() {
  const filtered = activeFilter === 'all' ? materials : materials.filter(m => m.tags.includes(activeFilter));
  materialGrid.innerHTML = '';
  filtered.forEach((m,i) => {
    const card = document.createElement('article');
    card.className = 'material-card';
    card.style.setProperty('--texture',m.texture);
    card.innerHTML = `<div class="material-photo"><button class="favorite" aria-label="收藏">♡</button></div><div class="material-info"><h3>${m.name}</h3><p>${m.brand}</p><strong>${m.price.replace('/', '<small>/')}</small></strong></div>`;
    card.querySelector('.favorite').addEventListener('click', e => {
      e.stopPropagation(); e.currentTarget.classList.toggle('active'); e.currentTarget.textContent = e.currentTarget.classList.contains('active') ? '♥' : '♡'; showToast(e.currentTarget.classList.contains('active') ? '已加入收藏' : '已取消收藏');
    });
    card.addEventListener('click', () => showToast(`打开物料详情：${m.name}`));
    materialGrid.appendChild(card);
  });
}
renderMaterials();

document.querySelector('#filters').addEventListener('click', e => {
  if (!e.target.dataset.filter) return;
  document.querySelectorAll('#filters button').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active'); activeFilter = e.target.dataset.filter; renderMaterials();
});

const heroSlides = [
  { eyebrow:'2026 MATERIAL TREND', title:'灵感 <span>×</span> 材料&nbsp; 全新场景美学', subtitle:'让设计落地更简单', button:'探索风格场景' },
  { eyebrow:'NATURAL LIVING', title:'自然 <span>×</span> 共生&nbsp; 重塑松弛空间', subtitle:'发现自然材质的温度', button:'探索自然选材' },
  { eyebrow:'CRAFT & TEXTURE', title:'肌理 <span>×</span> 工艺&nbsp; 看见细节之美', subtitle:'让每一处触感都有表达', button:'查看工艺趋势' },
  { eyebrow:'FUTURE SURFACE', title:'科技 <span>×</span> 表面&nbsp; 开启未来想象', subtitle:'解锁创新材料新边界', button:'发现创新材料' }
];
const hero = document.querySelector('#hero');
const heroDots = [...document.querySelectorAll('#heroDots button')];
let heroIndex = 0;
let heroTimer;
function showHeroSlide(index) {
  heroIndex = index;
  const slide = heroSlides[index];
  hero.className = `hero hero-theme-${index}`;
  document.querySelector('#heroEyebrow').textContent = slide.eyebrow;
  document.querySelector('#heroTitle').innerHTML = slide.title;
  document.querySelector('#heroSubtitle').textContent = slide.subtitle;
  document.querySelector('#heroButton').innerHTML = `${slide.button} <b>›</b>`;
  heroDots.forEach((dot,i) => dot.classList.toggle('active',i === index));
}
function startHeroCarousel() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => showHeroSlide((heroIndex + 1) % heroSlides.length), 4000);
}
heroDots.forEach((dot,i) => dot.addEventListener('click', () => { showHeroSlide(i); startHeroCarousel(); }));
hero.addEventListener('mouseenter', () => clearInterval(heroTimer));
hero.addEventListener('mouseleave', startHeroCarousel);
hero.addEventListener('click', e => { if (!e.target.closest('#heroDots')) window.location.href = `trend.html?scene=${heroIndex}`; });
hero.addEventListener('keydown', e => { if (e.key === 'Enter') window.location.href = `trend.html?scene=${heroIndex}`; });
startHeroCarousel();

function doSearch(term) {
  const value = (term ?? document.querySelector('#searchInput').value).trim();
  if (!value) { showToast('请输入想找的物料、品牌或特征'); document.querySelector('#searchInput').focus(); return; }
  document.querySelector('#searchInput').value = value;
  addSearchHistory(value);
  closeSearchDropdown();
  showToast(`正在搜索：${value}`); document.querySelector('#selection').scrollIntoView({behavior:'smooth'});
}
document.querySelector('#searchBtn').addEventListener('click', () => doSearch());
document.querySelector('#searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
document.querySelectorAll('.hot-search button').forEach(btn => btn.addEventListener('click', () => doSearch(btn.textContent)));
const searchDropdown = document.querySelector('#searchDropdown');
const searchInput = document.querySelector('#searchInput');
const imageSearchButton = document.querySelector('.image-search');
const dropZone = document.querySelector('#dropZone');
const imageFile = document.querySelector('#imageFile');
const imageUrl = document.querySelector('#imageUrl');
let searchHistory = JSON.parse(localStorage.getItem('materialSearchHistory') || '["微水泥","长虹玻璃","奶油风木饰面"]');

function openSearchDropdown() { searchDropdown.classList.add('open'); searchDropdown.setAttribute('aria-hidden','false'); renderHistory(); }
function closeSearchDropdown() { searchDropdown.classList.remove('open'); searchDropdown.setAttribute('aria-hidden','true'); }
searchInput.addEventListener('focus', openSearchDropdown);
searchInput.addEventListener('click', openSearchDropdown);
imageSearchButton.addEventListener('click', e => { e.stopPropagation(); openSearchDropdown(); });
document.querySelector('#dropdownClose').addEventListener('click', closeSearchDropdown);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearchDropdown(); });
document.addEventListener('click', e => { if (!document.querySelector('.search-section').contains(e.target)) closeSearchDropdown(); });

function handleImageFile(file) {
  if (!file || !file.type.startsWith('image/')) { showToast('请选择 JPG、PNG、WebP 等图片文件'); return; }
  const reader = new FileReader();
  reader.onload = () => {
    try { sessionStorage.setItem('materialSearchImage',reader.result); sessionStorage.setItem('materialSearchName',file.name || '粘贴的图片'); }
    catch (error) { showToast('图片较大，将直接进入搜索页面'); }
    window.location.href = 'image-search.html?source=upload';
  };
  reader.readAsDataURL(file);
}
imageFile.addEventListener('change', e => handleImageFile(e.target.files[0]));
let dragDepth = 0;
searchDropdown.addEventListener('dragenter', e => { e.preventDefault(); dragDepth += 1; searchDropdown.classList.add('dragging'); });
searchDropdown.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; });
searchDropdown.addEventListener('dragleave', e => { e.preventDefault(); dragDepth -= 1; if (dragDepth <= 0) { dragDepth = 0; searchDropdown.classList.remove('dragging'); } });
searchDropdown.addEventListener('drop', e => { e.preventDefault(); dragDepth = 0; searchDropdown.classList.remove('dragging'); handleImageFile(e.dataTransfer.files[0]); });
document.addEventListener('paste', e => {
  if (!searchDropdown.classList.contains('open')) return;
  const image = [...e.clipboardData.items].find(item => item.type.startsWith('image/'));
  if (image) { e.preventDefault(); handleImageFile(image.getAsFile()); }
});
document.querySelector('#urlSearchBtn').addEventListener('click', () => {
  const url = imageUrl.value.trim();
  if (!/^https?:\/\//i.test(url)) { showToast('请粘贴完整的 http 或 https 图片地址'); imageUrl.focus(); return; }
  sessionStorage.setItem('materialSearchImageUrl',url);
  window.location.href = 'image-search.html?source=url';
});
imageUrl.addEventListener('keydown', e => { if (e.key === 'Enter') document.querySelector('#urlSearchBtn').click(); });

function addSearchHistory(value) {
  searchHistory = [value,...searchHistory.filter(item => item !== value)].slice(0,10);
  localStorage.setItem('materialSearchHistory',JSON.stringify(searchHistory));
  renderHistory();
}
function renderHistory() {
  const list = document.querySelector('#historyList');
  list.innerHTML = searchHistory.length ? '' : '<span class="history-empty">暂无搜索记录</span>';
  searchHistory.forEach((text,index) => {
    const item = document.createElement('div'); item.className = 'history-item'; item.innerHTML = `<span>${text}</span><button aria-label="删除">×</button>`;
    item.querySelector('span').addEventListener('click', () => doSearch(text));
    item.querySelector('button').addEventListener('click', e => { e.stopPropagation(); searchHistory.splice(index,1); localStorage.setItem('materialSearchHistory',JSON.stringify(searchHistory)); renderHistory(); });
    list.appendChild(item);
  });
}
document.querySelector('#clearHistory').addEventListener('click', () => { searchHistory = []; localStorage.setItem('materialSearchHistory','[]'); renderHistory(); });
renderHistory();
document.querySelector('.member-btn').addEventListener('click', () => showToast('会员权益弹窗（演示）'));

const toast = document.querySelector('#toast'); let toastTimer;
function showToast(message) { clearTimeout(toastTimer); toast.textContent = message; toast.classList.add('show'); toastTimer = setTimeout(() => toast.classList.remove('show'),1800); }
const backTop = document.querySelector('#backTop');
window.addEventListener('scroll', () => backTop.classList.toggle('show',window.scrollY > 500));
backTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
