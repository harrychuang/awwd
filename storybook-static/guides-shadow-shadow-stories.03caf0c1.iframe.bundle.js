"use strict";(self.webpackChunkawwd=self.webpackChunkawwd||[]).push([[754],{"./src/guides/shadow/shadow.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Shadow:()=>Shadow,__namedExportsOrder:()=>__namedExportsOrder,default:()=>shadow_stories});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),material_icons_react=__webpack_require__("./node_modules/material-icons-react/index.js"),material_icons_react_default=__webpack_require__.n(material_icons_react),DocMain=__webpack_require__("./src/doc/DocMain.jsx"),doc_ClipboardCopyContext=__webpack_require__("./src/doc/ClipboardCopyContext.jsx");const data_namespaceObject=JSON.parse('{"M":[{"Title":"Shadow Basic Shorter","helper":"var(--awwd-sys-shadow-basic-shorter)","class":"awwd-shadow--basic--shorter","style":"box-shadow: 0px 1px 3px rgba(11, 13, 18, 0.2);"},{"Title":"Shadow Basic Short","helper":"var(--awwd-sys-shadow-basic-short)","class":"awwd-shadow--basic--short","style":"box-shadow: 0px 2.5px 5px rgba(11, 13, 18, 0.2);"},{"Title":"Shadow Basic Regular","helper":"var(--awwd-sys-shadow-basic-rg)","class":"awwd-shadow--basic--rg","style":"box-shadow: 0px 5px 10px rgba(11, 13, 18, 0.2);"},{"Title":"Shadow Basic Medium","helper":"var(--awwd-sys-shadow-basic-med)","class":"awwd-shadow--basic--med","style":"box-shadow: 0px 10px 20px rgba(11, 13, 18, 0.2);"},{"Title":"Shadow Basic Long","helper":"var(--awwd-sys-shadow-basic-long)","class":"awwd-shadow--basic--long","style":"box-shadow: 0px 20px 40px rgba(11, 13, 18, 0.2)"},{"Title":"Shadow Heavy Shorter","helper":"var(--awwd-sys-shadow-heavy-shorter)","class":"awwd-shadow--heavy--shorter","style":"box-shadow: 0px 1px 3px rgba(11, 13, 18, 0.4);"},{"Title":"Shadow Heavy Short","helper":"var(--awwd-sys-shadow-heavy-short)","class":"awwd-shadow--heavy--short","style":"box-shadow: 0px 2.5px 5px rgba(11, 13, 18, 0.4);"},{"Title":"Shadow Heavy Regular","helper":"var(--awwd-sys-shadow-heavy-rg)","class":"awwd-shadow--heavy--rg","style":"box-shadow: 0px 5px 10px rgba(11, 13, 18, 0.4);"},{"Title":"Shadow Heavy Medium","helper":"var(--awwd-sys-shadow-heavy-med)","class":"awwd-shadow--heavy--med","style":"box-shadow: 0px 10px 20px rgba(11, 13, 18, 0.4);"},{"Title":"Shadow Heavy Long","helper":"var(--awwd-sys-shadow-heavy-long)","class":"awwd-shadow--heavy--long","style":"box-shadow: 0px 20px 40px rgba(11, 13, 18, 0.4)"}]}');var _Shadow_parameters,_Shadow_parameters_docs,_Shadow_parameters1;const shadow_stories={title:"Guides/Shadow",parameters:{docs:{page:null}}};let DsShadowCardListItems=[];DsShadowCardListItems=()=>{const clipboardCopy=(0,react.useContext)(doc_ClipboardCopyContext.A);return data_namespaceObject.M.map(((shadowData,index)=>(0,jsx_runtime.jsxs)("div",{className:"card-list__item",children:[(0,jsx_runtime.jsx)("div",{className:"card-list__item__typo font-p",children:(0,jsx_runtime.jsx)("b",{className:"font-p-lg font-w--semibold",children:shadowData.Title})}),(0,jsx_runtime.jsxs)("div",{className:"card-list__item__info",children:[(0,jsx_runtime.jsxs)("span",{className:"info info--helper",children:[shadowData.helper,(0,jsx_runtime.jsx)("button",{type:"button",className:"copy",onClick:()=>clipboardCopy(shadowData.helper),children:(0,jsx_runtime.jsx)(material_icons_react_default(),{icon:"content_copy"})})]}),(0,jsx_runtime.jsxs)("span",{className:"info info--classname",children:[".",shadowData.class,(0,jsx_runtime.jsx)("button",{type:"button",className:"copy",onClick:()=>clipboardCopy(shadowData.class),children:(0,jsx_runtime.jsx)(material_icons_react_default(),{icon:"content_copy"})})]}),(0,jsx_runtime.jsxs)("span",{className:"info info--style",children:[shadowData.style,(0,jsx_runtime.jsx)("button",{type:"button",className:"copy",onClick:()=>clipboardCopy(shadowData.style),children:(0,jsx_runtime.jsx)(material_icons_react_default(),{icon:"content_copy"})})]})]})]},index.toString())))};const boxStyle={display:"inline-block",alignItems:"center",width:"15%",height:"20px",color:"var(--storybook-doc-color-font-heading)",textAlign:"center",padding:"40px 10px",margin:"20px",borderRadius:"24px",fontSize:"12px",lineHeight:"16px",backgroundColor:"var(--storybook-doc-color-example-shadow-box)"},DsBoxShadowExampleItems=()=>data_namespaceObject.M.map(((shadowData,index)=>(0,jsx_runtime.jsx)("li",{className:"\n        ".concat(shadowData.class,"\n        font-p\n      "),style:boxStyle,children:(0,jsx_runtime.jsx)("b",{children:shadowData.Title})},index.toString()))),Shadow=(()=>(0,jsx_runtime.jsxs)(DocMain.O,{children:[(0,jsx_runtime.jsx)("h1",{className:"sbdocs-h1",children:"Shadow"}),(0,jsx_runtime.jsx)("p",{children:"Shadows provide cues about depth, direction of movement, and surface edges. Use shadow effects to give the illusion of perspective."}),(0,jsx_runtime.jsx)("h2",{className:"sbdocs-h2",children:"Usage"}),(0,jsx_runtime.jsx)("h6",{className:"sbdocs-h6",children:"* Shadow mixin from 'styles/color/settings.scss'"}),(0,jsx_runtime.jsx)("code",{children:".shadow{ box-shadow: var(--awwd-sys-shadow-basic-long); }"}),(0,jsx_runtime.jsx)("h6",{className:"sbdocs-h6",children:"* Shadow css from 'styles/color/common.scss'"}),(0,jsx_runtime.jsx)("code",{children:"<div class='awwd-shadow--light--long' />"}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)("section",{className:"simple-theme",children:(0,jsx_runtime.jsxs)("article",{children:[(0,jsx_runtime.jsx)("h3",{className:"sbdocs-h3",children:"Shadow Demo"}),(0,jsx_runtime.jsx)("ul",{style:{padding:"30px 0px",backgroundColor:"var(--storybook-doc-color-example-shadow-container)",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"space-around",marginBottom:"30px",flexWrap:"wrap"},children:(0,jsx_runtime.jsx)(DsBoxShadowExampleItems,{})})]})}),(0,jsx_runtime.jsx)(DsShadowCardListItems,{})]})).bind({});Shadow.parameters={...Shadow.parameters,docs:{...null===(_Shadow_parameters=Shadow.parameters)||void 0===_Shadow_parameters?void 0:_Shadow_parameters.docs,source:{originalSource:"() => <DocMain>\n    <h1 className='sbdocs-h1'>Shadow</h1>\n    <p>\n      Shadows provide cues about depth, direction of movement, \n      and surface edges. Use shadow effects to give \n      the illusion of perspective.\n    </p>\n    <h2 className='sbdocs-h2'>Usage</h2>\n    <h6 className='sbdocs-h6'>* Shadow mixin from &apos;styles/color/settings.scss&apos;</h6>\n    <code>\n      {'.shadow{ box-shadow: var(--awwd-sys-shadow-basic-long); }'}\n    </code>\n    <h6 className='sbdocs-h6'>* Shadow css from &apos;styles/color/common.scss&apos;</h6>\n    <code>\n      {'<div class=\\'awwd-shadow--light--long\\' />'}\n    </code>\n    <br /><br />\n    <section className='simple-theme'>\n      <article>\n        <h3 className='sbdocs-h3'>Shadow Demo</h3>\n        <ul style={{\n        padding: '30px 0px',\n        backgroundColor: 'var(--storybook-doc-color-example-shadow-container)',\n        borderRadius: '12px',\n        display: 'flex',\n        alignItems: 'center',\n        justifyContent: 'space-around',\n        marginBottom: '30px',\n        flexWrap: 'wrap'\n      }}>\n          <DsBoxShadowExampleItems />\n        </ul>\n      </article>\n    </section>\n    <DsShadowCardListItems />\n  </DocMain>",...null===(_Shadow_parameters1=Shadow.parameters)||void 0===_Shadow_parameters1||null===(_Shadow_parameters_docs=_Shadow_parameters1.docs)||void 0===_Shadow_parameters_docs?void 0:_Shadow_parameters_docs.source}}};const __namedExportsOrder=["Shadow"]}}]);