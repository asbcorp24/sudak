var Le="top",sn="bottom",on="right",Ie="left",Ta="auto",fs=[Le,sn,on,Ie],or="start",qr="end",vd="clippingParents",au="viewport",Or="popper",xd="reference",Zl=fs.reduce(function(i,t){return i.concat([t+"-"+or,t+"-"+qr])},[]),lu=[].concat(fs,[Ta]).reduce(function(i,t){return i.concat([t,t+"-"+or,t+"-"+qr])},[]),Ed="beforeRead",Md="read",Sd="afterRead",yd="beforeMain",Td="main",bd="afterMain",Ad="beforeWrite",wd="write",Cd="afterWrite",Rd=[Ed,Md,Sd,yd,Td,bd,Ad,wd,Cd];function Bn(i){return i?(i.nodeName||"").toLowerCase():null}function an(i){if(i==null)return window;if(i.toString()!=="[object Window]"){var t=i.ownerDocument;return t&&t.defaultView||window}return i}function ar(i){var t=an(i).Element;return i instanceof t||i instanceof Element}function gn(i){var t=an(i).HTMLElement;return i instanceof t||i instanceof HTMLElement}function cu(i){if(typeof ShadowRoot>"u")return!1;var t=an(i).ShadowRoot;return i instanceof t||i instanceof ShadowRoot}function t_(i){var t=i.state;Object.keys(t.elements).forEach(function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},s=t.elements[e];!gn(s)||!Bn(s)||(Object.assign(s.style,n),Object.keys(r).forEach(function(o){var a=r[o];a===!1?s.removeAttribute(o):s.setAttribute(o,a===!0?"":a)}))})}function e_(i){var t=i.state,e={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,e.popper),t.styles=e,t.elements.arrow&&Object.assign(t.elements.arrow.style,e.arrow),function(){Object.keys(t.elements).forEach(function(n){var r=t.elements[n],s=t.attributes[n]||{},o=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:e[n]),a=o.reduce(function(l,c){return l[c]="",l},{});!gn(r)||!Bn(r)||(Object.assign(r.style,a),Object.keys(s).forEach(function(l){r.removeAttribute(l)}))})}}const uu={name:"applyStyles",enabled:!0,phase:"write",fn:t_,effect:e_,requires:["computeStyles"]};function On(i){return i.split("-")[0]}var er=Math.max,oa=Math.min,Kr=Math.round;function Jl(){var i=navigator.userAgentData;return i!=null&&i.brands&&Array.isArray(i.brands)?i.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Pd(){return!/^((?!chrome|android).)*safari/i.test(Jl())}function jr(i,t,e){t===void 0&&(t=!1),e===void 0&&(e=!1);var n=i.getBoundingClientRect(),r=1,s=1;t&&gn(i)&&(r=i.offsetWidth>0&&Kr(n.width)/i.offsetWidth||1,s=i.offsetHeight>0&&Kr(n.height)/i.offsetHeight||1);var o=ar(i)?an(i):window,a=o.visualViewport,l=!Pd()&&e,c=(n.left+(l&&a?a.offsetLeft:0))/r,u=(n.top+(l&&a?a.offsetTop:0))/s,h=n.width/r,f=n.height/s;return{width:h,height:f,top:u,right:c+h,bottom:u+f,left:c,x:c,y:u}}function hu(i){var t=jr(i),e=i.offsetWidth,n=i.offsetHeight;return Math.abs(t.width-e)<=1&&(e=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:i.offsetLeft,y:i.offsetTop,width:e,height:n}}function Dd(i,t){var e=t.getRootNode&&t.getRootNode();if(i.contains(t))return!0;if(e&&cu(e)){var n=t;do{if(n&&i.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function ei(i){return an(i).getComputedStyle(i)}function n_(i){return["table","td","th"].indexOf(Bn(i))>=0}function Di(i){return((ar(i)?i.ownerDocument:i.document)||window.document).documentElement}function ba(i){return Bn(i)==="html"?i:i.assignedSlot||i.parentNode||(cu(i)?i.host:null)||Di(i)}function hh(i){return!gn(i)||ei(i).position==="fixed"?null:i.offsetParent}function i_(i){var t=/firefox/i.test(Jl()),e=/Trident/i.test(Jl());if(e&&gn(i)){var n=ei(i);if(n.position==="fixed")return null}var r=ba(i);for(cu(r)&&(r=r.host);gn(r)&&["html","body"].indexOf(Bn(r))<0;){var s=ei(r);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return r;r=r.parentNode}return null}function Ks(i){for(var t=an(i),e=hh(i);e&&n_(e)&&ei(e).position==="static";)e=hh(e);return e&&(Bn(e)==="html"||Bn(e)==="body"&&ei(e).position==="static")?t:e||i_(i)||t}function fu(i){return["top","bottom"].indexOf(i)>=0?"x":"y"}function Ns(i,t,e){return er(i,oa(t,e))}function r_(i,t,e){var n=Ns(i,t,e);return n>e?e:n}function Ld(){return{top:0,right:0,bottom:0,left:0}}function Id(i){return Object.assign({},Ld(),i)}function Nd(i,t){return t.reduce(function(e,n){return e[n]=i,e},{})}var s_=function(t,e){return t=typeof t=="function"?t(Object.assign({},e.rects,{placement:e.placement})):t,Id(typeof t!="number"?t:Nd(t,fs))};function o_(i){var t,e=i.state,n=i.name,r=i.options,s=e.elements.arrow,o=e.modifiersData.popperOffsets,a=On(e.placement),l=fu(a),c=[Ie,on].indexOf(a)>=0,u=c?"height":"width";if(!(!s||!o)){var h=s_(r.padding,e),f=hu(s),p=l==="y"?Le:Ie,g=l==="y"?sn:on,_=e.rects.reference[u]+e.rects.reference[l]-o[l]-e.rects.popper[u],d=o[l]-e.rects.reference[l],m=Ks(s),E=m?l==="y"?m.clientHeight||0:m.clientWidth||0:0,x=_/2-d/2,M=h[p],w=E-f[u]-h[g],A=E/2-f[u]/2+x,S=Ns(M,A,w),C=l;e.modifiersData[n]=(t={},t[C]=S,t.centerOffset=S-A,t)}}function a_(i){var t=i.state,e=i.options,n=e.element,r=n===void 0?"[data-popper-arrow]":n;r!=null&&(typeof r=="string"&&(r=t.elements.popper.querySelector(r),!r)||Dd(t.elements.popper,r)&&(t.elements.arrow=r))}const Od={name:"arrow",enabled:!0,phase:"main",fn:o_,effect:a_,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Zr(i){return i.split("-")[1]}var l_={top:"auto",right:"auto",bottom:"auto",left:"auto"};function c_(i,t){var e=i.x,n=i.y,r=t.devicePixelRatio||1;return{x:Kr(e*r)/r||0,y:Kr(n*r)/r||0}}function fh(i){var t,e=i.popper,n=i.popperRect,r=i.placement,s=i.variation,o=i.offsets,a=i.position,l=i.gpuAcceleration,c=i.adaptive,u=i.roundOffsets,h=i.isFixed,f=o.x,p=f===void 0?0:f,g=o.y,_=g===void 0?0:g,d=typeof u=="function"?u({x:p,y:_}):{x:p,y:_};p=d.x,_=d.y;var m=o.hasOwnProperty("x"),E=o.hasOwnProperty("y"),x=Ie,M=Le,w=window;if(c){var A=Ks(e),S="clientHeight",C="clientWidth";if(A===an(e)&&(A=Di(e),ei(A).position!=="static"&&a==="absolute"&&(S="scrollHeight",C="scrollWidth")),A=A,r===Le||(r===Ie||r===on)&&s===qr){M=sn;var P=h&&A===w&&w.visualViewport?w.visualViewport.height:A[S];_-=P-n.height,_*=l?1:-1}if(r===Ie||(r===Le||r===sn)&&s===qr){x=on;var v=h&&A===w&&w.visualViewport?w.visualViewport.width:A[C];p-=v-n.width,p*=l?1:-1}}var y=Object.assign({position:a},c&&l_),N=u===!0?c_({x:p,y:_},an(e)):{x:p,y:_};if(p=N.x,_=N.y,l){var O;return Object.assign({},y,(O={},O[M]=E?"0":"",O[x]=m?"0":"",O.transform=(w.devicePixelRatio||1)<=1?"translate("+p+"px, "+_+"px)":"translate3d("+p+"px, "+_+"px, 0)",O))}return Object.assign({},y,(t={},t[M]=E?_+"px":"",t[x]=m?p+"px":"",t.transform="",t))}function u_(i){var t=i.state,e=i.options,n=e.gpuAcceleration,r=n===void 0?!0:n,s=e.adaptive,o=s===void 0?!0:s,a=e.roundOffsets,l=a===void 0?!0:a,c={placement:On(t.placement),variation:Zr(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:r,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,fh(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:o,roundOffsets:l})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,fh(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const du={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:u_,data:{}};var co={passive:!0};function h_(i){var t=i.state,e=i.instance,n=i.options,r=n.scroll,s=r===void 0?!0:r,o=n.resize,a=o===void 0?!0:o,l=an(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&c.forEach(function(u){u.addEventListener("scroll",e.update,co)}),a&&l.addEventListener("resize",e.update,co),function(){s&&c.forEach(function(u){u.removeEventListener("scroll",e.update,co)}),a&&l.removeEventListener("resize",e.update,co)}}const pu={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:h_,data:{}};var f_={left:"right",right:"left",bottom:"top",top:"bottom"};function $o(i){return i.replace(/left|right|bottom|top/g,function(t){return f_[t]})}var d_={start:"end",end:"start"};function dh(i){return i.replace(/start|end/g,function(t){return d_[t]})}function mu(i){var t=an(i),e=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:e,scrollTop:n}}function _u(i){return jr(Di(i)).left+mu(i).scrollLeft}function p_(i,t){var e=an(i),n=Di(i),r=e.visualViewport,s=n.clientWidth,o=n.clientHeight,a=0,l=0;if(r){s=r.width,o=r.height;var c=Pd();(c||!c&&t==="fixed")&&(a=r.offsetLeft,l=r.offsetTop)}return{width:s,height:o,x:a+_u(i),y:l}}function m_(i){var t,e=Di(i),n=mu(i),r=(t=i.ownerDocument)==null?void 0:t.body,s=er(e.scrollWidth,e.clientWidth,r?r.scrollWidth:0,r?r.clientWidth:0),o=er(e.scrollHeight,e.clientHeight,r?r.scrollHeight:0,r?r.clientHeight:0),a=-n.scrollLeft+_u(i),l=-n.scrollTop;return ei(r||e).direction==="rtl"&&(a+=er(e.clientWidth,r?r.clientWidth:0)-s),{width:s,height:o,x:a,y:l}}function gu(i){var t=ei(i),e=t.overflow,n=t.overflowX,r=t.overflowY;return/auto|scroll|overlay|hidden/.test(e+r+n)}function Ud(i){return["html","body","#document"].indexOf(Bn(i))>=0?i.ownerDocument.body:gn(i)&&gu(i)?i:Ud(ba(i))}function Os(i,t){var e;t===void 0&&(t=[]);var n=Ud(i),r=n===((e=i.ownerDocument)==null?void 0:e.body),s=an(n),o=r?[s].concat(s.visualViewport||[],gu(n)?n:[]):n,a=t.concat(o);return r?a:a.concat(Os(ba(o)))}function Ql(i){return Object.assign({},i,{left:i.x,top:i.y,right:i.x+i.width,bottom:i.y+i.height})}function __(i,t){var e=jr(i,!1,t==="fixed");return e.top=e.top+i.clientTop,e.left=e.left+i.clientLeft,e.bottom=e.top+i.clientHeight,e.right=e.left+i.clientWidth,e.width=i.clientWidth,e.height=i.clientHeight,e.x=e.left,e.y=e.top,e}function ph(i,t,e){return t===au?Ql(p_(i,e)):ar(t)?__(t,e):Ql(m_(Di(i)))}function g_(i){var t=Os(ba(i)),e=["absolute","fixed"].indexOf(ei(i).position)>=0,n=e&&gn(i)?Ks(i):i;return ar(n)?t.filter(function(r){return ar(r)&&Dd(r,n)&&Bn(r)!=="body"}):[]}function v_(i,t,e,n){var r=t==="clippingParents"?g_(i):[].concat(t),s=[].concat(r,[e]),o=s[0],a=s.reduce(function(l,c){var u=ph(i,c,n);return l.top=er(u.top,l.top),l.right=oa(u.right,l.right),l.bottom=oa(u.bottom,l.bottom),l.left=er(u.left,l.left),l},ph(i,o,n));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function Fd(i){var t=i.reference,e=i.element,n=i.placement,r=n?On(n):null,s=n?Zr(n):null,o=t.x+t.width/2-e.width/2,a=t.y+t.height/2-e.height/2,l;switch(r){case Le:l={x:o,y:t.y-e.height};break;case sn:l={x:o,y:t.y+t.height};break;case on:l={x:t.x+t.width,y:a};break;case Ie:l={x:t.x-e.width,y:a};break;default:l={x:t.x,y:t.y}}var c=r?fu(r):null;if(c!=null){var u=c==="y"?"height":"width";switch(s){case or:l[c]=l[c]-(t[u]/2-e[u]/2);break;case qr:l[c]=l[c]+(t[u]/2-e[u]/2);break}}return l}function Jr(i,t){t===void 0&&(t={});var e=t,n=e.placement,r=n===void 0?i.placement:n,s=e.strategy,o=s===void 0?i.strategy:s,a=e.boundary,l=a===void 0?vd:a,c=e.rootBoundary,u=c===void 0?au:c,h=e.elementContext,f=h===void 0?Or:h,p=e.altBoundary,g=p===void 0?!1:p,_=e.padding,d=_===void 0?0:_,m=Id(typeof d!="number"?d:Nd(d,fs)),E=f===Or?xd:Or,x=i.rects.popper,M=i.elements[g?E:f],w=v_(ar(M)?M:M.contextElement||Di(i.elements.popper),l,u,o),A=jr(i.elements.reference),S=Fd({reference:A,element:x,strategy:"absolute",placement:r}),C=Ql(Object.assign({},x,S)),P=f===Or?C:A,v={top:w.top-P.top+m.top,bottom:P.bottom-w.bottom+m.bottom,left:w.left-P.left+m.left,right:P.right-w.right+m.right},y=i.modifiersData.offset;if(f===Or&&y){var N=y[r];Object.keys(v).forEach(function(O){var k=[on,sn].indexOf(O)>=0?1:-1,X=[Le,sn].indexOf(O)>=0?"y":"x";v[O]+=N[X]*k})}return v}function x_(i,t){t===void 0&&(t={});var e=t,n=e.placement,r=e.boundary,s=e.rootBoundary,o=e.padding,a=e.flipVariations,l=e.allowedAutoPlacements,c=l===void 0?lu:l,u=Zr(n),h=u?a?Zl:Zl.filter(function(g){return Zr(g)===u}):fs,f=h.filter(function(g){return c.indexOf(g)>=0});f.length===0&&(f=h);var p=f.reduce(function(g,_){return g[_]=Jr(i,{placement:_,boundary:r,rootBoundary:s,padding:o})[On(_)],g},{});return Object.keys(p).sort(function(g,_){return p[g]-p[_]})}function E_(i){if(On(i)===Ta)return[];var t=$o(i);return[dh(i),t,dh(t)]}function M_(i){var t=i.state,e=i.options,n=i.name;if(!t.modifiersData[n]._skip){for(var r=e.mainAxis,s=r===void 0?!0:r,o=e.altAxis,a=o===void 0?!0:o,l=e.fallbackPlacements,c=e.padding,u=e.boundary,h=e.rootBoundary,f=e.altBoundary,p=e.flipVariations,g=p===void 0?!0:p,_=e.allowedAutoPlacements,d=t.options.placement,m=On(d),E=m===d,x=l||(E||!g?[$o(d)]:E_(d)),M=[d].concat(x).reduce(function($,j){return $.concat(On(j)===Ta?x_(t,{placement:j,boundary:u,rootBoundary:h,padding:c,flipVariations:g,allowedAutoPlacements:_}):j)},[]),w=t.rects.reference,A=t.rects.popper,S=new Map,C=!0,P=M[0],v=0;v<M.length;v++){var y=M[v],N=On(y),O=Zr(y)===or,k=[Le,sn].indexOf(N)>=0,X=k?"width":"height",B=Jr(t,{placement:y,boundary:u,rootBoundary:h,altBoundary:f,padding:c}),W=k?O?on:Ie:O?sn:Le;w[X]>A[X]&&(W=$o(W));var G=$o(W),nt=[];if(s&&nt.push(B[N]<=0),a&&nt.push(B[W]<=0,B[G]<=0),nt.every(function($){return $})){P=y,C=!1;break}S.set(y,nt)}if(C)for(var it=g?3:1,ct=function(j){var dt=M.find(function(ot){var St=S.get(ot);if(St)return St.slice(0,j).every(function(yt){return yt})});if(dt)return P=dt,"break"},Ct=it;Ct>0;Ct--){var Nt=ct(Ct);if(Nt==="break")break}t.placement!==P&&(t.modifiersData[n]._skip=!0,t.placement=P,t.reset=!0)}}const Bd={name:"flip",enabled:!0,phase:"main",fn:M_,requiresIfExists:["offset"],data:{_skip:!1}};function mh(i,t,e){return e===void 0&&(e={x:0,y:0}),{top:i.top-t.height-e.y,right:i.right-t.width+e.x,bottom:i.bottom-t.height+e.y,left:i.left-t.width-e.x}}function _h(i){return[Le,on,sn,Ie].some(function(t){return i[t]>=0})}function S_(i){var t=i.state,e=i.name,n=t.rects.reference,r=t.rects.popper,s=t.modifiersData.preventOverflow,o=Jr(t,{elementContext:"reference"}),a=Jr(t,{altBoundary:!0}),l=mh(o,n),c=mh(a,r,s),u=_h(l),h=_h(c);t.modifiersData[e]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:u,hasPopperEscaped:h},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":h})}const zd={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:S_};function y_(i,t,e){var n=On(i),r=[Ie,Le].indexOf(n)>=0?-1:1,s=typeof e=="function"?e(Object.assign({},t,{placement:i})):e,o=s[0],a=s[1];return o=o||0,a=(a||0)*r,[Ie,on].indexOf(n)>=0?{x:a,y:o}:{x:o,y:a}}function T_(i){var t=i.state,e=i.options,n=i.name,r=e.offset,s=r===void 0?[0,0]:r,o=lu.reduce(function(u,h){return u[h]=y_(h,t.rects,s),u},{}),a=o[t.placement],l=a.x,c=a.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=c),t.modifiersData[n]=o}const kd={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:T_};function b_(i){var t=i.state,e=i.name;t.modifiersData[e]=Fd({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const vu={name:"popperOffsets",enabled:!0,phase:"read",fn:b_,data:{}};function A_(i){return i==="x"?"y":"x"}function w_(i){var t=i.state,e=i.options,n=i.name,r=e.mainAxis,s=r===void 0?!0:r,o=e.altAxis,a=o===void 0?!1:o,l=e.boundary,c=e.rootBoundary,u=e.altBoundary,h=e.padding,f=e.tether,p=f===void 0?!0:f,g=e.tetherOffset,_=g===void 0?0:g,d=Jr(t,{boundary:l,rootBoundary:c,padding:h,altBoundary:u}),m=On(t.placement),E=Zr(t.placement),x=!E,M=fu(m),w=A_(M),A=t.modifiersData.popperOffsets,S=t.rects.reference,C=t.rects.popper,P=typeof _=="function"?_(Object.assign({},t.rects,{placement:t.placement})):_,v=typeof P=="number"?{mainAxis:P,altAxis:P}:Object.assign({mainAxis:0,altAxis:0},P),y=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,N={x:0,y:0};if(A){if(s){var O,k=M==="y"?Le:Ie,X=M==="y"?sn:on,B=M==="y"?"height":"width",W=A[M],G=W+d[k],nt=W-d[X],it=p?-C[B]/2:0,ct=E===or?S[B]:C[B],Ct=E===or?-C[B]:-S[B],Nt=t.elements.arrow,$=p&&Nt?hu(Nt):{width:0,height:0},j=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ld(),dt=j[k],ot=j[X],St=Ns(0,S[B],$[B]),yt=x?S[B]/2-it-St-dt-v.mainAxis:ct-St-dt-v.mainAxis,Ft=x?-S[B]/2+it+St+ot+v.mainAxis:Ct+St+ot+v.mainAxis,Xt=t.elements.arrow&&Ks(t.elements.arrow),Bt=Xt?M==="y"?Xt.clientTop||0:Xt.clientLeft||0:0,D=(O=y==null?void 0:y[M])!=null?O:0,Pe=W+yt-D-Bt,Ot=W+Ft-D,zt=Ns(p?oa(G,Pe):G,W,p?er(nt,Ot):nt);A[M]=zt,N[M]=zt-W}if(a){var Tt,te=M==="x"?Le:Ie,At=M==="x"?sn:on,R=A[w],T=w==="y"?"height":"width",z=R+d[te],K=R-d[At],Q=[Le,Ie].indexOf(m)!==-1,q=(Tt=y==null?void 0:y[w])!=null?Tt:0,gt=Q?z:R-S[T]-C[T]-q+v.altAxis,rt=Q?R+S[T]+C[T]-q-v.altAxis:K,ut=p&&Q?r_(gt,R,rt):Ns(p?gt:z,R,p?rt:K);A[w]=ut,N[w]=ut-R}t.modifiersData[n]=N}}const Vd={name:"preventOverflow",enabled:!0,phase:"main",fn:w_,requiresIfExists:["offset"]};function C_(i){return{scrollLeft:i.scrollLeft,scrollTop:i.scrollTop}}function R_(i){return i===an(i)||!gn(i)?mu(i):C_(i)}function P_(i){var t=i.getBoundingClientRect(),e=Kr(t.width)/i.offsetWidth||1,n=Kr(t.height)/i.offsetHeight||1;return e!==1||n!==1}function D_(i,t,e){e===void 0&&(e=!1);var n=gn(t),r=gn(t)&&P_(t),s=Di(t),o=jr(i,r,e),a={scrollLeft:0,scrollTop:0},l={x:0,y:0};return(n||!n&&!e)&&((Bn(t)!=="body"||gu(s))&&(a=R_(t)),gn(t)?(l=jr(t,!0),l.x+=t.clientLeft,l.y+=t.clientTop):s&&(l.x=_u(s))),{x:o.left+a.scrollLeft-l.x,y:o.top+a.scrollTop-l.y,width:o.width,height:o.height}}function L_(i){var t=new Map,e=new Set,n=[];i.forEach(function(s){t.set(s.name,s)});function r(s){e.add(s.name);var o=[].concat(s.requires||[],s.requiresIfExists||[]);o.forEach(function(a){if(!e.has(a)){var l=t.get(a);l&&r(l)}}),n.push(s)}return i.forEach(function(s){e.has(s.name)||r(s)}),n}function I_(i){var t=L_(i);return Rd.reduce(function(e,n){return e.concat(t.filter(function(r){return r.phase===n}))},[])}function N_(i){var t;return function(){return t||(t=new Promise(function(e){Promise.resolve().then(function(){t=void 0,e(i())})})),t}}function O_(i){var t=i.reduce(function(e,n){var r=e[n.name];return e[n.name]=r?Object.assign({},r,n,{options:Object.assign({},r.options,n.options),data:Object.assign({},r.data,n.data)}):n,e},{});return Object.keys(t).map(function(e){return t[e]})}var gh={placement:"bottom",modifiers:[],strategy:"absolute"};function vh(){for(var i=arguments.length,t=new Array(i),e=0;e<i;e++)t[e]=arguments[e];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function Aa(i){i===void 0&&(i={});var t=i,e=t.defaultModifiers,n=e===void 0?[]:e,r=t.defaultOptions,s=r===void 0?gh:r;return function(a,l,c){c===void 0&&(c=s);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},gh,s),modifiersData:{},elements:{reference:a,popper:l},attributes:{},styles:{}},h=[],f=!1,p={state:u,setOptions:function(m){var E=typeof m=="function"?m(u.options):m;_(),u.options=Object.assign({},s,u.options,E),u.scrollParents={reference:ar(a)?Os(a):a.contextElement?Os(a.contextElement):[],popper:Os(l)};var x=I_(O_([].concat(n,u.options.modifiers)));return u.orderedModifiers=x.filter(function(M){return M.enabled}),g(),p.update()},forceUpdate:function(){if(!f){var m=u.elements,E=m.reference,x=m.popper;if(vh(E,x)){u.rects={reference:D_(E,Ks(x),u.options.strategy==="fixed"),popper:hu(x)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(v){return u.modifiersData[v.name]=Object.assign({},v.data)});for(var M=0;M<u.orderedModifiers.length;M++){if(u.reset===!0){u.reset=!1,M=-1;continue}var w=u.orderedModifiers[M],A=w.fn,S=w.options,C=S===void 0?{}:S,P=w.name;typeof A=="function"&&(u=A({state:u,options:C,name:P,instance:p})||u)}}}},update:N_(function(){return new Promise(function(d){p.forceUpdate(),d(u)})}),destroy:function(){_(),f=!0}};if(!vh(a,l))return p;p.setOptions(c).then(function(d){!f&&c.onFirstUpdate&&c.onFirstUpdate(d)});function g(){u.orderedModifiers.forEach(function(d){var m=d.name,E=d.options,x=E===void 0?{}:E,M=d.effect;if(typeof M=="function"){var w=M({state:u,name:m,instance:p,options:x}),A=function(){};h.push(w||A)}})}function _(){h.forEach(function(d){return d()}),h=[]}return p}}var U_=Aa(),F_=[pu,vu,du,uu],B_=Aa({defaultModifiers:F_}),z_=[pu,vu,du,uu,kd,Bd,Vd,Od,zd],xu=Aa({defaultModifiers:z_});const Hd=Object.freeze(Object.defineProperty({__proto__:null,afterMain:bd,afterRead:Sd,afterWrite:Cd,applyStyles:uu,arrow:Od,auto:Ta,basePlacements:fs,beforeMain:yd,beforeRead:Ed,beforeWrite:Ad,bottom:sn,clippingParents:vd,computeStyles:du,createPopper:xu,createPopperBase:U_,createPopperLite:B_,detectOverflow:Jr,end:qr,eventListeners:pu,flip:Bd,hide:zd,left:Ie,main:Td,modifierPhases:Rd,offset:kd,placements:lu,popper:Or,popperGenerator:Aa,popperOffsets:vu,preventOverflow:Vd,read:Md,reference:xd,right:on,start:or,top:Le,variationPlacements:Zl,viewport:au,write:wd},Symbol.toStringTag,{value:"Module"}));/*!
  * Bootstrap v5.3.8 (https://getbootstrap.com/)
  * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */const li=new Map,Ya={set(i,t,e){li.has(i)||li.set(i,new Map);const n=li.get(i);if(!n.has(t)&&n.size!==0){console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);return}n.set(t,e)},get(i,t){return li.has(i)&&li.get(i).get(t)||null},remove(i,t){if(!li.has(i))return;const e=li.get(i);e.delete(t),e.size===0&&li.delete(i)}},k_=1e6,V_=1e3,tc="transitionend",Gd=i=>(i&&window.CSS&&window.CSS.escape&&(i=i.replace(/#([^\s"#']+)/g,(t,e)=>`#${CSS.escape(e)}`)),i),H_=i=>i==null?`${i}`:Object.prototype.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase(),G_=i=>{do i+=Math.floor(Math.random()*k_);while(document.getElementById(i));return i},W_=i=>{if(!i)return 0;let{transitionDuration:t,transitionDelay:e}=window.getComputedStyle(i);const n=Number.parseFloat(t),r=Number.parseFloat(e);return!n&&!r?0:(t=t.split(",")[0],e=e.split(",")[0],(Number.parseFloat(t)+Number.parseFloat(e))*V_)},Wd=i=>{i.dispatchEvent(new Event(tc))},Qn=i=>!i||typeof i!="object"?!1:(typeof i.jquery<"u"&&(i=i[0]),typeof i.nodeType<"u"),yi=i=>Qn(i)?i.jquery?i[0]:i:typeof i=="string"&&i.length>0?document.querySelector(Gd(i)):null,ds=i=>{if(!Qn(i)||i.getClientRects().length===0)return!1;const t=getComputedStyle(i).getPropertyValue("visibility")==="visible",e=i.closest("details:not([open])");if(!e)return t;if(e!==i){const n=i.closest("summary");if(n&&n.parentNode!==e||n===null)return!1}return t},Ti=i=>!i||i.nodeType!==Node.ELEMENT_NODE||i.classList.contains("disabled")?!0:typeof i.disabled<"u"?i.disabled:i.hasAttribute("disabled")&&i.getAttribute("disabled")!=="false",Xd=i=>{if(!document.documentElement.attachShadow)return null;if(typeof i.getRootNode=="function"){const t=i.getRootNode();return t instanceof ShadowRoot?t:null}return i instanceof ShadowRoot?i:i.parentNode?Xd(i.parentNode):null},aa=()=>{},js=i=>{i.offsetHeight},$d=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,qa=[],X_=i=>{document.readyState==="loading"?(qa.length||document.addEventListener("DOMContentLoaded",()=>{for(const t of qa)t()}),qa.push(i)):i()},vn=()=>document.documentElement.dir==="rtl",En=i=>{X_(()=>{const t=$d();if(t){const e=i.NAME,n=t.fn[e];t.fn[e]=i.jQueryInterface,t.fn[e].Constructor=i,t.fn[e].noConflict=()=>(t.fn[e]=n,i.jQueryInterface)}})},Be=(i,t=[],e=i)=>typeof i=="function"?i.call(...t):e,Yd=(i,t,e=!0)=>{if(!e){Be(i);return}const n=5,r=W_(t)+n;let s=!1;const o=({target:a})=>{a===t&&(s=!0,t.removeEventListener(tc,o),Be(i))};t.addEventListener(tc,o),setTimeout(()=>{s||Wd(t)},r)},Eu=(i,t,e,n)=>{const r=i.length;let s=i.indexOf(t);return s===-1?!e&&n?i[r-1]:i[0]:(s+=e?1:-1,n&&(s=(s+r)%r),i[Math.max(0,Math.min(s,r-1))])},$_=/[^.]*(?=\..*)\.|.*/,Y_=/\..*/,q_=/::\d+$/,Ka={};let xh=1;const qd={mouseenter:"mouseover",mouseleave:"mouseout"},K_=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function Kd(i,t){return t&&`${t}::${xh++}`||i.uidEvent||xh++}function jd(i){const t=Kd(i);return i.uidEvent=t,Ka[t]=Ka[t]||{},Ka[t]}function j_(i,t){return function e(n){return Mu(n,{delegateTarget:i}),e.oneOff&&J.off(i,n.type,t),t.apply(i,[n])}}function Z_(i,t,e){return function n(r){const s=i.querySelectorAll(t);for(let{target:o}=r;o&&o!==this;o=o.parentNode)for(const a of s)if(a===o)return Mu(r,{delegateTarget:o}),n.oneOff&&J.off(i,r.type,t,e),e.apply(o,[r])}}function Zd(i,t,e=null){return Object.values(i).find(n=>n.callable===t&&n.delegationSelector===e)}function Jd(i,t,e){const n=typeof t=="string",r=n?e:t||e;let s=Qd(i);return K_.has(s)||(s=i),[n,r,s]}function Eh(i,t,e,n,r){if(typeof t!="string"||!i)return;let[s,o,a]=Jd(t,e,n);t in qd&&(o=(g=>function(_){if(!_.relatedTarget||_.relatedTarget!==_.delegateTarget&&!_.delegateTarget.contains(_.relatedTarget))return g.call(this,_)})(o));const l=jd(i),c=l[a]||(l[a]={}),u=Zd(c,o,s?e:null);if(u){u.oneOff=u.oneOff&&r;return}const h=Kd(o,t.replace($_,"")),f=s?Z_(i,e,o):j_(i,o);f.delegationSelector=s?e:null,f.callable=o,f.oneOff=r,f.uidEvent=h,c[h]=f,i.addEventListener(a,f,s)}function ec(i,t,e,n,r){const s=Zd(t[e],n,r);s&&(i.removeEventListener(e,s,!!r),delete t[e][s.uidEvent])}function J_(i,t,e,n){const r=t[e]||{};for(const[s,o]of Object.entries(r))s.includes(n)&&ec(i,t,e,o.callable,o.delegationSelector)}function Qd(i){return i=i.replace(Y_,""),qd[i]||i}const J={on(i,t,e,n){Eh(i,t,e,n,!1)},one(i,t,e,n){Eh(i,t,e,n,!0)},off(i,t,e,n){if(typeof t!="string"||!i)return;const[r,s,o]=Jd(t,e,n),a=o!==t,l=jd(i),c=l[o]||{},u=t.startsWith(".");if(typeof s<"u"){if(!Object.keys(c).length)return;ec(i,l,o,s,r?e:null);return}if(u)for(const h of Object.keys(l))J_(i,l,h,t.slice(1));for(const[h,f]of Object.entries(c)){const p=h.replace(q_,"");(!a||t.includes(p))&&ec(i,l,o,f.callable,f.delegationSelector)}},trigger(i,t,e){if(typeof t!="string"||!i)return null;const n=$d(),r=Qd(t),s=t!==r;let o=null,a=!0,l=!0,c=!1;s&&n&&(o=n.Event(t,e),n(i).trigger(o),a=!o.isPropagationStopped(),l=!o.isImmediatePropagationStopped(),c=o.isDefaultPrevented());const u=Mu(new Event(t,{bubbles:a,cancelable:!0}),e);return c&&u.preventDefault(),l&&i.dispatchEvent(u),u.defaultPrevented&&o&&o.preventDefault(),u}};function Mu(i,t={}){for(const[e,n]of Object.entries(t))try{i[e]=n}catch{Object.defineProperty(i,e,{configurable:!0,get(){return n}})}return i}function Mh(i){if(i==="true")return!0;if(i==="false")return!1;if(i===Number(i).toString())return Number(i);if(i===""||i==="null")return null;if(typeof i!="string")return i;try{return JSON.parse(decodeURIComponent(i))}catch{return i}}function ja(i){return i.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}const ti={setDataAttribute(i,t,e){i.setAttribute(`data-bs-${ja(t)}`,e)},removeDataAttribute(i,t){i.removeAttribute(`data-bs-${ja(t)}`)},getDataAttributes(i){if(!i)return{};const t={},e=Object.keys(i.dataset).filter(n=>n.startsWith("bs")&&!n.startsWith("bsConfig"));for(const n of e){let r=n.replace(/^bs/,"");r=r.charAt(0).toLowerCase()+r.slice(1),t[r]=Mh(i.dataset[n])}return t},getDataAttribute(i,t){return Mh(i.getAttribute(`data-bs-${ja(t)}`))}};class Zs{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(t){return t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t}_mergeConfigObj(t,e){const n=Qn(e)?ti.getDataAttribute(e,"config"):{};return{...this.constructor.Default,...typeof n=="object"?n:{},...Qn(e)?ti.getDataAttributes(e):{},...typeof t=="object"?t:{}}}_typeCheckConfig(t,e=this.constructor.DefaultType){for(const[n,r]of Object.entries(e)){const s=t[n],o=Qn(s)?"element":H_(s);if(!new RegExp(r).test(o))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${r}".`)}}}const Q_="5.3.8";class Pn extends Zs{constructor(t,e){super(),t=yi(t),t&&(this._element=t,this._config=this._getConfig(e),Ya.set(this._element,this.constructor.DATA_KEY,this))}dispose(){Ya.remove(this._element,this.constructor.DATA_KEY),J.off(this._element,this.constructor.EVENT_KEY);for(const t of Object.getOwnPropertyNames(this))this[t]=null}_queueCallback(t,e,n=!0){Yd(t,e,n)}_getConfig(t){return t=this._mergeConfigObj(t,this._element),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}static getInstance(t){return Ya.get(yi(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,typeof e=="object"?e:null)}static get VERSION(){return Q_}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(t){return`${t}${this.EVENT_KEY}`}}const Za=i=>{let t=i.getAttribute("data-bs-target");if(!t||t==="#"){let e=i.getAttribute("href");if(!e||!e.includes("#")&&!e.startsWith("."))return null;e.includes("#")&&!e.startsWith("#")&&(e=`#${e.split("#")[1]}`),t=e&&e!=="#"?e.trim():null}return t?t.split(",").map(e=>Gd(e)).join(","):null},Mt={find(i,t=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(t,i))},findOne(i,t=document.documentElement){return Element.prototype.querySelector.call(t,i)},children(i,t){return[].concat(...i.children).filter(e=>e.matches(t))},parents(i,t){const e=[];let n=i.parentNode.closest(t);for(;n;)e.push(n),n=n.parentNode.closest(t);return e},prev(i,t){let e=i.previousElementSibling;for(;e;){if(e.matches(t))return[e];e=e.previousElementSibling}return[]},next(i,t){let e=i.nextElementSibling;for(;e;){if(e.matches(t))return[e];e=e.nextElementSibling}return[]},focusableChildren(i){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(e=>`${e}:not([tabindex^="-"])`).join(",");return this.find(t,i).filter(e=>!Ti(e)&&ds(e))},getSelectorFromElement(i){const t=Za(i);return t&&Mt.findOne(t)?t:null},getElementFromSelector(i){const t=Za(i);return t?Mt.findOne(t):null},getMultipleElementsFromSelector(i){const t=Za(i);return t?Mt.find(t):[]}},wa=(i,t="hide")=>{const e=`click.dismiss${i.EVENT_KEY}`,n=i.NAME;J.on(document,e,`[data-bs-dismiss="${n}"]`,function(r){if(["A","AREA"].includes(this.tagName)&&r.preventDefault(),Ti(this))return;const s=Mt.getElementFromSelector(this)||this.closest(`.${n}`);i.getOrCreateInstance(s)[t]()})},tg="alert",eg="bs.alert",tp=`.${eg}`,ng=`close${tp}`,ig=`closed${tp}`,rg="fade",sg="show";class Ca extends Pn{static get NAME(){return tg}close(){if(J.trigger(this._element,ng).defaultPrevented)return;this._element.classList.remove(sg);const e=this._element.classList.contains(rg);this._queueCallback(()=>this._destroyElement(),this._element,e)}_destroyElement(){this._element.remove(),J.trigger(this._element,ig),this.dispose()}static jQueryInterface(t){return this.each(function(){const e=Ca.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}wa(Ca,"close");En(Ca);const og="button",ag="bs.button",lg=`.${ag}`,cg=".data-api",ug="active",Sh='[data-bs-toggle="button"]',hg=`click${lg}${cg}`;class Ra extends Pn{static get NAME(){return og}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle(ug))}static jQueryInterface(t){return this.each(function(){const e=Ra.getOrCreateInstance(this);t==="toggle"&&e[t]()})}}J.on(document,hg,Sh,i=>{i.preventDefault();const t=i.target.closest(Sh);Ra.getOrCreateInstance(t).toggle()});En(Ra);const fg="swipe",ps=".bs.swipe",dg=`touchstart${ps}`,pg=`touchmove${ps}`,mg=`touchend${ps}`,_g=`pointerdown${ps}`,gg=`pointerup${ps}`,vg="touch",xg="pen",Eg="pointer-event",Mg=40,Sg={endCallback:null,leftCallback:null,rightCallback:null},yg={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class la extends Zs{constructor(t,e){super(),this._element=t,!(!t||!la.isSupported())&&(this._config=this._getConfig(e),this._deltaX=0,this._supportPointerEvents=!!window.PointerEvent,this._initEvents())}static get Default(){return Sg}static get DefaultType(){return yg}static get NAME(){return fg}dispose(){J.off(this._element,ps)}_start(t){if(!this._supportPointerEvents){this._deltaX=t.touches[0].clientX;return}this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX)}_end(t){this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX-this._deltaX),this._handleSwipe(),Be(this._config.endCallback)}_move(t){this._deltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this._deltaX}_handleSwipe(){const t=Math.abs(this._deltaX);if(t<=Mg)return;const e=t/this._deltaX;this._deltaX=0,e&&Be(e>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(J.on(this._element,_g,t=>this._start(t)),J.on(this._element,gg,t=>this._end(t)),this._element.classList.add(Eg)):(J.on(this._element,dg,t=>this._start(t)),J.on(this._element,pg,t=>this._move(t)),J.on(this._element,mg,t=>this._end(t)))}_eventIsPointerPenTouch(t){return this._supportPointerEvents&&(t.pointerType===xg||t.pointerType===vg)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const Tg="carousel",bg="bs.carousel",Li=`.${bg}`,ep=".data-api",Ag="ArrowLeft",wg="ArrowRight",Cg=500,Es="next",vr="prev",Ur="left",Yo="right",Rg=`slide${Li}`,Ja=`slid${Li}`,Pg=`keydown${Li}`,Dg=`mouseenter${Li}`,Lg=`mouseleave${Li}`,Ig=`dragstart${Li}`,Ng=`load${Li}${ep}`,Og=`click${Li}${ep}`,np="carousel",uo="active",Ug="slide",Fg="carousel-item-end",Bg="carousel-item-start",zg="carousel-item-next",kg="carousel-item-prev",ip=".active",rp=".carousel-item",Vg=ip+rp,Hg=".carousel-item img",Gg=".carousel-indicators",Wg="[data-bs-slide], [data-bs-slide-to]",Xg='[data-bs-ride="carousel"]',$g={[Ag]:Yo,[wg]:Ur},Yg={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},qg={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class Js extends Pn{constructor(t,e){super(t,e),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=Mt.findOne(Gg,this._element),this._addEventListeners(),this._config.ride===np&&this.cycle()}static get Default(){return Yg}static get DefaultType(){return qg}static get NAME(){return Tg}next(){this._slide(Es)}nextWhenVisible(){!document.hidden&&ds(this._element)&&this.next()}prev(){this._slide(vr)}pause(){this._isSliding&&Wd(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval(()=>this.nextWhenVisible(),this._config.interval)}_maybeEnableCycle(){if(this._config.ride){if(this._isSliding){J.one(this._element,Ja,()=>this.cycle());return}this.cycle()}}to(t){const e=this._getItems();if(t>e.length-1||t<0)return;if(this._isSliding){J.one(this._element,Ja,()=>this.to(t));return}const n=this._getItemIndex(this._getActive());if(n===t)return;const r=t>n?Es:vr;this._slide(r,e[t])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(t){return t.defaultInterval=t.interval,t}_addEventListeners(){this._config.keyboard&&J.on(this._element,Pg,t=>this._keydown(t)),this._config.pause==="hover"&&(J.on(this._element,Dg,()=>this.pause()),J.on(this._element,Lg,()=>this._maybeEnableCycle())),this._config.touch&&la.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const n of Mt.find(Hg,this._element))J.on(n,Ig,r=>r.preventDefault());const e={leftCallback:()=>this._slide(this._directionToOrder(Ur)),rightCallback:()=>this._slide(this._directionToOrder(Yo)),endCallback:()=>{this._config.pause==="hover"&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>this._maybeEnableCycle(),Cg+this._config.interval))}};this._swipeHelper=new la(this._element,e)}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=$g[t.key];e&&(t.preventDefault(),this._slide(this._directionToOrder(e)))}_getItemIndex(t){return this._getItems().indexOf(t)}_setActiveIndicatorElement(t){if(!this._indicatorsElement)return;const e=Mt.findOne(ip,this._indicatorsElement);e.classList.remove(uo),e.removeAttribute("aria-current");const n=Mt.findOne(`[data-bs-slide-to="${t}"]`,this._indicatorsElement);n&&(n.classList.add(uo),n.setAttribute("aria-current","true"))}_updateInterval(){const t=this._activeElement||this._getActive();if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);this._config.interval=e||this._config.defaultInterval}_slide(t,e=null){if(this._isSliding)return;const n=this._getActive(),r=t===Es,s=e||Eu(this._getItems(),n,r,this._config.wrap);if(s===n)return;const o=this._getItemIndex(s),a=p=>J.trigger(this._element,p,{relatedTarget:s,direction:this._orderToDirection(t),from:this._getItemIndex(n),to:o});if(a(Rg).defaultPrevented||!n||!s)return;const c=!!this._interval;this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(o),this._activeElement=s;const u=r?Bg:Fg,h=r?zg:kg;s.classList.add(h),js(s),n.classList.add(u),s.classList.add(u);const f=()=>{s.classList.remove(u,h),s.classList.add(uo),n.classList.remove(uo,h,u),this._isSliding=!1,a(Ja)};this._queueCallback(f,n,this._isAnimated()),c&&this.cycle()}_isAnimated(){return this._element.classList.contains(Ug)}_getActive(){return Mt.findOne(Vg,this._element)}_getItems(){return Mt.find(rp,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(t){return vn()?t===Ur?vr:Es:t===Ur?Es:vr}_orderToDirection(t){return vn()?t===vr?Ur:Yo:t===vr?Yo:Ur}static jQueryInterface(t){return this.each(function(){const e=Js.getOrCreateInstance(this,t);if(typeof t=="number"){e.to(t);return}if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}J.on(document,Og,Wg,function(i){const t=Mt.getElementFromSelector(this);if(!t||!t.classList.contains(np))return;i.preventDefault();const e=Js.getOrCreateInstance(t),n=this.getAttribute("data-bs-slide-to");if(n){e.to(n),e._maybeEnableCycle();return}if(ti.getDataAttribute(this,"slide")==="next"){e.next(),e._maybeEnableCycle();return}e.prev(),e._maybeEnableCycle()});J.on(window,Ng,()=>{const i=Mt.find(Xg);for(const t of i)Js.getOrCreateInstance(t)});En(Js);const Kg="collapse",jg="bs.collapse",Qs=`.${jg}`,Zg=".data-api",Jg=`show${Qs}`,Qg=`shown${Qs}`,tv=`hide${Qs}`,ev=`hidden${Qs}`,nv=`click${Qs}${Zg}`,Qa="show",Br="collapse",ho="collapsing",iv="collapsed",rv=`:scope .${Br} .${Br}`,sv="collapse-horizontal",ov="width",av="height",lv=".collapse.show, .collapse.collapsing",nc='[data-bs-toggle="collapse"]',cv={parent:null,toggle:!0},uv={parent:"(null|element)",toggle:"boolean"};class zs extends Pn{constructor(t,e){super(t,e),this._isTransitioning=!1,this._triggerArray=[];const n=Mt.find(nc);for(const r of n){const s=Mt.getSelectorFromElement(r),o=Mt.find(s).filter(a=>a===this._element);s!==null&&o.length&&this._triggerArray.push(r)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return cv}static get DefaultType(){return uv}static get NAME(){return Kg}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t=[];if(this._config.parent&&(t=this._getFirstLevelChildren(lv).filter(a=>a!==this._element).map(a=>zs.getOrCreateInstance(a,{toggle:!1}))),t.length&&t[0]._isTransitioning||J.trigger(this._element,Jg).defaultPrevented)return;for(const a of t)a.hide();const n=this._getDimension();this._element.classList.remove(Br),this._element.classList.add(ho),this._element.style[n]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const r=()=>{this._isTransitioning=!1,this._element.classList.remove(ho),this._element.classList.add(Br,Qa),this._element.style[n]="",J.trigger(this._element,Qg)},o=`scroll${n[0].toUpperCase()+n.slice(1)}`;this._queueCallback(r,this._element,!0),this._element.style[n]=`${this._element[o]}px`}hide(){if(this._isTransitioning||!this._isShown()||J.trigger(this._element,tv).defaultPrevented)return;const e=this._getDimension();this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,js(this._element),this._element.classList.add(ho),this._element.classList.remove(Br,Qa);for(const r of this._triggerArray){const s=Mt.getElementFromSelector(r);s&&!this._isShown(s)&&this._addAriaAndCollapsedClass([r],!1)}this._isTransitioning=!0;const n=()=>{this._isTransitioning=!1,this._element.classList.remove(ho),this._element.classList.add(Br),J.trigger(this._element,ev)};this._element.style[e]="",this._queueCallback(n,this._element,!0)}_isShown(t=this._element){return t.classList.contains(Qa)}_configAfterMerge(t){return t.toggle=!!t.toggle,t.parent=yi(t.parent),t}_getDimension(){return this._element.classList.contains(sv)?ov:av}_initializeChildren(){if(!this._config.parent)return;const t=this._getFirstLevelChildren(nc);for(const e of t){const n=Mt.getElementFromSelector(e);n&&this._addAriaAndCollapsedClass([e],this._isShown(n))}}_getFirstLevelChildren(t){const e=Mt.find(rv,this._config.parent);return Mt.find(t,this._config.parent).filter(n=>!e.includes(n))}_addAriaAndCollapsedClass(t,e){if(t.length)for(const n of t)n.classList.toggle(iv,!e),n.setAttribute("aria-expanded",e)}static jQueryInterface(t){const e={};return typeof t=="string"&&/show|hide/.test(t)&&(e.toggle=!1),this.each(function(){const n=zs.getOrCreateInstance(this,e);if(typeof t=="string"){if(typeof n[t]>"u")throw new TypeError(`No method named "${t}"`);n[t]()}})}}J.on(document,nv,nc,function(i){(i.target.tagName==="A"||i.delegateTarget&&i.delegateTarget.tagName==="A")&&i.preventDefault();for(const t of Mt.getMultipleElementsFromSelector(this))zs.getOrCreateInstance(t,{toggle:!1}).toggle()});En(zs);const yh="dropdown",hv="bs.dropdown",fr=`.${hv}`,Su=".data-api",fv="Escape",Th="Tab",dv="ArrowUp",bh="ArrowDown",pv=2,mv=`hide${fr}`,_v=`hidden${fr}`,gv=`show${fr}`,vv=`shown${fr}`,sp=`click${fr}${Su}`,op=`keydown${fr}${Su}`,xv=`keyup${fr}${Su}`,Fr="show",Ev="dropup",Mv="dropend",Sv="dropstart",yv="dropup-center",Tv="dropdown-center",ji='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',bv=`${ji}.${Fr}`,qo=".dropdown-menu",Av=".navbar",wv=".navbar-nav",Cv=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",Rv=vn()?"top-end":"top-start",Pv=vn()?"top-start":"top-end",Dv=vn()?"bottom-end":"bottom-start",Lv=vn()?"bottom-start":"bottom-end",Iv=vn()?"left-start":"right-start",Nv=vn()?"right-start":"left-start",Ov="top",Uv="bottom",Fv={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},Bv={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class Un extends Pn{constructor(t,e){super(t,e),this._popper=null,this._parent=this._element.parentNode,this._menu=Mt.next(this._element,qo)[0]||Mt.prev(this._element,qo)[0]||Mt.findOne(qo,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return Fv}static get DefaultType(){return Bv}static get NAME(){return yh}toggle(){return this._isShown()?this.hide():this.show()}show(){if(Ti(this._element)||this._isShown())return;const t={relatedTarget:this._element};if(!J.trigger(this._element,gv,t).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(wv))for(const n of[].concat(...document.body.children))J.on(n,"mouseover",aa);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(Fr),this._element.classList.add(Fr),J.trigger(this._element,vv,t)}}hide(){if(Ti(this._element)||!this._isShown())return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(t){if(!J.trigger(this._element,mv,t).defaultPrevented){if("ontouchstart"in document.documentElement)for(const n of[].concat(...document.body.children))J.off(n,"mouseover",aa);this._popper&&this._popper.destroy(),this._menu.classList.remove(Fr),this._element.classList.remove(Fr),this._element.setAttribute("aria-expanded","false"),ti.removeDataAttribute(this._menu,"popper"),J.trigger(this._element,_v,t)}}_getConfig(t){if(t=super._getConfig(t),typeof t.reference=="object"&&!Qn(t.reference)&&typeof t.reference.getBoundingClientRect!="function")throw new TypeError(`${yh.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return t}_createPopper(){if(typeof Hd>"u")throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");let t=this._element;this._config.reference==="parent"?t=this._parent:Qn(this._config.reference)?t=yi(this._config.reference):typeof this._config.reference=="object"&&(t=this._config.reference);const e=this._getPopperConfig();this._popper=xu(t,this._menu,e)}_isShown(){return this._menu.classList.contains(Fr)}_getPlacement(){const t=this._parent;if(t.classList.contains(Mv))return Iv;if(t.classList.contains(Sv))return Nv;if(t.classList.contains(yv))return Ov;if(t.classList.contains(Tv))return Uv;const e=getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()==="end";return t.classList.contains(Ev)?e?Pv:Rv:e?Lv:Dv}_detectNavbar(){return this._element.closest(Av)!==null}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||this._config.display==="static")&&(ti.setDataAttribute(this._menu,"popper","static"),t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,...Be(this._config.popperConfig,[void 0,t])}}_selectMenuItem({key:t,target:e}){const n=Mt.find(Cv,this._menu).filter(r=>ds(r));n.length&&Eu(n,e,t===bh,!n.includes(e)).focus()}static jQueryInterface(t){return this.each(function(){const e=Un.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}static clearMenus(t){if(t.button===pv||t.type==="keyup"&&t.key!==Th)return;const e=Mt.find(bv);for(const n of e){const r=Un.getInstance(n);if(!r||r._config.autoClose===!1)continue;const s=t.composedPath(),o=s.includes(r._menu);if(s.includes(r._element)||r._config.autoClose==="inside"&&!o||r._config.autoClose==="outside"&&o||r._menu.contains(t.target)&&(t.type==="keyup"&&t.key===Th||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;const a={relatedTarget:r._element};t.type==="click"&&(a.clickEvent=t),r._completeHide(a)}}static dataApiKeydownHandler(t){const e=/input|textarea/i.test(t.target.tagName),n=t.key===fv,r=[dv,bh].includes(t.key);if(!r&&!n||e&&!n)return;t.preventDefault();const s=this.matches(ji)?this:Mt.prev(this,ji)[0]||Mt.next(this,ji)[0]||Mt.findOne(ji,t.delegateTarget.parentNode),o=Un.getOrCreateInstance(s);if(r){t.stopPropagation(),o.show(),o._selectMenuItem(t);return}o._isShown()&&(t.stopPropagation(),o.hide(),s.focus())}}J.on(document,op,ji,Un.dataApiKeydownHandler);J.on(document,op,qo,Un.dataApiKeydownHandler);J.on(document,sp,Un.clearMenus);J.on(document,xv,Un.clearMenus);J.on(document,sp,ji,function(i){i.preventDefault(),Un.getOrCreateInstance(this).toggle()});En(Un);const ap="backdrop",zv="fade",Ah="show",wh=`mousedown.bs.${ap}`,kv={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},Vv={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class lp extends Zs{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null}static get Default(){return kv}static get DefaultType(){return Vv}static get NAME(){return ap}show(t){if(!this._config.isVisible){Be(t);return}this._append();const e=this._getElement();this._config.isAnimated&&js(e),e.classList.add(Ah),this._emulateAnimation(()=>{Be(t)})}hide(t){if(!this._config.isVisible){Be(t);return}this._getElement().classList.remove(Ah),this._emulateAnimation(()=>{this.dispose(),Be(t)})}dispose(){this._isAppended&&(J.off(this._element,wh),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add(zv),this._element=t}return this._element}_configAfterMerge(t){return t.rootElement=yi(t.rootElement),t}_append(){if(this._isAppended)return;const t=this._getElement();this._config.rootElement.append(t),J.on(t,wh,()=>{Be(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(t){Yd(t,this._getElement(),this._config.isAnimated)}}const Hv="focustrap",Gv="bs.focustrap",ca=`.${Gv}`,Wv=`focusin${ca}`,Xv=`keydown.tab${ca}`,$v="Tab",Yv="forward",Ch="backward",qv={autofocus:!0,trapElement:null},Kv={autofocus:"boolean",trapElement:"element"};class cp extends Zs{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return qv}static get DefaultType(){return Kv}static get NAME(){return Hv}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),J.off(document,ca),J.on(document,Wv,t=>this._handleFocusin(t)),J.on(document,Xv,t=>this._handleKeydown(t)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,J.off(document,ca))}_handleFocusin(t){const{trapElement:e}=this._config;if(t.target===document||t.target===e||e.contains(t.target))return;const n=Mt.focusableChildren(e);n.length===0?e.focus():this._lastTabNavDirection===Ch?n[n.length-1].focus():n[0].focus()}_handleKeydown(t){t.key===$v&&(this._lastTabNavDirection=t.shiftKey?Ch:Yv)}}const Rh=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",Ph=".sticky-top",fo="padding-right",Dh="margin-right";class ic{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,fo,e=>e+t),this._setElementAttributes(Rh,fo,e=>e+t),this._setElementAttributes(Ph,Dh,e=>e-t)}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,fo),this._resetElementAttributes(Rh,fo),this._resetElementAttributes(Ph,Dh)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,n){const r=this.getWidth(),s=o=>{if(o!==this._element&&window.innerWidth>o.clientWidth+r)return;this._saveInitialAttribute(o,e);const a=window.getComputedStyle(o).getPropertyValue(e);o.style.setProperty(e,`${n(Number.parseFloat(a))}px`)};this._applyManipulationCallback(t,s)}_saveInitialAttribute(t,e){const n=t.style.getPropertyValue(e);n&&ti.setDataAttribute(t,e,n)}_resetElementAttributes(t,e){const n=r=>{const s=ti.getDataAttribute(r,e);if(s===null){r.style.removeProperty(e);return}ti.removeDataAttribute(r,e),r.style.setProperty(e,s)};this._applyManipulationCallback(t,n)}_applyManipulationCallback(t,e){if(Qn(t)){e(t);return}for(const n of Mt.find(t,this._element))e(n)}}const jv="modal",Zv="bs.modal",xn=`.${Zv}`,Jv=".data-api",Qv="Escape",t0=`hide${xn}`,e0=`hidePrevented${xn}`,up=`hidden${xn}`,hp=`show${xn}`,n0=`shown${xn}`,i0=`resize${xn}`,r0=`click.dismiss${xn}`,s0=`mousedown.dismiss${xn}`,o0=`keydown.dismiss${xn}`,a0=`click${xn}${Jv}`,Lh="modal-open",l0="fade",Ih="show",tl="modal-static",c0=".modal.show",u0=".modal-dialog",h0=".modal-body",f0='[data-bs-toggle="modal"]',d0={backdrop:!0,focus:!0,keyboard:!0},p0={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class Qr extends Pn{constructor(t,e){super(t,e),this._dialog=Mt.findOne(u0,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new ic,this._addEventListeners()}static get Default(){return d0}static get DefaultType(){return p0}static get NAME(){return jv}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||J.trigger(this._element,hp,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(Lh),this._adjustDialog(),this._backdrop.show(()=>this._showElement(t)))}hide(){!this._isShown||this._isTransitioning||J.trigger(this._element,t0).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(Ih),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated()))}dispose(){J.off(window,xn),J.off(this._dialog,xn),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new lp({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new cp({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const e=Mt.findOne(h0,this._dialog);e&&(e.scrollTop=0),js(this._element),this._element.classList.add(Ih);const n=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,J.trigger(this._element,n0,{relatedTarget:t})};this._queueCallback(n,this._dialog,this._isAnimated())}_addEventListeners(){J.on(this._element,o0,t=>{if(t.key===Qv){if(this._config.keyboard){this.hide();return}this._triggerBackdropTransition()}}),J.on(window,i0,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),J.on(this._element,s0,t=>{J.one(this._element,r0,e=>{if(!(this._element!==t.target||this._element!==e.target)){if(this._config.backdrop==="static"){this._triggerBackdropTransition();return}this._config.backdrop&&this.hide()}})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(Lh),this._resetAdjustments(),this._scrollBar.reset(),J.trigger(this._element,up)})}_isAnimated(){return this._element.classList.contains(l0)}_triggerBackdropTransition(){if(J.trigger(this._element,e0).defaultPrevented)return;const e=this._element.scrollHeight>document.documentElement.clientHeight,n=this._element.style.overflowY;n==="hidden"||this._element.classList.contains(tl)||(e||(this._element.style.overflowY="hidden"),this._element.classList.add(tl),this._queueCallback(()=>{this._element.classList.remove(tl),this._queueCallback(()=>{this._element.style.overflowY=n},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),n=e>0;if(n&&!t){const r=vn()?"paddingLeft":"paddingRight";this._element.style[r]=`${e}px`}if(!n&&t){const r=vn()?"paddingRight":"paddingLeft";this._element.style[r]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each(function(){const n=Qr.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof n[t]>"u")throw new TypeError(`No method named "${t}"`);n[t](e)}})}}J.on(document,a0,f0,function(i){const t=Mt.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&i.preventDefault(),J.one(t,hp,r=>{r.defaultPrevented||J.one(t,up,()=>{ds(this)&&this.focus()})});const e=Mt.findOne(c0);e&&Qr.getInstance(e).hide(),Qr.getOrCreateInstance(t).toggle(this)});wa(Qr);En(Qr);const m0="offcanvas",_0="bs.offcanvas",oi=`.${_0}`,fp=".data-api",g0=`load${oi}${fp}`,v0="Escape",Nh="show",Oh="showing",Uh="hiding",x0="offcanvas-backdrop",dp=".offcanvas.show",E0=`show${oi}`,M0=`shown${oi}`,S0=`hide${oi}`,Fh=`hidePrevented${oi}`,pp=`hidden${oi}`,y0=`resize${oi}`,T0=`click${oi}${fp}`,b0=`keydown.dismiss${oi}`,A0='[data-bs-toggle="offcanvas"]',w0={backdrop:!0,keyboard:!0,scroll:!1},C0={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class bi extends Pn{constructor(t,e){super(t,e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return w0}static get DefaultType(){return C0}static get NAME(){return m0}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){if(this._isShown||J.trigger(this._element,E0,{relatedTarget:t}).defaultPrevented)return;this._isShown=!0,this._backdrop.show(),this._config.scroll||new ic().hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(Oh);const n=()=>{(!this._config.scroll||this._config.backdrop)&&this._focustrap.activate(),this._element.classList.add(Nh),this._element.classList.remove(Oh),J.trigger(this._element,M0,{relatedTarget:t})};this._queueCallback(n,this._element,!0)}hide(){if(!this._isShown||J.trigger(this._element,S0).defaultPrevented)return;this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(Uh),this._backdrop.hide();const e=()=>{this._element.classList.remove(Nh,Uh),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||new ic().reset(),J.trigger(this._element,pp)};this._queueCallback(e,this._element,!0)}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const t=()=>{if(this._config.backdrop==="static"){J.trigger(this._element,Fh);return}this.hide()},e=!!this._config.backdrop;return new lp({className:x0,isVisible:e,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:e?t:null})}_initializeFocusTrap(){return new cp({trapElement:this._element})}_addEventListeners(){J.on(this._element,b0,t=>{if(t.key===v0){if(this._config.keyboard){this.hide();return}J.trigger(this._element,Fh)}})}static jQueryInterface(t){return this.each(function(){const e=bi.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}J.on(document,T0,A0,function(i){const t=Mt.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),Ti(this))return;J.one(t,pp,()=>{ds(this)&&this.focus()});const e=Mt.findOne(dp);e&&e!==t&&bi.getInstance(e).hide(),bi.getOrCreateInstance(t).toggle(this)});J.on(window,g0,()=>{for(const i of Mt.find(dp))bi.getOrCreateInstance(i).show()});J.on(window,y0,()=>{for(const i of Mt.find("[aria-modal][class*=show][class*=offcanvas-]"))getComputedStyle(i).position!=="fixed"&&bi.getOrCreateInstance(i).hide()});wa(bi);En(bi);const R0=/^aria-[\w-]*$/i,mp={"*":["class","dir","id","lang","role",R0],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},P0=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),D0=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,L0=(i,t)=>{const e=i.nodeName.toLowerCase();return t.includes(e)?P0.has(e)?!!D0.test(i.nodeValue):!0:t.filter(n=>n instanceof RegExp).some(n=>n.test(e))};function I0(i,t,e){if(!i.length)return i;if(e&&typeof e=="function")return e(i);const r=new window.DOMParser().parseFromString(i,"text/html"),s=[].concat(...r.body.querySelectorAll("*"));for(const o of s){const a=o.nodeName.toLowerCase();if(!Object.keys(t).includes(a)){o.remove();continue}const l=[].concat(...o.attributes),c=[].concat(t["*"]||[],t[a]||[]);for(const u of l)L0(u,c)||o.removeAttribute(u.nodeName)}return r.body.innerHTML}const N0="TemplateFactory",O0={allowList:mp,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},U0={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},F0={entry:"(string|element|function|null)",selector:"(string|element)"};class B0 extends Zs{constructor(t){super(),this._config=this._getConfig(t)}static get Default(){return O0}static get DefaultType(){return U0}static get NAME(){return N0}getContent(){return Object.values(this._config.content).map(t=>this._resolvePossibleFunction(t)).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(t){return this._checkContent(t),this._config.content={...this._config.content,...t},this}toHtml(){const t=document.createElement("div");t.innerHTML=this._maybeSanitize(this._config.template);for(const[r,s]of Object.entries(this._config.content))this._setContent(t,s,r);const e=t.children[0],n=this._resolvePossibleFunction(this._config.extraClass);return n&&e.classList.add(...n.split(" ")),e}_typeCheckConfig(t){super._typeCheckConfig(t),this._checkContent(t.content)}_checkContent(t){for(const[e,n]of Object.entries(t))super._typeCheckConfig({selector:e,entry:n},F0)}_setContent(t,e,n){const r=Mt.findOne(n,t);if(r){if(e=this._resolvePossibleFunction(e),!e){r.remove();return}if(Qn(e)){this._putElementInTemplate(yi(e),r);return}if(this._config.html){r.innerHTML=this._maybeSanitize(e);return}r.textContent=e}}_maybeSanitize(t){return this._config.sanitize?I0(t,this._config.allowList,this._config.sanitizeFn):t}_resolvePossibleFunction(t){return Be(t,[void 0,this])}_putElementInTemplate(t,e){if(this._config.html){e.innerHTML="",e.append(t);return}e.textContent=t.textContent}}const z0="tooltip",k0=new Set(["sanitize","allowList","sanitizeFn"]),el="fade",V0="modal",po="show",H0=".tooltip-inner",Bh=`.${V0}`,zh="hide.bs.modal",Ms="hover",nl="focus",il="click",G0="manual",W0="hide",X0="hidden",$0="show",Y0="shown",q0="inserted",K0="click",j0="focusin",Z0="focusout",J0="mouseenter",Q0="mouseleave",tx={AUTO:"auto",TOP:"top",RIGHT:vn()?"left":"right",BOTTOM:"bottom",LEFT:vn()?"right":"left"},ex={allowList:mp,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},nx={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class ms extends Pn{constructor(t,e){if(typeof Hd>"u")throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");super(t,e),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return ex}static get DefaultType(){return nx}static get NAME(){return z0}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){if(this._isEnabled){if(this._isShown()){this._leave();return}this._enter()}}dispose(){clearTimeout(this._timeout),J.off(this._element.closest(Bh),zh,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if(this._element.style.display==="none")throw new Error("Please use show on visible elements");if(!(this._isWithContent()&&this._isEnabled))return;const t=J.trigger(this._element,this.constructor.eventName($0)),n=(Xd(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(t.defaultPrevented||!n)return;this._disposePopper();const r=this._getTipElement();this._element.setAttribute("aria-describedby",r.getAttribute("id"));const{container:s}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(s.append(r),J.trigger(this._element,this.constructor.eventName(q0))),this._popper=this._createPopper(r),r.classList.add(po),"ontouchstart"in document.documentElement)for(const a of[].concat(...document.body.children))J.on(a,"mouseover",aa);const o=()=>{J.trigger(this._element,this.constructor.eventName(Y0)),this._isHovered===!1&&this._leave(),this._isHovered=!1};this._queueCallback(o,this.tip,this._isAnimated())}hide(){if(!this._isShown()||J.trigger(this._element,this.constructor.eventName(W0)).defaultPrevented)return;if(this._getTipElement().classList.remove(po),"ontouchstart"in document.documentElement)for(const r of[].concat(...document.body.children))J.off(r,"mouseover",aa);this._activeTrigger[il]=!1,this._activeTrigger[nl]=!1,this._activeTrigger[Ms]=!1,this._isHovered=null;const n=()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),J.trigger(this._element,this.constructor.eventName(X0)))};this._queueCallback(n,this.tip,this._isAnimated())}update(){this._popper&&this._popper.update()}_isWithContent(){return!!this._getTitle()}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(t){const e=this._getTemplateFactory(t).toHtml();if(!e)return null;e.classList.remove(el,po),e.classList.add(`bs-${this.constructor.NAME}-auto`);const n=G_(this.constructor.NAME).toString();return e.setAttribute("id",n),this._isAnimated()&&e.classList.add(el),e}setContent(t){this._newContent=t,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(t){return this._templateFactory?this._templateFactory.changeContent(t):this._templateFactory=new B0({...this._config,content:t,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{[H0]:this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(t){return this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(el)}_isShown(){return this.tip&&this.tip.classList.contains(po)}_createPopper(t){const e=Be(this._config.placement,[this,t,this._element]),n=tx[e.toUpperCase()];return xu(this._element,t,this._getPopperConfig(n))}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_resolvePossibleFunction(t){return Be(t,[this._element,this._element])}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:n=>{this._getTipElement().setAttribute("data-popper-placement",n.state.placement)}}]};return{...e,...Be(this._config.popperConfig,[void 0,e])}}_setListeners(){const t=this._config.trigger.split(" ");for(const e of t)if(e==="click")J.on(this._element,this.constructor.eventName(K0),this._config.selector,n=>{const r=this._initializeOnDelegatedTarget(n);r._activeTrigger[il]=!(r._isShown()&&r._activeTrigger[il]),r.toggle()});else if(e!==G0){const n=e===Ms?this.constructor.eventName(J0):this.constructor.eventName(j0),r=e===Ms?this.constructor.eventName(Q0):this.constructor.eventName(Z0);J.on(this._element,n,this._config.selector,s=>{const o=this._initializeOnDelegatedTarget(s);o._activeTrigger[s.type==="focusin"?nl:Ms]=!0,o._enter()}),J.on(this._element,r,this._config.selector,s=>{const o=this._initializeOnDelegatedTarget(s);o._activeTrigger[s.type==="focusout"?nl:Ms]=o._element.contains(s.relatedTarget),o._leave()})}this._hideModalHandler=()=>{this._element&&this.hide()},J.on(this._element.closest(Bh),zh,this._hideModalHandler)}_fixTitle(){const t=this._element.getAttribute("title");t&&(!this._element.getAttribute("aria-label")&&!this._element.textContent.trim()&&this._element.setAttribute("aria-label",t),this._element.setAttribute("data-bs-original-title",t),this._element.removeAttribute("title"))}_enter(){if(this._isShown()||this._isHovered){this._isHovered=!0;return}this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show)}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(t,e){clearTimeout(this._timeout),this._timeout=setTimeout(t,e)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(t){const e=ti.getDataAttributes(this._element);for(const n of Object.keys(e))k0.has(n)&&delete e[n];return t={...e,...typeof t=="object"&&t?t:{}},t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t.container=t.container===!1?document.body:yi(t.container),typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),typeof t.title=="number"&&(t.title=t.title.toString()),typeof t.content=="number"&&(t.content=t.content.toString()),t}_getDelegateConfig(){const t={};for(const[e,n]of Object.entries(this._config))this.constructor.Default[e]!==n&&(t[e]=n);return t.selector=!1,t.trigger="manual",t}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(t){return this.each(function(){const e=ms.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}En(ms);const ix="popover",rx=".popover-header",sx=".popover-body",ox={...ms.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},ax={...ms.DefaultType,content:"(null|string|element|function)"};class yu extends ms{static get Default(){return ox}static get DefaultType(){return ax}static get NAME(){return ix}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[rx]:this._getTitle(),[sx]:this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(t){return this.each(function(){const e=yu.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}En(yu);const lx="scrollspy",cx="bs.scrollspy",Tu=`.${cx}`,ux=".data-api",hx=`activate${Tu}`,kh=`click${Tu}`,fx=`load${Tu}${ux}`,dx="dropdown-item",xr="active",px='[data-bs-spy="scroll"]',rl="[href]",mx=".nav, .list-group",Vh=".nav-link",_x=".nav-item",gx=".list-group-item",vx=`${Vh}, ${_x} > ${Vh}, ${gx}`,xx=".dropdown",Ex=".dropdown-toggle",Mx={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},Sx={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class Pa extends Pn{constructor(t,e){super(t,e),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement=getComputedStyle(this._element).overflowY==="visible"?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return Mx}static get DefaultType(){return Sx}static get NAME(){return lx}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const t of this._observableSections.values())this._observer.observe(t)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(t){return t.target=yi(t.target)||document.body,t.rootMargin=t.offset?`${t.offset}px 0px -30%`:t.rootMargin,typeof t.threshold=="string"&&(t.threshold=t.threshold.split(",").map(e=>Number.parseFloat(e))),t}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(J.off(this._config.target,kh),J.on(this._config.target,kh,rl,t=>{const e=this._observableSections.get(t.target.hash);if(e){t.preventDefault();const n=this._rootElement||window,r=e.offsetTop-this._element.offsetTop;if(n.scrollTo){n.scrollTo({top:r,behavior:"smooth"});return}n.scrollTop=r}}))}_getNewObserver(){const t={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver(e=>this._observerCallback(e),t)}_observerCallback(t){const e=o=>this._targetLinks.get(`#${o.target.id}`),n=o=>{this._previousScrollData.visibleEntryTop=o.target.offsetTop,this._process(e(o))},r=(this._rootElement||document.documentElement).scrollTop,s=r>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=r;for(const o of t){if(!o.isIntersecting){this._activeTarget=null,this._clearActiveClass(e(o));continue}const a=o.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(s&&a){if(n(o),!r)return;continue}!s&&!a&&n(o)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const t=Mt.find(rl,this._config.target);for(const e of t){if(!e.hash||Ti(e))continue;const n=Mt.findOne(decodeURI(e.hash),this._element);ds(n)&&(this._targetLinks.set(decodeURI(e.hash),e),this._observableSections.set(e.hash,n))}}_process(t){this._activeTarget!==t&&(this._clearActiveClass(this._config.target),this._activeTarget=t,t.classList.add(xr),this._activateParents(t),J.trigger(this._element,hx,{relatedTarget:t}))}_activateParents(t){if(t.classList.contains(dx)){Mt.findOne(Ex,t.closest(xx)).classList.add(xr);return}for(const e of Mt.parents(t,mx))for(const n of Mt.prev(e,vx))n.classList.add(xr)}_clearActiveClass(t){t.classList.remove(xr);const e=Mt.find(`${rl}.${xr}`,t);for(const n of e)n.classList.remove(xr)}static jQueryInterface(t){return this.each(function(){const e=Pa.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}J.on(window,fx,()=>{for(const i of Mt.find(px))Pa.getOrCreateInstance(i)});En(Pa);const yx="tab",Tx="bs.tab",dr=`.${Tx}`,bx=`hide${dr}`,Ax=`hidden${dr}`,wx=`show${dr}`,Cx=`shown${dr}`,Rx=`click${dr}`,Px=`keydown${dr}`,Dx=`load${dr}`,Lx="ArrowLeft",Hh="ArrowRight",Ix="ArrowUp",Gh="ArrowDown",sl="Home",Wh="End",Zi="active",Xh="fade",ol="show",Nx="dropdown",_p=".dropdown-toggle",Ox=".dropdown-menu",al=`:not(${_p})`,Ux='.list-group, .nav, [role="tablist"]',Fx=".nav-item, .list-group-item",Bx=`.nav-link${al}, .list-group-item${al}, [role="tab"]${al}`,gp='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',ll=`${Bx}, ${gp}`,zx=`.${Zi}[data-bs-toggle="tab"], .${Zi}[data-bs-toggle="pill"], .${Zi}[data-bs-toggle="list"]`;class ts extends Pn{constructor(t){super(t),this._parent=this._element.closest(Ux),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),J.on(this._element,Px,e=>this._keydown(e)))}static get NAME(){return yx}show(){const t=this._element;if(this._elemIsActive(t))return;const e=this._getActiveElem(),n=e?J.trigger(e,bx,{relatedTarget:t}):null;J.trigger(t,wx,{relatedTarget:e}).defaultPrevented||n&&n.defaultPrevented||(this._deactivate(e,t),this._activate(t,e))}_activate(t,e){if(!t)return;t.classList.add(Zi),this._activate(Mt.getElementFromSelector(t));const n=()=>{if(t.getAttribute("role")!=="tab"){t.classList.add(ol);return}t.removeAttribute("tabindex"),t.setAttribute("aria-selected",!0),this._toggleDropDown(t,!0),J.trigger(t,Cx,{relatedTarget:e})};this._queueCallback(n,t,t.classList.contains(Xh))}_deactivate(t,e){if(!t)return;t.classList.remove(Zi),t.blur(),this._deactivate(Mt.getElementFromSelector(t));const n=()=>{if(t.getAttribute("role")!=="tab"){t.classList.remove(ol);return}t.setAttribute("aria-selected",!1),t.setAttribute("tabindex","-1"),this._toggleDropDown(t,!1),J.trigger(t,Ax,{relatedTarget:e})};this._queueCallback(n,t,t.classList.contains(Xh))}_keydown(t){if(![Lx,Hh,Ix,Gh,sl,Wh].includes(t.key))return;t.stopPropagation(),t.preventDefault();const e=this._getChildren().filter(r=>!Ti(r));let n;if([sl,Wh].includes(t.key))n=e[t.key===sl?0:e.length-1];else{const r=[Hh,Gh].includes(t.key);n=Eu(e,t.target,r,!0)}n&&(n.focus({preventScroll:!0}),ts.getOrCreateInstance(n).show())}_getChildren(){return Mt.find(ll,this._parent)}_getActiveElem(){return this._getChildren().find(t=>this._elemIsActive(t))||null}_setInitialAttributes(t,e){this._setAttributeIfNotExists(t,"role","tablist");for(const n of e)this._setInitialAttributesOnChild(n)}_setInitialAttributesOnChild(t){t=this._getInnerElement(t);const e=this._elemIsActive(t),n=this._getOuterElement(t);t.setAttribute("aria-selected",e),n!==t&&this._setAttributeIfNotExists(n,"role","presentation"),e||t.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(t,"role","tab"),this._setInitialAttributesOnTargetPanel(t)}_setInitialAttributesOnTargetPanel(t){const e=Mt.getElementFromSelector(t);e&&(this._setAttributeIfNotExists(e,"role","tabpanel"),t.id&&this._setAttributeIfNotExists(e,"aria-labelledby",`${t.id}`))}_toggleDropDown(t,e){const n=this._getOuterElement(t);if(!n.classList.contains(Nx))return;const r=(s,o)=>{const a=Mt.findOne(s,n);a&&a.classList.toggle(o,e)};r(_p,Zi),r(Ox,ol),n.setAttribute("aria-expanded",e)}_setAttributeIfNotExists(t,e,n){t.hasAttribute(e)||t.setAttribute(e,n)}_elemIsActive(t){return t.classList.contains(Zi)}_getInnerElement(t){return t.matches(ll)?t:Mt.findOne(ll,t)}_getOuterElement(t){return t.closest(Fx)||t}static jQueryInterface(t){return this.each(function(){const e=ts.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}J.on(document,Rx,gp,function(i){["A","AREA"].includes(this.tagName)&&i.preventDefault(),!Ti(this)&&ts.getOrCreateInstance(this).show()});J.on(window,Dx,()=>{for(const i of Mt.find(zx))ts.getOrCreateInstance(i)});En(ts);const kx="toast",Vx="bs.toast",Ii=`.${Vx}`,Hx=`mouseover${Ii}`,Gx=`mouseout${Ii}`,Wx=`focusin${Ii}`,Xx=`focusout${Ii}`,$x=`hide${Ii}`,Yx=`hidden${Ii}`,qx=`show${Ii}`,Kx=`shown${Ii}`,jx="fade",$h="hide",mo="show",_o="showing",Zx={animation:"boolean",autohide:"boolean",delay:"number"},Jx={animation:!0,autohide:!0,delay:5e3};class Da extends Pn{constructor(t,e){super(t,e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return Jx}static get DefaultType(){return Zx}static get NAME(){return kx}show(){if(J.trigger(this._element,qx).defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add(jx);const e=()=>{this._element.classList.remove(_o),J.trigger(this._element,Kx),this._maybeScheduleHide()};this._element.classList.remove($h),js(this._element),this._element.classList.add(mo,_o),this._queueCallback(e,this._element,this._config.animation)}hide(){if(!this.isShown()||J.trigger(this._element,$x).defaultPrevented)return;const e=()=>{this._element.classList.add($h),this._element.classList.remove(_o,mo),J.trigger(this._element,Yx)};this._element.classList.add(_o),this._queueCallback(e,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(mo),super.dispose()}isShown(){return this._element.classList.contains(mo)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":{this._hasMouseInteraction=e;break}case"focusin":case"focusout":{this._hasKeyboardInteraction=e;break}}if(e){this._clearTimeout();return}const n=t.relatedTarget;this._element===n||this._element.contains(n)||this._maybeScheduleHide()}_setListeners(){J.on(this._element,Hx,t=>this._onInteraction(t,!0)),J.on(this._element,Gx,t=>this._onInteraction(t,!1)),J.on(this._element,Wx,t=>this._onInteraction(t,!0)),J.on(this._element,Xx,t=>this._onInteraction(t,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each(function(){const e=Da.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}wa(Da);En(Da);function qn(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function vp(i,t){i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.__proto__=t}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var rn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ks={duration:.5,overwrite:!1,delay:0},bu,be,ae,pn=1e8,ne=1/pn,rc=Math.PI*2,Qx=rc/4,tE=0,xp=Math.sqrt,eE=Math.cos,nE=Math.sin,Se=function(t){return typeof t=="string"},fe=function(t){return typeof t=="function"},ni=function(t){return typeof t=="number"},Au=function(t){return typeof t>"u"},zn=function(t){return typeof t=="object"},ke=function(t){return t!==!1},wu=function(){return typeof window<"u"},go=function(t){return fe(t)||Se(t)},Ep=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Re=Array.isArray,iE=/random\([^)]+\)/g,rE=/,\s*/g,Yh=/(?:-?\.?\d|\.)+/gi,Mp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,zr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,cl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Sp=/[+-]=-?[.\d]+/,sE=/[^,'"\[\]\s]+/gi,oE=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ce,Dn,sc,Cu,ln={},ua={},yp,Tp=function(t){return(ua=es(t,ln))&&$e},Ru=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Vs=function(t,e){return!e&&console.warn(t)},bp=function(t,e){return t&&(ln[t]=e)&&ua&&(ua[t]=e)||ln},Hs=function(){return 0},aE={suppressEvents:!0,isStart:!0,kill:!1},Ko={suppressEvents:!0,kill:!1},lE={suppressEvents:!0},Pu={},xi=[],oc={},Ap,Ze={},ul={},qh=30,jo=[],Du="",Lu=function(t){var e=t[0],n,r;if(zn(e)||fe(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(r=jo.length;r--&&!jo[r].targetTest(e););n=jo[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new qp(t[r],n)))||t.splice(r,1);return t},nr=function(t){return t._gsap||Lu(mn(t))[0]._gsap},wp=function(t,e,n){return(n=t[e])&&fe(n)?t[e]():Au(n)&&t.getAttribute&&t.getAttribute(e)||n},Ve=function(t,e){return(t=t.split(",")).forEach(e)||t},pe=function(t){return Math.round(t*1e5)/1e5||0},le=function(t){return Math.round(t*1e7)/1e7||0},Hr=function(t,e){var n=e.charAt(0),r=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+r:n==="-"?t-r:n==="*"?t*r:t/r},cE=function(t,e){for(var n=e.length,r=0;t.indexOf(e[r])<0&&++r<n;);return r<n},ha=function(){var t=xi.length,e=xi.slice(0),n,r;for(oc={},xi.length=0,n=0;n<t;n++)r=e[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Iu=function(t){return!!(t._initted||t._startAt||t.add)},Cp=function(t,e,n,r){xi.length&&!be&&ha(),t.render(e,n,r||!!(be&&e<0&&Iu(t))),xi.length&&!be&&ha()},Rp=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(sE).length<2?e:Se(t)?t.trim():t},Pp=function(t){return t},cn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},uE=function(t){return function(e,n){for(var r in n)r in e||r==="duration"&&t||r==="ease"||(e[r]=n[r])}},es=function(t,e){for(var n in e)t[n]=e[n];return t},Kh=function i(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=zn(e[n])?i(t[n]||(t[n]={}),e[n]):e[n]);return t},fa=function(t,e){var n={},r;for(r in t)r in e||(n[r]=t[r]);return n},Us=function(t){var e=t.parent||ce,n=t.keyframes?uE(Re(t.keyframes)):cn;if(ke(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},hE=function(t,e){for(var n=t.length,r=n===e.length;r&&n--&&t[n]===e[n];);return n<0},Dp=function(t,e,n,r,s){n===void 0&&(n="_first"),r===void 0&&(r="_last");var o=t[r],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[r]=e,e._prev=o,e.parent=e._dp=t,e},La=function(t,e,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[r]===e&&(t[r]=s),e._next=e._prev=e.parent=null},Ai=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},ir=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},fE=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},ac=function(t,e,n,r){return t._startAt&&(be?t._startAt.revert(Ko):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,r))},dE=function i(t){return!t||t._ts&&i(t.parent)},jh=function(t){return t._repeat?ns(t._tTime,t=t.duration()+t._rDelay)*t:0},ns=function(t,e){var n=Math.floor(t=le(t/e));return t&&n===t?n-1:n},da=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Ia=function(t){return t._end=le(t._start+(t._tDur/Math.abs(t._ts||t._rts||ne)||0))},Na=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=le(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Ia(t),n._dirty||ir(n,t)),t},Lp=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=da(t.rawTime(),e),(!e._dur||to(0,e.totalDuration(),n)-e._tTime>ne)&&e.render(n,!0)),ir(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-ne}},In=function(t,e,n,r){return e.parent&&Ai(e),e._start=le((ni(n)?n:n||t!==ce?fn(t,n,e):t._time)+e._delay),e._end=le(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Dp(t,e,"_first","_last",t._sort?"_start":0),lc(e)||(t._recent=e),r||Lp(t,e),t._ts<0&&Na(t,t._tTime),t},Ip=function(t,e){return(ln.ScrollTrigger||Ru("scrollTrigger",e))&&ln.ScrollTrigger.create(e,t)},Np=function(t,e,n,r,s){if(Ou(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!be&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Ap!==Qe.frame)return xi.push(t),t._lazy=[s,r],1},pE=function i(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||i(e))},lc=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},mE=function(t,e,n,r){var s=t.ratio,o=e<0||!e&&(!t._start&&pE(t)&&!(!t._initted&&lc(t))||(t._ts<0||t._dp._ts<0)&&!lc(t))?0:1,a=t._rDelay,l=0,c,u,h;if(a&&t._repeat&&(l=to(0,t._tDur,e),u=ns(l,a),t._yoyo&&u&1&&(o=1-o),u!==ns(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||be||r||t._zTime===ne||!e&&t._zTime){if(!t._initted&&Np(t,e,r,n,l))return;for(h=t._zTime,t._zTime=e||(n?ne:0),n||(n=e&&!h),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&ac(t,e,n,!0),t._onUpdate&&!n&&tn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&tn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&Ai(t,1),!n&&!be&&(tn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},_E=function(t,e,n){var r;if(n>e)for(r=t._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>e)return r;r=r._next}else for(r=t._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<e)return r;r=r._prev}},is=function(t,e,n,r){var s=t._repeat,o=le(e)||0,a=t._tTime/t._tDur;return a&&!r&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:le(o*(s+1)+t._rDelay*s):o,a>0&&!r&&Na(t,t._tTime=t._tDur*a),t.parent&&Ia(t),n||ir(t.parent,t),t},Zh=function(t){return t instanceof ze?ir(t):is(t,t._dur)},gE={_start:0,endTime:Hs,totalDuration:Hs},fn=function i(t,e,n){var r=t.labels,s=t._recent||gE,o=t.duration()>=pn?s.endTime(!1):t._dur,a,l,c;return Se(e)&&(isNaN(e)||e in r)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(e in r||(r[e]=o),r[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(Re(n)?n[0]:n).totalDuration()),a>1?i(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},Fs=function(t,e,n){var r=ni(e[1]),s=(r?2:1)+(t<2?0:1),o=e[s],a,l;if(r&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=ke(l.vars.inherit)&&l.parent;o.immediateRender=ke(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new ge(e[0],o,e[s+1])},Ni=function(t,e){return t||t===0?e(t):e},to=function(t,e,n){return n<t?t:n>e?e:n},Ce=function(t,e){return!Se(t)||!(e=oE.exec(t))?"":e[1]},vE=function(t,e,n){return Ni(n,function(r){return to(t,e,r)})},cc=[].slice,Op=function(t,e){return t&&zn(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&zn(t[0]))&&!t.nodeType&&t!==Dn},xE=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(r){var s;return Se(r)&&!e||Op(r,1)?(s=n).push.apply(s,mn(r)):n.push(r)})||n},mn=function(t,e,n){return ae&&!e&&ae.selector?ae.selector(t):Se(t)&&!n&&(sc||!rs())?cc.call((e||Cu).querySelectorAll(t),0):Re(t)?xE(t,n):Op(t)?cc.call(t,0):t?[t]:[]},uc=function(t){return t=mn(t)[0]||Vs("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return mn(e,n.querySelectorAll?n:n===t?Vs("Invalid scope")||Cu.createElement("div"):t)}},Up=function(t){return t.sort(function(){return .5-Math.random()})},Fp=function(t){if(fe(t))return t;var e=zn(t)?t:{each:t},n=rr(e.ease),r=e.from||0,s=parseFloat(e.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=e.axis,u=r,h=r;return Se(r)?u=h={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],h=r[1]),function(f,p,g){var _=(g||e).length,d=o[_],m,E,x,M,w,A,S,C,P;if(!d){if(P=e.grid==="auto"?0:(e.grid||[1,pn])[1],!P){for(S=-pn;S<(S=g[P++].getBoundingClientRect().left)&&P<_;);P<_&&P--}for(d=o[_]=[],m=l?Math.min(P,_)*u-.5:r%P,E=P===pn?0:l?_*h/P-.5:r/P|0,S=0,C=pn,A=0;A<_;A++)x=A%P-m,M=E-(A/P|0),d[A]=w=c?Math.abs(c==="y"?M:x):xp(x*x+M*M),w>S&&(S=w),w<C&&(C=w);r==="random"&&Up(d),d.max=S-C,d.min=C,d.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(P>_?_-1:c?c==="y"?_/P:P:Math.max(P,_/P))||0)*(r==="edges"?-1:1),d.b=_<0?s-_:s,d.u=Ce(e.amount||e.each)||0,n=n&&_<0?LE(n):n}return _=(d[f]-d.min)/d.max||0,le(d.b+(n?n(_):_)*d.v)+d.u}},hc=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var r=le(Math.round(parseFloat(n)/t)*t*e);return(r-r%1)/e+(ni(n)?0:Ce(n))}},Bp=function(t,e){var n=Re(t),r,s;return!n&&zn(t)&&(r=n=t.radius||pn,t.values?(t=mn(t.values),(s=!ni(t[0]))&&(r*=r)):t=hc(t.increment)),Ni(e,n?fe(t)?function(o){return s=t(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=pn,u=0,h=t.length,f,p;h--;)s?(f=t[h].x-a,p=t[h].y-l,f=f*f+p*p):f=Math.abs(t[h]-a),f<c&&(c=f,u=h);return u=!r||c<=r?t[u]:o,s||u===o||ni(o)?u:u+Ce(o)}:hc(t))},zp=function(t,e,n,r){return Ni(Re(t)?!e:n===!0?!!(n=0):!r,function(){return Re(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*r)/r})},EE=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(r){return e.reduce(function(s,o){return o(s)},r)}},ME=function(t,e){return function(n){return t(parseFloat(n))+(e||Ce(n))}},SE=function(t,e,n){return Vp(t,e,0,1,n)},kp=function(t,e,n){return Ni(n,function(r){return t[~~e(r)]})},yE=function i(t,e,n){var r=e-t;return Re(t)?kp(t,i(0,t.length),e):Ni(n,function(s){return(r+(s-t)%r)%r+t})},TE=function i(t,e,n){var r=e-t,s=r*2;return Re(t)?kp(t,i(0,t.length-1),e):Ni(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>r?s-o:o)})},Gs=function(t){return t.replace(iE,function(e){var n=e.indexOf("[")+1,r=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(rE);return zp(n?r:+r[0],n?0:+r[1],+r[2]||1e-5)})},Vp=function(t,e,n,r,s){var o=e-t,a=r-n;return Ni(s,function(l){return n+((l-t)/o*a||0)})},bE=function i(t,e,n,r){var s=isNaN(t+e)?0:function(p){return(1-p)*t+p*e};if(!s){var o=Se(t),a={},l,c,u,h,f;if(n===!0&&(r=1)&&(n=null),o)t={p:t},e={p:e};else if(Re(t)&&!Re(e)){for(u=[],h=t.length,f=h-2,c=1;c<h;c++)u.push(i(t[c-1],t[c]));h--,s=function(g){g*=h;var _=Math.min(f,~~g);return u[_](g-_)},n=e}else r||(t=es(Re(t)?[]:{},t));if(!u){for(l in e)Nu.call(a,t,l,"get",e[l]);s=function(g){return Bu(g,a)||(o?t.p:t)}}}return Ni(n,s)},Jh=function(t,e,n){var r=t.labels,s=pn,o,a,l;for(o in r)a=r[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},tn=function(t,e,n){var r=t.vars,s=r[e],o=ae,a=t._ctx,l,c,u;if(s)return l=r[e+"Params"],c=r.callbackScope||t,n&&xi.length&&ha(),a&&(ae=a),u=l?s.apply(c,l):s.call(c),ae=o,u},Ds=function(t){return Ai(t),t.scrollTrigger&&t.scrollTrigger.kill(!!be),t.progress()<1&&tn(t,"onInterrupt"),t},kr,Hp=[],Gp=function(t){if(t)if(t=!t.name&&t.default||t,wu()||t.headless){var e=t.name,n=fe(t),r=e&&!n&&t.init?function(){this._props=[]}:t,s={init:Hs,render:Bu,add:Nu,kill:HE,modifier:VE,rawVars:0},o={targetTest:0,get:0,getSetter:Fu,aliases:{},register:0};if(rs(),t!==r){if(Ze[e])return;cn(r,cn(fa(t,s),o)),es(r.prototype,es(s,fa(t,o))),Ze[r.prop=e]=r,t.targetTest&&(jo.push(r),Pu[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}bp(e,r),t.register&&t.register($e,r,He)}else Hp.push(t)},ee=255,Ls={aqua:[0,ee,ee],lime:[0,ee,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ee],navy:[0,0,128],white:[ee,ee,ee],olive:[128,128,0],yellow:[ee,ee,0],orange:[ee,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ee,0,0],pink:[ee,192,203],cyan:[0,ee,ee],transparent:[ee,ee,ee,0]},hl=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*ee+.5|0},Wp=function(t,e,n){var r=t?ni(t)?[t>>16,t>>8&ee,t&ee]:0:Ls.black,s,o,a,l,c,u,h,f,p,g;if(!r){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Ls[t])r=Ls[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return r=parseInt(t.substr(1,6),16),[r>>16,r>>8&ee,r&ee,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),r=[t>>16,t>>8&ee,t&ee]}else if(t.substr(0,3)==="hsl"){if(r=g=t.match(Yh),!e)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=hl(l+1/3,s,o),r[1]=hl(l,s,o),r[2]=hl(l-1/3,s,o);else if(~t.indexOf("="))return r=t.match(Mp),n&&r.length<4&&(r[3]=1),r}else r=t.match(Yh)||Ls.transparent;r=r.map(Number)}return e&&!g&&(s=r[0]/ee,o=r[1]/ee,a=r[2]/ee,h=Math.max(s,o,a),f=Math.min(s,o,a),u=(h+f)/2,h===f?l=c=0:(p=h-f,c=u>.5?p/(2-h-f):p/(h+f),l=h===s?(o-a)/p+(o<a?6:0):h===o?(a-s)/p+2:(s-o)/p+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},Xp=function(t){var e=[],n=[],r=-1;return t.split(Ei).forEach(function(s){var o=s.match(zr)||[];e.push.apply(e,o),n.push(r+=o.length+1)}),e.c=n,e},Qh=function(t,e,n){var r="",s=(t+r).match(Ei),o=e?"hsla(":"rgba(",a=0,l,c,u,h;if(!s)return t;if(s=s.map(function(f){return(f=Wp(f,e,1))&&o+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Xp(t),l=n.c,l.join(r)!==u.c.join(r)))for(c=t.replace(Ei,"1").split(zr),h=c.length-1;a<h;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=t.split(Ei),h=c.length-1;a<h;a++)r+=c[a]+s[a];return r+c[h]},Ei=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Ls)i+="|"+t+"\\b";return new RegExp(i+")","gi")}(),AE=/hsl[a]?\(/,$p=function(t){var e=t.join(" "),n;if(Ei.lastIndex=0,Ei.test(e))return n=AE.test(e),t[1]=Qh(t[1],n),t[0]=Qh(t[0],n,Xp(t[1])),!0},Ws,Qe=function(){var i=Date.now,t=500,e=33,n=i(),r=n,s=1e3/240,o=s,a=[],l,c,u,h,f,p,g=function _(d){var m=i()-r,E=d===!0,x,M,w,A;if((m>t||m<0)&&(n+=m-e),r+=m,w=r-n,x=w-o,(x>0||E)&&(A=++h.frame,f=w-h.time*1e3,h.time=w=w/1e3,o+=x+(x>=s?4:s-x),M=1),E||(l=c(_)),M)for(p=0;p<a.length;p++)a[p](w,f,A,d)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(d){return f/(1e3/(d||60))},wake:function(){yp&&(!sc&&wu()&&(Dn=sc=window,Cu=Dn.document||{},ln.gsap=$e,(Dn.gsapVersions||(Dn.gsapVersions=[])).push($e.version),Tp(ua||Dn.GreenSockGlobals||!Dn.gsap&&Dn||{}),Hp.forEach(Gp)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(d){return setTimeout(d,o-h.time*1e3+1|0)},Ws=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Ws=0,c=Hs},lagSmoothing:function(d,m){t=d||1/0,e=Math.min(m||33,t)},fps:function(d){s=1e3/(d||240),o=h.time*1e3+s},add:function(d,m,E){var x=m?function(M,w,A,S){d(M,w,A,S),h.remove(x)}:d;return h.remove(d),a[E?"unshift":"push"](x),rs(),x},remove:function(d,m){~(m=a.indexOf(d))&&a.splice(m,1)&&p>=m&&p--},_listeners:a},h}(),rs=function(){return!Ws&&Qe.wake()},kt={},wE=/^[\d.\-M][\d.\-,\s]/,CE=/["']/g,RE=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),r=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[r]=isNaN(c)?c.replace(CE,"").trim():+c,r=l.substr(a+1).trim();return e},PE=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),r=t.indexOf("(",e);return t.substring(e,~r&&r<n?t.indexOf(")",n+1):n)},DE=function(t){var e=(t+"").split("("),n=kt[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[RE(e[1])]:PE(t).split(",").map(Rp)):kt._CE&&wE.test(t)?kt._CE("",t):n},LE=function(t){return function(e){return 1-t(1-e)}},rr=function(t,e){return t&&(fe(t)?t:kt[t]||DE(t))||e},pr=function(t,e,n,r){n===void 0&&(n=function(l){return 1-e(1-l)}),r===void 0&&(r=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:r},o;return Ve(t,function(a){kt[a]=ln[a]=s,kt[o=a.toLowerCase()]=n;for(var l in s)kt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=kt[a+"."+l]=s[l]}),s},Yp=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},fl=function i(t,e,n){var r=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/rc*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*nE((u-o)*s)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:Yp(a);return s=rc/s,l.config=function(c,u){return i(t,c,u)},l},dl=function i(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},r=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:Yp(n);return r.config=function(s){return i(t,s)},r};Ve("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,t){var e=t<5?t+1:t;pr(i+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});kt.Linear.easeNone=kt.none=kt.Linear.easeIn;pr("Elastic",fl("in"),fl("out"),fl());(function(i,t){var e=1/t,n=2*e,r=2.5*e,s=function(a){return a<e?i*a*a:a<n?i*Math.pow(a-1.5/t,2)+.75:a<r?i*(a-=2.25/t)*a+.9375:i*Math.pow(a-2.625/t,2)+.984375};pr("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);pr("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});pr("Circ",function(i){return-(xp(1-i*i)-1)});pr("Sine",function(i){return i===1?1:-eE(i*Qx)+1});pr("Back",dl("in"),dl("out"),dl());kt.SteppedEase=kt.steps=ln.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,r=t+(e?0:1),s=e?1:0,o=1-ne;return function(a){return((r*to(0,o,a)|0)+s)*n}}};ks.ease=kt["quad.out"];Ve("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return Du+=i+","+i+"Params,"});var qp=function(t,e){this.id=tE++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:wp,this.set=e?e.getSetter:Fu},Xs=function(){function i(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,is(this,+e.duration,1,1),this.data=e.data,ae&&(this._ctx=ae,ae.data.push(this)),Ws||Qe.wake()}var t=i.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,is(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,r){if(rs(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Na(this,n),!s._dp||s.parent||Lp(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&In(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===ne||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Cp(this,n,r)),this},t.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+jh(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},t.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+jh(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?ns(this._tTime,s)+1:1},t.timeScale=function(n,r){if(!arguments.length)return this._rts===-ne?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?da(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-ne?0:this._rts,this.totalTime(to(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),Ia(this),fE(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(rs(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==ne&&(this._tTime-=ne)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=le(n);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&In(r,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(ke(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?da(r.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=lE);var r=be;return be=n,Iu(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),be=r,this},t.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Zh(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,Zh(this),r?this.time(r):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,r){return this.totalTime(fn(this,n),ke(r))},t.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,ke(r)),this._dur||(this._zTime=-ne),this},t.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},t.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},t.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-ne:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-ne,this},t.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-ne)},t.eventCallback=function(n,r,s){var o=this.vars;return arguments.length>1?(r?(o[n]=r,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete o[n],this):o[n]},t.then=function(n){var r=this,s=r._prom;return new Promise(function(o){var a=fe(n)?n:Pp,l=function(){var u=r.then;r.then=null,s&&s(),fe(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=u),o(a),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},t.kill=function(){Ds(this)},i}();cn(Xs.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ne,_prom:0,_ps:!1,_rts:1});var ze=function(i){vp(t,i);function t(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=ke(n.sortChildren),ce&&In(n.parent||ce,qn(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Ip(qn(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(r,s,o){return Fs(0,arguments,this),this},e.from=function(r,s,o){return Fs(1,arguments,this),this},e.fromTo=function(r,s,o,a){return Fs(2,arguments,this),this},e.set=function(r,s,o){return s.duration=0,s.parent=this,Us(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new ge(r,s,fn(this,o),1),this},e.call=function(r,s,o){return In(this,ge.delayedCall(0,r,s),o)},e.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new ge(r,o,fn(this,l)),this},e.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,Us(o).immediateRender=ke(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},e.staggerFromTo=function(r,s,o,a,l,c,u,h){return a.startAt=o,Us(a).immediateRender=ke(a.immediateRender),this.staggerTo(r,s,a,l,c,u,h)},e.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:le(r),h=this._zTime<0!=r<0&&(this._initted||!c),f,p,g,_,d,m,E,x,M,w,A,S;if(this!==ce&&u>l&&r>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),f=u,M=this._start,x=this._ts,m=!x,h&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(A=this._yoyo,d=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(d*100+r,s,o);if(f=le(u%d),u===l?(_=this._repeat,f=c):(w=le(u/d),_=~~w,_&&_===w&&(f=c,_--),f>c&&(f=c)),w=ns(this._tTime,d),!a&&this._tTime&&w!==_&&this._tTime-w*d-this._dur<=0&&(w=_),A&&_&1&&(f=c-f,S=1),_!==w&&!this._lock){var C=A&&w&1,P=C===(A&&_&1);if(_<w&&(C=!C),a=C?0:u%c?c:u,this._lock=1,this.render(a||(S?0:le(_*d)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&tn(this,"onRepeat"),this.vars.repeatRefresh&&!S&&(this.invalidate()._lock=1,w=_),a&&a!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,P&&(this._lock=2,a=C?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!S&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(E=_E(this,le(a),le(f)),E&&(u-=f-(f=E._start))),this._tTime=u,this._time=f,this._act=!!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&c&&!s&&!w&&(tn(this,"onStart"),this._tTime!==u))return this;if(f>=a&&r>=0)for(p=this._first;p;){if(g=p._next,(p._act||f>=p._start)&&p._ts&&E!==p){if(p.parent!==this)return this.render(r,s,o);if(p.render(p._ts>0?(f-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(f-p._start)*p._ts,s,o),f!==this._time||!this._ts&&!m){E=0,g&&(u+=this._zTime=-ne);break}}p=g}else{p=this._last;for(var v=r<0?r:f;p;){if(g=p._prev,(p._act||v<=p._end)&&p._ts&&E!==p){if(p.parent!==this)return this.render(r,s,o);if(p.render(p._ts>0?(v-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(v-p._start)*p._ts,s,o||be&&Iu(p)),f!==this._time||!this._ts&&!m){E=0,g&&(u+=this._zTime=v?-ne:ne);break}}p=g}}if(E&&!s&&(this.pause(),E.render(f>=a?0:-ne)._zTime=f>=a?1:-1,this._ts))return this._start=M,Ia(this),this.render(r,s,o);this._onUpdate&&!s&&tn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(M===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Ai(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(tn(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(r,s){var o=this;if(ni(s)||(s=fn(this,s,r)),!(r instanceof Xs)){if(Re(r))return r.forEach(function(a){return o.add(a,s)}),this;if(Se(r))return this.addLabel(r,s);if(fe(r))r=ge.delayedCall(0,r);else return this}return this!==r?In(this,r,s):this},e.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-pn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof ge?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},e.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},e.remove=function(r){return Se(r)?this.removeLabel(r):fe(r)?this.killTweensOf(r):(r.parent===this&&La(this,r),r===this._recent&&(this._recent=this._last),ir(this))},e.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=le(Qe.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},e.addLabel=function(r,s){return this.labels[r]=fn(this,s),this},e.removeLabel=function(r){return delete this.labels[r],this},e.addPause=function(r,s,o){var a=ge.delayedCall(0,s||Hs,o);return a.data="isPause",this._hasPause=1,In(this,a,fn(this,r))},e.removePause=function(r){var s=this._first;for(r=fn(this,r);s;)s._start===r&&s.data==="isPause"&&Ai(s),s=s._next},e.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)_i!==a[l]&&a[l].kill(r,s);return this},e.getTweensOf=function(r,s){for(var o=[],a=mn(r),l=this._first,c=ni(s),u;l;)l instanceof ge?cE(l._targets,a)&&(c?(!_i||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},e.tweenTo=function(r,s){s=s||{};var o=this,a=fn(o,r),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,f=l.immediateRender,p,g=ge.to(o,cn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||ne,onStart:function(){if(o.pause(),!p){var d=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==d&&is(g,d,0,1).render(g._time,!0,!0),p=1}u&&u.apply(g,h||[])}},s));return f?g.render(0):g},e.tweenFromTo=function(r,s,o){return this.tweenTo(s,cn({startAt:{time:fn(this,r)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(r){return r===void 0&&(r=this._time),Jh(this,fn(this,r))},e.previousLabel=function(r){return r===void 0&&(r=this._time),Jh(this,fn(this,r),1)},e.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+ne)},e.shiftChildren=function(r,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(r=le(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return ir(this)},e.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},e.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),ir(this)},e.totalDuration=function(r){var s=0,o=this,a=o._last,l=pn,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,In(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=le(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;is(o,o===ce&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(r){if(ce._ts&&(Cp(ce,da(r,ce)),Ap=Qe.frame),Qe.frame>=qh){qh+=rn.autoSleep||120;var s=ce._first;if((!s||!s._ts)&&rn.autoSleep&&Qe._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Qe.sleep()}}},t}(Xs);cn(ze.prototype,{_lock:0,_hasPause:0,_forcing:0});var IE=function(t,e,n,r,s,o,a){var l=new He(this._pt,t,e,0,1,tm,null,s),c=0,u=0,h,f,p,g,_,d,m,E;for(l.b=n,l.e=r,n+="",r+="",(m=~r.indexOf("random("))&&(r=Gs(r)),o&&(E=[n,r],o(E,t,e),n=E[0],r=E[1]),f=n.match(cl)||[];h=cl.exec(r);)g=h[0],_=r.substring(c,h.index),p?p=(p+1)%5:_.substr(-5)==="rgba("&&(p=1),g!==f[u++]&&(d=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:d,c:g.charAt(1)==="="?Hr(d,g)-d:parseFloat(g)-d,m:p&&p<4?Math.round:0},c=cl.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(Sp.test(r)||m)&&(l.e=0),this._pt=l,l},Nu=function(t,e,n,r,s,o,a,l,c,u){fe(r)&&(r=r(s||0,t,o));var h=t[e],f=n!=="get"?n:fe(h)?c?t[e.indexOf("set")||!fe(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():h,p=fe(h)?c?BE:Jp:Uu,g;if(Se(r)&&(~r.indexOf("random(")&&(r=Gs(r)),r.charAt(1)==="="&&(g=Hr(f,r)+(Ce(f)||0),(g||g===0)&&(r=g))),!u||f!==r||fc)return!isNaN(f*r)&&r!==""?(g=new He(this._pt,t,e,+f||0,r-(f||0),typeof h=="boolean"?kE:Qp,0,p),c&&(g.fp=c),a&&g.modifier(a,this,t),this._pt=g):(!h&&!(e in t)&&Ru(e,r),IE.call(this,t,e,f,r,p,l||rn.stringFilter,c))},NE=function(t,e,n,r,s){if(fe(t)&&(t=Bs(t,s,e,n,r)),!zn(t)||t.style&&t.nodeType||Re(t)||Ep(t))return Se(t)?Bs(t,s,e,n,r):t;var o={},a;for(a in t)o[a]=Bs(t[a],s,e,n,r);return o},Kp=function(t,e,n,r,s,o){var a,l,c,u;if(Ze[t]&&(a=new Ze[t]).init(s,a.rawVars?e[t]:NE(e[t],r,s,o,n),n,r,o)!==!1&&(n._pt=l=new He(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==kr))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},_i,fc,Ou=function i(t,e,n){var r=t.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,h=r.yoyoEase,f=r.keyframes,p=r.autoRevert,g=t._dur,_=t._startAt,d=t._targets,m=t.parent,E=m&&m.data==="nested"?m.vars.targets:d,x=t._overwrite==="auto"&&!bu,M=t.timeline,w=r.easeReverse||h,A,S,C,P,v,y,N,O,k,X,B,W,G;if(M&&(!f||!s)&&(s="none"),t._ease=rr(s,ks.ease),t._rEase=w&&(rr(w)||t._ease),t._from=!M&&!!r.runBackwards,t._from&&(t.ratio=1),!M||f&&!r.stagger){if(O=d[0]?nr(d[0]).harness:0,W=O&&r[O.prop],A=fa(r,Pu),_&&(_._zTime<0&&_.progress(1),e<0&&u&&a&&!p?_.render(-1,!0):_.revert(u&&g?Ko:aE),_._lazy=0),o){if(Ai(t._startAt=ge.set(d,cn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!_&&ke(l),startAt:null,delay:0,onUpdate:c&&function(){return tn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(be||!a&&!p)&&t._startAt.revert(Ko),a&&g&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(u&&g&&!_){if(e&&(a=!1),C=cn({overwrite:!1,data:"isFromStart",lazy:a&&!_&&ke(l),immediateRender:a,stagger:0,parent:m},A),W&&(C[O.prop]=W),Ai(t._startAt=ge.set(d,C)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(be?t._startAt.revert(Ko):t._startAt.render(-1,!0)),t._zTime=e,!a)i(t._startAt,ne,ne);else if(!e)return}for(t._pt=t._ptCache=0,l=g&&ke(l)||l&&!g,S=0;S<d.length;S++){if(v=d[S],N=v._gsap||Lu(d)[S]._gsap,t._ptLookup[S]=X={},oc[N.id]&&xi.length&&ha(),B=E===d?S:E.indexOf(v),O&&(k=new O).init(v,W||A,t,B,E)!==!1&&(t._pt=P=new He(t._pt,v,k.name,0,1,k.render,k,0,k.priority),k._props.forEach(function(nt){X[nt]=P}),k.priority&&(y=1)),!O||W)for(C in A)Ze[C]&&(k=Kp(C,A,t,B,v,E))?k.priority&&(y=1):X[C]=P=Nu.call(t,v,C,"get",A[C],B,E,0,r.stringFilter);t._op&&t._op[S]&&t.kill(v,t._op[S]),x&&t._pt&&(_i=t,ce.killTweensOf(v,X,t.globalTime(e)),G=!t.parent,_i=0),t._pt&&l&&(oc[N.id]=1)}y&&em(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!G,f&&e<=0&&M.render(pn,!0,!0)},OE=function(t,e,n,r,s,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,h,f,p;if(!c)for(c=t._ptCache[e]=[],f=t._ptLookup,p=t._targets.length;p--;){if(u=f[p][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return fc=1,t.vars[e]="+=0",Ou(t,a),fc=0,l?Vs(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(p=c.length;p--;)h=c[p],u=h._pt||h,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=n-u.s,h.e&&(h.e=pe(n)+Ce(h.e)),h.b&&(h.b=u.s+Ce(h.b))},UE=function(t,e){var n=t[0]?nr(t[0]).harness:0,r=n&&n.aliases,s,o,a,l;if(!r)return e;s=es({},e);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},FE=function(t,e,n,r){var s=e.ease||r||"power1.inOut",o,a;if(Re(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},Bs=function(t,e,n,r,s){return fe(t)?t.call(e,n,r,s):Se(t)&&~t.indexOf("random(")?Gs(t):t},jp=Du+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Zp={};Ve(jp+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return Zp[i]=1});var ge=function(i){vp(t,i);function t(n,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=i.call(this,o?r:Us(r))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,f=l.stagger,p=l.overwrite,g=l.keyframes,_=l.defaults,d=l.scrollTrigger,m=r.parent||ce,E=(Re(n)||Ep(n)?ni(n[0]):"length"in r)?[n]:mn(n),x,M,w,A,S,C,P,v;if(a._targets=E.length?Lu(E):Vs("GSAP target "+n+" not found. https://gsap.com",!rn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=p,g||f||go(c)||go(u)){r=a.vars;var y=r.easeReverse||r.yoyoEase;if(x=a.timeline=new ze({data:"nested",defaults:_||{},targets:m&&m.data==="nested"?m.vars.targets:E}),x.kill(),x.parent=x._dp=qn(a),x._start=0,f||go(c)||go(u)){if(A=E.length,P=f&&Fp(f),zn(f))for(S in f)~jp.indexOf(S)&&(v||(v={}),v[S]=f[S]);for(M=0;M<A;M++)w=fa(r,Zp),w.stagger=0,y&&(w.easeReverse=y),v&&es(w,v),C=E[M],w.duration=+Bs(c,qn(a),M,C,E),w.delay=(+Bs(u,qn(a),M,C,E)||0)-a._delay,!f&&A===1&&w.delay&&(a._delay=u=w.delay,a._start+=u,w.delay=0),x.to(C,w,P?P(M,C,E):0),x._ease=kt.none;x.duration()?c=u=0:a.timeline=0}else if(g){Us(cn(x.vars.defaults,{ease:"none"})),x._ease=rr(g.ease||r.ease||"none");var N=0,O,k,X;if(Re(g))g.forEach(function(B){return x.to(E,B,">")}),x.duration();else{w={};for(S in g)S==="ease"||S==="easeEach"||FE(S,g[S],w,g.easeEach);for(S in w)for(O=w[S].sort(function(B,W){return B.t-W.t}),N=0,M=0;M<O.length;M++)k=O[M],X={ease:k.e,duration:(k.t-(M?O[M-1].t:0))/100*c},X[S]=k.v,x.to(E,X,N),N+=X.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||a.duration(c=x.duration())}else a.timeline=0;return p===!0&&!bu&&(_i=qn(a),ce.killTweensOf(E),_i=0),In(m,qn(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(h||!c&&!g&&a._start===le(m._time)&&ke(h)&&dE(qn(a))&&m.data!=="nested")&&(a._tTime=-ne,a.render(Math.max(0,-u)||0)),d&&Ip(qn(a),d),a}var e=t.prototype;return e.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,h=r>l-ne&&!u?l:r<ne?0:r,f,p,g,_,d,m,E,x;if(!c)mE(this,r,s,o);else if(h!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,x=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+r,s,o);if(f=le(h%_),h===l?(g=this._repeat,f=c):(d=le(h/_),g=~~d,g&&g===d?(f=c,g--):f>c&&(f=c)),m=this._yoyo&&g&1,m&&(f=c-f),d=ns(this._tTime,_),f===a&&!o&&this._initted&&g===d)return this._tTime=h,this;g!==d&&this.vars.repeatRefresh&&!m&&!this._lock&&f!==_&&this._initted&&(this._lock=o=1,this.render(le(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(Np(this,u?r:f,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==d))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._rEase){var M=f<a;if(M!==this._inv){var w=M?a:c-a;this._inv=M,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=w?(M?-1:1)/w:0,this._invScale=M?-this.ratio:1-this.ratio,this._invEase=M?this._rEase:this._ease}this.ratio=E=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=E=this._ease(f/c);if(this._from&&(this.ratio=E=1-E),this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&h&&!s&&!d&&(tn(this,"onStart"),this._tTime!==h))return this;for(p=this._pt;p;)p.r(E,p.d),p=p._next;x&&x.render(r<0?r:x._dur*x._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&ac(this,r,s,o),tn(this,"onUpdate")),this._repeat&&g!==d&&this.vars.onRepeat&&!s&&this.parent&&tn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&ac(this,r,!0,!0),(r||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&Ai(this,1),!s&&!(u&&!a)&&(h||a||m)&&(tn(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},e.resetTo=function(r,s,o,a,l){Ws||Qe.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Ou(this,c),u=this._ease(c/this._dur),OE(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(Na(this,0),this.parent||Dp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Ds(this):this.scrollTrigger&&this.scrollTrigger.kill(!!be),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,_i&&_i.vars.overwrite!==!0)._first||Ds(this),this.parent&&o!==this.timeline.totalDuration()&&is(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?mn(r):a,c=this._ptLookup,u=this._pt,h,f,p,g,_,d,m;if((!s||s==="all")&&hE(a,l))return s==="all"&&(this._pt=0),Ds(this);for(h=this._op=this._op||[],s!=="all"&&(Se(s)&&(_={},Ve(s,function(E){return _[E]=1}),s=_),s=UE(a,s)),m=a.length;m--;)if(~l.indexOf(a[m])){f=c[m],s==="all"?(h[m]=s,g=f,p={}):(p=h[m]=h[m]||{},g=s);for(_ in g)d=f&&f[_],d&&((!("kill"in d.d)||d.d.kill(_)===!0)&&La(this,d,"_pt"),delete f[_]),p!=="all"&&(p[_]=1)}return this._initted&&!this._pt&&u&&Ds(this),this},t.to=function(r,s){return new t(r,s,arguments[2])},t.from=function(r,s){return Fs(1,arguments)},t.delayedCall=function(r,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(r,s,o){return Fs(2,arguments)},t.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(r,s)},t.killTweensOf=function(r,s,o){return ce.killTweensOf(r,s,o)},t}(Xs);cn(ge.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Ve("staggerTo,staggerFrom,staggerFromTo",function(i){ge[i]=function(){var t=new ze,e=cc.call(arguments,0);return e.splice(i==="staggerFromTo"?5:4,0,0),t[i].apply(t,e)}});var Uu=function(t,e,n){return t[e]=n},Jp=function(t,e,n){return t[e](n)},BE=function(t,e,n,r){return t[e](r.fp,n)},zE=function(t,e,n){return t.setAttribute(e,n)},Fu=function(t,e){return fe(t[e])?Jp:Au(t[e])&&t.setAttribute?zE:Uu},Qp=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},kE=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},tm=function(t,e){var n=e._pt,r="";if(!t&&e.b)r=e.b;else if(t===1&&e.e)r=e.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+r,n=n._next;r+=e.c}e.set(e.t,e.p,r,e)},Bu=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},VE=function(t,e,n,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(t,e,n),s=o},HE=function(t){for(var e=this._pt,n,r;e;)r=e._next,e.p===t&&!e.op||e.op===t?La(this,e,"_pt"):e.dep||(n=1),e=r;return!n},GE=function(t,e,n,r){r.mSet(t,e,r.m.call(r.tween,n,r.mt),r)},em=function(t){for(var e=t._pt,n,r,s,o;e;){for(n=e._next,r=s;r&&r.pr>e.pr;)r=r._next;(e._prev=r?r._prev:o)?e._prev._next=e:s=e,(e._next=r)?r._prev=e:o=e,e=n}t._pt=s},He=function(){function i(e,n,r,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=r,this.r=a||Qp,this.d=l||this,this.set=c||Uu,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=i.prototype;return t.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=GE,this.m=n,this.mt=s,this.tween=r},i}();Ve(Du+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(i){return Pu[i]=1});ln.TweenMax=ln.TweenLite=ge;ln.TimelineLite=ln.TimelineMax=ze;ce=new ze({sortChildren:!1,defaults:ks,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});rn.stringFilter=$p;var sr=[],Zo={},WE=[],tf=0,XE=0,pl=function(t){return(Zo[t]||WE).map(function(e){return e()})},dc=function(){var t=Date.now(),e=[];t-tf>2&&(pl("matchMediaInit"),sr.forEach(function(n){var r=n.queries,s=n.conditions,o,a,l,c;for(a in r)o=Dn.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),pl("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),tf=t,pl("matchMedia"))},nm=function(){function i(e,n){this.selector=n&&uc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=XE++,e&&this.add(e)}var t=i.prototype;return t.add=function(n,r,s){fe(n)&&(s=r,r=n,n=fe);var o=this,a=function(){var c=ae,u=o.selector,h;return c&&c!==o&&c.data.push(o),s&&(o.selector=uc(s)),ae=o,h=r.apply(o,arguments),fe(h)&&o._r.push(h),ae=c,o.selector=u,o.isReverted=!1,h};return o.last=a,n===fe?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var r=ae;ae=null,n(this),ae=r},t.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof ge&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,r){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof ze?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof ge)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=sr.length;o--;)sr[o].id===this.id&&sr.splice(o,1)},t.revert=function(n){this.kill(n||{})},i}(),$E=function(){function i(e){this.contexts=[],this.scope=e,ae&&ae.data.push(this)}var t=i.prototype;return t.add=function(n,r,s){zn(n)||(n={matches:n});var o=new nm(0,s||this.scope),a=o.conditions={},l,c,u;ae&&!o.selector&&(o.selector=ae.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=n;for(c in n)c==="all"?u=1:(l=Dn.matchMedia(n[c]),l&&(sr.indexOf(o)<0&&sr.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(dc):l.addEventListener("change",dc)));return u&&r(o,function(h){return o.add(null,h)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i}(),pa={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(r){return Gp(r)})},timeline:function(t){return new ze(t)},getTweensOf:function(t,e){return ce.getTweensOf(t,e)},getProperty:function(t,e,n,r){Se(t)&&(t=mn(t)[0]);var s=nr(t||{}).get,o=n?Pp:Rp;return n==="native"&&(n=""),t&&(e?o((Ze[e]&&Ze[e].get||s)(t,e,n,r)):function(a,l,c){return o((Ze[a]&&Ze[a].get||s)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=mn(t),t.length>1){var r=t.map(function(u){return $e.quickSetter(u,e,n)}),s=r.length;return function(u){for(var h=s;h--;)r[h](u)}}t=t[0]||{};var o=Ze[e],a=nr(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(u){var h=new o;kr._pt=0,h.init(t,n?u+n:u,kr,0,[t]),h.render(1,h),kr._pt&&Bu(1,kr)}:a.set(t,l);return o?c:function(u){return c(t,l,n?u+n:u,a,1)}},quickTo:function(t,e,n){var r,s=$e.to(t,cn((r={},r[e]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),o=function(l,c,u){return s.resetTo(e,l,c,u)};return o.tween=s,o},isTweening:function(t){return ce.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=rr(t.ease,ks.ease)),Kh(ks,t||{})},config:function(t){return Kh(rn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,r=t.plugins,s=t.defaults,o=t.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!Ze[a]&&!ln[a]&&Vs(e+" effect requires "+a+" plugin.")}),ul[e]=function(a,l,c){return n(mn(a),cn(l||{},s),c)},o&&(ze.prototype[e]=function(a,l,c){return this.add(ul[e](a,zn(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){kt[t]=rr(e)},parseEase:function(t,e){return arguments.length?rr(t,e):kt},getById:function(t){return ce.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new ze(t),r,s;for(n.smoothChildTiming=ke(t.smoothChildTiming),ce.remove(n),n._dp=0,n._time=n._tTime=ce._time,r=ce._first;r;)s=r._next,(e||!(!r._dur&&r instanceof ge&&r.vars.onComplete===r._targets[0]))&&In(n,r,r._start-r._delay),r=s;return In(ce,n,0),n},context:function(t,e){return t?new nm(t,e):ae},matchMedia:function(t){return new $E(t)},matchMediaRefresh:function(){return sr.forEach(function(t){var e=t.conditions,n,r;for(r in e)e[r]&&(e[r]=!1,n=1);n&&t.revert()})||dc()},addEventListener:function(t,e){var n=Zo[t]||(Zo[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Zo[t],r=n&&n.indexOf(e);r>=0&&n.splice(r,1)},utils:{wrap:yE,wrapYoyo:TE,distribute:Fp,random:zp,snap:Bp,normalize:SE,getUnit:Ce,clamp:vE,splitColor:Wp,toArray:mn,selector:uc,mapRange:Vp,pipe:EE,unitize:ME,interpolate:bE,shuffle:Up},install:Tp,effects:ul,ticker:Qe,updateRoot:ze.updateRoot,plugins:Ze,globalTimeline:ce,core:{PropTween:He,globals:bp,Tween:ge,Timeline:ze,Animation:Xs,getCache:nr,_removeLinkedListItem:La,reverting:function(){return be},context:function(t){return t&&ae&&(ae.data.push(t),t._ctx=ae),ae},suppressOverwrites:function(t){return bu=t}}};Ve("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return pa[i]=ge[i]});Qe.add(ze.updateRoot);kr=pa.to({},{duration:0});var YE=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},qE=function(t,e){var n=t._targets,r,s,o;for(r in e)for(s=n.length;s--;)o=t._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=YE(o,r)),o&&o.modifier&&o.modifier(e[r],t,n[s],r))},ml=function(t,e){return{name:t,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(Se(s)&&(l={},Ve(s,function(u){return l[u]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}qE(a,s)}}}},$e=pa.registerPlugin({name:"attr",init:function(t,e,n,r,s){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)be?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},ml("roundProps",hc),ml("modifiers"),ml("snap",Bp))||pa;ge.version=ze.version=$e.version="3.15.0";yp=1;wu()&&rs();kt.Power0;kt.Power1;kt.Power2;kt.Power3;kt.Power4;kt.Linear;kt.Quad;kt.Cubic;kt.Quart;kt.Quint;kt.Strong;kt.Elastic;kt.Back;kt.SteppedEase;kt.Bounce;kt.Sine;kt.Expo;kt.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var ef,gi,Gr,zu,Ji,nf,ku,KE=function(){return typeof window<"u"},ii={},Xi=180/Math.PI,Wr=Math.PI/180,Er=Math.atan2,rf=1e8,Vu=/([A-Z])/g,jE=/(left|right|width|margin|padding|x)/i,ZE=/[\s,\(]\S/,Nn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},pc=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},JE=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},QE=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},tM=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},eM=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},im=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},rm=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},nM=function(t,e,n){return t.style[e]=n},iM=function(t,e,n){return t.style.setProperty(e,n)},rM=function(t,e,n){return t._gsap[e]=n},sM=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},oM=function(t,e,n,r,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},aM=function(t,e,n,r,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},ue="transform",Ge=ue+"Origin",lM=function i(t,e){var n=this,r=this.target,s=r.style,o=r._gsap;if(t in ii&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Nn[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=Kn(r,a)}):this.tfm[t]=o.x?o[t]:Kn(r,t),t===Ge&&(this.tfm.zOrigin=o.zOrigin);else return Nn.transform.split(",").forEach(function(a){return i.call(n,a,e)});if(this.props.indexOf(ue)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Ge,e,"")),t=ue}(s||e)&&this.props.push(t,e,s[t])},sm=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},cM=function(){var t=this.props,e=this.target,n=e.style,r=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(Vu,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=ku(),(!s||!s.isStart)&&!n[ue]&&(sm(n),r.zOrigin&&n[Ge]&&(n[Ge]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},om=function(t,e){var n={target:t,props:[],revert:cM,save:lM};return t._gsap||$e.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(r){return n.save(r)}),n},am,mc=function(t,e){var n=gi.createElementNS?gi.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):gi.createElement(t);return n&&n.style?n:gi.createElement(t)},en=function i(t,e,n){var r=getComputedStyle(t);return r[e]||r.getPropertyValue(e.replace(Vu,"-$1").toLowerCase())||r.getPropertyValue(e)||!n&&i(t,ss(e)||e,1)||""},sf="O,Moz,ms,Ms,Webkit".split(","),ss=function(t,e,n){var r=e||Ji,s=r.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(sf[o]+t in s););return o<0?null:(o===3?"ms":o>=0?sf[o]:"")+t},_c=function(){KE()&&window.document&&(ef=window,gi=ef.document,Gr=gi.documentElement,Ji=mc("div")||{style:{}},mc("div"),ue=ss(ue),Ge=ue+"Origin",Ji.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",am=!!ss("perspective"),ku=$e.core.reverting,zu=1)},of=function(t){var e=t.ownerSVGElement,n=mc("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=t.cloneNode(!0),s;r.style.display="block",n.appendChild(r),Gr.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),Gr.removeChild(n),s},af=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},lm=function(t){var e,n;try{e=t.getBBox()}catch{e=of(t),n=1}return e&&(e.width||e.height)||n||(e=of(t)),e&&!e.width&&!e.x&&!e.y?{x:+af(t,["x","cx","x1"])||0,y:+af(t,["y","cy","y1"])||0,width:0,height:0}:e},cm=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&lm(t))},wi=function(t,e){if(e){var n=t.style,r;e in ii&&e!==Ge&&(e=ue),n.removeProperty?(r=e.substr(0,2),(r==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(r==="--"?e:e.replace(Vu,"-$1").toLowerCase())):n.removeAttribute(e)}},vi=function(t,e,n,r,s,o){var a=new He(t._pt,e,n,0,1,o?rm:im);return t._pt=a,a.b=r,a.e=s,t._props.push(n),a},lf={deg:1,rad:1,turn:1},uM={grid:1,flex:1},Ci=function i(t,e,n,r){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Ji.style,l=jE.test(e),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,f=r==="px",p=r==="%",g,_,d,m;if(r===o||!s||lf[r]||lf[o])return s;if(o!=="px"&&!f&&(s=i(t,e,n,"px")),m=t.getCTM&&cm(t),(p||o==="%")&&(ii[e]||~e.indexOf("adius")))return g=m?t.getBBox()[l?"width":"height"]:t[u],pe(p?s/g*h:s/100*g);if(a[l?"width":"height"]=h+(f?o:r),_=r!=="rem"&&~e.indexOf("adius")||r==="em"&&t.appendChild&&!c?t:t.parentNode,m&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===gi||!_.appendChild)&&(_=gi.body),d=_._gsap,d&&p&&d.width&&l&&d.time===Qe.time&&!d.uncache)return pe(s/d.width*h);if(p&&(e==="height"||e==="width")){var E=t.style[e];t.style[e]=h+r,g=t[u],E?t.style[e]=E:wi(t,e)}else(p||o==="%")&&!uM[en(_,"display")]&&(a.position=en(t,"position")),_===t&&(a.position="static"),_.appendChild(Ji),g=Ji[u],_.removeChild(Ji),a.position="absolute";return l&&p&&(d=nr(_),d.time=Qe.time,d.width=_[u]),pe(f?g*s/h:g&&s?h/g*s:0)},Kn=function(t,e,n,r){var s;return zu||_c(),e in Nn&&e!=="transform"&&(e=Nn[e],~e.indexOf(",")&&(e=e.split(",")[0])),ii[e]&&e!=="transform"?(s=Ys(t,r),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:_a(en(t,Ge))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=ma[e]&&ma[e](t,e,n)||en(t,e)||wp(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Ci(t,e,s,n)+n:s},hM=function(t,e,n,r){if(!n||n==="none"){var s=ss(e,t,1),o=s&&en(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=en(t,"borderTopColor"))}var a=new He(this._pt,t.style,e,0,1,tm),l=0,c=0,u,h,f,p,g,_,d,m,E,x,M,w;if(a.b=n,a.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=en(t,r.substring(4,r.indexOf(")")))),r==="auto"&&(_=t.style[e],t.style[e]=r,r=en(t,e)||r,_?t.style[e]=_:wi(t,e)),u=[n,r],$p(u),n=u[0],r=u[1],f=n.match(zr)||[],w=r.match(zr)||[],w.length){for(;h=zr.exec(r);)d=h[0],E=r.substring(l,h.index),g?g=(g+1)%5:(E.substr(-5)==="rgba("||E.substr(-5)==="hsla(")&&(g=1),d!==(_=f[c++]||"")&&(p=parseFloat(_)||0,M=_.substr((p+"").length),d.charAt(1)==="="&&(d=Hr(p,d)+M),m=parseFloat(d),x=d.substr((m+"").length),l=zr.lastIndex-x.length,x||(x=x||rn.units[e]||M,l===r.length&&(r+=x,a.e+=x)),M!==x&&(p=Ci(t,e,_,x)||0),a._pt={_next:a._pt,p:E||c===1?E:",",s:p,c:m-p,m:g&&g<4||e==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=e==="display"&&r==="none"?rm:im;return Sp.test(r)&&(a.e=0),this._pt=a,a},cf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},fM=function(t){var e=t.split(" "),n=e[0],r=e[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(t=n,n=r,r=t),e[0]=cf[n]||n,e[1]=cf[r]||r,e.join(" ")},dM=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,r=n.style,s=e.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],ii[a]&&(l=1,a=a==="transformOrigin"?Ge:ue),wi(n,a);l&&(wi(n,ue),o&&(o.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",Ys(n,1),o.uncache=1,sm(r)))}},ma={clearProps:function(t,e,n,r,s){if(s.data!=="isFromStart"){var o=t._pt=new He(t._pt,e,n,0,0,dM);return o.u=r,o.pr=-10,o.tween=s,t._props.push(n),1}}},$s=[1,0,0,1,0,0],um={},hm=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},uf=function(t){var e=en(t,ue);return hm(e)?$s:e.substr(7).match(Mp).map(pe)},Hu=function(t,e){var n=t._gsap||nr(t),r=t.style,s=uf(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?$s:s):(s===$s&&!t.offsetParent&&t!==Gr&&!n.svg&&(l=r.display,r.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,Gr.appendChild(t)),s=uf(t),l?r.display=l:wi(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):Gr.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},gc=function(t,e,n,r,s,o){var a=t._gsap,l=s||Hu(t,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,f=a.yOffset||0,p=l[0],g=l[1],_=l[2],d=l[3],m=l[4],E=l[5],x=e.split(" "),M=parseFloat(x[0])||0,w=parseFloat(x[1])||0,A,S,C,P;n?l!==$s&&(S=p*d-g*_)&&(C=M*(d/S)+w*(-_/S)+(_*E-d*m)/S,P=M*(-g/S)+w*(p/S)-(p*E-g*m)/S,M=C,w=P):(A=lm(t),M=A.x+(~x[0].indexOf("%")?M/100*A.width:M),w=A.y+(~(x[1]||x[0]).indexOf("%")?w/100*A.height:w)),r||r!==!1&&a.smooth?(m=M-c,E=w-u,a.xOffset=h+(m*p+E*_)-m,a.yOffset=f+(m*g+E*d)-E):a.xOffset=a.yOffset=0,a.xOrigin=M,a.yOrigin=w,a.smooth=!!r,a.origin=e,a.originIsAbsolute=!!n,t.style[Ge]="0px 0px",o&&(vi(o,a,"xOrigin",c,M),vi(o,a,"yOrigin",u,w),vi(o,a,"xOffset",h,a.xOffset),vi(o,a,"yOffset",f,a.yOffset)),t.setAttribute("data-svg-origin",M+" "+w)},Ys=function(t,e){var n=t._gsap||new qp(t);if("x"in n&&!e&&!n.uncache)return n;var r=t.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=en(t,Ge)||"0",u,h,f,p,g,_,d,m,E,x,M,w,A,S,C,P,v,y,N,O,k,X,B,W,G,nt,it,ct,Ct,Nt,$,j;return u=h=f=_=d=m=E=x=M=0,p=g=1,n.svg=!!(t.getCTM&&cm(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[ue]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[ue]!=="none"?l[ue]:"")),r.scale=r.rotate=r.translate="none"),S=Hu(t,n.svg),n.svg&&(n.uncache?(G=t.getBBox(),c=n.xOrigin-G.x+"px "+(n.yOrigin-G.y)+"px",W=""):W=!e&&t.getAttribute("data-svg-origin"),gc(t,W||c,!!W||n.originIsAbsolute,n.smooth!==!1,S)),w=n.xOrigin||0,A=n.yOrigin||0,S!==$s&&(y=S[0],N=S[1],O=S[2],k=S[3],u=X=S[4],h=B=S[5],S.length===6?(p=Math.sqrt(y*y+N*N),g=Math.sqrt(k*k+O*O),_=y||N?Er(N,y)*Xi:0,E=O||k?Er(O,k)*Xi+_:0,E&&(g*=Math.abs(Math.cos(E*Wr))),n.svg&&(u-=w-(w*y+A*O),h-=A-(w*N+A*k))):(j=S[6],Nt=S[7],it=S[8],ct=S[9],Ct=S[10],$=S[11],u=S[12],h=S[13],f=S[14],C=Er(j,Ct),d=C*Xi,C&&(P=Math.cos(-C),v=Math.sin(-C),W=X*P+it*v,G=B*P+ct*v,nt=j*P+Ct*v,it=X*-v+it*P,ct=B*-v+ct*P,Ct=j*-v+Ct*P,$=Nt*-v+$*P,X=W,B=G,j=nt),C=Er(-O,Ct),m=C*Xi,C&&(P=Math.cos(-C),v=Math.sin(-C),W=y*P-it*v,G=N*P-ct*v,nt=O*P-Ct*v,$=k*v+$*P,y=W,N=G,O=nt),C=Er(N,y),_=C*Xi,C&&(P=Math.cos(C),v=Math.sin(C),W=y*P+N*v,G=X*P+B*v,N=N*P-y*v,B=B*P-X*v,y=W,X=G),d&&Math.abs(d)+Math.abs(_)>359.9&&(d=_=0,m=180-m),p=pe(Math.sqrt(y*y+N*N+O*O)),g=pe(Math.sqrt(B*B+j*j)),C=Er(X,B),E=Math.abs(C)>2e-4?C*Xi:0,M=$?1/($<0?-$:$):0),n.svg&&(W=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!hm(en(t,ue)),W&&t.setAttribute("transform",W))),Math.abs(E)>90&&Math.abs(E)<270&&(s?(p*=-1,E+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,E+=E<=0?180:-180)),e=e||n.uncache,n.x=u-((n.xPercent=u&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=h-((n.yPercent=h&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=pe(p),n.scaleY=pe(g),n.rotation=pe(_)+a,n.rotationX=pe(d)+a,n.rotationY=pe(m)+a,n.skewX=E+a,n.skewY=x+a,n.transformPerspective=M+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(r[Ge]=_a(c)),n.xOffset=n.yOffset=0,n.force3D=rn.force3D,n.renderTransform=n.svg?mM:am?fm:pM,n.uncache=0,n},_a=function(t){return(t=t.split(" "))[0]+" "+t[1]},_l=function(t,e,n){var r=Ce(e);return pe(parseFloat(e)+parseFloat(Ci(t,"x",n+"px",r)))+r},pM=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,fm(t,e)},Fi="0deg",Ss="0px",Bi=") ",fm=function(t,e){var n=e||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,f=n.skewX,p=n.skewY,g=n.scaleX,_=n.scaleY,d=n.transformPerspective,m=n.force3D,E=n.target,x=n.zOrigin,M="",w=m==="auto"&&t&&t!==1||m===!0;if(x&&(h!==Fi||u!==Fi)){var A=parseFloat(u)*Wr,S=Math.sin(A),C=Math.cos(A),P;A=parseFloat(h)*Wr,P=Math.cos(A),o=_l(E,o,S*P*-x),a=_l(E,a,-Math.sin(A)*-x),l=_l(E,l,C*P*-x+x)}d!==Ss&&(M+="perspective("+d+Bi),(r||s)&&(M+="translate("+r+"%, "+s+"%) "),(w||o!==Ss||a!==Ss||l!==Ss)&&(M+=l!==Ss||w?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Bi),c!==Fi&&(M+="rotate("+c+Bi),u!==Fi&&(M+="rotateY("+u+Bi),h!==Fi&&(M+="rotateX("+h+Bi),(f!==Fi||p!==Fi)&&(M+="skew("+f+", "+p+Bi),(g!==1||_!==1)&&(M+="scale("+g+", "+_+Bi),E.style[ue]=M||"translate(0, 0)"},mM=function(t,e){var n=e||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,f=n.scaleY,p=n.target,g=n.xOrigin,_=n.yOrigin,d=n.xOffset,m=n.yOffset,E=n.forceCSS,x=parseFloat(o),M=parseFloat(a),w,A,S,C,P;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Wr,c*=Wr,w=Math.cos(l)*h,A=Math.sin(l)*h,S=Math.sin(l-c)*-f,C=Math.cos(l-c)*f,c&&(u*=Wr,P=Math.tan(c-u),P=Math.sqrt(1+P*P),S*=P,C*=P,u&&(P=Math.tan(u),P=Math.sqrt(1+P*P),w*=P,A*=P)),w=pe(w),A=pe(A),S=pe(S),C=pe(C)):(w=h,C=f,A=S=0),(x&&!~(o+"").indexOf("px")||M&&!~(a+"").indexOf("px"))&&(x=Ci(p,"x",o,"px"),M=Ci(p,"y",a,"px")),(g||_||d||m)&&(x=pe(x+g-(g*w+_*S)+d),M=pe(M+_-(g*A+_*C)+m)),(r||s)&&(P=p.getBBox(),x=pe(x+r/100*P.width),M=pe(M+s/100*P.height)),P="matrix("+w+","+A+","+S+","+C+","+x+","+M+")",p.setAttribute("transform",P),E&&(p.style[ue]=P)},_M=function(t,e,n,r,s){var o=360,a=Se(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Xi:1),c=l-r,u=r+c+"deg",h,f;return a&&(h=s.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),h==="cw"&&c<0?c=(c+o*rf)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*rf)%o-~~(c/o)*o)),t._pt=f=new He(t._pt,e,n,r,c,JE),f.e=u,f.u="deg",t._props.push(n),f},hf=function(t,e){for(var n in e)t[n]=e[n];return t},gM=function(t,e,n){var r=hf({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,h,f,p,g;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[ue]=e,a=Ys(n,1),wi(n,ue),n.setAttribute("transform",c)):(c=getComputedStyle(n)[ue],o[ue]=e,a=Ys(n,1),o[ue]=c);for(l in ii)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(p=Ce(c),g=Ce(u),h=p!==g?Ci(n,l,c,g):parseFloat(c),f=parseFloat(u),t._pt=new He(t._pt,a,l,h,f-h,pc),t._pt.u=g||0,t._props.push(l));hf(a,r)};Ve("padding,margin,Width,Radius",function(i,t){var e="Top",n="Right",r="Bottom",s="Left",o=(t<3?[e,n,r,s]:[e+s,e+n,r+n,r+s]).map(function(a){return t<2?i+a:"border"+a+i});ma[t>1?"border"+i:i]=function(a,l,c,u,h){var f,p;if(arguments.length<4)return f=o.map(function(g){return Kn(a,g,c)}),p=f.join(" "),p.split(f[0]).length===5?f[0]:p;f=(u+"").split(" "),p={},o.forEach(function(g,_){return p[g]=f[_]=f[_]||f[(_-1)/2|0]}),a.init(l,p,h)}});var dm={name:"css",register:_c,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,r,s){var o=this._props,a=t.style,l=n.vars.startAt,c,u,h,f,p,g,_,d,m,E,x,M,w,A,S,C,P;zu||_c(),this.styles=this.styles||om(t),C=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(u=e[_],!(Ze[_]&&Kp(_,e,n,r,t,s)))){if(p=typeof u,g=ma[_],p==="function"&&(u=u.call(n,r,t,s),p=typeof u),p==="string"&&~u.indexOf("random(")&&(u=Gs(u)),g)g(this,t,_,u,n)&&(S=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),u+="",Ei.lastIndex=0,Ei.test(c)||(d=Ce(c),m=Ce(u),m?d!==m&&(c=Ci(t,_,c,m)+m):d&&(u+=d)),this.add(a,"setProperty",c,u,r,s,0,0,_),o.push(_),C.push(_,0,a[_]);else if(p!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,r,t,s):l[_],Se(c)&&~c.indexOf("random(")&&(c=Gs(c)),Ce(c+"")||c==="auto"||(c+=rn.units[_]||Ce(Kn(t,_))||""),(c+"").charAt(1)==="="&&(c=Kn(t,_))):c=Kn(t,_),f=parseFloat(c),E=p==="string"&&u.charAt(1)==="="&&u.substr(0,2),E&&(u=u.substr(2)),h=parseFloat(u),_ in Nn&&(_==="autoAlpha"&&(f===1&&Kn(t,"visibility")==="hidden"&&h&&(f=0),C.push("visibility",0,a.visibility),vi(this,a,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),_!=="scale"&&_!=="transform"&&(_=Nn[_],~_.indexOf(",")&&(_=_.split(",")[0]))),x=_ in ii,x){if(this.styles.save(_),P=u,p==="string"&&u.substring(0,6)==="var(--"){if(u=en(t,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var v=t.style.perspective;t.style.perspective=u,u=en(t,"perspective"),v?t.style.perspective=v:wi(t,"perspective")}h=parseFloat(u)}if(M||(w=t._gsap,w.renderTransform&&!e.parseTransform||Ys(t,e.parseTransform),A=e.smoothOrigin!==!1&&w.smooth,M=this._pt=new He(this._pt,a,ue,0,1,w.renderTransform,w,0,-1),M.dep=1),_==="scale")this._pt=new He(this._pt,w,"scaleY",w.scaleY,(E?Hr(w.scaleY,E+h):h)-w.scaleY||0,pc),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){C.push(Ge,0,a[Ge]),u=fM(u),w.svg?gc(t,u,0,A,0,this):(m=parseFloat(u.split(" ")[2])||0,m!==w.zOrigin&&vi(this,w,"zOrigin",w.zOrigin,m),vi(this,a,_,_a(c),_a(u)));continue}else if(_==="svgOrigin"){gc(t,u,1,A,0,this);continue}else if(_ in um){_M(this,w,_,f,E?Hr(f,E+u):u);continue}else if(_==="smoothOrigin"){vi(this,w,"smooth",w.smooth,u);continue}else if(_==="force3D"){w[_]=u;continue}else if(_==="transform"){gM(this,u,t);continue}}else _ in a||(_=ss(_)||_);if(x||(h||h===0)&&(f||f===0)&&!ZE.test(u)&&_ in a)d=(c+"").substr((f+"").length),h||(h=0),m=Ce(u)||(_ in rn.units?rn.units[_]:d),d!==m&&(f=Ci(t,_,c,m)),this._pt=new He(this._pt,x?w:a,_,f,(E?Hr(f,E+h):h)-f,!x&&(m==="px"||_==="zIndex")&&e.autoRound!==!1?eM:pc),this._pt.u=m||0,x&&P!==u?(this._pt.b=c,this._pt.e=P,this._pt.r=tM):d!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=QE);else if(_ in a)hM.call(this,t,_,c,E?E+u:u);else if(_ in t)this.add(t,_,c||t[_],E?E+u:u,r,s);else if(_!=="parseTransform"){Ru(_,u);continue}x||(_ in a?C.push(_,0,a[_]):typeof t[_]=="function"?C.push(_,2,t[_]()):C.push(_,1,c||t[_])),o.push(_)}}S&&em(this)},render:function(t,e){if(e.tween._time||!ku())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Kn,aliases:Nn,getSetter:function(t,e,n){var r=Nn[e];return r&&r.indexOf(",")<0&&(e=r),e in ii&&e!==Ge&&(t._gsap.x||Kn(t,"x"))?n&&nf===n?e==="scale"?sM:rM:(nf=n||{})&&(e==="scale"?oM:aM):t.style&&!Au(t.style[e])?nM:~e.indexOf("-")?iM:Fu(t,e)},core:{_removeProperty:wi,_getMatrix:Hu}};$e.utils.checkPrefix=ss;$e.core.getStyleSaver=om;(function(i,t,e,n){var r=Ve(i+","+t+","+e,function(s){ii[s]=1});Ve(t,function(s){rn.units[s]="deg",um[s]=1}),Nn[r[13]]=i+","+t,Ve(n,function(s){var o=s.split(":");Nn[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Ve("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){rn.units[i]="px"});$e.registerPlugin(dm);var vc=$e.registerPlugin(dm)||$e;vc.core.Tween;/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Gu="169",vM=0,ff=1,xM=2,pm=1,EM=2,Yn=3,Ri=0,We=1,An=2,Mi=0,Xr=1,df=2,pf=3,mf=4,MM=5,qi=100,SM=101,yM=102,TM=103,bM=104,AM=200,wM=201,CM=202,RM=203,xc=204,Ec=205,PM=206,DM=207,LM=208,IM=209,NM=210,OM=211,UM=212,FM=213,BM=214,Mc=0,Sc=1,yc=2,os=3,Tc=4,bc=5,Ac=6,wc=7,mm=0,zM=1,kM=2,Si=0,VM=1,HM=2,GM=3,WM=4,XM=5,$M=6,YM=7,_m=300,as=301,ls=302,Cc=303,Rc=304,Oa=306,Pc=1e3,Qi=1001,Dc=1002,_n=1003,qM=1004,vo=1005,wn=1006,gl=1007,tr=1008,ri=1009,gm=1010,vm=1011,qs=1012,Wu=1013,lr=1014,jn=1015,eo=1016,Xu=1017,$u=1018,cs=1020,xm=35902,Em=1021,Mm=1022,Cn=1023,Sm=1024,ym=1025,$r=1026,us=1027,Tm=1028,Yu=1029,bm=1030,qu=1031,Ku=1033,Jo=33776,Qo=33777,ta=33778,ea=33779,Lc=35840,Ic=35841,Nc=35842,Oc=35843,Uc=36196,Fc=37492,Bc=37496,zc=37808,kc=37809,Vc=37810,Hc=37811,Gc=37812,Wc=37813,Xc=37814,$c=37815,Yc=37816,qc=37817,Kc=37818,jc=37819,Zc=37820,Jc=37821,na=36492,Qc=36494,tu=36495,Am=36283,eu=36284,nu=36285,iu=36286,KM=3200,jM=3201,wm=0,ZM=1,mi="",bn="srgb",Oi="srgb-linear",ju="display-p3",Ua="display-p3-linear",ga="linear",se="srgb",va="rec709",xa="p3",Mr=7680,_f=519,JM=512,QM=513,tS=514,Cm=515,eS=516,nS=517,iS=518,rS=519,gf=35044,vf="300 es",Zn=2e3,Ea=2001;class _s{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Ae=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ia=Math.PI/180,ru=180/Math.PI;function no(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ae[i&255]+Ae[i>>8&255]+Ae[i>>16&255]+Ae[i>>24&255]+"-"+Ae[t&255]+Ae[t>>8&255]+"-"+Ae[t>>16&15|64]+Ae[t>>24&255]+"-"+Ae[e&63|128]+Ae[e>>8&255]+"-"+Ae[e>>16&255]+Ae[e>>24&255]+Ae[n&255]+Ae[n>>8&255]+Ae[n>>16&255]+Ae[n>>24&255]).toLowerCase()}function Fe(i,t,e){return Math.max(t,Math.min(e,i))}function sS(i,t){return(i%t+t)%t}function vl(i,t,e){return(1-e)*i+e*t}function ys(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ue(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Vt{constructor(t=0,e=0){Vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*r+t.x,this.y=s*r+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class It{constructor(t,e,n,r,s,o,a,l,c){It.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,c)}set(t,e,n,r,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],p=n[5],g=n[8],_=r[0],d=r[3],m=r[6],E=r[1],x=r[4],M=r[7],w=r[2],A=r[5],S=r[8];return s[0]=o*_+a*E+l*w,s[3]=o*d+a*x+l*A,s[6]=o*m+a*M+l*S,s[1]=c*_+u*E+h*w,s[4]=c*d+u*x+h*A,s[7]=c*m+u*M+h*S,s[2]=f*_+p*E+g*w,s[5]=f*d+p*x+g*A,s[8]=f*m+p*M+g*S,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*s,p=c*s-o*l,g=e*h+n*f+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(r*c-u*n)*_,t[2]=(a*n-r*o)*_,t[3]=f*_,t[4]=(u*e-r*l)*_,t[5]=(r*s-a*e)*_,t[6]=p*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(xl.makeScale(t,e)),this}rotate(t){return this.premultiply(xl.makeRotation(-t)),this}translate(t,e){return this.premultiply(xl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const xl=new It;function Rm(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ma(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function oS(){const i=Ma("canvas");return i.style.display="block",i}const xf={};function ra(i){i in xf||(xf[i]=!0,console.warn(i))}function aS(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function lS(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function cS(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ef=new It().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Mf=new It().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ts={[Oi]:{transfer:ga,primaries:va,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[bn]:{transfer:se,primaries:va,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ua]:{transfer:ga,primaries:xa,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Mf),fromReference:i=>i.applyMatrix3(Ef)},[ju]:{transfer:se,primaries:xa,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Mf),fromReference:i=>i.applyMatrix3(Ef).convertLinearToSRGB()}},uS=new Set([Oi,Ua]),jt={enabled:!0,_workingColorSpace:Oi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!uS.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Ts[t].toReference,r=Ts[e].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Ts[i].primaries},getTransfer:function(i){return i===mi?ga:Ts[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(Ts[t].luminanceCoefficients)}};function Yr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function El(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Sr;class hS{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Sr===void 0&&(Sr=Ma("canvas")),Sr.width=t.width,Sr.height=t.height;const n=Sr.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Sr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ma("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Yr(s[o]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Yr(e[n]/255)*255):e[n]=Yr(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let fS=0;class Pm{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fS++}),this.uuid=no(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ml(r[o].image)):s.push(Ml(r[o]))}else s=Ml(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Ml(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?hS.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let dS=0;class Xe extends _s{constructor(t=Xe.DEFAULT_IMAGE,e=Xe.DEFAULT_MAPPING,n=Qi,r=Qi,s=wn,o=tr,a=Cn,l=ri,c=Xe.DEFAULT_ANISOTROPY,u=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dS++}),this.uuid=no(),this.name="",this.source=new Pm(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Vt(0,0),this.repeat=new Vt(1,1),this.center=new Vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new It,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_m)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Pc:t.x=t.x-Math.floor(t.x);break;case Qi:t.x=t.x<0?0:1;break;case Dc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Pc:t.y=t.y-Math.floor(t.y);break;case Qi:t.y=t.y<0?0:1;break;case Dc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Xe.DEFAULT_IMAGE=null;Xe.DEFAULT_MAPPING=_m;Xe.DEFAULT_ANISOTROPY=1;class Jt{constructor(t=0,e=0,n=0,r=1){Jt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*r+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],g=l[9],_=l[2],d=l[6],m=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-d)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+d)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,M=(p+1)/2,w=(m+1)/2,A=(u+f)/4,S=(h+_)/4,C=(g+d)/4;return x>M&&x>w?x<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(x),r=A/n,s=S/n):M>w?M<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),n=A/r,s=C/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=S/s,r=C/s),this.set(n,r,s,e),this}let E=Math.sqrt((d-g)*(d-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(E)<.001&&(E=1),this.x=(d-g)/E,this.y=(h-_)/E,this.z=(f-u)/E,this.w=Math.acos((c+p+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pS extends _s{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Jt(0,0,t,e),this.scissorTest=!1,this.viewport=new Jt(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Xe(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Pm(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cr extends pS{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Dm extends Xe{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=_n,this.minFilter=_n,this.wrapR=Qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class mS extends Xe{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=_n,this.minFilter=_n,this.wrapR=Qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class io{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3];const f=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(h!==_||l!==f||c!==p||u!==g){let d=1-a;const m=l*f+c*p+u*g+h*_,E=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const w=Math.sqrt(x),A=Math.atan2(w,m*E);d=Math.sin(d*A)/w,a=Math.sin(a*A)/w}const M=a*E;if(l=l*d+f*M,c=c*d+p*M,u=u*d+g*M,h=h*d+_*M,d===1-a){const w=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=w,c*=w,u*=w,h*=w}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[o],f=s[o+1],p=s[o+2],g=s[o+3];return t[e]=a*g+u*h+l*p-c*f,t[e+1]=l*g+u*f+c*h-a*p,t[e+2]=c*g+u*p+a*f-l*h,t[e+3]=u*g-a*h-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),h=a(s/2),f=l(n/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"YZX":this._x=f*u*h+c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h-f*p*g;break;case"XZY":this._x=f*u*h-c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=n+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(n>a&&n>h){const p=2*Math.sqrt(1+n-a-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-n-h);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-n-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Fe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*r+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Sf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Sf.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*n),u=2*(a*e-s*r),h=2*(s*n-o*e);return this.x=e+l*c+o*h-a*u,this.y=n+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Sl.copy(this).projectOnVector(t),this.sub(Sl)}reflect(t){return this.sub(Sl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Sl=new L,Sf=new io;class ro{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Sn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Sn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Sn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Sn):Sn.fromBufferAttribute(s,o),Sn.applyMatrix4(t.matrixWorld),this.expandByPoint(Sn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),xo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xo.copy(n.boundingBox)),xo.applyMatrix4(t.matrixWorld),this.union(xo)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Sn),Sn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(bs),Eo.subVectors(this.max,bs),yr.subVectors(t.a,bs),Tr.subVectors(t.b,bs),br.subVectors(t.c,bs),ci.subVectors(Tr,yr),ui.subVectors(br,Tr),zi.subVectors(yr,br);let e=[0,-ci.z,ci.y,0,-ui.z,ui.y,0,-zi.z,zi.y,ci.z,0,-ci.x,ui.z,0,-ui.x,zi.z,0,-zi.x,-ci.y,ci.x,0,-ui.y,ui.x,0,-zi.y,zi.x,0];return!yl(e,yr,Tr,br,Eo)||(e=[1,0,0,0,1,0,0,0,1],!yl(e,yr,Tr,br,Eo))?!1:(Mo.crossVectors(ci,ui),e=[Mo.x,Mo.y,Mo.z],yl(e,yr,Tr,br,Eo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Sn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Sn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Hn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Hn=[new L,new L,new L,new L,new L,new L,new L,new L],Sn=new L,xo=new ro,yr=new L,Tr=new L,br=new L,ci=new L,ui=new L,zi=new L,bs=new L,Eo=new L,Mo=new L,ki=new L;function yl(i,t,e,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){ki.fromArray(i,s);const a=r.x*Math.abs(ki.x)+r.y*Math.abs(ki.y)+r.z*Math.abs(ki.z),l=t.dot(ki),c=e.dot(ki),u=n.dot(ki);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const _S=new ro,As=new L,Tl=new L;class so{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):_S.setFromPoints(t).getCenter(n);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;As.subVectors(t,this.center);const e=As.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(As,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Tl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(As.copy(t.center).add(Tl)),this.expandByPoint(As.copy(t.center).sub(Tl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Gn=new L,bl=new L,So=new L,hi=new L,Al=new L,yo=new L,wl=new L;class Zu{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Gn.copy(this.origin).addScaledVector(this.direction,e),Gn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){bl.copy(t).add(e).multiplyScalar(.5),So.copy(e).sub(t).normalize(),hi.copy(this.origin).sub(bl);const s=t.distanceTo(e)*.5,o=-this.direction.dot(So),a=hi.dot(this.direction),l=-hi.dot(So),c=hi.lengthSq(),u=Math.abs(1-o*o);let h,f,p,g;if(u>0)if(h=o*l-a,f=o*a-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,p=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(bl).addScaledVector(So,f),p}intersectSphere(t,e){Gn.subVectors(t.center,this.origin);const n=Gn.dot(this.direction),r=Gn.dot(Gn)-n*n,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,r=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,r=(t.min.x-f.x)*c),u>=0?(s=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Gn)!==null}intersectTriangle(t,e,n,r,s){Al.subVectors(e,t),yo.subVectors(n,t),wl.crossVectors(Al,yo);let o=this.direction.dot(wl),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;hi.subVectors(this.origin,t);const l=a*this.direction.dot(yo.crossVectors(hi,yo));if(l<0)return null;const c=a*this.direction.dot(Al.cross(hi));if(c<0||l+c>o)return null;const u=-a*hi.dot(wl);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class oe{constructor(t,e,n,r,s,o,a,l,c,u,h,f,p,g,_,d){oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,c,u,h,f,p,g,_,d)}set(t,e,n,r,s,o,a,l,c,u,h,f,p,g,_,d){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=r,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=f,m[3]=p,m[7]=g,m[11]=_,m[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/Ar.setFromMatrixColumn(t,0).length(),s=1/Ar.setFromMatrixColumn(t,1).length(),o=1/Ar.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=o*u,p=o*h,g=a*u,_=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=p+g*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,p=l*h,g=c*u,_=c*h;e[0]=f+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=p*a-g,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,p=l*h,g=c*u,_=c*h;e[0]=f-_*a,e[4]=-o*h,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*u,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,p=o*h,g=a*u,_=a*h;e[0]=l*u,e[4]=g*c-p,e[8]=f*c+_,e[1]=l*h,e[5]=_*c+f,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-f*h,e[8]=g*h+p,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*h+g,e[10]=f-_*h}else if(t.order==="XZY"){const f=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+_,e[5]=o*u,e[9]=p*h-g,e[2]=g*h-p,e[6]=a*u,e[10]=_*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(gS,t,vS)}lookAt(t,e,n){const r=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),fi.crossVectors(n,Ke),fi.lengthSq()===0&&(Math.abs(n.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),fi.crossVectors(n,Ke)),fi.normalize(),To.crossVectors(Ke,fi),r[0]=fi.x,r[4]=To.x,r[8]=Ke.x,r[1]=fi.y,r[5]=To.y,r[9]=Ke.y,r[2]=fi.z,r[6]=To.z,r[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],p=n[13],g=n[2],_=n[6],d=n[10],m=n[14],E=n[3],x=n[7],M=n[11],w=n[15],A=r[0],S=r[4],C=r[8],P=r[12],v=r[1],y=r[5],N=r[9],O=r[13],k=r[2],X=r[6],B=r[10],W=r[14],G=r[3],nt=r[7],it=r[11],ct=r[15];return s[0]=o*A+a*v+l*k+c*G,s[4]=o*S+a*y+l*X+c*nt,s[8]=o*C+a*N+l*B+c*it,s[12]=o*P+a*O+l*W+c*ct,s[1]=u*A+h*v+f*k+p*G,s[5]=u*S+h*y+f*X+p*nt,s[9]=u*C+h*N+f*B+p*it,s[13]=u*P+h*O+f*W+p*ct,s[2]=g*A+_*v+d*k+m*G,s[6]=g*S+_*y+d*X+m*nt,s[10]=g*C+_*N+d*B+m*it,s[14]=g*P+_*O+d*W+m*ct,s[3]=E*A+x*v+M*k+w*G,s[7]=E*S+x*y+M*X+w*nt,s[11]=E*C+x*N+M*B+w*it,s[15]=E*P+x*O+M*W+w*ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],p=t[14],g=t[3],_=t[7],d=t[11],m=t[15];return g*(+s*l*h-r*c*h-s*a*f+n*c*f+r*a*p-n*l*p)+_*(+e*l*p-e*c*f+s*o*f-r*o*p+r*c*u-s*l*u)+d*(+e*c*h-e*a*p-s*o*h+n*o*p+s*a*u-n*c*u)+m*(-r*a*u-e*l*h+e*a*f+r*o*h-n*o*f+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],p=t[11],g=t[12],_=t[13],d=t[14],m=t[15],E=h*d*c-_*f*c+_*l*p-a*d*p-h*l*m+a*f*m,x=g*f*c-u*d*c-g*l*p+o*d*p+u*l*m-o*f*m,M=u*_*c-g*h*c+g*a*p-o*_*p-u*a*m+o*h*m,w=g*h*l-u*_*l-g*a*f+o*_*f+u*a*d-o*h*d,A=e*E+n*x+r*M+s*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/A;return t[0]=E*S,t[1]=(_*f*s-h*d*s-_*r*p+n*d*p+h*r*m-n*f*m)*S,t[2]=(a*d*s-_*l*s+_*r*c-n*d*c-a*r*m+n*l*m)*S,t[3]=(h*l*s-a*f*s-h*r*c+n*f*c+a*r*p-n*l*p)*S,t[4]=x*S,t[5]=(u*d*s-g*f*s+g*r*p-e*d*p-u*r*m+e*f*m)*S,t[6]=(g*l*s-o*d*s-g*r*c+e*d*c+o*r*m-e*l*m)*S,t[7]=(o*f*s-u*l*s+u*r*c-e*f*c-o*r*p+e*l*p)*S,t[8]=M*S,t[9]=(g*h*s-u*_*s-g*n*p+e*_*p+u*n*m-e*h*m)*S,t[10]=(o*_*s-g*a*s+g*n*c-e*_*c-o*n*m+e*a*m)*S,t[11]=(u*a*s-o*h*s-u*n*c+e*h*c+o*n*p-e*a*p)*S,t[12]=w*S,t[13]=(u*_*r-g*h*r+g*n*f-e*_*f-u*n*d+e*h*d)*S,t[14]=(g*a*r-o*_*r-g*n*l+e*_*l+o*n*d-e*a*d)*S,t[15]=(o*h*r-u*a*r+u*n*l-e*h*l-o*n*f+e*a*f)*S,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,o){return this.set(1,n,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,h=a+a,f=s*c,p=s*u,g=s*h,_=o*u,d=o*h,m=a*h,E=l*c,x=l*u,M=l*h,w=n.x,A=n.y,S=n.z;return r[0]=(1-(_+m))*w,r[1]=(p+M)*w,r[2]=(g-x)*w,r[3]=0,r[4]=(p-M)*A,r[5]=(1-(f+m))*A,r[6]=(d+E)*A,r[7]=0,r[8]=(g+x)*S,r[9]=(d-E)*S,r[10]=(1-(f+_))*S,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=Ar.set(r[0],r[1],r[2]).length();const o=Ar.set(r[4],r[5],r[6]).length(),a=Ar.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],yn.copy(this);const c=1/s,u=1/o,h=1/a;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=u,yn.elements[5]*=u,yn.elements[6]*=u,yn.elements[8]*=h,yn.elements[9]*=h,yn.elements[10]*=h,e.setFromRotationMatrix(yn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,r,s,o,a=Zn){const l=this.elements,c=2*s/(e-t),u=2*s/(n-r),h=(e+t)/(e-t),f=(n+r)/(n-r);let p,g;if(a===Zn)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Ea)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,o,a=Zn){const l=this.elements,c=1/(e-t),u=1/(n-r),h=1/(o-s),f=(e+t)*c,p=(n+r)*u;let g,_;if(a===Zn)g=(o+s)*h,_=-2*h;else if(a===Ea)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ar=new L,yn=new oe,gS=new L(0,0,0),vS=new L(1,1,1),fi=new L,To=new L,Ke=new L,yf=new oe,Tf=new io;class kn{constructor(t=0,e=0,n=0,r=kn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(Fe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Fe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Fe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Fe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Fe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return yf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(yf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Tf.setFromEuler(this),this.setFromQuaternion(Tf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kn.DEFAULT_ORDER="XYZ";class Lm{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let xS=0;const bf=new L,wr=new io,Wn=new oe,bo=new L,ws=new L,ES=new L,MS=new io,Af=new L(1,0,0),wf=new L(0,1,0),Cf=new L(0,0,1),Rf={type:"added"},SS={type:"removed"},Cr={type:"childadded",child:null},Cl={type:"childremoved",child:null};class Me extends _s{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xS++}),this.uuid=no(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Me.DEFAULT_UP.clone();const t=new L,e=new kn,n=new io,r=new L(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new oe},normalMatrix:{value:new It}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=Me.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return wr.setFromAxisAngle(t,e),this.quaternion.multiply(wr),this}rotateOnWorldAxis(t,e){return wr.setFromAxisAngle(t,e),this.quaternion.premultiply(wr),this}rotateX(t){return this.rotateOnAxis(Af,t)}rotateY(t){return this.rotateOnAxis(wf,t)}rotateZ(t){return this.rotateOnAxis(Cf,t)}translateOnAxis(t,e){return bf.copy(t).applyQuaternion(this.quaternion),this.position.add(bf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Af,t)}translateY(t){return this.translateOnAxis(wf,t)}translateZ(t){return this.translateOnAxis(Cf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?bo.copy(t):bo.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(ws,bo,this.up):Wn.lookAt(bo,ws,this.up),this.quaternion.setFromRotationMatrix(Wn),r&&(Wn.extractRotation(r.matrixWorld),wr.setFromRotationMatrix(Wn),this.quaternion.premultiply(wr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Rf),Cr.child=t,this.dispatchEvent(Cr),Cr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(SS),Cl.child=t,this.dispatchEvent(Cl),Cl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Rf),Cr.child=t,this.dispatchEvent(Cr),Cr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,t,ES),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,MS,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}Me.DEFAULT_UP=new L(0,1,0);Me.DEFAULT_MATRIX_AUTO_UPDATE=!0;Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Tn=new L,Xn=new L,Rl=new L,$n=new L,Rr=new L,Pr=new L,Pf=new L,Pl=new L,Dl=new L,Ll=new L,Il=new Jt,Nl=new Jt,Ol=new Jt;class dn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Tn.subVectors(t,e),r.cross(Tn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Tn.subVectors(r,e),Xn.subVectors(n,e),Rl.subVectors(t,e);const o=Tn.dot(Tn),a=Tn.dot(Xn),l=Tn.dot(Rl),c=Xn.dot(Xn),u=Xn.dot(Rl),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,p=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-p-g,g,p)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(t,e,n,r,s,o,a,l){return this.getBarycoord(t,e,n,r,$n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,$n.x),l.addScaledVector(o,$n.y),l.addScaledVector(a,$n.z),l)}static getInterpolatedAttribute(t,e,n,r,s,o){return Il.setScalar(0),Nl.setScalar(0),Ol.setScalar(0),Il.fromBufferAttribute(t,e),Nl.fromBufferAttribute(t,n),Ol.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(Il,s.x),o.addScaledVector(Nl,s.y),o.addScaledVector(Ol,s.z),o}static isFrontFacing(t,e,n,r){return Tn.subVectors(n,e),Xn.subVectors(t,e),Tn.cross(Xn).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Tn.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),Tn.cross(Xn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return dn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return dn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return dn.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return dn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return dn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let o,a;Rr.subVectors(r,n),Pr.subVectors(s,n),Pl.subVectors(t,n);const l=Rr.dot(Pl),c=Pr.dot(Pl);if(l<=0&&c<=0)return e.copy(n);Dl.subVectors(t,r);const u=Rr.dot(Dl),h=Pr.dot(Dl);if(u>=0&&h<=u)return e.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(Rr,o);Ll.subVectors(t,s);const p=Rr.dot(Ll),g=Pr.dot(Ll);if(g>=0&&p<=g)return e.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Pr,a);const d=u*g-p*h;if(d<=0&&h-u>=0&&p-g>=0)return Pf.subVectors(s,r),a=(h-u)/(h-u+(p-g)),e.copy(r).addScaledVector(Pf,a);const m=1/(d+_+f);return o=_*m,a=f*m,e.copy(n).addScaledVector(Rr,o).addScaledVector(Pr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Im={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},di={h:0,s:0,l:0},Ao={h:0,s:0,l:0};function Ul(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ut{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=bn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=jt.workingColorSpace){if(t=sS(t,1),e=Fe(e,0,1),n=Fe(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Ul(o,s,t+1/3),this.g=Ul(o,s,t),this.b=Ul(o,s,t-1/3)}return jt.toWorkingColorSpace(this,r),this}setStyle(t,e=bn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=bn){const n=Im[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Yr(t.r),this.g=Yr(t.g),this.b=Yr(t.b),this}copyLinearToSRGB(t){return this.r=El(t.r),this.g=El(t.g),this.b=El(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=bn){return jt.fromWorkingColorSpace(we.copy(this),t),Math.round(Fe(we.r*255,0,255))*65536+Math.round(Fe(we.g*255,0,255))*256+Math.round(Fe(we.b*255,0,255))}getHexString(t=bn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(we.copy(this),e);const n=we.r,r=we.g,s=we.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(we.copy(this),e),t.r=we.r,t.g=we.g,t.b=we.b,t}getStyle(t=bn){jt.fromWorkingColorSpace(we.copy(this),t);const e=we.r,n=we.g,r=we.b;return t!==bn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(di),this.setHSL(di.h+t,di.s+e,di.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(di),t.getHSL(Ao);const n=vl(di.h,Ao.h,e),r=vl(di.s,Ao.s,e),s=vl(di.l,Ao.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const we=new Ut;Ut.NAMES=Im;let yS=0;class mr extends _s{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yS++}),this.uuid=no(),this.name="",this.type="Material",this.blending=Xr,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xc,this.blendDst=Ec,this.blendEquation=qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ut(0,0,0),this.blendAlpha=0,this.depthFunc=os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_f,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mr,this.stencilZFail=Mr,this.stencilZPass=Mr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Xr&&(n.blending=this.blending),this.side!==Ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xc&&(n.blendSrc=this.blendSrc),this.blendDst!==Ec&&(n.blendDst=this.blendDst),this.blendEquation!==qi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==os&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_f&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Mr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Mr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Mr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class si extends mr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=mm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new L,wo=new Vt;class Fn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=gf,this.updateRanges=[],this.gpuType=jn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)wo.fromBufferAttribute(this,e),wo.applyMatrix3(t),this.setXY(e,wo.x,wo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ys(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ue(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ys(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ys(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ys(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ys(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),r=Ue(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),r=Ue(r,this.array),s=Ue(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==gf&&(t.usage=this.usage),t}}class Nm extends Fn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Om extends Fn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Qt extends Fn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let TS=0;const hn=new oe,Fl=new Me,Dr=new L,je=new ro,Cs=new ro,Ee=new L;class ye extends _s{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:TS++}),this.uuid=no(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Rm(t)?Om:Nm)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new It().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return hn.makeRotationFromQuaternion(t),this.applyMatrix4(hn),this}rotateX(t){return hn.makeRotationX(t),this.applyMatrix4(hn),this}rotateY(t){return hn.makeRotationY(t),this.applyMatrix4(hn),this}rotateZ(t){return hn.makeRotationZ(t),this.applyMatrix4(hn),this}translate(t,e,n){return hn.makeTranslation(t,e,n),this.applyMatrix4(hn),this}scale(t,e,n){return hn.makeScale(t,e,n),this.applyMatrix4(hn),this}lookAt(t){return Fl.lookAt(t),Fl.updateMatrix(),this.applyMatrix4(Fl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Dr).negate(),this.translate(Dr.x,Dr.y,Dr.z),this}setFromPoints(t){const e=[];for(let n=0,r=t.length;n<r;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Qt(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ro);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];je.setFromBufferAttribute(s),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new so);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Cs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ee.addVectors(je.min,Cs.min),je.expandByPoint(Ee),Ee.addVectors(je.max,Cs.max),je.expandByPoint(Ee)):(je.expandByPoint(Cs.min),je.expandByPoint(Cs.max))}je.getCenter(n);let r=0;for(let s=0,o=t.count;s<o;s++)Ee.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(Ee));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ee.fromBufferAttribute(a,c),l&&(Dr.fromBufferAttribute(t,c),Ee.add(Dr)),r=Math.max(r,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Fn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new L,l[C]=new L;const c=new L,u=new L,h=new L,f=new Vt,p=new Vt,g=new Vt,_=new L,d=new L;function m(C,P,v){c.fromBufferAttribute(n,C),u.fromBufferAttribute(n,P),h.fromBufferAttribute(n,v),f.fromBufferAttribute(s,C),p.fromBufferAttribute(s,P),g.fromBufferAttribute(s,v),u.sub(c),h.sub(c),p.sub(f),g.sub(f);const y=1/(p.x*g.y-g.x*p.y);isFinite(y)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(y),d.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(y),a[C].add(_),a[P].add(_),a[v].add(_),l[C].add(d),l[P].add(d),l[v].add(d))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let C=0,P=E.length;C<P;++C){const v=E[C],y=v.start,N=v.count;for(let O=y,k=y+N;O<k;O+=3)m(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const x=new L,M=new L,w=new L,A=new L;function S(C){w.fromBufferAttribute(r,C),A.copy(w);const P=a[C];x.copy(P),x.sub(w.multiplyScalar(w.dot(P))).normalize(),M.crossVectors(A,P);const y=M.dot(l[C])<0?-1:1;o.setXYZW(C,x.x,x.y,x.z,y)}for(let C=0,P=E.length;C<P;++C){const v=E[C],y=v.start,N=v.count;for(let O=y,k=y+N;O<k;O+=3)S(t.getX(O+0)),S(t.getX(O+1)),S(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Fn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const r=new L,s=new L,o=new L,a=new L,l=new L,c=new L,u=new L,h=new L;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),_=t.getX(f+1),d=t.getX(f+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,d),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,d),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(d,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let p=0,g=0;for(let _=0,d=l.length;_<d;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let m=0;m<u;m++)f[g++]=c[p++]}return new Fn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ye,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=t(f,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Df=new oe,Vi=new Zu,Co=new so,Lf=new L,Ro=new L,Po=new L,Do=new L,Bl=new L,Lo=new L,If=new L,Io=new L;class Gt extends Me{constructor(t=new ye,e=new si){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Lo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(Bl.fromBufferAttribute(h,t),o?Lo.addScaledVector(Bl,u):Lo.addScaledVector(Bl.sub(e),u))}e.add(Lo)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Co.copy(n.boundingSphere),Co.applyMatrix4(s),Vi.copy(t.ray).recast(t.near),!(Co.containsPoint(Vi.origin)===!1&&(Vi.intersectSphere(Co,Lf)===null||Vi.origin.distanceToSquared(Lf)>(t.far-t.near)**2))&&(Df.copy(s).invert(),Vi.copy(t.ray).applyMatrix4(Df),!(n.boundingBox!==null&&Vi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Vi)))}_computeIntersections(t,e,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const d=f[g],m=o[d.materialIndex],E=Math.max(d.start,p.start),x=Math.min(a.count,Math.min(d.start+d.count,p.start+p.count));for(let M=E,w=x;M<w;M+=3){const A=a.getX(M),S=a.getX(M+1),C=a.getX(M+2);r=No(this,m,t,n,c,u,h,A,S,C),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=d.materialIndex,e.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let d=g,m=_;d<m;d+=3){const E=a.getX(d),x=a.getX(d+1),M=a.getX(d+2);r=No(this,o,t,n,c,u,h,E,x,M),r&&(r.faceIndex=Math.floor(d/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const d=f[g],m=o[d.materialIndex],E=Math.max(d.start,p.start),x=Math.min(l.count,Math.min(d.start+d.count,p.start+p.count));for(let M=E,w=x;M<w;M+=3){const A=M,S=M+1,C=M+2;r=No(this,m,t,n,c,u,h,A,S,C),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=d.materialIndex,e.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let d=g,m=_;d<m;d+=3){const E=d,x=d+1,M=d+2;r=No(this,o,t,n,c,u,h,E,x,M),r&&(r.faceIndex=Math.floor(d/3),e.push(r))}}}}function bS(i,t,e,n,r,s,o,a){let l;if(t.side===We?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,t.side===Ri,a),l===null)return null;Io.copy(a),Io.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Io);return c<e.near||c>e.far?null:{distance:c,point:Io.clone(),object:i}}function No(i,t,e,n,r,s,o,a,l,c){i.getVertexPosition(a,Ro),i.getVertexPosition(l,Po),i.getVertexPosition(c,Do);const u=bS(i,t,e,n,Ro,Po,Do,If);if(u){const h=new L;dn.getBarycoord(If,Ro,Po,Do,h),r&&(u.uv=dn.getInterpolatedAttribute(r,a,l,c,h,new Vt)),s&&(u.uv1=dn.getInterpolatedAttribute(s,a,l,c,h,new Vt)),o&&(u.normal=dn.getInterpolatedAttribute(o,a,l,c,h,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new L,materialIndex:0};dn.getNormal(Ro,Po,Do,f.normal),u.face=f,u.barycoord=h}return u}class nn extends ye{constructor(t=1,e=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,r,o,2),g("x","z","y",1,-1,t,n,-e,r,o,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Qt(c,3)),this.setAttribute("normal",new Qt(u,3)),this.setAttribute("uv",new Qt(h,2));function g(_,d,m,E,x,M,w,A,S,C,P){const v=M/S,y=w/C,N=M/2,O=w/2,k=A/2,X=S+1,B=C+1;let W=0,G=0;const nt=new L;for(let it=0;it<B;it++){const ct=it*y-O;for(let Ct=0;Ct<X;Ct++){const Nt=Ct*v-N;nt[_]=Nt*E,nt[d]=ct*x,nt[m]=k,c.push(nt.x,nt.y,nt.z),nt[_]=0,nt[d]=0,nt[m]=A>0?1:-1,u.push(nt.x,nt.y,nt.z),h.push(Ct/S),h.push(1-it/C),W+=1}}for(let it=0;it<C;it++)for(let ct=0;ct<S;ct++){const Ct=f+ct+X*it,Nt=f+ct+X*(it+1),$=f+(ct+1)+X*(it+1),j=f+(ct+1)+X*it;l.push(Ct,Nt,j),l.push(Nt,$,j),G+=6}a.addGroup(p,G,P),p+=G,f+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function hs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function De(i){const t={};for(let e=0;e<i.length;e++){const n=hs(i[e]);for(const r in n)t[r]=n[r]}return t}function AS(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Um(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const wS={clone:hs,merge:De};var CS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,RS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pi extends mr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=CS,this.fragmentShader=RS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=hs(t.uniforms),this.uniformsGroups=AS(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Fm extends Me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=Zn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const pi=new L,Nf=new Vt,Of=new Vt;class Je extends Fm{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ru*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ia*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ru*2*Math.atan(Math.tan(ia*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(pi.x,pi.y).multiplyScalar(-t/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pi.x,pi.y).multiplyScalar(-t/pi.z)}getViewSize(t,e){return this.getViewBounds(t,Nf,Of),e.subVectors(Of,Nf)}setViewOffset(t,e,n,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ia*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Lr=-90,Ir=1;class PS extends Me{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Je(Lr,Ir,t,e);r.layers=this.layers,this.add(r);const s=new Je(Lr,Ir,t,e);s.layers=this.layers,this.add(s);const o=new Je(Lr,Ir,t,e);o.layers=this.layers,this.add(o);const a=new Je(Lr,Ir,t,e);a.layers=this.layers,this.add(a);const l=new Je(Lr,Ir,t,e);l.layers=this.layers,this.add(l);const c=new Je(Lr,Ir,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Zn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ea)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,o),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(h,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Bm extends Xe{constructor(t,e,n,r,s,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:as,super(t,e,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class DS extends cr{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Bm(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:wn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new nn(5,5,5),s=new Pi({name:"CubemapFromEquirect",uniforms:hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:We,blending:Mi});s.uniforms.tEquirect.value=e;const o=new Gt(r,s),a=e.minFilter;return e.minFilter===tr&&(e.minFilter=wn),new PS(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,r);t.setRenderTarget(s)}}const zl=new L,LS=new L,IS=new It;class $i{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=zl.subVectors(n,e).cross(LS.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(zl),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||IS.getNormalMatrix(t),r=this.coplanarPoint(zl).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hi=new so,Oo=new L;class Ju{constructor(t=new $i,e=new $i,n=new $i,r=new $i,s=new $i,o=new $i){this.planes=[t,e,n,r,s,o]}set(t,e,n,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Zn){const n=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],h=r[6],f=r[7],p=r[8],g=r[9],_=r[10],d=r[11],m=r[12],E=r[13],x=r[14],M=r[15];if(n[0].setComponents(l-s,f-c,d-p,M-m).normalize(),n[1].setComponents(l+s,f+c,d+p,M+m).normalize(),n[2].setComponents(l+o,f+u,d+g,M+E).normalize(),n[3].setComponents(l-o,f-u,d-g,M-E).normalize(),n[4].setComponents(l-a,f-h,d-_,M-x).normalize(),e===Zn)n[5].setComponents(l+a,f+h,d+_,M+x).normalize();else if(e===Ea)n[5].setComponents(a,h,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(t){return Hi.center.set(0,0,0),Hi.radius=.7071067811865476,Hi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(Oo.x=r.normal.x>0?t.max.x:t.min.x,Oo.y=r.normal.y>0?t.max.y:t.min.y,Oo.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Oo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function zm(){let i=null,t=!1,e=null,n=null;function r(s,o){e(s,o),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function NS(i){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,a),h.length===0)i.bufferSubData(c,0,u);else{h.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<h.length;p++){const g=h[f],_=h[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let p=0,g=h.length;p<g;p++){const _=h[p];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class gs extends ye{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,h=t/a,f=e/l,p=[],g=[],_=[],d=[];for(let m=0;m<u;m++){const E=m*f-o;for(let x=0;x<c;x++){const M=x*h-s;g.push(M,-E,0),_.push(0,0,1),d.push(x/a),d.push(1-m/l)}}for(let m=0;m<l;m++)for(let E=0;E<a;E++){const x=E+c*m,M=E+c*(m+1),w=E+1+c*(m+1),A=E+1+c*m;p.push(x,M,A),p.push(M,w,A)}this.setIndex(p),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gs(t.width,t.height,t.widthSegments,t.heightSegments)}}var OS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,US=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,FS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,BS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,VS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,HS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,GS=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,WS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,XS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$S=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,YS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,qS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,KS=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,jS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ZS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,JS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,QS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ty=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ey=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ny=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,iy=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ry=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,sy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,oy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ay=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ly=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hy="gl_FragColor = linearToOutputTexel( gl_FragColor );",fy=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,py=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,my=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_y=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ey=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,My=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,yy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ty=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,by=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ay=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,wy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Cy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ry=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Py=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ly=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Iy=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ny=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Oy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Uy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,By=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ky=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Wy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$y=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ky=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jy=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Zy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,tT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,iT=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,oT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,aT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cT=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,uT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_T=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,gT=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,xT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ET=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,MT=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ST=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,TT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,AT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,CT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,RT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,PT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,DT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,LT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,IT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const NT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,OT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,UT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,FT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,VT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,HT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,GT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,WT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,XT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$T=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,YT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,KT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ZT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,QT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,eb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,nb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ib=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ob=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ab=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,cb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ub=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,fb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,db=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Lt={alphahash_fragment:OS,alphahash_pars_fragment:US,alphamap_fragment:FS,alphamap_pars_fragment:BS,alphatest_fragment:zS,alphatest_pars_fragment:kS,aomap_fragment:VS,aomap_pars_fragment:HS,batching_pars_vertex:GS,batching_vertex:WS,begin_vertex:XS,beginnormal_vertex:$S,bsdfs:YS,iridescence_fragment:qS,bumpmap_pars_fragment:KS,clipping_planes_fragment:jS,clipping_planes_pars_fragment:ZS,clipping_planes_pars_vertex:JS,clipping_planes_vertex:QS,color_fragment:ty,color_pars_fragment:ey,color_pars_vertex:ny,color_vertex:iy,common:ry,cube_uv_reflection_fragment:sy,defaultnormal_vertex:oy,displacementmap_pars_vertex:ay,displacementmap_vertex:ly,emissivemap_fragment:cy,emissivemap_pars_fragment:uy,colorspace_fragment:hy,colorspace_pars_fragment:fy,envmap_fragment:dy,envmap_common_pars_fragment:py,envmap_pars_fragment:my,envmap_pars_vertex:_y,envmap_physical_pars_fragment:wy,envmap_vertex:gy,fog_vertex:vy,fog_pars_vertex:xy,fog_fragment:Ey,fog_pars_fragment:My,gradientmap_pars_fragment:Sy,lightmap_pars_fragment:yy,lights_lambert_fragment:Ty,lights_lambert_pars_fragment:by,lights_pars_begin:Ay,lights_toon_fragment:Cy,lights_toon_pars_fragment:Ry,lights_phong_fragment:Py,lights_phong_pars_fragment:Dy,lights_physical_fragment:Ly,lights_physical_pars_fragment:Iy,lights_fragment_begin:Ny,lights_fragment_maps:Oy,lights_fragment_end:Uy,logdepthbuf_fragment:Fy,logdepthbuf_pars_fragment:By,logdepthbuf_pars_vertex:zy,logdepthbuf_vertex:ky,map_fragment:Vy,map_pars_fragment:Hy,map_particle_fragment:Gy,map_particle_pars_fragment:Wy,metalnessmap_fragment:Xy,metalnessmap_pars_fragment:$y,morphinstance_vertex:Yy,morphcolor_vertex:qy,morphnormal_vertex:Ky,morphtarget_pars_vertex:jy,morphtarget_vertex:Zy,normal_fragment_begin:Jy,normal_fragment_maps:Qy,normal_pars_fragment:tT,normal_pars_vertex:eT,normal_vertex:nT,normalmap_pars_fragment:iT,clearcoat_normal_fragment_begin:rT,clearcoat_normal_fragment_maps:sT,clearcoat_pars_fragment:oT,iridescence_pars_fragment:aT,opaque_fragment:lT,packing:cT,premultiplied_alpha_fragment:uT,project_vertex:hT,dithering_fragment:fT,dithering_pars_fragment:dT,roughnessmap_fragment:pT,roughnessmap_pars_fragment:mT,shadowmap_pars_fragment:_T,shadowmap_pars_vertex:gT,shadowmap_vertex:vT,shadowmask_pars_fragment:xT,skinbase_vertex:ET,skinning_pars_vertex:MT,skinning_vertex:ST,skinnormal_vertex:yT,specularmap_fragment:TT,specularmap_pars_fragment:bT,tonemapping_fragment:AT,tonemapping_pars_fragment:wT,transmission_fragment:CT,transmission_pars_fragment:RT,uv_pars_fragment:PT,uv_pars_vertex:DT,uv_vertex:LT,worldpos_vertex:IT,background_vert:NT,background_frag:OT,backgroundCube_vert:UT,backgroundCube_frag:FT,cube_vert:BT,cube_frag:zT,depth_vert:kT,depth_frag:VT,distanceRGBA_vert:HT,distanceRGBA_frag:GT,equirect_vert:WT,equirect_frag:XT,linedashed_vert:$T,linedashed_frag:YT,meshbasic_vert:qT,meshbasic_frag:KT,meshlambert_vert:jT,meshlambert_frag:ZT,meshmatcap_vert:JT,meshmatcap_frag:QT,meshnormal_vert:tb,meshnormal_frag:eb,meshphong_vert:nb,meshphong_frag:ib,meshphysical_vert:rb,meshphysical_frag:sb,meshtoon_vert:ob,meshtoon_frag:ab,points_vert:lb,points_frag:cb,shadow_vert:ub,shadow_frag:hb,sprite_vert:fb,sprite_frag:db},st={common:{diffuse:{value:new Ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new It}},envmap:{envMap:{value:null},envMapRotation:{value:new It},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new It}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new It}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new It},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new It},normalScale:{value:new Vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new It},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new It}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new It}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new It}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0},uvTransform:{value:new It}},sprite:{diffuse:{value:new Ut(16777215)},opacity:{value:1},center:{value:new Vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}}},Ln={basic:{uniforms:De([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:Lt.meshbasic_vert,fragmentShader:Lt.meshbasic_frag},lambert:{uniforms:De([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Ut(0)}}]),vertexShader:Lt.meshlambert_vert,fragmentShader:Lt.meshlambert_frag},phong:{uniforms:De([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Ut(0)},specular:{value:new Ut(1118481)},shininess:{value:30}}]),vertexShader:Lt.meshphong_vert,fragmentShader:Lt.meshphong_frag},standard:{uniforms:De([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new Ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Lt.meshphysical_vert,fragmentShader:Lt.meshphysical_frag},toon:{uniforms:De([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new Ut(0)}}]),vertexShader:Lt.meshtoon_vert,fragmentShader:Lt.meshtoon_frag},matcap:{uniforms:De([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:Lt.meshmatcap_vert,fragmentShader:Lt.meshmatcap_frag},points:{uniforms:De([st.points,st.fog]),vertexShader:Lt.points_vert,fragmentShader:Lt.points_frag},dashed:{uniforms:De([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Lt.linedashed_vert,fragmentShader:Lt.linedashed_frag},depth:{uniforms:De([st.common,st.displacementmap]),vertexShader:Lt.depth_vert,fragmentShader:Lt.depth_frag},normal:{uniforms:De([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:Lt.meshnormal_vert,fragmentShader:Lt.meshnormal_frag},sprite:{uniforms:De([st.sprite,st.fog]),vertexShader:Lt.sprite_vert,fragmentShader:Lt.sprite_frag},background:{uniforms:{uvTransform:{value:new It},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Lt.background_vert,fragmentShader:Lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new It}},vertexShader:Lt.backgroundCube_vert,fragmentShader:Lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Lt.cube_vert,fragmentShader:Lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Lt.equirect_vert,fragmentShader:Lt.equirect_frag},distanceRGBA:{uniforms:De([st.common,st.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Lt.distanceRGBA_vert,fragmentShader:Lt.distanceRGBA_frag},shadow:{uniforms:De([st.lights,st.fog,{color:{value:new Ut(0)},opacity:{value:1}}]),vertexShader:Lt.shadow_vert,fragmentShader:Lt.shadow_frag}};Ln.physical={uniforms:De([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new It},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new It},clearcoatNormalScale:{value:new Vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new It},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new It},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new It},sheen:{value:0},sheenColor:{value:new Ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new It},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new It},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new It},transmissionSamplerSize:{value:new Vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new It},attenuationDistance:{value:0},attenuationColor:{value:new Ut(0)},specularColor:{value:new Ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new It},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new It},anisotropyVector:{value:new Vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new It}}]),vertexShader:Lt.meshphysical_vert,fragmentShader:Lt.meshphysical_frag};const Uo={r:0,b:0,g:0},Gi=new kn,pb=new oe;function mb(i,t,e,n,r,s,o){const a=new Ut(0);let l=s===!0?0:1,c,u,h=null,f=0,p=null;function g(E){let x=E.isScene===!0?E.background:null;return x&&x.isTexture&&(x=(E.backgroundBlurriness>0?e:t).get(x)),x}function _(E){let x=!1;const M=g(E);M===null?m(a,l):M&&M.isColor&&(m(M,1),x=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function d(E,x){const M=g(x);M&&(M.isCubeTexture||M.mapping===Oa)?(u===void 0&&(u=new Gt(new nn(1,1,1),new Pi({name:"BackgroundCubeMaterial",uniforms:hs(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,A,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Gi.copy(x.backgroundRotation),Gi.x*=-1,Gi.y*=-1,Gi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Gi.y*=-1,Gi.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(pb.makeRotationFromEuler(Gi)),u.material.toneMapped=jt.getTransfer(M.colorSpace)!==se,(h!==M||f!==M.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=M,f=M.version,p=i.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Gt(new gs(2,2),new Pi({name:"BackgroundMaterial",uniforms:hs(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=jt.getTransfer(M.colorSpace)!==se,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,f=M.version,p=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function m(E,x){E.getRGB(Uo,Um(i)),n.buffers.color.setClear(Uo.r,Uo.g,Uo.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(E,x=1){a.set(E),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,m(a,l)},render:_,addToRenderList:d}}function _b(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,o=!1;function a(v,y,N,O,k){let X=!1;const B=h(O,N,y);s!==B&&(s=B,c(s.object)),X=p(v,O,N,k),X&&g(v,O,N,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,M(v,y,N,O),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return i.createVertexArray()}function c(v){return i.bindVertexArray(v)}function u(v){return i.deleteVertexArray(v)}function h(v,y,N){const O=N.wireframe===!0;let k=n[v.id];k===void 0&&(k={},n[v.id]=k);let X=k[y.id];X===void 0&&(X={},k[y.id]=X);let B=X[O];return B===void 0&&(B=f(l()),X[O]=B),B}function f(v){const y=[],N=[],O=[];for(let k=0;k<e;k++)y[k]=0,N[k]=0,O[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:N,attributeDivisors:O,object:v,attributes:{},index:null}}function p(v,y,N,O){const k=s.attributes,X=y.attributes;let B=0;const W=N.getAttributes();for(const G in W)if(W[G].location>=0){const it=k[G];let ct=X[G];if(ct===void 0&&(G==="instanceMatrix"&&v.instanceMatrix&&(ct=v.instanceMatrix),G==="instanceColor"&&v.instanceColor&&(ct=v.instanceColor)),it===void 0||it.attribute!==ct||ct&&it.data!==ct.data)return!0;B++}return s.attributesNum!==B||s.index!==O}function g(v,y,N,O){const k={},X=y.attributes;let B=0;const W=N.getAttributes();for(const G in W)if(W[G].location>=0){let it=X[G];it===void 0&&(G==="instanceMatrix"&&v.instanceMatrix&&(it=v.instanceMatrix),G==="instanceColor"&&v.instanceColor&&(it=v.instanceColor));const ct={};ct.attribute=it,it&&it.data&&(ct.data=it.data),k[G]=ct,B++}s.attributes=k,s.attributesNum=B,s.index=O}function _(){const v=s.newAttributes;for(let y=0,N=v.length;y<N;y++)v[y]=0}function d(v){m(v,0)}function m(v,y){const N=s.newAttributes,O=s.enabledAttributes,k=s.attributeDivisors;N[v]=1,O[v]===0&&(i.enableVertexAttribArray(v),O[v]=1),k[v]!==y&&(i.vertexAttribDivisor(v,y),k[v]=y)}function E(){const v=s.newAttributes,y=s.enabledAttributes;for(let N=0,O=y.length;N<O;N++)y[N]!==v[N]&&(i.disableVertexAttribArray(N),y[N]=0)}function x(v,y,N,O,k,X,B){B===!0?i.vertexAttribIPointer(v,y,N,k,X):i.vertexAttribPointer(v,y,N,O,k,X)}function M(v,y,N,O){_();const k=O.attributes,X=N.getAttributes(),B=y.defaultAttributeValues;for(const W in X){const G=X[W];if(G.location>=0){let nt=k[W];if(nt===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(nt=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(nt=v.instanceColor)),nt!==void 0){const it=nt.normalized,ct=nt.itemSize,Ct=t.get(nt);if(Ct===void 0)continue;const Nt=Ct.buffer,$=Ct.type,j=Ct.bytesPerElement,dt=$===i.INT||$===i.UNSIGNED_INT||nt.gpuType===Wu;if(nt.isInterleavedBufferAttribute){const ot=nt.data,St=ot.stride,yt=nt.offset;if(ot.isInstancedInterleavedBuffer){for(let Ft=0;Ft<G.locationSize;Ft++)m(G.location+Ft,ot.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Ft=0;Ft<G.locationSize;Ft++)d(G.location+Ft);i.bindBuffer(i.ARRAY_BUFFER,Nt);for(let Ft=0;Ft<G.locationSize;Ft++)x(G.location+Ft,ct/G.locationSize,$,it,St*j,(yt+ct/G.locationSize*Ft)*j,dt)}else{if(nt.isInstancedBufferAttribute){for(let ot=0;ot<G.locationSize;ot++)m(G.location+ot,nt.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let ot=0;ot<G.locationSize;ot++)d(G.location+ot);i.bindBuffer(i.ARRAY_BUFFER,Nt);for(let ot=0;ot<G.locationSize;ot++)x(G.location+ot,ct/G.locationSize,$,it,ct*j,ct/G.locationSize*ot*j,dt)}}else if(B!==void 0){const it=B[W];if(it!==void 0)switch(it.length){case 2:i.vertexAttrib2fv(G.location,it);break;case 3:i.vertexAttrib3fv(G.location,it);break;case 4:i.vertexAttrib4fv(G.location,it);break;default:i.vertexAttrib1fv(G.location,it)}}}}E()}function w(){C();for(const v in n){const y=n[v];for(const N in y){const O=y[N];for(const k in O)u(O[k].object),delete O[k];delete y[N]}delete n[v]}}function A(v){if(n[v.id]===void 0)return;const y=n[v.id];for(const N in y){const O=y[N];for(const k in O)u(O[k].object),delete O[k];delete y[N]}delete n[v.id]}function S(v){for(const y in n){const N=n[y];if(N[v.id]===void 0)continue;const O=N[v.id];for(const k in O)u(O[k].object),delete O[k];delete N[v.id]}}function C(){P(),o=!0,s!==r&&(s=r,c(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:C,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfProgram:S,initAttributes:_,enableAttribute:d,disableUnusedAttributes:E}}function gb(i,t,e){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function o(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),e.update(u,n,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];e.update(p,n,1)}function l(c,u,h,f){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_];for(let _=0;_<f.length;_++)e.update(g,n,f[_])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function vb(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const S=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(S){return!(S!==Cn&&n.convert(S)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(S){const C=S===eo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(S!==ri&&n.convert(S)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==jn&&!C)}function l(S){if(S==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(f===!0){const S=t.get("EXT_clip_control");S.clipControlEXT(S.LOWER_LEFT_EXT,S.ZERO_TO_ONE_EXT)}const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),d=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:d,maxAttributes:m,maxVertexUniforms:E,maxVaryings:x,maxFragmentUniforms:M,vertexTextures:w,maxSamples:A}}function xb(i){const t=this;let e=null,n=0,r=!1,s=!1;const o=new $i,a=new It,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||n!==0||r;return r=f,n=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,_=h.clipIntersection,d=h.clipShadows,m=i.get(h);if(!r||g===null||g.length===0||s&&!d)s?u(null):c();else{const E=s?0:n,x=E*4;let M=m.clippingState||null;l.value=M,M=u(g,f,x,p);for(let w=0;w!==x;++w)M[w]=e[w];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,p,g){const _=h!==null?h.length:0;let d=null;if(_!==0){if(d=l.value,g!==!0||d===null){const m=p+_*4,E=f.matrixWorldInverse;a.getNormalMatrix(E),(d===null||d.length<m)&&(d=new Float32Array(m));for(let x=0,M=p;x!==_;++x,M+=4)o.copy(h[x]).applyMatrix4(E,a),o.normal.toArray(d,M),d[M+3]=o.constant}l.value=d,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,d}}function Eb(i){let t=new WeakMap;function e(o,a){return a===Cc?o.mapping=as:a===Rc&&(o.mapping=ls),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Cc||a===Rc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new DS(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class km extends Fm{constructor(t=-1,e=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Vr=4,Uf=[.125,.215,.35,.446,.526,.582],Ki=20,kl=new km,Ff=new Ut;let Vl=null,Hl=0,Gl=0,Wl=!1;const Yi=(1+Math.sqrt(5))/2,Nr=1/Yi,Bf=[new L(-Yi,Nr,0),new L(Yi,Nr,0),new L(-Nr,0,Yi),new L(Nr,0,Yi),new L(0,Yi,-Nr),new L(0,Yi,Nr),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class zf{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){Vl=this._renderer.getRenderTarget(),Hl=this._renderer.getActiveCubeFace(),Gl=this._renderer.getActiveMipmapLevel(),Wl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Vl,Hl,Gl),this._renderer.xr.enabled=Wl,t.scissorTest=!1,Fo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===as||t.mapping===ls?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Vl=this._renderer.getRenderTarget(),Hl=this._renderer.getActiveCubeFace(),Gl=this._renderer.getActiveMipmapLevel(),Wl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:eo,format:Cn,colorSpace:Oi,depthBuffer:!1},r=kf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kf(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Mb(s)),this._blurMaterial=Sb(s,t,e)}return r}_compileMaterial(t){const e=new Gt(this._lodPlanes[0],t);this._renderer.compile(e,kl)}_sceneToCubeUV(t,e,n,r){const a=new Je(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Ff),u.toneMapping=Si,u.autoClear=!1;const p=new si({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1}),g=new Gt(new nn,p);let _=!1;const d=t.background;d?d.isColor&&(p.color.copy(d),t.background=null,_=!0):(p.color.copy(Ff),_=!0);for(let m=0;m<6;m++){const E=m%3;E===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):E===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const x=this._cubeSize;Fo(r,E*x,m>2?x:0,x,x),u.setRenderTarget(r),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=d}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===as||t.mapping===ls;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vf());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Gt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Fo(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,kl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Bf[(r-s-1)%Bf.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,r,"latitudinal",s),this._halfBlur(o,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Gt(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ki-1),_=s/g,d=isFinite(s)?1+Math.floor(u*_):Ki;d>Ki&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Ki}`);const m=[];let E=0;for(let S=0;S<Ki;++S){const C=S/_,P=Math.exp(-C*C/2);m.push(P),S===0?E+=P:S<d&&(E+=2*P)}for(let S=0;S<m.length;S++)m[S]=m[S]/E;f.envMap.value=t.texture,f.samples.value=d,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-n;const M=this._sizeLods[r],w=3*M*(r>x-Vr?r-x+Vr:0),A=4*(this._cubeSize-M);Fo(e,w,A,3*M,2*M),l.setRenderTarget(e),l.render(h,kl)}}function Mb(i){const t=[],e=[],n=[];let r=i;const s=i-Vr+1+Uf.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>i-Vr?l=Uf[o-i+Vr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,_=3,d=2,m=1,E=new Float32Array(_*g*p),x=new Float32Array(d*g*p),M=new Float32Array(m*g*p);for(let A=0;A<p;A++){const S=A%3*2/3-1,C=A>2?0:-1,P=[S,C,0,S+2/3,C,0,S+2/3,C+1,0,S,C,0,S+2/3,C+1,0,S,C+1,0];E.set(P,_*g*A),x.set(f,d*g*A);const v=[A,A,A,A,A,A];M.set(v,m*g*A)}const w=new ye;w.setAttribute("position",new Fn(E,_)),w.setAttribute("uv",new Fn(x,d)),w.setAttribute("faceIndex",new Fn(M,m)),t.push(w),r>Vr&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function kf(i,t,e){const n=new cr(i,t,e);return n.texture.mapping=Oa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fo(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function Sb(i,t,e){const n=new Float32Array(Ki),r=new L(0,1,0);return new Pi({name:"SphericalGaussianBlur",defines:{n:Ki,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Qu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Vf(){return new Pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Hf(){return new Pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Qu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function yb(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Cc||l===Rc,u=l===as||l===ls;if(c||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new zf(i)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&r(p)?(e===null&&(e=new zf(i)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Tb(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&ra("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function bb(i,t,e,n){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let d=0,m=_.length;d<m;d++)t.remove(_[d])}f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(t.remove(p),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const _=p[g];for(let d=0,m=_.length;d<m;d++)t.update(_[d],i.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const E=p.array;_=p.version;for(let x=0,M=E.length;x<M;x+=3){const w=E[x+0],A=E[x+1],S=E[x+2];f.push(w,A,A,S,S,w)}}else if(g!==void 0){const E=g.array;_=g.version;for(let x=0,M=E.length/3-1;x<M;x+=3){const w=x+0,A=x+1,S=x+2;f.push(w,A,A,S,S,w)}}else return;const d=new(Rm(f)?Om:Nm)(f,1);d.version=_;const m=s.get(h);m&&t.remove(m),s.set(h,d)}function u(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Ab(i,t,e){let n;function r(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,p){i.drawElements(n,p,s,f*o),e.update(p,n,1)}function c(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,s,f*o,g),e.update(p,n,g))}function u(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,f,0,g);let d=0;for(let m=0;m<g;m++)d+=p[m];e.update(d,n,1)}function h(f,p,g,_){if(g===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<f.length;m++)c(f[m]/o,p[m],_[m]);else{d.multiDrawElementsInstancedWEBGL(n,p,0,s,f,0,_,0,g);let m=0;for(let E=0;E<g;E++)m+=p[E];for(let E=0;E<_.length;E++)e.update(m,n,_[E])}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function wb(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(s/3);break;case i.LINES:e.lines+=a*(s/2);break;case i.LINE_STRIP:e.lines+=a*(s-1);break;case i.LINE_LOOP:e.lines+=a*s;break;case i.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function Cb(i,t,e){const n=new WeakMap,r=new Jt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let v=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",v)};var p=v;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,d=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),d===!0&&(M=3);let w=a.attributes.position.count*M,A=1;w>t.maxTextureSize&&(A=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const S=new Float32Array(w*A*4*h),C=new Dm(S,w,A,h);C.type=jn,C.needsUpdate=!0;const P=M*4;for(let y=0;y<h;y++){const N=m[y],O=E[y],k=x[y],X=w*A*4*y;for(let B=0;B<N.count;B++){const W=B*P;g===!0&&(r.fromBufferAttribute(N,B),S[X+W+0]=r.x,S[X+W+1]=r.y,S[X+W+2]=r.z,S[X+W+3]=0),_===!0&&(r.fromBufferAttribute(O,B),S[X+W+4]=r.x,S[X+W+5]=r.y,S[X+W+6]=r.z,S[X+W+7]=0),d===!0&&(r.fromBufferAttribute(k,B),S[X+W+8]=r.x,S[X+W+9]=r.y,S[X+W+10]=r.z,S[X+W+11]=k.itemSize===4?r.w:1)}}f={count:h,texture:C,size:new Vt(w,A)},n.set(a,f),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let d=0;d<c.length;d++)g+=c[d];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function Rb(i,t,e,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=t.get(l,u);if(r.get(h)!==c&&(t.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class Vm extends Xe{constructor(t,e,n,r,s,o,a,l,c,u=$r){if(u!==$r&&u!==us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===$r&&(n=lr),n===void 0&&u===us&&(n=cs),super(null,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:_n,this.minFilter=l!==void 0?l:_n,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Hm=new Xe,Gf=new Vm(1,1),Gm=new Dm,Wm=new mS,Xm=new Bm,Wf=[],Xf=[],$f=new Float32Array(16),Yf=new Float32Array(9),qf=new Float32Array(4);function vs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=Wf[r];if(s===void 0&&(s=new Float32Array(r),Wf[r]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(s,a)}return s}function ve(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function xe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Fa(i,t){let e=Xf[t];e===void 0&&(e=new Int32Array(t),Xf[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Pb(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Db(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2fv(this.addr,t),xe(e,t)}}function Lb(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ve(e,t))return;i.uniform3fv(this.addr,t),xe(e,t)}}function Ib(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4fv(this.addr,t),xe(e,t)}}function Nb(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;qf.set(n),i.uniformMatrix2fv(this.addr,!1,qf),xe(e,n)}}function Ob(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;Yf.set(n),i.uniformMatrix3fv(this.addr,!1,Yf),xe(e,n)}}function Ub(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;$f.set(n),i.uniformMatrix4fv(this.addr,!1,$f),xe(e,n)}}function Fb(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Bb(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2iv(this.addr,t),xe(e,t)}}function zb(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;i.uniform3iv(this.addr,t),xe(e,t)}}function kb(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4iv(this.addr,t),xe(e,t)}}function Vb(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Hb(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2uiv(this.addr,t),xe(e,t)}}function Gb(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;i.uniform3uiv(this.addr,t),xe(e,t)}}function Wb(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4uiv(this.addr,t),xe(e,t)}}function Xb(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Gf.compareFunction=Cm,s=Gf):s=Hm,e.setTexture2D(t||s,r)}function $b(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Wm,r)}function Yb(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||Xm,r)}function qb(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||Gm,r)}function Kb(i){switch(i){case 5126:return Pb;case 35664:return Db;case 35665:return Lb;case 35666:return Ib;case 35674:return Nb;case 35675:return Ob;case 35676:return Ub;case 5124:case 35670:return Fb;case 35667:case 35671:return Bb;case 35668:case 35672:return zb;case 35669:case 35673:return kb;case 5125:return Vb;case 36294:return Hb;case 36295:return Gb;case 36296:return Wb;case 35678:case 36198:case 36298:case 36306:case 35682:return Xb;case 35679:case 36299:case 36307:return $b;case 35680:case 36300:case 36308:case 36293:return Yb;case 36289:case 36303:case 36311:case 36292:return qb}}function jb(i,t){i.uniform1fv(this.addr,t)}function Zb(i,t){const e=vs(t,this.size,2);i.uniform2fv(this.addr,e)}function Jb(i,t){const e=vs(t,this.size,3);i.uniform3fv(this.addr,e)}function Qb(i,t){const e=vs(t,this.size,4);i.uniform4fv(this.addr,e)}function tA(i,t){const e=vs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function eA(i,t){const e=vs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function nA(i,t){const e=vs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function iA(i,t){i.uniform1iv(this.addr,t)}function rA(i,t){i.uniform2iv(this.addr,t)}function sA(i,t){i.uniform3iv(this.addr,t)}function oA(i,t){i.uniform4iv(this.addr,t)}function aA(i,t){i.uniform1uiv(this.addr,t)}function lA(i,t){i.uniform2uiv(this.addr,t)}function cA(i,t){i.uniform3uiv(this.addr,t)}function uA(i,t){i.uniform4uiv(this.addr,t)}function hA(i,t,e){const n=this.cache,r=t.length,s=Fa(e,r);ve(n,s)||(i.uniform1iv(this.addr,s),xe(n,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Hm,s[o])}function fA(i,t,e){const n=this.cache,r=t.length,s=Fa(e,r);ve(n,s)||(i.uniform1iv(this.addr,s),xe(n,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Wm,s[o])}function dA(i,t,e){const n=this.cache,r=t.length,s=Fa(e,r);ve(n,s)||(i.uniform1iv(this.addr,s),xe(n,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||Xm,s[o])}function pA(i,t,e){const n=this.cache,r=t.length,s=Fa(e,r);ve(n,s)||(i.uniform1iv(this.addr,s),xe(n,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Gm,s[o])}function mA(i){switch(i){case 5126:return jb;case 35664:return Zb;case 35665:return Jb;case 35666:return Qb;case 35674:return tA;case 35675:return eA;case 35676:return nA;case 5124:case 35670:return iA;case 35667:case 35671:return rA;case 35668:case 35672:return sA;case 35669:case 35673:return oA;case 5125:return aA;case 36294:return lA;case 36295:return cA;case 36296:return uA;case 35678:case 36198:case 36298:case 36306:case 35682:return hA;case 35679:case 36299:case 36307:return fA;case 35680:case 36300:case 36308:case 36293:return dA;case 36289:case 36303:case 36311:case 36292:return pA}}class _A{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Kb(e.type)}}class gA{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=mA(e.type)}}class vA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],n)}}}const Xl=/(\w+)(\])?(\[|\.)?/g;function Kf(i,t){i.seq.push(t),i.map[t.id]=t}function xA(i,t,e){const n=i.name,r=n.length;for(Xl.lastIndex=0;;){const s=Xl.exec(n),o=Xl.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Kf(e,c===void 0?new _A(a,i,t):new gA(a,i,t));break}else{let h=e.map[a];h===void 0&&(h=new vA(a),Kf(e,h)),e=h}}}class sa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);xA(s,o,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&n.push(o)}return n}}function jf(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const EA=37297;let MA=0;function SA(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function yA(i){const t=jt.getPrimaries(jt.workingColorSpace),e=jt.getPrimaries(i);let n;switch(t===e?n="":t===xa&&e===va?n="LinearDisplayP3ToLinearSRGB":t===va&&e===xa&&(n="LinearSRGBToLinearDisplayP3"),i){case Oi:case Ua:return[n,"LinearTransferOETF"];case bn:case ju:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Zf(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+SA(i.getShaderSource(t),o)}else return r}function TA(i,t){const e=yA(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function bA(i,t){let e;switch(t){case VM:e="Linear";break;case HM:e="Reinhard";break;case GM:e="Cineon";break;case WM:e="ACESFilmic";break;case $M:e="AgX";break;case YM:e="Neutral";break;case XM:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Bo=new L;function AA(){jt.getLuminanceCoefficients(Bo);const i=Bo.x.toFixed(4),t=Bo.y.toFixed(4),e=Bo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wA(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Is).join(`
`)}function CA(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function RA(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Is(i){return i!==""}function Jf(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Qf(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const PA=/^[ \t]*#include +<([\w\d./]+)>/gm;function su(i){return i.replace(PA,LA)}const DA=new Map;function LA(i,t){let e=Lt[t];if(e===void 0){const n=DA.get(t);if(n!==void 0)e=Lt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return su(e)}const IA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function td(i){return i.replace(IA,NA)}function NA(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ed(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function OA(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===pm?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===EM?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Yn&&(t="SHADOWMAP_TYPE_VSM"),t}function UA(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case as:case ls:t="ENVMAP_TYPE_CUBE";break;case Oa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function FA(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ls:t="ENVMAP_MODE_REFRACTION";break}return t}function BA(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case mm:t="ENVMAP_BLENDING_MULTIPLY";break;case zM:t="ENVMAP_BLENDING_MIX";break;case kM:t="ENVMAP_BLENDING_ADD";break}return t}function zA(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function kA(i,t,e,n){const r=i.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=OA(e),c=UA(e),u=FA(e),h=BA(e),f=zA(e),p=wA(e),g=CA(s),_=r.createProgram();let d,m,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Is).join(`
`),d.length>0&&(d+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Is).join(`
`),m.length>0&&(m+=`
`)):(d=[ed(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Is).join(`
`),m=[ed(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Si?"#define TONE_MAPPING":"",e.toneMapping!==Si?Lt.tonemapping_pars_fragment:"",e.toneMapping!==Si?bA("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Lt.colorspace_pars_fragment,TA("linearToOutputTexel",e.outputColorSpace),AA(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Is).join(`
`)),o=su(o),o=Jf(o,e),o=Qf(o,e),a=su(a),a=Jf(a,e),a=Qf(a,e),o=td(o),a=td(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,d=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,m=["#define varying in",e.glslVersion===vf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===vf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=E+d+o,M=E+m+a,w=jf(r,r.VERTEX_SHADER,x),A=jf(r,r.FRAGMENT_SHADER,M);r.attachShader(_,w),r.attachShader(_,A),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function S(y){if(i.debug.checkShaderErrors){const N=r.getProgramInfoLog(_).trim(),O=r.getShaderInfoLog(w).trim(),k=r.getShaderInfoLog(A).trim();let X=!0,B=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,w,A);else{const W=Zf(r,w,"vertex"),G=Zf(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+N+`
`+W+`
`+G)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(O===""||k==="")&&(B=!1);B&&(y.diagnostics={runnable:X,programLog:N,vertexShader:{log:O,prefix:d},fragmentShader:{log:k,prefix:m}})}r.deleteShader(w),r.deleteShader(A),C=new sa(r,_),P=RA(r,_)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let P;this.getAttributes=function(){return P===void 0&&S(this),P};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=r.getProgramParameter(_,EA)),v},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=MA++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=A,this}let VA=0;class HA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new GA(t),e.set(t,n)),n}}class GA{constructor(t){this.id=VA++,this.code=t,this.usedTimes=0}}function WA(i,t,e,n,r,s,o){const a=new Lm,l=new HA,c=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.reverseDepthBuffer,p=r.vertexTextures;let g=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,y,N,O,k){const X=O.fog,B=k.geometry,W=v.isMeshStandardMaterial?O.environment:null,G=(v.isMeshStandardMaterial?e:t).get(v.envMap||W),nt=G&&G.mapping===Oa?G.image.height:null,it=_[v.type];v.precision!==null&&(g=r.getMaxPrecision(v.precision),g!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",g,"instead."));const ct=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ct=ct!==void 0?ct.length:0;let Nt=0;B.morphAttributes.position!==void 0&&(Nt=1),B.morphAttributes.normal!==void 0&&(Nt=2),B.morphAttributes.color!==void 0&&(Nt=3);let $,j,dt,ot;if(it){const Oe=Ln[it];$=Oe.vertexShader,j=Oe.fragmentShader}else $=v.vertexShader,j=v.fragmentShader,l.update(v),dt=l.getVertexShaderID(v),ot=l.getFragmentShaderID(v);const St=i.getRenderTarget(),yt=k.isInstancedMesh===!0,Ft=k.isBatchedMesh===!0,Xt=!!v.map,Bt=!!v.matcap,D=!!G,Pe=!!v.aoMap,Ot=!!v.lightMap,zt=!!v.bumpMap,Tt=!!v.normalMap,te=!!v.displacementMap,At=!!v.emissiveMap,R=!!v.metalnessMap,T=!!v.roughnessMap,z=v.anisotropy>0,K=v.clearcoat>0,Q=v.dispersion>0,q=v.iridescence>0,gt=v.sheen>0,rt=v.transmission>0,ut=z&&!!v.anisotropyMap,$t=K&&!!v.clearcoatMap,tt=K&&!!v.clearcoatNormalMap,pt=K&&!!v.clearcoatRoughnessMap,Rt=q&&!!v.iridescenceMap,Pt=q&&!!v.iridescenceThicknessMap,mt=gt&&!!v.sheenColorMap,Ht=gt&&!!v.sheenRoughnessMap,Dt=!!v.specularMap,ie=!!v.specularColorMap,I=!!v.specularIntensityMap,ht=rt&&!!v.transmissionMap,Y=rt&&!!v.thicknessMap,Z=!!v.gradientMap,at=!!v.alphaMap,ft=v.alphaTest>0,Wt=!!v.alphaHash,me=!!v.extensions;let Ne=Si;v.toneMapped&&(St===null||St.isXRRenderTarget===!0)&&(Ne=i.toneMapping);const Yt={shaderID:it,shaderType:v.type,shaderName:v.name,vertexShader:$,fragmentShader:j,defines:v.defines,customVertexShaderID:dt,customFragmentShaderID:ot,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:g,batching:Ft,batchingColor:Ft&&k._colorsTexture!==null,instancing:yt,instancingColor:yt&&k.instanceColor!==null,instancingMorph:yt&&k.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:St===null?i.outputColorSpace:St.isXRRenderTarget===!0?St.texture.colorSpace:Oi,alphaToCoverage:!!v.alphaToCoverage,map:Xt,matcap:Bt,envMap:D,envMapMode:D&&G.mapping,envMapCubeUVHeight:nt,aoMap:Pe,lightMap:Ot,bumpMap:zt,normalMap:Tt,displacementMap:p&&te,emissiveMap:At,normalMapObjectSpace:Tt&&v.normalMapType===ZM,normalMapTangentSpace:Tt&&v.normalMapType===wm,metalnessMap:R,roughnessMap:T,anisotropy:z,anisotropyMap:ut,clearcoat:K,clearcoatMap:$t,clearcoatNormalMap:tt,clearcoatRoughnessMap:pt,dispersion:Q,iridescence:q,iridescenceMap:Rt,iridescenceThicknessMap:Pt,sheen:gt,sheenColorMap:mt,sheenRoughnessMap:Ht,specularMap:Dt,specularColorMap:ie,specularIntensityMap:I,transmission:rt,transmissionMap:ht,thicknessMap:Y,gradientMap:Z,opaque:v.transparent===!1&&v.blending===Xr&&v.alphaToCoverage===!1,alphaMap:at,alphaTest:ft,alphaHash:Wt,combine:v.combine,mapUv:Xt&&d(v.map.channel),aoMapUv:Pe&&d(v.aoMap.channel),lightMapUv:Ot&&d(v.lightMap.channel),bumpMapUv:zt&&d(v.bumpMap.channel),normalMapUv:Tt&&d(v.normalMap.channel),displacementMapUv:te&&d(v.displacementMap.channel),emissiveMapUv:At&&d(v.emissiveMap.channel),metalnessMapUv:R&&d(v.metalnessMap.channel),roughnessMapUv:T&&d(v.roughnessMap.channel),anisotropyMapUv:ut&&d(v.anisotropyMap.channel),clearcoatMapUv:$t&&d(v.clearcoatMap.channel),clearcoatNormalMapUv:tt&&d(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&d(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&d(v.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&d(v.iridescenceThicknessMap.channel),sheenColorMapUv:mt&&d(v.sheenColorMap.channel),sheenRoughnessMapUv:Ht&&d(v.sheenRoughnessMap.channel),specularMapUv:Dt&&d(v.specularMap.channel),specularColorMapUv:ie&&d(v.specularColorMap.channel),specularIntensityMapUv:I&&d(v.specularIntensityMap.channel),transmissionMapUv:ht&&d(v.transmissionMap.channel),thicknessMapUv:Y&&d(v.thicknessMap.channel),alphaMapUv:at&&d(v.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Tt||z),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!B.attributes.uv&&(Xt||at),fog:!!X,useFog:v.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:f,skinning:k.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:Nt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ne,decodeVideoTexture:Xt&&v.map.isVideoTexture===!0&&jt.getTransfer(v.map.colorSpace)===se,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===An,flipSided:v.side===We,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:me&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&v.extensions.multiDraw===!0||Ft)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Yt.vertexUv1s=c.has(1),Yt.vertexUv2s=c.has(2),Yt.vertexUv3s=c.has(3),c.clear(),Yt}function E(v){const y=[];if(v.shaderID?y.push(v.shaderID):(y.push(v.customVertexShaderID),y.push(v.customFragmentShaderID)),v.defines!==void 0)for(const N in v.defines)y.push(N),y.push(v.defines[N]);return v.isRawShaderMaterial===!1&&(x(y,v),M(y,v),y.push(i.outputColorSpace)),y.push(v.customProgramCacheKey),y.join()}function x(v,y){v.push(y.precision),v.push(y.outputColorSpace),v.push(y.envMapMode),v.push(y.envMapCubeUVHeight),v.push(y.mapUv),v.push(y.alphaMapUv),v.push(y.lightMapUv),v.push(y.aoMapUv),v.push(y.bumpMapUv),v.push(y.normalMapUv),v.push(y.displacementMapUv),v.push(y.emissiveMapUv),v.push(y.metalnessMapUv),v.push(y.roughnessMapUv),v.push(y.anisotropyMapUv),v.push(y.clearcoatMapUv),v.push(y.clearcoatNormalMapUv),v.push(y.clearcoatRoughnessMapUv),v.push(y.iridescenceMapUv),v.push(y.iridescenceThicknessMapUv),v.push(y.sheenColorMapUv),v.push(y.sheenRoughnessMapUv),v.push(y.specularMapUv),v.push(y.specularColorMapUv),v.push(y.specularIntensityMapUv),v.push(y.transmissionMapUv),v.push(y.thicknessMapUv),v.push(y.combine),v.push(y.fogExp2),v.push(y.sizeAttenuation),v.push(y.morphTargetsCount),v.push(y.morphAttributeCount),v.push(y.numDirLights),v.push(y.numPointLights),v.push(y.numSpotLights),v.push(y.numSpotLightMaps),v.push(y.numHemiLights),v.push(y.numRectAreaLights),v.push(y.numDirLightShadows),v.push(y.numPointLightShadows),v.push(y.numSpotLightShadows),v.push(y.numSpotLightShadowsWithMaps),v.push(y.numLightProbes),v.push(y.shadowMapType),v.push(y.toneMapping),v.push(y.numClippingPlanes),v.push(y.numClipIntersection),v.push(y.depthPacking)}function M(v,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.alphaToCoverage&&a.enable(20),v.push(a.mask)}function w(v){const y=_[v.type];let N;if(y){const O=Ln[y];N=wS.clone(O.uniforms)}else N=v.uniforms;return N}function A(v,y){let N;for(let O=0,k=u.length;O<k;O++){const X=u[O];if(X.cacheKey===y){N=X,++N.usedTimes;break}}return N===void 0&&(N=new kA(i,y,v,s),u.push(N)),N}function S(v){if(--v.usedTimes===0){const y=u.indexOf(v);u[y]=u[u.length-1],u.pop(),v.destroy()}}function C(v){l.remove(v)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:E,getUniforms:w,acquireProgram:A,releaseProgram:S,releaseShaderCache:C,programs:u,dispose:P}}function XA(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function $A(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function nd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function id(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function o(h,f,p,g,_,d){let m=i[t];return m===void 0?(m={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:d},i[t]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=p,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=_,m.group=d),t++,m}function a(h,f,p,g,_,d){const m=o(h,f,p,g,_,d);p.transmission>0?n.push(m):p.transparent===!0?r.push(m):e.push(m)}function l(h,f,p,g,_,d){const m=o(h,f,p,g,_,d);p.transmission>0?n.unshift(m):p.transparent===!0?r.unshift(m):e.unshift(m)}function c(h,f){e.length>1&&e.sort(h||$A),n.length>1&&n.sort(f||nd),r.length>1&&r.sort(f||nd)}function u(){for(let h=t,f=i.length;h<f;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function YA(){let i=new WeakMap;function t(n,r){const s=i.get(n);let o;return s===void 0?(o=new id,i.set(n,[o])):r>=s.length?(o=new id,s.push(o)):o=s[r],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function qA(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Ut};break;case"SpotLight":e={position:new L,direction:new L,color:new Ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Ut,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Ut,groundColor:new Ut};break;case"RectAreaLight":e={color:new Ut,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function KA(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let jA=0;function ZA(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function JA(i){const t=new qA,e=KA(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const r=new L,s=new oe,o=new oe;function a(c){let u=0,h=0,f=0;for(let P=0;P<9;P++)n.probe[P].set(0,0,0);let p=0,g=0,_=0,d=0,m=0,E=0,x=0,M=0,w=0,A=0,S=0;c.sort(ZA);for(let P=0,v=c.length;P<v;P++){const y=c[P],N=y.color,O=y.intensity,k=y.distance,X=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)u+=N.r*O,h+=N.g*O,f+=N.b*O;else if(y.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(y.sh.coefficients[B],O);S++}else if(y.isDirectionalLight){const B=t.get(y);if(B.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const W=y.shadow,G=e.get(y);G.shadowIntensity=W.intensity,G.shadowBias=W.bias,G.shadowNormalBias=W.normalBias,G.shadowRadius=W.radius,G.shadowMapSize=W.mapSize,n.directionalShadow[p]=G,n.directionalShadowMap[p]=X,n.directionalShadowMatrix[p]=y.shadow.matrix,E++}n.directional[p]=B,p++}else if(y.isSpotLight){const B=t.get(y);B.position.setFromMatrixPosition(y.matrixWorld),B.color.copy(N).multiplyScalar(O),B.distance=k,B.coneCos=Math.cos(y.angle),B.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),B.decay=y.decay,n.spot[_]=B;const W=y.shadow;if(y.map&&(n.spotLightMap[w]=y.map,w++,W.updateMatrices(y),y.castShadow&&A++),n.spotLightMatrix[_]=W.matrix,y.castShadow){const G=e.get(y);G.shadowIntensity=W.intensity,G.shadowBias=W.bias,G.shadowNormalBias=W.normalBias,G.shadowRadius=W.radius,G.shadowMapSize=W.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=X,M++}_++}else if(y.isRectAreaLight){const B=t.get(y);B.color.copy(N).multiplyScalar(O),B.halfWidth.set(y.width*.5,0,0),B.halfHeight.set(0,y.height*.5,0),n.rectArea[d]=B,d++}else if(y.isPointLight){const B=t.get(y);if(B.color.copy(y.color).multiplyScalar(y.intensity),B.distance=y.distance,B.decay=y.decay,y.castShadow){const W=y.shadow,G=e.get(y);G.shadowIntensity=W.intensity,G.shadowBias=W.bias,G.shadowNormalBias=W.normalBias,G.shadowRadius=W.radius,G.shadowMapSize=W.mapSize,G.shadowCameraNear=W.camera.near,G.shadowCameraFar=W.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=y.shadow.matrix,x++}n.point[g]=B,g++}else if(y.isHemisphereLight){const B=t.get(y);B.skyColor.copy(y.color).multiplyScalar(O),B.groundColor.copy(y.groundColor).multiplyScalar(O),n.hemi[m]=B,m++}}d>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=st.LTC_FLOAT_1,n.rectAreaLTC2=st.LTC_FLOAT_2):(n.rectAreaLTC1=st.LTC_HALF_1,n.rectAreaLTC2=st.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const C=n.hash;(C.directionalLength!==p||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==d||C.hemiLength!==m||C.numDirectionalShadows!==E||C.numPointShadows!==x||C.numSpotShadows!==M||C.numSpotMaps!==w||C.numLightProbes!==S)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=d,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=M+w-A,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=S,C.directionalLength=p,C.pointLength=g,C.spotLength=_,C.rectAreaLength=d,C.hemiLength=m,C.numDirectionalShadows=E,C.numPointShadows=x,C.numSpotShadows=M,C.numSpotMaps=w,C.numLightProbes=S,n.version=jA++)}function l(c,u){let h=0,f=0,p=0,g=0,_=0;const d=u.matrixWorldInverse;for(let m=0,E=c.length;m<E;m++){const x=c[m];if(x.isDirectionalLight){const M=n.directional[h];M.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(d),h++}else if(x.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(d),M.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(d),p++}else if(x.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(d),o.identity(),s.copy(x.matrixWorld),s.premultiply(d),o.extractRotation(s),M.halfWidth.set(x.width*.5,0,0),M.halfHeight.set(0,x.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(d),f++}else if(x.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(d),_++}}}return{setup:a,setupView:l,state:n}}function rd(i){const t=new JA(i),e=[],n=[];function r(u){c.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function QA(i){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new rd(i),t.set(r,[a])):s>=o.length?(a=new rd(i),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class tw extends mr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=KM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ew extends mr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const nw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function rw(i,t,e){let n=new Ju;const r=new Vt,s=new Vt,o=new Jt,a=new tw({depthPacking:jM}),l=new ew,c={},u=e.maxTextureSize,h={[Ri]:We,[We]:Ri,[An]:An},f=new Pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vt},radius:{value:4}},vertexShader:nw,fragmentShader:iw}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new ye;g.setAttribute("position",new Fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Gt(g,f),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pm;let m=this.type;this.render=function(A,S,C){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||A.length===0)return;const P=i.getRenderTarget(),v=i.getActiveCubeFace(),y=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Mi),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const O=m!==Yn&&this.type===Yn,k=m===Yn&&this.type!==Yn;for(let X=0,B=A.length;X<B;X++){const W=A[X],G=W.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const nt=G.getFrameExtents();if(r.multiply(nt),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/nt.x),r.x=s.x*nt.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/nt.y),r.y=s.y*nt.y,G.mapSize.y=s.y)),G.map===null||O===!0||k===!0){const ct=this.type!==Yn?{minFilter:_n,magFilter:_n}:{};G.map!==null&&G.map.dispose(),G.map=new cr(r.x,r.y,ct),G.map.texture.name=W.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const it=G.getViewportCount();for(let ct=0;ct<it;ct++){const Ct=G.getViewport(ct);o.set(s.x*Ct.x,s.y*Ct.y,s.x*Ct.z,s.y*Ct.w),N.viewport(o),G.updateMatrices(W,ct),n=G.getFrustum(),M(S,C,G.camera,W,this.type)}G.isPointLightShadow!==!0&&this.type===Yn&&E(G,C),G.needsUpdate=!1}m=this.type,d.needsUpdate=!1,i.setRenderTarget(P,v,y)};function E(A,S){const C=t.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new cr(r.x,r.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(S,null,C,f,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(S,null,C,p,_,null)}function x(A,S,C,P){let v=null;const y=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(y!==void 0)v=y;else if(v=C.isPointLight===!0?l:a,i.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const N=v.uuid,O=S.uuid;let k=c[N];k===void 0&&(k={},c[N]=k);let X=k[O];X===void 0&&(X=v.clone(),k[O]=X,S.addEventListener("dispose",w)),v=X}if(v.visible=S.visible,v.wireframe=S.wireframe,P===Yn?v.side=S.shadowSide!==null?S.shadowSide:S.side:v.side=S.shadowSide!==null?S.shadowSide:h[S.side],v.alphaMap=S.alphaMap,v.alphaTest=S.alphaTest,v.map=S.map,v.clipShadows=S.clipShadows,v.clippingPlanes=S.clippingPlanes,v.clipIntersection=S.clipIntersection,v.displacementMap=S.displacementMap,v.displacementScale=S.displacementScale,v.displacementBias=S.displacementBias,v.wireframeLinewidth=S.wireframeLinewidth,v.linewidth=S.linewidth,C.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const N=i.properties.get(v);N.light=C}return v}function M(A,S,C,P,v){if(A.visible===!1)return;if(A.layers.test(S.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&v===Yn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const O=t.update(A),k=A.material;if(Array.isArray(k)){const X=O.groups;for(let B=0,W=X.length;B<W;B++){const G=X[B],nt=k[G.materialIndex];if(nt&&nt.visible){const it=x(A,nt,P,v);A.onBeforeShadow(i,A,S,C,O,it,G),i.renderBufferDirect(C,null,O,it,A,G),A.onAfterShadow(i,A,S,C,O,it,G)}}}else if(k.visible){const X=x(A,k,P,v);A.onBeforeShadow(i,A,S,C,O,X,null),i.renderBufferDirect(C,null,O,X,A,null),A.onAfterShadow(i,A,S,C,O,X,null)}}const N=A.children;for(let O=0,k=N.length;O<k;O++)M(N[O],S,C,P,v)}function w(A){A.target.removeEventListener("dispose",w);for(const C in c){const P=c[C],v=A.target.uuid;v in P&&(P[v].dispose(),delete P[v])}}}const sw={[Mc]:Sc,[yc]:Ac,[Tc]:wc,[os]:bc,[Sc]:Mc,[Ac]:yc,[wc]:Tc,[bc]:os};function ow(i){function t(){let I=!1;const ht=new Jt;let Y=null;const Z=new Jt(0,0,0,0);return{setMask:function(at){Y!==at&&!I&&(i.colorMask(at,at,at,at),Y=at)},setLocked:function(at){I=at},setClear:function(at,ft,Wt,me,Ne){Ne===!0&&(at*=me,ft*=me,Wt*=me),ht.set(at,ft,Wt,me),Z.equals(ht)===!1&&(i.clearColor(at,ft,Wt,me),Z.copy(ht))},reset:function(){I=!1,Y=null,Z.set(-1,0,0,0)}}}function e(){let I=!1,ht=!1,Y=null,Z=null,at=null;return{setReversed:function(ft){ht=ft},setTest:function(ft){ft?dt(i.DEPTH_TEST):ot(i.DEPTH_TEST)},setMask:function(ft){Y!==ft&&!I&&(i.depthMask(ft),Y=ft)},setFunc:function(ft){if(ht&&(ft=sw[ft]),Z!==ft){switch(ft){case Mc:i.depthFunc(i.NEVER);break;case Sc:i.depthFunc(i.ALWAYS);break;case yc:i.depthFunc(i.LESS);break;case os:i.depthFunc(i.LEQUAL);break;case Tc:i.depthFunc(i.EQUAL);break;case bc:i.depthFunc(i.GEQUAL);break;case Ac:i.depthFunc(i.GREATER);break;case wc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Z=ft}},setLocked:function(ft){I=ft},setClear:function(ft){at!==ft&&(i.clearDepth(ft),at=ft)},reset:function(){I=!1,Y=null,Z=null,at=null}}}function n(){let I=!1,ht=null,Y=null,Z=null,at=null,ft=null,Wt=null,me=null,Ne=null;return{setTest:function(Yt){I||(Yt?dt(i.STENCIL_TEST):ot(i.STENCIL_TEST))},setMask:function(Yt){ht!==Yt&&!I&&(i.stencilMask(Yt),ht=Yt)},setFunc:function(Yt,Oe,Vn){(Y!==Yt||Z!==Oe||at!==Vn)&&(i.stencilFunc(Yt,Oe,Vn),Y=Yt,Z=Oe,at=Vn)},setOp:function(Yt,Oe,Vn){(ft!==Yt||Wt!==Oe||me!==Vn)&&(i.stencilOp(Yt,Oe,Vn),ft=Yt,Wt=Oe,me=Vn)},setLocked:function(Yt){I=Yt},setClear:function(Yt){Ne!==Yt&&(i.clearStencil(Yt),Ne=Yt)},reset:function(){I=!1,ht=null,Y=null,Z=null,at=null,ft=null,Wt=null,me=null,Ne=null}}}const r=new t,s=new e,o=new n,a=new WeakMap,l=new WeakMap;let c={},u={},h=new WeakMap,f=[],p=null,g=!1,_=null,d=null,m=null,E=null,x=null,M=null,w=null,A=new Ut(0,0,0),S=0,C=!1,P=null,v=null,y=null,N=null,O=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,B=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(W)[1]),X=B>=1):W.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),X=B>=2);let G=null,nt={};const it=i.getParameter(i.SCISSOR_BOX),ct=i.getParameter(i.VIEWPORT),Ct=new Jt().fromArray(it),Nt=new Jt().fromArray(ct);function $(I,ht,Y,Z){const at=new Uint8Array(4),ft=i.createTexture();i.bindTexture(I,ft),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Wt=0;Wt<Y;Wt++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(ht,0,i.RGBA,1,1,Z,0,i.RGBA,i.UNSIGNED_BYTE,at):i.texImage2D(ht+Wt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,at);return ft}const j={};j[i.TEXTURE_2D]=$(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=$(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=$(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=$(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),dt(i.DEPTH_TEST),s.setFunc(os),Ot(!1),zt(ff),dt(i.CULL_FACE),D(Mi);function dt(I){c[I]!==!0&&(i.enable(I),c[I]=!0)}function ot(I){c[I]!==!1&&(i.disable(I),c[I]=!1)}function St(I,ht){return u[I]!==ht?(i.bindFramebuffer(I,ht),u[I]=ht,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ht),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ht),!0):!1}function yt(I,ht){let Y=f,Z=!1;if(I){Y=h.get(ht),Y===void 0&&(Y=[],h.set(ht,Y));const at=I.textures;if(Y.length!==at.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let ft=0,Wt=at.length;ft<Wt;ft++)Y[ft]=i.COLOR_ATTACHMENT0+ft;Y.length=at.length,Z=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,Z=!0);Z&&i.drawBuffers(Y)}function Ft(I){return p!==I?(i.useProgram(I),p=I,!0):!1}const Xt={[qi]:i.FUNC_ADD,[SM]:i.FUNC_SUBTRACT,[yM]:i.FUNC_REVERSE_SUBTRACT};Xt[TM]=i.MIN,Xt[bM]=i.MAX;const Bt={[AM]:i.ZERO,[wM]:i.ONE,[CM]:i.SRC_COLOR,[xc]:i.SRC_ALPHA,[NM]:i.SRC_ALPHA_SATURATE,[LM]:i.DST_COLOR,[PM]:i.DST_ALPHA,[RM]:i.ONE_MINUS_SRC_COLOR,[Ec]:i.ONE_MINUS_SRC_ALPHA,[IM]:i.ONE_MINUS_DST_COLOR,[DM]:i.ONE_MINUS_DST_ALPHA,[OM]:i.CONSTANT_COLOR,[UM]:i.ONE_MINUS_CONSTANT_COLOR,[FM]:i.CONSTANT_ALPHA,[BM]:i.ONE_MINUS_CONSTANT_ALPHA};function D(I,ht,Y,Z,at,ft,Wt,me,Ne,Yt){if(I===Mi){g===!0&&(ot(i.BLEND),g=!1);return}if(g===!1&&(dt(i.BLEND),g=!0),I!==MM){if(I!==_||Yt!==C){if((d!==qi||x!==qi)&&(i.blendEquation(i.FUNC_ADD),d=qi,x=qi),Yt)switch(I){case Xr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case df:i.blendFunc(i.ONE,i.ONE);break;case pf:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case mf:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Xr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case df:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case pf:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case mf:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}m=null,E=null,M=null,w=null,A.set(0,0,0),S=0,_=I,C=Yt}return}at=at||ht,ft=ft||Y,Wt=Wt||Z,(ht!==d||at!==x)&&(i.blendEquationSeparate(Xt[ht],Xt[at]),d=ht,x=at),(Y!==m||Z!==E||ft!==M||Wt!==w)&&(i.blendFuncSeparate(Bt[Y],Bt[Z],Bt[ft],Bt[Wt]),m=Y,E=Z,M=ft,w=Wt),(me.equals(A)===!1||Ne!==S)&&(i.blendColor(me.r,me.g,me.b,Ne),A.copy(me),S=Ne),_=I,C=!1}function Pe(I,ht){I.side===An?ot(i.CULL_FACE):dt(i.CULL_FACE);let Y=I.side===We;ht&&(Y=!Y),Ot(Y),I.blending===Xr&&I.transparent===!1?D(Mi):D(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),s.setFunc(I.depthFunc),s.setTest(I.depthTest),s.setMask(I.depthWrite),r.setMask(I.colorWrite);const Z=I.stencilWrite;o.setTest(Z),Z&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),te(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?dt(i.SAMPLE_ALPHA_TO_COVERAGE):ot(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(I){P!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),P=I)}function zt(I){I!==vM?(dt(i.CULL_FACE),I!==v&&(I===ff?i.cullFace(i.BACK):I===xM?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ot(i.CULL_FACE),v=I}function Tt(I){I!==y&&(X&&i.lineWidth(I),y=I)}function te(I,ht,Y){I?(dt(i.POLYGON_OFFSET_FILL),(N!==ht||O!==Y)&&(i.polygonOffset(ht,Y),N=ht,O=Y)):ot(i.POLYGON_OFFSET_FILL)}function At(I){I?dt(i.SCISSOR_TEST):ot(i.SCISSOR_TEST)}function R(I){I===void 0&&(I=i.TEXTURE0+k-1),G!==I&&(i.activeTexture(I),G=I)}function T(I,ht,Y){Y===void 0&&(G===null?Y=i.TEXTURE0+k-1:Y=G);let Z=nt[Y];Z===void 0&&(Z={type:void 0,texture:void 0},nt[Y]=Z),(Z.type!==I||Z.texture!==ht)&&(G!==Y&&(i.activeTexture(Y),G=Y),i.bindTexture(I,ht||j[I]),Z.type=I,Z.texture=ht)}function z(){const I=nt[G];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function q(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function gt(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function rt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ut(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function $t(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function tt(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pt(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Rt(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Pt(I){Ct.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Ct.copy(I))}function mt(I){Nt.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),Nt.copy(I))}function Ht(I,ht){let Y=l.get(ht);Y===void 0&&(Y=new WeakMap,l.set(ht,Y));let Z=Y.get(I);Z===void 0&&(Z=i.getUniformBlockIndex(ht,I.name),Y.set(I,Z))}function Dt(I,ht){const Z=l.get(ht).get(I);a.get(ht)!==Z&&(i.uniformBlockBinding(ht,Z,I.__bindingPointIndex),a.set(ht,Z))}function ie(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},G=null,nt={},u={},h=new WeakMap,f=[],p=null,g=!1,_=null,d=null,m=null,E=null,x=null,M=null,w=null,A=new Ut(0,0,0),S=0,C=!1,P=null,v=null,y=null,N=null,O=null,Ct.set(0,0,i.canvas.width,i.canvas.height),Nt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:dt,disable:ot,bindFramebuffer:St,drawBuffers:yt,useProgram:Ft,setBlending:D,setMaterial:Pe,setFlipSided:Ot,setCullFace:zt,setLineWidth:Tt,setPolygonOffset:te,setScissorTest:At,activeTexture:R,bindTexture:T,unbindTexture:z,compressedTexImage2D:K,compressedTexImage3D:Q,texImage2D:pt,texImage3D:Rt,updateUBOMapping:Ht,uniformBlockBinding:Dt,texStorage2D:$t,texStorage3D:tt,texSubImage2D:q,texSubImage3D:gt,compressedTexSubImage2D:rt,compressedTexSubImage3D:ut,scissor:Pt,viewport:mt,reset:ie}}function sd(i,t,e,n){const r=aw(n);switch(e){case Em:return i*t;case Sm:return i*t;case ym:return i*t*2;case Tm:return i*t/r.components*r.byteLength;case Yu:return i*t/r.components*r.byteLength;case bm:return i*t*2/r.components*r.byteLength;case qu:return i*t*2/r.components*r.byteLength;case Mm:return i*t*3/r.components*r.byteLength;case Cn:return i*t*4/r.components*r.byteLength;case Ku:return i*t*4/r.components*r.byteLength;case Jo:case Qo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ta:case ea:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ic:case Oc:return Math.max(i,16)*Math.max(t,8)/4;case Lc:case Nc:return Math.max(i,8)*Math.max(t,8)/2;case Uc:case Fc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Bc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case zc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case kc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Vc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Hc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Gc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Wc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Xc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case $c:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Yc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case qc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Kc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case jc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Zc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Jc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case na:case Qc:case tu:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Am:case eu:return Math.ceil(i/4)*Math.ceil(t/4)*8;case nu:case iu:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function aw(i){switch(i){case ri:case gm:return{byteLength:1,components:1};case qs:case vm:case eo:return{byteLength:2,components:1};case Xu:case $u:return{byteLength:2,components:4};case lr:case Wu:case jn:return{byteLength:4,components:1};case xm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function lw(i,t,e,n,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Vt,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,T){return p?new OffscreenCanvas(R,T):Ma("canvas")}function _(R,T,z){let K=1;const Q=At(R);if((Q.width>z||Q.height>z)&&(K=z/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const q=Math.floor(K*Q.width),gt=Math.floor(K*Q.height);h===void 0&&(h=g(q,gt));const rt=T?g(q,gt):h;return rt.width=q,rt.height=gt,rt.getContext("2d").drawImage(R,0,0,q,gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+q+"x"+gt+")."),rt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),R;return R}function d(R){return R.generateMipmaps&&R.minFilter!==_n&&R.minFilter!==wn}function m(R){i.generateMipmap(R)}function E(R,T,z,K,Q=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let q=T;if(T===i.RED&&(z===i.FLOAT&&(q=i.R32F),z===i.HALF_FLOAT&&(q=i.R16F),z===i.UNSIGNED_BYTE&&(q=i.R8)),T===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.R8UI),z===i.UNSIGNED_SHORT&&(q=i.R16UI),z===i.UNSIGNED_INT&&(q=i.R32UI),z===i.BYTE&&(q=i.R8I),z===i.SHORT&&(q=i.R16I),z===i.INT&&(q=i.R32I)),T===i.RG&&(z===i.FLOAT&&(q=i.RG32F),z===i.HALF_FLOAT&&(q=i.RG16F),z===i.UNSIGNED_BYTE&&(q=i.RG8)),T===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RG8UI),z===i.UNSIGNED_SHORT&&(q=i.RG16UI),z===i.UNSIGNED_INT&&(q=i.RG32UI),z===i.BYTE&&(q=i.RG8I),z===i.SHORT&&(q=i.RG16I),z===i.INT&&(q=i.RG32I)),T===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RGB8UI),z===i.UNSIGNED_SHORT&&(q=i.RGB16UI),z===i.UNSIGNED_INT&&(q=i.RGB32UI),z===i.BYTE&&(q=i.RGB8I),z===i.SHORT&&(q=i.RGB16I),z===i.INT&&(q=i.RGB32I)),T===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),z===i.UNSIGNED_INT&&(q=i.RGBA32UI),z===i.BYTE&&(q=i.RGBA8I),z===i.SHORT&&(q=i.RGBA16I),z===i.INT&&(q=i.RGBA32I)),T===i.RGB&&z===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),T===i.RGBA){const gt=Q?ga:jt.getTransfer(K);z===i.FLOAT&&(q=i.RGBA32F),z===i.HALF_FLOAT&&(q=i.RGBA16F),z===i.UNSIGNED_BYTE&&(q=gt===se?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function x(R,T){let z;return R?T===null||T===lr||T===cs?z=i.DEPTH24_STENCIL8:T===jn?z=i.DEPTH32F_STENCIL8:T===qs&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===lr||T===cs?z=i.DEPTH_COMPONENT24:T===jn?z=i.DEPTH_COMPONENT32F:T===qs&&(z=i.DEPTH_COMPONENT16),z}function M(R,T){return d(R)===!0||R.isFramebufferTexture&&R.minFilter!==_n&&R.minFilter!==wn?Math.log2(Math.max(T.width,T.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?T.mipmaps.length:1}function w(R){const T=R.target;T.removeEventListener("dispose",w),S(T),T.isVideoTexture&&u.delete(T)}function A(R){const T=R.target;T.removeEventListener("dispose",A),P(T)}function S(R){const T=n.get(R);if(T.__webglInit===void 0)return;const z=R.source,K=f.get(z);if(K){const Q=K[T.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&C(R),Object.keys(K).length===0&&f.delete(z)}n.remove(R)}function C(R){const T=n.get(R);i.deleteTexture(T.__webglTexture);const z=R.source,K=f.get(z);delete K[T.__cacheKey],o.memory.textures--}function P(R){const T=n.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(T.__webglFramebuffer[K]))for(let Q=0;Q<T.__webglFramebuffer[K].length;Q++)i.deleteFramebuffer(T.__webglFramebuffer[K][Q]);else i.deleteFramebuffer(T.__webglFramebuffer[K]);T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer[K])}else{if(Array.isArray(T.__webglFramebuffer))for(let K=0;K<T.__webglFramebuffer.length;K++)i.deleteFramebuffer(T.__webglFramebuffer[K]);else i.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&i.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let K=0;K<T.__webglColorRenderbuffer.length;K++)T.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(T.__webglColorRenderbuffer[K]);T.__webglDepthRenderbuffer&&i.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const z=R.textures;for(let K=0,Q=z.length;K<Q;K++){const q=n.get(z[K]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(z[K])}n.remove(R)}let v=0;function y(){v=0}function N(){const R=v;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),v+=1,R}function O(R){const T=[];return T.push(R.wrapS),T.push(R.wrapT),T.push(R.wrapR||0),T.push(R.magFilter),T.push(R.minFilter),T.push(R.anisotropy),T.push(R.internalFormat),T.push(R.format),T.push(R.type),T.push(R.generateMipmaps),T.push(R.premultiplyAlpha),T.push(R.flipY),T.push(R.unpackAlignment),T.push(R.colorSpace),T.join()}function k(R,T){const z=n.get(R);if(R.isVideoTexture&&Tt(R),R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){const K=R.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Nt(z,R,T);return}}e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+T)}function X(R,T){const z=n.get(R);if(R.version>0&&z.__version!==R.version){Nt(z,R,T);return}e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+T)}function B(R,T){const z=n.get(R);if(R.version>0&&z.__version!==R.version){Nt(z,R,T);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+T)}function W(R,T){const z=n.get(R);if(R.version>0&&z.__version!==R.version){$(z,R,T);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+T)}const G={[Pc]:i.REPEAT,[Qi]:i.CLAMP_TO_EDGE,[Dc]:i.MIRRORED_REPEAT},nt={[_n]:i.NEAREST,[qM]:i.NEAREST_MIPMAP_NEAREST,[vo]:i.NEAREST_MIPMAP_LINEAR,[wn]:i.LINEAR,[gl]:i.LINEAR_MIPMAP_NEAREST,[tr]:i.LINEAR_MIPMAP_LINEAR},it={[JM]:i.NEVER,[rS]:i.ALWAYS,[QM]:i.LESS,[Cm]:i.LEQUAL,[tS]:i.EQUAL,[iS]:i.GEQUAL,[eS]:i.GREATER,[nS]:i.NOTEQUAL};function ct(R,T){if(T.type===jn&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===wn||T.magFilter===gl||T.magFilter===vo||T.magFilter===tr||T.minFilter===wn||T.minFilter===gl||T.minFilter===vo||T.minFilter===tr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,G[T.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,G[T.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,G[T.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,nt[T.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,nt[T.minFilter]),T.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,it[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===_n||T.minFilter!==vo&&T.minFilter!==tr||T.type===jn&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function Ct(R,T){let z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,T.addEventListener("dispose",w));const K=T.source;let Q=f.get(K);Q===void 0&&(Q={},f.set(K,Q));const q=O(T);if(q!==R.__cacheKey){Q[q]===void 0&&(Q[q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Q[q].usedTimes++;const gt=Q[R.__cacheKey];gt!==void 0&&(Q[R.__cacheKey].usedTimes--,gt.usedTimes===0&&C(T)),R.__cacheKey=q,R.__webglTexture=Q[q].texture}return z}function Nt(R,T,z){let K=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(K=i.TEXTURE_3D);const Q=Ct(R,T),q=T.source;e.bindTexture(K,R.__webglTexture,i.TEXTURE0+z);const gt=n.get(q);if(q.version!==gt.__version||Q===!0){e.activeTexture(i.TEXTURE0+z);const rt=jt.getPrimaries(jt.workingColorSpace),ut=T.colorSpace===mi?null:jt.getPrimaries(T.colorSpace),$t=T.colorSpace===mi||rt===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t);let tt=_(T.image,!1,r.maxTextureSize);tt=te(T,tt);const pt=s.convert(T.format,T.colorSpace),Rt=s.convert(T.type);let Pt=E(T.internalFormat,pt,Rt,T.colorSpace,T.isVideoTexture);ct(K,T);let mt;const Ht=T.mipmaps,Dt=T.isVideoTexture!==!0,ie=gt.__version===void 0||Q===!0,I=q.dataReady,ht=M(T,tt);if(T.isDepthTexture)Pt=x(T.format===us,T.type),ie&&(Dt?e.texStorage2D(i.TEXTURE_2D,1,Pt,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,Pt,tt.width,tt.height,0,pt,Rt,null));else if(T.isDataTexture)if(Ht.length>0){Dt&&ie&&e.texStorage2D(i.TEXTURE_2D,ht,Pt,Ht[0].width,Ht[0].height);for(let Y=0,Z=Ht.length;Y<Z;Y++)mt=Ht[Y],Dt?I&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,mt.width,mt.height,pt,Rt,mt.data):e.texImage2D(i.TEXTURE_2D,Y,Pt,mt.width,mt.height,0,pt,Rt,mt.data);T.generateMipmaps=!1}else Dt?(ie&&e.texStorage2D(i.TEXTURE_2D,ht,Pt,tt.width,tt.height),I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt.width,tt.height,pt,Rt,tt.data)):e.texImage2D(i.TEXTURE_2D,0,Pt,tt.width,tt.height,0,pt,Rt,tt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Dt&&ie&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ht,Pt,Ht[0].width,Ht[0].height,tt.depth);for(let Y=0,Z=Ht.length;Y<Z;Y++)if(mt=Ht[Y],T.format!==Cn)if(pt!==null)if(Dt){if(I)if(T.layerUpdates.size>0){const at=sd(mt.width,mt.height,T.format,T.type);for(const ft of T.layerUpdates){const Wt=mt.data.subarray(ft*at/mt.data.BYTES_PER_ELEMENT,(ft+1)*at/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,ft,mt.width,mt.height,1,pt,Wt,0,0)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,mt.width,mt.height,tt.depth,pt,mt.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,Pt,mt.width,mt.height,tt.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?I&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,mt.width,mt.height,tt.depth,pt,Rt,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Y,Pt,mt.width,mt.height,tt.depth,0,pt,Rt,mt.data)}else{Dt&&ie&&e.texStorage2D(i.TEXTURE_2D,ht,Pt,Ht[0].width,Ht[0].height);for(let Y=0,Z=Ht.length;Y<Z;Y++)mt=Ht[Y],T.format!==Cn?pt!==null?Dt?I&&e.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,mt.width,mt.height,pt,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,Y,Pt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?I&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,mt.width,mt.height,pt,Rt,mt.data):e.texImage2D(i.TEXTURE_2D,Y,Pt,mt.width,mt.height,0,pt,Rt,mt.data)}else if(T.isDataArrayTexture)if(Dt){if(ie&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ht,Pt,tt.width,tt.height,tt.depth),I)if(T.layerUpdates.size>0){const Y=sd(tt.width,tt.height,T.format,T.type);for(const Z of T.layerUpdates){const at=tt.data.subarray(Z*Y/tt.data.BYTES_PER_ELEMENT,(Z+1)*Y/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,tt.width,tt.height,1,pt,Rt,at)}T.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,pt,Rt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Pt,tt.width,tt.height,tt.depth,0,pt,Rt,tt.data);else if(T.isData3DTexture)Dt?(ie&&e.texStorage3D(i.TEXTURE_3D,ht,Pt,tt.width,tt.height,tt.depth),I&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,pt,Rt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,Pt,tt.width,tt.height,tt.depth,0,pt,Rt,tt.data);else if(T.isFramebufferTexture){if(ie)if(Dt)e.texStorage2D(i.TEXTURE_2D,ht,Pt,tt.width,tt.height);else{let Y=tt.width,Z=tt.height;for(let at=0;at<ht;at++)e.texImage2D(i.TEXTURE_2D,at,Pt,Y,Z,0,pt,Rt,null),Y>>=1,Z>>=1}}else if(Ht.length>0){if(Dt&&ie){const Y=At(Ht[0]);e.texStorage2D(i.TEXTURE_2D,ht,Pt,Y.width,Y.height)}for(let Y=0,Z=Ht.length;Y<Z;Y++)mt=Ht[Y],Dt?I&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,pt,Rt,mt):e.texImage2D(i.TEXTURE_2D,Y,Pt,pt,Rt,mt);T.generateMipmaps=!1}else if(Dt){if(ie){const Y=At(tt);e.texStorage2D(i.TEXTURE_2D,ht,Pt,Y.width,Y.height)}I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,pt,Rt,tt)}else e.texImage2D(i.TEXTURE_2D,0,Pt,pt,Rt,tt);d(T)&&m(K),gt.__version=q.version,T.onUpdate&&T.onUpdate(T)}R.__version=T.version}function $(R,T,z){if(T.image.length!==6)return;const K=Ct(R,T),Q=T.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+z);const q=n.get(Q);if(Q.version!==q.__version||K===!0){e.activeTexture(i.TEXTURE0+z);const gt=jt.getPrimaries(jt.workingColorSpace),rt=T.colorSpace===mi?null:jt.getPrimaries(T.colorSpace),ut=T.colorSpace===mi||gt===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);const $t=T.isCompressedTexture||T.image[0].isCompressedTexture,tt=T.image[0]&&T.image[0].isDataTexture,pt=[];for(let Z=0;Z<6;Z++)!$t&&!tt?pt[Z]=_(T.image[Z],!0,r.maxCubemapSize):pt[Z]=tt?T.image[Z].image:T.image[Z],pt[Z]=te(T,pt[Z]);const Rt=pt[0],Pt=s.convert(T.format,T.colorSpace),mt=s.convert(T.type),Ht=E(T.internalFormat,Pt,mt,T.colorSpace),Dt=T.isVideoTexture!==!0,ie=q.__version===void 0||K===!0,I=Q.dataReady;let ht=M(T,Rt);ct(i.TEXTURE_CUBE_MAP,T);let Y;if($t){Dt&&ie&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,Ht,Rt.width,Rt.height);for(let Z=0;Z<6;Z++){Y=pt[Z].mipmaps;for(let at=0;at<Y.length;at++){const ft=Y[at];T.format!==Cn?Pt!==null?Dt?I&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at,0,0,ft.width,ft.height,Pt,ft.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at,Ht,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Dt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at,0,0,ft.width,ft.height,Pt,mt,ft.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at,Ht,ft.width,ft.height,0,Pt,mt,ft.data)}}}else{if(Y=T.mipmaps,Dt&&ie){Y.length>0&&ht++;const Z=At(pt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,Ht,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(tt){Dt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,pt[Z].width,pt[Z].height,Pt,mt,pt[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ht,pt[Z].width,pt[Z].height,0,Pt,mt,pt[Z].data);for(let at=0;at<Y.length;at++){const Wt=Y[at].image[Z].image;Dt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at+1,0,0,Wt.width,Wt.height,Pt,mt,Wt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at+1,Ht,Wt.width,Wt.height,0,Pt,mt,Wt.data)}}else{Dt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Pt,mt,pt[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ht,Pt,mt,pt[Z]);for(let at=0;at<Y.length;at++){const ft=Y[at];Dt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at+1,0,0,Pt,mt,ft.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at+1,Ht,Pt,mt,ft.image[Z])}}}d(T)&&m(i.TEXTURE_CUBE_MAP),q.__version=Q.version,T.onUpdate&&T.onUpdate(T)}R.__version=T.version}function j(R,T,z,K,Q,q){const gt=s.convert(z.format,z.colorSpace),rt=s.convert(z.type),ut=E(z.internalFormat,gt,rt,z.colorSpace);if(!n.get(T).__hasExternalTextures){const tt=Math.max(1,T.width>>q),pt=Math.max(1,T.height>>q);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,q,ut,tt,pt,T.depth,0,gt,rt,null):e.texImage2D(Q,q,ut,tt,pt,0,gt,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),zt(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Q,n.get(z).__webglTexture,0,Ot(T)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,Q,n.get(z).__webglTexture,q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function dt(R,T,z){if(i.bindRenderbuffer(i.RENDERBUFFER,R),T.depthBuffer){const K=T.depthTexture,Q=K&&K.isDepthTexture?K.type:null,q=x(T.stencilBuffer,Q),gt=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=Ot(T);zt(T)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt,q,T.width,T.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt,q,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,q,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,gt,i.RENDERBUFFER,R)}else{const K=T.textures;for(let Q=0;Q<K.length;Q++){const q=K[Q],gt=s.convert(q.format,q.colorSpace),rt=s.convert(q.type),ut=E(q.internalFormat,gt,rt,q.colorSpace),$t=Ot(T);z&&zt(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,$t,ut,T.width,T.height):zt(T)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$t,ut,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,ut,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ot(R,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),k(T.depthTexture,0);const K=n.get(T.depthTexture).__webglTexture,Q=Ot(T);if(T.depthTexture.format===$r)zt(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(T.depthTexture.format===us)zt(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function St(R){const T=n.get(R),z=R.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==R.depthTexture){const K=R.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),K){const Q=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),T.__depthDisposeCallback=Q}T.__boundDepthTexture=K}if(R.depthTexture&&!T.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");ot(T.__webglFramebuffer,R)}else if(z){T.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[K]),T.__webglDepthbuffer[K]===void 0)T.__webglDepthbuffer[K]=i.createRenderbuffer(),dt(T.__webglDepthbuffer[K],R,!1);else{const Q=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=T.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,q)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=i.createRenderbuffer(),dt(T.__webglDepthbuffer,R,!1);else{const K=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=T.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,Q)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function yt(R,T,z){const K=n.get(R);T!==void 0&&j(K.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&St(R)}function Ft(R){const T=R.texture,z=n.get(R),K=n.get(T);R.addEventListener("dispose",A);const Q=R.textures,q=R.isWebGLCubeRenderTarget===!0,gt=Q.length>1;if(gt||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=T.version,o.memory.textures++),q){z.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(T.mipmaps&&T.mipmaps.length>0){z.__webglFramebuffer[rt]=[];for(let ut=0;ut<T.mipmaps.length;ut++)z.__webglFramebuffer[rt][ut]=i.createFramebuffer()}else z.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){z.__webglFramebuffer=[];for(let rt=0;rt<T.mipmaps.length;rt++)z.__webglFramebuffer[rt]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(gt)for(let rt=0,ut=Q.length;rt<ut;rt++){const $t=n.get(Q[rt]);$t.__webglTexture===void 0&&($t.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&zt(R)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let rt=0;rt<Q.length;rt++){const ut=Q[rt];z.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[rt]);const $t=s.convert(ut.format,ut.colorSpace),tt=s.convert(ut.type),pt=E(ut.internalFormat,$t,tt,ut.colorSpace,R.isXRRenderTarget===!0),Rt=Ot(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,pt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,z.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),dt(z.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),ct(i.TEXTURE_CUBE_MAP,T);for(let rt=0;rt<6;rt++)if(T.mipmaps&&T.mipmaps.length>0)for(let ut=0;ut<T.mipmaps.length;ut++)j(z.__webglFramebuffer[rt][ut],R,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,ut);else j(z.__webglFramebuffer[rt],R,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);d(T)&&m(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let rt=0,ut=Q.length;rt<ut;rt++){const $t=Q[rt],tt=n.get($t);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture),ct(i.TEXTURE_2D,$t),j(z.__webglFramebuffer,R,$t,i.COLOR_ATTACHMENT0+rt,i.TEXTURE_2D,0),d($t)&&m(i.TEXTURE_2D)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(rt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,K.__webglTexture),ct(rt,T),T.mipmaps&&T.mipmaps.length>0)for(let ut=0;ut<T.mipmaps.length;ut++)j(z.__webglFramebuffer[ut],R,T,i.COLOR_ATTACHMENT0,rt,ut);else j(z.__webglFramebuffer,R,T,i.COLOR_ATTACHMENT0,rt,0);d(T)&&m(rt),e.unbindTexture()}R.depthBuffer&&St(R)}function Xt(R){const T=R.textures;for(let z=0,K=T.length;z<K;z++){const Q=T[z];if(d(Q)){const q=R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,gt=n.get(Q).__webglTexture;e.bindTexture(q,gt),m(q),e.unbindTexture()}}}const Bt=[],D=[];function Pe(R){if(R.samples>0){if(zt(R)===!1){const T=R.textures,z=R.width,K=R.height;let Q=i.COLOR_BUFFER_BIT;const q=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=n.get(R),rt=T.length>1;if(rt)for(let ut=0;ut<T.length;ut++)e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let ut=0;ut<T.length;ut++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,gt.__webglColorRenderbuffer[ut]);const $t=n.get(T[ut]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$t,0)}i.blitFramebuffer(0,0,z,K,0,0,z,K,Q,i.NEAREST),l===!0&&(Bt.length=0,D.length=0,Bt.push(i.COLOR_ATTACHMENT0+ut),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Bt.push(q),D.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,D)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Bt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let ut=0;ut<T.length;ut++){e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,gt.__webglColorRenderbuffer[ut]);const $t=n.get(T[ut]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,$t,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const T=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[T])}}}function Ot(R){return Math.min(r.maxSamples,R.samples)}function zt(R){const T=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Tt(R){const T=o.render.frame;u.get(R)!==T&&(u.set(R,T),R.update())}function te(R,T){const z=R.colorSpace,K=R.format,Q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||z!==Oi&&z!==mi&&(jt.getTransfer(z)===se?(K!==Cn||Q!==ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),T}function At(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=y,this.setTexture2D=k,this.setTexture2DArray=X,this.setTexture3D=B,this.setTextureCube=W,this.rebindTextures=yt,this.setupRenderTarget=Ft,this.updateRenderTargetMipmap=Xt,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=j,this.useMultisampledRTT=zt}function cw(i,t){function e(n,r=mi){let s;const o=jt.getTransfer(r);if(n===ri)return i.UNSIGNED_BYTE;if(n===Xu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===$u)return i.UNSIGNED_SHORT_5_5_5_1;if(n===xm)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===gm)return i.BYTE;if(n===vm)return i.SHORT;if(n===qs)return i.UNSIGNED_SHORT;if(n===Wu)return i.INT;if(n===lr)return i.UNSIGNED_INT;if(n===jn)return i.FLOAT;if(n===eo)return i.HALF_FLOAT;if(n===Em)return i.ALPHA;if(n===Mm)return i.RGB;if(n===Cn)return i.RGBA;if(n===Sm)return i.LUMINANCE;if(n===ym)return i.LUMINANCE_ALPHA;if(n===$r)return i.DEPTH_COMPONENT;if(n===us)return i.DEPTH_STENCIL;if(n===Tm)return i.RED;if(n===Yu)return i.RED_INTEGER;if(n===bm)return i.RG;if(n===qu)return i.RG_INTEGER;if(n===Ku)return i.RGBA_INTEGER;if(n===Jo||n===Qo||n===ta||n===ea)if(o===se)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Jo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Qo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ta)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ea)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Jo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Qo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ta)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ea)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Lc||n===Ic||n===Nc||n===Oc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Lc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ic)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Nc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Oc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Uc||n===Fc||n===Bc)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Uc||n===Fc)return o===se?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Bc)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===zc||n===kc||n===Vc||n===Hc||n===Gc||n===Wc||n===Xc||n===$c||n===Yc||n===qc||n===Kc||n===jc||n===Zc||n===Jc)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===zc)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===kc)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Vc)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Hc)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Gc)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Wc)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Xc)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===$c)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Yc)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qc)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Kc)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===jc)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Zc)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Jc)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===na||n===Qc||n===tu)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===na)return o===se?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===tu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Am||n===eu||n===nu||n===iu)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===na)return s.COMPRESSED_RED_RGTC1_EXT;if(n===eu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===nu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===iu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===cs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class uw extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Rn extends Me{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hw={type:"move"};class $l{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Rn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Rn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Rn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const d=e.getJointPose(_,n),m=this._getHandJoint(c,_);d!==null&&(m.matrix.fromArray(d.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=d.radius),m.visible=d!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(hw)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Rn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const fw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class pw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new Xe,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Pi({vertexShader:fw,fragmentShader:dw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Gt(new gs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mw extends _s{constructor(t,e){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,g=null;const _=new pw,d=e.getContextAttributes();let m=null,E=null;const x=[],M=[],w=new Vt;let A=null;const S=new Je;S.layers.enable(1),S.viewport=new Jt;const C=new Je;C.layers.enable(2),C.viewport=new Jt;const P=[S,C],v=new uw;v.layers.enable(1),v.layers.enable(2);let y=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let j=x[$];return j===void 0&&(j=new $l,x[$]=j),j.getTargetRaySpace()},this.getControllerGrip=function($){let j=x[$];return j===void 0&&(j=new $l,x[$]=j),j.getGripSpace()},this.getHand=function($){let j=x[$];return j===void 0&&(j=new $l,x[$]=j),j.getHandSpace()};function O($){const j=M.indexOf($.inputSource);if(j===-1)return;const dt=x[j];dt!==void 0&&(dt.update($.inputSource,$.frame,c||o),dt.dispatchEvent({type:$.type,data:$.inputSource}))}function k(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",X);for(let $=0;$<x.length;$++){const j=M[$];j!==null&&(M[$]=null,x[$].disconnect(j))}y=null,N=null,_.reset(),t.setRenderTarget(m),p=null,f=null,h=null,r=null,E=null,Nt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(m=t.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",k),r.addEventListener("inputsourceschange",X),d.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(w),r.renderState.layers===void 0){const j={antialias:d.antialias,alpha:!0,depth:d.depth,stencil:d.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,j),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new cr(p.framebufferWidth,p.framebufferHeight,{format:Cn,type:ri,colorSpace:t.outputColorSpace,stencilBuffer:d.stencil})}else{let j=null,dt=null,ot=null;d.depth&&(ot=d.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,j=d.stencil?us:$r,dt=d.stencil?cs:lr);const St={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:s};h=new XRWebGLBinding(r,e),f=h.createProjectionLayer(St),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),E=new cr(f.textureWidth,f.textureHeight,{format:Cn,type:ri,depthTexture:new Vm(f.textureWidth,f.textureHeight,dt,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:d.stencil,colorSpace:t.outputColorSpace,samples:d.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Nt.setContext(r),Nt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X($){for(let j=0;j<$.removed.length;j++){const dt=$.removed[j],ot=M.indexOf(dt);ot>=0&&(M[ot]=null,x[ot].disconnect(dt))}for(let j=0;j<$.added.length;j++){const dt=$.added[j];let ot=M.indexOf(dt);if(ot===-1){for(let yt=0;yt<x.length;yt++)if(yt>=M.length){M.push(dt),ot=yt;break}else if(M[yt]===null){M[yt]=dt,ot=yt;break}if(ot===-1)break}const St=x[ot];St&&St.connect(dt)}}const B=new L,W=new L;function G($,j,dt){B.setFromMatrixPosition(j.matrixWorld),W.setFromMatrixPosition(dt.matrixWorld);const ot=B.distanceTo(W),St=j.projectionMatrix.elements,yt=dt.projectionMatrix.elements,Ft=St[14]/(St[10]-1),Xt=St[14]/(St[10]+1),Bt=(St[9]+1)/St[5],D=(St[9]-1)/St[5],Pe=(St[8]-1)/St[0],Ot=(yt[8]+1)/yt[0],zt=Ft*Pe,Tt=Ft*Ot,te=ot/(-Pe+Ot),At=te*-Pe;if(j.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(At),$.translateZ(te),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),St[10]===-1)$.projectionMatrix.copy(j.projectionMatrix),$.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const R=Ft+te,T=Xt+te,z=zt-At,K=Tt+(ot-At),Q=Bt*Xt/T*R,q=D*Xt/T*R;$.projectionMatrix.makePerspective(z,K,Q,q,R,T),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function nt($,j){j===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(j.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let j=$.near,dt=$.far;_.texture!==null&&(_.depthNear>0&&(j=_.depthNear),_.depthFar>0&&(dt=_.depthFar)),v.near=C.near=S.near=j,v.far=C.far=S.far=dt,(y!==v.near||N!==v.far)&&(r.updateRenderState({depthNear:v.near,depthFar:v.far}),y=v.near,N=v.far);const ot=$.parent,St=v.cameras;nt(v,ot);for(let yt=0;yt<St.length;yt++)nt(St[yt],ot);St.length===2?G(v,S,C):v.projectionMatrix.copy(S.projectionMatrix),it($,v,ot)};function it($,j,dt){dt===null?$.matrix.copy(j.matrixWorld):($.matrix.copy(dt.matrixWorld),$.matrix.invert(),$.matrix.multiply(j.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(j.projectionMatrix),$.projectionMatrixInverse.copy(j.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=ru*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let ct=null;function Ct($,j){if(u=j.getViewerPose(c||o),g=j,u!==null){const dt=u.views;p!==null&&(t.setRenderTargetFramebuffer(E,p.framebuffer),t.setRenderTarget(E));let ot=!1;dt.length!==v.cameras.length&&(v.cameras.length=0,ot=!0);for(let yt=0;yt<dt.length;yt++){const Ft=dt[yt];let Xt=null;if(p!==null)Xt=p.getViewport(Ft);else{const D=h.getViewSubImage(f,Ft);Xt=D.viewport,yt===0&&(t.setRenderTargetTextures(E,D.colorTexture,f.ignoreDepthValues?void 0:D.depthStencilTexture),t.setRenderTarget(E))}let Bt=P[yt];Bt===void 0&&(Bt=new Je,Bt.layers.enable(yt),Bt.viewport=new Jt,P[yt]=Bt),Bt.matrix.fromArray(Ft.transform.matrix),Bt.matrix.decompose(Bt.position,Bt.quaternion,Bt.scale),Bt.projectionMatrix.fromArray(Ft.projectionMatrix),Bt.projectionMatrixInverse.copy(Bt.projectionMatrix).invert(),Bt.viewport.set(Xt.x,Xt.y,Xt.width,Xt.height),yt===0&&(v.matrix.copy(Bt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ot===!0&&v.cameras.push(Bt)}const St=r.enabledFeatures;if(St&&St.includes("depth-sensing")){const yt=h.getDepthInformation(dt[0]);yt&&yt.isValid&&yt.texture&&_.init(t,yt,r.renderState)}}for(let dt=0;dt<x.length;dt++){const ot=M[dt],St=x[dt];ot!==null&&St!==void 0&&St.update(ot,j,c||o)}ct&&ct($,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}const Nt=new zm;Nt.setAnimationLoop(Ct),this.setAnimationLoop=function($){ct=$},this.dispose=function(){}}}const Wi=new kn,_w=new oe;function gw(i,t){function e(d,m){d.matrixAutoUpdate===!0&&d.updateMatrix(),m.value.copy(d.matrix)}function n(d,m){m.color.getRGB(d.fogColor.value,Um(i)),m.isFog?(d.fogNear.value=m.near,d.fogFar.value=m.far):m.isFogExp2&&(d.fogDensity.value=m.density)}function r(d,m,E,x,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(d,m):m.isMeshToonMaterial?(s(d,m),h(d,m)):m.isMeshPhongMaterial?(s(d,m),u(d,m)):m.isMeshStandardMaterial?(s(d,m),f(d,m),m.isMeshPhysicalMaterial&&p(d,m,M)):m.isMeshMatcapMaterial?(s(d,m),g(d,m)):m.isMeshDepthMaterial?s(d,m):m.isMeshDistanceMaterial?(s(d,m),_(d,m)):m.isMeshNormalMaterial?s(d,m):m.isLineBasicMaterial?(o(d,m),m.isLineDashedMaterial&&a(d,m)):m.isPointsMaterial?l(d,m,E,x):m.isSpriteMaterial?c(d,m):m.isShadowMaterial?(d.color.value.copy(m.color),d.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(d,m){d.opacity.value=m.opacity,m.color&&d.diffuse.value.copy(m.color),m.emissive&&d.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(d.map.value=m.map,e(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.bumpMap&&(d.bumpMap.value=m.bumpMap,e(m.bumpMap,d.bumpMapTransform),d.bumpScale.value=m.bumpScale,m.side===We&&(d.bumpScale.value*=-1)),m.normalMap&&(d.normalMap.value=m.normalMap,e(m.normalMap,d.normalMapTransform),d.normalScale.value.copy(m.normalScale),m.side===We&&d.normalScale.value.negate()),m.displacementMap&&(d.displacementMap.value=m.displacementMap,e(m.displacementMap,d.displacementMapTransform),d.displacementScale.value=m.displacementScale,d.displacementBias.value=m.displacementBias),m.emissiveMap&&(d.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,d.emissiveMapTransform)),m.specularMap&&(d.specularMap.value=m.specularMap,e(m.specularMap,d.specularMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest);const E=t.get(m),x=E.envMap,M=E.envMapRotation;x&&(d.envMap.value=x,Wi.copy(M),Wi.x*=-1,Wi.y*=-1,Wi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Wi.y*=-1,Wi.z*=-1),d.envMapRotation.value.setFromMatrix4(_w.makeRotationFromEuler(Wi)),d.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=m.reflectivity,d.ior.value=m.ior,d.refractionRatio.value=m.refractionRatio),m.lightMap&&(d.lightMap.value=m.lightMap,d.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,d.lightMapTransform)),m.aoMap&&(d.aoMap.value=m.aoMap,d.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,d.aoMapTransform))}function o(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,m.map&&(d.map.value=m.map,e(m.map,d.mapTransform))}function a(d,m){d.dashSize.value=m.dashSize,d.totalSize.value=m.dashSize+m.gapSize,d.scale.value=m.scale}function l(d,m,E,x){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.size.value=m.size*E,d.scale.value=x*.5,m.map&&(d.map.value=m.map,e(m.map,d.uvTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function c(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.rotation.value=m.rotation,m.map&&(d.map.value=m.map,e(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function u(d,m){d.specular.value.copy(m.specular),d.shininess.value=Math.max(m.shininess,1e-4)}function h(d,m){m.gradientMap&&(d.gradientMap.value=m.gradientMap)}function f(d,m){d.metalness.value=m.metalness,m.metalnessMap&&(d.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,d.metalnessMapTransform)),d.roughness.value=m.roughness,m.roughnessMap&&(d.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,d.roughnessMapTransform)),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)}function p(d,m,E){d.ior.value=m.ior,m.sheen>0&&(d.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),d.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(d.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,d.sheenColorMapTransform)),m.sheenRoughnessMap&&(d.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,d.sheenRoughnessMapTransform))),m.clearcoat>0&&(d.clearcoat.value=m.clearcoat,d.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(d.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,d.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(d.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===We&&d.clearcoatNormalScale.value.negate())),m.dispersion>0&&(d.dispersion.value=m.dispersion),m.iridescence>0&&(d.iridescence.value=m.iridescence,d.iridescenceIOR.value=m.iridescenceIOR,d.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(d.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,d.iridescenceMapTransform)),m.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),m.transmission>0&&(d.transmission.value=m.transmission,d.transmissionSamplerMap.value=E.texture,d.transmissionSamplerSize.value.set(E.width,E.height),m.transmissionMap&&(d.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,d.transmissionMapTransform)),d.thickness.value=m.thickness,m.thicknessMap&&(d.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=m.attenuationDistance,d.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(d.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(d.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=m.specularIntensity,d.specularColor.value.copy(m.specularColor),m.specularColorMap&&(d.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,d.specularColorMapTransform)),m.specularIntensityMap&&(d.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,m){m.matcap&&(d.matcap.value=m.matcap)}function _(d,m){const E=t.get(m).light;d.referencePosition.value.setFromMatrixPosition(E.matrixWorld),d.nearDistance.value=E.shadow.camera.near,d.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function vw(i,t,e,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,x){const M=x.program;n.uniformBlockBinding(E,M)}function c(E,x){let M=r[E.id];M===void 0&&(g(E),M=u(E),r[E.id]=M,E.addEventListener("dispose",d));const w=x.program;n.updateUBOMapping(E,w);const A=t.render.frame;s[E.id]!==A&&(f(E),s[E.id]=A)}function u(E){const x=h();E.__bindingPointIndex=x;const M=i.createBuffer(),w=E.__size,A=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,w,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,M),M}function h(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const x=r[E.id],M=E.uniforms,w=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let A=0,S=M.length;A<S;A++){const C=Array.isArray(M[A])?M[A]:[M[A]];for(let P=0,v=C.length;P<v;P++){const y=C[P];if(p(y,A,P,w)===!0){const N=y.__offset,O=Array.isArray(y.value)?y.value:[y.value];let k=0;for(let X=0;X<O.length;X++){const B=O[X],W=_(B);typeof B=="number"||typeof B=="boolean"?(y.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,N+k,y.__data)):B.isMatrix3?(y.__data[0]=B.elements[0],y.__data[1]=B.elements[1],y.__data[2]=B.elements[2],y.__data[3]=0,y.__data[4]=B.elements[3],y.__data[5]=B.elements[4],y.__data[6]=B.elements[5],y.__data[7]=0,y.__data[8]=B.elements[6],y.__data[9]=B.elements[7],y.__data[10]=B.elements[8],y.__data[11]=0):(B.toArray(y.__data,k),k+=W.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,y.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(E,x,M,w){const A=E.value,S=x+"_"+M;if(w[S]===void 0)return typeof A=="number"||typeof A=="boolean"?w[S]=A:w[S]=A.clone(),!0;{const C=w[S];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return w[S]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function g(E){const x=E.uniforms;let M=0;const w=16;for(let S=0,C=x.length;S<C;S++){const P=Array.isArray(x[S])?x[S]:[x[S]];for(let v=0,y=P.length;v<y;v++){const N=P[v],O=Array.isArray(N.value)?N.value:[N.value];for(let k=0,X=O.length;k<X;k++){const B=O[k],W=_(B),G=M%w,nt=G%W.boundary,it=G+nt;M+=nt,it!==0&&w-it<W.storage&&(M+=w-it),N.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=M,M+=W.storage}}}const A=M%w;return A>0&&(M+=w-A),E.__size=M,E.__cache={},this}function _(E){const x={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(x.boundary=4,x.storage=4):E.isVector2?(x.boundary=8,x.storage=8):E.isVector3||E.isColor?(x.boundary=16,x.storage=12):E.isVector4?(x.boundary=16,x.storage=16):E.isMatrix3?(x.boundary=48,x.storage=48):E.isMatrix4?(x.boundary=64,x.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),x}function d(E){const x=E.target;x.removeEventListener("dispose",d);const M=o.indexOf(x.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function m(){for(const E in r)i.deleteBuffer(r[E]);o=[],r={},s={}}return{bind:l,update:c,dispose:m}}class xw{constructor(t={}){const{canvas:e=oS(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,d=null;const m=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=bn,this.toneMapping=Si,this.toneMappingExposure=1;const x=this;let M=!1,w=0,A=0,S=null,C=-1,P=null;const v=new Jt,y=new Jt;let N=null;const O=new Ut(0);let k=0,X=e.width,B=e.height,W=1,G=null,nt=null;const it=new Jt(0,0,X,B),ct=new Jt(0,0,X,B);let Ct=!1;const Nt=new Ju;let $=!1,j=!1;const dt=new oe,ot=new oe,St=new L,yt=new Jt,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xt=!1;function Bt(){return S===null?W:1}let D=n;function Pe(b,U){return e.getContext(b,U)}try{const b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Gu}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",at,!1),e.addEventListener("webglcontextcreationerror",ft,!1),D===null){const U="webgl2";if(D=Pe(U,b),D===null)throw Pe(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Ot,zt,Tt,te,At,R,T,z,K,Q,q,gt,rt,ut,$t,tt,pt,Rt,Pt,mt,Ht,Dt,ie,I;function ht(){Ot=new Tb(D),Ot.init(),Dt=new cw(D,Ot),zt=new vb(D,Ot,t,Dt),Tt=new ow(D),zt.reverseDepthBuffer&&Tt.buffers.depth.setReversed(!0),te=new wb(D),At=new XA,R=new lw(D,Ot,Tt,At,zt,Dt,te),T=new Eb(x),z=new yb(x),K=new NS(D),ie=new _b(D,K),Q=new bb(D,K,te,ie),q=new Rb(D,Q,K,te),Pt=new Cb(D,zt,R),tt=new xb(At),gt=new WA(x,T,z,Ot,zt,ie,tt),rt=new gw(x,At),ut=new YA,$t=new QA(Ot),Rt=new mb(x,T,z,Tt,q,f,l),pt=new rw(x,q,zt),I=new vw(D,te,zt,Tt),mt=new gb(D,Ot,te),Ht=new Ab(D,Ot,te),te.programs=gt.programs,x.capabilities=zt,x.extensions=Ot,x.properties=At,x.renderLists=ut,x.shadowMap=pt,x.state=Tt,x.info=te}ht();const Y=new mw(x,D);this.xr=Y,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const b=Ot.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ot.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(b){b!==void 0&&(W=b,this.setSize(X,B,!1))},this.getSize=function(b){return b.set(X,B)},this.setSize=function(b,U,V=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=b,B=U,e.width=Math.floor(b*W),e.height=Math.floor(U*W),V===!0&&(e.style.width=b+"px",e.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(X*W,B*W).floor()},this.setDrawingBufferSize=function(b,U,V){X=b,B=U,W=V,e.width=Math.floor(b*V),e.height=Math.floor(U*V),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(v)},this.getViewport=function(b){return b.copy(it)},this.setViewport=function(b,U,V,H){b.isVector4?it.set(b.x,b.y,b.z,b.w):it.set(b,U,V,H),Tt.viewport(v.copy(it).multiplyScalar(W).round())},this.getScissor=function(b){return b.copy(ct)},this.setScissor=function(b,U,V,H){b.isVector4?ct.set(b.x,b.y,b.z,b.w):ct.set(b,U,V,H),Tt.scissor(y.copy(ct).multiplyScalar(W).round())},this.getScissorTest=function(){return Ct},this.setScissorTest=function(b){Tt.setScissorTest(Ct=b)},this.setOpaqueSort=function(b){G=b},this.setTransparentSort=function(b){nt=b},this.getClearColor=function(b){return b.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(b=!0,U=!0,V=!0){let H=0;if(b){let F=!1;if(S!==null){const et=S.texture.format;F=et===Ku||et===qu||et===Yu}if(F){const et=S.texture.type,lt=et===ri||et===lr||et===qs||et===cs||et===Xu||et===$u,_t=Rt.getClearColor(),vt=Rt.getClearAlpha(),bt=_t.r,wt=_t.g,xt=_t.b;lt?(p[0]=bt,p[1]=wt,p[2]=xt,p[3]=vt,D.clearBufferuiv(D.COLOR,0,p)):(g[0]=bt,g[1]=wt,g[2]=xt,g[3]=vt,D.clearBufferiv(D.COLOR,0,g))}else H|=D.COLOR_BUFFER_BIT}U&&(H|=D.DEPTH_BUFFER_BIT,D.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),V&&(H|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",at,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),ut.dispose(),$t.dispose(),At.dispose(),T.dispose(),z.dispose(),q.dispose(),ie.dispose(),I.dispose(),gt.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",ih),Y.removeEventListener("sessionend",rh),Ui.stop()};function Z(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function at(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const b=te.autoReset,U=pt.enabled,V=pt.autoUpdate,H=pt.needsUpdate,F=pt.type;ht(),te.autoReset=b,pt.enabled=U,pt.autoUpdate=V,pt.needsUpdate=H,pt.type=F}function ft(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Wt(b){const U=b.target;U.removeEventListener("dispose",Wt),me(U)}function me(b){Ne(b),At.remove(b)}function Ne(b){const U=At.get(b).programs;U!==void 0&&(U.forEach(function(V){gt.releaseProgram(V)}),b.isShaderMaterial&&gt.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,V,H,F,et){U===null&&(U=Ft);const lt=F.isMesh&&F.matrixWorld.determinant()<0,_t=jm(b,U,V,H,F);Tt.setMaterial(H,lt);let vt=V.index,bt=1;if(H.wireframe===!0){if(vt=Q.getWireframeAttribute(V),vt===void 0)return;bt=2}const wt=V.drawRange,xt=V.attributes.position;let Zt=wt.start*bt,re=(wt.start+wt.count)*bt;et!==null&&(Zt=Math.max(Zt,et.start*bt),re=Math.min(re,(et.start+et.count)*bt)),vt!==null?(Zt=Math.max(Zt,0),re=Math.min(re,vt.count)):xt!=null&&(Zt=Math.max(Zt,0),re=Math.min(re,xt.count));const he=re-Zt;if(he<0||he===1/0)return;ie.setup(F,H,_t,V,vt);let Ye,qt=mt;if(vt!==null&&(Ye=K.get(vt),qt=Ht,qt.setIndex(Ye)),F.isMesh)H.wireframe===!0?(Tt.setLineWidth(H.wireframeLinewidth*Bt()),qt.setMode(D.LINES)):qt.setMode(D.TRIANGLES);else if(F.isLine){let Et=H.linewidth;Et===void 0&&(Et=1),Tt.setLineWidth(Et*Bt()),F.isLineSegments?qt.setMode(D.LINES):F.isLineLoop?qt.setMode(D.LINE_LOOP):qt.setMode(D.LINE_STRIP)}else F.isPoints?qt.setMode(D.POINTS):F.isSprite&&qt.setMode(D.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)qt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ot.get("WEBGL_multi_draw"))qt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Et=F._multiDrawStarts,Te=F._multiDrawCounts,Kt=F._multiDrawCount,Mn=vt?K.get(vt).bytesPerElement:1,gr=At.get(H).currentProgram.getUniforms();for(let qe=0;qe<Kt;qe++)gr.setValue(D,"_gl_DrawID",qe),qt.render(Et[qe]/Mn,Te[qe])}else if(F.isInstancedMesh)qt.renderInstances(Zt,he,F.count);else if(V.isInstancedBufferGeometry){const Et=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Te=Math.min(V.instanceCount,Et);qt.renderInstances(Zt,he,Te)}else qt.render(Zt,he)};function Yt(b,U,V){b.transparent===!0&&b.side===An&&b.forceSinglePass===!1?(b.side=We,b.needsUpdate=!0,lo(b,U,V),b.side=Ri,b.needsUpdate=!0,lo(b,U,V),b.side=An):lo(b,U,V)}this.compile=function(b,U,V=null){V===null&&(V=b),d=$t.get(V),d.init(U),E.push(d),V.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),b!==V&&b.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),d.setupLights();const H=new Set;return b.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const et=F.material;if(et)if(Array.isArray(et))for(let lt=0;lt<et.length;lt++){const _t=et[lt];Yt(_t,V,F),H.add(_t)}else Yt(et,V,F),H.add(et)}),E.pop(),d=null,H},this.compileAsync=function(b,U,V=null){const H=this.compile(b,U,V);return new Promise(F=>{function et(){if(H.forEach(function(lt){At.get(lt).currentProgram.isReady()&&H.delete(lt)}),H.size===0){F(b);return}setTimeout(et,10)}Ot.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let Oe=null;function Vn(b){Oe&&Oe(b)}function ih(){Ui.stop()}function rh(){Ui.start()}const Ui=new zm;Ui.setAnimationLoop(Vn),typeof self<"u"&&Ui.setContext(self),this.setAnimationLoop=function(b){Oe=b,Y.setAnimationLoop(b),b===null?Ui.stop():Ui.start()},Y.addEventListener("sessionstart",ih),Y.addEventListener("sessionend",rh),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(U),U=Y.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,U,S),d=$t.get(b,E.length),d.init(U),E.push(d),ot.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Nt.setFromProjectionMatrix(ot),j=this.localClippingEnabled,$=tt.init(this.clippingPlanes,j),_=ut.get(b,m.length),_.init(),m.push(_),Y.enabled===!0&&Y.isPresenting===!0){const et=x.xr.getDepthSensingMesh();et!==null&&Ga(et,U,-1/0,x.sortObjects)}Ga(b,U,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(G,nt),Xt=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Xt&&Rt.addToRenderList(_,b),this.info.render.frame++,$===!0&&tt.beginShadows();const V=d.state.shadowsArray;pt.render(V,b,U),$===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=_.opaque,F=_.transmissive;if(d.setupLights(),U.isArrayCamera){const et=U.cameras;if(F.length>0)for(let lt=0,_t=et.length;lt<_t;lt++){const vt=et[lt];oh(H,F,b,vt)}Xt&&Rt.render(b);for(let lt=0,_t=et.length;lt<_t;lt++){const vt=et[lt];sh(_,b,vt,vt.viewport)}}else F.length>0&&oh(H,F,b,U),Xt&&Rt.render(b),sh(_,b,U);S!==null&&(R.updateMultisampleRenderTarget(S),R.updateRenderTargetMipmap(S)),b.isScene===!0&&b.onAfterRender(x,b,U),ie.resetDefaultState(),C=-1,P=null,E.pop(),E.length>0?(d=E[E.length-1],$===!0&&tt.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function Ga(b,U,V,H){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)V=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)d.pushLight(b),b.castShadow&&d.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Nt.intersectsSprite(b)){H&&yt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ot);const lt=q.update(b),_t=b.material;_t.visible&&_.push(b,lt,_t,V,yt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Nt.intersectsObject(b))){const lt=q.update(b),_t=b.material;if(H&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),yt.copy(b.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),yt.copy(lt.boundingSphere.center)),yt.applyMatrix4(b.matrixWorld).applyMatrix4(ot)),Array.isArray(_t)){const vt=lt.groups;for(let bt=0,wt=vt.length;bt<wt;bt++){const xt=vt[bt],Zt=_t[xt.materialIndex];Zt&&Zt.visible&&_.push(b,lt,Zt,V,yt.z,xt)}}else _t.visible&&_.push(b,lt,_t,V,yt.z,null)}}const et=b.children;for(let lt=0,_t=et.length;lt<_t;lt++)Ga(et[lt],U,V,H)}function sh(b,U,V,H){const F=b.opaque,et=b.transmissive,lt=b.transparent;d.setupLightsView(V),$===!0&&tt.setGlobalState(x.clippingPlanes,V),H&&Tt.viewport(v.copy(H)),F.length>0&&ao(F,U,V),et.length>0&&ao(et,U,V),lt.length>0&&ao(lt,U,V),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function oh(b,U,V,H){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[H.id]===void 0&&(d.state.transmissionRenderTarget[H.id]=new cr(1,1,{generateMipmaps:!0,type:Ot.has("EXT_color_buffer_half_float")||Ot.has("EXT_color_buffer_float")?eo:ri,minFilter:tr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));const et=d.state.transmissionRenderTarget[H.id],lt=H.viewport||v;et.setSize(lt.z,lt.w);const _t=x.getRenderTarget();x.setRenderTarget(et),x.getClearColor(O),k=x.getClearAlpha(),k<1&&x.setClearColor(16777215,.5),x.clear(),Xt&&Rt.render(V);const vt=x.toneMapping;x.toneMapping=Si;const bt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),d.setupLightsView(H),$===!0&&tt.setGlobalState(x.clippingPlanes,H),ao(b,V,H),R.updateMultisampleRenderTarget(et),R.updateRenderTargetMipmap(et),Ot.has("WEBGL_multisampled_render_to_texture")===!1){let wt=!1;for(let xt=0,Zt=U.length;xt<Zt;xt++){const re=U[xt],he=re.object,Ye=re.geometry,qt=re.material,Et=re.group;if(qt.side===An&&he.layers.test(H.layers)){const Te=qt.side;qt.side=We,qt.needsUpdate=!0,ah(he,V,H,Ye,qt,Et),qt.side=Te,qt.needsUpdate=!0,wt=!0}}wt===!0&&(R.updateMultisampleRenderTarget(et),R.updateRenderTargetMipmap(et))}x.setRenderTarget(_t),x.setClearColor(O,k),bt!==void 0&&(H.viewport=bt),x.toneMapping=vt}function ao(b,U,V){const H=U.isScene===!0?U.overrideMaterial:null;for(let F=0,et=b.length;F<et;F++){const lt=b[F],_t=lt.object,vt=lt.geometry,bt=H===null?lt.material:H,wt=lt.group;_t.layers.test(V.layers)&&ah(_t,U,V,vt,bt,wt)}}function ah(b,U,V,H,F,et){b.onBeforeRender(x,U,V,H,F,et),b.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),F.onBeforeRender(x,U,V,H,b,et),F.transparent===!0&&F.side===An&&F.forceSinglePass===!1?(F.side=We,F.needsUpdate=!0,x.renderBufferDirect(V,U,H,F,b,et),F.side=Ri,F.needsUpdate=!0,x.renderBufferDirect(V,U,H,F,b,et),F.side=An):x.renderBufferDirect(V,U,H,F,b,et),b.onAfterRender(x,U,V,H,F,et)}function lo(b,U,V){U.isScene!==!0&&(U=Ft);const H=At.get(b),F=d.state.lights,et=d.state.shadowsArray,lt=F.state.version,_t=gt.getParameters(b,F.state,et,U,V),vt=gt.getProgramCacheKey(_t);let bt=H.programs;H.environment=b.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(b.isMeshStandardMaterial?z:T).get(b.envMap||H.environment),H.envMapRotation=H.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,bt===void 0&&(b.addEventListener("dispose",Wt),bt=new Map,H.programs=bt);let wt=bt.get(vt);if(wt!==void 0){if(H.currentProgram===wt&&H.lightsStateVersion===lt)return ch(b,_t),wt}else _t.uniforms=gt.getUniforms(b),b.onBeforeCompile(_t,x),wt=gt.acquireProgram(_t,vt),bt.set(vt,wt),H.uniforms=_t.uniforms;const xt=H.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(xt.clippingPlanes=tt.uniform),ch(b,_t),H.needsLights=Jm(b),H.lightsStateVersion=lt,H.needsLights&&(xt.ambientLightColor.value=F.state.ambient,xt.lightProbe.value=F.state.probe,xt.directionalLights.value=F.state.directional,xt.directionalLightShadows.value=F.state.directionalShadow,xt.spotLights.value=F.state.spot,xt.spotLightShadows.value=F.state.spotShadow,xt.rectAreaLights.value=F.state.rectArea,xt.ltc_1.value=F.state.rectAreaLTC1,xt.ltc_2.value=F.state.rectAreaLTC2,xt.pointLights.value=F.state.point,xt.pointLightShadows.value=F.state.pointShadow,xt.hemisphereLights.value=F.state.hemi,xt.directionalShadowMap.value=F.state.directionalShadowMap,xt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,xt.spotShadowMap.value=F.state.spotShadowMap,xt.spotLightMatrix.value=F.state.spotLightMatrix,xt.spotLightMap.value=F.state.spotLightMap,xt.pointShadowMap.value=F.state.pointShadowMap,xt.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=wt,H.uniformsList=null,wt}function lh(b){if(b.uniformsList===null){const U=b.currentProgram.getUniforms();b.uniformsList=sa.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function ch(b,U){const V=At.get(b);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function jm(b,U,V,H,F){U.isScene!==!0&&(U=Ft),R.resetTextureUnits();const et=U.fog,lt=H.isMeshStandardMaterial?U.environment:null,_t=S===null?x.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:Oi,vt=(H.isMeshStandardMaterial?z:T).get(H.envMap||lt),bt=H.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,wt=!!V.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),xt=!!V.morphAttributes.position,Zt=!!V.morphAttributes.normal,re=!!V.morphAttributes.color;let he=Si;H.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(he=x.toneMapping);const Ye=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,qt=Ye!==void 0?Ye.length:0,Et=At.get(H),Te=d.state.lights;if($===!0&&(j===!0||b!==P)){const un=b===P&&H.id===C;tt.setState(H,b,un)}let Kt=!1;H.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==Te.state.version||Et.outputColorSpace!==_t||F.isBatchedMesh&&Et.batching===!1||!F.isBatchedMesh&&Et.batching===!0||F.isBatchedMesh&&Et.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Et.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Et.instancing===!1||!F.isInstancedMesh&&Et.instancing===!0||F.isSkinnedMesh&&Et.skinning===!1||!F.isSkinnedMesh&&Et.skinning===!0||F.isInstancedMesh&&Et.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Et.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Et.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Et.instancingMorph===!1&&F.morphTexture!==null||Et.envMap!==vt||H.fog===!0&&Et.fog!==et||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==tt.numPlanes||Et.numIntersection!==tt.numIntersection)||Et.vertexAlphas!==bt||Et.vertexTangents!==wt||Et.morphTargets!==xt||Et.morphNormals!==Zt||Et.morphColors!==re||Et.toneMapping!==he||Et.morphTargetsCount!==qt)&&(Kt=!0):(Kt=!0,Et.__version=H.version);let Mn=Et.currentProgram;Kt===!0&&(Mn=lo(H,U,F));let gr=!1,qe=!1,Wa=!1;const de=Mn.getUniforms(),ai=Et.uniforms;if(Tt.useProgram(Mn.program)&&(gr=!0,qe=!0,Wa=!0),H.id!==C&&(C=H.id,qe=!0),gr||P!==b){zt.reverseDepthBuffer?(dt.copy(b.projectionMatrix),lS(dt),cS(dt),de.setValue(D,"projectionMatrix",dt)):de.setValue(D,"projectionMatrix",b.projectionMatrix),de.setValue(D,"viewMatrix",b.matrixWorldInverse);const un=de.map.cameraPosition;un!==void 0&&un.setValue(D,St.setFromMatrixPosition(b.matrixWorld)),zt.logarithmicDepthBuffer&&de.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&de.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),P!==b&&(P=b,qe=!0,Wa=!0)}if(F.isSkinnedMesh){de.setOptional(D,F,"bindMatrix"),de.setOptional(D,F,"bindMatrixInverse");const un=F.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),de.setValue(D,"boneTexture",un.boneTexture,R))}F.isBatchedMesh&&(de.setOptional(D,F,"batchingTexture"),de.setValue(D,"batchingTexture",F._matricesTexture,R),de.setOptional(D,F,"batchingIdTexture"),de.setValue(D,"batchingIdTexture",F._indirectTexture,R),de.setOptional(D,F,"batchingColorTexture"),F._colorsTexture!==null&&de.setValue(D,"batchingColorTexture",F._colorsTexture,R));const Xa=V.morphAttributes;if((Xa.position!==void 0||Xa.normal!==void 0||Xa.color!==void 0)&&Pt.update(F,V,Mn),(qe||Et.receiveShadow!==F.receiveShadow)&&(Et.receiveShadow=F.receiveShadow,de.setValue(D,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(ai.envMap.value=vt,ai.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(ai.envMapIntensity.value=U.environmentIntensity),qe&&(de.setValue(D,"toneMappingExposure",x.toneMappingExposure),Et.needsLights&&Zm(ai,Wa),et&&H.fog===!0&&rt.refreshFogUniforms(ai,et),rt.refreshMaterialUniforms(ai,H,W,B,d.state.transmissionRenderTarget[b.id]),sa.upload(D,lh(Et),ai,R)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(sa.upload(D,lh(Et),ai,R),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&de.setValue(D,"center",F.center),de.setValue(D,"modelViewMatrix",F.modelViewMatrix),de.setValue(D,"normalMatrix",F.normalMatrix),de.setValue(D,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const un=H.uniformsGroups;for(let $a=0,Qm=un.length;$a<Qm;$a++){const uh=un[$a];I.update(uh,Mn),I.bind(uh,Mn)}}return Mn}function Zm(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function Jm(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(b,U,V){At.get(b.texture).__webglTexture=U,At.get(b.depthTexture).__webglTexture=V;const H=At.get(b);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=V===void 0,H.__autoAllocateDepthBuffer||Ot.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,U){const V=At.get(b);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,V=0){S=b,w=U,A=V;let H=!0,F=null,et=!1,lt=!1;if(b){const vt=At.get(b);if(vt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(D.FRAMEBUFFER,null),H=!1;else if(vt.__webglFramebuffer===void 0)R.setupRenderTarget(b);else if(vt.__hasExternalTextures)R.rebindTextures(b,At.get(b.texture).__webglTexture,At.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const xt=b.depthTexture;if(vt.__boundDepthTexture!==xt){if(xt!==null&&At.has(xt)&&(b.width!==xt.image.width||b.height!==xt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(b)}}const bt=b.texture;(bt.isData3DTexture||bt.isDataArrayTexture||bt.isCompressedArrayTexture)&&(lt=!0);const wt=At.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(wt[U])?F=wt[U][V]:F=wt[U],et=!0):b.samples>0&&R.useMultisampledRTT(b)===!1?F=At.get(b).__webglMultisampledFramebuffer:Array.isArray(wt)?F=wt[V]:F=wt,v.copy(b.viewport),y.copy(b.scissor),N=b.scissorTest}else v.copy(it).multiplyScalar(W).floor(),y.copy(ct).multiplyScalar(W).floor(),N=Ct;if(Tt.bindFramebuffer(D.FRAMEBUFFER,F)&&H&&Tt.drawBuffers(b,F),Tt.viewport(v),Tt.scissor(y),Tt.setScissorTest(N),et){const vt=At.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,vt.__webglTexture,V)}else if(lt){const vt=At.get(b.texture),bt=U||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,vt.__webglTexture,V||0,bt)}C=-1},this.readRenderTargetPixels=function(b,U,V,H,F,et,lt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=At.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&lt!==void 0&&(_t=_t[lt]),_t){Tt.bindFramebuffer(D.FRAMEBUFFER,_t);try{const vt=b.texture,bt=vt.format,wt=vt.type;if(!zt.textureFormatReadable(bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!zt.textureTypeReadable(wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-H&&V>=0&&V<=b.height-F&&D.readPixels(U,V,H,F,Dt.convert(bt),Dt.convert(wt),et)}finally{const vt=S!==null?At.get(S).__webglFramebuffer:null;Tt.bindFramebuffer(D.FRAMEBUFFER,vt)}}},this.readRenderTargetPixelsAsync=async function(b,U,V,H,F,et,lt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=At.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&lt!==void 0&&(_t=_t[lt]),_t){const vt=b.texture,bt=vt.format,wt=vt.type;if(!zt.textureFormatReadable(bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!zt.textureTypeReadable(wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=b.width-H&&V>=0&&V<=b.height-F){Tt.bindFramebuffer(D.FRAMEBUFFER,_t);const xt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,xt),D.bufferData(D.PIXEL_PACK_BUFFER,et.byteLength,D.STREAM_READ),D.readPixels(U,V,H,F,Dt.convert(bt),Dt.convert(wt),0);const Zt=S!==null?At.get(S).__webglFramebuffer:null;Tt.bindFramebuffer(D.FRAMEBUFFER,Zt);const re=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await aS(D,re,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,xt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,et),D.deleteBuffer(xt),D.deleteSync(re),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,U=null,V=0){b.isTexture!==!0&&(ra("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,b=arguments[1]);const H=Math.pow(2,-V),F=Math.floor(b.image.width*H),et=Math.floor(b.image.height*H),lt=U!==null?U.x:0,_t=U!==null?U.y:0;R.setTexture2D(b,0),D.copyTexSubImage2D(D.TEXTURE_2D,V,0,0,lt,_t,F,et),Tt.unbindTexture()},this.copyTextureToTexture=function(b,U,V=null,H=null,F=0){b.isTexture!==!0&&(ra("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,b=arguments[1],U=arguments[2],F=arguments[3]||0,V=null);let et,lt,_t,vt,bt,wt;V!==null?(et=V.max.x-V.min.x,lt=V.max.y-V.min.y,_t=V.min.x,vt=V.min.y):(et=b.image.width,lt=b.image.height,_t=0,vt=0),H!==null?(bt=H.x,wt=H.y):(bt=0,wt=0);const xt=Dt.convert(U.format),Zt=Dt.convert(U.type);R.setTexture2D(U,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const re=D.getParameter(D.UNPACK_ROW_LENGTH),he=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Ye=D.getParameter(D.UNPACK_SKIP_PIXELS),qt=D.getParameter(D.UNPACK_SKIP_ROWS),Et=D.getParameter(D.UNPACK_SKIP_IMAGES),Te=b.isCompressedTexture?b.mipmaps[F]:b.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,Te.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Te.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,_t),D.pixelStorei(D.UNPACK_SKIP_ROWS,vt),b.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,F,bt,wt,et,lt,xt,Zt,Te.data):b.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,F,bt,wt,Te.width,Te.height,xt,Te.data):D.texSubImage2D(D.TEXTURE_2D,F,bt,wt,et,lt,xt,Zt,Te),D.pixelStorei(D.UNPACK_ROW_LENGTH,re),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,he),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ye),D.pixelStorei(D.UNPACK_SKIP_ROWS,qt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Et),F===0&&U.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),Tt.unbindTexture()},this.copyTextureToTexture3D=function(b,U,V=null,H=null,F=0){b.isTexture!==!0&&(ra("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,H=arguments[1]||null,b=arguments[2],U=arguments[3],F=arguments[4]||0);let et,lt,_t,vt,bt,wt,xt,Zt,re;const he=b.isCompressedTexture?b.mipmaps[F]:b.image;V!==null?(et=V.max.x-V.min.x,lt=V.max.y-V.min.y,_t=V.max.z-V.min.z,vt=V.min.x,bt=V.min.y,wt=V.min.z):(et=he.width,lt=he.height,_t=he.depth,vt=0,bt=0,wt=0),H!==null?(xt=H.x,Zt=H.y,re=H.z):(xt=0,Zt=0,re=0);const Ye=Dt.convert(U.format),qt=Dt.convert(U.type);let Et;if(U.isData3DTexture)R.setTexture3D(U,0),Et=D.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)R.setTexture2DArray(U,0),Et=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const Te=D.getParameter(D.UNPACK_ROW_LENGTH),Kt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Mn=D.getParameter(D.UNPACK_SKIP_PIXELS),gr=D.getParameter(D.UNPACK_SKIP_ROWS),qe=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,he.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,he.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,vt),D.pixelStorei(D.UNPACK_SKIP_ROWS,bt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,wt),b.isDataTexture||b.isData3DTexture?D.texSubImage3D(Et,F,xt,Zt,re,et,lt,_t,Ye,qt,he.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(Et,F,xt,Zt,re,et,lt,_t,Ye,he.data):D.texSubImage3D(Et,F,xt,Zt,re,et,lt,_t,Ye,qt,he),D.pixelStorei(D.UNPACK_ROW_LENGTH,Te),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Kt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Mn),D.pixelStorei(D.UNPACK_SKIP_ROWS,gr),D.pixelStorei(D.UNPACK_SKIP_IMAGES,qe),F===0&&U.generateMipmaps&&D.generateMipmap(Et),Tt.unbindTexture()},this.initRenderTarget=function(b){At.get(b).__webglFramebuffer===void 0&&R.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?R.setTextureCube(b,0):b.isData3DTexture?R.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?R.setTexture2DArray(b,0):R.setTexture2D(b,0),Tt.unbindTexture()},this.resetState=function(){w=0,A=0,S=null,Tt.reset(),ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ju?"display-p3":"srgb",e.unpackColorSpace=jt.workingColorSpace===Ua?"display-p3":"srgb"}}class Ew extends Me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ba extends mr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ut(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Sa=new L,ya=new L,od=new oe,Rs=new Zu,zo=new so,Yl=new L,ad=new L;class $m extends Me{constructor(t=new ye,e=new Ba){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)Sa.fromBufferAttribute(e,r-1),ya.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=Sa.distanceTo(ya);t.setAttribute("lineDistance",new Qt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zo.copy(n.boundingSphere),zo.applyMatrix4(r),zo.radius+=s,t.ray.intersectsSphere(zo)===!1)return;od.copy(r).invert(),Rs.copy(t.ray).applyMatrix4(od);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,d=g-1;_<d;_+=c){const m=u.getX(_),E=u.getX(_+1),x=ko(this,t,Rs,l,m,E);x&&e.push(x)}if(this.isLineLoop){const _=u.getX(g-1),d=u.getX(p),m=ko(this,t,Rs,l,_,d);m&&e.push(m)}}else{const p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=p,d=g-1;_<d;_+=c){const m=ko(this,t,Rs,l,_,_+1);m&&e.push(m)}if(this.isLineLoop){const _=ko(this,t,Rs,l,g-1,p);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ko(i,t,e,n,r,s){const o=i.geometry.attributes.position;if(Sa.fromBufferAttribute(o,r),ya.fromBufferAttribute(o,s),e.distanceSqToSegment(Sa,ya,Yl,ad)>n)return;Yl.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Yl);if(!(l<t.near||l>t.far))return{distance:l,point:ad.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}const ld=new L,cd=new L;class Ym extends $m{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)ld.fromBufferAttribute(e,r),cd.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+ld.distanceTo(cd);t.setAttribute("lineDistance",new Qt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class qm extends mr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ut(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ud=new oe,ou=new Zu,Vo=new so,Ho=new L;class Mw extends Me{constructor(t=new ye,e=new qm){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vo.copy(n.boundingSphere),Vo.applyMatrix4(r),Vo.radius+=s,t.ray.intersectsSphere(Vo)===!1)return;ud.copy(r).invert(),ou.copy(t.ray).applyMatrix4(ud);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=f,_=p;g<_;g++){const d=c.getX(g);Ho.fromBufferAttribute(h,d),hd(Ho,d,l,r,t,e,this)}}else{const f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let g=f,_=p;g<_;g++)Ho.fromBufferAttribute(h,g),hd(Ho,g,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function hd(i,t,e,n,r,s,o){const a=ou.distanceSqToPoint(i);if(a<e){const l=new L;ou.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class ur extends ye{constructor(t=1,e=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],p=[];let g=0;const _=[],d=n/2;let m=0;E(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new Qt(h,3)),this.setAttribute("normal",new Qt(f,3)),this.setAttribute("uv",new Qt(p,2));function E(){const M=new L,w=new L;let A=0;const S=(e-t)/n;for(let C=0;C<=s;C++){const P=[],v=C/s,y=v*(e-t)+t;for(let N=0;N<=r;N++){const O=N/r,k=O*l+a,X=Math.sin(k),B=Math.cos(k);w.x=y*X,w.y=-v*n+d,w.z=y*B,h.push(w.x,w.y,w.z),M.set(X,S,B).normalize(),f.push(M.x,M.y,M.z),p.push(O,1-v),P.push(g++)}_.push(P)}for(let C=0;C<r;C++)for(let P=0;P<s;P++){const v=_[P][C],y=_[P+1][C],N=_[P+1][C+1],O=_[P][C+1];t>0&&(u.push(v,y,O),A+=3),e>0&&(u.push(y,N,O),A+=3)}c.addGroup(m,A,0),m+=A}function x(M){const w=g,A=new Vt,S=new L;let C=0;const P=M===!0?t:e,v=M===!0?1:-1;for(let N=1;N<=r;N++)h.push(0,d*v,0),f.push(0,v,0),p.push(.5,.5),g++;const y=g;for(let N=0;N<=r;N++){const k=N/r*l+a,X=Math.cos(k),B=Math.sin(k);S.x=P*B,S.y=d*v,S.z=P*X,h.push(S.x,S.y,S.z),f.push(0,v,0),A.x=X*.5+.5,A.y=B*.5*v+.5,p.push(A.x,A.y),g++}for(let N=0;N<r;N++){const O=w+N,k=y+N;M===!0?u.push(k,k+1,O):u.push(k+1,k,O),C+=3}c.addGroup(m,C,M===!0?1:2),m+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ur(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class za extends ur{constructor(t=1,e=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new za(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class th extends ye{constructor(t=[],e=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:r};const s=[],o=[];a(r),c(n),u(),this.setAttribute("position",new Qt(s,3)),this.setAttribute("normal",new Qt(s.slice(),3)),this.setAttribute("uv",new Qt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(E){const x=new L,M=new L,w=new L;for(let A=0;A<e.length;A+=3)p(e[A+0],x),p(e[A+1],M),p(e[A+2],w),l(x,M,w,E)}function l(E,x,M,w){const A=w+1,S=[];for(let C=0;C<=A;C++){S[C]=[];const P=E.clone().lerp(M,C/A),v=x.clone().lerp(M,C/A),y=A-C;for(let N=0;N<=y;N++)N===0&&C===A?S[C][N]=P:S[C][N]=P.clone().lerp(v,N/y)}for(let C=0;C<A;C++)for(let P=0;P<2*(A-C)-1;P++){const v=Math.floor(P/2);P%2===0?(f(S[C][v+1]),f(S[C+1][v]),f(S[C][v])):(f(S[C][v+1]),f(S[C+1][v+1]),f(S[C+1][v]))}}function c(E){const x=new L;for(let M=0;M<s.length;M+=3)x.x=s[M+0],x.y=s[M+1],x.z=s[M+2],x.normalize().multiplyScalar(E),s[M+0]=x.x,s[M+1]=x.y,s[M+2]=x.z}function u(){const E=new L;for(let x=0;x<s.length;x+=3){E.x=s[x+0],E.y=s[x+1],E.z=s[x+2];const M=d(E)/2/Math.PI+.5,w=m(E)/Math.PI+.5;o.push(M,1-w)}g(),h()}function h(){for(let E=0;E<o.length;E+=6){const x=o[E+0],M=o[E+2],w=o[E+4],A=Math.max(x,M,w),S=Math.min(x,M,w);A>.9&&S<.1&&(x<.2&&(o[E+0]+=1),M<.2&&(o[E+2]+=1),w<.2&&(o[E+4]+=1))}}function f(E){s.push(E.x,E.y,E.z)}function p(E,x){const M=E*3;x.x=t[M+0],x.y=t[M+1],x.z=t[M+2]}function g(){const E=new L,x=new L,M=new L,w=new L,A=new Vt,S=new Vt,C=new Vt;for(let P=0,v=0;P<s.length;P+=9,v+=6){E.set(s[P+0],s[P+1],s[P+2]),x.set(s[P+3],s[P+4],s[P+5]),M.set(s[P+6],s[P+7],s[P+8]),A.set(o[v+0],o[v+1]),S.set(o[v+2],o[v+3]),C.set(o[v+4],o[v+5]),w.copy(E).add(x).add(M).divideScalar(3);const y=d(w);_(A,v+0,E,y),_(S,v+2,x,y),_(C,v+4,M,y)}}function _(E,x,M,w){w<0&&E.x===1&&(o[x]=E.x-1),M.x===0&&M.z===0&&(o[x]=w/2/Math.PI+.5)}function d(E){return Math.atan2(E.z,-E.x)}function m(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new th(t.vertices,t.indices,t.radius,t.details)}}const Go=new L,Wo=new L,ql=new L,Xo=new dn;class Sw extends ye{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const r=Math.pow(10,4),s=Math.cos(ia*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),f={},p=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:_,b:d,c:m}=Xo;if(_.fromBufferAttribute(a,c[0]),d.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),Xo.getNormal(ql),h[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,h[1]=`${Math.round(d.x*r)},${Math.round(d.y*r)},${Math.round(d.z*r)}`,h[2]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let E=0;E<3;E++){const x=(E+1)%3,M=h[E],w=h[x],A=Xo[u[E]],S=Xo[u[x]],C=`${M}_${w}`,P=`${w}_${M}`;P in f&&f[P]?(ql.dot(f[P].normal)<=s&&(p.push(A.x,A.y,A.z),p.push(S.x,S.y,S.z)),f[P]=null):C in f||(f[C]={index0:c[E],index1:c[x],normal:ql.clone()})}}for(const g in f)if(f[g]){const{index0:_,index1:d}=f[g];Go.fromBufferAttribute(a,_),Wo.fromBufferAttribute(a,d),p.push(Go.x,Go.y,Go.z),p.push(Wo.x,Wo.y,Wo.z)}this.setAttribute("position",new Qt(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class oo extends th{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new oo(t.radius,t.detail)}}class ka extends ye{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new L,f=new L,p=[],g=[],_=[],d=[];for(let m=0;m<=n;m++){const E=[],x=m/n;let M=0;m===0&&o===0?M=.5/e:m===n&&l===Math.PI&&(M=-.5/e);for(let w=0;w<=e;w++){const A=w/e;h.x=-t*Math.cos(r+A*s)*Math.sin(o+x*a),h.y=t*Math.cos(o+x*a),h.z=t*Math.sin(r+A*s)*Math.sin(o+x*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),d.push(A+M,1-x),E.push(c++)}u.push(E)}for(let m=0;m<n;m++)for(let E=0;E<e;E++){const x=u[m][E+1],M=u[m][E],w=u[m+1][E],A=u[m+1][E+1];(m!==0||o>0)&&p.push(x,M,A),(m!==n-1||l<Math.PI)&&p.push(M,w,A)}this.setIndex(p),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ka(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class xs extends ye{constructor(t=1,e=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new L,h=new L,f=new L;for(let p=0;p<=n;p++)for(let g=0;g<=r;g++){const _=g/r*s,d=p/n*Math.PI*2;h.x=(t+e*Math.cos(d))*Math.cos(_),h.y=(t+e*Math.cos(d))*Math.sin(_),h.z=e*Math.sin(d),a.push(h.x,h.y,h.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(g/r),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=r;g++){const _=(r+1)*p+g-1,d=(r+1)*(p-1)+g-1,m=(r+1)*(p-1)+g,E=(r+1)*p+g;o.push(_,d,E),o.push(d,m,E)}this.setIndex(o),this.setAttribute("position",new Qt(a,3)),this.setAttribute("normal",new Qt(l,3)),this.setAttribute("uv",new Qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xs(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class eh extends ye{constructor(t=1,e=.4,n=64,r=8,s=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:r,p:s,q:o},n=Math.floor(n),r=Math.floor(r);const a=[],l=[],c=[],u=[],h=new L,f=new L,p=new L,g=new L,_=new L,d=new L,m=new L;for(let x=0;x<=n;++x){const M=x/n*s*Math.PI*2;E(M,s,o,t,p),E(M+.01,s,o,t,g),d.subVectors(g,p),m.addVectors(g,p),_.crossVectors(d,m),m.crossVectors(_,d),_.normalize(),m.normalize();for(let w=0;w<=r;++w){const A=w/r*Math.PI*2,S=-e*Math.cos(A),C=e*Math.sin(A);h.x=p.x+(S*m.x+C*_.x),h.y=p.y+(S*m.y+C*_.y),h.z=p.z+(S*m.z+C*_.z),l.push(h.x,h.y,h.z),f.subVectors(h,p).normalize(),c.push(f.x,f.y,f.z),u.push(x/n),u.push(w/r)}}for(let x=1;x<=n;x++)for(let M=1;M<=r;M++){const w=(r+1)*(x-1)+(M-1),A=(r+1)*x+(M-1),S=(r+1)*x+M,C=(r+1)*(x-1)+M;a.push(w,A,C),a.push(A,S,C)}this.setIndex(a),this.setAttribute("position",new Qt(l,3)),this.setAttribute("normal",new Qt(c,3)),this.setAttribute("uv",new Qt(u,2));function E(x,M,w,A,S){const C=Math.cos(x),P=Math.sin(x),v=w/M*x,y=Math.cos(v);S.x=A*(2+y)*.5*C,S.y=A*(2+y)*P*.5,S.z=A*Math.sin(v)*.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new eh(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}}class Va extends mr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ut(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wm,this.normalScale=new Vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class nh extends Me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ut(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Kl=new oe,fd=new L,dd=new L;class Km{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Vt(512,512),this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ju,this._frameExtents=new Vt(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;fd.setFromMatrixPosition(t.matrixWorld),e.position.copy(fd),dd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(dd),e.updateMatrixWorld(),Kl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Kl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const pd=new oe,Ps=new L,jl=new L;class yw extends Km{constructor(){super(new Je(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Vt(4,2),this._viewportCount=6,this._viewports=[new Jt(2,1,1,1),new Jt(0,1,1,1),new Jt(3,1,1,1),new Jt(1,1,1,1),new Jt(3,0,1,1),new Jt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,r=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ps.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ps),jl.copy(n.position),jl.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(jl),n.updateMatrixWorld(),r.makeTranslation(-Ps.x,-Ps.y,-Ps.z),pd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pd)}}class Tw extends nh{constructor(t,e,n=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new yw}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class bw extends Km{constructor(){super(new km(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Aw extends nh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.target=new Me,this.shadow=new bw}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class ww extends nh{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Cw{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=md(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=md();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function md(){return performance.now()}class Rw extends Ym{constructor(t=10,e=10,n=4473924,r=8947848){n=new Ut(n),r=new Ut(r);const s=e/2,o=t/e,a=t/2,l=[],c=[];for(let f=0,p=0,g=-a;f<=e;f++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);const _=f===s?n:r;_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3}const u=new ye;u.setAttribute("position",new Qt(l,3)),u.setAttribute("color",new Qt(c,3));const h=new Ba({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gu);const _d=document.getElementById("three-hero");_d&&Pw(_d);function Pw(i){const t=new Ew,e=new Je(48,i.clientWidth/Math.max(i.clientHeight,1),.1,100);e.position.set(0,2.4,9);const n=new xw({antialias:!0,alpha:!0,powerPreference:"high-performance"});n.setPixelRatio(Math.min(devicePixelRatio,1.8)),n.setSize(i.clientWidth,i.clientHeight),n.setClearColor(0,0),n.outputColorSpace=bn,i.appendChild(n.domElement);const r=new Ut(i.dataset.accent||"#49d9ff");t.add(new ww(8038343,.45));const s=new Aw(r,3.1);s.position.set(5,7,6),t.add(s);const o=new Tw(5989375,20,20);o.position.set(-5,1,-2),t.add(o);const a=new Rn;t.add(a);const l=[];Dw(t,r),({shipyard:Lw,shipbuilding:Iw,engine:Nw,electro:Ow,network:Uw,cnc:Fw,quality:Bw,blueprint:gd}[i.dataset.scene]||gd)(a,r,l);let u=0,h=0;i.addEventListener("pointermove",d=>{const m=i.getBoundingClientRect();u=(d.clientX-m.left)/m.width-.5,h=(d.clientY-m.top)/m.height-.5},{passive:!0});const f=matchMedia("(prefers-reduced-motion: reduce)").matches,p=new Cw;function g(){const d=p.getElapsedTime();f||(a.rotation.y+=(u*.22-a.rotation.y)*.018,a.rotation.x+=(-h*.08-a.rotation.x)*.018,l.forEach(m=>m(d))),n.render(t,e),requestAnimationFrame(g)}g(),new ResizeObserver(()=>{const d=i.clientWidth,m=Math.max(i.clientHeight,1);e.aspect=d/m,e.updateProjectionMatrix(),n.setSize(d,m)}).observe(i)}function Dw(i,t){const e=new Rw(26,42,t,1323845);e.position.y=-2.25,e.material.opacity=.2,e.material.transparent=!0,i.add(e);const n=new ye,r=[];for(let o=0;o<450;o++)r.push((Math.random()-.5)*24,(Math.random()-.5)*12,(Math.random()-.5)*18);n.setAttribute("position",new Qt(r,3));const s=new Mw(n,new qm({color:t,size:.025,transparent:!0,opacity:.48}));i.add(s)}const Jn=(i,t=.68)=>new si({color:i,wireframe:!0,transparent:!0,opacity:t}),hr=(i,t=.22)=>new Va({color:i,metalness:.75,roughness:.22,transparent:t<1,opacity:t,side:An});function Ha(i,t,e,n=.5){const r=new ye().setFromPoints([i,t]);return new $m(r,new Ba({color:e,transparent:!0,opacity:n}))}function _r(i,t,e=4){for(let n=0;n<e;n++){const r=new Gt(new xs(2+n*.48,.012,4,90),new si({color:t,transparent:!0,opacity:.16}));r.rotation.x=Math.PI/2,i.add(r)}}function Lw(i,t,e){const n=new Rn,r=new Gt(new nn(5.2,.75,1.6),hr(t,.12));r.rotation.z=-.03,n.add(r);const s=new Gt(new za(1.08,2.2,4),Jn(t,.72));s.rotation.z=-Math.PI/2,s.position.x=3.55,n.add(s);const o=new Gt(new nn(3.7,.15,1.45),Jn(t,.45));o.position.y=.48,n.add(o);for(let a=-2;a<2.6;a+=.5){const l=new Gt(new xs(.82,.018,4,28,Math.PI),new si({color:t,transparent:!0,opacity:.45}));l.rotation.set(0,Math.PI/2,Math.PI/2),l.position.x=a,n.add(l)}n.rotation.y=-.25,i.add(n);for(let a=0;a<3;a++){const l=new Rn,c=new Gt(new nn(.08,3.7,.08),Jn(t,.45));c.position.y=.5,l.add(c);const u=new Gt(new nn(2.5,.07,.07),Jn(t,.45));u.position.set(.9,2.25,0),l.add(u),l.position.set(-4+a*4,-.3,-2.5),i.add(l)}_r(i,t,5),e.push(a=>{n.position.y=Math.sin(a*.8)*.06,n.rotation.y=-.25+Math.sin(a*.28)*.04})}function Iw(i,t,e){const n=new Rn,r=new Gt(new nn(6,.22,.18),hr(t,.45));r.position.y=-.85,n.add(r);for(let o=0;o<15;o++){const a=new Gt(new xs(1.15,.026,5,38,Math.PI),Jn(t,.7));a.rotation.set(0,Math.PI/2,Math.PI/2),a.scale.set(1,1,1-Math.abs(o-7)/12),a.position.x=(o-7)*.38,n.add(a)}const s=new Gt(new za(1.15,2.1,5),Jn(t,.8));s.rotation.z=-Math.PI/2,s.position.x=3.8,n.add(s),n.rotation.y=-.35,i.add(n),_r(i,t,3),e.push(o=>{n.rotation.y=-.35+Math.sin(o*.25)*.12,n.position.y=Math.sin(o*.7)*.08})}function Nw(i,t,e){const n=new Rn,r=new Gt(new ur(.22,.22,5.2,20),hr(t,.5));r.rotation.z=Math.PI/2,n.add(r);for(let s=-2;s<=2;s++){const o=new Gt(new xs(1.15-Math.abs(s)*.08,.14,10,48),Jn(t,.85));o.rotation.y=Math.PI/2,o.position.x=s*.82,n.add(o);for(let a=0;a<8;a++){const l=new Gt(new nn(.75,.07,.17),hr(t,.38));l.position.set(s*.82,Math.cos(a*Math.PI/4)*.74,Math.sin(a*Math.PI/4)*.74),l.rotation.x=a*Math.PI/4,n.add(l)}}n.rotation.y=-.3,i.add(n),_r(i,t,4),e.push(s=>{n.rotation.x=s*.18,n.rotation.y=-.3+Math.sin(s*.4)*.12})}function Ow(i,t,e){const n=new Rn,r=new Gt(new gs(7,4,12,8),new si({color:t,wireframe:!0,transparent:!0,opacity:.12}));n.add(r);const s=[];for(let o=0;o<16;o++){const a=(o%6-2.5)*.58,l=-3.1,c=3.1-Math.random()*1.2,u=Ha(new L(l,a,.05),new L(c,a,.05),t,.55);n.add(u);const h=new Gt(new ka(.055,8,8),new si({color:16777215}));h.position.set(l,a,.1),h.userData={y:a,offset:Math.random()*6,speed:.7+Math.random()*.8,end:c},n.add(h),s.push(h)}for(let o=0;o<9;o++){const a=new Gt(new ur(.14,.14,.28,12),hr(t,.48));a.rotation.x=Math.PI/2,a.position.set((o%3-1)*1.7,(Math.floor(o/3)-1)*1.05,.25),n.add(a)}n.rotation.x=-.18,i.add(n),_r(i,t,2),e.push(o=>s.forEach(a=>{const l=a.userData.end+3.1;a.position.x=-3.1+(o*a.userData.speed+a.userData.offset)%l}))}function Uw(i,t,e){const n=[];[[-2.8,1.4,0],[-1.2,-.7,.5],[0,1.3,-.4],[1.5,-1,.6],[2.8,.9,0],[-.1,-1.7,-.2],[2.2,2,-1.2],[-2.1,-1.8,-.8]].forEach((a,l)=>{const c=new Gt(new oo(l%3?.18:.3,1),new Va({color:l%3?t:16777215,emissive:t,emissiveIntensity:.4,metalness:.4,roughness:.2}));c.position.set(...a),i.add(c),n.push(c)});const s=[[0,1],[0,2],[1,2],[1,5],[2,3],[2,4],[3,4],[3,5],[4,6],[1,7],[5,7]];s.forEach(([a,l])=>i.add(Ha(n[a].position,n[l].position,t,.45)));const o=s.slice(0,7).map(([a,l],c)=>{const u=new Gt(new ka(.05,6,6),new si({color:16777215}));return i.add(u),{p:u,a:n[a].position.clone(),b:n[l].position.clone(),o:c*.14}});_r(i,t,3),e.push(a=>{n.forEach((l,c)=>l.scale.setScalar(1+Math.sin(a*2+c)*.12)),o.forEach(l=>l.p.position.lerpVectors(l.a,l.b,(a*.22+l.o)%1)),i.rotation.y=Math.sin(a*.15)*.18})}function Fw(i,t,e){const n=new Rn,r=new Gt(new ur(.42,.58,2.8,20),hr(t,.48));r.rotation.z=Math.PI/2,r.position.x=-2,n.add(r);const s=new Gt(new eh(1.08,.28,120,18,2,3),new Va({color:t,metalness:.88,roughness:.16,wireframe:!1}));s.position.x=.7,s.rotation.y=Math.PI/2,n.add(s);const o=new Gt(new ur(.12,.18,2.1,10),hr(16777215,.55));o.rotation.z=.18,o.position.set(.7,1.85,0),n.add(o);const a=new Gt(new nn(6,.22,2.8),Jn(t,.32));a.position.y=-1.6,n.add(a),i.add(n),_r(i,t,3),e.push(l=>{s.rotation.x=l*1.4,s.rotation.z=l*.35,o.position.y=1.75+Math.sin(l*1.8)*.2})}function Bw(i,t,e){const n=new Gt(new oo(1.55,2),new Va({color:t,metalness:.75,roughness:.15,transparent:!0,opacity:.35,wireframe:!0}));i.add(n);const r=new Gt(new gs(5.5,5.5),new si({color:t,transparent:!0,opacity:.075,side:An}));r.rotation.x=Math.PI/2,i.add(r);const s=new Ym(new Sw(new nn(4,4,4)),new Ba({color:t,transparent:!0,opacity:.28}));i.add(s);for(let o=-1.7;o<=1.7;o+=.34){const a=Ha(new L(-2,o,2.02),new L(2,o,2.02),t,.16);i.add(a)}e.push(o=>{n.rotation.y=o*.28,n.rotation.x=o*.13,r.position.y=Math.sin(o*.9)*1.8,r.material.opacity=.04+.05*(1+Math.sin(o*3))})}function gd(i,t,e){const n=new Gt(new oo(1.55,2),Jn(t,.42));i.add(n),_r(i,t,6);for(let r=0;r<12;r++){const s=r/12*Math.PI*2;i.add(Ha(new L(Math.cos(s)*2.4,Math.sin(s)*2.4,0),new L(Math.cos(s)*4.1,Math.sin(s)*4.1,-1),t,.18))}e.push(r=>{n.rotation.x=r*.12,n.rotation.y=r*.2,i.rotation.z=Math.sin(r*.2)*.05})}document.addEventListener("DOMContentLoaded",()=>{vc.from(".reveal",{y:28,opacity:0,duration:.85,stagger:.12,ease:"power3.out"});const i=[...document.querySelectorAll(".spec-card,.news-card,.glass-panel")];if("IntersectionObserver"in window){const t=new IntersectionObserver(e=>e.forEach(n=>{n.isIntersecting&&(vc.fromTo(n.target,{y:25,opacity:0},{y:0,opacity:1,duration:.65,ease:"power2.out"}),t.unobserve(n.target))}),{threshold:.12});i.forEach(e=>t.observe(e))}});
