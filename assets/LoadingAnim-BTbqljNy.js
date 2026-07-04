import{B as e,I as t,O as n,R as r,_ as i,b as a,h as o,k as s,n as c}from"./index-DMHFHr8C.js";var l={class:`wt-tool-panel`},u={class:`wt-loader-tabs`},d=[`onClick`],f={class:`wt-loader-preview`},p=[`innerHTML`],m={class:`wt-tool-panel__header`},h=[`value`],g={__name:`LoadingAnim`,setup(g){let _=[{name:`旋转圆环`,css:`.wt-loader-spin {
  width: 40px; height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: wt-spin 0.8s linear infinite;
}
@keyframes wt-spin { to { transform: rotate(360deg); } }`,html:`<div class="wt-loader-spin"></div>`},{name:`脉冲圆点`,css:`.wt-loader-dots {
  display: flex; gap: 6px;
}
.wt-loader-dots span {
  width: 10px; height: 10px;
  background: #6366f1;
  border-radius: 50%;
  animation: wt-bounce 1.2s ease-in-out infinite;
}
.wt-loader-dots span:nth-child(2) { animation-delay: 0.2s; }
.wt-loader-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes wt-bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}`,html:`<div class="wt-loader-dots"><span></span><span></span><span></span></div>`},{name:`进度条`,css:`.wt-loader-bar {
  width: 200px; height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}
.wt-loader-bar::after {
  content: '';
  display: block;
  width: 40%;
  height: 100%;
  background: #6366f1;
  border-radius: 2px;
  animation: wt-bar 1.5s ease-in-out infinite;
}
@keyframes wt-bar {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}`,html:`<div class="wt-loader-bar"></div>`},{name:`骨架闪烁`,css:`.wt-loader-skeleton {
  width: 200px; height: 20px;
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: wt-shimmer 1.5s infinite;
}
@keyframes wt-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,html:`<div class="wt-loader-skeleton"></div>`},{name:`双环旋转`,css:`.wt-loader-dual {
  width: 40px; height: 40px;
  border: 3px solid transparent;
  border-top-color: #6366f1;
  border-bottom-color: #8b5cf6;
  border-radius: 50%;
  animation: wt-spin 1s linear infinite;
}`,html:`<div class="wt-loader-dual"></div>`}],v=t(0);function y(e){c(e,`CSS 已复制`)}return(t,c)=>(n(),a(`div`,l,[c[2]||=i(`h2`,{class:`wt-tool-panel__title`},`CSS 加载动画`,-1),i(`div`,u,[(n(),a(o,null,s(_,(t,n)=>i(`button`,{key:n,class:r([`wt-btn wt-btn--ghost`,{"wt-btn--active":v.value===n}]),onClick:e=>v.value=n},e(t.name),11,d)),64))]),i(`div`,f,[i(`div`,{class:`wt-loader-demo`,innerHTML:_[v.value].html},null,8,p)]),i(`div`,m,[c[1]||=i(`span`,{class:`wt-label`},`CSS 代码`,-1),i(`button`,{class:`wt-btn wt-btn--ghost`,onClick:c[0]||=e=>y(_[v.value].css)},`复制`)]),i(`textarea`,{class:`wt-textarea wt-textarea--output`,value:_[v.value].css,readonly:``},null,8,h)]))}};export{g as default};