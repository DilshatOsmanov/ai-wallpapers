import{_ as l}from"./logo-Ft4BtHHg.js";import{u as _,A as m,a as u,r as h,i as p,k as g,o as t,c as r,d as s,l as v,m as f,z as y,q as k}from"./index-CchTyC0v.js";import{g as b}from"./user-PcZhb-Pd.js";const x={class:"bg-light p-3 p-md-4 p-xl-5 min-vh-100"},w={class:"container"},N={class:"row justify-content-center"},V={class:"col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5"},q={class:"card border border-light-subtle rounded-4"},A={class:"card-body p-3 p-md-4 p-xl-5"},B={class:"row"},C={class:"col-12"},j={class:"mb-5"},L={key:0,class:"login__title text-center mb-0"},R={key:1,class:"d-flex justify-content-center my-5"},T={key:0,class:"row gy-3 overflow-hidden"},z={class:"col-12 mt-0"},E={class:"d-grid"},F={__name:"GoogleAuth",setup(G){const c=_(),n=m(),a=u(),i=h(!1);return p(async()=>{n.query.code||a.push({name:"login-page"});try{const{data:o}=await b({code:n.query.code});c.dispatch("setToken",{access_token:o.access_token,refresh_token:o.refresh_token})}catch{i.value=!0}}),(o,e)=>{const d=g("router-link");return t(),r("section",x,[s("div",w,[s("div",N,[s("div",V,[s("div",q,[s("div",A,[s("div",B,[s("div",C,[s("div",j,[e[1]||(e[1]=s("div",{class:"text-center mb-4"},[s("img",{class:"login__logo",src:l,alt:"Logo"})],-1)),o.state.error?(t(),r("h4",L," Что-то пошло не так! Попробуйте снова! ")):(t(),r("div",R,e[0]||(e[0]=[s("div",{class:"spinner-border",style:{width:"3rem",height:"3rem"},role:"status"},[s("span",{class:"visually-hidden"},"Loading...")],-1)])))])])]),o.state.error?(t(),r("div",T,[s("div",z,[s("div",E,[v(d,{class:"btn btn-lg btn-primary",to:{name:"login-page"}},{default:f(()=>e[2]||(e[2]=[k(" Повторить попытку ")])),_:1})])])])):y("",!0)])])])])])])}}};export{F as default};
