import{A as d}from"./AdminEmployeeForm.ca4141e4.js";import{V as i,k as c,a as l,b as n,d as e,e as m,x as p,s as _}from"./index.c1d8041c.js";import"./DeleteConfirmModal.8e1bb800.js";const u={class:"grid grid-cols-12 gap-6"},h={class:"col-span-12 lg:col-span-12 2xl:col-span-12"},y={class:"intro-y box lg:mt-5"},f=e("div",{class:"flex items-center p-5 border-b border-gray-200 dark:border-dark-5"},[e("h2",{class:"font-medium text-base mr-auto"},"Edit Employee")],-1),E={class:"p-5"},g={class:"grid grid-cols-12 gap-6"},B={__name:"Edit",async setup(x){let s,t;const a=i(),r=([s,t]=c(()=>{var o;return _.dispatch("adminEmployee/fetchAdminEmployee",(o=a.params)==null?void 0:o.id)}),s=await s,t(),s);return(o,b)=>(l(),n("div",null,[e("div",u,[e("div",h,[e("div",y,[f,e("div",E,[e("div",g,[m(d,{isEdit:!0,form:p(r),dispatcher:"adminEmployee/putAdminEmployee"},null,8,["form"])])])])])])]))}};export{B as default};
