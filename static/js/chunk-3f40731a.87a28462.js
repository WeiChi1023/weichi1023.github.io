(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f40731a"],{4519:function(t,s,e){"use strict";e.r(s);var n,o=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"content"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row",attrs:{id:"sandbox"}},[e("div",{staticClass:"col-lg-6"},[e("el-card",{staticClass:"box-card-component"},[e("div",{staticClass:"card-body"},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:24}},[e("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"hostname or ip address"},model:{value:t.sbox.msngr_cfg.broker,callback:function(s){t.$set(t.sbox.msngr_cfg,"broker",s)},expression:"sbox.msngr_cfg.broker"}},[e("template",{slot:"prepend"},[t._v("broker")]),t._v(" "),e("template",{slot:"append"},[!1===t.sbox.connected?e("el-button",{on:{click:t.connect}},[t._v(t._s("Connect"))]):e("el-button",{on:{click:t.disconnect}},[t._v(t._s("Discnnect"))])],1)],2)],1)],1),t._v(" "),e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:24}},[e("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"topic"},model:{value:t.sbox.topic,callback:function(s){t.$set(t.sbox,"topic",s)},expression:"sbox.topic"}},[e("template",{slot:"prepend"},[t._v("topic")]),t._v(" "),e("template",{slot:"append"},[e("el-button",{on:{click:t.subscribe}},[t._v(t._s("subscribe"))])],1)],2)],1)],1),t._v(" "),e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:24}},[e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",staticStyle:{height:"200px",overflow:"auto"},attrs:{slot:"header"},slot:"header"},t._l(t.sbox.msgs,(function(s,n){return e("div",{key:n},[t._v("\n                        "+t._s(s)+"\n                      ")])})),0),t._v(" "),e("div",{staticClass:"text item"},[e("el-input",{staticStyle:{width:"100%"},attrs:{placeholder:"message"},model:{value:t.sbox.msg_send,callback:function(s){t.$set(t.sbox,"msg_send",s)},expression:"sbox.msg_send"}},[e("template",{slot:"append"},[e("el-button",{on:{click:t.publish}},[t._v(t._s("publish"))])],1)],2)],1)])],1)],1)],1)])],1)])])])])},c=[],i=(e("6b54"),e("db72")),a=e("2f62"),l=e("e7fc"),r={name:"MQTT",components:{},data:function(){return{sbox:{status:{conn:"",pub:"",sub:""},msngr_cfg:{broker:""},topic:"tk3c/playground",messenger:null,msgs:[],msg_send:"",connected:!1,options:{qos:2}}}},computed:Object(i["a"])({},Object(a["c"])({systemInfo:function(t){return t.systemInfo}})),created:function(){this.sbox.msngr_cfg.broker="".concat(this.systemInfo.api,":9443")},mounted:function(){},methods:{connect:function(t){var s=this;n=l.connect("wss://".concat(this.sbox.msngr_cfg.broker)),n.on("connect",(function(){s.sbox.connected=!0,s.subscribe(),s.sbox.msg_send="mpos:".concat(s.systemInfo.storeNo).concat(s.systemInfo.termNo," connected"),s.publish()})),this.message()},disconnect:function(){var t=this;n.end((function(){t.sbox.connected=!1}))},subscribe:function(){n.subscribe(this.sbox.topic,(function(t){t&&console.log(t)}))},publish:function(){n&&(n.publish(this.sbox.topic,this.sbox.msg_send),this.sbox.msg_send="")},message:function(){var t=this;n.on("message",(function(s,e){t.sbox.msgs.unshift(e.toString())}))}}},b=r,u=(e("f4bd"),e("2877")),d=Object(u["a"])(b,o,c,!1,null,"26ea76f8",null);s["default"]=d.exports},"48ba":function(t,s,e){},f4bd:function(t,s,e){"use strict";e("48ba")}}]);