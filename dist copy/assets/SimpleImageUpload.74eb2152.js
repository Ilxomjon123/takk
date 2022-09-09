import{ac as i,_ as r,a as o,b as l,d as a,t as n}from"./index.c1d8041c.js";const d=i({props:["imagePath","title"],data:()=>({selectedFilePath:"/src/assets/images/plus-icon.jpg"}),mounted(){this.imagePath&&(this.selectedFilePath=this.imagePath)},methods:{changeImage(e){this.selectedFilePath=URL.createObjectURL(e.target.files[0]),this.$refs.image.src=URL.createObjectURL(e.target.files[0]),this.$emit("updateImageFile",e.target.files[0])},removeImage(){this.$refs.image.src="/src/assets/images/plus-icon.jpg",this.$emit("updateImageFile","")},replaceByDefault(e){this.selectedFilePath?e.target.src=this.selectedFilePath:(e.target.style.display="none",alert("Error while image uploading.."))}}}),m={class:"mx-auto mb-5"},c={class:"border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5"},g={class:"h-40 relative image-fit zoom-in mx-auto"},p=["src"],h={class:"mx-auto relative mt-5"};function u(e,t,f,b,y,$){return o(),l("div",m,[a("div",c,[a("div",g,[a("img",{class:"rounded-md",alt:"Add image",src:e.imagePath,ref:"image",onError:t[0]||(t[0]=(...s)=>e.replaceByDefault&&e.replaceByDefault(...s)),"data-action":"zoom"},null,40,p)]),a("div",h,[a("button",{type:"button",class:"btn btn-primary w-full cursor-pointer",onClick:t[1]||(t[1]=s=>e.$refs.inputFile.click())},n(e.title),1),a("input",{type:"file",ref:"inputFile",class:"hidden",onChange:t[2]||(t[2]=(...s)=>e.changeImage&&e.changeImage(...s))},null,544)])])])}const P=r(d,[["render",u]]);export{P as S};
