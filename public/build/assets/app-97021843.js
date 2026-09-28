var ke="top",hn="bottom",fn="right",Ve="left",Fa="auto",Es=[ke,hn,fn,Ve],mr="start",ns="end",Yd="clippingParents",Su="viewport",Hr="popper",qd="reference",hl=Es.reduce(function(r,t){return r.concat([t+"-"+mr,t+"-"+ns])},[]),Mu=[].concat(Es,[Fa]).reduce(function(r,t){return r.concat([t,t+"-"+mr,t+"-"+ns])},[]),Kd="beforeRead",jd="read",Jd="afterRead",Zd="beforeMain",Qd="main",tp="afterMain",ep="beforeWrite",np="write",ip="afterWrite",rp=[Kd,jd,Jd,Zd,Qd,tp,ep,np,ip];function Hn(r){return r?(r.nodeName||"").toLowerCase():null}function dn(r){if(r==null)return window;if(r.toString()!=="[object Window]"){var t=r.ownerDocument;return t&&t.defaultView||window}return r}function _r(r){var t=dn(r).Element;return r instanceof t||r instanceof Element}function Mn(r){var t=dn(r).HTMLElement;return r instanceof t||r instanceof HTMLElement}function Tu(r){if(typeof ShadowRoot>"u")return!1;var t=dn(r).ShadowRoot;return r instanceof t||r instanceof ShadowRoot}function U_(r){var t=r.state;Object.keys(t.elements).forEach(function(e){var n=t.styles[e]||{},i=t.attributes[e]||{},s=t.elements[e];!Mn(s)||!Hn(s)||(Object.assign(s.style,n),Object.keys(i).forEach(function(o){var a=i[o];a===!1?s.removeAttribute(o):s.setAttribute(o,a===!0?"":a)}))})}function F_(r){var t=r.state,e={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,e.popper),t.styles=e,t.elements.arrow&&Object.assign(t.elements.arrow.style,e.arrow),function(){Object.keys(t.elements).forEach(function(n){var i=t.elements[n],s=t.attributes[n]||{},o=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:e[n]),a=o.reduce(function(c,l){return c[l]="",c},{});!Mn(i)||!Hn(i)||(Object.assign(i.style,a),Object.keys(s).forEach(function(c){i.removeAttribute(c)}))})}}const bu={name:"applyStyles",enabled:!0,phase:"write",fn:U_,effect:F_,requires:["computeStyles"]};function zn(r){return r.split("-")[0]}var lr=Math.max,ga=Math.min,is=Math.round;function fl(){var r=navigator.userAgentData;return r!=null&&r.brands&&Array.isArray(r.brands)?r.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function sp(){return!/^((?!chrome|android).)*safari/i.test(fl())}function rs(r,t,e){t===void 0&&(t=!1),e===void 0&&(e=!1);var n=r.getBoundingClientRect(),i=1,s=1;t&&Mn(r)&&(i=r.offsetWidth>0&&is(n.width)/r.offsetWidth||1,s=r.offsetHeight>0&&is(n.height)/r.offsetHeight||1);var o=_r(r)?dn(r):window,a=o.visualViewport,c=!sp()&&e,l=(n.left+(c&&a?a.offsetLeft:0))/i,u=(n.top+(c&&a?a.offsetTop:0))/s,h=n.width/i,f=n.height/s;return{width:h,height:f,top:u,right:l+h,bottom:u+f,left:l,x:l,y:u}}function Au(r){var t=rs(r),e=r.offsetWidth,n=r.offsetHeight;return Math.abs(t.width-e)<=1&&(e=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:r.offsetLeft,y:r.offsetTop,width:e,height:n}}function op(r,t){var e=t.getRootNode&&t.getRootNode();if(r.contains(t))return!0;if(e&&Tu(e)){var n=t;do{if(n&&r.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function ai(r){return dn(r).getComputedStyle(r)}function B_(r){return["table","td","th"].indexOf(Hn(r))>=0}function Bi(r){return((_r(r)?r.ownerDocument:r.document)||window.document).documentElement}function Ba(r){return Hn(r)==="html"?r:r.assignedSlot||r.parentNode||(Tu(r)?r.host:null)||Bi(r)}function Fh(r){return!Mn(r)||ai(r).position==="fixed"?null:r.offsetParent}function z_(r){var t=/firefox/i.test(fl()),e=/Trident/i.test(fl());if(e&&Mn(r)){var n=ai(r);if(n.position==="fixed")return null}var i=Ba(r);for(Tu(i)&&(i=i.host);Mn(i)&&["html","body"].indexOf(Hn(i))<0;){var s=ai(i);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return i;i=i.parentNode}return null}function so(r){for(var t=dn(r),e=Fh(r);e&&B_(e)&&ai(e).position==="static";)e=Fh(e);return e&&(Hn(e)==="html"||Hn(e)==="body"&&ai(e).position==="static")?t:e||z_(r)||t}function wu(r){return["top","bottom"].indexOf(r)>=0?"x":"y"}function Hs(r,t,e){return lr(r,ga(t,e))}function k_(r,t,e){var n=Hs(r,t,e);return n>e?e:n}function ap(){return{top:0,right:0,bottom:0,left:0}}function cp(r){return Object.assign({},ap(),r)}function lp(r,t){return t.reduce(function(e,n){return e[n]=r,e},{})}var V_=function(t,e){return t=typeof t=="function"?t(Object.assign({},e.rects,{placement:e.placement})):t,cp(typeof t!="number"?t:lp(t,Es))};function H_(r){var t,e=r.state,n=r.name,i=r.options,s=e.elements.arrow,o=e.modifiersData.popperOffsets,a=zn(e.placement),c=wu(a),l=[Ve,fn].indexOf(a)>=0,u=l?"height":"width";if(!(!s||!o)){var h=V_(i.padding,e),f=Au(s),d=c==="y"?ke:Ve,g=c==="y"?hn:fn,_=e.rects.reference[u]+e.rects.reference[c]-o[c]-e.rects.popper[u],p=o[c]-e.rects.reference[c],m=so(s),y=m?c==="y"?m.clientHeight||0:m.clientWidth||0:0,v=_/2-p/2,E=h[d],w=y-f[u]-h[g],b=y/2-f[u]/2+v,S=Hs(E,b,w),C=c;e.modifiersData[n]=(t={},t[C]=S,t.centerOffset=S-b,t)}}function G_(r){var t=r.state,e=r.options,n=e.element,i=n===void 0?"[data-popper-arrow]":n;i!=null&&(typeof i=="string"&&(i=t.elements.popper.querySelector(i),!i)||op(t.elements.popper,i)&&(t.elements.arrow=i))}const up={name:"arrow",enabled:!0,phase:"main",fn:H_,effect:G_,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ss(r){return r.split("-")[1]}var W_={top:"auto",right:"auto",bottom:"auto",left:"auto"};function X_(r,t){var e=r.x,n=r.y,i=t.devicePixelRatio||1;return{x:is(e*i)/i||0,y:is(n*i)/i||0}}function Bh(r){var t,e=r.popper,n=r.popperRect,i=r.placement,s=r.variation,o=r.offsets,a=r.position,c=r.gpuAcceleration,l=r.adaptive,u=r.roundOffsets,h=r.isFixed,f=o.x,d=f===void 0?0:f,g=o.y,_=g===void 0?0:g,p=typeof u=="function"?u({x:d,y:_}):{x:d,y:_};d=p.x,_=p.y;var m=o.hasOwnProperty("x"),y=o.hasOwnProperty("y"),v=Ve,E=ke,w=window;if(l){var b=so(e),S="clientHeight",C="clientWidth";if(b===dn(e)&&(b=Bi(e),ai(b).position!=="static"&&a==="absolute"&&(S="scrollHeight",C="scrollWidth")),b=b,i===ke||(i===Ve||i===fn)&&s===ns){E=hn;var L=h&&b===w&&w.visualViewport?w.visualViewport.height:b[S];_-=L-n.height,_*=c?1:-1}if(i===Ve||(i===ke||i===hn)&&s===ns){v=fn;var x=h&&b===w&&w.visualViewport?w.visualViewport.width:b[C];d-=x-n.width,d*=c?1:-1}}var M=Object.assign({position:a},l&&W_),O=u===!0?X_({x:d,y:_},dn(e)):{x:d,y:_};if(d=O.x,_=O.y,c){var U;return Object.assign({},M,(U={},U[E]=y?"0":"",U[v]=m?"0":"",U.transform=(w.devicePixelRatio||1)<=1?"translate("+d+"px, "+_+"px)":"translate3d("+d+"px, "+_+"px, 0)",U))}return Object.assign({},M,(t={},t[E]=y?_+"px":"",t[v]=m?d+"px":"",t.transform="",t))}function $_(r){var t=r.state,e=r.options,n=e.gpuAcceleration,i=n===void 0?!0:n,s=e.adaptive,o=s===void 0?!0:s,a=e.roundOffsets,c=a===void 0?!0:a,l={placement:zn(t.placement),variation:ss(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:i,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Bh(Object.assign({},l,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:o,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Bh(Object.assign({},l,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Cu={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:$_,data:{}};var yo={passive:!0};function Y_(r){var t=r.state,e=r.instance,n=r.options,i=n.scroll,s=i===void 0?!0:i,o=n.resize,a=o===void 0?!0:o,c=dn(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&l.forEach(function(u){u.addEventListener("scroll",e.update,yo)}),a&&c.addEventListener("resize",e.update,yo),function(){s&&l.forEach(function(u){u.removeEventListener("scroll",e.update,yo)}),a&&c.removeEventListener("resize",e.update,yo)}}const Ru={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Y_,data:{}};var q_={left:"right",right:"left",bottom:"top",top:"bottom"};function ia(r){return r.replace(/left|right|bottom|top/g,function(t){return q_[t]})}var K_={start:"end",end:"start"};function zh(r){return r.replace(/start|end/g,function(t){return K_[t]})}function Pu(r){var t=dn(r),e=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:e,scrollTop:n}}function Lu(r){return rs(Bi(r)).left+Pu(r).scrollLeft}function j_(r,t){var e=dn(r),n=Bi(r),i=e.visualViewport,s=n.clientWidth,o=n.clientHeight,a=0,c=0;if(i){s=i.width,o=i.height;var l=sp();(l||!l&&t==="fixed")&&(a=i.offsetLeft,c=i.offsetTop)}return{width:s,height:o,x:a+Lu(r),y:c}}function J_(r){var t,e=Bi(r),n=Pu(r),i=(t=r.ownerDocument)==null?void 0:t.body,s=lr(e.scrollWidth,e.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),o=lr(e.scrollHeight,e.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),a=-n.scrollLeft+Lu(r),c=-n.scrollTop;return ai(i||e).direction==="rtl"&&(a+=lr(e.clientWidth,i?i.clientWidth:0)-s),{width:s,height:o,x:a,y:c}}function Du(r){var t=ai(r),e=t.overflow,n=t.overflowX,i=t.overflowY;return/auto|scroll|overlay|hidden/.test(e+i+n)}function hp(r){return["html","body","#document"].indexOf(Hn(r))>=0?r.ownerDocument.body:Mn(r)&&Du(r)?r:hp(Ba(r))}function Gs(r,t){var e;t===void 0&&(t=[]);var n=hp(r),i=n===((e=r.ownerDocument)==null?void 0:e.body),s=dn(n),o=i?[s].concat(s.visualViewport||[],Du(n)?n:[]):n,a=t.concat(o);return i?a:a.concat(Gs(Ba(o)))}function dl(r){return Object.assign({},r,{left:r.x,top:r.y,right:r.x+r.width,bottom:r.y+r.height})}function Z_(r,t){var e=rs(r,!1,t==="fixed");return e.top=e.top+r.clientTop,e.left=e.left+r.clientLeft,e.bottom=e.top+r.clientHeight,e.right=e.left+r.clientWidth,e.width=r.clientWidth,e.height=r.clientHeight,e.x=e.left,e.y=e.top,e}function kh(r,t,e){return t===Su?dl(j_(r,e)):_r(t)?Z_(t,e):dl(J_(Bi(r)))}function Q_(r){var t=Gs(Ba(r)),e=["absolute","fixed"].indexOf(ai(r).position)>=0,n=e&&Mn(r)?so(r):r;return _r(n)?t.filter(function(i){return _r(i)&&op(i,n)&&Hn(i)!=="body"}):[]}function tg(r,t,e,n){var i=t==="clippingParents"?Q_(r):[].concat(t),s=[].concat(i,[e]),o=s[0],a=s.reduce(function(c,l){var u=kh(r,l,n);return c.top=lr(u.top,c.top),c.right=ga(u.right,c.right),c.bottom=ga(u.bottom,c.bottom),c.left=lr(u.left,c.left),c},kh(r,o,n));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function fp(r){var t=r.reference,e=r.element,n=r.placement,i=n?zn(n):null,s=n?ss(n):null,o=t.x+t.width/2-e.width/2,a=t.y+t.height/2-e.height/2,c;switch(i){case ke:c={x:o,y:t.y-e.height};break;case hn:c={x:o,y:t.y+t.height};break;case fn:c={x:t.x+t.width,y:a};break;case Ve:c={x:t.x-e.width,y:a};break;default:c={x:t.x,y:t.y}}var l=i?wu(i):null;if(l!=null){var u=l==="y"?"height":"width";switch(s){case mr:c[l]=c[l]-(t[u]/2-e[u]/2);break;case ns:c[l]=c[l]+(t[u]/2-e[u]/2);break}}return c}function os(r,t){t===void 0&&(t={});var e=t,n=e.placement,i=n===void 0?r.placement:n,s=e.strategy,o=s===void 0?r.strategy:s,a=e.boundary,c=a===void 0?Yd:a,l=e.rootBoundary,u=l===void 0?Su:l,h=e.elementContext,f=h===void 0?Hr:h,d=e.altBoundary,g=d===void 0?!1:d,_=e.padding,p=_===void 0?0:_,m=cp(typeof p!="number"?p:lp(p,Es)),y=f===Hr?qd:Hr,v=r.rects.popper,E=r.elements[g?y:f],w=tg(_r(E)?E:E.contextElement||Bi(r.elements.popper),c,u,o),b=rs(r.elements.reference),S=fp({reference:b,element:v,strategy:"absolute",placement:i}),C=dl(Object.assign({},v,S)),L=f===Hr?C:b,x={top:w.top-L.top+m.top,bottom:L.bottom-w.bottom+m.bottom,left:w.left-L.left+m.left,right:L.right-w.right+m.right},M=r.modifiersData.offset;if(f===Hr&&M){var O=M[i];Object.keys(x).forEach(function(U){var V=[fn,hn].indexOf(U)>=0?1:-1,Y=[ke,hn].indexOf(U)>=0?"y":"x";x[U]+=O[Y]*V})}return x}function eg(r,t){t===void 0&&(t={});var e=t,n=e.placement,i=e.boundary,s=e.rootBoundary,o=e.padding,a=e.flipVariations,c=e.allowedAutoPlacements,l=c===void 0?Mu:c,u=ss(n),h=u?a?hl:hl.filter(function(g){return ss(g)===u}):Es,f=h.filter(function(g){return l.indexOf(g)>=0});f.length===0&&(f=h);var d=f.reduce(function(g,_){return g[_]=os(r,{placement:_,boundary:i,rootBoundary:s,padding:o})[zn(_)],g},{});return Object.keys(d).sort(function(g,_){return d[g]-d[_]})}function ng(r){if(zn(r)===Fa)return[];var t=ia(r);return[zh(r),t,zh(t)]}function ig(r){var t=r.state,e=r.options,n=r.name;if(!t.modifiersData[n]._skip){for(var i=e.mainAxis,s=i===void 0?!0:i,o=e.altAxis,a=o===void 0?!0:o,c=e.fallbackPlacements,l=e.padding,u=e.boundary,h=e.rootBoundary,f=e.altBoundary,d=e.flipVariations,g=d===void 0?!0:d,_=e.allowedAutoPlacements,p=t.options.placement,m=zn(p),y=m===p,v=c||(y||!g?[ia(p)]:ng(p)),E=[p].concat(v).reduce(function(D,H){return D.concat(zn(H)===Fa?eg(t,{placement:H,boundary:u,rootBoundary:h,padding:l,flipVariations:g,allowedAutoPlacements:_}):H)},[]),w=t.rects.reference,b=t.rects.popper,S=new Map,C=!0,L=E[0],x=0;x<E.length;x++){var M=E[x],O=zn(M),U=ss(M)===mr,V=[ke,hn].indexOf(O)>=0,Y=V?"width":"height",z=os(t,{placement:M,boundary:u,rootBoundary:h,altBoundary:f,padding:l}),$=V?U?fn:Ve:U?hn:ke;w[Y]>b[Y]&&($=ia($));var W=ia($),rt=[];if(s&&rt.push(z[O]<=0),a&&rt.push(z[$]<=0,z[W]<=0),rt.every(function(D){return D})){L=M,C=!1;break}S.set(M,rt)}if(C)for(var st=g?3:1,ct=function(H){var Z=E.find(function(et){var St=S.get(et);if(St)return St.slice(0,H).every(function(bt){return bt})});if(Z)return L=Z,"break"},At=st;At>0;At--){var Nt=ct(At);if(Nt==="break")break}t.placement!==L&&(t.modifiersData[n]._skip=!0,t.placement=L,t.reset=!0)}}const dp={name:"flip",enabled:!0,phase:"main",fn:ig,requiresIfExists:["offset"],data:{_skip:!1}};function Vh(r,t,e){return e===void 0&&(e={x:0,y:0}),{top:r.top-t.height-e.y,right:r.right-t.width+e.x,bottom:r.bottom-t.height+e.y,left:r.left-t.width-e.x}}function Hh(r){return[ke,fn,hn,Ve].some(function(t){return r[t]>=0})}function rg(r){var t=r.state,e=r.name,n=t.rects.reference,i=t.rects.popper,s=t.modifiersData.preventOverflow,o=os(t,{elementContext:"reference"}),a=os(t,{altBoundary:!0}),c=Vh(o,n),l=Vh(a,i,s),u=Hh(c),h=Hh(l);t.modifiersData[e]={referenceClippingOffsets:c,popperEscapeOffsets:l,isReferenceHidden:u,hasPopperEscaped:h},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":h})}const pp={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:rg};function sg(r,t,e){var n=zn(r),i=[Ve,ke].indexOf(n)>=0?-1:1,s=typeof e=="function"?e(Object.assign({},t,{placement:r})):e,o=s[0],a=s[1];return o=o||0,a=(a||0)*i,[Ve,fn].indexOf(n)>=0?{x:a,y:o}:{x:o,y:a}}function og(r){var t=r.state,e=r.options,n=r.name,i=e.offset,s=i===void 0?[0,0]:i,o=Mu.reduce(function(u,h){return u[h]=sg(h,t.rects,s),u},{}),a=o[t.placement],c=a.x,l=a.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=l),t.modifiersData[n]=o}const mp={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:og};function ag(r){var t=r.state,e=r.name;t.modifiersData[e]=fp({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Iu={name:"popperOffsets",enabled:!0,phase:"read",fn:ag,data:{}};function cg(r){return r==="x"?"y":"x"}function lg(r){var t=r.state,e=r.options,n=r.name,i=e.mainAxis,s=i===void 0?!0:i,o=e.altAxis,a=o===void 0?!1:o,c=e.boundary,l=e.rootBoundary,u=e.altBoundary,h=e.padding,f=e.tether,d=f===void 0?!0:f,g=e.tetherOffset,_=g===void 0?0:g,p=os(t,{boundary:c,rootBoundary:l,padding:h,altBoundary:u}),m=zn(t.placement),y=ss(t.placement),v=!y,E=wu(m),w=cg(E),b=t.modifiersData.popperOffsets,S=t.rects.reference,C=t.rects.popper,L=typeof _=="function"?_(Object.assign({},t.rects,{placement:t.placement})):_,x=typeof L=="number"?{mainAxis:L,altAxis:L}:Object.assign({mainAxis:0,altAxis:0},L),M=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,O={x:0,y:0};if(b){if(s){var U,V=E==="y"?ke:Ve,Y=E==="y"?hn:fn,z=E==="y"?"height":"width",$=b[E],W=$+p[V],rt=$-p[Y],st=d?-C[z]/2:0,ct=y===mr?S[z]:C[z],At=y===mr?-C[z]:-S[z],Nt=t.elements.arrow,D=d&&Nt?Au(Nt):{width:0,height:0},H=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ap(),Z=H[V],et=H[Y],St=Hs(0,S[z],D[z]),bt=v?S[z]/2-st-St-Z-x.mainAxis:ct-St-Z-x.mainAxis,kt=v?-S[z]/2+st+St+et+x.mainAxis:At+St+et+x.mainAxis,Yt=t.elements.arrow&&so(t.elements.arrow),Vt=Yt?E==="y"?Yt.clientTop||0:Yt.clientLeft||0:0,I=(U=M==null?void 0:M[E])!=null?U:0,Fe=$+bt-I-Vt,zt=$+kt-I,Ht=Hs(d?ga(W,Fe):W,$,d?lr(rt,zt):rt);b[E]=Ht,O[E]=Ht-$}if(a){var wt,ie=E==="x"?ke:Ve,Rt=E==="x"?hn:fn,R=b[w],T=w==="y"?"height":"width",k=R+p[ie],j=R-p[Rt],tt=[ke,Ve].indexOf(m)!==-1,K=(wt=M==null?void 0:M[w])!=null?wt:0,xt=tt?k:R-S[T]-C[T]-K+x.altAxis,ot=tt?R+S[T]+C[T]-K-x.altAxis:j,ht=d&&tt?k_(xt,R,ot):Hs(d?xt:k,R,d?ot:j);b[w]=ht,O[w]=ht-R}t.modifiersData[n]=O}}const _p={name:"preventOverflow",enabled:!0,phase:"main",fn:lg,requiresIfExists:["offset"]};function ug(r){return{scrollLeft:r.scrollLeft,scrollTop:r.scrollTop}}function hg(r){return r===dn(r)||!Mn(r)?Pu(r):ug(r)}function fg(r){var t=r.getBoundingClientRect(),e=is(t.width)/r.offsetWidth||1,n=is(t.height)/r.offsetHeight||1;return e!==1||n!==1}function dg(r,t,e){e===void 0&&(e=!1);var n=Mn(t),i=Mn(t)&&fg(t),s=Bi(t),o=rs(r,i,e),a={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(n||!n&&!e)&&((Hn(t)!=="body"||Du(s))&&(a=hg(t)),Mn(t)?(c=rs(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):s&&(c.x=Lu(s))),{x:o.left+a.scrollLeft-c.x,y:o.top+a.scrollTop-c.y,width:o.width,height:o.height}}function pg(r){var t=new Map,e=new Set,n=[];r.forEach(function(s){t.set(s.name,s)});function i(s){e.add(s.name);var o=[].concat(s.requires||[],s.requiresIfExists||[]);o.forEach(function(a){if(!e.has(a)){var c=t.get(a);c&&i(c)}}),n.push(s)}return r.forEach(function(s){e.has(s.name)||i(s)}),n}function mg(r){var t=pg(r);return rp.reduce(function(e,n){return e.concat(t.filter(function(i){return i.phase===n}))},[])}function _g(r){var t;return function(){return t||(t=new Promise(function(e){Promise.resolve().then(function(){t=void 0,e(r())})})),t}}function gg(r){var t=r.reduce(function(e,n){var i=e[n.name];return e[n.name]=i?Object.assign({},i,n,{options:Object.assign({},i.options,n.options),data:Object.assign({},i.data,n.data)}):n,e},{});return Object.keys(t).map(function(e){return t[e]})}var Gh={placement:"bottom",modifiers:[],strategy:"absolute"};function Wh(){for(var r=arguments.length,t=new Array(r),e=0;e<r;e++)t[e]=arguments[e];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function za(r){r===void 0&&(r={});var t=r,e=t.defaultModifiers,n=e===void 0?[]:e,i=t.defaultOptions,s=i===void 0?Gh:i;return function(a,c,l){l===void 0&&(l=s);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},Gh,s),modifiersData:{},elements:{reference:a,popper:c},attributes:{},styles:{}},h=[],f=!1,d={state:u,setOptions:function(m){var y=typeof m=="function"?m(u.options):m;_(),u.options=Object.assign({},s,u.options,y),u.scrollParents={reference:_r(a)?Gs(a):a.contextElement?Gs(a.contextElement):[],popper:Gs(c)};var v=mg(gg([].concat(n,u.options.modifiers)));return u.orderedModifiers=v.filter(function(E){return E.enabled}),g(),d.update()},forceUpdate:function(){if(!f){var m=u.elements,y=m.reference,v=m.popper;if(Wh(y,v)){u.rects={reference:dg(y,so(v),u.options.strategy==="fixed"),popper:Au(v)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(x){return u.modifiersData[x.name]=Object.assign({},x.data)});for(var E=0;E<u.orderedModifiers.length;E++){if(u.reset===!0){u.reset=!1,E=-1;continue}var w=u.orderedModifiers[E],b=w.fn,S=w.options,C=S===void 0?{}:S,L=w.name;typeof b=="function"&&(u=b({state:u,options:C,name:L,instance:d})||u)}}}},update:_g(function(){return new Promise(function(p){d.forceUpdate(),p(u)})}),destroy:function(){_(),f=!0}};if(!Wh(a,c))return d;d.setOptions(l).then(function(p){!f&&l.onFirstUpdate&&l.onFirstUpdate(p)});function g(){u.orderedModifiers.forEach(function(p){var m=p.name,y=p.options,v=y===void 0?{}:y,E=p.effect;if(typeof E=="function"){var w=E({state:u,name:m,instance:d,options:v}),b=function(){};h.push(w||b)}})}function _(){h.forEach(function(p){return p()}),h=[]}return d}}var vg=za(),xg=[Ru,Iu,Cu,bu],yg=za({defaultModifiers:xg}),Eg=[Ru,Iu,Cu,bu,mp,dp,_p,up,pp],Nu=za({defaultModifiers:Eg});const gp=Object.freeze(Object.defineProperty({__proto__:null,afterMain:tp,afterRead:Jd,afterWrite:ip,applyStyles:bu,arrow:up,auto:Fa,basePlacements:Es,beforeMain:Zd,beforeRead:Kd,beforeWrite:ep,bottom:hn,clippingParents:Yd,computeStyles:Cu,createPopper:Nu,createPopperBase:vg,createPopperLite:yg,detectOverflow:os,end:ns,eventListeners:Ru,flip:dp,hide:pp,left:Ve,main:Qd,modifierPhases:rp,offset:mp,placements:Mu,popper:Hr,popperGenerator:za,popperOffsets:Iu,preventOverflow:_p,read:jd,reference:qd,right:fn,start:mr,top:ke,variationPlacements:hl,viewport:Su,write:np},Symbol.toStringTag,{value:"Module"}));/*!
  * Bootstrap v5.3.8 (https://getbootstrap.com/)
  * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */const pi=new Map,rc={set(r,t,e){pi.has(r)||pi.set(r,new Map);const n=pi.get(r);if(!n.has(t)&&n.size!==0){console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);return}n.set(t,e)},get(r,t){return pi.has(r)&&pi.get(r).get(t)||null},remove(r,t){if(!pi.has(r))return;const e=pi.get(r);e.delete(t),e.size===0&&pi.delete(r)}},Sg=1e6,Mg=1e3,pl="transitionend",vp=r=>(r&&window.CSS&&window.CSS.escape&&(r=r.replace(/#([^\s"#']+)/g,(t,e)=>`#${CSS.escape(e)}`)),r),Tg=r=>r==null?`${r}`:Object.prototype.toString.call(r).match(/\s([a-z]+)/i)[1].toLowerCase(),bg=r=>{do r+=Math.floor(Math.random()*Sg);while(document.getElementById(r));return r},Ag=r=>{if(!r)return 0;let{transitionDuration:t,transitionDelay:e}=window.getComputedStyle(r);const n=Number.parseFloat(t),i=Number.parseFloat(e);return!n&&!i?0:(t=t.split(",")[0],e=e.split(",")[0],(Number.parseFloat(t)+Number.parseFloat(e))*Mg)},xp=r=>{r.dispatchEvent(new Event(pl))},si=r=>!r||typeof r!="object"?!1:(typeof r.jquery<"u"&&(r=r[0]),typeof r.nodeType<"u"),Pi=r=>si(r)?r.jquery?r[0]:r:typeof r=="string"&&r.length>0?document.querySelector(vp(r)):null,Ss=r=>{if(!si(r)||r.getClientRects().length===0)return!1;const t=getComputedStyle(r).getPropertyValue("visibility")==="visible",e=r.closest("details:not([open])");if(!e)return t;if(e!==r){const n=r.closest("summary");if(n&&n.parentNode!==e||n===null)return!1}return t},Li=r=>!r||r.nodeType!==Node.ELEMENT_NODE||r.classList.contains("disabled")?!0:typeof r.disabled<"u"?r.disabled:r.hasAttribute("disabled")&&r.getAttribute("disabled")!=="false",yp=r=>{if(!document.documentElement.attachShadow)return null;if(typeof r.getRootNode=="function"){const t=r.getRootNode();return t instanceof ShadowRoot?t:null}return r instanceof ShadowRoot?r:r.parentNode?yp(r.parentNode):null},va=()=>{},oo=r=>{r.offsetHeight},Ep=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,sc=[],wg=r=>{document.readyState==="loading"?(sc.length||document.addEventListener("DOMContentLoaded",()=>{for(const t of sc)t()}),sc.push(r)):r()},Tn=()=>document.documentElement.dir==="rtl",An=r=>{wg(()=>{const t=Ep();if(t){const e=r.NAME,n=t.fn[e];t.fn[e]=r.jQueryInterface,t.fn[e].Constructor=r,t.fn[e].noConflict=()=>(t.fn[e]=n,r.jQueryInterface)}})},$e=(r,t=[],e=r)=>typeof r=="function"?r.call(...t):e,Sp=(r,t,e=!0)=>{if(!e){$e(r);return}const n=5,i=Ag(t)+n;let s=!1;const o=({target:a})=>{a===t&&(s=!0,t.removeEventListener(pl,o),$e(r))};t.addEventListener(pl,o),setTimeout(()=>{s||xp(t)},i)},Ou=(r,t,e,n)=>{const i=r.length;let s=r.indexOf(t);return s===-1?!e&&n?r[i-1]:r[0]:(s+=e?1:-1,n&&(s=(s+i)%i),r[Math.max(0,Math.min(s,i-1))])},Cg=/[^.]*(?=\..*)\.|.*/,Rg=/\..*/,Pg=/::\d+$/,oc={};let Xh=1;const Mp={mouseenter:"mouseover",mouseleave:"mouseout"},Lg=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function Tp(r,t){return t&&`${t}::${Xh++}`||r.uidEvent||Xh++}function bp(r){const t=Tp(r);return r.uidEvent=t,oc[t]=oc[t]||{},oc[t]}function Dg(r,t){return function e(n){return Uu(n,{delegateTarget:r}),e.oneOff&&Q.off(r,n.type,t),t.apply(r,[n])}}function Ig(r,t,e){return function n(i){const s=r.querySelectorAll(t);for(let{target:o}=i;o&&o!==this;o=o.parentNode)for(const a of s)if(a===o)return Uu(i,{delegateTarget:o}),n.oneOff&&Q.off(r,i.type,t,e),e.apply(o,[i])}}function Ap(r,t,e=null){return Object.values(r).find(n=>n.callable===t&&n.delegationSelector===e)}function wp(r,t,e){const n=typeof t=="string",i=n?e:t||e;let s=Cp(r);return Lg.has(s)||(s=r),[n,i,s]}function $h(r,t,e,n,i){if(typeof t!="string"||!r)return;let[s,o,a]=wp(t,e,n);t in Mp&&(o=(g=>function(_){if(!_.relatedTarget||_.relatedTarget!==_.delegateTarget&&!_.delegateTarget.contains(_.relatedTarget))return g.call(this,_)})(o));const c=bp(r),l=c[a]||(c[a]={}),u=Ap(l,o,s?e:null);if(u){u.oneOff=u.oneOff&&i;return}const h=Tp(o,t.replace(Cg,"")),f=s?Ig(r,e,o):Dg(r,o);f.delegationSelector=s?e:null,f.callable=o,f.oneOff=i,f.uidEvent=h,l[h]=f,r.addEventListener(a,f,s)}function ml(r,t,e,n,i){const s=Ap(t[e],n,i);s&&(r.removeEventListener(e,s,!!i),delete t[e][s.uidEvent])}function Ng(r,t,e,n){const i=t[e]||{};for(const[s,o]of Object.entries(i))s.includes(n)&&ml(r,t,e,o.callable,o.delegationSelector)}function Cp(r){return r=r.replace(Rg,""),Mp[r]||r}const Q={on(r,t,e,n){$h(r,t,e,n,!1)},one(r,t,e,n){$h(r,t,e,n,!0)},off(r,t,e,n){if(typeof t!="string"||!r)return;const[i,s,o]=wp(t,e,n),a=o!==t,c=bp(r),l=c[o]||{},u=t.startsWith(".");if(typeof s<"u"){if(!Object.keys(l).length)return;ml(r,c,o,s,i?e:null);return}if(u)for(const h of Object.keys(c))Ng(r,c,h,t.slice(1));for(const[h,f]of Object.entries(l)){const d=h.replace(Pg,"");(!a||t.includes(d))&&ml(r,c,o,f.callable,f.delegationSelector)}},trigger(r,t,e){if(typeof t!="string"||!r)return null;const n=Ep(),i=Cp(t),s=t!==i;let o=null,a=!0,c=!0,l=!1;s&&n&&(o=n.Event(t,e),n(r).trigger(o),a=!o.isPropagationStopped(),c=!o.isImmediatePropagationStopped(),l=o.isDefaultPrevented());const u=Uu(new Event(t,{bubbles:a,cancelable:!0}),e);return l&&u.preventDefault(),c&&r.dispatchEvent(u),u.defaultPrevented&&o&&o.preventDefault(),u}};function Uu(r,t={}){for(const[e,n]of Object.entries(t))try{r[e]=n}catch{Object.defineProperty(r,e,{configurable:!0,get(){return n}})}return r}function Yh(r){if(r==="true")return!0;if(r==="false")return!1;if(r===Number(r).toString())return Number(r);if(r===""||r==="null")return null;if(typeof r!="string")return r;try{return JSON.parse(decodeURIComponent(r))}catch{return r}}function ac(r){return r.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}const oi={setDataAttribute(r,t,e){r.setAttribute(`data-bs-${ac(t)}`,e)},removeDataAttribute(r,t){r.removeAttribute(`data-bs-${ac(t)}`)},getDataAttributes(r){if(!r)return{};const t={},e=Object.keys(r.dataset).filter(n=>n.startsWith("bs")&&!n.startsWith("bsConfig"));for(const n of e){let i=n.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1),t[i]=Yh(r.dataset[n])}return t},getDataAttribute(r,t){return Yh(r.getAttribute(`data-bs-${ac(t)}`))}};class ao{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(t){return t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t}_mergeConfigObj(t,e){const n=si(e)?oi.getDataAttribute(e,"config"):{};return{...this.constructor.Default,...typeof n=="object"?n:{},...si(e)?oi.getDataAttributes(e):{},...typeof t=="object"?t:{}}}_typeCheckConfig(t,e=this.constructor.DefaultType){for(const[n,i]of Object.entries(e)){const s=t[n],o=si(s)?"element":Tg(s);if(!new RegExp(i).test(o))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`)}}}const Og="5.3.8";class Nn extends ao{constructor(t,e){super(),t=Pi(t),t&&(this._element=t,this._config=this._getConfig(e),rc.set(this._element,this.constructor.DATA_KEY,this))}dispose(){rc.remove(this._element,this.constructor.DATA_KEY),Q.off(this._element,this.constructor.EVENT_KEY);for(const t of Object.getOwnPropertyNames(this))this[t]=null}_queueCallback(t,e,n=!0){Sp(t,e,n)}_getConfig(t){return t=this._mergeConfigObj(t,this._element),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}static getInstance(t){return rc.get(Pi(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,typeof e=="object"?e:null)}static get VERSION(){return Og}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(t){return`${t}${this.EVENT_KEY}`}}const cc=r=>{let t=r.getAttribute("data-bs-target");if(!t||t==="#"){let e=r.getAttribute("href");if(!e||!e.includes("#")&&!e.startsWith("."))return null;e.includes("#")&&!e.startsWith("#")&&(e=`#${e.split("#")[1]}`),t=e&&e!=="#"?e.trim():null}return t?t.split(",").map(e=>vp(e)).join(","):null},Tt={find(r,t=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(t,r))},findOne(r,t=document.documentElement){return Element.prototype.querySelector.call(t,r)},children(r,t){return[].concat(...r.children).filter(e=>e.matches(t))},parents(r,t){const e=[];let n=r.parentNode.closest(t);for(;n;)e.push(n),n=n.parentNode.closest(t);return e},prev(r,t){let e=r.previousElementSibling;for(;e;){if(e.matches(t))return[e];e=e.previousElementSibling}return[]},next(r,t){let e=r.nextElementSibling;for(;e;){if(e.matches(t))return[e];e=e.nextElementSibling}return[]},focusableChildren(r){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(e=>`${e}:not([tabindex^="-"])`).join(",");return this.find(t,r).filter(e=>!Li(e)&&Ss(e))},getSelectorFromElement(r){const t=cc(r);return t&&Tt.findOne(t)?t:null},getElementFromSelector(r){const t=cc(r);return t?Tt.findOne(t):null},getMultipleElementsFromSelector(r){const t=cc(r);return t?Tt.find(t):[]}},ka=(r,t="hide")=>{const e=`click.dismiss${r.EVENT_KEY}`,n=r.NAME;Q.on(document,e,`[data-bs-dismiss="${n}"]`,function(i){if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),Li(this))return;const s=Tt.getElementFromSelector(this)||this.closest(`.${n}`);r.getOrCreateInstance(s)[t]()})},Ug="alert",Fg="bs.alert",Rp=`.${Fg}`,Bg=`close${Rp}`,zg=`closed${Rp}`,kg="fade",Vg="show";class Va extends Nn{static get NAME(){return Ug}close(){if(Q.trigger(this._element,Bg).defaultPrevented)return;this._element.classList.remove(Vg);const e=this._element.classList.contains(kg);this._queueCallback(()=>this._destroyElement(),this._element,e)}_destroyElement(){this._element.remove(),Q.trigger(this._element,zg),this.dispose()}static jQueryInterface(t){return this.each(function(){const e=Va.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}ka(Va,"close");An(Va);const Hg="button",Gg="bs.button",Wg=`.${Gg}`,Xg=".data-api",$g="active",qh='[data-bs-toggle="button"]',Yg=`click${Wg}${Xg}`;class Ha extends Nn{static get NAME(){return Hg}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle($g))}static jQueryInterface(t){return this.each(function(){const e=Ha.getOrCreateInstance(this);t==="toggle"&&e[t]()})}}Q.on(document,Yg,qh,r=>{r.preventDefault();const t=r.target.closest(qh);Ha.getOrCreateInstance(t).toggle()});An(Ha);const qg="swipe",Ms=".bs.swipe",Kg=`touchstart${Ms}`,jg=`touchmove${Ms}`,Jg=`touchend${Ms}`,Zg=`pointerdown${Ms}`,Qg=`pointerup${Ms}`,tv="touch",ev="pen",nv="pointer-event",iv=40,rv={endCallback:null,leftCallback:null,rightCallback:null},sv={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class xa extends ao{constructor(t,e){super(),this._element=t,!(!t||!xa.isSupported())&&(this._config=this._getConfig(e),this._deltaX=0,this._supportPointerEvents=!!window.PointerEvent,this._initEvents())}static get Default(){return rv}static get DefaultType(){return sv}static get NAME(){return qg}dispose(){Q.off(this._element,Ms)}_start(t){if(!this._supportPointerEvents){this._deltaX=t.touches[0].clientX;return}this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX)}_end(t){this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX-this._deltaX),this._handleSwipe(),$e(this._config.endCallback)}_move(t){this._deltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this._deltaX}_handleSwipe(){const t=Math.abs(this._deltaX);if(t<=iv)return;const e=t/this._deltaX;this._deltaX=0,e&&$e(e>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(Q.on(this._element,Zg,t=>this._start(t)),Q.on(this._element,Qg,t=>this._end(t)),this._element.classList.add(nv)):(Q.on(this._element,Kg,t=>this._start(t)),Q.on(this._element,jg,t=>this._move(t)),Q.on(this._element,Jg,t=>this._end(t)))}_eventIsPointerPenTouch(t){return this._supportPointerEvents&&(t.pointerType===ev||t.pointerType===tv)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const ov="carousel",av="bs.carousel",zi=`.${av}`,Pp=".data-api",cv="ArrowLeft",lv="ArrowRight",uv=500,ws="next",br="prev",Gr="left",ra="right",hv=`slide${zi}`,lc=`slid${zi}`,fv=`keydown${zi}`,dv=`mouseenter${zi}`,pv=`mouseleave${zi}`,mv=`dragstart${zi}`,_v=`load${zi}${Pp}`,gv=`click${zi}${Pp}`,Lp="carousel",Eo="active",vv="slide",xv="carousel-item-end",yv="carousel-item-start",Ev="carousel-item-next",Sv="carousel-item-prev",Dp=".active",Ip=".carousel-item",Mv=Dp+Ip,Tv=".carousel-item img",bv=".carousel-indicators",Av="[data-bs-slide], [data-bs-slide-to]",wv='[data-bs-ride="carousel"]',Cv={[cv]:ra,[lv]:Gr},Rv={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},Pv={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class co extends Nn{constructor(t,e){super(t,e),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=Tt.findOne(bv,this._element),this._addEventListeners(),this._config.ride===Lp&&this.cycle()}static get Default(){return Rv}static get DefaultType(){return Pv}static get NAME(){return ov}next(){this._slide(ws)}nextWhenVisible(){!document.hidden&&Ss(this._element)&&this.next()}prev(){this._slide(br)}pause(){this._isSliding&&xp(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval(()=>this.nextWhenVisible(),this._config.interval)}_maybeEnableCycle(){if(this._config.ride){if(this._isSliding){Q.one(this._element,lc,()=>this.cycle());return}this.cycle()}}to(t){const e=this._getItems();if(t>e.length-1||t<0)return;if(this._isSliding){Q.one(this._element,lc,()=>this.to(t));return}const n=this._getItemIndex(this._getActive());if(n===t)return;const i=t>n?ws:br;this._slide(i,e[t])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(t){return t.defaultInterval=t.interval,t}_addEventListeners(){this._config.keyboard&&Q.on(this._element,fv,t=>this._keydown(t)),this._config.pause==="hover"&&(Q.on(this._element,dv,()=>this.pause()),Q.on(this._element,pv,()=>this._maybeEnableCycle())),this._config.touch&&xa.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const n of Tt.find(Tv,this._element))Q.on(n,mv,i=>i.preventDefault());const e={leftCallback:()=>this._slide(this._directionToOrder(Gr)),rightCallback:()=>this._slide(this._directionToOrder(ra)),endCallback:()=>{this._config.pause==="hover"&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>this._maybeEnableCycle(),uv+this._config.interval))}};this._swipeHelper=new xa(this._element,e)}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=Cv[t.key];e&&(t.preventDefault(),this._slide(this._directionToOrder(e)))}_getItemIndex(t){return this._getItems().indexOf(t)}_setActiveIndicatorElement(t){if(!this._indicatorsElement)return;const e=Tt.findOne(Dp,this._indicatorsElement);e.classList.remove(Eo),e.removeAttribute("aria-current");const n=Tt.findOne(`[data-bs-slide-to="${t}"]`,this._indicatorsElement);n&&(n.classList.add(Eo),n.setAttribute("aria-current","true"))}_updateInterval(){const t=this._activeElement||this._getActive();if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);this._config.interval=e||this._config.defaultInterval}_slide(t,e=null){if(this._isSliding)return;const n=this._getActive(),i=t===ws,s=e||Ou(this._getItems(),n,i,this._config.wrap);if(s===n)return;const o=this._getItemIndex(s),a=d=>Q.trigger(this._element,d,{relatedTarget:s,direction:this._orderToDirection(t),from:this._getItemIndex(n),to:o});if(a(hv).defaultPrevented||!n||!s)return;const l=!!this._interval;this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(o),this._activeElement=s;const u=i?yv:xv,h=i?Ev:Sv;s.classList.add(h),oo(s),n.classList.add(u),s.classList.add(u);const f=()=>{s.classList.remove(u,h),s.classList.add(Eo),n.classList.remove(Eo,h,u),this._isSliding=!1,a(lc)};this._queueCallback(f,n,this._isAnimated()),l&&this.cycle()}_isAnimated(){return this._element.classList.contains(vv)}_getActive(){return Tt.findOne(Mv,this._element)}_getItems(){return Tt.find(Ip,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(t){return Tn()?t===Gr?br:ws:t===Gr?ws:br}_orderToDirection(t){return Tn()?t===br?Gr:ra:t===br?ra:Gr}static jQueryInterface(t){return this.each(function(){const e=co.getOrCreateInstance(this,t);if(typeof t=="number"){e.to(t);return}if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}Q.on(document,gv,Av,function(r){const t=Tt.getElementFromSelector(this);if(!t||!t.classList.contains(Lp))return;r.preventDefault();const e=co.getOrCreateInstance(t),n=this.getAttribute("data-bs-slide-to");if(n){e.to(n),e._maybeEnableCycle();return}if(oi.getDataAttribute(this,"slide")==="next"){e.next(),e._maybeEnableCycle();return}e.prev(),e._maybeEnableCycle()});Q.on(window,_v,()=>{const r=Tt.find(wv);for(const t of r)co.getOrCreateInstance(t)});An(co);const Lv="collapse",Dv="bs.collapse",lo=`.${Dv}`,Iv=".data-api",Nv=`show${lo}`,Ov=`shown${lo}`,Uv=`hide${lo}`,Fv=`hidden${lo}`,Bv=`click${lo}${Iv}`,uc="show",Xr="collapse",So="collapsing",zv="collapsed",kv=`:scope .${Xr} .${Xr}`,Vv="collapse-horizontal",Hv="width",Gv="height",Wv=".collapse.show, .collapse.collapsing",_l='[data-bs-toggle="collapse"]',Xv={parent:null,toggle:!0},$v={parent:"(null|element)",toggle:"boolean"};class Ks extends Nn{constructor(t,e){super(t,e),this._isTransitioning=!1,this._triggerArray=[];const n=Tt.find(_l);for(const i of n){const s=Tt.getSelectorFromElement(i),o=Tt.find(s).filter(a=>a===this._element);s!==null&&o.length&&this._triggerArray.push(i)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return Xv}static get DefaultType(){return $v}static get NAME(){return Lv}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t=[];if(this._config.parent&&(t=this._getFirstLevelChildren(Wv).filter(a=>a!==this._element).map(a=>Ks.getOrCreateInstance(a,{toggle:!1}))),t.length&&t[0]._isTransitioning||Q.trigger(this._element,Nv).defaultPrevented)return;for(const a of t)a.hide();const n=this._getDimension();this._element.classList.remove(Xr),this._element.classList.add(So),this._element.style[n]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const i=()=>{this._isTransitioning=!1,this._element.classList.remove(So),this._element.classList.add(Xr,uc),this._element.style[n]="",Q.trigger(this._element,Ov)},o=`scroll${n[0].toUpperCase()+n.slice(1)}`;this._queueCallback(i,this._element,!0),this._element.style[n]=`${this._element[o]}px`}hide(){if(this._isTransitioning||!this._isShown()||Q.trigger(this._element,Uv).defaultPrevented)return;const e=this._getDimension();this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,oo(this._element),this._element.classList.add(So),this._element.classList.remove(Xr,uc);for(const i of this._triggerArray){const s=Tt.getElementFromSelector(i);s&&!this._isShown(s)&&this._addAriaAndCollapsedClass([i],!1)}this._isTransitioning=!0;const n=()=>{this._isTransitioning=!1,this._element.classList.remove(So),this._element.classList.add(Xr),Q.trigger(this._element,Fv)};this._element.style[e]="",this._queueCallback(n,this._element,!0)}_isShown(t=this._element){return t.classList.contains(uc)}_configAfterMerge(t){return t.toggle=!!t.toggle,t.parent=Pi(t.parent),t}_getDimension(){return this._element.classList.contains(Vv)?Hv:Gv}_initializeChildren(){if(!this._config.parent)return;const t=this._getFirstLevelChildren(_l);for(const e of t){const n=Tt.getElementFromSelector(e);n&&this._addAriaAndCollapsedClass([e],this._isShown(n))}}_getFirstLevelChildren(t){const e=Tt.find(kv,this._config.parent);return Tt.find(t,this._config.parent).filter(n=>!e.includes(n))}_addAriaAndCollapsedClass(t,e){if(t.length)for(const n of t)n.classList.toggle(zv,!e),n.setAttribute("aria-expanded",e)}static jQueryInterface(t){const e={};return typeof t=="string"&&/show|hide/.test(t)&&(e.toggle=!1),this.each(function(){const n=Ks.getOrCreateInstance(this,e);if(typeof t=="string"){if(typeof n[t]>"u")throw new TypeError(`No method named "${t}"`);n[t]()}})}}Q.on(document,Bv,_l,function(r){(r.target.tagName==="A"||r.delegateTarget&&r.delegateTarget.tagName==="A")&&r.preventDefault();for(const t of Tt.getMultipleElementsFromSelector(this))Ks.getOrCreateInstance(t,{toggle:!1}).toggle()});An(Ks);const Kh="dropdown",Yv="bs.dropdown",yr=`.${Yv}`,Fu=".data-api",qv="Escape",jh="Tab",Kv="ArrowUp",Jh="ArrowDown",jv=2,Jv=`hide${yr}`,Zv=`hidden${yr}`,Qv=`show${yr}`,t0=`shown${yr}`,Np=`click${yr}${Fu}`,Op=`keydown${yr}${Fu}`,e0=`keyup${yr}${Fu}`,Wr="show",n0="dropup",i0="dropend",r0="dropstart",s0="dropup-center",o0="dropdown-center",ir='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',a0=`${ir}.${Wr}`,sa=".dropdown-menu",c0=".navbar",l0=".navbar-nav",u0=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",h0=Tn()?"top-end":"top-start",f0=Tn()?"top-start":"top-end",d0=Tn()?"bottom-end":"bottom-start",p0=Tn()?"bottom-start":"bottom-end",m0=Tn()?"left-start":"right-start",_0=Tn()?"right-start":"left-start",g0="top",v0="bottom",x0={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},y0={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class kn extends Nn{constructor(t,e){super(t,e),this._popper=null,this._parent=this._element.parentNode,this._menu=Tt.next(this._element,sa)[0]||Tt.prev(this._element,sa)[0]||Tt.findOne(sa,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return x0}static get DefaultType(){return y0}static get NAME(){return Kh}toggle(){return this._isShown()?this.hide():this.show()}show(){if(Li(this._element)||this._isShown())return;const t={relatedTarget:this._element};if(!Q.trigger(this._element,Qv,t).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(l0))for(const n of[].concat(...document.body.children))Q.on(n,"mouseover",va);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(Wr),this._element.classList.add(Wr),Q.trigger(this._element,t0,t)}}hide(){if(Li(this._element)||!this._isShown())return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(t){if(!Q.trigger(this._element,Jv,t).defaultPrevented){if("ontouchstart"in document.documentElement)for(const n of[].concat(...document.body.children))Q.off(n,"mouseover",va);this._popper&&this._popper.destroy(),this._menu.classList.remove(Wr),this._element.classList.remove(Wr),this._element.setAttribute("aria-expanded","false"),oi.removeDataAttribute(this._menu,"popper"),Q.trigger(this._element,Zv,t)}}_getConfig(t){if(t=super._getConfig(t),typeof t.reference=="object"&&!si(t.reference)&&typeof t.reference.getBoundingClientRect!="function")throw new TypeError(`${Kh.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return t}_createPopper(){if(typeof gp>"u")throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");let t=this._element;this._config.reference==="parent"?t=this._parent:si(this._config.reference)?t=Pi(this._config.reference):typeof this._config.reference=="object"&&(t=this._config.reference);const e=this._getPopperConfig();this._popper=Nu(t,this._menu,e)}_isShown(){return this._menu.classList.contains(Wr)}_getPlacement(){const t=this._parent;if(t.classList.contains(i0))return m0;if(t.classList.contains(r0))return _0;if(t.classList.contains(s0))return g0;if(t.classList.contains(o0))return v0;const e=getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()==="end";return t.classList.contains(n0)?e?f0:h0:e?p0:d0}_detectNavbar(){return this._element.closest(c0)!==null}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||this._config.display==="static")&&(oi.setDataAttribute(this._menu,"popper","static"),t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,...$e(this._config.popperConfig,[void 0,t])}}_selectMenuItem({key:t,target:e}){const n=Tt.find(u0,this._menu).filter(i=>Ss(i));n.length&&Ou(n,e,t===Jh,!n.includes(e)).focus()}static jQueryInterface(t){return this.each(function(){const e=kn.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}static clearMenus(t){if(t.button===jv||t.type==="keyup"&&t.key!==jh)return;const e=Tt.find(a0);for(const n of e){const i=kn.getInstance(n);if(!i||i._config.autoClose===!1)continue;const s=t.composedPath(),o=s.includes(i._menu);if(s.includes(i._element)||i._config.autoClose==="inside"&&!o||i._config.autoClose==="outside"&&o||i._menu.contains(t.target)&&(t.type==="keyup"&&t.key===jh||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;const a={relatedTarget:i._element};t.type==="click"&&(a.clickEvent=t),i._completeHide(a)}}static dataApiKeydownHandler(t){const e=/input|textarea/i.test(t.target.tagName),n=t.key===qv,i=[Kv,Jh].includes(t.key);if(!i&&!n||e&&!n)return;t.preventDefault();const s=this.matches(ir)?this:Tt.prev(this,ir)[0]||Tt.next(this,ir)[0]||Tt.findOne(ir,t.delegateTarget.parentNode),o=kn.getOrCreateInstance(s);if(i){t.stopPropagation(),o.show(),o._selectMenuItem(t);return}o._isShown()&&(t.stopPropagation(),o.hide(),s.focus())}}Q.on(document,Op,ir,kn.dataApiKeydownHandler);Q.on(document,Op,sa,kn.dataApiKeydownHandler);Q.on(document,Np,kn.clearMenus);Q.on(document,e0,kn.clearMenus);Q.on(document,Np,ir,function(r){r.preventDefault(),kn.getOrCreateInstance(this).toggle()});An(kn);const Up="backdrop",E0="fade",Zh="show",Qh=`mousedown.bs.${Up}`,S0={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},M0={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class Fp extends ao{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null}static get Default(){return S0}static get DefaultType(){return M0}static get NAME(){return Up}show(t){if(!this._config.isVisible){$e(t);return}this._append();const e=this._getElement();this._config.isAnimated&&oo(e),e.classList.add(Zh),this._emulateAnimation(()=>{$e(t)})}hide(t){if(!this._config.isVisible){$e(t);return}this._getElement().classList.remove(Zh),this._emulateAnimation(()=>{this.dispose(),$e(t)})}dispose(){this._isAppended&&(Q.off(this._element,Qh),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add(E0),this._element=t}return this._element}_configAfterMerge(t){return t.rootElement=Pi(t.rootElement),t}_append(){if(this._isAppended)return;const t=this._getElement();this._config.rootElement.append(t),Q.on(t,Qh,()=>{$e(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(t){Sp(t,this._getElement(),this._config.isAnimated)}}const T0="focustrap",b0="bs.focustrap",ya=`.${b0}`,A0=`focusin${ya}`,w0=`keydown.tab${ya}`,C0="Tab",R0="forward",tf="backward",P0={autofocus:!0,trapElement:null},L0={autofocus:"boolean",trapElement:"element"};class Bp extends ao{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return P0}static get DefaultType(){return L0}static get NAME(){return T0}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),Q.off(document,ya),Q.on(document,A0,t=>this._handleFocusin(t)),Q.on(document,w0,t=>this._handleKeydown(t)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,Q.off(document,ya))}_handleFocusin(t){const{trapElement:e}=this._config;if(t.target===document||t.target===e||e.contains(t.target))return;const n=Tt.focusableChildren(e);n.length===0?e.focus():this._lastTabNavDirection===tf?n[n.length-1].focus():n[0].focus()}_handleKeydown(t){t.key===C0&&(this._lastTabNavDirection=t.shiftKey?tf:R0)}}const ef=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",nf=".sticky-top",Mo="padding-right",rf="margin-right";class gl{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,Mo,e=>e+t),this._setElementAttributes(ef,Mo,e=>e+t),this._setElementAttributes(nf,rf,e=>e-t)}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,Mo),this._resetElementAttributes(ef,Mo),this._resetElementAttributes(nf,rf)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,n){const i=this.getWidth(),s=o=>{if(o!==this._element&&window.innerWidth>o.clientWidth+i)return;this._saveInitialAttribute(o,e);const a=window.getComputedStyle(o).getPropertyValue(e);o.style.setProperty(e,`${n(Number.parseFloat(a))}px`)};this._applyManipulationCallback(t,s)}_saveInitialAttribute(t,e){const n=t.style.getPropertyValue(e);n&&oi.setDataAttribute(t,e,n)}_resetElementAttributes(t,e){const n=i=>{const s=oi.getDataAttribute(i,e);if(s===null){i.style.removeProperty(e);return}oi.removeDataAttribute(i,e),i.style.setProperty(e,s)};this._applyManipulationCallback(t,n)}_applyManipulationCallback(t,e){if(si(t)){e(t);return}for(const n of Tt.find(t,this._element))e(n)}}const D0="modal",I0="bs.modal",bn=`.${I0}`,N0=".data-api",O0="Escape",U0=`hide${bn}`,F0=`hidePrevented${bn}`,zp=`hidden${bn}`,kp=`show${bn}`,B0=`shown${bn}`,z0=`resize${bn}`,k0=`click.dismiss${bn}`,V0=`mousedown.dismiss${bn}`,H0=`keydown.dismiss${bn}`,G0=`click${bn}${N0}`,sf="modal-open",W0="fade",of="show",hc="modal-static",X0=".modal.show",$0=".modal-dialog",Y0=".modal-body",q0='[data-bs-toggle="modal"]',K0={backdrop:!0,focus:!0,keyboard:!0},j0={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class as extends Nn{constructor(t,e){super(t,e),this._dialog=Tt.findOne($0,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new gl,this._addEventListeners()}static get Default(){return K0}static get DefaultType(){return j0}static get NAME(){return D0}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||Q.trigger(this._element,kp,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(sf),this._adjustDialog(),this._backdrop.show(()=>this._showElement(t)))}hide(){!this._isShown||this._isTransitioning||Q.trigger(this._element,U0).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(of),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated()))}dispose(){Q.off(window,bn),Q.off(this._dialog,bn),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new Fp({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new Bp({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const e=Tt.findOne(Y0,this._dialog);e&&(e.scrollTop=0),oo(this._element),this._element.classList.add(of);const n=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,Q.trigger(this._element,B0,{relatedTarget:t})};this._queueCallback(n,this._dialog,this._isAnimated())}_addEventListeners(){Q.on(this._element,H0,t=>{if(t.key===O0){if(this._config.keyboard){this.hide();return}this._triggerBackdropTransition()}}),Q.on(window,z0,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),Q.on(this._element,V0,t=>{Q.one(this._element,k0,e=>{if(!(this._element!==t.target||this._element!==e.target)){if(this._config.backdrop==="static"){this._triggerBackdropTransition();return}this._config.backdrop&&this.hide()}})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(sf),this._resetAdjustments(),this._scrollBar.reset(),Q.trigger(this._element,zp)})}_isAnimated(){return this._element.classList.contains(W0)}_triggerBackdropTransition(){if(Q.trigger(this._element,F0).defaultPrevented)return;const e=this._element.scrollHeight>document.documentElement.clientHeight,n=this._element.style.overflowY;n==="hidden"||this._element.classList.contains(hc)||(e||(this._element.style.overflowY="hidden"),this._element.classList.add(hc),this._queueCallback(()=>{this._element.classList.remove(hc),this._queueCallback(()=>{this._element.style.overflowY=n},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),n=e>0;if(n&&!t){const i=Tn()?"paddingLeft":"paddingRight";this._element.style[i]=`${e}px`}if(!n&&t){const i=Tn()?"paddingRight":"paddingLeft";this._element.style[i]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each(function(){const n=as.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof n[t]>"u")throw new TypeError(`No method named "${t}"`);n[t](e)}})}}Q.on(document,G0,q0,function(r){const t=Tt.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&r.preventDefault(),Q.one(t,kp,i=>{i.defaultPrevented||Q.one(t,zp,()=>{Ss(this)&&this.focus()})});const e=Tt.findOne(X0);e&&as.getInstance(e).hide(),as.getOrCreateInstance(t).toggle(this)});ka(as);An(as);const J0="offcanvas",Z0="bs.offcanvas",hi=`.${Z0}`,Vp=".data-api",Q0=`load${hi}${Vp}`,tx="Escape",af="show",cf="showing",lf="hiding",ex="offcanvas-backdrop",Hp=".offcanvas.show",nx=`show${hi}`,ix=`shown${hi}`,rx=`hide${hi}`,uf=`hidePrevented${hi}`,Gp=`hidden${hi}`,sx=`resize${hi}`,ox=`click${hi}${Vp}`,ax=`keydown.dismiss${hi}`,cx='[data-bs-toggle="offcanvas"]',lx={backdrop:!0,keyboard:!0,scroll:!1},ux={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class Di extends Nn{constructor(t,e){super(t,e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return lx}static get DefaultType(){return ux}static get NAME(){return J0}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){if(this._isShown||Q.trigger(this._element,nx,{relatedTarget:t}).defaultPrevented)return;this._isShown=!0,this._backdrop.show(),this._config.scroll||new gl().hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(cf);const n=()=>{(!this._config.scroll||this._config.backdrop)&&this._focustrap.activate(),this._element.classList.add(af),this._element.classList.remove(cf),Q.trigger(this._element,ix,{relatedTarget:t})};this._queueCallback(n,this._element,!0)}hide(){if(!this._isShown||Q.trigger(this._element,rx).defaultPrevented)return;this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(lf),this._backdrop.hide();const e=()=>{this._element.classList.remove(af,lf),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||new gl().reset(),Q.trigger(this._element,Gp)};this._queueCallback(e,this._element,!0)}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const t=()=>{if(this._config.backdrop==="static"){Q.trigger(this._element,uf);return}this.hide()},e=!!this._config.backdrop;return new Fp({className:ex,isVisible:e,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:e?t:null})}_initializeFocusTrap(){return new Bp({trapElement:this._element})}_addEventListeners(){Q.on(this._element,ax,t=>{if(t.key===tx){if(this._config.keyboard){this.hide();return}Q.trigger(this._element,uf)}})}static jQueryInterface(t){return this.each(function(){const e=Di.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}Q.on(document,ox,cx,function(r){const t=Tt.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&r.preventDefault(),Li(this))return;Q.one(t,Gp,()=>{Ss(this)&&this.focus()});const e=Tt.findOne(Hp);e&&e!==t&&Di.getInstance(e).hide(),Di.getOrCreateInstance(t).toggle(this)});Q.on(window,Q0,()=>{for(const r of Tt.find(Hp))Di.getOrCreateInstance(r).show()});Q.on(window,sx,()=>{for(const r of Tt.find("[aria-modal][class*=show][class*=offcanvas-]"))getComputedStyle(r).position!=="fixed"&&Di.getOrCreateInstance(r).hide()});ka(Di);An(Di);const hx=/^aria-[\w-]*$/i,Wp={"*":["class","dir","id","lang","role",hx],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},fx=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),dx=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,px=(r,t)=>{const e=r.nodeName.toLowerCase();return t.includes(e)?fx.has(e)?!!dx.test(r.nodeValue):!0:t.filter(n=>n instanceof RegExp).some(n=>n.test(e))};function mx(r,t,e){if(!r.length)return r;if(e&&typeof e=="function")return e(r);const i=new window.DOMParser().parseFromString(r,"text/html"),s=[].concat(...i.body.querySelectorAll("*"));for(const o of s){const a=o.nodeName.toLowerCase();if(!Object.keys(t).includes(a)){o.remove();continue}const c=[].concat(...o.attributes),l=[].concat(t["*"]||[],t[a]||[]);for(const u of c)px(u,l)||o.removeAttribute(u.nodeName)}return i.body.innerHTML}const _x="TemplateFactory",gx={allowList:Wp,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},vx={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},xx={entry:"(string|element|function|null)",selector:"(string|element)"};class yx extends ao{constructor(t){super(),this._config=this._getConfig(t)}static get Default(){return gx}static get DefaultType(){return vx}static get NAME(){return _x}getContent(){return Object.values(this._config.content).map(t=>this._resolvePossibleFunction(t)).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(t){return this._checkContent(t),this._config.content={...this._config.content,...t},this}toHtml(){const t=document.createElement("div");t.innerHTML=this._maybeSanitize(this._config.template);for(const[i,s]of Object.entries(this._config.content))this._setContent(t,s,i);const e=t.children[0],n=this._resolvePossibleFunction(this._config.extraClass);return n&&e.classList.add(...n.split(" ")),e}_typeCheckConfig(t){super._typeCheckConfig(t),this._checkContent(t.content)}_checkContent(t){for(const[e,n]of Object.entries(t))super._typeCheckConfig({selector:e,entry:n},xx)}_setContent(t,e,n){const i=Tt.findOne(n,t);if(i){if(e=this._resolvePossibleFunction(e),!e){i.remove();return}if(si(e)){this._putElementInTemplate(Pi(e),i);return}if(this._config.html){i.innerHTML=this._maybeSanitize(e);return}i.textContent=e}}_maybeSanitize(t){return this._config.sanitize?mx(t,this._config.allowList,this._config.sanitizeFn):t}_resolvePossibleFunction(t){return $e(t,[void 0,this])}_putElementInTemplate(t,e){if(this._config.html){e.innerHTML="",e.append(t);return}e.textContent=t.textContent}}const Ex="tooltip",Sx=new Set(["sanitize","allowList","sanitizeFn"]),fc="fade",Mx="modal",To="show",Tx=".tooltip-inner",hf=`.${Mx}`,ff="hide.bs.modal",Cs="hover",dc="focus",pc="click",bx="manual",Ax="hide",wx="hidden",Cx="show",Rx="shown",Px="inserted",Lx="click",Dx="focusin",Ix="focusout",Nx="mouseenter",Ox="mouseleave",Ux={AUTO:"auto",TOP:"top",RIGHT:Tn()?"left":"right",BOTTOM:"bottom",LEFT:Tn()?"right":"left"},Fx={allowList:Wp,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},Bx={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class Ts extends Nn{constructor(t,e){if(typeof gp>"u")throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");super(t,e),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return Fx}static get DefaultType(){return Bx}static get NAME(){return Ex}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){if(this._isEnabled){if(this._isShown()){this._leave();return}this._enter()}}dispose(){clearTimeout(this._timeout),Q.off(this._element.closest(hf),ff,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if(this._element.style.display==="none")throw new Error("Please use show on visible elements");if(!(this._isWithContent()&&this._isEnabled))return;const t=Q.trigger(this._element,this.constructor.eventName(Cx)),n=(yp(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(t.defaultPrevented||!n)return;this._disposePopper();const i=this._getTipElement();this._element.setAttribute("aria-describedby",i.getAttribute("id"));const{container:s}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(s.append(i),Q.trigger(this._element,this.constructor.eventName(Px))),this._popper=this._createPopper(i),i.classList.add(To),"ontouchstart"in document.documentElement)for(const a of[].concat(...document.body.children))Q.on(a,"mouseover",va);const o=()=>{Q.trigger(this._element,this.constructor.eventName(Rx)),this._isHovered===!1&&this._leave(),this._isHovered=!1};this._queueCallback(o,this.tip,this._isAnimated())}hide(){if(!this._isShown()||Q.trigger(this._element,this.constructor.eventName(Ax)).defaultPrevented)return;if(this._getTipElement().classList.remove(To),"ontouchstart"in document.documentElement)for(const i of[].concat(...document.body.children))Q.off(i,"mouseover",va);this._activeTrigger[pc]=!1,this._activeTrigger[dc]=!1,this._activeTrigger[Cs]=!1,this._isHovered=null;const n=()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),Q.trigger(this._element,this.constructor.eventName(wx)))};this._queueCallback(n,this.tip,this._isAnimated())}update(){this._popper&&this._popper.update()}_isWithContent(){return!!this._getTitle()}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(t){const e=this._getTemplateFactory(t).toHtml();if(!e)return null;e.classList.remove(fc,To),e.classList.add(`bs-${this.constructor.NAME}-auto`);const n=bg(this.constructor.NAME).toString();return e.setAttribute("id",n),this._isAnimated()&&e.classList.add(fc),e}setContent(t){this._newContent=t,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(t){return this._templateFactory?this._templateFactory.changeContent(t):this._templateFactory=new yx({...this._config,content:t,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{[Tx]:this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(t){return this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(fc)}_isShown(){return this.tip&&this.tip.classList.contains(To)}_createPopper(t){const e=$e(this._config.placement,[this,t,this._element]),n=Ux[e.toUpperCase()];return Nu(this._element,t,this._getPopperConfig(n))}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_resolvePossibleFunction(t){return $e(t,[this._element,this._element])}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:n=>{this._getTipElement().setAttribute("data-popper-placement",n.state.placement)}}]};return{...e,...$e(this._config.popperConfig,[void 0,e])}}_setListeners(){const t=this._config.trigger.split(" ");for(const e of t)if(e==="click")Q.on(this._element,this.constructor.eventName(Lx),this._config.selector,n=>{const i=this._initializeOnDelegatedTarget(n);i._activeTrigger[pc]=!(i._isShown()&&i._activeTrigger[pc]),i.toggle()});else if(e!==bx){const n=e===Cs?this.constructor.eventName(Nx):this.constructor.eventName(Dx),i=e===Cs?this.constructor.eventName(Ox):this.constructor.eventName(Ix);Q.on(this._element,n,this._config.selector,s=>{const o=this._initializeOnDelegatedTarget(s);o._activeTrigger[s.type==="focusin"?dc:Cs]=!0,o._enter()}),Q.on(this._element,i,this._config.selector,s=>{const o=this._initializeOnDelegatedTarget(s);o._activeTrigger[s.type==="focusout"?dc:Cs]=o._element.contains(s.relatedTarget),o._leave()})}this._hideModalHandler=()=>{this._element&&this.hide()},Q.on(this._element.closest(hf),ff,this._hideModalHandler)}_fixTitle(){const t=this._element.getAttribute("title");t&&(!this._element.getAttribute("aria-label")&&!this._element.textContent.trim()&&this._element.setAttribute("aria-label",t),this._element.setAttribute("data-bs-original-title",t),this._element.removeAttribute("title"))}_enter(){if(this._isShown()||this._isHovered){this._isHovered=!0;return}this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show)}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(t,e){clearTimeout(this._timeout),this._timeout=setTimeout(t,e)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(t){const e=oi.getDataAttributes(this._element);for(const n of Object.keys(e))Sx.has(n)&&delete e[n];return t={...e,...typeof t=="object"&&t?t:{}},t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t.container=t.container===!1?document.body:Pi(t.container),typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),typeof t.title=="number"&&(t.title=t.title.toString()),typeof t.content=="number"&&(t.content=t.content.toString()),t}_getDelegateConfig(){const t={};for(const[e,n]of Object.entries(this._config))this.constructor.Default[e]!==n&&(t[e]=n);return t.selector=!1,t.trigger="manual",t}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(t){return this.each(function(){const e=Ts.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}An(Ts);const zx="popover",kx=".popover-header",Vx=".popover-body",Hx={...Ts.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},Gx={...Ts.DefaultType,content:"(null|string|element|function)"};class Bu extends Ts{static get Default(){return Hx}static get DefaultType(){return Gx}static get NAME(){return zx}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[kx]:this._getTitle(),[Vx]:this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(t){return this.each(function(){const e=Bu.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}An(Bu);const Wx="scrollspy",Xx="bs.scrollspy",zu=`.${Xx}`,$x=".data-api",Yx=`activate${zu}`,df=`click${zu}`,qx=`load${zu}${$x}`,Kx="dropdown-item",Ar="active",jx='[data-bs-spy="scroll"]',mc="[href]",Jx=".nav, .list-group",pf=".nav-link",Zx=".nav-item",Qx=".list-group-item",ty=`${pf}, ${Zx} > ${pf}, ${Qx}`,ey=".dropdown",ny=".dropdown-toggle",iy={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},ry={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class Ga extends Nn{constructor(t,e){super(t,e),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement=getComputedStyle(this._element).overflowY==="visible"?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return iy}static get DefaultType(){return ry}static get NAME(){return Wx}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const t of this._observableSections.values())this._observer.observe(t)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(t){return t.target=Pi(t.target)||document.body,t.rootMargin=t.offset?`${t.offset}px 0px -30%`:t.rootMargin,typeof t.threshold=="string"&&(t.threshold=t.threshold.split(",").map(e=>Number.parseFloat(e))),t}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(Q.off(this._config.target,df),Q.on(this._config.target,df,mc,t=>{const e=this._observableSections.get(t.target.hash);if(e){t.preventDefault();const n=this._rootElement||window,i=e.offsetTop-this._element.offsetTop;if(n.scrollTo){n.scrollTo({top:i,behavior:"smooth"});return}n.scrollTop=i}}))}_getNewObserver(){const t={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver(e=>this._observerCallback(e),t)}_observerCallback(t){const e=o=>this._targetLinks.get(`#${o.target.id}`),n=o=>{this._previousScrollData.visibleEntryTop=o.target.offsetTop,this._process(e(o))},i=(this._rootElement||document.documentElement).scrollTop,s=i>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=i;for(const o of t){if(!o.isIntersecting){this._activeTarget=null,this._clearActiveClass(e(o));continue}const a=o.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(s&&a){if(n(o),!i)return;continue}!s&&!a&&n(o)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const t=Tt.find(mc,this._config.target);for(const e of t){if(!e.hash||Li(e))continue;const n=Tt.findOne(decodeURI(e.hash),this._element);Ss(n)&&(this._targetLinks.set(decodeURI(e.hash),e),this._observableSections.set(e.hash,n))}}_process(t){this._activeTarget!==t&&(this._clearActiveClass(this._config.target),this._activeTarget=t,t.classList.add(Ar),this._activateParents(t),Q.trigger(this._element,Yx,{relatedTarget:t}))}_activateParents(t){if(t.classList.contains(Kx)){Tt.findOne(ny,t.closest(ey)).classList.add(Ar);return}for(const e of Tt.parents(t,Jx))for(const n of Tt.prev(e,ty))n.classList.add(Ar)}_clearActiveClass(t){t.classList.remove(Ar);const e=Tt.find(`${mc}.${Ar}`,t);for(const n of e)n.classList.remove(Ar)}static jQueryInterface(t){return this.each(function(){const e=Ga.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}Q.on(window,qx,()=>{for(const r of Tt.find(jx))Ga.getOrCreateInstance(r)});An(Ga);const sy="tab",oy="bs.tab",Er=`.${oy}`,ay=`hide${Er}`,cy=`hidden${Er}`,ly=`show${Er}`,uy=`shown${Er}`,hy=`click${Er}`,fy=`keydown${Er}`,dy=`load${Er}`,py="ArrowLeft",mf="ArrowRight",my="ArrowUp",_f="ArrowDown",_c="Home",gf="End",rr="active",vf="fade",gc="show",_y="dropdown",Xp=".dropdown-toggle",gy=".dropdown-menu",vc=`:not(${Xp})`,vy='.list-group, .nav, [role="tablist"]',xy=".nav-item, .list-group-item",yy=`.nav-link${vc}, .list-group-item${vc}, [role="tab"]${vc}`,$p='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',xc=`${yy}, ${$p}`,Ey=`.${rr}[data-bs-toggle="tab"], .${rr}[data-bs-toggle="pill"], .${rr}[data-bs-toggle="list"]`;class cs extends Nn{constructor(t){super(t),this._parent=this._element.closest(vy),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),Q.on(this._element,fy,e=>this._keydown(e)))}static get NAME(){return sy}show(){const t=this._element;if(this._elemIsActive(t))return;const e=this._getActiveElem(),n=e?Q.trigger(e,ay,{relatedTarget:t}):null;Q.trigger(t,ly,{relatedTarget:e}).defaultPrevented||n&&n.defaultPrevented||(this._deactivate(e,t),this._activate(t,e))}_activate(t,e){if(!t)return;t.classList.add(rr),this._activate(Tt.getElementFromSelector(t));const n=()=>{if(t.getAttribute("role")!=="tab"){t.classList.add(gc);return}t.removeAttribute("tabindex"),t.setAttribute("aria-selected",!0),this._toggleDropDown(t,!0),Q.trigger(t,uy,{relatedTarget:e})};this._queueCallback(n,t,t.classList.contains(vf))}_deactivate(t,e){if(!t)return;t.classList.remove(rr),t.blur(),this._deactivate(Tt.getElementFromSelector(t));const n=()=>{if(t.getAttribute("role")!=="tab"){t.classList.remove(gc);return}t.setAttribute("aria-selected",!1),t.setAttribute("tabindex","-1"),this._toggleDropDown(t,!1),Q.trigger(t,cy,{relatedTarget:e})};this._queueCallback(n,t,t.classList.contains(vf))}_keydown(t){if(![py,mf,my,_f,_c,gf].includes(t.key))return;t.stopPropagation(),t.preventDefault();const e=this._getChildren().filter(i=>!Li(i));let n;if([_c,gf].includes(t.key))n=e[t.key===_c?0:e.length-1];else{const i=[mf,_f].includes(t.key);n=Ou(e,t.target,i,!0)}n&&(n.focus({preventScroll:!0}),cs.getOrCreateInstance(n).show())}_getChildren(){return Tt.find(xc,this._parent)}_getActiveElem(){return this._getChildren().find(t=>this._elemIsActive(t))||null}_setInitialAttributes(t,e){this._setAttributeIfNotExists(t,"role","tablist");for(const n of e)this._setInitialAttributesOnChild(n)}_setInitialAttributesOnChild(t){t=this._getInnerElement(t);const e=this._elemIsActive(t),n=this._getOuterElement(t);t.setAttribute("aria-selected",e),n!==t&&this._setAttributeIfNotExists(n,"role","presentation"),e||t.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(t,"role","tab"),this._setInitialAttributesOnTargetPanel(t)}_setInitialAttributesOnTargetPanel(t){const e=Tt.getElementFromSelector(t);e&&(this._setAttributeIfNotExists(e,"role","tabpanel"),t.id&&this._setAttributeIfNotExists(e,"aria-labelledby",`${t.id}`))}_toggleDropDown(t,e){const n=this._getOuterElement(t);if(!n.classList.contains(_y))return;const i=(s,o)=>{const a=Tt.findOne(s,n);a&&a.classList.toggle(o,e)};i(Xp,rr),i(gy,gc),n.setAttribute("aria-expanded",e)}_setAttributeIfNotExists(t,e,n){t.hasAttribute(e)||t.setAttribute(e,n)}_elemIsActive(t){return t.classList.contains(rr)}_getInnerElement(t){return t.matches(xc)?t:Tt.findOne(xc,t)}_getOuterElement(t){return t.closest(xy)||t}static jQueryInterface(t){return this.each(function(){const e=cs.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}Q.on(document,hy,$p,function(r){["A","AREA"].includes(this.tagName)&&r.preventDefault(),!Li(this)&&cs.getOrCreateInstance(this).show()});Q.on(window,dy,()=>{for(const r of Tt.find(Ey))cs.getOrCreateInstance(r)});An(cs);const Sy="toast",My="bs.toast",ki=`.${My}`,Ty=`mouseover${ki}`,by=`mouseout${ki}`,Ay=`focusin${ki}`,wy=`focusout${ki}`,Cy=`hide${ki}`,Ry=`hidden${ki}`,Py=`show${ki}`,Ly=`shown${ki}`,Dy="fade",xf="hide",bo="show",Ao="showing",Iy={animation:"boolean",autohide:"boolean",delay:"number"},Ny={animation:!0,autohide:!0,delay:5e3};class Wa extends Nn{constructor(t,e){super(t,e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return Ny}static get DefaultType(){return Iy}static get NAME(){return Sy}show(){if(Q.trigger(this._element,Py).defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add(Dy);const e=()=>{this._element.classList.remove(Ao),Q.trigger(this._element,Ly),this._maybeScheduleHide()};this._element.classList.remove(xf),oo(this._element),this._element.classList.add(bo,Ao),this._queueCallback(e,this._element,this._config.animation)}hide(){if(!this.isShown()||Q.trigger(this._element,Cy).defaultPrevented)return;const e=()=>{this._element.classList.add(xf),this._element.classList.remove(Ao,bo),Q.trigger(this._element,Ry)};this._element.classList.add(Ao),this._queueCallback(e,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(bo),super.dispose()}isShown(){return this._element.classList.contains(bo)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":{this._hasMouseInteraction=e;break}case"focusin":case"focusout":{this._hasKeyboardInteraction=e;break}}if(e){this._clearTimeout();return}const n=t.relatedTarget;this._element===n||this._element.contains(n)||this._maybeScheduleHide()}_setListeners(){Q.on(this._element,Ty,t=>this._onInteraction(t,!0)),Q.on(this._element,by,t=>this._onInteraction(t,!1)),Q.on(this._element,Ay,t=>this._onInteraction(t,!0)),Q.on(this._element,wy,t=>this._onInteraction(t,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each(function(){const e=Wa.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}ka(Wa);An(Wa);function ti(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Yp(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var un={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},js={duration:.5,overwrite:!1,delay:0},ku,De,fe,yn=1e8,se=1/yn,vl=Math.PI*2,Oy=vl/4,Uy=0,qp=Math.sqrt,Fy=Math.cos,By=Math.sin,Ce=function(t){return typeof t=="string"},ge=function(t){return typeof t=="function"},ci=function(t){return typeof t=="number"},Vu=function(t){return typeof t>"u"},Gn=function(t){return typeof t=="object"},qe=function(t){return t!==!1},Hu=function(){return typeof window<"u"},wo=function(t){return ge(t)||Ce(t)},Kp=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Ue=Array.isArray,zy=/random\([^)]+\)/g,ky=/,\s*/g,yf=/(?:-?\.?\d|\.)+/gi,jp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,$r=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,yc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Jp=/[+-]=-?[.\d]+/,Vy=/[^,'"\[\]\s]+/gi,Hy=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,pe,On,xl,Gu,pn={},Ea={},Zp,Qp=function(t){return(Ea=ls(t,pn))&&Qe},Wu=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Js=function(t,e){return!e&&console.warn(t)},tm=function(t,e){return t&&(pn[t]=e)&&Ea&&(Ea[t]=e)||pn},Zs=function(){return 0},Gy={suppressEvents:!0,isStart:!0,kill:!1},oa={suppressEvents:!0,kill:!1},Wy={suppressEvents:!0},Xu={},bi=[],yl={},em,sn={},Ec={},Ef=30,aa=[],$u="",Yu=function(t){var e=t[0],n,i;if(Gn(e)||ge(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=aa.length;i--&&!aa[i].targetTest(e););n=aa[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Mm(t[i],n)))||t.splice(i,1);return t},ur=function(t){return t._gsap||Yu(En(t))[0]._gsap},nm=function(t,e,n){return(n=t[e])&&ge(n)?t[e]():Vu(n)&&t.getAttribute&&t.getAttribute(e)||n},Ke=function(t,e){return(t=t.split(",")).forEach(e)||t},xe=function(t){return Math.round(t*1e5)/1e5||0},de=function(t){return Math.round(t*1e7)/1e7||0},jr=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},Xy=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Sa=function(){var t=bi.length,e=bi.slice(0),n,i;for(yl={},bi.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},qu=function(t){return!!(t._initted||t._startAt||t.add)},im=function(t,e,n,i){bi.length&&!De&&Sa(),t.render(e,n,i||!!(De&&e<0&&qu(t))),bi.length&&!De&&Sa()},rm=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(Vy).length<2?e:Ce(t)?t.trim():t},sm=function(t){return t},mn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},$y=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},ls=function(t,e){for(var n in e)t[n]=e[n];return t},Sf=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Gn(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},Ma=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},Ws=function(t){var e=t.parent||pe,n=t.keyframes?$y(Ue(t.keyframes)):mn;if(qe(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},Yy=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},om=function(t,e,n,i,s){n===void 0&&(n="_first"),i===void 0&&(i="_last");var o=t[i],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},Xa=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},Ii=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},hr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},qy=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},El=function(t,e,n,i){return t._startAt&&(De?t._startAt.revert(oa):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},Ky=function r(t){return!t||t._ts&&r(t.parent)},Mf=function(t){return t._repeat?us(t._tTime,t=t.duration()+t._rDelay)*t:0},us=function(t,e){var n=Math.floor(t=de(t/e));return t&&n===t?n-1:n},Ta=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},$a=function(t){return t._end=de(t._start+(t._tDur/Math.abs(t._ts||t._rts||se)||0))},Ya=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=de(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),$a(t),n._dirty||hr(n,t)),t},am=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Ta(t.rawTime(),e),(!e._dur||uo(0,e.totalDuration(),n)-e._tTime>se)&&e.render(n,!0)),hr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-se}},Fn=function(t,e,n,i){return e.parent&&Ii(e),e._start=de((ci(n)?n:n||t!==pe?vn(t,n,e):t._time)+e._delay),e._end=de(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),om(t,e,"_first","_last",t._sort?"_start":0),Sl(e)||(t._recent=e),i||am(t,e),t._ts<0&&Ya(t,t._tTime),t},cm=function(t,e){return(pn.ScrollTrigger||Wu("scrollTrigger",e))&&pn.ScrollTrigger.create(e,t)},lm=function(t,e,n,i,s){if(ju(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!De&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&em!==an.frame)return bi.push(t),t._lazy=[s,i],1},jy=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},Sl=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Jy=function(t,e,n,i){var s=t.ratio,o=e<0||!e&&(!t._start&&jy(t)&&!(!t._initted&&Sl(t))||(t._ts<0||t._dp._ts<0)&&!Sl(t))?0:1,a=t._rDelay,c=0,l,u,h;if(a&&t._repeat&&(c=uo(0,t._tDur,e),u=us(c,a),t._yoyo&&u&1&&(o=1-o),u!==us(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||De||i||t._zTime===se||!e&&t._zTime){if(!t._initted&&lm(t,e,i,n,c))return;for(h=t._zTime,t._zTime=e||(n?se:0),n||(n=e&&!h),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=c,l=t._pt;l;)l.r(o,l.d),l=l._next;e<0&&El(t,e,n,!0),t._onUpdate&&!n&&cn(t,"onUpdate"),c&&t._repeat&&!n&&t.parent&&cn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&Ii(t,1),!n&&!De&&(cn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},Zy=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},hs=function(t,e,n,i){var s=t._repeat,o=de(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:de(o*(s+1)+t._rDelay*s):o,a>0&&!i&&Ya(t,t._tTime=t._tDur*a),t.parent&&$a(t),n||hr(t.parent,t),t},Tf=function(t){return t instanceof Ye?hr(t):hs(t,t._dur)},Qy={_start:0,endTime:Zs,totalDuration:Zs},vn=function r(t,e,n){var i=t.labels,s=t._recent||Qy,o=t.duration()>=yn?s.endTime(!1):t._dur,a,c,l;return Ce(e)&&(isNaN(e)||e in i)?(c=e.charAt(0),l=e.substr(-1)==="%",a=e.indexOf("="),c==="<"||c===">"?(a>=0&&(e=e.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(l?(a<0?s:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(c=parseFloat(e.charAt(a-1)+e.substr(a+1)),l&&n&&(c=c/100*(Ue(n)?n[0]:n).totalDuration()),a>1?r(t,e.substr(0,a-1),n)+c:o+c)):e==null?o:+e},Xs=function(t,e,n){var i=ci(e[1]),s=(i?2:1)+(t<2?0:1),o=e[s],a,c;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,c=n;c&&!("immediateRender"in a);)a=c.vars.defaults||{},c=qe(c.vars.inherit)&&c.parent;o.immediateRender=qe(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new Se(e[0],o,e[s+1])},Vi=function(t,e){return t||t===0?e(t):e},uo=function(t,e,n){return n<t?t:n>e?e:n},Oe=function(t,e){return!Ce(t)||!(e=Hy.exec(t))?"":e[1]},tE=function(t,e,n){return Vi(n,function(i){return uo(t,e,i)})},Ml=[].slice,um=function(t,e){return t&&Gn(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Gn(t[0]))&&!t.nodeType&&t!==On},eE=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return Ce(i)&&!e||um(i,1)?(s=n).push.apply(s,En(i)):n.push(i)})||n},En=function(t,e,n){return fe&&!e&&fe.selector?fe.selector(t):Ce(t)&&!n&&(xl||!fs())?Ml.call((e||Gu).querySelectorAll(t),0):Ue(t)?eE(t,n):um(t)?Ml.call(t,0):t?[t]:[]},Tl=function(t){return t=En(t)[0]||Js("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return En(e,n.querySelectorAll?n:n===t?Js("Invalid scope")||Gu.createElement("div"):t)}},hm=function(t){return t.sort(function(){return .5-Math.random()})},fm=function(t){if(ge(t))return t;var e=Gn(t)?t:{each:t},n=fr(e.ease),i=e.from||0,s=parseFloat(e.base)||0,o={},a=i>0&&i<1,c=isNaN(i)||a,l=e.axis,u=i,h=i;return Ce(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!a&&c&&(u=i[0],h=i[1]),function(f,d,g){var _=(g||e).length,p=o[_],m,y,v,E,w,b,S,C,L;if(!p){if(L=e.grid==="auto"?0:(e.grid||[1,yn])[1],!L){for(S=-yn;S<(S=g[L++].getBoundingClientRect().left)&&L<_;);L<_&&L--}for(p=o[_]=[],m=c?Math.min(L,_)*u-.5:i%L,y=L===yn?0:c?_*h/L-.5:i/L|0,S=0,C=yn,b=0;b<_;b++)v=b%L-m,E=y-(b/L|0),p[b]=w=l?Math.abs(l==="y"?E:v):qp(v*v+E*E),w>S&&(S=w),w<C&&(C=w);i==="random"&&hm(p),p.max=S-C,p.min=C,p.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(L>_?_-1:l?l==="y"?_/L:L:Math.max(L,_/L))||0)*(i==="edges"?-1:1),p.b=_<0?s-_:s,p.u=Oe(e.amount||e.each)||0,n=n&&_<0?pE(n):n}return _=(p[f]-p.min)/p.max||0,de(p.b+(n?n(_):_)*p.v)+p.u}},bl=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=de(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(ci(n)?0:Oe(n))}},dm=function(t,e){var n=Ue(t),i,s;return!n&&Gn(t)&&(i=n=t.radius||yn,t.values?(t=En(t.values),(s=!ci(t[0]))&&(i*=i)):t=bl(t.increment)),Vi(e,n?ge(t)?function(o){return s=t(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),c=parseFloat(s?o.y:0),l=yn,u=0,h=t.length,f,d;h--;)s?(f=t[h].x-a,d=t[h].y-c,f=f*f+d*d):f=Math.abs(t[h]-a),f<l&&(l=f,u=h);return u=!i||l<=i?t[u]:o,s||u===o||ci(o)?u:u+Oe(o)}:bl(t))},pm=function(t,e,n,i){return Vi(Ue(t)?!e:n===!0?!!(n=0):!i,function(){return Ue(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},nE=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,o){return o(s)},i)}},iE=function(t,e){return function(n){return t(parseFloat(n))+(e||Oe(n))}},rE=function(t,e,n){return _m(t,e,0,1,n)},mm=function(t,e,n){return Vi(n,function(i){return t[~~e(i)]})},sE=function r(t,e,n){var i=e-t;return Ue(t)?mm(t,r(0,t.length),e):Vi(n,function(s){return(i+(s-t)%i)%i+t})},oE=function r(t,e,n){var i=e-t,s=i*2;return Ue(t)?mm(t,r(0,t.length-1),e):Vi(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>i?s-o:o)})},Qs=function(t){return t.replace(zy,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(ky);return pm(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},_m=function(t,e,n,i,s){var o=e-t,a=i-n;return Vi(s,function(c){return n+((c-t)/o*a||0)})},aE=function r(t,e,n,i){var s=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!s){var o=Ce(t),a={},c,l,u,h,f;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(Ue(t)&&!Ue(e)){for(u=[],h=t.length,f=h-2,l=1;l<h;l++)u.push(r(t[l-1],t[l]));h--,s=function(g){g*=h;var _=Math.min(f,~~g);return u[_](g-_)},n=e}else i||(t=ls(Ue(t)?[]:{},t));if(!u){for(c in e)Ku.call(a,t,c,"get",e[c]);s=function(g){return Qu(g,a)||(o?t.p:t)}}}return Vi(n,s)},bf=function(t,e,n){var i=t.labels,s=yn,o,a,c;for(o in i)a=i[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(c=o,s=a);return c},cn=function(t,e,n){var i=t.vars,s=i[e],o=fe,a=t._ctx,c,l,u;if(s)return c=i[e+"Params"],l=i.callbackScope||t,n&&bi.length&&Sa(),a&&(fe=a),u=c?s.apply(l,c):s.call(l),fe=o,u},Bs=function(t){return Ii(t),t.scrollTrigger&&t.scrollTrigger.kill(!!De),t.progress()<1&&cn(t,"onInterrupt"),t},Yr,gm=[],vm=function(t){if(t)if(t=!t.name&&t.default||t,Hu()||t.headless){var e=t.name,n=ge(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:Zs,render:Qu,add:Ku,kill:TE,modifier:ME,rawVars:0},o={targetTest:0,get:0,getSetter:Zu,aliases:{},register:0};if(fs(),t!==i){if(sn[e])return;mn(i,mn(Ma(t,s),o)),ls(i.prototype,ls(s,Ma(t,o))),sn[i.prop=e]=i,t.targetTest&&(aa.push(i),Xu[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}tm(e,i),t.register&&t.register(Qe,i,je)}else gm.push(t)},re=255,zs={aqua:[0,re,re],lime:[0,re,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,re],navy:[0,0,128],white:[re,re,re],olive:[128,128,0],yellow:[re,re,0],orange:[re,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[re,0,0],pink:[re,192,203],cyan:[0,re,re],transparent:[re,re,re,0]},Sc=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*re+.5|0},xm=function(t,e,n){var i=t?ci(t)?[t>>16,t>>8&re,t&re]:0:zs.black,s,o,a,c,l,u,h,f,d,g;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),zs[t])i=zs[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&re,i&re,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&re,t&re]}else if(t.substr(0,3)==="hsl"){if(i=g=t.match(yf),!e)c=+i[0]%360/360,l=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(l+1):u+l-u*l,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Sc(c+1/3,s,o),i[1]=Sc(c,s,o),i[2]=Sc(c-1/3,s,o);else if(~t.indexOf("="))return i=t.match(jp),n&&i.length<4&&(i[3]=1),i}else i=t.match(yf)||zs.transparent;i=i.map(Number)}return e&&!g&&(s=i[0]/re,o=i[1]/re,a=i[2]/re,h=Math.max(s,o,a),f=Math.min(s,o,a),u=(h+f)/2,h===f?c=l=0:(d=h-f,l=u>.5?d/(2-h-f):d/(h+f),c=h===s?(o-a)/d+(o<a?6:0):h===o?(a-s)/d+2:(s-o)/d+4,c*=60),i[0]=~~(c+.5),i[1]=~~(l*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},ym=function(t){var e=[],n=[],i=-1;return t.split(Ai).forEach(function(s){var o=s.match($r)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},Af=function(t,e,n){var i="",s=(t+i).match(Ai),o=e?"hsla(":"rgba(",a=0,c,l,u,h;if(!s)return t;if(s=s.map(function(f){return(f=xm(f,e,1))&&o+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=ym(t),c=n.c,c.join(i)!==u.c.join(i)))for(l=t.replace(Ai,"1").split($r),h=l.length-1;a<h;a++)i+=l[a]+(~c.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!l)for(l=t.split(Ai),h=l.length-1;a<h;a++)i+=l[a]+s[a];return i+l[h]},Ai=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in zs)r+="|"+t+"\\b";return new RegExp(r+")","gi")}(),cE=/hsl[a]?\(/,Em=function(t){var e=t.join(" "),n;if(Ai.lastIndex=0,Ai.test(e))return n=cE.test(e),t[1]=Af(t[1],n),t[0]=Af(t[0],n,ym(t[1])),!0},to,an=function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,o=s,a=[],c,l,u,h,f,d,g=function _(p){var m=r()-i,y=p===!0,v,E,w,b;if((m>t||m<0)&&(n+=m-e),i+=m,w=i-n,v=w-o,(v>0||y)&&(b=++h.frame,f=w-h.time*1e3,h.time=w=w/1e3,o+=v+(v>=s?4:s-v),E=1),y||(c=l(_)),E)for(d=0;d<a.length;d++)a[d](w,f,b,p)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(p){return f/(1e3/(p||60))},wake:function(){Zp&&(!xl&&Hu()&&(On=xl=window,Gu=On.document||{},pn.gsap=Qe,(On.gsapVersions||(On.gsapVersions=[])).push(Qe.version),Qp(Ea||On.GreenSockGlobals||!On.gsap&&On||{}),gm.forEach(vm)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&h.sleep(),l=u||function(p){return setTimeout(p,o-h.time*1e3+1|0)},to=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),to=0,l=Zs},lagSmoothing:function(p,m){t=p||1/0,e=Math.min(m||33,t)},fps:function(p){s=1e3/(p||240),o=h.time*1e3+s},add:function(p,m,y){var v=m?function(E,w,b,S){p(E,w,b,S),h.remove(v)}:p;return h.remove(p),a[y?"unshift":"push"](v),fs(),v},remove:function(p,m){~(m=a.indexOf(p))&&a.splice(m,1)&&d>=m&&d--},_listeners:a},h}(),fs=function(){return!to&&an.wake()},Gt={},lE=/^[\d.\-M][\d.\-,\s]/,uE=/["']/g,hE=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,o=n.length,a,c,l;s<o;s++)c=n[s],a=s!==o-1?c.lastIndexOf(","):c.length,l=c.substr(0,a),e[i]=isNaN(l)?l.replace(uE,"").trim():+l,i=c.substr(a+1).trim();return e},fE=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},dE=function(t){var e=(t+"").split("("),n=Gt[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[hE(e[1])]:fE(t).split(",").map(rm)):Gt._CE&&lE.test(t)?Gt._CE("",t):n},pE=function(t){return function(e){return 1-t(1-e)}},fr=function(t,e){return t&&(ge(t)?t:Gt[t]||dE(t))||e},Sr=function(t,e,n,i){n===void 0&&(n=function(c){return 1-e(1-c)}),i===void 0&&(i=function(c){return c<.5?e(c*2)/2:1-e((1-c)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},o;return Ke(t,function(a){Gt[a]=pn[a]=s,Gt[o=a.toLowerCase()]=n;for(var c in s)Gt[o+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=Gt[a+"."+c]=s[c]}),s},Sm=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Mc=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/vl*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*By((u-o)*s)+1},c=t==="out"?a:t==="in"?function(l){return 1-a(1-l)}:Sm(a);return s=vl/s,c.config=function(l,u){return r(t,l,u)},c},Tc=function r(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:Sm(n);return i.config=function(s){return r(t,s)},i};Ke("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;Sr(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});Gt.Linear.easeNone=Gt.none=Gt.Linear.easeIn;Sr("Elastic",Mc("in"),Mc("out"),Mc());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(a){return a<e?r*a*a:a<n?r*Math.pow(a-1.5/t,2)+.75:a<i?r*(a-=2.25/t)*a+.9375:r*Math.pow(a-2.625/t,2)+.984375};Sr("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Sr("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Sr("Circ",function(r){return-(qp(1-r*r)-1)});Sr("Sine",function(r){return r===1?1:-Fy(r*Oy)+1});Sr("Back",Tc("in"),Tc("out"),Tc());Gt.SteppedEase=Gt.steps=pn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,o=1-se;return function(a){return((i*uo(0,o,a)|0)+s)*n}}};js.ease=Gt["quad.out"];Ke("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return $u+=r+","+r+"Params,"});var Mm=function(t,e){this.id=Uy++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:nm,this.set=e?e.getSetter:Zu},eo=function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,hs(this,+e.duration,1,1),this.data=e.data,fe&&(this._ctx=fe,fe.data.push(this)),to||an.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,hs(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(fs(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Ya(this,n),!s._dp||s.parent||am(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Fn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===se||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),im(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Mf(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Mf(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?us(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-se?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Ta(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-se?0:this._rts,this.totalTime(uo(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),$a(this),qy(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(fs(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==se&&(this._tTime-=se)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=de(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Fn(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(qe(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ta(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=Wy);var i=De;return De=n,qu(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),De=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Tf(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Tf(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(vn(this,n),qe(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,qe(i)),this._dur||(this._zTime=-se),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-se:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-se,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-se)},t.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this,s=i._prom;return new Promise(function(o){var a=ge(n)?n:sm,c=function(){var u=i.then;i.then=null,s&&s(),ge(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=u),o(a),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?c():i._prom=c})},t.kill=function(){Bs(this)},r}();mn(eo.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-se,_prom:0,_ps:!1,_rts:1});var Ye=function(r){Yp(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=qe(n.sortChildren),pe&&Fn(n.parent||pe,ti(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&cm(ti(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,o){return Xs(0,arguments,this),this},e.from=function(i,s,o){return Xs(1,arguments,this),this},e.fromTo=function(i,s,o,a){return Xs(2,arguments,this),this},e.set=function(i,s,o){return s.duration=0,s.parent=this,Ws(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Se(i,s,vn(this,o),1),this},e.call=function(i,s,o){return Fn(this,Se.delayedCall(0,i,s),o)},e.staggerTo=function(i,s,o,a,c,l,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=l,o.onCompleteParams=u,o.parent=this,new Se(i,o,vn(this,c)),this},e.staggerFrom=function(i,s,o,a,c,l,u){return o.runBackwards=1,Ws(o).immediateRender=qe(o.immediateRender),this.staggerTo(i,s,o,a,c,l,u)},e.staggerFromTo=function(i,s,o,a,c,l,u,h){return a.startAt=o,Ws(a).immediateRender=qe(a.immediateRender),this.staggerTo(i,s,a,c,l,u,h)},e.render=function(i,s,o){var a=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,u=i<=0?0:de(i),h=this._zTime<0!=i<0&&(this._initted||!l),f,d,g,_,p,m,y,v,E,w,b,S;if(this!==pe&&u>c&&i>=0&&(u=c),u!==this._tTime||o||h){if(a!==this._time&&l&&(u+=this._time-a,i+=this._time-a),f=u,E=this._start,v=this._ts,m=!v,h&&(l||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(b=this._yoyo,p=l+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,o);if(f=de(u%p),u===c?(_=this._repeat,f=l):(w=de(u/p),_=~~w,_&&_===w&&(f=l,_--),f>l&&(f=l)),w=us(this._tTime,p),!a&&this._tTime&&w!==_&&this._tTime-w*p-this._dur<=0&&(w=_),b&&_&1&&(f=l-f,S=1),_!==w&&!this._lock){var C=b&&w&1,L=C===(b&&_&1);if(_<w&&(C=!C),a=C?0:u%l?l:u,this._lock=1,this.render(a||(S?0:de(_*p)),s,!l)._lock=0,this._tTime=u,!s&&this.parent&&cn(this,"onRepeat"),this.vars.repeatRefresh&&!S&&(this.invalidate()._lock=1,w=_),a&&a!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,L&&(this._lock=2,a=C?l:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!S&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=Zy(this,de(a),de(f)),y&&(u-=f-(f=y._start))),this._tTime=u,this._time=f,this._act=!!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&u&&l&&!s&&!w&&(cn(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||f>=d._start)&&d._ts&&y!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,o),f!==this._time||!this._ts&&!m){y=0,g&&(u+=this._zTime=-se);break}}d=g}else{d=this._last;for(var x=i<0?i:f;d;){if(g=d._prev,(d._act||x<=d._end)&&d._ts&&y!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(x-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(x-d._start)*d._ts,s,o||De&&qu(d)),f!==this._time||!this._ts&&!m){y=0,g&&(u+=this._zTime=x?-se:se);break}}d=g}}if(y&&!s&&(this.pause(),y.render(f>=a?0:-se)._zTime=f>=a?1:-1,this._ts))return this._start=E,$a(this),this.render(i,s,o);this._onUpdate&&!s&&cn(this,"onUpdate",!0),(u===c&&this._tTime>=this.totalDuration()||!u&&a)&&(E===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((i||!l)&&(u===c&&this._ts>0||!u&&this._ts<0)&&Ii(this,1),!s&&!(i<0&&!a)&&(u||a||!c)&&(cn(this,u===c&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var o=this;if(ci(s)||(s=vn(this,s,i)),!(i instanceof eo)){if(Ue(i))return i.forEach(function(a){return o.add(a,s)}),this;if(Ce(i))return this.addLabel(i,s);if(ge(i))i=Se.delayedCall(0,i);else return this}return this!==i?Fn(this,i,s):this},e.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-yn);for(var c=[],l=this._first;l;)l._start>=a&&(l instanceof Se?s&&c.push(l):(o&&c.push(l),i&&c.push.apply(c,l.getChildren(!0,s,o)))),l=l._next;return c},e.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},e.remove=function(i){return Ce(i)?this.removeLabel(i):ge(i)?this.killTweensOf(i):(i.parent===this&&Xa(this,i),i===this._recent&&(this._recent=this._last),hr(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=de(an.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=vn(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,o){var a=Se.delayedCall(0,s||Zs,o);return a.data="isPause",this._hasPause=1,Fn(this,a,vn(this,i))},e.removePause=function(i){var s=this._first;for(i=vn(this,i);s;)s._start===i&&s.data==="isPause"&&Ii(s),s=s._next},e.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),c=a.length;c--;)Si!==a[c]&&a[c].kill(i,s);return this},e.getTweensOf=function(i,s){for(var o=[],a=En(i),c=this._first,l=ci(s),u;c;)c instanceof Se?Xy(c._targets,a)&&(l?(!Si||c._initted&&c._ts)&&c.globalTime(0)<=s&&c.globalTime(c.totalDuration())>s:!s||c.isActive())&&o.push(c):(u=c.getTweensOf(a,s)).length&&o.push.apply(o,u),c=c._next;return o},e.tweenTo=function(i,s){s=s||{};var o=this,a=vn(o,i),c=s,l=c.startAt,u=c.onStart,h=c.onStartParams,f=c.immediateRender,d,g=Se.to(o,mn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(l&&"time"in l?l.time:o._time))/o.timeScale())||se,onStart:function(){if(o.pause(),!d){var p=s.duration||Math.abs((a-(l&&"time"in l?l.time:o._time))/o.timeScale());g._dur!==p&&hs(g,p,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,h||[])}},s));return f?g.render(0):g},e.tweenFromTo=function(i,s,o){return this.tweenTo(s,mn({startAt:{time:vn(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),bf(this,vn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),bf(this,vn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+se)},e.shiftChildren=function(i,s,o){o===void 0&&(o=0);var a=this._first,c=this.labels,l;for(i=de(i);a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(l in c)c[l]>=o&&(c[l]+=i);return hr(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),hr(this)},e.totalDuration=function(i){var s=0,o=this,a=o._last,c=yn,l,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(h=o.parent;a;)l=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>c&&o._sort&&a._ts&&!o._lock?(o._lock=1,Fn(o,a,u-a._delay,1)._lock=0):c=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=de(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),c=0),a._end>s&&a._ts&&(s=a._end),a=l;hs(o,o===pe&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(pe._ts&&(im(pe,Ta(i,pe)),em=an.frame),an.frame>=Ef){Ef+=un.autoSleep||120;var s=pe._first;if((!s||!s._ts)&&un.autoSleep&&an._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||an.sleep()}}},t}(eo);mn(Ye.prototype,{_lock:0,_hasPause:0,_forcing:0});var mE=function(t,e,n,i,s,o,a){var c=new je(this._pt,t,e,0,1,Rm,null,s),l=0,u=0,h,f,d,g,_,p,m,y;for(c.b=n,c.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=Qs(i)),o&&(y=[n,i],o(y,t,e),n=y[0],i=y[1]),f=n.match(yc)||[];h=yc.exec(i);)g=h[0],_=i.substring(l,h.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==f[u++]&&(p=parseFloat(f[u-1])||0,c._pt={_next:c._pt,p:_||u===1?_:",",s:p,c:g.charAt(1)==="="?jr(p,g)-p:parseFloat(g)-p,m:d&&d<4?Math.round:0},l=yc.lastIndex);return c.c=l<i.length?i.substring(l,i.length):"",c.fp=a,(Jp.test(i)||m)&&(c.e=0),this._pt=c,c},Ku=function(t,e,n,i,s,o,a,c,l,u){ge(i)&&(i=i(s||0,t,o));var h=t[e],f=n!=="get"?n:ge(h)?l?t[e.indexOf("set")||!ge(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():h,d=ge(h)?l?yE:wm:Ju,g;if(Ce(i)&&(~i.indexOf("random(")&&(i=Qs(i)),i.charAt(1)==="="&&(g=jr(f,i)+(Oe(f)||0),(g||g===0)&&(i=g))),!u||f!==i||Al)return!isNaN(f*i)&&i!==""?(g=new je(this._pt,t,e,+f||0,i-(f||0),typeof h=="boolean"?SE:Cm,0,d),l&&(g.fp=l),a&&g.modifier(a,this,t),this._pt=g):(!h&&!(e in t)&&Wu(e,i),mE.call(this,t,e,f,i,d,c||un.stringFilter,l))},_E=function(t,e,n,i,s){if(ge(t)&&(t=$s(t,s,e,n,i)),!Gn(t)||t.style&&t.nodeType||Ue(t)||Kp(t))return Ce(t)?$s(t,s,e,n,i):t;var o={},a;for(a in t)o[a]=$s(t[a],s,e,n,i);return o},Tm=function(t,e,n,i,s,o){var a,c,l,u;if(sn[t]&&(a=new sn[t]).init(s,a.rawVars?e[t]:_E(e[t],i,s,o,n),n,i,o)!==!1&&(n._pt=c=new je(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==Yr))for(l=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)l[a._props[u]]=c;return a},Si,Al,ju=function r(t,e,n){var i=t.vars,s=i.ease,o=i.startAt,a=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,g=t._dur,_=t._startAt,p=t._targets,m=t.parent,y=m&&m.data==="nested"?m.vars.targets:p,v=t._overwrite==="auto"&&!ku,E=t.timeline,w=i.easeReverse||h,b,S,C,L,x,M,O,U,V,Y,z,$,W;if(E&&(!f||!s)&&(s="none"),t._ease=fr(s,js.ease),t._rEase=w&&(fr(w)||t._ease),t._from=!E&&!!i.runBackwards,t._from&&(t.ratio=1),!E||f&&!i.stagger){if(U=p[0]?ur(p[0]).harness:0,$=U&&i[U.prop],b=Ma(i,Xu),_&&(_._zTime<0&&_.progress(1),e<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&g?oa:Gy),_._lazy=0),o){if(Ii(t._startAt=Se.set(p,mn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!_&&qe(c),startAt:null,delay:0,onUpdate:l&&function(){return cn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(De||!a&&!d)&&t._startAt.revert(oa),a&&g&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(u&&g&&!_){if(e&&(a=!1),C=mn({overwrite:!1,data:"isFromStart",lazy:a&&!_&&qe(c),immediateRender:a,stagger:0,parent:m},b),$&&(C[U.prop]=$),Ii(t._startAt=Se.set(p,C)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(De?t._startAt.revert(oa):t._startAt.render(-1,!0)),t._zTime=e,!a)r(t._startAt,se,se);else if(!e)return}for(t._pt=t._ptCache=0,c=g&&qe(c)||c&&!g,S=0;S<p.length;S++){if(x=p[S],O=x._gsap||Yu(p)[S]._gsap,t._ptLookup[S]=Y={},yl[O.id]&&bi.length&&Sa(),z=y===p?S:y.indexOf(x),U&&(V=new U).init(x,$||b,t,z,y)!==!1&&(t._pt=L=new je(t._pt,x,V.name,0,1,V.render,V,0,V.priority),V._props.forEach(function(rt){Y[rt]=L}),V.priority&&(M=1)),!U||$)for(C in b)sn[C]&&(V=Tm(C,b,t,z,x,y))?V.priority&&(M=1):Y[C]=L=Ku.call(t,x,C,"get",b[C],z,y,0,i.stringFilter);t._op&&t._op[S]&&t.kill(x,t._op[S]),v&&t._pt&&(Si=t,pe.killTweensOf(x,Y,t.globalTime(e)),W=!t.parent,Si=0),t._pt&&c&&(yl[O.id]=1)}M&&Pm(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!W,f&&e<=0&&E.render(yn,!0,!0)},gE=function(t,e,n,i,s,o,a,c){var l=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,h,f,d;if(!l)for(l=t._ptCache[e]=[],f=t._ptLookup,d=t._targets.length;d--;){if(u=f[d][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return Al=1,t.vars[e]="+=0",ju(t,a),Al=0,c?Js(e+" not eligible for reset. Try splitting into individual properties"):1;l.push(u)}for(d=l.length;d--;)h=l[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,h.e&&(h.e=xe(n)+Oe(h.e)),h.b&&(h.b=u.s+Oe(h.b))},vE=function(t,e){var n=t[0]?ur(t[0]).harness:0,i=n&&n.aliases,s,o,a,c;if(!i)return e;s=ls({},e);for(o in i)if(o in s)for(c=i[o].split(","),a=c.length;a--;)s[c[a]]=s[o];return s},xE=function(t,e,n,i){var s=e.ease||i||"power1.inOut",o,a;if(Ue(e))a=n[t]||(n[t]=[]),e.forEach(function(c,l){return a.push({t:l/(e.length-1)*100,v:c,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},$s=function(t,e,n,i,s){return ge(t)?t.call(e,n,i,s):Ce(t)&&~t.indexOf("random(")?Qs(t):t},bm=$u+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Am={};Ke(bm+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Am[r]=1});var Se=function(r){Yp(t,r);function t(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Ws(i))||this;var c=a.vars,l=c.duration,u=c.delay,h=c.immediateRender,f=c.stagger,d=c.overwrite,g=c.keyframes,_=c.defaults,p=c.scrollTrigger,m=i.parent||pe,y=(Ue(n)||Kp(n)?ci(n[0]):"length"in i)?[n]:En(n),v,E,w,b,S,C,L,x;if(a._targets=y.length?Yu(y):Js("GSAP target "+n+" not found. https://gsap.com",!un.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||f||wo(l)||wo(u)){i=a.vars;var M=i.easeReverse||i.yoyoEase;if(v=a.timeline=new Ye({data:"nested",defaults:_||{},targets:m&&m.data==="nested"?m.vars.targets:y}),v.kill(),v.parent=v._dp=ti(a),v._start=0,f||wo(l)||wo(u)){if(b=y.length,L=f&&fm(f),Gn(f))for(S in f)~bm.indexOf(S)&&(x||(x={}),x[S]=f[S]);for(E=0;E<b;E++)w=Ma(i,Am),w.stagger=0,M&&(w.easeReverse=M),x&&ls(w,x),C=y[E],w.duration=+$s(l,ti(a),E,C,y),w.delay=(+$s(u,ti(a),E,C,y)||0)-a._delay,!f&&b===1&&w.delay&&(a._delay=u=w.delay,a._start+=u,w.delay=0),v.to(C,w,L?L(E,C,y):0),v._ease=Gt.none;v.duration()?l=u=0:a.timeline=0}else if(g){Ws(mn(v.vars.defaults,{ease:"none"})),v._ease=fr(g.ease||i.ease||"none");var O=0,U,V,Y;if(Ue(g))g.forEach(function(z){return v.to(y,z,">")}),v.duration();else{w={};for(S in g)S==="ease"||S==="easeEach"||xE(S,g[S],w,g.easeEach);for(S in w)for(U=w[S].sort(function(z,$){return z.t-$.t}),O=0,E=0;E<U.length;E++)V=U[E],Y={ease:V.e,duration:(V.t-(E?U[E-1].t:0))/100*l},Y[S]=V.v,v.to(y,Y,O),O+=Y.duration;v.duration()<l&&v.to({},{duration:l-v.duration()})}}l||a.duration(l=v.duration())}else a.timeline=0;return d===!0&&!ku&&(Si=ti(a),pe.killTweensOf(y),Si=0),Fn(m,ti(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(h||!l&&!g&&a._start===de(m._time)&&qe(h)&&Ky(ti(a))&&m.data!=="nested")&&(a._tTime=-se,a.render(Math.max(0,-u)||0)),p&&cm(ti(a),p),a}var e=t.prototype;return e.render=function(i,s,o){var a=this._time,c=this._tDur,l=this._dur,u=i<0,h=i>c-se&&!u?c:i<se?0:i,f,d,g,_,p,m,y,v;if(!l)Jy(this,i,s,o);else if(h!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,v=this.timeline,this._repeat){if(_=l+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+i,s,o);if(f=de(h%_),h===c?(g=this._repeat,f=l):(p=de(h/_),g=~~p,g&&g===p?(f=l,g--):f>l&&(f=l)),m=this._yoyo&&g&1,m&&(f=l-f),p=us(this._tTime,_),f===a&&!o&&this._initted&&g===p)return this._tTime=h,this;g!==p&&this.vars.repeatRefresh&&!m&&!this._lock&&f!==_&&this._initted&&(this._lock=o=1,this.render(de(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(lm(this,u?i:f,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==p))return this;if(l!==this._dur)return this.render(i,s,o)}if(this._rEase){var E=f<a;if(E!==this._inv){var w=E?a:l-a;this._inv=E,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=w?(E?-1:1)/w:0,this._invScale=E?-this.ratio:1-this.ratio,this._invEase=E?this._rEase:this._ease}this.ratio=y=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=y=this._ease(f/l);if(this._from&&(this.ratio=y=1-y),this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&h&&!s&&!p&&(cn(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(y,d.d),d=d._next;v&&v.render(i<0?i:v._dur*v._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&El(this,i,s,o),cn(this,"onUpdate")),this._repeat&&g!==p&&this.vars.onRepeat&&!s&&this.parent&&cn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&El(this,i,!0,!0),(i||!l)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&Ii(this,1),!s&&!(u&&!a)&&(h||a||m)&&(cn(this,h===c?"onComplete":"onReverseComplete",!0),this._prom&&!(h<c&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,o,a,c){to||an.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||ju(this,l),u=this._ease(l/this._dur),gE(this,i,s,o,a,u,l,c)?this.resetTo(i,s,o,a,1):(Ya(this,0),this.parent||om(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Bs(this):this.scrollTrigger&&this.scrollTrigger.kill(!!De),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Si&&Si.vars.overwrite!==!0)._first||Bs(this),this.parent&&o!==this.timeline.totalDuration()&&hs(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,c=i?En(i):a,l=this._ptLookup,u=this._pt,h,f,d,g,_,p,m;if((!s||s==="all")&&Yy(a,c))return s==="all"&&(this._pt=0),Bs(this);for(h=this._op=this._op||[],s!=="all"&&(Ce(s)&&(_={},Ke(s,function(y){return _[y]=1}),s=_),s=vE(a,s)),m=a.length;m--;)if(~c.indexOf(a[m])){f=l[m],s==="all"?(h[m]=s,g=f,d={}):(d=h[m]=h[m]||{},g=s);for(_ in g)p=f&&f[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&Xa(this,p,"_pt"),delete f[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&Bs(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return Xs(1,arguments)},t.delayedCall=function(i,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,s,o){return Xs(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,o){return pe.killTweensOf(i,s,o)},t}(eo);mn(Se.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Ke("staggerTo,staggerFrom,staggerFromTo",function(r){Se[r]=function(){var t=new Ye,e=Ml.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var Ju=function(t,e,n){return t[e]=n},wm=function(t,e,n){return t[e](n)},yE=function(t,e,n,i){return t[e](i.fp,n)},EE=function(t,e,n){return t.setAttribute(e,n)},Zu=function(t,e){return ge(t[e])?wm:Vu(t[e])&&t.setAttribute?EE:Ju},Cm=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},SE=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Rm=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},Qu=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},ME=function(t,e,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(t,e,n),s=o},TE=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Xa(this,e,"_pt"):e.dep||(n=1),e=i;return!n},bE=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},Pm=function(t){for(var e=t._pt,n,i,s,o;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=s},je=function(){function r(e,n,i,s,o,a,c,l,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||Cm,this.d=c||this,this.set=l||Ju,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=bE,this.m=n,this.mt=s,this.tween=i},r}();Ke($u+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return Xu[r]=1});pn.TweenMax=pn.TweenLite=Se;pn.TimelineLite=pn.TimelineMax=Ye;pe=new Ye({sortChildren:!1,defaults:js,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});un.stringFilter=Em;var dr=[],ca={},AE=[],wf=0,wE=0,bc=function(t){return(ca[t]||AE).map(function(e){return e()})},wl=function(){var t=Date.now(),e=[];t-wf>2&&(bc("matchMediaInit"),dr.forEach(function(n){var i=n.queries,s=n.conditions,o,a,c,l;for(a in i)o=On.matchMedia(i[a]).matches,o&&(c=1),o!==s[a]&&(s[a]=o,l=1);l&&(n.revert(),c&&e.push(n))}),bc("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),wf=t,bc("matchMedia"))},Lm=function(){function r(e,n){this.selector=n&&Tl(n),this.data=[],this._r=[],this.isReverted=!1,this.id=wE++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){ge(n)&&(s=i,i=n,n=ge);var o=this,a=function(){var l=fe,u=o.selector,h;return l&&l!==o&&l.data.push(o),s&&(o.selector=Tl(s)),fe=o,h=i.apply(o,arguments),ge(h)&&o._r.push(h),fe=l,o.selector=u,o.isReverted=!1,h};return o.last=a,n===ge?a(o,function(c){return o.add(null,c)}):n?o[n]=a:a},t.ignore=function(n){var i=fe;fe=null,n(this),fe=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Se&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),c=s.data.length,l;c--;)l=s.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),c=s.data.length;c--;)l=s.data[c],l instanceof Ye?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof Se)&&l.revert&&l.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=dr.length;o--;)dr[o].id===this.id&&dr.splice(o,1)},t.revert=function(n){this.kill(n||{})},r}(),CE=function(){function r(e){this.contexts=[],this.scope=e,fe&&fe.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){Gn(n)||(n={matches:n});var o=new Lm(0,s||this.scope),a=o.conditions={},c,l,u;fe&&!o.selector&&(o.selector=fe.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(l in n)l==="all"?u=1:(c=On.matchMedia(n[l]),c&&(dr.indexOf(o)<0&&dr.push(o),(a[l]=c.matches)&&(u=1),c.addListener?c.addListener(wl):c.addEventListener("change",wl)));return u&&i(o,function(h){return o.add(null,h)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),ba={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return vm(i)})},timeline:function(t){return new Ye(t)},getTweensOf:function(t,e){return pe.getTweensOf(t,e)},getProperty:function(t,e,n,i){Ce(t)&&(t=En(t)[0]);var s=ur(t||{}).get,o=n?sm:rm;return n==="native"&&(n=""),t&&(e?o((sn[e]&&sn[e].get||s)(t,e,n,i)):function(a,c,l){return o((sn[a]&&sn[a].get||s)(t,a,c,l))})},quickSetter:function(t,e,n){if(t=En(t),t.length>1){var i=t.map(function(u){return Qe.quickSetter(u,e,n)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}t=t[0]||{};var o=sn[e],a=ur(t),c=a.harness&&(a.harness.aliases||{})[e]||e,l=o?function(u){var h=new o;Yr._pt=0,h.init(t,n?u+n:u,Yr,0,[t]),h.render(1,h),Yr._pt&&Qu(1,Yr)}:a.set(t,c);return o?l:function(u){return l(t,c,n?u+n:u,a,1)}},quickTo:function(t,e,n){var i,s=Qe.to(t,mn((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(c,l,u){return s.resetTo(e,c,l,u)};return o.tween=s,o},isTweening:function(t){return pe.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=fr(t.ease,js.ease)),Sf(js,t||{})},config:function(t){return Sf(un,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!sn[a]&&!pn[a]&&Js(e+" effect requires "+a+" plugin.")}),Ec[e]=function(a,c,l){return n(En(a),mn(c||{},s),l)},o&&(Ye.prototype[e]=function(a,c,l){return this.add(Ec[e](a,Gn(c)?c:(l=c)&&{},this),l)})},registerEase:function(t,e){Gt[t]=fr(e)},parseEase:function(t,e){return arguments.length?fr(t,e):Gt},getById:function(t){return pe.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Ye(t),i,s;for(n.smoothChildTiming=qe(t.smoothChildTiming),pe.remove(n),n._dp=0,n._time=n._tTime=pe._time,i=pe._first;i;)s=i._next,(e||!(!i._dur&&i instanceof Se&&i.vars.onComplete===i._targets[0]))&&Fn(n,i,i._start-i._delay),i=s;return Fn(pe,n,0),n},context:function(t,e){return t?new Lm(t,e):fe},matchMedia:function(t){return new CE(t)},matchMediaRefresh:function(){return dr.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||wl()},addEventListener:function(t,e){var n=ca[t]||(ca[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=ca[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:sE,wrapYoyo:oE,distribute:fm,random:pm,snap:dm,normalize:rE,getUnit:Oe,clamp:tE,splitColor:xm,toArray:En,selector:Tl,mapRange:_m,pipe:nE,unitize:iE,interpolate:aE,shuffle:hm},install:Qp,effects:Ec,ticker:an,updateRoot:Ye.updateRoot,plugins:sn,globalTimeline:pe,core:{PropTween:je,globals:tm,Tween:Se,Timeline:Ye,Animation:eo,getCache:ur,_removeLinkedListItem:Xa,reverting:function(){return De},context:function(t){return t&&fe&&(fe.data.push(t),t._ctx=fe),fe},suppressOverwrites:function(t){return ku=t}}};Ke("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return ba[r]=Se[r]});an.add(Ye.updateRoot);Yr=ba.to({},{duration:0});var RE=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},PE=function(t,e){var n=t._targets,i,s,o;for(i in e)for(s=n.length;s--;)o=t._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=RE(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[s],i))},Ac=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,o){o._onInit=function(a){var c,l;if(Ce(s)&&(c={},Ke(s,function(u){return c[u]=1}),s=c),e){c={};for(l in s)c[l]=e(s[l]);s=c}PE(a,s)}}}},Qe=ba.registerPlugin({name:"attr",init:function(t,e,n,i,s){var o,a,c;this.tween=n;for(o in e)c=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(c||0)+"",e[o],i,s,0,0,o),a.op=o,a.b=c,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)De?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Ac("roundProps",bl),Ac("modifiers"),Ac("snap",dm))||ba;Se.version=Ye.version=Qe.version="3.15.0";Zp=1;Hu()&&fs();Gt.Power0;Gt.Power1;Gt.Power2;Gt.Power3;Gt.Power4;Gt.Linear;Gt.Quad;Gt.Cubic;Gt.Quart;Gt.Quint;Gt.Strong;Gt.Elastic;Gt.Back;Gt.SteppedEase;Gt.Bounce;Gt.Sine;Gt.Expo;Gt.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Cf,Mi,Jr,th,sr,Rf,eh,LE=function(){return typeof window<"u"},li={},Zi=180/Math.PI,Zr=Math.PI/180,wr=Math.atan2,Pf=1e8,nh=/([A-Z])/g,DE=/(left|right|width|margin|padding|x)/i,IE=/[\s,\(]\S/,Bn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Cl=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},NE=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},OE=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},UE=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},FE=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Dm=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Im=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},BE=function(t,e,n){return t.style[e]=n},zE=function(t,e,n){return t.style.setProperty(e,n)},kE=function(t,e,n){return t._gsap[e]=n},VE=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},HE=function(t,e,n,i,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},GE=function(t,e,n,i,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},me="transform",Je=me+"Origin",WE=function r(t,e){var n=this,i=this.target,s=i.style,o=i._gsap;if(t in li&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Bn[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=ei(i,a)}):this.tfm[t]=o.x?o[t]:ei(i,t),t===Je&&(this.tfm.zOrigin=o.zOrigin);else return Bn.transform.split(",").forEach(function(a){return r.call(n,a,e)});if(this.props.indexOf(me)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Je,e,"")),t=me}(s||e)&&this.props.push(t,e,s[t])},Nm=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},XE=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(nh,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=eh(),(!s||!s.isStart)&&!n[me]&&(Nm(n),i.zOrigin&&n[Je]&&(n[Je]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Om=function(t,e){var n={target:t,props:[],revert:XE,save:WE};return t._gsap||Qe.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},Um,Rl=function(t,e){var n=Mi.createElementNS?Mi.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Mi.createElement(t);return n&&n.style?n:Mi.createElement(t)},ln=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(nh,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,ds(e)||e,1)||""},Lf="O,Moz,ms,Ms,Webkit".split(","),ds=function(t,e,n){var i=e||sr,s=i.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(Lf[o]+t in s););return o<0?null:(o===3?"ms":o>=0?Lf[o]:"")+t},Pl=function(){LE()&&window.document&&(Cf=window,Mi=Cf.document,Jr=Mi.documentElement,sr=Rl("div")||{style:{}},Rl("div"),me=ds(me),Je=me+"Origin",sr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Um=!!ds("perspective"),eh=Qe.core.reverting,th=1)},Df=function(t){var e=t.ownerSVGElement,n=Rl("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Jr.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Jr.removeChild(n),s},If=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Fm=function(t){var e,n;try{e=t.getBBox()}catch{e=Df(t),n=1}return e&&(e.width||e.height)||n||(e=Df(t)),e&&!e.width&&!e.x&&!e.y?{x:+If(t,["x","cx","x1"])||0,y:+If(t,["y","cy","y1"])||0,width:0,height:0}:e},Bm=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Fm(t))},Ni=function(t,e){if(e){var n=t.style,i;e in li&&e!==Je&&(e=me),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(nh,"-$1").toLowerCase())):n.removeAttribute(e)}},Ti=function(t,e,n,i,s,o){var a=new je(t._pt,e,n,0,1,o?Im:Dm);return t._pt=a,a.b=i,a.e=s,t._props.push(n),a},Nf={deg:1,rad:1,turn:1},$E={grid:1,flex:1},Oi=function r(t,e,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=sr.style,c=DE.test(e),l=t.tagName.toLowerCase()==="svg",u=(l?"client":"offset")+(c?"Width":"Height"),h=100,f=i==="px",d=i==="%",g,_,p,m;if(i===o||!s||Nf[i]||Nf[o])return s;if(o!=="px"&&!f&&(s=r(t,e,n,"px")),m=t.getCTM&&Bm(t),(d||o==="%")&&(li[e]||~e.indexOf("adius")))return g=m?t.getBBox()[c?"width":"height"]:t[u],xe(d?s/g*h:s/100*g);if(a[c?"width":"height"]=h+(f?o:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!l?t:t.parentNode,m&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Mi||!_.appendChild)&&(_=Mi.body),p=_._gsap,p&&d&&p.width&&c&&p.time===an.time&&!p.uncache)return xe(s/p.width*h);if(d&&(e==="height"||e==="width")){var y=t.style[e];t.style[e]=h+i,g=t[u],y?t.style[e]=y:Ni(t,e)}else(d||o==="%")&&!$E[ln(_,"display")]&&(a.position=ln(t,"position")),_===t&&(a.position="static"),_.appendChild(sr),g=sr[u],_.removeChild(sr),a.position="absolute";return c&&d&&(p=ur(_),p.time=an.time,p.width=_[u]),xe(f?g*s/h:g&&s?h/g*s:0)},ei=function(t,e,n,i){var s;return th||Pl(),e in Bn&&e!=="transform"&&(e=Bn[e],~e.indexOf(",")&&(e=e.split(",")[0])),li[e]&&e!=="transform"?(s=io(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:wa(ln(t,Je))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Aa[e]&&Aa[e](t,e,n)||ln(t,e)||nm(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Oi(t,e,s,n)+n:s},YE=function(t,e,n,i){if(!n||n==="none"){var s=ds(e,t,1),o=s&&ln(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=ln(t,"borderTopColor"))}var a=new je(this._pt,t.style,e,0,1,Rm),c=0,l=0,u,h,f,d,g,_,p,m,y,v,E,w;if(a.b=n,a.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=ln(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=ln(t,e)||i,_?t.style[e]=_:Ni(t,e)),u=[n,i],Em(u),n=u[0],i=u[1],f=n.match($r)||[],w=i.match($r)||[],w.length){for(;h=$r.exec(i);)p=h[0],y=i.substring(c,h.index),g?g=(g+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(g=1),p!==(_=f[l++]||"")&&(d=parseFloat(_)||0,E=_.substr((d+"").length),p.charAt(1)==="="&&(p=jr(d,p)+E),m=parseFloat(p),v=p.substr((m+"").length),c=$r.lastIndex-v.length,v||(v=v||un.units[e]||E,c===i.length&&(i+=v,a.e+=v)),E!==v&&(d=Oi(t,e,_,v)||0),a._pt={_next:a._pt,p:y||l===1?y:",",s:d,c:m-d,m:g&&g<4||e==="zIndex"?Math.round:0});a.c=c<i.length?i.substring(c,i.length):""}else a.r=e==="display"&&i==="none"?Im:Dm;return Jp.test(i)&&(a.e=0),this._pt=a,a},Of={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},qE=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=Of[n]||n,e[1]=Of[i]||i,e.join(" ")},KE=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,o=n._gsap,a,c,l;if(s==="all"||s===!0)i.cssText="",c=1;else for(s=s.split(","),l=s.length;--l>-1;)a=s[l],li[a]&&(c=1,a=a==="transformOrigin"?Je:me),Ni(n,a);c&&(Ni(n,me),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",io(n,1),o.uncache=1,Nm(i)))}},Aa={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var o=t._pt=new je(t._pt,e,n,0,0,KE);return o.u=i,o.pr=-10,o.tween=s,t._props.push(n),1}}},no=[1,0,0,1,0,0],zm={},km=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Uf=function(t){var e=ln(t,me);return km(e)?no:e.substr(7).match(jp).map(xe)},ih=function(t,e){var n=t._gsap||ur(t),i=t.style,s=Uf(t),o,a,c,l;return n.svg&&t.getAttribute("transform")?(c=t.transform.baseVal.consolidate().matrix,s=[c.a,c.b,c.c,c.d,c.e,c.f],s.join(",")==="1,0,0,1,0,0"?no:s):(s===no&&!t.offsetParent&&t!==Jr&&!n.svg&&(c=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(l=1,a=t.nextElementSibling,Jr.appendChild(t)),s=Uf(t),c?i.display=c:Ni(t,"display"),l&&(a?o.insertBefore(t,a):o?o.appendChild(t):Jr.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Ll=function(t,e,n,i,s,o){var a=t._gsap,c=s||ih(t,!0),l=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,f=a.yOffset||0,d=c[0],g=c[1],_=c[2],p=c[3],m=c[4],y=c[5],v=e.split(" "),E=parseFloat(v[0])||0,w=parseFloat(v[1])||0,b,S,C,L;n?c!==no&&(S=d*p-g*_)&&(C=E*(p/S)+w*(-_/S)+(_*y-p*m)/S,L=E*(-g/S)+w*(d/S)-(d*y-g*m)/S,E=C,w=L):(b=Fm(t),E=b.x+(~v[0].indexOf("%")?E/100*b.width:E),w=b.y+(~(v[1]||v[0]).indexOf("%")?w/100*b.height:w)),i||i!==!1&&a.smooth?(m=E-l,y=w-u,a.xOffset=h+(m*d+y*_)-m,a.yOffset=f+(m*g+y*p)-y):a.xOffset=a.yOffset=0,a.xOrigin=E,a.yOrigin=w,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[Je]="0px 0px",o&&(Ti(o,a,"xOrigin",l,E),Ti(o,a,"yOrigin",u,w),Ti(o,a,"xOffset",h,a.xOffset),Ti(o,a,"yOffset",f,a.yOffset)),t.setAttribute("data-svg-origin",E+" "+w)},io=function(t,e){var n=t._gsap||new Mm(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,o="px",a="deg",c=getComputedStyle(t),l=ln(t,Je)||"0",u,h,f,d,g,_,p,m,y,v,E,w,b,S,C,L,x,M,O,U,V,Y,z,$,W,rt,st,ct,At,Nt,D,H;return u=h=f=_=p=m=y=v=E=0,d=g=1,n.svg=!!(t.getCTM&&Bm(t)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(i[me]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[me]!=="none"?c[me]:"")),i.scale=i.rotate=i.translate="none"),S=ih(t,n.svg),n.svg&&(n.uncache?(W=t.getBBox(),l=n.xOrigin-W.x+"px "+(n.yOrigin-W.y)+"px",$=""):$=!e&&t.getAttribute("data-svg-origin"),Ll(t,$||l,!!$||n.originIsAbsolute,n.smooth!==!1,S)),w=n.xOrigin||0,b=n.yOrigin||0,S!==no&&(M=S[0],O=S[1],U=S[2],V=S[3],u=Y=S[4],h=z=S[5],S.length===6?(d=Math.sqrt(M*M+O*O),g=Math.sqrt(V*V+U*U),_=M||O?wr(O,M)*Zi:0,y=U||V?wr(U,V)*Zi+_:0,y&&(g*=Math.abs(Math.cos(y*Zr))),n.svg&&(u-=w-(w*M+b*U),h-=b-(w*O+b*V))):(H=S[6],Nt=S[7],st=S[8],ct=S[9],At=S[10],D=S[11],u=S[12],h=S[13],f=S[14],C=wr(H,At),p=C*Zi,C&&(L=Math.cos(-C),x=Math.sin(-C),$=Y*L+st*x,W=z*L+ct*x,rt=H*L+At*x,st=Y*-x+st*L,ct=z*-x+ct*L,At=H*-x+At*L,D=Nt*-x+D*L,Y=$,z=W,H=rt),C=wr(-U,At),m=C*Zi,C&&(L=Math.cos(-C),x=Math.sin(-C),$=M*L-st*x,W=O*L-ct*x,rt=U*L-At*x,D=V*x+D*L,M=$,O=W,U=rt),C=wr(O,M),_=C*Zi,C&&(L=Math.cos(C),x=Math.sin(C),$=M*L+O*x,W=Y*L+z*x,O=O*L-M*x,z=z*L-Y*x,M=$,Y=W),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,m=180-m),d=xe(Math.sqrt(M*M+O*O+U*U)),g=xe(Math.sqrt(z*z+H*H)),C=wr(Y,z),y=Math.abs(C)>2e-4?C*Zi:0,E=D?1/(D<0?-D:D):0),n.svg&&($=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!km(ln(t,me)),$&&t.setAttribute("transform",$))),Math.abs(y)>90&&Math.abs(y)<270&&(s?(d*=-1,y+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,y+=y<=0?180:-180)),e=e||n.uncache,n.x=u-((n.xPercent=u&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=h-((n.yPercent=h&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=xe(d),n.scaleY=xe(g),n.rotation=xe(_)+a,n.rotationX=xe(p)+a,n.rotationY=xe(m)+a,n.skewX=y+a,n.skewY=v+a,n.transformPerspective=E+o,(n.zOrigin=parseFloat(l.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Je]=wa(l)),n.xOffset=n.yOffset=0,n.force3D=un.force3D,n.renderTransform=n.svg?JE:Um?Vm:jE,n.uncache=0,n},wa=function(t){return(t=t.split(" "))[0]+" "+t[1]},wc=function(t,e,n){var i=Oe(e);return xe(parseFloat(e)+parseFloat(Oi(t,"x",n+"px",i)))+i},jE=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Vm(t,e)},Wi="0deg",Rs="0px",Xi=") ",Vm=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,c=n.z,l=n.rotation,u=n.rotationY,h=n.rotationX,f=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,p=n.transformPerspective,m=n.force3D,y=n.target,v=n.zOrigin,E="",w=m==="auto"&&t&&t!==1||m===!0;if(v&&(h!==Wi||u!==Wi)){var b=parseFloat(u)*Zr,S=Math.sin(b),C=Math.cos(b),L;b=parseFloat(h)*Zr,L=Math.cos(b),o=wc(y,o,S*L*-v),a=wc(y,a,-Math.sin(b)*-v),c=wc(y,c,C*L*-v+v)}p!==Rs&&(E+="perspective("+p+Xi),(i||s)&&(E+="translate("+i+"%, "+s+"%) "),(w||o!==Rs||a!==Rs||c!==Rs)&&(E+=c!==Rs||w?"translate3d("+o+", "+a+", "+c+") ":"translate("+o+", "+a+Xi),l!==Wi&&(E+="rotate("+l+Xi),u!==Wi&&(E+="rotateY("+u+Xi),h!==Wi&&(E+="rotateX("+h+Xi),(f!==Wi||d!==Wi)&&(E+="skew("+f+", "+d+Xi),(g!==1||_!==1)&&(E+="scale("+g+", "+_+Xi),y.style[me]=E||"translate(0, 0)"},JE=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,c=n.rotation,l=n.skewX,u=n.skewY,h=n.scaleX,f=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,p=n.xOffset,m=n.yOffset,y=n.forceCSS,v=parseFloat(o),E=parseFloat(a),w,b,S,C,L;c=parseFloat(c),l=parseFloat(l),u=parseFloat(u),u&&(u=parseFloat(u),l+=u,c+=u),c||l?(c*=Zr,l*=Zr,w=Math.cos(c)*h,b=Math.sin(c)*h,S=Math.sin(c-l)*-f,C=Math.cos(c-l)*f,l&&(u*=Zr,L=Math.tan(l-u),L=Math.sqrt(1+L*L),S*=L,C*=L,u&&(L=Math.tan(u),L=Math.sqrt(1+L*L),w*=L,b*=L)),w=xe(w),b=xe(b),S=xe(S),C=xe(C)):(w=h,C=f,b=S=0),(v&&!~(o+"").indexOf("px")||E&&!~(a+"").indexOf("px"))&&(v=Oi(d,"x",o,"px"),E=Oi(d,"y",a,"px")),(g||_||p||m)&&(v=xe(v+g-(g*w+_*S)+p),E=xe(E+_-(g*b+_*C)+m)),(i||s)&&(L=d.getBBox(),v=xe(v+i/100*L.width),E=xe(E+s/100*L.height)),L="matrix("+w+","+b+","+S+","+C+","+v+","+E+")",d.setAttribute("transform",L),y&&(d.style[me]=L)},ZE=function(t,e,n,i,s){var o=360,a=Ce(s),c=parseFloat(s)*(a&&~s.indexOf("rad")?Zi:1),l=c-i,u=i+l+"deg",h,f;return a&&(h=s.split("_")[1],h==="short"&&(l%=o,l!==l%(o/2)&&(l+=l<0?o:-o)),h==="cw"&&l<0?l=(l+o*Pf)%o-~~(l/o)*o:h==="ccw"&&l>0&&(l=(l-o*Pf)%o-~~(l/o)*o)),t._pt=f=new je(t._pt,e,n,i,l,NE),f.e=u,f.u="deg",t._props.push(n),f},Ff=function(t,e){for(var n in e)t[n]=e[n];return t},QE=function(t,e,n){var i=Ff({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,c,l,u,h,f,d,g;i.svg?(l=n.getAttribute("transform"),n.setAttribute("transform",""),o[me]=e,a=io(n,1),Ni(n,me),n.setAttribute("transform",l)):(l=getComputedStyle(n)[me],o[me]=e,a=io(n,1),o[me]=l);for(c in li)l=i[c],u=a[c],l!==u&&s.indexOf(c)<0&&(d=Oe(l),g=Oe(u),h=d!==g?Oi(n,c,l,g):parseFloat(l),f=parseFloat(u),t._pt=new je(t._pt,a,c,h,f-h,Cl),t._pt.u=g||0,t._props.push(c));Ff(a,i)};Ke("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",o=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(a){return t<2?r+a:"border"+a+r});Aa[t>1?"border"+r:r]=function(a,c,l,u,h){var f,d;if(arguments.length<4)return f=o.map(function(g){return ei(a,g,l)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},o.forEach(function(g,_){return d[g]=f[_]=f[_]||f[(_-1)/2|0]}),a.init(c,d,h)}});var Hm={name:"css",register:Pl,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var o=this._props,a=t.style,c=n.vars.startAt,l,u,h,f,d,g,_,p,m,y,v,E,w,b,S,C,L;th||Pl(),this.styles=this.styles||Om(t),C=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(u=e[_],!(sn[_]&&Tm(_,e,n,i,t,s)))){if(d=typeof u,g=Aa[_],d==="function"&&(u=u.call(n,i,t,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=Qs(u)),g)g(this,t,_,u,n)&&(S=1);else if(_.substr(0,2)==="--")l=(getComputedStyle(t).getPropertyValue(_)+"").trim(),u+="",Ai.lastIndex=0,Ai.test(l)||(p=Oe(l),m=Oe(u),m?p!==m&&(l=Oi(t,_,l,m)+m):p&&(u+=p)),this.add(a,"setProperty",l,u,i,s,0,0,_),o.push(_),C.push(_,0,a[_]);else if(d!=="undefined"){if(c&&_ in c?(l=typeof c[_]=="function"?c[_].call(n,i,t,s):c[_],Ce(l)&&~l.indexOf("random(")&&(l=Qs(l)),Oe(l+"")||l==="auto"||(l+=un.units[_]||Oe(ei(t,_))||""),(l+"").charAt(1)==="="&&(l=ei(t,_))):l=ei(t,_),f=parseFloat(l),y=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),y&&(u=u.substr(2)),h=parseFloat(u),_ in Bn&&(_==="autoAlpha"&&(f===1&&ei(t,"visibility")==="hidden"&&h&&(f=0),C.push("visibility",0,a.visibility),Ti(this,a,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),_!=="scale"&&_!=="transform"&&(_=Bn[_],~_.indexOf(",")&&(_=_.split(",")[0]))),v=_ in li,v){if(this.styles.save(_),L=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=ln(t,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var x=t.style.perspective;t.style.perspective=u,u=ln(t,"perspective"),x?t.style.perspective=x:Ni(t,"perspective")}h=parseFloat(u)}if(E||(w=t._gsap,w.renderTransform&&!e.parseTransform||io(t,e.parseTransform),b=e.smoothOrigin!==!1&&w.smooth,E=this._pt=new je(this._pt,a,me,0,1,w.renderTransform,w,0,-1),E.dep=1),_==="scale")this._pt=new je(this._pt,w,"scaleY",w.scaleY,(y?jr(w.scaleY,y+h):h)-w.scaleY||0,Cl),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){C.push(Je,0,a[Je]),u=qE(u),w.svg?Ll(t,u,0,b,0,this):(m=parseFloat(u.split(" ")[2])||0,m!==w.zOrigin&&Ti(this,w,"zOrigin",w.zOrigin,m),Ti(this,a,_,wa(l),wa(u)));continue}else if(_==="svgOrigin"){Ll(t,u,1,b,0,this);continue}else if(_ in zm){ZE(this,w,_,f,y?jr(f,y+u):u);continue}else if(_==="smoothOrigin"){Ti(this,w,"smooth",w.smooth,u);continue}else if(_==="force3D"){w[_]=u;continue}else if(_==="transform"){QE(this,u,t);continue}}else _ in a||(_=ds(_)||_);if(v||(h||h===0)&&(f||f===0)&&!IE.test(u)&&_ in a)p=(l+"").substr((f+"").length),h||(h=0),m=Oe(u)||(_ in un.units?un.units[_]:p),p!==m&&(f=Oi(t,_,l,m)),this._pt=new je(this._pt,v?w:a,_,f,(y?jr(f,y+h):h)-f,!v&&(m==="px"||_==="zIndex")&&e.autoRound!==!1?FE:Cl),this._pt.u=m||0,v&&L!==u?(this._pt.b=l,this._pt.e=L,this._pt.r=UE):p!==m&&m!=="%"&&(this._pt.b=l,this._pt.r=OE);else if(_ in a)YE.call(this,t,_,l,y?y+u:u);else if(_ in t)this.add(t,_,l||t[_],y?y+u:u,i,s);else if(_!=="parseTransform"){Wu(_,u);continue}v||(_ in a?C.push(_,0,a[_]):typeof t[_]=="function"?C.push(_,2,t[_]()):C.push(_,1,l||t[_])),o.push(_)}}S&&Pm(this)},render:function(t,e){if(e.tween._time||!eh())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:ei,aliases:Bn,getSetter:function(t,e,n){var i=Bn[e];return i&&i.indexOf(",")<0&&(e=i),e in li&&e!==Je&&(t._gsap.x||ei(t,"x"))?n&&Rf===n?e==="scale"?VE:kE:(Rf=n||{})&&(e==="scale"?HE:GE):t.style&&!Vu(t.style[e])?BE:~e.indexOf("-")?zE:Zu(t,e)},core:{_removeProperty:Ni,_getMatrix:ih}};Qe.utils.checkPrefix=ds;Qe.core.getStyleSaver=Om;(function(r,t,e,n){var i=Ke(r+","+t+","+e,function(s){li[s]=1});Ke(t,function(s){un.units[s]="deg",zm[s]=1}),Bn[i[13]]=r+","+t,Ke(n,function(s){var o=s.split(":");Bn[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Ke("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){un.units[r]="px"});Qe.registerPlugin(Hm);var Ca=Qe.registerPlugin(Hm)||Qe;Ca.core.Tween;/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rh="169",tS=0,Bf=1,eS=2,Gm=1,nS=2,Qn=3,Ui=0,He=1,ze=2,wi=0,Qr=1,zf=2,kf=3,Vf=4,iS=5,er=100,rS=101,sS=102,oS=103,aS=104,cS=200,lS=201,uS=202,hS=203,Dl=204,Il=205,fS=206,dS=207,pS=208,mS=209,_S=210,gS=211,vS=212,xS=213,yS=214,Nl=0,Ol=1,Ul=2,ps=3,Fl=4,Bl=5,zl=6,kl=7,Wm=0,ES=1,SS=2,Ci=0,MS=1,TS=2,bS=3,Xm=4,AS=5,wS=6,CS=7,$m=300,ms=301,_s=302,Vl=303,Hl=304,qa=306,Gl=1e3,or=1001,Wl=1002,Sn=1003,RS=1004,Co=1005,Dn=1006,Cc=1007,ar=1008,ui=1009,Ym=1010,qm=1011,ro=1012,sh=1013,gr=1014,ni=1015,ho=1016,oh=1017,ah=1018,gs=1020,Km=35902,jm=1021,Jm=1022,In=1023,Zm=1024,Qm=1025,ts=1026,vs=1027,t_=1028,ch=1029,e_=1030,lh=1031,uh=1033,la=33776,ua=33777,ha=33778,fa=33779,Xl=35840,$l=35841,Yl=35842,ql=35843,Kl=36196,jl=37492,Jl=37496,Zl=37808,Ql=37809,tu=37810,eu=37811,nu=37812,iu=37813,ru=37814,su=37815,ou=37816,au=37817,cu=37818,lu=37819,uu=37820,hu=37821,da=36492,fu=36494,du=36495,n_=36283,pu=36284,mu=36285,_u=36286,PS=3200,LS=3201,i_=0,DS=1,Ei="",Ln="srgb",Hi="srgb-linear",hh="display-p3",Ka="display-p3-linear",Ra="linear",ue="srgb",Pa="rec709",La="p3",Cr=7680,Hf=519,IS=512,NS=513,OS=514,r_=515,US=516,FS=517,BS=518,zS=519,Gf=35044,Wf="300 es",ii=2e3,Da=2001;class bs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],pa=Math.PI/180,gu=180/Math.PI;function fo(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[r&255]+Ie[r>>8&255]+Ie[r>>16&255]+Ie[r>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function Le(r,t,e){return Math.max(t,Math.min(e,r))}function kS(r,t){return(r%t+t)%t}function Rc(r,t,e){return(1-e)*r+e*t}function Ps(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Xe(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class mt{constructor(t=0,e=0){mt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ut{constructor(t,e,n,i,s,o,a,c,l){Ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l)}set(t,e,n,i,s,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],_=i[0],p=i[3],m=i[6],y=i[1],v=i[4],E=i[7],w=i[2],b=i[5],S=i[8];return s[0]=o*_+a*y+c*w,s[3]=o*p+a*v+c*b,s[6]=o*m+a*E+c*S,s[1]=l*_+u*y+h*w,s[4]=l*p+u*v+h*b,s[7]=l*m+u*E+h*S,s[2]=f*_+d*y+g*w,s[5]=f*p+d*v+g*b,s[8]=f*m+d*E+g*S,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*s*u+n*a*c+i*s*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*o-a*l,f=a*c-u*s,d=l*s-o*c,g=e*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(i*l-u*n)*_,t[2]=(a*n-i*o)*_,t[3]=f*_,t[4]=(u*e-i*c)*_,t[5]=(i*s-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Pc.makeScale(t,e)),this}rotate(t){return this.premultiply(Pc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Pc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Pc=new Ut;function s_(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Ia(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function VS(){const r=Ia("canvas");return r.style.display="block",r}const Xf={};function ma(r){r in Xf||(Xf[r]=!0,console.warn(r))}function HS(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function GS(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function WS(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const $f=new Ut().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Yf=new Ut().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ls={[Hi]:{transfer:Ra,primaries:Pa,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r,fromReference:r=>r},[Ln]:{transfer:ue,primaries:Pa,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Ka]:{transfer:Ra,primaries:La,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.applyMatrix3(Yf),fromReference:r=>r.applyMatrix3($f)},[hh]:{transfer:ue,primaries:La,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.convertSRGBToLinear().applyMatrix3(Yf),fromReference:r=>r.applyMatrix3($f).convertLinearToSRGB()}},XS=new Set([Hi,Ka]),Zt={enabled:!0,_workingColorSpace:Hi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!XS.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=Ls[t].toReference,i=Ls[e].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return Ls[r].primaries},getTransfer:function(r){return r===Ei?Ra:Ls[r].transfer},getLuminanceCoefficients:function(r,t=this._workingColorSpace){return r.fromArray(Ls[t].luminanceCoefficients)}};function es(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Lc(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Rr;class $S{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Rr===void 0&&(Rr=Ia("canvas")),Rr.width=t.width,Rr.height=t.height;const n=Rr.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Rr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ia("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=es(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(es(e[n]/255)*255):e[n]=es(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let YS=0;class o_{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:YS++}),this.uuid=fo(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Dc(i[o].image)):s.push(Dc(i[o]))}else s=Dc(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function Dc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?$S.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let qS=0;class Ze extends bs{constructor(t=Ze.DEFAULT_IMAGE,e=Ze.DEFAULT_MAPPING,n=or,i=or,s=Dn,o=ar,a=In,c=ui,l=Ze.DEFAULT_ANISOTROPY,u=Ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qS++}),this.uuid=fo(),this.name="",this.source=new o_(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$m)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Gl:t.x=t.x-Math.floor(t.x);break;case or:t.x=t.x<0?0:1;break;case Wl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Gl:t.y=t.y-Math.floor(t.y);break;case or:t.y=t.y<0?0:1;break;case Wl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ze.DEFAULT_IMAGE=null;Ze.DEFAULT_MAPPING=$m;Ze.DEFAULT_ANISOTROPY=1;class ne{constructor(t=0,e=0,n=0,i=1){ne.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const c=t.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],_=c[2],p=c[6],m=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,E=(d+1)/2,w=(m+1)/2,b=(u+f)/4,S=(h+_)/4,C=(g+p)/4;return v>E&&v>w?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=b/n,s=S/n):E>w?E<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(E),n=b/i,s=C/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=S/s,i=C/s),this.set(n,i,s,e),this}let y=Math.sqrt((p-g)*(p-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(h-_)/y,this.z=(f-u)/y,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class KS extends bs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ne(0,0,t,e),this.scissorTest=!1,this.viewport=new ne(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Ze(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new o_(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vr extends KS{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class a_ extends Ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Sn,this.minFilter=Sn,this.wrapR=or,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class jS extends Ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Sn,this.minFilter=Sn,this.wrapR=or,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class po{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const f=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(h!==_||c!==f||l!==d||u!==g){let p=1-a;const m=c*f+l*d+u*g+h*_,y=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const w=Math.sqrt(v),b=Math.atan2(w,m*y);p=Math.sin(p*b)/w,a=Math.sin(a*b)/w}const E=a*y;if(c=c*p+f*E,l=l*p+d*E,u=u*p+g*E,h=h*p+_*E,p===1-a){const w=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=w,l*=w,u*=w,h*=w}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+u*h+c*d-l*f,t[e+1]=c*g+u*f+l*h-a*d,t[e+2]=l*g+u*d+a*f-c*h,t[e+3]=u*g-a*h-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(i/2),h=a(s/2),f=c(n/2),d=c(i/2),g=c(s/2);switch(o){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],h=e[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(o-i)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+l)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-l)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Le(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+i*l-s*c,this._y=i*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-i*a,this._w=o*u-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-e)*u)/l,f=Math.sin(e*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qf.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),u=2*(a*e-s*i),h=2*(s*n-o*e);return this.x=e+c*l+o*h-a*u,this.y=n+c*u+a*l-s*h,this.z=i+c*h+s*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ic.copy(this).projectOnVector(t),this.sub(Ic)}reflect(t){return this.sub(Ic.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ic=new P,qf=new po;class mo{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Cn):Cn.fromBufferAttribute(s,o),Cn.applyMatrix4(t.matrixWorld),this.expandByPoint(Cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ro.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ro.copy(n.boundingBox)),Ro.applyMatrix4(t.matrixWorld),this.union(Ro)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Cn),Cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ds),Po.subVectors(this.max,Ds),Pr.subVectors(t.a,Ds),Lr.subVectors(t.b,Ds),Dr.subVectors(t.c,Ds),mi.subVectors(Lr,Pr),_i.subVectors(Dr,Lr),$i.subVectors(Pr,Dr);let e=[0,-mi.z,mi.y,0,-_i.z,_i.y,0,-$i.z,$i.y,mi.z,0,-mi.x,_i.z,0,-_i.x,$i.z,0,-$i.x,-mi.y,mi.x,0,-_i.y,_i.x,0,-$i.y,$i.x,0];return!Nc(e,Pr,Lr,Dr,Po)||(e=[1,0,0,0,1,0,0,0,1],!Nc(e,Pr,Lr,Dr,Po))?!1:(Lo.crossVectors(mi,_i),e=[Lo.x,Lo.y,Lo.z],Nc(e,Pr,Lr,Dr,Po))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(qn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const qn=[new P,new P,new P,new P,new P,new P,new P,new P],Cn=new P,Ro=new mo,Pr=new P,Lr=new P,Dr=new P,mi=new P,_i=new P,$i=new P,Ds=new P,Po=new P,Lo=new P,Yi=new P;function Nc(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Yi.fromArray(r,s);const a=i.x*Math.abs(Yi.x)+i.y*Math.abs(Yi.y)+i.z*Math.abs(Yi.z),c=t.dot(Yi),l=e.dot(Yi),u=n.dot(Yi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const JS=new mo,Is=new P,Oc=new P;class _o{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):JS.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Is.subVectors(t,this.center);const e=Is.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Is,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Oc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Is.copy(t.center).add(Oc)),this.expandByPoint(Is.copy(t.center).sub(Oc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Kn=new P,Uc=new P,Do=new P,gi=new P,Fc=new P,Io=new P,Bc=new P;class fh{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Kn.copy(this.origin).addScaledVector(this.direction,e),Kn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Uc.copy(t).add(e).multiplyScalar(.5),Do.copy(e).sub(t).normalize(),gi.copy(this.origin).sub(Uc);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Do),a=gi.dot(this.direction),c=-gi.dot(Do),l=gi.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*c-a,f=o*a-c,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-s,-c),s),d=f*(f+2*c)+l):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Uc).addScaledVector(Do,f),d}intersectSphere(t,e){Kn.subVectors(t.center,this.origin);const n=Kn.dot(this.direction),i=Kn.dot(Kn)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,i=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,i=(t.min.x-f.x)*l),u>=0?(s=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),h>=0?(a=(t.min.z-f.z)*h,c=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,c=(t.min.z-f.z)*h),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Kn)!==null}intersectTriangle(t,e,n,i,s){Fc.subVectors(e,t),Io.subVectors(n,t),Bc.crossVectors(Fc,Io);let o=this.direction.dot(Bc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;gi.subVectors(this.origin,t);const c=a*this.direction.dot(Io.crossVectors(gi,Io));if(c<0)return null;const l=a*this.direction.dot(Fc.cross(gi));if(l<0||c+l>o)return null;const u=-a*gi.dot(Bc);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ce{constructor(t,e,n,i,s,o,a,c,l,u,h,f,d,g,_,p){ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l,u,h,f,d,g,_,p)}set(t,e,n,i,s,o,a,c,l,u,h,f,d,g,_,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ce().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ir.setFromMatrixColumn(t,0).length(),s=1/Ir.setFromMatrixColumn(t,1).length(),o=1/Ir.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=o*u,d=o*h,g=a*u,_=a*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=d+g*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*u,d=c*h,g=l*u,_=l*h;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*u,d=c*h,g=l*u,_=l*h;e[0]=f-_*a,e[4]=-o*h,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=_-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*u,d=o*h,g=a*u,_=a*h;e[0]=c*u,e[4]=g*l-d,e[8]=f*l+_,e[1]=c*h,e[5]=_*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=_-f*h,e[8]=g*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=d*h+g,e[10]=f-_*h}else if(t.order==="XZY"){const f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=f*h+_,e[5]=o*u,e[9]=d*h-g,e[2]=g*h-d,e[6]=a*u,e[10]=_*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ZS,t,QS)}lookAt(t,e,n){const i=this.elements;return nn.subVectors(t,e),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),vi.crossVectors(n,nn),vi.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),vi.crossVectors(n,nn)),vi.normalize(),No.crossVectors(nn,vi),i[0]=vi.x,i[4]=No.x,i[8]=nn.x,i[1]=vi.y,i[5]=No.y,i[9]=nn.y,i[2]=vi.z,i[6]=No.z,i[10]=nn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],_=n[6],p=n[10],m=n[14],y=n[3],v=n[7],E=n[11],w=n[15],b=i[0],S=i[4],C=i[8],L=i[12],x=i[1],M=i[5],O=i[9],U=i[13],V=i[2],Y=i[6],z=i[10],$=i[14],W=i[3],rt=i[7],st=i[11],ct=i[15];return s[0]=o*b+a*x+c*V+l*W,s[4]=o*S+a*M+c*Y+l*rt,s[8]=o*C+a*O+c*z+l*st,s[12]=o*L+a*U+c*$+l*ct,s[1]=u*b+h*x+f*V+d*W,s[5]=u*S+h*M+f*Y+d*rt,s[9]=u*C+h*O+f*z+d*st,s[13]=u*L+h*U+f*$+d*ct,s[2]=g*b+_*x+p*V+m*W,s[6]=g*S+_*M+p*Y+m*rt,s[10]=g*C+_*O+p*z+m*st,s[14]=g*L+_*U+p*$+m*ct,s[3]=y*b+v*x+E*V+w*W,s[7]=y*S+v*M+E*Y+w*rt,s[11]=y*C+v*O+E*z+w*st,s[15]=y*L+v*U+E*$+w*ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],f=t[10],d=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+s*c*h-i*l*h-s*a*f+n*l*f+i*a*d-n*c*d)+_*(+e*c*d-e*l*f+s*o*f-i*o*d+i*l*u-s*c*u)+p*(+e*l*h-e*a*d-s*o*h+n*o*d+s*a*u-n*l*u)+m*(-i*a*u-e*c*h+e*a*f+i*o*h-n*o*f+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],f=t[10],d=t[11],g=t[12],_=t[13],p=t[14],m=t[15],y=h*p*l-_*f*l+_*c*d-a*p*d-h*c*m+a*f*m,v=g*f*l-u*p*l-g*c*d+o*p*d+u*c*m-o*f*m,E=u*_*l-g*h*l+g*a*d-o*_*d-u*a*m+o*h*m,w=g*h*c-u*_*c-g*a*f+o*_*f+u*a*p-o*h*p,b=e*y+n*v+i*E+s*w;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/b;return t[0]=y*S,t[1]=(_*f*s-h*p*s-_*i*d+n*p*d+h*i*m-n*f*m)*S,t[2]=(a*p*s-_*c*s+_*i*l-n*p*l-a*i*m+n*c*m)*S,t[3]=(h*c*s-a*f*s-h*i*l+n*f*l+a*i*d-n*c*d)*S,t[4]=v*S,t[5]=(u*p*s-g*f*s+g*i*d-e*p*d-u*i*m+e*f*m)*S,t[6]=(g*c*s-o*p*s-g*i*l+e*p*l+o*i*m-e*c*m)*S,t[7]=(o*f*s-u*c*s+u*i*l-e*f*l-o*i*d+e*c*d)*S,t[8]=E*S,t[9]=(g*h*s-u*_*s-g*n*d+e*_*d+u*n*m-e*h*m)*S,t[10]=(o*_*s-g*a*s+g*n*l-e*_*l-o*n*m+e*a*m)*S,t[11]=(u*a*s-o*h*s-u*n*l+e*h*l+o*n*d-e*a*d)*S,t[12]=w*S,t[13]=(u*_*i-g*h*i+g*n*f-e*_*f-u*n*p+e*h*p)*S,t[14]=(g*a*i-o*_*i-g*n*c+e*_*c+o*n*p-e*a*p)*S,t[15]=(o*h*i-u*a*i+u*n*c-e*h*c-o*n*f+e*a*f)*S,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,u*a+n,u*c-i*o,0,l*c-i*a,u*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,u=o+o,h=a+a,f=s*l,d=s*u,g=s*h,_=o*u,p=o*h,m=a*h,y=c*l,v=c*u,E=c*h,w=n.x,b=n.y,S=n.z;return i[0]=(1-(_+m))*w,i[1]=(d+E)*w,i[2]=(g-v)*w,i[3]=0,i[4]=(d-E)*b,i[5]=(1-(f+m))*b,i[6]=(p+y)*b,i[7]=0,i[8]=(g+v)*S,i[9]=(p-y)*S,i[10]=(1-(f+_))*S,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=Ir.set(i[0],i[1],i[2]).length();const o=Ir.set(i[4],i[5],i[6]).length(),a=Ir.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Rn.copy(this);const l=1/s,u=1/o,h=1/a;return Rn.elements[0]*=l,Rn.elements[1]*=l,Rn.elements[2]*=l,Rn.elements[4]*=u,Rn.elements[5]*=u,Rn.elements[6]*=u,Rn.elements[8]*=h,Rn.elements[9]*=h,Rn.elements[10]*=h,e.setFromRotationMatrix(Rn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=ii){const c=this.elements,l=2*s/(e-t),u=2*s/(n-i),h=(e+t)/(e-t),f=(n+i)/(n-i);let d,g;if(a===ii)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Da)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=ii){const c=this.elements,l=1/(e-t),u=1/(n-i),h=1/(o-s),f=(e+t)*l,d=(n+i)*u;let g,_;if(a===ii)g=(o+s)*h,_=-2*h;else if(a===Da)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ir=new P,Rn=new ce,ZS=new P(0,0,0),QS=new P(1,1,1),vi=new P,No=new P,nn=new P,Kf=new ce,jf=new po;class Wn{constructor(t=0,e=0,n=0,i=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Le(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Le(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Le(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Le(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Le(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Le(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Kf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Kf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return jf.setFromEuler(this),this.setFromQuaternion(jf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class c_{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let tM=0;const Jf=new P,Nr=new po,jn=new ce,Oo=new P,Ns=new P,eM=new P,nM=new po,Zf=new P(1,0,0),Qf=new P(0,1,0),td=new P(0,0,1),ed={type:"added"},iM={type:"removed"},Or={type:"childadded",child:null},zc={type:"childremoved",child:null};class Te extends bs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tM++}),this.uuid=fo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new P,e=new Wn,n=new po,i=new P(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ce},normalMatrix:{value:new Ut}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new c_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Nr.setFromAxisAngle(t,e),this.quaternion.multiply(Nr),this}rotateOnWorldAxis(t,e){return Nr.setFromAxisAngle(t,e),this.quaternion.premultiply(Nr),this}rotateX(t){return this.rotateOnAxis(Zf,t)}rotateY(t){return this.rotateOnAxis(Qf,t)}rotateZ(t){return this.rotateOnAxis(td,t)}translateOnAxis(t,e){return Jf.copy(t).applyQuaternion(this.quaternion),this.position.add(Jf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zf,t)}translateY(t){return this.translateOnAxis(Qf,t)}translateZ(t){return this.translateOnAxis(td,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(jn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Oo.copy(t):Oo.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?jn.lookAt(Ns,Oo,this.up):jn.lookAt(Oo,Ns,this.up),this.quaternion.setFromRotationMatrix(jn),i&&(jn.extractRotation(i.matrixWorld),Nr.setFromRotationMatrix(jn),this.quaternion.premultiply(Nr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ed),Or.child=t,this.dispatchEvent(Or),Or.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(iM),zc.child=t,this.dispatchEvent(zc),zc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),jn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),jn.multiply(t.parent.matrixWorld)),t.applyMatrix4(jn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ed),Or.child=t,this.dispatchEvent(Or),Or.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,t,eM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,nM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(t.shapes,h)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Te.DEFAULT_UP=new P(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pn=new P,Jn=new P,kc=new P,Zn=new P,Ur=new P,Fr=new P,nd=new P,Vc=new P,Hc=new P,Gc=new P,Wc=new ne,Xc=new ne,$c=new ne;class xn{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Pn.subVectors(t,e),i.cross(Pn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Pn.subVectors(i,e),Jn.subVectors(n,e),kc.subVectors(t,e);const o=Pn.dot(Pn),a=Pn.dot(Jn),c=Pn.dot(kc),l=Jn.dot(Jn),u=Jn.dot(kc),h=o*l-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(l*c-a*u)*f,g=(o*u-a*c)*f;return s.set(1-d-g,g,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(t,e,n,i,s,o,a,c){return this.getBarycoord(t,e,n,i,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Zn.x),c.addScaledVector(o,Zn.y),c.addScaledVector(a,Zn.z),c)}static getInterpolatedAttribute(t,e,n,i,s,o){return Wc.setScalar(0),Xc.setScalar(0),$c.setScalar(0),Wc.fromBufferAttribute(t,e),Xc.fromBufferAttribute(t,n),$c.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Wc,s.x),o.addScaledVector(Xc,s.y),o.addScaledVector($c,s.z),o}static isFrontFacing(t,e,n,i){return Pn.subVectors(n,e),Jn.subVectors(t,e),Pn.cross(Jn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pn.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),Pn.cross(Jn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return xn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return xn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return xn.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return xn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return xn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;Ur.subVectors(i,n),Fr.subVectors(s,n),Vc.subVectors(t,n);const c=Ur.dot(Vc),l=Fr.dot(Vc);if(c<=0&&l<=0)return e.copy(n);Hc.subVectors(t,i);const u=Ur.dot(Hc),h=Fr.dot(Hc);if(u>=0&&h<=u)return e.copy(i);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(Ur,o);Gc.subVectors(t,s);const d=Ur.dot(Gc),g=Fr.dot(Gc);if(g>=0&&d<=g)return e.copy(s);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Fr,a);const p=u*g-d*h;if(p<=0&&h-u>=0&&d-g>=0)return nd.subVectors(s,i),a=(h-u)/(h-u+(d-g)),e.copy(i).addScaledVector(nd,a);const m=1/(p+_+f);return o=_*m,a=f*m,e.copy(n).addScaledVector(Ur,o).addScaledVector(Fr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const l_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},Uo={h:0,s:0,l:0};function Yc(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class Bt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ln){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Zt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Zt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Zt.workingColorSpace){if(t=kS(t,1),e=Le(e,0,1),n=Le(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Yc(o,s,t+1/3),this.g=Yc(o,s,t),this.b=Yc(o,s,t-1/3)}return Zt.toWorkingColorSpace(this,i),this}setStyle(t,e=Ln){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ln){const n=l_[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=es(t.r),this.g=es(t.g),this.b=es(t.b),this}copyLinearToSRGB(t){return this.r=Lc(t.r),this.g=Lc(t.g),this.b=Lc(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ln){return Zt.fromWorkingColorSpace(Ne.copy(this),t),Math.round(Le(Ne.r*255,0,255))*65536+Math.round(Le(Ne.g*255,0,255))*256+Math.round(Le(Ne.b*255,0,255))}getHexString(t=Ln){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Zt.workingColorSpace){Zt.fromWorkingColorSpace(Ne.copy(this),e);const n=Ne.r,i=Ne.g,s=Ne.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(i-s)/h+(i<s?6:0);break;case i:c=(s-n)/h+2;break;case s:c=(n-i)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=Zt.workingColorSpace){return Zt.fromWorkingColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=Ln){Zt.fromWorkingColorSpace(Ne.copy(this),t);const e=Ne.r,n=Ne.g,i=Ne.b;return t!==Ln?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(xi),this.setHSL(xi.h+t,xi.s+e,xi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(xi),t.getHSL(Uo);const n=Rc(xi.h,Uo.h,e),i=Rc(xi.s,Uo.s,e),s=Rc(xi.l,Uo.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ne=new Bt;Bt.NAMES=l_;let rM=0;class Mr extends bs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rM++}),this.uuid=fo(),this.name="",this.type="Material",this.blending=Qr,this.side=Ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Dl,this.blendDst=Il,this.blendEquation=er,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Cr,this.stencilZFail=Cr,this.stencilZPass=Cr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qr&&(n.blending=this.blending),this.side!==Ui&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Dl&&(n.blendSrc=this.blendSrc),this.blendDst!==Il&&(n.blendDst=this.blendDst),this.blendEquation!==er&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ps&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Cr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Cr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Cr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class fi extends Mr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Wm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new P,Fo=new mt;class Vn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Gf,this.updateRanges=[],this.gpuType=ni,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Fo.fromBufferAttribute(this,e),Fo.applyMatrix3(t),this.setXY(e,Fo.x,Fo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ps(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Xe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ps(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ps(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ps(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ps(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),i=Xe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),i=Xe(i,this.array),s=Xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Gf&&(t.usage=this.usage),t}}class u_ extends Vn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class h_ extends Vn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ft extends Vn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let sM=0;const gn=new ce,qc=new Te,Br=new P,rn=new mo,Os=new mo,we=new P;class ae extends bs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sM++}),this.uuid=fo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(s_(t)?h_:u_)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ut().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return gn.makeRotationFromQuaternion(t),this.applyMatrix4(gn),this}rotateX(t){return gn.makeRotationX(t),this.applyMatrix4(gn),this}rotateY(t){return gn.makeRotationY(t),this.applyMatrix4(gn),this}rotateZ(t){return gn.makeRotationZ(t),this.applyMatrix4(gn),this}translate(t,e,n){return gn.makeTranslation(t,e,n),this.applyMatrix4(gn),this}scale(t,e,n){return gn.makeScale(t,e,n),this.applyMatrix4(gn),this}lookAt(t){return qc.lookAt(t),qc.updateMatrix(),this.applyMatrix4(qc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Br).negate(),this.translate(Br.x,Br.y,Br.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ft(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];rn.setFromBufferAttribute(s),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _o);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(rn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Os.setFromBufferAttribute(a),this.morphTargetsRelative?(we.addVectors(rn.min,Os.min),rn.expandByPoint(we),we.addVectors(rn.max,Os.max),rn.expandByPoint(we)):(rn.expandByPoint(Os.min),rn.expandByPoint(Os.max))}rn.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)we.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(we));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)we.fromBufferAttribute(a,l),c&&(Br.fromBufferAttribute(t,l),we.add(Br)),i=Math.max(i,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<n.count;C++)a[C]=new P,c[C]=new P;const l=new P,u=new P,h=new P,f=new mt,d=new mt,g=new mt,_=new P,p=new P;function m(C,L,x){l.fromBufferAttribute(n,C),u.fromBufferAttribute(n,L),h.fromBufferAttribute(n,x),f.fromBufferAttribute(s,C),d.fromBufferAttribute(s,L),g.fromBufferAttribute(s,x),u.sub(l),h.sub(l),d.sub(f),g.sub(f);const M=1/(d.x*g.y-g.x*d.y);isFinite(M)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(M),p.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(M),a[C].add(_),a[L].add(_),a[x].add(_),c[C].add(p),c[L].add(p),c[x].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let C=0,L=y.length;C<L;++C){const x=y[C],M=x.start,O=x.count;for(let U=M,V=M+O;U<V;U+=3)m(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const v=new P,E=new P,w=new P,b=new P;function S(C){w.fromBufferAttribute(i,C),b.copy(w);const L=a[C];v.copy(L),v.sub(w.multiplyScalar(w.dot(L))).normalize(),E.crossVectors(b,L);const M=E.dot(c[C])<0?-1:1;o.setXYZW(C,v.x,v.y,v.z,M)}for(let C=0,L=y.length;C<L;++C){const x=y[C],M=x.start,O=x.count;for(let U=M,V=M+O;U<V;U+=3)S(t.getX(U+0)),S(t.getX(U+1)),S(t.getX(U+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Vn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new P,s=new P,o=new P,a=new P,c=new P,l=new P,u=new P,h=new P;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),p=t.getX(f+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,p),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let d=0,g=0;for(let _=0,p=c.length;_<p;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*u;for(let m=0;m<u;m++)f[g++]=l[d++]}return new Vn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ae,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(t.data))}u.length>0&&(i[c]=u,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(e))}const s=t.morphAttributes;for(const l in s){const u=[],h=s[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const id=new ce,qi=new fh,Bo=new _o,rd=new P,zo=new P,ko=new P,Vo=new P,Kc=new P,Ho=new P,sd=new P,Go=new P;class pt extends Te{constructor(t=new ae,e=new fi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){Ho.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],h=s[c];u!==0&&(Kc.fromBufferAttribute(h,t),o?Ho.addScaledVector(Kc,u):Ho.addScaledVector(Kc.sub(e),u))}e.add(Ho)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Bo.copy(n.boundingSphere),Bo.applyMatrix4(s),qi.copy(t.ray).recast(t.near),!(Bo.containsPoint(qi.origin)===!1&&(qi.intersectSphere(Bo,rd)===null||qi.origin.distanceToSquared(rd)>(t.far-t.near)**2))&&(id.copy(s).invert(),qi.copy(t.ray).applyMatrix4(id),!(n.boundingBox!==null&&qi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,qi)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=o[p.materialIndex],y=Math.max(p.start,d.start),v=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let E=y,w=v;E<w;E+=3){const b=a.getX(E),S=a.getX(E+1),C=a.getX(E+2);i=Wo(this,m,t,n,l,u,h,b,S,C),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const y=a.getX(p),v=a.getX(p+1),E=a.getX(p+2);i=Wo(this,o,t,n,l,u,h,y,v,E),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=o[p.materialIndex],y=Math.max(p.start,d.start),v=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let E=y,w=v;E<w;E+=3){const b=E,S=E+1,C=E+2;i=Wo(this,m,t,n,l,u,h,b,S,C),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const y=p,v=p+1,E=p+2;i=Wo(this,o,t,n,l,u,h,y,v,E),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function oM(r,t,e,n,i,s,o,a){let c;if(t.side===He?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,t.side===Ui,a),c===null)return null;Go.copy(a),Go.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(Go);return l<e.near||l>e.far?null:{distance:l,point:Go.clone(),object:r}}function Wo(r,t,e,n,i,s,o,a,c,l){r.getVertexPosition(a,zo),r.getVertexPosition(c,ko),r.getVertexPosition(l,Vo);const u=oM(r,t,e,n,zo,ko,Vo,sd);if(u){const h=new P;xn.getBarycoord(sd,zo,ko,Vo,h),i&&(u.uv=xn.getInterpolatedAttribute(i,a,c,l,h,new mt)),s&&(u.uv1=xn.getInterpolatedAttribute(s,a,c,l,h,new mt)),o&&(u.normal=xn.getInterpolatedAttribute(o,a,c,l,h,new P),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new P,materialIndex:0};xn.getNormal(zo,ko,Vo,f.normal),u.face=f,u.barycoord=h}return u}class he extends ae{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ft(l,3)),this.setAttribute("normal",new Ft(u,3)),this.setAttribute("uv",new Ft(h,2));function g(_,p,m,y,v,E,w,b,S,C,L){const x=E/S,M=w/C,O=E/2,U=w/2,V=b/2,Y=S+1,z=C+1;let $=0,W=0;const rt=new P;for(let st=0;st<z;st++){const ct=st*M-U;for(let At=0;At<Y;At++){const Nt=At*x-O;rt[_]=Nt*y,rt[p]=ct*v,rt[m]=V,l.push(rt.x,rt.y,rt.z),rt[_]=0,rt[p]=0,rt[m]=b>0?1:-1,u.push(rt.x,rt.y,rt.z),h.push(At/S),h.push(1-st/C),$+=1}}for(let st=0;st<C;st++)for(let ct=0;ct<S;ct++){const At=f+ct+Y*st,Nt=f+ct+Y*(st+1),D=f+(ct+1)+Y*(st+1),H=f+(ct+1)+Y*st;c.push(At,Nt,H),c.push(Nt,D,H),W+=6}a.addGroup(d,W,L),d+=W,f+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new he(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function xs(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Be(r){const t={};for(let e=0;e<r.length;e++){const n=xs(r[e]);for(const i in n)t[i]=n[i]}return t}function aM(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function f_(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}const cM={clone:xs,merge:Be};var lM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,uM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Fi extends Mr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lM,this.fragmentShader=uM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=xs(t.uniforms),this.uniformsGroups=aM(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class d_ extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=ii}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const yi=new P,od=new mt,ad=new mt;class on extends d_{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=gu*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(pa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return gu*2*Math.atan(Math.tan(pa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(yi.x,yi.y).multiplyScalar(-t/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yi.x,yi.y).multiplyScalar(-t/yi.z)}getViewSize(t,e){return this.getViewBounds(t,od,ad),e.subVectors(ad,od)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(pa*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const zr=-90,kr=1;class hM extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new on(zr,kr,t,e);i.layers=this.layers,this.add(i);const s=new on(zr,kr,t,e);s.layers=this.layers,this.add(s);const o=new on(zr,kr,t,e);o.layers=this.layers,this.add(o);const a=new on(zr,kr,t,e);a.layers=this.layers,this.add(a);const c=new on(zr,kr,t,e);c.layers=this.layers,this.add(c);const l=new on(zr,kr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,c]=e;for(const l of e)this.remove(l);if(t===ii)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Da)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class p_ extends Ze{constructor(t,e,n,i,s,o,a,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:ms,super(t,e,n,i,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class fM extends vr{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new p_(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Dn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new he(5,5,5),s=new Fi({name:"CubemapFromEquirect",uniforms:xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:He,blending:wi});s.uniforms.tEquirect.value=e;const o=new pt(i,s),a=e.minFilter;return e.minFilter===ar&&(e.minFilter=Dn),new hM(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const jc=new P,dM=new P,pM=new Ut;class Qi{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=jc.subVectors(n,e).cross(dM.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(jc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||pM.getNormalMatrix(t),i=this.coplanarPoint(jc).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ki=new _o,Xo=new P;class dh{constructor(t=new Qi,e=new Qi,n=new Qi,i=new Qi,s=new Qi,o=new Qi){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ii){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],c=i[3],l=i[4],u=i[5],h=i[6],f=i[7],d=i[8],g=i[9],_=i[10],p=i[11],m=i[12],y=i[13],v=i[14],E=i[15];if(n[0].setComponents(c-s,f-l,p-d,E-m).normalize(),n[1].setComponents(c+s,f+l,p+d,E+m).normalize(),n[2].setComponents(c+o,f+u,p+g,E+y).normalize(),n[3].setComponents(c-o,f-u,p-g,E-y).normalize(),n[4].setComponents(c-a,f-h,p-_,E-v).normalize(),e===ii)n[5].setComponents(c+a,f+h,p+_,E+v).normalize();else if(e===Da)n[5].setComponents(a,h,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ki.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ki.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ki)}intersectsSprite(t){return Ki.center.set(0,0,0),Ki.radius=.7071067811865476,Ki.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ki)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Xo.x=i.normal.x>0?t.max.x:t.min.x,Xo.y=i.normal.y>0?t.max.y:t.min.y,Xo.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Xo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function m_(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function mM(r){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,h=l.byteLength,f=r.createBuffer();r.bindBuffer(c,f),r.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=r.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=r.SHORT;else if(l instanceof Uint32Array)d=r.UNSIGNED_INT;else if(l instanceof Int32Array)d=r.INT;else if(l instanceof Int8Array)d=r.BYTE;else if(l instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(r.bindBuffer(l,a),h.length===0)r.bufferSubData(l,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],_=h[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const _=h[d];r.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(r.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:s,update:o}}class Xn extends ae{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,u=c+1,h=t/a,f=e/c,d=[],g=[],_=[],p=[];for(let m=0;m<u;m++){const y=m*f-o;for(let v=0;v<l;v++){const E=v*h-s;g.push(E,-y,0),_.push(0,0,1),p.push(v/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let y=0;y<a;y++){const v=y+l*m,E=y+l*(m+1),w=y+1+l*(m+1),b=y+1+l*m;d.push(v,E,b),d.push(E,w,b)}this.setIndex(d),this.setAttribute("position",new Ft(g,3)),this.setAttribute("normal",new Ft(_,3)),this.setAttribute("uv",new Ft(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xn(t.width,t.height,t.widthSegments,t.heightSegments)}}var _M=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gM=`#ifdef USE_ALPHAHASH
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
#endif`,vM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,EM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,SM=`#ifdef USE_AOMAP
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
#endif`,MM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,TM=`#ifdef USE_BATCHING
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
#endif`,bM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,AM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,CM=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,RM=`#ifdef USE_IRIDESCENCE
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
#endif`,PM=`#ifdef USE_BUMPMAP
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
#endif`,LM=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,DM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,IM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,NM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,OM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,UM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,FM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,BM=`#if defined( USE_COLOR_ALPHA )
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
#endif`,zM=`#define PI 3.141592653589793
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
} // validated`,kM=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,VM=`vec3 transformedNormal = objectNormal;
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
#endif`,HM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,GM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,WM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,XM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$M="gl_FragColor = linearToOutputTexel( gl_FragColor );",YM=`
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
}`,qM=`#ifdef USE_ENVMAP
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
#endif`,KM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,jM=`#ifdef USE_ENVMAP
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
#endif`,JM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ZM=`#ifdef USE_ENVMAP
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
#endif`,QM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,eT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,iT=`#ifdef USE_GRADIENTMAP
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
}`,rT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,oT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,aT=`uniform bool receiveShadow;
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
#endif`,cT=`#ifdef USE_ENVMAP
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
#endif`,lT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,uT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dT=`PhysicalMaterial material;
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
#endif`,pT=`struct PhysicalMaterial {
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
}`,mT=`
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
#endif`,_T=`#if defined( RE_IndirectDiffuse )
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
#endif`,gT=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vT=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xT=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yT=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ET=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ST=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,MT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,TT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,bT=`#if defined( USE_POINTS_UV )
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
#endif`,AT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,CT=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,RT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,PT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,LT=`#ifdef USE_MORPHTARGETS
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
#endif`,DT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,IT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,NT=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,OT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,UT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,FT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,BT=`#ifdef USE_NORMALMAP
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
#endif`,zT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,VT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,HT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,GT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,WT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,XT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$T=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,YT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,KT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,JT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ZT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,QT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,tb=`float getShadowMask() {
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
}`,eb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nb=`#ifdef USE_SKINNING
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
#endif`,ib=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rb=`#ifdef USE_SKINNING
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
#endif`,sb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ob=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ab=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,lb=`#ifdef USE_TRANSMISSION
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
#endif`,ub=`#ifdef USE_TRANSMISSION
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
#endif`,hb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,db=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_b=`uniform sampler2D t2D;
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
}`,gb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eb=`#include <common>
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
}`,Sb=`#if DEPTH_PACKING == 3200
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
}`,Mb=`#define DISTANCE
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
}`,Tb=`#define DISTANCE
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
}`,bb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ab=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wb=`uniform float scale;
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
}`,Cb=`uniform vec3 diffuse;
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
}`,Rb=`#include <common>
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
}`,Pb=`uniform vec3 diffuse;
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
}`,Lb=`#define LAMBERT
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
}`,Db=`#define LAMBERT
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
}`,Ib=`#define MATCAP
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
}`,Nb=`#define MATCAP
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
}`,Ob=`#define NORMAL
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
}`,Ub=`#define NORMAL
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
}`,Fb=`#define PHONG
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
}`,Bb=`#define PHONG
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
}`,zb=`#define STANDARD
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
}`,kb=`#define STANDARD
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
}`,Vb=`#define TOON
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
}`,Hb=`#define TOON
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
}`,Gb=`uniform float size;
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
}`,Wb=`uniform vec3 diffuse;
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
}`,Xb=`#include <common>
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
}`,$b=`uniform vec3 color;
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
}`,Yb=`uniform float rotation;
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
}`,qb=`uniform vec3 diffuse;
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
}`,Ot={alphahash_fragment:_M,alphahash_pars_fragment:gM,alphamap_fragment:vM,alphamap_pars_fragment:xM,alphatest_fragment:yM,alphatest_pars_fragment:EM,aomap_fragment:SM,aomap_pars_fragment:MM,batching_pars_vertex:TM,batching_vertex:bM,begin_vertex:AM,beginnormal_vertex:wM,bsdfs:CM,iridescence_fragment:RM,bumpmap_pars_fragment:PM,clipping_planes_fragment:LM,clipping_planes_pars_fragment:DM,clipping_planes_pars_vertex:IM,clipping_planes_vertex:NM,color_fragment:OM,color_pars_fragment:UM,color_pars_vertex:FM,color_vertex:BM,common:zM,cube_uv_reflection_fragment:kM,defaultnormal_vertex:VM,displacementmap_pars_vertex:HM,displacementmap_vertex:GM,emissivemap_fragment:WM,emissivemap_pars_fragment:XM,colorspace_fragment:$M,colorspace_pars_fragment:YM,envmap_fragment:qM,envmap_common_pars_fragment:KM,envmap_pars_fragment:jM,envmap_pars_vertex:JM,envmap_physical_pars_fragment:cT,envmap_vertex:ZM,fog_vertex:QM,fog_pars_vertex:tT,fog_fragment:eT,fog_pars_fragment:nT,gradientmap_pars_fragment:iT,lightmap_pars_fragment:rT,lights_lambert_fragment:sT,lights_lambert_pars_fragment:oT,lights_pars_begin:aT,lights_toon_fragment:lT,lights_toon_pars_fragment:uT,lights_phong_fragment:hT,lights_phong_pars_fragment:fT,lights_physical_fragment:dT,lights_physical_pars_fragment:pT,lights_fragment_begin:mT,lights_fragment_maps:_T,lights_fragment_end:gT,logdepthbuf_fragment:vT,logdepthbuf_pars_fragment:xT,logdepthbuf_pars_vertex:yT,logdepthbuf_vertex:ET,map_fragment:ST,map_pars_fragment:MT,map_particle_fragment:TT,map_particle_pars_fragment:bT,metalnessmap_fragment:AT,metalnessmap_pars_fragment:wT,morphinstance_vertex:CT,morphcolor_vertex:RT,morphnormal_vertex:PT,morphtarget_pars_vertex:LT,morphtarget_vertex:DT,normal_fragment_begin:IT,normal_fragment_maps:NT,normal_pars_fragment:OT,normal_pars_vertex:UT,normal_vertex:FT,normalmap_pars_fragment:BT,clearcoat_normal_fragment_begin:zT,clearcoat_normal_fragment_maps:kT,clearcoat_pars_fragment:VT,iridescence_pars_fragment:HT,opaque_fragment:GT,packing:WT,premultiplied_alpha_fragment:XT,project_vertex:$T,dithering_fragment:YT,dithering_pars_fragment:qT,roughnessmap_fragment:KT,roughnessmap_pars_fragment:jT,shadowmap_pars_fragment:JT,shadowmap_pars_vertex:ZT,shadowmap_vertex:QT,shadowmask_pars_fragment:tb,skinbase_vertex:eb,skinning_pars_vertex:nb,skinning_vertex:ib,skinnormal_vertex:rb,specularmap_fragment:sb,specularmap_pars_fragment:ob,tonemapping_fragment:ab,tonemapping_pars_fragment:cb,transmission_fragment:lb,transmission_pars_fragment:ub,uv_pars_fragment:hb,uv_pars_vertex:fb,uv_vertex:db,worldpos_vertex:pb,background_vert:mb,background_frag:_b,backgroundCube_vert:gb,backgroundCube_frag:vb,cube_vert:xb,cube_frag:yb,depth_vert:Eb,depth_frag:Sb,distanceRGBA_vert:Mb,distanceRGBA_frag:Tb,equirect_vert:bb,equirect_frag:Ab,linedashed_vert:wb,linedashed_frag:Cb,meshbasic_vert:Rb,meshbasic_frag:Pb,meshlambert_vert:Lb,meshlambert_frag:Db,meshmatcap_vert:Ib,meshmatcap_frag:Nb,meshnormal_vert:Ob,meshnormal_frag:Ub,meshphong_vert:Fb,meshphong_frag:Bb,meshphysical_vert:zb,meshphysical_frag:kb,meshtoon_vert:Vb,meshtoon_frag:Hb,points_vert:Gb,points_frag:Wb,shadow_vert:Xb,shadow_frag:$b,sprite_vert:Yb,sprite_frag:qb},at={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},Un={basic:{uniforms:Be([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:Be([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:Be([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:Be([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:Be([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:Be([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:Be([at.points,at.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:Be([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:Be([at.common,at.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:Be([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:Be([at.sprite,at.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:Be([at.common,at.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:Be([at.lights,at.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};Un.physical={uniforms:Be([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};const $o={r:0,b:0,g:0},ji=new Wn,Kb=new ce;function jb(r,t,e,n,i,s,o){const a=new Bt(0);let c=s===!0?0:1,l,u,h=null,f=0,d=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?e:t).get(v)),v}function _(y){let v=!1;const E=g(y);E===null?m(a,c):E&&E.isColor&&(m(E,1),v=!0);const w=r.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(y,v){const E=g(v);E&&(E.isCubeTexture||E.mapping===qa)?(u===void 0&&(u=new pt(new he(1,1,1),new Fi({name:"BackgroundCubeMaterial",uniforms:xs(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:He,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,b,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ji.copy(v.backgroundRotation),ji.x*=-1,ji.y*=-1,ji.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Kb.makeRotationFromEuler(ji)),u.material.toneMapped=Zt.getTransfer(E.colorSpace)!==ue,(h!==E||f!==E.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,h=E,f=E.version,d=r.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new pt(new Xn(2,2),new Fi({name:"BackgroundMaterial",uniforms:xs(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:Ui,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Zt.getTransfer(E.colorSpace)!==ue,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(h!==E||f!==E.version||d!==r.toneMapping)&&(l.material.needsUpdate=!0,h=E,f=E.version,d=r.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,v){y.getRGB($o,f_(r)),n.buffers.color.setClear($o.r,$o.g,$o.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),c=v,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,m(a,c)},render:_,addToRenderList:p}}function Jb(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(x,M,O,U,V){let Y=!1;const z=h(U,O,M);s!==z&&(s=z,l(s.object)),Y=d(x,U,O,V),Y&&g(x,U,O,V),V!==null&&t.update(V,r.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,E(x,M,O,U),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return r.createVertexArray()}function l(x){return r.bindVertexArray(x)}function u(x){return r.deleteVertexArray(x)}function h(x,M,O){const U=O.wireframe===!0;let V=n[x.id];V===void 0&&(V={},n[x.id]=V);let Y=V[M.id];Y===void 0&&(Y={},V[M.id]=Y);let z=Y[U];return z===void 0&&(z=f(c()),Y[U]=z),z}function f(x){const M=[],O=[],U=[];for(let V=0;V<e;V++)M[V]=0,O[V]=0,U[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:M,enabledAttributes:O,attributeDivisors:U,object:x,attributes:{},index:null}}function d(x,M,O,U){const V=s.attributes,Y=M.attributes;let z=0;const $=O.getAttributes();for(const W in $)if($[W].location>=0){const st=V[W];let ct=Y[W];if(ct===void 0&&(W==="instanceMatrix"&&x.instanceMatrix&&(ct=x.instanceMatrix),W==="instanceColor"&&x.instanceColor&&(ct=x.instanceColor)),st===void 0||st.attribute!==ct||ct&&st.data!==ct.data)return!0;z++}return s.attributesNum!==z||s.index!==U}function g(x,M,O,U){const V={},Y=M.attributes;let z=0;const $=O.getAttributes();for(const W in $)if($[W].location>=0){let st=Y[W];st===void 0&&(W==="instanceMatrix"&&x.instanceMatrix&&(st=x.instanceMatrix),W==="instanceColor"&&x.instanceColor&&(st=x.instanceColor));const ct={};ct.attribute=st,st&&st.data&&(ct.data=st.data),V[W]=ct,z++}s.attributes=V,s.attributesNum=z,s.index=U}function _(){const x=s.newAttributes;for(let M=0,O=x.length;M<O;M++)x[M]=0}function p(x){m(x,0)}function m(x,M){const O=s.newAttributes,U=s.enabledAttributes,V=s.attributeDivisors;O[x]=1,U[x]===0&&(r.enableVertexAttribArray(x),U[x]=1),V[x]!==M&&(r.vertexAttribDivisor(x,M),V[x]=M)}function y(){const x=s.newAttributes,M=s.enabledAttributes;for(let O=0,U=M.length;O<U;O++)M[O]!==x[O]&&(r.disableVertexAttribArray(O),M[O]=0)}function v(x,M,O,U,V,Y,z){z===!0?r.vertexAttribIPointer(x,M,O,V,Y):r.vertexAttribPointer(x,M,O,U,V,Y)}function E(x,M,O,U){_();const V=U.attributes,Y=O.getAttributes(),z=M.defaultAttributeValues;for(const $ in Y){const W=Y[$];if(W.location>=0){let rt=V[$];if(rt===void 0&&($==="instanceMatrix"&&x.instanceMatrix&&(rt=x.instanceMatrix),$==="instanceColor"&&x.instanceColor&&(rt=x.instanceColor)),rt!==void 0){const st=rt.normalized,ct=rt.itemSize,At=t.get(rt);if(At===void 0)continue;const Nt=At.buffer,D=At.type,H=At.bytesPerElement,Z=D===r.INT||D===r.UNSIGNED_INT||rt.gpuType===sh;if(rt.isInterleavedBufferAttribute){const et=rt.data,St=et.stride,bt=rt.offset;if(et.isInstancedInterleavedBuffer){for(let kt=0;kt<W.locationSize;kt++)m(W.location+kt,et.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let kt=0;kt<W.locationSize;kt++)p(W.location+kt);r.bindBuffer(r.ARRAY_BUFFER,Nt);for(let kt=0;kt<W.locationSize;kt++)v(W.location+kt,ct/W.locationSize,D,st,St*H,(bt+ct/W.locationSize*kt)*H,Z)}else{if(rt.isInstancedBufferAttribute){for(let et=0;et<W.locationSize;et++)m(W.location+et,rt.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let et=0;et<W.locationSize;et++)p(W.location+et);r.bindBuffer(r.ARRAY_BUFFER,Nt);for(let et=0;et<W.locationSize;et++)v(W.location+et,ct/W.locationSize,D,st,ct*H,ct/W.locationSize*et*H,Z)}}else if(z!==void 0){const st=z[$];if(st!==void 0)switch(st.length){case 2:r.vertexAttrib2fv(W.location,st);break;case 3:r.vertexAttrib3fv(W.location,st);break;case 4:r.vertexAttrib4fv(W.location,st);break;default:r.vertexAttrib1fv(W.location,st)}}}}y()}function w(){C();for(const x in n){const M=n[x];for(const O in M){const U=M[O];for(const V in U)u(U[V].object),delete U[V];delete M[O]}delete n[x]}}function b(x){if(n[x.id]===void 0)return;const M=n[x.id];for(const O in M){const U=M[O];for(const V in U)u(U[V].object),delete U[V];delete M[O]}delete n[x.id]}function S(x){for(const M in n){const O=n[M];if(O[x.id]===void 0)continue;const U=O[x.id];for(const V in U)u(U[V].object),delete U[V];delete O[x.id]}}function C(){L(),o=!0,s!==i&&(s=i,l(s.object))}function L(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:L,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfProgram:S,initAttributes:_,enableAttribute:p,disableUnusedAttributes:y}}function Zb(r,t,e){let n;function i(l){n=l}function s(l,u){r.drawArrays(n,l,u),e.update(u,n,1)}function o(l,u,h){h!==0&&(r.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function a(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];e.update(d,n,1)}function c(l,u,h,f){if(h===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_];for(let _=0;_<f.length;_++)e.update(g,n,f[_])}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Qb(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const S=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(S){return!(S!==In&&n.convert(S)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(S){const C=S===ho&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(S!==ui&&n.convert(S)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==ni&&!C)}function c(S){if(S==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(f===!0){const S=t.get("EXT_clip_control");S.clipControlEXT(S.LOWER_LEFT_EXT,S.ZERO_TO_ONE_EXT)}const d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),y=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),E=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,b=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:E,vertexTextures:w,maxSamples:b}}function tA(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new Qi,a=new Ut,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,_=h.clipIntersection,p=h.clipShadows,m=r.get(h);if(!i||g===null||g.length===0||s&&!p)s?u(null):l();else{const y=s?0:n,v=y*4;let E=m.clippingState||null;c.value=E,E=u(g,f,v,d);for(let w=0;w!==v;++w)E[w]=e[w];m.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,d,g){const _=h!==null?h.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const m=d+_*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,E=d;v!==_;++v,E+=4)o.copy(h[v]).applyMatrix4(y,a),o.normal.toArray(p,E),p[E+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function eA(r){let t=new WeakMap;function e(o,a){return a===Vl?o.mapping=ms:a===Hl&&(o.mapping=_s),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Vl||a===Hl)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new fM(c.height);return l.fromEquirectangularTexture(r,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class __ extends d_{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const qr=4,cd=[.125,.215,.35,.446,.526,.582],nr=20,Jc=new __,ld=new Bt;let Zc=null,Qc=0,tl=0,el=!1;const tr=(1+Math.sqrt(5))/2,Vr=1/tr,ud=[new P(-tr,Vr,0),new P(tr,Vr,0),new P(-Vr,0,tr),new P(Vr,0,tr),new P(0,tr,-Vr),new P(0,tr,Vr),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class hd{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Zc=this._renderer.getRenderTarget(),Qc=this._renderer.getActiveCubeFace(),tl=this._renderer.getActiveMipmapLevel(),el=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Zc,Qc,tl),this._renderer.xr.enabled=el,t.scissorTest=!1,Yo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ms||t.mapping===_s?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Zc=this._renderer.getRenderTarget(),Qc=this._renderer.getActiveCubeFace(),tl=this._renderer.getActiveMipmapLevel(),el=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Dn,minFilter:Dn,generateMipmaps:!1,type:ho,format:In,colorSpace:Hi,depthBuffer:!1},i=fd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fd(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=nA(s)),this._blurMaterial=iA(s,t,e)}return i}_compileMaterial(t){const e=new pt(this._lodPlanes[0],t);this._renderer.compile(e,Jc)}_sceneToCubeUV(t,e,n,i){const a=new on(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(ld),u.toneMapping=Ci,u.autoClear=!1;const d=new fi({name:"PMREM.Background",side:He,depthWrite:!1,depthTest:!1}),g=new pt(new he,d);let _=!1;const p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,_=!0):(d.color.copy(ld),_=!0);for(let m=0;m<6;m++){const y=m%3;y===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):y===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));const v=this._cubeSize;Yo(i,y*v,m>2?v:0,v,v),u.setRenderTarget(i),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ms||t.mapping===_s;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=pd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dd());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new pt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;Yo(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Jc)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=ud[(i-s-1)%ud.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new pt(this._lodPlanes[i],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*nr-1),_=s/g,p=isFinite(s)?1+Math.floor(u*_):nr;p>nr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${nr}`);const m=[];let y=0;for(let S=0;S<nr;++S){const C=S/_,L=Math.exp(-C*C/2);m.push(L),S===0?y+=L:S<p&&(y+=2*L)}for(let S=0;S<m.length;S++)m[S]=m[S]/y;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const E=this._sizeLods[i],w=3*E*(i>v-qr?i-v+qr:0),b=4*(this._cubeSize-E);Yo(e,w,b,3*E,2*E),c.setRenderTarget(e),c.render(h,Jc)}}function nA(r){const t=[],e=[],n=[];let i=r;const s=r-qr+1+cd.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>r-qr?c=cd[o-r+qr-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,p=2,m=1,y=new Float32Array(_*g*d),v=new Float32Array(p*g*d),E=new Float32Array(m*g*d);for(let b=0;b<d;b++){const S=b%3*2/3-1,C=b>2?0:-1,L=[S,C,0,S+2/3,C,0,S+2/3,C+1,0,S,C,0,S+2/3,C+1,0,S,C+1,0];y.set(L,_*g*b),v.set(f,p*g*b);const x=[b,b,b,b,b,b];E.set(x,m*g*b)}const w=new ae;w.setAttribute("position",new Vn(y,_)),w.setAttribute("uv",new Vn(v,p)),w.setAttribute("faceIndex",new Vn(E,m)),t.push(w),i>qr&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function fd(r,t,e){const n=new vr(r,t,e);return n.texture.mapping=qa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Yo(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function iA(r,t,e){const n=new Float32Array(nr),i=new P(0,1,0);return new Fi({name:"SphericalGaussianBlur",defines:{n:nr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ph(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function dd(){return new Fi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ph(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function pd(){return new Fi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ph(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function ph(){return`

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
	`}function rA(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Vl||c===Hl,u=c===ms||c===_s;if(l||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new hd(r)),h=l?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&i(d)?(e===null&&(e=new hd(r)),h=l?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function i(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function sA(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&ma("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function oA(r,t,e,n){const i={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)t.remove(_[p])}f.removeEventListener("dispose",o),delete i[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)t.update(f[g],r.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const _=d[g];for(let p=0,m=_.length;p<m;p++)t.update(_[p],r.ARRAY_BUFFER)}}function l(h){const f=[],d=h.index,g=h.attributes.position;let _=0;if(d!==null){const y=d.array;_=d.version;for(let v=0,E=y.length;v<E;v+=3){const w=y[v+0],b=y[v+1],S=y[v+2];f.push(w,b,b,S,S,w)}}else if(g!==void 0){const y=g.array;_=g.version;for(let v=0,E=y.length/3-1;v<E;v+=3){const w=v+0,b=v+1,S=v+2;f.push(w,b,b,S,S,w)}}else return;const p=new(s_(f)?h_:u_)(f,1);p.version=_;const m=s.get(h);m&&t.remove(m),s.set(h,p)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function aA(r,t,e){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,d){r.drawElements(n,d,s,f*o),e.update(d,n,1)}function l(f,d,g){g!==0&&(r.drawElementsInstanced(n,d,s,f*o,g),e.update(d,n,g))}function u(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];e.update(p,n,1)}function h(f,d,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)l(f[m]/o,d[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,_,0,g);let m=0;for(let y=0;y<g;y++)m+=d[y];for(let y=0;y<_.length;y++)e.update(m,n,_[y])}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function cA(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function lA(r,t,e){const n=new WeakMap,i=new ne;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let x=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var d=x;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let E=0;g===!0&&(E=1),_===!0&&(E=2),p===!0&&(E=3);let w=a.attributes.position.count*E,b=1;w>t.maxTextureSize&&(b=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const S=new Float32Array(w*b*4*h),C=new a_(S,w,b,h);C.type=ni,C.needsUpdate=!0;const L=E*4;for(let M=0;M<h;M++){const O=m[M],U=y[M],V=v[M],Y=w*b*4*M;for(let z=0;z<O.count;z++){const $=z*L;g===!0&&(i.fromBufferAttribute(O,z),S[Y+$+0]=i.x,S[Y+$+1]=i.y,S[Y+$+2]=i.z,S[Y+$+3]=0),_===!0&&(i.fromBufferAttribute(U,z),S[Y+$+4]=i.x,S[Y+$+5]=i.y,S[Y+$+6]=i.z,S[Y+$+7]=0),p===!0&&(i.fromBufferAttribute(V,z),S[Y+$+8]=i.x,S[Y+$+9]=i.y,S[Y+$+10]=i.z,S[Y+$+11]=V.itemSize===4?i.w:1)}}f={count:h,texture:C,size:new mt(w,b)},n.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(r,"morphTargetBaseInfluence",_),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function uA(r,t,e,n){let i=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(i.get(h)!==l&&(t.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return h}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}class g_ extends Ze{constructor(t,e,n,i,s,o,a,c,l,u=ts){if(u!==ts&&u!==vs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ts&&(n=gr),n===void 0&&u===vs&&(n=gs),super(null,i,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Sn,this.minFilter=c!==void 0?c:Sn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const v_=new Ze,md=new g_(1,1),x_=new a_,y_=new jS,E_=new p_,_d=[],gd=[],vd=new Float32Array(16),xd=new Float32Array(9),yd=new Float32Array(4);function As(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=_d[i];if(s===void 0&&(s=new Float32Array(i),_d[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function be(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ae(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function ja(r,t){let e=gd[t];e===void 0&&(e=new Int32Array(t),gd[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function hA(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function fA(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;r.uniform2fv(this.addr,t),Ae(e,t)}}function dA(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;r.uniform3fv(this.addr,t),Ae(e,t)}}function pA(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;r.uniform4fv(this.addr,t),Ae(e,t)}}function mA(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(be(e,n))return;yd.set(n),r.uniformMatrix2fv(this.addr,!1,yd),Ae(e,n)}}function _A(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(be(e,n))return;xd.set(n),r.uniformMatrix3fv(this.addr,!1,xd),Ae(e,n)}}function gA(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(be(e,n))return;vd.set(n),r.uniformMatrix4fv(this.addr,!1,vd),Ae(e,n)}}function vA(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function xA(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;r.uniform2iv(this.addr,t),Ae(e,t)}}function yA(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;r.uniform3iv(this.addr,t),Ae(e,t)}}function EA(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;r.uniform4iv(this.addr,t),Ae(e,t)}}function SA(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function MA(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;r.uniform2uiv(this.addr,t),Ae(e,t)}}function TA(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;r.uniform3uiv(this.addr,t),Ae(e,t)}}function bA(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;r.uniform4uiv(this.addr,t),Ae(e,t)}}function AA(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(md.compareFunction=r_,s=md):s=v_,e.setTexture2D(t||s,i)}function wA(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||y_,i)}function CA(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||E_,i)}function RA(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||x_,i)}function PA(r){switch(r){case 5126:return hA;case 35664:return fA;case 35665:return dA;case 35666:return pA;case 35674:return mA;case 35675:return _A;case 35676:return gA;case 5124:case 35670:return vA;case 35667:case 35671:return xA;case 35668:case 35672:return yA;case 35669:case 35673:return EA;case 5125:return SA;case 36294:return MA;case 36295:return TA;case 36296:return bA;case 35678:case 36198:case 36298:case 36306:case 35682:return AA;case 35679:case 36299:case 36307:return wA;case 35680:case 36300:case 36308:case 36293:return CA;case 36289:case 36303:case 36311:case 36292:return RA}}function LA(r,t){r.uniform1fv(this.addr,t)}function DA(r,t){const e=As(t,this.size,2);r.uniform2fv(this.addr,e)}function IA(r,t){const e=As(t,this.size,3);r.uniform3fv(this.addr,e)}function NA(r,t){const e=As(t,this.size,4);r.uniform4fv(this.addr,e)}function OA(r,t){const e=As(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function UA(r,t){const e=As(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function FA(r,t){const e=As(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function BA(r,t){r.uniform1iv(this.addr,t)}function zA(r,t){r.uniform2iv(this.addr,t)}function kA(r,t){r.uniform3iv(this.addr,t)}function VA(r,t){r.uniform4iv(this.addr,t)}function HA(r,t){r.uniform1uiv(this.addr,t)}function GA(r,t){r.uniform2uiv(this.addr,t)}function WA(r,t){r.uniform3uiv(this.addr,t)}function XA(r,t){r.uniform4uiv(this.addr,t)}function $A(r,t,e){const n=this.cache,i=t.length,s=ja(e,i);be(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||v_,s[o])}function YA(r,t,e){const n=this.cache,i=t.length,s=ja(e,i);be(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||y_,s[o])}function qA(r,t,e){const n=this.cache,i=t.length,s=ja(e,i);be(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||E_,s[o])}function KA(r,t,e){const n=this.cache,i=t.length,s=ja(e,i);be(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||x_,s[o])}function jA(r){switch(r){case 5126:return LA;case 35664:return DA;case 35665:return IA;case 35666:return NA;case 35674:return OA;case 35675:return UA;case 35676:return FA;case 5124:case 35670:return BA;case 35667:case 35671:return zA;case 35668:case 35672:return kA;case 35669:case 35673:return VA;case 5125:return HA;case 36294:return GA;case 36295:return WA;case 36296:return XA;case 35678:case 36198:case 36298:case 36306:case 35682:return $A;case 35679:case 36299:case 36307:return YA;case 35680:case 36300:case 36308:case 36293:return qA;case 36289:case 36303:case 36311:case 36292:return KA}}class JA{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=PA(e.type)}}class ZA{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=jA(e.type)}}class QA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const nl=/(\w+)(\])?(\[|\.)?/g;function Ed(r,t){r.seq.push(t),r.map[t.id]=t}function tw(r,t,e){const n=r.name,i=n.length;for(nl.lastIndex=0;;){const s=nl.exec(n),o=nl.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Ed(e,l===void 0?new JA(a,r,t):new ZA(a,r,t));break}else{let h=e.map[a];h===void 0&&(h=new QA(a),Ed(e,h)),e=h}}}class _a{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);tw(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Sd(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const ew=37297;let nw=0;function iw(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function rw(r){const t=Zt.getPrimaries(Zt.workingColorSpace),e=Zt.getPrimaries(r);let n;switch(t===e?n="":t===La&&e===Pa?n="LinearDisplayP3ToLinearSRGB":t===Pa&&e===La&&(n="LinearSRGBToLinearDisplayP3"),r){case Hi:case Ka:return[n,"LinearTransferOETF"];case Ln:case hh:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Md(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+iw(r.getShaderSource(t),o)}else return i}function sw(r,t){const e=rw(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function ow(r,t){let e;switch(t){case MS:e="Linear";break;case TS:e="Reinhard";break;case bS:e="Cineon";break;case Xm:e="ACESFilmic";break;case wS:e="AgX";break;case CS:e="Neutral";break;case AS:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const qo=new P;function aw(){Zt.getLuminanceCoefficients(qo);const r=qo.x.toFixed(4),t=qo.y.toFixed(4),e=qo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function cw(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ks).join(`
`)}function lw(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function uw(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function ks(r){return r!==""}function Td(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bd(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const hw=/^[ \t]*#include +<([\w\d./]+)>/gm;function vu(r){return r.replace(hw,dw)}const fw=new Map;function dw(r,t){let e=Ot[t];if(e===void 0){const n=fw.get(t);if(n!==void 0)e=Ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return vu(e)}const pw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ad(r){return r.replace(pw,mw)}function mw(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function wd(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function _w(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Gm?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===nS?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Qn&&(t="SHADOWMAP_TYPE_VSM"),t}function gw(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ms:case _s:t="ENVMAP_TYPE_CUBE";break;case qa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function vw(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case _s:t="ENVMAP_MODE_REFRACTION";break}return t}function xw(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Wm:t="ENVMAP_BLENDING_MULTIPLY";break;case ES:t="ENVMAP_BLENDING_MIX";break;case SS:t="ENVMAP_BLENDING_ADD";break}return t}function yw(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Ew(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=_w(e),l=gw(e),u=vw(e),h=xw(e),f=yw(e),d=cw(e),g=lw(s),_=i.createProgram();let p,m,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ks).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ks).join(`
`),m.length>0&&(m+=`
`)):(p=[wd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ks).join(`
`),m=[wd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ci?"#define TONE_MAPPING":"",e.toneMapping!==Ci?Ot.tonemapping_pars_fragment:"",e.toneMapping!==Ci?ow("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,sw("linearToOutputTexel",e.outputColorSpace),aw(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ks).join(`
`)),o=vu(o),o=Td(o,e),o=bd(o,e),a=vu(a),a=Td(a,e),a=bd(a,e),o=Ad(o),a=Ad(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Wf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Wf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=y+p+o,E=y+m+a,w=Sd(i,i.VERTEX_SHADER,v),b=Sd(i,i.FRAGMENT_SHADER,E);i.attachShader(_,w),i.attachShader(_,b),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function S(M){if(r.debug.checkShaderErrors){const O=i.getProgramInfoLog(_).trim(),U=i.getShaderInfoLog(w).trim(),V=i.getShaderInfoLog(b).trim();let Y=!0,z=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Y=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,w,b);else{const $=Md(i,w,"vertex"),W=Md(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+O+`
`+$+`
`+W)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(U===""||V==="")&&(z=!1);z&&(M.diagnostics={runnable:Y,programLog:O,vertexShader:{log:U,prefix:p},fragmentShader:{log:V,prefix:m}})}i.deleteShader(w),i.deleteShader(b),C=new _a(i,_),L=uw(i,_)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let L;this.getAttributes=function(){return L===void 0&&S(this),L};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(_,ew)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=nw++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=b,this}let Sw=0;class Mw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Tw(t),e.set(t,n)),n}}class Tw{constructor(t){this.id=Sw++,this.code=t,this.usedTimes=0}}function bw(r,t,e,n,i,s,o){const a=new c_,c=new Mw,l=new Set,u=[],h=i.logarithmicDepthBuffer,f=i.reverseDepthBuffer,d=i.vertexTextures;let g=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,M,O,U,V){const Y=U.fog,z=V.geometry,$=x.isMeshStandardMaterial?U.environment:null,W=(x.isMeshStandardMaterial?e:t).get(x.envMap||$),rt=W&&W.mapping===qa?W.image.height:null,st=_[x.type];x.precision!==null&&(g=i.getMaxPrecision(x.precision),g!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",g,"instead."));const ct=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,At=ct!==void 0?ct.length:0;let Nt=0;z.morphAttributes.position!==void 0&&(Nt=1),z.morphAttributes.normal!==void 0&&(Nt=2),z.morphAttributes.color!==void 0&&(Nt=3);let D,H,Z,et;if(st){const We=Un[st];D=We.vertexShader,H=We.fragmentShader}else D=x.vertexShader,H=x.fragmentShader,c.update(x),Z=c.getVertexShaderID(x),et=c.getFragmentShaderID(x);const St=r.getRenderTarget(),bt=V.isInstancedMesh===!0,kt=V.isBatchedMesh===!0,Yt=!!x.map,Vt=!!x.matcap,I=!!W,Fe=!!x.aoMap,zt=!!x.lightMap,Ht=!!x.bumpMap,wt=!!x.normalMap,ie=!!x.displacementMap,Rt=!!x.emissiveMap,R=!!x.metalnessMap,T=!!x.roughnessMap,k=x.anisotropy>0,j=x.clearcoat>0,tt=x.dispersion>0,K=x.iridescence>0,xt=x.sheen>0,ot=x.transmission>0,ht=k&&!!x.anisotropyMap,qt=j&&!!x.clearcoatMap,nt=j&&!!x.clearcoatNormalMap,_t=j&&!!x.clearcoatRoughnessMap,Lt=K&&!!x.iridescenceMap,Dt=K&&!!x.iridescenceThicknessMap,gt=xt&&!!x.sheenColorMap,Wt=xt&&!!x.sheenRoughnessMap,It=!!x.specularMap,oe=!!x.specularColorMap,N=!!x.specularIntensityMap,ft=ot&&!!x.transmissionMap,q=ot&&!!x.thicknessMap,J=!!x.gradientMap,lt=!!x.alphaMap,dt=x.alphaTest>0,$t=!!x.alphaHash,ye=!!x.extensions;let Ge=Ci;x.toneMapped&&(St===null||St.isXRRenderTarget===!0)&&(Ge=r.toneMapping);const Kt={shaderID:st,shaderType:x.type,shaderName:x.name,vertexShader:D,fragmentShader:H,defines:x.defines,customVertexShaderID:Z,customFragmentShaderID:et,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:g,batching:kt,batchingColor:kt&&V._colorsTexture!==null,instancing:bt,instancingColor:bt&&V.instanceColor!==null,instancingMorph:bt&&V.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:St===null?r.outputColorSpace:St.isXRRenderTarget===!0?St.texture.colorSpace:Hi,alphaToCoverage:!!x.alphaToCoverage,map:Yt,matcap:Vt,envMap:I,envMapMode:I&&W.mapping,envMapCubeUVHeight:rt,aoMap:Fe,lightMap:zt,bumpMap:Ht,normalMap:wt,displacementMap:d&&ie,emissiveMap:Rt,normalMapObjectSpace:wt&&x.normalMapType===DS,normalMapTangentSpace:wt&&x.normalMapType===i_,metalnessMap:R,roughnessMap:T,anisotropy:k,anisotropyMap:ht,clearcoat:j,clearcoatMap:qt,clearcoatNormalMap:nt,clearcoatRoughnessMap:_t,dispersion:tt,iridescence:K,iridescenceMap:Lt,iridescenceThicknessMap:Dt,sheen:xt,sheenColorMap:gt,sheenRoughnessMap:Wt,specularMap:It,specularColorMap:oe,specularIntensityMap:N,transmission:ot,transmissionMap:ft,thicknessMap:q,gradientMap:J,opaque:x.transparent===!1&&x.blending===Qr&&x.alphaToCoverage===!1,alphaMap:lt,alphaTest:dt,alphaHash:$t,combine:x.combine,mapUv:Yt&&p(x.map.channel),aoMapUv:Fe&&p(x.aoMap.channel),lightMapUv:zt&&p(x.lightMap.channel),bumpMapUv:Ht&&p(x.bumpMap.channel),normalMapUv:wt&&p(x.normalMap.channel),displacementMapUv:ie&&p(x.displacementMap.channel),emissiveMapUv:Rt&&p(x.emissiveMap.channel),metalnessMapUv:R&&p(x.metalnessMap.channel),roughnessMapUv:T&&p(x.roughnessMap.channel),anisotropyMapUv:ht&&p(x.anisotropyMap.channel),clearcoatMapUv:qt&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:nt&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Lt&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:Wt&&p(x.sheenRoughnessMap.channel),specularMapUv:It&&p(x.specularMap.channel),specularColorMapUv:oe&&p(x.specularColorMap.channel),specularIntensityMapUv:N&&p(x.specularIntensityMap.channel),transmissionMapUv:ft&&p(x.transmissionMap.channel),thicknessMapUv:q&&p(x.thicknessMap.channel),alphaMapUv:lt&&p(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(wt||k),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!z.attributes.uv&&(Yt||lt),fog:!!Y,useFog:x.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:f,skinning:V.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:At,morphTextureStride:Nt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&O.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ge,decodeVideoTexture:Yt&&x.map.isVideoTexture===!0&&Zt.getTransfer(x.map.colorSpace)===ue,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ze,flipSided:x.side===He,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ye&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&x.extensions.multiDraw===!0||kt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Kt.vertexUv1s=l.has(1),Kt.vertexUv2s=l.has(2),Kt.vertexUv3s=l.has(3),l.clear(),Kt}function y(x){const M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(const O in x.defines)M.push(O),M.push(x.defines[O]);return x.isRawShaderMaterial===!1&&(v(M,x),E(M,x),M.push(r.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function v(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function E(x,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.alphaToCoverage&&a.enable(20),x.push(a.mask)}function w(x){const M=_[x.type];let O;if(M){const U=Un[M];O=cM.clone(U.uniforms)}else O=x.uniforms;return O}function b(x,M){let O;for(let U=0,V=u.length;U<V;U++){const Y=u[U];if(Y.cacheKey===M){O=Y,++O.usedTimes;break}}return O===void 0&&(O=new Ew(r,M,x,s),u.push(O)),O}function S(x){if(--x.usedTimes===0){const M=u.indexOf(x);u[M]=u[u.length-1],u.pop(),x.destroy()}}function C(x){c.remove(x)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:y,getUniforms:w,acquireProgram:b,releaseProgram:S,releaseShaderCache:C,programs:u,dispose:L}}function Aw(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,c){r.get(o)[a]=c}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function ww(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Cd(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Rd(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(h,f,d,g,_,p){let m=r[t];return m===void 0?(m={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:p},r[t]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=_,m.group=p),t++,m}function a(h,f,d,g,_,p){const m=o(h,f,d,g,_,p);d.transmission>0?n.push(m):d.transparent===!0?i.push(m):e.push(m)}function c(h,f,d,g,_,p){const m=o(h,f,d,g,_,p);d.transmission>0?n.unshift(m):d.transparent===!0?i.unshift(m):e.unshift(m)}function l(h,f){e.length>1&&e.sort(h||ww),n.length>1&&n.sort(f||Cd),i.length>1&&i.sort(f||Cd)}function u(){for(let h=t,f=r.length;h<f;h++){const d=r[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:u,sort:l}}function Cw(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new Rd,r.set(n,[o])):i>=s.length?(o=new Rd,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function Rw(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Bt};break;case"SpotLight":e={position:new P,direction:new P,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new P,halfWidth:new P,halfHeight:new P};break}return r[t.id]=e,e}}}function Pw(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Lw=0;function Dw(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Iw(r){const t=new Rw,e=Pw(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);const i=new P,s=new ce,o=new ce;function a(l){let u=0,h=0,f=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let d=0,g=0,_=0,p=0,m=0,y=0,v=0,E=0,w=0,b=0,S=0;l.sort(Dw);for(let L=0,x=l.length;L<x;L++){const M=l[L],O=M.color,U=M.intensity,V=M.distance,Y=M.shadow&&M.shadow.map?M.shadow.map.texture:null;if(M.isAmbientLight)u+=O.r*U,h+=O.g*U,f+=O.b*U;else if(M.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(M.sh.coefficients[z],U);S++}else if(M.isDirectionalLight){const z=t.get(M);if(z.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const $=M.shadow,W=e.get(M);W.shadowIntensity=$.intensity,W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,n.directionalShadow[d]=W,n.directionalShadowMap[d]=Y,n.directionalShadowMatrix[d]=M.shadow.matrix,y++}n.directional[d]=z,d++}else if(M.isSpotLight){const z=t.get(M);z.position.setFromMatrixPosition(M.matrixWorld),z.color.copy(O).multiplyScalar(U),z.distance=V,z.coneCos=Math.cos(M.angle),z.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),z.decay=M.decay,n.spot[_]=z;const $=M.shadow;if(M.map&&(n.spotLightMap[w]=M.map,w++,$.updateMatrices(M),M.castShadow&&b++),n.spotLightMatrix[_]=$.matrix,M.castShadow){const W=e.get(M);W.shadowIntensity=$.intensity,W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=Y,E++}_++}else if(M.isRectAreaLight){const z=t.get(M);z.color.copy(O).multiplyScalar(U),z.halfWidth.set(M.width*.5,0,0),z.halfHeight.set(0,M.height*.5,0),n.rectArea[p]=z,p++}else if(M.isPointLight){const z=t.get(M);if(z.color.copy(M.color).multiplyScalar(M.intensity),z.distance=M.distance,z.decay=M.decay,M.castShadow){const $=M.shadow,W=e.get(M);W.shadowIntensity=$.intensity,W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,W.shadowCameraNear=$.camera.near,W.shadowCameraFar=$.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=M.shadow.matrix,v++}n.point[g]=z,g++}else if(M.isHemisphereLight){const z=t.get(M);z.skyColor.copy(M.color).multiplyScalar(U),z.groundColor.copy(M.groundColor).multiplyScalar(U),n.hemi[m]=z,m++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const C=n.hash;(C.directionalLength!==d||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==p||C.hemiLength!==m||C.numDirectionalShadows!==y||C.numPointShadows!==v||C.numSpotShadows!==E||C.numSpotMaps!==w||C.numLightProbes!==S)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=E,n.spotShadowMap.length=E,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=E+w-b,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=S,C.directionalLength=d,C.pointLength=g,C.spotLength=_,C.rectAreaLength=p,C.hemiLength=m,C.numDirectionalShadows=y,C.numPointShadows=v,C.numSpotShadows=E,C.numSpotMaps=w,C.numLightProbes=S,n.version=Lw++)}function c(l,u){let h=0,f=0,d=0,g=0,_=0;const p=u.matrixWorldInverse;for(let m=0,y=l.length;m<y;m++){const v=l[m];if(v.isDirectionalLight){const E=n.directional[h];E.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(p),h++}else if(v.isSpotLight){const E=n.spot[d];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(p),d++}else if(v.isRectAreaLight){const E=n.rectArea[g];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),o.identity(),s.copy(v.matrixWorld),s.premultiply(p),o.extractRotation(s),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const E=n.point[f];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const E=n.hemi[_];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(p),_++}}}return{setup:a,setupView:c,state:n}}function Pd(r){const t=new Iw(r),e=[],n=[];function i(u){l.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Nw(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new Pd(r),t.set(i,[a])):s>=o.length?(a=new Pd(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Ow extends Mr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=PS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Uw extends Mr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Fw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bw=`uniform sampler2D shadow_pass;
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
}`;function zw(r,t,e){let n=new dh;const i=new mt,s=new mt,o=new ne,a=new Ow({depthPacking:LS}),c=new Uw,l={},u=e.maxTextureSize,h={[Ui]:He,[He]:Ui,[ze]:ze},f=new Fi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:Fw,fragmentShader:Bw}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new ae;g.setAttribute("position",new Vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new pt(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gm;let m=this.type;this.render=function(b,S,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;const L=r.getRenderTarget(),x=r.getActiveCubeFace(),M=r.getActiveMipmapLevel(),O=r.state;O.setBlending(wi),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const U=m!==Qn&&this.type===Qn,V=m===Qn&&this.type!==Qn;for(let Y=0,z=b.length;Y<z;Y++){const $=b[Y],W=$.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const rt=W.getFrameExtents();if(i.multiply(rt),s.copy(W.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/rt.x),i.x=s.x*rt.x,W.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/rt.y),i.y=s.y*rt.y,W.mapSize.y=s.y)),W.map===null||U===!0||V===!0){const ct=this.type!==Qn?{minFilter:Sn,magFilter:Sn}:{};W.map!==null&&W.map.dispose(),W.map=new vr(i.x,i.y,ct),W.map.texture.name=$.name+".shadowMap",W.camera.updateProjectionMatrix()}r.setRenderTarget(W.map),r.clear();const st=W.getViewportCount();for(let ct=0;ct<st;ct++){const At=W.getViewport(ct);o.set(s.x*At.x,s.y*At.y,s.x*At.z,s.y*At.w),O.viewport(o),W.updateMatrices($,ct),n=W.getFrustum(),E(S,C,W.camera,$,this.type)}W.isPointLightShadow!==!0&&this.type===Qn&&y(W,C),W.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(L,x,M)};function y(b,S){const C=t.update(_);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new vr(i.x,i.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(S,null,C,f,_,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(S,null,C,d,_,null)}function v(b,S,C,L){let x=null;const M=C.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(M!==void 0)x=M;else if(x=C.isPointLight===!0?c:a,r.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const O=x.uuid,U=S.uuid;let V=l[O];V===void 0&&(V={},l[O]=V);let Y=V[U];Y===void 0&&(Y=x.clone(),V[U]=Y,S.addEventListener("dispose",w)),x=Y}if(x.visible=S.visible,x.wireframe=S.wireframe,L===Qn?x.side=S.shadowSide!==null?S.shadowSide:S.side:x.side=S.shadowSide!==null?S.shadowSide:h[S.side],x.alphaMap=S.alphaMap,x.alphaTest=S.alphaTest,x.map=S.map,x.clipShadows=S.clipShadows,x.clippingPlanes=S.clippingPlanes,x.clipIntersection=S.clipIntersection,x.displacementMap=S.displacementMap,x.displacementScale=S.displacementScale,x.displacementBias=S.displacementBias,x.wireframeLinewidth=S.wireframeLinewidth,x.linewidth=S.linewidth,C.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const O=r.properties.get(x);O.light=C}return x}function E(b,S,C,L,x){if(b.visible===!1)return;if(b.layers.test(S.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&x===Qn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,b.matrixWorld);const U=t.update(b),V=b.material;if(Array.isArray(V)){const Y=U.groups;for(let z=0,$=Y.length;z<$;z++){const W=Y[z],rt=V[W.materialIndex];if(rt&&rt.visible){const st=v(b,rt,L,x);b.onBeforeShadow(r,b,S,C,U,st,W),r.renderBufferDirect(C,null,U,st,b,W),b.onAfterShadow(r,b,S,C,U,st,W)}}}else if(V.visible){const Y=v(b,V,L,x);b.onBeforeShadow(r,b,S,C,U,Y,null),r.renderBufferDirect(C,null,U,Y,b,null),b.onAfterShadow(r,b,S,C,U,Y,null)}}const O=b.children;for(let U=0,V=O.length;U<V;U++)E(O[U],S,C,L,x)}function w(b){b.target.removeEventListener("dispose",w);for(const C in l){const L=l[C],x=b.target.uuid;x in L&&(L[x].dispose(),delete L[x])}}}const kw={[Nl]:Ol,[Ul]:zl,[Fl]:kl,[ps]:Bl,[Ol]:Nl,[zl]:Ul,[kl]:Fl,[Bl]:ps};function Vw(r){function t(){let N=!1;const ft=new ne;let q=null;const J=new ne(0,0,0,0);return{setMask:function(lt){q!==lt&&!N&&(r.colorMask(lt,lt,lt,lt),q=lt)},setLocked:function(lt){N=lt},setClear:function(lt,dt,$t,ye,Ge){Ge===!0&&(lt*=ye,dt*=ye,$t*=ye),ft.set(lt,dt,$t,ye),J.equals(ft)===!1&&(r.clearColor(lt,dt,$t,ye),J.copy(ft))},reset:function(){N=!1,q=null,J.set(-1,0,0,0)}}}function e(){let N=!1,ft=!1,q=null,J=null,lt=null;return{setReversed:function(dt){ft=dt},setTest:function(dt){dt?Z(r.DEPTH_TEST):et(r.DEPTH_TEST)},setMask:function(dt){q!==dt&&!N&&(r.depthMask(dt),q=dt)},setFunc:function(dt){if(ft&&(dt=kw[dt]),J!==dt){switch(dt){case Nl:r.depthFunc(r.NEVER);break;case Ol:r.depthFunc(r.ALWAYS);break;case Ul:r.depthFunc(r.LESS);break;case ps:r.depthFunc(r.LEQUAL);break;case Fl:r.depthFunc(r.EQUAL);break;case Bl:r.depthFunc(r.GEQUAL);break;case zl:r.depthFunc(r.GREATER);break;case kl:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}J=dt}},setLocked:function(dt){N=dt},setClear:function(dt){lt!==dt&&(r.clearDepth(dt),lt=dt)},reset:function(){N=!1,q=null,J=null,lt=null}}}function n(){let N=!1,ft=null,q=null,J=null,lt=null,dt=null,$t=null,ye=null,Ge=null;return{setTest:function(Kt){N||(Kt?Z(r.STENCIL_TEST):et(r.STENCIL_TEST))},setMask:function(Kt){ft!==Kt&&!N&&(r.stencilMask(Kt),ft=Kt)},setFunc:function(Kt,We,Yn){(q!==Kt||J!==We||lt!==Yn)&&(r.stencilFunc(Kt,We,Yn),q=Kt,J=We,lt=Yn)},setOp:function(Kt,We,Yn){(dt!==Kt||$t!==We||ye!==Yn)&&(r.stencilOp(Kt,We,Yn),dt=Kt,$t=We,ye=Yn)},setLocked:function(Kt){N=Kt},setClear:function(Kt){Ge!==Kt&&(r.clearStencil(Kt),Ge=Kt)},reset:function(){N=!1,ft=null,q=null,J=null,lt=null,dt=null,$t=null,ye=null,Ge=null}}}const i=new t,s=new e,o=new n,a=new WeakMap,c=new WeakMap;let l={},u={},h=new WeakMap,f=[],d=null,g=!1,_=null,p=null,m=null,y=null,v=null,E=null,w=null,b=new Bt(0,0,0),S=0,C=!1,L=null,x=null,M=null,O=null,U=null;const V=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,z=0;const $=r.getParameter(r.VERSION);$.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec($)[1]),Y=z>=1):$.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),Y=z>=2);let W=null,rt={};const st=r.getParameter(r.SCISSOR_BOX),ct=r.getParameter(r.VIEWPORT),At=new ne().fromArray(st),Nt=new ne().fromArray(ct);function D(N,ft,q,J){const lt=new Uint8Array(4),dt=r.createTexture();r.bindTexture(N,dt),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let $t=0;$t<q;$t++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(ft,0,r.RGBA,1,1,J,0,r.RGBA,r.UNSIGNED_BYTE,lt):r.texImage2D(ft+$t,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,lt);return dt}const H={};H[r.TEXTURE_2D]=D(r.TEXTURE_2D,r.TEXTURE_2D,1),H[r.TEXTURE_CUBE_MAP]=D(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),H[r.TEXTURE_2D_ARRAY]=D(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),H[r.TEXTURE_3D]=D(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),o.setClear(0),Z(r.DEPTH_TEST),s.setFunc(ps),zt(!1),Ht(Bf),Z(r.CULL_FACE),I(wi);function Z(N){l[N]!==!0&&(r.enable(N),l[N]=!0)}function et(N){l[N]!==!1&&(r.disable(N),l[N]=!1)}function St(N,ft){return u[N]!==ft?(r.bindFramebuffer(N,ft),u[N]=ft,N===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=ft),N===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=ft),!0):!1}function bt(N,ft){let q=f,J=!1;if(N){q=h.get(ft),q===void 0&&(q=[],h.set(ft,q));const lt=N.textures;if(q.length!==lt.length||q[0]!==r.COLOR_ATTACHMENT0){for(let dt=0,$t=lt.length;dt<$t;dt++)q[dt]=r.COLOR_ATTACHMENT0+dt;q.length=lt.length,J=!0}}else q[0]!==r.BACK&&(q[0]=r.BACK,J=!0);J&&r.drawBuffers(q)}function kt(N){return d!==N?(r.useProgram(N),d=N,!0):!1}const Yt={[er]:r.FUNC_ADD,[rS]:r.FUNC_SUBTRACT,[sS]:r.FUNC_REVERSE_SUBTRACT};Yt[oS]=r.MIN,Yt[aS]=r.MAX;const Vt={[cS]:r.ZERO,[lS]:r.ONE,[uS]:r.SRC_COLOR,[Dl]:r.SRC_ALPHA,[_S]:r.SRC_ALPHA_SATURATE,[pS]:r.DST_COLOR,[fS]:r.DST_ALPHA,[hS]:r.ONE_MINUS_SRC_COLOR,[Il]:r.ONE_MINUS_SRC_ALPHA,[mS]:r.ONE_MINUS_DST_COLOR,[dS]:r.ONE_MINUS_DST_ALPHA,[gS]:r.CONSTANT_COLOR,[vS]:r.ONE_MINUS_CONSTANT_COLOR,[xS]:r.CONSTANT_ALPHA,[yS]:r.ONE_MINUS_CONSTANT_ALPHA};function I(N,ft,q,J,lt,dt,$t,ye,Ge,Kt){if(N===wi){g===!0&&(et(r.BLEND),g=!1);return}if(g===!1&&(Z(r.BLEND),g=!0),N!==iS){if(N!==_||Kt!==C){if((p!==er||v!==er)&&(r.blendEquation(r.FUNC_ADD),p=er,v=er),Kt)switch(N){case Qr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case zf:r.blendFunc(r.ONE,r.ONE);break;case kf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Vf:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Qr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case zf:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case kf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Vf:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}m=null,y=null,E=null,w=null,b.set(0,0,0),S=0,_=N,C=Kt}return}lt=lt||ft,dt=dt||q,$t=$t||J,(ft!==p||lt!==v)&&(r.blendEquationSeparate(Yt[ft],Yt[lt]),p=ft,v=lt),(q!==m||J!==y||dt!==E||$t!==w)&&(r.blendFuncSeparate(Vt[q],Vt[J],Vt[dt],Vt[$t]),m=q,y=J,E=dt,w=$t),(ye.equals(b)===!1||Ge!==S)&&(r.blendColor(ye.r,ye.g,ye.b,Ge),b.copy(ye),S=Ge),_=N,C=!1}function Fe(N,ft){N.side===ze?et(r.CULL_FACE):Z(r.CULL_FACE);let q=N.side===He;ft&&(q=!q),zt(q),N.blending===Qr&&N.transparent===!1?I(wi):I(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),s.setFunc(N.depthFunc),s.setTest(N.depthTest),s.setMask(N.depthWrite),i.setMask(N.colorWrite);const J=N.stencilWrite;o.setTest(J),J&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ie(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Z(r.SAMPLE_ALPHA_TO_COVERAGE):et(r.SAMPLE_ALPHA_TO_COVERAGE)}function zt(N){L!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),L=N)}function Ht(N){N!==tS?(Z(r.CULL_FACE),N!==x&&(N===Bf?r.cullFace(r.BACK):N===eS?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):et(r.CULL_FACE),x=N}function wt(N){N!==M&&(Y&&r.lineWidth(N),M=N)}function ie(N,ft,q){N?(Z(r.POLYGON_OFFSET_FILL),(O!==ft||U!==q)&&(r.polygonOffset(ft,q),O=ft,U=q)):et(r.POLYGON_OFFSET_FILL)}function Rt(N){N?Z(r.SCISSOR_TEST):et(r.SCISSOR_TEST)}function R(N){N===void 0&&(N=r.TEXTURE0+V-1),W!==N&&(r.activeTexture(N),W=N)}function T(N,ft,q){q===void 0&&(W===null?q=r.TEXTURE0+V-1:q=W);let J=rt[q];J===void 0&&(J={type:void 0,texture:void 0},rt[q]=J),(J.type!==N||J.texture!==ft)&&(W!==q&&(r.activeTexture(q),W=q),r.bindTexture(N,ft||H[N]),J.type=N,J.texture=ft)}function k(){const N=rt[W];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function j(){try{r.compressedTexImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function tt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{r.texSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xt(){try{r.texSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ot(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ht(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function qt(){try{r.texStorage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function nt(){try{r.texStorage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _t(){try{r.texImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Lt(){try{r.texImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Dt(N){At.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),At.copy(N))}function gt(N){Nt.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),Nt.copy(N))}function Wt(N,ft){let q=c.get(ft);q===void 0&&(q=new WeakMap,c.set(ft,q));let J=q.get(N);J===void 0&&(J=r.getUniformBlockIndex(ft,N.name),q.set(N,J))}function It(N,ft){const J=c.get(ft).get(N);a.get(ft)!==J&&(r.uniformBlockBinding(ft,J,N.__bindingPointIndex),a.set(ft,J))}function oe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),l={},W=null,rt={},u={},h=new WeakMap,f=[],d=null,g=!1,_=null,p=null,m=null,y=null,v=null,E=null,w=null,b=new Bt(0,0,0),S=0,C=!1,L=null,x=null,M=null,O=null,U=null,At.set(0,0,r.canvas.width,r.canvas.height),Nt.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),o.reset()}return{buffers:{color:i,depth:s,stencil:o},enable:Z,disable:et,bindFramebuffer:St,drawBuffers:bt,useProgram:kt,setBlending:I,setMaterial:Fe,setFlipSided:zt,setCullFace:Ht,setLineWidth:wt,setPolygonOffset:ie,setScissorTest:Rt,activeTexture:R,bindTexture:T,unbindTexture:k,compressedTexImage2D:j,compressedTexImage3D:tt,texImage2D:_t,texImage3D:Lt,updateUBOMapping:Wt,uniformBlockBinding:It,texStorage2D:qt,texStorage3D:nt,texSubImage2D:K,texSubImage3D:xt,compressedTexSubImage2D:ot,compressedTexSubImage3D:ht,scissor:Dt,viewport:gt,reset:oe}}function Ld(r,t,e,n){const i=Hw(n);switch(e){case jm:return r*t;case Zm:return r*t;case Qm:return r*t*2;case t_:return r*t/i.components*i.byteLength;case ch:return r*t/i.components*i.byteLength;case e_:return r*t*2/i.components*i.byteLength;case lh:return r*t*2/i.components*i.byteLength;case Jm:return r*t*3/i.components*i.byteLength;case In:return r*t*4/i.components*i.byteLength;case uh:return r*t*4/i.components*i.byteLength;case la:case ua:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ha:case fa:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case $l:case ql:return Math.max(r,16)*Math.max(t,8)/4;case Xl:case Yl:return Math.max(r,8)*Math.max(t,8)/2;case Kl:case jl:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Jl:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Zl:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ql:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case tu:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case eu:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case nu:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case iu:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case ru:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case su:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case ou:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case au:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case cu:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case lu:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case uu:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case hu:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case da:case fu:case du:return Math.ceil(r/4)*Math.ceil(t/4)*16;case n_:case pu:return Math.ceil(r/4)*Math.ceil(t/4)*8;case mu:case _u:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Hw(r){switch(r){case ui:case Ym:return{byteLength:1,components:1};case ro:case qm:case ho:return{byteLength:2,components:1};case oh:case ah:return{byteLength:2,components:4};case gr:case sh:case ni:return{byteLength:4,components:1};case Km:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function Gw(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new mt,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,T){return d?new OffscreenCanvas(R,T):Ia("canvas")}function _(R,T,k){let j=1;const tt=Rt(R);if((tt.width>k||tt.height>k)&&(j=k/Math.max(tt.width,tt.height)),j<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const K=Math.floor(j*tt.width),xt=Math.floor(j*tt.height);h===void 0&&(h=g(K,xt));const ot=T?g(K,xt):h;return ot.width=K,ot.height=xt,ot.getContext("2d").drawImage(R,0,0,K,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+K+"x"+xt+")."),ot}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),R;return R}function p(R){return R.generateMipmaps&&R.minFilter!==Sn&&R.minFilter!==Dn}function m(R){r.generateMipmap(R)}function y(R,T,k,j,tt=!1){if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let K=T;if(T===r.RED&&(k===r.FLOAT&&(K=r.R32F),k===r.HALF_FLOAT&&(K=r.R16F),k===r.UNSIGNED_BYTE&&(K=r.R8)),T===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.R8UI),k===r.UNSIGNED_SHORT&&(K=r.R16UI),k===r.UNSIGNED_INT&&(K=r.R32UI),k===r.BYTE&&(K=r.R8I),k===r.SHORT&&(K=r.R16I),k===r.INT&&(K=r.R32I)),T===r.RG&&(k===r.FLOAT&&(K=r.RG32F),k===r.HALF_FLOAT&&(K=r.RG16F),k===r.UNSIGNED_BYTE&&(K=r.RG8)),T===r.RG_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.RG8UI),k===r.UNSIGNED_SHORT&&(K=r.RG16UI),k===r.UNSIGNED_INT&&(K=r.RG32UI),k===r.BYTE&&(K=r.RG8I),k===r.SHORT&&(K=r.RG16I),k===r.INT&&(K=r.RG32I)),T===r.RGB_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.RGB8UI),k===r.UNSIGNED_SHORT&&(K=r.RGB16UI),k===r.UNSIGNED_INT&&(K=r.RGB32UI),k===r.BYTE&&(K=r.RGB8I),k===r.SHORT&&(K=r.RGB16I),k===r.INT&&(K=r.RGB32I)),T===r.RGBA_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.RGBA8UI),k===r.UNSIGNED_SHORT&&(K=r.RGBA16UI),k===r.UNSIGNED_INT&&(K=r.RGBA32UI),k===r.BYTE&&(K=r.RGBA8I),k===r.SHORT&&(K=r.RGBA16I),k===r.INT&&(K=r.RGBA32I)),T===r.RGB&&k===r.UNSIGNED_INT_5_9_9_9_REV&&(K=r.RGB9_E5),T===r.RGBA){const xt=tt?Ra:Zt.getTransfer(j);k===r.FLOAT&&(K=r.RGBA32F),k===r.HALF_FLOAT&&(K=r.RGBA16F),k===r.UNSIGNED_BYTE&&(K=xt===ue?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT_4_4_4_4&&(K=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(K=r.RGB5_A1)}return(K===r.R16F||K===r.R32F||K===r.RG16F||K===r.RG32F||K===r.RGBA16F||K===r.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function v(R,T){let k;return R?T===null||T===gr||T===gs?k=r.DEPTH24_STENCIL8:T===ni?k=r.DEPTH32F_STENCIL8:T===ro&&(k=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===gr||T===gs?k=r.DEPTH_COMPONENT24:T===ni?k=r.DEPTH_COMPONENT32F:T===ro&&(k=r.DEPTH_COMPONENT16),k}function E(R,T){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==Sn&&R.minFilter!==Dn?Math.log2(Math.max(T.width,T.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?T.mipmaps.length:1}function w(R){const T=R.target;T.removeEventListener("dispose",w),S(T),T.isVideoTexture&&u.delete(T)}function b(R){const T=R.target;T.removeEventListener("dispose",b),L(T)}function S(R){const T=n.get(R);if(T.__webglInit===void 0)return;const k=R.source,j=f.get(k);if(j){const tt=j[T.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&C(R),Object.keys(j).length===0&&f.delete(k)}n.remove(R)}function C(R){const T=n.get(R);r.deleteTexture(T.__webglTexture);const k=R.source,j=f.get(k);delete j[T.__cacheKey],o.memory.textures--}function L(R){const T=n.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(T.__webglFramebuffer[j]))for(let tt=0;tt<T.__webglFramebuffer[j].length;tt++)r.deleteFramebuffer(T.__webglFramebuffer[j][tt]);else r.deleteFramebuffer(T.__webglFramebuffer[j]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[j])}else{if(Array.isArray(T.__webglFramebuffer))for(let j=0;j<T.__webglFramebuffer.length;j++)r.deleteFramebuffer(T.__webglFramebuffer[j]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let j=0;j<T.__webglColorRenderbuffer.length;j++)T.__webglColorRenderbuffer[j]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[j]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const k=R.textures;for(let j=0,tt=k.length;j<tt;j++){const K=n.get(k[j]);K.__webglTexture&&(r.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(k[j])}n.remove(R)}let x=0;function M(){x=0}function O(){const R=x;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),x+=1,R}function U(R){const T=[];return T.push(R.wrapS),T.push(R.wrapT),T.push(R.wrapR||0),T.push(R.magFilter),T.push(R.minFilter),T.push(R.anisotropy),T.push(R.internalFormat),T.push(R.format),T.push(R.type),T.push(R.generateMipmaps),T.push(R.premultiplyAlpha),T.push(R.flipY),T.push(R.unpackAlignment),T.push(R.colorSpace),T.join()}function V(R,T){const k=n.get(R);if(R.isVideoTexture&&wt(R),R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){const j=R.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Nt(k,R,T);return}}e.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+T)}function Y(R,T){const k=n.get(R);if(R.version>0&&k.__version!==R.version){Nt(k,R,T);return}e.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+T)}function z(R,T){const k=n.get(R);if(R.version>0&&k.__version!==R.version){Nt(k,R,T);return}e.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+T)}function $(R,T){const k=n.get(R);if(R.version>0&&k.__version!==R.version){D(k,R,T);return}e.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+T)}const W={[Gl]:r.REPEAT,[or]:r.CLAMP_TO_EDGE,[Wl]:r.MIRRORED_REPEAT},rt={[Sn]:r.NEAREST,[RS]:r.NEAREST_MIPMAP_NEAREST,[Co]:r.NEAREST_MIPMAP_LINEAR,[Dn]:r.LINEAR,[Cc]:r.LINEAR_MIPMAP_NEAREST,[ar]:r.LINEAR_MIPMAP_LINEAR},st={[IS]:r.NEVER,[zS]:r.ALWAYS,[NS]:r.LESS,[r_]:r.LEQUAL,[OS]:r.EQUAL,[BS]:r.GEQUAL,[US]:r.GREATER,[FS]:r.NOTEQUAL};function ct(R,T){if(T.type===ni&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Dn||T.magFilter===Cc||T.magFilter===Co||T.magFilter===ar||T.minFilter===Dn||T.minFilter===Cc||T.minFilter===Co||T.minFilter===ar)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,W[T.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,W[T.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,W[T.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,rt[T.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,rt[T.minFilter]),T.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,st[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Sn||T.minFilter!==Co&&T.minFilter!==ar||T.type===ni&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");r.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function At(R,T){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,T.addEventListener("dispose",w));const j=T.source;let tt=f.get(j);tt===void 0&&(tt={},f.set(j,tt));const K=U(T);if(K!==R.__cacheKey){tt[K]===void 0&&(tt[K]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,k=!0),tt[K].usedTimes++;const xt=tt[R.__cacheKey];xt!==void 0&&(tt[R.__cacheKey].usedTimes--,xt.usedTimes===0&&C(T)),R.__cacheKey=K,R.__webglTexture=tt[K].texture}return k}function Nt(R,T,k){let j=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(j=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(j=r.TEXTURE_3D);const tt=At(R,T),K=T.source;e.bindTexture(j,R.__webglTexture,r.TEXTURE0+k);const xt=n.get(K);if(K.version!==xt.__version||tt===!0){e.activeTexture(r.TEXTURE0+k);const ot=Zt.getPrimaries(Zt.workingColorSpace),ht=T.colorSpace===Ei?null:Zt.getPrimaries(T.colorSpace),qt=T.colorSpace===Ei||ot===ht?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,qt);let nt=_(T.image,!1,i.maxTextureSize);nt=ie(T,nt);const _t=s.convert(T.format,T.colorSpace),Lt=s.convert(T.type);let Dt=y(T.internalFormat,_t,Lt,T.colorSpace,T.isVideoTexture);ct(j,T);let gt;const Wt=T.mipmaps,It=T.isVideoTexture!==!0,oe=xt.__version===void 0||tt===!0,N=K.dataReady,ft=E(T,nt);if(T.isDepthTexture)Dt=v(T.format===vs,T.type),oe&&(It?e.texStorage2D(r.TEXTURE_2D,1,Dt,nt.width,nt.height):e.texImage2D(r.TEXTURE_2D,0,Dt,nt.width,nt.height,0,_t,Lt,null));else if(T.isDataTexture)if(Wt.length>0){It&&oe&&e.texStorage2D(r.TEXTURE_2D,ft,Dt,Wt[0].width,Wt[0].height);for(let q=0,J=Wt.length;q<J;q++)gt=Wt[q],It?N&&e.texSubImage2D(r.TEXTURE_2D,q,0,0,gt.width,gt.height,_t,Lt,gt.data):e.texImage2D(r.TEXTURE_2D,q,Dt,gt.width,gt.height,0,_t,Lt,gt.data);T.generateMipmaps=!1}else It?(oe&&e.texStorage2D(r.TEXTURE_2D,ft,Dt,nt.width,nt.height),N&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,nt.width,nt.height,_t,Lt,nt.data)):e.texImage2D(r.TEXTURE_2D,0,Dt,nt.width,nt.height,0,_t,Lt,nt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){It&&oe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ft,Dt,Wt[0].width,Wt[0].height,nt.depth);for(let q=0,J=Wt.length;q<J;q++)if(gt=Wt[q],T.format!==In)if(_t!==null)if(It){if(N)if(T.layerUpdates.size>0){const lt=Ld(gt.width,gt.height,T.format,T.type);for(const dt of T.layerUpdates){const $t=gt.data.subarray(dt*lt/gt.data.BYTES_PER_ELEMENT,(dt+1)*lt/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,dt,gt.width,gt.height,1,_t,$t,0,0)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,0,gt.width,gt.height,nt.depth,_t,gt.data,0,0)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,q,Dt,gt.width,gt.height,nt.depth,0,gt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else It?N&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,0,gt.width,gt.height,nt.depth,_t,Lt,gt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,q,Dt,gt.width,gt.height,nt.depth,0,_t,Lt,gt.data)}else{It&&oe&&e.texStorage2D(r.TEXTURE_2D,ft,Dt,Wt[0].width,Wt[0].height);for(let q=0,J=Wt.length;q<J;q++)gt=Wt[q],T.format!==In?_t!==null?It?N&&e.compressedTexSubImage2D(r.TEXTURE_2D,q,0,0,gt.width,gt.height,_t,gt.data):e.compressedTexImage2D(r.TEXTURE_2D,q,Dt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):It?N&&e.texSubImage2D(r.TEXTURE_2D,q,0,0,gt.width,gt.height,_t,Lt,gt.data):e.texImage2D(r.TEXTURE_2D,q,Dt,gt.width,gt.height,0,_t,Lt,gt.data)}else if(T.isDataArrayTexture)if(It){if(oe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ft,Dt,nt.width,nt.height,nt.depth),N)if(T.layerUpdates.size>0){const q=Ld(nt.width,nt.height,T.format,T.type);for(const J of T.layerUpdates){const lt=nt.data.subarray(J*q/nt.data.BYTES_PER_ELEMENT,(J+1)*q/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,J,nt.width,nt.height,1,_t,Lt,lt)}T.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,_t,Lt,nt.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Dt,nt.width,nt.height,nt.depth,0,_t,Lt,nt.data);else if(T.isData3DTexture)It?(oe&&e.texStorage3D(r.TEXTURE_3D,ft,Dt,nt.width,nt.height,nt.depth),N&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,_t,Lt,nt.data)):e.texImage3D(r.TEXTURE_3D,0,Dt,nt.width,nt.height,nt.depth,0,_t,Lt,nt.data);else if(T.isFramebufferTexture){if(oe)if(It)e.texStorage2D(r.TEXTURE_2D,ft,Dt,nt.width,nt.height);else{let q=nt.width,J=nt.height;for(let lt=0;lt<ft;lt++)e.texImage2D(r.TEXTURE_2D,lt,Dt,q,J,0,_t,Lt,null),q>>=1,J>>=1}}else if(Wt.length>0){if(It&&oe){const q=Rt(Wt[0]);e.texStorage2D(r.TEXTURE_2D,ft,Dt,q.width,q.height)}for(let q=0,J=Wt.length;q<J;q++)gt=Wt[q],It?N&&e.texSubImage2D(r.TEXTURE_2D,q,0,0,_t,Lt,gt):e.texImage2D(r.TEXTURE_2D,q,Dt,_t,Lt,gt);T.generateMipmaps=!1}else if(It){if(oe){const q=Rt(nt);e.texStorage2D(r.TEXTURE_2D,ft,Dt,q.width,q.height)}N&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,_t,Lt,nt)}else e.texImage2D(r.TEXTURE_2D,0,Dt,_t,Lt,nt);p(T)&&m(j),xt.__version=K.version,T.onUpdate&&T.onUpdate(T)}R.__version=T.version}function D(R,T,k){if(T.image.length!==6)return;const j=At(R,T),tt=T.source;e.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+k);const K=n.get(tt);if(tt.version!==K.__version||j===!0){e.activeTexture(r.TEXTURE0+k);const xt=Zt.getPrimaries(Zt.workingColorSpace),ot=T.colorSpace===Ei?null:Zt.getPrimaries(T.colorSpace),ht=T.colorSpace===Ei||xt===ot?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);const qt=T.isCompressedTexture||T.image[0].isCompressedTexture,nt=T.image[0]&&T.image[0].isDataTexture,_t=[];for(let J=0;J<6;J++)!qt&&!nt?_t[J]=_(T.image[J],!0,i.maxCubemapSize):_t[J]=nt?T.image[J].image:T.image[J],_t[J]=ie(T,_t[J]);const Lt=_t[0],Dt=s.convert(T.format,T.colorSpace),gt=s.convert(T.type),Wt=y(T.internalFormat,Dt,gt,T.colorSpace),It=T.isVideoTexture!==!0,oe=K.__version===void 0||j===!0,N=tt.dataReady;let ft=E(T,Lt);ct(r.TEXTURE_CUBE_MAP,T);let q;if(qt){It&&oe&&e.texStorage2D(r.TEXTURE_CUBE_MAP,ft,Wt,Lt.width,Lt.height);for(let J=0;J<6;J++){q=_t[J].mipmaps;for(let lt=0;lt<q.length;lt++){const dt=q[lt];T.format!==In?Dt!==null?It?N&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,lt,0,0,dt.width,dt.height,Dt,dt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,lt,Wt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):It?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,lt,0,0,dt.width,dt.height,Dt,gt,dt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,lt,Wt,dt.width,dt.height,0,Dt,gt,dt.data)}}}else{if(q=T.mipmaps,It&&oe){q.length>0&&ft++;const J=Rt(_t[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,ft,Wt,J.width,J.height)}for(let J=0;J<6;J++)if(nt){It?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,_t[J].width,_t[J].height,Dt,gt,_t[J].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Wt,_t[J].width,_t[J].height,0,Dt,gt,_t[J].data);for(let lt=0;lt<q.length;lt++){const $t=q[lt].image[J].image;It?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,lt+1,0,0,$t.width,$t.height,Dt,gt,$t.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,lt+1,Wt,$t.width,$t.height,0,Dt,gt,$t.data)}}else{It?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Dt,gt,_t[J]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Wt,Dt,gt,_t[J]);for(let lt=0;lt<q.length;lt++){const dt=q[lt];It?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,lt+1,0,0,Dt,gt,dt.image[J]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,lt+1,Wt,Dt,gt,dt.image[J])}}}p(T)&&m(r.TEXTURE_CUBE_MAP),K.__version=tt.version,T.onUpdate&&T.onUpdate(T)}R.__version=T.version}function H(R,T,k,j,tt,K){const xt=s.convert(k.format,k.colorSpace),ot=s.convert(k.type),ht=y(k.internalFormat,xt,ot,k.colorSpace);if(!n.get(T).__hasExternalTextures){const nt=Math.max(1,T.width>>K),_t=Math.max(1,T.height>>K);tt===r.TEXTURE_3D||tt===r.TEXTURE_2D_ARRAY?e.texImage3D(tt,K,ht,nt,_t,T.depth,0,xt,ot,null):e.texImage2D(tt,K,ht,nt,_t,0,xt,ot,null)}e.bindFramebuffer(r.FRAMEBUFFER,R),Ht(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,j,tt,n.get(k).__webglTexture,0,zt(T)):(tt===r.TEXTURE_2D||tt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,j,tt,n.get(k).__webglTexture,K),e.bindFramebuffer(r.FRAMEBUFFER,null)}function Z(R,T,k){if(r.bindRenderbuffer(r.RENDERBUFFER,R),T.depthBuffer){const j=T.depthTexture,tt=j&&j.isDepthTexture?j.type:null,K=v(T.stencilBuffer,tt),xt=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ot=zt(T);Ht(T)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ot,K,T.width,T.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,ot,K,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,K,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,xt,r.RENDERBUFFER,R)}else{const j=T.textures;for(let tt=0;tt<j.length;tt++){const K=j[tt],xt=s.convert(K.format,K.colorSpace),ot=s.convert(K.type),ht=y(K.internalFormat,xt,ot,K.colorSpace),qt=zt(T);k&&Ht(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,qt,ht,T.width,T.height):Ht(T)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,qt,ht,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,ht,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function et(R,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,R),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),V(T.depthTexture,0);const j=n.get(T.depthTexture).__webglTexture,tt=zt(T);if(T.depthTexture.format===ts)Ht(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0,tt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0);else if(T.depthTexture.format===vs)Ht(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0,tt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function St(R){const T=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==R.depthTexture){const j=R.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),j){const tt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,j.removeEventListener("dispose",tt)};j.addEventListener("dispose",tt),T.__depthDisposeCallback=tt}T.__boundDepthTexture=j}if(R.depthTexture&&!T.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");et(T.__webglFramebuffer,R)}else if(k){T.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[j]),T.__webglDepthbuffer[j]===void 0)T.__webglDepthbuffer[j]=r.createRenderbuffer(),Z(T.__webglDepthbuffer[j],R,!1);else{const tt=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,K=T.__webglDepthbuffer[j];r.bindRenderbuffer(r.RENDERBUFFER,K),r.framebufferRenderbuffer(r.FRAMEBUFFER,tt,r.RENDERBUFFER,K)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),Z(T.__webglDepthbuffer,R,!1);else{const j=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,tt=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,tt),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,tt)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function bt(R,T,k){const j=n.get(R);T!==void 0&&H(j.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&St(R)}function kt(R){const T=R.texture,k=n.get(R),j=n.get(T);R.addEventListener("dispose",b);const tt=R.textures,K=R.isWebGLCubeRenderTarget===!0,xt=tt.length>1;if(xt||(j.__webglTexture===void 0&&(j.__webglTexture=r.createTexture()),j.__version=T.version,o.memory.textures++),K){k.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(T.mipmaps&&T.mipmaps.length>0){k.__webglFramebuffer[ot]=[];for(let ht=0;ht<T.mipmaps.length;ht++)k.__webglFramebuffer[ot][ht]=r.createFramebuffer()}else k.__webglFramebuffer[ot]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){k.__webglFramebuffer=[];for(let ot=0;ot<T.mipmaps.length;ot++)k.__webglFramebuffer[ot]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(xt)for(let ot=0,ht=tt.length;ot<ht;ot++){const qt=n.get(tt[ot]);qt.__webglTexture===void 0&&(qt.__webglTexture=r.createTexture(),o.memory.textures++)}if(R.samples>0&&Ht(R)===!1){k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ot=0;ot<tt.length;ot++){const ht=tt[ot];k.__webglColorRenderbuffer[ot]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[ot]);const qt=s.convert(ht.format,ht.colorSpace),nt=s.convert(ht.type),_t=y(ht.internalFormat,qt,nt,ht.colorSpace,R.isXRRenderTarget===!0),Lt=zt(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt,_t,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ot,r.RENDERBUFFER,k.__webglColorRenderbuffer[ot])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),Z(k.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(K){e.bindTexture(r.TEXTURE_CUBE_MAP,j.__webglTexture),ct(r.TEXTURE_CUBE_MAP,T);for(let ot=0;ot<6;ot++)if(T.mipmaps&&T.mipmaps.length>0)for(let ht=0;ht<T.mipmaps.length;ht++)H(k.__webglFramebuffer[ot][ht],R,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,ht);else H(k.__webglFramebuffer[ot],R,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);p(T)&&m(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let ot=0,ht=tt.length;ot<ht;ot++){const qt=tt[ot],nt=n.get(qt);e.bindTexture(r.TEXTURE_2D,nt.__webglTexture),ct(r.TEXTURE_2D,qt),H(k.__webglFramebuffer,R,qt,r.COLOR_ATTACHMENT0+ot,r.TEXTURE_2D,0),p(qt)&&m(r.TEXTURE_2D)}e.unbindTexture()}else{let ot=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ot=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ot,j.__webglTexture),ct(ot,T),T.mipmaps&&T.mipmaps.length>0)for(let ht=0;ht<T.mipmaps.length;ht++)H(k.__webglFramebuffer[ht],R,T,r.COLOR_ATTACHMENT0,ot,ht);else H(k.__webglFramebuffer,R,T,r.COLOR_ATTACHMENT0,ot,0);p(T)&&m(ot),e.unbindTexture()}R.depthBuffer&&St(R)}function Yt(R){const T=R.textures;for(let k=0,j=T.length;k<j;k++){const tt=T[k];if(p(tt)){const K=R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,xt=n.get(tt).__webglTexture;e.bindTexture(K,xt),m(K),e.unbindTexture()}}}const Vt=[],I=[];function Fe(R){if(R.samples>0){if(Ht(R)===!1){const T=R.textures,k=R.width,j=R.height;let tt=r.COLOR_BUFFER_BIT;const K=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,xt=n.get(R),ot=T.length>1;if(ot)for(let ht=0;ht<T.length;ht++)e.bindFramebuffer(r.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ht,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,xt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ht,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let ht=0;ht<T.length;ht++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(tt|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(tt|=r.STENCIL_BUFFER_BIT)),ot){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,xt.__webglColorRenderbuffer[ht]);const qt=n.get(T[ht]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,qt,0)}r.blitFramebuffer(0,0,k,j,0,0,k,j,tt,r.NEAREST),c===!0&&(Vt.length=0,I.length=0,Vt.push(r.COLOR_ATTACHMENT0+ht),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Vt.push(K),I.push(K),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,I)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Vt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ot)for(let ht=0;ht<T.length;ht++){e.bindFramebuffer(r.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ht,r.RENDERBUFFER,xt.__webglColorRenderbuffer[ht]);const qt=n.get(T[ht]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,xt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ht,r.TEXTURE_2D,qt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const T=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function zt(R){return Math.min(i.maxSamples,R.samples)}function Ht(R){const T=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function wt(R){const T=o.render.frame;u.get(R)!==T&&(u.set(R,T),R.update())}function ie(R,T){const k=R.colorSpace,j=R.format,tt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==Hi&&k!==Ei&&(Zt.getTransfer(k)===ue?(j!==In||tt!==ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),T}function Rt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=O,this.resetTextureUnits=M,this.setTexture2D=V,this.setTexture2DArray=Y,this.setTexture3D=z,this.setTextureCube=$,this.rebindTextures=bt,this.setupRenderTarget=kt,this.updateRenderTargetMipmap=Yt,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=H,this.useMultisampledRTT=Ht}function Ww(r,t){function e(n,i=Ei){let s;const o=Zt.getTransfer(i);if(n===ui)return r.UNSIGNED_BYTE;if(n===oh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===ah)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Km)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Ym)return r.BYTE;if(n===qm)return r.SHORT;if(n===ro)return r.UNSIGNED_SHORT;if(n===sh)return r.INT;if(n===gr)return r.UNSIGNED_INT;if(n===ni)return r.FLOAT;if(n===ho)return r.HALF_FLOAT;if(n===jm)return r.ALPHA;if(n===Jm)return r.RGB;if(n===In)return r.RGBA;if(n===Zm)return r.LUMINANCE;if(n===Qm)return r.LUMINANCE_ALPHA;if(n===ts)return r.DEPTH_COMPONENT;if(n===vs)return r.DEPTH_STENCIL;if(n===t_)return r.RED;if(n===ch)return r.RED_INTEGER;if(n===e_)return r.RG;if(n===lh)return r.RG_INTEGER;if(n===uh)return r.RGBA_INTEGER;if(n===la||n===ua||n===ha||n===fa)if(o===ue)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===la)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ua)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ha)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===la)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ua)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ha)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fa)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xl||n===$l||n===Yl||n===ql)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Xl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===$l)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Yl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ql)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Kl||n===jl||n===Jl)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Kl||n===jl)return o===ue?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Jl)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Zl||n===Ql||n===tu||n===eu||n===nu||n===iu||n===ru||n===su||n===ou||n===au||n===cu||n===lu||n===uu||n===hu)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Zl)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ql)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===tu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===eu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===nu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===iu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ru)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===su)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ou)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===au)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===cu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===lu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===uu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===hu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===da||n===fu||n===du)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===da)return o===ue?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===fu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===du)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===n_||n===pu||n===mu||n===_u)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===da)return s.COMPRESSED_RED_RGTC1_EXT;if(n===pu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===mu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===_u)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===gs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class Xw extends on{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class te extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $w={type:"move"};class il{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new te,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new te,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new te,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),m=this._getHandJoint(l,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent($w)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new te;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Yw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qw=`
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

}`;class Kw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Ze,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Fi({vertexShader:Yw,fragmentShader:qw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new pt(new Xn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class jw extends bs{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null;const _=new Kw,p=e.getContextAttributes();let m=null,y=null;const v=[],E=[],w=new mt;let b=null;const S=new on;S.layers.enable(1),S.viewport=new ne;const C=new on;C.layers.enable(2),C.viewport=new ne;const L=[S,C],x=new Xw;x.layers.enable(1),x.layers.enable(2);let M=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(D){let H=v[D];return H===void 0&&(H=new il,v[D]=H),H.getTargetRaySpace()},this.getControllerGrip=function(D){let H=v[D];return H===void 0&&(H=new il,v[D]=H),H.getGripSpace()},this.getHand=function(D){let H=v[D];return H===void 0&&(H=new il,v[D]=H),H.getHandSpace()};function U(D){const H=E.indexOf(D.inputSource);if(H===-1)return;const Z=v[H];Z!==void 0&&(Z.update(D.inputSource,D.frame,l||o),Z.dispatchEvent({type:D.type,data:D.inputSource}))}function V(){i.removeEventListener("select",U),i.removeEventListener("selectstart",U),i.removeEventListener("selectend",U),i.removeEventListener("squeeze",U),i.removeEventListener("squeezestart",U),i.removeEventListener("squeezeend",U),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",Y);for(let D=0;D<v.length;D++){const H=E[D];H!==null&&(E[D]=null,v[D].disconnect(H))}M=null,O=null,_.reset(),t.setRenderTarget(m),d=null,f=null,h=null,i=null,y=null,Nt.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(D){s=D,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(D){a=D,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(D){l=D},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(D){if(i=D,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",U),i.addEventListener("selectstart",U),i.addEventListener("selectend",U),i.addEventListener("squeeze",U),i.addEventListener("squeezestart",U),i.addEventListener("squeezeend",U),i.addEventListener("end",V),i.addEventListener("inputsourceschange",Y),p.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(w),i.renderState.layers===void 0){const H={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,e,H),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new vr(d.framebufferWidth,d.framebufferHeight,{format:In,type:ui,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let H=null,Z=null,et=null;p.depth&&(et=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,H=p.stencil?vs:ts,Z=p.stencil?gs:gr);const St={colorFormat:e.RGBA8,depthFormat:et,scaleFactor:s};h=new XRWebGLBinding(i,e),f=h.createProjectionLayer(St),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new vr(f.textureWidth,f.textureHeight,{format:In,type:ui,depthTexture:new g_(f.textureWidth,f.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,H),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),Nt.setContext(i),Nt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y(D){for(let H=0;H<D.removed.length;H++){const Z=D.removed[H],et=E.indexOf(Z);et>=0&&(E[et]=null,v[et].disconnect(Z))}for(let H=0;H<D.added.length;H++){const Z=D.added[H];let et=E.indexOf(Z);if(et===-1){for(let bt=0;bt<v.length;bt++)if(bt>=E.length){E.push(Z),et=bt;break}else if(E[bt]===null){E[bt]=Z,et=bt;break}if(et===-1)break}const St=v[et];St&&St.connect(Z)}}const z=new P,$=new P;function W(D,H,Z){z.setFromMatrixPosition(H.matrixWorld),$.setFromMatrixPosition(Z.matrixWorld);const et=z.distanceTo($),St=H.projectionMatrix.elements,bt=Z.projectionMatrix.elements,kt=St[14]/(St[10]-1),Yt=St[14]/(St[10]+1),Vt=(St[9]+1)/St[5],I=(St[9]-1)/St[5],Fe=(St[8]-1)/St[0],zt=(bt[8]+1)/bt[0],Ht=kt*Fe,wt=kt*zt,ie=et/(-Fe+zt),Rt=ie*-Fe;if(H.matrixWorld.decompose(D.position,D.quaternion,D.scale),D.translateX(Rt),D.translateZ(ie),D.matrixWorld.compose(D.position,D.quaternion,D.scale),D.matrixWorldInverse.copy(D.matrixWorld).invert(),St[10]===-1)D.projectionMatrix.copy(H.projectionMatrix),D.projectionMatrixInverse.copy(H.projectionMatrixInverse);else{const R=kt+ie,T=Yt+ie,k=Ht-Rt,j=wt+(et-Rt),tt=Vt*Yt/T*R,K=I*Yt/T*R;D.projectionMatrix.makePerspective(k,j,tt,K,R,T),D.projectionMatrixInverse.copy(D.projectionMatrix).invert()}}function rt(D,H){H===null?D.matrixWorld.copy(D.matrix):D.matrixWorld.multiplyMatrices(H.matrixWorld,D.matrix),D.matrixWorldInverse.copy(D.matrixWorld).invert()}this.updateCamera=function(D){if(i===null)return;let H=D.near,Z=D.far;_.texture!==null&&(_.depthNear>0&&(H=_.depthNear),_.depthFar>0&&(Z=_.depthFar)),x.near=C.near=S.near=H,x.far=C.far=S.far=Z,(M!==x.near||O!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),M=x.near,O=x.far);const et=D.parent,St=x.cameras;rt(x,et);for(let bt=0;bt<St.length;bt++)rt(St[bt],et);St.length===2?W(x,S,C):x.projectionMatrix.copy(S.projectionMatrix),st(D,x,et)};function st(D,H,Z){Z===null?D.matrix.copy(H.matrixWorld):(D.matrix.copy(Z.matrixWorld),D.matrix.invert(),D.matrix.multiply(H.matrixWorld)),D.matrix.decompose(D.position,D.quaternion,D.scale),D.updateMatrixWorld(!0),D.projectionMatrix.copy(H.projectionMatrix),D.projectionMatrixInverse.copy(H.projectionMatrixInverse),D.isPerspectiveCamera&&(D.fov=gu*2*Math.atan(1/D.projectionMatrix.elements[5]),D.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(D){c=D,f!==null&&(f.fixedFoveation=D),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=D)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let ct=null;function At(D,H){if(u=H.getViewerPose(l||o),g=H,u!==null){const Z=u.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let et=!1;Z.length!==x.cameras.length&&(x.cameras.length=0,et=!0);for(let bt=0;bt<Z.length;bt++){const kt=Z[bt];let Yt=null;if(d!==null)Yt=d.getViewport(kt);else{const I=h.getViewSubImage(f,kt);Yt=I.viewport,bt===0&&(t.setRenderTargetTextures(y,I.colorTexture,f.ignoreDepthValues?void 0:I.depthStencilTexture),t.setRenderTarget(y))}let Vt=L[bt];Vt===void 0&&(Vt=new on,Vt.layers.enable(bt),Vt.viewport=new ne,L[bt]=Vt),Vt.matrix.fromArray(kt.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(kt.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),bt===0&&(x.matrix.copy(Vt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),et===!0&&x.cameras.push(Vt)}const St=i.enabledFeatures;if(St&&St.includes("depth-sensing")){const bt=h.getDepthInformation(Z[0]);bt&&bt.isValid&&bt.texture&&_.init(t,bt,i.renderState)}}for(let Z=0;Z<v.length;Z++){const et=E[Z],St=v[Z];et!==null&&St!==void 0&&St.update(et,H,l||o)}ct&&ct(D,H),H.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:H}),g=null}const Nt=new m_;Nt.setAnimationLoop(At),this.setAnimationLoop=function(D){ct=D},this.dispose=function(){}}}const Ji=new Wn,Jw=new ce;function Zw(r,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,f_(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,y,v,E){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),h(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m)):m.isMeshStandardMaterial?(s(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,E)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,y,v):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===He&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===He&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=t.get(m),v=y.envMap,E=y.envMapRotation;v&&(p.envMap.value=v,Ji.copy(E),Ji.x*=-1,Ji.y*=-1,Ji.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ji.y*=-1,Ji.z*=-1),p.envMapRotation.value.setFromMatrix4(Jw.makeRotationFromEuler(Ji)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,y,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=v*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===He&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const y=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Qw(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,v){const E=v.program;n.uniformBlockBinding(y,E)}function l(y,v){let E=i[y.id];E===void 0&&(g(y),E=u(y),i[y.id]=E,y.addEventListener("dispose",p));const w=v.program;n.updateUBOMapping(y,w);const b=t.render.frame;s[y.id]!==b&&(f(y),s[y.id]=b)}function u(y){const v=h();y.__bindingPointIndex=v;const E=r.createBuffer(),w=y.__size,b=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,E),r.bufferData(r.UNIFORM_BUFFER,w,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,E),E}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const v=i[y.id],E=y.uniforms,w=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let b=0,S=E.length;b<S;b++){const C=Array.isArray(E[b])?E[b]:[E[b]];for(let L=0,x=C.length;L<x;L++){const M=C[L];if(d(M,b,L,w)===!0){const O=M.__offset,U=Array.isArray(M.value)?M.value:[M.value];let V=0;for(let Y=0;Y<U.length;Y++){const z=U[Y],$=_(z);typeof z=="number"||typeof z=="boolean"?(M.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,O+V,M.__data)):z.isMatrix3?(M.__data[0]=z.elements[0],M.__data[1]=z.elements[1],M.__data[2]=z.elements[2],M.__data[3]=0,M.__data[4]=z.elements[3],M.__data[5]=z.elements[4],M.__data[6]=z.elements[5],M.__data[7]=0,M.__data[8]=z.elements[6],M.__data[9]=z.elements[7],M.__data[10]=z.elements[8],M.__data[11]=0):(z.toArray(M.__data,V),V+=$.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,O,M.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(y,v,E,w){const b=y.value,S=v+"_"+E;if(w[S]===void 0)return typeof b=="number"||typeof b=="boolean"?w[S]=b:w[S]=b.clone(),!0;{const C=w[S];if(typeof b=="number"||typeof b=="boolean"){if(C!==b)return w[S]=b,!0}else if(C.equals(b)===!1)return C.copy(b),!0}return!1}function g(y){const v=y.uniforms;let E=0;const w=16;for(let S=0,C=v.length;S<C;S++){const L=Array.isArray(v[S])?v[S]:[v[S]];for(let x=0,M=L.length;x<M;x++){const O=L[x],U=Array.isArray(O.value)?O.value:[O.value];for(let V=0,Y=U.length;V<Y;V++){const z=U[V],$=_(z),W=E%w,rt=W%$.boundary,st=W+rt;E+=rt,st!==0&&w-st<$.storage&&(E+=w-st),O.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=E,E+=$.storage}}}const b=E%w;return b>0&&(E+=w-b),y.__size=E,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function p(y){const v=y.target;v.removeEventListener("dispose",p);const E=o.indexOf(v.__bindingPointIndex);o.splice(E,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function m(){for(const y in i)r.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:c,update:l,dispose:m}}class t1{constructor(t={}){const{canvas:e=VS(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const d=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ln,this.toneMapping=Ci,this.toneMappingExposure=1;const v=this;let E=!1,w=0,b=0,S=null,C=-1,L=null;const x=new ne,M=new ne;let O=null;const U=new Bt(0);let V=0,Y=e.width,z=e.height,$=1,W=null,rt=null;const st=new ne(0,0,Y,z),ct=new ne(0,0,Y,z);let At=!1;const Nt=new dh;let D=!1,H=!1;const Z=new ce,et=new ce,St=new P,bt=new ne,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Yt=!1;function Vt(){return S===null?$:1}let I=n;function Fe(A,F){return e.getContext(A,F)}try{const A={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${rh}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",lt,!1),e.addEventListener("webglcontextcreationerror",dt,!1),I===null){const F="webgl2";if(I=Fe(F,A),I===null)throw Fe(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let zt,Ht,wt,ie,Rt,R,T,k,j,tt,K,xt,ot,ht,qt,nt,_t,Lt,Dt,gt,Wt,It,oe,N;function ft(){zt=new sA(I),zt.init(),It=new Ww(I,zt),Ht=new Qb(I,zt,t,It),wt=new Vw(I),Ht.reverseDepthBuffer&&wt.buffers.depth.setReversed(!0),ie=new cA(I),Rt=new Aw,R=new Gw(I,zt,wt,Rt,Ht,It,ie),T=new eA(v),k=new rA(v),j=new mM(I),oe=new Jb(I,j),tt=new oA(I,j,ie,oe),K=new uA(I,tt,j,ie),Dt=new lA(I,Ht,R),nt=new tA(Rt),xt=new bw(v,T,k,zt,Ht,oe,nt),ot=new Zw(v,Rt),ht=new Cw,qt=new Nw(zt),Lt=new jb(v,T,k,wt,K,f,c),_t=new zw(v,K,Ht),N=new Qw(I,ie,Ht,wt),gt=new Zb(I,zt,ie),Wt=new aA(I,zt,ie),ie.programs=xt.programs,v.capabilities=Ht,v.extensions=zt,v.properties=Rt,v.renderLists=ht,v.shadowMap=_t,v.state=wt,v.info=ie}ft();const q=new jw(v,I);this.xr=q,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const A=zt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=zt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(A){A!==void 0&&($=A,this.setSize(Y,z,!1))},this.getSize=function(A){return A.set(Y,z)},this.setSize=function(A,F,G=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=A,z=F,e.width=Math.floor(A*$),e.height=Math.floor(F*$),G===!0&&(e.style.width=A+"px",e.style.height=F+"px"),this.setViewport(0,0,A,F)},this.getDrawingBufferSize=function(A){return A.set(Y*$,z*$).floor()},this.setDrawingBufferSize=function(A,F,G){Y=A,z=F,$=G,e.width=Math.floor(A*G),e.height=Math.floor(F*G),this.setViewport(0,0,A,F)},this.getCurrentViewport=function(A){return A.copy(x)},this.getViewport=function(A){return A.copy(st)},this.setViewport=function(A,F,G,X){A.isVector4?st.set(A.x,A.y,A.z,A.w):st.set(A,F,G,X),wt.viewport(x.copy(st).multiplyScalar($).round())},this.getScissor=function(A){return A.copy(ct)},this.setScissor=function(A,F,G,X){A.isVector4?ct.set(A.x,A.y,A.z,A.w):ct.set(A,F,G,X),wt.scissor(M.copy(ct).multiplyScalar($).round())},this.getScissorTest=function(){return At},this.setScissorTest=function(A){wt.setScissorTest(At=A)},this.setOpaqueSort=function(A){W=A},this.setTransparentSort=function(A){rt=A},this.getClearColor=function(A){return A.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor.apply(Lt,arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha.apply(Lt,arguments)},this.clear=function(A=!0,F=!0,G=!0){let X=0;if(A){let B=!1;if(S!==null){const it=S.texture.format;B=it===uh||it===lh||it===ch}if(B){const it=S.texture.type,ut=it===ui||it===gr||it===ro||it===gs||it===oh||it===ah,vt=Lt.getClearColor(),yt=Lt.getClearAlpha(),Ct=vt.r,Pt=vt.g,Et=vt.b;ut?(d[0]=Ct,d[1]=Pt,d[2]=Et,d[3]=yt,I.clearBufferuiv(I.COLOR,0,d)):(g[0]=Ct,g[1]=Pt,g[2]=Et,g[3]=yt,I.clearBufferiv(I.COLOR,0,g))}else X|=I.COLOR_BUFFER_BIT}F&&(X|=I.DEPTH_BUFFER_BIT,I.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),G&&(X|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",lt,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),ht.dispose(),qt.dispose(),Rt.dispose(),T.dispose(),k.dispose(),K.dispose(),oe.dispose(),N.dispose(),xt.dispose(),q.dispose(),q.removeEventListener("sessionstart",Rh),q.removeEventListener("sessionend",Ph),Gi.stop()};function J(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function lt(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const A=ie.autoReset,F=_t.enabled,G=_t.autoUpdate,X=_t.needsUpdate,B=_t.type;ft(),ie.autoReset=A,_t.enabled=F,_t.autoUpdate=G,_t.needsUpdate=X,_t.type=B}function dt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function $t(A){const F=A.target;F.removeEventListener("dispose",$t),ye(F)}function ye(A){Ge(A),Rt.remove(A)}function Ge(A){const F=Rt.get(A).programs;F!==void 0&&(F.forEach(function(G){xt.releaseProgram(G)}),A.isShaderMaterial&&xt.releaseShaderCache(A))}this.renderBufferDirect=function(A,F,G,X,B,it){F===null&&(F=kt);const ut=B.isMesh&&B.matrixWorld.determinant()<0,vt=D_(A,F,G,X,B);wt.setMaterial(X,ut);let yt=G.index,Ct=1;if(X.wireframe===!0){if(yt=tt.getWireframeAttribute(G),yt===void 0)return;Ct=2}const Pt=G.drawRange,Et=G.attributes.position;let Qt=Pt.start*Ct,le=(Pt.start+Pt.count)*Ct;it!==null&&(Qt=Math.max(Qt,it.start*Ct),le=Math.min(le,(it.start+it.count)*Ct)),yt!==null?(Qt=Math.max(Qt,0),le=Math.min(le,yt.count)):Et!=null&&(Qt=Math.max(Qt,0),le=Math.min(le,Et.count));const _e=le-Qt;if(_e<0||_e===1/0)return;oe.setup(B,X,vt,G,yt);let tn,jt=gt;if(yt!==null&&(tn=j.get(yt),jt=Wt,jt.setIndex(tn)),B.isMesh)X.wireframe===!0?(wt.setLineWidth(X.wireframeLinewidth*Vt()),jt.setMode(I.LINES)):jt.setMode(I.TRIANGLES);else if(B.isLine){let Mt=X.linewidth;Mt===void 0&&(Mt=1),wt.setLineWidth(Mt*Vt()),B.isLineSegments?jt.setMode(I.LINES):B.isLineLoop?jt.setMode(I.LINE_LOOP):jt.setMode(I.LINE_STRIP)}else B.isPoints?jt.setMode(I.POINTS):B.isSprite&&jt.setMode(I.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)jt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(zt.get("WEBGL_multi_draw"))jt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Mt=B._multiDrawStarts,Re=B._multiDrawCounts,Jt=B._multiDrawCount,wn=yt?j.get(yt).bytesPerElement:1,Tr=Rt.get(X).currentProgram.getUniforms();for(let en=0;en<Jt;en++)Tr.setValue(I,"_gl_DrawID",en),jt.render(Mt[en]/wn,Re[en])}else if(B.isInstancedMesh)jt.renderInstances(Qt,_e,B.count);else if(G.isInstancedBufferGeometry){const Mt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Re=Math.min(G.instanceCount,Mt);jt.renderInstances(Qt,_e,Re)}else jt.render(Qt,_e)};function Kt(A,F,G){A.transparent===!0&&A.side===ze&&A.forceSinglePass===!1?(A.side=He,A.needsUpdate=!0,xo(A,F,G),A.side=Ui,A.needsUpdate=!0,xo(A,F,G),A.side=ze):xo(A,F,G)}this.compile=function(A,F,G=null){G===null&&(G=A),p=qt.get(G),p.init(F),y.push(p),G.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),A!==G&&A.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const X=new Set;return A.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const it=B.material;if(it)if(Array.isArray(it))for(let ut=0;ut<it.length;ut++){const vt=it[ut];Kt(vt,G,B),X.add(vt)}else Kt(it,G,B),X.add(it)}),y.pop(),p=null,X},this.compileAsync=function(A,F,G=null){const X=this.compile(A,F,G);return new Promise(B=>{function it(){if(X.forEach(function(ut){Rt.get(ut).currentProgram.isReady()&&X.delete(ut)}),X.size===0){B(A);return}setTimeout(it,10)}zt.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let We=null;function Yn(A){We&&We(A)}function Rh(){Gi.stop()}function Ph(){Gi.start()}const Gi=new m_;Gi.setAnimationLoop(Yn),typeof self<"u"&&Gi.setContext(self),this.setAnimationLoop=function(A){We=A,q.setAnimationLoop(A),A===null?Gi.stop():Gi.start()},q.addEventListener("sessionstart",Rh),q.addEventListener("sessionend",Ph),this.render=function(A,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(F),F=q.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,F,S),p=qt.get(A,y.length),p.init(F),y.push(p),et.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Nt.setFromProjectionMatrix(et),H=this.localClippingEnabled,D=nt.init(this.clippingPlanes,H),_=ht.get(A,m.length),_.init(),m.push(_),q.enabled===!0&&q.isPresenting===!0){const it=v.xr.getDepthSensingMesh();it!==null&&tc(it,F,-1/0,v.sortObjects)}tc(A,F,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(W,rt),Yt=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Yt&&Lt.addToRenderList(_,A),this.info.render.frame++,D===!0&&nt.beginShadows();const G=p.state.shadowsArray;_t.render(G,A,F),D===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=_.opaque,B=_.transmissive;if(p.setupLights(),F.isArrayCamera){const it=F.cameras;if(B.length>0)for(let ut=0,vt=it.length;ut<vt;ut++){const yt=it[ut];Dh(X,B,A,yt)}Yt&&Lt.render(A);for(let ut=0,vt=it.length;ut<vt;ut++){const yt=it[ut];Lh(_,A,yt,yt.viewport)}}else B.length>0&&Dh(X,B,A,F),Yt&&Lt.render(A),Lh(_,A,F);S!==null&&(R.updateMultisampleRenderTarget(S),R.updateRenderTargetMipmap(S)),A.isScene===!0&&A.onAfterRender(v,A,F),oe.resetDefaultState(),C=-1,L=null,y.pop(),y.length>0?(p=y[y.length-1],D===!0&&nt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function tc(A,F,G,X){if(A.visible===!1)return;if(A.layers.test(F.layers)){if(A.isGroup)G=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(F);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Nt.intersectsSprite(A)){X&&bt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(et);const ut=K.update(A),vt=A.material;vt.visible&&_.push(A,ut,vt,G,bt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Nt.intersectsObject(A))){const ut=K.update(A),vt=A.material;if(X&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),bt.copy(A.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),bt.copy(ut.boundingSphere.center)),bt.applyMatrix4(A.matrixWorld).applyMatrix4(et)),Array.isArray(vt)){const yt=ut.groups;for(let Ct=0,Pt=yt.length;Ct<Pt;Ct++){const Et=yt[Ct],Qt=vt[Et.materialIndex];Qt&&Qt.visible&&_.push(A,ut,Qt,G,bt.z,Et)}}else vt.visible&&_.push(A,ut,vt,G,bt.z,null)}}const it=A.children;for(let ut=0,vt=it.length;ut<vt;ut++)tc(it[ut],F,G,X)}function Lh(A,F,G,X){const B=A.opaque,it=A.transmissive,ut=A.transparent;p.setupLightsView(G),D===!0&&nt.setGlobalState(v.clippingPlanes,G),X&&wt.viewport(x.copy(X)),B.length>0&&vo(B,F,G),it.length>0&&vo(it,F,G),ut.length>0&&vo(ut,F,G),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function Dh(A,F,G,X){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new vr(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?ho:ui,minFilter:ar,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace}));const it=p.state.transmissionRenderTarget[X.id],ut=X.viewport||x;it.setSize(ut.z,ut.w);const vt=v.getRenderTarget();v.setRenderTarget(it),v.getClearColor(U),V=v.getClearAlpha(),V<1&&v.setClearColor(16777215,.5),v.clear(),Yt&&Lt.render(G);const yt=v.toneMapping;v.toneMapping=Ci;const Ct=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),D===!0&&nt.setGlobalState(v.clippingPlanes,X),vo(A,G,X),R.updateMultisampleRenderTarget(it),R.updateRenderTargetMipmap(it),zt.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let Et=0,Qt=F.length;Et<Qt;Et++){const le=F[Et],_e=le.object,tn=le.geometry,jt=le.material,Mt=le.group;if(jt.side===ze&&_e.layers.test(X.layers)){const Re=jt.side;jt.side=He,jt.needsUpdate=!0,Ih(_e,G,X,tn,jt,Mt),jt.side=Re,jt.needsUpdate=!0,Pt=!0}}Pt===!0&&(R.updateMultisampleRenderTarget(it),R.updateRenderTargetMipmap(it))}v.setRenderTarget(vt),v.setClearColor(U,V),Ct!==void 0&&(X.viewport=Ct),v.toneMapping=yt}function vo(A,F,G){const X=F.isScene===!0?F.overrideMaterial:null;for(let B=0,it=A.length;B<it;B++){const ut=A[B],vt=ut.object,yt=ut.geometry,Ct=X===null?ut.material:X,Pt=ut.group;vt.layers.test(G.layers)&&Ih(vt,F,G,yt,Ct,Pt)}}function Ih(A,F,G,X,B,it){A.onBeforeRender(v,F,G,X,B,it),A.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),B.onBeforeRender(v,F,G,X,A,it),B.transparent===!0&&B.side===ze&&B.forceSinglePass===!1?(B.side=He,B.needsUpdate=!0,v.renderBufferDirect(G,F,X,B,A,it),B.side=Ui,B.needsUpdate=!0,v.renderBufferDirect(G,F,X,B,A,it),B.side=ze):v.renderBufferDirect(G,F,X,B,A,it),A.onAfterRender(v,F,G,X,B,it)}function xo(A,F,G){F.isScene!==!0&&(F=kt);const X=Rt.get(A),B=p.state.lights,it=p.state.shadowsArray,ut=B.state.version,vt=xt.getParameters(A,B.state,it,F,G),yt=xt.getProgramCacheKey(vt);let Ct=X.programs;X.environment=A.isMeshStandardMaterial?F.environment:null,X.fog=F.fog,X.envMap=(A.isMeshStandardMaterial?k:T).get(A.envMap||X.environment),X.envMapRotation=X.environment!==null&&A.envMap===null?F.environmentRotation:A.envMapRotation,Ct===void 0&&(A.addEventListener("dispose",$t),Ct=new Map,X.programs=Ct);let Pt=Ct.get(yt);if(Pt!==void 0){if(X.currentProgram===Pt&&X.lightsStateVersion===ut)return Oh(A,vt),Pt}else vt.uniforms=xt.getUniforms(A),A.onBeforeCompile(vt,v),Pt=xt.acquireProgram(vt,yt),Ct.set(yt,Pt),X.uniforms=vt.uniforms;const Et=X.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Et.clippingPlanes=nt.uniform),Oh(A,vt),X.needsLights=N_(A),X.lightsStateVersion=ut,X.needsLights&&(Et.ambientLightColor.value=B.state.ambient,Et.lightProbe.value=B.state.probe,Et.directionalLights.value=B.state.directional,Et.directionalLightShadows.value=B.state.directionalShadow,Et.spotLights.value=B.state.spot,Et.spotLightShadows.value=B.state.spotShadow,Et.rectAreaLights.value=B.state.rectArea,Et.ltc_1.value=B.state.rectAreaLTC1,Et.ltc_2.value=B.state.rectAreaLTC2,Et.pointLights.value=B.state.point,Et.pointLightShadows.value=B.state.pointShadow,Et.hemisphereLights.value=B.state.hemi,Et.directionalShadowMap.value=B.state.directionalShadowMap,Et.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Et.spotShadowMap.value=B.state.spotShadowMap,Et.spotLightMatrix.value=B.state.spotLightMatrix,Et.spotLightMap.value=B.state.spotLightMap,Et.pointShadowMap.value=B.state.pointShadowMap,Et.pointShadowMatrix.value=B.state.pointShadowMatrix),X.currentProgram=Pt,X.uniformsList=null,Pt}function Nh(A){if(A.uniformsList===null){const F=A.currentProgram.getUniforms();A.uniformsList=_a.seqWithValue(F.seq,A.uniforms)}return A.uniformsList}function Oh(A,F){const G=Rt.get(A);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function D_(A,F,G,X,B){F.isScene!==!0&&(F=kt),R.resetTextureUnits();const it=F.fog,ut=X.isMeshStandardMaterial?F.environment:null,vt=S===null?v.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:Hi,yt=(X.isMeshStandardMaterial?k:T).get(X.envMap||ut),Ct=X.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Pt=!!G.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Et=!!G.morphAttributes.position,Qt=!!G.morphAttributes.normal,le=!!G.morphAttributes.color;let _e=Ci;X.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(_e=v.toneMapping);const tn=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,jt=tn!==void 0?tn.length:0,Mt=Rt.get(X),Re=p.state.lights;if(D===!0&&(H===!0||A!==L)){const _n=A===L&&X.id===C;nt.setState(X,A,_n)}let Jt=!1;X.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==Re.state.version||Mt.outputColorSpace!==vt||B.isBatchedMesh&&Mt.batching===!1||!B.isBatchedMesh&&Mt.batching===!0||B.isBatchedMesh&&Mt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Mt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Mt.instancing===!1||!B.isInstancedMesh&&Mt.instancing===!0||B.isSkinnedMesh&&Mt.skinning===!1||!B.isSkinnedMesh&&Mt.skinning===!0||B.isInstancedMesh&&Mt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Mt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Mt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Mt.instancingMorph===!1&&B.morphTexture!==null||Mt.envMap!==yt||X.fog===!0&&Mt.fog!==it||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==nt.numPlanes||Mt.numIntersection!==nt.numIntersection)||Mt.vertexAlphas!==Ct||Mt.vertexTangents!==Pt||Mt.morphTargets!==Et||Mt.morphNormals!==Qt||Mt.morphColors!==le||Mt.toneMapping!==_e||Mt.morphTargetsCount!==jt)&&(Jt=!0):(Jt=!0,Mt.__version=X.version);let wn=Mt.currentProgram;Jt===!0&&(wn=xo(X,F,B));let Tr=!1,en=!1,ec=!1;const ve=wn.getUniforms(),di=Mt.uniforms;if(wt.useProgram(wn.program)&&(Tr=!0,en=!0,ec=!0),X.id!==C&&(C=X.id,en=!0),Tr||L!==A){Ht.reverseDepthBuffer?(Z.copy(A.projectionMatrix),GS(Z),WS(Z),ve.setValue(I,"projectionMatrix",Z)):ve.setValue(I,"projectionMatrix",A.projectionMatrix),ve.setValue(I,"viewMatrix",A.matrixWorldInverse);const _n=ve.map.cameraPosition;_n!==void 0&&_n.setValue(I,St.setFromMatrixPosition(A.matrixWorld)),Ht.logarithmicDepthBuffer&&ve.setValue(I,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&ve.setValue(I,"isOrthographic",A.isOrthographicCamera===!0),L!==A&&(L=A,en=!0,ec=!0)}if(B.isSkinnedMesh){ve.setOptional(I,B,"bindMatrix"),ve.setOptional(I,B,"bindMatrixInverse");const _n=B.skeleton;_n&&(_n.boneTexture===null&&_n.computeBoneTexture(),ve.setValue(I,"boneTexture",_n.boneTexture,R))}B.isBatchedMesh&&(ve.setOptional(I,B,"batchingTexture"),ve.setValue(I,"batchingTexture",B._matricesTexture,R),ve.setOptional(I,B,"batchingIdTexture"),ve.setValue(I,"batchingIdTexture",B._indirectTexture,R),ve.setOptional(I,B,"batchingColorTexture"),B._colorsTexture!==null&&ve.setValue(I,"batchingColorTexture",B._colorsTexture,R));const nc=G.morphAttributes;if((nc.position!==void 0||nc.normal!==void 0||nc.color!==void 0)&&Dt.update(B,G,wn),(en||Mt.receiveShadow!==B.receiveShadow)&&(Mt.receiveShadow=B.receiveShadow,ve.setValue(I,"receiveShadow",B.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(di.envMap.value=yt,di.flipEnvMap.value=yt.isCubeTexture&&yt.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&F.environment!==null&&(di.envMapIntensity.value=F.environmentIntensity),en&&(ve.setValue(I,"toneMappingExposure",v.toneMappingExposure),Mt.needsLights&&I_(di,ec),it&&X.fog===!0&&ot.refreshFogUniforms(di,it),ot.refreshMaterialUniforms(di,X,$,z,p.state.transmissionRenderTarget[A.id]),_a.upload(I,Nh(Mt),di,R)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(_a.upload(I,Nh(Mt),di,R),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&ve.setValue(I,"center",B.center),ve.setValue(I,"modelViewMatrix",B.modelViewMatrix),ve.setValue(I,"normalMatrix",B.normalMatrix),ve.setValue(I,"modelMatrix",B.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const _n=X.uniformsGroups;for(let ic=0,O_=_n.length;ic<O_;ic++){const Uh=_n[ic];N.update(Uh,wn),N.bind(Uh,wn)}}return wn}function I_(A,F){A.ambientLightColor.needsUpdate=F,A.lightProbe.needsUpdate=F,A.directionalLights.needsUpdate=F,A.directionalLightShadows.needsUpdate=F,A.pointLights.needsUpdate=F,A.pointLightShadows.needsUpdate=F,A.spotLights.needsUpdate=F,A.spotLightShadows.needsUpdate=F,A.rectAreaLights.needsUpdate=F,A.hemisphereLights.needsUpdate=F}function N_(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(A,F,G){Rt.get(A.texture).__webglTexture=F,Rt.get(A.depthTexture).__webglTexture=G;const X=Rt.get(A);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=G===void 0,X.__autoAllocateDepthBuffer||zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,F){const G=Rt.get(A);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(A,F=0,G=0){S=A,w=F,b=G;let X=!0,B=null,it=!1,ut=!1;if(A){const yt=Rt.get(A);if(yt.__useDefaultFramebuffer!==void 0)wt.bindFramebuffer(I.FRAMEBUFFER,null),X=!1;else if(yt.__webglFramebuffer===void 0)R.setupRenderTarget(A);else if(yt.__hasExternalTextures)R.rebindTextures(A,Rt.get(A.texture).__webglTexture,Rt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Et=A.depthTexture;if(yt.__boundDepthTexture!==Et){if(Et!==null&&Rt.has(Et)&&(A.width!==Et.image.width||A.height!==Et.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(A)}}const Ct=A.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ut=!0);const Pt=Rt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Pt[F])?B=Pt[F][G]:B=Pt[F],it=!0):A.samples>0&&R.useMultisampledRTT(A)===!1?B=Rt.get(A).__webglMultisampledFramebuffer:Array.isArray(Pt)?B=Pt[G]:B=Pt,x.copy(A.viewport),M.copy(A.scissor),O=A.scissorTest}else x.copy(st).multiplyScalar($).floor(),M.copy(ct).multiplyScalar($).floor(),O=At;if(wt.bindFramebuffer(I.FRAMEBUFFER,B)&&X&&wt.drawBuffers(A,B),wt.viewport(x),wt.scissor(M),wt.setScissorTest(O),it){const yt=Rt.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+F,yt.__webglTexture,G)}else if(ut){const yt=Rt.get(A.texture),Ct=F||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,yt.__webglTexture,G||0,Ct)}C=-1},this.readRenderTargetPixels=function(A,F,G,X,B,it,ut){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=Rt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ut!==void 0&&(vt=vt[ut]),vt){wt.bindFramebuffer(I.FRAMEBUFFER,vt);try{const yt=A.texture,Ct=yt.format,Pt=yt.type;if(!Ht.textureFormatReadable(Ct)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ht.textureTypeReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=A.width-X&&G>=0&&G<=A.height-B&&I.readPixels(F,G,X,B,It.convert(Ct),It.convert(Pt),it)}finally{const yt=S!==null?Rt.get(S).__webglFramebuffer:null;wt.bindFramebuffer(I.FRAMEBUFFER,yt)}}},this.readRenderTargetPixelsAsync=async function(A,F,G,X,B,it,ut){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=Rt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ut!==void 0&&(vt=vt[ut]),vt){const yt=A.texture,Ct=yt.format,Pt=yt.type;if(!Ht.textureFormatReadable(Ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ht.textureTypeReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=A.width-X&&G>=0&&G<=A.height-B){wt.bindFramebuffer(I.FRAMEBUFFER,vt);const Et=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Et),I.bufferData(I.PIXEL_PACK_BUFFER,it.byteLength,I.STREAM_READ),I.readPixels(F,G,X,B,It.convert(Ct),It.convert(Pt),0);const Qt=S!==null?Rt.get(S).__webglFramebuffer:null;wt.bindFramebuffer(I.FRAMEBUFFER,Qt);const le=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await HS(I,le,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Et),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,it),I.deleteBuffer(Et),I.deleteSync(le),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,F=null,G=0){A.isTexture!==!0&&(ma("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,A=arguments[1]);const X=Math.pow(2,-G),B=Math.floor(A.image.width*X),it=Math.floor(A.image.height*X),ut=F!==null?F.x:0,vt=F!==null?F.y:0;R.setTexture2D(A,0),I.copyTexSubImage2D(I.TEXTURE_2D,G,0,0,ut,vt,B,it),wt.unbindTexture()},this.copyTextureToTexture=function(A,F,G=null,X=null,B=0){A.isTexture!==!0&&(ma("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,A=arguments[1],F=arguments[2],B=arguments[3]||0,G=null);let it,ut,vt,yt,Ct,Pt;G!==null?(it=G.max.x-G.min.x,ut=G.max.y-G.min.y,vt=G.min.x,yt=G.min.y):(it=A.image.width,ut=A.image.height,vt=0,yt=0),X!==null?(Ct=X.x,Pt=X.y):(Ct=0,Pt=0);const Et=It.convert(F.format),Qt=It.convert(F.type);R.setTexture2D(F,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);const le=I.getParameter(I.UNPACK_ROW_LENGTH),_e=I.getParameter(I.UNPACK_IMAGE_HEIGHT),tn=I.getParameter(I.UNPACK_SKIP_PIXELS),jt=I.getParameter(I.UNPACK_SKIP_ROWS),Mt=I.getParameter(I.UNPACK_SKIP_IMAGES),Re=A.isCompressedTexture?A.mipmaps[B]:A.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,Re.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Re.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,vt),I.pixelStorei(I.UNPACK_SKIP_ROWS,yt),A.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,B,Ct,Pt,it,ut,Et,Qt,Re.data):A.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,B,Ct,Pt,Re.width,Re.height,Et,Re.data):I.texSubImage2D(I.TEXTURE_2D,B,Ct,Pt,it,ut,Et,Qt,Re),I.pixelStorei(I.UNPACK_ROW_LENGTH,le),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,_e),I.pixelStorei(I.UNPACK_SKIP_PIXELS,tn),I.pixelStorei(I.UNPACK_SKIP_ROWS,jt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Mt),B===0&&F.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),wt.unbindTexture()},this.copyTextureToTexture3D=function(A,F,G=null,X=null,B=0){A.isTexture!==!0&&(ma("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,X=arguments[1]||null,A=arguments[2],F=arguments[3],B=arguments[4]||0);let it,ut,vt,yt,Ct,Pt,Et,Qt,le;const _e=A.isCompressedTexture?A.mipmaps[B]:A.image;G!==null?(it=G.max.x-G.min.x,ut=G.max.y-G.min.y,vt=G.max.z-G.min.z,yt=G.min.x,Ct=G.min.y,Pt=G.min.z):(it=_e.width,ut=_e.height,vt=_e.depth,yt=0,Ct=0,Pt=0),X!==null?(Et=X.x,Qt=X.y,le=X.z):(Et=0,Qt=0,le=0);const tn=It.convert(F.format),jt=It.convert(F.type);let Mt;if(F.isData3DTexture)R.setTexture3D(F,0),Mt=I.TEXTURE_3D;else if(F.isDataArrayTexture||F.isCompressedArrayTexture)R.setTexture2DArray(F,0),Mt=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);const Re=I.getParameter(I.UNPACK_ROW_LENGTH),Jt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),wn=I.getParameter(I.UNPACK_SKIP_PIXELS),Tr=I.getParameter(I.UNPACK_SKIP_ROWS),en=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,_e.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,_e.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,yt),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ct),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Pt),A.isDataTexture||A.isData3DTexture?I.texSubImage3D(Mt,B,Et,Qt,le,it,ut,vt,tn,jt,_e.data):F.isCompressedArrayTexture?I.compressedTexSubImage3D(Mt,B,Et,Qt,le,it,ut,vt,tn,_e.data):I.texSubImage3D(Mt,B,Et,Qt,le,it,ut,vt,tn,jt,_e),I.pixelStorei(I.UNPACK_ROW_LENGTH,Re),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Jt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,wn),I.pixelStorei(I.UNPACK_SKIP_ROWS,Tr),I.pixelStorei(I.UNPACK_SKIP_IMAGES,en),B===0&&F.generateMipmaps&&I.generateMipmap(Mt),wt.unbindTexture()},this.initRenderTarget=function(A){Rt.get(A).__webglFramebuffer===void 0&&R.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?R.setTextureCube(A,0):A.isData3DTexture?R.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?R.setTexture2DArray(A,0):R.setTexture2D(A,0),wt.unbindTexture()},this.resetState=function(){w=0,b=0,S=null,wt.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===hh?"display-p3":"srgb",e.unpackColorSpace=Zt.workingColorSpace===Ka?"display-p3":"srgb"}}class e1 extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ri extends Mr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Bt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Na=new P,Oa=new P,Dd=new ce,Us=new fh,Ko=new _o,rl=new P,Id=new P;class Ua extends Te{constructor(t=new ae,e=new Ri){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)Na.fromBufferAttribute(e,i-1),Oa.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Na.distanceTo(Oa);t.setAttribute("lineDistance",new Ft(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ko.copy(n.boundingSphere),Ko.applyMatrix4(i),Ko.radius+=s,t.ray.intersectsSphere(Ko)===!1)return;Dd.copy(i).invert(),Us.copy(t.ray).applyMatrix4(Dd);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,p=g-1;_<p;_+=l){const m=u.getX(_),y=u.getX(_+1),v=jo(this,t,Us,c,m,y);v&&e.push(v)}if(this.isLineLoop){const _=u.getX(g-1),p=u.getX(d),m=jo(this,t,Us,c,_,p);m&&e.push(m)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=d,p=g-1;_<p;_+=l){const m=jo(this,t,Us,c,_,_+1);m&&e.push(m)}if(this.isLineLoop){const _=jo(this,t,Us,c,g-1,d);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function jo(r,t,e,n,i,s){const o=r.geometry.attributes.position;if(Na.fromBufferAttribute(o,i),Oa.fromBufferAttribute(o,s),e.distanceSqToSegment(Na,Oa,rl,Id)>n)return;rl.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(rl);if(!(c<t.near||c>t.far))return{distance:c,point:Id.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}const Nd=new P,Od=new P;class Ja extends Ua{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)Nd.fromBufferAttribute(e,i),Od.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Nd.distanceTo(Od);t.setAttribute("lineDistance",new Ft(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class mh extends Mr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Bt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Ud=new ce,xu=new fh,Jo=new _o,Zo=new P;class S_ extends Te{constructor(t=new ae,e=new mh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jo.copy(n.boundingSphere),Jo.applyMatrix4(i),Jo.radius+=s,t.ray.intersectsSphere(Jo)===!1)return;Ud.copy(i).invert(),xu.copy(t.ray).applyMatrix4(Ud);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,_=d;g<_;g++){const p=l.getX(g);Zo.fromBufferAttribute(h,p),Fd(Zo,p,c,i,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,_=d;g<_;g++)Zo.fromBufferAttribute(h,g),Fd(Zo,g,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Fd(r,t,e,n,i,s,o){const a=xu.distanceSqToPoint(r);if(a<e){const c=new P;xu.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class $n{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(s-1);const u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),c=e||(o.isVector2?new mt:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new P,i=[],s=[],o=[],a=new P,c=new ce;for(let d=0;d<=t;d++){const g=d/t;i[d]=this.getTangentAt(g,new P)}s[0]=new P,o[0]=new P;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Le(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(i[d],s[d])}if(e===!0){let d=Math.acos(Le(s[0].dot(s[t]),-1,1));d/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let g=1;g<=t;g++)s[g].applyMatrix4(c.makeRotationAxis(i[g],d*g)),o[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class _h extends $n{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new mt){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class n1 extends _h{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function gh(){let r=0,t=0,e=0,n=0;function i(s,o,a,c){r=s,t=a,e=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){i(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,h){let f=(o-s)/l-(a-s)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const Qo=new P,sl=new gh,ol=new gh,al=new gh;class M_ extends $n{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=i[(a-1)%s]:(Qo.subVectors(i[0],i[1]).add(i[0]),l=Qo);const h=i[a%s],f=i[(a+1)%s];if(this.closed||a+2<s?u=i[(a+2)%s]:(Qo.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=Qo),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(u),d);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),sl.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,_,p),ol.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,_,p),al.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,_,p)}else this.curveType==="catmullrom"&&(sl.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),ol.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),al.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(sl.calc(c),ol.calc(c),al.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Bd(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,c=r*a;return(2*e-2*n+s+o)*c+(-3*e+3*n-2*s-o)*a+s*r+e}function i1(r,t){const e=1-r;return e*e*t}function r1(r,t){return 2*(1-r)*r*t}function s1(r,t){return r*r*t}function Ys(r,t,e,n){return i1(r,t)+r1(r,e)+s1(r,n)}function o1(r,t){const e=1-r;return e*e*e*t}function a1(r,t){const e=1-r;return 3*e*e*r*t}function c1(r,t){return 3*(1-r)*r*r*t}function l1(r,t){return r*r*r*t}function qs(r,t,e,n,i){return o1(r,t)+a1(r,e)+c1(r,n)+l1(r,i)}class T_ extends $n{constructor(t=new mt,e=new mt,n=new mt,i=new mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new mt){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(qs(t,i.x,s.x,o.x,a.x),qs(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class u1 extends $n{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(qs(t,i.x,s.x,o.x,a.x),qs(t,i.y,s.y,o.y,a.y),qs(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class b_ extends $n{constructor(t=new mt,e=new mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new mt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class h1 extends $n{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class A_ extends $n{constructor(t=new mt,e=new mt,n=new mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new mt){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Ys(t,i.x,s.x,o.x),Ys(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class w_ extends $n{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Ys(t,i.x,s.x,o.x),Ys(t,i.y,s.y,o.y),Ys(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class C_ extends $n{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new mt){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,c=i[o===0?o:o-1],l=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(Bd(a,c.x,l.x,u.x,h.x),Bd(a,c.y,l.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new mt().fromArray(i))}return this}}var yu=Object.freeze({__proto__:null,ArcCurve:n1,CatmullRomCurve3:M_,CubicBezierCurve:T_,CubicBezierCurve3:u1,EllipseCurve:_h,LineCurve:b_,LineCurve3:h1,QuadraticBezierCurve:A_,QuadraticBezierCurve3:w_,SplineCurve:C_});class f1 extends $n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new yu[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new yu[i.type]().fromJSON(i))}return this}}class d1 extends f1{constructor(t){super(),this.type="Path",this.currentPoint=new mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new b_(this.currentPoint.clone(),new mt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new A_(this.currentPoint.clone(),new mt(t,e),new mt(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){const a=new T_(this.currentPoint.clone(),new mt(t,e),new mt(n,i),new mt(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new C_(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,i,s,o,a,c),this}absellipse(t,e,n,i,s,o,a,c){const l=new _h(t,e,n,i,s,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class vh extends ae{constructor(t=[new mt(0,-.5),new mt(.5,0),new mt(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Le(i,0,Math.PI*2);const s=[],o=[],a=[],c=[],l=[],u=1/e,h=new P,f=new mt,d=new P,g=new P,_=new P;let p=0,m=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:p=t[y+1].x-t[y].x,m=t[y+1].y-t[y].y,d.x=m*1,d.y=-p,d.z=m*0,_.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:p=t[y+1].x-t[y].x,m=t[y+1].y-t[y].y,d.x=m*1,d.y=-p,d.z=m*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),c.push(d.x,d.y,d.z),_.copy(g)}for(let y=0;y<=e;y++){const v=n+y*u*i,E=Math.sin(v),w=Math.cos(v);for(let b=0;b<=t.length-1;b++){h.x=t[b].x*E,h.y=t[b].y,h.z=t[b].x*w,o.push(h.x,h.y,h.z),f.x=y/e,f.y=b/(t.length-1),a.push(f.x,f.y);const S=c[3*b+0]*E,C=c[3*b+1],L=c[3*b+0]*w;l.push(S,C,L)}}for(let y=0;y<e;y++)for(let v=0;v<t.length-1;v++){const E=v+y*t.length,w=E,b=E+t.length,S=E+t.length+1,C=E+1;s.push(w,b,C),s.push(S,C,b)}this.setIndex(s),this.setAttribute("position",new Ft(o,3)),this.setAttribute("uv",new Ft(a,2)),this.setAttribute("normal",new Ft(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vh(t.points,t.segments,t.phiStart,t.phiLength)}}class xh extends vh{constructor(t=1,e=1,n=4,i=8){const s=new d1;s.absarc(0,-e/2,t,Math.PI*1.5,0),s.absarc(0,e/2,t,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new xh(t.radius,t.length,t.capSegments,t.radialSegments)}}class Me extends ae{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const u=[],h=[],f=[],d=[];let g=0;const _=[],p=n/2;let m=0;y(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Ft(h,3)),this.setAttribute("normal",new Ft(f,3)),this.setAttribute("uv",new Ft(d,2));function y(){const E=new P,w=new P;let b=0;const S=(e-t)/n;for(let C=0;C<=s;C++){const L=[],x=C/s,M=x*(e-t)+t;for(let O=0;O<=i;O++){const U=O/i,V=U*c+a,Y=Math.sin(V),z=Math.cos(V);w.x=M*Y,w.y=-x*n+p,w.z=M*z,h.push(w.x,w.y,w.z),E.set(Y,S,z).normalize(),f.push(E.x,E.y,E.z),d.push(U,1-x),L.push(g++)}_.push(L)}for(let C=0;C<i;C++)for(let L=0;L<s;L++){const x=_[L][C],M=_[L+1][C],O=_[L+1][C+1],U=_[L][C+1];t>0&&(u.push(x,M,U),b+=3),e>0&&(u.push(M,O,U),b+=3)}l.addGroup(m,b,0),m+=b}function v(E){const w=g,b=new mt,S=new P;let C=0;const L=E===!0?t:e,x=E===!0?1:-1;for(let O=1;O<=i;O++)h.push(0,p*x,0),f.push(0,x,0),d.push(.5,.5),g++;const M=g;for(let O=0;O<=i;O++){const V=O/i*c+a,Y=Math.cos(V),z=Math.sin(V);S.x=L*z,S.y=p*x,S.z=L*Y,h.push(S.x,S.y,S.z),f.push(0,x,0),b.x=Y*.5+.5,b.y=z*.5*x+.5,d.push(b.x,b.y),g++}for(let O=0;O<i;O++){const U=w+O,V=M+O;E===!0?u.push(V,V+1,U):u.push(V+1,V,U),C+=3}l.addGroup(m,C,E===!0?1:2),m+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Me(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class yh extends Me{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new yh(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Eh extends ae{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],o=[];a(i),l(n),u(),this.setAttribute("position",new Ft(s,3)),this.setAttribute("normal",new Ft(s.slice(),3)),this.setAttribute("uv",new Ft(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const v=new P,E=new P,w=new P;for(let b=0;b<e.length;b+=3)d(e[b+0],v),d(e[b+1],E),d(e[b+2],w),c(v,E,w,y)}function c(y,v,E,w){const b=w+1,S=[];for(let C=0;C<=b;C++){S[C]=[];const L=y.clone().lerp(E,C/b),x=v.clone().lerp(E,C/b),M=b-C;for(let O=0;O<=M;O++)O===0&&C===b?S[C][O]=L:S[C][O]=L.clone().lerp(x,O/M)}for(let C=0;C<b;C++)for(let L=0;L<2*(b-C)-1;L++){const x=Math.floor(L/2);L%2===0?(f(S[C][x+1]),f(S[C+1][x]),f(S[C][x])):(f(S[C][x+1]),f(S[C+1][x+1]),f(S[C+1][x]))}}function l(y){const v=new P;for(let E=0;E<s.length;E+=3)v.x=s[E+0],v.y=s[E+1],v.z=s[E+2],v.normalize().multiplyScalar(y),s[E+0]=v.x,s[E+1]=v.y,s[E+2]=v.z}function u(){const y=new P;for(let v=0;v<s.length;v+=3){y.x=s[v+0],y.y=s[v+1],y.z=s[v+2];const E=p(y)/2/Math.PI+.5,w=m(y)/Math.PI+.5;o.push(E,1-w)}g(),h()}function h(){for(let y=0;y<o.length;y+=6){const v=o[y+0],E=o[y+2],w=o[y+4],b=Math.max(v,E,w),S=Math.min(v,E,w);b>.9&&S<.1&&(v<.2&&(o[y+0]+=1),E<.2&&(o[y+2]+=1),w<.2&&(o[y+4]+=1))}}function f(y){s.push(y.x,y.y,y.z)}function d(y,v){const E=y*3;v.x=t[E+0],v.y=t[E+1],v.z=t[E+2]}function g(){const y=new P,v=new P,E=new P,w=new P,b=new mt,S=new mt,C=new mt;for(let L=0,x=0;L<s.length;L+=9,x+=6){y.set(s[L+0],s[L+1],s[L+2]),v.set(s[L+3],s[L+4],s[L+5]),E.set(s[L+6],s[L+7],s[L+8]),b.set(o[x+0],o[x+1]),S.set(o[x+2],o[x+3]),C.set(o[x+4],o[x+5]),w.copy(y).add(v).add(E).divideScalar(3);const M=p(w);_(b,x+0,y,M),_(S,x+2,v,M),_(C,x+4,E,M)}}function _(y,v,E,w){w<0&&y.x===1&&(o[v]=y.x-1),E.x===0&&E.z===0&&(o[v]=w/2/Math.PI+.5)}function p(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Eh(t.vertices,t.indices,t.radius,t.details)}}const ta=new P,ea=new P,cl=new P,na=new xn;class Sh extends ae{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const i=Math.pow(10,4),s=Math.cos(pa*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],u=["a","b","c"],h=new Array(3),f={},d=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:p,c:m}=na;if(_.fromBufferAttribute(a,l[0]),p.fromBufferAttribute(a,l[1]),m.fromBufferAttribute(a,l[2]),na.getNormal(cl),h[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,h[1]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,h[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let y=0;y<3;y++){const v=(y+1)%3,E=h[y],w=h[v],b=na[u[y]],S=na[u[v]],C=`${E}_${w}`,L=`${w}_${E}`;L in f&&f[L]?(cl.dot(f[L].normal)<=s&&(d.push(b.x,b.y,b.z),d.push(S.x,S.y,S.z)),f[L]=null):C in f||(f[C]={index0:l[y],index1:l[v],normal:cl.clone()})}}for(const g in f)if(f[g]){const{index0:_,index1:p}=f[g];ta.fromBufferAttribute(a,_),ea.fromBufferAttribute(a,p),d.push(ta.x,ta.y,ta.z),d.push(ea.x,ea.y,ea.z)}this.setAttribute("position",new Ft(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Za extends Eh{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Za(t.radius,t.detail)}}class ys extends ae{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new P,f=new P,d=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const y=[],v=m/n;let E=0;m===0&&o===0?E=.5/e:m===n&&c===Math.PI&&(E=-.5/e);for(let w=0;w<=e;w++){const b=w/e;h.x=-t*Math.cos(i+b*s)*Math.sin(o+v*a),h.y=t*Math.cos(o+v*a),h.z=t*Math.sin(i+b*s)*Math.sin(o+v*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),p.push(b+E,1-v),y.push(l++)}u.push(y)}for(let m=0;m<n;m++)for(let y=0;y<e;y++){const v=u[m][y+1],E=u[m][y],w=u[m+1][y],b=u[m+1][y+1];(m!==0||o>0)&&d.push(v,E,b),(m!==n-1||c<Math.PI)&&d.push(E,w,b)}this.setIndex(d),this.setAttribute("position",new Ft(g,3)),this.setAttribute("normal",new Ft(_,3)),this.setAttribute("uv",new Ft(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ys(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class xr extends ae{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],u=new P,h=new P,f=new P;for(let d=0;d<=n;d++)for(let g=0;g<=i;g++){const _=g/i*s,p=d/n*Math.PI*2;h.x=(t+e*Math.cos(p))*Math.cos(_),h.y=(t+e*Math.cos(p))*Math.sin(_),h.z=e*Math.sin(p),a.push(h.x,h.y,h.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/i),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=i;g++){const _=(i+1)*d+g-1,p=(i+1)*(d-1)+g-1,m=(i+1)*(d-1)+g,y=(i+1)*d+g;o.push(_,p,y),o.push(p,m,y)}this.setIndex(o),this.setAttribute("position",new Ft(a,3)),this.setAttribute("normal",new Ft(c,3)),this.setAttribute("uv",new Ft(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xr(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Mh extends ae{constructor(t=1,e=.4,n=64,i=8,s=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:i,p:s,q:o},n=Math.floor(n),i=Math.floor(i);const a=[],c=[],l=[],u=[],h=new P,f=new P,d=new P,g=new P,_=new P,p=new P,m=new P;for(let v=0;v<=n;++v){const E=v/n*s*Math.PI*2;y(E,s,o,t,d),y(E+.01,s,o,t,g),p.subVectors(g,d),m.addVectors(g,d),_.crossVectors(p,m),m.crossVectors(_,p),_.normalize(),m.normalize();for(let w=0;w<=i;++w){const b=w/i*Math.PI*2,S=-e*Math.cos(b),C=e*Math.sin(b);h.x=d.x+(S*m.x+C*_.x),h.y=d.y+(S*m.y+C*_.y),h.z=d.z+(S*m.z+C*_.z),c.push(h.x,h.y,h.z),f.subVectors(h,d).normalize(),l.push(f.x,f.y,f.z),u.push(v/n),u.push(w/i)}}for(let v=1;v<=n;v++)for(let E=1;E<=i;E++){const w=(i+1)*(v-1)+(E-1),b=(i+1)*v+(E-1),S=(i+1)*v+E,C=(i+1)*(v-1)+E;a.push(w,b,C),a.push(b,S,C)}this.setIndex(a),this.setAttribute("position",new Ft(c,3)),this.setAttribute("normal",new Ft(l,3)),this.setAttribute("uv",new Ft(u,2));function y(v,E,w,b,S){const C=Math.cos(v),L=Math.sin(v),x=w/E*v,M=Math.cos(x);S.x=b*(2+M)*.5*C,S.y=b*(2+M)*L*.5,S.z=b*Math.sin(x)*.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mh(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}}class Th extends ae{constructor(t=new w_(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};const o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new P,c=new P,l=new mt;let u=new P;const h=[],f=[],d=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Ft(h,3)),this.setAttribute("normal",new Ft(f,3)),this.setAttribute("uv",new Ft(d,2));function _(){for(let v=0;v<e;v++)p(v);p(s===!1?e:0),y(),m()}function p(v){u=t.getPointAt(v/e,u);const E=o.normals[v],w=o.binormals[v];for(let b=0;b<=i;b++){const S=b/i*Math.PI*2,C=Math.sin(S),L=-Math.cos(S);c.x=L*E.x+C*w.x,c.y=L*E.y+C*w.y,c.z=L*E.z+C*w.z,c.normalize(),f.push(c.x,c.y,c.z),a.x=u.x+n*c.x,a.y=u.y+n*c.y,a.z=u.z+n*c.z,h.push(a.x,a.y,a.z)}}function m(){for(let v=1;v<=e;v++)for(let E=1;E<=i;E++){const w=(i+1)*(v-1)+(E-1),b=(i+1)*v+(E-1),S=(i+1)*v+E,C=(i+1)*(v-1)+E;g.push(w,b,C),g.push(b,S,C)}}function y(){for(let v=0;v<=e;v++)for(let E=0;E<=i;E++)l.x=v/e,l.y=E/i,d.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Th(new yu[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Qa extends Mr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Bt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=i_,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class bh extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class p1 extends bh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Bt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ll=new ce,zd=new P,kd=new P;class R_{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new mt(512,512),this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dh,this._frameExtents=new mt(1,1),this._viewportCount=1,this._viewports=[new ne(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;zd.setFromMatrixPosition(t.matrixWorld),e.position.copy(zd),kd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(kd),e.updateMatrixWorld(),ll.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ll),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ll)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Vd=new ce,Fs=new P,ul=new P;class m1 extends R_{constructor(){super(new on(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new mt(4,2),this._viewportCount=6,this._viewports=[new ne(2,1,1,1),new ne(0,1,1,1),new ne(3,1,1,1),new ne(1,1,1,1),new ne(3,0,1,1),new ne(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Fs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Fs),ul.copy(n.position),ul.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ul),n.updateMatrixWorld(),i.makeTranslation(-Fs.x,-Fs.y,-Fs.z),Vd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vd)}}class Hd extends bh{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new m1}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class _1 extends R_{constructor(){super(new __(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class g1 extends bh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new _1}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class v1{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Gd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Gd();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Gd(){return performance.now()}class P_ extends Ja{constructor(t=10,e=10,n=4473924,i=8947848){n=new Bt(n),i=new Bt(i);const s=e/2,o=t/e,a=t/2,c=[],l=[];for(let f=0,d=0,g=-a;f<=e;f++,g+=o){c.push(-a,0,g,a,0,g),c.push(g,0,-a,g,0,a);const _=f===s?n:i;_.toArray(l,d),d+=3,_.toArray(l,d),d+=3,_.toArray(l,d),d+=3,_.toArray(l,d),d+=3}const u=new ae;u.setAttribute("position",new Ft(c,3)),u.setAttribute("color",new Ft(l,3));const h=new Ri({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rh);const Wd=document.getElementById("three-hero");function x1(r){const t=new e1,e=new on(46,r.clientWidth/Math.max(r.clientHeight,1),.1,140);e.position.set(0,2.2,9.5);const n=new t1({antialias:!0,alpha:!0,powerPreference:"high-performance"});n.setPixelRatio(Math.min(devicePixelRatio,1.65)),n.setSize(r.clientWidth,r.clientHeight),n.setClearColor(0,0),n.outputColorSpace=Ln,n.toneMapping=Xm,n.toneMappingExposure=1.15,r.appendChild(n.domElement);const i=new Bt("#1769d2"),s={paused:!1,explode:0,explodeTarget:0,rx:0,ry:0,userRX:0,userRY:0,zoom:9.5,dragging:!1,pointerX:0,pointerY:0};t.add(new p1(16777215,9420799,1.65));const o=new g1(i,4.4);o.position.set(5,7,6),t.add(o);const a=new Hd(5083127,28,22);a.position.set(-5,2,-1),t.add(a);const c=new Hd(i,18,18);c.position.set(3,-1,4),t.add(c);const l=new te;t.add(l),S1(t,i);const u={tickers:[],parts:[],state:s,accent:i,scene:t,camera:e,renderer:n,world:l};({shipyard:T1,shipbuilding:b1,engine:A1,electro:w1,network:C1,cnc:R1,quality:P1,blueprint:Xd}[r.dataset.scene]||Xd)(u),y1(r,u),E1(r,u);const f=matchMedia("(prefers-reduced-motion: reduce)").matches,d=new v1;function g(){const p=d.getElapsedTime();s.explode+=(s.explodeTarget-s.explode)*.085,s.rx+=(s.userRX-s.rx)*.075,s.ry+=(s.userRY-s.ry)*.075,e.position.z+=(s.zoom-e.position.z)*.08,l.rotation.x=s.rx,l.rotation.y=s.ry,M1(u.parts,s.explode);const m=document.documentElement.classList.contains("a11y-no-motion");!s.paused&&!f&&!m&&u.tickers.forEach(y=>y(p,s)),n.render(t,e),requestAnimationFrame(g)}g(),new ResizeObserver(()=>{const p=r.clientWidth,m=Math.max(r.clientHeight,1);e.aspect=p/m,e.updateProjectionMatrix(),n.setSize(p,m)}).observe(r)}function y1(r,t){document.querySelectorAll("[data-scene-action]").forEach(e=>{e.addEventListener("click",()=>{const n=e.dataset.sceneAction;n==="explode"&&(t.state.explodeTarget=t.state.explodeTarget>.5?0:1,e.classList.toggle("active",t.state.explodeTarget>0),e.querySelector("span")&&(e.querySelector("span").textContent=t.state.explodeTarget>0?"Собрать":"Разобрать")),n==="pause"&&(t.state.paused=!t.state.paused,e.classList.toggle("active",t.state.paused),e.querySelector("span")&&(e.querySelector("span").textContent=t.state.paused?"Продолжить":"Пауза")),n==="reset"&&(t.state.userRX=0,t.state.userRY=0,t.state.zoom=9.5,t.state.explodeTarget=0,document.querySelectorAll('[data-scene-action="explode"]').forEach(i=>i.classList.remove("active")))})})}function E1(r,t){const e=t.state,n=r.closest(".hero,.specialty-hero,.page-hero")||r,i=a=>{var c,l,u;(l=(c=a.target).closest)!=null&&l.call(c,"a,button,input,select,textarea")||(e.dragging=!0,e.pointerX=a.clientX,e.pointerY=a.clientY,n.classList.add("is-dragging"),(u=n.setPointerCapture)==null||u.call(n,a.pointerId))},s=a=>{if(e.dragging){const c=a.clientX-e.pointerX,l=a.clientY-e.pointerY;e.pointerX=a.clientX,e.pointerY=a.clientY,e.userRY+=c*.006,e.userRX+=l*.004,e.userRX=Math.max(-.55,Math.min(.55,e.userRX))}else{const c=n.getBoundingClientRect(),l=(a.clientX-c.left)/c.width-.5,u=(a.clientY-c.top)/c.height-.5;e.userRY+=(l*.2-e.userRY)*.018,e.userRX+=(-u*.08-e.userRX)*.018}},o=a=>{var c;e.dragging=!1,n.classList.remove("is-dragging"),(c=n.releasePointerCapture)==null||c.call(n,a.pointerId)};n.addEventListener("pointerdown",i),n.addEventListener("pointermove",s,{passive:!0}),n.addEventListener("pointerup",o),n.addEventListener("pointercancel",o),n.addEventListener("wheel",a=>{var c,l;(l=(c=a.target).closest)!=null&&l.call(c,"input,select,textarea")||(a.preventDefault(),e.zoom=Math.max(6.2,Math.min(12.5,e.zoom+a.deltaY*.006)))},{passive:!1})}function S1(r,t){const e=new P_(34,56,t,10470901);e.position.y=-2.45,e.material.opacity=.2,e.material.transparent=!0,r.add(e);const n=new ae,i=[];for(let a=0;a<620;a++)i.push((Math.random()-.5)*28,(Math.random()-.5)*14,(Math.random()-.5)*22);n.setAttribute("position",new Ft(i,3));const s=new S_(n,new mh({color:t,size:.022,transparent:!0,opacity:.42}));r.add(s);const o=new pt(new Me(9,9,5,64,1,!0),new fi({color:t,wireframe:!0,transparent:!0,opacity:.028,side:He}));o.position.y=-1,r.add(o)}const cr=(r,t=.72)=>new fi({color:r,wireframe:!0,transparent:!0,opacity:t}),Xt=(r,t=1,e=.05)=>new Qa({color:r,metalness:.78,roughness:.22,transparent:t<1,opacity:t,side:ze,emissive:r,emissiveIntensity:e}),ri=(r,t=.9)=>new fi({color:r,transparent:!0,opacity:t});function pr(r,t,e,n=.5){const i=new ae().setFromPoints([r,t]);return new Ua(i,new Ri({color:e,transparent:!0,opacity:n}))}function go(r,t,e=4,n=2){for(let i=0;i<e;i++){const s=new pt(new xr(n+i*.48,.012,4,96),ri(t,.13));s.rotation.x=Math.PI/2,r.add(s)}}function ee(r,t,e=[1,0,0],n=1){return t.userData.basePosition=t.position.clone(),t.userData.explodeDirection=new P(...e).normalize(),t.userData.explodeDistance=n,r.parts.push(t),t}function M1(r,t){r.forEach(e=>{e.userData.basePosition&&e.position.copy(e.userData.basePosition).addScaledVector(e.userData.explodeDirection,e.userData.explodeDistance*t)})}function L_(r,t,e=.8){const n=new pt(new Xn(e,.18),new fi({color:r.accent,transparent:!0,opacity:.12,side:ze}));return n.position.copy(t),r.world.add(n),n}function T1(r){const{world:t,accent:e,tickers:n}=r,i=new te;t.add(i);const s=new pt(new Xn(18,9,32,16),new Qa({color:10275071,metalness:.12,roughness:.42,transparent:!0,opacity:.34,wireframe:!0}));s.rotation.x=-Math.PI/2,s.position.set(1,-1.72,0),i.add(s);const o=new te;o.position.set(1.25,-.2,.3),o.rotation.y=-.28,i.add(o);const a=ee(r,new pt(new he(5.9,.18,.18),Xt(e,.8,.12)),[0,-1,0],1);a.position.y=-.74,a.userData.basePosition=a.position.clone(),o.add(a);for(let h=0;h<18;h++){const f=1-Math.abs(h-8.5)/20,d=ee(r,new pt(new xr(1.02*f,.025,5,36,Math.PI),cr(e,.7)),[0,h%2?.5:-.5,h<9?-1:1],1.2);d.rotation.set(0,Math.PI/2,Math.PI/2),d.position.x=(h-8.5)*.34,d.userData.basePosition=d.position.clone(),o.add(d)}const c=ee(r,new pt(new he(5.2,.12,1.55),Xt(e,.18,.05)),[0,1,0],1.15);c.position.y=.55,c.userData.basePosition=c.position.clone(),o.add(c);const l=ee(r,new pt(new yh(1.02,2.05,5),cr(e,.82)),[1,.1,0],1.35);l.rotation.z=-Math.PI/2,l.position.x=3.86,l.userData.basePosition=l.position.clone(),o.add(l);const u=ee(r,new pt(new he(1.2,.8,.95),Xt(14284799,.16,.05)),[0,1,.2],1.5);u.position.set(-.5,1,.05),u.userData.basePosition=u.position.clone(),o.add(u);for(let h=0;h<3;h++){const f=new te,d=new pt(new he(.11,4.4,.11),cr(e,.5));d.position.y=.4,f.add(d);const g=new pt(new he(2.9,.09,.09),cr(e,.58));g.position.set(1.08,2.45,0),f.add(g);const _=pr(new P(1.9,2.4,0),new P(1.9,.7,0),e,.4);f.add(_),f.position.set(-4.6+h*4.3,-.45,-2.8),i.add(f)}for(let h=0;h<7;h++){const f=L_(r,new P(-4.3+h*1.45,1.8+h%2*.28,-2.2),.7);f.rotation.y=.15}go(i,e,5,2.1),n.push((h,f)=>{f.explode<.2&&(o.position.y=-.2+Math.sin(h*.8)*.055,o.rotation.y=-.28+Math.sin(h*.24)*.04),s.position.z=Math.sin(h*.4)*.04})}function b1(r){const{world:t,accent:e,tickers:n}=r,i=new te;i.rotation.set(-.035,-.34,.015),i.position.set(.25,-.25,.15),t.add(i);const s=[{x:-3.75,w:.92,deck:.46,chine:.7,keel:-.72},{x:-3.1,w:1.08,deck:.5,chine:.84,keel:-.88},{x:-2.2,w:1.18,deck:.54,chine:.94,keel:-1.02},{x:-1.2,w:1.22,deck:.58,chine:.98,keel:-1.08},{x:-.1,w:1.2,deck:.62,chine:.96,keel:-1.1},{x:.9,w:1.12,deck:.68,chine:.88,keel:-1.08},{x:1.75,w:.95,deck:.78,chine:.72,keel:-1},{x:2.5,w:.72,deck:.9,chine:.52,keel:-.86},{x:3.1,w:.42,deck:1.02,chine:.26,keel:-.62},{x:3.55,w:.08,deck:1.1,chine:.05,keel:-.28}],o=new ae,a=[];s.forEach(D=>{a.push(D.x,D.deck,-D.w,D.x,-.1,-D.chine,D.x,D.keel,0,D.x,-.1,D.chine,D.x,D.deck,D.w)});const c=[];for(let D=0;D<s.length-1;D++){const H=D*5,Z=(D+1)*5;for(let et=0;et<4;et++)c.push(H+et,Z+et,Z+et+1,H+et,Z+et+1,H+et+1)}c.push(0,1,2,0,2,4,4,2,3);const l=(s.length-1)*5;c.push(l,l+2,l+1,l,l+4,l+2,l+4,l+3,l+2),o.setAttribute("position",new Ft(a,3)),o.setIndex(c),o.computeVertexNormals();const u=new Qa({color:e,metalness:.72,roughness:.2,transparent:!0,opacity:.31,emissive:e,emissiveIntensity:.055,side:ze}),h=ee(r,new pt(o,u),[0,-.8,0],1.15);i.add(h);const f=new Ja(new Sh(o,13),new Ri({color:e,transparent:!0,opacity:.72}));h.add(f);const d=[],g=[];s.forEach(D=>{d.push(D.x,D.deck+.018,-D.w*.96,D.x,D.deck+.018,D.w*.96)});for(let D=0;D<s.length-1;D++){const H=D*2,Z=(D+1)*2;g.push(H,Z,Z+1,H,Z+1,H+1)}const _=new ae;_.setAttribute("position",new Ft(d,3)),_.setIndex(g),_.computeVertexNormals();const p=ee(r,new pt(_,Xt(14284799,.24,.035)),[0,1,0],1.18);i.add(p),[-1,1].forEach(D=>{const H=s.slice(0,-1).map(St=>new P(St.x,.03,D*(St.chine+(St.w-St.chine)*.28))),Z=new M_(H),et=new pt(new Th(Z,70,.014,5,!1),ri(12908543,.72));i.add(et)});const m=new te;i.add(m),s.slice(1,-1).forEach((D,H)=>{const Z=new ae().setFromPoints([new P(D.x,D.deck,-D.w),new P(D.x,-.1,-D.chine),new P(D.x,D.keel,0),new P(D.x,-.1,D.chine),new P(D.x,D.deck,D.w)]),et=new Ua(Z,new Ri({color:e,transparent:!0,opacity:H%2?.27:.48}));m.add(et)});const y=ee(r,new te,[-.7,.7,0],1.05);y.position.set(-1.85,.66,0),y.userData.basePosition=y.position.clone(),i.add(y);const v=new P_(3.35,10,e,2247004);v.rotation.z=Math.PI/2,v.rotation.y=Math.PI/2,v.scale.z=.66,v.material.transparent=!0,v.material.opacity=.28,y.add(v);const E=new te;E.position.set(-.45,.22,0),y.add(E);const w=new pt(new Me(.24,.24,.72,22),Xt(e,.58,.07));w.rotation.x=Math.PI/2,E.add(w),[-.4,.4].forEach(D=>{const H=new pt(new Me(.31,.31,.08,22),cr(e,.62));H.rotation.x=Math.PI/2,H.position.z=D,E.add(H)}),[-1,1].forEach(D=>{for(let H=0;H<2;H++){const Z=new pt(new Me(.055,.075,.28,10),Xt(14219263,.65,.02));Z.position.set(-1.15+H*.55,.2,D*.68),y.add(Z)}});const b=ee(r,new te,[-.2,.9,-.35],1.2);b.position.set(-2.38,.92,-.72),b.userData.basePosition=b.position.clone(),i.add(b);const S=new pt(new Me(.18,.26,.46,14),Xt(e,.55,.06));b.add(S);const C=new pt(new he(1.38,.11,.11),Xt(e,.5,.08));C.position.set(.58,.45,0),C.rotation.z=.42,b.add(C);const L=ee(r,new te,[.3,1,.18],1.42);L.position.set(.88,1.02,0),L.userData.basePosition=L.position.clone(),i.add(L);const x=new pt(new he(2.18,.82,1.72),Xt(14218234,.2,.018));x.position.set(-.1,.12,0),L.add(x);const M=new ae,O=[-.92,0,-.76,-.92,0,.76,.8,0,-.63,.8,0,.63,-.72,.62,-.66,-.72,.62,.66,.58,.62,-.52,.58,.62,.52],U=[0,2,3,0,3,1,4,5,7,4,7,6,0,4,6,0,6,2,1,3,7,1,7,5,0,1,5,0,5,4,2,6,7,2,7,3];M.setAttribute("position",new Ft(O,3)),M.setIndex(U),M.computeVertexNormals();const V=new pt(M,Xt(e,.25,.055));V.position.y=.57,L.add(V);for(let D=-.44;D<=.44;D+=.22){const H=new pt(new Xn(.19,.2),new fi({color:12449791,transparent:!0,opacity:.72,side:ze}));H.position.set(.586,.88,D),H.rotation.y=Math.PI/2,L.add(H)}[-1,1].forEach(D=>{for(let H=-.46;H<=.32;H+=.26){const Z=new pt(new Xn(.18,.18),ri(11465471,.52));Z.position.set(H,.88,D*.525),Z.rotation.y=D>0?0:Math.PI,L.add(Z)}});const Y=ee(r,new te,[-.25,.8,0],.85);Y.position.set(.05,1.92,0),Y.userData.basePosition=Y.position.clone(),i.add(Y);const z=new pt(new Me(.22,.28,.72,12),Xt(10345963,.35,.04));Y.add(z),[-.09,.09].forEach(D=>{const H=new pt(new Me(.035,.045,.46,8),Xt(e,.85,.08));H.position.set(0,.48,D),Y.add(H)});const $=ee(r,new te,[0,1.2,0],1.28);$.position.set(1.18,2.04,0),$.userData.basePosition=$.position.clone(),i.add($);const W=new pt(new Me(.028,.055,1.55,8),Xt(e,.78,.09));W.position.y=.55,$.add(W);const rt=new pt(new he(1.05,.045,.05),ri(e,.8));rt.position.y=.88,$.add(rt);const st=new te;st.position.y=1.22,$.add(st);const ct=new pt(new he(.92,.055,.12),ri(15203327,.9));st.add(ct);const At=new pt(new ys(.13,14,8),Xt(e,.42,.12));At.position.y=1.49,$.add(At),[-1,1].forEach(D=>{const H=ee(r,new te,[-.1,.35,D],.95);H.position.set(.25,1.22,D*1.05),H.userData.basePosition=H.position.clone(),i.add(H);const Z=new pt(new xh(.18,.86,5,12),Xt(14678271,.24,.035));Z.rotation.z=Math.PI/2,H.add(Z);const et=pr(new P(-.48,.1,0),new P(.48,.56,0),e,.42);H.add(et)});const Nt=new te;i.add(Nt),[-1,1].forEach(D=>{const H=s.slice(0,-1).map(Z=>new P(Z.x,Z.deck+.27,D*Z.w*.94));Nt.add(new Ua(new ae().setFromPoints(H),new Ri({color:14219519,transparent:!0,opacity:.38}))),s.slice(0,-1).forEach((Z,et)=>{et%2||Nt.add(pr(new P(Z.x,Z.deck+.03,D*Z.w*.94),new P(Z.x,Z.deck+.29,D*Z.w*.94),14219519,.3))})}),s.forEach((D,H)=>{if(H===0||H===s.length-1)return;const Z=pr(new P(D.x,-1.38,-1.48),new P(D.x,-1.38,1.48),e,H%2?.1:.2);i.add(Z)}),go(t,e,4,2.4),n.push((D,H)=>{i.rotation.y=-.34+Math.sin(D*.18)*.045,i.rotation.z=.015+Math.sin(D*.55)*.008*(1-H.explode),i.position.y=-.25+Math.sin(D*.62)*.035*(1-H.explode),st.rotation.y=D*1.85,b.rotation.y=-.18+Math.sin(D*.32)*.08})}function A1(r){const{world:t,accent:e,tickers:n}=r,i=new te;i.rotation.y=-.35,t.add(i);const s=new te;i.add(s);const o=ee(r,new pt(new Me(.18,.18,5.4,24),Xt(14479359,.88,.02)),[-1,0,0],1.2);o.rotation.z=Math.PI/2,s.add(o);for(let c=-2;c<=2;c++){const l=ee(r,new pt(new Me(.42,.42,.16,24),Xt(e,.82,.08)),[0,0,c],1.15);l.rotation.z=Math.PI/2,l.position.x=c*.9,l.userData.basePosition=l.position.clone(),s.add(l);const u=new pt(new Me(.09,.09,.54,12),Xt(16777215,.9,.02));u.rotation.z=Math.PI/2,u.position.set(c*.9,.38*(c%2||1),0),s.add(u)}for(let c=-2;c<=2;c++){const l=c%2===0?1:-1,u=ee(r,new pt(new Me(.46,.54,1.45,24,1,!0),Xt(e,.18,.04)),[0,l,.25],1.65);u.position.set(c*.9,l*1.38,.1),u.userData.basePosition=u.position.clone(),i.add(u);const h=ee(r,new pt(new Me(.38,.38,.34,24),Xt(16055295,.75,.03)),[0,l,0],1.2);h.position.set(c*.9,l*.82,0),h.userData.basePosition=h.position.clone(),i.add(h),h.userData.phase=c*.85,h.userData.bank=l}const a=ee(r,new pt(new xr(1.18,.19,14,64),Xt(e,.5,.08)),[-1,0,0],1.5);a.rotation.y=Math.PI/2,a.position.x=-3.15,a.userData.basePosition=a.position.clone(),i.add(a),go(t,e,4,2.2),n.push(c=>{s.rotation.x=c*1.55,a.rotation.x=c*1.55,i.children.forEach(l=>{if(l.userData.phase!==void 0){const u=l.userData.bank,h=l.userData.basePosition;l.position.y=h.y+u*Math.sin(c*2.1+l.userData.phase)*.26}})})}function w1(r){const{world:t,accent:e,tickers:n}=r,i=new te;i.rotation.x=-.14,t.add(i);const s=new pt(new Xn(7.4,4.5,14,9),new fi({color:e,wireframe:!0,transparent:!0,opacity:.12,side:ze}));i.add(s);const o=[];[-1.6,-.95,-.3,.35,1,1.65].forEach((l,u)=>{const h=pr(new P(-3.25,l,.05),new P(3.25,l,.05),e,.38);i.add(h);for(let f=0;f<2;f++){const d=new pt(new ys(.06,10,10),ri(u%2?16777215:e,.95));d.userData={y:l,offset:f*2.5+u*.35,speed:.8+u*.06},i.add(d),o.push(d)}});for(let l=0;l<4;l++){const u=ee(r,new pt(new xr(.38,.07,8,38),Xt(e,.55,.12)),[l<2?-1:1,l%2?1:-1,.2],1.25);u.position.set(-1.9+l*1.25,l%2?.5:-.5,.3),u.userData.basePosition=u.position.clone(),i.add(u)}for(let l=0;l<6;l++){const u=ee(r,new pt(new he(.55,.38,.28),Xt(14350591,.28,.03)),[l<3?-1:1,(l%3-1)*.3,.3],1.1);u.position.set(-2.1+l%3*2.05,-1.25+Math.floor(l/3)*2.5,.22),u.userData.basePosition=u.position.clone(),i.add(u)}const c=ee(r,new pt(new xr(.66,.17,12,48),Xt(e,.3,.18)),[0,1,.5],1.45);c.position.set(0,0,.42),c.userData.basePosition=c.position.clone(),i.add(c),n.push(l=>{o.forEach(u=>{u.position.x=-3.25+(l*u.userData.speed+u.userData.offset)%6.5,u.position.y=u.userData.y,u.material.opacity=.55+.45*Math.sin(l*4+u.userData.offset)}),c.rotation.z=l*.45})}function C1(r){const{world:t,accent:e,tickers:n}=r,i=new te;t.add(i);const s=[[-2.4,.35,-.6],[-.8,.35,.35],[.8,.35,-.3],[2.4,.35,.45]],o=[];s.forEach((u,h)=>{const f=ee(r,new te,[u[0],.2,u[2]],1.2);f.position.set(...u),f.userData.basePosition=f.position.clone(),i.add(f);const d=new Ja(new Sh(new he(1.05,3,1.05)),new Ri({color:e,transparent:!0,opacity:.32}));f.add(d);for(let g=0;g<8;g++){const _=new pt(new he(.82,.2,.78),Xt(g%2?e:10215423,.16,.06));_.position.set(0,-1.1+g*.31,0),f.add(_),o.push(_);for(let p=0;p<3;p++){const m=new pt(new ys(.018,5,5),ri(p===0?9109441:e,.9));m.position.set(.31+p*.08,-1.1+g*.31,.405),f.add(m)}}});const a=s.map((u,h)=>{const f=new pt(new Za(.16,1),Xt(h===1?16777215:e,.95,.35));return f.position.set(u[0],2.25,u[2]),i.add(f),f});for(let u=0;u<a.length;u++)for(let h=u+1;h<a.length;h++)Math.abs(u-h)>2||i.add(pr(a[u].position,a[h].position,e,.34));const l=[[0,1],[1,2],[2,3],[0,2],[1,3]].map(([u,h],f)=>{const d=new pt(new ys(.055,8,8),ri(f%2?16777215:e,1));return i.add(d),{p:d,a:a[u].position.clone(),b:a[h].position.clone(),o:f*.19}});go(t,e,3,2.6),n.push(u=>{l.forEach(h=>h.p.position.lerpVectors(h.a,h.b,(u*.32+h.o)%1)),o.forEach((h,f)=>h.material.opacity=.1+.12*(1+Math.sin(u*3+f*.7))),i.rotation.y=Math.sin(u*.18)*.12})}function R1(r){const{world:t,accent:e,tickers:n}=r,i=new te;t.add(i);const s=ee(r,new pt(new he(6.4,.3,3.2),Xt(1586245,.72,.01)),[0,-1,0],1.2);s.position.y=-1.55,s.userData.basePosition=s.position.clone(),i.add(s);const o=new pt(new he(6,.12,.14),Xt(e,.55,.08));o.position.set(0,-1.28,1.05),i.add(o);const a=o.clone();a.position.z=-1.05,i.add(a);const c=ee(r,new te,[0,1,0],1.45);c.position.y=.35,c.userData.basePosition=c.position.clone(),i.add(c);const l=new pt(new he(4.8,.22,.25),Xt(e,.38,.06));l.position.y=1.22,c.add(l),[-2.2,2.2].forEach(_=>{const p=new pt(new he(.22,3,.28),Xt(e,.3,.04));p.position.set(_,-.15,0),c.add(p)});const u=ee(r,new te,[0,0,1],1.2);c.add(u);const h=new pt(new Me(.34,.48,1.65,24),Xt(14219263,.72,.03));h.position.y=.43,u.add(h);const f=new pt(new Me(.07,.11,1.1,10),Xt(e,.95,.18));f.position.y=-.92,u.add(f);const d=ee(r,new pt(new Me(1.12,1.12,.72,64),Xt(e,.8,.08)),[0,0,-1],1.35);d.rotation.x=Math.PI/2,d.position.set(.5,-.75,0),d.userData.basePosition=d.position.clone(),i.add(d);const g=[];for(let _=0;_<42;_++){const p=new pt(new he(.025,.025,.13),ri(e,.55));p.userData={phase:Math.random()*6.28,r:.3+Math.random()*.7,speed:.5+Math.random()},i.add(p),g.push(p)}n.push(_=>{u.position.x=Math.sin(_*.55)*1.5,c.position.z=Math.cos(_*.4)*.35,d.rotation.z=_*1.5,f.rotation.y=_*4,g.forEach(p=>{const m=p.userData,y=_*m.speed+m.phase;p.position.set(u.position.x+Math.cos(y)*m.r,-.5+Math.sin(y*1.7)*.55,Math.sin(y)*m.r),p.rotation.z=y})})}function P1(r){const{world:t,accent:e,tickers:n}=r,i=new te;t.add(i);const s=ee(r,new pt(new Mh(1.25,.34,170,24,2,3),new Qa({color:e,metalness:.82,roughness:.16,transparent:!0,opacity:.38,wireframe:!0,emissive:e,emissiveIntensity:.08})),[0,0,-1],1.2);i.add(s);const o=ee(r,new Ja(new Sh(new he(4.3,4.3,4.3)),new Ri({color:e,transparent:!0,opacity:.25})),[0,0,1],.9);i.add(o);const a=ee(r,new te,[1,0,0],1.6);a.position.x=3,a.userData.basePosition=a.position.clone(),i.add(a);const c=new pt(new he(.2,4,.2),cr(e,.55));a.add(c);const l=new pt(new he(.85,.32,.55),Xt(e,.42,.14));l.position.set(-.42,1.1,0),a.add(l);const u=new pt(new Xn(5.4,5.4),new fi({color:e,transparent:!0,opacity:.08,side:ze}));u.rotation.x=Math.PI/2,i.add(u);const h=new ae,f=[];for(let g=0;g<480;g++){const _=Math.random()*Math.PI*2,p=Math.acos(2*Math.random()-1),m=1.55+.12*Math.sin(_*3);f.push(m*Math.sin(p)*Math.cos(_),m*Math.cos(p),m*Math.sin(p)*Math.sin(_))}h.setAttribute("position",new Ft(f,3));const d=new S_(h,new mh({color:e,size:.025,transparent:!0,opacity:.55}));i.add(d),n.push(g=>{s.rotation.y=g*.34,s.rotation.x=g*.16,d.rotation.y=-g*.18,u.position.y=Math.sin(g*.95)*1.85,u.material.opacity=.035+.06*(1+Math.sin(g*3.4)),l.position.y=1.1+Math.sin(g*.75)*1.1})}function Xd(r){const{world:t,accent:e,tickers:n}=r,i=new pt(new Za(1.55,2),cr(e,.42));t.add(i),go(t,e,6,1.7);for(let s=0;s<16;s++){const o=s/16*Math.PI*2;t.add(pr(new P(Math.cos(o)*2.15,Math.sin(o)*2.15,0),new P(Math.cos(o)*4.35,Math.sin(o)*4.35,-1),e,.16))}for(let s=0;s<6;s++)L_(r,new P(-3+s*1.2,-2+s%2*.22,-1),.7);n.push(s=>{i.rotation.x=s*.12,i.rotation.y=s*.2,t.rotation.z=Math.sin(s*.2)*.05})}Wd&&x1(Wd);const Ah="zsk-a11y",Eu={font:"normal",contrast:!1,grayscale:!1,spacing:!1,images:!1,motion:!1};let Kr=null,Pe=L1();function L1(){try{return{...Eu,...JSON.parse(localStorage.getItem(Ah)||"{}")}}catch{return{...Eu}}}function $d(){try{localStorage.setItem(Ah,JSON.stringify(Pe))}catch{}}function Vs(r=!0){const t=document.documentElement;t.dataset.a11yFont=Pe.font||"normal",t.classList.toggle("a11y-high-contrast",!!Pe.contrast),t.classList.toggle("a11y-grayscale",!!Pe.grayscale),t.classList.toggle("a11y-wide-spacing",!!Pe.spacing),t.classList.toggle("a11y-hide-images",!!Pe.images),t.classList.toggle("a11y-no-motion",!!Pe.motion),Ca.globalTimeline.paused(!!Pe.motion),r&&(document.querySelectorAll("[data-a11y-font]").forEach(e=>{e.setAttribute("aria-pressed",String(e.dataset.a11yFont===Pe.font))}),document.querySelectorAll("[data-a11y-toggle]").forEach(e=>{const n=!!Pe[e.dataset.a11yToggle];e.setAttribute("aria-checked",String(n)),e.classList.toggle("active",n)})),window.dispatchEvent(new CustomEvent("zsk:a11y",{detail:{...Pe}}))}Vs(!1);function wh(r){document.querySelectorAll("[data-pwa-install]").forEach(e=>{e.hidden=!r});const t=document.querySelector("[data-pwa-banner]");if(t){const e=sessionStorage.getItem("zsk-pwa-banner-dismissed")==="1";t.hidden=!r||e}}function Ch(){const r=!navigator.onLine;document.documentElement.classList.toggle("is-offline",r);const t=document.querySelector("[data-offline-status]");t&&(t.hidden=!r)}window.addEventListener("beforeinstallprompt",r=>{r.preventDefault(),Kr=r,wh(!0)});window.addEventListener("appinstalled",()=>{Kr=null,wh(!1),document.documentElement.classList.add("pwa-installed")});window.addEventListener("online",Ch);window.addEventListener("offline",Ch);document.addEventListener("DOMContentLoaded",()=>{Vs(!0),Pe.motion||Ca.from(".reveal",{y:28,opacity:0,duration:.85,stagger:.12,ease:"power3.out"});const r=[...document.querySelectorAll(".spec-card,.news-card,.glass-panel,.home-lesson-card,.home-achievement-card")];if("IntersectionObserver"in window&&!Pe.motion){const c=new IntersectionObserver(l=>l.forEach(u=>{u.isIntersecting&&(Ca.fromTo(u.target,{y:25,opacity:0},{y:0,opacity:1,duration:.65,ease:"power2.out"}),c.unobserve(u.target))}),{threshold:.12});r.forEach(l=>c.observe(l))}const t=document.querySelector("[data-a11y-panel]"),e=document.querySelector("[data-a11y-backdrop]"),n=document.querySelector("[data-a11y-open]"),i=()=>{t&&(t.hidden=!1),e&&(e.hidden=!1),n==null||n.setAttribute("aria-expanded","true"),document.documentElement.classList.add("a11y-panel-open")},s=()=>{t&&(t.hidden=!0),e&&(e.hidden=!0),n==null||n.setAttribute("aria-expanded","false"),document.documentElement.classList.remove("a11y-panel-open")};n==null||n.addEventListener("click",i),document.querySelectorAll("[data-a11y-close]").forEach(c=>c.addEventListener("click",s)),e==null||e.addEventListener("click",s),document.querySelectorAll("[data-a11y-font]").forEach(c=>{c.addEventListener("click",()=>{Pe.font=c.dataset.a11yFont||"normal",$d(),Vs(!0)})}),document.querySelectorAll("[data-a11y-toggle]").forEach(c=>{c.addEventListener("click",l=>{l.preventDefault();const u=c.dataset.a11yToggle;u&&(Pe[u]=!Pe[u],$d(),Vs(!0))})}),document.querySelectorAll("[data-a11y-reset]").forEach(c=>{c.addEventListener("click",()=>{Pe={...Eu};try{localStorage.removeItem(Ah)}catch{}Vs(!0)})}),document.addEventListener("keydown",c=>{c.key==="Escape"&&t&&!t.hidden&&s()}),(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0)&&document.documentElement.classList.add("pwa-standalone"),Ch(),document.querySelectorAll("[data-pwa-install]").forEach(c=>{c.addEventListener("click",async()=>{Kr&&(Kr.prompt(),await Kr.userChoice,Kr=null,wh(!1))})}),document.querySelectorAll("[data-pwa-close]").forEach(c=>{c.addEventListener("click",()=>{sessionStorage.setItem("zsk-pwa-banner-dismissed","1");const l=c.closest("[data-pwa-banner]");l&&(l.hidden=!0)})});const o=document.getElementById("mobileNav"),a=document.querySelector(".mobile-menu-trigger");o&&a&&(o.addEventListener("show.bs.offcanvas",()=>a.classList.add("active")),o.addEventListener("hidden.bs.offcanvas",()=>a.classList.remove("active")))});"serviceWorker"in navigator&&(location.protocol==="https:"||location.hostname==="localhost")&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js",{scope:"/"}).then(r=>{r.update().catch(()=>{})}).catch(r=>{console.warn("PWA service worker registration failed:",r)})});
