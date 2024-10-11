import{r as F,u as q,a as N,b as P,o as n,c as a,d as e,w as M,F as g,e as m,f as p,g as y,v as x,n as k,t as v}from"./index-CT-QShEV.js";import{c as l,r as h,u as S}from"./index-COEldCFU.js";const _=l.withParams({type:"numeric"},c=>{if(!c)return!0;const u=c.toString().replace(",","."),r=parseFloat(u);return!isNaN(r)&&r>0}),z=(c,u)=>{const r=c.__vccOpts||c;for(const[b,w]of u)r[b]=w;return r},B={class:"bg-light p-3 p-md-4 p-xl-5 min-vh-100 d-flex flex-column justify-content-between",style:{"padding-top":"5rem !important"}},G={class:"container"},J={class:"row mb-4"},L=["src"],T=["onClick"],A={class:"container text-center"},E={class:"mb-3"},O={class:"input-group"},W={class:"mb-3"},H={class:"input-group"},K={class:"mb-3"},Q={class:"input-group"},X={__name:"ImagesUploadView",setup(c){const u=F([]),r=F(null),b=q(),w=N(),o=P({width:null,length:null,height:null,files:[]}),C={width:{required:l.withMessage("Данное поле обязательно!",h),numeric:l.withMessage("Поле должно быть числовым!",_)},length:{required:l.withMessage("Данное поле обязательно!",h),numeric:l.withMessage("Поле должно быть числовым!",_)},height:{required:l.withMessage("Данное поле обязательно!",h),numeric:l.withMessage("Поле должно быть числовым!",_)},files:{required:l.withMessage("Необходимо загрузить хотя бы одно изображение!",h),validFileFormat:l.withMessage("Формат файла должен быть PNG или JPG!",i=>i.every(t=>["image/png","image/jpeg"].includes(t.type))),validFileSize:l.withMessage("Размер файла не должен превышать 5МБ!",i=>i.every(t=>t.size<=5*1024*1024))}},d=S(C,o),V=()=>{r.value.click()},D=i=>{const t=i.target.files;$(t)},j=i=>{const t=i.dataTransfer.files;$(t)},$=i=>{for(let t of i){if(!["image/png","image/jpeg"].includes(t.type))continue;o.files.push(t);const s=new FileReader;s.onload=f=>{u.value.push({url:f.target.result})},s.readAsDataURL(t)}},I=i=>{u.value.splice(i,1),o.files.splice(i,1)},R=async()=>{await d.value.$validate()&&w.push("/room")},U=()=>{b.dispatch("logout")};return(i,t)=>(n(),a(g,null,[e("nav",{class:"navbar navbar-default navbar-fixed-top"},[e("div",{class:"container"},[e("div",{class:"d-flex align-items-center justify-content-end w-100"},[e("div",{class:"dropdown"},[t[5]||(t[5]=e("button",{type:"button",class:"header__avatar","data-bs-toggle":"dropdown","aria-expanded":"false"}," JD ",-1)),e("ul",{class:"dropdown-menu dropdown-menu-dark dropdown-menu-end"},[t[4]||(t[4]=e("li",null,[e("a",{class:"dropdown-item",href:"#"},"Профиль")],-1)),e("li",null,[e("button",{class:"dropdown-item",type:"button",onClick:U},"Выйти")])])])])])]),e("section",B,[e("div",G,[t[7]||(t[7]=e("div",{class:"row mb-4"},[e("div",{class:"col-12 text-center"},[e("h1",{class:"image-upload-page__title fw-bold"}," Выберите картинки для генерации обоев для вашей комнаты с помощью ИИ "),e("p",{class:"image-upload-page__subtitle lead text-muted"}," Загрузите изображения, и наш искусственный интеллект поможет вам создать уникальные обои для вашего пространства. ")])],-1)),e("div",J,[e("div",{class:"col-12 image-upload-page__img-upload-form",onDragover:t[0]||(t[0]=M(()=>{},["prevent"])),onDrop:M(j,["prevent"]),style:{border:"2px dashed rgba(0, 0, 0, 0.7)",padding:"1rem"}},[e("div",{class:"cursor-pointer border rounded d-flex align-items-center justify-content-center image-upload-page__add-img-btn",onClick:V},[e("input",{type:"file",ref_key:"fileInput",ref:r,accept:"image/png, image/gif, image/jpeg",multiple:"",hidden:"",onChange:D},null,544),t[6]||(t[6]=e("span",{class:"fs-1"},"+",-1))]),(n(!0),a(g,null,m(u.value,(s,f)=>(n(),a("div",{key:f,class:"position-relative"},[e("img",{src:s.url,class:"img-thumbnail"},null,8,L),e("button",{type:"button",class:"btn-close position-absolute top-0 end-0",onClick:Y=>I(f)},null,8,T)]))),128))],32),(n(!0),a(g,null,m(p(d).files.$errors,s=>(n(),a("div",{class:"d-block invalid-feedback text-start",key:s.$uid},v(s.$message),1))),128))])]),e("div",A,[e("div",E,[t[9]||(t[9]=e("label",{for:"input-room-length",class:"form-label text-start w-100"},"Длина комнаты",-1)),e("div",O,[y(e("input",{id:"input-room-length",type:"text","aria-label":"Room length","aria-describedby":"length-addon",inputmode:"decimal",class:k(["form-control",{"is-invalid":p(d).length.$errors.length}]),"onUpdate:modelValue":t[1]||(t[1]=s=>o.length=s)},null,2),[[x,o.length]]),t[8]||(t[8]=e("div",{class:"input-group-append"},[e("span",{class:"input-group-text",id:"length-addon"},"м")],-1))]),(n(!0),a(g,null,m(p(d).length.$errors,s=>(n(),a("div",{class:"invalid-feedback text-start",key:s.$uid},v(s.$message),1))),128))]),e("div",W,[t[11]||(t[11]=e("label",{for:"input-room-width",class:"form-label text-start w-100"},"Ширина комнаты",-1)),e("div",H,[y(e("input",{id:"input-room-width",type:"text","aria-label":"Room width","aria-describedby":"width-addon",inputmode:"decimal",class:k(["form-control",{"is-invalid":p(d).width.$errors.length}]),"onUpdate:modelValue":t[2]||(t[2]=s=>o.width=s)},null,2),[[x,o.width]]),t[10]||(t[10]=e("div",{class:"input-group-append"},[e("span",{class:"input-group-text",id:"width-addo2"},"м")],-1))]),(n(!0),a(g,null,m(p(d).width.$errors,s=>(n(),a("div",{class:"invalid-feedback text-start",key:s.$uid},v(s.$message),1))),128))]),e("div",K,[t[13]||(t[13]=e("label",{for:"input-room-height",class:"form-label text-start w-100"},"Высота комнаты",-1)),e("div",Q,[y(e("input",{id:"input-room-height",type:"text","aria-label":"Room height","aria-describedby":"height-addon",inputmode:"decimal",class:k(["form-control",{"is-invalid":p(d).height.$errors.length}]),"onUpdate:modelValue":t[3]||(t[3]=s=>o.height=s)},null,2),[[x,o.height]]),t[12]||(t[12]=e("div",{class:"input-group-append"},[e("span",{class:"input-group-text",id:"height-addon"},"м")],-1))]),(n(!0),a(g,null,m(p(d).height.$errors,s=>(n(),a("div",{class:"invalid-feedback text-start",key:s.$uid},v(s.$message),1))),128))]),e("button",{type:"button",class:"btn btn-primary btn-lg px-5",onClick:R}," Генерировать ")])])],64))}},te=z(X,[["__scopeId","data-v-be60d81f"]]);export{te as default};
