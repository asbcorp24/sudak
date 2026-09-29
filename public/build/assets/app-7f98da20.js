var He="top",mn="bottom",_n="right",Ge="left",Qa="auto",Ls=[He,mn,_n,Ge],Er="start",hs="end",hp="clippingParents",zu="viewport",jr="popper",fp="reference",Al=Ls.reduce(function(r,t){return r.concat([t+"-"+Er,t+"-"+hs])},[]),ku=[].concat(Ls,[Qa]).reduce(function(r,t){return r.concat([t,t+"-"+Er,t+"-"+hs])},[]),dp="beforeRead",pp="read",mp="afterRead",_p="beforeMain",gp="main",vp="afterMain",xp="beforeWrite",yp="write",Ep="afterWrite",Sp=[dp,pp,mp,_p,gp,vp,xp,yp,Ep];function Xn(r){return r?(r.nodeName||"").toLowerCase():null}function gn(r){if(r==null)return window;if(r.toString()!=="[object Window]"){var t=r.ownerDocument;return t&&t.defaultView||window}return r}function Sr(r){var t=gn(r).Element;return r instanceof t||r instanceof Element}function wn(r){var t=gn(r).HTMLElement;return r instanceof t||r instanceof HTMLElement}function Vu(r){if(typeof ShadowRoot>"u")return!1;var t=gn(r).ShadowRoot;return r instanceof t||r instanceof ShadowRoot}function ng(r){var t=r.state;Object.keys(t.elements).forEach(function(e){var n=t.styles[e]||{},i=t.attributes[e]||{},s=t.elements[e];!wn(s)||!Xn(s)||(Object.assign(s.style,n),Object.keys(i).forEach(function(o){var a=i[o];a===!1?s.removeAttribute(o):s.setAttribute(o,a===!0?"":a)}))})}function ig(r){var t=r.state,e={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,e.popper),t.styles=e,t.elements.arrow&&Object.assign(t.elements.arrow.style,e.arrow),function(){Object.keys(t.elements).forEach(function(n){var i=t.elements[n],s=t.attributes[n]||{},o=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:e[n]),a=o.reduce(function(c,l){return c[l]="",c},{});!wn(i)||!Xn(i)||(Object.assign(i.style,a),Object.keys(s).forEach(function(c){i.removeAttribute(c)}))})}}const Hu={name:"applyStyles",enabled:!0,phase:"write",fn:ng,effect:ig,requires:["computeStyles"]};function Gn(r){return r.split("-")[0]}var mr=Math.max,Ia=Math.min,fs=Math.round;function Cl(){var r=navigator.userAgentData;return r!=null&&r.brands&&Array.isArray(r.brands)?r.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Mp(){return!/^((?!chrome|android).)*safari/i.test(Cl())}function ds(r,t,e){t===void 0&&(t=!1),e===void 0&&(e=!1);var n=r.getBoundingClientRect(),i=1,s=1;t&&wn(r)&&(i=r.offsetWidth>0&&fs(n.width)/r.offsetWidth||1,s=r.offsetHeight>0&&fs(n.height)/r.offsetHeight||1);var o=Sr(r)?gn(r):window,a=o.visualViewport,c=!Mp()&&e,l=(n.left+(c&&a?a.offsetLeft:0))/i,u=(n.top+(c&&a?a.offsetTop:0))/s,h=n.width/i,f=n.height/s;return{width:h,height:f,top:u,right:l+h,bottom:u+f,left:l,x:l,y:u}}function Gu(r){var t=ds(r),e=r.offsetWidth,n=r.offsetHeight;return Math.abs(t.width-e)<=1&&(e=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:r.offsetLeft,y:r.offsetTop,width:e,height:n}}function Tp(r,t){var e=t.getRootNode&&t.getRootNode();if(r.contains(t))return!0;if(e&&Vu(e)){var n=t;do{if(n&&r.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function hi(r){return gn(r).getComputedStyle(r)}function rg(r){return["table","td","th"].indexOf(Xn(r))>=0}function Wi(r){return((Sr(r)?r.ownerDocument:r.document)||window.document).documentElement}function tc(r){return Xn(r)==="html"?r:r.assignedSlot||r.parentNode||(Vu(r)?r.host:null)||Wi(r)}function Qh(r){return!wn(r)||hi(r).position==="fixed"?null:r.offsetParent}function sg(r){var t=/firefox/i.test(Cl()),e=/Trident/i.test(Cl());if(e&&wn(r)){var n=hi(r);if(n.position==="fixed")return null}var i=tc(r);for(Vu(i)&&(i=i.host);wn(i)&&["html","body"].indexOf(Xn(i))<0;){var s=hi(i);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return i;i=i.parentNode}return null}function xo(r){for(var t=gn(r),e=Qh(r);e&&rg(e)&&hi(e).position==="static";)e=Qh(e);return e&&(Xn(e)==="html"||Xn(e)==="body"&&hi(e).position==="static")?t:e||sg(r)||t}function Wu(r){return["top","bottom"].indexOf(r)>=0?"x":"y"}function to(r,t,e){return mr(r,Ia(t,e))}function og(r,t,e){var n=to(r,t,e);return n>e?e:n}function bp(){return{top:0,right:0,bottom:0,left:0}}function wp(r){return Object.assign({},bp(),r)}function Ap(r,t){return t.reduce(function(e,n){return e[n]=r,e},{})}var ag=function(t,e){return t=typeof t=="function"?t(Object.assign({},e.rects,{placement:e.placement})):t,wp(typeof t!="number"?t:Ap(t,Ls))};function cg(r){var t,e=r.state,n=r.name,i=r.options,s=e.elements.arrow,o=e.modifiersData.popperOffsets,a=Gn(e.placement),c=Wu(a),l=[Ge,_n].indexOf(a)>=0,u=l?"height":"width";if(!(!s||!o)){var h=ag(i.padding,e),f=Gu(s),d=c==="y"?He:Ge,g=c==="y"?mn:_n,_=e.rects.reference[u]+e.rects.reference[c]-o[c]-e.rects.popper[u],p=o[c]-e.rects.reference[c],m=xo(s),y=m?c==="y"?m.clientHeight||0:m.clientWidth||0:0,v=_/2-p/2,E=h[d],w=y-f[u]-h[g],T=y/2-f[u]/2+v,S=to(E,T,w),C=c;e.modifiersData[n]=(t={},t[C]=S,t.centerOffset=S-T,t)}}function lg(r){var t=r.state,e=r.options,n=e.element,i=n===void 0?"[data-popper-arrow]":n;i!=null&&(typeof i=="string"&&(i=t.elements.popper.querySelector(i),!i)||Tp(t.elements.popper,i)&&(t.elements.arrow=i))}const Cp={name:"arrow",enabled:!0,phase:"main",fn:cg,effect:lg,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ps(r){return r.split("-")[1]}var ug={top:"auto",right:"auto",bottom:"auto",left:"auto"};function hg(r,t){var e=r.x,n=r.y,i=t.devicePixelRatio||1;return{x:fs(e*i)/i||0,y:fs(n*i)/i||0}}function tf(r){var t,e=r.popper,n=r.popperRect,i=r.placement,s=r.variation,o=r.offsets,a=r.position,c=r.gpuAcceleration,l=r.adaptive,u=r.roundOffsets,h=r.isFixed,f=o.x,d=f===void 0?0:f,g=o.y,_=g===void 0?0:g,p=typeof u=="function"?u({x:d,y:_}):{x:d,y:_};d=p.x,_=p.y;var m=o.hasOwnProperty("x"),y=o.hasOwnProperty("y"),v=Ge,E=He,w=window;if(l){var T=xo(e),S="clientHeight",C="clientWidth";if(T===gn(e)&&(T=Wi(e),hi(T).position!=="static"&&a==="absolute"&&(S="scrollHeight",C="scrollWidth")),T=T,i===He||(i===Ge||i===_n)&&s===hs){E=mn;var L=h&&T===w&&w.visualViewport?w.visualViewport.height:T[S];_-=L-n.height,_*=c?1:-1}if(i===Ge||(i===He||i===mn)&&s===hs){v=_n;var x=h&&T===w&&w.visualViewport?w.visualViewport.width:T[C];d-=x-n.width,d*=c?1:-1}}var M=Object.assign({position:a},l&&ug),D=u===!0?hg({x:d,y:_},gn(e)):{x:d,y:_};if(d=D.x,_=D.y,c){var I;return Object.assign({},M,(I={},I[E]=y?"0":"",I[v]=m?"0":"",I.transform=(w.devicePixelRatio||1)<=1?"translate("+d+"px, "+_+"px)":"translate3d("+d+"px, "+_+"px, 0)",I))}return Object.assign({},M,(t={},t[E]=y?_+"px":"",t[v]=m?d+"px":"",t.transform="",t))}function fg(r){var t=r.state,e=r.options,n=e.gpuAcceleration,i=n===void 0?!0:n,s=e.adaptive,o=s===void 0?!0:s,a=e.roundOffsets,c=a===void 0?!0:a,l={placement:Gn(t.placement),variation:ps(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:i,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,tf(Object.assign({},l,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:o,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,tf(Object.assign({},l,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Xu={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:fg,data:{}};var Io={passive:!0};function dg(r){var t=r.state,e=r.instance,n=r.options,i=n.scroll,s=i===void 0?!0:i,o=n.resize,a=o===void 0?!0:o,c=gn(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&l.forEach(function(u){u.addEventListener("scroll",e.update,Io)}),a&&c.addEventListener("resize",e.update,Io),function(){s&&l.forEach(function(u){u.removeEventListener("scroll",e.update,Io)}),a&&c.removeEventListener("resize",e.update,Io)}}const $u={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:dg,data:{}};var pg={left:"right",right:"left",bottom:"top",top:"bottom"};function xa(r){return r.replace(/left|right|bottom|top/g,function(t){return pg[t]})}var mg={start:"end",end:"start"};function ef(r){return r.replace(/start|end/g,function(t){return mg[t]})}function qu(r){var t=gn(r),e=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:e,scrollTop:n}}function Yu(r){return ds(Wi(r)).left+qu(r).scrollLeft}function _g(r,t){var e=gn(r),n=Wi(r),i=e.visualViewport,s=n.clientWidth,o=n.clientHeight,a=0,c=0;if(i){s=i.width,o=i.height;var l=Mp();(l||!l&&t==="fixed")&&(a=i.offsetLeft,c=i.offsetTop)}return{width:s,height:o,x:a+Yu(r),y:c}}function gg(r){var t,e=Wi(r),n=qu(r),i=(t=r.ownerDocument)==null?void 0:t.body,s=mr(e.scrollWidth,e.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),o=mr(e.scrollHeight,e.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),a=-n.scrollLeft+Yu(r),c=-n.scrollTop;return hi(i||e).direction==="rtl"&&(a+=mr(e.clientWidth,i?i.clientWidth:0)-s),{width:s,height:o,x:a,y:c}}function Ku(r){var t=hi(r),e=t.overflow,n=t.overflowX,i=t.overflowY;return/auto|scroll|overlay|hidden/.test(e+i+n)}function Rp(r){return["html","body","#document"].indexOf(Xn(r))>=0?r.ownerDocument.body:wn(r)&&Ku(r)?r:Rp(tc(r))}function eo(r,t){var e;t===void 0&&(t=[]);var n=Rp(r),i=n===((e=r.ownerDocument)==null?void 0:e.body),s=gn(n),o=i?[s].concat(s.visualViewport||[],Ku(n)?n:[]):n,a=t.concat(o);return i?a:a.concat(eo(tc(o)))}function Rl(r){return Object.assign({},r,{left:r.x,top:r.y,right:r.x+r.width,bottom:r.y+r.height})}function vg(r,t){var e=ds(r,!1,t==="fixed");return e.top=e.top+r.clientTop,e.left=e.left+r.clientLeft,e.bottom=e.top+r.clientHeight,e.right=e.left+r.clientWidth,e.width=r.clientWidth,e.height=r.clientHeight,e.x=e.left,e.y=e.top,e}function nf(r,t,e){return t===zu?Rl(_g(r,e)):Sr(t)?vg(t,e):Rl(gg(Wi(r)))}function xg(r){var t=eo(tc(r)),e=["absolute","fixed"].indexOf(hi(r).position)>=0,n=e&&wn(r)?xo(r):r;return Sr(n)?t.filter(function(i){return Sr(i)&&Tp(i,n)&&Xn(i)!=="body"}):[]}function yg(r,t,e,n){var i=t==="clippingParents"?xg(r):[].concat(t),s=[].concat(i,[e]),o=s[0],a=s.reduce(function(c,l){var u=nf(r,l,n);return c.top=mr(u.top,c.top),c.right=Ia(u.right,c.right),c.bottom=Ia(u.bottom,c.bottom),c.left=mr(u.left,c.left),c},nf(r,o,n));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function Pp(r){var t=r.reference,e=r.element,n=r.placement,i=n?Gn(n):null,s=n?ps(n):null,o=t.x+t.width/2-e.width/2,a=t.y+t.height/2-e.height/2,c;switch(i){case He:c={x:o,y:t.y-e.height};break;case mn:c={x:o,y:t.y+t.height};break;case _n:c={x:t.x+t.width,y:a};break;case Ge:c={x:t.x-e.width,y:a};break;default:c={x:t.x,y:t.y}}var l=i?Wu(i):null;if(l!=null){var u=l==="y"?"height":"width";switch(s){case Er:c[l]=c[l]-(t[u]/2-e[u]/2);break;case hs:c[l]=c[l]+(t[u]/2-e[u]/2);break}}return c}function ms(r,t){t===void 0&&(t={});var e=t,n=e.placement,i=n===void 0?r.placement:n,s=e.strategy,o=s===void 0?r.strategy:s,a=e.boundary,c=a===void 0?hp:a,l=e.rootBoundary,u=l===void 0?zu:l,h=e.elementContext,f=h===void 0?jr:h,d=e.altBoundary,g=d===void 0?!1:d,_=e.padding,p=_===void 0?0:_,m=wp(typeof p!="number"?p:Ap(p,Ls)),y=f===jr?fp:jr,v=r.rects.popper,E=r.elements[g?y:f],w=yg(Sr(E)?E:E.contextElement||Wi(r.elements.popper),c,u,o),T=ds(r.elements.reference),S=Pp({reference:T,element:v,strategy:"absolute",placement:i}),C=Rl(Object.assign({},v,S)),L=f===jr?C:T,x={top:w.top-L.top+m.top,bottom:L.bottom-w.bottom+m.bottom,left:w.left-L.left+m.left,right:L.right-w.right+m.right},M=r.modifiersData.offset;if(f===jr&&M){var D=M[i];Object.keys(x).forEach(function(I){var k=[_n,mn].indexOf(I)>=0?1:-1,F=[He,mn].indexOf(I)>=0?"y":"x";x[I]+=D[F]*k})}return x}function Eg(r,t){t===void 0&&(t={});var e=t,n=e.placement,i=e.boundary,s=e.rootBoundary,o=e.padding,a=e.flipVariations,c=e.allowedAutoPlacements,l=c===void 0?ku:c,u=ps(n),h=u?a?Al:Al.filter(function(g){return ps(g)===u}):Ls,f=h.filter(function(g){return l.indexOf(g)>=0});f.length===0&&(f=h);var d=f.reduce(function(g,_){return g[_]=ms(r,{placement:_,boundary:i,rootBoundary:s,padding:o})[Gn(_)],g},{});return Object.keys(d).sort(function(g,_){return d[g]-d[_]})}function Sg(r){if(Gn(r)===Qa)return[];var t=xa(r);return[ef(r),t,ef(t)]}function Mg(r){var t=r.state,e=r.options,n=r.name;if(!t.modifiersData[n]._skip){for(var i=e.mainAxis,s=i===void 0?!0:i,o=e.altAxis,a=o===void 0?!0:o,c=e.fallbackPlacements,l=e.padding,u=e.boundary,h=e.rootBoundary,f=e.altBoundary,d=e.flipVariations,g=d===void 0?!0:d,_=e.allowedAutoPlacements,p=t.options.placement,m=Gn(p),y=m===p,v=c||(y||!g?[xa(p)]:Sg(p)),E=[p].concat(v).reduce(function(N,X){return N.concat(Gn(X)===Qa?Eg(t,{placement:X,boundary:u,rootBoundary:h,padding:l,flipVariations:g,allowedAutoPlacements:_}):X)},[]),w=t.rects.reference,T=t.rects.popper,S=new Map,C=!0,L=E[0],x=0;x<E.length;x++){var M=E[x],D=Gn(M),I=ps(M)===Er,k=[He,mn].indexOf(D)>=0,F=k?"width":"height",O=ms(t,{placement:M,boundary:u,rootBoundary:h,altBoundary:f,padding:l}),G=k?I?_n:Ge:I?mn:He;w[F]>T[F]&&(G=xa(G));var H=xa(G),et=[];if(s&&et.push(O[D]<=0),a&&et.push(O[G]<=0,O[H]<=0),et.every(function(N){return N})){L=M,C=!1;break}S.set(M,et)}if(C)for(var st=g?3:1,ct=function(X){var Z=E.find(function(nt){var St=S.get(nt);if(St)return St.slice(0,X).every(function(wt){return wt})});if(Z)return L=Z,"break"},bt=st;bt>0;bt--){var It=ct(bt);if(It==="break")break}t.placement!==L&&(t.modifiersData[n]._skip=!0,t.placement=L,t.reset=!0)}}const Lp={name:"flip",enabled:!0,phase:"main",fn:Mg,requiresIfExists:["offset"],data:{_skip:!1}};function rf(r,t,e){return e===void 0&&(e={x:0,y:0}),{top:r.top-t.height-e.y,right:r.right-t.width+e.x,bottom:r.bottom-t.height+e.y,left:r.left-t.width-e.x}}function sf(r){return[He,_n,mn,Ge].some(function(t){return r[t]>=0})}function Tg(r){var t=r.state,e=r.name,n=t.rects.reference,i=t.rects.popper,s=t.modifiersData.preventOverflow,o=ms(t,{elementContext:"reference"}),a=ms(t,{altBoundary:!0}),c=rf(o,n),l=rf(a,i,s),u=sf(c),h=sf(l);t.modifiersData[e]={referenceClippingOffsets:c,popperEscapeOffsets:l,isReferenceHidden:u,hasPopperEscaped:h},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":h})}const Dp={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Tg};function bg(r,t,e){var n=Gn(r),i=[Ge,He].indexOf(n)>=0?-1:1,s=typeof e=="function"?e(Object.assign({},t,{placement:r})):e,o=s[0],a=s[1];return o=o||0,a=(a||0)*i,[Ge,_n].indexOf(n)>=0?{x:a,y:o}:{x:o,y:a}}function wg(r){var t=r.state,e=r.options,n=r.name,i=e.offset,s=i===void 0?[0,0]:i,o=ku.reduce(function(u,h){return u[h]=bg(h,t.rects,s),u},{}),a=o[t.placement],c=a.x,l=a.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=l),t.modifiersData[n]=o}const Ip={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:wg};function Ag(r){var t=r.state,e=r.name;t.modifiersData[e]=Pp({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const ju={name:"popperOffsets",enabled:!0,phase:"read",fn:Ag,data:{}};function Cg(r){return r==="x"?"y":"x"}function Rg(r){var t=r.state,e=r.options,n=r.name,i=e.mainAxis,s=i===void 0?!0:i,o=e.altAxis,a=o===void 0?!1:o,c=e.boundary,l=e.rootBoundary,u=e.altBoundary,h=e.padding,f=e.tether,d=f===void 0?!0:f,g=e.tetherOffset,_=g===void 0?0:g,p=ms(t,{boundary:c,rootBoundary:l,padding:h,altBoundary:u}),m=Gn(t.placement),y=ps(t.placement),v=!y,E=Wu(m),w=Cg(E),T=t.modifiersData.popperOffsets,S=t.rects.reference,C=t.rects.popper,L=typeof _=="function"?_(Object.assign({},t.rects,{placement:t.placement})):_,x=typeof L=="number"?{mainAxis:L,altAxis:L}:Object.assign({mainAxis:0,altAxis:0},L),M=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,D={x:0,y:0};if(T){if(s){var I,k=E==="y"?He:Ge,F=E==="y"?mn:_n,O=E==="y"?"height":"width",G=T[E],H=G+p[k],et=G-p[F],st=d?-C[O]/2:0,ct=y===Er?S[O]:C[O],bt=y===Er?-C[O]:-S[O],It=t.elements.arrow,N=d&&It?Gu(It):{width:0,height:0},X=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:bp(),Z=X[k],nt=X[F],St=to(0,S[O],N[O]),wt=v?S[O]/2-st-St-Z-x.mainAxis:ct-St-Z-x.mainAxis,kt=v?-S[O]/2+st+St+nt+x.mainAxis:bt+St+nt+x.mainAxis,Yt=t.elements.arrow&&xo(t.elements.arrow),Vt=Yt?E==="y"?Yt.clientTop||0:Yt.clientLeft||0:0,U=(I=M==null?void 0:M[E])!=null?I:0,ze=G+wt-U-Vt,zt=G+kt-U,Ht=to(d?Ia(H,ze):H,G,d?mr(et,zt):et);T[E]=Ht,D[E]=Ht-G}if(a){var At,re=E==="x"?He:Ge,Rt=E==="x"?mn:_n,P=T[w],b=w==="y"?"height":"width",W=P+p[re],j=P-p[Rt],tt=[He,Ge].indexOf(m)!==-1,K=(At=M==null?void 0:M[w])!=null?At:0,xt=tt?W:P-S[b]-C[b]-K+x.altAxis,ot=tt?P+S[b]+C[b]-K-x.altAxis:j,ft=d&&tt?og(xt,P,ot):to(d?xt:W,P,d?ot:j);T[w]=ft,D[w]=ft-P}t.modifiersData[n]=D}}const Np={name:"preventOverflow",enabled:!0,phase:"main",fn:Rg,requiresIfExists:["offset"]};function Pg(r){return{scrollLeft:r.scrollLeft,scrollTop:r.scrollTop}}function Lg(r){return r===gn(r)||!wn(r)?qu(r):Pg(r)}function Dg(r){var t=r.getBoundingClientRect(),e=fs(t.width)/r.offsetWidth||1,n=fs(t.height)/r.offsetHeight||1;return e!==1||n!==1}function Ig(r,t,e){e===void 0&&(e=!1);var n=wn(t),i=wn(t)&&Dg(t),s=Wi(t),o=ds(r,i,e),a={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(n||!n&&!e)&&((Xn(t)!=="body"||Ku(s))&&(a=Lg(t)),wn(t)?(c=ds(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):s&&(c.x=Yu(s))),{x:o.left+a.scrollLeft-c.x,y:o.top+a.scrollTop-c.y,width:o.width,height:o.height}}function Ng(r){var t=new Map,e=new Set,n=[];r.forEach(function(s){t.set(s.name,s)});function i(s){e.add(s.name);var o=[].concat(s.requires||[],s.requiresIfExists||[]);o.forEach(function(a){if(!e.has(a)){var c=t.get(a);c&&i(c)}}),n.push(s)}return r.forEach(function(s){e.has(s.name)||i(s)}),n}function Og(r){var t=Ng(r);return Sp.reduce(function(e,n){return e.concat(t.filter(function(i){return i.phase===n}))},[])}function Ug(r){var t;return function(){return t||(t=new Promise(function(e){Promise.resolve().then(function(){t=void 0,e(r())})})),t}}function Fg(r){var t=r.reduce(function(e,n){var i=e[n.name];return e[n.name]=i?Object.assign({},i,n,{options:Object.assign({},i.options,n.options),data:Object.assign({},i.data,n.data)}):n,e},{});return Object.keys(t).map(function(e){return t[e]})}var of={placement:"bottom",modifiers:[],strategy:"absolute"};function af(){for(var r=arguments.length,t=new Array(r),e=0;e<r;e++)t[e]=arguments[e];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function ec(r){r===void 0&&(r={});var t=r,e=t.defaultModifiers,n=e===void 0?[]:e,i=t.defaultOptions,s=i===void 0?of:i;return function(a,c,l){l===void 0&&(l=s);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},of,s),modifiersData:{},elements:{reference:a,popper:c},attributes:{},styles:{}},h=[],f=!1,d={state:u,setOptions:function(m){var y=typeof m=="function"?m(u.options):m;_(),u.options=Object.assign({},s,u.options,y),u.scrollParents={reference:Sr(a)?eo(a):a.contextElement?eo(a.contextElement):[],popper:eo(c)};var v=Og(Fg([].concat(n,u.options.modifiers)));return u.orderedModifiers=v.filter(function(E){return E.enabled}),g(),d.update()},forceUpdate:function(){if(!f){var m=u.elements,y=m.reference,v=m.popper;if(af(y,v)){u.rects={reference:Ig(y,xo(v),u.options.strategy==="fixed"),popper:Gu(v)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(x){return u.modifiersData[x.name]=Object.assign({},x.data)});for(var E=0;E<u.orderedModifiers.length;E++){if(u.reset===!0){u.reset=!1,E=-1;continue}var w=u.orderedModifiers[E],T=w.fn,S=w.options,C=S===void 0?{}:S,L=w.name;typeof T=="function"&&(u=T({state:u,options:C,name:L,instance:d})||u)}}}},update:Ug(function(){return new Promise(function(p){d.forceUpdate(),p(u)})}),destroy:function(){_(),f=!0}};if(!af(a,c))return d;d.setOptions(l).then(function(p){!f&&l.onFirstUpdate&&l.onFirstUpdate(p)});function g(){u.orderedModifiers.forEach(function(p){var m=p.name,y=p.options,v=y===void 0?{}:y,E=p.effect;if(typeof E=="function"){var w=E({state:u,name:m,instance:d,options:v}),T=function(){};h.push(w||T)}})}function _(){h.forEach(function(p){return p()}),h=[]}return d}}var Bg=ec(),zg=[$u,ju,Xu,Hu],kg=ec({defaultModifiers:zg}),Vg=[$u,ju,Xu,Hu,Ip,Lp,Np,Cp,Dp],Ju=ec({defaultModifiers:Vg});const Op=Object.freeze(Object.defineProperty({__proto__:null,afterMain:vp,afterRead:mp,afterWrite:Ep,applyStyles:Hu,arrow:Cp,auto:Qa,basePlacements:Ls,beforeMain:_p,beforeRead:dp,beforeWrite:xp,bottom:mn,clippingParents:hp,computeStyles:Xu,createPopper:Ju,createPopperBase:Bg,createPopperLite:kg,detectOverflow:ms,end:hs,eventListeners:$u,flip:Lp,hide:Dp,left:Ge,main:gp,modifierPhases:Sp,offset:Ip,placements:ku,popper:jr,popperGenerator:ec,popperOffsets:ju,preventOverflow:Np,read:pp,reference:fp,right:_n,start:Er,top:He,variationPlacements:Al,viewport:zu,write:yp},Symbol.toStringTag,{value:"Module"}));/*!
  * Bootstrap v5.3.8 (https://getbootstrap.com/)
  * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */const vi=new Map,xc={set(r,t,e){vi.has(r)||vi.set(r,new Map);const n=vi.get(r);if(!n.has(t)&&n.size!==0){console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);return}n.set(t,e)},get(r,t){return vi.has(r)&&vi.get(r).get(t)||null},remove(r,t){if(!vi.has(r))return;const e=vi.get(r);e.delete(t),e.size===0&&vi.delete(r)}},Hg=1e6,Gg=1e3,Pl="transitionend",Up=r=>(r&&window.CSS&&window.CSS.escape&&(r=r.replace(/#([^\s"#']+)/g,(t,e)=>`#${CSS.escape(e)}`)),r),Wg=r=>r==null?`${r}`:Object.prototype.toString.call(r).match(/\s([a-z]+)/i)[1].toLowerCase(),Xg=r=>{do r+=Math.floor(Math.random()*Hg);while(document.getElementById(r));return r},$g=r=>{if(!r)return 0;let{transitionDuration:t,transitionDelay:e}=window.getComputedStyle(r);const n=Number.parseFloat(t),i=Number.parseFloat(e);return!n&&!i?0:(t=t.split(",")[0],e=e.split(",")[0],(Number.parseFloat(t)+Number.parseFloat(e))*Gg)},Fp=r=>{r.dispatchEvent(new Event(Pl))},li=r=>!r||typeof r!="object"?!1:(typeof r.jquery<"u"&&(r=r[0]),typeof r.nodeType<"u"),Ui=r=>li(r)?r.jquery?r[0]:r:typeof r=="string"&&r.length>0?document.querySelector(Up(r)):null,Ds=r=>{if(!li(r)||r.getClientRects().length===0)return!1;const t=getComputedStyle(r).getPropertyValue("visibility")==="visible",e=r.closest("details:not([open])");if(!e)return t;if(e!==r){const n=r.closest("summary");if(n&&n.parentNode!==e||n===null)return!1}return t},Fi=r=>!r||r.nodeType!==Node.ELEMENT_NODE||r.classList.contains("disabled")?!0:typeof r.disabled<"u"?r.disabled:r.hasAttribute("disabled")&&r.getAttribute("disabled")!=="false",Bp=r=>{if(!document.documentElement.attachShadow)return null;if(typeof r.getRootNode=="function"){const t=r.getRootNode();return t instanceof ShadowRoot?t:null}return r instanceof ShadowRoot?r:r.parentNode?Bp(r.parentNode):null},Na=()=>{},yo=r=>{r.offsetHeight},zp=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,yc=[],qg=r=>{document.readyState==="loading"?(yc.length||document.addEventListener("DOMContentLoaded",()=>{for(const t of yc)t()}),yc.push(r)):r()},An=()=>document.documentElement.dir==="rtl",Rn=r=>{qg(()=>{const t=zp();if(t){const e=r.NAME,n=t.fn[e];t.fn[e]=r.jQueryInterface,t.fn[e].Constructor=r,t.fn[e].noConflict=()=>(t.fn[e]=n,r.jQueryInterface)}})},Ye=(r,t=[],e=r)=>typeof r=="function"?r.call(...t):e,kp=(r,t,e=!0)=>{if(!e){Ye(r);return}const n=5,i=$g(t)+n;let s=!1;const o=({target:a})=>{a===t&&(s=!0,t.removeEventListener(Pl,o),Ye(r))};t.addEventListener(Pl,o),setTimeout(()=>{s||Fp(t)},i)},Zu=(r,t,e,n)=>{const i=r.length;let s=r.indexOf(t);return s===-1?!e&&n?r[i-1]:r[0]:(s+=e?1:-1,n&&(s=(s+i)%i),r[Math.max(0,Math.min(s,i-1))])},Yg=/[^.]*(?=\..*)\.|.*/,Kg=/\..*/,jg=/::\d+$/,Ec={};let cf=1;const Vp={mouseenter:"mouseover",mouseleave:"mouseout"},Jg=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function Hp(r,t){return t&&`${t}::${cf++}`||r.uidEvent||cf++}function Gp(r){const t=Hp(r);return r.uidEvent=t,Ec[t]=Ec[t]||{},Ec[t]}function Zg(r,t){return function e(n){return Qu(n,{delegateTarget:r}),e.oneOff&&Q.off(r,n.type,t),t.apply(r,[n])}}function Qg(r,t,e){return function n(i){const s=r.querySelectorAll(t);for(let{target:o}=i;o&&o!==this;o=o.parentNode)for(const a of s)if(a===o)return Qu(i,{delegateTarget:o}),n.oneOff&&Q.off(r,i.type,t,e),e.apply(o,[i])}}function Wp(r,t,e=null){return Object.values(r).find(n=>n.callable===t&&n.delegationSelector===e)}function Xp(r,t,e){const n=typeof t=="string",i=n?e:t||e;let s=$p(r);return Jg.has(s)||(s=r),[n,i,s]}function lf(r,t,e,n,i){if(typeof t!="string"||!r)return;let[s,o,a]=Xp(t,e,n);t in Vp&&(o=(g=>function(_){if(!_.relatedTarget||_.relatedTarget!==_.delegateTarget&&!_.delegateTarget.contains(_.relatedTarget))return g.call(this,_)})(o));const c=Gp(r),l=c[a]||(c[a]={}),u=Wp(l,o,s?e:null);if(u){u.oneOff=u.oneOff&&i;return}const h=Hp(o,t.replace(Yg,"")),f=s?Qg(r,e,o):Zg(r,o);f.delegationSelector=s?e:null,f.callable=o,f.oneOff=i,f.uidEvent=h,l[h]=f,r.addEventListener(a,f,s)}function Ll(r,t,e,n,i){const s=Wp(t[e],n,i);s&&(r.removeEventListener(e,s,!!i),delete t[e][s.uidEvent])}function tv(r,t,e,n){const i=t[e]||{};for(const[s,o]of Object.entries(i))s.includes(n)&&Ll(r,t,e,o.callable,o.delegationSelector)}function $p(r){return r=r.replace(Kg,""),Vp[r]||r}const Q={on(r,t,e,n){lf(r,t,e,n,!1)},one(r,t,e,n){lf(r,t,e,n,!0)},off(r,t,e,n){if(typeof t!="string"||!r)return;const[i,s,o]=Xp(t,e,n),a=o!==t,c=Gp(r),l=c[o]||{},u=t.startsWith(".");if(typeof s<"u"){if(!Object.keys(l).length)return;Ll(r,c,o,s,i?e:null);return}if(u)for(const h of Object.keys(c))tv(r,c,h,t.slice(1));for(const[h,f]of Object.entries(l)){const d=h.replace(jg,"");(!a||t.includes(d))&&Ll(r,c,o,f.callable,f.delegationSelector)}},trigger(r,t,e){if(typeof t!="string"||!r)return null;const n=zp(),i=$p(t),s=t!==i;let o=null,a=!0,c=!0,l=!1;s&&n&&(o=n.Event(t,e),n(r).trigger(o),a=!o.isPropagationStopped(),c=!o.isImmediatePropagationStopped(),l=o.isDefaultPrevented());const u=Qu(new Event(t,{bubbles:a,cancelable:!0}),e);return l&&u.preventDefault(),c&&r.dispatchEvent(u),u.defaultPrevented&&o&&o.preventDefault(),u}};function Qu(r,t={}){for(const[e,n]of Object.entries(t))try{r[e]=n}catch{Object.defineProperty(r,e,{configurable:!0,get(){return n}})}return r}function uf(r){if(r==="true")return!0;if(r==="false")return!1;if(r===Number(r).toString())return Number(r);if(r===""||r==="null")return null;if(typeof r!="string")return r;try{return JSON.parse(decodeURIComponent(r))}catch{return r}}function Sc(r){return r.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}const ui={setDataAttribute(r,t,e){r.setAttribute(`data-bs-${Sc(t)}`,e)},removeDataAttribute(r,t){r.removeAttribute(`data-bs-${Sc(t)}`)},getDataAttributes(r){if(!r)return{};const t={},e=Object.keys(r.dataset).filter(n=>n.startsWith("bs")&&!n.startsWith("bsConfig"));for(const n of e){let i=n.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1),t[i]=uf(r.dataset[n])}return t},getDataAttribute(r,t){return uf(r.getAttribute(`data-bs-${Sc(t)}`))}};class Eo{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(t){return t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t}_mergeConfigObj(t,e){const n=li(e)?ui.getDataAttribute(e,"config"):{};return{...this.constructor.Default,...typeof n=="object"?n:{},...li(e)?ui.getDataAttributes(e):{},...typeof t=="object"?t:{}}}_typeCheckConfig(t,e=this.constructor.DefaultType){for(const[n,i]of Object.entries(e)){const s=t[n],o=li(s)?"element":Wg(s);if(!new RegExp(i).test(o))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`)}}}const ev="5.3.8";class Fn extends Eo{constructor(t,e){super(),t=Ui(t),t&&(this._element=t,this._config=this._getConfig(e),xc.set(this._element,this.constructor.DATA_KEY,this))}dispose(){xc.remove(this._element,this.constructor.DATA_KEY),Q.off(this._element,this.constructor.EVENT_KEY);for(const t of Object.getOwnPropertyNames(this))this[t]=null}_queueCallback(t,e,n=!0){kp(t,e,n)}_getConfig(t){return t=this._mergeConfigObj(t,this._element),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}static getInstance(t){return xc.get(Ui(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,typeof e=="object"?e:null)}static get VERSION(){return ev}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(t){return`${t}${this.EVENT_KEY}`}}const Mc=r=>{let t=r.getAttribute("data-bs-target");if(!t||t==="#"){let e=r.getAttribute("href");if(!e||!e.includes("#")&&!e.startsWith("."))return null;e.includes("#")&&!e.startsWith("#")&&(e=`#${e.split("#")[1]}`),t=e&&e!=="#"?e.trim():null}return t?t.split(",").map(e=>Up(e)).join(","):null},Tt={find(r,t=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(t,r))},findOne(r,t=document.documentElement){return Element.prototype.querySelector.call(t,r)},children(r,t){return[].concat(...r.children).filter(e=>e.matches(t))},parents(r,t){const e=[];let n=r.parentNode.closest(t);for(;n;)e.push(n),n=n.parentNode.closest(t);return e},prev(r,t){let e=r.previousElementSibling;for(;e;){if(e.matches(t))return[e];e=e.previousElementSibling}return[]},next(r,t){let e=r.nextElementSibling;for(;e;){if(e.matches(t))return[e];e=e.nextElementSibling}return[]},focusableChildren(r){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(e=>`${e}:not([tabindex^="-"])`).join(",");return this.find(t,r).filter(e=>!Fi(e)&&Ds(e))},getSelectorFromElement(r){const t=Mc(r);return t&&Tt.findOne(t)?t:null},getElementFromSelector(r){const t=Mc(r);return t?Tt.findOne(t):null},getMultipleElementsFromSelector(r){const t=Mc(r);return t?Tt.find(t):[]}},nc=(r,t="hide")=>{const e=`click.dismiss${r.EVENT_KEY}`,n=r.NAME;Q.on(document,e,`[data-bs-dismiss="${n}"]`,function(i){if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),Fi(this))return;const s=Tt.getElementFromSelector(this)||this.closest(`.${n}`);r.getOrCreateInstance(s)[t]()})},nv="alert",iv="bs.alert",qp=`.${iv}`,rv=`close${qp}`,sv=`closed${qp}`,ov="fade",av="show";class ic extends Fn{static get NAME(){return nv}close(){if(Q.trigger(this._element,rv).defaultPrevented)return;this._element.classList.remove(av);const e=this._element.classList.contains(ov);this._queueCallback(()=>this._destroyElement(),this._element,e)}_destroyElement(){this._element.remove(),Q.trigger(this._element,sv),this.dispose()}static jQueryInterface(t){return this.each(function(){const e=ic.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}nc(ic,"close");Rn(ic);const cv="button",lv="bs.button",uv=`.${lv}`,hv=".data-api",fv="active",hf='[data-bs-toggle="button"]',dv=`click${uv}${hv}`;class rc extends Fn{static get NAME(){return cv}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle(fv))}static jQueryInterface(t){return this.each(function(){const e=rc.getOrCreateInstance(this);t==="toggle"&&e[t]()})}}Q.on(document,dv,hf,r=>{r.preventDefault();const t=r.target.closest(hf);rc.getOrCreateInstance(t).toggle()});Rn(rc);const pv="swipe",Is=".bs.swipe",mv=`touchstart${Is}`,_v=`touchmove${Is}`,gv=`touchend${Is}`,vv=`pointerdown${Is}`,xv=`pointerup${Is}`,yv="touch",Ev="pen",Sv="pointer-event",Mv=40,Tv={endCallback:null,leftCallback:null,rightCallback:null},bv={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class Oa extends Eo{constructor(t,e){super(),this._element=t,!(!t||!Oa.isSupported())&&(this._config=this._getConfig(e),this._deltaX=0,this._supportPointerEvents=!!window.PointerEvent,this._initEvents())}static get Default(){return Tv}static get DefaultType(){return bv}static get NAME(){return pv}dispose(){Q.off(this._element,Is)}_start(t){if(!this._supportPointerEvents){this._deltaX=t.touches[0].clientX;return}this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX)}_end(t){this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX-this._deltaX),this._handleSwipe(),Ye(this._config.endCallback)}_move(t){this._deltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this._deltaX}_handleSwipe(){const t=Math.abs(this._deltaX);if(t<=Mv)return;const e=t/this._deltaX;this._deltaX=0,e&&Ye(e>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(Q.on(this._element,vv,t=>this._start(t)),Q.on(this._element,xv,t=>this._end(t)),this._element.classList.add(Sv)):(Q.on(this._element,mv,t=>this._start(t)),Q.on(this._element,_v,t=>this._move(t)),Q.on(this._element,gv,t=>this._end(t)))}_eventIsPointerPenTouch(t){return this._supportPointerEvents&&(t.pointerType===Ev||t.pointerType===yv)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const wv="carousel",Av="bs.carousel",Xi=`.${Av}`,Yp=".data-api",Cv="ArrowLeft",Rv="ArrowRight",Pv=500,Fs="next",Rr="prev",Jr="left",ya="right",Lv=`slide${Xi}`,Tc=`slid${Xi}`,Dv=`keydown${Xi}`,Iv=`mouseenter${Xi}`,Nv=`mouseleave${Xi}`,Ov=`dragstart${Xi}`,Uv=`load${Xi}${Yp}`,Fv=`click${Xi}${Yp}`,Kp="carousel",No="active",Bv="slide",zv="carousel-item-end",kv="carousel-item-start",Vv="carousel-item-next",Hv="carousel-item-prev",jp=".active",Jp=".carousel-item",Gv=jp+Jp,Wv=".carousel-item img",Xv=".carousel-indicators",$v="[data-bs-slide], [data-bs-slide-to]",qv='[data-bs-ride="carousel"]',Yv={[Cv]:ya,[Rv]:Jr},Kv={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},jv={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class So extends Fn{constructor(t,e){super(t,e),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=Tt.findOne(Xv,this._element),this._addEventListeners(),this._config.ride===Kp&&this.cycle()}static get Default(){return Kv}static get DefaultType(){return jv}static get NAME(){return wv}next(){this._slide(Fs)}nextWhenVisible(){!document.hidden&&Ds(this._element)&&this.next()}prev(){this._slide(Rr)}pause(){this._isSliding&&Fp(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval(()=>this.nextWhenVisible(),this._config.interval)}_maybeEnableCycle(){if(this._config.ride){if(this._isSliding){Q.one(this._element,Tc,()=>this.cycle());return}this.cycle()}}to(t){const e=this._getItems();if(t>e.length-1||t<0)return;if(this._isSliding){Q.one(this._element,Tc,()=>this.to(t));return}const n=this._getItemIndex(this._getActive());if(n===t)return;const i=t>n?Fs:Rr;this._slide(i,e[t])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(t){return t.defaultInterval=t.interval,t}_addEventListeners(){this._config.keyboard&&Q.on(this._element,Dv,t=>this._keydown(t)),this._config.pause==="hover"&&(Q.on(this._element,Iv,()=>this.pause()),Q.on(this._element,Nv,()=>this._maybeEnableCycle())),this._config.touch&&Oa.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const n of Tt.find(Wv,this._element))Q.on(n,Ov,i=>i.preventDefault());const e={leftCallback:()=>this._slide(this._directionToOrder(Jr)),rightCallback:()=>this._slide(this._directionToOrder(ya)),endCallback:()=>{this._config.pause==="hover"&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>this._maybeEnableCycle(),Pv+this._config.interval))}};this._swipeHelper=new Oa(this._element,e)}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=Yv[t.key];e&&(t.preventDefault(),this._slide(this._directionToOrder(e)))}_getItemIndex(t){return this._getItems().indexOf(t)}_setActiveIndicatorElement(t){if(!this._indicatorsElement)return;const e=Tt.findOne(jp,this._indicatorsElement);e.classList.remove(No),e.removeAttribute("aria-current");const n=Tt.findOne(`[data-bs-slide-to="${t}"]`,this._indicatorsElement);n&&(n.classList.add(No),n.setAttribute("aria-current","true"))}_updateInterval(){const t=this._activeElement||this._getActive();if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);this._config.interval=e||this._config.defaultInterval}_slide(t,e=null){if(this._isSliding)return;const n=this._getActive(),i=t===Fs,s=e||Zu(this._getItems(),n,i,this._config.wrap);if(s===n)return;const o=this._getItemIndex(s),a=d=>Q.trigger(this._element,d,{relatedTarget:s,direction:this._orderToDirection(t),from:this._getItemIndex(n),to:o});if(a(Lv).defaultPrevented||!n||!s)return;const l=!!this._interval;this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(o),this._activeElement=s;const u=i?kv:zv,h=i?Vv:Hv;s.classList.add(h),yo(s),n.classList.add(u),s.classList.add(u);const f=()=>{s.classList.remove(u,h),s.classList.add(No),n.classList.remove(No,h,u),this._isSliding=!1,a(Tc)};this._queueCallback(f,n,this._isAnimated()),l&&this.cycle()}_isAnimated(){return this._element.classList.contains(Bv)}_getActive(){return Tt.findOne(Gv,this._element)}_getItems(){return Tt.find(Jp,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(t){return An()?t===Jr?Rr:Fs:t===Jr?Fs:Rr}_orderToDirection(t){return An()?t===Rr?Jr:ya:t===Rr?ya:Jr}static jQueryInterface(t){return this.each(function(){const e=So.getOrCreateInstance(this,t);if(typeof t=="number"){e.to(t);return}if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}Q.on(document,Fv,$v,function(r){const t=Tt.getElementFromSelector(this);if(!t||!t.classList.contains(Kp))return;r.preventDefault();const e=So.getOrCreateInstance(t),n=this.getAttribute("data-bs-slide-to");if(n){e.to(n),e._maybeEnableCycle();return}if(ui.getDataAttribute(this,"slide")==="next"){e.next(),e._maybeEnableCycle();return}e.prev(),e._maybeEnableCycle()});Q.on(window,Uv,()=>{const r=Tt.find(qv);for(const t of r)So.getOrCreateInstance(t)});Rn(So);const Jv="collapse",Zv="bs.collapse",Mo=`.${Zv}`,Qv=".data-api",t0=`show${Mo}`,e0=`shown${Mo}`,n0=`hide${Mo}`,i0=`hidden${Mo}`,r0=`click${Mo}${Qv}`,bc="show",Qr="collapse",Oo="collapsing",s0="collapsed",o0=`:scope .${Qr} .${Qr}`,a0="collapse-horizontal",c0="width",l0="height",u0=".collapse.show, .collapse.collapsing",Dl='[data-bs-toggle="collapse"]',h0={parent:null,toggle:!0},f0={parent:"(null|element)",toggle:"boolean"};class ao extends Fn{constructor(t,e){super(t,e),this._isTransitioning=!1,this._triggerArray=[];const n=Tt.find(Dl);for(const i of n){const s=Tt.getSelectorFromElement(i),o=Tt.find(s).filter(a=>a===this._element);s!==null&&o.length&&this._triggerArray.push(i)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return h0}static get DefaultType(){return f0}static get NAME(){return Jv}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t=[];if(this._config.parent&&(t=this._getFirstLevelChildren(u0).filter(a=>a!==this._element).map(a=>ao.getOrCreateInstance(a,{toggle:!1}))),t.length&&t[0]._isTransitioning||Q.trigger(this._element,t0).defaultPrevented)return;for(const a of t)a.hide();const n=this._getDimension();this._element.classList.remove(Qr),this._element.classList.add(Oo),this._element.style[n]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const i=()=>{this._isTransitioning=!1,this._element.classList.remove(Oo),this._element.classList.add(Qr,bc),this._element.style[n]="",Q.trigger(this._element,e0)},o=`scroll${n[0].toUpperCase()+n.slice(1)}`;this._queueCallback(i,this._element,!0),this._element.style[n]=`${this._element[o]}px`}hide(){if(this._isTransitioning||!this._isShown()||Q.trigger(this._element,n0).defaultPrevented)return;const e=this._getDimension();this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,yo(this._element),this._element.classList.add(Oo),this._element.classList.remove(Qr,bc);for(const i of this._triggerArray){const s=Tt.getElementFromSelector(i);s&&!this._isShown(s)&&this._addAriaAndCollapsedClass([i],!1)}this._isTransitioning=!0;const n=()=>{this._isTransitioning=!1,this._element.classList.remove(Oo),this._element.classList.add(Qr),Q.trigger(this._element,i0)};this._element.style[e]="",this._queueCallback(n,this._element,!0)}_isShown(t=this._element){return t.classList.contains(bc)}_configAfterMerge(t){return t.toggle=!!t.toggle,t.parent=Ui(t.parent),t}_getDimension(){return this._element.classList.contains(a0)?c0:l0}_initializeChildren(){if(!this._config.parent)return;const t=this._getFirstLevelChildren(Dl);for(const e of t){const n=Tt.getElementFromSelector(e);n&&this._addAriaAndCollapsedClass([e],this._isShown(n))}}_getFirstLevelChildren(t){const e=Tt.find(o0,this._config.parent);return Tt.find(t,this._config.parent).filter(n=>!e.includes(n))}_addAriaAndCollapsedClass(t,e){if(t.length)for(const n of t)n.classList.toggle(s0,!e),n.setAttribute("aria-expanded",e)}static jQueryInterface(t){const e={};return typeof t=="string"&&/show|hide/.test(t)&&(e.toggle=!1),this.each(function(){const n=ao.getOrCreateInstance(this,e);if(typeof t=="string"){if(typeof n[t]>"u")throw new TypeError(`No method named "${t}"`);n[t]()}})}}Q.on(document,r0,Dl,function(r){(r.target.tagName==="A"||r.delegateTarget&&r.delegateTarget.tagName==="A")&&r.preventDefault();for(const t of Tt.getMultipleElementsFromSelector(this))ao.getOrCreateInstance(t,{toggle:!1}).toggle()});Rn(ao);const ff="dropdown",d0="bs.dropdown",br=`.${d0}`,th=".data-api",p0="Escape",df="Tab",m0="ArrowUp",pf="ArrowDown",_0=2,g0=`hide${br}`,v0=`hidden${br}`,x0=`show${br}`,y0=`shown${br}`,Zp=`click${br}${th}`,Qp=`keydown${br}${th}`,E0=`keyup${br}${th}`,Zr="show",S0="dropup",M0="dropend",T0="dropstart",b0="dropup-center",w0="dropdown-center",ur='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',A0=`${ur}.${Zr}`,Ea=".dropdown-menu",C0=".navbar",R0=".navbar-nav",P0=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",L0=An()?"top-end":"top-start",D0=An()?"top-start":"top-end",I0=An()?"bottom-end":"bottom-start",N0=An()?"bottom-start":"bottom-end",O0=An()?"left-start":"right-start",U0=An()?"right-start":"left-start",F0="top",B0="bottom",z0={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},k0={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class Wn extends Fn{constructor(t,e){super(t,e),this._popper=null,this._parent=this._element.parentNode,this._menu=Tt.next(this._element,Ea)[0]||Tt.prev(this._element,Ea)[0]||Tt.findOne(Ea,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return z0}static get DefaultType(){return k0}static get NAME(){return ff}toggle(){return this._isShown()?this.hide():this.show()}show(){if(Fi(this._element)||this._isShown())return;const t={relatedTarget:this._element};if(!Q.trigger(this._element,x0,t).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(R0))for(const n of[].concat(...document.body.children))Q.on(n,"mouseover",Na);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(Zr),this._element.classList.add(Zr),Q.trigger(this._element,y0,t)}}hide(){if(Fi(this._element)||!this._isShown())return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(t){if(!Q.trigger(this._element,g0,t).defaultPrevented){if("ontouchstart"in document.documentElement)for(const n of[].concat(...document.body.children))Q.off(n,"mouseover",Na);this._popper&&this._popper.destroy(),this._menu.classList.remove(Zr),this._element.classList.remove(Zr),this._element.setAttribute("aria-expanded","false"),ui.removeDataAttribute(this._menu,"popper"),Q.trigger(this._element,v0,t)}}_getConfig(t){if(t=super._getConfig(t),typeof t.reference=="object"&&!li(t.reference)&&typeof t.reference.getBoundingClientRect!="function")throw new TypeError(`${ff.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return t}_createPopper(){if(typeof Op>"u")throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");let t=this._element;this._config.reference==="parent"?t=this._parent:li(this._config.reference)?t=Ui(this._config.reference):typeof this._config.reference=="object"&&(t=this._config.reference);const e=this._getPopperConfig();this._popper=Ju(t,this._menu,e)}_isShown(){return this._menu.classList.contains(Zr)}_getPlacement(){const t=this._parent;if(t.classList.contains(M0))return O0;if(t.classList.contains(T0))return U0;if(t.classList.contains(b0))return F0;if(t.classList.contains(w0))return B0;const e=getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()==="end";return t.classList.contains(S0)?e?D0:L0:e?N0:I0}_detectNavbar(){return this._element.closest(C0)!==null}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||this._config.display==="static")&&(ui.setDataAttribute(this._menu,"popper","static"),t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,...Ye(this._config.popperConfig,[void 0,t])}}_selectMenuItem({key:t,target:e}){const n=Tt.find(P0,this._menu).filter(i=>Ds(i));n.length&&Zu(n,e,t===pf,!n.includes(e)).focus()}static jQueryInterface(t){return this.each(function(){const e=Wn.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}static clearMenus(t){if(t.button===_0||t.type==="keyup"&&t.key!==df)return;const e=Tt.find(A0);for(const n of e){const i=Wn.getInstance(n);if(!i||i._config.autoClose===!1)continue;const s=t.composedPath(),o=s.includes(i._menu);if(s.includes(i._element)||i._config.autoClose==="inside"&&!o||i._config.autoClose==="outside"&&o||i._menu.contains(t.target)&&(t.type==="keyup"&&t.key===df||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;const a={relatedTarget:i._element};t.type==="click"&&(a.clickEvent=t),i._completeHide(a)}}static dataApiKeydownHandler(t){const e=/input|textarea/i.test(t.target.tagName),n=t.key===p0,i=[m0,pf].includes(t.key);if(!i&&!n||e&&!n)return;t.preventDefault();const s=this.matches(ur)?this:Tt.prev(this,ur)[0]||Tt.next(this,ur)[0]||Tt.findOne(ur,t.delegateTarget.parentNode),o=Wn.getOrCreateInstance(s);if(i){t.stopPropagation(),o.show(),o._selectMenuItem(t);return}o._isShown()&&(t.stopPropagation(),o.hide(),s.focus())}}Q.on(document,Qp,ur,Wn.dataApiKeydownHandler);Q.on(document,Qp,Ea,Wn.dataApiKeydownHandler);Q.on(document,Zp,Wn.clearMenus);Q.on(document,E0,Wn.clearMenus);Q.on(document,Zp,ur,function(r){r.preventDefault(),Wn.getOrCreateInstance(this).toggle()});Rn(Wn);const tm="backdrop",V0="fade",mf="show",_f=`mousedown.bs.${tm}`,H0={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},G0={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class em extends Eo{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null}static get Default(){return H0}static get DefaultType(){return G0}static get NAME(){return tm}show(t){if(!this._config.isVisible){Ye(t);return}this._append();const e=this._getElement();this._config.isAnimated&&yo(e),e.classList.add(mf),this._emulateAnimation(()=>{Ye(t)})}hide(t){if(!this._config.isVisible){Ye(t);return}this._getElement().classList.remove(mf),this._emulateAnimation(()=>{this.dispose(),Ye(t)})}dispose(){this._isAppended&&(Q.off(this._element,_f),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add(V0),this._element=t}return this._element}_configAfterMerge(t){return t.rootElement=Ui(t.rootElement),t}_append(){if(this._isAppended)return;const t=this._getElement();this._config.rootElement.append(t),Q.on(t,_f,()=>{Ye(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(t){kp(t,this._getElement(),this._config.isAnimated)}}const W0="focustrap",X0="bs.focustrap",Ua=`.${X0}`,$0=`focusin${Ua}`,q0=`keydown.tab${Ua}`,Y0="Tab",K0="forward",gf="backward",j0={autofocus:!0,trapElement:null},J0={autofocus:"boolean",trapElement:"element"};class nm extends Eo{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return j0}static get DefaultType(){return J0}static get NAME(){return W0}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),Q.off(document,Ua),Q.on(document,$0,t=>this._handleFocusin(t)),Q.on(document,q0,t=>this._handleKeydown(t)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,Q.off(document,Ua))}_handleFocusin(t){const{trapElement:e}=this._config;if(t.target===document||t.target===e||e.contains(t.target))return;const n=Tt.focusableChildren(e);n.length===0?e.focus():this._lastTabNavDirection===gf?n[n.length-1].focus():n[0].focus()}_handleKeydown(t){t.key===Y0&&(this._lastTabNavDirection=t.shiftKey?gf:K0)}}const vf=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",xf=".sticky-top",Uo="padding-right",yf="margin-right";class Il{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,Uo,e=>e+t),this._setElementAttributes(vf,Uo,e=>e+t),this._setElementAttributes(xf,yf,e=>e-t)}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,Uo),this._resetElementAttributes(vf,Uo),this._resetElementAttributes(xf,yf)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,n){const i=this.getWidth(),s=o=>{if(o!==this._element&&window.innerWidth>o.clientWidth+i)return;this._saveInitialAttribute(o,e);const a=window.getComputedStyle(o).getPropertyValue(e);o.style.setProperty(e,`${n(Number.parseFloat(a))}px`)};this._applyManipulationCallback(t,s)}_saveInitialAttribute(t,e){const n=t.style.getPropertyValue(e);n&&ui.setDataAttribute(t,e,n)}_resetElementAttributes(t,e){const n=i=>{const s=ui.getDataAttribute(i,e);if(s===null){i.style.removeProperty(e);return}ui.removeDataAttribute(i,e),i.style.setProperty(e,s)};this._applyManipulationCallback(t,n)}_applyManipulationCallback(t,e){if(li(t)){e(t);return}for(const n of Tt.find(t,this._element))e(n)}}const Z0="modal",Q0="bs.modal",Cn=`.${Q0}`,tx=".data-api",ex="Escape",nx=`hide${Cn}`,ix=`hidePrevented${Cn}`,im=`hidden${Cn}`,rm=`show${Cn}`,rx=`shown${Cn}`,sx=`resize${Cn}`,ox=`click.dismiss${Cn}`,ax=`mousedown.dismiss${Cn}`,cx=`keydown.dismiss${Cn}`,lx=`click${Cn}${tx}`,Ef="modal-open",ux="fade",Sf="show",wc="modal-static",hx=".modal.show",fx=".modal-dialog",dx=".modal-body",px='[data-bs-toggle="modal"]',mx={backdrop:!0,focus:!0,keyboard:!0},_x={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class _s extends Fn{constructor(t,e){super(t,e),this._dialog=Tt.findOne(fx,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new Il,this._addEventListeners()}static get Default(){return mx}static get DefaultType(){return _x}static get NAME(){return Z0}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||Q.trigger(this._element,rm,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(Ef),this._adjustDialog(),this._backdrop.show(()=>this._showElement(t)))}hide(){!this._isShown||this._isTransitioning||Q.trigger(this._element,nx).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(Sf),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated()))}dispose(){Q.off(window,Cn),Q.off(this._dialog,Cn),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new em({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new nm({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const e=Tt.findOne(dx,this._dialog);e&&(e.scrollTop=0),yo(this._element),this._element.classList.add(Sf);const n=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,Q.trigger(this._element,rx,{relatedTarget:t})};this._queueCallback(n,this._dialog,this._isAnimated())}_addEventListeners(){Q.on(this._element,cx,t=>{if(t.key===ex){if(this._config.keyboard){this.hide();return}this._triggerBackdropTransition()}}),Q.on(window,sx,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),Q.on(this._element,ax,t=>{Q.one(this._element,ox,e=>{if(!(this._element!==t.target||this._element!==e.target)){if(this._config.backdrop==="static"){this._triggerBackdropTransition();return}this._config.backdrop&&this.hide()}})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(Ef),this._resetAdjustments(),this._scrollBar.reset(),Q.trigger(this._element,im)})}_isAnimated(){return this._element.classList.contains(ux)}_triggerBackdropTransition(){if(Q.trigger(this._element,ix).defaultPrevented)return;const e=this._element.scrollHeight>document.documentElement.clientHeight,n=this._element.style.overflowY;n==="hidden"||this._element.classList.contains(wc)||(e||(this._element.style.overflowY="hidden"),this._element.classList.add(wc),this._queueCallback(()=>{this._element.classList.remove(wc),this._queueCallback(()=>{this._element.style.overflowY=n},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),n=e>0;if(n&&!t){const i=An()?"paddingLeft":"paddingRight";this._element.style[i]=`${e}px`}if(!n&&t){const i=An()?"paddingRight":"paddingLeft";this._element.style[i]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each(function(){const n=_s.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof n[t]>"u")throw new TypeError(`No method named "${t}"`);n[t](e)}})}}Q.on(document,lx,px,function(r){const t=Tt.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&r.preventDefault(),Q.one(t,rm,i=>{i.defaultPrevented||Q.one(t,im,()=>{Ds(this)&&this.focus()})});const e=Tt.findOne(hx);e&&_s.getInstance(e).hide(),_s.getOrCreateInstance(t).toggle(this)});nc(_s);Rn(_s);const gx="offcanvas",vx="bs.offcanvas",mi=`.${vx}`,sm=".data-api",xx=`load${mi}${sm}`,yx="Escape",Mf="show",Tf="showing",bf="hiding",Ex="offcanvas-backdrop",om=".offcanvas.show",Sx=`show${mi}`,Mx=`shown${mi}`,Tx=`hide${mi}`,wf=`hidePrevented${mi}`,am=`hidden${mi}`,bx=`resize${mi}`,wx=`click${mi}${sm}`,Ax=`keydown.dismiss${mi}`,Cx='[data-bs-toggle="offcanvas"]',Rx={backdrop:!0,keyboard:!0,scroll:!1},Px={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class Bi extends Fn{constructor(t,e){super(t,e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return Rx}static get DefaultType(){return Px}static get NAME(){return gx}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){if(this._isShown||Q.trigger(this._element,Sx,{relatedTarget:t}).defaultPrevented)return;this._isShown=!0,this._backdrop.show(),this._config.scroll||new Il().hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(Tf);const n=()=>{(!this._config.scroll||this._config.backdrop)&&this._focustrap.activate(),this._element.classList.add(Mf),this._element.classList.remove(Tf),Q.trigger(this._element,Mx,{relatedTarget:t})};this._queueCallback(n,this._element,!0)}hide(){if(!this._isShown||Q.trigger(this._element,Tx).defaultPrevented)return;this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(bf),this._backdrop.hide();const e=()=>{this._element.classList.remove(Mf,bf),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||new Il().reset(),Q.trigger(this._element,am)};this._queueCallback(e,this._element,!0)}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const t=()=>{if(this._config.backdrop==="static"){Q.trigger(this._element,wf);return}this.hide()},e=!!this._config.backdrop;return new em({className:Ex,isVisible:e,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:e?t:null})}_initializeFocusTrap(){return new nm({trapElement:this._element})}_addEventListeners(){Q.on(this._element,Ax,t=>{if(t.key===yx){if(this._config.keyboard){this.hide();return}Q.trigger(this._element,wf)}})}static jQueryInterface(t){return this.each(function(){const e=Bi.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}Q.on(document,wx,Cx,function(r){const t=Tt.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&r.preventDefault(),Fi(this))return;Q.one(t,am,()=>{Ds(this)&&this.focus()});const e=Tt.findOne(om);e&&e!==t&&Bi.getInstance(e).hide(),Bi.getOrCreateInstance(t).toggle(this)});Q.on(window,xx,()=>{for(const r of Tt.find(om))Bi.getOrCreateInstance(r).show()});Q.on(window,bx,()=>{for(const r of Tt.find("[aria-modal][class*=show][class*=offcanvas-]"))getComputedStyle(r).position!=="fixed"&&Bi.getOrCreateInstance(r).hide()});nc(Bi);Rn(Bi);const Lx=/^aria-[\w-]*$/i,cm={"*":["class","dir","id","lang","role",Lx],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},Dx=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),Ix=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,Nx=(r,t)=>{const e=r.nodeName.toLowerCase();return t.includes(e)?Dx.has(e)?!!Ix.test(r.nodeValue):!0:t.filter(n=>n instanceof RegExp).some(n=>n.test(e))};function Ox(r,t,e){if(!r.length)return r;if(e&&typeof e=="function")return e(r);const i=new window.DOMParser().parseFromString(r,"text/html"),s=[].concat(...i.body.querySelectorAll("*"));for(const o of s){const a=o.nodeName.toLowerCase();if(!Object.keys(t).includes(a)){o.remove();continue}const c=[].concat(...o.attributes),l=[].concat(t["*"]||[],t[a]||[]);for(const u of c)Nx(u,l)||o.removeAttribute(u.nodeName)}return i.body.innerHTML}const Ux="TemplateFactory",Fx={allowList:cm,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},Bx={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},zx={entry:"(string|element|function|null)",selector:"(string|element)"};class kx extends Eo{constructor(t){super(),this._config=this._getConfig(t)}static get Default(){return Fx}static get DefaultType(){return Bx}static get NAME(){return Ux}getContent(){return Object.values(this._config.content).map(t=>this._resolvePossibleFunction(t)).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(t){return this._checkContent(t),this._config.content={...this._config.content,...t},this}toHtml(){const t=document.createElement("div");t.innerHTML=this._maybeSanitize(this._config.template);for(const[i,s]of Object.entries(this._config.content))this._setContent(t,s,i);const e=t.children[0],n=this._resolvePossibleFunction(this._config.extraClass);return n&&e.classList.add(...n.split(" ")),e}_typeCheckConfig(t){super._typeCheckConfig(t),this._checkContent(t.content)}_checkContent(t){for(const[e,n]of Object.entries(t))super._typeCheckConfig({selector:e,entry:n},zx)}_setContent(t,e,n){const i=Tt.findOne(n,t);if(i){if(e=this._resolvePossibleFunction(e),!e){i.remove();return}if(li(e)){this._putElementInTemplate(Ui(e),i);return}if(this._config.html){i.innerHTML=this._maybeSanitize(e);return}i.textContent=e}}_maybeSanitize(t){return this._config.sanitize?Ox(t,this._config.allowList,this._config.sanitizeFn):t}_resolvePossibleFunction(t){return Ye(t,[void 0,this])}_putElementInTemplate(t,e){if(this._config.html){e.innerHTML="",e.append(t);return}e.textContent=t.textContent}}const Vx="tooltip",Hx=new Set(["sanitize","allowList","sanitizeFn"]),Ac="fade",Gx="modal",Fo="show",Wx=".tooltip-inner",Af=`.${Gx}`,Cf="hide.bs.modal",Bs="hover",Cc="focus",Rc="click",Xx="manual",$x="hide",qx="hidden",Yx="show",Kx="shown",jx="inserted",Jx="click",Zx="focusin",Qx="focusout",ty="mouseenter",ey="mouseleave",ny={AUTO:"auto",TOP:"top",RIGHT:An()?"left":"right",BOTTOM:"bottom",LEFT:An()?"right":"left"},iy={allowList:cm,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},ry={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class Ns extends Fn{constructor(t,e){if(typeof Op>"u")throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");super(t,e),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return iy}static get DefaultType(){return ry}static get NAME(){return Vx}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){if(this._isEnabled){if(this._isShown()){this._leave();return}this._enter()}}dispose(){clearTimeout(this._timeout),Q.off(this._element.closest(Af),Cf,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if(this._element.style.display==="none")throw new Error("Please use show on visible elements");if(!(this._isWithContent()&&this._isEnabled))return;const t=Q.trigger(this._element,this.constructor.eventName(Yx)),n=(Bp(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(t.defaultPrevented||!n)return;this._disposePopper();const i=this._getTipElement();this._element.setAttribute("aria-describedby",i.getAttribute("id"));const{container:s}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(s.append(i),Q.trigger(this._element,this.constructor.eventName(jx))),this._popper=this._createPopper(i),i.classList.add(Fo),"ontouchstart"in document.documentElement)for(const a of[].concat(...document.body.children))Q.on(a,"mouseover",Na);const o=()=>{Q.trigger(this._element,this.constructor.eventName(Kx)),this._isHovered===!1&&this._leave(),this._isHovered=!1};this._queueCallback(o,this.tip,this._isAnimated())}hide(){if(!this._isShown()||Q.trigger(this._element,this.constructor.eventName($x)).defaultPrevented)return;if(this._getTipElement().classList.remove(Fo),"ontouchstart"in document.documentElement)for(const i of[].concat(...document.body.children))Q.off(i,"mouseover",Na);this._activeTrigger[Rc]=!1,this._activeTrigger[Cc]=!1,this._activeTrigger[Bs]=!1,this._isHovered=null;const n=()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),Q.trigger(this._element,this.constructor.eventName(qx)))};this._queueCallback(n,this.tip,this._isAnimated())}update(){this._popper&&this._popper.update()}_isWithContent(){return!!this._getTitle()}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(t){const e=this._getTemplateFactory(t).toHtml();if(!e)return null;e.classList.remove(Ac,Fo),e.classList.add(`bs-${this.constructor.NAME}-auto`);const n=Xg(this.constructor.NAME).toString();return e.setAttribute("id",n),this._isAnimated()&&e.classList.add(Ac),e}setContent(t){this._newContent=t,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(t){return this._templateFactory?this._templateFactory.changeContent(t):this._templateFactory=new kx({...this._config,content:t,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{[Wx]:this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(t){return this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(Ac)}_isShown(){return this.tip&&this.tip.classList.contains(Fo)}_createPopper(t){const e=Ye(this._config.placement,[this,t,this._element]),n=ny[e.toUpperCase()];return Ju(this._element,t,this._getPopperConfig(n))}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_resolvePossibleFunction(t){return Ye(t,[this._element,this._element])}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:n=>{this._getTipElement().setAttribute("data-popper-placement",n.state.placement)}}]};return{...e,...Ye(this._config.popperConfig,[void 0,e])}}_setListeners(){const t=this._config.trigger.split(" ");for(const e of t)if(e==="click")Q.on(this._element,this.constructor.eventName(Jx),this._config.selector,n=>{const i=this._initializeOnDelegatedTarget(n);i._activeTrigger[Rc]=!(i._isShown()&&i._activeTrigger[Rc]),i.toggle()});else if(e!==Xx){const n=e===Bs?this.constructor.eventName(ty):this.constructor.eventName(Zx),i=e===Bs?this.constructor.eventName(ey):this.constructor.eventName(Qx);Q.on(this._element,n,this._config.selector,s=>{const o=this._initializeOnDelegatedTarget(s);o._activeTrigger[s.type==="focusin"?Cc:Bs]=!0,o._enter()}),Q.on(this._element,i,this._config.selector,s=>{const o=this._initializeOnDelegatedTarget(s);o._activeTrigger[s.type==="focusout"?Cc:Bs]=o._element.contains(s.relatedTarget),o._leave()})}this._hideModalHandler=()=>{this._element&&this.hide()},Q.on(this._element.closest(Af),Cf,this._hideModalHandler)}_fixTitle(){const t=this._element.getAttribute("title");t&&(!this._element.getAttribute("aria-label")&&!this._element.textContent.trim()&&this._element.setAttribute("aria-label",t),this._element.setAttribute("data-bs-original-title",t),this._element.removeAttribute("title"))}_enter(){if(this._isShown()||this._isHovered){this._isHovered=!0;return}this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show)}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(t,e){clearTimeout(this._timeout),this._timeout=setTimeout(t,e)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(t){const e=ui.getDataAttributes(this._element);for(const n of Object.keys(e))Hx.has(n)&&delete e[n];return t={...e,...typeof t=="object"&&t?t:{}},t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t.container=t.container===!1?document.body:Ui(t.container),typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),typeof t.title=="number"&&(t.title=t.title.toString()),typeof t.content=="number"&&(t.content=t.content.toString()),t}_getDelegateConfig(){const t={};for(const[e,n]of Object.entries(this._config))this.constructor.Default[e]!==n&&(t[e]=n);return t.selector=!1,t.trigger="manual",t}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(t){return this.each(function(){const e=Ns.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}Rn(Ns);const sy="popover",oy=".popover-header",ay=".popover-body",cy={...Ns.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},ly={...Ns.DefaultType,content:"(null|string|element|function)"};class eh extends Ns{static get Default(){return cy}static get DefaultType(){return ly}static get NAME(){return sy}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[oy]:this._getTitle(),[ay]:this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(t){return this.each(function(){const e=eh.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}Rn(eh);const uy="scrollspy",hy="bs.scrollspy",nh=`.${hy}`,fy=".data-api",dy=`activate${nh}`,Rf=`click${nh}`,py=`load${nh}${fy}`,my="dropdown-item",Pr="active",_y='[data-bs-spy="scroll"]',Pc="[href]",gy=".nav, .list-group",Pf=".nav-link",vy=".nav-item",xy=".list-group-item",yy=`${Pf}, ${vy} > ${Pf}, ${xy}`,Ey=".dropdown",Sy=".dropdown-toggle",My={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},Ty={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class sc extends Fn{constructor(t,e){super(t,e),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement=getComputedStyle(this._element).overflowY==="visible"?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return My}static get DefaultType(){return Ty}static get NAME(){return uy}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const t of this._observableSections.values())this._observer.observe(t)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(t){return t.target=Ui(t.target)||document.body,t.rootMargin=t.offset?`${t.offset}px 0px -30%`:t.rootMargin,typeof t.threshold=="string"&&(t.threshold=t.threshold.split(",").map(e=>Number.parseFloat(e))),t}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(Q.off(this._config.target,Rf),Q.on(this._config.target,Rf,Pc,t=>{const e=this._observableSections.get(t.target.hash);if(e){t.preventDefault();const n=this._rootElement||window,i=e.offsetTop-this._element.offsetTop;if(n.scrollTo){n.scrollTo({top:i,behavior:"smooth"});return}n.scrollTop=i}}))}_getNewObserver(){const t={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver(e=>this._observerCallback(e),t)}_observerCallback(t){const e=o=>this._targetLinks.get(`#${o.target.id}`),n=o=>{this._previousScrollData.visibleEntryTop=o.target.offsetTop,this._process(e(o))},i=(this._rootElement||document.documentElement).scrollTop,s=i>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=i;for(const o of t){if(!o.isIntersecting){this._activeTarget=null,this._clearActiveClass(e(o));continue}const a=o.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(s&&a){if(n(o),!i)return;continue}!s&&!a&&n(o)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const t=Tt.find(Pc,this._config.target);for(const e of t){if(!e.hash||Fi(e))continue;const n=Tt.findOne(decodeURI(e.hash),this._element);Ds(n)&&(this._targetLinks.set(decodeURI(e.hash),e),this._observableSections.set(e.hash,n))}}_process(t){this._activeTarget!==t&&(this._clearActiveClass(this._config.target),this._activeTarget=t,t.classList.add(Pr),this._activateParents(t),Q.trigger(this._element,dy,{relatedTarget:t}))}_activateParents(t){if(t.classList.contains(my)){Tt.findOne(Sy,t.closest(Ey)).classList.add(Pr);return}for(const e of Tt.parents(t,gy))for(const n of Tt.prev(e,yy))n.classList.add(Pr)}_clearActiveClass(t){t.classList.remove(Pr);const e=Tt.find(`${Pc}.${Pr}`,t);for(const n of e)n.classList.remove(Pr)}static jQueryInterface(t){return this.each(function(){const e=sc.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}Q.on(window,py,()=>{for(const r of Tt.find(_y))sc.getOrCreateInstance(r)});Rn(sc);const by="tab",wy="bs.tab",wr=`.${wy}`,Ay=`hide${wr}`,Cy=`hidden${wr}`,Ry=`show${wr}`,Py=`shown${wr}`,Ly=`click${wr}`,Dy=`keydown${wr}`,Iy=`load${wr}`,Ny="ArrowLeft",Lf="ArrowRight",Oy="ArrowUp",Df="ArrowDown",Lc="Home",If="End",hr="active",Nf="fade",Dc="show",Uy="dropdown",lm=".dropdown-toggle",Fy=".dropdown-menu",Ic=`:not(${lm})`,By='.list-group, .nav, [role="tablist"]',zy=".nav-item, .list-group-item",ky=`.nav-link${Ic}, .list-group-item${Ic}, [role="tab"]${Ic}`,um='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',Nc=`${ky}, ${um}`,Vy=`.${hr}[data-bs-toggle="tab"], .${hr}[data-bs-toggle="pill"], .${hr}[data-bs-toggle="list"]`;class gs extends Fn{constructor(t){super(t),this._parent=this._element.closest(By),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),Q.on(this._element,Dy,e=>this._keydown(e)))}static get NAME(){return by}show(){const t=this._element;if(this._elemIsActive(t))return;const e=this._getActiveElem(),n=e?Q.trigger(e,Ay,{relatedTarget:t}):null;Q.trigger(t,Ry,{relatedTarget:e}).defaultPrevented||n&&n.defaultPrevented||(this._deactivate(e,t),this._activate(t,e))}_activate(t,e){if(!t)return;t.classList.add(hr),this._activate(Tt.getElementFromSelector(t));const n=()=>{if(t.getAttribute("role")!=="tab"){t.classList.add(Dc);return}t.removeAttribute("tabindex"),t.setAttribute("aria-selected",!0),this._toggleDropDown(t,!0),Q.trigger(t,Py,{relatedTarget:e})};this._queueCallback(n,t,t.classList.contains(Nf))}_deactivate(t,e){if(!t)return;t.classList.remove(hr),t.blur(),this._deactivate(Tt.getElementFromSelector(t));const n=()=>{if(t.getAttribute("role")!=="tab"){t.classList.remove(Dc);return}t.setAttribute("aria-selected",!1),t.setAttribute("tabindex","-1"),this._toggleDropDown(t,!1),Q.trigger(t,Cy,{relatedTarget:e})};this._queueCallback(n,t,t.classList.contains(Nf))}_keydown(t){if(![Ny,Lf,Oy,Df,Lc,If].includes(t.key))return;t.stopPropagation(),t.preventDefault();const e=this._getChildren().filter(i=>!Fi(i));let n;if([Lc,If].includes(t.key))n=e[t.key===Lc?0:e.length-1];else{const i=[Lf,Df].includes(t.key);n=Zu(e,t.target,i,!0)}n&&(n.focus({preventScroll:!0}),gs.getOrCreateInstance(n).show())}_getChildren(){return Tt.find(Nc,this._parent)}_getActiveElem(){return this._getChildren().find(t=>this._elemIsActive(t))||null}_setInitialAttributes(t,e){this._setAttributeIfNotExists(t,"role","tablist");for(const n of e)this._setInitialAttributesOnChild(n)}_setInitialAttributesOnChild(t){t=this._getInnerElement(t);const e=this._elemIsActive(t),n=this._getOuterElement(t);t.setAttribute("aria-selected",e),n!==t&&this._setAttributeIfNotExists(n,"role","presentation"),e||t.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(t,"role","tab"),this._setInitialAttributesOnTargetPanel(t)}_setInitialAttributesOnTargetPanel(t){const e=Tt.getElementFromSelector(t);e&&(this._setAttributeIfNotExists(e,"role","tabpanel"),t.id&&this._setAttributeIfNotExists(e,"aria-labelledby",`${t.id}`))}_toggleDropDown(t,e){const n=this._getOuterElement(t);if(!n.classList.contains(Uy))return;const i=(s,o)=>{const a=Tt.findOne(s,n);a&&a.classList.toggle(o,e)};i(lm,hr),i(Fy,Dc),n.setAttribute("aria-expanded",e)}_setAttributeIfNotExists(t,e,n){t.hasAttribute(e)||t.setAttribute(e,n)}_elemIsActive(t){return t.classList.contains(hr)}_getInnerElement(t){return t.matches(Nc)?t:Tt.findOne(Nc,t)}_getOuterElement(t){return t.closest(zy)||t}static jQueryInterface(t){return this.each(function(){const e=gs.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}Q.on(document,Ly,um,function(r){["A","AREA"].includes(this.tagName)&&r.preventDefault(),!Fi(this)&&gs.getOrCreateInstance(this).show()});Q.on(window,Iy,()=>{for(const r of Tt.find(Vy))gs.getOrCreateInstance(r)});Rn(gs);const Hy="toast",Gy="bs.toast",$i=`.${Gy}`,Wy=`mouseover${$i}`,Xy=`mouseout${$i}`,$y=`focusin${$i}`,qy=`focusout${$i}`,Yy=`hide${$i}`,Ky=`hidden${$i}`,jy=`show${$i}`,Jy=`shown${$i}`,Zy="fade",Of="hide",Bo="show",zo="showing",Qy={animation:"boolean",autohide:"boolean",delay:"number"},tE={animation:!0,autohide:!0,delay:5e3};class oc extends Fn{constructor(t,e){super(t,e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return tE}static get DefaultType(){return Qy}static get NAME(){return Hy}show(){if(Q.trigger(this._element,jy).defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add(Zy);const e=()=>{this._element.classList.remove(zo),Q.trigger(this._element,Jy),this._maybeScheduleHide()};this._element.classList.remove(Of),yo(this._element),this._element.classList.add(Bo,zo),this._queueCallback(e,this._element,this._config.animation)}hide(){if(!this.isShown()||Q.trigger(this._element,Yy).defaultPrevented)return;const e=()=>{this._element.classList.add(Of),this._element.classList.remove(zo,Bo),Q.trigger(this._element,Ky)};this._element.classList.add(zo),this._queueCallback(e,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(Bo),super.dispose()}isShown(){return this._element.classList.contains(Bo)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":{this._hasMouseInteraction=e;break}case"focusin":case"focusout":{this._hasKeyboardInteraction=e;break}}if(e){this._clearTimeout();return}const n=t.relatedTarget;this._element===n||this._element.contains(n)||this._maybeScheduleHide()}_setListeners(){Q.on(this._element,Wy,t=>this._onInteraction(t,!0)),Q.on(this._element,Xy,t=>this._onInteraction(t,!1)),Q.on(this._element,$y,t=>this._onInteraction(t,!0)),Q.on(this._element,qy,t=>this._onInteraction(t,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each(function(){const e=oc.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}nc(oc);Rn(oc);function ri(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function hm(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var pn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},co={duration:.5,overwrite:!1,delay:0},ih,Ie,de,Mn=1e8,oe=1/Mn,Nl=Math.PI*2,eE=Nl/4,nE=0,fm=Math.sqrt,iE=Math.cos,rE=Math.sin,Re=function(t){return typeof t=="string"},ve=function(t){return typeof t=="function"},fi=function(t){return typeof t=="number"},rh=function(t){return typeof t>"u"},$n=function(t){return typeof t=="object"},je=function(t){return t!==!1},sh=function(){return typeof window<"u"},ko=function(t){return ve(t)||Re(t)},dm=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Be=Array.isArray,sE=/random\([^)]+\)/g,oE=/,\s*/g,Uf=/(?:-?\.?\d|\.)+/gi,pm=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ts=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Oc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,mm=/[+-]=-?[.\d]+/,aE=/[^,'"\[\]\s]+/gi,cE=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,me,Bn,Ol,oh,vn={},Fa={},_m,gm=function(t){return(Fa=vs(t,vn))&&en},ah=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},lo=function(t,e){return!e&&console.warn(t)},vm=function(t,e){return t&&(vn[t]=e)&&Fa&&(Fa[t]=e)||vn},uo=function(){return 0},lE={suppressEvents:!0,isStart:!0,kill:!1},Sa={suppressEvents:!0,kill:!1},uE={suppressEvents:!0},ch={},Li=[],Ul={},xm,an={},Uc={},Ff=30,Ma=[],lh="",uh=function(t){var e=t[0],n,i;if($n(e)||ve(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=Ma.length;i--&&!Ma[i].targetTest(e););n=Ma[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Vm(t[i],n)))||t.splice(i,1);return t},_r=function(t){return t._gsap||uh(Tn(t))[0]._gsap},ym=function(t,e,n){return(n=t[e])&&ve(n)?t[e]():rh(n)&&t.getAttribute&&t.getAttribute(e)||n},Je=function(t,e){return(t=t.split(",")).forEach(e)||t},ye=function(t){return Math.round(t*1e5)/1e5||0},pe=function(t){return Math.round(t*1e7)/1e7||0},rs=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},hE=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Ba=function(){var t=Li.length,e=Li.slice(0),n,i;for(Ul={},Li.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},hh=function(t){return!!(t._initted||t._startAt||t.add)},Em=function(t,e,n,i){Li.length&&!Ie&&Ba(),t.render(e,n,i||!!(Ie&&e<0&&hh(t))),Li.length&&!Ie&&Ba()},Sm=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(aE).length<2?e:Re(t)?t.trim():t},Mm=function(t){return t},xn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},fE=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},vs=function(t,e){for(var n in e)t[n]=e[n];return t},Bf=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=$n(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},za=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},no=function(t){var e=t.parent||me,n=t.keyframes?fE(Be(t.keyframes)):xn;if(je(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},dE=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Tm=function(t,e,n,i,s){n===void 0&&(n="_first"),i===void 0&&(i="_last");var o=t[i],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},ac=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},zi=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},gr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},pE=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Fl=function(t,e,n,i){return t._startAt&&(Ie?t._startAt.revert(Sa):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},mE=function r(t){return!t||t._ts&&r(t.parent)},zf=function(t){return t._repeat?xs(t._tTime,t=t.duration()+t._rDelay)*t:0},xs=function(t,e){var n=Math.floor(t=pe(t/e));return t&&n===t?n-1:n},ka=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},cc=function(t){return t._end=pe(t._start+(t._tDur/Math.abs(t._ts||t._rts||oe)||0))},lc=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=pe(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),cc(t),n._dirty||gr(n,t)),t},bm=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=ka(t.rawTime(),e),(!e._dur||To(0,e.totalDuration(),n)-e._tTime>oe)&&e.render(n,!0)),gr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-oe}},kn=function(t,e,n,i){return e.parent&&zi(e),e._start=pe((fi(n)?n:n||t!==me?Sn(t,n,e):t._time)+e._delay),e._end=pe(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Tm(t,e,"_first","_last",t._sort?"_start":0),Bl(e)||(t._recent=e),i||bm(t,e),t._ts<0&&lc(t,t._tTime),t},wm=function(t,e){return(vn.ScrollTrigger||ah("scrollTrigger",e))&&vn.ScrollTrigger.create(e,t)},Am=function(t,e,n,i,s){if(dh(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!Ie&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&xm!==un.frame)return Li.push(t),t._lazy=[s,i],1},_E=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},Bl=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},gE=function(t,e,n,i){var s=t.ratio,o=e<0||!e&&(!t._start&&_E(t)&&!(!t._initted&&Bl(t))||(t._ts<0||t._dp._ts<0)&&!Bl(t))?0:1,a=t._rDelay,c=0,l,u,h;if(a&&t._repeat&&(c=To(0,t._tDur,e),u=xs(c,a),t._yoyo&&u&1&&(o=1-o),u!==xs(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||Ie||i||t._zTime===oe||!e&&t._zTime){if(!t._initted&&Am(t,e,i,n,c))return;for(h=t._zTime,t._zTime=e||(n?oe:0),n||(n=e&&!h),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=c,l=t._pt;l;)l.r(o,l.d),l=l._next;e<0&&Fl(t,e,n,!0),t._onUpdate&&!n&&fn(t,"onUpdate"),c&&t._repeat&&!n&&t.parent&&fn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&zi(t,1),!n&&!Ie&&(fn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},vE=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},ys=function(t,e,n,i){var s=t._repeat,o=pe(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:pe(o*(s+1)+t._rDelay*s):o,a>0&&!i&&lc(t,t._tTime=t._tDur*a),t.parent&&cc(t),n||gr(t.parent,t),t},kf=function(t){return t instanceof Ke?gr(t):ys(t,t._dur)},xE={_start:0,endTime:uo,totalDuration:uo},Sn=function r(t,e,n){var i=t.labels,s=t._recent||xE,o=t.duration()>=Mn?s.endTime(!1):t._dur,a,c,l;return Re(e)&&(isNaN(e)||e in i)?(c=e.charAt(0),l=e.substr(-1)==="%",a=e.indexOf("="),c==="<"||c===">"?(a>=0&&(e=e.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(l?(a<0?s:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(c=parseFloat(e.charAt(a-1)+e.substr(a+1)),l&&n&&(c=c/100*(Be(n)?n[0]:n).totalDuration()),a>1?r(t,e.substr(0,a-1),n)+c:o+c)):e==null?o:+e},io=function(t,e,n){var i=fi(e[1]),s=(i?2:1)+(t<2?0:1),o=e[s],a,c;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,c=n;c&&!("immediateRender"in a);)a=c.vars.defaults||{},c=je(c.vars.inherit)&&c.parent;o.immediateRender=je(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new Me(e[0],o,e[s+1])},qi=function(t,e){return t||t===0?e(t):e},To=function(t,e,n){return n<t?t:n>e?e:n},Ue=function(t,e){return!Re(t)||!(e=cE.exec(t))?"":e[1]},yE=function(t,e,n){return qi(n,function(i){return To(t,e,i)})},zl=[].slice,Cm=function(t,e){return t&&$n(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&$n(t[0]))&&!t.nodeType&&t!==Bn},EE=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return Re(i)&&!e||Cm(i,1)?(s=n).push.apply(s,Tn(i)):n.push(i)})||n},Tn=function(t,e,n){return de&&!e&&de.selector?de.selector(t):Re(t)&&!n&&(Ol||!Es())?zl.call((e||oh).querySelectorAll(t),0):Be(t)?EE(t,n):Cm(t)?zl.call(t,0):t?[t]:[]},kl=function(t){return t=Tn(t)[0]||lo("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Tn(e,n.querySelectorAll?n:n===t?lo("Invalid scope")||oh.createElement("div"):t)}},Rm=function(t){return t.sort(function(){return .5-Math.random()})},Pm=function(t){if(ve(t))return t;var e=$n(t)?t:{each:t},n=vr(e.ease),i=e.from||0,s=parseFloat(e.base)||0,o={},a=i>0&&i<1,c=isNaN(i)||a,l=e.axis,u=i,h=i;return Re(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!a&&c&&(u=i[0],h=i[1]),function(f,d,g){var _=(g||e).length,p=o[_],m,y,v,E,w,T,S,C,L;if(!p){if(L=e.grid==="auto"?0:(e.grid||[1,Mn])[1],!L){for(S=-Mn;S<(S=g[L++].getBoundingClientRect().left)&&L<_;);L<_&&L--}for(p=o[_]=[],m=c?Math.min(L,_)*u-.5:i%L,y=L===Mn?0:c?_*h/L-.5:i/L|0,S=0,C=Mn,T=0;T<_;T++)v=T%L-m,E=y-(T/L|0),p[T]=w=l?Math.abs(l==="y"?E:v):fm(v*v+E*E),w>S&&(S=w),w<C&&(C=w);i==="random"&&Rm(p),p.max=S-C,p.min=C,p.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(L>_?_-1:l?l==="y"?_/L:L:Math.max(L,_/L))||0)*(i==="edges"?-1:1),p.b=_<0?s-_:s,p.u=Ue(e.amount||e.each)||0,n=n&&_<0?NE(n):n}return _=(p[f]-p.min)/p.max||0,pe(p.b+(n?n(_):_)*p.v)+p.u}},Vl=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=pe(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(fi(n)?0:Ue(n))}},Lm=function(t,e){var n=Be(t),i,s;return!n&&$n(t)&&(i=n=t.radius||Mn,t.values?(t=Tn(t.values),(s=!fi(t[0]))&&(i*=i)):t=Vl(t.increment)),qi(e,n?ve(t)?function(o){return s=t(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),c=parseFloat(s?o.y:0),l=Mn,u=0,h=t.length,f,d;h--;)s?(f=t[h].x-a,d=t[h].y-c,f=f*f+d*d):f=Math.abs(t[h]-a),f<l&&(l=f,u=h);return u=!i||l<=i?t[u]:o,s||u===o||fi(o)?u:u+Ue(o)}:Vl(t))},Dm=function(t,e,n,i){return qi(Be(t)?!e:n===!0?!!(n=0):!i,function(){return Be(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},SE=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,o){return o(s)},i)}},ME=function(t,e){return function(n){return t(parseFloat(n))+(e||Ue(n))}},TE=function(t,e,n){return Nm(t,e,0,1,n)},Im=function(t,e,n){return qi(n,function(i){return t[~~e(i)]})},bE=function r(t,e,n){var i=e-t;return Be(t)?Im(t,r(0,t.length),e):qi(n,function(s){return(i+(s-t)%i)%i+t})},wE=function r(t,e,n){var i=e-t,s=i*2;return Be(t)?Im(t,r(0,t.length-1),e):qi(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>i?s-o:o)})},ho=function(t){return t.replace(sE,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(oE);return Dm(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},Nm=function(t,e,n,i,s){var o=e-t,a=i-n;return qi(s,function(c){return n+((c-t)/o*a||0)})},AE=function r(t,e,n,i){var s=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!s){var o=Re(t),a={},c,l,u,h,f;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(Be(t)&&!Be(e)){for(u=[],h=t.length,f=h-2,l=1;l<h;l++)u.push(r(t[l-1],t[l]));h--,s=function(g){g*=h;var _=Math.min(f,~~g);return u[_](g-_)},n=e}else i||(t=vs(Be(t)?[]:{},t));if(!u){for(c in e)fh.call(a,t,c,"get",e[c]);s=function(g){return _h(g,a)||(o?t.p:t)}}}return qi(n,s)},Vf=function(t,e,n){var i=t.labels,s=Mn,o,a,c;for(o in i)a=i[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(c=o,s=a);return c},fn=function(t,e,n){var i=t.vars,s=i[e],o=de,a=t._ctx,c,l,u;if(s)return c=i[e+"Params"],l=i.callbackScope||t,n&&Li.length&&Ba(),a&&(de=a),u=c?s.apply(l,c):s.call(l),de=o,u},js=function(t){return zi(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Ie),t.progress()<1&&fn(t,"onInterrupt"),t},es,Om=[],Um=function(t){if(t)if(t=!t.name&&t.default||t,sh()||t.headless){var e=t.name,n=ve(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:uo,render:_h,add:fh,kill:WE,modifier:GE,rawVars:0},o={targetTest:0,get:0,getSetter:mh,aliases:{},register:0};if(Es(),t!==i){if(an[e])return;xn(i,xn(za(t,s),o)),vs(i.prototype,vs(s,za(t,o))),an[i.prop=e]=i,t.targetTest&&(Ma.push(i),ch[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}vm(e,i),t.register&&t.register(en,i,Ze)}else Om.push(t)},se=255,Js={aqua:[0,se,se],lime:[0,se,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,se],navy:[0,0,128],white:[se,se,se],olive:[128,128,0],yellow:[se,se,0],orange:[se,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[se,0,0],pink:[se,192,203],cyan:[0,se,se],transparent:[se,se,se,0]},Fc=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*se+.5|0},Fm=function(t,e,n){var i=t?fi(t)?[t>>16,t>>8&se,t&se]:0:Js.black,s,o,a,c,l,u,h,f,d,g;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Js[t])i=Js[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&se,i&se,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&se,t&se]}else if(t.substr(0,3)==="hsl"){if(i=g=t.match(Uf),!e)c=+i[0]%360/360,l=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(l+1):u+l-u*l,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Fc(c+1/3,s,o),i[1]=Fc(c,s,o),i[2]=Fc(c-1/3,s,o);else if(~t.indexOf("="))return i=t.match(pm),n&&i.length<4&&(i[3]=1),i}else i=t.match(Uf)||Js.transparent;i=i.map(Number)}return e&&!g&&(s=i[0]/se,o=i[1]/se,a=i[2]/se,h=Math.max(s,o,a),f=Math.min(s,o,a),u=(h+f)/2,h===f?c=l=0:(d=h-f,l=u>.5?d/(2-h-f):d/(h+f),c=h===s?(o-a)/d+(o<a?6:0):h===o?(a-s)/d+2:(s-o)/d+4,c*=60),i[0]=~~(c+.5),i[1]=~~(l*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},Bm=function(t){var e=[],n=[],i=-1;return t.split(Di).forEach(function(s){var o=s.match(ts)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},Hf=function(t,e,n){var i="",s=(t+i).match(Di),o=e?"hsla(":"rgba(",a=0,c,l,u,h;if(!s)return t;if(s=s.map(function(f){return(f=Fm(f,e,1))&&o+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Bm(t),c=n.c,c.join(i)!==u.c.join(i)))for(l=t.replace(Di,"1").split(ts),h=l.length-1;a<h;a++)i+=l[a]+(~c.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!l)for(l=t.split(Di),h=l.length-1;a<h;a++)i+=l[a]+s[a];return i+l[h]},Di=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Js)r+="|"+t+"\\b";return new RegExp(r+")","gi")}(),CE=/hsl[a]?\(/,zm=function(t){var e=t.join(" "),n;if(Di.lastIndex=0,Di.test(e))return n=CE.test(e),t[1]=Hf(t[1],n),t[0]=Hf(t[0],n,Bm(t[1])),!0},fo,un=function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,o=s,a=[],c,l,u,h,f,d,g=function _(p){var m=r()-i,y=p===!0,v,E,w,T;if((m>t||m<0)&&(n+=m-e),i+=m,w=i-n,v=w-o,(v>0||y)&&(T=++h.frame,f=w-h.time*1e3,h.time=w=w/1e3,o+=v+(v>=s?4:s-v),E=1),y||(c=l(_)),E)for(d=0;d<a.length;d++)a[d](w,f,T,p)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(p){return f/(1e3/(p||60))},wake:function(){_m&&(!Ol&&sh()&&(Bn=Ol=window,oh=Bn.document||{},vn.gsap=en,(Bn.gsapVersions||(Bn.gsapVersions=[])).push(en.version),gm(Fa||Bn.GreenSockGlobals||!Bn.gsap&&Bn||{}),Om.forEach(Um)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&h.sleep(),l=u||function(p){return setTimeout(p,o-h.time*1e3+1|0)},fo=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),fo=0,l=uo},lagSmoothing:function(p,m){t=p||1/0,e=Math.min(m||33,t)},fps:function(p){s=1e3/(p||240),o=h.time*1e3+s},add:function(p,m,y){var v=m?function(E,w,T,S){p(E,w,T,S),h.remove(v)}:p;return h.remove(p),a[y?"unshift":"push"](v),Es(),v},remove:function(p,m){~(m=a.indexOf(p))&&a.splice(m,1)&&d>=m&&d--},_listeners:a},h}(),Es=function(){return!fo&&un.wake()},Gt={},RE=/^[\d.\-M][\d.\-,\s]/,PE=/["']/g,LE=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,o=n.length,a,c,l;s<o;s++)c=n[s],a=s!==o-1?c.lastIndexOf(","):c.length,l=c.substr(0,a),e[i]=isNaN(l)?l.replace(PE,"").trim():+l,i=c.substr(a+1).trim();return e},DE=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},IE=function(t){var e=(t+"").split("("),n=Gt[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[LE(e[1])]:DE(t).split(",").map(Sm)):Gt._CE&&RE.test(t)?Gt._CE("",t):n},NE=function(t){return function(e){return 1-t(1-e)}},vr=function(t,e){return t&&(ve(t)?t:Gt[t]||IE(t))||e},Ar=function(t,e,n,i){n===void 0&&(n=function(c){return 1-e(1-c)}),i===void 0&&(i=function(c){return c<.5?e(c*2)/2:1-e((1-c)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},o;return Je(t,function(a){Gt[a]=vn[a]=s,Gt[o=a.toLowerCase()]=n;for(var c in s)Gt[o+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=Gt[a+"."+c]=s[c]}),s},km=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Bc=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/Nl*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*rE((u-o)*s)+1},c=t==="out"?a:t==="in"?function(l){return 1-a(1-l)}:km(a);return s=Nl/s,c.config=function(l,u){return r(t,l,u)},c},zc=function r(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:km(n);return i.config=function(s){return r(t,s)},i};Je("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;Ar(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});Gt.Linear.easeNone=Gt.none=Gt.Linear.easeIn;Ar("Elastic",Bc("in"),Bc("out"),Bc());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(a){return a<e?r*a*a:a<n?r*Math.pow(a-1.5/t,2)+.75:a<i?r*(a-=2.25/t)*a+.9375:r*Math.pow(a-2.625/t,2)+.984375};Ar("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Ar("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Ar("Circ",function(r){return-(fm(1-r*r)-1)});Ar("Sine",function(r){return r===1?1:-iE(r*eE)+1});Ar("Back",zc("in"),zc("out"),zc());Gt.SteppedEase=Gt.steps=vn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,o=1-oe;return function(a){return((i*To(0,o,a)|0)+s)*n}}};co.ease=Gt["quad.out"];Je("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return lh+=r+","+r+"Params,"});var Vm=function(t,e){this.id=nE++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:ym,this.set=e?e.getSetter:mh},po=function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,ys(this,+e.duration,1,1),this.data=e.data,de&&(this._ctx=de,de.data.push(this)),fo||un.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,ys(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Es(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(lc(this,n),!s._dp||s.parent||bm(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&kn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===oe||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Em(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+zf(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+zf(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?xs(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-oe?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?ka(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-oe?0:this._rts,this.totalTime(To(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),cc(this),pE(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Es(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==oe&&(this._tTime-=oe)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=pe(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&kn(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(je(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?ka(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=uE);var i=Ie;return Ie=n,hh(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Ie=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,kf(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,kf(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Sn(this,n),je(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,je(i)),this._dur||(this._zTime=-oe),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-oe:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-oe,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-oe)},t.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this,s=i._prom;return new Promise(function(o){var a=ve(n)?n:Mm,c=function(){var u=i.then;i.then=null,s&&s(),ve(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=u),o(a),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?c():i._prom=c})},t.kill=function(){js(this)},r}();xn(po.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-oe,_prom:0,_ps:!1,_rts:1});var Ke=function(r){hm(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=je(n.sortChildren),me&&kn(n.parent||me,ri(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&wm(ri(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,o){return io(0,arguments,this),this},e.from=function(i,s,o){return io(1,arguments,this),this},e.fromTo=function(i,s,o,a){return io(2,arguments,this),this},e.set=function(i,s,o){return s.duration=0,s.parent=this,no(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Me(i,s,Sn(this,o),1),this},e.call=function(i,s,o){return kn(this,Me.delayedCall(0,i,s),o)},e.staggerTo=function(i,s,o,a,c,l,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=l,o.onCompleteParams=u,o.parent=this,new Me(i,o,Sn(this,c)),this},e.staggerFrom=function(i,s,o,a,c,l,u){return o.runBackwards=1,no(o).immediateRender=je(o.immediateRender),this.staggerTo(i,s,o,a,c,l,u)},e.staggerFromTo=function(i,s,o,a,c,l,u,h){return a.startAt=o,no(a).immediateRender=je(a.immediateRender),this.staggerTo(i,s,a,c,l,u,h)},e.render=function(i,s,o){var a=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,u=i<=0?0:pe(i),h=this._zTime<0!=i<0&&(this._initted||!l),f,d,g,_,p,m,y,v,E,w,T,S;if(this!==me&&u>c&&i>=0&&(u=c),u!==this._tTime||o||h){if(a!==this._time&&l&&(u+=this._time-a,i+=this._time-a),f=u,E=this._start,v=this._ts,m=!v,h&&(l||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,p=l+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,o);if(f=pe(u%p),u===c?(_=this._repeat,f=l):(w=pe(u/p),_=~~w,_&&_===w&&(f=l,_--),f>l&&(f=l)),w=xs(this._tTime,p),!a&&this._tTime&&w!==_&&this._tTime-w*p-this._dur<=0&&(w=_),T&&_&1&&(f=l-f,S=1),_!==w&&!this._lock){var C=T&&w&1,L=C===(T&&_&1);if(_<w&&(C=!C),a=C?0:u%l?l:u,this._lock=1,this.render(a||(S?0:pe(_*p)),s,!l)._lock=0,this._tTime=u,!s&&this.parent&&fn(this,"onRepeat"),this.vars.repeatRefresh&&!S&&(this.invalidate()._lock=1,w=_),a&&a!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,L&&(this._lock=2,a=C?l:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!S&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=vE(this,pe(a),pe(f)),y&&(u-=f-(f=y._start))),this._tTime=u,this._time=f,this._act=!!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&u&&l&&!s&&!w&&(fn(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||f>=d._start)&&d._ts&&y!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,o),f!==this._time||!this._ts&&!m){y=0,g&&(u+=this._zTime=-oe);break}}d=g}else{d=this._last;for(var x=i<0?i:f;d;){if(g=d._prev,(d._act||x<=d._end)&&d._ts&&y!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(x-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(x-d._start)*d._ts,s,o||Ie&&hh(d)),f!==this._time||!this._ts&&!m){y=0,g&&(u+=this._zTime=x?-oe:oe);break}}d=g}}if(y&&!s&&(this.pause(),y.render(f>=a?0:-oe)._zTime=f>=a?1:-1,this._ts))return this._start=E,cc(this),this.render(i,s,o);this._onUpdate&&!s&&fn(this,"onUpdate",!0),(u===c&&this._tTime>=this.totalDuration()||!u&&a)&&(E===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((i||!l)&&(u===c&&this._ts>0||!u&&this._ts<0)&&zi(this,1),!s&&!(i<0&&!a)&&(u||a||!c)&&(fn(this,u===c&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var o=this;if(fi(s)||(s=Sn(this,s,i)),!(i instanceof po)){if(Be(i))return i.forEach(function(a){return o.add(a,s)}),this;if(Re(i))return this.addLabel(i,s);if(ve(i))i=Me.delayedCall(0,i);else return this}return this!==i?kn(this,i,s):this},e.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Mn);for(var c=[],l=this._first;l;)l._start>=a&&(l instanceof Me?s&&c.push(l):(o&&c.push(l),i&&c.push.apply(c,l.getChildren(!0,s,o)))),l=l._next;return c},e.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},e.remove=function(i){return Re(i)?this.removeLabel(i):ve(i)?this.killTweensOf(i):(i.parent===this&&ac(this,i),i===this._recent&&(this._recent=this._last),gr(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=pe(un.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=Sn(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,o){var a=Me.delayedCall(0,s||uo,o);return a.data="isPause",this._hasPause=1,kn(this,a,Sn(this,i))},e.removePause=function(i){var s=this._first;for(i=Sn(this,i);s;)s._start===i&&s.data==="isPause"&&zi(s),s=s._next},e.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),c=a.length;c--;)Ai!==a[c]&&a[c].kill(i,s);return this},e.getTweensOf=function(i,s){for(var o=[],a=Tn(i),c=this._first,l=fi(s),u;c;)c instanceof Me?hE(c._targets,a)&&(l?(!Ai||c._initted&&c._ts)&&c.globalTime(0)<=s&&c.globalTime(c.totalDuration())>s:!s||c.isActive())&&o.push(c):(u=c.getTweensOf(a,s)).length&&o.push.apply(o,u),c=c._next;return o},e.tweenTo=function(i,s){s=s||{};var o=this,a=Sn(o,i),c=s,l=c.startAt,u=c.onStart,h=c.onStartParams,f=c.immediateRender,d,g=Me.to(o,xn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(l&&"time"in l?l.time:o._time))/o.timeScale())||oe,onStart:function(){if(o.pause(),!d){var p=s.duration||Math.abs((a-(l&&"time"in l?l.time:o._time))/o.timeScale());g._dur!==p&&ys(g,p,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,h||[])}},s));return f?g.render(0):g},e.tweenFromTo=function(i,s,o){return this.tweenTo(s,xn({startAt:{time:Sn(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),Vf(this,Sn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),Vf(this,Sn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+oe)},e.shiftChildren=function(i,s,o){o===void 0&&(o=0);var a=this._first,c=this.labels,l;for(i=pe(i);a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(l in c)c[l]>=o&&(c[l]+=i);return gr(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),gr(this)},e.totalDuration=function(i){var s=0,o=this,a=o._last,c=Mn,l,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(h=o.parent;a;)l=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>c&&o._sort&&a._ts&&!o._lock?(o._lock=1,kn(o,a,u-a._delay,1)._lock=0):c=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=pe(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),c=0),a._end>s&&a._ts&&(s=a._end),a=l;ys(o,o===me&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(me._ts&&(Em(me,ka(i,me)),xm=un.frame),un.frame>=Ff){Ff+=pn.autoSleep||120;var s=me._first;if((!s||!s._ts)&&pn.autoSleep&&un._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||un.sleep()}}},t}(po);xn(Ke.prototype,{_lock:0,_hasPause:0,_forcing:0});var OE=function(t,e,n,i,s,o,a){var c=new Ze(this._pt,t,e,0,1,qm,null,s),l=0,u=0,h,f,d,g,_,p,m,y;for(c.b=n,c.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=ho(i)),o&&(y=[n,i],o(y,t,e),n=y[0],i=y[1]),f=n.match(Oc)||[];h=Oc.exec(i);)g=h[0],_=i.substring(l,h.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==f[u++]&&(p=parseFloat(f[u-1])||0,c._pt={_next:c._pt,p:_||u===1?_:",",s:p,c:g.charAt(1)==="="?rs(p,g)-p:parseFloat(g)-p,m:d&&d<4?Math.round:0},l=Oc.lastIndex);return c.c=l<i.length?i.substring(l,i.length):"",c.fp=a,(mm.test(i)||m)&&(c.e=0),this._pt=c,c},fh=function(t,e,n,i,s,o,a,c,l,u){ve(i)&&(i=i(s||0,t,o));var h=t[e],f=n!=="get"?n:ve(h)?l?t[e.indexOf("set")||!ve(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():h,d=ve(h)?l?kE:Xm:ph,g;if(Re(i)&&(~i.indexOf("random(")&&(i=ho(i)),i.charAt(1)==="="&&(g=rs(f,i)+(Ue(f)||0),(g||g===0)&&(i=g))),!u||f!==i||Hl)return!isNaN(f*i)&&i!==""?(g=new Ze(this._pt,t,e,+f||0,i-(f||0),typeof h=="boolean"?HE:$m,0,d),l&&(g.fp=l),a&&g.modifier(a,this,t),this._pt=g):(!h&&!(e in t)&&ah(e,i),OE.call(this,t,e,f,i,d,c||pn.stringFilter,l))},UE=function(t,e,n,i,s){if(ve(t)&&(t=ro(t,s,e,n,i)),!$n(t)||t.style&&t.nodeType||Be(t)||dm(t))return Re(t)?ro(t,s,e,n,i):t;var o={},a;for(a in t)o[a]=ro(t[a],s,e,n,i);return o},Hm=function(t,e,n,i,s,o){var a,c,l,u;if(an[t]&&(a=new an[t]).init(s,a.rawVars?e[t]:UE(e[t],i,s,o,n),n,i,o)!==!1&&(n._pt=c=new Ze(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==es))for(l=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)l[a._props[u]]=c;return a},Ai,Hl,dh=function r(t,e,n){var i=t.vars,s=i.ease,o=i.startAt,a=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,g=t._dur,_=t._startAt,p=t._targets,m=t.parent,y=m&&m.data==="nested"?m.vars.targets:p,v=t._overwrite==="auto"&&!ih,E=t.timeline,w=i.easeReverse||h,T,S,C,L,x,M,D,I,k,F,O,G,H;if(E&&(!f||!s)&&(s="none"),t._ease=vr(s,co.ease),t._rEase=w&&(vr(w)||t._ease),t._from=!E&&!!i.runBackwards,t._from&&(t.ratio=1),!E||f&&!i.stagger){if(I=p[0]?_r(p[0]).harness:0,G=I&&i[I.prop],T=za(i,ch),_&&(_._zTime<0&&_.progress(1),e<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&g?Sa:lE),_._lazy=0),o){if(zi(t._startAt=Me.set(p,xn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!_&&je(c),startAt:null,delay:0,onUpdate:l&&function(){return fn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ie||!a&&!d)&&t._startAt.revert(Sa),a&&g&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(u&&g&&!_){if(e&&(a=!1),C=xn({overwrite:!1,data:"isFromStart",lazy:a&&!_&&je(c),immediateRender:a,stagger:0,parent:m},T),G&&(C[I.prop]=G),zi(t._startAt=Me.set(p,C)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ie?t._startAt.revert(Sa):t._startAt.render(-1,!0)),t._zTime=e,!a)r(t._startAt,oe,oe);else if(!e)return}for(t._pt=t._ptCache=0,c=g&&je(c)||c&&!g,S=0;S<p.length;S++){if(x=p[S],D=x._gsap||uh(p)[S]._gsap,t._ptLookup[S]=F={},Ul[D.id]&&Li.length&&Ba(),O=y===p?S:y.indexOf(x),I&&(k=new I).init(x,G||T,t,O,y)!==!1&&(t._pt=L=new Ze(t._pt,x,k.name,0,1,k.render,k,0,k.priority),k._props.forEach(function(et){F[et]=L}),k.priority&&(M=1)),!I||G)for(C in T)an[C]&&(k=Hm(C,T,t,O,x,y))?k.priority&&(M=1):F[C]=L=fh.call(t,x,C,"get",T[C],O,y,0,i.stringFilter);t._op&&t._op[S]&&t.kill(x,t._op[S]),v&&t._pt&&(Ai=t,me.killTweensOf(x,F,t.globalTime(e)),H=!t.parent,Ai=0),t._pt&&c&&(Ul[D.id]=1)}M&&Ym(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!H,f&&e<=0&&E.render(Mn,!0,!0)},FE=function(t,e,n,i,s,o,a,c){var l=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,h,f,d;if(!l)for(l=t._ptCache[e]=[],f=t._ptLookup,d=t._targets.length;d--;){if(u=f[d][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return Hl=1,t.vars[e]="+=0",dh(t,a),Hl=0,c?lo(e+" not eligible for reset. Try splitting into individual properties"):1;l.push(u)}for(d=l.length;d--;)h=l[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,h.e&&(h.e=ye(n)+Ue(h.e)),h.b&&(h.b=u.s+Ue(h.b))},BE=function(t,e){var n=t[0]?_r(t[0]).harness:0,i=n&&n.aliases,s,o,a,c;if(!i)return e;s=vs({},e);for(o in i)if(o in s)for(c=i[o].split(","),a=c.length;a--;)s[c[a]]=s[o];return s},zE=function(t,e,n,i){var s=e.ease||i||"power1.inOut",o,a;if(Be(e))a=n[t]||(n[t]=[]),e.forEach(function(c,l){return a.push({t:l/(e.length-1)*100,v:c,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},ro=function(t,e,n,i,s){return ve(t)?t.call(e,n,i,s):Re(t)&&~t.indexOf("random(")?ho(t):t},Gm=lh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Wm={};Je(Gm+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Wm[r]=1});var Me=function(r){hm(t,r);function t(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:no(i))||this;var c=a.vars,l=c.duration,u=c.delay,h=c.immediateRender,f=c.stagger,d=c.overwrite,g=c.keyframes,_=c.defaults,p=c.scrollTrigger,m=i.parent||me,y=(Be(n)||dm(n)?fi(n[0]):"length"in i)?[n]:Tn(n),v,E,w,T,S,C,L,x;if(a._targets=y.length?uh(y):lo("GSAP target "+n+" not found. https://gsap.com",!pn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||f||ko(l)||ko(u)){i=a.vars;var M=i.easeReverse||i.yoyoEase;if(v=a.timeline=new Ke({data:"nested",defaults:_||{},targets:m&&m.data==="nested"?m.vars.targets:y}),v.kill(),v.parent=v._dp=ri(a),v._start=0,f||ko(l)||ko(u)){if(T=y.length,L=f&&Pm(f),$n(f))for(S in f)~Gm.indexOf(S)&&(x||(x={}),x[S]=f[S]);for(E=0;E<T;E++)w=za(i,Wm),w.stagger=0,M&&(w.easeReverse=M),x&&vs(w,x),C=y[E],w.duration=+ro(l,ri(a),E,C,y),w.delay=(+ro(u,ri(a),E,C,y)||0)-a._delay,!f&&T===1&&w.delay&&(a._delay=u=w.delay,a._start+=u,w.delay=0),v.to(C,w,L?L(E,C,y):0),v._ease=Gt.none;v.duration()?l=u=0:a.timeline=0}else if(g){no(xn(v.vars.defaults,{ease:"none"})),v._ease=vr(g.ease||i.ease||"none");var D=0,I,k,F;if(Be(g))g.forEach(function(O){return v.to(y,O,">")}),v.duration();else{w={};for(S in g)S==="ease"||S==="easeEach"||zE(S,g[S],w,g.easeEach);for(S in w)for(I=w[S].sort(function(O,G){return O.t-G.t}),D=0,E=0;E<I.length;E++)k=I[E],F={ease:k.e,duration:(k.t-(E?I[E-1].t:0))/100*l},F[S]=k.v,v.to(y,F,D),D+=F.duration;v.duration()<l&&v.to({},{duration:l-v.duration()})}}l||a.duration(l=v.duration())}else a.timeline=0;return d===!0&&!ih&&(Ai=ri(a),me.killTweensOf(y),Ai=0),kn(m,ri(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(h||!l&&!g&&a._start===pe(m._time)&&je(h)&&mE(ri(a))&&m.data!=="nested")&&(a._tTime=-oe,a.render(Math.max(0,-u)||0)),p&&wm(ri(a),p),a}var e=t.prototype;return e.render=function(i,s,o){var a=this._time,c=this._tDur,l=this._dur,u=i<0,h=i>c-oe&&!u?c:i<oe?0:i,f,d,g,_,p,m,y,v;if(!l)gE(this,i,s,o);else if(h!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,v=this.timeline,this._repeat){if(_=l+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+i,s,o);if(f=pe(h%_),h===c?(g=this._repeat,f=l):(p=pe(h/_),g=~~p,g&&g===p?(f=l,g--):f>l&&(f=l)),m=this._yoyo&&g&1,m&&(f=l-f),p=xs(this._tTime,_),f===a&&!o&&this._initted&&g===p)return this._tTime=h,this;g!==p&&this.vars.repeatRefresh&&!m&&!this._lock&&f!==_&&this._initted&&(this._lock=o=1,this.render(pe(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(Am(this,u?i:f,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==p))return this;if(l!==this._dur)return this.render(i,s,o)}if(this._rEase){var E=f<a;if(E!==this._inv){var w=E?a:l-a;this._inv=E,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=w?(E?-1:1)/w:0,this._invScale=E?-this.ratio:1-this.ratio,this._invEase=E?this._rEase:this._ease}this.ratio=y=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=y=this._ease(f/l);if(this._from&&(this.ratio=y=1-y),this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&h&&!s&&!p&&(fn(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(y,d.d),d=d._next;v&&v.render(i<0?i:v._dur*v._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Fl(this,i,s,o),fn(this,"onUpdate")),this._repeat&&g!==p&&this.vars.onRepeat&&!s&&this.parent&&fn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&Fl(this,i,!0,!0),(i||!l)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&zi(this,1),!s&&!(u&&!a)&&(h||a||m)&&(fn(this,h===c?"onComplete":"onReverseComplete",!0),this._prom&&!(h<c&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,o,a,c){fo||un.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||dh(this,l),u=this._ease(l/this._dur),FE(this,i,s,o,a,u,l,c)?this.resetTo(i,s,o,a,1):(lc(this,0),this.parent||Tm(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?js(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Ie),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Ai&&Ai.vars.overwrite!==!0)._first||js(this),this.parent&&o!==this.timeline.totalDuration()&&ys(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,c=i?Tn(i):a,l=this._ptLookup,u=this._pt,h,f,d,g,_,p,m;if((!s||s==="all")&&dE(a,c))return s==="all"&&(this._pt=0),js(this);for(h=this._op=this._op||[],s!=="all"&&(Re(s)&&(_={},Je(s,function(y){return _[y]=1}),s=_),s=BE(a,s)),m=a.length;m--;)if(~c.indexOf(a[m])){f=l[m],s==="all"?(h[m]=s,g=f,d={}):(d=h[m]=h[m]||{},g=s);for(_ in g)p=f&&f[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&ac(this,p,"_pt"),delete f[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&js(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return io(1,arguments)},t.delayedCall=function(i,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,s,o){return io(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,o){return me.killTweensOf(i,s,o)},t}(po);xn(Me.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Je("staggerTo,staggerFrom,staggerFromTo",function(r){Me[r]=function(){var t=new Ke,e=zl.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var ph=function(t,e,n){return t[e]=n},Xm=function(t,e,n){return t[e](n)},kE=function(t,e,n,i){return t[e](i.fp,n)},VE=function(t,e,n){return t.setAttribute(e,n)},mh=function(t,e){return ve(t[e])?Xm:rh(t[e])&&t.setAttribute?VE:ph},$m=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},HE=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},qm=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},_h=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},GE=function(t,e,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(t,e,n),s=o},WE=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?ac(this,e,"_pt"):e.dep||(n=1),e=i;return!n},XE=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},Ym=function(t){for(var e=t._pt,n,i,s,o;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=s},Ze=function(){function r(e,n,i,s,o,a,c,l,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||$m,this.d=c||this,this.set=l||ph,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=XE,this.m=n,this.mt=s,this.tween=i},r}();Je(lh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return ch[r]=1});vn.TweenMax=vn.TweenLite=Me;vn.TimelineLite=vn.TimelineMax=Ke;me=new Ke({sortChildren:!1,defaults:co,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});pn.stringFilter=zm;var xr=[],Ta={},$E=[],Gf=0,qE=0,kc=function(t){return(Ta[t]||$E).map(function(e){return e()})},Gl=function(){var t=Date.now(),e=[];t-Gf>2&&(kc("matchMediaInit"),xr.forEach(function(n){var i=n.queries,s=n.conditions,o,a,c,l;for(a in i)o=Bn.matchMedia(i[a]).matches,o&&(c=1),o!==s[a]&&(s[a]=o,l=1);l&&(n.revert(),c&&e.push(n))}),kc("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Gf=t,kc("matchMedia"))},Km=function(){function r(e,n){this.selector=n&&kl(n),this.data=[],this._r=[],this.isReverted=!1,this.id=qE++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){ve(n)&&(s=i,i=n,n=ve);var o=this,a=function(){var l=de,u=o.selector,h;return l&&l!==o&&l.data.push(o),s&&(o.selector=kl(s)),de=o,h=i.apply(o,arguments),ve(h)&&o._r.push(h),de=l,o.selector=u,o.isReverted=!1,h};return o.last=a,n===ve?a(o,function(c){return o.add(null,c)}):n?o[n]=a:a},t.ignore=function(n){var i=de;de=null,n(this),de=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Me&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),c=s.data.length,l;c--;)l=s.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),c=s.data.length;c--;)l=s.data[c],l instanceof Ke?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof Me)&&l.revert&&l.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=xr.length;o--;)xr[o].id===this.id&&xr.splice(o,1)},t.revert=function(n){this.kill(n||{})},r}(),YE=function(){function r(e){this.contexts=[],this.scope=e,de&&de.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){$n(n)||(n={matches:n});var o=new Km(0,s||this.scope),a=o.conditions={},c,l,u;de&&!o.selector&&(o.selector=de.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(l in n)l==="all"?u=1:(c=Bn.matchMedia(n[l]),c&&(xr.indexOf(o)<0&&xr.push(o),(a[l]=c.matches)&&(u=1),c.addListener?c.addListener(Gl):c.addEventListener("change",Gl)));return u&&i(o,function(h){return o.add(null,h)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Va={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Um(i)})},timeline:function(t){return new Ke(t)},getTweensOf:function(t,e){return me.getTweensOf(t,e)},getProperty:function(t,e,n,i){Re(t)&&(t=Tn(t)[0]);var s=_r(t||{}).get,o=n?Mm:Sm;return n==="native"&&(n=""),t&&(e?o((an[e]&&an[e].get||s)(t,e,n,i)):function(a,c,l){return o((an[a]&&an[a].get||s)(t,a,c,l))})},quickSetter:function(t,e,n){if(t=Tn(t),t.length>1){var i=t.map(function(u){return en.quickSetter(u,e,n)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}t=t[0]||{};var o=an[e],a=_r(t),c=a.harness&&(a.harness.aliases||{})[e]||e,l=o?function(u){var h=new o;es._pt=0,h.init(t,n?u+n:u,es,0,[t]),h.render(1,h),es._pt&&_h(1,es)}:a.set(t,c);return o?l:function(u){return l(t,c,n?u+n:u,a,1)}},quickTo:function(t,e,n){var i,s=en.to(t,xn((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(c,l,u){return s.resetTo(e,c,l,u)};return o.tween=s,o},isTweening:function(t){return me.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=vr(t.ease,co.ease)),Bf(co,t||{})},config:function(t){return Bf(pn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!an[a]&&!vn[a]&&lo(e+" effect requires "+a+" plugin.")}),Uc[e]=function(a,c,l){return n(Tn(a),xn(c||{},s),l)},o&&(Ke.prototype[e]=function(a,c,l){return this.add(Uc[e](a,$n(c)?c:(l=c)&&{},this),l)})},registerEase:function(t,e){Gt[t]=vr(e)},parseEase:function(t,e){return arguments.length?vr(t,e):Gt},getById:function(t){return me.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Ke(t),i,s;for(n.smoothChildTiming=je(t.smoothChildTiming),me.remove(n),n._dp=0,n._time=n._tTime=me._time,i=me._first;i;)s=i._next,(e||!(!i._dur&&i instanceof Me&&i.vars.onComplete===i._targets[0]))&&kn(n,i,i._start-i._delay),i=s;return kn(me,n,0),n},context:function(t,e){return t?new Km(t,e):de},matchMedia:function(t){return new YE(t)},matchMediaRefresh:function(){return xr.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||Gl()},addEventListener:function(t,e){var n=Ta[t]||(Ta[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Ta[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:bE,wrapYoyo:wE,distribute:Pm,random:Dm,snap:Lm,normalize:TE,getUnit:Ue,clamp:yE,splitColor:Fm,toArray:Tn,selector:kl,mapRange:Nm,pipe:SE,unitize:ME,interpolate:AE,shuffle:Rm},install:gm,effects:Uc,ticker:un,updateRoot:Ke.updateRoot,plugins:an,globalTimeline:me,core:{PropTween:Ze,globals:vm,Tween:Me,Timeline:Ke,Animation:po,getCache:_r,_removeLinkedListItem:ac,reverting:function(){return Ie},context:function(t){return t&&de&&(de.data.push(t),t._ctx=de),de},suppressOverwrites:function(t){return ih=t}}};Je("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Va[r]=Me[r]});un.add(Ke.updateRoot);es=Va.to({},{duration:0});var KE=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},jE=function(t,e){var n=t._targets,i,s,o;for(i in e)for(s=n.length;s--;)o=t._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=KE(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[s],i))},Vc=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,o){o._onInit=function(a){var c,l;if(Re(s)&&(c={},Je(s,function(u){return c[u]=1}),s=c),e){c={};for(l in s)c[l]=e(s[l]);s=c}jE(a,s)}}}},en=Va.registerPlugin({name:"attr",init:function(t,e,n,i,s){var o,a,c;this.tween=n;for(o in e)c=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(c||0)+"",e[o],i,s,0,0,o),a.op=o,a.b=c,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)Ie?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Vc("roundProps",Vl),Vc("modifiers"),Vc("snap",Lm))||Va;Me.version=Ke.version=en.version="3.15.0";_m=1;sh()&&Es();Gt.Power0;Gt.Power1;Gt.Power2;Gt.Power3;Gt.Power4;Gt.Linear;Gt.Quad;Gt.Cubic;Gt.Quart;Gt.Quint;Gt.Strong;Gt.Elastic;Gt.Back;Gt.SteppedEase;Gt.Bounce;Gt.Sine;Gt.Expo;Gt.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Wf,Ci,ss,gh,fr,Xf,vh,JE=function(){return typeof window<"u"},di={},sr=180/Math.PI,os=Math.PI/180,Lr=Math.atan2,$f=1e8,xh=/([A-Z])/g,ZE=/(left|right|width|margin|padding|x)/i,QE=/[\s,\(]\S/,Hn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Wl=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},tS=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},eS=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},nS=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},iS=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},jm=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Jm=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},rS=function(t,e,n){return t.style[e]=n},sS=function(t,e,n){return t.style.setProperty(e,n)},oS=function(t,e,n){return t._gsap[e]=n},aS=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},cS=function(t,e,n,i,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},lS=function(t,e,n,i,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},_e="transform",Qe=_e+"Origin",uS=function r(t,e){var n=this,i=this.target,s=i.style,o=i._gsap;if(t in di&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Hn[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=si(i,a)}):this.tfm[t]=o.x?o[t]:si(i,t),t===Qe&&(this.tfm.zOrigin=o.zOrigin);else return Hn.transform.split(",").forEach(function(a){return r.call(n,a,e)});if(this.props.indexOf(_e)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Qe,e,"")),t=_e}(s||e)&&this.props.push(t,e,s[t])},Zm=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},hS=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(xh,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=vh(),(!s||!s.isStart)&&!n[_e]&&(Zm(n),i.zOrigin&&n[Qe]&&(n[Qe]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Qm=function(t,e){var n={target:t,props:[],revert:hS,save:uS};return t._gsap||en.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},t_,Xl=function(t,e){var n=Ci.createElementNS?Ci.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Ci.createElement(t);return n&&n.style?n:Ci.createElement(t)},dn=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(xh,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,Ss(e)||e,1)||""},qf="O,Moz,ms,Ms,Webkit".split(","),Ss=function(t,e,n){var i=e||fr,s=i.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(qf[o]+t in s););return o<0?null:(o===3?"ms":o>=0?qf[o]:"")+t},$l=function(){JE()&&window.document&&(Wf=window,Ci=Wf.document,ss=Ci.documentElement,fr=Xl("div")||{style:{}},Xl("div"),_e=Ss(_e),Qe=_e+"Origin",fr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",t_=!!Ss("perspective"),vh=en.core.reverting,gh=1)},Yf=function(t){var e=t.ownerSVGElement,n=Xl("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",n.appendChild(i),ss.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),ss.removeChild(n),s},Kf=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},e_=function(t){var e,n;try{e=t.getBBox()}catch{e=Yf(t),n=1}return e&&(e.width||e.height)||n||(e=Yf(t)),e&&!e.width&&!e.x&&!e.y?{x:+Kf(t,["x","cx","x1"])||0,y:+Kf(t,["y","cy","y1"])||0,width:0,height:0}:e},n_=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&e_(t))},ki=function(t,e){if(e){var n=t.style,i;e in di&&e!==Qe&&(e=_e),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(xh,"-$1").toLowerCase())):n.removeAttribute(e)}},Ri=function(t,e,n,i,s,o){var a=new Ze(t._pt,e,n,0,1,o?Jm:jm);return t._pt=a,a.b=i,a.e=s,t._props.push(n),a},jf={deg:1,rad:1,turn:1},fS={grid:1,flex:1},Vi=function r(t,e,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=fr.style,c=ZE.test(e),l=t.tagName.toLowerCase()==="svg",u=(l?"client":"offset")+(c?"Width":"Height"),h=100,f=i==="px",d=i==="%",g,_,p,m;if(i===o||!s||jf[i]||jf[o])return s;if(o!=="px"&&!f&&(s=r(t,e,n,"px")),m=t.getCTM&&n_(t),(d||o==="%")&&(di[e]||~e.indexOf("adius")))return g=m?t.getBBox()[c?"width":"height"]:t[u],ye(d?s/g*h:s/100*g);if(a[c?"width":"height"]=h+(f?o:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!l?t:t.parentNode,m&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Ci||!_.appendChild)&&(_=Ci.body),p=_._gsap,p&&d&&p.width&&c&&p.time===un.time&&!p.uncache)return ye(s/p.width*h);if(d&&(e==="height"||e==="width")){var y=t.style[e];t.style[e]=h+i,g=t[u],y?t.style[e]=y:ki(t,e)}else(d||o==="%")&&!fS[dn(_,"display")]&&(a.position=dn(t,"position")),_===t&&(a.position="static"),_.appendChild(fr),g=fr[u],_.removeChild(fr),a.position="absolute";return c&&d&&(p=_r(_),p.time=un.time,p.width=_[u]),ye(f?g*s/h:g&&s?h/g*s:0)},si=function(t,e,n,i){var s;return gh||$l(),e in Hn&&e!=="transform"&&(e=Hn[e],~e.indexOf(",")&&(e=e.split(",")[0])),di[e]&&e!=="transform"?(s=_o(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:Ga(dn(t,Qe))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Ha[e]&&Ha[e](t,e,n)||dn(t,e)||ym(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Vi(t,e,s,n)+n:s},dS=function(t,e,n,i){if(!n||n==="none"){var s=Ss(e,t,1),o=s&&dn(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=dn(t,"borderTopColor"))}var a=new Ze(this._pt,t.style,e,0,1,qm),c=0,l=0,u,h,f,d,g,_,p,m,y,v,E,w;if(a.b=n,a.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=dn(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=dn(t,e)||i,_?t.style[e]=_:ki(t,e)),u=[n,i],zm(u),n=u[0],i=u[1],f=n.match(ts)||[],w=i.match(ts)||[],w.length){for(;h=ts.exec(i);)p=h[0],y=i.substring(c,h.index),g?g=(g+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(g=1),p!==(_=f[l++]||"")&&(d=parseFloat(_)||0,E=_.substr((d+"").length),p.charAt(1)==="="&&(p=rs(d,p)+E),m=parseFloat(p),v=p.substr((m+"").length),c=ts.lastIndex-v.length,v||(v=v||pn.units[e]||E,c===i.length&&(i+=v,a.e+=v)),E!==v&&(d=Vi(t,e,_,v)||0),a._pt={_next:a._pt,p:y||l===1?y:",",s:d,c:m-d,m:g&&g<4||e==="zIndex"?Math.round:0});a.c=c<i.length?i.substring(c,i.length):""}else a.r=e==="display"&&i==="none"?Jm:jm;return mm.test(i)&&(a.e=0),this._pt=a,a},Jf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},pS=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=Jf[n]||n,e[1]=Jf[i]||i,e.join(" ")},mS=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,o=n._gsap,a,c,l;if(s==="all"||s===!0)i.cssText="",c=1;else for(s=s.split(","),l=s.length;--l>-1;)a=s[l],di[a]&&(c=1,a=a==="transformOrigin"?Qe:_e),ki(n,a);c&&(ki(n,_e),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",_o(n,1),o.uncache=1,Zm(i)))}},Ha={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var o=t._pt=new Ze(t._pt,e,n,0,0,mS);return o.u=i,o.pr=-10,o.tween=s,t._props.push(n),1}}},mo=[1,0,0,1,0,0],i_={},r_=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Zf=function(t){var e=dn(t,_e);return r_(e)?mo:e.substr(7).match(pm).map(ye)},yh=function(t,e){var n=t._gsap||_r(t),i=t.style,s=Zf(t),o,a,c,l;return n.svg&&t.getAttribute("transform")?(c=t.transform.baseVal.consolidate().matrix,s=[c.a,c.b,c.c,c.d,c.e,c.f],s.join(",")==="1,0,0,1,0,0"?mo:s):(s===mo&&!t.offsetParent&&t!==ss&&!n.svg&&(c=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(l=1,a=t.nextElementSibling,ss.appendChild(t)),s=Zf(t),c?i.display=c:ki(t,"display"),l&&(a?o.insertBefore(t,a):o?o.appendChild(t):ss.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},ql=function(t,e,n,i,s,o){var a=t._gsap,c=s||yh(t,!0),l=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,f=a.yOffset||0,d=c[0],g=c[1],_=c[2],p=c[3],m=c[4],y=c[5],v=e.split(" "),E=parseFloat(v[0])||0,w=parseFloat(v[1])||0,T,S,C,L;n?c!==mo&&(S=d*p-g*_)&&(C=E*(p/S)+w*(-_/S)+(_*y-p*m)/S,L=E*(-g/S)+w*(d/S)-(d*y-g*m)/S,E=C,w=L):(T=e_(t),E=T.x+(~v[0].indexOf("%")?E/100*T.width:E),w=T.y+(~(v[1]||v[0]).indexOf("%")?w/100*T.height:w)),i||i!==!1&&a.smooth?(m=E-l,y=w-u,a.xOffset=h+(m*d+y*_)-m,a.yOffset=f+(m*g+y*p)-y):a.xOffset=a.yOffset=0,a.xOrigin=E,a.yOrigin=w,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[Qe]="0px 0px",o&&(Ri(o,a,"xOrigin",l,E),Ri(o,a,"yOrigin",u,w),Ri(o,a,"xOffset",h,a.xOffset),Ri(o,a,"yOffset",f,a.yOffset)),t.setAttribute("data-svg-origin",E+" "+w)},_o=function(t,e){var n=t._gsap||new Vm(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,o="px",a="deg",c=getComputedStyle(t),l=dn(t,Qe)||"0",u,h,f,d,g,_,p,m,y,v,E,w,T,S,C,L,x,M,D,I,k,F,O,G,H,et,st,ct,bt,It,N,X;return u=h=f=_=p=m=y=v=E=0,d=g=1,n.svg=!!(t.getCTM&&n_(t)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(i[_e]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[_e]!=="none"?c[_e]:"")),i.scale=i.rotate=i.translate="none"),S=yh(t,n.svg),n.svg&&(n.uncache?(H=t.getBBox(),l=n.xOrigin-H.x+"px "+(n.yOrigin-H.y)+"px",G=""):G=!e&&t.getAttribute("data-svg-origin"),ql(t,G||l,!!G||n.originIsAbsolute,n.smooth!==!1,S)),w=n.xOrigin||0,T=n.yOrigin||0,S!==mo&&(M=S[0],D=S[1],I=S[2],k=S[3],u=F=S[4],h=O=S[5],S.length===6?(d=Math.sqrt(M*M+D*D),g=Math.sqrt(k*k+I*I),_=M||D?Lr(D,M)*sr:0,y=I||k?Lr(I,k)*sr+_:0,y&&(g*=Math.abs(Math.cos(y*os))),n.svg&&(u-=w-(w*M+T*I),h-=T-(w*D+T*k))):(X=S[6],It=S[7],st=S[8],ct=S[9],bt=S[10],N=S[11],u=S[12],h=S[13],f=S[14],C=Lr(X,bt),p=C*sr,C&&(L=Math.cos(-C),x=Math.sin(-C),G=F*L+st*x,H=O*L+ct*x,et=X*L+bt*x,st=F*-x+st*L,ct=O*-x+ct*L,bt=X*-x+bt*L,N=It*-x+N*L,F=G,O=H,X=et),C=Lr(-I,bt),m=C*sr,C&&(L=Math.cos(-C),x=Math.sin(-C),G=M*L-st*x,H=D*L-ct*x,et=I*L-bt*x,N=k*x+N*L,M=G,D=H,I=et),C=Lr(D,M),_=C*sr,C&&(L=Math.cos(C),x=Math.sin(C),G=M*L+D*x,H=F*L+O*x,D=D*L-M*x,O=O*L-F*x,M=G,F=H),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,m=180-m),d=ye(Math.sqrt(M*M+D*D+I*I)),g=ye(Math.sqrt(O*O+X*X)),C=Lr(F,O),y=Math.abs(C)>2e-4?C*sr:0,E=N?1/(N<0?-N:N):0),n.svg&&(G=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!r_(dn(t,_e)),G&&t.setAttribute("transform",G))),Math.abs(y)>90&&Math.abs(y)<270&&(s?(d*=-1,y+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,y+=y<=0?180:-180)),e=e||n.uncache,n.x=u-((n.xPercent=u&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=h-((n.yPercent=h&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=ye(d),n.scaleY=ye(g),n.rotation=ye(_)+a,n.rotationX=ye(p)+a,n.rotationY=ye(m)+a,n.skewX=y+a,n.skewY=v+a,n.transformPerspective=E+o,(n.zOrigin=parseFloat(l.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Qe]=Ga(l)),n.xOffset=n.yOffset=0,n.force3D=pn.force3D,n.renderTransform=n.svg?gS:t_?s_:_S,n.uncache=0,n},Ga=function(t){return(t=t.split(" "))[0]+" "+t[1]},Hc=function(t,e,n){var i=Ue(e);return ye(parseFloat(e)+parseFloat(Vi(t,"x",n+"px",i)))+i},_S=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,s_(t,e)},Ji="0deg",zs="0px",Zi=") ",s_=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,c=n.z,l=n.rotation,u=n.rotationY,h=n.rotationX,f=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,p=n.transformPerspective,m=n.force3D,y=n.target,v=n.zOrigin,E="",w=m==="auto"&&t&&t!==1||m===!0;if(v&&(h!==Ji||u!==Ji)){var T=parseFloat(u)*os,S=Math.sin(T),C=Math.cos(T),L;T=parseFloat(h)*os,L=Math.cos(T),o=Hc(y,o,S*L*-v),a=Hc(y,a,-Math.sin(T)*-v),c=Hc(y,c,C*L*-v+v)}p!==zs&&(E+="perspective("+p+Zi),(i||s)&&(E+="translate("+i+"%, "+s+"%) "),(w||o!==zs||a!==zs||c!==zs)&&(E+=c!==zs||w?"translate3d("+o+", "+a+", "+c+") ":"translate("+o+", "+a+Zi),l!==Ji&&(E+="rotate("+l+Zi),u!==Ji&&(E+="rotateY("+u+Zi),h!==Ji&&(E+="rotateX("+h+Zi),(f!==Ji||d!==Ji)&&(E+="skew("+f+", "+d+Zi),(g!==1||_!==1)&&(E+="scale("+g+", "+_+Zi),y.style[_e]=E||"translate(0, 0)"},gS=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,c=n.rotation,l=n.skewX,u=n.skewY,h=n.scaleX,f=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,p=n.xOffset,m=n.yOffset,y=n.forceCSS,v=parseFloat(o),E=parseFloat(a),w,T,S,C,L;c=parseFloat(c),l=parseFloat(l),u=parseFloat(u),u&&(u=parseFloat(u),l+=u,c+=u),c||l?(c*=os,l*=os,w=Math.cos(c)*h,T=Math.sin(c)*h,S=Math.sin(c-l)*-f,C=Math.cos(c-l)*f,l&&(u*=os,L=Math.tan(l-u),L=Math.sqrt(1+L*L),S*=L,C*=L,u&&(L=Math.tan(u),L=Math.sqrt(1+L*L),w*=L,T*=L)),w=ye(w),T=ye(T),S=ye(S),C=ye(C)):(w=h,C=f,T=S=0),(v&&!~(o+"").indexOf("px")||E&&!~(a+"").indexOf("px"))&&(v=Vi(d,"x",o,"px"),E=Vi(d,"y",a,"px")),(g||_||p||m)&&(v=ye(v+g-(g*w+_*S)+p),E=ye(E+_-(g*T+_*C)+m)),(i||s)&&(L=d.getBBox(),v=ye(v+i/100*L.width),E=ye(E+s/100*L.height)),L="matrix("+w+","+T+","+S+","+C+","+v+","+E+")",d.setAttribute("transform",L),y&&(d.style[_e]=L)},vS=function(t,e,n,i,s){var o=360,a=Re(s),c=parseFloat(s)*(a&&~s.indexOf("rad")?sr:1),l=c-i,u=i+l+"deg",h,f;return a&&(h=s.split("_")[1],h==="short"&&(l%=o,l!==l%(o/2)&&(l+=l<0?o:-o)),h==="cw"&&l<0?l=(l+o*$f)%o-~~(l/o)*o:h==="ccw"&&l>0&&(l=(l-o*$f)%o-~~(l/o)*o)),t._pt=f=new Ze(t._pt,e,n,i,l,tS),f.e=u,f.u="deg",t._props.push(n),f},Qf=function(t,e){for(var n in e)t[n]=e[n];return t},xS=function(t,e,n){var i=Qf({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,c,l,u,h,f,d,g;i.svg?(l=n.getAttribute("transform"),n.setAttribute("transform",""),o[_e]=e,a=_o(n,1),ki(n,_e),n.setAttribute("transform",l)):(l=getComputedStyle(n)[_e],o[_e]=e,a=_o(n,1),o[_e]=l);for(c in di)l=i[c],u=a[c],l!==u&&s.indexOf(c)<0&&(d=Ue(l),g=Ue(u),h=d!==g?Vi(n,c,l,g):parseFloat(l),f=parseFloat(u),t._pt=new Ze(t._pt,a,c,h,f-h,Wl),t._pt.u=g||0,t._props.push(c));Qf(a,i)};Je("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",o=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(a){return t<2?r+a:"border"+a+r});Ha[t>1?"border"+r:r]=function(a,c,l,u,h){var f,d;if(arguments.length<4)return f=o.map(function(g){return si(a,g,l)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},o.forEach(function(g,_){return d[g]=f[_]=f[_]||f[(_-1)/2|0]}),a.init(c,d,h)}});var o_={name:"css",register:$l,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var o=this._props,a=t.style,c=n.vars.startAt,l,u,h,f,d,g,_,p,m,y,v,E,w,T,S,C,L;gh||$l(),this.styles=this.styles||Qm(t),C=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(u=e[_],!(an[_]&&Hm(_,e,n,i,t,s)))){if(d=typeof u,g=Ha[_],d==="function"&&(u=u.call(n,i,t,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=ho(u)),g)g(this,t,_,u,n)&&(S=1);else if(_.substr(0,2)==="--")l=(getComputedStyle(t).getPropertyValue(_)+"").trim(),u+="",Di.lastIndex=0,Di.test(l)||(p=Ue(l),m=Ue(u),m?p!==m&&(l=Vi(t,_,l,m)+m):p&&(u+=p)),this.add(a,"setProperty",l,u,i,s,0,0,_),o.push(_),C.push(_,0,a[_]);else if(d!=="undefined"){if(c&&_ in c?(l=typeof c[_]=="function"?c[_].call(n,i,t,s):c[_],Re(l)&&~l.indexOf("random(")&&(l=ho(l)),Ue(l+"")||l==="auto"||(l+=pn.units[_]||Ue(si(t,_))||""),(l+"").charAt(1)==="="&&(l=si(t,_))):l=si(t,_),f=parseFloat(l),y=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),y&&(u=u.substr(2)),h=parseFloat(u),_ in Hn&&(_==="autoAlpha"&&(f===1&&si(t,"visibility")==="hidden"&&h&&(f=0),C.push("visibility",0,a.visibility),Ri(this,a,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),_!=="scale"&&_!=="transform"&&(_=Hn[_],~_.indexOf(",")&&(_=_.split(",")[0]))),v=_ in di,v){if(this.styles.save(_),L=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=dn(t,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var x=t.style.perspective;t.style.perspective=u,u=dn(t,"perspective"),x?t.style.perspective=x:ki(t,"perspective")}h=parseFloat(u)}if(E||(w=t._gsap,w.renderTransform&&!e.parseTransform||_o(t,e.parseTransform),T=e.smoothOrigin!==!1&&w.smooth,E=this._pt=new Ze(this._pt,a,_e,0,1,w.renderTransform,w,0,-1),E.dep=1),_==="scale")this._pt=new Ze(this._pt,w,"scaleY",w.scaleY,(y?rs(w.scaleY,y+h):h)-w.scaleY||0,Wl),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){C.push(Qe,0,a[Qe]),u=pS(u),w.svg?ql(t,u,0,T,0,this):(m=parseFloat(u.split(" ")[2])||0,m!==w.zOrigin&&Ri(this,w,"zOrigin",w.zOrigin,m),Ri(this,a,_,Ga(l),Ga(u)));continue}else if(_==="svgOrigin"){ql(t,u,1,T,0,this);continue}else if(_ in i_){vS(this,w,_,f,y?rs(f,y+u):u);continue}else if(_==="smoothOrigin"){Ri(this,w,"smooth",w.smooth,u);continue}else if(_==="force3D"){w[_]=u;continue}else if(_==="transform"){xS(this,u,t);continue}}else _ in a||(_=Ss(_)||_);if(v||(h||h===0)&&(f||f===0)&&!QE.test(u)&&_ in a)p=(l+"").substr((f+"").length),h||(h=0),m=Ue(u)||(_ in pn.units?pn.units[_]:p),p!==m&&(f=Vi(t,_,l,m)),this._pt=new Ze(this._pt,v?w:a,_,f,(y?rs(f,y+h):h)-f,!v&&(m==="px"||_==="zIndex")&&e.autoRound!==!1?iS:Wl),this._pt.u=m||0,v&&L!==u?(this._pt.b=l,this._pt.e=L,this._pt.r=nS):p!==m&&m!=="%"&&(this._pt.b=l,this._pt.r=eS);else if(_ in a)dS.call(this,t,_,l,y?y+u:u);else if(_ in t)this.add(t,_,l||t[_],y?y+u:u,i,s);else if(_!=="parseTransform"){ah(_,u);continue}v||(_ in a?C.push(_,0,a[_]):typeof t[_]=="function"?C.push(_,2,t[_]()):C.push(_,1,l||t[_])),o.push(_)}}S&&Ym(this)},render:function(t,e){if(e.tween._time||!vh())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:si,aliases:Hn,getSetter:function(t,e,n){var i=Hn[e];return i&&i.indexOf(",")<0&&(e=i),e in di&&e!==Qe&&(t._gsap.x||si(t,"x"))?n&&Xf===n?e==="scale"?aS:oS:(Xf=n||{})&&(e==="scale"?cS:lS):t.style&&!rh(t.style[e])?rS:~e.indexOf("-")?sS:mh(t,e)},core:{_removeProperty:ki,_getMatrix:yh}};en.utils.checkPrefix=Ss;en.core.getStyleSaver=Qm;(function(r,t,e,n){var i=Je(r+","+t+","+e,function(s){di[s]=1});Je(t,function(s){pn.units[s]="deg",i_[s]=1}),Hn[i[13]]=r+","+t,Je(n,function(s){var o=s.split(":");Hn[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Je("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){pn.units[r]="px"});en.registerPlugin(o_);var Wa=en.registerPlugin(o_)||en;Wa.core.Tween;/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Eh="169",yS=0,td=1,ES=2,a_=1,SS=2,ii=3,Hi=0,We=1,Fe=2,Ii=0,as=1,ed=2,nd=3,id=4,MS=5,cr=100,TS=101,bS=102,wS=103,AS=104,CS=200,RS=201,PS=202,LS=203,Yl=204,Kl=205,DS=206,IS=207,NS=208,OS=209,US=210,FS=211,BS=212,zS=213,kS=214,jl=0,Jl=1,Zl=2,Ms=3,Ql=4,tu=5,eu=6,nu=7,c_=0,VS=1,HS=2,Ni=0,GS=1,WS=2,XS=3,l_=4,$S=5,qS=6,YS=7,u_=300,Ts=301,bs=302,iu=303,ru=304,uc=306,su=1e3,dr=1001,ou=1002,bn=1003,KS=1004,Vo=1005,Nn=1006,Gc=1007,pr=1008,pi=1009,h_=1010,f_=1011,go=1012,Sh=1013,Mr=1014,oi=1015,bo=1016,Mh=1017,Th=1018,ws=1020,d_=35902,p_=1021,m_=1022,On=1023,__=1024,g_=1025,cs=1026,As=1027,v_=1028,bh=1029,x_=1030,wh=1031,Ah=1033,ba=33776,wa=33777,Aa=33778,Ca=33779,au=35840,cu=35841,lu=35842,uu=35843,hu=36196,fu=37492,du=37496,pu=37808,mu=37809,_u=37810,gu=37811,vu=37812,xu=37813,yu=37814,Eu=37815,Su=37816,Mu=37817,Tu=37818,bu=37819,wu=37820,Au=37821,Ra=36492,Cu=36494,Ru=36495,y_=36283,Pu=36284,Lu=36285,Du=36286,jS=3200,JS=3201,E_=0,ZS=1,wi="",cn="srgb",Yi="srgb-linear",Ch="display-p3",hc="display-p3-linear",Xa="linear",he="srgb",$a="rec709",qa="p3",Dr=7680,rd=519,QS=512,tM=513,eM=514,S_=515,nM=516,iM=517,rM=518,sM=519,Iu=35044,sd="300 es",ai=2e3,Ya=2001;class Os{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pa=Math.PI/180,Nu=180/Math.PI;function Oi(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[r&255]+Ne[r>>8&255]+Ne[r>>16&255]+Ne[r>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function De(r,t,e){return Math.max(t,Math.min(e,r))}function oM(r,t){return(r%t+t)%t}function Wc(r,t,e){return(1-e)*r+e*t}function Vn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ne(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class lt{constructor(t=0,e=0){lt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(De(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ut{constructor(t,e,n,i,s,o,a,c,l){Ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l)}set(t,e,n,i,s,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],_=i[0],p=i[3],m=i[6],y=i[1],v=i[4],E=i[7],w=i[2],T=i[5],S=i[8];return s[0]=o*_+a*y+c*w,s[3]=o*p+a*v+c*T,s[6]=o*m+a*E+c*S,s[1]=l*_+u*y+h*w,s[4]=l*p+u*v+h*T,s[7]=l*m+u*E+h*S,s[2]=f*_+d*y+g*w,s[5]=f*p+d*v+g*T,s[8]=f*m+d*E+g*S,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*s*u+n*a*c+i*s*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*o-a*l,f=a*c-u*s,d=l*s-o*c,g=e*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(i*l-u*n)*_,t[2]=(a*n-i*o)*_,t[3]=f*_,t[4]=(u*e-i*c)*_,t[5]=(i*s-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Xc.makeScale(t,e)),this}rotate(t){return this.premultiply(Xc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Xc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Xc=new Ut;function M_(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Ka(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function aM(){const r=Ka("canvas");return r.style.display="block",r}const od={};function La(r){r in od||(od[r]=!0,console.warn(r))}function cM(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function lM(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function uM(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ad=new Ut().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),cd=new Ut().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ks={[Yi]:{transfer:Xa,primaries:$a,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r,fromReference:r=>r},[cn]:{transfer:he,primaries:$a,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[hc]:{transfer:Xa,primaries:qa,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.applyMatrix3(cd),fromReference:r=>r.applyMatrix3(ad)},[Ch]:{transfer:he,primaries:qa,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.convertSRGBToLinear().applyMatrix3(cd),fromReference:r=>r.applyMatrix3(ad).convertLinearToSRGB()}},hM=new Set([Yi,hc]),te={enabled:!0,_workingColorSpace:Yi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!hM.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=ks[t].toReference,i=ks[e].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return ks[r].primaries},getTransfer:function(r){return r===wi?Xa:ks[r].transfer},getLuminanceCoefficients:function(r,t=this._workingColorSpace){return r.fromArray(ks[t].luminanceCoefficients)}};function ls(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function $c(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ir;class fM{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ir===void 0&&(Ir=Ka("canvas")),Ir.width=t.width,Ir.height=t.height;const n=Ir.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ir}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ka("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=ls(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ls(e[n]/255)*255):e[n]=ls(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let dM=0;class T_{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:dM++}),this.uuid=Oi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(qc(i[o].image)):s.push(qc(i[o]))}else s=qc(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function qc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?fM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let pM=0;class Xe extends Os{constructor(t=Xe.DEFAULT_IMAGE,e=Xe.DEFAULT_MAPPING,n=dr,i=dr,s=Nn,o=pr,a=On,c=pi,l=Xe.DEFAULT_ANISOTROPY,u=wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pM++}),this.uuid=Oi(),this.name="",this.source=new T_(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==u_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case su:t.x=t.x-Math.floor(t.x);break;case dr:t.x=t.x<0?0:1;break;case ou:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case su:t.y=t.y-Math.floor(t.y);break;case dr:t.y=t.y<0?0:1;break;case ou:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Xe.DEFAULT_IMAGE=null;Xe.DEFAULT_MAPPING=u_;Xe.DEFAULT_ANISOTROPY=1;class ie{constructor(t=0,e=0,n=0,i=1){ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const c=t.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],_=c[2],p=c[6],m=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,E=(d+1)/2,w=(m+1)/2,T=(u+f)/4,S=(h+_)/4,C=(g+p)/4;return v>E&&v>w?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=T/n,s=S/n):E>w?E<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(E),n=T/i,s=C/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=S/s,i=C/s),this.set(n,i,s,e),this}let y=Math.sqrt((p-g)*(p-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(h-_)/y,this.z=(f-u)/y,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class mM extends Os{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ie(0,0,t,e),this.scissorTest=!1,this.viewport=new ie(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Xe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new T_(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Tr extends mM{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class b_ extends Xe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=bn,this.minFilter=bn,this.wrapR=dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class _M extends Xe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=bn,this.minFilter=bn,this.wrapR=dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wo{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const f=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(h!==_||c!==f||l!==d||u!==g){let p=1-a;const m=c*f+l*d+u*g+h*_,y=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const w=Math.sqrt(v),T=Math.atan2(w,m*y);p=Math.sin(p*T)/w,a=Math.sin(a*T)/w}const E=a*y;if(c=c*p+f*E,l=l*p+d*E,u=u*p+g*E,h=h*p+_*E,p===1-a){const w=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=w,l*=w,u*=w,h*=w}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+u*h+c*d-l*f,t[e+1]=c*g+u*f+l*h-a*d,t[e+2]=l*g+u*d+a*f-c*h,t[e+3]=u*g-a*h-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(i/2),h=a(s/2),f=c(n/2),d=c(i/2),g=c(s/2);switch(o){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],h=e[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(o-i)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+l)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-l)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(De(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+i*l-s*c,this._y=i*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-i*a,this._w=o*u-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-e)*u)/l,f=Math.sin(e*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(t=0,e=0,n=0){R.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ld.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ld.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),u=2*(a*e-s*i),h=2*(s*n-o*e);return this.x=e+c*l+o*h-a*u,this.y=n+c*u+a*l-s*h,this.z=i+c*h+s*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Yc.copy(this).projectOnVector(t),this.sub(Yc)}reflect(t){return this.sub(Yc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(De(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Yc=new R,ld=new wo;class Ao{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Ln):Ln.fromBufferAttribute(s,o),Ln.applyMatrix4(t.matrixWorld),this.expandByPoint(Ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ho.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ho.copy(n.boundingBox)),Ho.applyMatrix4(t.matrixWorld),this.union(Ho)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ln),Ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vs),Go.subVectors(this.max,Vs),Nr.subVectors(t.a,Vs),Or.subVectors(t.b,Vs),Ur.subVectors(t.c,Vs),xi.subVectors(Or,Nr),yi.subVectors(Ur,Or),Qi.subVectors(Nr,Ur);let e=[0,-xi.z,xi.y,0,-yi.z,yi.y,0,-Qi.z,Qi.y,xi.z,0,-xi.x,yi.z,0,-yi.x,Qi.z,0,-Qi.x,-xi.y,xi.x,0,-yi.y,yi.x,0,-Qi.y,Qi.x,0];return!Kc(e,Nr,Or,Ur,Go)||(e=[1,0,0,0,1,0,0,0,1],!Kc(e,Nr,Or,Ur,Go))?!1:(Wo.crossVectors(xi,yi),e=[Wo.x,Wo.y,Wo.z],Kc(e,Nr,Or,Ur,Go))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Jn=[new R,new R,new R,new R,new R,new R,new R,new R],Ln=new R,Ho=new Ao,Nr=new R,Or=new R,Ur=new R,xi=new R,yi=new R,Qi=new R,Vs=new R,Go=new R,Wo=new R,tr=new R;function Kc(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){tr.fromArray(r,s);const a=i.x*Math.abs(tr.x)+i.y*Math.abs(tr.y)+i.z*Math.abs(tr.z),c=t.dot(tr),l=e.dot(tr),u=n.dot(tr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const gM=new Ao,Hs=new R,jc=new R;class Co{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):gM.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Hs.subVectors(t,this.center);const e=Hs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Hs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(jc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Hs.copy(t.center).add(jc)),this.expandByPoint(Hs.copy(t.center).sub(jc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Zn=new R,Jc=new R,Xo=new R,Ei=new R,Zc=new R,$o=new R,Qc=new R;class Rh{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zn.copy(this.origin).addScaledVector(this.direction,e),Zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Jc.copy(t).add(e).multiplyScalar(.5),Xo.copy(e).sub(t).normalize(),Ei.copy(this.origin).sub(Jc);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Xo),a=Ei.dot(this.direction),c=-Ei.dot(Xo),l=Ei.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*c-a,f=o*a-c,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-s,-c),s),d=f*(f+2*c)+l):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Jc).addScaledVector(Xo,f),d}intersectSphere(t,e){Zn.subVectors(t.center,this.origin);const n=Zn.dot(this.direction),i=Zn.dot(Zn)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,i=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,i=(t.min.x-f.x)*l),u>=0?(s=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),h>=0?(a=(t.min.z-f.z)*h,c=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,c=(t.min.z-f.z)*h),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Zn)!==null}intersectTriangle(t,e,n,i,s){Zc.subVectors(e,t),$o.subVectors(n,t),Qc.crossVectors(Zc,$o);let o=this.direction.dot(Qc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ei.subVectors(this.origin,t);const c=a*this.direction.dot($o.crossVectors(Ei,$o));if(c<0)return null;const l=a*this.direction.dot(Zc.cross(Ei));if(l<0||c+l>o)return null;const u=-a*Ei.dot(Qc);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ae{constructor(t,e,n,i,s,o,a,c,l,u,h,f,d,g,_,p){ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l,u,h,f,d,g,_,p)}set(t,e,n,i,s,o,a,c,l,u,h,f,d,g,_,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ae().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Fr.setFromMatrixColumn(t,0).length(),s=1/Fr.setFromMatrixColumn(t,1).length(),o=1/Fr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=o*u,d=o*h,g=a*u,_=a*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=d+g*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*u,d=c*h,g=l*u,_=l*h;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*u,d=c*h,g=l*u,_=l*h;e[0]=f-_*a,e[4]=-o*h,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=_-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*u,d=o*h,g=a*u,_=a*h;e[0]=c*u,e[4]=g*l-d,e[8]=f*l+_,e[1]=c*h,e[5]=_*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=_-f*h,e[8]=g*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=d*h+g,e[10]=f-_*h}else if(t.order==="XZY"){const f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=f*h+_,e[5]=o*u,e[9]=d*h-g,e[2]=g*h-d,e[6]=a*u,e[10]=_*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vM,t,xM)}lookAt(t,e,n){const i=this.elements;return sn.subVectors(t,e),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),Si.crossVectors(n,sn),Si.lengthSq()===0&&(Math.abs(n.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),Si.crossVectors(n,sn)),Si.normalize(),qo.crossVectors(sn,Si),i[0]=Si.x,i[4]=qo.x,i[8]=sn.x,i[1]=Si.y,i[5]=qo.y,i[9]=sn.y,i[2]=Si.z,i[6]=qo.z,i[10]=sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],_=n[6],p=n[10],m=n[14],y=n[3],v=n[7],E=n[11],w=n[15],T=i[0],S=i[4],C=i[8],L=i[12],x=i[1],M=i[5],D=i[9],I=i[13],k=i[2],F=i[6],O=i[10],G=i[14],H=i[3],et=i[7],st=i[11],ct=i[15];return s[0]=o*T+a*x+c*k+l*H,s[4]=o*S+a*M+c*F+l*et,s[8]=o*C+a*D+c*O+l*st,s[12]=o*L+a*I+c*G+l*ct,s[1]=u*T+h*x+f*k+d*H,s[5]=u*S+h*M+f*F+d*et,s[9]=u*C+h*D+f*O+d*st,s[13]=u*L+h*I+f*G+d*ct,s[2]=g*T+_*x+p*k+m*H,s[6]=g*S+_*M+p*F+m*et,s[10]=g*C+_*D+p*O+m*st,s[14]=g*L+_*I+p*G+m*ct,s[3]=y*T+v*x+E*k+w*H,s[7]=y*S+v*M+E*F+w*et,s[11]=y*C+v*D+E*O+w*st,s[15]=y*L+v*I+E*G+w*ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],f=t[10],d=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+s*c*h-i*l*h-s*a*f+n*l*f+i*a*d-n*c*d)+_*(+e*c*d-e*l*f+s*o*f-i*o*d+i*l*u-s*c*u)+p*(+e*l*h-e*a*d-s*o*h+n*o*d+s*a*u-n*l*u)+m*(-i*a*u-e*c*h+e*a*f+i*o*h-n*o*f+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],f=t[10],d=t[11],g=t[12],_=t[13],p=t[14],m=t[15],y=h*p*l-_*f*l+_*c*d-a*p*d-h*c*m+a*f*m,v=g*f*l-u*p*l-g*c*d+o*p*d+u*c*m-o*f*m,E=u*_*l-g*h*l+g*a*d-o*_*d-u*a*m+o*h*m,w=g*h*c-u*_*c-g*a*f+o*_*f+u*a*p-o*h*p,T=e*y+n*v+i*E+s*w;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/T;return t[0]=y*S,t[1]=(_*f*s-h*p*s-_*i*d+n*p*d+h*i*m-n*f*m)*S,t[2]=(a*p*s-_*c*s+_*i*l-n*p*l-a*i*m+n*c*m)*S,t[3]=(h*c*s-a*f*s-h*i*l+n*f*l+a*i*d-n*c*d)*S,t[4]=v*S,t[5]=(u*p*s-g*f*s+g*i*d-e*p*d-u*i*m+e*f*m)*S,t[6]=(g*c*s-o*p*s-g*i*l+e*p*l+o*i*m-e*c*m)*S,t[7]=(o*f*s-u*c*s+u*i*l-e*f*l-o*i*d+e*c*d)*S,t[8]=E*S,t[9]=(g*h*s-u*_*s-g*n*d+e*_*d+u*n*m-e*h*m)*S,t[10]=(o*_*s-g*a*s+g*n*l-e*_*l-o*n*m+e*a*m)*S,t[11]=(u*a*s-o*h*s-u*n*l+e*h*l+o*n*d-e*a*d)*S,t[12]=w*S,t[13]=(u*_*i-g*h*i+g*n*f-e*_*f-u*n*p+e*h*p)*S,t[14]=(g*a*i-o*_*i-g*n*c+e*_*c+o*n*p-e*a*p)*S,t[15]=(o*h*i-u*a*i+u*n*c-e*h*c-o*n*f+e*a*f)*S,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,u*a+n,u*c-i*o,0,l*c-i*a,u*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,u=o+o,h=a+a,f=s*l,d=s*u,g=s*h,_=o*u,p=o*h,m=a*h,y=c*l,v=c*u,E=c*h,w=n.x,T=n.y,S=n.z;return i[0]=(1-(_+m))*w,i[1]=(d+E)*w,i[2]=(g-v)*w,i[3]=0,i[4]=(d-E)*T,i[5]=(1-(f+m))*T,i[6]=(p+y)*T,i[7]=0,i[8]=(g+v)*S,i[9]=(p-y)*S,i[10]=(1-(f+_))*S,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=Fr.set(i[0],i[1],i[2]).length();const o=Fr.set(i[4],i[5],i[6]).length(),a=Fr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Dn.copy(this);const l=1/s,u=1/o,h=1/a;return Dn.elements[0]*=l,Dn.elements[1]*=l,Dn.elements[2]*=l,Dn.elements[4]*=u,Dn.elements[5]*=u,Dn.elements[6]*=u,Dn.elements[8]*=h,Dn.elements[9]*=h,Dn.elements[10]*=h,e.setFromRotationMatrix(Dn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=ai){const c=this.elements,l=2*s/(e-t),u=2*s/(n-i),h=(e+t)/(e-t),f=(n+i)/(n-i);let d,g;if(a===ai)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Ya)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=ai){const c=this.elements,l=1/(e-t),u=1/(n-i),h=1/(o-s),f=(e+t)*l,d=(n+i)*u;let g,_;if(a===ai)g=(o+s)*h,_=-2*h;else if(a===Ya)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Fr=new R,Dn=new ae,vM=new R(0,0,0),xM=new R(1,1,1),Si=new R,qo=new R,sn=new R,ud=new ae,hd=new wo;class qn{constructor(t=0,e=0,n=0,i=qn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(De(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-De(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(De(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-De(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(De(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-De(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ud.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ud,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return hd.setFromEuler(this),this.setFromQuaternion(hd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qn.DEFAULT_ORDER="XYZ";class w_{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let yM=0;const fd=new R,Br=new wo,Qn=new ae,Yo=new R,Gs=new R,EM=new R,SM=new wo,dd=new R(1,0,0),pd=new R(0,1,0),md=new R(0,0,1),_d={type:"added"},MM={type:"removed"},zr={type:"childadded",child:null},tl={type:"childremoved",child:null};class Te extends Os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yM++}),this.uuid=Oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new R,e=new qn,n=new wo,i=new R(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ae},normalMatrix:{value:new Ut}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new w_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Br.setFromAxisAngle(t,e),this.quaternion.multiply(Br),this}rotateOnWorldAxis(t,e){return Br.setFromAxisAngle(t,e),this.quaternion.premultiply(Br),this}rotateX(t){return this.rotateOnAxis(dd,t)}rotateY(t){return this.rotateOnAxis(pd,t)}rotateZ(t){return this.rotateOnAxis(md,t)}translateOnAxis(t,e){return fd.copy(t).applyQuaternion(this.quaternion),this.position.add(fd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(dd,t)}translateY(t){return this.translateOnAxis(pd,t)}translateZ(t){return this.translateOnAxis(md,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Yo.copy(t):Yo.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(Gs,Yo,this.up):Qn.lookAt(Yo,Gs,this.up),this.quaternion.setFromRotationMatrix(Qn),i&&(Qn.extractRotation(i.matrixWorld),Br.setFromRotationMatrix(Qn),this.quaternion.premultiply(Br.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(_d),zr.child=t,this.dispatchEvent(zr),zr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(MM),tl.child=t,this.dispatchEvent(tl),tl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Qn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Qn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(_d),zr.child=t,this.dispatchEvent(zr),zr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,t,EM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,SM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(t.shapes,h)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Te.DEFAULT_UP=new R(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const In=new R,ti=new R,el=new R,ei=new R,kr=new R,Vr=new R,gd=new R,nl=new R,il=new R,rl=new R,sl=new ie,ol=new ie,al=new ie;class hn{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),In.subVectors(t,e),i.cross(In);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){In.subVectors(i,e),ti.subVectors(n,e),el.subVectors(t,e);const o=In.dot(In),a=In.dot(ti),c=In.dot(el),l=ti.dot(ti),u=ti.dot(el),h=o*l-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(l*c-a*u)*f,g=(o*u-a*c)*f;return s.set(1-d-g,g,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(t,e,n,i,s,o,a,c){return this.getBarycoord(t,e,n,i,ei)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ei.x),c.addScaledVector(o,ei.y),c.addScaledVector(a,ei.z),c)}static getInterpolatedAttribute(t,e,n,i,s,o){return sl.setScalar(0),ol.setScalar(0),al.setScalar(0),sl.fromBufferAttribute(t,e),ol.fromBufferAttribute(t,n),al.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(sl,s.x),o.addScaledVector(ol,s.y),o.addScaledVector(al,s.z),o}static isFrontFacing(t,e,n,i){return In.subVectors(n,e),ti.subVectors(t,e),In.cross(ti).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return In.subVectors(this.c,this.b),ti.subVectors(this.a,this.b),In.cross(ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return hn.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;kr.subVectors(i,n),Vr.subVectors(s,n),nl.subVectors(t,n);const c=kr.dot(nl),l=Vr.dot(nl);if(c<=0&&l<=0)return e.copy(n);il.subVectors(t,i);const u=kr.dot(il),h=Vr.dot(il);if(u>=0&&h<=u)return e.copy(i);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(kr,o);rl.subVectors(t,s);const d=kr.dot(rl),g=Vr.dot(rl);if(g>=0&&d<=g)return e.copy(s);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Vr,a);const p=u*g-d*h;if(p<=0&&h-u>=0&&d-g>=0)return gd.subVectors(s,i),a=(h-u)/(h-u+(d-g)),e.copy(i).addScaledVector(gd,a);const m=1/(p+_+f);return o=_*m,a=f*m,e.copy(n).addScaledVector(kr,o).addScaledVector(Vr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const A_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mi={h:0,s:0,l:0},Ko={h:0,s:0,l:0};function cl(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class Bt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=cn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=te.workingColorSpace){if(t=oM(t,1),e=De(e,0,1),n=De(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=cl(o,s,t+1/3),this.g=cl(o,s,t),this.b=cl(o,s,t-1/3)}return te.toWorkingColorSpace(this,i),this}setStyle(t,e=cn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=cn){const n=A_[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ls(t.r),this.g=ls(t.g),this.b=ls(t.b),this}copyLinearToSRGB(t){return this.r=$c(t.r),this.g=$c(t.g),this.b=$c(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=cn){return te.fromWorkingColorSpace(Oe.copy(this),t),Math.round(De(Oe.r*255,0,255))*65536+Math.round(De(Oe.g*255,0,255))*256+Math.round(De(Oe.b*255,0,255))}getHexString(t=cn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.fromWorkingColorSpace(Oe.copy(this),e);const n=Oe.r,i=Oe.g,s=Oe.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(i-s)/h+(i<s?6:0);break;case i:c=(s-n)/h+2;break;case s:c=(n-i)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=te.workingColorSpace){return te.fromWorkingColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=cn){te.fromWorkingColorSpace(Oe.copy(this),t);const e=Oe.r,n=Oe.g,i=Oe.b;return t!==cn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Mi),this.setHSL(Mi.h+t,Mi.s+e,Mi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Mi),t.getHSL(Ko);const n=Wc(Mi.h,Ko.h,e),i=Wc(Mi.s,Ko.s,e),s=Wc(Mi.l,Ko.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Oe=new Bt;Bt.NAMES=A_;let TM=0;class Ki extends Os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:TM++}),this.uuid=Oi(),this.name="",this.type="Material",this.blending=as,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yl,this.blendDst=Kl,this.blendEquation=cr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Dr,this.stencilZFail=Dr,this.stencilZPass=Dr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==as&&(n.blending=this.blending),this.side!==Hi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Yl&&(n.blendSrc=this.blendSrc),this.blendDst!==Kl&&(n.blendDst=this.blendDst),this.blendEquation!==cr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ms&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Dr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Dr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Dr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class _i extends Ki{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=c_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Se=new R,jo=new lt;class tn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Iu,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)jo.fromBufferAttribute(this,e),jo.applyMatrix3(t),this.setXY(e,jo.x,jo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Vn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Vn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Vn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Vn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Vn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array),s=ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Iu&&(t.usage=this.usage),t}}class C_ extends tn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class R_ extends tn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ft extends tn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let bM=0;const En=new ae,ll=new Te,Hr=new R,on=new Ao,Ws=new Ao,Ae=new R;class qt extends Os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bM++}),this.uuid=Oi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(M_(t)?R_:C_)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ut().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return En.makeRotationFromQuaternion(t),this.applyMatrix4(En),this}rotateX(t){return En.makeRotationX(t),this.applyMatrix4(En),this}rotateY(t){return En.makeRotationY(t),this.applyMatrix4(En),this}rotateZ(t){return En.makeRotationZ(t),this.applyMatrix4(En),this}translate(t,e,n){return En.makeTranslation(t,e,n),this.applyMatrix4(En),this}scale(t,e,n){return En.makeScale(t,e,n),this.applyMatrix4(En),this}lookAt(t){return ll.lookAt(t),ll.updateMatrix(),this.applyMatrix4(ll.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hr).negate(),this.translate(Hr.x,Hr.y,Hr.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ft(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ao);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];on.setFromBufferAttribute(s),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Co);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Ws.setFromBufferAttribute(a),this.morphTargetsRelative?(Ae.addVectors(on.min,Ws.min),on.expandByPoint(Ae),Ae.addVectors(on.max,Ws.max),on.expandByPoint(Ae)):(on.expandByPoint(Ws.min),on.expandByPoint(Ws.max))}on.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Ae.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Ae));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ae.fromBufferAttribute(a,l),c&&(Hr.fromBufferAttribute(t,l),Ae.add(Hr)),i=Math.max(i,n.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new tn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<n.count;C++)a[C]=new R,c[C]=new R;const l=new R,u=new R,h=new R,f=new lt,d=new lt,g=new lt,_=new R,p=new R;function m(C,L,x){l.fromBufferAttribute(n,C),u.fromBufferAttribute(n,L),h.fromBufferAttribute(n,x),f.fromBufferAttribute(s,C),d.fromBufferAttribute(s,L),g.fromBufferAttribute(s,x),u.sub(l),h.sub(l),d.sub(f),g.sub(f);const M=1/(d.x*g.y-g.x*d.y);isFinite(M)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(M),p.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(M),a[C].add(_),a[L].add(_),a[x].add(_),c[C].add(p),c[L].add(p),c[x].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let C=0,L=y.length;C<L;++C){const x=y[C],M=x.start,D=x.count;for(let I=M,k=M+D;I<k;I+=3)m(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const v=new R,E=new R,w=new R,T=new R;function S(C){w.fromBufferAttribute(i,C),T.copy(w);const L=a[C];v.copy(L),v.sub(w.multiplyScalar(w.dot(L))).normalize(),E.crossVectors(T,L);const M=E.dot(c[C])<0?-1:1;o.setXYZW(C,v.x,v.y,v.z,M)}for(let C=0,L=y.length;C<L;++C){const x=y[C],M=x.start,D=x.count;for(let I=M,k=M+D;I<k;I+=3)S(t.getX(I+0)),S(t.getX(I+1)),S(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new tn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new R,s=new R,o=new R,a=new R,c=new R,l=new R,u=new R,h=new R;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),p=t.getX(f+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,p),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ae.fromBufferAttribute(t,e),Ae.normalize(),t.setXYZ(e,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let d=0,g=0;for(let _=0,p=c.length;_<p;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*u;for(let m=0;m<u;m++)f[g++]=l[d++]}return new tn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new qt,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(t.data))}u.length>0&&(i[c]=u,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(e))}const s=t.morphAttributes;for(const l in s){const u=[],h=s[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vd=new ae,er=new Rh,Jo=new Co,xd=new R,Zo=new R,Qo=new R,ta=new R,ul=new R,ea=new R,yd=new R,na=new R;class mt extends Te{constructor(t=new qt,e=new _i){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){ea.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],h=s[c];u!==0&&(ul.fromBufferAttribute(h,t),o?ea.addScaledVector(ul,u):ea.addScaledVector(ul.sub(e),u))}e.add(ea)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Jo.copy(n.boundingSphere),Jo.applyMatrix4(s),er.copy(t.ray).recast(t.near),!(Jo.containsPoint(er.origin)===!1&&(er.intersectSphere(Jo,xd)===null||er.origin.distanceToSquared(xd)>(t.far-t.near)**2))&&(vd.copy(s).invert(),er.copy(t.ray).applyMatrix4(vd),!(n.boundingBox!==null&&er.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,er)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=o[p.materialIndex],y=Math.max(p.start,d.start),v=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let E=y,w=v;E<w;E+=3){const T=a.getX(E),S=a.getX(E+1),C=a.getX(E+2);i=ia(this,m,t,n,l,u,h,T,S,C),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const y=a.getX(p),v=a.getX(p+1),E=a.getX(p+2);i=ia(this,o,t,n,l,u,h,y,v,E),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=o[p.materialIndex],y=Math.max(p.start,d.start),v=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let E=y,w=v;E<w;E+=3){const T=E,S=E+1,C=E+2;i=ia(this,m,t,n,l,u,h,T,S,C),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const y=p,v=p+1,E=p+2;i=ia(this,o,t,n,l,u,h,y,v,E),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function wM(r,t,e,n,i,s,o,a){let c;if(t.side===We?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,t.side===Hi,a),c===null)return null;na.copy(a),na.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(na);return l<e.near||l>e.far?null:{distance:l,point:na.clone(),object:r}}function ia(r,t,e,n,i,s,o,a,c,l){r.getVertexPosition(a,Zo),r.getVertexPosition(c,Qo),r.getVertexPosition(l,ta);const u=wM(r,t,e,n,Zo,Qo,ta,yd);if(u){const h=new R;hn.getBarycoord(yd,Zo,Qo,ta,h),i&&(u.uv=hn.getInterpolatedAttribute(i,a,c,l,h,new lt)),s&&(u.uv1=hn.getInterpolatedAttribute(s,a,c,l,h,new lt)),o&&(u.normal=hn.getInterpolatedAttribute(o,a,c,l,h,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new R,materialIndex:0};hn.getNormal(Zo,Qo,ta,f.normal),u.face=f,u.barycoord=h}return u}class le extends qt{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ft(l,3)),this.setAttribute("normal",new Ft(u,3)),this.setAttribute("uv",new Ft(h,2));function g(_,p,m,y,v,E,w,T,S,C,L){const x=E/S,M=w/C,D=E/2,I=w/2,k=T/2,F=S+1,O=C+1;let G=0,H=0;const et=new R;for(let st=0;st<O;st++){const ct=st*M-I;for(let bt=0;bt<F;bt++){const It=bt*x-D;et[_]=It*y,et[p]=ct*v,et[m]=k,l.push(et.x,et.y,et.z),et[_]=0,et[p]=0,et[m]=T>0?1:-1,u.push(et.x,et.y,et.z),h.push(bt/S),h.push(1-st/C),G+=1}}for(let st=0;st<C;st++)for(let ct=0;ct<S;ct++){const bt=f+ct+F*st,It=f+ct+F*(st+1),N=f+(ct+1)+F*(st+1),X=f+(ct+1)+F*st;c.push(bt,It,X),c.push(It,N,X),H+=6}a.addGroup(d,H,L),d+=H,f+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new le(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Cs(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ve(r){const t={};for(let e=0;e<r.length;e++){const n=Cs(r[e]);for(const i in n)t[i]=n[i]}return t}function AM(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function P_(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}const CM={clone:Cs,merge:Ve};var RM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,PM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gi extends Ki{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=RM,this.fragmentShader=PM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Cs(t.uniforms),this.uniformsGroups=AM(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class L_ extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=ai}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ti=new R,Ed=new lt,Sd=new lt;class ln extends L_{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Nu*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Pa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Nu*2*Math.atan(Math.tan(Pa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ti.x,Ti.y).multiplyScalar(-t/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ti.x,Ti.y).multiplyScalar(-t/Ti.z)}getViewSize(t,e){return this.getViewBounds(t,Ed,Sd),e.subVectors(Sd,Ed)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Pa*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Gr=-90,Wr=1;class LM extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ln(Gr,Wr,t,e);i.layers=this.layers,this.add(i);const s=new ln(Gr,Wr,t,e);s.layers=this.layers,this.add(s);const o=new ln(Gr,Wr,t,e);o.layers=this.layers,this.add(o);const a=new ln(Gr,Wr,t,e);a.layers=this.layers,this.add(a);const c=new ln(Gr,Wr,t,e);c.layers=this.layers,this.add(c);const l=new ln(Gr,Wr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,c]=e;for(const l of e)this.remove(l);if(t===ai)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ya)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class D_ extends Xe{constructor(t,e,n,i,s,o,a,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:Ts,super(t,e,n,i,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class DM extends Tr{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new D_(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Nn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new le(5,5,5),s=new Gi({name:"CubemapFromEquirect",uniforms:Cs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:We,blending:Ii});s.uniforms.tEquirect.value=e;const o=new mt(i,s),a=e.minFilter;return e.minFilter===pr&&(e.minFilter=Nn),new LM(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const hl=new R,IM=new R,NM=new Ut;class or{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=hl.subVectors(n,e).cross(IM.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(hl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||NM.getNormalMatrix(t),i=this.coplanarPoint(hl).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const nr=new Co,ra=new R;class Ph{constructor(t=new or,e=new or,n=new or,i=new or,s=new or,o=new or){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ai){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],c=i[3],l=i[4],u=i[5],h=i[6],f=i[7],d=i[8],g=i[9],_=i[10],p=i[11],m=i[12],y=i[13],v=i[14],E=i[15];if(n[0].setComponents(c-s,f-l,p-d,E-m).normalize(),n[1].setComponents(c+s,f+l,p+d,E+m).normalize(),n[2].setComponents(c+o,f+u,p+g,E+y).normalize(),n[3].setComponents(c-o,f-u,p-g,E-y).normalize(),n[4].setComponents(c-a,f-h,p-_,E-v).normalize(),e===ai)n[5].setComponents(c+a,f+h,p+_,E+v).normalize();else if(e===Ya)n[5].setComponents(a,h,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),nr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),nr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(nr)}intersectsSprite(t){return nr.center.set(0,0,0),nr.radius=.7071067811865476,nr.applyMatrix4(t.matrixWorld),this.intersectsSphere(nr)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(ra.x=i.normal.x>0?t.max.x:t.min.x,ra.y=i.normal.y>0?t.max.y:t.min.y,ra.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ra)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function I_(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function OM(r){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,h=l.byteLength,f=r.createBuffer();r.bindBuffer(c,f),r.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=r.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=r.SHORT;else if(l instanceof Uint32Array)d=r.UNSIGNED_INT;else if(l instanceof Int32Array)d=r.INT;else if(l instanceof Int8Array)d=r.BYTE;else if(l instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(r.bindBuffer(l,a),h.length===0)r.bufferSubData(l,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],_=h[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const _=h[d];r.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(r.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:s,update:o}}class Yn extends qt{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,u=c+1,h=t/a,f=e/c,d=[],g=[],_=[],p=[];for(let m=0;m<u;m++){const y=m*f-o;for(let v=0;v<l;v++){const E=v*h-s;g.push(E,-y,0),_.push(0,0,1),p.push(v/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let y=0;y<a;y++){const v=y+l*m,E=y+l*(m+1),w=y+1+l*(m+1),T=y+1+l*m;d.push(v,E,T),d.push(E,w,T)}this.setIndex(d),this.setAttribute("position",new Ft(g,3)),this.setAttribute("normal",new Ft(_,3)),this.setAttribute("uv",new Ft(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yn(t.width,t.height,t.widthSegments,t.heightSegments)}}var UM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,FM=`#ifdef USE_ALPHAHASH
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
#endif`,BM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,VM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,HM=`#ifdef USE_AOMAP
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
#endif`,GM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,WM=`#ifdef USE_BATCHING
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
#endif`,XM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$M=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,YM=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,KM=`#ifdef USE_IRIDESCENCE
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
#endif`,jM=`#ifdef USE_BUMPMAP
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
#endif`,JM=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ZM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,QM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,eT=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,nT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,iT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rT=`#if defined( USE_COLOR_ALPHA )
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
#endif`,sT=`#define PI 3.141592653589793
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
} // validated`,oT=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,aT=`vec3 transformedNormal = objectNormal;
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
#endif`,cT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,uT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fT="gl_FragColor = linearToOutputTexel( gl_FragColor );",dT=`
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
}`,pT=`#ifdef USE_ENVMAP
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
#endif`,mT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_T=`#ifdef USE_ENVMAP
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
#endif`,gT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vT=`#ifdef USE_ENVMAP
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
#endif`,xT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ET=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ST=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,MT=`#ifdef USE_GRADIENTMAP
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
}`,TT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,AT=`uniform bool receiveShadow;
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
#endif`,CT=`#ifdef USE_ENVMAP
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
#endif`,RT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,PT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,LT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,DT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,IT=`PhysicalMaterial material;
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
#endif`,NT=`struct PhysicalMaterial {
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
}`,OT=`
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
#endif`,UT=`#if defined( RE_IndirectDiffuse )
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
#endif`,FT=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,BT=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zT=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kT=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,VT=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,HT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,GT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,WT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,XT=`#if defined( USE_POINTS_UV )
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
#endif`,$T=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,YT=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,KT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,JT=`#ifdef USE_MORPHTARGETS
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
#endif`,ZT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,QT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,tb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,eb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ib=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rb=`#ifdef USE_NORMALMAP
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
#endif`,sb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ob=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ab=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ub=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,hb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,db=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_b=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,yb=`float getShadowMask() {
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
}`,Eb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sb=`#ifdef USE_SKINNING
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
#endif`,Mb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tb=`#ifdef USE_SKINNING
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
#endif`,bb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ab=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rb=`#ifdef USE_TRANSMISSION
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
#endif`,Pb=`#ifdef USE_TRANSMISSION
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
#endif`,Lb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Db=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ib=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ob=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ub=`uniform sampler2D t2D;
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
}`,Fb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,zb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vb=`#include <common>
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
}`,Hb=`#if DEPTH_PACKING == 3200
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
}`,Gb=`#define DISTANCE
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
}`,Wb=`#define DISTANCE
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
}`,Xb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$b=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qb=`uniform float scale;
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
}`,Yb=`uniform vec3 diffuse;
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
}`,Kb=`#include <common>
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
}`,jb=`uniform vec3 diffuse;
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
}`,Jb=`#define LAMBERT
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
}`,Zb=`#define LAMBERT
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
}`,Qb=`#define MATCAP
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
}`,tw=`#define MATCAP
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
}`,ew=`#define NORMAL
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
}`,nw=`#define NORMAL
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
}`,iw=`#define PHONG
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
}`,rw=`#define PHONG
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
}`,sw=`#define STANDARD
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
}`,ow=`#define STANDARD
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
}`,aw=`#define TOON
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
}`,cw=`#define TOON
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
}`,lw=`uniform float size;
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
}`,uw=`uniform vec3 diffuse;
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
}`,hw=`#include <common>
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
}`,fw=`uniform vec3 color;
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
}`,dw=`uniform float rotation;
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
}`,pw=`uniform vec3 diffuse;
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
}`,Ot={alphahash_fragment:UM,alphahash_pars_fragment:FM,alphamap_fragment:BM,alphamap_pars_fragment:zM,alphatest_fragment:kM,alphatest_pars_fragment:VM,aomap_fragment:HM,aomap_pars_fragment:GM,batching_pars_vertex:WM,batching_vertex:XM,begin_vertex:$M,beginnormal_vertex:qM,bsdfs:YM,iridescence_fragment:KM,bumpmap_pars_fragment:jM,clipping_planes_fragment:JM,clipping_planes_pars_fragment:ZM,clipping_planes_pars_vertex:QM,clipping_planes_vertex:tT,color_fragment:eT,color_pars_fragment:nT,color_pars_vertex:iT,color_vertex:rT,common:sT,cube_uv_reflection_fragment:oT,defaultnormal_vertex:aT,displacementmap_pars_vertex:cT,displacementmap_vertex:lT,emissivemap_fragment:uT,emissivemap_pars_fragment:hT,colorspace_fragment:fT,colorspace_pars_fragment:dT,envmap_fragment:pT,envmap_common_pars_fragment:mT,envmap_pars_fragment:_T,envmap_pars_vertex:gT,envmap_physical_pars_fragment:CT,envmap_vertex:vT,fog_vertex:xT,fog_pars_vertex:yT,fog_fragment:ET,fog_pars_fragment:ST,gradientmap_pars_fragment:MT,lightmap_pars_fragment:TT,lights_lambert_fragment:bT,lights_lambert_pars_fragment:wT,lights_pars_begin:AT,lights_toon_fragment:RT,lights_toon_pars_fragment:PT,lights_phong_fragment:LT,lights_phong_pars_fragment:DT,lights_physical_fragment:IT,lights_physical_pars_fragment:NT,lights_fragment_begin:OT,lights_fragment_maps:UT,lights_fragment_end:FT,logdepthbuf_fragment:BT,logdepthbuf_pars_fragment:zT,logdepthbuf_pars_vertex:kT,logdepthbuf_vertex:VT,map_fragment:HT,map_pars_fragment:GT,map_particle_fragment:WT,map_particle_pars_fragment:XT,metalnessmap_fragment:$T,metalnessmap_pars_fragment:qT,morphinstance_vertex:YT,morphcolor_vertex:KT,morphnormal_vertex:jT,morphtarget_pars_vertex:JT,morphtarget_vertex:ZT,normal_fragment_begin:QT,normal_fragment_maps:tb,normal_pars_fragment:eb,normal_pars_vertex:nb,normal_vertex:ib,normalmap_pars_fragment:rb,clearcoat_normal_fragment_begin:sb,clearcoat_normal_fragment_maps:ob,clearcoat_pars_fragment:ab,iridescence_pars_fragment:cb,opaque_fragment:lb,packing:ub,premultiplied_alpha_fragment:hb,project_vertex:fb,dithering_fragment:db,dithering_pars_fragment:pb,roughnessmap_fragment:mb,roughnessmap_pars_fragment:_b,shadowmap_pars_fragment:gb,shadowmap_pars_vertex:vb,shadowmap_vertex:xb,shadowmask_pars_fragment:yb,skinbase_vertex:Eb,skinning_pars_vertex:Sb,skinning_vertex:Mb,skinnormal_vertex:Tb,specularmap_fragment:bb,specularmap_pars_fragment:wb,tonemapping_fragment:Ab,tonemapping_pars_fragment:Cb,transmission_fragment:Rb,transmission_pars_fragment:Pb,uv_pars_fragment:Lb,uv_pars_vertex:Db,uv_vertex:Ib,worldpos_vertex:Nb,background_vert:Ob,background_frag:Ub,backgroundCube_vert:Fb,backgroundCube_frag:Bb,cube_vert:zb,cube_frag:kb,depth_vert:Vb,depth_frag:Hb,distanceRGBA_vert:Gb,distanceRGBA_frag:Wb,equirect_vert:Xb,equirect_frag:$b,linedashed_vert:qb,linedashed_frag:Yb,meshbasic_vert:Kb,meshbasic_frag:jb,meshlambert_vert:Jb,meshlambert_frag:Zb,meshmatcap_vert:Qb,meshmatcap_frag:tw,meshnormal_vert:ew,meshnormal_frag:nw,meshphong_vert:iw,meshphong_frag:rw,meshphysical_vert:sw,meshphysical_frag:ow,meshtoon_vert:aw,meshtoon_frag:cw,points_vert:lw,points_frag:uw,shadow_vert:hw,shadow_frag:fw,sprite_vert:dw,sprite_frag:pw},at={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},zn={basic:{uniforms:Ve([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:Ve([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:Ve([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:Ve([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:Ve([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:Ve([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:Ve([at.points,at.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:Ve([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:Ve([at.common,at.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:Ve([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:Ve([at.sprite,at.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:Ve([at.common,at.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:Ve([at.lights,at.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};zn.physical={uniforms:Ve([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};const sa={r:0,b:0,g:0},ir=new qn,mw=new ae;function _w(r,t,e,n,i,s,o){const a=new Bt(0);let c=s===!0?0:1,l,u,h=null,f=0,d=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?e:t).get(v)),v}function _(y){let v=!1;const E=g(y);E===null?m(a,c):E&&E.isColor&&(m(E,1),v=!0);const w=r.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(y,v){const E=g(v);E&&(E.isCubeTexture||E.mapping===uc)?(u===void 0&&(u=new mt(new le(1,1,1),new Gi({name:"BackgroundCubeMaterial",uniforms:Cs(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,T,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ir.copy(v.backgroundRotation),ir.x*=-1,ir.y*=-1,ir.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ir.y*=-1,ir.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(mw.makeRotationFromEuler(ir)),u.material.toneMapped=te.getTransfer(E.colorSpace)!==he,(h!==E||f!==E.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,h=E,f=E.version,d=r.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new mt(new Yn(2,2),new Gi({name:"BackgroundMaterial",uniforms:Cs(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=te.getTransfer(E.colorSpace)!==he,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(h!==E||f!==E.version||d!==r.toneMapping)&&(l.material.needsUpdate=!0,h=E,f=E.version,d=r.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,v){y.getRGB(sa,P_(r)),n.buffers.color.setClear(sa.r,sa.g,sa.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),c=v,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,m(a,c)},render:_,addToRenderList:p}}function gw(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(x,M,D,I,k){let F=!1;const O=h(I,D,M);s!==O&&(s=O,l(s.object)),F=d(x,I,D,k),F&&g(x,I,D,k),k!==null&&t.update(k,r.ELEMENT_ARRAY_BUFFER),(F||o)&&(o=!1,E(x,M,D,I),k!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function c(){return r.createVertexArray()}function l(x){return r.bindVertexArray(x)}function u(x){return r.deleteVertexArray(x)}function h(x,M,D){const I=D.wireframe===!0;let k=n[x.id];k===void 0&&(k={},n[x.id]=k);let F=k[M.id];F===void 0&&(F={},k[M.id]=F);let O=F[I];return O===void 0&&(O=f(c()),F[I]=O),O}function f(x){const M=[],D=[],I=[];for(let k=0;k<e;k++)M[k]=0,D[k]=0,I[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:M,enabledAttributes:D,attributeDivisors:I,object:x,attributes:{},index:null}}function d(x,M,D,I){const k=s.attributes,F=M.attributes;let O=0;const G=D.getAttributes();for(const H in G)if(G[H].location>=0){const st=k[H];let ct=F[H];if(ct===void 0&&(H==="instanceMatrix"&&x.instanceMatrix&&(ct=x.instanceMatrix),H==="instanceColor"&&x.instanceColor&&(ct=x.instanceColor)),st===void 0||st.attribute!==ct||ct&&st.data!==ct.data)return!0;O++}return s.attributesNum!==O||s.index!==I}function g(x,M,D,I){const k={},F=M.attributes;let O=0;const G=D.getAttributes();for(const H in G)if(G[H].location>=0){let st=F[H];st===void 0&&(H==="instanceMatrix"&&x.instanceMatrix&&(st=x.instanceMatrix),H==="instanceColor"&&x.instanceColor&&(st=x.instanceColor));const ct={};ct.attribute=st,st&&st.data&&(ct.data=st.data),k[H]=ct,O++}s.attributes=k,s.attributesNum=O,s.index=I}function _(){const x=s.newAttributes;for(let M=0,D=x.length;M<D;M++)x[M]=0}function p(x){m(x,0)}function m(x,M){const D=s.newAttributes,I=s.enabledAttributes,k=s.attributeDivisors;D[x]=1,I[x]===0&&(r.enableVertexAttribArray(x),I[x]=1),k[x]!==M&&(r.vertexAttribDivisor(x,M),k[x]=M)}function y(){const x=s.newAttributes,M=s.enabledAttributes;for(let D=0,I=M.length;D<I;D++)M[D]!==x[D]&&(r.disableVertexAttribArray(D),M[D]=0)}function v(x,M,D,I,k,F,O){O===!0?r.vertexAttribIPointer(x,M,D,k,F):r.vertexAttribPointer(x,M,D,I,k,F)}function E(x,M,D,I){_();const k=I.attributes,F=D.getAttributes(),O=M.defaultAttributeValues;for(const G in F){const H=F[G];if(H.location>=0){let et=k[G];if(et===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(et=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(et=x.instanceColor)),et!==void 0){const st=et.normalized,ct=et.itemSize,bt=t.get(et);if(bt===void 0)continue;const It=bt.buffer,N=bt.type,X=bt.bytesPerElement,Z=N===r.INT||N===r.UNSIGNED_INT||et.gpuType===Sh;if(et.isInterleavedBufferAttribute){const nt=et.data,St=nt.stride,wt=et.offset;if(nt.isInstancedInterleavedBuffer){for(let kt=0;kt<H.locationSize;kt++)m(H.location+kt,nt.meshPerAttribute);x.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let kt=0;kt<H.locationSize;kt++)p(H.location+kt);r.bindBuffer(r.ARRAY_BUFFER,It);for(let kt=0;kt<H.locationSize;kt++)v(H.location+kt,ct/H.locationSize,N,st,St*X,(wt+ct/H.locationSize*kt)*X,Z)}else{if(et.isInstancedBufferAttribute){for(let nt=0;nt<H.locationSize;nt++)m(H.location+nt,et.meshPerAttribute);x.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let nt=0;nt<H.locationSize;nt++)p(H.location+nt);r.bindBuffer(r.ARRAY_BUFFER,It);for(let nt=0;nt<H.locationSize;nt++)v(H.location+nt,ct/H.locationSize,N,st,ct*X,ct/H.locationSize*nt*X,Z)}}else if(O!==void 0){const st=O[G];if(st!==void 0)switch(st.length){case 2:r.vertexAttrib2fv(H.location,st);break;case 3:r.vertexAttrib3fv(H.location,st);break;case 4:r.vertexAttrib4fv(H.location,st);break;default:r.vertexAttrib1fv(H.location,st)}}}}y()}function w(){C();for(const x in n){const M=n[x];for(const D in M){const I=M[D];for(const k in I)u(I[k].object),delete I[k];delete M[D]}delete n[x]}}function T(x){if(n[x.id]===void 0)return;const M=n[x.id];for(const D in M){const I=M[D];for(const k in I)u(I[k].object),delete I[k];delete M[D]}delete n[x.id]}function S(x){for(const M in n){const D=n[M];if(D[x.id]===void 0)continue;const I=D[x.id];for(const k in I)u(I[k].object),delete I[k];delete D[x.id]}}function C(){L(),o=!0,s!==i&&(s=i,l(s.object))}function L(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:L,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfProgram:S,initAttributes:_,enableAttribute:p,disableUnusedAttributes:y}}function vw(r,t,e){let n;function i(l){n=l}function s(l,u){r.drawArrays(n,l,u),e.update(u,n,1)}function o(l,u,h){h!==0&&(r.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function a(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];e.update(d,n,1)}function c(l,u,h,f){if(h===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_];for(let _=0;_<f.length;_++)e.update(g,n,f[_])}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function xw(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const S=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(S){return!(S!==On&&n.convert(S)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(S){const C=S===bo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(S!==pi&&n.convert(S)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==oi&&!C)}function c(S){if(S==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(f===!0){const S=t.get("EXT_clip_control");S.clipControlEXT(S.LOWER_LEFT_EXT,S.ZERO_TO_ONE_EXT)}const d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),y=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),E=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,T=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:E,vertexTextures:w,maxSamples:T}}function yw(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new or,a=new Ut,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,_=h.clipIntersection,p=h.clipShadows,m=r.get(h);if(!i||g===null||g.length===0||s&&!p)s?u(null):l();else{const y=s?0:n,v=y*4;let E=m.clippingState||null;c.value=E,E=u(g,f,v,d);for(let w=0;w!==v;++w)E[w]=e[w];m.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,d,g){const _=h!==null?h.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const m=d+_*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,E=d;v!==_;++v,E+=4)o.copy(h[v]).applyMatrix4(y,a),o.normal.toArray(p,E),p[E+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function Ew(r){let t=new WeakMap;function e(o,a){return a===iu?o.mapping=Ts:a===ru&&(o.mapping=bs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===iu||a===ru)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new DM(c.height);return l.fromEquirectangularTexture(r,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class N_ extends L_{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ns=4,Md=[.125,.215,.35,.446,.526,.582],lr=20,fl=new N_,Td=new Bt;let dl=null,pl=0,ml=0,_l=!1;const ar=(1+Math.sqrt(5))/2,Xr=1/ar,bd=[new R(-ar,Xr,0),new R(ar,Xr,0),new R(-Xr,0,ar),new R(Xr,0,ar),new R(0,ar,-Xr),new R(0,ar,Xr),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)];class wd{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){dl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),_l=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(dl,pl,ml),this._renderer.xr.enabled=_l,t.scissorTest=!1,oa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ts||t.mapping===bs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),dl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),_l=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Nn,minFilter:Nn,generateMipmaps:!1,type:bo,format:On,colorSpace:Yi,depthBuffer:!1},i=Ad(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ad(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Sw(s)),this._blurMaterial=Mw(s,t,e)}return i}_compileMaterial(t){const e=new mt(this._lodPlanes[0],t);this._renderer.compile(e,fl)}_sceneToCubeUV(t,e,n,i){const a=new ln(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Td),u.toneMapping=Ni,u.autoClear=!1;const d=new _i({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1}),g=new mt(new le,d);let _=!1;const p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,_=!0):(d.color.copy(Td),_=!0);for(let m=0;m<6;m++){const y=m%3;y===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):y===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));const v=this._cubeSize;oa(i,y*v,m>2?v:0,v,v),u.setRenderTarget(i),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Ts||t.mapping===bs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cd());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new mt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;oa(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,fl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=bd[(i-s-1)%bd.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new mt(this._lodPlanes[i],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*lr-1),_=s/g,p=isFinite(s)?1+Math.floor(u*_):lr;p>lr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${lr}`);const m=[];let y=0;for(let S=0;S<lr;++S){const C=S/_,L=Math.exp(-C*C/2);m.push(L),S===0?y+=L:S<p&&(y+=2*L)}for(let S=0;S<m.length;S++)m[S]=m[S]/y;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const E=this._sizeLods[i],w=3*E*(i>v-ns?i-v+ns:0),T=4*(this._cubeSize-E);oa(e,w,T,3*E,2*E),c.setRenderTarget(e),c.render(h,fl)}}function Sw(r){const t=[],e=[],n=[];let i=r;const s=r-ns+1+Md.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>r-ns?c=Md[o-r+ns-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,p=2,m=1,y=new Float32Array(_*g*d),v=new Float32Array(p*g*d),E=new Float32Array(m*g*d);for(let T=0;T<d;T++){const S=T%3*2/3-1,C=T>2?0:-1,L=[S,C,0,S+2/3,C,0,S+2/3,C+1,0,S,C,0,S+2/3,C+1,0,S,C+1,0];y.set(L,_*g*T),v.set(f,p*g*T);const x=[T,T,T,T,T,T];E.set(x,m*g*T)}const w=new qt;w.setAttribute("position",new tn(y,_)),w.setAttribute("uv",new tn(v,p)),w.setAttribute("faceIndex",new tn(E,m)),t.push(w),i>ns&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ad(r,t,e){const n=new Tr(r,t,e);return n.texture.mapping=uc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function oa(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Mw(r,t,e){const n=new Float32Array(lr),i=new R(0,1,0);return new Gi({name:"SphericalGaussianBlur",defines:{n:lr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Lh(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Cd(){return new Gi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Lh(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Rd(){return new Gi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Lh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Lh(){return`

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
	`}function Tw(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===iu||c===ru,u=c===Ts||c===bs;if(l||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new wd(r)),h=l?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&i(d)?(e===null&&(e=new wd(r)),h=l?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function i(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function bw(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&La("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function ww(r,t,e,n){const i={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)t.remove(_[p])}f.removeEventListener("dispose",o),delete i[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)t.update(f[g],r.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const _=d[g];for(let p=0,m=_.length;p<m;p++)t.update(_[p],r.ARRAY_BUFFER)}}function l(h){const f=[],d=h.index,g=h.attributes.position;let _=0;if(d!==null){const y=d.array;_=d.version;for(let v=0,E=y.length;v<E;v+=3){const w=y[v+0],T=y[v+1],S=y[v+2];f.push(w,T,T,S,S,w)}}else if(g!==void 0){const y=g.array;_=g.version;for(let v=0,E=y.length/3-1;v<E;v+=3){const w=v+0,T=v+1,S=v+2;f.push(w,T,T,S,S,w)}}else return;const p=new(M_(f)?R_:C_)(f,1);p.version=_;const m=s.get(h);m&&t.remove(m),s.set(h,p)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Aw(r,t,e){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,d){r.drawElements(n,d,s,f*o),e.update(d,n,1)}function l(f,d,g){g!==0&&(r.drawElementsInstanced(n,d,s,f*o,g),e.update(d,n,g))}function u(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];e.update(p,n,1)}function h(f,d,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)l(f[m]/o,d[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,_,0,g);let m=0;for(let y=0;y<g;y++)m+=d[y];for(let y=0;y<_.length;y++)e.update(m,n,_[y])}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Cw(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Rw(r,t,e){const n=new WeakMap,i=new ie;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let x=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var d=x;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let E=0;g===!0&&(E=1),_===!0&&(E=2),p===!0&&(E=3);let w=a.attributes.position.count*E,T=1;w>t.maxTextureSize&&(T=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const S=new Float32Array(w*T*4*h),C=new b_(S,w,T,h);C.type=oi,C.needsUpdate=!0;const L=E*4;for(let M=0;M<h;M++){const D=m[M],I=y[M],k=v[M],F=w*T*4*M;for(let O=0;O<D.count;O++){const G=O*L;g===!0&&(i.fromBufferAttribute(D,O),S[F+G+0]=i.x,S[F+G+1]=i.y,S[F+G+2]=i.z,S[F+G+3]=0),_===!0&&(i.fromBufferAttribute(I,O),S[F+G+4]=i.x,S[F+G+5]=i.y,S[F+G+6]=i.z,S[F+G+7]=0),p===!0&&(i.fromBufferAttribute(k,O),S[F+G+8]=i.x,S[F+G+9]=i.y,S[F+G+10]=i.z,S[F+G+11]=k.itemSize===4?i.w:1)}}f={count:h,texture:C,size:new lt(w,T)},n.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(r,"morphTargetBaseInfluence",_),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function Pw(r,t,e,n){let i=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(i.get(h)!==l&&(t.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return h}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}class O_ extends Xe{constructor(t,e,n,i,s,o,a,c,l,u=cs){if(u!==cs&&u!==As)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===cs&&(n=Mr),n===void 0&&u===As&&(n=ws),super(null,i,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:bn,this.minFilter=c!==void 0?c:bn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const U_=new Xe,Pd=new O_(1,1),F_=new b_,B_=new _M,z_=new D_,Ld=[],Dd=[],Id=new Float32Array(16),Nd=new Float32Array(9),Od=new Float32Array(4);function Us(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Ld[i];if(s===void 0&&(s=new Float32Array(i),Ld[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function be(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function we(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function fc(r,t){let e=Dd[t];e===void 0&&(e=new Int32Array(t),Dd[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function Lw(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Dw(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;r.uniform2fv(this.addr,t),we(e,t)}}function Iw(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;r.uniform3fv(this.addr,t),we(e,t)}}function Nw(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;r.uniform4fv(this.addr,t),we(e,t)}}function Ow(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),we(e,t)}else{if(be(e,n))return;Od.set(n),r.uniformMatrix2fv(this.addr,!1,Od),we(e,n)}}function Uw(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),we(e,t)}else{if(be(e,n))return;Nd.set(n),r.uniformMatrix3fv(this.addr,!1,Nd),we(e,n)}}function Fw(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),we(e,t)}else{if(be(e,n))return;Id.set(n),r.uniformMatrix4fv(this.addr,!1,Id),we(e,n)}}function Bw(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function zw(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;r.uniform2iv(this.addr,t),we(e,t)}}function kw(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;r.uniform3iv(this.addr,t),we(e,t)}}function Vw(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;r.uniform4iv(this.addr,t),we(e,t)}}function Hw(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function Gw(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;r.uniform2uiv(this.addr,t),we(e,t)}}function Ww(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;r.uniform3uiv(this.addr,t),we(e,t)}}function Xw(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;r.uniform4uiv(this.addr,t),we(e,t)}}function $w(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Pd.compareFunction=S_,s=Pd):s=U_,e.setTexture2D(t||s,i)}function qw(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||B_,i)}function Yw(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||z_,i)}function Kw(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||F_,i)}function jw(r){switch(r){case 5126:return Lw;case 35664:return Dw;case 35665:return Iw;case 35666:return Nw;case 35674:return Ow;case 35675:return Uw;case 35676:return Fw;case 5124:case 35670:return Bw;case 35667:case 35671:return zw;case 35668:case 35672:return kw;case 35669:case 35673:return Vw;case 5125:return Hw;case 36294:return Gw;case 36295:return Ww;case 36296:return Xw;case 35678:case 36198:case 36298:case 36306:case 35682:return $w;case 35679:case 36299:case 36307:return qw;case 35680:case 36300:case 36308:case 36293:return Yw;case 36289:case 36303:case 36311:case 36292:return Kw}}function Jw(r,t){r.uniform1fv(this.addr,t)}function Zw(r,t){const e=Us(t,this.size,2);r.uniform2fv(this.addr,e)}function Qw(r,t){const e=Us(t,this.size,3);r.uniform3fv(this.addr,e)}function tA(r,t){const e=Us(t,this.size,4);r.uniform4fv(this.addr,e)}function eA(r,t){const e=Us(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function nA(r,t){const e=Us(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function iA(r,t){const e=Us(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function rA(r,t){r.uniform1iv(this.addr,t)}function sA(r,t){r.uniform2iv(this.addr,t)}function oA(r,t){r.uniform3iv(this.addr,t)}function aA(r,t){r.uniform4iv(this.addr,t)}function cA(r,t){r.uniform1uiv(this.addr,t)}function lA(r,t){r.uniform2uiv(this.addr,t)}function uA(r,t){r.uniform3uiv(this.addr,t)}function hA(r,t){r.uniform4uiv(this.addr,t)}function fA(r,t,e){const n=this.cache,i=t.length,s=fc(e,i);be(n,s)||(r.uniform1iv(this.addr,s),we(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||U_,s[o])}function dA(r,t,e){const n=this.cache,i=t.length,s=fc(e,i);be(n,s)||(r.uniform1iv(this.addr,s),we(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||B_,s[o])}function pA(r,t,e){const n=this.cache,i=t.length,s=fc(e,i);be(n,s)||(r.uniform1iv(this.addr,s),we(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||z_,s[o])}function mA(r,t,e){const n=this.cache,i=t.length,s=fc(e,i);be(n,s)||(r.uniform1iv(this.addr,s),we(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||F_,s[o])}function _A(r){switch(r){case 5126:return Jw;case 35664:return Zw;case 35665:return Qw;case 35666:return tA;case 35674:return eA;case 35675:return nA;case 35676:return iA;case 5124:case 35670:return rA;case 35667:case 35671:return sA;case 35668:case 35672:return oA;case 35669:case 35673:return aA;case 5125:return cA;case 36294:return lA;case 36295:return uA;case 36296:return hA;case 35678:case 36198:case 36298:case 36306:case 35682:return fA;case 35679:case 36299:case 36307:return dA;case 35680:case 36300:case 36308:case 36293:return pA;case 36289:case 36303:case 36311:case 36292:return mA}}class gA{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=jw(e.type)}}class vA{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=_A(e.type)}}class xA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const gl=/(\w+)(\])?(\[|\.)?/g;function Ud(r,t){r.seq.push(t),r.map[t.id]=t}function yA(r,t,e){const n=r.name,i=n.length;for(gl.lastIndex=0;;){const s=gl.exec(n),o=gl.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Ud(e,l===void 0?new gA(a,r,t):new vA(a,r,t));break}else{let h=e.map[a];h===void 0&&(h=new xA(a),Ud(e,h)),e=h}}}class Da{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);yA(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Fd(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const EA=37297;let SA=0;function MA(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function TA(r){const t=te.getPrimaries(te.workingColorSpace),e=te.getPrimaries(r);let n;switch(t===e?n="":t===qa&&e===$a?n="LinearDisplayP3ToLinearSRGB":t===$a&&e===qa&&(n="LinearSRGBToLinearDisplayP3"),r){case Yi:case hc:return[n,"LinearTransferOETF"];case cn:case Ch:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Bd(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+MA(r.getShaderSource(t),o)}else return i}function bA(r,t){const e=TA(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function wA(r,t){let e;switch(t){case GS:e="Linear";break;case WS:e="Reinhard";break;case XS:e="Cineon";break;case l_:e="ACESFilmic";break;case qS:e="AgX";break;case YS:e="Neutral";break;case $S:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const aa=new R;function AA(){te.getLuminanceCoefficients(aa);const r=aa.x.toFixed(4),t=aa.y.toFixed(4),e=aa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function CA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zs).join(`
`)}function RA(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function PA(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function Zs(r){return r!==""}function zd(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function kd(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const LA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ou(r){return r.replace(LA,IA)}const DA=new Map;function IA(r,t){let e=Ot[t];if(e===void 0){const n=DA.get(t);if(n!==void 0)e=Ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ou(e)}const NA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vd(r){return r.replace(NA,OA)}function OA(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Hd(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function UA(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===a_?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===SS?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===ii&&(t="SHADOWMAP_TYPE_VSM"),t}function FA(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Ts:case bs:t="ENVMAP_TYPE_CUBE";break;case uc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function BA(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case bs:t="ENVMAP_MODE_REFRACTION";break}return t}function zA(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case c_:t="ENVMAP_BLENDING_MULTIPLY";break;case VS:t="ENVMAP_BLENDING_MIX";break;case HS:t="ENVMAP_BLENDING_ADD";break}return t}function kA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function VA(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=UA(e),l=FA(e),u=BA(e),h=zA(e),f=kA(e),d=CA(e),g=RA(s),_=i.createProgram();let p,m,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Zs).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Zs).join(`
`),m.length>0&&(m+=`
`)):(p=[Hd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zs).join(`
`),m=[Hd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ni?"#define TONE_MAPPING":"",e.toneMapping!==Ni?Ot.tonemapping_pars_fragment:"",e.toneMapping!==Ni?wA("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,bA("linearToOutputTexel",e.outputColorSpace),AA(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Zs).join(`
`)),o=Ou(o),o=zd(o,e),o=kd(o,e),a=Ou(a),a=zd(a,e),a=kd(a,e),o=Vd(o),a=Vd(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===sd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=y+p+o,E=y+m+a,w=Fd(i,i.VERTEX_SHADER,v),T=Fd(i,i.FRAGMENT_SHADER,E);i.attachShader(_,w),i.attachShader(_,T),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function S(M){if(r.debug.checkShaderErrors){const D=i.getProgramInfoLog(_).trim(),I=i.getShaderInfoLog(w).trim(),k=i.getShaderInfoLog(T).trim();let F=!0,O=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(F=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,w,T);else{const G=Bd(i,w,"vertex"),H=Bd(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+D+`
`+G+`
`+H)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(I===""||k==="")&&(O=!1);O&&(M.diagnostics={runnable:F,programLog:D,vertexShader:{log:I,prefix:p},fragmentShader:{log:k,prefix:m}})}i.deleteShader(w),i.deleteShader(T),C=new Da(i,_),L=PA(i,_)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let L;this.getAttributes=function(){return L===void 0&&S(this),L};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(_,EA)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=SA++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=T,this}let HA=0;class GA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new WA(t),e.set(t,n)),n}}class WA{constructor(t){this.id=HA++,this.code=t,this.usedTimes=0}}function XA(r,t,e,n,i,s,o){const a=new w_,c=new GA,l=new Set,u=[],h=i.logarithmicDepthBuffer,f=i.reverseDepthBuffer,d=i.vertexTextures;let g=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,M,D,I,k){const F=I.fog,O=k.geometry,G=x.isMeshStandardMaterial?I.environment:null,H=(x.isMeshStandardMaterial?e:t).get(x.envMap||G),et=H&&H.mapping===uc?H.image.height:null,st=_[x.type];x.precision!==null&&(g=i.getMaxPrecision(x.precision),g!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",g,"instead."));const ct=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,bt=ct!==void 0?ct.length:0;let It=0;O.morphAttributes.position!==void 0&&(It=1),O.morphAttributes.normal!==void 0&&(It=2),O.morphAttributes.color!==void 0&&(It=3);let N,X,Z,nt;if(st){const qe=zn[st];N=qe.vertexShader,X=qe.fragmentShader}else N=x.vertexShader,X=x.fragmentShader,c.update(x),Z=c.getVertexShaderID(x),nt=c.getFragmentShaderID(x);const St=r.getRenderTarget(),wt=k.isInstancedMesh===!0,kt=k.isBatchedMesh===!0,Yt=!!x.map,Vt=!!x.matcap,U=!!H,ze=!!x.aoMap,zt=!!x.lightMap,Ht=!!x.bumpMap,At=!!x.normalMap,re=!!x.displacementMap,Rt=!!x.emissiveMap,P=!!x.metalnessMap,b=!!x.roughnessMap,W=x.anisotropy>0,j=x.clearcoat>0,tt=x.dispersion>0,K=x.iridescence>0,xt=x.sheen>0,ot=x.transmission>0,ft=W&&!!x.anisotropyMap,Kt=j&&!!x.clearcoatMap,it=j&&!!x.clearcoatNormalMap,_t=j&&!!x.clearcoatRoughnessMap,Lt=K&&!!x.iridescenceMap,Dt=K&&!!x.iridescenceThicknessMap,gt=xt&&!!x.sheenColorMap,Wt=xt&&!!x.sheenRoughnessMap,Nt=!!x.specularMap,ce=!!x.specularColorMap,B=!!x.specularIntensityMap,dt=ot&&!!x.transmissionMap,Y=ot&&!!x.thicknessMap,J=!!x.gradientMap,ut=!!x.alphaMap,pt=x.alphaTest>0,$t=!!x.alphaHash,Ee=!!x.extensions;let $e=Ni;x.toneMapped&&(St===null||St.isXRRenderTarget===!0)&&($e=r.toneMapping);const Jt={shaderID:st,shaderType:x.type,shaderName:x.name,vertexShader:N,fragmentShader:X,defines:x.defines,customVertexShaderID:Z,customFragmentShaderID:nt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:g,batching:kt,batchingColor:kt&&k._colorsTexture!==null,instancing:wt,instancingColor:wt&&k.instanceColor!==null,instancingMorph:wt&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:St===null?r.outputColorSpace:St.isXRRenderTarget===!0?St.texture.colorSpace:Yi,alphaToCoverage:!!x.alphaToCoverage,map:Yt,matcap:Vt,envMap:U,envMapMode:U&&H.mapping,envMapCubeUVHeight:et,aoMap:ze,lightMap:zt,bumpMap:Ht,normalMap:At,displacementMap:d&&re,emissiveMap:Rt,normalMapObjectSpace:At&&x.normalMapType===ZS,normalMapTangentSpace:At&&x.normalMapType===E_,metalnessMap:P,roughnessMap:b,anisotropy:W,anisotropyMap:ft,clearcoat:j,clearcoatMap:Kt,clearcoatNormalMap:it,clearcoatRoughnessMap:_t,dispersion:tt,iridescence:K,iridescenceMap:Lt,iridescenceThicknessMap:Dt,sheen:xt,sheenColorMap:gt,sheenRoughnessMap:Wt,specularMap:Nt,specularColorMap:ce,specularIntensityMap:B,transmission:ot,transmissionMap:dt,thicknessMap:Y,gradientMap:J,opaque:x.transparent===!1&&x.blending===as&&x.alphaToCoverage===!1,alphaMap:ut,alphaTest:pt,alphaHash:$t,combine:x.combine,mapUv:Yt&&p(x.map.channel),aoMapUv:ze&&p(x.aoMap.channel),lightMapUv:zt&&p(x.lightMap.channel),bumpMapUv:Ht&&p(x.bumpMap.channel),normalMapUv:At&&p(x.normalMap.channel),displacementMapUv:re&&p(x.displacementMap.channel),emissiveMapUv:Rt&&p(x.emissiveMap.channel),metalnessMapUv:P&&p(x.metalnessMap.channel),roughnessMapUv:b&&p(x.roughnessMap.channel),anisotropyMapUv:ft&&p(x.anisotropyMap.channel),clearcoatMapUv:Kt&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:it&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Lt&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:Wt&&p(x.sheenRoughnessMap.channel),specularMapUv:Nt&&p(x.specularMap.channel),specularColorMapUv:ce&&p(x.specularColorMap.channel),specularIntensityMapUv:B&&p(x.specularIntensityMap.channel),transmissionMapUv:dt&&p(x.transmissionMap.channel),thicknessMapUv:Y&&p(x.thicknessMap.channel),alphaMapUv:ut&&p(x.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(At||W),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!O.attributes.uv&&(Yt||ut),fog:!!F,useFog:x.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:f,skinning:k.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:It,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&D.length>0,shadowMapType:r.shadowMap.type,toneMapping:$e,decodeVideoTexture:Yt&&x.map.isVideoTexture===!0&&te.getTransfer(x.map.colorSpace)===he,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Fe,flipSided:x.side===We,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Ee&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ee&&x.extensions.multiDraw===!0||kt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Jt.vertexUv1s=l.has(1),Jt.vertexUv2s=l.has(2),Jt.vertexUv3s=l.has(3),l.clear(),Jt}function y(x){const M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(const D in x.defines)M.push(D),M.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(v(M,x),E(M,x),M.push(r.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function v(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function E(x,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.alphaToCoverage&&a.enable(20),x.push(a.mask)}function w(x){const M=_[x.type];let D;if(M){const I=zn[M];D=CM.clone(I.uniforms)}else D=x.uniforms;return D}function T(x,M){let D;for(let I=0,k=u.length;I<k;I++){const F=u[I];if(F.cacheKey===M){D=F,++D.usedTimes;break}}return D===void 0&&(D=new VA(r,M,x,s),u.push(D)),D}function S(x){if(--x.usedTimes===0){const M=u.indexOf(x);u[M]=u[u.length-1],u.pop(),x.destroy()}}function C(x){c.remove(x)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:y,getUniforms:w,acquireProgram:T,releaseProgram:S,releaseShaderCache:C,programs:u,dispose:L}}function $A(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,c){r.get(o)[a]=c}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function qA(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Gd(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Wd(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(h,f,d,g,_,p){let m=r[t];return m===void 0?(m={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:p},r[t]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=_,m.group=p),t++,m}function a(h,f,d,g,_,p){const m=o(h,f,d,g,_,p);d.transmission>0?n.push(m):d.transparent===!0?i.push(m):e.push(m)}function c(h,f,d,g,_,p){const m=o(h,f,d,g,_,p);d.transmission>0?n.unshift(m):d.transparent===!0?i.unshift(m):e.unshift(m)}function l(h,f){e.length>1&&e.sort(h||qA),n.length>1&&n.sort(f||Gd),i.length>1&&i.sort(f||Gd)}function u(){for(let h=t,f=r.length;h<f;h++){const d=r[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:u,sort:l}}function YA(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new Wd,r.set(n,[o])):i>=s.length?(o=new Wd,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function KA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new Bt};break;case"SpotLight":e={position:new R,direction:new R,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new R,halfWidth:new R,halfHeight:new R};break}return r[t.id]=e,e}}}function jA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let JA=0;function ZA(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function QA(r){const t=new KA,e=jA(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);const i=new R,s=new ae,o=new ae;function a(l){let u=0,h=0,f=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let d=0,g=0,_=0,p=0,m=0,y=0,v=0,E=0,w=0,T=0,S=0;l.sort(ZA);for(let L=0,x=l.length;L<x;L++){const M=l[L],D=M.color,I=M.intensity,k=M.distance,F=M.shadow&&M.shadow.map?M.shadow.map.texture:null;if(M.isAmbientLight)u+=D.r*I,h+=D.g*I,f+=D.b*I;else if(M.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(M.sh.coefficients[O],I);S++}else if(M.isDirectionalLight){const O=t.get(M);if(O.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const G=M.shadow,H=e.get(M);H.shadowIntensity=G.intensity,H.shadowBias=G.bias,H.shadowNormalBias=G.normalBias,H.shadowRadius=G.radius,H.shadowMapSize=G.mapSize,n.directionalShadow[d]=H,n.directionalShadowMap[d]=F,n.directionalShadowMatrix[d]=M.shadow.matrix,y++}n.directional[d]=O,d++}else if(M.isSpotLight){const O=t.get(M);O.position.setFromMatrixPosition(M.matrixWorld),O.color.copy(D).multiplyScalar(I),O.distance=k,O.coneCos=Math.cos(M.angle),O.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),O.decay=M.decay,n.spot[_]=O;const G=M.shadow;if(M.map&&(n.spotLightMap[w]=M.map,w++,G.updateMatrices(M),M.castShadow&&T++),n.spotLightMatrix[_]=G.matrix,M.castShadow){const H=e.get(M);H.shadowIntensity=G.intensity,H.shadowBias=G.bias,H.shadowNormalBias=G.normalBias,H.shadowRadius=G.radius,H.shadowMapSize=G.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=F,E++}_++}else if(M.isRectAreaLight){const O=t.get(M);O.color.copy(D).multiplyScalar(I),O.halfWidth.set(M.width*.5,0,0),O.halfHeight.set(0,M.height*.5,0),n.rectArea[p]=O,p++}else if(M.isPointLight){const O=t.get(M);if(O.color.copy(M.color).multiplyScalar(M.intensity),O.distance=M.distance,O.decay=M.decay,M.castShadow){const G=M.shadow,H=e.get(M);H.shadowIntensity=G.intensity,H.shadowBias=G.bias,H.shadowNormalBias=G.normalBias,H.shadowRadius=G.radius,H.shadowMapSize=G.mapSize,H.shadowCameraNear=G.camera.near,H.shadowCameraFar=G.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=F,n.pointShadowMatrix[g]=M.shadow.matrix,v++}n.point[g]=O,g++}else if(M.isHemisphereLight){const O=t.get(M);O.skyColor.copy(M.color).multiplyScalar(I),O.groundColor.copy(M.groundColor).multiplyScalar(I),n.hemi[m]=O,m++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const C=n.hash;(C.directionalLength!==d||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==p||C.hemiLength!==m||C.numDirectionalShadows!==y||C.numPointShadows!==v||C.numSpotShadows!==E||C.numSpotMaps!==w||C.numLightProbes!==S)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=E,n.spotShadowMap.length=E,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=E+w-T,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=S,C.directionalLength=d,C.pointLength=g,C.spotLength=_,C.rectAreaLength=p,C.hemiLength=m,C.numDirectionalShadows=y,C.numPointShadows=v,C.numSpotShadows=E,C.numSpotMaps=w,C.numLightProbes=S,n.version=JA++)}function c(l,u){let h=0,f=0,d=0,g=0,_=0;const p=u.matrixWorldInverse;for(let m=0,y=l.length;m<y;m++){const v=l[m];if(v.isDirectionalLight){const E=n.directional[h];E.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(p),h++}else if(v.isSpotLight){const E=n.spot[d];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(p),d++}else if(v.isRectAreaLight){const E=n.rectArea[g];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),o.identity(),s.copy(v.matrixWorld),s.premultiply(p),o.extractRotation(s),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const E=n.point[f];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const E=n.hemi[_];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(p),_++}}}return{setup:a,setupView:c,state:n}}function Xd(r){const t=new QA(r),e=[],n=[];function i(u){l.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function t1(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new Xd(r),t.set(i,[a])):s>=o.length?(a=new Xd(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class e1 extends Ki{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class n1 extends Ki{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const i1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,r1=`uniform sampler2D shadow_pass;
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
}`;function s1(r,t,e){let n=new Ph;const i=new lt,s=new lt,o=new ie,a=new e1({depthPacking:JS}),c=new n1,l={},u=e.maxTextureSize,h={[Hi]:We,[We]:Hi,[Fe]:Fe},f=new Gi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:i1,fragmentShader:r1}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new qt;g.setAttribute("position",new tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new mt(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=a_;let m=this.type;this.render=function(T,S,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const L=r.getRenderTarget(),x=r.getActiveCubeFace(),M=r.getActiveMipmapLevel(),D=r.state;D.setBlending(Ii),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const I=m!==ii&&this.type===ii,k=m===ii&&this.type!==ii;for(let F=0,O=T.length;F<O;F++){const G=T[F],H=G.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const et=H.getFrameExtents();if(i.multiply(et),s.copy(H.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/et.x),i.x=s.x*et.x,H.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/et.y),i.y=s.y*et.y,H.mapSize.y=s.y)),H.map===null||I===!0||k===!0){const ct=this.type!==ii?{minFilter:bn,magFilter:bn}:{};H.map!==null&&H.map.dispose(),H.map=new Tr(i.x,i.y,ct),H.map.texture.name=G.name+".shadowMap",H.camera.updateProjectionMatrix()}r.setRenderTarget(H.map),r.clear();const st=H.getViewportCount();for(let ct=0;ct<st;ct++){const bt=H.getViewport(ct);o.set(s.x*bt.x,s.y*bt.y,s.x*bt.z,s.y*bt.w),D.viewport(o),H.updateMatrices(G,ct),n=H.getFrustum(),E(S,C,H.camera,G,this.type)}H.isPointLightShadow!==!0&&this.type===ii&&y(H,C),H.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(L,x,M)};function y(T,S){const C=t.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Tr(i.x,i.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(S,null,C,f,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(S,null,C,d,_,null)}function v(T,S,C,L){let x=null;const M=C.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(M!==void 0)x=M;else if(x=C.isPointLight===!0?c:a,r.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const D=x.uuid,I=S.uuid;let k=l[D];k===void 0&&(k={},l[D]=k);let F=k[I];F===void 0&&(F=x.clone(),k[I]=F,S.addEventListener("dispose",w)),x=F}if(x.visible=S.visible,x.wireframe=S.wireframe,L===ii?x.side=S.shadowSide!==null?S.shadowSide:S.side:x.side=S.shadowSide!==null?S.shadowSide:h[S.side],x.alphaMap=S.alphaMap,x.alphaTest=S.alphaTest,x.map=S.map,x.clipShadows=S.clipShadows,x.clippingPlanes=S.clippingPlanes,x.clipIntersection=S.clipIntersection,x.displacementMap=S.displacementMap,x.displacementScale=S.displacementScale,x.displacementBias=S.displacementBias,x.wireframeLinewidth=S.wireframeLinewidth,x.linewidth=S.linewidth,C.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const D=r.properties.get(x);D.light=C}return x}function E(T,S,C,L,x){if(T.visible===!1)return;if(T.layers.test(S.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&x===ii)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,T.matrixWorld);const I=t.update(T),k=T.material;if(Array.isArray(k)){const F=I.groups;for(let O=0,G=F.length;O<G;O++){const H=F[O],et=k[H.materialIndex];if(et&&et.visible){const st=v(T,et,L,x);T.onBeforeShadow(r,T,S,C,I,st,H),r.renderBufferDirect(C,null,I,st,T,H),T.onAfterShadow(r,T,S,C,I,st,H)}}}else if(k.visible){const F=v(T,k,L,x);T.onBeforeShadow(r,T,S,C,I,F,null),r.renderBufferDirect(C,null,I,F,T,null),T.onAfterShadow(r,T,S,C,I,F,null)}}const D=T.children;for(let I=0,k=D.length;I<k;I++)E(D[I],S,C,L,x)}function w(T){T.target.removeEventListener("dispose",w);for(const C in l){const L=l[C],x=T.target.uuid;x in L&&(L[x].dispose(),delete L[x])}}}const o1={[jl]:Jl,[Zl]:eu,[Ql]:nu,[Ms]:tu,[Jl]:jl,[eu]:Zl,[nu]:Ql,[tu]:Ms};function a1(r){function t(){let B=!1;const dt=new ie;let Y=null;const J=new ie(0,0,0,0);return{setMask:function(ut){Y!==ut&&!B&&(r.colorMask(ut,ut,ut,ut),Y=ut)},setLocked:function(ut){B=ut},setClear:function(ut,pt,$t,Ee,$e){$e===!0&&(ut*=Ee,pt*=Ee,$t*=Ee),dt.set(ut,pt,$t,Ee),J.equals(dt)===!1&&(r.clearColor(ut,pt,$t,Ee),J.copy(dt))},reset:function(){B=!1,Y=null,J.set(-1,0,0,0)}}}function e(){let B=!1,dt=!1,Y=null,J=null,ut=null;return{setReversed:function(pt){dt=pt},setTest:function(pt){pt?Z(r.DEPTH_TEST):nt(r.DEPTH_TEST)},setMask:function(pt){Y!==pt&&!B&&(r.depthMask(pt),Y=pt)},setFunc:function(pt){if(dt&&(pt=o1[pt]),J!==pt){switch(pt){case jl:r.depthFunc(r.NEVER);break;case Jl:r.depthFunc(r.ALWAYS);break;case Zl:r.depthFunc(r.LESS);break;case Ms:r.depthFunc(r.LEQUAL);break;case Ql:r.depthFunc(r.EQUAL);break;case tu:r.depthFunc(r.GEQUAL);break;case eu:r.depthFunc(r.GREATER);break;case nu:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}J=pt}},setLocked:function(pt){B=pt},setClear:function(pt){ut!==pt&&(r.clearDepth(pt),ut=pt)},reset:function(){B=!1,Y=null,J=null,ut=null}}}function n(){let B=!1,dt=null,Y=null,J=null,ut=null,pt=null,$t=null,Ee=null,$e=null;return{setTest:function(Jt){B||(Jt?Z(r.STENCIL_TEST):nt(r.STENCIL_TEST))},setMask:function(Jt){dt!==Jt&&!B&&(r.stencilMask(Jt),dt=Jt)},setFunc:function(Jt,qe,jn){(Y!==Jt||J!==qe||ut!==jn)&&(r.stencilFunc(Jt,qe,jn),Y=Jt,J=qe,ut=jn)},setOp:function(Jt,qe,jn){(pt!==Jt||$t!==qe||Ee!==jn)&&(r.stencilOp(Jt,qe,jn),pt=Jt,$t=qe,Ee=jn)},setLocked:function(Jt){B=Jt},setClear:function(Jt){$e!==Jt&&(r.clearStencil(Jt),$e=Jt)},reset:function(){B=!1,dt=null,Y=null,J=null,ut=null,pt=null,$t=null,Ee=null,$e=null}}}const i=new t,s=new e,o=new n,a=new WeakMap,c=new WeakMap;let l={},u={},h=new WeakMap,f=[],d=null,g=!1,_=null,p=null,m=null,y=null,v=null,E=null,w=null,T=new Bt(0,0,0),S=0,C=!1,L=null,x=null,M=null,D=null,I=null;const k=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,O=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(G)[1]),F=O>=1):G.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),F=O>=2);let H=null,et={};const st=r.getParameter(r.SCISSOR_BOX),ct=r.getParameter(r.VIEWPORT),bt=new ie().fromArray(st),It=new ie().fromArray(ct);function N(B,dt,Y,J){const ut=new Uint8Array(4),pt=r.createTexture();r.bindTexture(B,pt),r.texParameteri(B,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(B,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let $t=0;$t<Y;$t++)B===r.TEXTURE_3D||B===r.TEXTURE_2D_ARRAY?r.texImage3D(dt,0,r.RGBA,1,1,J,0,r.RGBA,r.UNSIGNED_BYTE,ut):r.texImage2D(dt+$t,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ut);return pt}const X={};X[r.TEXTURE_2D]=N(r.TEXTURE_2D,r.TEXTURE_2D,1),X[r.TEXTURE_CUBE_MAP]=N(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[r.TEXTURE_2D_ARRAY]=N(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),X[r.TEXTURE_3D]=N(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),o.setClear(0),Z(r.DEPTH_TEST),s.setFunc(Ms),zt(!1),Ht(td),Z(r.CULL_FACE),U(Ii);function Z(B){l[B]!==!0&&(r.enable(B),l[B]=!0)}function nt(B){l[B]!==!1&&(r.disable(B),l[B]=!1)}function St(B,dt){return u[B]!==dt?(r.bindFramebuffer(B,dt),u[B]=dt,B===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=dt),B===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=dt),!0):!1}function wt(B,dt){let Y=f,J=!1;if(B){Y=h.get(dt),Y===void 0&&(Y=[],h.set(dt,Y));const ut=B.textures;if(Y.length!==ut.length||Y[0]!==r.COLOR_ATTACHMENT0){for(let pt=0,$t=ut.length;pt<$t;pt++)Y[pt]=r.COLOR_ATTACHMENT0+pt;Y.length=ut.length,J=!0}}else Y[0]!==r.BACK&&(Y[0]=r.BACK,J=!0);J&&r.drawBuffers(Y)}function kt(B){return d!==B?(r.useProgram(B),d=B,!0):!1}const Yt={[cr]:r.FUNC_ADD,[TS]:r.FUNC_SUBTRACT,[bS]:r.FUNC_REVERSE_SUBTRACT};Yt[wS]=r.MIN,Yt[AS]=r.MAX;const Vt={[CS]:r.ZERO,[RS]:r.ONE,[PS]:r.SRC_COLOR,[Yl]:r.SRC_ALPHA,[US]:r.SRC_ALPHA_SATURATE,[NS]:r.DST_COLOR,[DS]:r.DST_ALPHA,[LS]:r.ONE_MINUS_SRC_COLOR,[Kl]:r.ONE_MINUS_SRC_ALPHA,[OS]:r.ONE_MINUS_DST_COLOR,[IS]:r.ONE_MINUS_DST_ALPHA,[FS]:r.CONSTANT_COLOR,[BS]:r.ONE_MINUS_CONSTANT_COLOR,[zS]:r.CONSTANT_ALPHA,[kS]:r.ONE_MINUS_CONSTANT_ALPHA};function U(B,dt,Y,J,ut,pt,$t,Ee,$e,Jt){if(B===Ii){g===!0&&(nt(r.BLEND),g=!1);return}if(g===!1&&(Z(r.BLEND),g=!0),B!==MS){if(B!==_||Jt!==C){if((p!==cr||v!==cr)&&(r.blendEquation(r.FUNC_ADD),p=cr,v=cr),Jt)switch(B){case as:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ed:r.blendFunc(r.ONE,r.ONE);break;case nd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case id:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case as:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ed:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case nd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case id:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}m=null,y=null,E=null,w=null,T.set(0,0,0),S=0,_=B,C=Jt}return}ut=ut||dt,pt=pt||Y,$t=$t||J,(dt!==p||ut!==v)&&(r.blendEquationSeparate(Yt[dt],Yt[ut]),p=dt,v=ut),(Y!==m||J!==y||pt!==E||$t!==w)&&(r.blendFuncSeparate(Vt[Y],Vt[J],Vt[pt],Vt[$t]),m=Y,y=J,E=pt,w=$t),(Ee.equals(T)===!1||$e!==S)&&(r.blendColor(Ee.r,Ee.g,Ee.b,$e),T.copy(Ee),S=$e),_=B,C=!1}function ze(B,dt){B.side===Fe?nt(r.CULL_FACE):Z(r.CULL_FACE);let Y=B.side===We;dt&&(Y=!Y),zt(Y),B.blending===as&&B.transparent===!1?U(Ii):U(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),s.setFunc(B.depthFunc),s.setTest(B.depthTest),s.setMask(B.depthWrite),i.setMask(B.colorWrite);const J=B.stencilWrite;o.setTest(J),J&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),re(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?Z(r.SAMPLE_ALPHA_TO_COVERAGE):nt(r.SAMPLE_ALPHA_TO_COVERAGE)}function zt(B){L!==B&&(B?r.frontFace(r.CW):r.frontFace(r.CCW),L=B)}function Ht(B){B!==yS?(Z(r.CULL_FACE),B!==x&&(B===td?r.cullFace(r.BACK):B===ES?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):nt(r.CULL_FACE),x=B}function At(B){B!==M&&(F&&r.lineWidth(B),M=B)}function re(B,dt,Y){B?(Z(r.POLYGON_OFFSET_FILL),(D!==dt||I!==Y)&&(r.polygonOffset(dt,Y),D=dt,I=Y)):nt(r.POLYGON_OFFSET_FILL)}function Rt(B){B?Z(r.SCISSOR_TEST):nt(r.SCISSOR_TEST)}function P(B){B===void 0&&(B=r.TEXTURE0+k-1),H!==B&&(r.activeTexture(B),H=B)}function b(B,dt,Y){Y===void 0&&(H===null?Y=r.TEXTURE0+k-1:Y=H);let J=et[Y];J===void 0&&(J={type:void 0,texture:void 0},et[Y]=J),(J.type!==B||J.texture!==dt)&&(H!==Y&&(r.activeTexture(Y),H=Y),r.bindTexture(B,dt||X[B]),J.type=B,J.texture=dt)}function W(){const B=et[H];B!==void 0&&B.type!==void 0&&(r.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function j(){try{r.compressedTexImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function tt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function K(){try{r.texSubImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function xt(){try{r.texSubImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ot(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ft(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Kt(){try{r.texStorage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function it(){try{r.texStorage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function _t(){try{r.texImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Lt(){try{r.texImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Dt(B){bt.equals(B)===!1&&(r.scissor(B.x,B.y,B.z,B.w),bt.copy(B))}function gt(B){It.equals(B)===!1&&(r.viewport(B.x,B.y,B.z,B.w),It.copy(B))}function Wt(B,dt){let Y=c.get(dt);Y===void 0&&(Y=new WeakMap,c.set(dt,Y));let J=Y.get(B);J===void 0&&(J=r.getUniformBlockIndex(dt,B.name),Y.set(B,J))}function Nt(B,dt){const J=c.get(dt).get(B);a.get(dt)!==J&&(r.uniformBlockBinding(dt,J,B.__bindingPointIndex),a.set(dt,J))}function ce(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),l={},H=null,et={},u={},h=new WeakMap,f=[],d=null,g=!1,_=null,p=null,m=null,y=null,v=null,E=null,w=null,T=new Bt(0,0,0),S=0,C=!1,L=null,x=null,M=null,D=null,I=null,bt.set(0,0,r.canvas.width,r.canvas.height),It.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),o.reset()}return{buffers:{color:i,depth:s,stencil:o},enable:Z,disable:nt,bindFramebuffer:St,drawBuffers:wt,useProgram:kt,setBlending:U,setMaterial:ze,setFlipSided:zt,setCullFace:Ht,setLineWidth:At,setPolygonOffset:re,setScissorTest:Rt,activeTexture:P,bindTexture:b,unbindTexture:W,compressedTexImage2D:j,compressedTexImage3D:tt,texImage2D:_t,texImage3D:Lt,updateUBOMapping:Wt,uniformBlockBinding:Nt,texStorage2D:Kt,texStorage3D:it,texSubImage2D:K,texSubImage3D:xt,compressedTexSubImage2D:ot,compressedTexSubImage3D:ft,scissor:Dt,viewport:gt,reset:ce}}function $d(r,t,e,n){const i=c1(n);switch(e){case p_:return r*t;case __:return r*t;case g_:return r*t*2;case v_:return r*t/i.components*i.byteLength;case bh:return r*t/i.components*i.byteLength;case x_:return r*t*2/i.components*i.byteLength;case wh:return r*t*2/i.components*i.byteLength;case m_:return r*t*3/i.components*i.byteLength;case On:return r*t*4/i.components*i.byteLength;case Ah:return r*t*4/i.components*i.byteLength;case ba:case wa:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Aa:case Ca:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case cu:case uu:return Math.max(r,16)*Math.max(t,8)/4;case au:case lu:return Math.max(r,8)*Math.max(t,8)/2;case hu:case fu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case du:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case pu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case mu:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case _u:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case gu:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case vu:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case xu:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case yu:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Eu:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Su:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Mu:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Tu:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case bu:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case wu:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Au:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Ra:case Cu:case Ru:return Math.ceil(r/4)*Math.ceil(t/4)*16;case y_:case Pu:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Lu:case Du:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function c1(r){switch(r){case pi:case h_:return{byteLength:1,components:1};case go:case f_:case bo:return{byteLength:2,components:1};case Mh:case Th:return{byteLength:2,components:4};case Mr:case Sh:case oi:return{byteLength:4,components:1};case d_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function l1(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new lt,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,b){return d?new OffscreenCanvas(P,b):Ka("canvas")}function _(P,b,W){let j=1;const tt=Rt(P);if((tt.width>W||tt.height>W)&&(j=W/Math.max(tt.width,tt.height)),j<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const K=Math.floor(j*tt.width),xt=Math.floor(j*tt.height);h===void 0&&(h=g(K,xt));const ot=b?g(K,xt):h;return ot.width=K,ot.height=xt,ot.getContext("2d").drawImage(P,0,0,K,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+K+"x"+xt+")."),ot}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),P;return P}function p(P){return P.generateMipmaps&&P.minFilter!==bn&&P.minFilter!==Nn}function m(P){r.generateMipmap(P)}function y(P,b,W,j,tt=!1){if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let K=b;if(b===r.RED&&(W===r.FLOAT&&(K=r.R32F),W===r.HALF_FLOAT&&(K=r.R16F),W===r.UNSIGNED_BYTE&&(K=r.R8)),b===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(K=r.R8UI),W===r.UNSIGNED_SHORT&&(K=r.R16UI),W===r.UNSIGNED_INT&&(K=r.R32UI),W===r.BYTE&&(K=r.R8I),W===r.SHORT&&(K=r.R16I),W===r.INT&&(K=r.R32I)),b===r.RG&&(W===r.FLOAT&&(K=r.RG32F),W===r.HALF_FLOAT&&(K=r.RG16F),W===r.UNSIGNED_BYTE&&(K=r.RG8)),b===r.RG_INTEGER&&(W===r.UNSIGNED_BYTE&&(K=r.RG8UI),W===r.UNSIGNED_SHORT&&(K=r.RG16UI),W===r.UNSIGNED_INT&&(K=r.RG32UI),W===r.BYTE&&(K=r.RG8I),W===r.SHORT&&(K=r.RG16I),W===r.INT&&(K=r.RG32I)),b===r.RGB_INTEGER&&(W===r.UNSIGNED_BYTE&&(K=r.RGB8UI),W===r.UNSIGNED_SHORT&&(K=r.RGB16UI),W===r.UNSIGNED_INT&&(K=r.RGB32UI),W===r.BYTE&&(K=r.RGB8I),W===r.SHORT&&(K=r.RGB16I),W===r.INT&&(K=r.RGB32I)),b===r.RGBA_INTEGER&&(W===r.UNSIGNED_BYTE&&(K=r.RGBA8UI),W===r.UNSIGNED_SHORT&&(K=r.RGBA16UI),W===r.UNSIGNED_INT&&(K=r.RGBA32UI),W===r.BYTE&&(K=r.RGBA8I),W===r.SHORT&&(K=r.RGBA16I),W===r.INT&&(K=r.RGBA32I)),b===r.RGB&&W===r.UNSIGNED_INT_5_9_9_9_REV&&(K=r.RGB9_E5),b===r.RGBA){const xt=tt?Xa:te.getTransfer(j);W===r.FLOAT&&(K=r.RGBA32F),W===r.HALF_FLOAT&&(K=r.RGBA16F),W===r.UNSIGNED_BYTE&&(K=xt===he?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT_4_4_4_4&&(K=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(K=r.RGB5_A1)}return(K===r.R16F||K===r.R32F||K===r.RG16F||K===r.RG32F||K===r.RGBA16F||K===r.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function v(P,b){let W;return P?b===null||b===Mr||b===ws?W=r.DEPTH24_STENCIL8:b===oi?W=r.DEPTH32F_STENCIL8:b===go&&(W=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Mr||b===ws?W=r.DEPTH_COMPONENT24:b===oi?W=r.DEPTH_COMPONENT32F:b===go&&(W=r.DEPTH_COMPONENT16),W}function E(P,b){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==bn&&P.minFilter!==Nn?Math.log2(Math.max(b.width,b.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?b.mipmaps.length:1}function w(P){const b=P.target;b.removeEventListener("dispose",w),S(b),b.isVideoTexture&&u.delete(b)}function T(P){const b=P.target;b.removeEventListener("dispose",T),L(b)}function S(P){const b=n.get(P);if(b.__webglInit===void 0)return;const W=P.source,j=f.get(W);if(j){const tt=j[b.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&C(P),Object.keys(j).length===0&&f.delete(W)}n.remove(P)}function C(P){const b=n.get(P);r.deleteTexture(b.__webglTexture);const W=P.source,j=f.get(W);delete j[b.__cacheKey],o.memory.textures--}function L(P){const b=n.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(b.__webglFramebuffer[j]))for(let tt=0;tt<b.__webglFramebuffer[j].length;tt++)r.deleteFramebuffer(b.__webglFramebuffer[j][tt]);else r.deleteFramebuffer(b.__webglFramebuffer[j]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[j])}else{if(Array.isArray(b.__webglFramebuffer))for(let j=0;j<b.__webglFramebuffer.length;j++)r.deleteFramebuffer(b.__webglFramebuffer[j]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let j=0;j<b.__webglColorRenderbuffer.length;j++)b.__webglColorRenderbuffer[j]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[j]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const W=P.textures;for(let j=0,tt=W.length;j<tt;j++){const K=n.get(W[j]);K.__webglTexture&&(r.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(W[j])}n.remove(P)}let x=0;function M(){x=0}function D(){const P=x;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),x+=1,P}function I(P){const b=[];return b.push(P.wrapS),b.push(P.wrapT),b.push(P.wrapR||0),b.push(P.magFilter),b.push(P.minFilter),b.push(P.anisotropy),b.push(P.internalFormat),b.push(P.format),b.push(P.type),b.push(P.generateMipmaps),b.push(P.premultiplyAlpha),b.push(P.flipY),b.push(P.unpackAlignment),b.push(P.colorSpace),b.join()}function k(P,b){const W=n.get(P);if(P.isVideoTexture&&At(P),P.isRenderTargetTexture===!1&&P.version>0&&W.__version!==P.version){const j=P.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{It(W,P,b);return}}e.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+b)}function F(P,b){const W=n.get(P);if(P.version>0&&W.__version!==P.version){It(W,P,b);return}e.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+b)}function O(P,b){const W=n.get(P);if(P.version>0&&W.__version!==P.version){It(W,P,b);return}e.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+b)}function G(P,b){const W=n.get(P);if(P.version>0&&W.__version!==P.version){N(W,P,b);return}e.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+b)}const H={[su]:r.REPEAT,[dr]:r.CLAMP_TO_EDGE,[ou]:r.MIRRORED_REPEAT},et={[bn]:r.NEAREST,[KS]:r.NEAREST_MIPMAP_NEAREST,[Vo]:r.NEAREST_MIPMAP_LINEAR,[Nn]:r.LINEAR,[Gc]:r.LINEAR_MIPMAP_NEAREST,[pr]:r.LINEAR_MIPMAP_LINEAR},st={[QS]:r.NEVER,[sM]:r.ALWAYS,[tM]:r.LESS,[S_]:r.LEQUAL,[eM]:r.EQUAL,[rM]:r.GEQUAL,[nM]:r.GREATER,[iM]:r.NOTEQUAL};function ct(P,b){if(b.type===oi&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Nn||b.magFilter===Gc||b.magFilter===Vo||b.magFilter===pr||b.minFilter===Nn||b.minFilter===Gc||b.minFilter===Vo||b.minFilter===pr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,H[b.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,H[b.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,H[b.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,et[b.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,et[b.minFilter]),b.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,st[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===bn||b.minFilter!==Vo&&b.minFilter!==pr||b.type===oi&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const W=t.get("EXT_texture_filter_anisotropic");r.texParameterf(P,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function bt(P,b){let W=!1;P.__webglInit===void 0&&(P.__webglInit=!0,b.addEventListener("dispose",w));const j=b.source;let tt=f.get(j);tt===void 0&&(tt={},f.set(j,tt));const K=I(b);if(K!==P.__cacheKey){tt[K]===void 0&&(tt[K]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,W=!0),tt[K].usedTimes++;const xt=tt[P.__cacheKey];xt!==void 0&&(tt[P.__cacheKey].usedTimes--,xt.usedTimes===0&&C(b)),P.__cacheKey=K,P.__webglTexture=tt[K].texture}return W}function It(P,b,W){let j=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(j=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(j=r.TEXTURE_3D);const tt=bt(P,b),K=b.source;e.bindTexture(j,P.__webglTexture,r.TEXTURE0+W);const xt=n.get(K);if(K.version!==xt.__version||tt===!0){e.activeTexture(r.TEXTURE0+W);const ot=te.getPrimaries(te.workingColorSpace),ft=b.colorSpace===wi?null:te.getPrimaries(b.colorSpace),Kt=b.colorSpace===wi||ot===ft?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt);let it=_(b.image,!1,i.maxTextureSize);it=re(b,it);const _t=s.convert(b.format,b.colorSpace),Lt=s.convert(b.type);let Dt=y(b.internalFormat,_t,Lt,b.colorSpace,b.isVideoTexture);ct(j,b);let gt;const Wt=b.mipmaps,Nt=b.isVideoTexture!==!0,ce=xt.__version===void 0||tt===!0,B=K.dataReady,dt=E(b,it);if(b.isDepthTexture)Dt=v(b.format===As,b.type),ce&&(Nt?e.texStorage2D(r.TEXTURE_2D,1,Dt,it.width,it.height):e.texImage2D(r.TEXTURE_2D,0,Dt,it.width,it.height,0,_t,Lt,null));else if(b.isDataTexture)if(Wt.length>0){Nt&&ce&&e.texStorage2D(r.TEXTURE_2D,dt,Dt,Wt[0].width,Wt[0].height);for(let Y=0,J=Wt.length;Y<J;Y++)gt=Wt[Y],Nt?B&&e.texSubImage2D(r.TEXTURE_2D,Y,0,0,gt.width,gt.height,_t,Lt,gt.data):e.texImage2D(r.TEXTURE_2D,Y,Dt,gt.width,gt.height,0,_t,Lt,gt.data);b.generateMipmaps=!1}else Nt?(ce&&e.texStorage2D(r.TEXTURE_2D,dt,Dt,it.width,it.height),B&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,it.width,it.height,_t,Lt,it.data)):e.texImage2D(r.TEXTURE_2D,0,Dt,it.width,it.height,0,_t,Lt,it.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Nt&&ce&&e.texStorage3D(r.TEXTURE_2D_ARRAY,dt,Dt,Wt[0].width,Wt[0].height,it.depth);for(let Y=0,J=Wt.length;Y<J;Y++)if(gt=Wt[Y],b.format!==On)if(_t!==null)if(Nt){if(B)if(b.layerUpdates.size>0){const ut=$d(gt.width,gt.height,b.format,b.type);for(const pt of b.layerUpdates){const $t=gt.data.subarray(pt*ut/gt.data.BYTES_PER_ELEMENT,(pt+1)*ut/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,pt,gt.width,gt.height,1,_t,$t,0,0)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,gt.width,gt.height,it.depth,_t,gt.data,0,0)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Y,Dt,gt.width,gt.height,it.depth,0,gt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Nt?B&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,gt.width,gt.height,it.depth,_t,Lt,gt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Y,Dt,gt.width,gt.height,it.depth,0,_t,Lt,gt.data)}else{Nt&&ce&&e.texStorage2D(r.TEXTURE_2D,dt,Dt,Wt[0].width,Wt[0].height);for(let Y=0,J=Wt.length;Y<J;Y++)gt=Wt[Y],b.format!==On?_t!==null?Nt?B&&e.compressedTexSubImage2D(r.TEXTURE_2D,Y,0,0,gt.width,gt.height,_t,gt.data):e.compressedTexImage2D(r.TEXTURE_2D,Y,Dt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Nt?B&&e.texSubImage2D(r.TEXTURE_2D,Y,0,0,gt.width,gt.height,_t,Lt,gt.data):e.texImage2D(r.TEXTURE_2D,Y,Dt,gt.width,gt.height,0,_t,Lt,gt.data)}else if(b.isDataArrayTexture)if(Nt){if(ce&&e.texStorage3D(r.TEXTURE_2D_ARRAY,dt,Dt,it.width,it.height,it.depth),B)if(b.layerUpdates.size>0){const Y=$d(it.width,it.height,b.format,b.type);for(const J of b.layerUpdates){const ut=it.data.subarray(J*Y/it.data.BYTES_PER_ELEMENT,(J+1)*Y/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,J,it.width,it.height,1,_t,Lt,ut)}b.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,_t,Lt,it.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Dt,it.width,it.height,it.depth,0,_t,Lt,it.data);else if(b.isData3DTexture)Nt?(ce&&e.texStorage3D(r.TEXTURE_3D,dt,Dt,it.width,it.height,it.depth),B&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,_t,Lt,it.data)):e.texImage3D(r.TEXTURE_3D,0,Dt,it.width,it.height,it.depth,0,_t,Lt,it.data);else if(b.isFramebufferTexture){if(ce)if(Nt)e.texStorage2D(r.TEXTURE_2D,dt,Dt,it.width,it.height);else{let Y=it.width,J=it.height;for(let ut=0;ut<dt;ut++)e.texImage2D(r.TEXTURE_2D,ut,Dt,Y,J,0,_t,Lt,null),Y>>=1,J>>=1}}else if(Wt.length>0){if(Nt&&ce){const Y=Rt(Wt[0]);e.texStorage2D(r.TEXTURE_2D,dt,Dt,Y.width,Y.height)}for(let Y=0,J=Wt.length;Y<J;Y++)gt=Wt[Y],Nt?B&&e.texSubImage2D(r.TEXTURE_2D,Y,0,0,_t,Lt,gt):e.texImage2D(r.TEXTURE_2D,Y,Dt,_t,Lt,gt);b.generateMipmaps=!1}else if(Nt){if(ce){const Y=Rt(it);e.texStorage2D(r.TEXTURE_2D,dt,Dt,Y.width,Y.height)}B&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,_t,Lt,it)}else e.texImage2D(r.TEXTURE_2D,0,Dt,_t,Lt,it);p(b)&&m(j),xt.__version=K.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function N(P,b,W){if(b.image.length!==6)return;const j=bt(P,b),tt=b.source;e.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+W);const K=n.get(tt);if(tt.version!==K.__version||j===!0){e.activeTexture(r.TEXTURE0+W);const xt=te.getPrimaries(te.workingColorSpace),ot=b.colorSpace===wi?null:te.getPrimaries(b.colorSpace),ft=b.colorSpace===wi||xt===ot?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);const Kt=b.isCompressedTexture||b.image[0].isCompressedTexture,it=b.image[0]&&b.image[0].isDataTexture,_t=[];for(let J=0;J<6;J++)!Kt&&!it?_t[J]=_(b.image[J],!0,i.maxCubemapSize):_t[J]=it?b.image[J].image:b.image[J],_t[J]=re(b,_t[J]);const Lt=_t[0],Dt=s.convert(b.format,b.colorSpace),gt=s.convert(b.type),Wt=y(b.internalFormat,Dt,gt,b.colorSpace),Nt=b.isVideoTexture!==!0,ce=K.__version===void 0||j===!0,B=tt.dataReady;let dt=E(b,Lt);ct(r.TEXTURE_CUBE_MAP,b);let Y;if(Kt){Nt&&ce&&e.texStorage2D(r.TEXTURE_CUBE_MAP,dt,Wt,Lt.width,Lt.height);for(let J=0;J<6;J++){Y=_t[J].mipmaps;for(let ut=0;ut<Y.length;ut++){const pt=Y[ut];b.format!==On?Dt!==null?Nt?B&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,0,0,pt.width,pt.height,Dt,pt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,Wt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,0,0,pt.width,pt.height,Dt,gt,pt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,Wt,pt.width,pt.height,0,Dt,gt,pt.data)}}}else{if(Y=b.mipmaps,Nt&&ce){Y.length>0&&dt++;const J=Rt(_t[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,dt,Wt,J.width,J.height)}for(let J=0;J<6;J++)if(it){Nt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,_t[J].width,_t[J].height,Dt,gt,_t[J].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Wt,_t[J].width,_t[J].height,0,Dt,gt,_t[J].data);for(let ut=0;ut<Y.length;ut++){const $t=Y[ut].image[J].image;Nt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,0,0,$t.width,$t.height,Dt,gt,$t.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,Wt,$t.width,$t.height,0,Dt,gt,$t.data)}}else{Nt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Dt,gt,_t[J]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Wt,Dt,gt,_t[J]);for(let ut=0;ut<Y.length;ut++){const pt=Y[ut];Nt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,0,0,Dt,gt,pt.image[J]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,Wt,Dt,gt,pt.image[J])}}}p(b)&&m(r.TEXTURE_CUBE_MAP),K.__version=tt.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function X(P,b,W,j,tt,K){const xt=s.convert(W.format,W.colorSpace),ot=s.convert(W.type),ft=y(W.internalFormat,xt,ot,W.colorSpace);if(!n.get(b).__hasExternalTextures){const it=Math.max(1,b.width>>K),_t=Math.max(1,b.height>>K);tt===r.TEXTURE_3D||tt===r.TEXTURE_2D_ARRAY?e.texImage3D(tt,K,ft,it,_t,b.depth,0,xt,ot,null):e.texImage2D(tt,K,ft,it,_t,0,xt,ot,null)}e.bindFramebuffer(r.FRAMEBUFFER,P),Ht(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,j,tt,n.get(W).__webglTexture,0,zt(b)):(tt===r.TEXTURE_2D||tt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,j,tt,n.get(W).__webglTexture,K),e.bindFramebuffer(r.FRAMEBUFFER,null)}function Z(P,b,W){if(r.bindRenderbuffer(r.RENDERBUFFER,P),b.depthBuffer){const j=b.depthTexture,tt=j&&j.isDepthTexture?j.type:null,K=v(b.stencilBuffer,tt),xt=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ot=zt(b);Ht(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ot,K,b.width,b.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,ot,K,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,K,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,xt,r.RENDERBUFFER,P)}else{const j=b.textures;for(let tt=0;tt<j.length;tt++){const K=j[tt],xt=s.convert(K.format,K.colorSpace),ot=s.convert(K.type),ft=y(K.internalFormat,xt,ot,K.colorSpace),Kt=zt(b);W&&Ht(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Kt,ft,b.width,b.height):Ht(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Kt,ft,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,ft,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function nt(P,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,P),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),k(b.depthTexture,0);const j=n.get(b.depthTexture).__webglTexture,tt=zt(b);if(b.depthTexture.format===cs)Ht(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0,tt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0);else if(b.depthTexture.format===As)Ht(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0,tt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function St(P){const b=n.get(P),W=P.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==P.depthTexture){const j=P.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),j){const tt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,j.removeEventListener("dispose",tt)};j.addEventListener("dispose",tt),b.__depthDisposeCallback=tt}b.__boundDepthTexture=j}if(P.depthTexture&&!b.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");nt(b.__webglFramebuffer,P)}else if(W){b.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[j]),b.__webglDepthbuffer[j]===void 0)b.__webglDepthbuffer[j]=r.createRenderbuffer(),Z(b.__webglDepthbuffer[j],P,!1);else{const tt=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,K=b.__webglDepthbuffer[j];r.bindRenderbuffer(r.RENDERBUFFER,K),r.framebufferRenderbuffer(r.FRAMEBUFFER,tt,r.RENDERBUFFER,K)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),Z(b.__webglDepthbuffer,P,!1);else{const j=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,tt=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,tt),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,tt)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function wt(P,b,W){const j=n.get(P);b!==void 0&&X(j.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&St(P)}function kt(P){const b=P.texture,W=n.get(P),j=n.get(b);P.addEventListener("dispose",T);const tt=P.textures,K=P.isWebGLCubeRenderTarget===!0,xt=tt.length>1;if(xt||(j.__webglTexture===void 0&&(j.__webglTexture=r.createTexture()),j.__version=b.version,o.memory.textures++),K){W.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(b.mipmaps&&b.mipmaps.length>0){W.__webglFramebuffer[ot]=[];for(let ft=0;ft<b.mipmaps.length;ft++)W.__webglFramebuffer[ot][ft]=r.createFramebuffer()}else W.__webglFramebuffer[ot]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){W.__webglFramebuffer=[];for(let ot=0;ot<b.mipmaps.length;ot++)W.__webglFramebuffer[ot]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(xt)for(let ot=0,ft=tt.length;ot<ft;ot++){const Kt=n.get(tt[ot]);Kt.__webglTexture===void 0&&(Kt.__webglTexture=r.createTexture(),o.memory.textures++)}if(P.samples>0&&Ht(P)===!1){W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ot=0;ot<tt.length;ot++){const ft=tt[ot];W.__webglColorRenderbuffer[ot]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[ot]);const Kt=s.convert(ft.format,ft.colorSpace),it=s.convert(ft.type),_t=y(ft.internalFormat,Kt,it,ft.colorSpace,P.isXRRenderTarget===!0),Lt=zt(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt,_t,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ot,r.RENDERBUFFER,W.__webglColorRenderbuffer[ot])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),Z(W.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(K){e.bindTexture(r.TEXTURE_CUBE_MAP,j.__webglTexture),ct(r.TEXTURE_CUBE_MAP,b);for(let ot=0;ot<6;ot++)if(b.mipmaps&&b.mipmaps.length>0)for(let ft=0;ft<b.mipmaps.length;ft++)X(W.__webglFramebuffer[ot][ft],P,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,ft);else X(W.__webglFramebuffer[ot],P,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);p(b)&&m(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let ot=0,ft=tt.length;ot<ft;ot++){const Kt=tt[ot],it=n.get(Kt);e.bindTexture(r.TEXTURE_2D,it.__webglTexture),ct(r.TEXTURE_2D,Kt),X(W.__webglFramebuffer,P,Kt,r.COLOR_ATTACHMENT0+ot,r.TEXTURE_2D,0),p(Kt)&&m(r.TEXTURE_2D)}e.unbindTexture()}else{let ot=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ot=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ot,j.__webglTexture),ct(ot,b),b.mipmaps&&b.mipmaps.length>0)for(let ft=0;ft<b.mipmaps.length;ft++)X(W.__webglFramebuffer[ft],P,b,r.COLOR_ATTACHMENT0,ot,ft);else X(W.__webglFramebuffer,P,b,r.COLOR_ATTACHMENT0,ot,0);p(b)&&m(ot),e.unbindTexture()}P.depthBuffer&&St(P)}function Yt(P){const b=P.textures;for(let W=0,j=b.length;W<j;W++){const tt=b[W];if(p(tt)){const K=P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,xt=n.get(tt).__webglTexture;e.bindTexture(K,xt),m(K),e.unbindTexture()}}}const Vt=[],U=[];function ze(P){if(P.samples>0){if(Ht(P)===!1){const b=P.textures,W=P.width,j=P.height;let tt=r.COLOR_BUFFER_BIT;const K=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,xt=n.get(P),ot=b.length>1;if(ot)for(let ft=0;ft<b.length;ft++)e.bindFramebuffer(r.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,xt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let ft=0;ft<b.length;ft++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(tt|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(tt|=r.STENCIL_BUFFER_BIT)),ot){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,xt.__webglColorRenderbuffer[ft]);const Kt=n.get(b[ft]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Kt,0)}r.blitFramebuffer(0,0,W,j,0,0,W,j,tt,r.NEAREST),c===!0&&(Vt.length=0,U.length=0,Vt.push(r.COLOR_ATTACHMENT0+ft),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Vt.push(K),U.push(K),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,U)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Vt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ot)for(let ft=0;ft<b.length;ft++){e.bindFramebuffer(r.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.RENDERBUFFER,xt.__webglColorRenderbuffer[ft]);const Kt=n.get(b[ft]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,xt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.TEXTURE_2D,Kt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const b=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function zt(P){return Math.min(i.maxSamples,P.samples)}function Ht(P){const b=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function At(P){const b=o.render.frame;u.get(P)!==b&&(u.set(P,b),P.update())}function re(P,b){const W=P.colorSpace,j=P.format,tt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||W!==Yi&&W!==wi&&(te.getTransfer(W)===he?(j!==On||tt!==pi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),b}function Rt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=M,this.setTexture2D=k,this.setTexture2DArray=F,this.setTexture3D=O,this.setTextureCube=G,this.rebindTextures=wt,this.setupRenderTarget=kt,this.updateRenderTargetMipmap=Yt,this.updateMultisampleRenderTarget=ze,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=X,this.useMultisampledRTT=Ht}function u1(r,t){function e(n,i=wi){let s;const o=te.getTransfer(i);if(n===pi)return r.UNSIGNED_BYTE;if(n===Mh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Th)return r.UNSIGNED_SHORT_5_5_5_1;if(n===d_)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===h_)return r.BYTE;if(n===f_)return r.SHORT;if(n===go)return r.UNSIGNED_SHORT;if(n===Sh)return r.INT;if(n===Mr)return r.UNSIGNED_INT;if(n===oi)return r.FLOAT;if(n===bo)return r.HALF_FLOAT;if(n===p_)return r.ALPHA;if(n===m_)return r.RGB;if(n===On)return r.RGBA;if(n===__)return r.LUMINANCE;if(n===g_)return r.LUMINANCE_ALPHA;if(n===cs)return r.DEPTH_COMPONENT;if(n===As)return r.DEPTH_STENCIL;if(n===v_)return r.RED;if(n===bh)return r.RED_INTEGER;if(n===x_)return r.RG;if(n===wh)return r.RG_INTEGER;if(n===Ah)return r.RGBA_INTEGER;if(n===ba||n===wa||n===Aa||n===Ca)if(o===he)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===ba)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Aa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ca)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===ba)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Aa)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ca)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===au||n===cu||n===lu||n===uu)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===au)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===cu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===lu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===uu)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===hu||n===fu||n===du)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===hu||n===fu)return o===he?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===du)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===pu||n===mu||n===_u||n===gu||n===vu||n===xu||n===yu||n===Eu||n===Su||n===Mu||n===Tu||n===bu||n===wu||n===Au)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===pu)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===mu)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_u)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===gu)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vu)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===xu)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===yu)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Eu)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Su)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Mu)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Tu)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===bu)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===wu)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Au)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ra||n===Cu||n===Ru)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Ra)return o===he?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Cu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ru)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===y_||n===Pu||n===Lu||n===Du)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ra)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Pu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Lu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Du)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ws?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class h1 extends ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class jt extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const f1={type:"move"};class vl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),m=this._getHandJoint(l,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(f1)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new jt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const d1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,p1=`
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

}`;class m1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Xe,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Gi({vertexShader:d1,fragmentShader:p1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new mt(new Yn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class _1 extends Os{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null;const _=new m1,p=e.getContextAttributes();let m=null,y=null;const v=[],E=[],w=new lt;let T=null;const S=new ln;S.layers.enable(1),S.viewport=new ie;const C=new ln;C.layers.enable(2),C.viewport=new ie;const L=[S,C],x=new h1;x.layers.enable(1),x.layers.enable(2);let M=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let X=v[N];return X===void 0&&(X=new vl,v[N]=X),X.getTargetRaySpace()},this.getControllerGrip=function(N){let X=v[N];return X===void 0&&(X=new vl,v[N]=X),X.getGripSpace()},this.getHand=function(N){let X=v[N];return X===void 0&&(X=new vl,v[N]=X),X.getHandSpace()};function I(N){const X=E.indexOf(N.inputSource);if(X===-1)return;const Z=v[X];Z!==void 0&&(Z.update(N.inputSource,N.frame,l||o),Z.dispatchEvent({type:N.type,data:N.inputSource}))}function k(){i.removeEventListener("select",I),i.removeEventListener("selectstart",I),i.removeEventListener("selectend",I),i.removeEventListener("squeeze",I),i.removeEventListener("squeezestart",I),i.removeEventListener("squeezeend",I),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",F);for(let N=0;N<v.length;N++){const X=E[N];X!==null&&(E[N]=null,v[N].disconnect(X))}M=null,D=null,_.reset(),t.setRenderTarget(m),d=null,f=null,h=null,i=null,y=null,It.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){s=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){a=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(N){l=N},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(N){if(i=N,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",I),i.addEventListener("selectstart",I),i.addEventListener("selectend",I),i.addEventListener("squeeze",I),i.addEventListener("squeezestart",I),i.addEventListener("squeezeend",I),i.addEventListener("end",k),i.addEventListener("inputsourceschange",F),p.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(w),i.renderState.layers===void 0){const X={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,e,X),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new Tr(d.framebufferWidth,d.framebufferHeight,{format:On,type:pi,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let X=null,Z=null,nt=null;p.depth&&(nt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,X=p.stencil?As:cs,Z=p.stencil?ws:Mr);const St={colorFormat:e.RGBA8,depthFormat:nt,scaleFactor:s};h=new XRWebGLBinding(i,e),f=h.createProjectionLayer(St),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new Tr(f.textureWidth,f.textureHeight,{format:On,type:pi,depthTexture:new O_(f.textureWidth,f.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),It.setContext(i),It.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function F(N){for(let X=0;X<N.removed.length;X++){const Z=N.removed[X],nt=E.indexOf(Z);nt>=0&&(E[nt]=null,v[nt].disconnect(Z))}for(let X=0;X<N.added.length;X++){const Z=N.added[X];let nt=E.indexOf(Z);if(nt===-1){for(let wt=0;wt<v.length;wt++)if(wt>=E.length){E.push(Z),nt=wt;break}else if(E[wt]===null){E[wt]=Z,nt=wt;break}if(nt===-1)break}const St=v[nt];St&&St.connect(Z)}}const O=new R,G=new R;function H(N,X,Z){O.setFromMatrixPosition(X.matrixWorld),G.setFromMatrixPosition(Z.matrixWorld);const nt=O.distanceTo(G),St=X.projectionMatrix.elements,wt=Z.projectionMatrix.elements,kt=St[14]/(St[10]-1),Yt=St[14]/(St[10]+1),Vt=(St[9]+1)/St[5],U=(St[9]-1)/St[5],ze=(St[8]-1)/St[0],zt=(wt[8]+1)/wt[0],Ht=kt*ze,At=kt*zt,re=nt/(-ze+zt),Rt=re*-ze;if(X.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(Rt),N.translateZ(re),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert(),St[10]===-1)N.projectionMatrix.copy(X.projectionMatrix),N.projectionMatrixInverse.copy(X.projectionMatrixInverse);else{const P=kt+re,b=Yt+re,W=Ht-Rt,j=At+(nt-Rt),tt=Vt*Yt/b*P,K=U*Yt/b*P;N.projectionMatrix.makePerspective(W,j,tt,K,P,b),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}}function et(N,X){X===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(X.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(i===null)return;let X=N.near,Z=N.far;_.texture!==null&&(_.depthNear>0&&(X=_.depthNear),_.depthFar>0&&(Z=_.depthFar)),x.near=C.near=S.near=X,x.far=C.far=S.far=Z,(M!==x.near||D!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),M=x.near,D=x.far);const nt=N.parent,St=x.cameras;et(x,nt);for(let wt=0;wt<St.length;wt++)et(St[wt],nt);St.length===2?H(x,S,C):x.projectionMatrix.copy(S.projectionMatrix),st(N,x,nt)};function st(N,X,Z){Z===null?N.matrix.copy(X.matrixWorld):(N.matrix.copy(Z.matrixWorld),N.matrix.invert(),N.matrix.multiply(X.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(X.projectionMatrix),N.projectionMatrixInverse.copy(X.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=Nu*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(N){c=N,f!==null&&(f.fixedFoveation=N),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=N)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let ct=null;function bt(N,X){if(u=X.getViewerPose(l||o),g=X,u!==null){const Z=u.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let nt=!1;Z.length!==x.cameras.length&&(x.cameras.length=0,nt=!0);for(let wt=0;wt<Z.length;wt++){const kt=Z[wt];let Yt=null;if(d!==null)Yt=d.getViewport(kt);else{const U=h.getViewSubImage(f,kt);Yt=U.viewport,wt===0&&(t.setRenderTargetTextures(y,U.colorTexture,f.ignoreDepthValues?void 0:U.depthStencilTexture),t.setRenderTarget(y))}let Vt=L[wt];Vt===void 0&&(Vt=new ln,Vt.layers.enable(wt),Vt.viewport=new ie,L[wt]=Vt),Vt.matrix.fromArray(kt.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(kt.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),wt===0&&(x.matrix.copy(Vt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),nt===!0&&x.cameras.push(Vt)}const St=i.enabledFeatures;if(St&&St.includes("depth-sensing")){const wt=h.getDepthInformation(Z[0]);wt&&wt.isValid&&wt.texture&&_.init(t,wt,i.renderState)}}for(let Z=0;Z<v.length;Z++){const nt=E[Z],St=v[Z];nt!==null&&St!==void 0&&St.update(nt,X,l||o)}ct&&ct(N,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),g=null}const It=new I_;It.setAnimationLoop(bt),this.setAnimationLoop=function(N){ct=N},this.dispose=function(){}}}const rr=new qn,g1=new ae;function v1(r,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,P_(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,y,v,E){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),h(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m)):m.isMeshStandardMaterial?(s(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,E)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,y,v):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===We&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===We&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=t.get(m),v=y.envMap,E=y.envMapRotation;v&&(p.envMap.value=v,rr.copy(E),rr.x*=-1,rr.y*=-1,rr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(rr.y*=-1,rr.z*=-1),p.envMapRotation.value.setFromMatrix4(g1.makeRotationFromEuler(rr)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,y,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=v*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===We&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const y=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function x1(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,v){const E=v.program;n.uniformBlockBinding(y,E)}function l(y,v){let E=i[y.id];E===void 0&&(g(y),E=u(y),i[y.id]=E,y.addEventListener("dispose",p));const w=v.program;n.updateUBOMapping(y,w);const T=t.render.frame;s[y.id]!==T&&(f(y),s[y.id]=T)}function u(y){const v=h();y.__bindingPointIndex=v;const E=r.createBuffer(),w=y.__size,T=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,E),r.bufferData(r.UNIFORM_BUFFER,w,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,E),E}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const v=i[y.id],E=y.uniforms,w=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let T=0,S=E.length;T<S;T++){const C=Array.isArray(E[T])?E[T]:[E[T]];for(let L=0,x=C.length;L<x;L++){const M=C[L];if(d(M,T,L,w)===!0){const D=M.__offset,I=Array.isArray(M.value)?M.value:[M.value];let k=0;for(let F=0;F<I.length;F++){const O=I[F],G=_(O);typeof O=="number"||typeof O=="boolean"?(M.__data[0]=O,r.bufferSubData(r.UNIFORM_BUFFER,D+k,M.__data)):O.isMatrix3?(M.__data[0]=O.elements[0],M.__data[1]=O.elements[1],M.__data[2]=O.elements[2],M.__data[3]=0,M.__data[4]=O.elements[3],M.__data[5]=O.elements[4],M.__data[6]=O.elements[5],M.__data[7]=0,M.__data[8]=O.elements[6],M.__data[9]=O.elements[7],M.__data[10]=O.elements[8],M.__data[11]=0):(O.toArray(M.__data,k),k+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,D,M.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(y,v,E,w){const T=y.value,S=v+"_"+E;if(w[S]===void 0)return typeof T=="number"||typeof T=="boolean"?w[S]=T:w[S]=T.clone(),!0;{const C=w[S];if(typeof T=="number"||typeof T=="boolean"){if(C!==T)return w[S]=T,!0}else if(C.equals(T)===!1)return C.copy(T),!0}return!1}function g(y){const v=y.uniforms;let E=0;const w=16;for(let S=0,C=v.length;S<C;S++){const L=Array.isArray(v[S])?v[S]:[v[S]];for(let x=0,M=L.length;x<M;x++){const D=L[x],I=Array.isArray(D.value)?D.value:[D.value];for(let k=0,F=I.length;k<F;k++){const O=I[k],G=_(O),H=E%w,et=H%G.boundary,st=H+et;E+=et,st!==0&&w-st<G.storage&&(E+=w-st),D.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=G.storage}}}const T=E%w;return T>0&&(E+=w-T),y.__size=E,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function p(y){const v=y.target;v.removeEventListener("dispose",p);const E=o.indexOf(v.__bindingPointIndex);o.splice(E,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function m(){for(const y in i)r.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:c,update:l,dispose:m}}class y1{constructor(t={}){const{canvas:e=aM(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const d=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=cn,this.toneMapping=Ni,this.toneMappingExposure=1;const v=this;let E=!1,w=0,T=0,S=null,C=-1,L=null;const x=new ie,M=new ie;let D=null;const I=new Bt(0);let k=0,F=e.width,O=e.height,G=1,H=null,et=null;const st=new ie(0,0,F,O),ct=new ie(0,0,F,O);let bt=!1;const It=new Ph;let N=!1,X=!1;const Z=new ae,nt=new ae,St=new R,wt=new ie,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Yt=!1;function Vt(){return S===null?G:1}let U=n;function ze(A,z){return e.getContext(A,z)}try{const A={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Eh}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",pt,!1),U===null){const z="webgl2";if(U=ze(z,A),U===null)throw ze(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let zt,Ht,At,re,Rt,P,b,W,j,tt,K,xt,ot,ft,Kt,it,_t,Lt,Dt,gt,Wt,Nt,ce,B;function dt(){zt=new bw(U),zt.init(),Nt=new u1(U,zt),Ht=new xw(U,zt,t,Nt),At=new a1(U),Ht.reverseDepthBuffer&&At.buffers.depth.setReversed(!0),re=new Cw(U),Rt=new $A,P=new l1(U,zt,At,Rt,Ht,Nt,re),b=new Ew(v),W=new Tw(v),j=new OM(U),ce=new gw(U,j),tt=new ww(U,j,re,ce),K=new Pw(U,tt,j,re),Dt=new Rw(U,Ht,P),it=new yw(Rt),xt=new XA(v,b,W,zt,Ht,ce,it),ot=new v1(v,Rt),ft=new YA,Kt=new t1(zt),Lt=new _w(v,b,W,At,K,f,c),_t=new s1(v,K,Ht),B=new x1(U,re,Ht,At),gt=new vw(U,zt,re),Wt=new Aw(U,zt,re),re.programs=xt.programs,v.capabilities=Ht,v.extensions=zt,v.properties=Rt,v.renderLists=ft,v.shadowMap=_t,v.state=At,v.info=re}dt();const Y=new _1(v,U);this.xr=Y,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const A=zt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=zt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(A){A!==void 0&&(G=A,this.setSize(F,O,!1))},this.getSize=function(A){return A.set(F,O)},this.setSize=function(A,z,$=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=A,O=z,e.width=Math.floor(A*G),e.height=Math.floor(z*G),$===!0&&(e.style.width=A+"px",e.style.height=z+"px"),this.setViewport(0,0,A,z)},this.getDrawingBufferSize=function(A){return A.set(F*G,O*G).floor()},this.setDrawingBufferSize=function(A,z,$){F=A,O=z,G=$,e.width=Math.floor(A*$),e.height=Math.floor(z*$),this.setViewport(0,0,A,z)},this.getCurrentViewport=function(A){return A.copy(x)},this.getViewport=function(A){return A.copy(st)},this.setViewport=function(A,z,$,q){A.isVector4?st.set(A.x,A.y,A.z,A.w):st.set(A,z,$,q),At.viewport(x.copy(st).multiplyScalar(G).round())},this.getScissor=function(A){return A.copy(ct)},this.setScissor=function(A,z,$,q){A.isVector4?ct.set(A.x,A.y,A.z,A.w):ct.set(A,z,$,q),At.scissor(M.copy(ct).multiplyScalar(G).round())},this.getScissorTest=function(){return bt},this.setScissorTest=function(A){At.setScissorTest(bt=A)},this.setOpaqueSort=function(A){H=A},this.setTransparentSort=function(A){et=A},this.getClearColor=function(A){return A.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor.apply(Lt,arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha.apply(Lt,arguments)},this.clear=function(A=!0,z=!0,$=!0){let q=0;if(A){let V=!1;if(S!==null){const rt=S.texture.format;V=rt===Ah||rt===wh||rt===bh}if(V){const rt=S.texture.type,ht=rt===pi||rt===Mr||rt===go||rt===ws||rt===Mh||rt===Th,vt=Lt.getClearColor(),yt=Lt.getClearAlpha(),Ct=vt.r,Pt=vt.g,Et=vt.b;ht?(d[0]=Ct,d[1]=Pt,d[2]=Et,d[3]=yt,U.clearBufferuiv(U.COLOR,0,d)):(g[0]=Ct,g[1]=Pt,g[2]=Et,g[3]=yt,U.clearBufferiv(U.COLOR,0,g))}else q|=U.COLOR_BUFFER_BIT}z&&(q|=U.DEPTH_BUFFER_BIT,U.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),$&&(q|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),ft.dispose(),Kt.dispose(),Rt.dispose(),b.dispose(),W.dispose(),K.dispose(),ce.dispose(),B.dispose(),xt.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Xh),Y.removeEventListener("sessionend",$h),ji.stop()};function J(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const A=re.autoReset,z=_t.enabled,$=_t.autoUpdate,q=_t.needsUpdate,V=_t.type;dt(),re.autoReset=A,_t.enabled=z,_t.autoUpdate=$,_t.needsUpdate=q,_t.type=V}function pt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function $t(A){const z=A.target;z.removeEventListener("dispose",$t),Ee(z)}function Ee(A){$e(A),Rt.remove(A)}function $e(A){const z=Rt.get(A).programs;z!==void 0&&(z.forEach(function($){xt.releaseProgram($)}),A.isShaderMaterial&&xt.releaseShaderCache(A))}this.renderBufferDirect=function(A,z,$,q,V,rt){z===null&&(z=kt);const ht=V.isMesh&&V.matrixWorld.determinant()<0,vt=Z_(A,z,$,q,V);At.setMaterial(q,ht);let yt=$.index,Ct=1;if(q.wireframe===!0){if(yt=tt.getWireframeAttribute($),yt===void 0)return;Ct=2}const Pt=$.drawRange,Et=$.attributes.position;let ee=Pt.start*Ct,ue=(Pt.start+Pt.count)*Ct;rt!==null&&(ee=Math.max(ee,rt.start*Ct),ue=Math.min(ue,(rt.start+rt.count)*Ct)),yt!==null?(ee=Math.max(ee,0),ue=Math.min(ue,yt.count)):Et!=null&&(ee=Math.max(ee,0),ue=Math.min(ue,Et.count));const ge=ue-ee;if(ge<0||ge===1/0)return;ce.setup(V,q,vt,$,yt);let nn,Zt=gt;if(yt!==null&&(nn=j.get(yt),Zt=Wt,Zt.setIndex(nn)),V.isMesh)q.wireframe===!0?(At.setLineWidth(q.wireframeLinewidth*Vt()),Zt.setMode(U.LINES)):Zt.setMode(U.TRIANGLES);else if(V.isLine){let Mt=q.linewidth;Mt===void 0&&(Mt=1),At.setLineWidth(Mt*Vt()),V.isLineSegments?Zt.setMode(U.LINES):V.isLineLoop?Zt.setMode(U.LINE_LOOP):Zt.setMode(U.LINE_STRIP)}else V.isPoints?Zt.setMode(U.POINTS):V.isSprite&&Zt.setMode(U.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)Zt.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(zt.get("WEBGL_multi_draw"))Zt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Mt=V._multiDrawStarts,Pe=V._multiDrawCounts,Qt=V._multiDrawCount,Pn=yt?j.get(yt).bytesPerElement:1,Cr=Rt.get(q).currentProgram.getUniforms();for(let rn=0;rn<Qt;rn++)Cr.setValue(U,"_gl_DrawID",rn),Zt.render(Mt[rn]/Pn,Pe[rn])}else if(V.isInstancedMesh)Zt.renderInstances(ee,ge,V.count);else if($.isInstancedBufferGeometry){const Mt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Pe=Math.min($.instanceCount,Mt);Zt.renderInstances(ee,ge,Pe)}else Zt.render(ee,ge)};function Jt(A,z,$){A.transparent===!0&&A.side===Fe&&A.forceSinglePass===!1?(A.side=We,A.needsUpdate=!0,Do(A,z,$),A.side=Hi,A.needsUpdate=!0,Do(A,z,$),A.side=Fe):Do(A,z,$)}this.compile=function(A,z,$=null){$===null&&($=A),p=Kt.get($),p.init(z),y.push(p),$.traverseVisible(function(V){V.isLight&&V.layers.test(z.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),A!==$&&A.traverseVisible(function(V){V.isLight&&V.layers.test(z.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();const q=new Set;return A.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const rt=V.material;if(rt)if(Array.isArray(rt))for(let ht=0;ht<rt.length;ht++){const vt=rt[ht];Jt(vt,$,V),q.add(vt)}else Jt(rt,$,V),q.add(rt)}),y.pop(),p=null,q},this.compileAsync=function(A,z,$=null){const q=this.compile(A,z,$);return new Promise(V=>{function rt(){if(q.forEach(function(ht){Rt.get(ht).currentProgram.isReady()&&q.delete(ht)}),q.size===0){V(A);return}setTimeout(rt,10)}zt.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let qe=null;function jn(A){qe&&qe(A)}function Xh(){ji.stop()}function $h(){ji.start()}const ji=new I_;ji.setAnimationLoop(jn),typeof self<"u"&&ji.setContext(self),this.setAnimationLoop=function(A){qe=A,Y.setAnimationLoop(A),A===null?ji.stop():ji.start()},Y.addEventListener("sessionstart",Xh),Y.addEventListener("sessionend",$h),this.render=function(A,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(z),z=Y.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,z,S),p=Kt.get(A,y.length),p.init(z),y.push(p),nt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),It.setFromProjectionMatrix(nt),X=this.localClippingEnabled,N=it.init(this.clippingPlanes,X),_=ft.get(A,m.length),_.init(),m.push(_),Y.enabled===!0&&Y.isPresenting===!0){const rt=v.xr.getDepthSensingMesh();rt!==null&&mc(rt,z,-1/0,v.sortObjects)}mc(A,z,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(H,et),Yt=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Yt&&Lt.addToRenderList(_,A),this.info.render.frame++,N===!0&&it.beginShadows();const $=p.state.shadowsArray;_t.render($,A,z),N===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=_.opaque,V=_.transmissive;if(p.setupLights(),z.isArrayCamera){const rt=z.cameras;if(V.length>0)for(let ht=0,vt=rt.length;ht<vt;ht++){const yt=rt[ht];Yh(q,V,A,yt)}Yt&&Lt.render(A);for(let ht=0,vt=rt.length;ht<vt;ht++){const yt=rt[ht];qh(_,A,yt,yt.viewport)}}else V.length>0&&Yh(q,V,A,z),Yt&&Lt.render(A),qh(_,A,z);S!==null&&(P.updateMultisampleRenderTarget(S),P.updateRenderTargetMipmap(S)),A.isScene===!0&&A.onAfterRender(v,A,z),ce.resetDefaultState(),C=-1,L=null,y.pop(),y.length>0?(p=y[y.length-1],N===!0&&it.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function mc(A,z,$,q){if(A.visible===!1)return;if(A.layers.test(z.layers)){if(A.isGroup)$=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(z);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||It.intersectsSprite(A)){q&&wt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(nt);const ht=K.update(A),vt=A.material;vt.visible&&_.push(A,ht,vt,$,wt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||It.intersectsObject(A))){const ht=K.update(A),vt=A.material;if(q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),wt.copy(A.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),wt.copy(ht.boundingSphere.center)),wt.applyMatrix4(A.matrixWorld).applyMatrix4(nt)),Array.isArray(vt)){const yt=ht.groups;for(let Ct=0,Pt=yt.length;Ct<Pt;Ct++){const Et=yt[Ct],ee=vt[Et.materialIndex];ee&&ee.visible&&_.push(A,ht,ee,$,wt.z,Et)}}else vt.visible&&_.push(A,ht,vt,$,wt.z,null)}}const rt=A.children;for(let ht=0,vt=rt.length;ht<vt;ht++)mc(rt[ht],z,$,q)}function qh(A,z,$,q){const V=A.opaque,rt=A.transmissive,ht=A.transparent;p.setupLightsView($),N===!0&&it.setGlobalState(v.clippingPlanes,$),q&&At.viewport(x.copy(q)),V.length>0&&Lo(V,z,$),rt.length>0&&Lo(rt,z,$),ht.length>0&&Lo(ht,z,$),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function Yh(A,z,$,q){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new Tr(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?bo:pi,minFilter:pr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace}));const rt=p.state.transmissionRenderTarget[q.id],ht=q.viewport||x;rt.setSize(ht.z,ht.w);const vt=v.getRenderTarget();v.setRenderTarget(rt),v.getClearColor(I),k=v.getClearAlpha(),k<1&&v.setClearColor(16777215,.5),v.clear(),Yt&&Lt.render($);const yt=v.toneMapping;v.toneMapping=Ni;const Ct=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),N===!0&&it.setGlobalState(v.clippingPlanes,q),Lo(A,$,q),P.updateMultisampleRenderTarget(rt),P.updateRenderTargetMipmap(rt),zt.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let Et=0,ee=z.length;Et<ee;Et++){const ue=z[Et],ge=ue.object,nn=ue.geometry,Zt=ue.material,Mt=ue.group;if(Zt.side===Fe&&ge.layers.test(q.layers)){const Pe=Zt.side;Zt.side=We,Zt.needsUpdate=!0,Kh(ge,$,q,nn,Zt,Mt),Zt.side=Pe,Zt.needsUpdate=!0,Pt=!0}}Pt===!0&&(P.updateMultisampleRenderTarget(rt),P.updateRenderTargetMipmap(rt))}v.setRenderTarget(vt),v.setClearColor(I,k),Ct!==void 0&&(q.viewport=Ct),v.toneMapping=yt}function Lo(A,z,$){const q=z.isScene===!0?z.overrideMaterial:null;for(let V=0,rt=A.length;V<rt;V++){const ht=A[V],vt=ht.object,yt=ht.geometry,Ct=q===null?ht.material:q,Pt=ht.group;vt.layers.test($.layers)&&Kh(vt,z,$,yt,Ct,Pt)}}function Kh(A,z,$,q,V,rt){A.onBeforeRender(v,z,$,q,V,rt),A.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),V.onBeforeRender(v,z,$,q,A,rt),V.transparent===!0&&V.side===Fe&&V.forceSinglePass===!1?(V.side=We,V.needsUpdate=!0,v.renderBufferDirect($,z,q,V,A,rt),V.side=Hi,V.needsUpdate=!0,v.renderBufferDirect($,z,q,V,A,rt),V.side=Fe):v.renderBufferDirect($,z,q,V,A,rt),A.onAfterRender(v,z,$,q,V,rt)}function Do(A,z,$){z.isScene!==!0&&(z=kt);const q=Rt.get(A),V=p.state.lights,rt=p.state.shadowsArray,ht=V.state.version,vt=xt.getParameters(A,V.state,rt,z,$),yt=xt.getProgramCacheKey(vt);let Ct=q.programs;q.environment=A.isMeshStandardMaterial?z.environment:null,q.fog=z.fog,q.envMap=(A.isMeshStandardMaterial?W:b).get(A.envMap||q.environment),q.envMapRotation=q.environment!==null&&A.envMap===null?z.environmentRotation:A.envMapRotation,Ct===void 0&&(A.addEventListener("dispose",$t),Ct=new Map,q.programs=Ct);let Pt=Ct.get(yt);if(Pt!==void 0){if(q.currentProgram===Pt&&q.lightsStateVersion===ht)return Jh(A,vt),Pt}else vt.uniforms=xt.getUniforms(A),A.onBeforeCompile(vt,v),Pt=xt.acquireProgram(vt,yt),Ct.set(yt,Pt),q.uniforms=vt.uniforms;const Et=q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Et.clippingPlanes=it.uniform),Jh(A,vt),q.needsLights=tg(A),q.lightsStateVersion=ht,q.needsLights&&(Et.ambientLightColor.value=V.state.ambient,Et.lightProbe.value=V.state.probe,Et.directionalLights.value=V.state.directional,Et.directionalLightShadows.value=V.state.directionalShadow,Et.spotLights.value=V.state.spot,Et.spotLightShadows.value=V.state.spotShadow,Et.rectAreaLights.value=V.state.rectArea,Et.ltc_1.value=V.state.rectAreaLTC1,Et.ltc_2.value=V.state.rectAreaLTC2,Et.pointLights.value=V.state.point,Et.pointLightShadows.value=V.state.pointShadow,Et.hemisphereLights.value=V.state.hemi,Et.directionalShadowMap.value=V.state.directionalShadowMap,Et.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Et.spotShadowMap.value=V.state.spotShadowMap,Et.spotLightMatrix.value=V.state.spotLightMatrix,Et.spotLightMap.value=V.state.spotLightMap,Et.pointShadowMap.value=V.state.pointShadowMap,Et.pointShadowMatrix.value=V.state.pointShadowMatrix),q.currentProgram=Pt,q.uniformsList=null,Pt}function jh(A){if(A.uniformsList===null){const z=A.currentProgram.getUniforms();A.uniformsList=Da.seqWithValue(z.seq,A.uniforms)}return A.uniformsList}function Jh(A,z){const $=Rt.get(A);$.outputColorSpace=z.outputColorSpace,$.batching=z.batching,$.batchingColor=z.batchingColor,$.instancing=z.instancing,$.instancingColor=z.instancingColor,$.instancingMorph=z.instancingMorph,$.skinning=z.skinning,$.morphTargets=z.morphTargets,$.morphNormals=z.morphNormals,$.morphColors=z.morphColors,$.morphTargetsCount=z.morphTargetsCount,$.numClippingPlanes=z.numClippingPlanes,$.numIntersection=z.numClipIntersection,$.vertexAlphas=z.vertexAlphas,$.vertexTangents=z.vertexTangents,$.toneMapping=z.toneMapping}function Z_(A,z,$,q,V){z.isScene!==!0&&(z=kt),P.resetTextureUnits();const rt=z.fog,ht=q.isMeshStandardMaterial?z.environment:null,vt=S===null?v.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:Yi,yt=(q.isMeshStandardMaterial?W:b).get(q.envMap||ht),Ct=q.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Pt=!!$.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Et=!!$.morphAttributes.position,ee=!!$.morphAttributes.normal,ue=!!$.morphAttributes.color;let ge=Ni;q.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(ge=v.toneMapping);const nn=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Zt=nn!==void 0?nn.length:0,Mt=Rt.get(q),Pe=p.state.lights;if(N===!0&&(X===!0||A!==L)){const yn=A===L&&q.id===C;it.setState(q,A,yn)}let Qt=!1;q.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==Pe.state.version||Mt.outputColorSpace!==vt||V.isBatchedMesh&&Mt.batching===!1||!V.isBatchedMesh&&Mt.batching===!0||V.isBatchedMesh&&Mt.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Mt.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Mt.instancing===!1||!V.isInstancedMesh&&Mt.instancing===!0||V.isSkinnedMesh&&Mt.skinning===!1||!V.isSkinnedMesh&&Mt.skinning===!0||V.isInstancedMesh&&Mt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Mt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Mt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Mt.instancingMorph===!1&&V.morphTexture!==null||Mt.envMap!==yt||q.fog===!0&&Mt.fog!==rt||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==it.numPlanes||Mt.numIntersection!==it.numIntersection)||Mt.vertexAlphas!==Ct||Mt.vertexTangents!==Pt||Mt.morphTargets!==Et||Mt.morphNormals!==ee||Mt.morphColors!==ue||Mt.toneMapping!==ge||Mt.morphTargetsCount!==Zt)&&(Qt=!0):(Qt=!0,Mt.__version=q.version);let Pn=Mt.currentProgram;Qt===!0&&(Pn=Do(q,z,V));let Cr=!1,rn=!1,_c=!1;const xe=Pn.getUniforms(),gi=Mt.uniforms;if(At.useProgram(Pn.program)&&(Cr=!0,rn=!0,_c=!0),q.id!==C&&(C=q.id,rn=!0),Cr||L!==A){Ht.reverseDepthBuffer?(Z.copy(A.projectionMatrix),lM(Z),uM(Z),xe.setValue(U,"projectionMatrix",Z)):xe.setValue(U,"projectionMatrix",A.projectionMatrix),xe.setValue(U,"viewMatrix",A.matrixWorldInverse);const yn=xe.map.cameraPosition;yn!==void 0&&yn.setValue(U,St.setFromMatrixPosition(A.matrixWorld)),Ht.logarithmicDepthBuffer&&xe.setValue(U,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&xe.setValue(U,"isOrthographic",A.isOrthographicCamera===!0),L!==A&&(L=A,rn=!0,_c=!0)}if(V.isSkinnedMesh){xe.setOptional(U,V,"bindMatrix"),xe.setOptional(U,V,"bindMatrixInverse");const yn=V.skeleton;yn&&(yn.boneTexture===null&&yn.computeBoneTexture(),xe.setValue(U,"boneTexture",yn.boneTexture,P))}V.isBatchedMesh&&(xe.setOptional(U,V,"batchingTexture"),xe.setValue(U,"batchingTexture",V._matricesTexture,P),xe.setOptional(U,V,"batchingIdTexture"),xe.setValue(U,"batchingIdTexture",V._indirectTexture,P),xe.setOptional(U,V,"batchingColorTexture"),V._colorsTexture!==null&&xe.setValue(U,"batchingColorTexture",V._colorsTexture,P));const gc=$.morphAttributes;if((gc.position!==void 0||gc.normal!==void 0||gc.color!==void 0)&&Dt.update(V,$,Pn),(rn||Mt.receiveShadow!==V.receiveShadow)&&(Mt.receiveShadow=V.receiveShadow,xe.setValue(U,"receiveShadow",V.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(gi.envMap.value=yt,gi.flipEnvMap.value=yt.isCubeTexture&&yt.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&z.environment!==null&&(gi.envMapIntensity.value=z.environmentIntensity),rn&&(xe.setValue(U,"toneMappingExposure",v.toneMappingExposure),Mt.needsLights&&Q_(gi,_c),rt&&q.fog===!0&&ot.refreshFogUniforms(gi,rt),ot.refreshMaterialUniforms(gi,q,G,O,p.state.transmissionRenderTarget[A.id]),Da.upload(U,jh(Mt),gi,P)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Da.upload(U,jh(Mt),gi,P),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&xe.setValue(U,"center",V.center),xe.setValue(U,"modelViewMatrix",V.modelViewMatrix),xe.setValue(U,"normalMatrix",V.normalMatrix),xe.setValue(U,"modelMatrix",V.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const yn=q.uniformsGroups;for(let vc=0,eg=yn.length;vc<eg;vc++){const Zh=yn[vc];B.update(Zh,Pn),B.bind(Zh,Pn)}}return Pn}function Q_(A,z){A.ambientLightColor.needsUpdate=z,A.lightProbe.needsUpdate=z,A.directionalLights.needsUpdate=z,A.directionalLightShadows.needsUpdate=z,A.pointLights.needsUpdate=z,A.pointLightShadows.needsUpdate=z,A.spotLights.needsUpdate=z,A.spotLightShadows.needsUpdate=z,A.rectAreaLights.needsUpdate=z,A.hemisphereLights.needsUpdate=z}function tg(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(A,z,$){Rt.get(A.texture).__webglTexture=z,Rt.get(A.depthTexture).__webglTexture=$;const q=Rt.get(A);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=$===void 0,q.__autoAllocateDepthBuffer||zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,z){const $=Rt.get(A);$.__webglFramebuffer=z,$.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(A,z=0,$=0){S=A,w=z,T=$;let q=!0,V=null,rt=!1,ht=!1;if(A){const yt=Rt.get(A);if(yt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(U.FRAMEBUFFER,null),q=!1;else if(yt.__webglFramebuffer===void 0)P.setupRenderTarget(A);else if(yt.__hasExternalTextures)P.rebindTextures(A,Rt.get(A.texture).__webglTexture,Rt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Et=A.depthTexture;if(yt.__boundDepthTexture!==Et){if(Et!==null&&Rt.has(Et)&&(A.width!==Et.image.width||A.height!==Et.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(A)}}const Ct=A.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ht=!0);const Pt=Rt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Pt[z])?V=Pt[z][$]:V=Pt[z],rt=!0):A.samples>0&&P.useMultisampledRTT(A)===!1?V=Rt.get(A).__webglMultisampledFramebuffer:Array.isArray(Pt)?V=Pt[$]:V=Pt,x.copy(A.viewport),M.copy(A.scissor),D=A.scissorTest}else x.copy(st).multiplyScalar(G).floor(),M.copy(ct).multiplyScalar(G).floor(),D=bt;if(At.bindFramebuffer(U.FRAMEBUFFER,V)&&q&&At.drawBuffers(A,V),At.viewport(x),At.scissor(M),At.setScissorTest(D),rt){const yt=Rt.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+z,yt.__webglTexture,$)}else if(ht){const yt=Rt.get(A.texture),Ct=z||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,yt.__webglTexture,$||0,Ct)}C=-1},this.readRenderTargetPixels=function(A,z,$,q,V,rt,ht){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=Rt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ht!==void 0&&(vt=vt[ht]),vt){At.bindFramebuffer(U.FRAMEBUFFER,vt);try{const yt=A.texture,Ct=yt.format,Pt=yt.type;if(!Ht.textureFormatReadable(Ct)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ht.textureTypeReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=A.width-q&&$>=0&&$<=A.height-V&&U.readPixels(z,$,q,V,Nt.convert(Ct),Nt.convert(Pt),rt)}finally{const yt=S!==null?Rt.get(S).__webglFramebuffer:null;At.bindFramebuffer(U.FRAMEBUFFER,yt)}}},this.readRenderTargetPixelsAsync=async function(A,z,$,q,V,rt,ht){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=Rt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ht!==void 0&&(vt=vt[ht]),vt){const yt=A.texture,Ct=yt.format,Pt=yt.type;if(!Ht.textureFormatReadable(Ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ht.textureTypeReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=A.width-q&&$>=0&&$<=A.height-V){At.bindFramebuffer(U.FRAMEBUFFER,vt);const Et=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Et),U.bufferData(U.PIXEL_PACK_BUFFER,rt.byteLength,U.STREAM_READ),U.readPixels(z,$,q,V,Nt.convert(Ct),Nt.convert(Pt),0);const ee=S!==null?Rt.get(S).__webglFramebuffer:null;At.bindFramebuffer(U.FRAMEBUFFER,ee);const ue=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await cM(U,ue,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Et),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,rt),U.deleteBuffer(Et),U.deleteSync(ue),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,z=null,$=0){A.isTexture!==!0&&(La("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,A=arguments[1]);const q=Math.pow(2,-$),V=Math.floor(A.image.width*q),rt=Math.floor(A.image.height*q),ht=z!==null?z.x:0,vt=z!==null?z.y:0;P.setTexture2D(A,0),U.copyTexSubImage2D(U.TEXTURE_2D,$,0,0,ht,vt,V,rt),At.unbindTexture()},this.copyTextureToTexture=function(A,z,$=null,q=null,V=0){A.isTexture!==!0&&(La("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,A=arguments[1],z=arguments[2],V=arguments[3]||0,$=null);let rt,ht,vt,yt,Ct,Pt;$!==null?(rt=$.max.x-$.min.x,ht=$.max.y-$.min.y,vt=$.min.x,yt=$.min.y):(rt=A.image.width,ht=A.image.height,vt=0,yt=0),q!==null?(Ct=q.x,Pt=q.y):(Ct=0,Pt=0);const Et=Nt.convert(z.format),ee=Nt.convert(z.type);P.setTexture2D(z,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,z.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,z.unpackAlignment);const ue=U.getParameter(U.UNPACK_ROW_LENGTH),ge=U.getParameter(U.UNPACK_IMAGE_HEIGHT),nn=U.getParameter(U.UNPACK_SKIP_PIXELS),Zt=U.getParameter(U.UNPACK_SKIP_ROWS),Mt=U.getParameter(U.UNPACK_SKIP_IMAGES),Pe=A.isCompressedTexture?A.mipmaps[V]:A.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,Pe.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Pe.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,vt),U.pixelStorei(U.UNPACK_SKIP_ROWS,yt),A.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,V,Ct,Pt,rt,ht,Et,ee,Pe.data):A.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,V,Ct,Pt,Pe.width,Pe.height,Et,Pe.data):U.texSubImage2D(U.TEXTURE_2D,V,Ct,Pt,rt,ht,Et,ee,Pe),U.pixelStorei(U.UNPACK_ROW_LENGTH,ue),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ge),U.pixelStorei(U.UNPACK_SKIP_PIXELS,nn),U.pixelStorei(U.UNPACK_SKIP_ROWS,Zt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Mt),V===0&&z.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),At.unbindTexture()},this.copyTextureToTexture3D=function(A,z,$=null,q=null,V=0){A.isTexture!==!0&&(La("WebGLRenderer: copyTextureToTexture3D function signature has changed."),$=arguments[0]||null,q=arguments[1]||null,A=arguments[2],z=arguments[3],V=arguments[4]||0);let rt,ht,vt,yt,Ct,Pt,Et,ee,ue;const ge=A.isCompressedTexture?A.mipmaps[V]:A.image;$!==null?(rt=$.max.x-$.min.x,ht=$.max.y-$.min.y,vt=$.max.z-$.min.z,yt=$.min.x,Ct=$.min.y,Pt=$.min.z):(rt=ge.width,ht=ge.height,vt=ge.depth,yt=0,Ct=0,Pt=0),q!==null?(Et=q.x,ee=q.y,ue=q.z):(Et=0,ee=0,ue=0);const nn=Nt.convert(z.format),Zt=Nt.convert(z.type);let Mt;if(z.isData3DTexture)P.setTexture3D(z,0),Mt=U.TEXTURE_3D;else if(z.isDataArrayTexture||z.isCompressedArrayTexture)P.setTexture2DArray(z,0),Mt=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,z.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,z.unpackAlignment);const Pe=U.getParameter(U.UNPACK_ROW_LENGTH),Qt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Pn=U.getParameter(U.UNPACK_SKIP_PIXELS),Cr=U.getParameter(U.UNPACK_SKIP_ROWS),rn=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ge.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ge.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,yt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ct),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Pt),A.isDataTexture||A.isData3DTexture?U.texSubImage3D(Mt,V,Et,ee,ue,rt,ht,vt,nn,Zt,ge.data):z.isCompressedArrayTexture?U.compressedTexSubImage3D(Mt,V,Et,ee,ue,rt,ht,vt,nn,ge.data):U.texSubImage3D(Mt,V,Et,ee,ue,rt,ht,vt,nn,Zt,ge),U.pixelStorei(U.UNPACK_ROW_LENGTH,Pe),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Qt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Pn),U.pixelStorei(U.UNPACK_SKIP_ROWS,Cr),U.pixelStorei(U.UNPACK_SKIP_IMAGES,rn),V===0&&z.generateMipmaps&&U.generateMipmap(Mt),At.unbindTexture()},this.initRenderTarget=function(A){Rt.get(A).__webglFramebuffer===void 0&&P.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?P.setTextureCube(A,0):A.isData3DTexture?P.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?P.setTexture2DArray(A,0):P.setTexture2D(A,0),At.unbindTexture()},this.resetState=function(){w=0,T=0,S=null,At.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Ch?"display-p3":"srgb",e.unpackColorSpace=te.workingColorSpace===hc?"display-p3":"srgb"}}class E1 extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class S1{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Iu,this.updateRanges=[],this.version=0,this.uuid=Oi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Oi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Oi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ke=new R;class ja{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Vn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Vn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Vn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Vn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Vn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array),s=ne(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new tn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ja(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class k_ extends Ki{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Bt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let $r;const Xs=new R,qr=new R,Yr=new R,Kr=new lt,$s=new lt,V_=new ae,ca=new R,qs=new R,la=new R,qd=new lt,xl=new lt,Yd=new lt;class M1 extends Te{constructor(t=new k_){if(super(),this.isSprite=!0,this.type="Sprite",$r===void 0){$r=new qt;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new S1(e,5);$r.setIndex([0,1,2,0,2,3]),$r.setAttribute("position",new ja(n,3,0,!1)),$r.setAttribute("uv",new ja(n,2,3,!1))}this.geometry=$r,this.material=t,this.center=new lt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),qr.setFromMatrixScale(this.matrixWorld),V_.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Yr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&qr.multiplyScalar(-Yr.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;ua(ca.set(-.5,-.5,0),Yr,o,qr,i,s),ua(qs.set(.5,-.5,0),Yr,o,qr,i,s),ua(la.set(.5,.5,0),Yr,o,qr,i,s),qd.set(0,0),xl.set(1,0),Yd.set(1,1);let a=t.ray.intersectTriangle(ca,qs,la,!1,Xs);if(a===null&&(ua(qs.set(-.5,.5,0),Yr,o,qr,i,s),xl.set(0,1),a=t.ray.intersectTriangle(ca,la,qs,!1,Xs),a===null))return;const c=t.ray.origin.distanceTo(Xs);c<t.near||c>t.far||e.push({distance:c,point:Xs.clone(),uv:hn.getInterpolation(Xs,ca,qs,la,qd,xl,Yd,new lt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ua(r,t,e,n,i,s){Kr.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?($s.x=s*Kr.x-i*Kr.y,$s.y=i*Kr.x+s*Kr.y):$s.copy(Kr),r.copy(t),r.x+=$s.x,r.y+=$s.y,r.applyMatrix4(V_)}class Un extends Ki{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Bt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ja=new R,Za=new R,Kd=new ae,Ys=new Rh,ha=new Co,yl=new R,jd=new R;class Pi extends Te{constructor(t=new qt,e=new Un){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)Ja.fromBufferAttribute(e,i-1),Za.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Ja.distanceTo(Za);t.setAttribute("lineDistance",new Ft(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ha.copy(n.boundingSphere),ha.applyMatrix4(i),ha.radius+=s,t.ray.intersectsSphere(ha)===!1)return;Kd.copy(i).invert(),Ys.copy(t.ray).applyMatrix4(Kd);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,p=g-1;_<p;_+=l){const m=u.getX(_),y=u.getX(_+1),v=fa(this,t,Ys,c,m,y);v&&e.push(v)}if(this.isLineLoop){const _=u.getX(g-1),p=u.getX(d),m=fa(this,t,Ys,c,_,p);m&&e.push(m)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=d,p=g-1;_<p;_+=l){const m=fa(this,t,Ys,c,_,_+1);m&&e.push(m)}if(this.isLineLoop){const _=fa(this,t,Ys,c,g-1,d);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function fa(r,t,e,n,i,s){const o=r.geometry.attributes.position;if(Ja.fromBufferAttribute(o,i),Za.fromBufferAttribute(o,s),e.distanceSqToSegment(Ja,Za,yl,jd)>n)return;yl.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(yl);if(!(c<t.near||c>t.far))return{distance:c,point:jd.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}const Jd=new R,Zd=new R;class Ro extends Pi{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)Jd.fromBufferAttribute(e,i),Zd.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Jd.distanceTo(Zd);t.setAttribute("lineDistance",new Ft(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Dh extends Ki{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Bt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Qd=new ae,Uu=new Rh,da=new Co,pa=new R;class H_ extends Te{constructor(t=new qt,e=new Dh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),da.copy(n.boundingSphere),da.applyMatrix4(i),da.radius+=s,t.ray.intersectsSphere(da)===!1)return;Qd.copy(i).invert(),Uu.copy(t.ray).applyMatrix4(Qd);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,_=d;g<_;g++){const p=l.getX(g);pa.fromBufferAttribute(h,p),tp(pa,p,c,i,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,_=d;g<_;g++)pa.fromBufferAttribute(h,g),tp(pa,g,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function tp(r,t,e,n,i,s,o){const a=Uu.distanceSqToPoint(r);if(a<e){const c=new R;Uu.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class T1 extends Xe{constructor(t,e,n,i,s,o,a,c,l){super(t,e,n,i,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Kn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(s-1);const u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),c=e||(o.isVector2?new lt:new R);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new R,i=[],s=[],o=[],a=new R,c=new ae;for(let d=0;d<=t;d++){const g=d/t;i[d]=this.getTangentAt(g,new R)}s[0]=new R,o[0]=new R;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(De(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(i[d],s[d])}if(e===!0){let d=Math.acos(De(s[0].dot(s[t]),-1,1));d/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let g=1;g<=t;g++)s[g].applyMatrix4(c.makeRotationAxis(i[g],d*g)),o[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ih extends Kn{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new lt){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class b1 extends Ih{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Nh(){let r=0,t=0,e=0,n=0;function i(s,o,a,c){r=s,t=a,e=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){i(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,h){let f=(o-s)/l-(a-s)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const ma=new R,El=new Nh,Sl=new Nh,Ml=new Nh;class G_ extends Kn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new R){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=i[(a-1)%s]:(ma.subVectors(i[0],i[1]).add(i[0]),l=ma);const h=i[a%s],f=i[(a+1)%s];if(this.closed||a+2<s?u=i[(a+2)%s]:(ma.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=ma),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(u),d);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),El.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,_,p),Sl.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,_,p),Ml.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,_,p)}else this.curveType==="catmullrom"&&(El.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),Sl.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),Ml.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(El.calc(c),Sl.calc(c),Ml.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new R().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ep(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,c=r*a;return(2*e-2*n+s+o)*c+(-3*e+3*n-2*s-o)*a+s*r+e}function w1(r,t){const e=1-r;return e*e*t}function A1(r,t){return 2*(1-r)*r*t}function C1(r,t){return r*r*t}function so(r,t,e,n){return w1(r,t)+A1(r,e)+C1(r,n)}function R1(r,t){const e=1-r;return e*e*e*t}function P1(r,t){const e=1-r;return 3*e*e*r*t}function L1(r,t){return 3*(1-r)*r*r*t}function D1(r,t){return r*r*r*t}function oo(r,t,e,n,i){return R1(r,t)+P1(r,e)+L1(r,n)+D1(r,i)}class W_ extends Kn{constructor(t=new lt,e=new lt,n=new lt,i=new lt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new lt){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(oo(t,i.x,s.x,o.x,a.x),oo(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class I1 extends Kn{constructor(t=new R,e=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new R){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(oo(t,i.x,s.x,o.x,a.x),oo(t,i.y,s.y,o.y,a.y),oo(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class X_ extends Kn{constructor(t=new lt,e=new lt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new lt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new lt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class N1 extends Kn{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $_ extends Kn{constructor(t=new lt,e=new lt,n=new lt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new lt){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(so(t,i.x,s.x,o.x),so(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class q_ extends Kn{constructor(t=new R,e=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new R){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(so(t,i.x,s.x,o.x),so(t,i.y,s.y,o.y),so(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Y_ extends Kn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new lt){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,c=i[o===0?o:o-1],l=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(ep(a,c.x,l.x,u.x,h.x),ep(a,c.y,l.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new lt().fromArray(i))}return this}}var Fu=Object.freeze({__proto__:null,ArcCurve:b1,CatmullRomCurve3:G_,CubicBezierCurve:W_,CubicBezierCurve3:I1,EllipseCurve:Ih,LineCurve:X_,LineCurve3:N1,QuadraticBezierCurve:$_,QuadraticBezierCurve3:q_,SplineCurve:Y_});class O1 extends Kn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Fu[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Fu[i.type]().fromJSON(i))}return this}}class U1 extends O1{constructor(t){super(),this.type="Path",this.currentPoint=new lt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new X_(this.currentPoint.clone(),new lt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new $_(this.currentPoint.clone(),new lt(t,e),new lt(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){const a=new W_(this.currentPoint.clone(),new lt(t,e),new lt(n,i),new lt(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Y_(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,i,s,o,a,c),this}absellipse(t,e,n,i,s,o,a,c){const l=new Ih(t,e,n,i,s,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Oh extends qt{constructor(t=[new lt(0,-.5),new lt(.5,0),new lt(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=De(i,0,Math.PI*2);const s=[],o=[],a=[],c=[],l=[],u=1/e,h=new R,f=new lt,d=new R,g=new R,_=new R;let p=0,m=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:p=t[y+1].x-t[y].x,m=t[y+1].y-t[y].y,d.x=m*1,d.y=-p,d.z=m*0,_.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:p=t[y+1].x-t[y].x,m=t[y+1].y-t[y].y,d.x=m*1,d.y=-p,d.z=m*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),c.push(d.x,d.y,d.z),_.copy(g)}for(let y=0;y<=e;y++){const v=n+y*u*i,E=Math.sin(v),w=Math.cos(v);for(let T=0;T<=t.length-1;T++){h.x=t[T].x*E,h.y=t[T].y,h.z=t[T].x*w,o.push(h.x,h.y,h.z),f.x=y/e,f.y=T/(t.length-1),a.push(f.x,f.y);const S=c[3*T+0]*E,C=c[3*T+1],L=c[3*T+0]*w;l.push(S,C,L)}}for(let y=0;y<e;y++)for(let v=0;v<t.length-1;v++){const E=v+y*t.length,w=E,T=E+t.length,S=E+t.length+1,C=E+1;s.push(w,T,C),s.push(S,C,T)}this.setIndex(s),this.setAttribute("position",new Ft(o,3)),this.setAttribute("uv",new Ft(a,2)),this.setAttribute("normal",new Ft(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oh(t.points,t.segments,t.phiStart,t.phiLength)}}class Uh extends Oh{constructor(t=1,e=1,n=4,i=8){const s=new U1;s.absarc(0,-e/2,t,Math.PI*1.5,0),s.absarc(0,e/2,t,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new Uh(t.radius,t.length,t.capSegments,t.radialSegments)}}class Ce extends qt{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const u=[],h=[],f=[],d=[];let g=0;const _=[],p=n/2;let m=0;y(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Ft(h,3)),this.setAttribute("normal",new Ft(f,3)),this.setAttribute("uv",new Ft(d,2));function y(){const E=new R,w=new R;let T=0;const S=(e-t)/n;for(let C=0;C<=s;C++){const L=[],x=C/s,M=x*(e-t)+t;for(let D=0;D<=i;D++){const I=D/i,k=I*c+a,F=Math.sin(k),O=Math.cos(k);w.x=M*F,w.y=-x*n+p,w.z=M*O,h.push(w.x,w.y,w.z),E.set(F,S,O).normalize(),f.push(E.x,E.y,E.z),d.push(I,1-x),L.push(g++)}_.push(L)}for(let C=0;C<i;C++)for(let L=0;L<s;L++){const x=_[L][C],M=_[L+1][C],D=_[L+1][C+1],I=_[L][C+1];t>0&&(u.push(x,M,I),T+=3),e>0&&(u.push(M,D,I),T+=3)}l.addGroup(m,T,0),m+=T}function v(E){const w=g,T=new lt,S=new R;let C=0;const L=E===!0?t:e,x=E===!0?1:-1;for(let D=1;D<=i;D++)h.push(0,p*x,0),f.push(0,x,0),d.push(.5,.5),g++;const M=g;for(let D=0;D<=i;D++){const k=D/i*c+a,F=Math.cos(k),O=Math.sin(k);S.x=L*O,S.y=p*x,S.z=L*F,h.push(S.x,S.y,S.z),f.push(0,x,0),T.x=F*.5+.5,T.y=O*.5*x+.5,d.push(T.x,T.y),g++}for(let D=0;D<i;D++){const I=w+D,k=M+D;E===!0?u.push(k,k+1,I):u.push(k+1,k,I),C+=3}l.addGroup(m,C,E===!0?1:2),m+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ce(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Fh extends qt{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],o=[];a(i),l(n),u(),this.setAttribute("position",new Ft(s,3)),this.setAttribute("normal",new Ft(s.slice(),3)),this.setAttribute("uv",new Ft(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const v=new R,E=new R,w=new R;for(let T=0;T<e.length;T+=3)d(e[T+0],v),d(e[T+1],E),d(e[T+2],w),c(v,E,w,y)}function c(y,v,E,w){const T=w+1,S=[];for(let C=0;C<=T;C++){S[C]=[];const L=y.clone().lerp(E,C/T),x=v.clone().lerp(E,C/T),M=T-C;for(let D=0;D<=M;D++)D===0&&C===T?S[C][D]=L:S[C][D]=L.clone().lerp(x,D/M)}for(let C=0;C<T;C++)for(let L=0;L<2*(T-C)-1;L++){const x=Math.floor(L/2);L%2===0?(f(S[C][x+1]),f(S[C+1][x]),f(S[C][x])):(f(S[C][x+1]),f(S[C+1][x+1]),f(S[C+1][x]))}}function l(y){const v=new R;for(let E=0;E<s.length;E+=3)v.x=s[E+0],v.y=s[E+1],v.z=s[E+2],v.normalize().multiplyScalar(y),s[E+0]=v.x,s[E+1]=v.y,s[E+2]=v.z}function u(){const y=new R;for(let v=0;v<s.length;v+=3){y.x=s[v+0],y.y=s[v+1],y.z=s[v+2];const E=p(y)/2/Math.PI+.5,w=m(y)/Math.PI+.5;o.push(E,1-w)}g(),h()}function h(){for(let y=0;y<o.length;y+=6){const v=o[y+0],E=o[y+2],w=o[y+4],T=Math.max(v,E,w),S=Math.min(v,E,w);T>.9&&S<.1&&(v<.2&&(o[y+0]+=1),E<.2&&(o[y+2]+=1),w<.2&&(o[y+4]+=1))}}function f(y){s.push(y.x,y.y,y.z)}function d(y,v){const E=y*3;v.x=t[E+0],v.y=t[E+1],v.z=t[E+2]}function g(){const y=new R,v=new R,E=new R,w=new R,T=new lt,S=new lt,C=new lt;for(let L=0,x=0;L<s.length;L+=9,x+=6){y.set(s[L+0],s[L+1],s[L+2]),v.set(s[L+3],s[L+4],s[L+5]),E.set(s[L+6],s[L+7],s[L+8]),T.set(o[x+0],o[x+1]),S.set(o[x+2],o[x+3]),C.set(o[x+4],o[x+5]),w.copy(y).add(v).add(E).divideScalar(3);const M=p(w);_(T,x+0,y,M),_(S,x+2,v,M),_(C,x+4,E,M)}}function _(y,v,E,w){w<0&&y.x===1&&(o[v]=y.x-1),E.x===0&&E.z===0&&(o[v]=w/2/Math.PI+.5)}function p(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fh(t.vertices,t.indices,t.radius,t.details)}}const _a=new R,ga=new R,Tl=new R,va=new hn;class dc extends qt{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const i=Math.pow(10,4),s=Math.cos(Pa*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],u=["a","b","c"],h=new Array(3),f={},d=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:p,c:m}=va;if(_.fromBufferAttribute(a,l[0]),p.fromBufferAttribute(a,l[1]),m.fromBufferAttribute(a,l[2]),va.getNormal(Tl),h[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,h[1]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,h[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let y=0;y<3;y++){const v=(y+1)%3,E=h[y],w=h[v],T=va[u[y]],S=va[u[v]],C=`${E}_${w}`,L=`${w}_${E}`;L in f&&f[L]?(Tl.dot(f[L].normal)<=s&&(d.push(T.x,T.y,T.z),d.push(S.x,S.y,S.z)),f[L]=null):C in f||(f[C]={index0:l[y],index1:l[v],normal:Tl.clone()})}}for(const g in f)if(f[g]){const{index0:_,index1:p}=f[g];_a.fromBufferAttribute(a,_),ga.fromBufferAttribute(a,p),d.push(_a.x,_a.y,_a.z),d.push(ga.x,ga.y,ga.z)}this.setAttribute("position",new Ft(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class pc extends Fh{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new pc(t.radius,t.detail)}}class Rs extends qt{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new R,f=new R,d=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const y=[],v=m/n;let E=0;m===0&&o===0?E=.5/e:m===n&&c===Math.PI&&(E=-.5/e);for(let w=0;w<=e;w++){const T=w/e;h.x=-t*Math.cos(i+T*s)*Math.sin(o+v*a),h.y=t*Math.cos(o+v*a),h.z=t*Math.sin(i+T*s)*Math.sin(o+v*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),p.push(T+E,1-v),y.push(l++)}u.push(y)}for(let m=0;m<n;m++)for(let y=0;y<e;y++){const v=u[m][y+1],E=u[m][y],w=u[m+1][y],T=u[m+1][y+1];(m!==0||o>0)&&d.push(v,E,T),(m!==n-1||c<Math.PI)&&d.push(E,w,T)}this.setIndex(d),this.setAttribute("position",new Ft(g,3)),this.setAttribute("normal",new Ft(_,3)),this.setAttribute("uv",new Ft(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ps extends qt{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],u=new R,h=new R,f=new R;for(let d=0;d<=n;d++)for(let g=0;g<=i;g++){const _=g/i*s,p=d/n*Math.PI*2;h.x=(t+e*Math.cos(p))*Math.cos(_),h.y=(t+e*Math.cos(p))*Math.sin(_),h.z=e*Math.sin(p),a.push(h.x,h.y,h.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/i),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=i;g++){const _=(i+1)*d+g-1,p=(i+1)*(d-1)+g-1,m=(i+1)*(d-1)+g,y=(i+1)*d+g;o.push(_,p,y),o.push(p,m,y)}this.setIndex(o),this.setAttribute("position",new Ft(a,3)),this.setAttribute("normal",new Ft(c,3)),this.setAttribute("uv",new Ft(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ps(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Bh extends qt{constructor(t=1,e=.4,n=64,i=8,s=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:i,p:s,q:o},n=Math.floor(n),i=Math.floor(i);const a=[],c=[],l=[],u=[],h=new R,f=new R,d=new R,g=new R,_=new R,p=new R,m=new R;for(let v=0;v<=n;++v){const E=v/n*s*Math.PI*2;y(E,s,o,t,d),y(E+.01,s,o,t,g),p.subVectors(g,d),m.addVectors(g,d),_.crossVectors(p,m),m.crossVectors(_,p),_.normalize(),m.normalize();for(let w=0;w<=i;++w){const T=w/i*Math.PI*2,S=-e*Math.cos(T),C=e*Math.sin(T);h.x=d.x+(S*m.x+C*_.x),h.y=d.y+(S*m.y+C*_.y),h.z=d.z+(S*m.z+C*_.z),c.push(h.x,h.y,h.z),f.subVectors(h,d).normalize(),l.push(f.x,f.y,f.z),u.push(v/n),u.push(w/i)}}for(let v=1;v<=n;v++)for(let E=1;E<=i;E++){const w=(i+1)*(v-1)+(E-1),T=(i+1)*v+(E-1),S=(i+1)*v+E,C=(i+1)*(v-1)+E;a.push(w,T,C),a.push(T,S,C)}this.setIndex(a),this.setAttribute("position",new Ft(c,3)),this.setAttribute("normal",new Ft(l,3)),this.setAttribute("uv",new Ft(u,2));function y(v,E,w,T,S){const C=Math.cos(v),L=Math.sin(v),x=w/E*v,M=Math.cos(x);S.x=T*(2+M)*.5*C,S.y=T*(2+M)*L*.5,S.z=T*Math.sin(x)*.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bh(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}}class zh extends qt{constructor(t=new q_(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),e=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};const o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new R,c=new R,l=new lt;let u=new R;const h=[],f=[],d=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Ft(h,3)),this.setAttribute("normal",new Ft(f,3)),this.setAttribute("uv",new Ft(d,2));function _(){for(let v=0;v<e;v++)p(v);p(s===!1?e:0),y(),m()}function p(v){u=t.getPointAt(v/e,u);const E=o.normals[v],w=o.binormals[v];for(let T=0;T<=i;T++){const S=T/i*Math.PI*2,C=Math.sin(S),L=-Math.cos(S);c.x=L*E.x+C*w.x,c.y=L*E.y+C*w.y,c.z=L*E.z+C*w.z,c.normalize(),f.push(c.x,c.y,c.z),a.x=u.x+n*c.x,a.y=u.y+n*c.y,a.z=u.z+n*c.z,h.push(a.x,a.y,a.z)}}function m(){for(let v=1;v<=e;v++)for(let E=1;E<=i;E++){const w=(i+1)*(v-1)+(E-1),T=(i+1)*v+(E-1),S=(i+1)*v+E,C=(i+1)*(v-1)+E;g.push(w,T,C),g.push(T,S,C)}}function y(){for(let v=0;v<=e;v++)for(let E=0;E<=i;E++)l.x=v/e,l.y=E/i,d.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new zh(new Fu[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class us extends Ki{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Bt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=E_,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const np={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class F1{constructor(t,e,n){const i=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){const d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const B1=new F1;class kh{constructor(t){this.manager=t!==void 0?t:B1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}kh.DEFAULT_MATERIAL_NAME="__DEFAULT";const ni={};class z1 extends Error{constructor(t,e){super(t),this.response=e}}class k1 extends kh{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=np.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if(ni[t]!==void 0){ni[t].push({onLoad:e,onProgress:n,onError:i});return}ni[t]=[],ni[t].push({onLoad:e,onProgress:n,onError:i});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=ni[t],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0;let _=0;const p=new ReadableStream({start(m){y();function y(){h.read().then(({done:v,value:E})=>{if(v)m.close();else{_+=E.byteLength;const w=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let T=0,S=u.length;T<S;T++){const C=u[T];C.onProgress&&C.onProgress(w)}m.enqueue(E),y()}},v=>{m.error(v)})}}});return new Response(p)}else throw new z1(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{np.add(t,l);const u=ni[t];delete ni[t];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=ni[t];if(u===void 0)throw this.manager.itemError(t),l;delete ni[t];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class Vh extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class V1 extends Vh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Bt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const bl=new ae,ip=new R,rp=new R;class K_{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new lt(512,512),this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ph,this._frameExtents=new lt(1,1),this._viewportCount=1,this._viewports=[new ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ip.setFromMatrixPosition(t.matrixWorld),e.position.copy(ip),rp.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(rp),e.updateMatrixWorld(),bl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(bl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const sp=new ae,Ks=new R,wl=new R;class H1 extends K_{constructor(){super(new ln(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new lt(4,2),this._viewportCount=6,this._viewports=[new ie(2,1,1,1),new ie(0,1,1,1),new ie(3,1,1,1),new ie(1,1,1,1),new ie(3,0,1,1),new ie(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ks.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ks),wl.copy(n.position),wl.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(wl),n.updateMatrixWorld(),i.makeTranslation(-Ks.x,-Ks.y,-Ks.z),sp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sp)}}class op extends Vh{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new H1}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class G1 extends K_{constructor(){super(new N_(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class W1 extends Vh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new G1}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class X1{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ap(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=ap();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function ap(){return performance.now()}class j_ extends Ro{constructor(t=10,e=10,n=4473924,i=8947848){n=new Bt(n),i=new Bt(i);const s=e/2,o=t/e,a=t/2,c=[],l=[];for(let f=0,d=0,g=-a;f<=e;f++,g+=o){c.push(-a,0,g,a,0,g),c.push(g,0,-a,g,0,a);const _=f===s?n:i;_.toArray(l,d),d+=3,_.toArray(l,d),d+=3,_.toArray(l,d),d+=3,_.toArray(l,d),d+=3}const u=new qt;u.setAttribute("position",new Ft(c,3)),u.setAttribute("color",new Ft(l,3));const h=new Un({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Eh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Eh);class $1 extends kh{constructor(t){super(t)}load(t,e,n,i){const s=this,o=new k1(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(a){try{e(s.parse(a))}catch(c){i?i(c):console.error(c),s.manager.itemError(t)}},n,i)}parse(t){function e(l){const u=new DataView(l),h=32/8*3+32/8*3*3+16/8,f=u.getUint32(80,!0);if(80+32/8+f*h===u.byteLength)return!0;const g=[115,111,108,105,100];for(let _=0;_<5;_++)if(n(g,u,_))return!1;return!0}function n(l,u,h){for(let f=0,d=l.length;f<d;f++)if(l[f]!==u.getUint8(h+f))return!1;return!0}function i(l){const u=new DataView(l),h=u.getUint32(80,!0);let f,d,g,_=!1,p,m,y,v,E;for(let M=0;M<80-10;M++)u.getUint32(M,!1)==1129270351&&u.getUint8(M+4)==82&&u.getUint8(M+5)==61&&(_=!0,p=new Float32Array(h*3*3),m=u.getUint8(M+6)/255,y=u.getUint8(M+7)/255,v=u.getUint8(M+8)/255,E=u.getUint8(M+9)/255);const w=84,T=12*4+2,S=new qt,C=new Float32Array(h*3*3),L=new Float32Array(h*3*3),x=new Bt;for(let M=0;M<h;M++){const D=w+M*T,I=u.getFloat32(D,!0),k=u.getFloat32(D+4,!0),F=u.getFloat32(D+8,!0);if(_){const O=u.getUint16(D+48,!0);O&32768?(f=m,d=y,g=v):(f=(O&31)/31,d=(O>>5&31)/31,g=(O>>10&31)/31)}for(let O=1;O<=3;O++){const G=D+O*12,H=M*3*3+(O-1)*3;C[H]=u.getFloat32(G,!0),C[H+1]=u.getFloat32(G+4,!0),C[H+2]=u.getFloat32(G+8,!0),L[H]=I,L[H+1]=k,L[H+2]=F,_&&(x.setRGB(f,d,g,cn),p[H]=x.r,p[H+1]=x.g,p[H+2]=x.b)}}return S.setAttribute("position",new tn(C,3)),S.setAttribute("normal",new tn(L,3)),_&&(S.setAttribute("color",new tn(p,3)),S.hasColors=!0,S.alpha=E),S}function s(l){const u=new qt,h=/solid([\s\S]*?)endsolid/g,f=/facet([\s\S]*?)endfacet/g,d=/solid\s(.+)/;let g=0;const _=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,p=new RegExp("vertex"+_+_+_,"g"),m=new RegExp("normal"+_+_+_,"g"),y=[],v=[],E=[],w=new R;let T,S=0,C=0,L=0;for(;(T=h.exec(l))!==null;){C=L;const x=T[0],M=(T=d.exec(x))!==null?T[1]:"";for(E.push(M);(T=f.exec(x))!==null;){let k=0,F=0;const O=T[0];for(;(T=m.exec(O))!==null;)w.x=parseFloat(T[1]),w.y=parseFloat(T[2]),w.z=parseFloat(T[3]),F++;for(;(T=p.exec(O))!==null;)y.push(parseFloat(T[1]),parseFloat(T[2]),parseFloat(T[3])),v.push(w.x,w.y,w.z),k++,L++;F!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+g),k!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+g),g++}const D=C,I=L-C;u.userData.groupNames=E,u.addGroup(D,I,S),S++}return u.setAttribute("position",new Ft(y,3)),u.setAttribute("normal",new Ft(v,3)),u}function o(l){return typeof l!="string"?new TextDecoder().decode(l):l}function a(l){if(typeof l=="string"){const u=new Uint8Array(l.length);for(let h=0;h<l.length;h++)u[h]=l.charCodeAt(h)&255;return u.buffer||u}else return l}const c=a(t);return e(c)?i(c):s(o(t))}}const cp=document.getElementById("three-hero");function q1(r){const t=new E1,e=new ln(46,r.clientWidth/Math.max(r.clientHeight,1),.1,140);e.position.set(0,2.2,9.5);const n=new y1({antialias:!0,alpha:!0,powerPreference:"high-performance"});n.setPixelRatio(Math.min(devicePixelRatio,1.65)),n.setSize(r.clientWidth,r.clientHeight),n.setClearColor(0,0),n.outputColorSpace=cn,n.toneMapping=l_,n.toneMappingExposure=1.15,r.appendChild(n.domElement);const i=new Bt("#1769d2"),s={paused:!1,explode:0,explodeTarget:0,rx:0,ry:0,userRX:0,userRY:0,zoom:9.5,dragging:!1,pointerX:0,pointerY:0};t.add(new V1(16777215,9420799,1.65));const o=new W1(i,4.4);o.position.set(5,7,6),t.add(o);const a=new op(5083127,28,22);a.position.set(-5,2,-1),t.add(a);const c=new op(i,18,18);c.position.set(3,-1,4),t.add(c);const l=new jt;t.add(l),j1(t,i);const u={tickers:[],parts:[],state:s,accent:i,scene:t,camera:e,renderer:n,world:l};({shipyard:Z1,shipbuilding:Q1,engine:tC,electro:eC,network:nC,cnc:iC,quality:rC,blueprint:lp}[r.dataset.scene]||lp)(u),Y1(r,u),K1(r,u);const f=matchMedia("(prefers-reduced-motion: reduce)").matches,d=new X1;function g(){const p=d.getElapsedTime();s.explode+=(s.explodeTarget-s.explode)*.085,s.rx+=(s.userRX-s.rx)*.075,s.ry+=(s.userRY-s.ry)*.075,e.position.z+=(s.zoom-e.position.z)*.08,l.rotation.x=s.rx,l.rotation.y=s.ry,J1(u.parts,s.explode);const m=document.documentElement.classList.contains("a11y-no-motion");!s.paused&&!f&&!m&&u.tickers.forEach(y=>y(p,s)),n.render(t,e),requestAnimationFrame(g)}g(),new ResizeObserver(()=>{const p=r.clientWidth,m=Math.max(r.clientHeight,1);e.aspect=p/m,e.updateProjectionMatrix(),n.setSize(p,m)}).observe(r)}function Y1(r,t){document.querySelectorAll("[data-scene-action]").forEach(e=>{e.addEventListener("click",()=>{const n=e.dataset.sceneAction;n==="explode"&&(t.state.explodeTarget=t.state.explodeTarget>.5?0:1,e.classList.toggle("active",t.state.explodeTarget>0),e.querySelector("span")&&(e.querySelector("span").textContent=t.state.explodeTarget>0?"Собрать":"Разобрать")),n==="pause"&&(t.state.paused=!t.state.paused,e.classList.toggle("active",t.state.paused),e.querySelector("span")&&(e.querySelector("span").textContent=t.state.paused?"Продолжить":"Пауза")),n==="reset"&&(t.state.userRX=0,t.state.userRY=0,t.state.zoom=9.5,t.state.explodeTarget=0,document.querySelectorAll('[data-scene-action="explode"]').forEach(i=>i.classList.remove("active")))})})}function K1(r,t){const e=t.state,n=r.closest(".hero,.specialty-hero,.page-hero")||r,i=a=>{var c,l,u;a.pointerType!=="touch"&&((l=(c=a.target).closest)!=null&&l.call(c,"a,button,input,select,textarea")||(e.dragging=!0,e.pointerX=a.clientX,e.pointerY=a.clientY,n.classList.add("is-dragging"),(u=n.setPointerCapture)==null||u.call(n,a.pointerId)))},s=a=>{if(a.pointerType!=="touch"){if(e.dragging){const c=a.clientX-e.pointerX,l=a.clientY-e.pointerY;e.pointerX=a.clientX,e.pointerY=a.clientY,e.userRY+=c*.006,e.userRX+=l*.004,e.userRX=Math.max(-.55,Math.min(.55,e.userRX))}else if(a.pointerType==="mouse"){const c=n.getBoundingClientRect(),l=(a.clientX-c.left)/c.width-.5,u=(a.clientY-c.top)/c.height-.5;e.userRY+=(l*.2-e.userRY)*.018,e.userRX+=(-u*.08-e.userRX)*.018}}},o=a=>{var c;a.pointerType!=="touch"&&(e.dragging=!1,n.classList.remove("is-dragging"),(c=n.hasPointerCapture)!=null&&c.call(n,a.pointerId)&&n.releasePointerCapture(a.pointerId))};n.addEventListener("pointerdown",i),n.addEventListener("pointermove",s,{passive:!0}),n.addEventListener("pointerup",o),n.addEventListener("pointercancel",o),n.addEventListener("wheel",a=>{var c,l;(l=(c=a.target).closest)!=null&&l.call(c,"input,select,textarea")||(a.ctrlKey||a.metaKey)&&(a.preventDefault(),e.zoom=Math.max(6.2,Math.min(12.5,e.zoom+a.deltaY*.006)))},{passive:!1})}function j1(r,t){const e=new j_(34,56,t,10470901);e.position.y=-2.45,e.material.opacity=.2,e.material.transparent=!0,r.add(e);const n=new qt,i=[];for(let a=0;a<620;a++)i.push((Math.random()-.5)*28,(Math.random()-.5)*14,(Math.random()-.5)*22);n.setAttribute("position",new Ft(i,3));const s=new H_(n,new Dh({color:t,size:.022,transparent:!0,opacity:.42}));r.add(s);const o=new mt(new Ce(9,9,5,64,1,!0),new _i({color:t,wireframe:!0,transparent:!0,opacity:.028,side:We}));o.position.y=-1,r.add(o)}const vo=(r,t=.72)=>new _i({color:r,wireframe:!0,transparent:!0,opacity:t}),Xt=(r,t=1,e=.05)=>new us({color:r,metalness:.78,roughness:.22,transparent:t<1,opacity:t,side:Fe,emissive:r,emissiveIntensity:e}),ci=(r,t=.9)=>new _i({color:r,transparent:!0,opacity:t});function yr(r,t,e,n=.5){const i=new qt().setFromPoints([r,t]);return new Pi(i,new Un({color:e,transparent:!0,opacity:n}))}function Po(r,t,e=4,n=2){for(let i=0;i<e;i++){const s=new mt(new Ps(n+i*.48,.012,4,96),ci(t,.13));s.rotation.x=Math.PI/2,r.add(s)}}function fe(r,t,e=[1,0,0],n=1){return t.userData.basePosition=t.position.clone(),t.userData.explodeDirection=new R(...e).normalize(),t.userData.explodeDistance=n,r.parts.push(t),t}function J1(r,t){r.forEach(e=>{e.userData.basePosition&&e.position.copy(e.userData.basePosition).addScaledVector(e.userData.explodeDirection,e.userData.explodeDistance*t)})}function J_(r,t,e=.8){const n=new mt(new Yn(e,.18),new _i({color:r.accent,transparent:!0,opacity:.12,side:Fe}));return n.position.copy(t),r.world.add(n),n}function Z1(r){const{world:t,accent:e,tickers:n}=r,i=new jt;t.add(i);const s=new mt(new Yn(18,9,32,16),new us({color:10275071,metalness:.12,roughness:.42,transparent:!0,opacity:.22,wireframe:!0}));s.rotation.x=-Math.PI/2,s.position.set(1,-2.18,0),i.add(s);const o=new jt;o.position.set(1.1,0,.3),o.rotation.y=-.22,i.add(o),[-.64,.64].forEach(h=>{const f=new mt(new le(8.5,.09,.1),Xt(1534418,.78,.06));f.position.set(0,-1.9,h),o.add(f)});for(let h=0;h<15;h++){const f=-4.05+h*.58,d=new mt(new le(.13,.08,1.72),Xt(737158,.58,.025));d.position.set(f,-1.95,0),o.add(d),h>1&&h<13&&h%2===0&&[-.38,.38].forEach(g=>{const _=new mt(new le(.22,.42,.2),Xt(7311284,.48,.02));_.position.set(f,-1.69,g),_.rotation.z=g>0?-.1:.1,o.add(_)})}const a=new jt;a.position.set(1.35,.48,.3),a.rotation.y=-.22,i.add(a);const c=h=>{const f=document.createElement("canvas");f.width=512,f.height=128;const d=f.getContext("2d");d.clearRect(0,0,f.width,f.height),d.fillStyle="rgba(255,255,255,.94)",d.strokeStyle="rgba(23,105,210,.42)",d.lineWidth=4,d.beginPath(),d.roundRect(4,4,504,120,22),d.fill(),d.stroke(),d.fillStyle="#0b3f86",d.font="700 44px Arial, sans-serif",d.textAlign="center",d.textBaseline="middle",d.fillText(h,256,66);const g=new T1(f);g.colorSpace=cn;const _=new M1(new k_({map:g,transparent:!0,depthTest:!1}));return _.scale.set(1.28,.32,1),_.renderOrder=20,_},l=(h,f,d,g=new R)=>{const _=new jt,p=new Un({color:e,transparent:!0,opacity:.72,depthTest:!1}),m=new Pi(new qt().setFromPoints([h,f]),p);m.renderOrder=18,_.add(m);const y=f.clone().sub(h).normalize(),v=Math.abs(y.x)>.8?new R(0,.16,0):Math.abs(y.y)>.8?new R(.16,0,0):new R(0,.16,0);[h,f].forEach(w=>{const T=new Pi(new qt().setFromPoints([w.clone().sub(v),w.clone().add(v)]),p);T.renderOrder=18,_.add(T)});const E=c(d);E.position.copy(h).lerp(f,.5).add(g),_.add(E),a.add(_)};new $1().load("/models/home-ship.stl",h=>{h.computeVertexNormals(),h.computeBoundingBox();const f=h.boundingBox,d=new R,g=new R;f.getSize(d),f.getCenter(g),h.translate(-g.x,-g.y,-g.z),h.rotateX(-Math.PI/2);const p=5.45/d.x,m=new us({color:1534418,metalness:.58,roughness:.28,transparent:!0,opacity:.88,emissive:1534418,emissiveIntensity:.035,side:Fe}),y=new mt(h,m);y.scale.setScalar(p),y.castShadow=!1,y.receiveShadow=!1,a.add(y);const v=new Ro(new dc(h,18),new Un({color:14150399,transparent:!0,opacity:.58}));v.scale.setScalar(p),a.add(v);const E=d.x*p,w=d.y*p,T=d.z*p,S=E/2,C=w/2,L=T/2,x=new jt;x.name="ship-frames";const M=new Un({color:4891647,transparent:!0,opacity:.78,depthTest:!1}),D=15;for(let I=0;I<D;I++){const k=I/(D-1),F=-S*.88+k*(S*1.76),O=Math.abs(F)/(S*.88),G=Math.max(.34,1-Math.pow(O,2)*.64),H=C*G,et=-L*.03,st=-L*.52,ct=-L*.79,bt=[new R(F,et,-H*.92),new R(F,st,-H),new R(F,ct,-H*.4),new R(F,-L*.88,0),new R(F,ct,H*.4),new R(F,st,H),new R(F,et,H*.92)],It=new Pi(new qt().setFromPoints(bt),M);It.renderOrder=12,x.add(It);const N=new Pi(new qt().setFromPoints([new R(F,et,-H*.92),new R(F,et,H*.92)]),M);N.renderOrder=12,x.add(N)}a.add(x),l(new R(-S,-L-.3,C+.34),new R(S,-L-.3,C+.34),"Длина 37,19 м",new R(0,-.23,0)),l(new R(S+.22,-L-.15,-C),new R(S+.22,-L-.15,C),"Ширина 5,32 м",new R(.12,-.28,0)),l(new R(-S-.18,-L,C+.28),new R(-S-.18,L,C+.28),"Высота 12,96 м",new R(-.18,0,0))},void 0,h=>{console.error("Homepage ship STL failed to load",h);const f=new mt(new le(6.8,1.15,1.05),new us({color:e,wireframe:!0,transparent:!0,opacity:.5}));a.add(f)});for(let h=0;h<3;h++){const f=new jt,d=new mt(new le(.11,4.4,.11),vo(e,.5));d.position.y=.4,f.add(d);const g=new mt(new le(2.9,.09,.09),vo(e,.58));g.position.set(1.08,2.45,0),f.add(g);const _=yr(new R(1.9,2.4,0),new R(1.9,.7,0),e,.4);f.add(_),f.position.set(-4.6+h*4.3,-.45,-2.8),i.add(f)}for(let h=0;h<7;h++){const f=J_(r,new R(-4.3+h*1.45,1.8+h%2*.28,-2.2),.7);f.rotation.y=.15}Po(i,e,5,2.1),n.push(h=>{s.position.z=Math.sin(h*.4)*.04})}function Q1(r){const{world:t,accent:e,tickers:n}=r,i=new jt;i.rotation.set(-.035,-.34,.015),i.position.set(.25,-.25,.15),t.add(i);const s=[{x:-3.75,w:.92,deck:.46,chine:.7,keel:-.72},{x:-3.1,w:1.08,deck:.5,chine:.84,keel:-.88},{x:-2.2,w:1.18,deck:.54,chine:.94,keel:-1.02},{x:-1.2,w:1.22,deck:.58,chine:.98,keel:-1.08},{x:-.1,w:1.2,deck:.62,chine:.96,keel:-1.1},{x:.9,w:1.12,deck:.68,chine:.88,keel:-1.08},{x:1.75,w:.95,deck:.78,chine:.72,keel:-1},{x:2.5,w:.72,deck:.9,chine:.52,keel:-.86},{x:3.1,w:.42,deck:1.02,chine:.26,keel:-.62},{x:3.55,w:.08,deck:1.1,chine:.05,keel:-.28}],o=new qt,a=[];s.forEach(N=>{a.push(N.x,N.deck,-N.w,N.x,-.1,-N.chine,N.x,N.keel,0,N.x,-.1,N.chine,N.x,N.deck,N.w)});const c=[];for(let N=0;N<s.length-1;N++){const X=N*5,Z=(N+1)*5;for(let nt=0;nt<4;nt++)c.push(X+nt,Z+nt,Z+nt+1,X+nt,Z+nt+1,X+nt+1)}c.push(0,1,2,0,2,4,4,2,3);const l=(s.length-1)*5;c.push(l,l+2,l+1,l,l+4,l+2,l+4,l+3,l+2),o.setAttribute("position",new Ft(a,3)),o.setIndex(c),o.computeVertexNormals();const u=new us({color:e,metalness:.72,roughness:.2,transparent:!0,opacity:.31,emissive:e,emissiveIntensity:.055,side:Fe}),h=fe(r,new mt(o,u),[0,-.8,0],1.15);i.add(h);const f=new Ro(new dc(o,13),new Un({color:e,transparent:!0,opacity:.72}));h.add(f);const d=[],g=[];s.forEach(N=>{d.push(N.x,N.deck+.018,-N.w*.96,N.x,N.deck+.018,N.w*.96)});for(let N=0;N<s.length-1;N++){const X=N*2,Z=(N+1)*2;g.push(X,Z,Z+1,X,Z+1,X+1)}const _=new qt;_.setAttribute("position",new Ft(d,3)),_.setIndex(g),_.computeVertexNormals();const p=fe(r,new mt(_,Xt(14284799,.24,.035)),[0,1,0],1.18);i.add(p),[-1,1].forEach(N=>{const X=s.slice(0,-1).map(St=>new R(St.x,.03,N*(St.chine+(St.w-St.chine)*.28))),Z=new G_(X),nt=new mt(new zh(Z,70,.014,5,!1),ci(12908543,.72));i.add(nt)});const m=new jt;i.add(m),s.slice(1,-1).forEach((N,X)=>{const Z=new qt().setFromPoints([new R(N.x,N.deck,-N.w),new R(N.x,-.1,-N.chine),new R(N.x,N.keel,0),new R(N.x,-.1,N.chine),new R(N.x,N.deck,N.w)]),nt=new Pi(Z,new Un({color:e,transparent:!0,opacity:X%2?.27:.48}));m.add(nt)});const y=fe(r,new jt,[-.7,.7,0],1.05);y.position.set(-1.85,.66,0),y.userData.basePosition=y.position.clone(),i.add(y);const v=new j_(3.35,10,e,2247004);v.rotation.z=Math.PI/2,v.rotation.y=Math.PI/2,v.scale.z=.66,v.material.transparent=!0,v.material.opacity=.28,y.add(v);const E=new jt;E.position.set(-.45,.22,0),y.add(E);const w=new mt(new Ce(.24,.24,.72,22),Xt(e,.58,.07));w.rotation.x=Math.PI/2,E.add(w),[-.4,.4].forEach(N=>{const X=new mt(new Ce(.31,.31,.08,22),vo(e,.62));X.rotation.x=Math.PI/2,X.position.z=N,E.add(X)}),[-1,1].forEach(N=>{for(let X=0;X<2;X++){const Z=new mt(new Ce(.055,.075,.28,10),Xt(14219263,.65,.02));Z.position.set(-1.15+X*.55,.2,N*.68),y.add(Z)}});const T=fe(r,new jt,[-.2,.9,-.35],1.2);T.position.set(-2.38,.92,-.72),T.userData.basePosition=T.position.clone(),i.add(T);const S=new mt(new Ce(.18,.26,.46,14),Xt(e,.55,.06));T.add(S);const C=new mt(new le(1.38,.11,.11),Xt(e,.5,.08));C.position.set(.58,.45,0),C.rotation.z=.42,T.add(C);const L=fe(r,new jt,[.3,1,.18],1.42);L.position.set(.88,1.02,0),L.userData.basePosition=L.position.clone(),i.add(L);const x=new mt(new le(2.18,.82,1.72),Xt(14218234,.2,.018));x.position.set(-.1,.12,0),L.add(x);const M=new qt,D=[-.92,0,-.76,-.92,0,.76,.8,0,-.63,.8,0,.63,-.72,.62,-.66,-.72,.62,.66,.58,.62,-.52,.58,.62,.52],I=[0,2,3,0,3,1,4,5,7,4,7,6,0,4,6,0,6,2,1,3,7,1,7,5,0,1,5,0,5,4,2,6,7,2,7,3];M.setAttribute("position",new Ft(D,3)),M.setIndex(I),M.computeVertexNormals();const k=new mt(M,Xt(e,.25,.055));k.position.y=.57,L.add(k);for(let N=-.44;N<=.44;N+=.22){const X=new mt(new Yn(.19,.2),new _i({color:12449791,transparent:!0,opacity:.72,side:Fe}));X.position.set(.586,.88,N),X.rotation.y=Math.PI/2,L.add(X)}[-1,1].forEach(N=>{for(let X=-.46;X<=.32;X+=.26){const Z=new mt(new Yn(.18,.18),ci(11465471,.52));Z.position.set(X,.88,N*.525),Z.rotation.y=N>0?0:Math.PI,L.add(Z)}});const F=fe(r,new jt,[-.25,.8,0],.85);F.position.set(.05,1.92,0),F.userData.basePosition=F.position.clone(),i.add(F);const O=new mt(new Ce(.22,.28,.72,12),Xt(10345963,.35,.04));F.add(O),[-.09,.09].forEach(N=>{const X=new mt(new Ce(.035,.045,.46,8),Xt(e,.85,.08));X.position.set(0,.48,N),F.add(X)});const G=fe(r,new jt,[0,1.2,0],1.28);G.position.set(1.18,2.04,0),G.userData.basePosition=G.position.clone(),i.add(G);const H=new mt(new Ce(.028,.055,1.55,8),Xt(e,.78,.09));H.position.y=.55,G.add(H);const et=new mt(new le(1.05,.045,.05),ci(e,.8));et.position.y=.88,G.add(et);const st=new jt;st.position.y=1.22,G.add(st);const ct=new mt(new le(.92,.055,.12),ci(15203327,.9));st.add(ct);const bt=new mt(new Rs(.13,14,8),Xt(e,.42,.12));bt.position.y=1.49,G.add(bt),[-1,1].forEach(N=>{const X=fe(r,new jt,[-.1,.35,N],.95);X.position.set(.25,1.22,N*1.05),X.userData.basePosition=X.position.clone(),i.add(X);const Z=new mt(new Uh(.18,.86,5,12),Xt(14678271,.24,.035));Z.rotation.z=Math.PI/2,X.add(Z);const nt=yr(new R(-.48,.1,0),new R(.48,.56,0),e,.42);X.add(nt)});const It=new jt;i.add(It),[-1,1].forEach(N=>{const X=s.slice(0,-1).map(Z=>new R(Z.x,Z.deck+.27,N*Z.w*.94));It.add(new Pi(new qt().setFromPoints(X),new Un({color:14219519,transparent:!0,opacity:.38}))),s.slice(0,-1).forEach((Z,nt)=>{nt%2||It.add(yr(new R(Z.x,Z.deck+.03,N*Z.w*.94),new R(Z.x,Z.deck+.29,N*Z.w*.94),14219519,.3))})}),s.forEach((N,X)=>{if(X===0||X===s.length-1)return;const Z=yr(new R(N.x,-1.38,-1.48),new R(N.x,-1.38,1.48),e,X%2?.1:.2);i.add(Z)}),Po(t,e,4,2.4),n.push((N,X)=>{i.rotation.y=-.34+Math.sin(N*.18)*.045,i.rotation.z=.015+Math.sin(N*.55)*.008*(1-X.explode),i.position.y=-.25+Math.sin(N*.62)*.035*(1-X.explode),st.rotation.y=N*1.85,T.rotation.y=-.18+Math.sin(N*.32)*.08})}function tC(r){const{world:t,accent:e,tickers:n}=r,i=new jt;i.rotation.y=-.35,t.add(i);const s=new jt;i.add(s);const o=fe(r,new mt(new Ce(.18,.18,5.4,24),Xt(14479359,.88,.02)),[-1,0,0],1.2);o.rotation.z=Math.PI/2,s.add(o);for(let c=-2;c<=2;c++){const l=fe(r,new mt(new Ce(.42,.42,.16,24),Xt(e,.82,.08)),[0,0,c],1.15);l.rotation.z=Math.PI/2,l.position.x=c*.9,l.userData.basePosition=l.position.clone(),s.add(l);const u=new mt(new Ce(.09,.09,.54,12),Xt(16777215,.9,.02));u.rotation.z=Math.PI/2,u.position.set(c*.9,.38*(c%2||1),0),s.add(u)}for(let c=-2;c<=2;c++){const l=c%2===0?1:-1,u=fe(r,new mt(new Ce(.46,.54,1.45,24,1,!0),Xt(e,.18,.04)),[0,l,.25],1.65);u.position.set(c*.9,l*1.38,.1),u.userData.basePosition=u.position.clone(),i.add(u);const h=fe(r,new mt(new Ce(.38,.38,.34,24),Xt(16055295,.75,.03)),[0,l,0],1.2);h.position.set(c*.9,l*.82,0),h.userData.basePosition=h.position.clone(),i.add(h),h.userData.phase=c*.85,h.userData.bank=l}const a=fe(r,new mt(new Ps(1.18,.19,14,64),Xt(e,.5,.08)),[-1,0,0],1.5);a.rotation.y=Math.PI/2,a.position.x=-3.15,a.userData.basePosition=a.position.clone(),i.add(a),Po(t,e,4,2.2),n.push(c=>{s.rotation.x=c*1.55,a.rotation.x=c*1.55,i.children.forEach(l=>{if(l.userData.phase!==void 0){const u=l.userData.bank,h=l.userData.basePosition;l.position.y=h.y+u*Math.sin(c*2.1+l.userData.phase)*.26}})})}function eC(r){const{world:t,accent:e,tickers:n}=r,i=new jt;i.rotation.x=-.14,t.add(i);const s=new mt(new Yn(7.4,4.5,14,9),new _i({color:e,wireframe:!0,transparent:!0,opacity:.12,side:Fe}));i.add(s);const o=[];[-1.6,-.95,-.3,.35,1,1.65].forEach((l,u)=>{const h=yr(new R(-3.25,l,.05),new R(3.25,l,.05),e,.38);i.add(h);for(let f=0;f<2;f++){const d=new mt(new Rs(.06,10,10),ci(u%2?16777215:e,.95));d.userData={y:l,offset:f*2.5+u*.35,speed:.8+u*.06},i.add(d),o.push(d)}});for(let l=0;l<4;l++){const u=fe(r,new mt(new Ps(.38,.07,8,38),Xt(e,.55,.12)),[l<2?-1:1,l%2?1:-1,.2],1.25);u.position.set(-1.9+l*1.25,l%2?.5:-.5,.3),u.userData.basePosition=u.position.clone(),i.add(u)}for(let l=0;l<6;l++){const u=fe(r,new mt(new le(.55,.38,.28),Xt(14350591,.28,.03)),[l<3?-1:1,(l%3-1)*.3,.3],1.1);u.position.set(-2.1+l%3*2.05,-1.25+Math.floor(l/3)*2.5,.22),u.userData.basePosition=u.position.clone(),i.add(u)}const c=fe(r,new mt(new Ps(.66,.17,12,48),Xt(e,.3,.18)),[0,1,.5],1.45);c.position.set(0,0,.42),c.userData.basePosition=c.position.clone(),i.add(c),n.push(l=>{o.forEach(u=>{u.position.x=-3.25+(l*u.userData.speed+u.userData.offset)%6.5,u.position.y=u.userData.y,u.material.opacity=.55+.45*Math.sin(l*4+u.userData.offset)}),c.rotation.z=l*.45})}function nC(r){const{world:t,accent:e,tickers:n}=r,i=new jt;t.add(i);const s=[[-2.4,.35,-.6],[-.8,.35,.35],[.8,.35,-.3],[2.4,.35,.45]],o=[];s.forEach((u,h)=>{const f=fe(r,new jt,[u[0],.2,u[2]],1.2);f.position.set(...u),f.userData.basePosition=f.position.clone(),i.add(f);const d=new Ro(new dc(new le(1.05,3,1.05)),new Un({color:e,transparent:!0,opacity:.32}));f.add(d);for(let g=0;g<8;g++){const _=new mt(new le(.82,.2,.78),Xt(g%2?e:10215423,.16,.06));_.position.set(0,-1.1+g*.31,0),f.add(_),o.push(_);for(let p=0;p<3;p++){const m=new mt(new Rs(.018,5,5),ci(p===0?9109441:e,.9));m.position.set(.31+p*.08,-1.1+g*.31,.405),f.add(m)}}});const a=s.map((u,h)=>{const f=new mt(new pc(.16,1),Xt(h===1?16777215:e,.95,.35));return f.position.set(u[0],2.25,u[2]),i.add(f),f});for(let u=0;u<a.length;u++)for(let h=u+1;h<a.length;h++)Math.abs(u-h)>2||i.add(yr(a[u].position,a[h].position,e,.34));const l=[[0,1],[1,2],[2,3],[0,2],[1,3]].map(([u,h],f)=>{const d=new mt(new Rs(.055,8,8),ci(f%2?16777215:e,1));return i.add(d),{p:d,a:a[u].position.clone(),b:a[h].position.clone(),o:f*.19}});Po(t,e,3,2.6),n.push(u=>{l.forEach(h=>h.p.position.lerpVectors(h.a,h.b,(u*.32+h.o)%1)),o.forEach((h,f)=>h.material.opacity=.1+.12*(1+Math.sin(u*3+f*.7))),i.rotation.y=Math.sin(u*.18)*.12})}function iC(r){const{world:t,accent:e,tickers:n}=r,i=new jt;t.add(i);const s=fe(r,new mt(new le(6.4,.3,3.2),Xt(1586245,.72,.01)),[0,-1,0],1.2);s.position.y=-1.55,s.userData.basePosition=s.position.clone(),i.add(s);const o=new mt(new le(6,.12,.14),Xt(e,.55,.08));o.position.set(0,-1.28,1.05),i.add(o);const a=o.clone();a.position.z=-1.05,i.add(a);const c=fe(r,new jt,[0,1,0],1.45);c.position.y=.35,c.userData.basePosition=c.position.clone(),i.add(c);const l=new mt(new le(4.8,.22,.25),Xt(e,.38,.06));l.position.y=1.22,c.add(l),[-2.2,2.2].forEach(_=>{const p=new mt(new le(.22,3,.28),Xt(e,.3,.04));p.position.set(_,-.15,0),c.add(p)});const u=fe(r,new jt,[0,0,1],1.2);c.add(u);const h=new mt(new Ce(.34,.48,1.65,24),Xt(14219263,.72,.03));h.position.y=.43,u.add(h);const f=new mt(new Ce(.07,.11,1.1,10),Xt(e,.95,.18));f.position.y=-.92,u.add(f);const d=fe(r,new mt(new Ce(1.12,1.12,.72,64),Xt(e,.8,.08)),[0,0,-1],1.35);d.rotation.x=Math.PI/2,d.position.set(.5,-.75,0),d.userData.basePosition=d.position.clone(),i.add(d);const g=[];for(let _=0;_<42;_++){const p=new mt(new le(.025,.025,.13),ci(e,.55));p.userData={phase:Math.random()*6.28,r:.3+Math.random()*.7,speed:.5+Math.random()},i.add(p),g.push(p)}n.push(_=>{u.position.x=Math.sin(_*.55)*1.5,c.position.z=Math.cos(_*.4)*.35,d.rotation.z=_*1.5,f.rotation.y=_*4,g.forEach(p=>{const m=p.userData,y=_*m.speed+m.phase;p.position.set(u.position.x+Math.cos(y)*m.r,-.5+Math.sin(y*1.7)*.55,Math.sin(y)*m.r),p.rotation.z=y})})}function rC(r){const{world:t,accent:e,tickers:n}=r,i=new jt;t.add(i);const s=fe(r,new mt(new Bh(1.25,.34,170,24,2,3),new us({color:e,metalness:.82,roughness:.16,transparent:!0,opacity:.38,wireframe:!0,emissive:e,emissiveIntensity:.08})),[0,0,-1],1.2);i.add(s);const o=fe(r,new Ro(new dc(new le(4.3,4.3,4.3)),new Un({color:e,transparent:!0,opacity:.25})),[0,0,1],.9);i.add(o);const a=fe(r,new jt,[1,0,0],1.6);a.position.x=3,a.userData.basePosition=a.position.clone(),i.add(a);const c=new mt(new le(.2,4,.2),vo(e,.55));a.add(c);const l=new mt(new le(.85,.32,.55),Xt(e,.42,.14));l.position.set(-.42,1.1,0),a.add(l);const u=new mt(new Yn(5.4,5.4),new _i({color:e,transparent:!0,opacity:.08,side:Fe}));u.rotation.x=Math.PI/2,i.add(u);const h=new qt,f=[];for(let g=0;g<480;g++){const _=Math.random()*Math.PI*2,p=Math.acos(2*Math.random()-1),m=1.55+.12*Math.sin(_*3);f.push(m*Math.sin(p)*Math.cos(_),m*Math.cos(p),m*Math.sin(p)*Math.sin(_))}h.setAttribute("position",new Ft(f,3));const d=new H_(h,new Dh({color:e,size:.025,transparent:!0,opacity:.55}));i.add(d),n.push(g=>{s.rotation.y=g*.34,s.rotation.x=g*.16,d.rotation.y=-g*.18,u.position.y=Math.sin(g*.95)*1.85,u.material.opacity=.035+.06*(1+Math.sin(g*3.4)),l.position.y=1.1+Math.sin(g*.75)*1.1})}function lp(r){const{world:t,accent:e,tickers:n}=r,i=new mt(new pc(1.55,2),vo(e,.42));t.add(i),Po(t,e,6,1.7);for(let s=0;s<16;s++){const o=s/16*Math.PI*2;t.add(yr(new R(Math.cos(o)*2.15,Math.sin(o)*2.15,0),new R(Math.cos(o)*4.35,Math.sin(o)*4.35,-1),e,.16))}for(let s=0;s<6;s++)J_(r,new R(-3+s*1.2,-2+s%2*.22,-1),.7);n.push(s=>{i.rotation.x=s*.12,i.rotation.y=s*.2,t.rotation.z=Math.sin(s*.2)*.05})}cp&&q1(cp);const Hh="zsk-a11y",Bu={font:"normal",contrast:!1,grayscale:!1,spacing:!1,images:!1,motion:!1};let is=null,Le=aC();function bi(r){return String(r??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function sC(){document.querySelectorAll("[data-media-inline-upload]").forEach(r=>{const t=r.querySelector("[data-media-upload-input]"),e=r.querySelector("[data-media-upload-button]"),n=r.querySelector("[data-media-upload-status]");!t||!e||e.addEventListener("click",async()=>{const i=[...t.files||[]];if(!i.length){n&&(n.textContent="Сначала выберите один или несколько файлов."),t.focus();return}const s=new FormData;i.forEach(a=>s.append("files[]",a)),e.disabled=!0;const o=e.textContent;e.textContent="Загрузка…",n&&(n.textContent="Загружаю в медиатеку…");try{const a=await fetch(r.dataset.uploadUrl,{method:"POST",headers:{Accept:"application/json","X-CSRF-TOKEN":r.dataset.csrf||""},body:s}),c=await a.json().catch(()=>({}));if(!a.ok){const u=c!=null&&c.errors?Object.values(c.errors).flat().join(" "):null;throw new Error(u||(c==null?void 0:c.message)||"Не удалось загрузить файл.")}const l=Array.isArray(c.assets)?c.assets:[];t.value="",n&&(n.textContent=c.message||"Загружено файлов: "+l.length),window.dispatchEvent(new CustomEvent("zsk:media-uploaded",{detail:{assets:l}}))}catch(a){n&&(n.textContent=(a==null?void 0:a.message)||"Ошибка загрузки файла.")}finally{e.disabled=!1,e.textContent=o}})}),window.addEventListener("zsk:media-uploaded",r=>{var e;const t=((e=r.detail)==null?void 0:e.assets)||[];document.querySelectorAll("[data-media-select]").forEach(n=>{t.forEach(i=>{if(n.querySelector('option[value="'+i.id+'"]'))return;const s=document.createElement("option");s.value=i.id,s.textContent=(i.title||"Файл")+" · "+String(i.extension||"").toUpperCase(),n.prepend(s)})}),document.querySelectorAll(".media-picker").forEach(n=>{const i=n.querySelector('[data-media-picker-grid="cover"]'),s=n.querySelector('[data-media-picker-grid="content"]');t.forEach(o=>{const a=o.title||"Файл",c=(a+" "+(o.extension||"")).toLowerCase();if(o.is_image&&i&&!i.querySelector('input[value="'+o.id+'"]')){const l=document.createElement("label");l.className="media-pick-card",l.dataset.mediaSearch=c,l.innerHTML='<input type="radio" name="main_media_id" value="'+o.id+'"><span class="media-pick-preview"><img src="'+bi(o.url)+'" alt=""></span><span class="media-pick-title">'+bi(a)+"</span>",i.prepend(l)}if(s&&!s.querySelector('input[value="'+o.id+'"]')){const l=document.createElement("label");l.className="media-pick-card",l.dataset.mediaSearch=c;const u=o.is_image?'<img src="'+bi(o.url)+'" alt="">':'<span class="media-file-symbol">'+bi(o.type==="model_3d"?"3D":String(o.extension||"FILE").toUpperCase())+"</span>";l.innerHTML='<input type="checkbox" name="content_media_ids[]" value="'+o.id+'"><span class="media-pick-preview">'+u+'</span><span class="media-pick-title">'+bi(a)+"</span><small>"+bi(String(o.extension||"").toUpperCase())+" · "+bi(o.human_size||"")+"</small>",s.prepend(l)}})})})}function oC(){const r=bi;document.querySelectorAll("[data-rich-editor]").forEach(t=>{var m,y,v,E,w,T,S,C,L,x,M;const e=t.querySelector("[data-rich-surface]"),n=t.querySelector("[data-rich-source]"),i=t.querySelector("[data-rich-output]"),s=t.querySelector("[data-rich-toolbar]"),o=t.querySelector("[data-rich-media-panel]");if(!e||!n||!i)return;let a="visual",c=null;const l=()=>{i.value=a==="html"?n.value:e.innerHTML},u=()=>{if(a!=="visual")return;const D=window.getSelection();if(!D||!D.rangeCount)return;const I=D.getRangeAt(0);e.contains(I.commonAncestorContainer)&&(c=I.cloneRange())},h=()=>{if(!c)return;const D=window.getSelection();D&&(D.removeAllRanges(),D.addRange(c))},f=D=>{if(a==="html"){const I=n.selectionStart??n.value.length,k=n.selectionEnd??I;n.setRangeText(D,I,k,"end"),n.dispatchEvent(new Event("input",{bubbles:!0})),n.focus();return}e.focus(),h(),document.execCommand("insertHTML",!1,D),u(),l()},d=(D,I=null)=>{a==="visual"&&(e.focus(),h(),document.execCommand(D,!1,I),u(),l())};e.addEventListener("mouseup",u),e.addEventListener("keyup",u),e.addEventListener("focus",u),e.addEventListener("input",l),n.addEventListener("input",l),s==null||s.querySelectorAll("button").forEach(D=>{D.addEventListener("mousedown",I=>I.preventDefault())}),t.querySelectorAll("[data-rich-command]").forEach(D=>{D.addEventListener("click",()=>d(D.dataset.richCommand))}),(m=t.querySelector("[data-rich-format]"))==null||m.addEventListener("change",D=>{a==="visual"&&(d("formatBlock","<"+D.target.value+">"),D.target.value="p")}),(y=t.querySelector("[data-rich-blockquote]"))==null||y.addEventListener("click",()=>{d("formatBlock","<blockquote>")}),(v=t.querySelector("[data-rich-link]"))==null||v.addEventListener("click",()=>{var F;const D=window.prompt("Адрес ссылки (https://...)");if(!D)return;if(a==="html"){const O=window.prompt("Текст ссылки",D)||D;f('<a href="'+r(D)+'" target="_blank" rel="noopener">'+r(O)+"</a>");return}h();const I=window.getSelection();if((F=I==null?void 0:I.toString())==null?void 0:F.trim())d("createLink",D),e.querySelectorAll('a[href="'+CSS.escape(D)+'"]').forEach(O=>{O.target="_blank",O.rel="noopener"}),l();else{const O=window.prompt("Текст ссылки",D)||D;f('<a href="'+r(D)+'" target="_blank" rel="noopener">'+r(O)+"</a>")}}),(E=t.querySelector("[data-rich-table]"))==null||E.addEventListener("click",()=>{const D=Math.max(1,Math.min(10,parseInt(window.prompt("Количество строк","3")||"0",10))),I=Math.max(1,Math.min(8,parseInt(window.prompt("Количество столбцов","3")||"0",10)));if(!D||!I)return;let k='<div class="content-table-wrap"><table class="content-table"><tbody>';for(let F=0;F<D;F++){k+="<tr>";for(let O=0;O<I;O++){const G=F===0?"th":"td";k+="<"+G+">"+(F===0?"Заголовок":"Ячейка")+"</"+G+">"}k+="</tr>"}k+="</tbody></table></div><p><br></p>",f(k)}),(w=t.querySelector("[data-rich-rule]"))==null||w.addEventListener("click",()=>{f("<hr><p><br></p>")}),(T=t.querySelector("[data-rich-undo]"))==null||T.addEventListener("click",()=>d("undo")),(S=t.querySelector("[data-rich-redo]"))==null||S.addEventListener("click",()=>d("redo"));const g=D=>{D!==a&&(D==="html"?(n.value=e.innerHTML,e.hidden=!0,n.hidden=!1,s==null||s.classList.add("is-source-mode")):(e.innerHTML=n.value,n.hidden=!0,e.hidden=!1,s==null||s.classList.remove("is-source-mode")),a=D,t.querySelectorAll("[data-rich-mode]").forEach(I=>{I.classList.toggle("active",I.dataset.richMode===a)}),l())};t.querySelectorAll("[data-rich-mode]").forEach(D=>{D.addEventListener("click",()=>g(D.dataset.richMode))});const _=()=>{o&&(o.hidden=!0)};(C=t.querySelector("[data-rich-media-open]"))==null||C.addEventListener("click",()=>{u(),o&&(o.hidden=!1)}),(L=t.querySelector("[data-rich-media-close]"))==null||L.addEventListener("click",_),(x=t.querySelector("[data-rich-media-search]"))==null||x.addEventListener("input",D=>{const I=D.target.value.trim().toLowerCase();t.querySelectorAll("[data-rich-media-item]").forEach(k=>{k.hidden=!!I&&!(k.dataset.mediaSearch||"").includes(I)})});const p=D=>{const I=D.dataset.mediaType,k=D.dataset.mediaUrl||"",F=D.dataset.mediaTitle||"",O=D.dataset.mediaAlt||F;if(I==="image")f('<figure class="content-inline-media"><img src="'+r(k)+'" alt="'+r(O)+'" loading="lazy">'+(F?"<figcaption>"+r(F)+"</figcaption>":"")+"</figure><p><br></p>");else{const G=I==="model_3d"?"Открыть 3D-модель":"Открыть документ";f('<p class="content-file-link"><a href="'+r(k)+'" target="_blank" rel="noopener">'+r(F||G)+" ↗</a></p>")}_()};t.addEventListener("click",D=>{const I=D.target.closest("[data-rich-media-item]");!I||!t.contains(I)||p(I)}),window.addEventListener("zsk:media-uploaded",D=>{var k;const I=t.querySelector("[data-rich-media-grid]");I&&(((k=D.detail)==null?void 0:k.assets)||[]).forEach(F=>{if(I.querySelector('[data-media-id="'+F.id+'"]'))return;const O=document.createElement("button");O.type="button",O.className="rich-media-item",O.dataset.richMediaItem="",O.dataset.mediaId=F.id,O.dataset.mediaType=F.type||"document",O.dataset.mediaUrl=F.url||"",O.dataset.mediaTitle=F.title||"Файл",O.dataset.mediaAlt=F.alt||F.title||"",O.dataset.mediaSearch=((F.title||"")+" "+(F.extension||"")).toLowerCase();const G=F.is_image?'<img src="'+r(F.url||"")+'" alt="">':"<span>"+r(F.type==="model_3d"?"3D":String(F.extension||"FILE").toUpperCase())+"</span>";O.innerHTML='<span class="rich-media-preview">'+G+'</span><span class="rich-media-name">'+r(F.title||"Файл")+"</span><small>"+r(String(F.extension||"").toUpperCase())+" · "+r(F.human_size||"")+"</small>",I.prepend(O)})}),(M=t.closest("form"))==null||M.addEventListener("submit",()=>{l()}),n.hidden=!0,l()})}function aC(){try{return{...Bu,...JSON.parse(localStorage.getItem(Hh)||"{}")}}catch{return{...Bu}}}function up(){try{localStorage.setItem(Hh,JSON.stringify(Le))}catch{}}function Qs(r=!0){const t=document.documentElement;t.dataset.a11yFont=Le.font||"normal",t.classList.toggle("a11y-high-contrast",!!Le.contrast),t.classList.toggle("a11y-grayscale",!!Le.grayscale),t.classList.toggle("a11y-wide-spacing",!!Le.spacing),t.classList.toggle("a11y-hide-images",!!Le.images),t.classList.toggle("a11y-no-motion",!!Le.motion),Wa.globalTimeline.paused(!!Le.motion),r&&(document.querySelectorAll("[data-a11y-font]").forEach(e=>{e.setAttribute("aria-pressed",String(e.dataset.a11yFont===Le.font))}),document.querySelectorAll("[data-a11y-toggle]").forEach(e=>{const n=!!Le[e.dataset.a11yToggle];e.setAttribute("aria-checked",String(n)),e.classList.toggle("active",n)})),window.dispatchEvent(new CustomEvent("zsk:a11y",{detail:{...Le}}))}Qs(!1);function Gh(r){document.querySelectorAll("[data-pwa-install]").forEach(e=>{e.hidden=!r});const t=document.querySelector("[data-pwa-banner]");if(t){const e=sessionStorage.getItem("zsk-pwa-banner-dismissed")==="1";t.hidden=!r||e}}function Wh(){const r=!navigator.onLine;document.documentElement.classList.toggle("is-offline",r);const t=document.querySelector("[data-offline-status]");t&&(t.hidden=!r)}window.addEventListener("beforeinstallprompt",r=>{r.preventDefault(),is=r,Gh(!0)});window.addEventListener("appinstalled",()=>{is=null,Gh(!1),document.documentElement.classList.add("pwa-installed")});window.addEventListener("online",Wh);window.addEventListener("offline",Wh);document.addEventListener("DOMContentLoaded",()=>{sC(),oC(),Qs(!0),Le.motion||Wa.from(".reveal",{y:28,opacity:0,duration:.85,stagger:.12,ease:"power3.out"});const r=[...document.querySelectorAll(".spec-card,.news-card,.glass-panel,.home-lesson-card,.home-achievement-card")];if("IntersectionObserver"in window&&!Le.motion){const c=new IntersectionObserver(l=>l.forEach(u=>{u.isIntersecting&&(Wa.fromTo(u.target,{y:25,opacity:0},{y:0,opacity:1,duration:.65,ease:"power2.out"}),c.unobserve(u.target))}),{threshold:.12});r.forEach(l=>c.observe(l))}const t=document.querySelector("[data-a11y-panel]"),e=document.querySelector("[data-a11y-backdrop]"),n=document.querySelector("[data-a11y-open]"),i=()=>{t&&(t.hidden=!1),e&&(e.hidden=!1),n==null||n.setAttribute("aria-expanded","true"),document.documentElement.classList.add("a11y-panel-open")},s=()=>{t&&(t.hidden=!0),e&&(e.hidden=!0),n==null||n.setAttribute("aria-expanded","false"),document.documentElement.classList.remove("a11y-panel-open")};n==null||n.addEventListener("click",i),document.querySelectorAll("[data-a11y-close]").forEach(c=>c.addEventListener("click",s)),e==null||e.addEventListener("click",s),document.querySelectorAll("[data-a11y-font]").forEach(c=>{c.addEventListener("click",()=>{Le.font=c.dataset.a11yFont||"normal",up(),Qs(!0)})}),document.querySelectorAll("[data-a11y-toggle]").forEach(c=>{c.addEventListener("click",l=>{l.preventDefault();const u=c.dataset.a11yToggle;u&&(Le[u]=!Le[u],up(),Qs(!0))})}),document.querySelectorAll("[data-a11y-reset]").forEach(c=>{c.addEventListener("click",()=>{Le={...Bu};try{localStorage.removeItem(Hh)}catch{}Qs(!0)})}),document.addEventListener("keydown",c=>{c.key==="Escape"&&t&&!t.hidden&&s()}),(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0)&&document.documentElement.classList.add("pwa-standalone"),Wh(),document.querySelectorAll("[data-pwa-install]").forEach(c=>{c.addEventListener("click",async()=>{is&&(is.prompt(),await is.userChoice,is=null,Gh(!1))})}),document.querySelectorAll("[data-pwa-close]").forEach(c=>{c.addEventListener("click",()=>{sessionStorage.setItem("zsk-pwa-banner-dismissed","1");const l=c.closest("[data-pwa-banner]");l&&(l.hidden=!0)})});const o=document.getElementById("mobileNav"),a=document.querySelector(".mobile-menu-trigger");o&&a&&(o.addEventListener("show.bs.offcanvas",()=>a.classList.add("active")),o.addEventListener("hidden.bs.offcanvas",()=>a.classList.remove("active")))});"serviceWorker"in navigator&&(location.protocol==="https:"||location.hostname==="localhost")&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js",{scope:"/"}).then(r=>{r.update().catch(()=>{})}).catch(r=>{console.warn("PWA service worker registration failed:",r)})});


function zskUrlBase64ToUint8Array(base64String){
  const padding='='.repeat((4-base64String.length%4)%4);
  const base64=(base64String+padding).replace(/-/g,'+').replace(/_/g,'/');
  const raw=atob(base64);
  return Uint8Array.from([...raw].map(ch=>ch.charCodeAt(0)));
}

async function zskEnablePush(button,status){
  const key=document.querySelector('meta[name="webpush-public-key"]')?.content||'';
  const csrf=document.querySelector('meta[name="csrf-token"]')?.content||'';
  if(!('serviceWorker' in navigator)||!('PushManager' in window)||!('Notification' in window)){
    if(status)status.textContent='Этот браузер не поддерживает Web Push.';
    return;
  }
  if(!key){
    if(status)status.textContent='Push ещё не настроен на сервере.';
    return;
  }
  try{
    const permission=await Notification.requestPermission();
    if(permission!=='granted'){ if(status)status.textContent='Разрешение на уведомления не предоставлено.'; return; }
    const registration=await navigator.serviceWorker.ready;
    let subscription=await registration.pushManager.getSubscription();
    if(!subscription){
      subscription=await registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:zskUrlBase64ToUint8Array(key)});
    }
    const json=subscription.toJSON();
    json.contentEncoding=(window.PushManager.supportedContentEncodings||['aes128gcm'])[0];
    const response=await fetch('/student/push-subscriptions',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json','X-CSRF-TOKEN':csrf},
      body:JSON.stringify(json)
    });
    if(!response.ok)throw new Error('Не удалось сохранить подписку');
    button.textContent='PWA-уведомления включены';
    button.disabled=true;
    if(status)status.textContent='Это устройство будет получать выбранные уведомления.';
  }catch(error){
    if(status)status.textContent=error?.message||'Не удалось включить уведомления.';
  }
}

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-push-enable]').forEach(button=>{
    const status=document.querySelector('[data-push-status]');
    button.addEventListener('click',()=>zskEnablePush(button,status));
    if('serviceWorker' in navigator && 'PushManager' in window && Notification.permission==='granted'){
      navigator.serviceWorker.ready.then(r=>r.pushManager.getSubscription()).then(subscription=>{
        if(subscription){button.textContent='PWA-уведомления включены';button.disabled=true;if(status)status.textContent='Подписка активна на этом устройстве.';}
      }).catch(()=>{});
    }
  });
});
