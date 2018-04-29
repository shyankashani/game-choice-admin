webpackJsonp([1],{"+Gxq":function(e,t,n){"use strict";var o=n("fnDg").a,r=n("VU/8")(o,null,!1,function(e){n("4veK")},null,null);t.a=r.exports},"/LGn":function(e,t){},"4veK":function(e,t){},"9M+g":function(e,t){},"HUt/":function(e,t,n){"use strict";var o=n("qRo1").a,r=n("VU/8")(o,null,!1,function(e){n("n9mN")},null,null);t.a=r.exports},JCpY:function(e,t,n){"use strict";var o=n("rKsW").a,r=n("VU/8")(o,null,!1,function(e){n("xBwK")},null,null);t.a=r.exports},JDVb:function(e,t,n){"use strict";var o=n("9NuQ").a,r=n("VU/8")(o,null,!1,function(e){n("Y9O/")},null,null);t.a=r.exports},Jmt5:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("7+uW"),r=n("mtWM"),s=n.n(r),a=n("M4fF"),c=n.n(a),l={name:"Game",props:["game","colors","categories"],data:function(){return{gameId:null,inventoryId:null,selectedLocation:null,selectedColorId:null,selectedCategoryId:null,isUpdatingInventory:!1,isUpdateSuccessful:!0}},computed:{selectedColorHex:function(){return this.selectedColorId?c.a.find(this.colors,{colorId:this.selectedColorId}).hex:"#111111"},status:function(){return this.isUpdatingInventory?{symbol:"&#9678;",color:"#f0ad4e"}:this.isUpdateSuccessful?{symbol:"&#9673;",color:"#5cb85c"}:{symcol:"&#10060;",color:"#d9534f"}}},created:function(){this.getInventory()},methods:{getInventory:function(){var e=this;s.a.get((Object({NODE_ENV:"production"}).API_URL||"http://localhost:3000")+"/inventory?gameId="+this.game.gameId).then(function(t){e.gameId=t.data.gameId,e.inventoryId=t.data.inventoryId,e.selectedLocation=t.data.location,e.selectedColorId=t.data.colorId,e.selectedCategoryId=t.data.categoryId})},updateInventory:function(){var e=this;this.isUpdatingInventory=!0,s.a.post((Object({NODE_ENV:"production"}).API_URL||"http://localhost:3000")+"/inventory?"+this.generateInventoryQuery()).then(function(t){e.isUpdatingInventory=!1,e.isUpdateSuccessful=200===t.status})},generateInventoryQuery:function(){return["inventoryId="+this.inventoryId,"gameId="+this.gameId,"location="+this.selectedLocation,"colorId="+this.selectedColorId,"categoryId="+this.selectedCategoryId].join("&")}}},i={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-row",{staticClass:"pt-4 pb-4 border border-bottom-0 border-left-0 border-right-0"},[n("b-col",{attrs:{"align-self":"center"}},[e._v("\n        "+e._s(e.game.name)+"\n      ")]),e._v(" "),n("b-col",{attrs:{"align-self":"center"}},[n("b-form-input",{style:{"text-transform":"uppercase"},attrs:{placeholder:"Location",size:"sm"},model:{value:e.selectedLocation,callback:function(t){e.selectedLocation=t},expression:"selectedLocation"}})],1),e._v(" "),n("b-col",{attrs:{"align-self":"center"}},[n("b-form-select",{style:{border:"1px solid "+e.selectedColorHex,color:e.selectedColorHex},attrs:{size:"sm"},model:{value:e.selectedColorId,callback:function(t){e.selectedColorId=t},expression:"selectedColorId"}},e._l(e.colors,function(t){return n("option",{style:{color:t.hex},domProps:{value:t.colorId}},[e._v(" "+e._s(t.name)+" ")])}))],1),e._v(" "),n("b-col",{attrs:{"align-self":"center"}},[n("b-form-select",{attrs:{size:"sm"},model:{value:e.selectedCategoryId,callback:function(t){e.selectedCategoryId=t},expression:"selectedCategoryId"}},e._l(e.categories,function(t){return n("option",{domProps:{value:t.categoryId}},[e._v("\n            "+e._s(t.name)+"\n          ")])}))],1),e._v(" "),n("b-col",{attrs:{"align-self":"center"}},[n("b-button",{attrs:{type:"submit",variant:"secondary",size:"sm"},on:{click:e.updateInventory}},[e._v(" Save ")])],1),e._v(" "),n("b-col",{style:{color:e.status.color},attrs:{"align-self":"center"},domProps:{innerHTML:e._s(e.status.symbol)}})],1)],1)},staticRenderFns:[]},u={name:"wrapper",props:["searchResults","colors","categories"],computed:{games:function(){return this.searchResults}},components:{Game:n("VU/8")(l,i,!1,function(e){n("kQ6v")},"data-v-6e3e94fc",null).exports}},d={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"hello"}},[n("b-container",{attrs:{fluid:""}},e._l(e.games,function(t){return n("game",{key:t.id,attrs:{game:t,colors:e.colors,categories:e.categories}})}))],1)},staticRenderFns:[]},p=n("VU/8")(u,d,!1,function(e){n("/LGn")},"data-v-fde041b8",null).exports,f={name:"app",components:{Wrapper:p},data:function(){return{searchQuery:"",searchResults:[],colors:[],categories:[]}},created:function(){this.getColors(),this.getCategories()},methods:{getGames:function(){var e=this;s.a.get((Object({NODE_ENV:"production"}).API_URL||"http://localhost:3000")+"/games?name="+this.searchQuery).then(function(t){return e.searchResults=t.data})},getColors:function(){var e=this;s.a.get((Object({NODE_ENV:"production"}).API_URL||"http://localhost:3000")+"/colors").then(function(t){return e.colors=t.data})},getCategories:function(){var e=this;s.a.get((Object({NODE_ENV:"production"}).API_URL||"http://localhost:3000")+"/categories").then(function(t){return e.categories=t.data})}},watch:{searchQuery:function(){this.getGames()}}},m={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mx-5 px-5",attrs:{id:"app"}},[n("b-navbar",{staticClass:"py-5"},[n("b-nav-form",[n("b-form-input",{attrs:{placeholder:"Search",size:"sm"},on:{change:e.getGames},model:{value:e.searchQuery,callback:function(t){e.searchQuery=t},expression:"searchQuery"}}),e._v(" "),n("b-button",{staticClass:"ml-3",attrs:{type:"submit",variant:"secondary",size:"sm"}},[e._v("Submit")])],1)],1),e._v(" "),n("wrapper",{attrs:{searchResults:e.searchResults,colors:e.colors,categories:e.categories}})],1)},staticRenderFns:[]},g=n("VU/8")(f,m,!1,function(e){n("SpKX")},null,null).exports,h=n("/ocq"),v=n("e6fC");n("Jmt5"),n("9M+g");o.a.use(h.a),o.a.use(v.a);var y=new h.a({routes:[{path:"/",name:"Wrapper",component:p}]});o.a.config.productionTip=!1,new o.a({el:"#app",router:y,template:"<App/>",components:{App:g}})},SpKX:function(e,t){},"Y9O/":function(e,t){},dW2o:function(e,t){},kQ6v:function(e,t){},n9mN:function(e,t){},r15W:function(e,t,n){"use strict";var o=n("E9Zr").a,r=n("VU/8")(o,null,!1,function(e){n("dW2o")},null,null);t.a=r.exports},xBwK:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.cae933355d342bf9a06c.js.map