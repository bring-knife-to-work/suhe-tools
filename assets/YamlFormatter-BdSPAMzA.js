import{I as e,O as t,P as n,_ as r,v as i}from"./index-DMHFHr8C.js";import{t as a}from"./WtToolPanel-4s7f75Vz.js";import{c as o}from"./converters-lTp3Bcem.js";var s={__name:`YamlFormatter`,setup(s){let c=e(`name: wt-tools
version: 1
features:
  - json
  - css`),l=e(``),u=e(``);function d(){u.value=``;try{l.value=o(c.value)}catch(e){u.value=e.message}}return(e,o)=>(t(),i(a,{input:c.value,"onUpdate:input":o[0]||=e=>c.value=e,output:l.value,error:u.value,title:`YAML 格式化`},{actions:n(()=>[r(`button`,{class:`wt-btn`,onClick:d},`格式化`)]),_:1},8,[`input`,`output`,`error`]))}};export{s as default};