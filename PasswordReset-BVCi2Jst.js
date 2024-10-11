import{A as q,a as V,b as F,k as M,o as l,c as a,d as s,l as p,m as g,f as n,g as _,v as b,n as v,F as w,e as x,t as c,q as y}from"./index-BquBB2x5.js";import{_ as A}from"./logo-w2E6J8bo.js";import{c as r,r as k,e as z,u as E}from"./index-BxmC1WGF.js";import{S as f}from"./sweetalert2.esm.all-Br4OTrmy.js";import{c as R,r as T}from"./user-BuStof1_.js";const N={class:"bg-light p-3 p-md-4 p-xl-5 min-vh-100"},P={class:"container"},S={class:"row justify-content-center"},U={class:"col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5"},j={class:"card border border-light-subtle rounded-4"},D={class:"card-body p-3 p-md-4 p-xl-5"},L={class:"row"},Z={class:"col-12"},G={class:"mb-5"},H={class:"text-center mb-4"},I={class:"row gy-3 overflow-hidden"},J={key:0,class:"col-12 mb-3"},K={class:"form-floating"},O=["disabled"],Q={key:1,class:"col-12 mb-3"},W={class:"form-floating"},X=["disabled"],Y={class:"col-12"},ss={class:"d-grid"},es=["disabled"],os=["disabled"],ts={class:"row"},ls={class:"col-12"},as={class:"d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end"},is={class:"row"},ns={class:"col-12"},rs={class:"d-flex gap-3 flex-column"},ds=["href"],hs={__name:"PasswordReset",setup(cs){const d=q(),h=V(),o=F({email:null,password:null,loading:!1}),C={email:{required:r.withMessage("Данное поле обязательно!",k),email:r.withMessage("Неверный формат почты!",z)},password:{required:r.withMessage("Данное поле обязательно!",k),passwordValidator:r.withMessage("Пароль должен содержать от 12 до 24 символов, включая хотя бы одну заглавную букву, одну строчную букву и одну цифру.",r.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{12,24}$/))}},i=E(C,o),$=async()=>{if(await i.value.email.$validate())try{o.loading=!0,await R({email:o.email}),f.fire({title:"Запрос успешно создан!",text:"Мы отправили письмо на вашу почту для восстановления аккаунта",icon:"success",showCancelButton:!1,confirmButtonColor:"#3085d6",confirmButtonText:"Продолжить"}).then(e=>{h.push({name:"login-page"})})}catch(e){f.fire({text:e.response.status==404?"Пользователь не найден!":"Ошибка сервера!",icon:"error",showCancelButton:!1,showConfirmButton:!1}),i.value.$touch()}finally{o.loading=!1}},B=async()=>{if(await i.value.password.$validate())try{o.loading=!0,await T({token:d.query.token,email:d.query.email,password:o.password}),f.fire({text:"Пароль успешно восстановлен!",icon:"success",showCancelButton:!1,confirmButtonColor:"#3085d6",confirmButtonText:"Продолжить"}).then(e=>{h.push({name:"login-page"})})}catch{i.value.$touch()}finally{o.loading=!1}};return(m,e)=>{const u=M("router-link");return l(),a("section",N,[s("div",P,[s("div",S,[s("div",U,[s("div",j,[s("div",D,[s("div",L,[s("div",Z,[s("div",G,[s("div",H,[p(u,{to:{name:"login-page"}},{default:g(()=>e[2]||(e[2]=[s("img",{class:"login__logo",src:A,alt:"Logo"},null,-1)])),_:1})]),e[3]||(e[3]=s("h2",{class:"h4 text-center"},"Сброс пароля",-1)),e[4]||(e[4]=s("h3",{class:"fs-6 fw-normal text-secondary text-center m-0"}," Укажите адрес электронной почты, связанный с вашей учетной записью, чтобы восстановить пароль. ",-1))])])]),s("form",null,[s("div",I,[n(d).query.token?(l(),a("div",Q,[s("div",W,[_(s("input",{id:"password",class:v(["form-control",{"is-invalid":n(i).password.$errors.length}]),name:"password",type:"password",placeholder:"",required:"",disabled:o.loading,"onUpdate:modelValue":e[1]||(e[1]=t=>o.password=t)},null,10,X),[[b,o.password]]),e[6]||(e[6]=s("label",{for:"password",class:"form-label"},"Пароль",-1))]),(l(!0),a(w,null,x(n(i).password.$errors,t=>(l(),a("div",{class:"invalid-feedback text-start d-block",key:t.$uid},c(t.$message),1))),128))])):(l(),a("div",J,[s("div",K,[_(s("input",{id:"email",class:v(["form-control",{"is-invalid":n(i).email.$errors.length}]),name:"email",type:"email",placeholder:"",required:"",disabled:o.loading,"onUpdate:modelValue":e[0]||(e[0]=t=>o.email=t)},null,10,O),[[b,o.email]]),e[5]||(e[5]=s("label",{for:"email",class:"form-label"},"Email",-1))]),(l(!0),a(w,null,x(n(i).email.$errors,t=>(l(),a("div",{class:"invalid-feedback text-start d-block",key:t.$uid},c(t.$message),1))),128))])),s("div",Y,[s("div",ss,[n(d).query.token?(l(),a("button",{key:1,class:"btn btn-lg btn-primary",type:"button",disabled:o.loading,onClick:B},c(o.loading?"Загрузка...":"Восстановить пароль"),9,os)):(l(),a("button",{key:0,class:"btn btn-lg btn-primary",type:"button",disabled:o.loading,onClick:$},c(o.loading?"Загрузка...":"Сбросить пароль"),9,es))])])])]),s("div",ts,[s("div",ls,[e[9]||(e[9]=s("hr",{class:"mt-5 mb-4 border-secondary-subtle"},null,-1)),s("div",as,[p(u,{to:{name:"login-page"},class:"link-secondary text-decoration-none"},{default:g(()=>e[7]||(e[7]=[y("Войти")])),_:1}),p(u,{to:{name:"register-page"},class:"link-secondary text-decoration-none"},{default:g(()=>e[8]||(e[8]=[y("Зарегистрироваться")])),_:1})])])]),s("div",is,[s("div",ns,[e[11]||(e[11]=s("p",{class:"mt-5 mb-3"},"Или продолжить",-1)),s("div",rs,[s("a",{href:m.baseUrl+"/oauth/google-login",class:"btn bsb-btn-xl btn-danger"},e[10]||(e[10]=[s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-google",viewBox:"0 0 16 16"},[s("path",{d:"M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"})],-1),s("span",{class:"ms-2 fs-6 text-uppercase"},"Войти через Google",-1)]),8,ds)])])])])])])])])])}}};export{hs as default};
