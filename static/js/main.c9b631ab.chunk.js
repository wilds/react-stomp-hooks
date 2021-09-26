(this["webpackJsonpreact-stomp-hooks-example"]=this["webpackJsonpreact-stomp-hooks-example"]||[]).push([[0],{106:function(e,t,n){},151:function(e,t,n){"use strict";n.r(t);n(106);var r=n(0),c=n.n(r),s=n(11),a=n.n(s),o=n(18),i=n(19),u=n(42),l=n(98),d=n(97),b=n(45),j=n(182),h=n(94),O=n.n(h),p=n(195);var v=Object(r.createContext)(void 0),f=["url","children","stompClientOptions"];function g(e){var t=e.url,n=e.children,s=e.stompClientOptions,a=function(e,t){if(null==e)return{};var n,r,c={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,f);s&&(a=s);var o=Object(r.useState)(void 0),i=o[0],u=o[1],l=Object(r.useRef)(new Map);Object(r.useEffect)((function(){var e=new p.a(a);return a.brokerURL||a.webSocketFactory||(e.webSocketFactory=function(){var e,n,r=new URL(t,null===(e=window)||void 0===e||null===(n=e.location)||void 0===n?void 0:n.href);if("http:"===r.protocol||"https:"===r.protocol)return new O.a(t);if("ws:"===r.protocol||"wss:"===r.protocol)return new WebSocket(t);throw new Error("Protocol not supported")}),e.onConnect=function(t){a.onConnect&&a.onConnect(t),l.current.forEach((function(t){t.subscription=e.subscribe(t.destination,t.callback,t.headers)}))},a.onStompError||(e.onStompError=function(e){throw e}),e.activate(),u(e),function(){e.deactivate()}}),[t].concat(Object.values(a)));return c.a.createElement(v.Provider,{value:{client:i,subscribe:function(e,t,n){void 0===n&&(n={});var r=Math.random().toString(36).substr(2,9),c={destination:e,callback:t,headers:n};return l.current.set(r,c),i&&i.connected&&(c.subscription=i.subscribe(e,t,n)),function(){var e=l.current.get(r);e.subscription&&e.subscription.unsubscribe(),l.current.delete(r)}}}},n)}function m(e,t,n){void 0===n&&(n={});var c=Object(r.useContext)(v);if(void 0===c)throw new Error("There must be a StompSessionProver as Ancestor of all Stomp Hooks and HOCs");var s=Object(r.useRef)(t),a=Array.isArray(e)?e:[e];s.current=t,Object(r.useEffect)((function(){var e=[];return a.forEach((function(t){return e.push(c.subscribe(t,(function(e){s.current(e)}),n))})),function(){e.forEach((function(e){e()}))}}),[].concat(Object.values(a),Object.values(n)))}function x(){var e=Object(r.useContext)(v);if(void 0===e)throw new Error("There must be a StompSessionProver as Ancestor of all Stomp Hooks and HOCs");return e.client}var w=n(185),y=n(186),C=n(187),S=n(188),M=n(194),k=n(189),E=n(190),P=n(192),H=n(196),L=n(197),R=n(191),A=n(96),N=n.n(A),T=n(6);function q(){var e=Object(r.useState)("No message received yet"),t=Object(b.a)(e,2),n=t[0],c=t[1];return m("/topic/test",(function(e){return c(e.body)})),Object(T.jsxs)(M.a,{children:["Last Message: ",n]})}function F(){var e=Object(r.useState)(""),t=Object(b.a)(e,2),n=t[0],c=t[1],s=Object(r.useState)("No message received yet"),a=Object(b.a)(s,2),o=a[0],i=a[1],u=x();m("/user/queue/echoreply",(function(e){return i(e.body)}));return Object(T.jsxs)(k.a,{container:!0,direction:"row",spacing:3,children:[Object(T.jsx)(k.a,{item:!0,children:Object(T.jsx)(E.a,{variant:"contained",onClick:function(){u.publish({destination:"/app/echo",body:"Echo "+n})},children:"Send Message"})}),Object(T.jsx)(k.a,{item:!0,children:Object(T.jsx)(P.a,{variant:"standard",value:n,onChange:function(e){return c(e.target.value)}})}),Object(T.jsx)(k.a,{item:!0,children:Object(T.jsxs)(S.a,{variant:"body1",children:["Last Message received: ",o]})})]})}var I,J,U,B=function(e){return function(t){var n=x();return c.a.createElement(e,Object.assign({stompClient:n},t))}}((I=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var r;return Object(o.a)(this,n),(r=t.call(this,e)).stompClient=e.stompClient,r.state={input:"",lastMessage:"No message received yet"},r.handleChange=r.handleChange.bind(Object(u.a)(r)),r.sendMessage=r.sendMessage.bind(Object(u.a)(r)),r.onMessage=r.onMessage.bind(Object(u.a)(r)),r}return Object(i.a)(n,[{key:"onMessage",value:function(e){this.setState({lastMessage:e.body})}},{key:"sendMessage",value:function(){this.stompClient.publish({destination:"/app/echo",body:"Echo "+this.state.input})}},{key:"handleChange",value:function(e){this.setState({input:e.target.value})}},{key:"render",value:function(){return Object(T.jsxs)(k.a,{container:!0,direction:"row",spacing:3,children:[Object(T.jsx)(k.a,{item:!0,children:Object(T.jsx)(E.a,{variant:"contained",onClick:this.sendMessage,children:"Send Message"})}),Object(T.jsx)(k.a,{item:!0,children:Object(T.jsx)(P.a,{variant:"standard",value:this.state.input,onChange:this.handleChange})}),Object(T.jsx)(k.a,{item:!0,children:Object(T.jsxs)(S.a,{variant:"body1",children:["Last Message received: ",this.state.lastMessage]})})]})}}]),n}(c.a.Component),J="/user/queue/echoreply",void 0===U&&(U={}),function(e){var t=Object(r.useRef)();return m(J,(function(e){t.current&&t.current.onMessage(e)}),U),c.a.createElement(I,Object.assign({ref:t},e))}));function W(e){return Object(T.jsxs)(H.a,{style:{margin:"3em"},TransitionProps:{unmountOnExit:!0},children:[Object(T.jsx)(L.a,{expandIcon:Object(T.jsx)(N.a,{}),"aria-controls":"panel1a-content",id:"panel1a-header",children:Object(T.jsx)(S.a,{children:e.title})}),Object(T.jsx)(R.a,{children:e.children})]})}var Y=function(){return Object(T.jsxs)(g,{url:"https://stream.elite12.de/api/sock",debug:function(e){console.log(e)},children:[Object(T.jsx)(j.a,{}),Object(T.jsxs)(w.a,{children:[Object(T.jsx)(y.a,{style:{margin:"3em"},variant:"outlined",children:Object(T.jsxs)(C.a,{children:[Object(T.jsx)(S.a,{children:"You can see the STOMP Messages send and received in the browser console"}),Object(T.jsx)(S.a,{children:"Note that, because the components are unmounted when the accordion is unexpanded, all subscriptions are removed when you close the accordion."})]})}),Object(T.jsx)(W,{title:"Subscribing",children:Object(T.jsx)(q,{})}),Object(T.jsx)(W,{title:"Sending Messages",children:Object(T.jsx)(F,{})}),Object(T.jsx)(W,{title:"Higher Order Components",children:Object(T.jsx)(B,{})})]})]})};a.a.render(Object(T.jsx)(Y,{}),document.getElementById("root"))}},[[151,1,2]]]);
//# sourceMappingURL=main.c9b631ab.chunk.js.map