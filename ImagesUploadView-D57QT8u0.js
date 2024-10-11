import{r as F,u as U,a as q,b as B,o as n,c as o,d as t,w as C,F as g,e as h,f as p,g as y,v as _,n as x,t as f}from"./index-Ccb-bJY9.js";import{c as l,r as b,u as N}from"./index-CDMySmUu.js";import{S as P}from"./sweetalert2.esm.all-Br4OTrmy.js";import{c as z}from"./room-D4pjlEZV.js";const k=l.withParams({type:"numeric"},c=>{if(!c)return!0;const u=c.toString().replace(",","."),r=parseFloat(u);return!isNaN(r)&&r>0}),E=(c,u)=>{const r=c.__vccOpts||c;for(const[v,w]of u)r[v]=w;return r},G={class:"bg-light p-3 p-md-4 p-xl-5 min-vh-100 d-flex flex-column justify-content-between",style:{"padding-top":"5rem !important"}},J={class:"container"},L={class:"row mb-4"},T=["disabled"],A=["src"],O=["onClick"],W={class:"container text-center"},H={class:"mb-3"},K={class:"input-group"},Q=["disabled"],X={class:"mb-3"},Y={class:"input-group"},Z=["disabled"],ee={class:"mb-3"},te={class:"input-group"},se=["disabled"],ie=["disabled"],ae={__name:"ImagesUploadView",setup(c){const u=F([]),r=F(null),v=U(),w=q(),i=B({width:null,length:null,height:null,files:[],loading:!1}),M={width:{required:l.withMessage("Данное поле обязательно!",b),numeric:l.withMessage("Поле должно быть числовым!",k)},length:{required:l.withMessage("Данное поле обязательно!",b),numeric:l.withMessage("Поле должно быть числовым!",k)},height:{required:l.withMessage("Данное поле обязательно!",b),numeric:l.withMessage("Поле должно быть числовым!",k)},files:{required:l.withMessage("Необходимо загрузить хотя бы одно изображение!",b),validFileFormat:l.withMessage("Формат файла должен быть PNG или JPG!",a=>a.every(e=>["image/png","image/jpeg"].includes(e.type))),validFileSize:l.withMessage("Размер файла не должен превышать 5МБ!",a=>a.every(e=>e.size<=5*1024*1024))}},d=N(M,i),D=()=>{r.value.click()},V=a=>{const e=a.target.files;$(e)},R=a=>{if(i.loading)return;const e=a.dataTransfer.files;$(e)},$=a=>{for(let e of a){if(!["image/png","image/jpeg"].includes(e.type))continue;i.files.push(e);const s=new FileReader;s.onload=m=>{u.value.push({url:m.target.result})},s.readAsDataURL(e)}},j=a=>{u.value.splice(a,1),i.files.splice(a,1)},I=async()=>{if(await d.value.$validate())try{i.loading=!0;const e=new FormData;e.append("width",i.width),e.append("height",i.height),e.append("length",i.length),i.files.forEach((s,m)=>{e.append("image_files",s)}),await z(e),w.push({name:"room-page"})}catch{P.fire({text:"Ошибка сервера!",icon:"error",showCancelButton:!1,showConfirmButton:!1})}finally{i.loading=!1}},S=()=>{v.dispatch("logout")};return(a,e)=>(n(),o(g,null,[t("nav",{class:"navbar navbar-default navbar-fixed-top"},[t("div",{class:"container"},[t("div",{class:"d-flex align-items-center justify-content-end w-100"},[t("div",{class:"dropdown"},[e[5]||(e[5]=t("button",{type:"button",class:"header__avatar","data-bs-toggle":"dropdown","aria-expanded":"false"}," JD ",-1)),t("ul",{class:"dropdown-menu dropdown-menu-dark dropdown-menu-end"},[e[4]||(e[4]=t("li",null,[t("a",{class:"dropdown-item",href:"#"},"Профиль")],-1)),t("li",null,[t("button",{class:"dropdown-item",type:"button",onClick:S},"Выйти")])])])])])]),t("section",G,[t("div",J,[e[7]||(e[7]=t("div",{class:"row mb-4"},[t("div",{class:"col-12 text-center"},[t("h1",{class:"image-upload-page__title fw-bold"}," Выберите картинки для генерации обоев для вашей комнаты с помощью ИИ "),t("p",{class:"image-upload-page__subtitle lead text-muted"}," Загрузите изображения, и наш искусственный интеллект поможет вам создать уникальные обои для вашего пространства. ")])],-1)),t("div",L,[t("div",{class:"col-12 image-upload-page__img-upload-form",onDragover:e[0]||(e[0]=C(()=>{},["prevent"])),onDrop:C(R,["prevent"]),style:{border:"2px dashed rgba(0, 0, 0, 0.7)",padding:"1rem"}},[t("div",{class:"cursor-pointer border rounded d-flex align-items-center justify-content-center image-upload-page__add-img-btn",onClick:D},[t("input",{type:"file",ref_key:"fileInput",ref:r,accept:"image/png, image/gif, image/jpeg",multiple:"",hidden:"",disabled:i.loading,onChange:V},null,40,T),e[6]||(e[6]=t("span",{class:"fs-1"},"+",-1))]),(n(!0),o(g,null,h(u.value,(s,m)=>(n(),o("div",{key:m,class:"position-relative"},[t("img",{src:s.url,class:"img-thumbnail"},null,8,A),t("button",{type:"button",class:"btn-close position-absolute top-0 end-0",onClick:ne=>j(m)},null,8,O)]))),128))],32),(n(!0),o(g,null,h(p(d).files.$errors,s=>(n(),o("div",{class:"d-block invalid-feedback text-start",key:s.$uid},f(s.$message),1))),128))])]),t("div",W,[t("div",H,[e[9]||(e[9]=t("label",{for:"input-room-length",class:"form-label text-start w-100"},"Длина комнаты",-1)),t("div",K,[y(t("input",{id:"input-room-length",type:"text","aria-label":"Room length","aria-describedby":"length-addon",inputmode:"decimal",class:x(["form-control",{"is-invalid":p(d).length.$errors.length}]),disabled:i.loading,"onUpdate:modelValue":e[1]||(e[1]=s=>i.length=s)},null,10,Q),[[_,i.length]]),e[8]||(e[8]=t("div",{class:"input-group-append"},[t("span",{class:"input-group-text",id:"length-addon"},"м")],-1))]),(n(!0),o(g,null,h(p(d).length.$errors,s=>(n(),o("div",{class:"invalid-feedback text-start",key:s.$uid},f(s.$message),1))),128))]),t("div",X,[e[11]||(e[11]=t("label",{for:"input-room-width",class:"form-label text-start w-100"},"Ширина комнаты",-1)),t("div",Y,[y(t("input",{id:"input-room-width",type:"text","aria-label":"Room width","aria-describedby":"width-addon",inputmode:"decimal",class:x(["form-control",{"is-invalid":p(d).width.$errors.length}]),disabled:i.loading,"onUpdate:modelValue":e[2]||(e[2]=s=>i.width=s)},null,10,Z),[[_,i.width]]),e[10]||(e[10]=t("div",{class:"input-group-append"},[t("span",{class:"input-group-text",id:"width-addo2"},"м")],-1))]),(n(!0),o(g,null,h(p(d).width.$errors,s=>(n(),o("div",{class:"invalid-feedback text-start",key:s.$uid},f(s.$message),1))),128))]),t("div",ee,[e[13]||(e[13]=t("label",{for:"input-room-height",class:"form-label text-start w-100"},"Высота комнаты",-1)),t("div",te,[y(t("input",{id:"input-room-height",type:"text","aria-label":"Room height","aria-describedby":"height-addon",inputmode:"decimal",class:x(["form-control",{"is-invalid":p(d).height.$errors.length}]),disabled:i.loading,"onUpdate:modelValue":e[3]||(e[3]=s=>i.height=s)},null,10,se),[[_,i.height]]),e[12]||(e[12]=t("div",{class:"input-group-append"},[t("span",{class:"input-group-text",id:"height-addon"},"м")],-1))]),(n(!0),o(g,null,h(p(d).height.$errors,s=>(n(),o("div",{class:"invalid-feedback text-start",key:s.$uid},f(s.$message),1))),128))]),t("button",{type:"button",class:"btn btn-primary btn-lg px-5",disabled:i.loading,onClick:I},f(i.loading?"Загрузка...":"Генерировать"),9,ie)])])],64))}},ue=E(ae,[["__scopeId","data-v-10e4f0ed"]]);export{ue as default};
