import{_ as a}from"./logo-Ft4BtHHg.js";import{A as c,a as d,b as _,i as m,k as u,o,c as r,d as e,l as g,m as h,z as p,q as v}from"./index-CA7MYt56.js";import{v as y}from"./user-cvP4T30p.js";const f={class:"bg-light p-3 p-md-4 p-xl-5 min-vh-100 d-flex align-items-center"},b={class:"container"},x={class:"row justify-content-center"},k={class:"col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5"},w={class:"card border border-light-subtle rounded-4"},q={class:"card-body p-3 p-md-4 p-xl-5"},V={class:"row"},N={class:"col-12"},B={class:"mb-5"},C={key:0,class:"login__title text-center mb-0"},E={key:1,class:"login__title text-center mb-0"},j={key:2,class:"d-flex justify-content-center my-5"},L={key:0,class:"row gy-3 overflow-hidden"},R={class:"col-12 mt-0"},z={class:"d-grid"},G={__name:"VerifyEmail",setup(A){const i=c(),l=d(),s=_({error:!1,loading:!1});return m(async()=>{(!i.query.token||!i.query.email)&&l.push({name:"login-page"});try{s.error=!1,s.loading=!0,await y({token:i.query.token,email:i.query.email})}catch{s.error=!0}finally{s.loading=!1}}),(M,t)=>{const n=u("router-link");return o(),r("section",f,[e("div",b,[e("div",x,[e("div",k,[e("div",w,[e("div",q,[e("div",V,[e("div",N,[e("div",B,[t[1]||(t[1]=e("div",{class:"text-center mb-4"},[e("img",{class:"login__logo",src:a,alt:"Logo"})],-1)),s.error?(o(),r("h4",C," Ошибка активации аккаунта, попробуйте еще раз! ")):s.loading?(o(),r("div",j,t[0]||(t[0]=[e("div",{class:"spinner-border",style:{width:"3rem",height:"3rem"},role:"status"},[e("span",{class:"visually-hidden"},"Loading...")],-1)]))):(o(),r("h4",E," Аккаунт успешно активирован! "))])])]),s.error?(o(),r("div",L,[e("div",R,[e("div",z,[g(n,{class:"btn btn-lg btn-primary",to:{name:"login-page"}},{default:h(()=>t[2]||(t[2]=[v(" Повторить попытку ")])),_:1})])])])):p("",!0)])])])])])])}}};export{G as default};