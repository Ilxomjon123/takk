import{r as a,a as o,b as s,e as c,y as _,n as i,d as e,f as n,c as b}from"./index.c1d8041c.js";const g=n(" Delete "),f=["data-target","disabled"],k={key:1},p=["id"],v={class:"modal-dialog"},x={class:"modal-content"},C={class:"modal-body pb-5"},I={class:"p-5 text-center"},w=e("div",{class:"text-3xl mt-5"},"Are you sure?",-1),D=e("div",{class:"text-gray-600 mt-2"},[n(" Do you really want to delete these records? "),e("br"),n("This process cannot be undone. ")],-1),B={class:"flex justify-center gap-3"},L=e("button",{type:"button","data-dismiss":"modal",class:"btn btn-outline-secondary dark:border-dark-5 dark:text-gray-300"}," Cancel ",-1),T={key:1},j={__name:"DeleteConfirmModal",props:{isLoading:{type:Boolean,default:!1},isIcon:{type:Boolean,default:!1},modalId:{type:String,default:"delete-modal"},iconClass:{type:String,default:""}},emits:["onConfirmedDelete"],setup(t){const r=t;function m(){b("#"+r.modalId).modal("show")}return(h,d)=>{const u=a("TrashIcon"),l=a("LoadingIcon"),y=a("XCircleIcon");return o(),s("div",null,[t.isIcon?(o(),s("span",{key:0,onClick:m,class:"w-full"},[c(u,{class:_(t.iconClass)},null,8,["class"]),g])):(o(),s("a",{key:1,href:"javascript:;",class:"btn btn-danger","data-toggle":"modal","data-target":"#"+t.modalId,disabled:t.isLoading},[t.isLoading?(o(),i(l,{key:0,icon:"three-dots",color:"white",class:"w-8 h-8 my-2"})):(o(),s("span",k,"Delete"))],8,f)),e("div",{id:t.modalId,class:"modal",tabindex:"-1","aria-hidden":"true"},[e("div",v,[e("div",x,[e("div",C,[e("div",I,[c(y,{class:"w-16 h-16 text-theme-6 mx-auto mt-3"}),w,D]),e("div",B,[L,e("button",{type:"button","data-dismiss":"modal",class:"btn btn-danger",onClick:d[0]||(d[0]=N=>h.$emit("onConfirmedDelete"))},[t.isLoading?(o(),i(l,{key:0,icon:"three-dots",color:"white",class:"my-1 mx-2"})):(o(),s("span",T,"Delete"))])])])])])],8,p)])}}};export{j as _};
