import * as THREE from 'three';

const mount=document.getElementById('three-hero');
if(mount) initScene(mount);

function initScene(el){
 const scene=new THREE.Scene();
 const camera=new THREE.PerspectiveCamera(48,el.clientWidth/Math.max(el.clientHeight,1),.1,100);
 camera.position.set(0,2.4,9);
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.8)); renderer.setSize(el.clientWidth,el.clientHeight); renderer.setClearColor(0x000000,0);
 renderer.outputColorSpace=THREE.SRGBColorSpace; el.appendChild(renderer.domElement);
 const accent=new THREE.Color(el.dataset.accent||'#49d9ff');
 scene.add(new THREE.AmbientLight(0x7aa7c7,.45));
 const key=new THREE.DirectionalLight(accent,3.1); key.position.set(5,7,6); scene.add(key);
 const rim=new THREE.PointLight(0x5b63ff,20,20); rim.position.set(-5,1,-2); scene.add(rim);
 const world=new THREE.Group(); scene.add(world);
 const tickers=[];
 addEnvironment(scene,accent);
 const builders={shipyard,shipbuilding,engine,electro,network,cnc,quality,blueprint};
 (builders[el.dataset.scene]||blueprint)(world,accent,tickers);
 let mx=0,my=0;
 el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();mx=((e.clientX-r.left)/r.width-.5);my=((e.clientY-r.top)/r.height-.5);},{passive:true});
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const clock=new THREE.Clock();
 function frame(){
   const t=clock.getElapsedTime();
   if(!reduced){
    world.rotation.y+=(mx*.22-world.rotation.y)*.018;
    world.rotation.x+=(-my*.08-world.rotation.x)*.018;
    tickers.forEach(fn=>fn(t));
   }
   renderer.render(scene,camera); requestAnimationFrame(frame);
 }
 frame();
 const ro=new ResizeObserver(()=>{const w=el.clientWidth,h=Math.max(el.clientHeight,1);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);});
 ro.observe(el);
}

function addEnvironment(scene,accent){
 const grid=new THREE.GridHelper(26,42,accent,0x143345); grid.position.y=-2.25; grid.material.opacity=.2;grid.material.transparent=true;scene.add(grid);
 const geo=new THREE.BufferGeometry(); const pts=[];
 for(let i=0;i<450;i++) pts.push((Math.random()-.5)*24,(Math.random()-.5)*12,(Math.random()-.5)*18);
 geo.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));
 const stars=new THREE.Points(geo,new THREE.PointsMaterial({color:accent,size:.025,transparent:true,opacity:.48})); scene.add(stars);
}
const wire=(c,o=.68)=>new THREE.MeshBasicMaterial({color:c,wireframe:true,transparent:true,opacity:o});
const solid=(c,o=.22)=>new THREE.MeshStandardMaterial({color:c,metalness:.75,roughness:.22,transparent:o<1,opacity:o,side:THREE.DoubleSide});
function line(a,b,c,o=.5){
 const g=new THREE.BufferGeometry().setFromPoints([a,b]);return new THREE.Line(g,new THREE.LineBasicMaterial({color:c,transparent:true,opacity:o}));
}
function rings(group,accent,count=4){
 for(let i=0;i<count;i++){const m=new THREE.Mesh(new THREE.TorusGeometry(2+i*.48,.012,4,90),new THREE.MeshBasicMaterial({color:accent,transparent:true,opacity:.16}));m.rotation.x=Math.PI/2;group.add(m);}
}

function shipyard(g,a,t){
 const hull=new THREE.Group();
 const body=new THREE.Mesh(new THREE.BoxGeometry(5.2,.75,1.6),solid(a,.12)); body.rotation.z=-.03; hull.add(body);
 const bow=new THREE.Mesh(new THREE.ConeGeometry(1.08,2.2,4),wire(a,.72)); bow.rotation.z=-Math.PI/2; bow.position.x=3.55; hull.add(bow);
 const deck=new THREE.Mesh(new THREE.BoxGeometry(3.7,.15,1.45),wire(a,.45));deck.position.y=.48;hull.add(deck);
 for(let x=-2;x<2.6;x+=.5){const rib=new THREE.Mesh(new THREE.TorusGeometry(.82,.018,4,28,Math.PI),new THREE.MeshBasicMaterial({color:a,transparent:true,opacity:.45}));rib.rotation.set(0,Math.PI/2,Math.PI/2);rib.position.x=x;hull.add(rib);}
 hull.rotation.y=-.25;g.add(hull);
 for(let i=0;i<3;i++){const crane=new THREE.Group();const mast=new THREE.Mesh(new THREE.BoxGeometry(.08,3.7,.08),wire(a,.45));mast.position.y=.5;crane.add(mast);const arm=new THREE.Mesh(new THREE.BoxGeometry(2.5,.07,.07),wire(a,.45));arm.position.set(.9,2.25,0);crane.add(arm);crane.position.set(-4+i*4,-.3,-2.5);g.add(crane);}
 rings(g,a,5);t.push(x=>{hull.position.y=Math.sin(x*.8)*.06;hull.rotation.y=-.25+Math.sin(x*.28)*.04;});
}
function shipbuilding(g,a,t){
 const hull=new THREE.Group();
 const keel=new THREE.Mesh(new THREE.BoxGeometry(6,.22,.18),solid(a,.45));keel.position.y=-.85;hull.add(keel);
 for(let i=0;i<15;i++){const rib=new THREE.Mesh(new THREE.TorusGeometry(1.15,.026,5,38,Math.PI),wire(a,.7));rib.rotation.set(0,Math.PI/2,Math.PI/2);rib.scale.set(1,1,1-(Math.abs(i-7)/12));rib.position.x=(i-7)*.38;hull.add(rib);}
 const bow=new THREE.Mesh(new THREE.ConeGeometry(1.15,2.1,5),wire(a,.8));bow.rotation.z=-Math.PI/2;bow.position.x=3.8;hull.add(bow);
 hull.rotation.y=-.35;g.add(hull);rings(g,a,3);
 t.push(x=>{hull.rotation.y=-.35+Math.sin(x*.25)*.12;hull.position.y=Math.sin(x*.7)*.08;});
}
function engine(g,a,t){
 const core=new THREE.Group();
 const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,5.2,20),solid(a,.5));shaft.rotation.z=Math.PI/2;core.add(shaft);
 for(let i=-2;i<=2;i++){const rotor=new THREE.Mesh(new THREE.TorusGeometry(1.15-Math.abs(i)*.08,.14,10,48),wire(a,.85));rotor.rotation.y=Math.PI/2;rotor.position.x=i*.82;core.add(rotor);for(let k=0;k<8;k++){const blade=new THREE.Mesh(new THREE.BoxGeometry(.75,.07,.17),solid(a,.38));blade.position.set(i*.82,Math.cos(k*Math.PI/4)*.74,Math.sin(k*Math.PI/4)*.74);blade.rotation.x=k*Math.PI/4;core.add(blade);}}
 core.rotation.y=-.3;g.add(core);rings(g,a,4);t.push(x=>{core.rotation.x=x*.18;core.rotation.y=-.3+Math.sin(x*.4)*.12;});
}
function electro(g,a,t){
 const board=new THREE.Group();
 const plane=new THREE.Mesh(new THREE.PlaneGeometry(7,4,12,8),new THREE.MeshBasicMaterial({color:a,wireframe:true,transparent:true,opacity:.12}));board.add(plane);
 const pulses=[];
 for(let i=0;i<16;i++){const y=(i%6-2.5)*.58,x=-3.1;const endX=3.1-Math.random()*1.2;const l=line(new THREE.Vector3(x,y,.05),new THREE.Vector3(endX,y,.05),a,.55);board.add(l);const p=new THREE.Mesh(new THREE.SphereGeometry(.055,8,8),new THREE.MeshBasicMaterial({color:0xffffff}));p.position.set(x,y,.1);p.userData={y,offset:Math.random()*6,speed:.7+Math.random()*.8,end:endX};board.add(p);pulses.push(p);}
 for(let i=0;i<9;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.28,12),solid(a,.48));c.rotation.x=Math.PI/2;c.position.set((i%3-1)*1.7,(Math.floor(i/3)-1)*1.05,.25);board.add(c);}
 board.rotation.x=-.18;g.add(board);rings(g,a,2);t.push(x=>pulses.forEach(p=>{const span=p.userData.end+3.1;p.position.x=-3.1+((x*p.userData.speed+p.userData.offset)%span)}));
}
function network(g,a,t){
 const nodes=[],pos=[[-2.8,1.4,0],[-1.2,-.7,.5],[0,1.3,-.4],[1.5,-1,.6],[2.8,.9,0],[-.1,-1.7,-.2],[2.2,2,-1.2],[-2.1,-1.8,-.8]];
 pos.forEach((p,i)=>{const n=new THREE.Mesh(new THREE.IcosahedronGeometry(i%3? .18:.3,1),new THREE.MeshStandardMaterial({color:i%3?a:0xffffff,emissive:a,emissiveIntensity:.4,metalness:.4,roughness:.2}));n.position.set(...p);g.add(n);nodes.push(n);});
 const links=[[0,1],[0,2],[1,2],[1,5],[2,3],[2,4],[3,4],[3,5],[4,6],[1,7],[5,7]];
 links.forEach(([i,j])=>g.add(line(nodes[i].position,nodes[j].position,a,.45)));
 const packets=links.slice(0,7).map(([i,j],k)=>{const p=new THREE.Mesh(new THREE.SphereGeometry(.05,6,6),new THREE.MeshBasicMaterial({color:0xffffff}));g.add(p);return {p,a:nodes[i].position.clone(),b:nodes[j].position.clone(),o:k*.14};});
 rings(g,a,3);t.push(x=>{nodes.forEach((n,i)=>n.scale.setScalar(1+Math.sin(x*2+i)*.12));packets.forEach(q=>q.p.position.lerpVectors(q.a,q.b,(x*.22+q.o)%1));g.rotation.y=Math.sin(x*.15)*.18;});
}
function cnc(g,a,t){
 const machine=new THREE.Group();
 const spindle=new THREE.Mesh(new THREE.CylinderGeometry(.42,.58,2.8,20),solid(a,.48));spindle.rotation.z=Math.PI/2;spindle.position.x=-2;machine.add(spindle);
 const part=new THREE.Mesh(new THREE.TorusKnotGeometry(1.08,.28,120,18,2,3),new THREE.MeshStandardMaterial({color:a,metalness:.88,roughness:.16,wireframe:false}));part.position.x=.7;part.rotation.y=Math.PI/2;machine.add(part);
 const cutter=new THREE.Mesh(new THREE.CylinderGeometry(.12,.18,2.1,10),solid(0xffffff,.55));cutter.rotation.z=.18;cutter.position.set(.7,1.85,0);machine.add(cutter);
 const bed=new THREE.Mesh(new THREE.BoxGeometry(6,.22,2.8),wire(a,.32));bed.position.y=-1.6;machine.add(bed);g.add(machine);
 rings(g,a,3);t.push(x=>{part.rotation.x=x*1.4;part.rotation.z=x*.35;cutter.position.y=1.75+Math.sin(x*1.8)*.2;});
}
function quality(g,a,t){
 const obj=new THREE.Mesh(new THREE.IcosahedronGeometry(1.55,2),new THREE.MeshStandardMaterial({color:a,metalness:.75,roughness:.15,transparent:true,opacity:.35,wireframe:true}));g.add(obj);
 const scan=new THREE.Mesh(new THREE.PlaneGeometry(5.5,5.5),new THREE.MeshBasicMaterial({color:a,transparent:true,opacity:.075,side:THREE.DoubleSide}));scan.rotation.x=Math.PI/2;g.add(scan);
 const frame=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(4,4,4)),new THREE.LineBasicMaterial({color:a,transparent:true,opacity:.28}));g.add(frame);
 for(let y=-1.7;y<=1.7;y+=.34){const l=line(new THREE.Vector3(-2,y,2.02),new THREE.Vector3(2,y,2.02),a,.16);g.add(l);}
 t.push(x=>{obj.rotation.y=x*.28;obj.rotation.x=x*.13;scan.position.y=Math.sin(x*.9)*1.8;scan.material.opacity=.04+.05*(1+Math.sin(x*3));});
}
function blueprint(g,a,t){
 const center=new THREE.Mesh(new THREE.IcosahedronGeometry(1.55,2),wire(a,.42));g.add(center);rings(g,a,6);
 for(let i=0;i<12;i++){const ang=i/12*Math.PI*2;g.add(line(new THREE.Vector3(Math.cos(ang)*2.4,Math.sin(ang)*2.4,0),new THREE.Vector3(Math.cos(ang)*4.1,Math.sin(ang)*4.1,-1),a,.18));}
 t.push(x=>{center.rotation.x=x*.12;center.rotation.y=x*.2;g.rotation.z=Math.sin(x*.2)*.05;});
}