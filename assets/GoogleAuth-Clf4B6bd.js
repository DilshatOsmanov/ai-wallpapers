import{_ as d}from"./logo-Ft4BtHHg.js";import{u as _,P as m,f as u,g as h,x as g,r as p,o,c as r,a as e,b as v,I as f,O as y,M as x}from"./index-BpHBTNSw.js";import{g as b}from"./user-Dr_mFpQe.js";const k={class:"bg-light p-3 p-md-4 p-xl-5 min-vh-100 d-flex align-items-center"},w={class:"container"},N={class:"row justify-content-center"},V={class:"col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5"},B={class:"card border border-light-subtle rounded-4"},C={class:"card-body p-3 p-md-4 p-xl-5"},j={class:"row"},q={class:"col-12"},A={class:"mb-5"},L={key:0,class:"login__title text-center mb-0"},M={key:1,class:"d-flex justify-content-center my-5"},R={key:0,class:"row gy-3 overflow-hidden"},T={class:"col-12 mt-0"},E={class:"d-grid"},S={__name:"GoogleAuth",setup(G){const a=_(),n=m(),i=u(),t=h({error:!1});return g(async()=>{n.query.code||i.push({name:"login-page"});try{t.error=!1;const{data:c}=await b({code:n.query.code});a.dispatch("setToken",{access_token:c.access_token,refresh_token:c.refresh_token})}catch{t.error=!0}}),(c,s)=>{const l=p("router-link");return o(),r("section",k,[e("div",w,[e("div",N,[e("div",V,[e("div",B,[e("div",C,[e("div",j,[e("div",q,[e("div",A,[s[1]||(s[1]=e("div",{class:"text-center mb-4"},[e("img",{class:"login__logo",src:d,alt:"Logo"})],-1)),t.error?(o(),r("h4",L," Что-то пошло не так! Попробуйте снова! ")):(o(),r("div",M,s[0]||(s[0]=[e("div",{class:"spinner-border",style:{width:"3rem",height:"3rem"},role:"status"},[e("span",{class:"visually-hidden"},"Loading...")],-1)])))])])]),t.error?(o(),r("div",R,[e("div",T,[e("div",E,[v(l,{class:"btn btn-lg btn-primary",to:{name:"login-page"}},{default:f(()=>s[2]||(s[2]=[x(" Повторить попытку ")])),_:1})])])])):y("",!0)])])])])])])}}};export{S as default};
