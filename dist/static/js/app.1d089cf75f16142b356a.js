webpackJsonp([1],{"+Gxq":function(t,e,n){"use strict";var o=n("fnDg").a,r=n("VU/8")(o,null,!1,function(t){n("4veK")},null,null);e.a=r.exports},"4veK":function(t,e){},"9M+g":function(t,e){},"HUt/":function(t,e,n){"use strict";var o=n("qRo1").a,r=n("VU/8")(o,null,!1,function(t){n("n9mN")},null,null);e.a=r.exports},JCpY:function(t,e,n){"use strict";var o=n("rKsW").a,r=n("VU/8")(o,null,!1,function(t){n("xBwK")},null,null);e.a=r.exports},JDVb:function(t,e,n){"use strict";var o=n("9NuQ").a,r=n("VU/8")(o,null,!1,function(t){n("Y9O/")},null,null);e.a=r.exports},Jmt5:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("7+uW"),r=n("mtWM"),s=n.n(r),a=n("M4fF"),i=n.n(a),c="https://gamechoice-api.herokuapp.com",l={name:"Game",props:["game","colors","categories"],data:function(){return{isUpdatingInventory:!1,isUpdateSuccessful:!0,inventory:{}}},computed:{selectedColorHex:function(){return this.inventory.color_id?i.a.find(this.colors,{id:this.inventory.color_id}).hex:"#111111"},status:function(){return this.isUpdatingInventory?{symbol:"&#9678;",color:"#f0ad4e"}:this.isUpdateSuccessful?{symbol:"&#9673;",color:"#5cb85c"}:{symcol:"&#10060;",color:"#d9534f"}}},created:function(){this.getInventory()},methods:{getInventory:function(){var t=this;s.a.get(c+"/inventory?gameId="+this.game.id).then(function(e){return t.inventory=e.data[0]})},updateInventory:function(){var t=this;this.isUpdatingInventory=!0,s.a.post(c+"/inventory?"+this.generateInventoryQuery()).then(function(e){t.isUpdatingInventory=!1,t.isUpdateSuccessful=200===e.status})},generateInventoryQuery:function(){return["inventoryId="+this.inventory.id,"gameId="+this.inventory.game_id,"location="+this.inventory.location,"colorId="+this.inventory.color_id,"categoryId="+this.inventory.category_id,"notes="+this.inventory.notes].join("&")}}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-row",{staticClass:"pt-4 pb-4 border border-bottom-0 border-left-0 border-right-0"},[n("b-col",{attrs:{"align-self":"center"}},[t._v("\n        "+t._s(t.game.name)+"\n      ")]),t._v(" "),n("b-col",{attrs:{"align-self":"center"}},[n("b-form-input",{style:{"text-transform":"uppercase"},attrs:{placeholder:"Location",size:"sm"},model:{value:t.inventory.location,callback:function(e){t.$set(t.inventory,"location",e)},expression:"inventory.location"}})],1),t._v(" "),n("b-col",{attrs:{"align-self":"center"}},[n("b-form-select",{style:{border:"1px solid "+t.selectedColorHex,color:t.selectedColorHex},attrs:{size:"sm"},model:{value:t.inventory.color_id,callback:function(e){t.$set(t.inventory,"color_id",e)},expression:"inventory.color_id"}},t._l(t.colors,function(e){return n("option",{style:{color:e.hex},domProps:{value:e.id}},[t._v(" "+t._s(e.name)+" ")])}))],1),t._v(" "),n("b-col",{attrs:{"align-self":"center"}},[n("b-form-select",{attrs:{size:"sm"},model:{value:t.inventory.category_id,callback:function(e){t.$set(t.inventory,"category_id",e)},expression:"inventory.category_id"}},t._l(t.categories,function(e){return n("option",{domProps:{value:e.id}},[t._v("\n            "+t._s(e.name)+"\n          ")])}))],1),t._v(" "),n("b-col",{attrs:{"align-self":"center"}},[n("b-form-textarea",{attrs:{placeholder:"Notes",rows:3,"max-rows":6},model:{value:t.inventory.notes,callback:function(e){t.$set(t.inventory,"notes",e)},expression:"inventory.notes"}})],1),t._v(" "),n("b-col",{attrs:{"align-self":"center"}},[n("b-button",{attrs:{type:"submit",variant:"secondary",size:"sm"},on:{click:t.updateInventory}},[t._v(" Save ")])],1),t._v(" "),n("b-col",{style:{color:t.status.color},attrs:{"align-self":"center"},domProps:{innerHTML:t._s(t.status.symbol)}})],1)],1)},staticRenderFns:[]},d={name:"wrapper",props:["games","colors","categories"],components:{Game:n("VU/8")(l,u,!1,function(t){n("xfI8")},"data-v-13918e79",null).exports}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"hello"}},[n("b-container",{attrs:{fluid:""}},t._l(t.games,function(e){return n("game",{key:e.id,attrs:{game:e,colors:t.colors,categories:t.categories}})}))],1)},staticRenderFns:[]},v=n("VU/8")(d,f,!1,function(t){n("hqLl")},"data-v-68451995",null).exports,p={name:"app",components:{Wrapper:v},data:function(){return{query:"",games:[],colors:[],categories:[]}},created:function(){this.getColors(),this.getCategories()},methods:{getGames:function(){var t=this;s.a.get(c+"/games?name="+this.query).then(function(e){console.log("result.data",e.data),t.games=e.data})},getColors:function(){var t=this;s.a.get(c+"/colors").then(function(e){return t.colors=e.data})},getCategories:function(){var t=this;s.a.get(c+"/categories").then(function(e){return t.categories=e.data})}},watch:{query:function(){this.getGames()}}},m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mx-5 px-5",attrs:{id:"app"}},[n("b-navbar",{staticClass:"py-5"},[n("b-nav-form",[n("b-form-input",{attrs:{placeholder:"Search",size:"sm"},on:{change:t.getGames},model:{value:t.query,callback:function(e){t.query=e},expression:"query"}}),t._v(" "),n("b-button",{staticClass:"ml-3",attrs:{type:"submit",variant:"secondary",size:"sm"}},[t._v("Submit")])],1)],1),t._v(" "),n("wrapper",{attrs:{games:t.games,colors:t.colors,categories:t.categories}})],1)},staticRenderFns:[]},g=n("VU/8")(p,m,!1,function(t){n("R3UW")},null,null).exports,y=n("/ocq"),h=n("e6fC");n("Jmt5"),n("9M+g");o.a.use(y.a),o.a.use(h.a);var b=new y.a({routes:[{path:"/",name:"Wrapper",component:v}]});o.a.config.productionTip=!1,new o.a({el:"#app",router:b,template:"<App/>",components:{App:g}})},R3UW:function(t,e){},"Y9O/":function(t,e){},dW2o:function(t,e){},hqLl:function(t,e){},n9mN:function(t,e){},r15W:function(t,e,n){"use strict";var o=n("E9Zr").a,r=n("VU/8")(o,null,!1,function(t){n("dW2o")},null,null);e.a=r.exports},xBwK:function(t,e){},xfI8:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.1d089cf75f16142b356a.js.map