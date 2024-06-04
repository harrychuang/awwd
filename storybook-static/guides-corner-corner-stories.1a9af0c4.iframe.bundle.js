"use strict";(self.webpackChunkawwd=self.webpackChunkawwd||[]).push([[60],{"./src/guides/corner/corner.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Corner:()=>Corner,__namedExportsOrder:()=>__namedExportsOrder,default:()=>corner_stories});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),material_icons_react=__webpack_require__("./node_modules/material-icons-react/index.js"),material_icons_react_default=__webpack_require__.n(material_icons_react),DocMain=__webpack_require__("./src/doc/DocMain.jsx"),ClipboardCopyContext=__webpack_require__("./src/doc/ClipboardCopyContext.jsx");const data_namespaceObject=JSON.parse('{"W":[{"Title":"Corner Small","helper":"var(--awwd-sys-size-corner-sm)","class":"awwd-size-corner--sm","style":"border-radius: 4px;"},{"Title":"Corner Regular","helper":"var(--awwd-sys-size-corner-rg)","class":"awwd-size-corner--rg","style":"border-radius: 8px;"},{"Title":"Corner Medium","helper":"var(--awwd-sys-size-corner-med)","class":"awwd-size-corner--med","style":"border-radius: 12px;"},{"Title":"Corner Large","helper":"var(--awwd-sys-size-corner-lg)","class":"awwd-size-corner--lg","style":"border-radius: 16px;"},{"Title":"Corner Full","helper":"var(--awwd-sys-size-corner-full)","class":"awwd-size-corner--full","style":"border-radius: 50%;"}]}');var _Corner_parameters,_Corner_parameters_docs,_Corner_parameters1;const corner_stories={title:"Guides/Corner",parameters:{docs:{page:null}}},DsSpacingCardListItems=()=>{const clipboardCopy1=(0,react.useContext)(ClipboardCopyContext.A);return data_namespaceObject.W.map(((cornerData,index)=>(0,jsx_runtime.jsxs)("div",{className:"card-list__item",children:[(0,jsx_runtime.jsx)("div",{className:"card-list__item__typo font-p",children:(0,jsx_runtime.jsx)("b",{className:"font-p-lg font-w--semibold",children:cornerData.Title})}),(0,jsx_runtime.jsxs)("div",{className:"card-list__item__info",children:[(0,jsx_runtime.jsxs)("span",{className:"info info--helper",children:[cornerData.helper,(0,jsx_runtime.jsx)("button",{type:"button",className:"copy",onClick:()=>clipboardCopy1("".concat(cornerData.helper)),children:(0,jsx_runtime.jsx)(material_icons_react_default(),{icon:"content_copy"})})]}),(0,jsx_runtime.jsxs)("span",{className:"info info--classname",children:[".",cornerData.class,(0,jsx_runtime.jsx)("button",{type:"button",className:"copy",onClick:()=>clipboardCopy1(cornerData.class),children:(0,jsx_runtime.jsx)(material_icons_react_default(),{icon:"content_copy"})})]}),(0,jsx_runtime.jsxs)("span",{className:"info info--style",children:[cornerData.style,(0,jsx_runtime.jsx)("button",{type:"button",className:"copy",onClick:()=>clipboardCopy1(cornerData.style),children:(0,jsx_runtime.jsx)(material_icons_react_default(),{icon:"content_copy"})})]})]})]},index.toString())))},boxStyle={display:"inline-block",minWidth:"120px",minHeight:"120px",textAlign:"center",margin:"20px",fontSize:"12px",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#8C89F6"},CornerExampleItems=()=>data_namespaceObject.W.map(((cornerData,index)=>(0,jsx_runtime.jsx)("li",{style:{color:"var(--storybook-doc-color-light-a100)",borderRadius:cornerData.helper,...boxStyle},className:"font-p",children:(0,jsx_runtime.jsx)("b",{children:cornerData.Title})},index.toString()))),Corner=(()=>(0,jsx_runtime.jsxs)(DocMain.O,{children:[(0,jsx_runtime.jsx)("h1",{className:"sbdocs-h1",children:"Corner"}),(0,jsx_runtime.jsx)("p",{children:"Apply rounded corners to an element with the border radius utility."}),(0,jsx_runtime.jsx)("h2",{className:"sbdocs-h2",children:"Usage"}),(0,jsx_runtime.jsx)("h6",{className:"sbdocs-h6",children:"* Corner mixin from 'styles/layout/settings.scss'"}),(0,jsx_runtime.jsx)("code",{children:".corner-sm{ border-radius: var(--awwd-sys-size-corner-sm); }"}),(0,jsx_runtime.jsx)("h6",{className:"sbdocs-h6",children:"* Corner css from 'styles/layout/common.scss'"}),(0,jsx_runtime.jsx)("code",{children:"<div class='awwd-size-corner--sm'></div>"}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)("section",{className:"simple-theme",children:(0,jsx_runtime.jsxs)("article",{children:[(0,jsx_runtime.jsx)("h3",{className:"sbdocs-h3",children:"Corner Demo"}),(0,jsx_runtime.jsx)("ul",{style:{padding:"30px 10px",backgroundColor:"var(--storybook-doc-color-example-list-box)",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"space-around",marginBottom:"30px",flexWrap:"wrap"},children:(0,jsx_runtime.jsx)(CornerExampleItems,{})})]})}),(0,jsx_runtime.jsx)(DsSpacingCardListItems,{})]})).bind({});Corner.parameters={...Corner.parameters,docs:{...null===(_Corner_parameters=Corner.parameters)||void 0===_Corner_parameters?void 0:_Corner_parameters.docs,source:{originalSource:"() => <DocMain>\n    <h1 className='sbdocs-h1'>Corner</h1>\n    <p>\n      Apply rounded corners to an element with the border radius utility.\n    </p>\n    <h2 className='sbdocs-h2'>Usage</h2>\n    <h6 className='sbdocs-h6'>* Corner mixin from &apos;styles/layout/settings.scss&apos;</h6>\n    <code>\n      {'.corner-sm{ border-radius: var(--awwd-sys-size-corner-sm); }'}\n    </code>\n    <h6 className='sbdocs-h6'>* Corner css from &apos;styles/layout/common.scss&apos;</h6>\n    <code>\n      {'<div class=\\'awwd-size-corner--sm\\'></div>'}\n    </code>\n    <br /><br />\n    <section className='simple-theme'>\n      <article>\n        <h3 className='sbdocs-h3'>Corner Demo</h3>\n        <ul style={{\n        padding: '30px 10px',\n        backgroundColor: 'var(--storybook-doc-color-example-list-box)',\n        borderRadius: '12px',\n        display: 'flex',\n        alignItems: 'center',\n        justifyContent: 'space-around',\n        marginBottom: '30px',\n        flexWrap: 'wrap'\n      }}>\n          <CornerExampleItems />\n        </ul>\n      </article>\n    </section>\n    <DsSpacingCardListItems />\n  </DocMain>",...null===(_Corner_parameters1=Corner.parameters)||void 0===_Corner_parameters1||null===(_Corner_parameters_docs=_Corner_parameters1.docs)||void 0===_Corner_parameters_docs?void 0:_Corner_parameters_docs.source}}};const __namedExportsOrder=["Corner"]}}]);