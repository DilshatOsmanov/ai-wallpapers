import{f as y,o as x,c as L,a as e,b as k,F as Y,y as U,C as $,D as H,l as P,d as S,w as A,E as m,B as v,r as G,e as O}from"./index-DFEILUVf.js";const J={class:"modal room-modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},K={class:"modal-dialog"},Q={class:"modal-content"},tt={class:"modal-body"},et=["onClick"],ot={class:"row g-0"},st={class:"col-md-4"},at=["src"],lt={class:"col-md-8"},it={class:"card-body"},dt={class:"card-title fw-bold"},nt={class:"card-text",style:{"font-size":"14px"}},rt={class:"fw-semibold text-body-secondary mt-1"},ct={__name:"RoomWallpaperModal",setup(D){const r=y([{id:1,title:"Обои Cristiana Masi I Damaschi 23613",description:"Cristiana Masi всегда следит за качеством продукции. Данная модель обоев имеет артикул 23613. Виниловые обои часто используют как в квартирах, так и в загородных домах.",price:3e3,wallpaperImg:"/ai-wallpapers/wallpaper.jpg"},{id:2,title:"Обои Rasch Nubia",description:"Коллекция текстильных обоев Rasch Textil Nubia - творение немецких дизайнеров с выверенными линиями и формами гармонично сочетающимися друг с другом, как сообщающиеся сосуды.",price:3500,wallpaperImg:"/ai-wallpapers/wallpaper-2.jpg"},{id:3,title:"Обои Rasch Nubia 085180",description:"Коллекция текстильных обоев Rasch Textil Nubia - творение немецких дизайнеров с выверенными линиями и формами гармонично сочетающимися друг с другом, как сообщающиеся сосуды.",price:4500,wallpaperImg:"/ai-wallpapers/wallpaper-3.jpg"}]);return(s,d)=>(x(),L("div",J,[e("div",K,[e("div",Q,[d[1]||(d[1]=e("div",{class:"modal-header"},[e("h1",{class:"modal-title fs-5",id:"exampleModalLabel"},"Выбрать материал"),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),e("div",tt,[d[0]||(d[0]=k('<select class="form-select mb-3" aria-label="Material select"><option selected value="wallpaper">Обои</option><option value="1">Плитка</option><option value="2">Краска</option><option value="3">Панели</option></select>',1)),(x(!0),L(Y,null,U(r.value,a=>(x(),L("div",{class:"card room-modal__card mb-3",style:{"max-width":"540px"},"data-bs-dismiss":"modal",key:a.id,onClick:n=>s.$emit("changeWallpaper",a==null?void 0:a.wallpaperImg)},[e("div",ot,[e("div",st,[e("img",{src:a.wallpaperImg,class:"room-modal__card-img img-fluid rounded-start",alt:"wallpaper"},null,8,at)]),e("div",lt,[e("div",it,[e("h5",dt,$(a.title),1),e("p",nt,$(a.description),1),e("p",rt,$(a.price.toLocaleString("ru-RU"))+" тг/рулон ",1)])])])],8,et))),128))])])])]))}},vt={class:"bg-light d-flex flex-column justify-content-between position-relative overflow-hidden"},ut={class:"navbar navbar-default navbar-fixed-top"},mt={class:"container"},pt={class:"room__wrapper"},ft={class:"wall-left__right face"},_t={class:"wall-right__left face"},gt={class:"wall-top__front face"},wt={class:"wall-bottom__back face"},E=.5,M=2,bt=3,ht=4,W=27,xt={__name:"RoomView",setup(D){const r=y("/ai-wallpapers/wallpaper-4.jpg"),s=y(1);let d=50,a=45;const n=y(!0);H(()=>{const i=document.querySelector("#h"),t=document.body;let u=!1,X,Z;const V=30,q=90,p=o=>{if(!u||[...t.classList].includes("modal-open"))return;const l=((o.pageX||o.touches[0].pageX)-X)/window.innerWidth*120,w=((o.pageY||o.touches[0].pageY)-Z)/window.innerHeight*120;let c=d-w,b=a-l;T(b),c=Math.max(V,Math.min(q,c)),i.style.transform=`
      perspective(90vw)
      rotateX(${c}deg)
      rotateZ(${b}deg)
      translateZ(-12vw)
    `,i.style.zoom=s.value},f=o=>{u=!0,X=o.pageX||o.touches[0].pageX,Z=o.pageY||o.touches[0].pageY},_=()=>{u=!1;const o=i.style.transform.match(/rotateX\((.*?)deg\) rotateZ\((.*?)deg\)/);o&&(d=parseFloat(o[1]),a=parseFloat(o[2]))},T=o=>{let l=o%360;l<0&&(l=-l),l>=0&&l<120||l>=300&&l<360?n.value=!0:l>=120&&l<300&&(n.value=!1)},R=o=>{o.preventDefault(),![...t.classList].includes("modal-open")&&(s.value+=o.deltaY/2*-.01,s.value=Math.max(E,Math.min(M,s.value)),i.style.transform=`
      perspective(90vw)
      rotateX(${d}deg)
      rotateZ(${a}deg)
      translateZ(-12vw)
    `,i.style.zoom=s.value)};let g=null;const C=o=>{if(o.touches.length<2||[...t.classList].includes("modal-open"))return;const l=o.touches[0],w=o.touches[1],c=Math.hypot(l.pageX-w.pageX,l.pageY-w.pageY);g||(g=c);const b=c/g;s.value=Math.max(E,Math.min(M,s.value*b)),i.style.transform=`
      perspective(90vw)
      rotateX(${d}deg)
      rotateZ(${a}deg)
      translateZ(-12vw)
    `,i.style.zoom=s.value},z=()=>{g=null};t.addEventListener("mousedown",f),t.addEventListener("mousemove",p),t.addEventListener("mouseup",_),t.addEventListener("wheel",R),t.addEventListener("touchstart",f),t.addEventListener("touchmove",p),t.addEventListener("touchmove",C),t.addEventListener("touchend",_),t.addEventListener("touchend",z),P(()=>{t.removeEventListener("mousedown",f),t.removeEventListener("mousemove",p),t.removeEventListener("mouseup",_),t.removeEventListener("wheel",R),t.removeEventListener("touchstart",f),t.removeEventListener("touchmove",p),t.removeEventListener("touchmove",C),t.removeEventListener("touchend",_),t.removeEventListener("touchend",z)})});const N=W+"vw",B=W*ht/bt+"vw",I=()=>{s.value=Math.min(M,s.value+.05),document.querySelector("#h").style.transform=`
    perspective(90vw)
    rotateX(${d}deg)
    rotateZ(${a}deg)
    translateZ(-12vw)
  `,h.style.zoom=s.value},j=()=>{s.value=Math.max(E,s.value-.05),document.querySelector("#h").style.transform=`
    perspective(90vw)
    rotateX(${d}deg)
    rotateZ(${a}deg)
    translateZ(-12vw)
  `,h.style.zoom=s.value},F=i=>{i==null||i==null||(r.value=i)};return(i,t)=>{const u=G("router-link");return x(),L(Y,null,[t[23]||(t[23]=e("button",{type:"button",class:"order-btn btn btn-success btn-lg"},"Оформить заказ",-1)),e("section",vt,[e("nav",ut,[e("div",mt,[S(u,{to:{name:"images-upload-page"},class:"btn btn-secondary navbar-btn pull-left"},{default:A(()=>t[0]||(t[0]=[O("Назад")])),_:1}),t[1]||(t[1]=e("button",{type:"button","data-bs-toggle":"modal","data-bs-target":"#exampleModal",class:"btn btn-primary navbar-btn pull-right"}," Выбрать материал ",-1))])]),e("div",pt,[e("div",{class:"room__zoom-buttons"},[e("div",{class:"container"},[e("div",{class:"d-flex align-items-end justufy-content-center flex-column"},[e("button",{type:"button",class:"btn btn-dark mb-1",onClick:I},t[2]||(t[2]=[e("svg",{fill:"#fff",height:"15px",width:"15px",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512","xml:space":"preserve"},[e("g",null,[e("g",null,[e("polygon",{points:"289.391,222.609 289.391,0 222.609,0 222.609,222.609 0,222.609 0,289.391 222.609,289.391 222.609,512     289.391,512 289.391,289.391 512,289.391 512,222.609   "})])])],-1)])),e("button",{type:"button",class:"btn btn-secondary",onClick:j},t[3]||(t[3]=[e("svg",{fill:"#fff",height:"16px",width:"15px",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512","xml:space":"preserve"},[e("g",null,[e("g",null,[e("rect",{y:"222.609",width:"512",height:"66.783"})])])],-1)]))])])]),e("div",{id:"h",class:"house",style:m({width:B,height:N})},[t[22]||(t[22]=k('<div class="floor"><div class="floor__front face"></div><div class="floor__back face"></div><div class="floor__right face"></div><div class="floor__left face"></div><div class="floor__top face"></div><div class="floor__bottom face"></div></div>',1)),e("div",{class:v(["wall-left",{active:!n.value}])},[t[4]||(t[4]=e("div",{class:"wall-left__front face"},null,-1)),e("div",ft,[e("span",{style:m(`background-image: url('${r.value}')`)},null,4)]),t[5]||(t[5]=e("div",{class:"wall-left__left face bordered"},null,-1)),t[6]||(t[6]=e("div",{class:"wall-left__top face"},null,-1)),t[7]||(t[7]=e("div",{class:"wall-left__bottom face"},null,-1))],2),e("div",{class:v(["wall-right",{active:n.value}])},[t[8]||(t[8]=e("div",{class:"wall-right__back face"},null,-1)),t[9]||(t[9]=e("div",{class:"wall-right__right face bordered"},null,-1)),e("div",_t,[e("span",{style:m(`background-image: url('${r.value}')`)},null,4)]),t[10]||(t[10]=e("div",{class:"wall-right__top face"},null,-1)),t[11]||(t[11]=e("div",{class:"wall-right__bottom face"},null,-1))],2),e("div",{class:v(["wall-top",{active:!n.value}])},[e("div",gt,[e("span",{style:m(`background-image: url('${r.value}')`)},null,4)]),t[12]||(t[12]=e("div",{class:"wall-top__back face bordered"},null,-1)),t[13]||(t[13]=e("div",{class:"wall-top__top face"},null,-1)),t[14]||(t[14]=e("div",{class:"wall-top__bottom face"},null,-1)),t[15]||(t[15]=e("div",{class:"wall-top__right face"},null,-1))],2),e("div",{class:v(["wall-bottom",{active:n.value}])},[t[16]||(t[16]=e("div",{class:"wall-bottom__front face bordered"},null,-1)),e("div",wt,[e("span",{style:m(`background-image: url('${r.value}')`)},null,4)]),t[17]||(t[17]=e("div",{class:"wall-bottom__top face"},null,-1)),t[18]||(t[18]=e("div",{class:"wall-bottom__bottom face"},null,-1)),t[19]||(t[19]=e("div",{class:"wall-bottom__left face"},null,-1))],2),e("div",{class:v(["room-window",{active:!n.value}])},t[20]||(t[20]=[k('<div class="room-window__front face"></div><div class="room-window__back face"></div><div class="room-window__right face"></div><div class="room-window__left face"></div><div class="room-window__top face"></div><div class="room-window__bottom face"></div>',6)]),2),e("div",{class:v(["door-c",{active:!n.value}])},t[21]||(t[21]=[k('<div class="door"><div class="door__front face"></div><div class="door__back face"></div><div class="door__right face"></div><div class="door__left face"></div><div class="door__top face"></div><div class="door__bottom face"></div></div><div class="door-l"><div class="door-l__front face"></div><div class="door-l__back face"></div><div class="door-l__right face"></div><div class="door-l__left face"></div><div class="door-l__top face"></div><div class="door-l__bottom face"></div></div><div class="door-r"><div class="door-r__front face"></div><div class="door-r__back face"></div><div class="door-r__right face"></div><div class="door-r__left face"></div><div class="door-r__top face"></div><div class="door-r__bottom face"></div></div><div class="door-t"><div class="door-t__front face"></div><div class="door-t__back face"></div><div class="door-t__right face"></div><div class="door-t__left face"></div><div class="door-t__top face"></div><div class="door-t__bottom face"></div></div>',4)]),2)],4)])]),S(ct,{onChangeWallpaper:F})],64)}}};export{xt as default};
