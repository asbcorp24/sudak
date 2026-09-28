import * as THREE from 'three';

const mount=document.getElementById('three-hero');

function initScene(el){
 const scene=new THREE.Scene();
 const camera=new THREE.PerspectiveCamera(46,el.clientWidth/Math.max(el.clientHeight,1),.1,140);
 camera.position.set(0,2.2,9.5);

 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));
 renderer.setSize(el.clientWidth,el.clientHeight);
 renderer.setClearColor(0x000000,0);
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.15;
 el.appendChild(renderer.domElement);

 const accent=new THREE.Color(el.dataset.accent||'#49d9ff');
 const state={
  paused:false,
  explode:0,
  explodeTarget:0,
  rx:0,
  ry:0,
  userRX:0,
  userRY:0,
  zoom:9.5,
  dragging:false,
  pointerX:0,
  pointerY:0
 };

 scene.add(new THREE.HemisphereLight(0xbcecff,0x061019,1.15));
 const key=new THREE.DirectionalLight(accent,4.4);
 key.position.set(5,7,6);
 scene.add(key);
 const rim=new THREE.PointLight(0x6f75ff,35,22);
 rim.position.set(-5,2,-1);
 scene.add(rim);
 const fill=new THREE.PointLight(accent,18,18);
 fill.position.set(3,-1,4);
 scene.add(fill);

 const world=new THREE.Group();
 scene.add(world);
 addEnvironment(scene,accent);

 const api={tickers:[],parts:[],state,accent,scene,camera,renderer,world};
 const builders={shipyard,shipbuilding,engine,electro,network,cnc,quality,blueprint};
 (builders[el.dataset.scene]||blueprint)(api);

 bindControls(el,api);
 bindPointer(el,api);

 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const clock=new THREE.Clock();

 function frame(){
  const t=clock.getElapsedTime();
  state.explode+=(state.explodeTarget-state.explode)*.085;
  state.rx+=(state.userRX-state.rx)*.075;
  state.ry+=(state.userRY-state.ry)*.075;
  camera.position.z+=(state.zoom-camera.position.z)*.08;

  world.rotation.x=state.rx;
  world.rotation.y=state.ry;

  applyExplode(api.parts,state.explode);

  if(!state.paused&&!reduced){
   api.tickers.forEach(fn=>fn(t,state));
  }

  renderer.render(scene,camera);
  requestAnimationFrame(frame);
 }
 frame();

 const ro=new ResizeObserver(()=>{
  const w=el.clientWidth,h=Math.max(el.clientHeight,1);
  camera.aspect=w/h;
  camera.updateProjectionMatrix();
  renderer.setSize(w,h);
 });
 ro.observe(el);
}

function bindControls(el,api){
 document.querySelectorAll('[data-scene-action]').forEach(btn=>{
  btn.addEventListener('click',()=>{
   const action=btn.dataset.sceneAction;
   if(action==='explode'){
    api.state.explodeTarget=api.state.explodeTarget>.5?0:1;
    btn.classList.toggle('active',api.state.explodeTarget>0);
    btn.querySelector('span')&&(btn.querySelector('span').textContent=api.state.explodeTarget>0?'Собрать':'Разобрать');
   }
   if(action==='pause'){
    api.state.paused=!api.state.paused;
    btn.classList.toggle('active',api.state.paused);
    btn.querySelector('span')&&(btn.querySelector('span').textContent=api.state.paused?'Продолжить':'Пауза');
   }
   if(action==='reset'){
    api.state.userRX=0;
    api.state.userRY=0;
    api.state.zoom=9.5;
    api.state.explodeTarget=0;
    document.querySelectorAll('[data-scene-action="explode"]').forEach(x=>x.classList.remove('active'));
   }
  });
 });
}

function bindPointer(el,api){
 const s=api.state;
 const surface=el.closest('.hero,.specialty-hero,.page-hero')||el;
 const down=e=>{
  if(e.target.closest?.('a,button,input,select,textarea'))return;
  s.dragging=true;
  s.pointerX=e.clientX;
  s.pointerY=e.clientY;
  surface.classList.add('is-dragging');
  surface.setPointerCapture?.(e.pointerId);
 };
 const move=e=>{
  if(s.dragging){
   const dx=e.clientX-s.pointerX;
   const dy=e.clientY-s.pointerY;
   s.pointerX=e.clientX;
   s.pointerY=e.clientY;
   s.userRY+=dx*.006;
   s.userRX+=dy*.004;
   s.userRX=Math.max(-.55,Math.min(.55,s.userRX));
  }else{
   const r=surface.getBoundingClientRect();
   const nx=((e.clientX-r.left)/r.width-.5);
   const ny=((e.clientY-r.top)/r.height-.5);
   s.userRY+=(nx*.20-s.userRY)*.018;
   s.userRX+=(-ny*.08-s.userRX)*.018;
  }
 };
 const up=e=>{
  s.dragging=false;
  surface.classList.remove('is-dragging');
  surface.releasePointerCapture?.(e.pointerId);
 };
 surface.addEventListener('pointerdown',down);
 surface.addEventListener('pointermove',move,{passive:true});
 surface.addEventListener('pointerup',up);
 surface.addEventListener('pointercancel',up);
 surface.addEventListener('wheel',e=>{
  if(e.target.closest?.('input,select,textarea'))return;
  e.preventDefault();
  s.zoom=Math.max(6.2,Math.min(12.5,s.zoom+e.deltaY*.006));
 },{passive:false});
}

function addEnvironment(scene,accent){
 const grid=new THREE.GridHelper(34,56,accent,0x173746);
 grid.position.y=-2.45;
 grid.material.opacity=.2;
 grid.material.transparent=true;
 scene.add(grid);

 const geo=new THREE.BufferGeometry();
 const pts=[];
 for(let i=0;i<620;i++) pts.push((Math.random()-.5)*28,(Math.random()-.5)*14,(Math.random()-.5)*22);
 geo.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));
 const dust=new THREE.Points(geo,new THREE.PointsMaterial({color:accent,size:.022,transparent:true,opacity:.42}));
 scene.add(dust);

 const horizon=new THREE.Mesh(
  new THREE.CylinderGeometry(9,9,5,64,1,true),
  new THREE.MeshBasicMaterial({color:accent,wireframe:true,transparent:true,opacity:.028,side:THREE.BackSide})
 );
 horizon.position.y=-1;
 scene.add(horizon);
}

const wire=(c,o=.72)=>new THREE.MeshBasicMaterial({color:c,wireframe:true,transparent:true,opacity:o});
const solid=(c,o=1,em=.05)=>new THREE.MeshStandardMaterial({
 color:c,metalness:.78,roughness:.22,transparent:o<1,opacity:o,side:THREE.DoubleSide,
 emissive:c,emissiveIntensity:em
});
const glow=(c,o=.9)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o});

function line(a,b,c,o=.5){
 const g=new THREE.BufferGeometry().setFromPoints([a,b]);
 return new THREE.Line(g,new THREE.LineBasicMaterial({color:c,transparent:true,opacity:o}));
}

function rings(group,accent,count=4,r0=2){
 for(let i=0;i<count;i++){
  const m=new THREE.Mesh(new THREE.TorusGeometry(r0+i*.48,.012,4,96),glow(accent,.13));
  m.rotation.x=Math.PI/2;
  group.add(m);
 }
}

function markPart(api,obj,dir=[1,0,0],distance=1){
 obj.userData.basePosition=obj.position.clone();
 obj.userData.explodeDirection=new THREE.Vector3(...dir).normalize();
 obj.userData.explodeDistance=distance;
 api.parts.push(obj);
 return obj;
}

function applyExplode(parts,k){
 parts.forEach(obj=>{
  if(!obj.userData.basePosition)return;
  obj.position.copy(obj.userData.basePosition).addScaledVector(obj.userData.explodeDirection,obj.userData.explodeDistance*k);
 });
}

function addTechLabel(api,pos,width=.8){
 const plate=new THREE.Mesh(new THREE.PlaneGeometry(width,.18),new THREE.MeshBasicMaterial({color:api.accent,transparent:true,opacity:.12,side:THREE.DoubleSide}));
 plate.position.copy(pos);
 api.world.add(plate);
 return plate;
}

function shipyard(api){
 const {world:g,accent:a,tickers:t}=api;
 const dock=new THREE.Group();
 g.add(dock);

 const water=new THREE.Mesh(
  new THREE.PlaneGeometry(18,9,32,16),
  new THREE.MeshStandardMaterial({color:0x082738,metalness:.15,roughness:.4,transparent:true,opacity:.42,wireframe:true})
 );
 water.rotation.x=-Math.PI/2;
 water.position.set(1,-1.72,0);
 dock.add(water);

 const hull=new THREE.Group();
 hull.position.set(1.25,-.2,.3);
 hull.rotation.y=-.28;
 dock.add(hull);

 const keel=markPart(api,new THREE.Mesh(new THREE.BoxGeometry(5.9,.18,.18),solid(a,.8,.12)),[0,-1,0],1);
 keel.position.y=-.74;
 keel.userData.basePosition=keel.position.clone();
 hull.add(keel);

 for(let i=0;i<18;i++){
  const scale=1-Math.abs(i-8.5)/20;
  const rib=markPart(api,new THREE.Mesh(new THREE.TorusGeometry(1.02*scale,.025,5,36,Math.PI),wire(a,.7)),[0,(i%2?.5:-.5),i<9?-1:1],1.2);
  rib.rotation.set(0,Math.PI/2,Math.PI/2);
  rib.position.x=(i-8.5)*.34;
  rib.userData.basePosition=rib.position.clone();
  hull.add(rib);
 }

 const deck=markPart(api,new THREE.Mesh(new THREE.BoxGeometry(5.2,.12,1.55),solid(a,.18,.05)),[0,1,0],1.15);
 deck.position.y=.55;
 deck.userData.basePosition=deck.position.clone();
 hull.add(deck);

 const bow=markPart(api,new THREE.Mesh(new THREE.ConeGeometry(1.02,2.05,5),wire(a,.82)),[1,.1,0],1.35);
 bow.rotation.z=-Math.PI/2;
 bow.position.x=3.86;
 bow.userData.basePosition=bow.position.clone();
 hull.add(bow);

 const bridge=markPart(api,new THREE.Mesh(new THREE.BoxGeometry(1.2,.8,.95),solid(0xd9f7ff,.16,.05)),[0,1,.2],1.5);
 bridge.position.set(-.5,1,.05);
 bridge.userData.basePosition=bridge.position.clone();
 hull.add(bridge);

 for(let i=0;i<3;i++){
  const crane=new THREE.Group();
  const mast=new THREE.Mesh(new THREE.BoxGeometry(.11,4.4,.11),wire(a,.5));
  mast.position.y=.4;
  crane.add(mast);
  const arm=new THREE.Mesh(new THREE.BoxGeometry(2.9,.09,.09),wire(a,.58));
  arm.position.set(1.08,2.45,0);
  crane.add(arm);
  const cable=line(new THREE.Vector3(1.9,2.4,0),new THREE.Vector3(1.9,.7,0),a,.4);
  crane.add(cable);
  crane.position.set(-4.6+i*4.3,-.45,-2.8);
  dock.add(crane);
 }

 for(let i=0;i<7;i++){
  const marker=addTechLabel(api,new THREE.Vector3(-4.3+i*1.45,1.8+(i%2)*.28,-2.2),.7);
  marker.rotation.y=.15;
 }

 rings(dock,a,5,2.1);
 t.push((x,s)=>{
  if(s.explode<.2){
   hull.position.y=-.2+Math.sin(x*.8)*.055;
   hull.rotation.y=-.28+Math.sin(x*.24)*.04;
  }
  water.position.z=Math.sin(x*.4)*.04;
 });
}

function shipbuilding(api){
 const {world:g,accent:a,tickers:t}=api;
 const ship=new THREE.Group();
 ship.rotation.set(-.035,-.34,.015);
 ship.position.set(.25,-.25,.15);
 g.add(ship);

 // Modern multipurpose surface vessel inspired by a real general-arrangement drawing.
 // Geometry is built as a loft through naval-style transverse stations.
 const stations=[
  {x:-3.75,w:.92,deck:.46,chine:.70,keel:-.72},
  {x:-3.10,w:1.08,deck:.50,chine:.84,keel:-.88},
  {x:-2.20,w:1.18,deck:.54,chine:.94,keel:-1.02},
  {x:-1.20,w:1.22,deck:.58,chine:.98,keel:-1.08},
  {x:-.10,w:1.20,deck:.62,chine:.96,keel:-1.10},
  {x:.90,w:1.12,deck:.68,chine:.88,keel:-1.08},
  {x:1.75,w:.95,deck:.78,chine:.72,keel:-1.00},
  {x:2.50,w:.72,deck:.90,chine:.52,keel:-.86},
  {x:3.10,w:.42,deck:1.02,chine:.26,keel:-.62},
  {x:3.55,w:.08,deck:1.10,chine:.05,keel:-.28}
 ];

 const hullGeo=new THREE.BufferGeometry();
 const hp=[];
 stations.forEach(s=>{
  hp.push(
   s.x,s.deck,-s.w,
   s.x,-.10,-s.chine,
   s.x,s.keel,0,
   s.x,-.10,s.chine,
   s.x,s.deck,s.w
  );
 });
 const hi=[];
 for(let i=0;i<stations.length-1;i++){
  const p=i*5,n=(i+1)*5;
  for(let k=0;k<4;k++){
   hi.push(p+k,n+k,n+k+1,p+k,n+k+1,p+k+1);
  }
 }
 // Close stern transom and bow.
 hi.push(0,1,2,0,2,4,4,2,3);
 const last=(stations.length-1)*5;
 hi.push(last,last+2,last+1,last,last+4,last+2,last+4,last+3,last+2);

 hullGeo.setAttribute('position',new THREE.Float32BufferAttribute(hp,3));
 hullGeo.setIndex(hi);
 hullGeo.computeVertexNormals();

 const hullMat=new THREE.MeshStandardMaterial({
  color:a,metalness:.72,roughness:.2,transparent:true,opacity:.31,
  emissive:a,emissiveIntensity:.055,side:THREE.DoubleSide
 });
 const hull=markPart(api,new THREE.Mesh(hullGeo,hullMat),[0,-.8,0],1.15);
 ship.add(hull);
 const hullEdges=new THREE.LineSegments(
  new THREE.EdgesGeometry(hullGeo,13),
  new THREE.LineBasicMaterial({color:a,transparent:true,opacity:.72})
 );
 hull.add(hullEdges);

 // Deck follows the plan-form stations instead of being a rectangular slab.
 const deckPos=[],deckIdx=[];
 stations.forEach(s=>{
  deckPos.push(s.x,s.deck+.018,-s.w*.96,s.x,s.deck+.018,s.w*.96);
 });
 for(let i=0;i<stations.length-1;i++){
  const p=i*2,n=(i+1)*2;
  deckIdx.push(p,n,n+1,p,n+1,p+1);
 }
 const deckGeo=new THREE.BufferGeometry();
 deckGeo.setAttribute('position',new THREE.Float32BufferAttribute(deckPos,3));
 deckGeo.setIndex(deckIdx);
 deckGeo.computeVertexNormals();
 const deck=markPart(api,new THREE.Mesh(deckGeo,solid(0xd9f7ff,.24,.035)),[0,1,0],1.18);
 ship.add(deck);

 // Glowing waterline, port and starboard.
 [-1,1].forEach(side=>{
  const pts=stations.slice(0,-1).map(s=>new THREE.Vector3(s.x,.03,side*(s.chine+(s.w-s.chine)*.28)));
  const curve=new THREE.CatmullRomCurve3(pts);
  const tube=new THREE.Mesh(new THREE.TubeGeometry(curve,70,.014,5,false),glow(0xc4f7ff,.72));
  ship.add(tube);
 });

 // Visible structural frames below the deck, matching transverse ship sections.
 const frames=new THREE.Group();
 ship.add(frames);
 stations.slice(1,-1).forEach((s,i)=>{
  const shape=new THREE.BufferGeometry().setFromPoints([
   new THREE.Vector3(s.x,s.deck,-s.w),
   new THREE.Vector3(s.x,-.10,-s.chine),
   new THREE.Vector3(s.x,s.keel,0),
   new THREE.Vector3(s.x,-.10,s.chine),
   new THREE.Vector3(s.x,s.deck,s.w)
  ]);
  const frame=new THREE.Line(shape,new THREE.LineBasicMaterial({color:a,transparent:true,opacity:i%2?.27:.48}));
  frames.add(frame);
 });

 // Open aft working deck from stern to the superstructure.
 const workDeck=markPart(api,new THREE.Group(),[-.7,.7,0],1.05);
 workDeck.position.set(-1.85,.66,0);
 workDeck.userData.basePosition=workDeck.position.clone();
 ship.add(workDeck);

 const deckGrid=new THREE.GridHelper(3.35,10,a,0x22495c);
 deckGrid.rotation.z=Math.PI/2;
 deckGrid.rotation.y=Math.PI/2;
 deckGrid.scale.z=.66;
 deckGrid.material.transparent=true;
 deckGrid.material.opacity=.28;
 workDeck.add(deckGrid);

 // Stern deck equipment: winch, bollards and compact crane.
 const winch=new THREE.Group();
 winch.position.set(-.45,.22,0);
 workDeck.add(winch);
 const drum=new THREE.Mesh(new THREE.CylinderGeometry(.24,.24,.72,22),solid(a,.58,.07));
 drum.rotation.x=Math.PI/2;
 winch.add(drum);
 [-.4,.4].forEach(z=>{
  const cheek=new THREE.Mesh(new THREE.CylinderGeometry(.31,.31,.08,22),wire(a,.62));
  cheek.rotation.x=Math.PI/2;
  cheek.position.z=z;
  winch.add(cheek);
 });

 [-1,1].forEach(side=>{
  for(let i=0;i<2;i++){
   const bollard=new THREE.Mesh(new THREE.CylinderGeometry(.055,.075,.28,10),solid(0xd8f7ff,.65,.02));
   bollard.position.set(-1.15+i*.55,.2,side*.68);
   workDeck.add(bollard);
  }
 });

 const crane=markPart(api,new THREE.Group(),[-.2,.9,-.35],1.2);
 crane.position.set(-2.38,.92,-.72);
 crane.userData.basePosition=crane.position.clone();
 ship.add(crane);
 const craneBase=new THREE.Mesh(new THREE.CylinderGeometry(.18,.26,.46,14),solid(a,.55,.06));
 crane.add(craneBase);
 const craneArm=new THREE.Mesh(new THREE.BoxGeometry(1.38,.11,.11),solid(a,.5,.08));
 craneArm.position.set(.58,.45,0);
 craneArm.rotation.z=.42;
 crane.add(craneArm);

 // Main forward superstructure.
 const house=markPart(api,new THREE.Group(),[.3,1,.18],1.42);
 house.position.set(.88,1.02,0);
 house.userData.basePosition=house.position.clone();
 ship.add(house);

 const lowerHouse=new THREE.Mesh(new THREE.BoxGeometry(2.18,.82,1.72),solid(0xd8f3fa,.20,.018));
 lowerHouse.position.set(-.1,.12,0);
 house.add(lowerHouse);

 // Tapered wheelhouse / bridge using a custom trapezoidal hull.
 const bridgeGeo=new THREE.BufferGeometry();
 const bv=[
  -.92,0,-.76, -.92,0,.76, .80,0,-.63, .80,0,.63,
  -.72,.62,-.66, -.72,.62,.66, .58,.62,-.52, .58,.62,.52
 ];
 const bi=[
  0,2,3,0,3,1, 4,5,7,4,7,6,
  0,4,6,0,6,2, 1,3,7,1,7,5,
  0,1,5,0,5,4, 2,6,7,2,7,3
 ];
 bridgeGeo.setAttribute('position',new THREE.Float32BufferAttribute(bv,3));
 bridgeGeo.setIndex(bi);
 bridgeGeo.computeVertexNormals();
 const bridge=new THREE.Mesh(bridgeGeo,solid(a,.25,.055));
 bridge.position.y=.57;
 house.add(bridge);

 // Dark panoramic bridge windows across the forward face.
 for(let z=-.44;z<=.44;z+=.22){
  const glass=new THREE.Mesh(
   new THREE.PlaneGeometry(.19,.20),
   new THREE.MeshBasicMaterial({color:0xbdf7ff,transparent:true,opacity:.72,side:THREE.DoubleSide})
  );
  glass.position.set(.586,.88,z);
  glass.rotation.y=Math.PI/2;
  house.add(glass);
 }

 // Side bridge windows.
 [-1,1].forEach(side=>{
  for(let x=-.46;x<=.32;x+=.26){
   const glass=new THREE.Mesh(new THREE.PlaneGeometry(.18,.18),glow(0xaef2ff,.52));
   glass.position.set(x,.88,side*.525);
   glass.rotation.y=side>0?0:Math.PI;
   house.add(glass);
  }
 });

 // Funnel and exhausts aft of bridge.
 const funnel=markPart(api,new THREE.Group(),[-.25,.8,0],.85);
 funnel.position.set(.05,1.92,0);
 funnel.userData.basePosition=funnel.position.clone();
 ship.add(funnel);
 const funnelBody=new THREE.Mesh(new THREE.CylinderGeometry(.22,.28,.72,12),solid(0x9dddeb,.35,.04));
 funnel.add(funnelBody);
 [-.09,.09].forEach(z=>{
  const exhaust=new THREE.Mesh(new THREE.CylinderGeometry(.035,.045,.46,8),solid(a,.85,.08));
  exhaust.position.set(0,.48,z);
  funnel.add(exhaust);
 });

 // Mast, radar and navigation sensors.
 const mastGroup=markPart(api,new THREE.Group(),[0,1.2,0],1.28);
 mastGroup.position.set(1.18,2.04,0);
 mastGroup.userData.basePosition=mastGroup.position.clone();
 ship.add(mastGroup);

 const mast=new THREE.Mesh(new THREE.CylinderGeometry(.028,.055,1.55,8),solid(a,.78,.09));
 mast.position.y=.55;
 mastGroup.add(mast);
 const yard=new THREE.Mesh(new THREE.BoxGeometry(1.05,.045,.05),glow(a,.8));
 yard.position.y=.88;
 mastGroup.add(yard);
 const radarPivot=new THREE.Group();
 radarPivot.position.y=1.22;
 mastGroup.add(radarPivot);
 const radar=new THREE.Mesh(new THREE.BoxGeometry(.92,.055,.12),glow(0xe7fbff,.9));
 radarPivot.add(radar);
 const dome=new THREE.Mesh(new THREE.SphereGeometry(.13,14,8),solid(a,.42,.12));
 dome.position.y=1.49;
 mastGroup.add(dome);

 // Lifeboats / rescue craft on both sides.
 [-1,1].forEach(side=>{
  const boat=markPart(api,new THREE.Group(),[-.1,.35,side],.95);
  boat.position.set(.25,1.22,side*1.05);
  boat.userData.basePosition=boat.position.clone();
  ship.add(boat);
  const boatHull=new THREE.Mesh(new THREE.CapsuleGeometry(.18,.86,5,12),solid(0xdff8ff,.24,.035));
  boatHull.rotation.z=Math.PI/2;
  boat.add(boatHull);
  const davit=line(new THREE.Vector3(-.48,.1,0),new THREE.Vector3(.48,.56,0),a,.42);
  boat.add(davit);
 });

 // Railings emphasize the real deck edge and surface-vessel silhouette.
 const rails=new THREE.Group();
 ship.add(rails);
 [-1,1].forEach(side=>{
  const railPts=stations.slice(0,-1).map(s=>new THREE.Vector3(s.x,s.deck+.27,side*s.w*.94));
  rails.add(new THREE.Line(
   new THREE.BufferGeometry().setFromPoints(railPts),
   new THREE.LineBasicMaterial({color:0xd8f8ff,transparent:true,opacity:.38})
  ));
  stations.slice(0,-1).forEach((s,i)=>{
   if(i%2)return;
   rails.add(line(
    new THREE.Vector3(s.x,s.deck+.03,side*s.w*.94),
    new THREE.Vector3(s.x,s.deck+.29,side*s.w*.94),
    0xd8f8ff,.30
   ));
  });
 });

 // CAD station markers beneath the vessel.
 stations.forEach((s,i)=>{
  if(i===0||i===stations.length-1)return;
  const marker=line(
   new THREE.Vector3(s.x,-1.38,-1.48),
   new THREE.Vector3(s.x,-1.38,1.48),
   a,i%2?.10:.20
  );
  ship.add(marker);
 });

 rings(g,a,4,2.4);
 t.push((x,s)=>{
  ship.rotation.y=-.34+Math.sin(x*.18)*.045;
  ship.rotation.z=.015+Math.sin(x*.55)*.008*(1-s.explode);
  ship.position.y=-.25+Math.sin(x*.62)*.035*(1-s.explode);
  radarPivot.rotation.y=x*1.85;
  crane.rotation.y=-.18+Math.sin(x*.32)*.08;
 });
}
function engine(api){
 const {world:g,accent:a,tickers:t}=api;
 const engine=new THREE.Group();
 engine.rotation.y=-.35;
 g.add(engine);

 const crank=new THREE.Group();
 engine.add(crank);
 const shaft=markPart(api,new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,5.4,24),solid(0xdcefff,.88,.02)),[-1,0,0],1.2);
 shaft.rotation.z=Math.PI/2;
 crank.add(shaft);

 for(let i=-2;i<=2;i++){
  const disc=markPart(api,new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.16,24),solid(a,.82,.08)),[0,0,i],1.15);
  disc.rotation.z=Math.PI/2;
  disc.position.x=i*.9;
  disc.userData.basePosition=disc.position.clone();
  crank.add(disc);

  const pin=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.54,12),solid(0xffffff,.9,.02));
  pin.rotation.z=Math.PI/2;
  pin.position.set(i*.9,.38*(i%2||1),0);
  crank.add(pin);
 }

 const cylinders=[];
 for(let i=-2;i<=2;i++){
  const bank=i%2===0?1:-1;
  const cyl=markPart(api,new THREE.Mesh(new THREE.CylinderGeometry(.46,.54,1.45,24,1,true),solid(a,.18,.04)),[0,bank,.25],1.65);
  cyl.position.set(i*.9,bank*1.38,.1);
  cyl.userData.basePosition=cyl.position.clone();
  engine.add(cyl);
  cylinders.push(cyl);

  const piston=markPart(api,new THREE.Mesh(new THREE.CylinderGeometry(.38,.38,.34,24),solid(0xf4fbff,.75,.03)),[0,bank,0],1.2);
  piston.position.set(i*.9,bank*.82,0);
  piston.userData.basePosition=piston.position.clone();
  engine.add(piston);
  piston.userData.phase=i*.85;
  piston.userData.bank=bank;
 }

 const flywheel=markPart(api,new THREE.Mesh(new THREE.TorusGeometry(1.18,.19,14,64),solid(a,.5,.08)),[-1,0,0],1.5);
 flywheel.rotation.y=Math.PI/2;
 flywheel.position.x=-3.15;
 flywheel.userData.basePosition=flywheel.position.clone();
 engine.add(flywheel);

 rings(g,a,4,2.2);
 t.push((x)=>{
  crank.rotation.x=x*1.55;
  flywheel.rotation.x=x*1.55;
  engine.children.forEach(o=>{
   if(o.userData.phase!==undefined){
    const b=o.userData.bank;
    const base=o.userData.basePosition;
    o.position.y=base.y+b*Math.sin(x*2.1+o.userData.phase)*.26;
   }
  });
 });
}

function electro(api){
 const {world:g,accent:a,tickers:t}=api;
 const board=new THREE.Group();
 board.rotation.x=-.14;
 g.add(board);

 const base=new THREE.Mesh(new THREE.PlaneGeometry(7.4,4.5,14,9),new THREE.MeshBasicMaterial({color:a,wireframe:true,transparent:true,opacity:.12,side:THREE.DoubleSide}));
 board.add(base);

 const pulses=[];
 const buses=[-1.6,-.95,-.3,.35,1,1.65];
 buses.forEach((y,idx)=>{
  const l=line(new THREE.Vector3(-3.25,y,.05),new THREE.Vector3(3.25,y,.05),a,.38);
  board.add(l);
  for(let p=0;p<2;p++){
   const dot=new THREE.Mesh(new THREE.SphereGeometry(.06,10,10),glow(idx%2?0xffffff:a,.95));
   dot.userData={y,offset:p*2.5+idx*.35,speed:.8+idx*.06};
   board.add(dot);
   pulses.push(dot);
  }
 });

 for(let i=0;i<4;i++){
  const coil=markPart(api,new THREE.Mesh(new THREE.TorusGeometry(.38,.07,8,38),solid(a,.55,.12)),[i<2?-1:1,i%2?1:-1,.2],1.25);
  coil.position.set(-1.9+i*1.25,(i%2?.5:-.5),.3);
  coil.userData.basePosition=coil.position.clone();
  board.add(coil);
 }

 for(let i=0;i<6;i++){
  const module=markPart(api,new THREE.Mesh(new THREE.BoxGeometry(.55,.38,.28),solid(0xdaf8ff,.28,.03)),[i<3?-1:1,(i%3-1)*.3,.3],1.1);
  module.position.set(-2.1+(i%3)*2.05,-1.25+Math.floor(i/3)*2.5,.22);
  module.userData.basePosition=module.position.clone();
  board.add(module);
 }

 const transformer=markPart(api,new THREE.Mesh(new THREE.TorusGeometry(.66,.17,12,48),solid(a,.3,.18)),[0,1,.5],1.45);
 transformer.position.set(0,0,.42);
 transformer.userData.basePosition=transformer.position.clone();
 board.add(transformer);

 t.push(x=>{
  pulses.forEach(p=>{
   p.position.x=-3.25+((x*p.userData.speed+p.userData.offset)%6.5);
   p.position.y=p.userData.y;
   p.material.opacity=.55+.45*Math.sin(x*4+p.userData.offset);
  });
  transformer.rotation.z=x*.45;
 });
}

function network(api){
 const {world:g,accent:a,tickers:t}=api;
 const cluster=new THREE.Group();
 g.add(cluster);

 const rackPositions=[[-2.4,.35,-.6],[-.8,.35,.35],[.8,.35,-.3],[2.4,.35,.45]];
 const servers=[];
 rackPositions.forEach((p,ri)=>{
  const rack=markPart(api,new THREE.Group(),[p[0],.2,p[2]],1.2);
  rack.position.set(...p);
  rack.userData.basePosition=rack.position.clone();
  cluster.add(rack);

  const frame=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.05,3,1.05)),new THREE.LineBasicMaterial({color:a,transparent:true,opacity:.32}));
  rack.add(frame);
  for(let s=0;s<8;s++){
   const srv=new THREE.Mesh(new THREE.BoxGeometry(.82,.2,.78),solid(s%2?a:0x9bdfff,.16,.06));
   srv.position.set(0,-1.1+s*.31,0);
   rack.add(srv);
   servers.push(srv);
   for(let led=0;led<3;led++){
    const d=new THREE.Mesh(new THREE.SphereGeometry(.018,5,5),glow(led===0?0x8affc1:a,.9));
    d.position.set(.31+led*.08,-1.1+s*.31,.405);
    rack.add(d);
   }
  }
 });

 const hubs=rackPositions.map((p,i)=>{
  const n=new THREE.Mesh(new THREE.IcosahedronGeometry(.16,1),solid(i===1?0xffffff:a,.95,.35));
  n.position.set(p[0],2.25,p[2]);
  cluster.add(n);
  return n;
 });

 for(let i=0;i<hubs.length;i++){
  for(let j=i+1;j<hubs.length;j++){
   if(Math.abs(i-j)>2)continue;
   cluster.add(line(hubs[i].position,hubs[j].position,a,.34));
  }
 }

 const packetRoutes=[[0,1],[1,2],[2,3],[0,2],[1,3]];
 const packets=packetRoutes.map(([i,j],k)=>{
  const p=new THREE.Mesh(new THREE.SphereGeometry(.055,8,8),glow(k%2?0xffffff:a,1));
  cluster.add(p);
  return {p,a:hubs[i].position.clone(),b:hubs[j].position.clone(),o:k*.19};
 });

 rings(g,a,3,2.6);
 t.push(x=>{
  packets.forEach(q=>q.p.position.lerpVectors(q.a,q.b,(x*.32+q.o)%1));
  servers.forEach((s,i)=>s.material.opacity=.1+.12*(1+Math.sin(x*3+i*.7)));
  cluster.rotation.y=Math.sin(x*.18)*.12;
 });
}

function cnc(api){
 const {world:g,accent:a,tickers:t}=api;
 const machine=new THREE.Group();
 g.add(machine);

 const bed=markPart(api,new THREE.Mesh(new THREE.BoxGeometry(6.4,.3,3.2),solid(0x183445,.72,.01)),[0,-1,0],1.2);
 bed.position.y=-1.55;
 bed.userData.basePosition=bed.position.clone();
 machine.add(bed);

 const railA=new THREE.Mesh(new THREE.BoxGeometry(6,.12,.14),solid(a,.55,.08));
 railA.position.set(0,-1.28,1.05);
 machine.add(railA);
 const railB=railA.clone();
 railB.position.z=-1.05;
 machine.add(railB);

 const gantry=markPart(api,new THREE.Group(),[0,1,0],1.45);
 gantry.position.y=.35;
 gantry.userData.basePosition=gantry.position.clone();
 machine.add(gantry);
 const beam=new THREE.Mesh(new THREE.BoxGeometry(4.8,.22,.25),solid(a,.38,.06));
 beam.position.y=1.22;
 gantry.add(beam);
 [-2.2,2.2].forEach(x=>{
  const post=new THREE.Mesh(new THREE.BoxGeometry(.22,3,.28),solid(a,.3,.04));
  post.position.set(x,-.15,0);
  gantry.add(post);
 });

 const head=markPart(api,new THREE.Group(),[0,0,1],1.2);
 gantry.add(head);
 const spindle=new THREE.Mesh(new THREE.CylinderGeometry(.34,.48,1.65,24),solid(0xd8f7ff,.72,.03));
 spindle.position.y=.43;
 head.add(spindle);
 const cutter=new THREE.Mesh(new THREE.CylinderGeometry(.07,.11,1.1,10),solid(a,.95,.18));
 cutter.position.y=-.92;
 head.add(cutter);

 const work=markPart(api,new THREE.Mesh(new THREE.CylinderGeometry(1.12,1.12,.72,64),solid(a,.8,.08)),[0,0,-1],1.35);
 work.rotation.x=Math.PI/2;
 work.position.set(.5,-.75,0);
 work.userData.basePosition=work.position.clone();
 machine.add(work);

 const chips=[];
 for(let i=0;i<42;i++){
  const chip=new THREE.Mesh(new THREE.BoxGeometry(.025,.025,.13),glow(a,.55));
  chip.userData={phase:Math.random()*6.28,r:.3+Math.random()*.7,speed:.5+Math.random()};
  machine.add(chip);
  chips.push(chip);
 }

 t.push(x=>{
  head.position.x=Math.sin(x*.55)*1.5;
  gantry.position.z=Math.cos(x*.4)*.35;
  work.rotation.z=x*1.5;
  cutter.rotation.y=x*4;
  chips.forEach(c=>{
   const q=c.userData;
   const ang=x*q.speed+q.phase;
   c.position.set(head.position.x+Math.cos(ang)*q.r,-.5+Math.sin(ang*1.7)*.55,Math.sin(ang)*q.r);
   c.rotation.z=ang;
  });
 });
}

function quality(api){
 const {world:g,accent:a,tickers:t}=api;
 const station=new THREE.Group();
 g.add(station);

 const object=markPart(api,new THREE.Mesh(
  new THREE.TorusKnotGeometry(1.25,.34,170,24,2,3),
  new THREE.MeshStandardMaterial({color:a,metalness:.82,roughness:.16,transparent:true,opacity:.38,wireframe:true,emissive:a,emissiveIntensity:.08})
 ),[0,0,-1],1.2);
 station.add(object);

 const cage=markPart(api,new THREE.LineSegments(
  new THREE.EdgesGeometry(new THREE.BoxGeometry(4.3,4.3,4.3)),
  new THREE.LineBasicMaterial({color:a,transparent:true,opacity:.25})
 ),[0,0,1],.9);
 station.add(cage);

 const scanner=markPart(api,new THREE.Group(),[1,0,0],1.6);
 scanner.position.x=3;
 scanner.userData.basePosition=scanner.position.clone();
 station.add(scanner);
 const tower=new THREE.Mesh(new THREE.BoxGeometry(.2,4,.2),wire(a,.55));
 scanner.add(tower);
 const head=new THREE.Mesh(new THREE.BoxGeometry(.85,.32,.55),solid(a,.42,.14));
 head.position.set(-.42,1.1,0);
 scanner.add(head);

 const scanPlane=new THREE.Mesh(new THREE.PlaneGeometry(5.4,5.4),new THREE.MeshBasicMaterial({color:a,transparent:true,opacity:.08,side:THREE.DoubleSide}));
 scanPlane.rotation.x=Math.PI/2;
 station.add(scanPlane);

 const pointGeo=new THREE.BufferGeometry();
 const points=[];
 for(let i=0;i<480;i++){
  const phi=Math.random()*Math.PI*2;
  const theta=Math.acos(2*Math.random()-1);
  const r=1.55+.12*Math.sin(phi*3);
  points.push(r*Math.sin(theta)*Math.cos(phi),r*Math.cos(theta),r*Math.sin(theta)*Math.sin(phi));
 }
 pointGeo.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
 const cloud=new THREE.Points(pointGeo,new THREE.PointsMaterial({color:a,size:.025,transparent:true,opacity:.55}));
 station.add(cloud);

 t.push(x=>{
  object.rotation.y=x*.34;
  object.rotation.x=x*.16;
  cloud.rotation.y=-x*.18;
  scanPlane.position.y=Math.sin(x*.95)*1.85;
  scanPlane.material.opacity=.035+.06*(1+Math.sin(x*3.4));
  head.position.y=1.1+Math.sin(x*.75)*1.1;
 });
}

function blueprint(api){
 const {world:g,accent:a,tickers:t}=api;
 const center=new THREE.Mesh(new THREE.IcosahedronGeometry(1.55,2),wire(a,.42));
 g.add(center);
 rings(g,a,6,1.7);
 for(let i=0;i<16;i++){
  const ang=i/16*Math.PI*2;
  g.add(line(
   new THREE.Vector3(Math.cos(ang)*2.15,Math.sin(ang)*2.15,0),
   new THREE.Vector3(Math.cos(ang)*4.35,Math.sin(ang)*4.35,-1),
   a,.16
  ));
 }
 for(let i=0;i<6;i++)addTechLabel(api,new THREE.Vector3(-3+i*1.2,-2+i%2*.22,-1),.7);
 t.push(x=>{
  center.rotation.x=x*.12;
  center.rotation.y=x*.2;
  g.rotation.z=Math.sin(x*.2)*.05;
 });
}

if(mount) initScene(mount);
