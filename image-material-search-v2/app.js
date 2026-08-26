const sampleImage = 'assets/room-v2.png';

const recognizedObjects = [
  { id:'sofa-1', nameEn:'sofa', nameZh:'沙发', box:{x:29,y:49,width:70,height:31}, position:'76% 63%' },
  { id:'rug-1', nameEn:'rug', nameZh:'地毯', box:{x:0,y:66,width:100,height:34}, position:'50% 91%' },
  { id:'table-1', nameEn:'coffee table', nameZh:'茶几', box:{x:35,y:67,width:30,height:23}, position:'50% 78%' },
  { id:'cabinet-1', nameEn:'cabinet', nameZh:'展示柜', box:{x:58,y:10,width:36,height:43}, position:'78% 25%' },
  { id:'chair-1', nameEn:'chair', nameZh:'单椅', box:{x:0,y:52,width:25,height:30}, position:'12% 68%' }
];

const overflowObjects = [
  ...recognizedObjects,
  { id:'sofa-2', nameEn:'sofa', nameZh:'双人沙发', box:{x:43,y:50,width:34,height:25}, position:'57% 62%' },
  { id:'chair-2', nameEn:'chair', nameZh:'休闲椅', box:{x:4,y:54,width:18,height:28}, position:'13% 68%' },
  { id:'table-2', nameEn:'coffee table', nameZh:'边几', box:{x:27,y:61,width:13,height:18}, position:'34% 72%' },
  { id:'cabinet-2', nameEn:'cabinet', nameZh:'电视柜', box:{x:61,y:34,width:31,height:18}, position:'77% 44%' },
  { id:'lamp-1', nameEn:'lamp', nameZh:'落地灯', box:{x:21,y:23,width:12,height:39}, position:'28% 40%' },
  { id:'curtain-1', nameEn:'curtain', nameZh:'窗帘', box:{x:0,y:6,width:23,height:50}, position:'10% 30%' },
  { id:'wall-1', nameEn:'wall', nameZh:'墙面', box:{x:55,y:5,width:42,height:34}, position:'78% 23%' }
];

const products = {
  whole:[
    ['whole-black-chair','黑色弧背休闲椅','Minotti','¥ 9,680',9680,'sofa','#dedbd7','#292827','家具','黑色系'],
    ['whole-sofa','米洛弧形沙发组合','HC28','¥ 8,960',8960,'sofa','#eee9e3','#d9d2ca','家具','米黄色系'],
    ['whole-rug','几何边框羊毛地毯','WEI Studio','¥ 3,260',3260,'rug','#ded8cf','#b99075','地毯','棕色系'],
    ['whole-table','圆形大理石茶几','Poliform','¥ 6,480',6480,'table','#ece9e4','#a9a198','家具','白色系'],
    ['whole-cabinet','开放展示柜','Molteni&C','¥ 18,600',18600,'cabinet','#d9d3cb','#40342d','家具','深木色系'],
    ['whole-wall','深木色木饰面','CLEAF','¥ 680 /m²',680,'material','#8b6c57','#785641','木材','深木色系'],
    ['whole-stone','浅灰石纹大理石','Inalco','¥ 980 /m²',980,'material','#ddd9d2','#d5d1ca','石材','灰色系'],
    ['whole-curtain','深棕色绒面窗帘','如鱼得水','¥ 420 /m',420,'material','#665046','#5a4138','窗帘','棕色系'],
    ['whole-chair','赤陶红休闲单椅','Cassina','¥ 12,600',12600,'sofa','#e5ddd7','#a6563f','家具','红色系']
  ],
  sofa:[
    ['sofa-a','米洛弧形沙发组合','HC28','¥ 8,960',8960,'sofa','#ebe7e1','#dad4ce','家具','白色系'],
    ['sofa-b','云屿弧形沙发','NORHOR','¥ 7,980',7980,'sofa','#e9e4dc','#d4c9bc','家具','米黄色系'],
    ['sofa-c','贝壳弧形沙发','B&B Italia','¥ 12,800',12800,'sofa','#e7e2dc','#cfc7bf','家具','米黄色系'],
    ['sofa-d','柔屿弧形沙发','Molteni&C','¥ 10,600',10600,'sofa','#e6e2dc','#d9d4ce','家具','白色系'],
    ['sofa-e','斯特林弧形沙发','美克美家','¥ 6,980',6980,'sofa','#e7dfd5','#d5c7b8','家具','米黄色系'],
    ['sofa-f','月影弧形沙发','汇艺','¥ 7,480',7480,'sofa','#e7e4df','#c9c6c1','家具','灰色系'],
    ['sofa-g','云朵弧形沙发','BoConcept','¥ 9,260',9260,'sofa','#dfd8ce','#bcae9e','家具','棕色系'],
    ['sofa-h','泡泡弧形沙发','FENDI Casa','¥ 18,600',18600,'sofa','#eeeae4','#ded7ce','家具','白色系']
  ],
  rug:[
    ['rug-a','米灰几何羊毛地毯','GAN','¥ 3,280',3280,'rug','#dfdbd4','#b29b87','地毯','米黄色系'],
    ['rug-b','手工编织边框地毯','cc-tapis','¥ 5,860',5860,'rug','#d8d0c6','#8b6750','地毯','棕色系'],
    ['rug-c','低饱和拼色地毯','Kvadrat','¥ 4,680',4680,'rug','#d8d4cf','#8b8881','地毯','灰色系'],
    ['rug-d','山形纹羊毛地毯','GAN','¥ 3,960',3960,'rug','#e6e1d9','#9d8975','地毯','米黄色系'],
    ['rug-e','深棕手工结地毯','Limited Edition','¥ 6,200',6200,'rug','#d3c6bb','#5f4435','地毯','棕色系'],
    ['rug-f','抽象线性地毯','Moooi Carpets','¥ 7,100',7100,'rug','#ddd9d3','#6d6b67','地毯','灰色系']
  ],
  table:[
    ['table-a','圆形大理石茶几','Poliform','¥ 6,480',6480,'table','#ece9e3','#a49c92','家具','白色系'],
    ['table-b','云纹石材茶几','Baxter','¥ 8,900',8900,'table','#e8e4de','#9a8b7d','家具','米黄色系'],
    ['table-c','黑色岩板茶几','Minotti','¥ 7,260',7260,'table','#d2d0cd','#4a4642','家具','黑色系'],
    ['table-d','浅洞石圆几','HAY','¥ 4,580',4580,'table','#e6ddd0','#c6b094','家具','米黄色系'],
    ['table-e','金属底座边几','Cassina','¥ 5,100',5100,'table','#e7e4df','#8f8377','家具','灰色系'],
    ['table-f','胡桃木矮茶几','Riva 1920','¥ 9,800',9800,'table','#ddd5cc','#76503a','家具','深木色系']
  ],
  cabinet:[
    ['cabinet-a','开放式金属展示柜','Molteni&C','¥ 18,600',18600,'cabinet','#ded9d2','#3f342d','家具','深木色系'],
    ['cabinet-b','胡桃木开放书柜','Poliform','¥ 21,800',21800,'cabinet','#d9d1c8','#604431','家具','深木色系'],
    ['cabinet-c','黑色层板展示架','USM','¥ 15,200',15200,'cabinet','#ddd9d4','#33312f','家具','黑色系'],
    ['cabinet-d','轻奢金属陈列柜','Rimadesio','¥ 23,600',23600,'cabinet','#ded7ce','#6c5949','家具','棕色系'],
    ['cabinet-e','模块化墙面书柜','Lema','¥ 16,900',16900,'cabinet','#e3ded7','#8a7460','家具','浅木色系'],
    ['cabinet-f','深木色收藏柜','Porro','¥ 19,500',19500,'cabinet','#d8d2cb','#4d382c','家具','深木色系']
  ],
  chair:[
    ['chair-a','赤陶红软包单椅','Cassina','¥ 12,600',12600,'sofa','#e1d8d2','#a5523c','家具','红色系'],
    ['chair-b','高背休闲单椅','Baxter','¥ 9,800',9800,'sofa','#ddd7d0','#745442','家具','棕色系'],
    ['chair-c','弧背布艺扶手椅','Minotti','¥ 8,600',8600,'sofa','#e6e0d9','#c2b4a6','家具','米黄色系'],
    ['chair-d','雕塑感休闲椅','Vitra','¥ 7,200',7200,'sofa','#dfdbd6','#77716a','家具','灰色系'],
    ['chair-e','低靠背阅读椅','Poliform','¥ 10,400',10400,'sofa','#e7e2dc','#d1c7bd','家具','白色系'],
    ['chair-f','胡桃木皮革单椅','Riva 1920','¥ 11,900',11900,'sofa','#ddd5cd','#6e4937','家具','深木色系']
  ],
  material:[
    ['mat-a','米白肌理布','JAB Anstoetz','¥ 268 /m',268,'material','#ded5c7','#ded5c7','一般布料','米黄色系','repeating-linear-gradient(45deg,#ded7ca 0 2px,#c8beae 2px 3px)'],
    ['mat-b','浅驼色粗麻布','C&C Milano','¥ 198 /m',198,'material','#b9a08d','#b9a08d','一般布料','棕色系','repeating-linear-gradient(90deg,#aa8d76 0 2px,#d0b9a4 2px 4px)'],
    ['mat-c','暖沙色绒布','M&D Milano','¥ 298 /m',298,'material','#c7b2a2','#c7b2a2','耐磨布','米黄色系','linear-gradient(135deg,#d2c0b1,#b39c8c)'],
    ['mat-d','奶油白 Bouclé','Casamance','¥ 358 /m',358,'material','#e5ddcf','#e5ddcf','特色面料','白色系','radial-gradient(circle,#cfc3b0 0 1px,#eee8de 2px 5px)'],
    ['mat-e','浅灰色科技绒','Lelièvre','¥ 228 /m',228,'material','#c4c1bb','#c4c1bb','耐磨布','灰色系','repeating-linear-gradient(45deg,#b9b6b0 0 1px,#d5d2cc 1px 3px)'],
    ['mat-f','燕麦色亚麻布','Romo','¥ 228 /m',228,'material','#c9b8a4','#c9b8a4','一般户外布','米黄色系','repeating-linear-gradient(90deg,#baa58e 0 1px,#dbcdbd 1px 4px)'],
    ['mat-g','雾灰色粗纹布','Kvadrat','¥ 318 /m',318,'material','#85827e','#85827e','特色户外面料','灰色系','repeating-linear-gradient(45deg,#77736f 0 2px,#aaa6a0 2px 4px)'],
    ['mat-h','深咖色绒布','Ultrafabrics','¥ 368 /m',368,'material','#554035','#554035','特色面料','棕色系','linear-gradient(135deg,#675044,#402e27)'],
    ['mat-i','米杏色细纹布','Dedar','¥ 248 /m',248,'material','#d2c2ae','#d2c2ae','丝绸','米黄色系','repeating-linear-gradient(0deg,#cab9a5 0 1px,#e0d3c2 1px 3px)'],
    ['mat-j','浅卡其真皮','Roche Bobois','¥ 588 /m²',588,'material','#bda78d','#bda78d','真皮','棕色系','radial-gradient(circle at 20% 30%,#ad967c 0 1px,#c6b39b 2px 8px)']
  ]
};

const DEMO_RESULTS_PER_GROUP = 30;
const demoVariantLabels = ['轻盈款','舒适款','雅致款','臻选款','设计款'];

Object.entries(products).forEach(([group,rows])=>{
  const baseRows = rows.map(row=>[...row]);
  products[group] = Array.from({length:DEMO_RESULTS_PER_GROUP},(_,index)=>{
    const row = [...baseRows[index % baseRows.length]];
    const variantIndex = Math.floor(index / baseRows.length);
    if(variantIndex > 0){
      row[0] = `${row[0]}-demo-${variantIndex + 1}`;
      row[1] = `${row[1]} · ${demoVariantLabels[(variantIndex - 1) % demoVariantLabels.length]}`;
    }
    return row;
  });
});

const categoryTree = {
  '石材':[['一般分类',['天然石材','人造石材','石材拼花']]],
  '砖':[['一般分类',['通体砖','釉面砖','艺术砖','岩板']]],
  '木材':[['一般分类',['木饰面','板材','原木','防腐木']]],
  '地板':[['一般分类',['木地板','地胶板','石晶地板','橡胶地板']]],
  '涂料':[['一般分类',['艺术涂料','乳胶漆','真石漆','地坪漆']]],
  '墙纸':[['一般分类',['布面墙纸','胶面墙纸','无纺布墙纸','天然材料墙纸']]],
  '玻璃':[['一般分类',['单层玻璃','夹层玻璃','艺术玻璃、水晶']]],
  '金属':[['一般分类',['铜','铝','不锈钢','特殊金属']]],
  '特殊材料':[['一般分类',['塑料','软瓷','光学材料','声学材料']]],
  '面料':[
    ['面料',['一般布料','一般户外布','耐磨布','特色面料','特色户外面料','丝绸']],
    ['皮革',['真皮','人造皮']]
  ]
};

const brands = ['全部品牌','B&B Italia','Baxter','BoConcept','Cassina','HC28','Kvadrat','Minotti','Molteni&C','NORHOR','Poliform','Romo','WEI Studio'];
const colors = [
  ['白色系','#f2f0eb'],['米黄色系','#d9c7a9'],['浅木色系','#c79c6f'],['深木色系','#654936'],
  ['灰色系','#9b9995'],['棕色系','#76503c'],['红色系','#a55145'],['绿色系','#66806c'],
  ['蓝色系','#687e99'],['黑色系','#333331']
];
const pricePresets = [
  {label:'不限价格',min:null,max:null},{label:'¥ 500 以下',min:null,max:500},
  {label:'¥ 500–3,000',min:500,max:3000},{label:'¥ 3,000–10,000',min:3000,max:10000},
  {label:'¥ 10,000 以上',min:10000,max:null}
];

const state = {
  view:'landing', hasImage:true, imageUrl:sampleImage, imageName:'客厅效果图.jpg', recognitionStatus:'loading',
  objects:[], selectedObjectId:null, manualSelection:null, searchMode:'similar', resultsMode:'whole',
  filters:{category:'',brand:'',color:'',price:{label:'',min:null,max:null}}, sort:'default',
  selectedGroups:new Map(), batchSelected:new Set(), openFilter:null, recognitionTimer:null, resultTimer:null, objectUrl:null, uploadIntent:'similar', pendingUploadIntent:'similar',
  objectGuideShown:false, objectGuideVisible:false, objectGuideTimer:null, demoState:'recognized',
  imageSources:[], currentSourceId:null, sourceCounter:0, pendingAddSource:false, pendingImageFile:null, imageInputValue:'',
  groupMeta:new Map(), aiResults:[], activeAiResultId:null, aiResultCounter:0, manualCounter:0,
  imageZoom:1, zoomOrigin:{x:50,y:50}, purposeBackup:null,
  otherSearchDraft:'', otherSearchQuery:'', otherSearchTimer:null,
  modeFilterState:{similar:null,other:null}
};

const $ = selector => document.querySelector(selector);
const landingView = $('#landingView');
const searchView = $('#searchView');
const imageFile = $('#imageFile');
const sourceImage = $('#sourceImage');
const imageStage = $('#imageStage');
const imageCanvas = $('#imageCanvas');
const recognitionHighlight = $('#recognitionHighlight');
const manualSelection = $('#manualSelection');
const aiExtractionHighlight = $('#aiExtractionHighlight');
const canvasAiMenu = $('#canvasAiMenu');
const productGrid = $('#productGrid');
const filterPopover = $('#filterPopover');
const drawer = $('#selectedDrawer');
const drawerBackdrop = $('#drawerBackdrop');
const exitModal = $('#exitModal');
const exitModalBackdrop = $('#exitModalBackdrop');

function showToast(message){
  const toast = $('#toast');
  clearTimeout(showToast.timer);
  toast.textContent = message;
  toast.classList.add('show');
  showToast.timer = setTimeout(()=>toast.classList.remove('show'),2200);
}

function productFromRow(row){
  const [id,name,brand,price,priceValue,art,photoBg,objectColor,category,color,pattern] = row;
  return {id,name,brand,price,priceValue,art,photoBg,objectColor,category,color,pattern};
}

function currentSource(){return state.imageSources.find(source=>source.id===state.currentSourceId) || null}

function sourceSnapshot(){
  return {
    id:state.currentSourceId,name:state.imageName,url:state.imageUrl,inputValue:state.imageInputValue || state.imageName,
    recognitionStatus:state.recognitionStatus,objects:state.objects,selectedObjectId:state.selectedObjectId,
    manualSelection:state.manualSelection,searchMode:state.searchMode,resultsMode:state.resultsMode,
    selectedGroups:state.selectedGroups,groupMeta:state.groupMeta,aiResults:state.aiResults,
    activeAiResultId:state.activeAiResultId,aiResultCounter:state.aiResultCounter,manualCounter:state.manualCounter,
    otherSearchDraft:state.otherSearchDraft,otherSearchQuery:state.otherSearchQuery
    ,imageZoom:state.imageZoom,zoomOrigin:{...state.zoomOrigin}
  };
}

function saveCurrentSource(){
  const index=state.imageSources.findIndex(source=>source.id===state.currentSourceId);
  if(index<0)return;
  state.imageSources[index]={...state.imageSources[index],...sourceSnapshot()};
}

function createImageSource(url,name,inputValue=name){
  const id=`source-${++state.sourceCounter}`;
  return {id,name:name||`效果图 ${state.sourceCounter}`,url,inputValue,recognitionStatus:'loading',objects:[],selectedObjectId:null,
    manualSelection:null,searchMode:'similar',resultsMode:'whole',selectedGroups:new Map(),groupMeta:new Map(),aiResults:[],
    activeAiResultId:null,aiResultCounter:0,manualCounter:0,otherSearchDraft:'',otherSearchQuery:'',imageZoom:1,zoomOrigin:{x:50,y:50}};
}

function renderImageSources(){
  const strip=$('#imageSourceStrip');
  const visible=state.uploadIntent==='materials'&&state.hasImage&&state.imageSources.length>0;
  strip.hidden=!visible;
  $('.image-column').classList.toggle('materials-workspace',visible);
  if(!visible){strip.innerHTML='';return;}
  strip.innerHTML='';
  state.imageSources.forEach((source,index)=>{
    const button=document.createElement('button');
    button.type='button';button.className=`image-source-tab${source.id===state.currentSourceId?' active':''}`;
    button.dataset.sourceId=source.id;button.setAttribute('aria-pressed',String(source.id===state.currentSourceId));
    button.innerHTML='<img alt=""><span></span><b></b>';
    button.querySelector('img').src=source.url;button.querySelector('span').textContent=`图片 ${index+1}`;
    const count=[...source.selectedGroups.values()].reduce((sum,group)=>sum+group.size,0);
    button.querySelector('b').textContent=count?`${count} 项`:(source.recognitionStatus==='loading'?'识别中':'未选');
    strip.appendChild(button);
  });
  const add=document.createElement('button');add.type='button';add.className='image-source-add';add.id='addImageSource';
  add.innerHTML='<span aria-hidden="true">＋</span><b>继续添加图片</b>';strip.appendChild(add);
}

function loadImageSource(id){
  if(id===state.currentSourceId)return;
  saveCurrentSource();
  const source=state.imageSources.find(item=>item.id===id);if(!source)return;
  state.currentSourceId=source.id;state.imageName=source.name;state.imageUrl=source.url;
  state.imageInputValue=source.inputValue||source.name;
  state.recognitionStatus=source.recognitionStatus;state.objects=source.objects;state.selectedObjectId=source.selectedObjectId;
  state.manualSelection=source.manualSelection;state.searchMode=source.searchMode;state.resultsMode=source.resultsMode;
  state.selectedGroups=source.selectedGroups;state.groupMeta=source.groupMeta;state.aiResults=source.aiResults;
  state.activeAiResultId=source.activeAiResultId;state.aiResultCounter=source.aiResultCounter;state.manualCounter=source.manualCounter;
  state.otherSearchDraft=source.otherSearchDraft||'';state.otherSearchQuery=source.otherSearchQuery||'';
  state.imageZoom=source.imageZoom||1;state.zoomOrigin=source.zoomOrigin||{x:50,y:50};
  sourceImage.src=source.url;sourceImage.alt=`已上传图片：${source.name}`;
  $('#imageSourceInput').value=state.imageInputValue;
  updatePendingUploadUI();
  clearBatchSelection(false);resetFilters();renderImageSources();applyZoom();renderObjectTabs();updateModeTabs();updateHighlight();renderAiResults();renderResults(0);
}

function registerCurrentSource(){
  if(state.uploadIntent!=='materials'||!state.hasImage)return;
  if(!state.currentSourceId){
    const source=createImageSource(state.imageUrl,state.imageName,state.imageName);
    state.currentSourceId=source.id;state.imageSources.push(source);
  }
  saveCurrentSource();renderImageSources();
}

function updateImageCanvasMetrics(){
  if(!state.hasImage||!sourceImage.naturalWidth||!sourceImage.naturalHeight)return;
  const stageWidth=imageStage.clientWidth,stageHeight=imageStage.clientHeight;if(!stageWidth||!stageHeight)return;
  const imageRatio=sourceImage.naturalWidth/sourceImage.naturalHeight;
  let width=stageWidth,height=width/imageRatio;
  if(height>stageHeight){height=stageHeight;width=height*imageRatio;}
  imageCanvas.style.width=`${width}px`;imageCanvas.style.height=`${height}px`;
  imageCanvas.style.left=`${(stageWidth-width)/2}px`;imageCanvas.style.top=`${(stageHeight-height)/2}px`;
  applyZoom();updateHighlight();
}

function applyZoom(next=state.imageZoom,origin=state.zoomOrigin){
  state.imageZoom=Math.max(1,Math.min(3,Math.round(next*10)/10));
  state.zoomOrigin=state.imageZoom===1?{x:50,y:50}:{x:Math.max(0,Math.min(100,origin.x)),y:Math.max(0,Math.min(100,origin.y))};
  imageCanvas.style.transformOrigin=`${state.zoomOrigin.x}% ${state.zoomOrigin.y}%`;
  imageCanvas.style.transform=`scale(${state.imageZoom})`;
  const label=$('#zoomReset');if(label)label.textContent=`${Math.round(state.imageZoom*100)}%`;
  if($('#zoomOut'))$('#zoomOut').disabled=state.imageZoom<=1;
  if($('#zoomIn'))$('#zoomIn').disabled=state.imageZoom>=3;
  saveCurrentSource();
  if(state.manualSelection?.anchor)requestAnimationFrame(()=>positionCanvasAiMenu(state.manualSelection.anchor));
}

function imagePointFromEvent(event,clamp=false){
  const rect=imageCanvas.getBoundingClientRect();
  let x=(event.clientX-rect.left)/rect.width*100,y=(event.clientY-rect.top)/rect.height*100;
  if(!clamp&&(x<0||x>100||y<0||y>100))return null;
  return {x:Math.max(0,Math.min(100,x)),y:Math.max(0,Math.min(100,y))};
}

function positionCanvasAiMenu(anchor){
  if(!canvasAiMenu||canvasAiMenu.hidden||!anchor)return;
  const stageRect=imageStage.getBoundingClientRect(),canvasRect=imageCanvas.getBoundingClientRect();
  const x=canvasRect.left-stageRect.left+canvasRect.width*anchor.x/100;
  const y=canvasRect.top-stageRect.top+canvasRect.height*anchor.y/100;
  const left=Math.max(4,Math.min(stageRect.width-38,x-17));
  const top=Math.max(4,Math.min(stageRect.height-34,y-15));
  canvasAiMenu.style.left=`${left}px`;canvasAiMenu.style.top=`${top}px`;
  canvasAiMenu.classList.toggle('open-left',x+215>stageRect.width);
  canvasAiMenu.classList.toggle('open-up',y+48>stageRect.height);
}

function resetFilters(){
  state.filters = {category:'',brand:'',color:'',price:{label:'',min:null,max:null}};
  state.sort = 'default';
  updateFilterLabels();
}

function filterStateSnapshot(){
  return {filters:{...state.filters,color:Array.isArray(state.filters.color)?[...state.filters.color]:state.filters.color,price:{...state.filters.price}}};
}

function restoreModeFilters(mode){
  const saved=state.modeFilterState[mode];
  if(!saved){resetFilters();return;}
  state.filters={...saved.filters,color:Array.isArray(saved.filters.color)?[...saved.filters.color]:saved.filters.color,price:{...saved.filters.price}};
  state.sort='default';updateFilterLabels();
}

function resetSearchState({preserveCollection=false}={}){
  clearTimeout(state.recognitionTimer);
  clearTimeout(state.resultTimer);
  state.recognitionStatus = 'loading';
  state.objects = [];
  state.selectedObjectId = null;
  state.manualSelection = null;
  state.searchMode = 'similar';
  state.resultsMode = 'whole';
  state.selectedGroups = new Map();
  state.groupMeta = new Map();
  state.aiResults = [];
  state.activeAiResultId = null;
  state.aiResultCounter = 0;
  state.manualCounter = 0;
  state.otherSearchDraft='';state.otherSearchQuery='';clearTimeout(state.otherSearchTimer);state.otherSearchTimer=null;
  state.modeFilterState={similar:null,other:null};
  clearTimeout(state.objectGuideTimer);
  state.objectGuideVisible=false;
  if(!preserveCollection)state.objectGuideShown=false;
  state.imageZoom=1;state.zoomOrigin={x:50,y:50};state.purposeBackup=null;
  if(preserveCollection)state.currentSourceId=null;
  state.batchSelected = new Set();
  state.openFilter = null;
  state.libraryTarget = null;
  recognitionHighlight.classList.remove('show');
  manualSelection.classList.remove('show');
  aiExtractionHighlight?.classList.remove('show','loading');
  if(canvasAiMenu)canvasAiMenu.hidden=true;
  if(!preserveCollection){state.imageSources=[];state.currentSourceId=null;state.sourceCounter=0;}
  closeFilter();
  resetFilters();
  updateSelectedUI();
  updateBatchFavoriteUI();
  hideObjectGuide();
}

function setImage(url,name,inputValue=name){
  state.hasImage = true;
  state.imageUrl = url;
  state.imageName = name || '已上传图片.jpg';
  state.imageInputValue = inputValue || state.imageName;
  sourceImage.src = url;
  sourceImage.alt = `已上传图片：${state.imageName}`;
  $('#imageSourceInput').value = state.imageInputValue;
  setImagePresence(true);
  renderImageSources();
}

const emptyStateContent={
  similar:{
    uploadTitle:'上传单品图片',uploadHint:'点击选择，或将单品图片拖拽到这里',linkLabel:'单品图片链接',linkPlaceholder:'粘贴单品图片链接',linkAction:'查找相似物料',
    kicker:'单品图找物料',title:'用一张单品图，查找同款与相似物料',description:'适合家具、灯具、饰品等主体清晰的产品图片。',
    steps:[['上传单品图片','主体清晰、背景简洁，匹配会更准确'],['查看相似结果','系统会根据外观与品类推荐相关物料'],['继续筛选','可按分类、品牌、色系和价格缩小范围']]
  },
  materials:{
    uploadTitle:'上传空间图片',uploadHint:'点击选择，或将空间图片拖拽到这里',linkLabel:'空间图片链接',linkPlaceholder:'粘贴空间图片链接',linkAction:'识别并找物料',
    kicker:'空间图找物料',title:'从空间图片中识别并整理物料',description:'适合客厅、卧室、商业空间等包含多个物体的图片。',
    steps:[['上传空间图片','系统会分析图片中的家具与材料'],['选择识别物体','逐个查看对应的相似物料'],['加入物料清单','集中整理并导出需要的物料']]
  }
};

function updateEmptyStateContent(){
  const content=emptyStateContent[state.uploadIntent==='materials'?'materials':'similar'];
  $('#emptyUploadTitle').textContent=content.uploadTitle;
  $('#emptyUploadHint').textContent=content.uploadHint;
  $('#uploadLinkLabel').textContent=content.linkLabel;
  $('#uploadLinkInput').placeholder=content.linkPlaceholder;
  $('#uploadLinkSubmit').textContent=content.linkAction;
  $('#uploadGuideKicker').textContent=content.kicker;
  $('#uploadGuideTitle').textContent=content.title;
  $('#uploadGuideDescription').textContent=content.description;
  const steps=$('#uploadGuideSteps');steps.innerHTML='';
  content.steps.forEach(([title,detail],index)=>{
    const item=document.createElement('li');
    item.innerHTML='<span></span><div><strong></strong><small></small></div>';
    item.querySelector('span').textContent=String(index+1).padStart(2,'0');
    item.querySelector('strong').textContent=title;
    item.querySelector('small').textContent=detail;
    steps.appendChild(item);
  });
}

function setImagePresence(hasImage){
  state.hasImage = hasImage;
  sourceImage.hidden = !hasImage;
  $('#emptyUpload').hidden = hasImage;
  updatePendingUploadUI();
  imageStage.classList.toggle('empty',!hasImage);
  imageStage.classList.remove('dragging');
  imageStage.tabIndex = hasImage ? 0 : -1;
  imageStage.setAttribute('aria-label',hasImage?'已上传图片，可拖拽框选局部重新搜索':'图片上传区域');
  $('#zoomControls').hidden=true;
  $('.results-column').hidden = false;
  $('.results-column').classList.toggle('empty-state',!hasImage);
  $('.results-column').classList.toggle('similar-flow',hasImage && state.uploadIntent==='similar');
  $('#uploadGuide').hidden = hasImage;
  $('.image-column').classList.toggle('empty-image',!hasImage);
  $('#uploadLinkForm').hidden=hasImage;
  if(!hasImage)updateEmptyStateContent();
  updatePurposeSwitch();
  if(hasImage)requestAnimationFrame(updateImageCanvasMetrics);
}

function updatePendingUploadUI(){
  const input=$('#imageSourceInput');
  const hasPending=Boolean(state.pendingImageFile || input.value.trim());
  $('#clearFile').hidden=!hasPending;
  $('#searchButton').disabled=!hasPending;
  $('#fileChip').classList.toggle('empty',!hasPending);
  $('.image-column').classList.toggle('has-pending-upload',hasPending);
}

function clearPendingUpload({focus=false}={}){
  state.pendingImageFile=null;
  state.pendingAddSource=false;
  $('#imageSourceInput').value='';
  imageFile.value='';
  updatePendingUploadUI();
  if(focus)$('#imageSourceInput').focus({preventScroll:true});
}

function finishPendingUpload(displayValue){
  state.pendingImageFile=null;
  state.pendingAddSource=false;
  state.imageInputValue=displayValue;
  $('#imageSourceInput').value=displayValue;
  imageFile.value='';
  updatePendingUploadUI();
}

function stageUpload(file,intent=state.pendingUploadIntent || state.uploadIntent){
  if(!file || !file.type.startsWith('image/')){showToast('请选择图片文件');return;}
  state.pendingImageFile=file;
  state.pendingUploadIntent=intent;
  $('#imageSourceInput').value=file.name;
  updatePendingUploadUI();
  $('#searchButton').focus({preventScroll:true});
}

function clearCurrentImage(){
  state.imageSources.forEach(source=>{if(source.url?.startsWith('blob:'))URL.revokeObjectURL(source.url)});
  if(state.objectUrl&&!state.imageSources.some(source=>source.url===state.objectUrl))URL.revokeObjectURL(state.objectUrl);
  state.objectUrl=null;
  resetSearchState();
  state.imageUrl = '';
  state.imageName = '';
  state.imageInputValue = '';
  sourceImage.removeAttribute('src');
  sourceImage.alt = '';
  clearPendingUpload();
  $('#uploadLinkInput').value = '';
  renderObjectTabs();
  $('#activeFilters').innerHTML = '';
  $('#resultsStatus').textContent = '';
  productGrid.innerHTML = '';
  renderImageSources();
  setImagePresence(false);renderAiResults();
  $('#emptyUpload').focus({preventScroll:true});
}

function showLanding(){
  closeDrawer();
  closeFilter();
  state.view = 'landing';
  searchView.hidden = true;
  landingView.hidden = false;
  $('#bannerUpload').focus({preventScroll:true});
}

function showImageSearchEntry(intent='similar'){
  state.view = 'search';
  landingView.hidden = true;
  searchView.hidden = false;
  clearCurrentImage();
  state.uploadIntent=intent;
  state.pendingUploadIntent=intent;
  searchView.dataset.entryIntent=intent;
  setImagePresence(false);
  requestAnimationFrame(()=>$('#emptyUpload').focus({preventScroll:true}));
}

function showSearch({status='loading',objects=null,selected=null,mode='similar',keepLoading=false}={}){
  state.view = 'search';
  landingView.hidden = true;
  searchView.hidden = false;
  setImagePresence(true);
  $('.results-column').classList.toggle('similar-flow',state.uploadIntent==='similar');
  updatePurposeSwitch();
  state.recognitionStatus = status;
  state.objects = objects === null ? (status === 'success' ? recognizedObjects : []) : objects;
  state.selectedObjectId = selected || (status==='success'&&state.uploadIntent==='materials' ? state.objects[0]?.id||null : null);
  state.searchMode = mode;
  state.resultsMode = state.selectedObjectId ? 'object' : 'whole';
  renderObjectTabs();
  updateModeTabs();
  updateHighlight();
  renderResults(0);
  registerCurrentSource();renderAiResults();
  if(status==='success'&&state.uploadIntent==='materials'&&state.objects.length)requestAnimationFrame(showObjectGuide);
  if(status === 'loading' && !keepLoading){
    clearTimeout(state.recognitionTimer);
    state.recognitionTimer = setTimeout(()=>{
      state.recognitionStatus = 'success';
      state.objects = recognizedObjects;
      state.selectedObjectId=state.objects[0]?.id||null;
      state.resultsMode=state.selectedObjectId?'object':'whole';
      renderObjectTabs();
      updateModeTabs();updateHighlight();renderResults(320);
      saveCurrentSource();renderImageSources();
      if(state.objects.length)showObjectGuide();
    },2000);
  }
}

function updatePurposeSwitch(){
  const switcher=$('#resultPurposeSwitch');if(!switcher)return;
  switcher.hidden=!state.hasImage;
  const similar=state.uploadIntent==='similar';
  $('#purposeSimilar').classList.toggle('active',similar);$('#purposeMaterials').classList.toggle('active',!similar);
  $('#purposeSimilar').setAttribute('aria-pressed',String(similar));$('#purposeMaterials').setAttribute('aria-pressed',String(!similar));
}

function switchSearchPurpose(intent){
  if(intent===state.uploadIntent||!state.hasImage)return;
  if(intent==='similar'){
    hideObjectGuide();
    saveCurrentSource();
    state.purposeBackup={selectedObjectId:state.selectedObjectId,manualSelection:state.manualSelection,searchMode:state.searchMode,resultsMode:state.resultsMode,activeAiResultId:state.activeAiResultId};
    state.uploadIntent='similar';state.selectedObjectId=null;state.manualSelection=null;state.activeAiResultId=null;state.searchMode='similar';state.resultsMode='whole';
    clearBatchSelection(false);resetFilters();renderImageSources();renderAiResults();renderObjectTabs();updateModeTabs();updateHighlight();renderResults(320);updateSelectedUI();
    $('.results-column').classList.add('similar-flow');updatePurposeSwitch();showToast('已切换为找相似物料，无需重新上传图片');return;
  }
  state.uploadIntent='materials';
  const source=currentSource();
  if(source){
    state.recognitionStatus=source.recognitionStatus;state.objects=source.objects;state.selectedGroups=source.selectedGroups;state.groupMeta=source.groupMeta;state.aiResults=source.aiResults;
    state.selectedObjectId=source.selectedObjectId;state.manualSelection=source.manualSelection;state.searchMode=source.searchMode;state.resultsMode=source.resultsMode;state.activeAiResultId=source.activeAiResultId;
    state.imageZoom=source.imageZoom||1;state.zoomOrigin=source.zoomOrigin||{x:50,y:50};applyZoom();
    $('.results-column').classList.remove('similar-flow');renderImageSources();renderAiResults();renderObjectTabs();updateModeTabs();updateHighlight();renderResults(320);updateSelectedUI();updatePurposeSwitch();
    showToast('已返回空间图找物料，原有识别和清单已保留');return;
  }
  const url=state.imageUrl,name=state.imageName,inputValue=state.imageInputValue||name;
  resetSearchState({preserveCollection:true});state.uploadIntent='materials';setImage(url,name,inputValue);
  const nextSource=createImageSource(url,name,inputValue);state.currentSourceId=nextSource.id;state.imageSources.push(nextSource);
  $('.results-column').classList.remove('similar-flow');showSearch({status:'loading'});updatePurposeSwitch();showToast('已切换为空间图找物料，正在识别图片');
}

function startUpload(file,intent=state.pendingUploadIntent || 'similar'){
  if(!file || !file.type.startsWith('image/')){showToast('请选择图片文件');return;}
  if(intent!=='materials'&&state.objectUrl)URL.revokeObjectURL(state.objectUrl);
  if(intent==='materials')saveCurrentSource();
  state.objectUrl = URL.createObjectURL(file);
  resetSearchState({preserveCollection:intent==='materials'});
  state.uploadIntent = intent;
  setImage(state.objectUrl,file.name,file.name);
  if(intent==='materials'){
    const source=createImageSource(state.objectUrl,file.name,file.name);
    state.currentSourceId=source.id;state.imageSources.push(source);
    showSearch({status:'loading'});
  }
  else showSearch({status:'success',objects:[]});
  finishPendingUpload(file.name);
}

function startUrlSearch(rawUrl,intent='similar',triggerButton=$('#searchButton')){
  let url;
  try{
    url = new URL(rawUrl.trim(),location.href);
    if(!['http:','https:'].includes(url.protocol)) throw new Error('unsupported');
  }catch(error){showToast('请输入有效的图片链接');return;}
  const button=triggerButton;const originalLabel=button.textContent;
  button.disabled=true;
  button.textContent='加载中…';
  const probe=new Image();
  probe.onload=()=>{
    if(intent!=='materials'&&state.objectUrl){URL.revokeObjectURL(state.objectUrl);state.objectUrl=null;}
    if(intent==='materials')saveCurrentSource();
    resetSearchState({preserveCollection:intent==='materials'});
    state.uploadIntent=intent;
    setImage(url.href,'图片链接',url.href);
    button.textContent=originalLabel;button.disabled=false;
    if(intent==='materials'){
      const source=createImageSource(url.href,'图片链接',url.href);state.currentSourceId=source.id;state.imageSources.push(source);
      showSearch({status:'loading'});
    }else showSearch({status:'success',objects:[]});
    finishPendingUpload(url.href);
  };
  probe.onerror=()=>{button.textContent=originalLabel;button.disabled=false;showToast('图片链接无法加载，请检查后重试')};
  probe.src=url.href;
}

function renderLandingCards(){
  const list = landingCatalogProducts();
  const grid = $('#landingGrid');
  grid.innerHTML = '';
  list.forEach(item=>{
    const card = document.createElement('article');
    card.className = 'landing-card';
    card.dataset.art = item.art;
    card.innerHTML = `<div class="landing-card-art"></div><div class="landing-card-body"><strong></strong><span></span><b></b></div>`;
    const art = card.querySelector('.landing-card-art');
    art.style.setProperty('--photo-bg',item.photoBg);
    art.style.setProperty('--object-color',item.objectColor);
    art.style.setProperty('--pattern',item.pattern || `repeating-linear-gradient(45deg,${item.objectColor} 0 4px,${item.photoBg} 4px 8px)`);
    card.querySelector('strong').textContent = item.name;
    card.querySelector('span').textContent = item.brand;
    card.querySelector('b').textContent = item.price;
    grid.appendChild(card);
  });
}

function objectById(id){return state.objects.find(object=>object.id===id)}
function resultKeyForObject(id){
  const object=objectById(id);
  if(object?.custom) return 'whole';
  const key=id ? id.split('-')[0] : 'whole';
  return products[key] ? key : 'whole';
}

function selectedCountForObject(id){
  let total=state.selectedGroups.get(id)?.size||0;
  state.groupMeta.forEach((meta,key)=>{if(key!==id&&meta.parentObjectId===id)total+=state.selectedGroups.get(key)?.size||0});
  return total;
}
function totalSelected(){
  if(!state.imageSources.length)return [...state.selectedGroups.values()].reduce((sum,map)=>sum+map.size,0);
  if(state.uploadIntent==='materials')saveCurrentSource();
  return state.imageSources.reduce((total,source)=>total+[...source.selectedGroups.values()].reduce((sum,map)=>sum+map.size,0),0);
}

function activeAiResult(){return state.aiResults.find(result=>result.id===state.activeAiResultId)||null}
function currentSelectionContext(){
  if(state.searchMode==='other')return {key:'other-materials',label:'其他物料',type:'other',parentObjectId:null,query:state.otherSearchQuery||''};
  const ai=activeAiResult();
  if(ai)return {key:ai.id,label:ai.display,type:'ai',parentObjectId:ai.parentObjectId||null,aiResultId:ai.id,box:{...ai.box}};
  if(state.manualSelection)return {key:state.manualSelection.id,label:state.manualSelection.label,type:'manual',parentObjectId:state.manualSelection.parentObjectId||null,box:{x:state.manualSelection.x,y:state.manualSelection.y,width:state.manualSelection.width,height:state.manualSelection.height},anchor:state.manualSelection.anchor};
  if(state.selectedObjectId){const object=objectById(state.selectedObjectId);return {key:state.selectedObjectId,label:object?.nameZh||'识别物体',type:'object',parentObjectId:state.selectedObjectId};}
  return {key:'whole',label:'原图',type:'whole',parentObjectId:null};
}

function createObjectTab({id,nameZh,position},active){
  const shell = document.createElement('div');
  shell.className = 'object-tab-shell';
  const button = document.createElement('button');
  button.className = `object-tab${active?' active':''}`;
  button.type = 'button';
  button.role = 'tab';
  button.setAttribute('aria-selected',String(active));
  button.dataset.objectId = id;
  button.dataset.contextType = 'object';
  const thumb = document.createElement('span');
  thumb.className = 'object-thumb';
  thumb.style.backgroundImage = `url("${state.imageUrl}")`;
  thumb.style.backgroundSize = '250% auto';
  thumb.style.backgroundPosition = position;
  const name = document.createElement('span');
  name.textContent = nameZh;
  const count = selectedCountForObject(id);
  if(count){
    const badge = document.createElement('strong');
    badge.className = 'count-badge';
    badge.textContent = count;
    badge.setAttribute('aria-label',`已选 ${count} 个物料`);
    button.appendChild(badge);
  }
  button.append(thumb,name);
  button.setAttribute('aria-label',`${nameZh}${count?`，已选 ${count} 个物料`:''}`);
  const remove = document.createElement('button');
  remove.className = 'object-delete';
  remove.type = 'button';
  remove.dataset.deleteObjectId = id;
  remove.setAttribute('aria-label',`删除识别物体 ${nameZh}`);
  remove.textContent = '×';
  shell.append(button,remove);
  return shell;
}

function createSelectedContextTab(key,meta){
  const active=meta.type==='ai'?state.activeAiResultId===key:state.manualSelection?.id===key;
  const shell=document.createElement('div');shell.className=`object-tab-shell extracted-context ${meta.type==='ai'?'ai-context':'manual-context'}`;
  const button=document.createElement('button');button.type='button';button.role='tab';button.className=`object-tab extracted-tab ${meta.type==='ai'?'ai-tab':'manual-tab'}${active?' active':''}`;
  button.dataset.objectId=key;button.dataset.contextType=meta.type;button.setAttribute('aria-selected',String(active));
  button.innerHTML='<span class="object-thumb"></span><span class="object-name"></span>';
  button.querySelector('.object-name').textContent=meta.label;
  const sourceBadge=document.createElement('small');sourceBadge.className='context-source-badge';sourceBadge.textContent=meta.type==='ai'?'AI':'框选';
  button.appendChild(sourceBadge);
  button.setAttribute('aria-label',`${meta.type==='ai'?'AI 提取结果':'框选结果'} ${meta.label}，已选 ${state.selectedGroups.get(key)?.size||0} 个物料`);
  const thumb=button.querySelector('.object-thumb');
  if(meta.type==='ai'){
    const result=state.aiResults.find(item=>item.id===key);
    if(result?.preview)thumb.style.backgroundImage=`url("${result.preview}")`;
    else if(meta.box){thumb.style.backgroundImage=`url("${state.imageUrl}")`;thumb.style.backgroundSize=`${10000/meta.box.width}% ${10000/meta.box.height}%`;thumb.style.backgroundPosition=`${meta.box.x/(100-meta.box.width)*100||0}% ${meta.box.y/(100-meta.box.height)*100||0}%`;}
  }else if(meta.box){
    thumb.style.backgroundImage=`url("${state.imageUrl}")`;thumb.style.backgroundSize=`${10000/meta.box.width}% ${10000/meta.box.height}%`;thumb.style.backgroundPosition=`${meta.box.x/(100-meta.box.width)*100||0}% ${meta.box.y/(100-meta.box.height)*100||0}%`;
  }
  const count=document.createElement('strong');count.className='count-badge';count.textContent=state.selectedGroups.get(key)?.size||0;button.appendChild(count);
  shell.appendChild(button);return shell;
}

function createContextDivider(label,type){
  const divider=document.createElement('div');
  divider.className=`context-divider ${type}-divider`;
  divider.setAttribute('aria-hidden','true');
  divider.innerHTML=`<i></i><span>${label}</span>`;
  return divider;
}

function aiPreviewDataUrl(type,index){
  const furniture=type==='furniture';
  const art=furniture
    ? `<rect width="600" height="600" fill="#fff"/><ellipse cx="300" cy="450" rx="190" ry="24" fill="#ddd"/><path d="M125 300 Q125 245 185 245 H415 Q475 245 475 300 V405 Q475 430 445 430 H155 Q125 430 125 405Z" fill="#d8c7b8"/><rect x="155" y="275" width="135" height="105" rx="28" fill="#eee5dd"/><rect x="310" y="275" width="135" height="105" rx="28" fill="#e8ddd3"/><rect x="110" y="320" width="70" height="115" rx="32" fill="#cdb8a8"/><rect x="420" y="320" width="70" height="115" rx="32" fill="#cdb8a8"/>`
    : `<defs><pattern id="p" width="90" height="90" patternUnits="userSpaceOnUse"><rect width="90" height="90" fill="#8a6a54"/><path d="M-10 22 Q20 2 52 22 T110 22 M-10 56 Q25 34 55 56 T110 56" fill="none" stroke="#b59478" stroke-width="8" opacity=".7"/><path d="M0 78 Q32 62 90 76" fill="none" stroke="#62483a" stroke-width="3" opacity=".7"/></pattern></defs><rect width="600" height="600" fill="url(#p)"/>`;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">${art}<text x="570" y="575" text-anchor="end" font-family="Arial" font-size="18" fill="${furniture?'#aaa':'#eadfd7'}">AI ${String(index).padStart(2,'0')}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function startAiExtraction(type,{box,parentObjectId=null,manualId=null}={}){
  if(!box)return;
  const sourceId=state.currentSourceId;
  const index=++state.aiResultCounter;
  const typeIndex=state.aiResults.filter(item=>item.type===type).length+1;
  const display=`AI ${type==='furniture'?'家具':'材质'} ${String(typeIndex).padStart(2,'0')}`;
  const result={id:`ai-${state.currentSourceId||'single'}-${index}`,display,type,status:'loading',box:{...box},parentObjectId,manualId,index,typeIndex,preview:null};
  state.aiResults.push(result);state.activeAiResultId=result.id;
  state.groupMeta.set(result.id,{key:result.id,label:result.display,type:'ai',parentObjectId,aiResultId:result.id,box:{...box}});
  saveCurrentSource();renderAiResults();updateHighlight();renderResults(360);showToast(`正在进行${type==='furniture'?'AI家具提取':'AI材质提取'}…`);
  setTimeout(()=>{
    const source=state.imageSources.find(item=>item.id===sourceId)||currentSource();
    const target=(source?.aiResults||state.aiResults).find(item=>item.id===result.id);if(!target)return;
    target.status='done';target.preview=aiPreviewDataUrl(type,index);
    if(state.currentSourceId===sourceId&&state.activeAiResultId===target.id){renderAiResults();renderObjectTabs();updateHighlight();renderResults(260);showToast(`${target.display} 生成完成，可继续选择物料`);saveCurrentSource();}
  },1800);
}

function renderAiResults(){
  const panel=$('#aiResultsPanel'),list=$('#aiResultsList');if(!panel||!list)return;
  const visible=state.hasImage;
  panel.hidden=!visible;panel.classList.toggle('is-empty',!state.aiResults.length);list.innerHTML='';$('#aiResultsCount').textContent=`${state.aiResults.length} 个结果`;
  if(!visible)return;
  state.aiResults.forEach(result=>{
    const card=document.createElement('div');card.tabIndex=0;card.setAttribute('role','button');card.className=`ai-result-card${result.id===state.activeAiResultId?' active':''}${result.status==='loading'?' loading':''}`;card.dataset.aiResultId=result.id;
    card.innerHTML=`<span class="ai-result-preview"></span><span class="ai-result-copy"><strong></strong><small></small></span><span class="ai-result-status"></span>${result.status==='done'?'<button class="ai-result-save" type="button">保存</button>':''}<button class="ai-result-delete" type="button" aria-label="删除AI结果">×</button>`;
    const preview=card.querySelector('.ai-result-preview');
    if(result.preview){preview.style.backgroundImage=`url("${result.preview}")`;preview.style.backgroundSize='cover';preview.style.backgroundPosition='center';}
    else{preview.style.backgroundImage=`url("${state.imageUrl}")`;preview.style.backgroundSize=`${10000/result.box.width}% ${10000/result.box.height}%`;preview.style.backgroundPosition=`${result.box.x/(100-result.box.width)*100||0}% ${result.box.y/(100-result.box.height)*100||0}%`;}
    card.querySelector('strong').textContent=result.display;card.querySelector('small').textContent=result.type==='furniture'?'AI家具提取':'AI材质提取';
    const save=card.querySelector('.ai-result-save');if(save)save.setAttribute('aria-label',`保存${result.display}生成图片到电脑`);
    card.querySelector('.ai-result-status').textContent=result.status==='loading'?'生成中':'已完成';list.appendChild(card);
  });
}

function imageFileExtension(url){
  const dataMime=url?.match(/^data:image\/([^;,]+)/i)?.[1]?.toLowerCase();
  if(dataMime)return dataMime==='jpeg'?'jpg':dataMime==='svg+xml'?'svg':dataMime;
  const pathExtension=url?.split(/[?#]/)[0].match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase();
  return pathExtension&&['png','jpg','jpeg','webp','gif','svg','avif'].includes(pathExtension)?(pathExtension==='jpeg'?'jpg':pathExtension):'png';
}

async function saveAiResult(id){
  const result=state.aiResults.find(item=>item.id===id);
  if(!result?.preview||result.status!=='done'){showToast('图片仍在生成中，请稍后再保存');return;}
  const anchor=document.createElement('a');
  const fileName=`${result.display}-${result.type==='furniture'?'AI家具提取':'AI材质提取'}.${imageFileExtension(result.preview)}`;
  let objectUrl='';
  try{
    const response=await fetch(result.preview);if(!response.ok)throw new Error('image fetch failed');
    objectUrl=URL.createObjectURL(await response.blob());anchor.href=objectUrl;
  }catch{anchor.href=result.preview;}
  anchor.download=fileName;document.body.appendChild(anchor);anchor.click();anchor.remove();
  if(objectUrl)setTimeout(()=>URL.revokeObjectURL(objectUrl),1000);
  showToast(`${result.display} 图片已开始保存`);
}

function deleteAiResult(id){
  const result=state.aiResults.find(item=>item.id===id);if(!result)return;
  if(state.selectedGroups.get(id)?.size&&window.blockMaterialListMutation?.())return;
  state.aiResults=state.aiResults.filter(item=>item.id!==id);state.selectedGroups.delete(id);state.groupMeta.delete(id);
  if(state.activeAiResultId===id)state.activeAiResultId=null;
  saveCurrentSource();renderAiResults();updateSelectedUI();renderObjectTabs();updateModeTabs();updateHighlight();renderResults(0);showToast(`已删除 ${result.display}`);
}

function updateRecognitionSummary(){
  const count=state.objects.length;
  const extractedCount=[...state.groupMeta.entries()].filter(([key,meta])=>['ai','manual'].includes(meta.type)&&state.selectedGroups.get(key)?.size).length;
  const countNode=$('#recognitionCount');
  const message=$('#recognitionMessage');
  if(state.recognitionStatus==='loading'){
    countNode.textContent='正在识别图片';
    message.textContent='识别结果将在完成后显示';
  }else if(!count){
    countNode.textContent=extractedCount?'识别与提取结果':'未识别到物体';
    message.textContent=extractedCount?`AI / 框选提取 ${extractedCount} 项`:'已为你展示原图搜索结果，也可直接在原图上框选';
  }else{
    countNode.textContent=extractedCount?'识别与提取结果':`已识别 ${count} 个物体`;
    message.textContent=extractedCount?`已识别 ${count} 个物体 · 提取 ${extractedCount} 项`:(count>6?'左右滑动可查看全部识别结果':'可选择物体查看相似物料');
  }
}

function renderObjectTabs(){
  const scroller = $('#objectScroller');
  scroller.innerHTML='';
  if(!state.hasImage) return;
  const whole = document.createElement('button');
  const wholeActive = !state.selectedObjectId && !state.manualSelection && !state.activeAiResultId;
  whole.className = `object-tab whole${wholeActive?' active':''}`;
  whole.type = 'button'; whole.role = 'tab'; whole.dataset.objectId = 'whole';whole.dataset.contextType='whole';
  whole.setAttribute('aria-selected',String(wholeActive));
  whole.innerHTML = '<span class="object-thumb"></span><span>原图</span>';
  whole.querySelector('.object-thumb').style.backgroundImage=`url("${state.imageUrl}")`;
  scroller.appendChild(whole);
  if(state.recognitionStatus === 'loading'){
    const loading = document.createElement('div');
    loading.className = 'recognizing';
    loading.setAttribute('role','status');
    loading.innerHTML = '<i aria-hidden="true"></i><span>正在识图中…</span>';
    scroller.appendChild(loading);
  }else{
    state.objects.forEach(object=>scroller.appendChild(createObjectTab(object,state.selectedObjectId===object.id && !state.manualSelection && !state.activeAiResultId)));
    const extractedEntries=[...state.groupMeta.entries()].filter(([key,meta])=>['ai','manual'].includes(meta.type)&&state.selectedGroups.get(key)?.size);
    const aiEntries=extractedEntries.filter(([,meta])=>meta.type==='ai');
    const manualEntries=extractedEntries.filter(([,meta])=>meta.type==='manual');
    if(aiEntries.length){
      scroller.appendChild(createContextDivider('AI 提取','ai'));
      aiEntries.forEach(([key,meta])=>scroller.appendChild(createSelectedContextTab(key,meta)));
    }
    if(manualEntries.length){
      scroller.appendChild(createContextDivider('框选','manual'));
      manualEntries.forEach(([key,meta])=>scroller.appendChild(createSelectedContextTab(key,meta)));
    }
  }
  $('.object-rail').classList.toggle('guide-active',state.objectGuideVisible);
  updateRecognitionSummary();
}

function hideObjectGuide(){
  clearTimeout(state.objectGuideTimer);
  state.objectGuideVisible=false;
  const guide=$('#objectGuide');if(guide)guide.hidden=true;
  $('.object-rail')?.classList.remove('guide-active');
}

function showObjectGuide(){
  if(state.objectGuideShown||!state.objects.length||state.uploadIntent!=='materials')return;
  state.objectGuideShown=true;state.objectGuideVisible=true;
  const guide=$('#objectGuide');if(!guide)return;
  guide.hidden=false;$('.object-rail').classList.add('guide-active');
  clearTimeout(state.objectGuideTimer);
  state.objectGuideTimer=setTimeout(hideObjectGuide,6000);
}

function deleteRecognizedObject(id){
  const object=objectById(id);
  if(!object) return;
  const changesMaterialList=Boolean(state.selectedGroups.get(id)?.size)||[...state.groupMeta.entries()].some(([key,meta])=>meta.parentObjectId===id&&state.selectedGroups.get(key)?.size);
  if(changesMaterialList&&window.blockMaterialListMutation?.())return;
  const removedCount=state.selectedGroups.get(id)?.size || 0;
  state.objects=state.objects.filter(item=>item.id!==id);
  state.selectedGroups.delete(id);
  [...state.groupMeta.entries()].forEach(([key,meta])=>{if(meta.parentObjectId===id){state.selectedGroups.delete(key);state.groupMeta.delete(key);}});
  state.aiResults=state.aiResults.filter(result=>result.parentObjectId!==id);
  if(state.selectedObjectId===id){
    state.selectedObjectId=null;
    state.manualSelection=null;
    state.resultsMode='whole';
    state.searchMode='similar';
  }
  updateSelectedUI();
  saveCurrentSource();renderAiResults();
  renderObjectTabs();
  updateModeTabs();
  updateHighlight();
  renderResults(0);
  showToast(removedCount?`已删除“${object.nameZh}”及其 ${removedCount} 个已选物料`:`已删除识别物体“${object.nameZh}”`);
}

function selectObject(id,type='object'){
  clearBatchSelection(false);
  hideObjectGuide();
  if(type==='whole'||id === 'whole'){
    state.activeAiResultId=null;
    state.selectedObjectId = null;
    state.manualSelection = null;
    state.searchMode = 'similar';
    state.resultsMode = 'whole';
  }else if(type==='ai'){
    const result=state.aiResults.find(item=>item.id===id);if(!result)return;
    state.activeAiResultId=id;state.selectedObjectId=result.parentObjectId||null;state.manualSelection=null;
    state.searchMode='similar';state.resultsMode='ai';
  }else if(type==='manual'){
    const meta=state.groupMeta.get(id);if(!meta?.box)return;
    state.activeAiResultId=null;state.selectedObjectId=meta.parentObjectId||null;
    state.manualSelection={id,key:id,label:meta.label,parentObjectId:meta.parentObjectId||null,anchor:meta.anchor,...meta.box};
    state.searchMode='similar';state.resultsMode='manual';
  }else{
    state.activeAiResultId=null;
    state.selectedObjectId = id;
    state.manualSelection = null;
    state.searchMode = 'similar';
    state.resultsMode = 'object';
  }
  resetFilters();
  renderObjectTabs();
  renderAiResults();
  updateModeTabs();
  updateHighlight();
  renderResults(380);
  saveCurrentSource();
}

function updateModeTabs(){
  const visible = state.hasImage;
  const other = state.searchMode==='other';
  $('#modeRow').hidden = !visible;
  $('#similarMode').classList.toggle('active',!other);
  $('#otherMode').classList.toggle('active',other);
  $('#similarMode').setAttribute('aria-selected',String(!other));
  $('#otherMode').setAttribute('aria-selected',String(other));
  $('#otherMaterialSearch').hidden=!other;
  $('#otherMaterialInput').value=state.otherSearchDraft;
}

function applyBox(element,box){
  element.style.left = `${box.x}%`;
  element.style.top = `${box.y}%`;
  element.style.width = `${box.width}%`;
  element.style.height = `${box.height}%`;
}

function updateHighlight(){
  recognitionHighlight.classList.remove('show');
  manualSelection.classList.remove('show');
  aiExtractionHighlight?.classList.remove('show','loading');
  if(canvasAiMenu)canvasAiMenu.hidden=true;
  if(!state.hasImage) return;
  if(state.searchMode==='other') return;
  const ai=activeAiResult();
  if(ai){applyBox(aiExtractionHighlight,ai.box);aiExtractionHighlight.classList.add('show');aiExtractionHighlight.classList.toggle('loading',ai.status==='loading');return;}
  if(state.manualSelection){
    applyBox(manualSelection,state.manualSelection);manualSelection.classList.add('show');
    if(canvasAiMenu){
      canvasAiMenu.hidden=false;
      requestAnimationFrame(()=>positionCanvasAiMenu(state.manualSelection.anchor||{x:state.manualSelection.x+state.manualSelection.width,y:state.manualSelection.y+state.manualSelection.height}));
    }
    return;
  }
  const object = objectById(state.selectedObjectId);
  if(object){applyBox(recognitionHighlight,object.box);recognitionHighlight.classList.add('show');}
}

function landingCatalogProducts(){return [...products.whole,...products.material.slice(0,4)].map(productFromRow)}

function completeCatalogProducts(){
  const seen=new Set();
  return Object.values(products).flat().map(productFromRow).filter(item=>{
    if(seen.has(item.id))return false;
    seen.add(item.id);return true;
  });
}

function otherSearchTerms(rawQuery){
  const query=rawQuery.trim().toLowerCase().replaceAll('椅子','椅').replaceAll('桌子','桌');
  if(!query)return [];
  const vocabulary=['黑色','白色','灰色','红色','米色','棕色','木色','沙发','椅','桌','茶几','柜','地毯','窗帘','石材','木材','面料','皮革'];
  const terms=vocabulary.filter(term=>query.includes(term));
  return terms.length?terms:[query];
}

function otherMaterialBaseProducts(){
  const terms=otherSearchTerms(state.otherSearchQuery);
  if(!terms.length)return landingCatalogProducts();
  return completeCatalogProducts().filter(item=>{
    const haystack=`${item.name} ${item.brand} ${item.category} ${item.color}`.toLowerCase();
    return terms.every(term=>haystack.includes(term));
  }).slice(0,30);
}

function switchResultSearchMode(mode){
  if(!state.hasImage||state.searchMode===mode)return;
  state.modeFilterState[state.searchMode]=filterStateSnapshot();
  state.searchMode=mode;
  clearBatchSelection(false);restoreModeFilters(mode);closeFilter();updateModeTabs();updateHighlight();renderResults(360);saveCurrentSource();
  showToast(mode==='other'?'已切换为找其他物料':'已返回找相似物料');
}

function currentBaseProducts(){
  if(state.searchMode==='other')return otherMaterialBaseProducts();
  const ai=activeAiResult();
  if(ai)return (ai.type==='material'?products.material:products[resultKeyForObject(ai.parentObjectId)]||products.sofa).map(productFromRow);
  if(state.manualSelection) return products.whole.slice().reverse().map(productFromRow);
  const key = resultKeyForObject(state.selectedObjectId);
  return (products[key] || products.whole).map(productFromRow);
}

function filteredProducts(){
  let list = currentBaseProducts();
  const {category,brand,color,price} = state.filters;
  if(category) list = list.filter(item=>item.category===category || (category==='面料' && products.material.some(row=>row[0]===item.id)));
  if(brand) list = list.filter(item=>item.brand===brand);
  if(color) list = list.filter(item=>item.color===color);
  if(price.min !== null) list = list.filter(item=>item.priceValue>=price.min);
  if(price.max !== null) list = list.filter(item=>item.priceValue<=price.max);
  return list;
}

function isSelectable(){return state.uploadIntent==='materials'&&state.hasImage}
function isProductSelected(productId){return Boolean(state.selectedGroups.get(currentSelectionContext().key)?.has(productId))}

function updateBatchFavoriteUI(){}

function clearBatchSelection(shouldRender=true){
  state.batchSelected.clear();
  updateBatchFavoriteUI();
  if(shouldRender)renderResults(0);
}

function productCard(item){
  const card = document.createElement('article');
  const selected = isSelectable() && isProductSelected(item.id);
  card.className = `product-card${selected?' selected':''}`;
  card.dataset.art = item.art;
  card.style.setProperty('--photo-bg',item.photoBg);
  card.style.setProperty('--object-color',item.objectColor);
  card.style.setProperty('--pattern',item.pattern || `repeating-linear-gradient(45deg,${item.objectColor} 0 3px,${item.photoBg} 3px 7px)`);
  const photo = document.createElement('div');
  photo.className = 'product-photo';
  photo.setAttribute('role','img');
  photo.setAttribute('aria-label',item.name);
  if(isSelectable()){
    const select = document.createElement('button');
    select.type = 'button';
    select.className = `select-product${selected?' selected':''}`;
    select.setAttribute('aria-pressed',String(selected));
    select.setAttribute('aria-label',`${selected?'取消选择':'选择'} ${item.name}`);
    select.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12 4 4 8-9"/></svg>';
    select.addEventListener('click',()=>toggleProduct(item));
    photo.appendChild(select);
  }
  const info = document.createElement('div');
  info.className = 'product-info';
  info.innerHTML = '<h3></h3><p></p><strong></strong>';
  info.querySelector('h3').textContent = item.name;
  info.querySelector('p').textContent = item.brand;
  info.querySelector('strong').textContent = item.price;
  card.append(photo,info);
  return card;
}

function renderSkeleton(){
  productGrid.innerHTML = '';
  for(let i=0;i<8;i++){
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-card';
    skeleton.setAttribute('aria-hidden','true');
    skeleton.innerHTML = '<i></i><span></span><span></span>';
    productGrid.appendChild(skeleton);
  }
}

function renderResults(delay=0){
  clearTimeout(state.resultTimer);
  if(!state.hasImage){state.batchSelected.clear();$('#resultsStatus').textContent='';productGrid.innerHTML='';return;}
  $('#resultsStatus').textContent = delay ? '正在更新搜索结果…' : '';
  if(delay) renderSkeleton();
  state.resultTimer = setTimeout(()=>{
    const list = filteredProducts();
    productGrid.innerHTML = '';
    if(!list.length){
      const query=state.searchMode==='other'?state.otherSearchQuery:'';
      productGrid.innerHTML = `<div class="empty-products"><div><strong>${query?`未找到“${query}”相关物料`:'没有符合当前条件的物料'}</strong><span>${query?'可以更换关键词或调整筛选条件':'可以重置筛选后继续查看'}</span></div></div>`;
    }else list.forEach(item=>productGrid.appendChild(productCard(item)));
    let context = '原图搜索结果';
    const ai=activeAiResult();
    if(state.searchMode==='other')context=state.otherSearchQuery?`“${state.otherSearchQuery}” · 找其他物料`:'找其他物料 · 首页推荐';
    else if(ai)context=`${ai.display} · 找相似物料`;
    else if(state.manualSelection) context = `${state.manualSelection.label} · 局部框选搜索结果`;
    else if(state.selectedObjectId){
      const object = objectById(state.selectedObjectId);
      context = `${object?.nameZh || '当前对象'} · 找相似物料`;
    }
    $('#resultsStatus').textContent = `${context}，共 ${list.length} 项`;
  },delay);
}

function toggleProduct(item){
  if(!isSelectable()) return;
  if(window.blockMaterialListMutation?.())return;
  const context=currentSelectionContext();
  let group = state.selectedGroups.get(context.key);
  if(!group){group = new Map();state.selectedGroups.set(context.key,group);}
  state.groupMeta.set(context.key,context);
  if(group.has(item.id)){
    group.delete(item.id);
    if(!group.size) state.selectedGroups.delete(context.key);
    showToast(`已取消选择“${item.name}”`);
  }else{
    group.set(item.id,{...item,source:state.searchMode,viaAi:context.type==='ai',sourceId:state.currentSourceId});
    showToast(`已加入“${context.label}”物料清单`);
  }
  saveCurrentSource();renderImageSources();
  updateSelectedUI();
  renderObjectTabs();
  renderResults(0);
}

function updateSelectedUI(){
  const total = totalSelected();
  $('#selectedTotal').textContent = total;
  $('#drawerTotal').textContent = total;
  window.updateExportButton?.(total);
  renderDrawer();
}

function renderDrawer(){
  const content = $('#drawerContent');
  content.innerHTML = '';
  if(!totalSelected()){
    content.innerHTML = '<div class="drawer-empty"><div><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 8h28v32H10zM17 5h14v8H17zM17 21h14M17 28h10"/></svg><strong>还没有选择物料</strong><span>进入具体识别对象后，可从结果中选择多个物料</span></div></div>';
    return;
  }
  if(state.uploadIntent==='materials')saveCurrentSource();
  const sources=state.imageSources.length?state.imageSources:[{id:'single',name:state.imageName,url:state.imageUrl,objects:state.objects,selectedGroups:state.selectedGroups,groupMeta:state.groupMeta,aiResults:state.aiResults}];
  sources.forEach((source,sourceIndex)=>{
    const sourceTotal=[...source.selectedGroups.values()].reduce((sum,group)=>sum+group.size,0);if(!sourceTotal)return;
    const sourceHeader=document.createElement('div');sourceHeader.className='drawer-source-header';
    sourceHeader.innerHTML='<img alt=""><div><strong></strong><span></span></div>';
    sourceHeader.querySelector('img').src=source.url;sourceHeader.querySelector('strong').textContent=`图片 ${sourceIndex+1} · ${source.name}`;
    sourceHeader.querySelector('span').textContent=`共 ${sourceTotal} 项物料`;content.appendChild(sourceHeader);
    source.selectedGroups.forEach((group,groupKey)=>{
      if(!group.size)return;
      const meta=source.groupMeta?.get(groupKey)||{label:source.objects?.find(object=>object.id===groupKey)?.nameZh||'原图',type:'object'};
      const section=document.createElement('section');section.className='selected-group';
      const header=document.createElement('div');header.className='selected-group-header';
      header.innerHTML='<span class="selected-group-thumb"></span><div><h3></h3><span></span></div><button class="selected-object-delete" type="button">删除分组</button>';
      const groupThumb=header.querySelector('.selected-group-thumb');groupThumb.style.backgroundImage=`url("${source.url}")`;
      const object=source.objects?.find(item=>item.id===(meta.parentObjectId||groupKey));
      const aiResult=meta.type==='ai'?source.aiResults?.find(item=>item.id===groupKey):null;
      if(aiResult?.preview){groupThumb.style.backgroundImage=`url("${aiResult.preview}")`;groupThumb.style.backgroundSize='cover';groupThumb.style.backgroundPosition='center';}
      else if(meta.box){groupThumb.style.backgroundSize=`${10000/meta.box.width}% ${10000/meta.box.height}%`;groupThumb.style.backgroundPosition=`${meta.box.x/(100-meta.box.width)*100||0}% ${meta.box.y/(100-meta.box.height)*100||0}%`;}
      else{groupThumb.style.backgroundSize=object?'250% auto':'cover';groupThumb.style.backgroundPosition=object?.position||'center';}
      header.querySelector('h3').textContent=meta.label;header.querySelector('.selected-group-header > div > span').textContent=`${group.size} 个已选物料`;
      header.querySelector('.selected-object-delete').addEventListener('click',()=>removeDrawerGroup(source.id,groupKey,meta.label));section.appendChild(header);
      group.forEach(item=>{
        const row=document.createElement('div');row.className='drawer-item';
        row.innerHTML='<div class="drawer-item-art"></div><div class="drawer-item-info"><strong></strong><span></span><b></b></div><button class="drawer-delete" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M9 7V4h6v3M8 10v8M12 10v8M16 10v8M7 7l1 14h8l1-14"/></svg></button>';
        const art=row.querySelector('.drawer-item-art');art.style.setProperty('--photo-bg',item.photoBg);art.style.setProperty('--object-color',item.objectColor);
        row.querySelector('strong').textContent=item.name;row.querySelector('.drawer-item-info span').textContent=`${item.brand} · ${meta.label}`;row.querySelector('b').textContent=item.price;
        const remove=row.querySelector('.drawer-delete');remove.setAttribute('aria-label',`从清单删除 ${item.name}`);remove.addEventListener('click',()=>removeDrawerItem(source.id,groupKey,item.id,item.name));section.appendChild(row);
      });content.appendChild(section);
    });
  });
}

function sourceForMutation(sourceId){return state.imageSources.find(source=>source.id===sourceId)||{id:'single',selectedGroups:state.selectedGroups,groupMeta:state.groupMeta}}
function removeDrawerItem(sourceId,groupKey,productId,name){
  if(window.blockMaterialListMutation?.())return;
  const source=sourceForMutation(sourceId);const group = source.selectedGroups.get(groupKey);
  group?.delete(productId);
  if(!group?.size) source.selectedGroups.delete(groupKey);
  if(source.id===state.currentSourceId||source.id==='single'){state.selectedGroups=source.selectedGroups;saveCurrentSource();}
  updateSelectedUI();
  renderObjectTabs();
  renderResults(0);
  showToast(`已从清单删除“${name}”`);
}

function removeDrawerGroup(sourceId,groupKey,label){
  if(window.blockMaterialListMutation?.())return;
  const source=sourceForMutation(sourceId);source.selectedGroups.delete(groupKey);
  if(source.id===state.currentSourceId||source.id==='single'){state.selectedGroups=source.selectedGroups;saveCurrentSource();}
  updateSelectedUI();renderObjectTabs();renderResults(0);showToast(`已删除“${label}”分组中的物料`);
}

let pendingExitAction=null;
let exitTrigger=null;
function openExitModal(action,trigger,{title='确认退出？',description='退出后，本次已添加的物料和 AI 提取结果将不会保存。',confirmLabel='确认退出'}={}){
  pendingExitAction=action;exitTrigger=trigger;
  $('#exitModalTitle').textContent=title;
  $('#exitModalDescription').textContent=description;
  $('#exitConfirm').textContent=confirmLabel;
  exitModalBackdrop.hidden=false;exitModal.hidden=false;exitModal.removeAttribute('inert');exitModal.setAttribute('aria-hidden','false');
  $('#exitCancel').focus();
}
function closeExitModal(returnFocus=true){
  if(exitModal.hidden)return;
  exitModal.setAttribute('aria-hidden','true');exitModal.setAttribute('inert','');exitModal.hidden=true;exitModalBackdrop.hidden=true;
  const trigger=exitTrigger;pendingExitAction=null;exitTrigger=null;
  if(returnFocus&&trigger?.isConnected)trigger.focus({preventScroll:true});
}
function requestExit(action,trigger){
  if(totalSelected()===0){action();return;}
  openExitModal(action,trigger);
}
function requestClearCurrentImage(trigger){
  if(totalSelected()&&window.blockMaterialListMutation?.())return;
  openExitModal(clearCurrentImage,trigger,{
    title:'确认清除当前任务？',
    description:'清除后，当前任务中的所有图片、识别结果、AI 提取结果和物料清单内容都将被清空，且无法恢复。',
    confirmLabel:'确认清除'
  });
}

function openDrawer(){
  drawer.hidden = false;
  drawerBackdrop.hidden = false;
  requestAnimationFrame(()=>drawerBackdrop.classList.add('show'));
  drawer.classList.add('open');
  drawer.removeAttribute('inert');
  drawer.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  $('#drawerClose').focus();
}

function closeDrawer(){
  if(!drawer.classList.contains('open')) return;
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden','true');
  drawer.setAttribute('inert','');
  drawerBackdrop.classList.remove('show');
  document.body.style.overflow = '';
  setTimeout(()=>{drawerBackdrop.hidden=true;drawer.hidden=true;},220);
  $('#selectedEntry').focus({preventScroll:true});
}

function updateFilterLabels(){
  $('#categoryValue').textContent = state.filters.category || '全部分类';
  $('#brandValue').textContent = state.filters.brand || '全部品牌';
  $('#colorValue').textContent = state.filters.color || '全部色系';
  $('#priceValue').textContent = state.filters.price.label || '不限价格';
  renderActiveFilters();
}

function renderActiveFilters(){
  const row = $('#activeFilters');
  row.innerHTML = '';
  const values = [
    ['category',state.filters.category],['brand',state.filters.brand],['color',state.filters.color],['price',state.filters.price.label]
  ].filter(([,value])=>value);
  values.forEach(([key,value])=>{
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'filter-chip';
    button.innerHTML = '<strong></strong><span aria-hidden="true">×</span>';
    button.querySelector('strong').textContent = value;
    button.setAttribute('aria-label',`清除筛选 ${value}`);
    button.addEventListener('click',()=>clearFilter(key));
    row.appendChild(button);
  });
}

function clearFilter(key){
  if(key==='price'){state.filters.price={label:'',min:null,max:null};state.sort='default';}
  else if(key==='sort') state.sort='default';
  else state.filters[key]='';
  updateFilterLabels();renderResults(260);
}

function closeFilter(){
  state.openFilter = null;
  filterPopover.hidden = true;
  filterPopover.innerHTML = '';
  document.querySelectorAll('.filter-button').forEach(button=>button.setAttribute('aria-expanded','false'));
}

function popoverToolbar(title,withSearch=true){
  const toolbar = document.createElement('div');
  toolbar.className = 'popover-toolbar';
  toolbar.innerHTML = `${withSearch?'<input class="popover-search" type="search" />':'<strong class="popover-title"></strong>'}<button class="popover-reset" type="button">重置</button><button class="popover-close" type="button" aria-label="关闭筛选">×</button>`;
  if(withSearch){toolbar.querySelector('input').placeholder = `搜索${title}`;toolbar.querySelector('input').setAttribute('aria-label',`搜索${title}`);}
  else toolbar.querySelector('.popover-title').textContent = title;
  toolbar.querySelector('.popover-close').addEventListener('click',closeFilter);
  return toolbar;
}

function openFilter(type,button){
  if(state.openFilter===type){closeFilter();return;}
  closeFilter();
  state.openFilter = type;
  button.setAttribute('aria-expanded','true');
  filterPopover.hidden = false;
  if(type==='category') renderCategoryPopover();
  if(type==='brand') renderBrandPopover();
  if(type==='color') renderColorPopover();
  if(type==='price') renderPricePopover();
}

function applyFilter(key,value){
  state.filters[key] = value;
  updateFilterLabels();
  closeFilter();
  renderResults(280);
}

function renderCategoryPopover(){
  const toolbar = popoverToolbar('分类');
  const currentTop = Object.keys(categoryTree).find(top=>categoryTree[top].some(([,items])=>items.includes(state.filters.category))) || '石材';
  const recent = document.createElement('div');
  recent.className = 'recent-section';
  recent.innerHTML = '<strong>最近使用</strong><div class="recent-list"><button type="button">面料 / 一般布料</button><button type="button">木材 / 木饰面</button><button type="button">石材 / 天然石材</button></div>';
  const layout = document.createElement('div');layout.className='category-layout';
  const list = document.createElement('div');list.className='category-list';
  const detail = document.createElement('div');detail.className='category-detail';
  function showTop(top){
    list.querySelectorAll('button').forEach(button=>button.classList.toggle('active',button.dataset.top===top));
    detail.innerHTML = '<p class="detail-eyebrow">CATEGORY</p><h3></h3>';
    detail.querySelector('h3').textContent = top;
    categoryTree[top].forEach(([group,items])=>{
      const section=document.createElement('section');section.className='category-section-block';
      section.innerHTML='<h4></h4><div class="category-options"></div>';section.querySelector('h4').textContent=group;
      items.forEach(item=>{
        const option=document.createElement('button');option.type='button';option.textContent=item;
        option.classList.toggle('active',state.filters.category===item);
        option.addEventListener('click',()=>applyFilter('category',item));
        section.querySelector('.category-options').appendChild(option);
      });detail.appendChild(section);
    });
  }
  Object.keys(categoryTree).forEach(top=>{
    const item=document.createElement('button');item.type='button';item.dataset.top=top;item.innerHTML='<span></span><span>›</span>';item.querySelector('span').textContent=top;
    item.addEventListener('click',()=>showTop(top));list.appendChild(item);
  });
  layout.append(list,detail);filterPopover.append(toolbar,recent,layout);showTop(currentTop);
  recent.querySelectorAll('button').forEach((button,index)=>button.addEventListener('click',()=>applyFilter('category',['一般布料','木饰面','天然石材'][index])));
  toolbar.querySelector('.popover-reset').addEventListener('click',()=>clearFilter('category'));
  toolbar.querySelector('input').addEventListener('input',event=>{
    const q=event.target.value.trim();
    list.querySelectorAll('button').forEach(item=>item.hidden=q&&!item.dataset.top.includes(q));
  });
}

function renderBrandPopover(){
  const toolbar=popoverToolbar('品牌');
  const layout=document.createElement('div');layout.className='brand-layout';
  layout.innerHTML='<div class="brand-block"><h3>最近使用</h3><div class="brand-grid recent-brands"></div></div><div class="letter-index"></div><div class="brand-block"><h3>全部品牌</h3><div class="brand-grid all-brands"></div></div>';
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('').forEach(letter=>{const span=document.createElement('span');span.textContent=letter;layout.querySelector('.letter-index').appendChild(span)});
  function fill(query=''){
    const all=layout.querySelector('.all-brands');all.innerHTML='';
    brands.filter(name=>name!=='全部品牌'&&name.toLowerCase().includes(query.toLowerCase())).forEach(name=>{
      const button=document.createElement('button');button.type='button';button.textContent=name;button.classList.toggle('active',state.filters.brand===name);button.addEventListener('click',()=>applyFilter('brand',name));all.appendChild(button);
    });
  }
  ['Minotti','Poliform','B&B Italia'].forEach(name=>{const button=document.createElement('button');button.type='button';button.textContent=name;button.addEventListener('click',()=>applyFilter('brand',name));layout.querySelector('.recent-brands').appendChild(button)});
  filterPopover.append(toolbar,layout);fill();
  toolbar.querySelector('input').addEventListener('input',event=>fill(event.target.value));
  toolbar.querySelector('.popover-reset').addEventListener('click',()=>clearFilter('brand'));
}

function renderColorPopover(){
  const toolbar=popoverToolbar('色系',false);
  const layout=document.createElement('div');layout.className='color-layout';
  const grid=document.createElement('div');grid.className='color-grid';
  colors.forEach(([name,value])=>{
    const button=document.createElement('button');button.type='button';button.className=`color-option${state.filters.color===name?' active':''}`;button.innerHTML='<i></i><span></span>';button.querySelector('i').style.background=value;button.querySelector('span').textContent=name;button.addEventListener('click',()=>applyFilter('color',name));grid.appendChild(button);
  });layout.appendChild(grid);filterPopover.append(toolbar,layout);
  toolbar.querySelector('.popover-reset').addEventListener('click',()=>clearFilter('color'));
}

function renderPricePopover(){
  const toolbar=popoverToolbar('价格',false);
  const layout=document.createElement('div');layout.className='price-layout';
  const presets=document.createElement('div');presets.className='price-presets';
  pricePresets.forEach(item=>{
    const button=document.createElement('button');button.type='button';button.textContent=item.label;button.classList.toggle('active',state.filters.price.label===item.label||(item.label==='不限价格'&&!state.filters.price.label));
    button.addEventListener('click',()=>{state.filters.price=item.label==='不限价格'?{label:'',min:null,max:null}:{...item};updateFilterLabels();closeFilter();renderResults(280)});presets.appendChild(button);
  });
  const custom=document.createElement('div');custom.className='price-custom';custom.innerHTML='<input type="number" min="0" placeholder="最低价" aria-label="最低价格"><span>—</span><input type="number" min="0" placeholder="最高价" aria-label="最高价格"><button type="button">确定</button>';
  custom.querySelector('button').addEventListener('click',()=>{
    const [minInput,maxInput]=custom.querySelectorAll('input');const min=minInput.value===''?null:Number(minInput.value),max=maxInput.value===''?null:Number(maxInput.value);
    if(min!==null&&max!==null&&min>max){showToast('最低价不能高于最高价');minInput.focus();return;}
    const label=min!==null&&max!==null?`¥ ${min}–${max}`:min!==null?`¥ ${min} 以上`:max!==null?`¥ ${max} 以下`:'';
    state.filters.price={label,min,max};updateFilterLabels();closeFilter();renderResults(280);
  });
  layout.append(presets,custom);filterPopover.append(toolbar,layout);
  toolbar.querySelector('.popover-reset').addEventListener('click',()=>clearFilter('price'));
}

let drawing = null;
imageStage.addEventListener('pointerdown',event=>{
  if(!state.hasImage||event.button!==0||event.target.closest('button')) return;
  const point=imagePointFromEvent(event);if(!point)return;
  drawing={pointerId:event.pointerId,start:point,moved:false,parentObjectId:state.selectedObjectId,box:null,last:point};
  state.activeAiResultId=null;
  renderAiResults();
  imageStage.setPointerCapture(event.pointerId);
});
imageStage.addEventListener('pointermove',event=>{
  if(!drawing||drawing.pointerId!==event.pointerId) return;
  const point=imagePointFromEvent(event,true);drawing.last=point;
  const width=Math.abs(point.x-drawing.start.x),height=Math.abs(point.y-drawing.start.y);
  if(width*imageCanvas.clientWidth*state.imageZoom/100<5&&height*imageCanvas.clientHeight*state.imageZoom/100<5)return;
  drawing.moved=true;
  const box={x:Math.min(drawing.start.x,point.x),y:Math.min(drawing.start.y,point.y),width,height};drawing.box=box;
  applyBox(manualSelection,box);manualSelection.classList.add('show');recognitionHighlight.classList.remove('show');
});
imageStage.addEventListener('pointerup',event=>{
  if(!drawing||drawing.pointerId!==event.pointerId)return;
  imageStage.releasePointerCapture(event.pointerId);
  const box=drawing.box;
  if(drawing.moved&&box&&box.width*imageCanvas.clientWidth*state.imageZoom/100>=28&&box.height*imageCanvas.clientHeight*state.imageZoom/100>=28){
    const index=++state.manualCounter;
    state.manualSelection={...box,anchor:drawing.last,id:`manual-${state.currentSourceId||'single'}-${index}`,label:`框选区域 ${String(index).padStart(2,'0')}`,parentObjectId:drawing.parentObjectId||null};
    state.selectedObjectId=drawing.parentObjectId||null;state.searchMode='similar';state.resultsMode='manual';
    state.groupMeta.set(state.manualSelection.id,{key:state.manualSelection.id,label:state.manualSelection.label,type:'manual',parentObjectId:state.manualSelection.parentObjectId,box:{...box},anchor:drawing.last});
    saveCurrentSource();clearBatchSelection(false);resetFilters();renderObjectTabs();updateModeTabs();updateHighlight();renderResults(420);showToast('已按框选区域搜索，选择物料后会加入上方对象列表');
  }else{manualSelection.classList.remove('show');updateHighlight();}
  drawing=null;
});
imageStage.addEventListener('pointercancel',()=>{drawing=null;manualSelection.classList.remove('show');updateHighlight()});
imageStage.addEventListener('wheel',event=>{
  if(!state.hasImage||event.target.closest('button'))return;
  event.preventDefault();
  const origin=state.imageZoom===1?(imagePointFromEvent(event)||{x:50,y:50}):state.zoomOrigin;
  applyZoom(state.imageZoom+(event.deltaY<0 ? .2 : -.2),origin);
},{passive:false});
$('#zoomOut').addEventListener('click',()=>applyZoom(state.imageZoom-.2));
$('#zoomIn').addEventListener('click',()=>applyZoom(state.imageZoom+.2));
$('#zoomReset').addEventListener('click',()=>applyZoom(1,{x:50,y:50}));
sourceImage.addEventListener('load',()=>requestAnimationFrame(updateImageCanvasMetrics));
window.addEventListener('resize',()=>requestAnimationFrame(updateImageCanvasMetrics));
['dragenter','dragover'].forEach(type=>imageStage.addEventListener(type,event=>{
  if(state.hasImage) return;
  event.preventDefault();
  if(event.dataTransfer) event.dataTransfer.dropEffect='copy';
  imageStage.classList.add('dragging');
}));
imageStage.addEventListener('dragleave',event=>{
  if(!imageStage.contains(event.relatedTarget)) imageStage.classList.remove('dragging');
});
imageStage.addEventListener('drop',event=>{
  if(state.hasImage) return;
  event.preventDefault();
  imageStage.classList.remove('dragging');
  startUpload(event.dataTransfer?.files?.[0],state.uploadIntent);
});

function chooseUploadIntent(intent){
  state.pendingUploadIntent=intent;
  imageFile.click();
}

$('#bannerUpload').addEventListener('click',()=>showImageSearchEntry('similar'));
$('#materialsListEntry').addEventListener('click',()=>showImageSearchEntry('materials'));
$('#emptyUpload').addEventListener('click',()=>chooseUploadIntent(state.uploadIntent));
$('#uploadLinkForm').addEventListener('submit',event=>{
  event.preventDefault();const input=$('#uploadLinkInput'),url=input.value.trim();
  if(!url){showToast(state.uploadIntent==='materials'?'请粘贴空间图片链接':'请粘贴单品图片链接');input.focus();return;}
  startUrlSearch(url,state.uploadIntent,event.currentTarget.querySelector('button'));
});
imageFile.addEventListener('change',event=>{startUpload(event.target.files[0],state.pendingUploadIntent);event.target.value=''});
$('#backButton').addEventListener('click',event=>requestExit(showLanding,event.currentTarget));
$('#brandHome').addEventListener('click',event=>requestExit(showLanding,event.currentTarget));
$('#clearFile').addEventListener('click',()=>clearPendingUpload({focus:true}));
$('#imageSourceInput').addEventListener('input',()=>{
  if(state.pendingImageFile && $('#imageSourceInput').value!==state.pendingImageFile.name)state.pendingImageFile=null;
  updatePendingUploadUI();
});
$('#imageSourceInput').addEventListener('keydown',event=>{
  if(event.key==='Enter'){event.preventDefault();$('#searchButton').click();}
});
$('#imageSourceInput').addEventListener('paste',event=>{
  const file=[...(event.clipboardData?.files || [])].find(item=>item.type.startsWith('image/'));
  if(file){event.preventDefault();startUpload(file,state.uploadIntent==='materials'?'materials':'similar');}
});
$('#searchButton').addEventListener('click',()=>{
  if(state.pendingImageFile){startUpload(state.pendingImageFile,state.pendingUploadIntent);return;}
  const value=$('#imageSourceInput').value.trim();
  if(value && value!==state.imageInputValue){startUrlSearch(value,state.pendingUploadIntent || state.uploadIntent);return;}
  if(value && state.hasImage){renderResults(420);showToast('已重新执行当前图片搜索');return;}
  showToast('请先输入图片链接或选择图片');
});
$('#keywordForm').addEventListener('submit',event=>{event.preventDefault();showToast('关键词搜索仅用于入口页视觉演示')});

$('#objectScroller').addEventListener('click',event=>{
  const remove=event.target.closest('.object-delete');
  if(remove){deleteRecognizedObject(remove.dataset.deleteObjectId);return;}
  const button=event.target.closest('.object-tab');if(button)selectObject(button.dataset.objectId,button.dataset.contextType)
});
canvasAiMenu?.addEventListener('click',event=>{
  const action=event.target.closest('[data-ai-type]');if(!action||!state.manualSelection)return;
  startAiExtraction(action.dataset.aiType,{box:state.manualSelection,parentObjectId:state.manualSelection.parentObjectId,manualId:state.manualSelection.id});
});
$('#aiResultsList')?.addEventListener('click',event=>{
  const card=event.target.closest('.ai-result-card');if(!card)return;
  if(event.target.closest('.ai-result-save')){saveAiResult(card.dataset.aiResultId);return;}
  if(event.target.closest('.ai-result-delete')){deleteAiResult(card.dataset.aiResultId);return;}
  state.activeAiResultId=card.dataset.aiResultId;state.manualSelection=null;state.searchMode='similar';clearBatchSelection(false);resetFilters();saveCurrentSource();renderAiResults();renderObjectTabs();updateModeTabs();updateHighlight();renderResults(320);
});
$('#aiResultsList')?.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target.matches('.ai-result-card')){event.preventDefault();event.target.click();}});
$('#imageSourceStrip')?.addEventListener('click',event=>{
  const tab=event.target.closest('.image-source-tab');if(tab){loadImageSource(tab.dataset.sourceId);return;}
  if(event.target.closest('.image-source-add')){state.pendingUploadIntent='materials';state.pendingAddSource=true;imageFile.click();}
});
$('#objectScroller').addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  const tabs=[...event.currentTarget.querySelectorAll('.object-tab')];const current=tabs.indexOf(document.activeElement);if(current<0)return;event.preventDefault();
  let next=event.key==='ArrowRight'?Math.min(current+1,tabs.length-1):event.key==='ArrowLeft'?Math.max(current-1,0):event.key==='Home'?0:tabs.length-1;tabs[next].focus();
});
$('#purposeSimilar').addEventListener('click',()=>switchSearchPurpose('similar'));
$('#purposeMaterials').addEventListener('click',()=>switchSearchPurpose('materials'));
$('#similarMode').addEventListener('click',()=>switchResultSearchMode('similar'));
$('#otherMode').addEventListener('click',()=>switchResultSearchMode('other'));
$('#otherMaterialInput').addEventListener('input',event=>{state.otherSearchDraft=event.target.value});
$('#otherMaterialSearch').addEventListener('submit',event=>{
  event.preventDefault();
  state.otherSearchDraft=$('#otherMaterialInput').value;
  state.otherSearchQuery=state.otherSearchDraft.trim();
  const submit=$('#otherMaterialSubmit');
  clearTimeout(state.otherSearchTimer);submit.disabled=true;submit.textContent='搜索中';$('#otherMaterialSearch').setAttribute('aria-busy','true');
  clearBatchSelection(false);renderResults(420);saveCurrentSource();
  state.otherSearchTimer=setTimeout(()=>{submit.disabled=false;submit.textContent='搜索';$('#otherMaterialSearch').removeAttribute('aria-busy')},440);
});

[['categoryFilter','category'],['brandFilter','brand'],['colorFilter','color'],['priceFilter','price']].forEach(([id,type])=>$("#"+id).addEventListener('click',event=>{event.stopPropagation();openFilter(type,event.currentTarget)}));
document.addEventListener('click',event=>{if(state.openFilter&&!event.target.closest('#filterPopover')&&!event.target.closest('.filter-button'))closeFilter()});

$('#selectedEntry').addEventListener('click',openDrawer);
$('#objectGuideClose').addEventListener('click',hideObjectGuide);
$('#drawerClose').addEventListener('click',closeDrawer);
drawerBackdrop.addEventListener('click',closeDrawer);
$('#exitCancel').addEventListener('click',()=>closeExitModal());
exitModalBackdrop.addEventListener('click',()=>closeExitModal());
$('#exitConfirm').addEventListener('click',()=>{const action=pendingExitAction;closeExitModal(false);action?.();});
// The Excel export handler is registered by export-materials.js.
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){if(!exitModal.hidden)closeExitModal();else if(drawer.classList.contains('open'))closeDrawer();else if(state.openFilter)closeFilter();else if(state.objectGuideVisible)hideObjectGuide();}
  if(event.key==='Tab'&&!exitModal.hidden){
    const focusable=[...exitModal.querySelectorAll('button:not([disabled])')],first=focusable[0],last=focusable[focusable.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }
  if(event.key==='Tab'&&drawer.classList.contains('open')){
    const focusable=[...drawer.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled])')];if(!focusable.length)return;
    const first=focusable[0],last=focusable[focusable.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }
});

function seedSelections(){
  const group=new Map();products.sofa.slice(0,3).map(productFromRow).forEach(item=>group.set(item.id,{...item,source:'similar'}));state.selectedGroups.set('sofa-1',group);updateSelectedUI();renderObjectTabs();renderResults(0);
}

function applyDemoState(value){
  closeDrawer();
  state.demoState=value;
  state.recognitionStatus='success';
  state.objects=value==='empty'?[]:value==='overflow'?[...overflowObjects]:[...recognizedObjects];
  state.selectedObjectId=state.objects[0]?.id||null;
  state.manualSelection=null;
  state.searchMode='similar';
  state.resultsMode=state.selectedObjectId?'object':'whole';
  state.selectedGroups=new Map();
  state.groupMeta=new Map();state.aiResults=[];state.activeAiResultId=null;state.manualCounter=0;state.aiResultCounter=0;
  state.batchSelected=new Set();
  hideObjectGuide();
  resetFilters();
  updateSelectedUI();
  updateBatchFavoriteUI();
  renderObjectTabs();
  updateModeTabs();
  updateHighlight();
  renderResults(0);
  saveCurrentSource();renderImageSources();renderAiResults();
  if(state.objects.length){state.objectGuideShown=false;requestAnimationFrame(showObjectGuide);}
  showToast(value==='empty'?'已切换：未识别到物体':value==='overflow'?'已切换：识别内容较多':'已切换：正常识别结果');
}

function initFromQuery(){
  renderLandingCards();updateFilterLabels();updateSelectedUI();setImage(sampleImage,'客厅效果图.jpg');
  const demo=new URLSearchParams(location.search).get('demo');
  if(!demo) return;
  state.uploadIntent='materials';
  state.pendingUploadIntent='materials';
  resetSearchState();
  if(demo==='loading'){showSearch({status:'loading',keepLoading:true});return;}
  if(demo==='empty'){showSearch({status:'success',objects:[]});$('#demoStateSelect').value='empty';return;}
  if(demo==='overflow'){showSearch({status:'success',objects:overflowObjects});$('#demoStateSelect').value='overflow';return;}
  if(demo==='recognized'){showSearch({status:'success',objects:recognizedObjects});$('#demoStateSelect').value='recognized';return;}
  if(['object','selected','drawer','material'].includes(demo)){
    showSearch({status:'success',objects:recognizedObjects,selected:'sofa-1',mode:demo==='material'?'material':'similar'});
    if(demo==='selected'||demo==='drawer')seedSelections();
    if(demo==='drawer')setTimeout(openDrawer,50);
    if(demo==='material')setTimeout(()=>openFilter('category',$('#categoryFilter')),80);
  }
}

$('#demoStateSelect').addEventListener('change',event=>applyDemoState(event.target.value));
initFromQuery();

// Shared full filter catalogue used by both image-search experiences.
const fullCategoryTree = [["石材",[["人造石",["水磨石","合成石","石英石"]],["天然石",["大理石","玉石"]],["石材拼花",[]],["其他",[]]]],["砖",[["通体砖",["防滑砖"]],["构件砖",[]],["玻化砖、抛光砖",[]],["砌块砖",[]],["釉面砖",["仿水磨石砖","仿大理石瓷砖"]],["红砖",[]],["艺术砖",["手工砖","花砖"]],["陶土砖",[]],["仿古砖",[]],["混凝土砖",[]],["砖条",[]],["青砖",[]],["微晶石砖",[]],["瓷片",[]],["岩板",[]],["古砖",[]],["幕墙砖",[]],["户外地砖",[]],["其他",[]]]],["木材",[["木饰面",["天然木皮","科技木皮"]],["防腐木",[]],["板材",[]],["原木",[]],["其他",[]]]],["地板",[["木地板",["木塑地板","复合木地板","强化木地板","竹地板","瓷木复合地板"]],["地胶板",[]],["石晶地板",[]],["橡胶地板",[]],["架空地板",[]],["地板组合",[]],["其他",[]]]],["涂料",[["艺术涂料",[]],["吸音涂料",[]],["乳胶漆",[]],["真石漆",[]],["自流平",[]],["地坪漆",[]],["其他",[]]]],["墙纸",[["布面墙纸",[]],["胶面墙纸",[]],["PVC墙纸",[]],["海基布",[]],["无纺布墙纸",[]],["天然材料墙纸",[]],["纸质墙纸",[]],["喷绘墙纸",[]],["手绘墙纸",[]],["刺绣墙纸",[]],["3D堆墨墙纸",[]],["金箔、银箔墙纸",[]],["其他",[]]]],["玻璃",[["单层玻璃",[]],["夹层玻璃",["夹胶玻璃","夹丝玻璃"]],["艺术玻璃、水晶",[]],["其他",[]]]],["金属",[["铜",[]],["铝",[]],["不锈钢",[]],["特殊金属",["金属网、金属丝"]],["其他",[]]]],["特殊材料",[["塑料",["树脂板"]],["编织材料",["仿藤编"]],["软瓷",[]],["光学材料",[]],["声学材料",[]],["金箔、银箔",[]],["纤维材料",[]],["纸类",[]],["装饰贴膜",[]],["预制板",[]],["马赛克",[]],["液态金属",[]],["PU仿真石",[]],["发泡陶瓷",[]],["其他",[]]]],["面料",[["一般布料",[]],["一般户外布",[]],["耐磨布",[]],["特色面料",[]],["特色户外面料",[]],["丝绸",[]],["皮革",["真皮","人造皮"]]]],["窗帘",[["窗帘布",[]],["窗纱",[]],["卷帘布",[]],["遮光布",[]],["百叶帘",[]],["罗马帘",[]],["窗帘配件",[]],["蜂巢帘",[]],["窗帘电机",[]],["其他",[]]]],["洁具",[["座便器",[]],["龙头",["台出龙头","厨房龙头"]],["地漏",[]],["洁具五金配件",[]],["淋浴组合",[]],["淋浴房",[]],["洗手盆",["厨盆"]],["小便器",[]],["浴缸",[]],["蹲便器",[]],["洁具组合",[]],["其他",[]]]],["五金",[["家具五金",[]],["装饰五金",[]],["门控五金",[]],["五金组合",[]],["其他",[]]]],["工程灯具",[["嵌入式",[]],["嵌墙式",[]],["吸顶类",[]],["线性类",[]],["柔性类",[]],["轨道类",[]],["低压轨道系统",[]],["展柜类",[]],["明装类",[]],["投射类",[]],["壁灯类",[]],["埋地类",[]],["标识类",[]],["线槽类",[]],["矮柱类",[]],["水下类",[]],["洗墙类",[]],["投光类",[]],["地埋类",[]],["线性轮廓类",[]],["壁挂式",[]],["点光类",[]],["雨棚灯",[]],["步道灯",[]],["中、高杆灯",[]],["草坪类",[]],["特殊照明类",[]],["其他",[]]]],["开关面板",[["普通开关面板",[]],["智能开关面板",[]],["配件",[]]]],["镜子",[["普通镜",[]],["银镜",[]],["魔镜",[]],["成品镜",[]],["其他",[]]]],["室内分区",[["隔断",[]],["其他",[]]]],["门窗",[["门",[]],["窗",[]]]],["设备",[["水疗基础设备",[]],["SPA设备",[]],["泳池",[]],["健身器械",[]],["安防设备",[]],["消防设备",[]],["给排水",[]],["光电设备",[]],["暖通",[]],["电梯",[]],["净水设备",[]],["文娱设备",[]],["其他",[]]]],["楼梯及配件",[["楼梯",[]],["栏杆",[]],["楼梯组件",[]],["其他",[]]]],["电器",[["餐厨电器",[]],["卫浴电器",[]],["电暖器具",[]],["生活起居电器",[]],["厨卫小家电",[]],["其他",[]]]],["壁炉及加热器",[["真火壁炉",[]],["装饰壁炉",[]],["壁炉配件",[]],["其他",[]]]],["家具",[["柜类",[]],["几类",["茶几","边几"]],["椅凳",["休闲椅","矮凳"]],["桌类",[]],["床类",[]],["沙发",["多人沙发","单人沙发"]],["活动屏风",[]],["办公家具",[]],["户外家具",[]],["娱乐家具",[]],["家具组合",[]],["其他",[]]]],["装饰灯具",[["台灯",[]],["吊灯",[]],["壁灯",[]],["落地灯",[]],["照画灯",[]],["其他",[]]]],["地毯",[["手工地毯",[]],["机加手地毯",[]],["机织地毯",[]],["移动块毯",[]],["地毯组合",[]],["其他",[]]]],["艺术品",[["挂画",[]],["艺术装置",[]],["其他",[]]]],["艺术家作品",[["水墨",[]],["油画",[]],["摄影",[]],["版画",[]],["雕塑",[]],["水彩",[]],["陶瓷",[]],["综合材料",[]],["纺织艺术",[]],["新媒体艺术",[]],["装置",[]]]],["饰品",[["摆件",[]],["书籍",[]],["餐厨饰品",[]],["卫浴饰品",[]],["植物",[]],["景观材料",[]],["仿真模型",[]],["衣帽间饰品",[]],["饰品组合",[]],["其他",[]]]],["纺织品",[["装饰纺织品",["抱枕"]],["其他",[]]]],["建筑用材",[["基层板",[]]]],["全屋定制",[["收纳系统",[]],["衣帽间系统",[]],["厨房系统",[]],["护墙板系统",[]],["门系统",[]],["色板",[]],["其他",[]]]]];
const fullBrands = [['3M',''],['AUSTROFLAMM','奥地利壁炉'],['AXOR','雅生'],['Artemide','阿特米德'],['B&B Italia',''],['Baker','贝克家具'],['Cappellini','卡佩里尼'],['CEA',''],['Duravit','杜拉维特'],['Edra','埃德拉'],['Flos','弗洛斯'],['GROHE','高仪'],['GUBI','古比'],['Hansgrohe','汉斯格雅'],['HAY',''],['Ideal Standard','理想标准'],['JUNG','永诺'],['Kartell','卡特尔'],['Kvadrat','克瓦德拉特'],['LEXINGTON','莱克星顿'],['Ligne Roset','写意空间'],['MIRAGE','米拉珥陶瓷'],['Minotti','米洛提'],['Molteni&C',''],['Nobilia','柏丽'],['Occhio','奥可乔'],['Poliform','博洛尼夫'],['Porro','波洛'],['Quooker','酷科'],['Rimadesio','瑞玛迪斯奥'],['Roca','乐家'],['SieMatic','西曼帝克'],['Smeg','斯麦格'],['TOTO','东陶'],['USM',''],['Valcucine','万古奇'],['Vitra','维特拉'],['Walter Knoll','沃尔特诺尔'],['XAL',''],['Yabu Pushelberg','雅布'],['Zanotta','扎诺塔']];
const fullColors = [['彩色系','#b978c5'],['棕色系','#76503c'],['橙色系','#d9823b'],['浅木色系','#c79c6f'],['深木色系','#654936'],['灰色系','#9b9995'],['玫瑰金色系','#bd8b86'],['白色系','#f2f0eb'],['米黄色系','#d9c7a9'],['粉色系','#d9a6ad'],['紫色系','#806c9e'],['红色系','#a55145'],['绿色系','#66806c'],['蓝色系','#687e99'],['透明色系','linear-gradient(135deg,#fff 20%,#d8e4e8 50%,#fff 80%)'],['金色系','#c7a755'],['铜色系','#a56f4f'],['银色系','#b8bec2'],['青色系','#5c8f91'],['香槟色系','#c7b08a'],['黄色系','#d4b84e'],['黑色系','#333331']];
const fullBrandName = ([english,chinese]) => chinese || english;
const readFilterList = (key,fallback=[]) => {try{const value=JSON.parse(localStorage.getItem(key));return Array.isArray(value)?value:fallback}catch{return fallback}};
const writeFilterList = (key,value) => {try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
const rememberFilterValue = (list,value,limit=6) => value?[value,...list.filter(item=>item!==value)].slice(0,limit):list;
let fullRecentCategories = readFilterList('materialRecentCategories',['石材 / 天然石 / 大理石','家具 / 椅凳 / 休闲椅','地毯 / 手工地毯']);
let fullRecentBrands = readFilterList('materialRecentBrands',['高仪','西曼帝克','雅生']);
let fullFavoriteBrands = readFilterList('materialFavoriteBrands',['弗洛斯','万古奇']);

function resetFilters(){
  state.filters={category:'',brand:'',color:[],price:{label:'',min:null,max:null}};
  state.sort='default';
  updateFilterLabels();
}

function selectedColorValues(){return Array.isArray(state.filters.color)?state.filters.color:(state.filters.color?[state.filters.color]:[])}

function updateFilterLabels(){
  const selectedColors=selectedColorValues();
  $('#categoryValue').textContent=state.filters.category?state.filters.category.split(' / ').pop():'全部分类';
  $('#brandValue').textContent=state.filters.brand||'全部品牌';
  $('#colorValue').textContent=selectedColors.length?(selectedColors.length===1?selectedColors[0]:`${selectedColors.length} 项色系`):'全部色系';
  $('#priceValue').textContent=state.filters.price.label||'不限价格';
  renderActiveFilters();
}

function renderActiveFilters(){
  const row=$('#activeFilters');row.innerHTML='';
  const values=[['category',state.filters.category],['brand',state.filters.brand],...selectedColorValues().map(value=>['color',value]),['price',state.filters.price.label]].filter(([,value])=>value);
  values.forEach(([key,value])=>{const button=document.createElement('button');button.type='button';button.className='filter-chip';button.innerHTML='<strong></strong><span aria-hidden="true">×</span>';button.querySelector('strong').textContent=value;button.setAttribute('aria-label',`清除筛选 ${value}`);button.addEventListener('click',()=>clearFilter(key,value));row.appendChild(button)});
}

function clearFilter(key,value){
  if(key==='price')state.filters.price={label:'',min:null,max:null};
  else if(key==='color')state.filters.color=selectedColorValues().filter(item=>item!==value);
  else state.filters[key]='';
  updateFilterLabels();renderResults(260);
}

function applyCategoryPath(path){
  state.filters.category=path;fullRecentCategories=rememberFilterValue(fullRecentCategories,path);writeFilterList('materialRecentCategories',fullRecentCategories);updateFilterLabels();closeFilter();renderResults(280);
}

function renderCategoryPopover(){
  const toolbar=popoverToolbar('分类');
  const recent=document.createElement('section');recent.className='recent-section';recent.innerHTML='<div class="filter-section-heading"><strong>最近使用</strong><span>快速回到刚筛选过的分类</span></div><div class="recent-list"></div>';
  fullRecentCategories.forEach(path=>{const button=document.createElement('button');button.type='button';button.textContent=path;button.addEventListener('click',()=>applyCategoryPath(path));recent.querySelector('.recent-list').appendChild(button)});
  const layout=document.createElement('div');layout.className='category-layout';
  const list=document.createElement('div');list.className='category-list';const detail=document.createElement('div');detail.className='category-detail';
  function showTop(index){
    list.querySelectorAll('button').forEach((button,itemIndex)=>button.classList.toggle('active',itemIndex===index));
    const [top,seconds]=fullCategoryTree[index];detail.innerHTML='<div class="category-detail-head"><div><p class="detail-eyebrow">一级分类</p><button class="category-top-filter" type="button"><span></span><small>筛选全部</small></button></div><span></span></div>';detail.querySelector('.category-top-filter span').textContent=top;detail.querySelector('.category-top-filter').classList.toggle('active',state.filters.category===top);detail.querySelector('.category-top-filter').addEventListener('click',()=>applyCategoryPath(top));detail.querySelector('.category-detail-head > span').textContent=`${seconds.length} 个二级分类`;
    const plain=seconds.filter(([,thirds])=>!thirds.length),nested=seconds.filter(([,thirds])=>thirds.length);
    if(plain.length){const section=document.createElement('section');section.className='category-section-block category-plain-section';section.innerHTML='<h4>二级分类</h4><div class="category-options category-second-options"></div>';plain.forEach(([second])=>{const path=`${top} / ${second}`,button=document.createElement('button');button.type='button';button.className='category-second-only';button.innerHTML='<span></span><small>二级分类</small>';button.querySelector('span').textContent=second;button.classList.toggle('active',state.filters.category===path);button.addEventListener('click',()=>applyCategoryPath(path));section.querySelector('div').appendChild(button)});detail.appendChild(section)}
    nested.forEach(([second,thirds])=>{const secondPath=`${top} / ${second}`,section=document.createElement('section');section.className='category-subgroup';section.innerHTML='<button class="category-subgroup-title" type="button"><span></span><small>筛选此二级分类</small></button><div class="category-level-label">三级分类</div><div class="category-options category-third-options"></div>';section.querySelector('.category-subgroup-title span').textContent=second;section.querySelector('.category-subgroup-title').classList.toggle('active',state.filters.category===secondPath);section.querySelector('.category-subgroup-title').addEventListener('click',()=>applyCategoryPath(secondPath));thirds.forEach(third=>{const path=`${secondPath} / ${third}`,button=document.createElement('button');button.type='button';button.textContent=third;button.classList.toggle('active',state.filters.category===path);button.addEventListener('click',()=>applyCategoryPath(path));section.querySelector('.category-options').appendChild(button)});detail.appendChild(section)});
  }
  const rebuildTopList=()=>{list.innerHTML='';fullCategoryTree.forEach(([top],index)=>{const button=document.createElement('button');button.type='button';button.innerHTML='<span></span><span>›</span>';button.firstElementChild.textContent=top;button.addEventListener('click',()=>showTop(index));button.addEventListener('mouseenter',()=>showTop(index));list.appendChild(button)})};
  rebuildTopList();
  layout.append(list,detail);filterPopover.append(toolbar,recent,layout);
  const activeIndex=Math.max(0,fullCategoryTree.findIndex(([top])=>state.filters.category.startsWith(top)));showTop(activeIndex);
  toolbar.querySelector('.popover-reset').addEventListener('click',()=>clearFilter('category'));
  toolbar.querySelector('input').addEventListener('input',event=>{const query=event.target.value.trim();if(!query){rebuildTopList();showTop(activeIndex);return}list.innerHTML='';detail.innerHTML='<div class="category-search-results"></div>';let count=0;fullCategoryTree.forEach(([top,seconds])=>{const add=path=>{const button=document.createElement('button');button.type='button';button.textContent=path;button.addEventListener('click',()=>applyCategoryPath(path));detail.firstElementChild.appendChild(button);count++};if(top.includes(query))add(top);seconds.forEach(([second,thirds])=>{const secondPath=`${top} / ${second}`;if(second.includes(query))add(secondPath);thirds.forEach(third=>{if(third.includes(query))add(`${secondPath} / ${third}`)})})});if(!count)detail.innerHTML='<div class="filter-empty">未找到相关分类</div>'});
}

function renderBrandPopover(){
  const toolbar=popoverToolbar('品牌');const layout=document.createElement('div');layout.className='brand-directory-layout';layout.innerHTML='<section class="brand-shortcuts"><div><strong>最近使用</strong><div class="brand-shortcut-list recent-brands"></div></div><div><strong>我的收藏</strong><div class="brand-shortcut-list favorite-brands"></div></div></section><section class="brand-directory"><header><strong>全部品牌</strong><span>支持中英文名称搜索</span></header><div class="brand-directory-body"><nav class="brand-letter-index" aria-label="品牌首字母"></nav><div class="brand-directory-scroll"></div></div></section>';
  const renderShortcut=(selector,names)=>{const box=layout.querySelector(selector);box.innerHTML='';box.parentElement.hidden=!names.length;names.slice(0,6).forEach(name=>{const button=document.createElement('button');button.type='button';button.textContent=name;button.addEventListener('click',()=>selectBrand(name));box.appendChild(button)})};
  const selectBrand=name=>{state.filters.brand=name;fullRecentBrands=rememberFilterValue(fullRecentBrands,name);writeFilterList('materialRecentBrands',fullRecentBrands);updateFilterLabels();closeFilter();renderResults(280)};
  const renderDirectory=(query='')=>{const index=layout.querySelector('.brand-letter-index'),scroll=layout.querySelector('.brand-directory-scroll');index.innerHTML='';scroll.innerHTML='';const matches=fullBrands.filter(([english,chinese])=>`${english} ${chinese}`.toLowerCase().includes(query.toLowerCase()));const grouped=new Map();matches.forEach(item=>{const letter=/^[A-Z]/i.test(item[0])?item[0][0].toUpperCase():'#';if(!grouped.has(letter))grouped.set(letter,[]);grouped.get(letter).push(item)});'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('').forEach(letter=>{const button=document.createElement('button');button.type='button';button.textContent=letter;button.disabled=!grouped.has(letter);button.addEventListener('click',()=>{const group=scroll.querySelector(`#full-brand-${letter==='#'?'other':letter}`);if(group)scroll.scrollTo({top:group.offsetTop-scroll.offsetTop,behavior:'smooth'})});index.appendChild(button)});grouped.forEach((items,letter)=>{const section=document.createElement('section');section.className='brand-letter-group';section.id=`full-brand-${letter==='#'?'other':letter}`;section.innerHTML='<h4></h4><div></div>';section.querySelector('h4').textContent=letter;items.forEach(item=>{const name=fullBrandName(item),row=document.createElement('div');row.className='brand-directory-item';row.innerHTML='<button class="brand-name-button" type="button"><span><strong></strong><small></small></span></button><button class="brand-favorite-toggle" type="button"></button>';row.querySelector('strong').textContent=item[1]||item[0];row.querySelector('small').textContent=item[1]?item[0]:'';const favorite=row.querySelector('.brand-favorite-toggle'),saved=fullFavoriteBrands.includes(name);favorite.textContent=saved?'★':'☆';favorite.setAttribute('aria-pressed',String(saved));favorite.setAttribute('aria-label',`${saved?'取消收藏':'收藏品牌'} ${name}`);row.querySelector('.brand-name-button').addEventListener('click',()=>selectBrand(name));favorite.addEventListener('click',()=>{fullFavoriteBrands=saved?fullFavoriteBrands.filter(item=>item!==name):[name,...fullFavoriteBrands];writeFilterList('materialFavoriteBrands',fullFavoriteBrands);renderShortcut('.favorite-brands',fullFavoriteBrands);renderDirectory(query)});section.querySelector('div').appendChild(row)});scroll.appendChild(section)});if(!matches.length)scroll.innerHTML='<div class="filter-empty">未找到相关品牌</div>'};
  renderShortcut('.recent-brands',fullRecentBrands);renderShortcut('.favorite-brands',fullFavoriteBrands);renderDirectory();filterPopover.append(toolbar,layout);toolbar.querySelector('input').addEventListener('input',event=>{layout.querySelector('.brand-shortcuts').hidden=Boolean(event.target.value.trim());renderDirectory(event.target.value.trim())});toolbar.querySelector('.popover-reset').addEventListener('click',()=>clearFilter('brand'));
}

function renderColorPopover(){
  const toolbar=popoverToolbar('色系',false),layout=document.createElement('div');layout.className='color-layout';layout.innerHTML='<div class="color-layout-head"><div><strong>选择色系</strong><span>可多选，点击确定后更新结果</span></div></div><div class="color-grid"></div><footer class="filter-action-footer"><span class="color-selection-summary"></span><div><button class="footer-reset" type="button">重置</button><button class="footer-confirm" type="button">确定</button></div></footer>';
  let pending=selectedColorValues();const grid=layout.querySelector('.color-grid'),summary=layout.querySelector('.color-selection-summary');
  const render=()=>{grid.innerHTML='';fullColors.forEach(([name,value])=>{const button=document.createElement('button');button.type='button';button.className=`color-option${pending.includes(name)?' active':''}`;button.innerHTML='<i></i><span></span><b aria-hidden="true">✓</b>';button.querySelector('i').style.background=value;button.querySelector('span').textContent=name;button.addEventListener('click',()=>{pending=pending.includes(name)?pending.filter(item=>item!==name):[...pending,name];render()});grid.appendChild(button)});summary.textContent=pending.length?`已选择 ${pending.length} 个色系`:'未选择色系'};
  layout.querySelector('.footer-reset').addEventListener('click',()=>{pending=[];render()});layout.querySelector('.footer-confirm').addEventListener('click',()=>{state.filters.color=pending;updateFilterLabels();closeFilter();renderResults(280)});toolbar.querySelector('.popover-reset').addEventListener('click',()=>{pending=[];render()});filterPopover.append(toolbar,layout);render();
}

function renderPricePopover(){
  const toolbar=popoverToolbar('价格筛选',false),layout=document.createElement('div');layout.className='price-layout price-layout-v2';layout.innerHTML='<section class="price-filter-section"><div class="price-section-heading"><strong>价格区间</strong><span>选择常用区间，或输入自定义价格</span></div><div class="price-presets"></div><div class="price-custom"><label><span>最低价</span><input type="number" min="0" placeholder="¥ 0"></label><i>—</i><label><span>最高价</span><input type="number" min="0" placeholder="不限"></label></div></section><footer class="filter-action-footer price-footer"><span class="price-selection-summary"></span><div><button class="footer-reset" type="button">重置</button><button class="footer-confirm" type="button">确定</button></div></footer>';
  let pendingPrice={...state.filters.price};const presets=layout.querySelector('.price-presets'),inputs=layout.querySelectorAll('.price-custom input'),summary=layout.querySelector('.price-selection-summary');inputs[0].value=pendingPrice.min??'';inputs[1].value=pendingPrice.max??'';
  const sync=()=>{presets.querySelectorAll('button').forEach(button=>button.classList.toggle('active',button.dataset.label===(pendingPrice.label||'不限价格')));summary.textContent=pendingPrice.label||'不限价格'};
  pricePresets.forEach(item=>{const button=document.createElement('button');button.type='button';button.dataset.label=item.label;button.textContent=item.label;button.addEventListener('click',()=>{pendingPrice=item.label==='不限价格'?{label:'',min:null,max:null}:{...item};inputs[0].value=pendingPrice.min??'';inputs[1].value=pendingPrice.max??'';sync()});presets.appendChild(button)});
  inputs.forEach(input=>input.addEventListener('input',()=>{const min=inputs[0].value===''?null:Number(inputs[0].value),max=inputs[1].value===''?null:Number(inputs[1].value);pendingPrice={label:min!==null&&max!==null?`¥ ${min}–${max}`:min!==null?`¥ ${min} 以上`:max!==null?`¥ ${max} 以下`:'',min,max};sync()}));
  const resetPending=()=>{pendingPrice={label:'',min:null,max:null};inputs.forEach(input=>input.value='');sync()};toolbar.querySelector('.popover-reset').addEventListener('click',resetPending);layout.querySelector('.footer-reset').addEventListener('click',resetPending);layout.querySelector('.footer-confirm').addEventListener('click',()=>{if(pendingPrice.min!==null&&pendingPrice.max!==null&&pendingPrice.min>pendingPrice.max){showToast('最低价不能高于最高价');inputs[0].focus();return}state.filters.price=pendingPrice;state.sort='default';updateFilterLabels();closeFilter();renderResults(280)});filterPopover.append(toolbar,layout);sync();
}

function filteredProducts(){
  let list=currentBaseProducts();const {category,brand,price}=state.filters,colors=selectedColorValues();
  if(category){const path=category.split(' / '),top=path[0],leaf=path[path.length-1];list=list.filter(item=>item.category===top||item.category===leaf||category.includes(item.category))}
  if(brand)list=list.filter(item=>item.brand===brand||fullBrands.some(([english,chinese])=>fullBrandName([english,chinese])===brand&&item.brand===english));
  if(colors.length)list=list.filter(item=>colors.includes(item.color));
  if(price.min!==null)list=list.filter(item=>item.priceValue>=price.min);if(price.max!==null)list=list.filter(item=>item.priceValue<=price.max);
  return list;
}
