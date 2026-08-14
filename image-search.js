const stage = document.querySelector('#imageStage');
const sourceImage = document.querySelector('#sourceImage');
const reveal = document.querySelector('#segmentReveal');
const objectBox = document.querySelector('#objectBox');
const customBox = document.querySelector('#customBox');
const grid = document.querySelector('#visualResultGrid');
const skeleton = document.querySelector('#skeletonGrid');
const wholeButton = document.querySelector('#wholeImageButton');
const linkInput = document.querySelector('#imageLinkInput');
const uploadDropdown = document.querySelector('#visualUploadDropdown');
const clearCurrent = document.querySelector('#clearCurrent');
const emptyResults = document.querySelector('#emptyResults');

const uploaded = sessionStorage.getItem('materialSearchImage');
function updateSegmentImage(url){document.querySelectorAll('.segment').forEach(segment=>segment.style.setProperty('background-image',`linear-gradient(rgba(255,255,255,.28),rgba(255,255,255,.28)),url("${url}")`,'important'))}
if (uploaded){sourceImage.src=uploaded;updateSegmentImage(uploaded)}else{updateSegmentImage(sourceImage.src)}

const objectData = {
  'chair-left': { label:'单椅', box:[10,52,21,38], group:'chair' },
  'sofa': { label:'沙发', box:[46,53,35,31], group:'sofa' },
  'table': { label:'茶几', box:[45,61,22,19], group:'table' },
  'chair-right': { label:'休闲椅', box:[75,48,16,28], group:'chair' },
  'rug': { label:'地毯', box:[12,73,78,27], group:'rug' },
  'lamp': { label:'吊灯', box:[52,34,10,17], group:'lamp' },
  'cabinet': { label:'展示柜', box:[64,30,28,34], group:'cabinet' }
};

let selectedColors=[];
let selectedPrice={min:null,max:null,label:''};
let currentResultGroup='whole';
const resultPriceSamples=[
  {value:680,text:'¥ 680 /m²'},{value:420,text:'¥ 420–760 /m²'},{value:980,text:'¥ 980 /m²'},
  {value:260,text:'¥ 260–580 /m²'},{value:110,text:'¥ 110 /m²'},{value:1680,text:'¥ 1,680 /件'},
  {value:860,text:'¥ 860 /m²'},{value:2180,text:'¥ 2,180 /件'},{value:95,text:'¥ 95–145 /m²'},{value:350,text:'¥ 350 /m²'}
];
const resultColorSamples=['米黄色系','深木色系','米黄色系','灰色系','灰色系','棕色系','青色系','白色系','金色系','浅木色系'];
const colorOptions=[
  ['彩色系','0.15205443154637677','彩色'],['棕色系','0.35091806977235995','棕色'],['橙色系','0.9827893137045913','橙色'],['浅木色系','0.8516177806173808','浅木色'],
  ['深木色系','0.909503172102502','深木色'],['灰色系','0.47301614434844175','灰色'],['玫瑰金色系','0.7458446989033465','玫瑰金'],['白色系','0.4956520078629123','白色'],
  ['米黄色系','0.26186055003883757','米黄色'],['粉色系','0.12017593474223598','粉色'],['紫色系','0.553204933617286','紫色'],['红色系','0.11908648197742533','红色'],
  ['绿色系','0.49702511431330265','绿色'],['蓝色系','0.38536590341267485','蓝色'],['透明色系','0.43746676520872163','透明'],['金色系','0.8485666110520222','金色'],
  ['铜色系','0.999137551298718','铜色'],['银色系','0.5144772194771343','银色'],['青色系','0.11636038053577091','青色'],['香槟色系','0.3954473768658373','香槟色'],
  ['黄色系','0.879583430760146','黄色'],['黑色系','0.7596691084832257','黑色']
].map(([label,path,name])=>({label,icon:`https://cdn-oss-ideafusion.idea-fusion.com/dev/admin/system/${path}/202351/${name}@2x.png?x-oss-process=image/resize,w_100,m_lfit`}));

const resultGroups = {
  whole:[
    ['现代客厅整体空间','空间案例','96%','linear-gradient(135deg,#352c29,#a58d7d 48%,#ddd5ca)'],['胡桃木墙板系统','TABU','93%','repeating-linear-gradient(90deg,#4b2c22 0 4px,#79533f 6px 15px)'],['米灰艺术地毯','Kvadrat','91%','repeating-radial-gradient(circle,#a38f7f 0 1px,#c9bcaf 2px 5px)'],['低饱和软装组合','软装馆','89%','linear-gradient(145deg,#c5b9af,#837169)'],['暖灰微水泥','万乐','87%','linear-gradient(135deg,#d9d6d0,#aaa6a0)'],['深色展示柜','SieMatic','85%','linear-gradient(90deg,#332620,#745a49,#251e1a)'],['落地窗系统','旭格','82%','linear-gradient(115deg,#bed1d0 0 45%,#343b3a 46% 50%,#dbe5e2 51%)'],['自然石茶几','Baker','80%','radial-gradient(ellipse at center,#b7aaa0 0 38%,#4c4038 40% 48%,#eee 49%)']
  ],
  sofa:[['弧形模块沙发','Ligne Roset','98%','linear-gradient(155deg,#eee7df,#a69488)'],['云朵组合沙发','B&B Italia','95%','linear-gradient(140deg,#d9d2cb,#877b72)'],['米白布艺沙发','Minotti','92%','linear-gradient(160deg,#f0ece6,#b0a397)'],['低靠背休闲沙发','Poliform','89%','linear-gradient(135deg,#c9bdb1,#7c6b60)'],['弧面贵妃榻','Baxter','87%','linear-gradient(145deg,#bea28f,#6f5447)'],['模块化软包座椅','Vitra','84%','linear-gradient(150deg,#d8cfc7,#918175)']],
  chair:[['编织靠背单椅','Baker','97%','repeating-linear-gradient(45deg,#34241e 0 3px,#9a725d 4px 7px)'],['赤陶色休闲椅','Cassina','94%','linear-gradient(145deg,#a95c43,#4c3029)'],['胡桃木扶手椅','Carl Hansen','91%','linear-gradient(130deg,#6c4837,#c0a28b)'],['黑色藤编椅','GUBI','88%','repeating-linear-gradient(90deg,#25201e 0 4px,#78675c 5px 7px)'],['软包阅读椅','Vitra','85%','linear-gradient(145deg,#b68a73,#5c4035)'],['雕塑感休闲椅','HAY','82%','linear-gradient(150deg,#dbcfc3,#7b6a60)']],
  table:[['天然石圆茶几','Baxter','98%','radial-gradient(ellipse,#c5bbb2 0 42%,#4b423d 44% 55%,#eee 56%)'],['黑橡木茶几','Poliform','95%','radial-gradient(ellipse,#49372e 0 45%,#1d1815 47% 55%,#ddd 57%)'],['洞石边几','GUBI','91%','radial-gradient(circle,#d7c8ae,#9c896d)'],['金属玻璃茶几','Minotti','88%','linear-gradient(135deg,#dad8d1,#77716a)'],['雕塑基座茶几','Baker','85%','radial-gradient(ellipse,#987d68,#3f3028)'],['组合圆几','HAY','82%','radial-gradient(circle at 35% 40%,#d1bda7 0 25%,#5b493d 27% 45%,#eee 47%)']],
  rug:[['几何拼接地毯','cc-tapis','97%','repeating-linear-gradient(45deg,#633f35 0 9px,#c6b4a4 10px 20px,#32302c 21px 28px)'],['羊毛手工地毯','Kvadrat','94%','repeating-radial-gradient(circle,#a28d7b 0 1px,#d0c4b8 2px 5px)'],['低饱和纹样地毯','GAN','90%','repeating-linear-gradient(90deg,#77706a 0 10px,#c6b9ac 11px 20px)'],['现代走廊毯','Kasthall','87%','linear-gradient(90deg,#663d34,#c3a98f,#3e3935)'],['自然色编织毯','Nanimarquina','84%','repeating-linear-gradient(45deg,#ac9a88 0 2px,#ded4ca 3px 6px)'],['艺术拼色地毯','Tai Ping','81%','conic-gradient(#6d453a,#c3ad96,#44423e,#6d453a)']],
  lamp:[['黄铜玻璃吊灯','Flos','98%','radial-gradient(circle,#ffd881 0 18%,#8d6431 20% 25%,#34302b 27%)'],['球形艺术吊灯','Vibia','94%','radial-gradient(circle,#f2d8a1,#856d48 48%,#ddd 50%)'],['暖光阅读灯','Artemide','90%','linear-gradient(120deg,#2c2926 0 45%,#ddb75f 47% 54%,#eee 56%)'],['雕塑感吊灯','Astep','87%','radial-gradient(ellipse,#f0c66e,#51463a)'],['玻璃球灯具','Bocci','84%','radial-gradient(circle at 40% 40%,#fff3c9,#8c765b 30%,#ddd 33%)'],['现代餐吊灯','Louis Poulsen','81%','linear-gradient(#282522,#d8b56f,#f1eee8)']],
  cabinet:[['胡桃木展示柜','SieMatic','97%','linear-gradient(90deg,#392820,#765a47,#281f1b)'],['背光开放柜','Poliform','94%','repeating-linear-gradient(0deg,#2c2521 0 16px,#c49b68 17px 20px)'],['模块化书柜','Molteni&C','91%','repeating-linear-gradient(90deg,#43362e 0 20px,#a17e61 21px 24px)'],['金属玻璃柜','Rimadesio','88%','linear-gradient(115deg,#262929,#88918e,#262929)'],['定制收纳系统','LEMA','85%','linear-gradient(90deg,#6a5141,#2d2420,#886b54)'],['壁挂展示架','USM','82%','repeating-linear-gradient(0deg,#42362e 0 18px,#bc9161 19px 21px)']],
  custom:[['相似材质组合','兆材精选','92%','linear-gradient(135deg,#afa097,#4b403a)'],['空间局部同款','设计师严选','89%','linear-gradient(145deg,#d8cfc4,#77675b)'],['相近色系材料','色彩实验室','86%','linear-gradient(135deg,#8e7567,#d0c0b0)'],['局部纹理匹配','材料中心','83%','repeating-linear-gradient(45deg,#8c7466 0 4px,#c6b4a5 5px 10px)'],['相似表面方案','新材速递','80%','linear-gradient(160deg,#c8bcb2,#62554d)'],['设计替代选项','项目精选','77%','linear-gradient(120deg,#433c38,#aaa098)']]
};

function createSkeletons(){ skeleton.innerHTML=''; for(let i=0;i<8;i++) skeleton.insertAdjacentHTML('beforeend','<div class="skeleton-card"><i></i><span></span><span></span></div>'); }
createSkeletons();
function formatResultPrice(text){const parts=text.split(' /');return parts.length>1?`${parts[0]} <small>/${parts[1]}</small>`:text}
function renderResults(group='whole', delay=0){
  currentResultGroup=group;
  const items=resultGroups[group]||resultGroups.custom;
  skeleton.classList.add('show'); grid.classList.add('loading');
  setTimeout(()=>{
    grid.innerHTML='';
    const prepared=[...items,...items.slice(0,2)].map((item,index)=>({item,price:resultPriceSamples[index%resultPriceSamples.length],color:resultColorSamples[index%resultColorSamples.length]}));
    const filtered=prepared.filter(({price,color})=>(!selectedColors.length||selectedColors.includes(color))&&(selectedPrice.min===null||price.value>=selectedPrice.min)&&(selectedPrice.max===null||price.value<=selectedPrice.max));
    if(!filtered.length){grid.innerHTML='<div class="filtered-empty"><strong>没有符合条件的物料</strong><span>试试减少色系选择，或放宽价格范围</span></div>'}
    filtered.forEach(({item,price})=>{const [name,brand,similarity,texture]=item;const card=document.createElement('article');card.className='result-card';card.style.setProperty('--texture',texture);card.innerHTML=`<div class="result-photo"></div><div class="result-info"><span class="similarity">相似度 ${similarity}</span><h3>${name}</h3><p>${brand}</p><strong class="result-price">${formatResultPrice(price.text)}</strong></div>`;grid.appendChild(card)});
    skeleton.classList.remove('show');grid.classList.remove('loading');
  },delay);
}
renderResults('whole',450);

function startSegmentation(){
  reveal.classList.remove('ready');
  setTimeout(()=>reveal.classList.add('ready'),350);
}
sourceImage.addEventListener('load',startSegmentation); if(sourceImage.complete) startSegmentation();

function hideSelections(){ objectBox.classList.remove('show'); customBox.classList.remove('show'); }
function selectObject(key){ const data=objectData[key]; hideSelections(); objectBox.style.left=`${data.box[0]}%`;objectBox.style.top=`${data.box[1]}%`;objectBox.style.width=`${data.box[2]}%`;objectBox.style.height=`${data.box[3]}%`;document.querySelector('#objectLabel').textContent=data.label;objectBox.classList.add('show');wholeButton.classList.remove('active');renderResults(data.group,720); }
document.querySelectorAll('.segment').forEach(segment=>segment.addEventListener('click',e=>{e.stopPropagation();selectObject(segment.dataset.object)}));
wholeButton.addEventListener('click',()=>{hideSelections();wholeButton.classList.add('active');renderResults('whole',650)});

function placeCustomBox(clientX,clientY){ const rect=stage.getBoundingClientRect(); const size=rect.width/4; let left=clientX-rect.left-size/2; let top=clientY-rect.top-size/2; left=Math.max(0,Math.min(left,rect.width-size)); top=Math.max(0,Math.min(top,rect.height-size)); customBox.style.width=`${size}px`;customBox.style.height=`${size}px`;customBox.style.left=`${left}px`;customBox.style.top=`${top}px`;objectBox.classList.remove('show');customBox.classList.add('show');wholeButton.classList.remove('active');renderResults('custom',720); }
stage.addEventListener('click',e=>{ if(e.target.closest('.selection-box')||e.target.closest('.segment'))return; placeCustomBox(e.clientX,e.clientY); });
let drawing=false,drawMoved=false,suppressStageClick=false,drawStartX=0,drawStartY=0;
stage.addEventListener('pointerdown',e=>{
  if(stage.classList.contains('empty')||e.target.closest('.selection-box')||e.target.closest('.segment'))return;
  const rect=stage.getBoundingClientRect();drawing=true;drawMoved=false;drawStartX=Math.max(0,Math.min(e.clientX-rect.left,rect.width));drawStartY=Math.max(0,Math.min(e.clientY-rect.top,rect.height));stage.setPointerCapture(e.pointerId);
});
stage.addEventListener('pointermove',e=>{
  if(!drawing)return;const rect=stage.getBoundingClientRect();const x=Math.max(0,Math.min(e.clientX-rect.left,rect.width));const y=Math.max(0,Math.min(e.clientY-rect.top,rect.height));if(Math.hypot(x-drawStartX,y-drawStartY)<6&&!drawMoved)return;
  drawMoved=true;objectBox.classList.remove('show');customBox.classList.add('show');customBox.style.left=`${Math.min(drawStartX,x)}px`;customBox.style.top=`${Math.min(drawStartY,y)}px`;customBox.style.width=`${Math.max(1,Math.abs(x-drawStartX))}px`;customBox.style.height=`${Math.max(1,Math.abs(y-drawStartY))}px`;
});
stage.addEventListener('pointerup',e=>{
  if(!drawing)return;drawing=false;stage.releasePointerCapture(e.pointerId);if(drawMoved){const box=customBox.getBoundingClientRect();if(box.width<28||box.height<28){customBox.classList.remove('show');placeCustomBox(e.clientX,e.clientY)}else{wholeButton.classList.remove('active');renderResults('custom',720)}suppressStageClick=true;setTimeout(()=>suppressStageClick=false,0)}
});
stage.addEventListener('click',e=>{if(suppressStageClick){e.stopImmediatePropagation();e.preventDefault()}},true);

let dragging=false,dragOffsetX=0,dragOffsetY=0;
customBox.addEventListener('pointerdown',e=>{if(e.target.tagName==='BUTTON')return;dragging=true;const r=customBox.getBoundingClientRect();dragOffsetX=e.clientX-r.left;dragOffsetY=e.clientY-r.top;customBox.setPointerCapture(e.pointerId);e.preventDefault()});
customBox.addEventListener('pointermove',e=>{if(!dragging)return;const sr=stage.getBoundingClientRect();const br=customBox.getBoundingClientRect();let left=e.clientX-sr.left-dragOffsetX;let top=e.clientY-sr.top-dragOffsetY;left=Math.max(0,Math.min(left,sr.width-br.width));top=Math.max(0,Math.min(top,sr.height-br.height));customBox.style.left=`${left}px`;customBox.style.top=`${top}px`});
customBox.addEventListener('pointerup',e=>{if(!dragging)return;dragging=false;customBox.releasePointerCapture(e.pointerId);renderResults('custom',650)});

function loadFile(file){
  if(!file||!file.type.startsWith('image/'))return;
  const reader=new FileReader();
  reader.onload=()=>{sourceImage.src=reader.result;updateSegmentImage(reader.result);sessionStorage.setItem('materialSearchImage',reader.result);sessionStorage.setItem('materialSearchName',file.name||'粘贴图片');stage.classList.remove('empty');clearCurrent.classList.add('show');hideSelections();uploadDropdown.classList.remove('open');wholeButton.classList.add('active');renderResults('whole',650)};
  reader.readAsDataURL(file);
}
document.querySelector('#replaceFile').addEventListener('change',e=>loadFile(e.target.files[0]));
linkInput.addEventListener('focus',()=>uploadDropdown.classList.add('open'));
linkInput.addEventListener('click',()=>uploadDropdown.classList.add('open'));
document.addEventListener('click',e=>{if(!document.querySelector('#visualInputWrap').contains(e.target))uploadDropdown.classList.remove('open')});
const visualDropZone=document.querySelector('#visualDropZone');
['dragenter','dragover'].forEach(type=>visualDropZone.addEventListener(type,e=>{e.preventDefault();visualDropZone.classList.add('dragging')}));
['dragleave','drop'].forEach(type=>visualDropZone.addEventListener(type,e=>{e.preventDefault();visualDropZone.classList.remove('dragging')}));
visualDropZone.addEventListener('drop',e=>loadFile(e.dataTransfer.files[0]));
document.addEventListener('paste',e=>{if(!uploadDropdown.classList.contains('open'))return;const item=[...e.clipboardData.items].find(i=>i.type.startsWith('image/'));if(item){e.preventDefault();loadFile(item.getAsFile())}});
document.querySelector('#linkSearchButton').addEventListener('click',()=>{const url=linkInput.value.trim();if(!/^https?:\/\//i.test(url)){linkInput.focus();return}sourceImage.src=url;updateSegmentImage(url);stage.classList.remove('empty');clearCurrent.classList.add('show');uploadDropdown.classList.remove('open');hideSelections();wholeButton.classList.add('active');renderResults('whole',650)});
linkInput.addEventListener('keydown',e=>{if(e.key==='Enter')document.querySelector('#linkSearchButton').click()});
clearCurrent.addEventListener('click',e=>{e.stopPropagation();sessionStorage.removeItem('materialSearchImage');sessionStorage.removeItem('materialSearchName');linkInput.value='';sourceImage.removeAttribute('src');stage.classList.add('empty');reveal.classList.remove('ready');hideSelections();clearCurrent.classList.remove('show');wholeButton.classList.remove('active');grid.innerHTML='';grid.classList.remove('loading');skeleton.classList.remove('show');emptyResults.classList.add('show');uploadDropdown.classList.remove('open')});
document.querySelectorAll('.result-filters button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.result-filters button').forEach(b=>b.classList.remove('active'));button.classList.add('active');renderResults('whole',500)}));

const demoCategoryTree = [
  ['石材',[['天然石材',['大理石','花岗岩','石灰石','洞石','砂岩','板岩']],['人造石材',['石英石','岗石','水磨石','亚克力实体面材']],['石材制品',['石材板材','马赛克','线条及异形','石材家具']]]],
  ['砖',[['瓷砖',['岩板','瓷质砖','陶质砖','通体砖','釉面砖']],['功能砖',['防滑砖','耐酸砖','透水砖']],['装饰砖',['手工砖','花砖','马赛克','文化砖']]]],
  ['木材',[['原木与板材',['原木','实木板','胶合板','密度板','刨花板']],['饰面材料',['木皮','木饰面板','防火板','科技木']],['户外木材',['防腐木','碳化木','塑木']]]],
  ['地板',[['木地板',['实木地板','实木复合地板','强化地板','软木地板']],['弹性地板',['PVC地板','橡胶地板','亚麻地板']],['其他地板',['架空地板','运动地板','户外地板']]]],
  ['涂料',[['墙面涂料',['乳胶漆','艺术漆','微水泥','硅藻泥']],['木器涂料',['木器漆','木蜡油']],['功能涂料',['防水涂料','防火涂料','隔热涂料','地坪漆']]]],
  ['墙纸',[['壁纸',['纯纸壁纸','无纺壁纸','PVC壁纸','金属壁纸']],['墙布',['无缝墙布','织物墙布','功能墙布']],['软包',['皮革软包','布艺软包','吸音软包']]]],
  ['玻璃',[['建筑玻璃',['钢化玻璃','夹层玻璃','中空玻璃','防火玻璃']],['装饰玻璃',['长虹玻璃','压花玻璃','彩釉玻璃','夹丝玻璃']],['智能玻璃',['调光玻璃','电致变色玻璃']]]],
  ['金属',[['金属板材',['不锈钢板','铝板','铜板','锌板']],['装饰金属',['金属网','冲孔板','拉网板','金属饰面']],['型材及构件',['铝型材','钢型材','金属线条']]]],
  ['特殊材料',[['复合材料',['树脂板','蜂窝板','碳纤维','玻璃钢']],['新型材料',['透光混凝土','柔性石材','再生材料','生物基材料']],['声学材料',['吸音板','吸声棉','隔音毡']]]],
  ['面料',[['家具面料',['棉麻','绒布','提花布','户外布']],['皮革',['真皮','再生皮','人造革']],['功能面料',['阻燃面料','防水面料','吸音面料']]]],
  ['窗帘',[['布艺窗帘',['纱帘','遮光帘','绒布帘']],['成品帘',['卷帘','百叶帘','蜂巢帘','香格里拉帘']],['窗帘配件',['轨道','电机','帘杆']]]],
  ['洁具',[['面盆与龙头',['台盆','立柱盆','面盆龙头']],['坐便器',['智能坐便器','壁挂坐便器','普通坐便器']],['淋浴系统',['花洒','淋浴房','浴缸']],['厨卫水槽',['厨房水槽','水槽龙头']]]],
  ['五金',[['门窗五金',['门锁','合页','拉手','闭门器']],['家具五金',['铰链','滑轨','连接件']],['卫浴五金',['挂件','地漏','角阀']]]],
  ['工程灯具',[['室内灯具',['筒灯','射灯','线性灯','灯带']],['户外灯具',['景观灯','庭院灯','地埋灯']],['专业灯具',['轨道灯','洗墙灯','应急灯']]]],
  ['开关面板',[['开关',['机械开关','智能开关']],['插座',['电源插座','地插','USB插座']],['控制面板',['场景面板','温控面板']]]],
  ['镜子',[['装饰镜',['壁挂镜','落地镜','艺术镜']],['功能镜',['智能镜','防雾镜','浴室镜']]]],
  ['室内分区',[['隔断',['玻璃隔断','金属隔断','木质隔断']],['活动分区',['活动隔断','折叠隔断','屏风']]]],
  ['门窗',[['门',['入户门','室内门','移门','折叠门']],['窗',['系统窗','铝合金窗','木窗']],['遮阳系统',['百叶','遮阳棚']]]],
  ['设备',[['厨房设备',['厨电','橱柜系统']],['卫浴设备',['热水系统','水处理']],['智能设备',['智能家居','安防设备']]]],
  ['楼梯及配件',[['楼梯',['钢制楼梯','木楼梯','玻璃楼梯']],['配件',['扶手','栏杆','踏步板']]]],
  ['电器',[['厨房电器',['烟机','灶具','烤箱','冰箱']],['生活电器',['洗衣机','电视','空气净化器']],['智能电器',['智能屏','智能音箱']]]],
  ['壁炉及加热器',[['壁炉',['燃木壁炉','燃气壁炉','电壁炉']],['加热器',['取暖器','暖气片','地暖']]]],
  ['家具',[['坐具',['沙发','休闲椅','餐椅','凳子']],['桌几',['餐桌','茶几','边几','书桌']],['柜类',['衣柜','边柜','书柜','电视柜']],['床具',['床','床头柜','床垫']],['户外家具',['户外桌椅','躺椅']]]],
  ['装饰灯具',[['吊灯',['艺术吊灯','餐吊灯']],['台灯',['阅读灯','装饰台灯']],['落地灯',['阅读落地灯','氛围落地灯']],['壁灯',['装饰壁灯','床头壁灯']]]],
  ['地毯',[['手工地毯',['手工打结毯','手工簇绒毯']],['机制地毯',['满铺地毯','方块地毯']],['装饰地毯',['客厅地毯','床边毯','走廊毯']]]],
  ['艺术品',[['绘画',['油画','版画','水彩']],['雕塑',['金属雕塑','石材雕塑','玻璃雕塑']],['装置艺术',['空间装置','灯光装置']]]],
  ['艺术家作品',[['原创作品',['限量作品','定制作品']],['艺术衍生',['艺术摆件','艺术家居']]]],
  ['饰品',[['摆件',['雕塑摆件','桌面摆件']],['花器',['花瓶','花盆']],['墙面饰品',['挂饰','装饰画']],['香氛',['香薰','烛台']]]],
  ['纺织品',[['床品',['床单','被套','盖毯']],['布艺用品',['靠垫','抱枕','桌布']],['卫浴纺织',['毛巾','浴袍']]]],
  ['建筑用材',[['结构材料',['钢材','混凝土','砌块']],['保温防水',['保温板','防水卷材','密封材料']],['吊顶墙体',['石膏板','龙骨','天花系统']]]],
  ['全屋定制',[['柜体定制',['橱柜','衣柜','玄关柜']],['木作定制',['护墙板','木门','书柜']],['整体空间',['厨房定制','卫浴定制','卧室定制']]]]
];

const categoryTree = [["石材",[["人造石",["水磨石","合成石","石英石"]],["天然石",["大理石","玉石"]],["石材拼花",[]],["其他",[]]]],["砖",[["通体砖",["防滑砖"]],["构件砖",[]],["玻化砖、抛光砖",[]],["砌块砖",[]],["釉面砖",["仿水磨石砖","仿大理石瓷砖"]],["红砖",[]],["艺术砖",["手工砖","花砖"]],["陶土砖",[]],["仿古砖",[]],["混凝土砖",[]],["砖条",[]],["青砖",[]],["微晶石砖",[]],["瓷片",[]],["岩板",[]],["古砖",[]],["幕墙砖",[]],["户外地砖",[]],["其他",[]]]],["木材",[["木饰面",["天然木皮","科技木皮"]],["防腐木",[]],["板材",[]],["原木",[]],["其他",[]]]],["地板",[["木地板",["木塑地板","复合木地板","强化木地板","竹地板","瓷木复合地板"]],["地胶板",[]],["石晶地板",[]],["橡胶地板",[]],["架空地板",[]],["地板组合",[]],["其他",[]]]],["涂料",[["艺术涂料",[]],["吸音涂料",[]],["乳胶漆",[]],["真石漆",[]],["自流平",[]],["地坪漆",[]],["其他",[]]]],["墙纸",[["布面墙纸",[]],["胶面墙纸",[]],["PVC墙纸",[]],["海基布",[]],["无纺布墙纸",[]],["天然材料墙纸",[]],["纸质墙纸",[]],["喷绘墙纸",[]],["手绘墙纸",[]],["刺绣墙纸",[]],["3D堆墨墙纸",[]],["金箔、银箔墙纸",[]],["其他",[]]]],["玻璃",[["单层玻璃",[]],["夹层玻璃",["夹胶玻璃","夹丝玻璃"]],["艺术玻璃、水晶",[]],["其他",[]]]],["金属",[["铜",[]],["铝",[]],["不锈钢",[]],["特殊金属",["金属网、金属丝"]],["其他",[]]]],["特殊材料",[["塑料",["树脂板"]],["编织材料",["仿藤编"]],["软瓷",[]],["光学材料",[]],["声学材料",[]],["金箔、银箔",[]],["纤维材料",[]],["纸类",[]],["装饰贴膜",[]],["预制板",[]],["马赛克",[]],["液态金属",[]],["PU仿真石",[]],["发泡陶瓷",[]],["其他",[]]]],["面料",[["一般布料",[]],["一般户外布",[]],["耐磨布",[]],["特色面料",[]],["特色户外面料",[]],["丝绸",[]],["皮革",["真皮","人造皮"]]]],["窗帘",[["窗帘布",[]],["窗纱",[]],["卷帘布",[]],["遮光布",[]],["百叶帘",[]],["罗马帘",[]],["窗帘配件",[]],["蜂巢帘",[]],["窗帘电机",[]],["其他",[]]]],["洁具",[["座便器",[]],["龙头",["台出龙头","厨房龙头"]],["地漏",[]],["洁具五金配件",[]],["淋浴组合",[]],["淋浴房",[]],["洗手盆",["厨盆"]],["小便器",[]],["浴缸",[]],["蹲便器",[]],["洁具组合",[]],["其他",[]]]],["五金",[["家具五金",[]],["装饰五金",[]],["门控五金",[]],["五金组合",[]],["其他",[]]]],["工程灯具",[["嵌入式",[]],["嵌墙式",[]],["吸顶类",[]],["线性类",[]],["柔性类",[]],["轨道类",[]],["低压轨道系统",[]],["展柜类",[]],["明装类",[]],["投射类",[]],["壁灯类",[]],["埋地类",[]],["标识类",[]],["线槽类",[]],["矮柱类",[]],["水下类",[]],["洗墙类",[]],["投光类",[]],["地埋类",[]],["线性轮廓类",[]],["壁挂式",[]],["点光类",[]],["雨棚灯",[]],["步道灯",[]],["中、高杆灯",[]],["草坪类",[]],["特殊照明类",[]],["其他",[]]]],["开关面板",[["普通开关面板",[]],["智能开关面板",[]],["配件",[]]]],["镜子",[["普通镜",[]],["银镜",[]],["魔镜",[]],["成品镜",[]],["其他",[]]]],["室内分区",[["隔断",[]],["其他",[]]]],["门窗",[["门",[]],["窗",[]]]],["设备",[["水疗基础设备",[]],["SPA设备",[]],["泳池",[]],["健身器械",[]],["安防设备",[]],["消防设备",[]],["给排水",[]],["光电设备",[]],["暖通",[]],["电梯",[]],["净水设备",[]],["文娱设备",[]],["其他",[]]]],["楼梯及配件",[["楼梯",[]],["栏杆",[]],["楼梯组件",[]],["其他",[]]]],["电器",[["餐厨电器",[]],["卫浴电器",[]],["电暖器具",[]],["生活起居电器",[]],["厨卫小家电",[]],["其他",[]]]],["壁炉及加热器",[["真火壁炉",[]],["装饰壁炉",[]],["壁炉配件",[]],["其他",[]]]],["家具",[["柜类",[]],["几类",["茶几","边几"]],["椅凳",["休闲椅","矮凳"]],["桌类",[]],["床类",[]],["沙发",["多人沙发","单人沙发"]],["活动屏风",[]],["办公家具",[]],["户外家具",[]],["娱乐家具",[]],["家具组合",[]],["其他",[]]]],["装饰灯具",[["台灯",[]],["吊灯",[]],["壁灯",[]],["落地灯",[]],["照画灯",[]],["其他",[]]]],["地毯",[["手工地毯",[]],["机加手地毯",[]],["机织地毯",[]],["移动块毯",[]],["地毯组合",[]],["其他",[]]]],["艺术品",[["挂画",[]],["艺术装置",[]],["其他",[]]]],["艺术家作品",[["水墨",[]],["油画",[]],["摄影",[]],["版画",[]],["雕塑",[]],["水彩",[]],["陶瓷",[]],["综合材料",[]],["纺织艺术",[]],["新媒体艺术",[]],["装置",[]]]],["饰品",[["摆件",[]],["书籍",[]],["餐厨饰品",[]],["卫浴饰品",[]],["植物",[]],["景观材料",[]],["仿真模型",[]],["衣帽间饰品",[]],["饰品组合",[]],["其他",[]]]],["纺织品",[["装饰纺织品",["抱枕"]],["其他",[]]]],["建筑用材",[["基层板",[]]]],["全屋定制",[["收纳系统",[]],["衣帽间系统",[]],["厨房系统",[]],["护墙板系统",[]],["门系统",[]],["色板",[]],["其他",[]]]]];
const filterBrands=[['3M',''],['AUSTROFLAMM','奥地利壁炉'],['AXOR','雅生'],['Artemide','阿特米德'],['B&B Italia',''],['Baker','贝克家具'],['Cappellini','卡佩里尼'],['CEA',''],['Duravit','杜拉维特'],['Edra','埃德拉'],['Flos','弗洛斯'],['GROHE','高仪'],['GUBI','古比'],['Hansgrohe','汉斯格雅'],['HAY',''],['Ideal Standard','理想标准'],['JUNG','永诺'],['Kartell','卡特尔'],['Kvadrat','克瓦德拉特'],['LEXINGTON','莱克星顿'],['Ligne Roset','写意空间'],['MIRAGE','米拉珥陶瓷'],['Minotti','米洛提'],['Molteni&C',''],['Nobilia','柏丽'],['Occhio','奥可乔'],['Poliform','博洛尼夫'],['Porro','波洛'],['Quooker','酷科'],['Rimadesio','瑞玛迪斯奥'],['Roca','乐家'],['SieMatic','西曼帝克'],['Smeg','斯麦格'],['TOTO','东陶'],['USM',''],['Valcucine','万古奇'],['Vitra','维特拉'],['Walter Knoll','沃尔特诺尔'],['XAL',''],['Yabu Pushelberg','雅布'],['Zanotta','扎诺塔']];
const categoryPopover=document.querySelector('#categoryPopover'),brandPopover=document.querySelector('#brandPopover');
const categoryButton=document.querySelector('#categoryFilterButton'),brandButton=document.querySelector('#brandFilterButton'),colorButton=document.querySelector('#colorFilterButton'),priceButton=document.querySelector('#priceFilterButton');
const colorPopover=document.querySelector('#colorPopover'),pricePopover=document.querySelector('#pricePopover');
const readFilterHistory=(key,fallback)=>{try{const raw=localStorage.getItem(key);if(raw===null)return fallback;const value=JSON.parse(raw);return Array.isArray(value)?value:fallback}catch{return fallback}};
const saveFilterHistory=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
const brandName=([en,cn])=>cn||en;
const findBrand=name=>filterBrands.find(item=>brandName(item)===name);
const rememberValue=(list,value,limit=6)=>value?[value,...list.filter(item=>item!==value)].slice(0,limit):list;
const frequentBrandNames=['高仪','西曼帝克','雅生','万古奇','弗洛斯','米洛提'];
let recentCategories=readFilterHistory('materialRecentCategories',['石材 / 天然石 / 大理石','家具 / 椅凳 / 休闲椅','地毯 / 手工地毯']);
let recentBrands=readFilterHistory('materialRecentBrands',['高仪','西曼帝克','雅生']);
let favoriteBrands=readFilterHistory('materialFavoriteBrands',['弗洛斯','万古奇']);
let activeTop=0,activeSecond=0,selectedCategory='',selectedBrand='';
function closeFilters(){categoryPopover.classList.remove('open');brandPopover.classList.remove('open');colorPopover.classList.remove('open');pricePopover.classList.remove('open');categoryButton.classList.remove('open');brandButton.classList.remove('open');colorButton.classList.remove('open');priceButton.classList.remove('open')}
function toggleFilter(popover,button){const open=popover.classList.contains('open');closeFilters();if(!open){popover.classList.add('open');button.classList.add('open')}}
categoryButton.addEventListener('click',e=>{e.stopPropagation();if(!categoryPopover.classList.contains('open'))renderAggregatedCategories();toggleFilter(categoryPopover,categoryButton)});brandButton.addEventListener('click',e=>{e.stopPropagation();if(!brandPopover.classList.contains('open'))renderBrands(document.querySelector('#brandSearch').value);toggleFilter(brandPopover,brandButton)});
colorButton.addEventListener('click',e=>{e.stopPropagation();renderColorOptions();toggleFilter(colorPopover,colorButton)});priceButton.addEventListener('click',e=>{e.stopPropagation();renderPriceState();toggleFilter(pricePopover,priceButton)});
document.addEventListener('click',e=>{if(!e.target.closest('.filter-popover')&&!e.target.closest('.filter-entry'))closeFilters()});
function renderRecentCategories(){
  const section=document.querySelector('#categoryRecentSection'),box=document.querySelector('#recentCategoryList');box.innerHTML='';section.classList.toggle('empty',!recentCategories.length);
  recentCategories.forEach(path=>{const b=document.createElement('button');b.className=`quick-filter-chip${selectedCategory===path?' active':''}`;b.textContent=path;b.title=path;b.onclick=()=>applyCategory(path);box.appendChild(b)});
}
function applyCategory(path,keepOpen=false){selectedCategory=path;recentCategories=rememberValue(recentCategories,path);saveFilterHistory('materialRecentCategories',recentCategories);document.querySelector('#categoryFilterText').textContent=path.split(' / ').pop();if(!keepOpen)closeFilters();updateActiveFilters();renderRecentCategories();if(document.querySelector('#categoryOverview'))renderAggregatedCategories();renderResults('whole',620)}
function renderAggregatedCategories(){
  document.querySelector('#categoryRecentSection').classList.remove('empty');renderRecentCategories();
  const one=document.querySelector('#categoryLevelOne'),overview=document.querySelector('#categoryOverview');one.innerHTML='';overview.innerHTML='';
  categoryTree.forEach(([name],i)=>{
    const row=document.createElement('div'),selected=selectedCategory===name;row.className=`category-option category-branch${i===activeTop?' active':''}${selected?' selected-filter':''}`;
    row.innerHTML=`<button class="category-label"><span>${name}${selected?'<em>筛选中</em>':''}</span></button><button class="category-expand" aria-label="展开${name}的子分类">›</button>`;
    const expand=()=>{if(activeTop!==i){activeTop=i;renderAggregatedCategories()}};
    row.querySelector('.category-label').onclick=()=>applyCategory(name,false);row.querySelector('.category-expand').onclick=e=>{e.stopPropagation();expand()};row.onmouseenter=expand;one.appendChild(row);
  });
  const [topName,seconds]=categoryTree[activeTop],plain=seconds.filter(([,thirds])=>!thirds.length),nested=seconds.filter(([,thirds])=>thirds.length);overview.innerHTML=`<div class="category-overview-head"><div><small>CATEGORY</small><h3>${topName}</h3></div><span>${seconds.length} 个二级分类${nested.length?` · ${nested.length} 个包含三级分类`:''}</span></div><div class="category-plain-section" ${plain.length?'':'hidden'}><div class="category-section-label">二级分类</div><div class="category-plain-grid"></div></div><div class="category-nested-section" ${nested.length?'':'hidden'}><div class="category-section-label">包含三级分类</div><div class="category-card-grid"></div></div>`;
  const plainGrid=overview.querySelector('.category-plain-grid');plain.forEach(([secondName])=>{const path=`${topName} / ${secondName}`,b=document.createElement('button');b.className=`category-plain-chip${selectedCategory===path?' selected-filter':''}`;b.textContent=secondName;b.onclick=()=>applyCategory(path,false);plainGrid.appendChild(b)});
  const cardGrid=overview.querySelector('.category-card-grid');nested.forEach(([secondName,thirds])=>{const secondPath=`${topName} / ${secondName}`,group=document.createElement('section');group.className=`category-subgroup-card${selectedCategory===secondPath?' selected-filter':''}`;group.innerHTML=`<button class="category-subgroup-head"><span>${secondName}</span><i>筛选此类 ›</i></button><div class="category-leaf-grid"></div>`;group.querySelector('.category-subgroup-head').onclick=()=>applyCategory(secondPath,false);const leafGrid=group.querySelector('.category-leaf-grid');thirds.forEach(name=>{const path=`${secondPath} / ${name}`,b=document.createElement('button');b.className=`category-leaf-chip${selectedCategory===path?' selected-filter':''}`;b.textContent=name;b.onclick=()=>applyCategory(path,false);leafGrid.appendChild(b)});cardGrid.appendChild(group)});
}
function applyBrand(name){selectedBrand=name;if(name){recentBrands=rememberValue(recentBrands,name);saveFilterHistory('materialRecentBrands',recentBrands)}document.querySelector('#brandFilterText').textContent=name||'全部品牌';closeFilters();updateActiveFilters();renderBrands(document.querySelector('#brandSearch').value);renderResults('whole',620)}
function syncFilterButtons(){categoryButton.classList.toggle('has-value',!!selectedCategory);brandButton.classList.toggle('has-value',!!selectedBrand);colorButton.classList.toggle('has-value',!!selectedColors.length);priceButton.classList.toggle('has-value',!!selectedPrice.label)}
function updateActiveFilters(){
  const row=document.querySelector('#activeFilterRow');row.innerHTML='';
  if(selectedCategory)row.insertAdjacentHTML('beforeend',`<span class="active-filter-chip">${selectedCategory}<button data-type="category">×</button></span>`);
  if(selectedBrand)row.insertAdjacentHTML('beforeend',`<span class="active-filter-chip">${selectedBrand}<button data-type="brand">×</button></span>`);
  if(selectedColors.length)row.insertAdjacentHTML('beforeend',`<span class="active-filter-chip">色系：${selectedColors.length===1?selectedColors[0]:`${selectedColors.length} 项`}<button data-type="color">×</button></span>`);
  if(selectedPrice.label)row.insertAdjacentHTML('beforeend',`<span class="active-filter-chip">价格：${selectedPrice.label}<button data-type="price">×</button></span>`);
  row.classList.toggle('show',!!(selectedCategory||selectedBrand||selectedColors.length||selectedPrice.label));syncFilterButtons();
  row.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.type==='category'){selectedCategory='';document.querySelector('#categoryFilterText').textContent='全部分类'}else if(b.dataset.type==='brand'){selectedBrand='';document.querySelector('#brandFilterText').textContent='全部品牌'}else if(b.dataset.type==='color'){selectedColors=[];document.querySelector('#colorFilterText').textContent='全部色系';renderColorOptions()}else{selectedPrice={min:null,max:null,label:''};document.querySelector('#priceFilterText').textContent='不限价格';renderPriceState()}updateActiveFilters();renderResults(currentResultGroup,350)})
}
function toggleFavorite(name){favoriteBrands=favoriteBrands.includes(name)?favoriteBrands.filter(item=>item!==name):[name,...favoriteBrands];saveFilterHistory('materialFavoriteBrands',favoriteBrands);renderBrands(document.querySelector('#brandSearch').value)}
function renderCompactBrandGroup(id,names,emptyText){
  const box=document.querySelector(id);box.innerHTML='';const items=names.map(findBrand).filter(Boolean).slice(0,5);if(!items.length){box.innerHTML=`<span class="brand-compact-empty">${emptyText}</span>`;return}
  items.forEach(item=>{const name=brandName(item),b=document.createElement('button');b.className=`brand-compact-chip${selectedBrand===name?' active':''}`;b.textContent=name;b.title=name;b.onclick=()=>applyBrand(name);box.appendChild(b)});
}
function renderBrandDiscovery(){renderCompactBrandGroup('#recentBrandList',recentBrands,'暂无记录');renderCompactBrandGroup('#frequentBrandList',frequentBrandNames,'暂无数据');renderCompactBrandGroup('#favoriteBrandList',favoriteBrands,'暂未收藏')}
function brandInitial([en]){const initial=(en.trim()[0]||'#').toUpperCase();return /^[A-Z]$/.test(initial)?initial:'#'}
function createDirectoryBrandButton(item){
  const [en,cn]=item,name=brandName(item),b=document.createElement('button'),star=document.createElement('button');b.className=`brand-filter-option${selectedBrand===name?' active':''}`;b.innerHTML=`<strong>${name}</strong>${cn&&en?`<span>${en}</span>`:''}`;b.onclick=()=>applyBrand(name);star.className=`brand-favorite-toggle${favoriteBrands.includes(name)?' saved':''}`;star.textContent=favoriteBrands.includes(name)?'★':'☆';star.title=favoriteBrands.includes(name)?'取消收藏':'添加收藏';star.setAttribute('aria-label',star.title);star.onclick=e=>{e.stopPropagation();toggleFavorite(name)};b.appendChild(star);return b;
}
function renderBrands(query=''){
  const q=query.trim().toLowerCase(),shortcuts=document.querySelector('#brandDiscovery'),scroll=document.querySelector('#brandDirectoryScroll'),index=document.querySelector('#brandLetterIndex'),title=document.querySelector('#brandDirectoryTitle'),summary=document.querySelector('#brandSearchSummary');
  shortcuts.classList.toggle('searching',!!q);renderBrandDiscovery();scroll.innerHTML='';index.innerHTML='';
  const matches=filterBrands.filter(([en,cn])=>(en+cn).toLowerCase().includes(q)).sort((a,b)=>brandInitial(a).localeCompare(brandInitial(b))||a[0].localeCompare(b[0]));
  title.textContent=q?'搜索结果':'全部品牌';summary.textContent=q?`找到 ${matches.length} 个相关品牌`:`共 ${filterBrands.length} 个品牌 · 按英文名或拼音首字母排序`;
  if(!matches.length){index.style.display='none';scroll.innerHTML='<div class="brand-search-empty"><strong>未找到相关品牌</strong><span>请尝试中文名、英文名或其他关键词</span></div>';return}
  index.style.display='grid';const grouped=new Map();matches.forEach(item=>{const letter=brandInitial(item);if(!grouped.has(letter))grouped.set(letter,[]);grouped.get(letter).push(item)});
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('').forEach(letter=>{const b=document.createElement('button'),available=grouped.has(letter);b.className=`brand-letter-button${available?'':' disabled'}`;b.textContent=letter;b.disabled=!available;if(available)b.onclick=()=>{const group=document.querySelector(`#brand-letter-${letter==='#'?'other':letter}`);scroll.scrollTo({top:group.offsetTop,behavior:'smooth'});setActiveLetter(letter)};index.appendChild(b)});
  grouped.forEach((items,letter)=>{const group=document.createElement('section'),grid=document.createElement('div');group.className='brand-letter-group';group.id=`brand-letter-${letter==='#'?'other':letter}`;group.innerHTML=`<h4 class="brand-letter-heading">${letter}<span>${items.length} 个品牌</span></h4>`;grid.className='brand-letter-grid';items.forEach(item=>grid.appendChild(createDirectoryBrandButton(item)));group.appendChild(grid);scroll.appendChild(group)});
  const setActiveLetter=letter=>index.querySelectorAll('.brand-letter-button').forEach(b=>b.classList.toggle('active',b.textContent===letter));setActiveLetter(grouped.keys().next().value);
  scroll.onscroll=()=>{let current=grouped.keys().next().value;scroll.querySelectorAll('.brand-letter-group').forEach(group=>{if(group.offsetTop<=scroll.scrollTop+16)current=group.querySelector('.brand-letter-heading').childNodes[0].textContent.trim()});setActiveLetter(current)};
}
document.querySelector('#categoryReset').onclick=()=>{selectedCategory='';document.querySelector('#categoryFilterText').textContent='全部分类';document.querySelector('#categorySearch').value='';updateActiveFilters();renderAggregatedCategories();closeFilters();renderResults('whole',500)};
document.querySelector('#brandReset').onclick=()=>{document.querySelector('#brandSearch').value='';applyBrand('');renderBrands()};document.querySelector('#brandSearch').addEventListener('input',e=>renderBrands(e.target.value));
document.querySelector('#categorySearch').addEventListener('input',e=>{const q=e.target.value.trim(),recentSection=document.querySelector('#categoryRecentSection');if(!q){recentSection.classList.remove('empty');renderAggregatedCategories();return}recentSection.classList.add('empty');const one=document.querySelector('#categoryLevelOne'),overview=document.querySelector('#categoryOverview');one.innerHTML='';overview.innerHTML='<div class="category-search-results"></div>';const results=overview.firstElementChild;let count=0;categoryTree.forEach(([top,seconds])=>{if(top.includes(q)){const b=document.createElement('button');b.className='category-search-result';b.textContent=top;b.onclick=()=>applyCategory(top);results.appendChild(b);count++}seconds.forEach(([second,thirds])=>{const secondPath=`${top} / ${second}`;if(second.includes(q)){const b=document.createElement('button');b.className='category-search-result';b.textContent=secondPath;b.onclick=()=>applyCategory(secondPath);results.appendChild(b);count++}thirds.forEach(third=>{if(third.includes(q)){const path=`${secondPath} / ${third}`,b=document.createElement('button');b.className='category-search-result';b.textContent=path;b.onclick=()=>applyCategory(path);results.appendChild(b);count++}})})});if(!count)overview.innerHTML='<div class="category-overview-empty">未找到相关分类</div>'});
function renderColorOptions(){
  const box=document.querySelector('#colorFilterGrid');box.innerHTML='';
  colorOptions.forEach(item=>{const button=document.createElement('button');button.className=`color-filter-option${selectedColors.includes(item.label)?' active':''}`;button.dataset.label=item.label;button.setAttribute('aria-pressed',selectedColors.includes(item.label));button.innerHTML=`<img src="${item.icon}" alt="" /><span>${item.label}</span>`;button.onclick=e=>{e.stopPropagation();selectedColors=selectedColors.includes(item.label)?selectedColors.filter(label=>label!==item.label):[...selectedColors,item.label];document.querySelector('#colorFilterText').textContent=selectedColors.length?selectedColors.length===1?selectedColors[0]:`${selectedColors.length} 项色系`:'全部色系';renderColorOptions();updateActiveFilters();renderResults(currentResultGroup,280)};box.appendChild(button)});
  document.querySelector('#colorSelectionSummary').textContent=selectedColors.length?`已选择 ${selectedColors.length} 个色系`:'未选择色系';
}
function applyPriceRange(min,max,label){selectedPrice={min,max,label};document.querySelector('#priceFilterText').textContent=label||'不限价格';document.querySelector('#priceHelper').textContent='可选择常用区间，或输入自定义价格';document.querySelector('#priceHelper').classList.remove('error');renderPriceState();updateActiveFilters();renderResults(currentResultGroup,300)}
function renderPriceState(){
  document.querySelectorAll('#pricePresetGrid button').forEach(button=>{const min=button.dataset.min===''?null:Number(button.dataset.min),max=button.dataset.max===''?null:Number(button.dataset.max);button.classList.toggle('active',selectedPrice.min===min&&selectedPrice.max===max&&((!selectedPrice.label&&min===null&&max===null)||selectedPrice.label===button.textContent))});
}
document.querySelector('#colorReset').onclick=()=>{selectedColors=[];document.querySelector('#colorFilterText').textContent='全部色系';renderColorOptions();updateActiveFilters();renderResults(currentResultGroup,300)};
document.querySelector('#colorDone').onclick=closeFilters;
document.querySelector('#pricePresetGrid').addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;const min=button.dataset.min===''?null:Number(button.dataset.min),max=button.dataset.max===''?null:Number(button.dataset.max),label=min===null&&max===null?'':button.textContent;document.querySelector('#minPriceInput').value='';document.querySelector('#maxPriceInput').value='';applyPriceRange(min,max,label);closeFilters()});
document.querySelector('#priceReset').onclick=()=>{document.querySelector('#minPriceInput').value='';document.querySelector('#maxPriceInput').value='';applyPriceRange(null,null,'')};
document.querySelectorAll('#minPriceInput,#maxPriceInput').forEach(input=>input.addEventListener('input',()=>{input.value=input.value.replace(/\D/g,'').slice(0,8)}));
document.querySelector('#priceConfirm').onclick=()=>{const minValue=document.querySelector('#minPriceInput').value,maxValue=document.querySelector('#maxPriceInput').value,min=minValue===''?null:Number(minValue),max=maxValue===''?null:Number(maxValue),helper=document.querySelector('#priceHelper');if(min!==null&&max!==null&&min>max){helper.textContent='最低价不能高于最高价';helper.classList.add('error');return}const label=min!==null&&max!==null?`¥${min}–${max}`:min!==null?`¥${min} 以上`:max!==null?`¥${max} 以下`:'';applyPriceRange(min,max,label);closeFilters()};
renderAggregatedCategories();renderBrands();renderColorOptions();renderPriceState();updateActiveFilters();
