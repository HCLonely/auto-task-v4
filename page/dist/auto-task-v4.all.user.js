// ==UserScript==
// @name               auto-task-v4
// @namespace          auto-task-v4
// @version            4.4.6
// @description        自动完成 Freeanywhere，Giveawaysu，GiveeClub，Givekey，Gleam，Indiedb，keyhub，OpiumPulses，Opquests，SweepWidget 等网站的任务。
// @description:en     Automatically complete the tasks of FreeAnyWhere, GiveawaySu, GiveeClub, Givekey, Gleam, Indiedb, keyhub, OpiumPulses, Opquests, SweepWidget websites.
// @author             HCLonely
// @license            MIT
// @run-at             document-start
// @homepage           https://auto-task-doc.js.org/
// @supportURL         https://github.com/HCLonely/auto-task-v4/issues
// @updateURL          https://github.com/HCLonely/auto-task-new/raw/main/dist/auto-task-v4.user.js
// @installURL         https://github.com/HCLonely/auto-task-new/raw/main/dist/auto-task-v4.user.js
// @downloadURL        https://github.com/HCLonely/auto-task-new/raw/main/dist/auto-task-v4.user.js
// @icon               https://auto-task-v4.hclonely.com/favicon.ico

// @include            *://freeanywhere.net/*
// @include            *://giveaway.su/giveaway/view/*
// @include            *://givee.club/*/event/*
// @include            *://givekey.ru/giveaway/*
// @include            *://www.indiedb.com/giveaways*
// @include            *://key-hub.eu/giveaway/*
// @include            *://keylol.com/*
// @include            *://www.opiumpulses.com/giveaways
// @include            *://prys.revadike.com/giveaway/?id=*
// @include            *://opquests.com/quests/*
// @include            *://gleam.io/*
// @include            *://sweepwidget.com/view/*
// @include            *://discord.com/*
// @include            *://www.twitch.tv/*
// @include            *://www.youtube.com/*
// @include            *://*.reddit.com/*
// @include            *://twitter.com/settings/account?k*
// @include            *://x.com/settings/account*
// @include            https://auto-task-v4.hclonely.com/setting.html
// @include            https://auto-task-v4.hclonely.com/history.html

// @grant              GM_setValue
// @grant              GM_getValue
// @grant              GM_listValues
// @grant              GM_deleteValue
// @grant              GM_addStyle
// @grant              GM_xmlhttpRequest
// @grant              GM_registerMenuCommand
// @grant              GM_info
// @grant              GM_openInTab
// @grant              GM_setClipboard
// @grant              GM_getResourceText
// @grant              GM_cookie
// @grant              GM_addValueChangeListener
// @grant              GM_removeValueChangeListener
// @grant              unsafeWindow
// @grant              window.close
// @grant              window.localStorage

// @connect            cdn.jsdelivr.net
// @connect            store.steampowered.com
// @connect            steamcommunity.com
// @connect            login.steampowered.com
// @connect            twitter.com
// @connect            x.com
// @connect            api.twitter.com
// @connect            youtube.com
// @connect            www.youtube.com
// @connect            facebook.com
// @connect            instagram.com
// @connect            vk.com
// @connect            twitch.tv
// @connect            www.twitch.tv
// @connect            gql.twitch.tv
// @connect            github.com
// @connect            discordapp.com
// @connect            discord.gg
// @connect            discord.com
// @connect            www.reddit.com
// @connect            oauth.reddit.com
// @connect            raw.githubusercontent.com
// @connect            t.me
// @connect            bit.ly
// @connect            giveaway.su
// @connect            google.com
// @connect            www.vloot.io
// @connect            givee.club
// @connect            gleam.io
// @connect            www.indiedb.com
// @connect            key-hub.eu
// @connect            opquests.com
// @connect            itch.io
// @connect            auto-task-v4.hclonely.com
// @connect            *

// @noframes
// ==/UserScript==

/*! jQuery v3.6.0 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],r=Object.getPrototypeOf,s=t.slice,g=t.flat?function(e){return t.flat.call(e)}:function(e){return t.concat.apply([],e)},u=t.push,i=t.indexOf,n={},o=n.toString,v=n.hasOwnProperty,a=v.toString,l=a.call(Object),y={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType&&"function"!=typeof e.item},x=function(e){return null!=e&&e===e.window},E=C.document,c={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||E).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function w(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.6.0",S=function(e,t){return new S.fn.init(e,t)};function p(e){var t=!!e&&"length"in e&&e.length,n=w(e);return!m(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}S.fn=S.prototype={jquery:f,constructor:S,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=S.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return S.each(this,e)},map:function(n){return this.pushStack(S.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(S.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(S.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},S.extend=S.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(S.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||S.isPlainObject(n)?n:{},i=!1,a[t]=S.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},S.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=v.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){b(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(p(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},makeArray:function(e,t){var n=t||[];return null!=e&&(p(Object(e))?S.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(p(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g(a)},guid:1,support:y}),"function"==typeof Symbol&&(S.fn[Symbol.iterator]=t[Symbol.iterator]),S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var d=function(n){var e,d,b,o,i,h,f,g,w,u,l,T,C,a,E,v,s,c,y,S="sizzle"+1*new Date,p=n.document,k=0,r=0,m=ue(),x=ue(),A=ue(),N=ue(),j=function(e,t){return e===t&&(l=!0),0},D={}.hasOwnProperty,t=[],q=t.pop,L=t.push,H=t.push,O=t.slice,P=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",I="(?:\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",W="\\["+M+"*("+I+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+M+"*\\]",F=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",B=new RegExp(M+"+","g"),$=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),X=new RegExp(F),V=new RegExp("^"+I+"$"),G={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+F),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\([^\\r\\n\\f])","g"),ne=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){T()},ae=be(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=O.call(p.childNodes),p.childNodes),t[p.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&(T(e),e=e||C,E)){if(11!==p&&(u=Z.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&y(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return H.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(i)),n}if(d.qsa&&!N[t+" "]&&(!v||!v.test(t))&&(1!==p||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===p&&(U.test(t)||z.test(t))){(f=ee.test(t)&&ye(e.parentNode)||e)===e&&d.scope||((s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=S)),o=(l=h(t)).length;while(o--)l[o]=(s?"#"+s:":scope")+" "+xe(l[o]);c=l.join(",")}try{return H.apply(n,f.querySelectorAll(c)),n}catch(e){N(t,!0)}finally{s===S&&e.removeAttribute("id")}}}return g(t.replace($,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[S]=!0,e}function ce(e){var t=C.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)b.attrHandle[n[r]]=t}function pe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ve(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ye(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in d=se.support={},i=se.isXML=function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},T=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:p;return r!=C&&9===r.nodeType&&r.documentElement&&(a=(C=r).documentElement,E=!i(C),p!=C&&(n=C.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),d.scope=ce(function(e){return a.appendChild(e).appendChild(C.createElement("div")),"undefined"!=typeof e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length}),d.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ce(function(e){return e.appendChild(C.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=K.test(C.getElementsByClassName),d.getById=ce(function(e){return a.appendChild(e).id=S,!C.getElementsByName||!C.getElementsByName(S).length}),d.getById?(b.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=d.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},b.find.CLASS=d.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],v=[],(d.qsa=K.test(C.querySelectorAll))&&(ce(function(e){var t;a.appendChild(e).innerHTML="<a id='"+S+"'></a><select id='"+S+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+S+"-]").length||v.push("~="),(t=C.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||v.push("\\["+M+"*name"+M+"*="+M+"*(?:''|\"\")"),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+S+"+*").length||v.push(".#.+[+~]"),e.querySelectorAll("\\\f"),v.push("[\\r\\n\\f]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=C.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(d.matchesSelector=K.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){d.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",F)}),v=v.length&&new RegExp(v.join("|")),s=s.length&&new RegExp(s.join("|")),t=K.test(a.compareDocumentPosition),y=t||K.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},j=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e==C||e.ownerDocument==p&&y(p,e)?-1:t==C||t.ownerDocument==p&&y(p,t)?1:u?P(u,e)-P(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e==C?-1:t==C?1:i?-1:o?1:u?P(u,e)-P(u,t):0;if(i===o)return pe(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?pe(a[r],s[r]):a[r]==p?-1:s[r]==p?1:0}),C},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if(T(e),d.matchesSelector&&E&&!N[t+" "]&&(!s||!s.test(t))&&(!v||!v.test(t)))try{var n=c.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){N(t,!0)}return 0<se(t,C,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!=C&&T(e),y(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!=C&&T(e);var n=b.attrHandle[t.toLowerCase()],r=n&&D.call(b.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:d.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!d.detectDuplicates,u=!d.sortStable&&e.slice(0),e.sort(j),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(b=se.selectors={cacheLength:50,createPseudo:le,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=m[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&m(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(B," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,v){var y="nth"!==h.slice(0,3),m="last"!==h.slice(-4),x="of-type"===e;return 1===g&&0===v?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=y!==m?"nextSibling":"previousSibling",c=e.parentNode,f=x&&e.nodeName.toLowerCase(),p=!n&&!x,d=!1;if(c){if(y){while(l){a=e;while(a=a[l])if(x?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&p){d=(s=(r=(i=(o=(a=c)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if(1===a.nodeType&&++d&&a===e){i[h]=[k,s,d];break}}else if(p&&(d=s=(r=(i=(o=(a=e)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1]),!1===d)while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if((x?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++d&&(p&&((i=(o=a[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[k,d]),a===e))break;return(d-=v)===g||d%g==0&&0<=d/g}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[S]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=P(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace($,"$1"));return s[S]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return V.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===C.activeElement&&(!C.hasFocus||C.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=de(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=he(e);function me(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,p=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[k,p];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[S]||(e[S]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===k&&r[1]===p)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Te(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Ce(d,h,g,v,y,e){return v&&!v[S]&&(v=Ce(v)),y&&!y[S]&&(y=Ce(y,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!d||!e&&h?c:Te(c,s,d,n,r),p=g?y||(e?d:l||v)?[]:t:f;if(g&&g(f,p,n,r),v){i=Te(p,u),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(p[u[o]]=!(f[u[o]]=a))}if(e){if(y||d){if(y){i=[],o=p.length;while(o--)(a=p[o])&&i.push(f[o]=a);y(null,p=[],i,r)}o=p.length;while(o--)(a=p[o])&&-1<(i=y?P(e,a):s[o])&&(e[i]=!(t[i]=a))}}else p=Te(p===t?p.splice(l,p.length):p),y?y(null,t,p,r):H.apply(t,p)})}function Ee(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=be(function(e){return e===i},a,!0),l=be(function(e){return-1<P(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[be(we(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[S]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return Ce(1<s&&we(c),1<s&&xe(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace($,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&xe(e))}c.push(t)}return we(c)}return me.prototype=b.filters=b.pseudos,b.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=x[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=_.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=z.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace($," ")}),a=a.slice(n.length)),b.filter)!(r=G[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):x(e,s).slice(0)},f=se.compile=function(e,t){var n,v,y,m,x,r,i=[],o=[],a=A[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[S]?i.push(a):o.push(a);(a=A(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=k+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t==C||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument==C||(T(o),n=!E);while(s=v[a++])if(s(o,t||C,n)){r.push(o);break}i&&(k=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=q.call(r));f=Te(f)}H.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&se.uniqueSort(r)}return i&&(k=h,w=p),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=G.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ye(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&xe(o)))return H.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},d.sortStable=S.split("").sort(j).join("")===S,d.detectDuplicates=!!l,T(),d.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(C.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(C);S.find=d,S.expr=d.selectors,S.expr[":"]=S.expr.pseudos,S.uniqueSort=S.unique=d.uniqueSort,S.text=d.getText,S.isXMLDoc=d.isXML,S.contains=d.contains,S.escapeSelector=d.escape;var h=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&S(e).is(n))break;r.push(e)}return r},T=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},k=S.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var N=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,n,r){return m(n)?S.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?S.grep(e,function(e){return e===n!==r}):"string"!=typeof n?S.grep(e,function(e){return-1<i.call(n,e)!==r}):S.filter(n,e,r)}S.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?S.find.matchesSelector(r,e)?[r]:[]:S.find.matches(e,S.grep(t,function(e){return 1===e.nodeType}))},S.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(S(e).filter(function(){for(t=0;t<r;t++)if(S.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)S.find(e,i[t],n);return 1<r?S.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&k.test(e)?S(e):e||[],!1).length}});var D,q=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(S.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||D,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:q.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof S?t[0]:t,S.merge(this,S.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),N.test(r[1])&&S.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=E.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(S):S.makeArray(e,this)}).prototype=S.fn,D=S(E);var L=/^(?:parents|prev(?:Until|All))/,H={children:!0,contents:!0,next:!0,prev:!0};function O(e,t){while((e=e[t])&&1!==e.nodeType);return e}S.fn.extend({has:function(e){var t=S(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(S.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&S(e);if(!k.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&S.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?S.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(S(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(S.uniqueSort(S.merge(this.get(),S(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),S.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return h(e,"parentNode")},parentsUntil:function(e,t,n){return h(e,"parentNode",n)},next:function(e){return O(e,"nextSibling")},prev:function(e){return O(e,"previousSibling")},nextAll:function(e){return h(e,"nextSibling")},prevAll:function(e){return h(e,"previousSibling")},nextUntil:function(e,t,n){return h(e,"nextSibling",n)},prevUntil:function(e,t,n){return h(e,"previousSibling",n)},siblings:function(e){return T((e.parentNode||{}).firstChild,e)},children:function(e){return T(e.firstChild)},contents:function(e){return null!=e.contentDocument&&r(e.contentDocument)?e.contentDocument:(A(e,"template")&&(e=e.content||e),S.merge([],e.childNodes))}},function(r,i){S.fn[r]=function(e,t){var n=S.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=S.filter(t,n)),1<this.length&&(H[r]||S.uniqueSort(n),L.test(r)&&n.reverse()),this.pushStack(n)}});var P=/[^\x20\t\r\n\f]+/g;function R(e){return e}function M(e){throw e}function I(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}S.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},S.each(e.match(P)||[],function(e,t){n[t]=!0}),n):S.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){S.each(e,function(e,t){m(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==w(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return S.each(arguments,function(e,t){var n;while(-1<(n=S.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<S.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},S.extend({Deferred:function(e){var o=[["notify","progress",S.Callbacks("memory"),S.Callbacks("memory"),2],["resolve","done",S.Callbacks("once memory"),S.Callbacks("once memory"),0,"resolved"],["reject","fail",S.Callbacks("once memory"),S.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return S.Deferred(function(r){S.each(o,function(e,t){var n=m(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&m(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,m(t)?s?t.call(e,l(u,o,R,s),l(u,o,M,s)):(u++,t.call(e,l(u,o,R,s),l(u,o,M,s),l(u,o,R,o.notifyWith))):(a!==R&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){S.Deferred.exceptionHook&&S.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==M&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(S.Deferred.getStackHook&&(t.stackTrace=S.Deferred.getStackHook()),C.setTimeout(t))}}return S.Deferred(function(e){o[0][3].add(l(0,e,m(r)?r:R,e.notifyWith)),o[1][3].add(l(0,e,m(t)?t:R)),o[2][3].add(l(0,e,m(n)?n:M))}).promise()},promise:function(e){return null!=e?S.extend(e,a):a}},s={};return S.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=S.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(I(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||m(i[t]&&i[t].then)))return o.then();while(t--)I(i[t],a(t),o.reject);return o.promise()}});var W=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;S.Deferred.exceptionHook=function(e,t){C.console&&C.console.warn&&e&&W.test(e.name)&&C.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},S.readyException=function(e){C.setTimeout(function(){throw e})};var F=S.Deferred();function B(){E.removeEventListener("DOMContentLoaded",B),C.removeEventListener("load",B),S.ready()}S.fn.ready=function(e){return F.then(e)["catch"](function(e){S.readyException(e)}),this},S.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--S.readyWait:S.isReady)||(S.isReady=!0)!==e&&0<--S.readyWait||F.resolveWith(E,[S])}}),S.ready.then=F.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?C.setTimeout(S.ready):(E.addEventListener("DOMContentLoaded",B),C.addEventListener("load",B));var $=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===w(n))for(s in i=!0,n)$(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(S(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},_=/^-ms-/,z=/-([a-z])/g;function U(e,t){return t.toUpperCase()}function X(e){return e.replace(_,"ms-").replace(z,U)}var V=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function G(){this.expando=S.expando+G.uid++}G.uid=1,G.prototype={cache:function(e){var t=e[this.expando];return t||(t={},V(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[X(t)]=n;else for(r in t)i[X(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][X(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(X):(t=X(t))in r?[t]:t.match(P)||[]).length;while(n--)delete r[t[n]]}(void 0===t||S.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!S.isEmptyObject(t)}};var Y=new G,Q=new G,J=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,K=/[A-Z]/g;function Z(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(K,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:J.test(i)?JSON.parse(i):i)}catch(e){}Q.set(e,t,n)}else n=void 0;return n}S.extend({hasData:function(e){return Q.hasData(e)||Y.hasData(e)},data:function(e,t,n){return Q.access(e,t,n)},removeData:function(e,t){Q.remove(e,t)},_data:function(e,t,n){return Y.access(e,t,n)},_removeData:function(e,t){Y.remove(e,t)}}),S.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=Q.get(o),1===o.nodeType&&!Y.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=X(r.slice(5)),Z(o,r,i[r]));Y.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){Q.set(this,n)}):$(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=Q.get(o,n))?t:void 0!==(t=Z(o,n))?t:void 0;this.each(function(){Q.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){Q.remove(this,e)})}}),S.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Y.get(e,t),n&&(!r||Array.isArray(n)?r=Y.access(e,t,S.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=S.queue(e,t),r=n.length,i=n.shift(),o=S._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){S.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Y.get(e,n)||Y.access(e,n,{empty:S.Callbacks("once memory").add(function(){Y.remove(e,[t+"queue",n])})})}}),S.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?S.queue(this[0],t):void 0===n?this:this.each(function(){var e=S.queue(this,t,n);S._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&S.dequeue(this,t)})},dequeue:function(e){return this.each(function(){S.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=S.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Y.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var ee=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,te=new RegExp("^(?:([+-])=|)("+ee+")([a-z%]*)$","i"),ne=["Top","Right","Bottom","Left"],re=E.documentElement,ie=function(e){return S.contains(e.ownerDocument,e)},oe={composed:!0};re.getRootNode&&(ie=function(e){return S.contains(e.ownerDocument,e)||e.getRootNode(oe)===e.ownerDocument});var ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&ie(e)&&"none"===S.css(e,"display")};function se(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return S.css(e,t,"")},u=s(),l=n&&n[3]||(S.cssNumber[t]?"":"px"),c=e.nodeType&&(S.cssNumber[t]||"px"!==l&&+u)&&te.exec(S.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)S.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,S.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ue={};function le(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Y.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&ae(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ue[s])||(o=a.body.appendChild(a.createElement(s)),u=S.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ue[s]=u)))):"none"!==n&&(l[c]="none",Y.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}S.fn.extend({show:function(){return le(this,!0)},hide:function(){return le(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?S(this).show():S(this).hide()})}});var ce,fe,pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,he=/^$|^module$|\/(?:java|ecma)script/i;ce=E.createDocumentFragment().appendChild(E.createElement("div")),(fe=E.createElement("input")).setAttribute("type","radio"),fe.setAttribute("checked","checked"),fe.setAttribute("name","t"),ce.appendChild(fe),y.checkClone=ce.cloneNode(!0).cloneNode(!0).lastChild.checked,ce.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!ce.cloneNode(!0).lastChild.defaultValue,ce.innerHTML="<option></option>",y.option=!!ce.lastChild;var ge={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ve(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?S.merge([e],n):n}function ye(e,t){for(var n=0,r=e.length;n<r;n++)Y.set(e[n],"globalEval",!t||Y.get(t[n],"globalEval"))}ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td,y.option||(ge.optgroup=ge.option=[1,"<select multiple='multiple'>","</select>"]);var me=/<|&#?\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===w(o))S.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+S.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;S.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<S.inArray(o,r))i&&i.push(o);else if(l=ie(o),a=ve(f.appendChild(o),"script"),l&&ye(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}var be=/^([^.]*)(?:\.(.+)|)/;function we(){return!0}function Te(){return!1}function Ce(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function Ee(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Ee(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Te;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return S().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=S.guid++)),e.each(function(){S.event.add(this,t,i,r,n)})}function Se(e,i,o){o?(Y.set(e,i,!1),S.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Y.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(S.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Y.set(this,i,r),t=o(this,i),this[i](),r!==(n=Y.get(this,i))||t?Y.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n&&n.value}else r.length&&(Y.set(this,i,{value:S.event.trigger(S.extend(r[0],S.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Y.get(e,i)&&S.event.add(e,i,we)}S.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Y.get(t);if(V(t)){n.handler&&(n=(o=n).handler,i=o.selector),i&&S.find.matchesSelector(re,i),n.guid||(n.guid=S.guid++),(u=v.events)||(u=v.events=Object.create(null)),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof S&&S.event.triggered!==e.type?S.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(P)||[""]).length;while(l--)d=g=(s=be.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=S.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=S.event.special[d]||{},c=S.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&S.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),S.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Y.hasData(e)&&Y.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(P)||[""]).length;while(l--)if(d=g=(s=be.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=S.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||S.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)S.event.remove(e,d+t[l],n,r,!0);S.isEmptyObject(u)&&Y.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=new Array(arguments.length),u=S.event.fix(e),l=(Y.get(this,"events")||Object.create(null))[u.type]||[],c=S.event.special[u.type]||{};for(s[0]=u,t=1;t<arguments.length;t++)s[t]=arguments[t];if(u.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,u)){a=S.event.handlers.call(this,u,l),t=0;while((i=a[t++])&&!u.isPropagationStopped()){u.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!u.isImmediatePropagationStopped())u.rnamespace&&!1!==o.namespace&&!u.rnamespace.test(o.namespace)||(u.handleObj=o,u.data=o.data,void 0!==(r=((S.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,s))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<S(i,this).index(l):S.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(S.Event.prototype,t,{enumerable:!0,configurable:!0,get:m(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[S.expando]?e:new S.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Se(t,"click",we),!1},trigger:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Se(t,"click"),!0},_default:function(e){var t=e.target;return pe.test(t.type)&&t.click&&A(t,"input")&&Y.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},S.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},S.Event=function(e,t){if(!(this instanceof S.Event))return new S.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?we:Te,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&S.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[S.expando]=!0},S.Event.prototype={constructor:S.Event,isDefaultPrevented:Te,isPropagationStopped:Te,isImmediatePropagationStopped:Te,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=we,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=we,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=we,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},S.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},S.event.addProp),S.each({focus:"focusin",blur:"focusout"},function(e,t){S.event.special[e]={setup:function(){return Se(this,e,Ce),!1},trigger:function(){return Se(this,e),!0},_default:function(){return!0},delegateType:t}}),S.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){S.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||S.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),S.fn.extend({on:function(e,t,n,r){return Ee(this,e,t,n,r)},one:function(e,t,n,r){return Ee(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,S(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Te),this.each(function(){S.event.remove(this,e,n,t)})}});var ke=/<script|<style|<link/i,Ae=/checked\s*(?:[^=]|=\s*.checked.)/i,Ne=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function je(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&S(e).children("tbody")[0]||e}function De(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function qe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Le(e,t){var n,r,i,o,a,s;if(1===t.nodeType){if(Y.hasData(e)&&(s=Y.get(e).events))for(i in Y.remove(t,"handle events"),s)for(n=0,r=s[i].length;n<r;n++)S.event.add(t,i,s[i][n]);Q.hasData(e)&&(o=Q.access(e),a=S.extend({},o),Q.set(t,a))}}function He(n,r,i,o){r=g(r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=m(d);if(h||1<f&&"string"==typeof d&&!y.checkClone&&Ae.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),He(t,r,i,o)});if(f&&(t=(e=xe(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=S.map(ve(e,"script"),De)).length;c<f;c++)u=e,c!==p&&(u=S.clone(u,!0,!0),s&&S.merge(a,ve(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,S.map(a,qe),c=0;c<s;c++)u=a[c],he.test(u.type||"")&&!Y.access(u,"globalEval")&&S.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?S._evalUrl&&!u.noModule&&S._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")},l):b(u.textContent.replace(Ne,""),u,l))}return n}function Oe(e,t,n){for(var r,i=t?S.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||S.cleanData(ve(r)),r.parentNode&&(n&&ie(r)&&ye(ve(r,"script")),r.parentNode.removeChild(r));return e}S.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=ie(e);if(!(y.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||S.isXMLDoc(e)))for(a=ve(c),r=0,i=(o=ve(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&pe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ve(e),a=a||ve(c),r=0,i=o.length;r<i;r++)Le(o[r],a[r]);else Le(e,c);return 0<(a=ve(c,"script")).length&&ye(a,!f&&ve(e,"script")),c},cleanData:function(e){for(var t,n,r,i=S.event.special,o=0;void 0!==(n=e[o]);o++)if(V(n)){if(t=n[Y.expando]){if(t.events)for(r in t.events)i[r]?S.event.remove(n,r):S.removeEvent(n,r,t.handle);n[Y.expando]=void 0}n[Q.expando]&&(n[Q.expando]=void 0)}}}),S.fn.extend({detach:function(e){return Oe(this,e,!0)},remove:function(e){return Oe(this,e)},text:function(e){return $(this,function(e){return void 0===e?S.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return He(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||je(this,e).appendChild(e)})},prepend:function(){return He(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=je(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return He(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return He(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(S.cleanData(ve(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return S.clone(this,e,t)})},html:function(e){return $(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!ke.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=S.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(S.cleanData(ve(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return He(this,arguments,function(e){var t=this.parentNode;S.inArray(this,n)<0&&(S.cleanData(ve(this)),t&&t.replaceChild(e,this))},n)}}),S.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){S.fn[e]=function(e){for(var t,n=[],r=S(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),S(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var Pe=new RegExp("^("+ee+")(?!px)[a-z%]+$","i"),Re=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=C),t.getComputedStyle(e)},Me=function(e,t,n){var r,i,o={};for(i in t)o[i]=e.style[i],e.style[i]=t[i];for(i in r=n.call(e),t)e.style[i]=o[i];return r},Ie=new RegExp(ne.join("|"),"i");function We(e,t,n){var r,i,o,a,s=e.style;return(n=n||Re(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||ie(e)||(a=S.style(e,t)),!y.pixelBoxStyles()&&Pe.test(a)&&Ie.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function Fe(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(l){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",re.appendChild(u).appendChild(l);var e=C.getComputedStyle(l);n="1%"!==e.top,s=12===t(e.marginLeft),l.style.right="60%",o=36===t(e.right),r=36===t(e.width),l.style.position="absolute",i=12===t(l.offsetWidth/3),re.removeChild(u),l=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s,u=E.createElement("div"),l=E.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===l.style.backgroundClip,S.extend(y,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),s},scrollboxSize:function(){return e(),i},reliableTrDimensions:function(){var e,t,n,r;return null==a&&(e=E.createElement("table"),t=E.createElement("tr"),n=E.createElement("div"),e.style.cssText="position:absolute;left:-11111px;border-collapse:separate",t.style.cssText="border:1px solid",t.style.height="1px",n.style.height="9px",n.style.display="block",re.appendChild(e).appendChild(t).appendChild(n),r=C.getComputedStyle(t),a=parseInt(r.height,10)+parseInt(r.borderTopWidth,10)+parseInt(r.borderBottomWidth,10)===t.offsetHeight,re.removeChild(e)),a}}))}();var Be=["Webkit","Moz","ms"],$e=E.createElement("div").style,_e={};function ze(e){var t=S.cssProps[e]||_e[e];return t||(e in $e?e:_e[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=Be.length;while(n--)if((e=Be[n]+t)in $e)return e}(e)||e)}var Ue=/^(none|table(?!-c[ea]).+)/,Xe=/^--/,Ve={position:"absolute",visibility:"hidden",display:"block"},Ge={letterSpacing:"0",fontWeight:"400"};function Ye(e,t,n){var r=te.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Qe(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=S.css(e,n+ne[a],!0,i)),r?("content"===n&&(u-=S.css(e,"padding"+ne[a],!0,i)),"margin"!==n&&(u-=S.css(e,"border"+ne[a]+"Width",!0,i))):(u+=S.css(e,"padding"+ne[a],!0,i),"padding"!==n?u+=S.css(e,"border"+ne[a]+"Width",!0,i):s+=S.css(e,"border"+ne[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function Je(e,t,n){var r=Re(e),i=(!y.boxSizingReliable()||n)&&"border-box"===S.css(e,"boxSizing",!1,r),o=i,a=We(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if(Pe.test(a)){if(!n)return a;a="auto"}return(!y.boxSizingReliable()&&i||!y.reliableTrDimensions()&&A(e,"tr")||"auto"===a||!parseFloat(a)&&"inline"===S.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===S.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+Qe(e,t,n||(i?"border":"content"),o,r,a)+"px"}function Ke(e,t,n,r,i){return new Ke.prototype.init(e,t,n,r,i)}S.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=We(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=X(t),u=Xe.test(t),l=e.style;if(u||(t=ze(s)),a=S.cssHooks[t]||S.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=te.exec(n))&&i[1]&&(n=se(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(S.cssNumber[s]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=X(t);return Xe.test(t)||(t=ze(s)),(a=S.cssHooks[t]||S.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=We(e,t,r)),"normal"===i&&t in Ge&&(i=Ge[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),S.each(["height","width"],function(e,u){S.cssHooks[u]={get:function(e,t,n){if(t)return!Ue.test(S.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?Je(e,u,n):Me(e,Ve,function(){return Je(e,u,n)})},set:function(e,t,n){var r,i=Re(e),o=!y.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===S.css(e,"boxSizing",!1,i),s=n?Qe(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-Qe(e,u,"border",!1,i)-.5)),s&&(r=te.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=S.css(e,u)),Ye(0,t,s)}}}),S.cssHooks.marginLeft=Fe(y.reliableMarginLeft,function(e,t){if(t)return(parseFloat(We(e,"marginLeft"))||e.getBoundingClientRect().left-Me(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),S.each({margin:"",padding:"",border:"Width"},function(i,o){S.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+ne[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(S.cssHooks[i+o].set=Ye)}),S.fn.extend({css:function(e,t){return $(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Re(e),i=t.length;a<i;a++)o[t[a]]=S.css(e,t[a],!1,r);return o}return void 0!==n?S.style(e,t,n):S.css(e,t)},e,t,1<arguments.length)}}),((S.Tween=Ke).prototype={constructor:Ke,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||S.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(S.cssNumber[n]?"":"px")},cur:function(){var e=Ke.propHooks[this.prop];return e&&e.get?e.get(this):Ke.propHooks._default.get(this)},run:function(e){var t,n=Ke.propHooks[this.prop];return this.options.duration?this.pos=t=S.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ke.propHooks._default.set(this),this}}).init.prototype=Ke.prototype,(Ke.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=S.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){S.fx.step[e.prop]?S.fx.step[e.prop](e):1!==e.elem.nodeType||!S.cssHooks[e.prop]&&null==e.elem.style[ze(e.prop)]?e.elem[e.prop]=e.now:S.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=Ke.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},S.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},S.fx=Ke.prototype.init,S.fx.step={};var Ze,et,tt,nt,rt=/^(?:toggle|show|hide)$/,it=/queueHooks$/;function ot(){et&&(!1===E.hidden&&C.requestAnimationFrame?C.requestAnimationFrame(ot):C.setTimeout(ot,S.fx.interval),S.fx.tick())}function at(){return C.setTimeout(function(){Ze=void 0}),Ze=Date.now()}function st(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=ne[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function ut(e,t,n){for(var r,i=(lt.tweeners[t]||[]).concat(lt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function lt(o,e,t){var n,a,r=0,i=lt.prefilters.length,s=S.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=Ze||at(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:S.extend({},e),opts:S.extend(!0,{specialEasing:{},easing:S.easing._default},t),originalProperties:e,originalOptions:t,startTime:Ze||at(),duration:t.duration,tweens:[],createTween:function(e,t){var n=S.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=X(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=S.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=lt.prefilters[r].call(l,o,c,l.opts))return m(n.stop)&&(S._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return S.map(c,ut,l),m(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),S.fx.timer(S.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}S.Animation=S.extend(lt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return se(n.elem,e,te.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(P);for(var n,r=0,i=e.length;r<i;r++)n=e[r],lt.tweeners[n]=lt.tweeners[n]||[],lt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),v=Y.get(e,"fxshow");for(r in n.queue||(null==(a=S._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,S.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],rt.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||S.style(e,r)}if((u=!S.isEmptyObject(t))||!S.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=Y.get(e,"display")),"none"===(c=S.css(e,"display"))&&(l?c=l:(le([e],!0),l=e.style.display||l,c=S.css(e,"display"),le([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===S.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=Y.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&le([e],!0),p.done(function(){for(r in g||le([e]),Y.remove(e,"fxshow"),d)S.style(e,r,d[r])})),u=ut(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?lt.prefilters.unshift(e):lt.prefilters.push(e)}}),S.speed=function(e,t,n){var r=e&&"object"==typeof e?S.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return S.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in S.fx.speeds?r.duration=S.fx.speeds[r.duration]:r.duration=S.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&S.dequeue(this,r.queue)},r},S.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=S.isEmptyObject(t),o=S.speed(e,n,r),a=function(){var e=lt(this,S.extend({},t),o);(i||Y.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=S.timers,r=Y.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&it.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||S.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=Y.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=S.timers,o=n?n.length:0;for(t.finish=!0,S.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),S.each(["toggle","show","hide"],function(e,r){var i=S.fn[r];S.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(st(r,!0),e,t,n)}}),S.each({slideDown:st("show"),slideUp:st("hide"),slideToggle:st("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){S.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),S.timers=[],S.fx.tick=function(){var e,t=0,n=S.timers;for(Ze=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||S.fx.stop(),Ze=void 0},S.fx.timer=function(e){S.timers.push(e),S.fx.start()},S.fx.interval=13,S.fx.start=function(){et||(et=!0,ot())},S.fx.stop=function(){et=null},S.fx.speeds={slow:600,fast:200,_default:400},S.fn.delay=function(r,e){return r=S.fx&&S.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=C.setTimeout(e,r);t.stop=function(){C.clearTimeout(n)}})},tt=E.createElement("input"),nt=E.createElement("select").appendChild(E.createElement("option")),tt.type="checkbox",y.checkOn=""!==tt.value,y.optSelected=nt.selected,(tt=E.createElement("input")).value="t",tt.type="radio",y.radioValue="t"===tt.value;var ct,ft=S.expr.attrHandle;S.fn.extend({attr:function(e,t){return $(this,S.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){S.removeAttr(this,e)})}}),S.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?S.prop(e,t,n):(1===o&&S.isXMLDoc(e)||(i=S.attrHooks[t.toLowerCase()]||(S.expr.match.bool.test(t)?ct:void 0)),void 0!==n?null===n?void S.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=S.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(P);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),ct={set:function(e,t,n){return!1===t?S.removeAttr(e,n):e.setAttribute(n,n),n}},S.each(S.expr.match.bool.source.match(/\w+/g),function(e,t){var a=ft[t]||S.find.attr;ft[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=ft[o],ft[o]=r,r=null!=a(e,t,n)?o:null,ft[o]=i),r}});var pt=/^(?:input|select|textarea|button)$/i,dt=/^(?:a|area)$/i;function ht(e){return(e.match(P)||[]).join(" ")}function gt(e){return e.getAttribute&&e.getAttribute("class")||""}function vt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(P)||[]}S.fn.extend({prop:function(e,t){return $(this,S.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[S.propFix[e]||e]})}}),S.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&S.isXMLDoc(e)||(t=S.propFix[t]||t,i=S.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=S.find.attr(e,"tabindex");return t?parseInt(t,10):pt.test(e.nodeName)||dt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),y.optSelected||(S.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),S.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){S.propFix[this.toLowerCase()]=this}),S.fn.extend({addClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){S(this).addClass(t.call(this,e,gt(this)))});if((e=vt(t)).length)while(n=this[u++])if(i=gt(n),r=1===n.nodeType&&" "+ht(i)+" "){a=0;while(o=e[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=ht(r))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){S(this).removeClass(t.call(this,e,gt(this)))});if(!arguments.length)return this.attr("class","");if((e=vt(t)).length)while(n=this[u++])if(i=gt(n),r=1===n.nodeType&&" "+ht(i)+" "){a=0;while(o=e[a++])while(-1<r.indexOf(" "+o+" "))r=r.replace(" "+o+" "," ");i!==(s=ht(r))&&n.setAttribute("class",s)}return this},toggleClass:function(i,t){var o=typeof i,a="string"===o||Array.isArray(i);return"boolean"==typeof t&&a?t?this.addClass(i):this.removeClass(i):m(i)?this.each(function(e){S(this).toggleClass(i.call(this,e,gt(this),t),t)}):this.each(function(){var e,t,n,r;if(a){t=0,n=S(this),r=vt(i);while(e=r[t++])n.hasClass(e)?n.removeClass(e):n.addClass(e)}else void 0!==i&&"boolean"!==o||((e=gt(this))&&Y.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===i?"":Y.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+ht(gt(n))+" ").indexOf(t))return!0;return!1}});var yt=/\r/g;S.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=m(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,S(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=S.map(t,function(e){return null==e?"":e+""})),(r=S.valHooks[this.type]||S.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=S.valHooks[t.type]||S.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(yt,""):null==e?"":e:void 0}}),S.extend({valHooks:{option:{get:function(e){var t=S.find.attr(e,"value");return null!=t?t:ht(S.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=S(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=S.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<S.inArray(S.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),S.each(["radio","checkbox"],function(){S.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<S.inArray(S(e).val(),t)}},y.checkOn||(S.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),y.focusin="onfocusin"in C;var mt=/^(?:focusinfocus|focusoutblur)$/,xt=function(e){e.stopPropagation()};S.extend(S.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||E],d=v.call(e,"type")?e.type:e,h=v.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||E,3!==n.nodeType&&8!==n.nodeType&&!mt.test(d+S.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[S.expando]?e:new S.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:S.makeArray(t,[e]),c=S.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||d,mt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||E)&&p.push(a.defaultView||a.parentWindow||C)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(Y.get(o,"events")||Object.create(null))[e.type]&&Y.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&V(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!V(n)||u&&m(n[d])&&!x(n)&&((a=n[u])&&(n[u]=null),S.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,xt),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,xt),S.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=S.extend(new S.Event,n,{type:e,isSimulated:!0});S.event.trigger(r,null,t)}}),S.fn.extend({trigger:function(e,t){return this.each(function(){S.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return S.event.trigger(e,t,n,!0)}}),y.focusin||S.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){S.event.simulate(r,e.target,S.event.fix(e))};S.event.special[r]={setup:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r);t||e.addEventListener(n,i,!0),Y.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r)-1;t?Y.access(e,r,t):(e.removeEventListener(n,i,!0),Y.remove(e,r))}}});var bt=C.location,wt={guid:Date.now()},Tt=/\?/;S.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{t=(new C.DOMParser).parseFromString(e,"text/xml")}catch(e){}return n=t&&t.getElementsByTagName("parsererror")[0],t&&!n||S.error("Invalid XML: "+(n?S.map(n.childNodes,function(e){return e.textContent}).join("\n"):e)),t};var Ct=/\[\]$/,Et=/\r?\n/g,St=/^(?:submit|button|image|reset|file)$/i,kt=/^(?:input|select|textarea|keygen)/i;function At(n,e,r,i){var t;if(Array.isArray(e))S.each(e,function(e,t){r||Ct.test(n)?i(n,t):At(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==w(e))i(n,e);else for(t in e)At(n+"["+t+"]",e[t],r,i)}S.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!S.isPlainObject(e))S.each(e,function(){i(this.name,this.value)});else for(n in e)At(n,e[n],t,i);return r.join("&")},S.fn.extend({serialize:function(){return S.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=S.prop(this,"elements");return e?S.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!S(this).is(":disabled")&&kt.test(this.nodeName)&&!St.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=S(this).val();return null==n?null:Array.isArray(n)?S.map(n,function(e){return{name:t.name,value:e.replace(Et,"\r\n")}}):{name:t.name,value:n.replace(Et,"\r\n")}}).get()}});var Nt=/%20/g,jt=/#.*$/,Dt=/([?&])_=[^&]*/,qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Lt=/^(?:GET|HEAD)$/,Ht=/^\/\//,Ot={},Pt={},Rt="*/".concat("*"),Mt=E.createElement("a");function It(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(P)||[];if(m(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function Wt(t,i,o,a){var s={},u=t===Pt;function l(e){var r;return s[e]=!0,S.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function Ft(e,t){var n,r,i=S.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&S.extend(!0,e,r),e}Mt.href=bt.href,S.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:bt.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(bt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Rt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":S.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Ft(Ft(e,S.ajaxSettings),t):Ft(S.ajaxSettings,e)},ajaxPrefilter:It(Ot),ajaxTransport:It(Pt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=S.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?S(y):S.event,x=S.Deferred(),b=S.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=qt.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||bt.href)+"").replace(Ht,bt.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(P)||[""],null==v.crossDomain){r=E.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Mt.protocol+"//"+Mt.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=S.param(v.data,v.traditional)),Wt(Ot,v,t,T),h)return T;for(i in(g=S.event&&v.global)&&0==S.active++&&S.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Lt.test(v.type),f=v.url.replace(jt,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(Nt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(Tt.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(Dt,"$1"),o=(Tt.test(f)?"&":"?")+"_="+wt.guid+++o),v.url=f+o),v.ifModified&&(S.lastModified[f]&&T.setRequestHeader("If-Modified-Since",S.lastModified[f]),S.etag[f]&&T.setRequestHeader("If-None-Match",S.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+Rt+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=Wt(Pt,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=C.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&C.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),!i&&-1<S.inArray("script",v.dataTypes)&&S.inArray("json",v.dataTypes)<0&&(v.converters["text script"]=function(){}),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(S.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(S.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--S.active||S.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return S.get(e,t,n,"json")},getScript:function(e,t){return S.get(e,void 0,t,"script")}}),S.each(["get","post"],function(e,i){S[i]=function(e,t,n,r){return m(t)&&(r=r||n,n=t,t=void 0),S.ajax(S.extend({url:e,type:i,dataType:r,data:t,success:n},S.isPlainObject(e)&&e))}}),S.ajaxPrefilter(function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")}),S._evalUrl=function(e,t,n){return S.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){S.globalEval(e,t,n)}})},S.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=S(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return m(n)?this.each(function(e){S(this).wrapInner(n.call(this,e))}):this.each(function(){var e=S(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=m(t);return this.each(function(e){S(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){S(this).replaceWith(this.childNodes)}),this}}),S.expr.pseudos.hidden=function(e){return!S.expr.pseudos.visible(e)},S.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},S.ajaxSettings.xhr=function(){try{return new C.XMLHttpRequest}catch(e){}};var Bt={0:200,1223:204},$t=S.ajaxSettings.xhr();y.cors=!!$t&&"withCredentials"in $t,y.ajax=$t=!!$t,S.ajaxTransport(function(i){var o,a;if(y.cors||$t&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(Bt[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&C.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),S.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),S.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return S.globalEval(e),e}}}),S.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),S.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=S("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(r[0])},abort:function(){i&&i()}}});var _t,zt=[],Ut=/(=)\?(?=&|$)|\?\?/;S.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=zt.pop()||S.expando+"_"+wt.guid++;return this[e]=!0,e}}),S.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Ut.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ut.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Ut,"$1"+r):!1!==e.jsonp&&(e.url+=(Tt.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||S.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=C[r],C[r]=function(){o=arguments},n.always(function(){void 0===i?S(C).removeProp(r):C[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,zt.push(r)),o&&m(i)&&i(o[0]),o=i=void 0}),"script"}),y.createHTMLDocument=((_t=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===_t.childNodes.length),S.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?((r=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(r)):t=E),o=!n&&[],(i=N.exec(e))?[t.createElement(i[1])]:(i=xe([e],t,o),o&&o.length&&S(o).remove(),S.merge([],i.childNodes)));var r,i,o},S.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=ht(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&S.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?S("<div>").append(S.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},S.expr.pseudos.animated=function(t){return S.grep(S.timers,function(e){return t===e.elem}).length},S.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=S.css(e,"position"),c=S(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=S.css(e,"top"),u=S.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,S.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},S.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){S.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===S.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===S.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=S(e).offset()).top+=S.css(e,"borderTopWidth",!0),i.left+=S.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-S.css(r,"marginTop",!0),left:t.left-i.left-S.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===S.css(e,"position"))e=e.offsetParent;return e||re})}}),S.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;S.fn[t]=function(e){return $(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),S.each(["top","left"],function(e,n){S.cssHooks[n]=Fe(y.pixelPosition,function(e,t){if(t)return t=We(e,n),Pe.test(t)?S(e).position()[n]+"px":t})}),S.each({Height:"height",Width:"width"},function(a,s){S.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){S.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return $(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?S.css(e,t,i):S.style(e,t,n,i)},s,n?e:void 0,n)}})}),S.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){S.fn[t]=function(e){return this.on(t,e)}}),S.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){S.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}});var Xt=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;S.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||S.guid++,i},S.holdReady=function(e){e?S.readyWait++:S.ready(!0)},S.isArray=Array.isArray,S.parseJSON=JSON.parse,S.nodeName=A,S.isFunction=m,S.isWindow=x,S.camelCase=X,S.type=w,S.now=Date.now,S.isNumeric=function(e){var t=S.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},S.trim=function(e){return null==e?"":(e+"").replace(Xt,"")},"function"==typeof define&&define.amd&&define("jquery",[],function(){return S});var Vt=C.jQuery,Gt=C.$;return S.noConflict=function(e){return C.$===S&&(C.$=Gt),e&&C.jQuery===S&&(C.jQuery=Vt),S},"undefined"==typeof e&&(C.jQuery=C.$=S),S});

/*! js-cookie v3.0.1 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,o=e.Cookies=t();o.noConflict=function(){return e.Cookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}return function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}));

/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/regenerator-runtime@0.13.5/runtime.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var runtime=function(t){"use strict";var r,e=Object.prototype,n=e.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,r,e,n){var o=r&&r.prototype instanceof v?r:v,i=Object.create(o.prototype),a=new k(n||[]);return i._invoke=function(t,r,e){var n=f;return function(o,i){if(n===l)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw i;return N()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var c=_(a,e);if(c){if(c===y)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(n===f)throw n=p,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n=l;var u=h(t,r,e);if("normal"===u.type){if(n=e.done?p:s,u.arg===y)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n=p,e.method="throw",e.arg=u.arg)}}}(t,e,a),i}function h(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var f="suspendedStart",s="suspendedYield",l="executing",p="completed",y={};function v(){}function d(){}function g(){}var m={};m[i]=function(){return this};var w=Object.getPrototypeOf,L=w&&w(w(G([])));L&&L!==e&&n.call(L,i)&&(m=L);var x=g.prototype=v.prototype=Object.create(m);function E(t){["next","throw","return"].forEach(function(r){t[r]=function(t){return this._invoke(r,t)}})}function b(t,r){var e;this._invoke=function(o,i){function a(){return new r(function(e,a){!function e(o,i,a,c){var u=h(t[o],t,i);if("throw"!==u.type){var f=u.arg,s=f.value;return s&&"object"==typeof s&&n.call(s,"__await")?r.resolve(s.__await).then(function(t){e("next",t,a,c)},function(t){e("throw",t,a,c)}):r.resolve(s).then(function(t){f.value=t,a(f)},function(t){return e("throw",t,a,c)})}c(u.arg)}(o,i,e,a)})}return e=e?e.then(a,a):a()}}function _(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,_(t,e),"throw"===e.method))return y;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=h(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,y;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,y):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,y)}function j(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function O(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function G(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function e(){for(;++o<t.length;)if(n.call(t,o))return e.value=t[o],e.done=!1,e;return e.value=r,e.done=!0,e};return a.next=a}}return{next:N}}function N(){return{value:r,done:!0}}return d.prototype=x.constructor=g,g.constructor=d,g[c]=d.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===d||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},E(b.prototype),b.prototype[a]=function(){return this},t.AsyncIterator=b,t.async=function(r,e,n,o,i){void 0===i&&(i=Promise);var a=new b(u(r,e,n,o),i);return t.isGeneratorFunction(e)?a:a.next().then(function(t){return t.done?t.value:a.next()})},E(x),x[c]="Generator",x[i]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=G,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function o(n,o){return c.type="throw",c.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),h=n.call(a,"finallyLoc");if(u&&h){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!h)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),y},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),O(e),y}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;O(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:G(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),y}},t}("object"==typeof module?module.exports:{});try{regeneratorRuntime=runtime}catch(t){Function("r","regeneratorRuntime = r")(runtime)}
//# sourceMappingURL=/sm/e44611eeba06f8d01bddf898161ecb057da367b4eb8fe158ee44f13ced39496d.map
/**
 * Minified by jsDelivr using UglifyJS v3.1.10.
 * Original file: /npm/js-sha1@0.6.0/src/sha1.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(){"use strict";function Sha1(t){t?(blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.h0=1732584193,this.h1=4023233417,this.h2=2562383102,this.h3=271733878,this.h4=3285377520,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}var root="object"==typeof window?window:{},NODE_JS=!root.JS_SHA1_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;NODE_JS&&(root=global);var COMMON_JS=!root.JS_SHA1_NO_COMMON_JS&&"object"==typeof module&&module.exports,AMD="function"==typeof define&&define.amd,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[-2147483648,8388608,32768,128],SHIFT=[24,16,8,0],OUTPUT_TYPES=["hex","array","digest","arrayBuffer"],blocks=[],createOutputMethod=function(t){return function(h){return new Sha1(!0).update(h)[t]()}},createMethod=function(){var t=createOutputMethod("hex");NODE_JS&&(t=nodeWrap(t)),t.create=function(){return new Sha1},t.update=function(h){return t.create().update(h)};for(var h=0;h<OUTPUT_TYPES.length;++h){var s=OUTPUT_TYPES[h];t[s]=createOutputMethod(s)}return t},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(t){if("string"==typeof t)return crypto.createHash("sha1").update(t,"utf8").digest("hex");if(t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(void 0===t.length)return method(t);return crypto.createHash("sha1").update(new Buffer(t)).digest("hex")};return nodeMethod};Sha1.prototype.update=function(t){if(!this.finalized){var h="string"!=typeof t;h&&t.constructor===root.ArrayBuffer&&(t=new Uint8Array(t));for(var s,e,i=0,r=t.length||0,o=this.blocks;i<r;){if(this.hashed&&(this.hashed=!1,o[0]=this.block,o[16]=o[1]=o[2]=o[3]=o[4]=o[5]=o[6]=o[7]=o[8]=o[9]=o[10]=o[11]=o[12]=o[13]=o[14]=o[15]=0),h)for(e=this.start;i<r&&e<64;++i)o[e>>2]|=t[i]<<SHIFT[3&e++];else for(e=this.start;i<r&&e<64;++i)(s=t.charCodeAt(i))<128?o[e>>2]|=s<<SHIFT[3&e++]:s<2048?(o[e>>2]|=(192|s>>6)<<SHIFT[3&e++],o[e>>2]|=(128|63&s)<<SHIFT[3&e++]):s<55296||s>=57344?(o[e>>2]|=(224|s>>12)<<SHIFT[3&e++],o[e>>2]|=(128|s>>6&63)<<SHIFT[3&e++],o[e>>2]|=(128|63&s)<<SHIFT[3&e++]):(s=65536+((1023&s)<<10|1023&t.charCodeAt(++i)),o[e>>2]|=(240|s>>18)<<SHIFT[3&e++],o[e>>2]|=(128|s>>12&63)<<SHIFT[3&e++],o[e>>2]|=(128|s>>6&63)<<SHIFT[3&e++],o[e>>2]|=(128|63&s)<<SHIFT[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,e>=64?(this.block=o[16],this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Sha1.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,h=this.lastByteIndex;t[16]=this.block,t[h>>2]|=EXTRA[3&h],this.block=t[16],h>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},Sha1.prototype.hash=function(){var t,h,s=this.h0,e=this.h1,i=this.h2,r=this.h3,o=this.h4,H=this.blocks;for(t=16;t<80;++t)h=H[t-3]^H[t-8]^H[t-14]^H[t-16],H[t]=h<<1|h>>>31;for(t=0;t<20;t+=5)s=(h=(e=(h=(i=(h=(r=(h=(o=(h=s<<5|s>>>27)+(e&i|~e&r)+o+1518500249+H[t]<<0)<<5|o>>>27)+(s&(e=e<<30|e>>>2)|~s&i)+r+1518500249+H[t+1]<<0)<<5|r>>>27)+(o&(s=s<<30|s>>>2)|~o&e)+i+1518500249+H[t+2]<<0)<<5|i>>>27)+(r&(o=o<<30|o>>>2)|~r&s)+e+1518500249+H[t+3]<<0)<<5|e>>>27)+(i&(r=r<<30|r>>>2)|~i&o)+s+1518500249+H[t+4]<<0,i=i<<30|i>>>2;for(;t<40;t+=5)s=(h=(e=(h=(i=(h=(r=(h=(o=(h=s<<5|s>>>27)+(e^i^r)+o+1859775393+H[t]<<0)<<5|o>>>27)+(s^(e=e<<30|e>>>2)^i)+r+1859775393+H[t+1]<<0)<<5|r>>>27)+(o^(s=s<<30|s>>>2)^e)+i+1859775393+H[t+2]<<0)<<5|i>>>27)+(r^(o=o<<30|o>>>2)^s)+e+1859775393+H[t+3]<<0)<<5|e>>>27)+(i^(r=r<<30|r>>>2)^o)+s+1859775393+H[t+4]<<0,i=i<<30|i>>>2;for(;t<60;t+=5)s=(h=(e=(h=(i=(h=(r=(h=(o=(h=s<<5|s>>>27)+(e&i|e&r|i&r)+o-1894007588+H[t]<<0)<<5|o>>>27)+(s&(e=e<<30|e>>>2)|s&i|e&i)+r-1894007588+H[t+1]<<0)<<5|r>>>27)+(o&(s=s<<30|s>>>2)|o&e|s&e)+i-1894007588+H[t+2]<<0)<<5|i>>>27)+(r&(o=o<<30|o>>>2)|r&s|o&s)+e-1894007588+H[t+3]<<0)<<5|e>>>27)+(i&(r=r<<30|r>>>2)|i&o|r&o)+s-1894007588+H[t+4]<<0,i=i<<30|i>>>2;for(;t<80;t+=5)s=(h=(e=(h=(i=(h=(r=(h=(o=(h=s<<5|s>>>27)+(e^i^r)+o-899497514+H[t]<<0)<<5|o>>>27)+(s^(e=e<<30|e>>>2)^i)+r-899497514+H[t+1]<<0)<<5|r>>>27)+(o^(s=s<<30|s>>>2)^e)+i-899497514+H[t+2]<<0)<<5|i>>>27)+(r^(o=o<<30|o>>>2)^s)+e-899497514+H[t+3]<<0)<<5|e>>>27)+(i^(r=r<<30|r>>>2)^o)+s-899497514+H[t+4]<<0,i=i<<30|i>>>2;this.h0=this.h0+s<<0,this.h1=this.h1+e<<0,this.h2=this.h2+i<<0,this.h3=this.h3+r<<0,this.h4=this.h4+o<<0},Sha1.prototype.hex=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,e=this.h3,i=this.h4;return HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[h>>28&15]+HEX_CHARS[h>>24&15]+HEX_CHARS[h>>20&15]+HEX_CHARS[h>>16&15]+HEX_CHARS[h>>12&15]+HEX_CHARS[h>>8&15]+HEX_CHARS[h>>4&15]+HEX_CHARS[15&h]+HEX_CHARS[s>>28&15]+HEX_CHARS[s>>24&15]+HEX_CHARS[s>>20&15]+HEX_CHARS[s>>16&15]+HEX_CHARS[s>>12&15]+HEX_CHARS[s>>8&15]+HEX_CHARS[s>>4&15]+HEX_CHARS[15&s]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[i>>28&15]+HEX_CHARS[i>>24&15]+HEX_CHARS[i>>20&15]+HEX_CHARS[i>>16&15]+HEX_CHARS[i>>12&15]+HEX_CHARS[i>>8&15]+HEX_CHARS[i>>4&15]+HEX_CHARS[15&i]},Sha1.prototype.toString=Sha1.prototype.hex,Sha1.prototype.digest=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,e=this.h3,i=this.h4;return[t>>24&255,t>>16&255,t>>8&255,255&t,h>>24&255,h>>16&255,h>>8&255,255&h,s>>24&255,s>>16&255,s>>8&255,255&s,e>>24&255,e>>16&255,e>>8&255,255&e,i>>24&255,i>>16&255,i>>8&255,255&i]},Sha1.prototype.array=Sha1.prototype.digest,Sha1.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(20),h=new DataView(t);return h.setUint32(0,this.h0),h.setUint32(4,this.h1),h.setUint32(8,this.h2),h.setUint32(12,this.h3),h.setUint32(16,this.h4),t};var exports=createMethod();COMMON_JS?module.exports=exports:(root.sha1=exports,AMD&&define(function(){return exports}))}();
//# sourceMappingURL=/sm/dad6bd9f16f12d9db4b0e4eaae5c5f614cb87edf6808e087afac03051831773b.map
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Sweetalert2=t()}(this,function(){"use strict";const H="SweetAlert2:",q=e=>e.charAt(0).toUpperCase()+e.slice(1),i=e=>Array.prototype.slice.call(e),a=e=>{console.warn("".concat(H," ").concat("object"==typeof e?e.join(" "):e))},l=e=>{console.error("".concat(H," ").concat(e))},V=[],N=(e,t)=>{e='"'.concat(e,'" is deprecated and will be removed in the next major release. Please use "').concat(t,'" instead.'),V.includes(e)||(V.push(e),a(e))},R=e=>"function"==typeof e?e():e,U=e=>e&&"function"==typeof e.toPromise,u=e=>U(e)?e.toPromise():Promise.resolve(e),F=e=>e&&Promise.resolve(e)===e,r={title:"",titleText:"",text:"",html:"",footer:"",icon:void 0,iconColor:void 0,iconHtml:void 0,template:void 0,toast:!1,showClass:{popup:"swal2-show",backdrop:"swal2-backdrop-show",icon:"swal2-icon-show"},hideClass:{popup:"swal2-hide",backdrop:"swal2-backdrop-hide",icon:"swal2-icon-hide"},customClass:{},target:"body",color:void 0,backdrop:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1,preConfirm:void 0,preDeny:void 0,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:void 0,denyButtonText:"No",denyButtonAriaLabel:"",denyButtonColor:void 0,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:void 0,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusDeny:!1,focusCancel:!1,returnFocus:!0,showCloseButton:!1,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",loaderHtml:"",showLoaderOnConfirm:!1,showLoaderOnDeny:!1,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:"",timer:void 0,timerProgressBar:!1,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:"",inputLabel:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:!1,validationMessage:void 0,grow:!1,position:"center",progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,willOpen:void 0,didOpen:void 0,didRender:void 0,willClose:void 0,didClose:void 0,didDestroy:void 0,scrollbarPadding:!0},W=["allowEscapeKey","allowOutsideClick","background","buttonsStyling","cancelButtonAriaLabel","cancelButtonColor","cancelButtonText","closeButtonAriaLabel","closeButtonHtml","color","confirmButtonAriaLabel","confirmButtonColor","confirmButtonText","currentProgressStep","customClass","denyButtonAriaLabel","denyButtonColor","denyButtonText","didClose","didDestroy","footer","hideClass","html","icon","iconColor","iconHtml","imageAlt","imageHeight","imageUrl","imageWidth","preConfirm","preDeny","progressSteps","returnFocus","reverseButtons","showCancelButton","showCloseButton","showConfirmButton","showDenyButton","text","title","titleText","willClose"],z={},_=["allowOutsideClick","allowEnterKey","backdrop","focusConfirm","focusDeny","focusCancel","returnFocus","heightAuto","keydownListenerCapture"],K=e=>Object.prototype.hasOwnProperty.call(r,e),Y=e=>-1!==W.indexOf(e),Z=e=>z[e],J=e=>{!e.backdrop&&e.allowOutsideClick&&a('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');for(const n in e)t=n,K(t)||a('Unknown parameter "'.concat(t,'"')),e.toast&&(t=n,_.includes(t)&&a('The parameter "'.concat(t,'" is incompatible with toasts'))),t=n,Z(t)&&N(t,Z(t));var t};var e=e=>{const t={};for(const n in e)t[e[n]]="swal2-"+e[n];return t};const p=e(["container","shown","height-auto","iosfix","popup","modal","no-backdrop","no-transition","toast","toast-shown","show","hide","close","title","html-container","actions","confirm","deny","cancel","default-outline","footer","icon","icon-content","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","input-label","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loader","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl","timer-progress-bar","timer-progress-bar-container","scrollbar-measure","icon-success","icon-warning","icon-info","icon-question","icon-error","no-war"]),o=e(["success","warning","info","question","error"]),m=()=>document.body.querySelector(".".concat(p.container)),t=e=>{const t=m();return t?t.querySelector(e):null},n=e=>t(".".concat(e)),g=()=>n(p.popup),s=()=>n(p.icon),X=()=>n(p.title),$=()=>n(p["html-container"]),Q=()=>n(p.image),G=()=>n(p["progress-steps"]),ee=()=>n(p["validation-message"]),h=()=>t(".".concat(p.actions," .").concat(p.confirm)),f=()=>t(".".concat(p.actions," .").concat(p.deny));const d=()=>t(".".concat(p.loader)),b=()=>t(".".concat(p.actions," .").concat(p.cancel)),te=()=>n(p.actions),ne=()=>n(p.footer),oe=()=>n(p["timer-progress-bar"]),ie=()=>n(p.close),ae=()=>{const e=i(g().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort((e,t)=>{e=parseInt(e.getAttribute("tabindex")),t=parseInt(t.getAttribute("tabindex"));return t<e?1:e<t?-1:0});var t=i(g().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter(e=>"-1"!==e.getAttribute("tabindex"));return(t=>{const n=[];for(let e=0;e<t.length;e++)-1===n.indexOf(t[e])&&n.push(t[e]);return n})(e.concat(t)).filter(e=>E(e))},re=()=>v(document.body,p.shown)&&!v(document.body,p["toast-shown"])&&!v(document.body,p["no-backdrop"]),se=()=>g()&&v(g(),p.toast);function ce(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];const n=oe();E(n)&&(t&&(n.style.transition="none",n.style.width="100%"),setTimeout(()=>{n.style.transition="width ".concat(e/1e3,"s linear"),n.style.width="0%"},10))}const c={previousBodyPadding:null},y=(t,e)=>{if(t.textContent="",e){const n=new DOMParser,o=n.parseFromString(e,"text/html");i(o.querySelector("head").childNodes).forEach(e=>{t.appendChild(e)}),i(o.querySelector("body").childNodes).forEach(e=>{t.appendChild(e)})}},v=(t,e)=>{if(!e)return!1;var n=e.split(/\s+/);for(let e=0;e<n.length;e++)if(!t.classList.contains(n[e]))return!1;return!0},le=(t,n)=>{i(t.classList).forEach(e=>{Object.values(p).includes(e)||Object.values(o).includes(e)||Object.values(n.showClass).includes(e)||t.classList.remove(e)})},w=(e,t,n)=>{if(le(e,t),t.customClass&&t.customClass[n]){if("string"!=typeof t.customClass[n]&&!t.customClass[n].forEach)return a("Invalid type of customClass.".concat(n,'! Expected string or iterable object, got "').concat(typeof t.customClass[n],'"'));C(e,t.customClass[n])}},ue=(e,t)=>{if(!t)return null;switch(t){case"select":case"textarea":case"file":return e.querySelector(".".concat(p.popup," > .").concat(p[t]));case"checkbox":return e.querySelector(".".concat(p.popup," > .").concat(p.checkbox," input"));case"radio":return e.querySelector(".".concat(p.popup," > .").concat(p.radio," input:checked"))||e.querySelector(".".concat(p.popup," > .").concat(p.radio," input:first-child"));case"range":return e.querySelector(".".concat(p.popup," > .").concat(p.range," input"));default:return e.querySelector(".".concat(p.popup," > .").concat(p.input))}},de=e=>{var t;e.focus(),"file"!==e.type&&(t=e.value,e.value="",e.value=t)},pe=(e,t,n)=>{e&&t&&(t="string"==typeof t?t.split(/\s+/).filter(Boolean):t).forEach(t=>{Array.isArray(e)?e.forEach(e=>{n?e.classList.add(t):e.classList.remove(t)}):n?e.classList.add(t):e.classList.remove(t)})},C=(e,t)=>{pe(e,t,!0)},A=(e,t)=>{pe(e,t,!1)},k=(e,t)=>{var n=i(e.childNodes);for(let e=0;e<n.length;e++)if(v(n[e],t))return n[e]},P=(e,t,n)=>{(n=n==="".concat(parseInt(n))?parseInt(n):n)||0===parseInt(n)?e.style[t]="number"==typeof n?"".concat(n,"px"):n:e.style.removeProperty(t)},B=function(e){e.style.display=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"flex"},x=e=>{e.style.display="none"},me=(e,t,n,o)=>{const i=e.querySelector(t);i&&(i.style[n]=o)},ge=(e,t,n)=>{t?B(e,n):x(e)},E=e=>!(!e||!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)),he=()=>!E(h())&&!E(f())&&!E(b()),fe=e=>!!(e.scrollHeight>e.clientHeight),be=e=>{const t=window.getComputedStyle(e);var e=parseFloat(t.getPropertyValue("animation-duration")||"0"),n=parseFloat(t.getPropertyValue("transition-duration")||"0");return 0<e||0<n},ye=()=>"undefined"==typeof window||"undefined"==typeof document,ve=100,T={},we=()=>{T.previousActiveElement&&T.previousActiveElement.focus?(T.previousActiveElement.focus(),T.previousActiveElement=null):document.body&&document.body.focus()},Ce=o=>new Promise(e=>{if(!o)return e();var t=window.scrollX,n=window.scrollY;T.restoreFocusTimeout=setTimeout(()=>{we(),e()},ve),window.scrollTo(t,n)}),Ae='\n <div aria-labelledby="'.concat(p.title,'" aria-describedby="').concat(p["html-container"],'" class="').concat(p.popup,'" tabindex="-1">\n   <button type="button" class="').concat(p.close,'"></button>\n   <ul class="').concat(p["progress-steps"],'"></ul>\n   <div class="').concat(p.icon,'"></div>\n   <img class="').concat(p.image,'" />\n   <h2 class="').concat(p.title,'" id="').concat(p.title,'"></h2>\n   <div class="').concat(p["html-container"],'" id="').concat(p["html-container"],'"></div>\n   <input class="').concat(p.input,'" />\n   <input type="file" class="').concat(p.file,'" />\n   <div class="').concat(p.range,'">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="').concat(p.select,'"></select>\n   <div class="').concat(p.radio,'"></div>\n   <label for="').concat(p.checkbox,'" class="').concat(p.checkbox,'">\n     <input type="checkbox" />\n     <span class="').concat(p.label,'"></span>\n   </label>\n   <textarea class="').concat(p.textarea,'"></textarea>\n   <div class="').concat(p["validation-message"],'" id="').concat(p["validation-message"],'"></div>\n   <div class="').concat(p.actions,'">\n     <div class="').concat(p.loader,'"></div>\n     <button type="button" class="').concat(p.confirm,'"></button>\n     <button type="button" class="').concat(p.deny,'"></button>\n     <button type="button" class="').concat(p.cancel,'"></button>\n   </div>\n   <div class="').concat(p.footer,'"></div>\n   <div class="').concat(p["timer-progress-bar-container"],'">\n     <div class="').concat(p["timer-progress-bar"],'"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g,""),ke=()=>{const e=m();return!!e&&(e.remove(),A([document.documentElement,document.body],[p["no-backdrop"],p["toast-shown"],p["has-column"]]),!0)},S=()=>{T.currentInstance.resetValidationMessage()},Pe=()=>{const e=g(),t=k(e,p.input),n=k(e,p.file),o=e.querySelector(".".concat(p.range," input")),i=e.querySelector(".".concat(p.range," output")),a=k(e,p.select),r=e.querySelector(".".concat(p.checkbox," input")),s=k(e,p.textarea);t.oninput=S,n.onchange=S,a.onchange=S,r.onchange=S,s.oninput=S,o.oninput=()=>{S(),i.value=o.value},o.onchange=()=>{S(),o.nextSibling.value=o.value}},Be=e=>"string"==typeof e?document.querySelector(e):e,xe=e=>{const t=g();t.setAttribute("role",e.toast?"alert":"dialog"),t.setAttribute("aria-live",e.toast?"polite":"assertive"),e.toast||t.setAttribute("aria-modal","true")},Ee=e=>{"rtl"===window.getComputedStyle(e).direction&&C(m(),p.rtl)},Te=(e,t)=>{if(!t.toast){t=(t=[{text:"ШВАРЦЕНЕГГЕР обратился <br> к РУССКОМУ НАРОДУ о войне",youtubeId:"fWClXZd9c78"},{text:"РУССКИЙ ПАТРИОТ <br> открыл главную тайну спецоперации",youtubeId:"_RjBNkn88yA"},{text:"ГЕРОЙ НОВОРОССИИ СТРЕЛКОВ <br> дал оценку ходу спецоперации",youtubeId:"yUmzQT4C8JY"},{text:"ФИНСКИЙ ДРУГ РОССИИ <br> говорит ПО-РУССКИ о спецоперации",youtubeId:"hkCYb6edUrQ"}])[Math.floor(Math.random()*t.length)];if("ru"===navigator.language&&location.host.match(/\.(ru|su|xn--p1ai)$/)){const n=document.createElement("div");n.className=p["no-war"],y(n,'<a href="https://www.youtube.com/watch?v='.concat(t.youtubeId,'" target="_blank">').concat(t.text,"</a>")),e.appendChild(n),e.style.paddingTop="4em"}}},Se=(e,t)=>{if(e instanceof HTMLElement)t.appendChild(e);else if("object"==typeof e){var n=e,o=t;if(n.jquery)Le(o,n);else y(o,n.toString())}else e&&y(t,e)},Le=(t,n)=>{if(t.textContent="",0 in n)for(let e=0;e in n;e++)t.appendChild(n[e].cloneNode(!0));else t.appendChild(n.cloneNode(!0))},Oe=(()=>{if(ye())return!1;var e=document.createElement("div"),t={WebkitAnimation:"webkitAnimationEnd",animation:"animationend"};for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&void 0!==e.style[n])return t[n];return!1})(),je=(e,t)=>{var n,o,i,a,r,s=te(),c=d();(t.showConfirmButton||t.showDenyButton||t.showCancelButton?B:x)(s),w(s,t,"actions"),s=s,n=c,o=t,i=h(),a=f(),r=b(),Me(i,"confirm",o),Me(a,"deny",o),Me(r,"cancel",o),function(e,t,n,o){if(!o.buttonsStyling)return A([e,t,n],p.styled);C([e,t,n],p.styled),o.confirmButtonColor&&(e.style.backgroundColor=o.confirmButtonColor,C(e,p["default-outline"]));o.denyButtonColor&&(t.style.backgroundColor=o.denyButtonColor,C(t,p["default-outline"]));o.cancelButtonColor&&(n.style.backgroundColor=o.cancelButtonColor,C(n,p["default-outline"]))}(i,a,r,o),o.reverseButtons&&(o.toast?(s.insertBefore(r,i),s.insertBefore(a,i)):(s.insertBefore(r,n),s.insertBefore(a,n),s.insertBefore(i,n))),y(c,t.loaderHtml),w(c,t,"loader")};function Me(e,t,n){ge(e,n["show".concat(q(t),"Button")],"inline-block"),y(e,n["".concat(t,"ButtonText")]),e.setAttribute("aria-label",n["".concat(t,"ButtonAriaLabel")]),e.className=p[t],w(e,n,"".concat(t,"Button")),C(e,n["".concat(t,"ButtonClass")])}const Ie=(e,t)=>{var n,o,i=m();i&&(o=i,"string"==typeof(n=t.backdrop)?o.style.background=n:n||C([document.documentElement,document.body],p["no-backdrop"]),o=i,(n=t.position)in p?C(o,p[n]):(a('The "position" parameter is not valid, defaulting to "center"'),C(o,p.center)),n=i,(o=t.grow)&&"string"==typeof o&&(o="grow-".concat(o))in p&&C(n,p[o]),w(i,t,"container"))};var L={awaitingPromise:new WeakMap,promise:new WeakMap,innerParams:new WeakMap,domCache:new WeakMap};const De=["input","file","range","select","radio","checkbox","textarea"],He=(e,r)=>{const s=g();var t,e=L.innerParams.get(e);const c=!e||r.input!==e.input;De.forEach(e=>{const t=k(s,p[e]);{var n=e,o=r.inputAttributes;const i=ue(g(),n);if(i){qe(i);for(const a in o)i.setAttribute(a,o[a])}}t.className=p[e],c&&x(t)}),r.input&&(c&&(e=>{if(!O[e.input])return l('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(e.input,'"'));const t=Re(e.input),n=O[e.input](t,e);B(t),setTimeout(()=>{de(n)})})(r),e=r,t=Re(e.input),"object"==typeof e.customClass&&C(t,e.customClass.input))},qe=t=>{for(let e=0;e<t.attributes.length;e++){var n=t.attributes[e].name;["type","value","style"].includes(n)||t.removeAttribute(n)}},Ve=(e,t)=>{e.placeholder&&!t.inputPlaceholder||(e.placeholder=t.inputPlaceholder)},Ne=(e,t,n)=>{if(n.inputLabel){e.id=p.input;const i=document.createElement("label");var o=p["input-label"];i.setAttribute("for",e.id),i.className=o,"object"==typeof n.customClass&&C(i,n.customClass.inputLabel),i.innerText=n.inputLabel,t.insertAdjacentElement("beforebegin",i)}},Re=e=>k(g(),p[e]||p.input),Ue=(e,t)=>{["string","number"].includes(typeof t)?e.value="".concat(t):F(t)||a('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(typeof t,'"'))},O={},Fe=(O.text=O.email=O.password=O.number=O.tel=O.url=(e,t)=>(Ue(e,t.inputValue),Ne(e,e,t),Ve(e,t),e.type=t.input,e),O.file=(e,t)=>(Ne(e,e,t),Ve(e,t),e),O.range=(e,t)=>{const n=e.querySelector("input");var o=e.querySelector("output");return Ue(n,t.inputValue),n.type=t.input,Ue(o,t.inputValue),Ne(n,e,t),e},O.select=(e,t)=>{if(e.textContent="",t.inputPlaceholder){const n=document.createElement("option");y(n,t.inputPlaceholder),n.value="",n.disabled=!0,n.selected=!0,e.appendChild(n)}return Ne(e,e,t),e},O.radio=e=>(e.textContent="",e),O.checkbox=(e,t)=>{const n=ue(g(),"checkbox");n.value="1",n.id=p.checkbox,n.checked=Boolean(t.inputValue);e=e.querySelector("span");return y(e,t.inputPlaceholder),n},O.textarea=(n,e)=>{Ue(n,e.inputValue),Ve(n,e),Ne(n,n,e);return setTimeout(()=>{if("MutationObserver"in window){const t=parseInt(window.getComputedStyle(g()).width);new MutationObserver(()=>{var e=n.offsetWidth+(e=n,parseInt(window.getComputedStyle(e).marginLeft)+parseInt(window.getComputedStyle(e).marginRight));e>t?g().style.width="".concat(e,"px"):g().style.width=null}).observe(n,{attributes:!0,attributeFilter:["style"]})}}),n},(e,t)=>{const n=$();w(n,t,"htmlContainer"),t.html?(Se(t.html,n),B(n,"block")):t.text?(n.textContent=t.text,B(n,"block")):x(n),He(e,t)}),We=(e,t)=>{var n=ne();ge(n,t.footer),t.footer&&Se(t.footer,n),w(n,t,"footer")},ze=(e,t)=>{const n=ie();y(n,t.closeButtonHtml),w(n,t,"closeButton"),ge(n,t.showCloseButton),n.setAttribute("aria-label",t.closeButtonAriaLabel)},_e=(e,t)=>{var e=L.innerParams.get(e),n=s();return e&&t.icon===e.icon?(Xe(n,t),void Ke(n,t)):t.icon||t.iconHtml?t.icon&&-1===Object.keys(o).indexOf(t.icon)?(l('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(t.icon,'"')),x(n)):(B(n),Xe(n,t),Ke(n,t),void C(n,t.showClass.icon)):x(n)},Ke=(e,t)=>{for(const n in o)t.icon!==n&&A(e,o[n]);C(e,o[t.icon]),$e(e,t),Ye(),w(e,t,"icon")},Ye=()=>{const e=g();var t=window.getComputedStyle(e).getPropertyValue("background-color");const n=e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");for(let e=0;e<n.length;e++)n[e].style.backgroundColor=t},Ze='\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n',Je='\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n',Xe=(e,t)=>{var n;e.textContent="",t.iconHtml?y(e,Qe(t.iconHtml)):"success"===t.icon?y(e,Ze):"error"===t.icon?y(e,Je):(n={question:"?",warning:"!",info:"i"},y(e,Qe(n[t.icon])))},$e=(e,t)=>{if(t.iconColor){e.style.color=t.iconColor,e.style.borderColor=t.iconColor;for(const n of[".swal2-success-line-tip",".swal2-success-line-long",".swal2-x-mark-line-left",".swal2-x-mark-line-right"])me(e,n,"backgroundColor",t.iconColor);me(e,".swal2-success-ring","borderColor",t.iconColor)}},Qe=e=>'<div class="'.concat(p["icon-content"],'">').concat(e,"</div>"),Ge=(e,t)=>{const n=Q();if(!t.imageUrl)return x(n);B(n,""),n.setAttribute("src",t.imageUrl),n.setAttribute("alt",t.imageAlt),P(n,"width",t.imageWidth),P(n,"height",t.imageHeight),n.className=p.image,w(n,t,"image")},et=(e,n)=>{const o=G();if(!n.progressSteps||0===n.progressSteps.length)return x(o);B(o),o.textContent="",n.currentProgressStep>=n.progressSteps.length&&a("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),n.progressSteps.forEach((e,t)=>{var e=(e=>{const t=document.createElement("li");return C(t,p["progress-step"]),y(t,e),t})(e);o.appendChild(e),t===n.currentProgressStep&&C(e,p["active-progress-step"]),t!==n.progressSteps.length-1&&(e=(e=>{const t=document.createElement("li");if(C(t,p["progress-step-line"]),e.progressStepsDistance)P(t,"width",e.progressStepsDistance);return t})(n),o.appendChild(e))})},tt=(e,t)=>{const n=X();ge(n,t.title||t.titleText,"block"),t.title&&Se(t.title,n),t.titleText&&(n.innerText=t.titleText),w(n,t,"title")},nt=(e,t)=>{var n=m();const o=g();t.toast?(P(n,"width",t.width),o.style.width="100%",o.insertBefore(d(),s())):P(o,"width",t.width),P(o,"padding",t.padding),t.color&&(o.style.color=t.color),t.background&&(o.style.background=t.background),x(ee());n=o;(n.className="".concat(p.popup," ").concat(E(n)?t.showClass.popup:""),t.toast)?(C([document.documentElement,document.body],p["toast-shown"]),C(n,p.toast)):C(n,p.modal);w(n,t,"popup"),"string"==typeof t.customClass&&C(n,t.customClass);t.icon&&C(n,p["icon-".concat(t.icon)])},ot=(e,t)=>{nt(e,t),Ie(e,t),et(e,t),_e(e,t),Ge(e,t),tt(e,t),ze(e,t),Fe(e,t),je(e,t),We(e,t),"function"==typeof t.didRender&&t.didRender(g())},j=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"}),it=()=>{const e=i(document.body.children);e.forEach(e=>{e===m()||e.contains(m())||(e.hasAttribute("aria-hidden")&&e.setAttribute("data-previous-aria-hidden",e.getAttribute("aria-hidden")),e.setAttribute("aria-hidden","true"))})},at=()=>{const e=i(document.body.children);e.forEach(e=>{e.hasAttribute("data-previous-aria-hidden")?(e.setAttribute("aria-hidden",e.getAttribute("data-previous-aria-hidden")),e.removeAttribute("data-previous-aria-hidden")):e.removeAttribute("aria-hidden")})},rt=["swal-title","swal-html","swal-footer"],st=e=>{const n={};return i(e.querySelectorAll("swal-param")).forEach(e=>{M(e,["name","value"]);var t=e.getAttribute("name"),e=e.getAttribute("value");"boolean"==typeof r[t]&&"false"===e&&(n[t]=!1),"object"==typeof r[t]&&(n[t]=JSON.parse(e))}),n},ct=e=>{const n={};return i(e.querySelectorAll("swal-button")).forEach(e=>{M(e,["type","color","aria-label"]);var t=e.getAttribute("type");n["".concat(t,"ButtonText")]=e.innerHTML,n["show".concat(q(t),"Button")]=!0,e.hasAttribute("color")&&(n["".concat(t,"ButtonColor")]=e.getAttribute("color")),e.hasAttribute("aria-label")&&(n["".concat(t,"ButtonAriaLabel")]=e.getAttribute("aria-label"))}),n},lt=e=>{const t={},n=e.querySelector("swal-image");return n&&(M(n,["src","width","height","alt"]),n.hasAttribute("src")&&(t.imageUrl=n.getAttribute("src")),n.hasAttribute("width")&&(t.imageWidth=n.getAttribute("width")),n.hasAttribute("height")&&(t.imageHeight=n.getAttribute("height")),n.hasAttribute("alt")&&(t.imageAlt=n.getAttribute("alt"))),t},ut=e=>{const t={},n=e.querySelector("swal-icon");return n&&(M(n,["type","color"]),n.hasAttribute("type")&&(t.icon=n.getAttribute("type")),n.hasAttribute("color")&&(t.iconColor=n.getAttribute("color")),t.iconHtml=n.innerHTML),t},dt=e=>{const n={},t=e.querySelector("swal-input");t&&(M(t,["type","label","placeholder","value"]),n.input=t.getAttribute("type")||"text",t.hasAttribute("label")&&(n.inputLabel=t.getAttribute("label")),t.hasAttribute("placeholder")&&(n.inputPlaceholder=t.getAttribute("placeholder")),t.hasAttribute("value")&&(n.inputValue=t.getAttribute("value")));e=e.querySelectorAll("swal-input-option");return e.length&&(n.inputOptions={},i(e).forEach(e=>{M(e,["value"]);var t=e.getAttribute("value"),e=e.innerHTML;n.inputOptions[t]=e})),n},pt=(e,t)=>{const n={};for(const o in t){const i=t[o],a=e.querySelector(i);a&&(M(a,[]),n[i.replace(/^swal-/,"")]=a.innerHTML.trim())}return n},mt=e=>{const t=rt.concat(["swal-param","swal-button","swal-image","swal-icon","swal-input","swal-input-option"]);i(e.children).forEach(e=>{e=e.tagName.toLowerCase();-1===t.indexOf(e)&&a("Unrecognized element <".concat(e,">"))})},M=(t,n)=>{i(t.attributes).forEach(e=>{-1===n.indexOf(e.name)&&a(['Unrecognized attribute "'.concat(e.name,'" on <').concat(t.tagName.toLowerCase(),">."),"".concat(n.length?"Allowed attributes are: ".concat(n.join(", ")):"To set the value, use HTML within the element.")])})};var gt={email:(e,t)=>/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid email address"),url:(e,t)=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid URL")};function ht(e){(t=e).inputValidator||Object.keys(gt).forEach(e=>{t.input===e&&(t.inputValidator=gt[e])}),e.showLoaderOnConfirm&&!e.preConfirm&&a("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"),(n=e).target&&("string"!=typeof n.target||document.querySelector(n.target))&&("string"==typeof n.target||n.target.appendChild)||(a('Target parameter is not valid, defaulting to "body"'),n.target="body"),"string"==typeof e.title&&(e.title=e.title.split("\n").join("<br />"));var t,n=e,e=ke();if(ye())l("SweetAlert2 requires document to initialize");else{const o=document.createElement("div"),i=(o.className=p.container,e&&C(o,p["no-transition"]),y(o,Ae),Be(n.target));i.appendChild(o),xe(n),Ee(i),Pe(),Te(o,n)}}class ft{constructor(e,t){this.callback=e,this.remaining=t,this.running=!1,this.start()}start(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}stop(){return this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=(new Date).getTime()-this.started.getTime()),this.remaining}increase(e){var t=this.running;return t&&this.stop(),this.remaining+=e,t&&this.start(),this.remaining}getTimerLeft(){return this.running&&(this.stop(),this.start()),this.remaining}isRunning(){return this.running}}const bt=()=>{null===c.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(c.previousBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight="".concat(c.previousBodyPadding+(()=>{const e=document.createElement("div");e.className=p["scrollbar-measure"],document.body.appendChild(e);var t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t})(),"px"))},yt=()=>{null!==c.previousBodyPadding&&(document.body.style.paddingRight="".concat(c.previousBodyPadding,"px"),c.previousBodyPadding=null)},vt=()=>{if((/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream||"MacIntel"===navigator.platform&&1<navigator.maxTouchPoints)&&!v(document.body,p.iosfix)){var e,t=document.body.scrollTop;document.body.style.top="".concat(-1*t,"px"),C(document.body,p.iosfix);{const n=m();let t;n.ontouchstart=e=>{t=wt(e)},n.ontouchmove=e=>{t&&(e.preventDefault(),e.stopPropagation())}}{const o=navigator.userAgent,i=!!o.match(/iPad/i)||!!o.match(/iPhone/i),a=!!o.match(/WebKit/i),r=i&&a&&!o.match(/CriOS/i);r&&(e=44,g().scrollHeight>window.innerHeight-44&&(m().style.paddingBottom="".concat(44,"px")))}}},wt=e=>{var t,n=e.target,o=m();return!((t=e).touches&&t.touches.length&&"stylus"===t.touches[0].touchType||(t=e).touches&&1<t.touches.length)&&(n===o||!(fe(o)||"INPUT"===n.tagName||"TEXTAREA"===n.tagName||fe($())&&$().contains(n)))},Ct=()=>{var e;v(document.body,p.iosfix)&&(e=parseInt(document.body.style.top,10),A(document.body,p.iosfix),document.body.style.top="",document.body.scrollTop=-1*e)},At=10,kt=e=>{const t=g();if(e.target===t){const n=m();t.removeEventListener(Oe,kt),n.style.overflowY="auto"}},Pt=(e,t)=>{Oe&&be(t)?(e.style.overflowY="hidden",t.addEventListener(Oe,kt)):e.style.overflowY="auto"},Bt=(e,t,n)=>{vt(),t&&"hidden"!==n&&bt(),setTimeout(()=>{e.scrollTop=0})},xt=(e,t,n)=>{C(e,n.showClass.backdrop),t.style.setProperty("opacity","0","important"),B(t,"grid"),setTimeout(()=>{C(t,n.showClass.popup),t.style.removeProperty("opacity")},At),C([document.documentElement,document.body],p.shown),n.heightAuto&&n.backdrop&&!n.toast&&C([document.documentElement,document.body],p["height-auto"])},I=e=>{let t=g();t||new An,t=g();var n=d();if(se())x(s());else{var o=t;const i=te(),a=d();!e&&E(h())&&(e=h());B(i),e&&(x(e),a.setAttribute("data-button-to-replace",e.className));a.parentNode.insertBefore(a,e),C([o,i],p.loading)}B(n),t.setAttribute("data-loading",!0),t.setAttribute("aria-busy",!0),t.focus()},Et=(t,n)=>{const o=g(),i=e=>St[n.input](o,Lt(e),n);U(n.inputOptions)||F(n.inputOptions)?(I(h()),u(n.inputOptions).then(e=>{t.hideLoading(),i(e)})):"object"==typeof n.inputOptions?i(n.inputOptions):l("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(typeof n.inputOptions))},Tt=(t,n)=>{const o=t.getInput();x(o),u(n.inputValue).then(e=>{o.value="number"===n.input?parseFloat(e)||0:"".concat(e),B(o),o.focus(),t.hideLoading()}).catch(e=>{l("Error in inputValue promise: ".concat(e)),o.value="",B(o),o.focus(),t.hideLoading()})},St={select:(e,t,i)=>{const a=k(e,p.select),r=(e,t,n)=>{const o=document.createElement("option");o.value=n,y(o,t),o.selected=Ot(n,i.inputValue),e.appendChild(o)};t.forEach(e=>{var t=e[0];const n=e[1];if(Array.isArray(n)){const o=document.createElement("optgroup");o.label=t,o.disabled=!1,a.appendChild(o),n.forEach(e=>r(o,e[1],e[0]))}else r(a,n,t)}),a.focus()},radio:(e,t,a)=>{const r=k(e,p.radio),n=(t.forEach(e=>{var t=e[0],e=e[1];const n=document.createElement("input"),o=document.createElement("label"),i=(n.type="radio",n.name=p.radio,n.value=t,Ot(t,a.inputValue)&&(n.checked=!0),document.createElement("span"));y(i,e),i.className=p.label,o.appendChild(n),o.appendChild(i),r.appendChild(o)}),r.querySelectorAll("input"));n.length&&n[0].focus()}},Lt=n=>{const o=[];return"undefined"!=typeof Map&&n instanceof Map?n.forEach((e,t)=>{let n=e;"object"==typeof n&&(n=Lt(n)),o.push([t,n])}):Object.keys(n).forEach(e=>{let t=n[e];"object"==typeof t&&(t=Lt(t)),o.push([e,t])}),o},Ot=(e,t)=>t&&t.toString()===e.toString();function jt(){var e,t=L.innerParams.get(this);if(t){const n=L.domCache.get(this);x(n.loader),se()?t.icon&&B(s()):(t=n,(e=t.popup.getElementsByClassName(t.loader.getAttribute("data-button-to-replace"))).length?B(e[0],"inline-block"):he()&&x(t.actions)),A([n.popup,n.actions],p.loading),n.popup.removeAttribute("aria-busy"),n.popup.removeAttribute("data-loading"),n.confirmButton.disabled=!1,n.denyButton.disabled=!1,n.cancelButton.disabled=!1}}var Mt={swalPromiseResolve:new WeakMap,swalPromiseReject:new WeakMap};const It=()=>h()&&h().click();const Dt=e=>{e.keydownTarget&&e.keydownHandlerAdded&&(e.keydownTarget.removeEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!1)},Ht=(e,t,n)=>{const o=ae();if(o.length)return(t+=n)===o.length?t=0:-1===t&&(t=o.length-1),o[t].focus();g().focus()},qt=["ArrowRight","ArrowDown"],Vt=["ArrowLeft","ArrowUp"],Nt=(e,n,t)=>{var o=L.innerParams.get(e);if(o&&(!n.isComposing&&229!==n.keyCode))if(o.stopKeydownPropagation&&n.stopPropagation(),"Enter"===n.key)e=e,s=n,i=o,R(i.allowEnterKey)&&s.target&&e.getInput()&&s.target.outerHTML===e.getInput().outerHTML&&(["textarea","file"].includes(i.input)||(It(),s.preventDefault()));else if("Tab"===n.key){e=n;var i=o;var a=e.target,r=ae();let t=-1;for(let e=0;e<r.length;e++)if(a===r[e]){t=e;break}e.shiftKey?Ht(i,t,-1):Ht(i,t,1);e.stopPropagation(),e.preventDefault()}else if([...qt,...Vt].includes(n.key)){var s=n.key;const l=h(),u=f(),d=b();if([l,u,d].includes(document.activeElement)){var c=qt.includes(s)?"nextElementSibling":"previousElementSibling";let t=document.activeElement;for(let e=0;e<te().children.length;e++){if(!(t=t[c]))return;if(E(t)&&t instanceof HTMLButtonElement)break}t instanceof HTMLButtonElement&&t.focus()}}else if("Escape"===n.key){e=n,n=o,o=t;if(R(n.allowEscapeKey)){e.preventDefault();o(j.esc)}}};function Rt(e,t,n,o){se()?zt(e,o):(Ce(n).then(()=>zt(e,o)),Dt(T)),/^((?!chrome|android).)*safari/i.test(navigator.userAgent)?(t.setAttribute("style","display:none !important"),t.removeAttribute("class"),t.innerHTML=""):t.remove(),re()&&(yt(),Ct(),at()),A([document.documentElement,document.body],[p.shown,p["height-auto"],p["no-backdrop"],p["toast-shown"]])}function Ut(e){e=void 0!==(n=e)?Object.assign({isConfirmed:!1,isDenied:!1,isDismissed:!1},n):{isConfirmed:!1,isDenied:!1,isDismissed:!0};const t=Mt.swalPromiseResolve.get(this);var n=(e=>{const t=g();if(!t)return false;const n=L.innerParams.get(e);if(!n||v(t,n.hideClass.popup))return false;A(t,n.showClass.popup),C(t,n.hideClass.popup);const o=m();return A(o,n.showClass.backdrop),C(o,n.hideClass.backdrop),Wt(e,t,n),true})(this);this.isAwaitingPromise()?e.isDismissed||(Ft(this),t(e)):n&&t(e)}const Ft=e=>{e.isAwaitingPromise()&&(L.awaitingPromise.delete(e),L.innerParams.get(e)||e._destroy())},Wt=(e,t,n)=>{var o,i,a,r=m(),s=Oe&&be(t);"function"==typeof n.willClose&&n.willClose(t),s?(s=e,o=t,t=r,i=n.returnFocus,a=n.didClose,T.swalCloseEventFinishedCallback=Rt.bind(null,s,t,i,a),o.addEventListener(Oe,function(e){e.target===o&&(T.swalCloseEventFinishedCallback(),delete T.swalCloseEventFinishedCallback)})):Rt(e,r,n.returnFocus,n.didClose)},zt=(e,t)=>{setTimeout(()=>{"function"==typeof t&&t.bind(e.params)(),e._destroy()})};function _t(e,t,n){const o=L.domCache.get(e);t.forEach(e=>{o[e].disabled=n})}function Kt(e,t){if(!e)return!1;if("radio"===e.type){const n=e.parentNode.parentNode,o=n.querySelectorAll("input");for(let e=0;e<o.length;e++)o[e].disabled=t}else e.disabled=t}const Yt=e=>{e.isAwaitingPromise()?(Zt(L,e),L.awaitingPromise.set(e,!0)):(Zt(Mt,e),Zt(L,e))},Zt=(e,t)=>{for(const n in e)e[n].delete(t)};e=Object.freeze({hideLoading:jt,disableLoading:jt,getInput:function(e){var t=L.innerParams.get(e||this);return(e=L.domCache.get(e||this))?ue(e.popup,t.input):null},close:Ut,isAwaitingPromise:function(){return!!L.awaitingPromise.get(this)},rejectPromise:function(e){const t=Mt.swalPromiseReject.get(this);Ft(this),t&&t(e)},handleAwaitingPromise:Ft,closePopup:Ut,closeModal:Ut,closeToast:Ut,enableButtons:function(){_t(this,["confirmButton","denyButton","cancelButton"],!1)},disableButtons:function(){_t(this,["confirmButton","denyButton","cancelButton"],!0)},enableInput:function(){return Kt(this.getInput(),!1)},disableInput:function(){return Kt(this.getInput(),!0)},showValidationMessage:function(e){const t=L.domCache.get(this);var n=L.innerParams.get(this);y(t.validationMessage,e),t.validationMessage.className=p["validation-message"],n.customClass&&n.customClass.validationMessage&&C(t.validationMessage,n.customClass.validationMessage),B(t.validationMessage);const o=this.getInput();o&&(o.setAttribute("aria-invalid",!0),o.setAttribute("aria-describedby",p["validation-message"]),de(o),C(o,p.inputerror))},resetValidationMessage:function(){var e=L.domCache.get(this);e.validationMessage&&x(e.validationMessage);const t=this.getInput();t&&(t.removeAttribute("aria-invalid"),t.removeAttribute("aria-describedby"),A(t,p.inputerror))},getProgressSteps:function(){return L.domCache.get(this).progressSteps},update:function(e){var t=g(),n=L.innerParams.get(this);if(!t||v(t,n.hideClass.popup))return a("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");t=(t=>{const n={};return Object.keys(t).forEach(e=>{if(Y(e))n[e]=t[e];else a("Invalid parameter to update: ".concat(e))}),n})(e),n=Object.assign({},n,t),ot(this,n),L.innerParams.set(this,n),Object.defineProperties(this,{params:{value:Object.assign({},this.params,e),writable:!1,enumerable:!0}})},_destroy:function(){var e=L.domCache.get(this);const t=L.innerParams.get(this);t?(e.popup&&T.swalCloseEventFinishedCallback&&(T.swalCloseEventFinishedCallback(),delete T.swalCloseEventFinishedCallback),T.deferDisposalTimer&&(clearTimeout(T.deferDisposalTimer),delete T.deferDisposalTimer),"function"==typeof t.didDestroy&&t.didDestroy(),e=this,Yt(e),delete e.params,delete T.keydownHandler,delete T.keydownTarget,delete T.currentInstance):Yt(this)}});const Jt=(e,t)=>{var n=L.innerParams.get(e);if(!n.input)return l('The "input" parameter is needed to be set when using returnInputValueOn'.concat(q(t)));var o=((e,t)=>{const n=e.getInput();if(!n)return null;switch(t.input){case"checkbox":return n.checked?1:0;case"radio":return(o=n).checked?o.value:null;case"file":return(o=n).files.length?null!==o.getAttribute("multiple")?o.files:o.files[0]:null;default:return t.inputAutoTrim?n.value.trim():n.value}var o})(e,n);if(n.inputValidator){var i=e;var a=o;var r=t;const s=L.innerParams.get(i),c=(i.disableInput(),Promise.resolve().then(()=>u(s.inputValidator(a,s.validationMessage))));c.then(e=>{i.enableButtons(),i.enableInput(),e?i.showValidationMessage(e):("deny"===r?Xt:Gt)(i,a)})}else e.getInput().checkValidity()?("deny"===t?Xt:Gt)(e,o):(e.enableButtons(),e.showValidationMessage(n.validationMessage))},Xt=(t,n)=>{const e=L.innerParams.get(t||void 0);if(e.showLoaderOnDeny&&I(f()),e.preDeny){L.awaitingPromise.set(t||void 0,!0);const o=Promise.resolve().then(()=>u(e.preDeny(n,e.validationMessage)));o.then(e=>{!1===e?(t.hideLoading(),Ft(t)):t.closePopup({isDenied:!0,value:void 0===e?n:e})}).catch(e=>Qt(t||void 0,e))}else t.closePopup({isDenied:!0,value:n})},$t=(e,t)=>{e.closePopup({isConfirmed:!0,value:t})},Qt=(e,t)=>{e.rejectPromise(t)},Gt=(t,n)=>{const e=L.innerParams.get(t||void 0);if(e.showLoaderOnConfirm&&I(),e.preConfirm){t.resetValidationMessage(),L.awaitingPromise.set(t||void 0,!0);const o=Promise.resolve().then(()=>u(e.preConfirm(n,e.validationMessage)));o.then(e=>{E(ee())||!1===e?(t.hideLoading(),Ft(t)):$t(t,void 0===e?n:e)}).catch(e=>Qt(t||void 0,e))}else $t(t,n)},en=(n,e,o)=>{e.popup.onclick=()=>{var e,t=L.innerParams.get(n);t&&((e=t).showConfirmButton||e.showDenyButton||e.showCancelButton||e.showCloseButton||t.timer||t.input)||o(j.close)}};let tn=!1;const nn=t=>{t.popup.onmousedown=()=>{t.container.onmouseup=function(e){t.container.onmouseup=void 0,e.target===t.container&&(tn=!0)}}},on=t=>{t.container.onmousedown=()=>{t.popup.onmouseup=function(e){t.popup.onmouseup=void 0,e.target!==t.popup&&!t.popup.contains(e.target)||(tn=!0)}}},an=(n,o,i)=>{o.container.onclick=e=>{var t=L.innerParams.get(n);tn?tn=!1:e.target===o.container&&R(t.allowOutsideClick)&&i(j.backdrop)}},rn=e=>"object"==typeof e&&e.jquery,sn=e=>e instanceof Element||rn(e);const cn=()=>{if(T.timeout){{const n=oe();var e=parseInt(window.getComputedStyle(n).width),t=(n.style.removeProperty("transition"),n.style.width="100%",parseInt(window.getComputedStyle(n).width)),e=e/t*100;n.style.removeProperty("transition"),n.style.width="".concat(e,"%")}return T.timeout.stop()}},ln=()=>{var e;if(T.timeout)return e=T.timeout.start(),ce(e),e};let un=!1;const dn={};const pn=t=>{for(let e=t.target;e&&e!==document;e=e.parentNode)for(const o in dn){var n=e.getAttribute(o);if(n)return void dn[o].fire({template:n})}};var mn=Object.freeze({isValidParameter:K,isUpdatableParameter:Y,isDeprecatedParameter:Z,argsToParams:n=>{const o={};return"object"!=typeof n[0]||sn(n[0])?["title","html","icon"].forEach((e,t)=>{t=n[t];"string"==typeof t||sn(t)?o[e]=t:void 0!==t&&l("Unexpected type of ".concat(e,'! Expected "string" or "Element", got ').concat(typeof t))}):Object.assign(o,n[0]),o},isVisible:()=>E(g()),clickConfirm:It,clickDeny:()=>f()&&f().click(),clickCancel:()=>b()&&b().click(),getContainer:m,getPopup:g,getTitle:X,getHtmlContainer:$,getImage:Q,getIcon:s,getInputLabel:()=>n(p["input-label"]),getCloseButton:ie,getActions:te,getConfirmButton:h,getDenyButton:f,getCancelButton:b,getLoader:d,getFooter:ne,getTimerProgressBar:oe,getFocusableElements:ae,getValidationMessage:ee,isLoading:()=>g().hasAttribute("data-loading"),fire:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return new this(...t)},mixin:function(n){class e extends this{_main(e,t){return super._main(e,Object.assign({},n,t))}}return e},showLoading:I,enableLoading:I,getTimerLeft:()=>T.timeout&&T.timeout.getTimerLeft(),stopTimer:cn,resumeTimer:ln,toggleTimer:()=>{var e=T.timeout;return e&&(e.running?cn:ln)()},increaseTimer:e=>{if(T.timeout)return e=T.timeout.increase(e),ce(e,!0),e},isTimerRunning:()=>T.timeout&&T.timeout.isRunning(),bindClickHandler:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"data-swal-template";dn[e]=this,un||(document.body.addEventListener("click",pn),un=!0)}});let gn;class D{constructor(){if("undefined"!=typeof window){gn=this;for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var o=Object.freeze(this.constructor.argsToParams(t)),o=(Object.defineProperties(this,{params:{value:o,writable:!1,enumerable:!0,configurable:!0}}),this._main(this.params));L.promise.set(this,o)}}_main(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=(J(Object.assign({},t,e)),T.currentInstance&&(T.currentInstance._destroy(),re()&&at()),T.currentInstance=this,fn(e,t)),t=(ht(e),Object.freeze(e),T.timeout&&(T.timeout.stop(),delete T.timeout),clearTimeout(T.restoreFocusTimeout),bn(this));return ot(this,e),L.innerParams.set(this,e),hn(this,t,e)}then(e){const t=L.promise.get(this);return t.then(e)}finally(e){const t=L.promise.get(this);return t.finally(e)}}const hn=(l,u,d)=>new Promise((e,t)=>{const n=e=>{l.closePopup({isDismissed:!0,dismiss:e})};var o,i,a;Mt.swalPromiseResolve.set(l,e),Mt.swalPromiseReject.set(l,t),u.confirmButton.onclick=()=>{var e=l,t=L.innerParams.get(e);e.disableButtons(),t.input?Jt(e,"confirm"):Gt(e,!0)},u.denyButton.onclick=()=>{var e=l,t=L.innerParams.get(e);e.disableButtons(),t.returnInputValueOnDeny?Jt(e,"deny"):Xt(e,!1)},u.cancelButton.onclick=()=>{var e=l,t=n;e.disableButtons(),t(j.cancel)},u.closeButton.onclick=()=>n(j.close),e=l,t=u,a=n,L.innerParams.get(e).toast?en(e,t,a):(nn(t),on(t),an(e,t,a)),o=l,e=T,t=d,i=n,Dt(e),t.toast||(e.keydownHandler=e=>Nt(o,e,i),e.keydownTarget=t.keydownListenerCapture?window:g(),e.keydownListenerCapture=t.keydownListenerCapture,e.keydownTarget.addEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!0),a=l,"select"===(t=d).input||"radio"===t.input?Et(a,t):["text","email","number","tel","textarea"].includes(t.input)&&(U(t.inputValue)||F(t.inputValue))&&(I(h()),Tt(a,t));{var r=d;const s=m(),c=g();"function"==typeof r.willOpen&&r.willOpen(c),e=window.getComputedStyle(document.body).overflowY,xt(s,c,r),setTimeout(()=>{Pt(s,c)},At),re()&&(Bt(s,r.scrollbarPadding,e),it()),se()||T.previousActiveElement||(T.previousActiveElement=document.activeElement),"function"==typeof r.didOpen&&setTimeout(()=>r.didOpen(c)),A(s,p["no-transition"])}yn(T,d,n),vn(u,d),setTimeout(()=>{u.container.scrollTop=0})}),fn=(e,t)=>{var n=(e=>{e="string"==typeof e.template?document.querySelector(e.template):e.template;if(!e)return{};e=e.content,mt(e),e=Object.assign(st(e),ct(e),lt(e),ut(e),dt(e),pt(e,rt));return e})(e);const o=Object.assign({},r,t,n,e);return o.showClass=Object.assign({},r.showClass,o.showClass),o.hideClass=Object.assign({},r.hideClass,o.hideClass),o},bn=e=>{var t={popup:g(),container:m(),actions:te(),confirmButton:h(),denyButton:f(),cancelButton:b(),loader:d(),closeButton:ie(),validationMessage:ee(),progressSteps:G()};return L.domCache.set(e,t),t},yn=(e,t,n)=>{var o=oe();x(o),t.timer&&(e.timeout=new ft(()=>{n("timer"),delete e.timeout},t.timer),t.timerProgressBar&&(B(o),w(o,t,"timerProgressBar"),setTimeout(()=>{e.timeout&&e.timeout.running&&ce(t.timer)})))},vn=(e,t)=>{if(!t.toast)return R(t.allowEnterKey)?void(wn(e,t)||Ht(t,-1,1)):Cn()},wn=(e,t)=>t.focusDeny&&E(e.denyButton)?(e.denyButton.focus(),!0):t.focusCancel&&E(e.cancelButton)?(e.cancelButton.focus(),!0):!(!t.focusConfirm||!E(e.confirmButton))&&(e.confirmButton.focus(),!0),Cn=()=>{document.activeElement instanceof HTMLElement&&"function"==typeof document.activeElement.blur&&document.activeElement.blur()},An=(Object.assign(D.prototype,e),Object.assign(D,mn),Object.keys(e).forEach(e=>{D[e]=function(){if(gn)return gn[e](...arguments)}}),D.DismissReason=j,D.version="11.4.14",D);return An.default=An}),void 0!==this&&this.Sweetalert2&&(this.swal=this.sweetAlert=this.Swal=this.SweetAlert=this.Sweetalert2);
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).keyboardJS=t()}(this,(function(){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function i(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}function r(e){return function(e){if(Array.isArray(e))return s(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}var o=function(){function n(e){t(this,n),this.sourceStr=e,this.subCombos=n.parseComboStr(e),this.keyNames=this.subCombos.reduce((function(e,t){return e.concat(t)}),[])}return i(n,[{key:"check",value:function(e){for(var t=0,n=0;n<this.subCombos.length;n+=1)if(-1===(t=this._checkSubCombo(this.subCombos[n],t,e)))return!1;return!0}},{key:"isEqual",value:function(t){if(!t||"string"!=typeof t&&"object"!==e(t))return!1;if("string"==typeof t&&(t=new n(t)),this.subCombos.length!==t.subCombos.length)return!1;for(var i=0;i<this.subCombos.length;i+=1)if(this.subCombos[i].length!==t.subCombos[i].length)return!1;for(var r=0;r<this.subCombos.length;r+=1){for(var s=this.subCombos[r],o=t.subCombos[r].slice(0),a=0;a<s.length;a+=1){var l=s[a],d=o.indexOf(l);d>-1&&o.splice(d,1)}if(0!==o.length)return!1}return!0}},{key:"_checkSubCombo",value:function(e,t,i){e=e.slice(0),i=i.slice(t);for(var r=t,s=0;s<e.length;s+=1){var o=e[s];if("\\"===o[0]){var a=o.slice(1);a!==n.comboDeliminator&&a!==n.keyDeliminator||(o=a)}var l=i.indexOf(o);if(l>-1&&(e.splice(s,1),s-=1,l>r&&(r=l),0===e.length))return r}return-1}}]),n}();o.comboDeliminator=">",o.keyDeliminator="+",o.parseComboStr=function(e){for(var t=o._splitStr(e,o.comboDeliminator),n=[],i=0;i<t.length;i+=1)n.push(o._splitStr(t[i],o.keyDeliminator));return n},o._splitStr=function(e,t){for(var n=e,i=t,r="",s=[],o=0;o<n.length;o+=1)o>0&&n[o]===i&&"\\"!==n[o-1]&&(s.push(r.trim()),r="",o+=1),r+=n[o];return r&&s.push(r.trim()),s};var a=function(){function e(n){t(this,e),this.localeName=n,this.activeTargetKeys=[],this.pressedKeys=[],this._appliedMacros=[],this._keyMap={},this._killKeyCodes=[],this._macros=[]}return i(e,[{key:"bindKeyCode",value:function(e,t){"string"==typeof t&&(t=[t]),this._keyMap[e]=t}},{key:"bindMacro",value:function(e,t){"string"==typeof t&&(t=[t]);var n=null;"function"==typeof t&&(n=t,t=null);var i={keyCombo:new o(e),keyNames:t,handler:n};this._macros.push(i)}},{key:"getKeyCodes",value:function(e){var t=[];for(var n in this._keyMap){this._keyMap[n].indexOf(e)>-1&&t.push(0|n)}return t}},{key:"getKeyNames",value:function(e){return this._keyMap[e]||[]}},{key:"setKillKey",value:function(e){if("string"!=typeof e)this._killKeyCodes.push(e);else for(var t=this.getKeyCodes(e),n=0;n<t.length;n+=1)this.setKillKey(t[n])}},{key:"pressKey",value:function(e){if("string"!=typeof e){this.activeTargetKeys.length=0;for(var t=this.getKeyNames(e),n=0;n<t.length;n+=1)this.activeTargetKeys.push(t[n]),-1===this.pressedKeys.indexOf(t[n])&&this.pressedKeys.push(t[n]);this._applyMacros()}else for(var i=this.getKeyCodes(e),r=0;r<i.length;r+=1)this.pressKey(i[r])}},{key:"releaseKey",value:function(e){if("string"==typeof e)for(var t=this.getKeyCodes(e),n=0;n<t.length;n+=1)this.releaseKey(t[n]);else{var i=this.getKeyNames(e);if(-1!==this._killKeyCodes.indexOf(e))this.pressedKeys.length=0;else for(var r=0;r<i.length;r+=1){var s=this.pressedKeys.indexOf(i[r]);s>-1&&this.pressedKeys.splice(s,1)}this.activeTargetKeys.length=0,this._clearMacros()}}},{key:"_applyMacros",value:function(){for(var e=this._macros.slice(0),t=0;t<e.length;t+=1){var n=e[t];if(n.keyCombo.check(this.pressedKeys)){n.handler&&(n.keyNames=n.handler(this.pressedKeys));for(var i=0;i<n.keyNames.length;i+=1)-1===this.pressedKeys.indexOf(n.keyNames[i])&&this.pressedKeys.push(n.keyNames[i]);this._appliedMacros.push(n)}}}},{key:"_clearMacros",value:function(){for(var e=0;e<this._appliedMacros.length;e+=1){var t=this._appliedMacros[e];if(!t.keyCombo.check(this.pressedKeys)){for(var n=0;n<t.keyNames.length;n+=1){var i=this.pressedKeys.indexOf(t.keyNames[n]);i>-1&&this.pressedKeys.splice(i,1)}t.handler&&(t.keyNames=null),this._appliedMacros.splice(e,1),e-=1}}}}]),e}(),l=function(){function n(e,i,r,s){t(this,n),this._locale=null,this._currentContext="",this._contexts={},this._listeners=[],this._appliedListeners=[],this._locales={},this._targetElement=null,this._targetWindow=null,this._targetPlatform="",this._targetUserAgent="",this._isModernBrowser=!1,this._targetKeyDownBinding=null,this._targetKeyUpBinding=null,this._targetResetBinding=null,this._paused=!1,this._contexts.global={listeners:this._listeners,targetWindow:e,targetElement:i,targetPlatform:r,targetUserAgent:s},this.setContext("global")}return i(n,[{key:"setLocale",value:function(e,t){var n=null;return"string"==typeof e?t?t(n=new a(e),this._targetPlatform,this._targetUserAgent):n=this._locales[e]||null:e=(n=e)._localeName,this._locale=n,this._locales[e]=n,n&&(this._locale.pressedKeys=n.pressedKeys),this}},{key:"getLocale",value:function(e){return e||(e=this._locale.localeName),this._locales[e]||null}},{key:"bind",value:function(t,n,i,r){if(null!==t&&"function"!=typeof t||(r=i,i=n,n=t,t=null),t&&"object"===e(t)&&"number"==typeof t.length){for(var s=0;s<t.length;s+=1)this.bind(t[s],n,i);return this}return this._listeners.push({keyCombo:t?new o(t):null,pressHandler:n||null,releaseHandler:i||null,preventRepeat:r||!1,preventRepeatByDefault:r||!1,executingHandler:!1}),this}},{key:"addListener",value:function(e,t,n,i){return this.bind(e,t,n,i)}},{key:"on",value:function(e,t,n,i){return this.bind(e,t,n,i)}},{key:"bindPress",value:function(e,t,n){return this.bind(e,t,null,n)}},{key:"bindRelease",value:function(e,t){return this.bind(e,null,t,preventRepeatByDefault)}},{key:"unbind",value:function(t,n,i){if(null!==t&&"function"!=typeof t||(i=n,n=t,t=null),t&&"object"===e(t)&&"number"==typeof t.length){for(var r=0;r<t.length;r+=1)this.unbind(t[r],n,i);return this}for(var s=0;s<this._listeners.length;s+=1){var o=this._listeners[s],a=!t&&!o.keyCombo||o.keyCombo&&o.keyCombo.isEqual(t),l=!n&&!i||!n&&!o.pressHandler||n===o.pressHandler,d=!n&&!i||!i&&!o.releaseHandler||i===o.releaseHandler;a&&l&&d&&(this._listeners.splice(s,1),s-=1)}return this}},{key:"removeListener",value:function(e,t,n){return this.unbind(e,t,n)}},{key:"off",value:function(e,t,n){return this.unbind(e,t,n)}},{key:"setContext",value:function(e){if(this._locale&&this.releaseAllKeys(),!this._contexts[e]){var t=this._contexts.global;this._contexts[e]={listeners:[],targetWindow:t.targetWindow,targetElement:t.targetElement,targetPlatform:t.targetPlatform,targetUserAgent:t.targetUserAgent}}var n=this._contexts[e];return this._currentContext=e,this._listeners=n.listeners,this.stop(),this.watch(n.targetWindow,n.targetElement,n.targetPlatform,n.targetUserAgent),this}},{key:"getContext",value:function(){return this._currentContext}},{key:"withContext",value:function(e,t){var n=this.getContext();return this.setContext(e),t(),this.setContext(n),this}},{key:"watch",value:function(e,t,n,i){var r=this;this.stop();var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:{};if(!e){if(!s.addEventListener&&!s.attachEvent)throw new Error("Cannot find window functions addEventListener or attachEvent.");e=s}if("number"==typeof e.nodeType&&(i=n,n=t,t=e,e=s),!e.addEventListener&&!e.attachEvent)throw new Error("Cannot find addEventListener or attachEvent methods on targetWindow.");this._isModernBrowser=!!e.addEventListener;var o=e.navigator&&e.navigator.userAgent||"",a=e.navigator&&e.navigator.platform||"";t&&null!==t||(t=e.document),n&&null!==n||(n=a),i&&null!==i||(i=o),this._targetKeyDownBinding=function(e){r.pressKey(e.keyCode,e),r._handleCommandBug(e,a)},this._targetKeyUpBinding=function(e){r.releaseKey(e.keyCode,e)},this._targetResetBinding=function(e){r.releaseAllKeys(e)},this._bindEvent(t,"keydown",this._targetKeyDownBinding),this._bindEvent(t,"keyup",this._targetKeyUpBinding),this._bindEvent(e,"focus",this._targetResetBinding),this._bindEvent(e,"blur",this._targetResetBinding),this._targetElement=t,this._targetWindow=e,this._targetPlatform=n,this._targetUserAgent=i;var l=this._contexts[this._currentContext];return l.targetWindow=this._targetWindow,l.targetElement=this._targetElement,l.targetPlatform=this._targetPlatform,l.targetUserAgent=this._targetUserAgent,this}},{key:"stop",value:function(){if(this._targetElement&&this._targetWindow)return this._unbindEvent(this._targetElement,"keydown",this._targetKeyDownBinding),this._unbindEvent(this._targetElement,"keyup",this._targetKeyUpBinding),this._unbindEvent(this._targetWindow,"focus",this._targetResetBinding),this._unbindEvent(this._targetWindow,"blur",this._targetResetBinding),this._targetWindow=null,this._targetElement=null,this}},{key:"pressKey",value:function(e,t){if(this._paused)return this;if(!this._locale)throw new Error("Locale not set");return this._locale.pressKey(e),this._applyBindings(t),this}},{key:"releaseKey",value:function(e,t){if(this._paused)return this;if(!this._locale)throw new Error("Locale not set");return this._locale.releaseKey(e),this._clearBindings(t),this}},{key:"releaseAllKeys",value:function(e){if(this._paused)return this;if(!this._locale)throw new Error("Locale not set");return this._locale.pressedKeys.length=0,this._clearBindings(e),this}},{key:"pause",value:function(){return this._paused||(this._locale&&this.releaseAllKeys(),this._paused=!0),this}},{key:"resume",value:function(){return this._paused=!1,this}},{key:"reset",value:function(){return this.releaseAllKeys(),this._listeners.length=0,this}},{key:"_bindEvent",value:function(e,t,n){return this._isModernBrowser?e.addEventListener(t,n,!1):e.attachEvent("on"+t,n)}},{key:"_unbindEvent",value:function(e,t,n){return this._isModernBrowser?e.removeEventListener(t,n,!1):e.detachEvent("on"+t,n)}},{key:"_getGroupedListeners",value:function(){var e=[],t=[],n=this._listeners;return"global"!==this._currentContext&&(n=[].concat(r(n),r(this._contexts.global.listeners))),n.sort((function(e,t){return(t.keyCombo?t.keyCombo.keyNames.length:0)-(e.keyCombo?e.keyCombo.keyNames.length:0)})).forEach((function(n){for(var i=-1,r=0;r<t.length;r+=1)(null===t[r]&&null===n.keyCombo||null!==t[r]&&t[r].isEqual(n.keyCombo))&&(i=r);-1===i&&(i=t.length,t.push(n.keyCombo)),e[i]||(e[i]=[]),e[i].push(n)})),e}},{key:"_applyBindings",value:function(e){var t=this,n=!1;e||(e={}),e.preventRepeat=function(){n=!0},e.pressedKeys=this._locale.pressedKeys.slice(0);for(var i=this._locale.activeTargetKeys,r=this._locale.pressedKeys.slice(0),s=this._getGroupedListeners(),o=function(o){var a=s[o],l=a[0].keyCombo;if(null===l||l.check(r)&&i.some((function(e){return l.keyNames.includes(e)}))){for(var d=0;d<a.length;d+=1){var u=a[d];u.executingHandler||!u.pressHandler||u.preventRepeat||(u.executingHandler=!0,u.pressHandler.call(t,e),u.executingHandler=!1,(n||u.preventRepeatByDefault)&&(u.preventRepeat=!0,n=!1)),-1===t._appliedListeners.indexOf(u)&&t._appliedListeners.push(u)}if(l)for(var h=0;h<l.keyNames.length;h+=1){var c=r.indexOf(l.keyNames[h]);-1!==c&&(r.splice(c,1),h-=1)}}},a=0;a<s.length;a+=1)o(a)}},{key:"_clearBindings",value:function(e){e||(e={}),e.pressedKeys=this._locale.pressedKeys.slice(0);for(var t=0;t<this._appliedListeners.length;t+=1){var n=this._appliedListeners[t],i=n.keyCombo;null!==i&&i.check(this._locale.pressedKeys)||(n.preventRepeat=!1,null===i&&0!==e.pressedKeys.length||(this._appliedListeners.splice(t,1),t-=1),!n.executingHandler&&n.releaseHandler&&(n.executingHandler=!0,n.releaseHandler.call(this,e),n.executingHandler=!1))}}},{key:"_handleCommandBug",value:function(e,t){t.match("Mac")&&this._locale.pressedKeys.includes("command")&&!["shift","ctrl","alt","capslock","tab","command"].includes(this._locale.getKeyNames(e.keyCode)[0])&&this._targetKeyUpBinding(e)}}]),n}();var d=new l;return d.setLocale("us",(function(e,t,n){e.bindKeyCode(3,["cancel"]),e.bindKeyCode(8,["backspace"]),e.bindKeyCode(9,["tab"]),e.bindKeyCode(12,["clear"]),e.bindKeyCode(13,["enter"]),e.bindKeyCode(16,["shift"]),e.bindKeyCode(17,["ctrl"]),e.bindKeyCode(18,["alt","menu"]),e.bindKeyCode(19,["pause","break"]),e.bindKeyCode(20,["capslock"]),e.bindKeyCode(27,["escape","esc"]),e.bindKeyCode(32,["space","spacebar"]),e.bindKeyCode(33,["pageup"]),e.bindKeyCode(34,["pagedown"]),e.bindKeyCode(35,["end"]),e.bindKeyCode(36,["home"]),e.bindKeyCode(37,["left"]),e.bindKeyCode(38,["up"]),e.bindKeyCode(39,["right"]),e.bindKeyCode(40,["down"]),e.bindKeyCode(41,["select"]),e.bindKeyCode(42,["printscreen"]),e.bindKeyCode(43,["execute"]),e.bindKeyCode(44,["snapshot"]),e.bindKeyCode(45,["insert","ins"]),e.bindKeyCode(46,["delete","del"]),e.bindKeyCode(47,["help"]),e.bindKeyCode(145,["scrolllock","scroll"]),e.bindKeyCode(188,["comma",","]),e.bindKeyCode(190,["period","."]),e.bindKeyCode(191,["slash","forwardslash","/"]),e.bindKeyCode(192,["graveaccent","`"]),e.bindKeyCode(219,["openbracket","["]),e.bindKeyCode(220,["backslash","\\"]),e.bindKeyCode(221,["closebracket","]"]),e.bindKeyCode(222,["apostrophe","'"]),e.bindKeyCode(48,["zero","0"]),e.bindKeyCode(49,["one","1"]),e.bindKeyCode(50,["two","2"]),e.bindKeyCode(51,["three","3"]),e.bindKeyCode(52,["four","4"]),e.bindKeyCode(53,["five","5"]),e.bindKeyCode(54,["six","6"]),e.bindKeyCode(55,["seven","7"]),e.bindKeyCode(56,["eight","8"]),e.bindKeyCode(57,["nine","9"]),e.bindKeyCode(96,["numzero","num0"]),e.bindKeyCode(97,["numone","num1"]),e.bindKeyCode(98,["numtwo","num2"]),e.bindKeyCode(99,["numthree","num3"]),e.bindKeyCode(100,["numfour","num4"]),e.bindKeyCode(101,["numfive","num5"]),e.bindKeyCode(102,["numsix","num6"]),e.bindKeyCode(103,["numseven","num7"]),e.bindKeyCode(104,["numeight","num8"]),e.bindKeyCode(105,["numnine","num9"]),e.bindKeyCode(106,["nummultiply","num*"]),e.bindKeyCode(107,["numadd","num+"]),e.bindKeyCode(108,["numenter"]),e.bindKeyCode(109,["numsubtract","num-"]),e.bindKeyCode(110,["numdecimal","num."]),e.bindKeyCode(111,["numdivide","num/"]),e.bindKeyCode(144,["numlock","num"]),e.bindKeyCode(112,["f1"]),e.bindKeyCode(113,["f2"]),e.bindKeyCode(114,["f3"]),e.bindKeyCode(115,["f4"]),e.bindKeyCode(116,["f5"]),e.bindKeyCode(117,["f6"]),e.bindKeyCode(118,["f7"]),e.bindKeyCode(119,["f8"]),e.bindKeyCode(120,["f9"]),e.bindKeyCode(121,["f10"]),e.bindKeyCode(122,["f11"]),e.bindKeyCode(123,["f12"]),e.bindKeyCode(124,["f13"]),e.bindKeyCode(125,["f14"]),e.bindKeyCode(126,["f15"]),e.bindKeyCode(127,["f16"]),e.bindKeyCode(128,["f17"]),e.bindKeyCode(129,["f18"]),e.bindKeyCode(130,["f19"]),e.bindKeyCode(131,["f20"]),e.bindKeyCode(132,["f21"]),e.bindKeyCode(133,["f22"]),e.bindKeyCode(134,["f23"]),e.bindKeyCode(135,["f24"]),e.bindMacro("shift + `",["tilde","~"]),e.bindMacro("shift + 1",["exclamation","exclamationpoint","!"]),e.bindMacro("shift + 2",["at","@"]),e.bindMacro("shift + 3",["number","#"]),e.bindMacro("shift + 4",["dollar","dollars","dollarsign","$"]),e.bindMacro("shift + 5",["percent","%"]),e.bindMacro("shift + 6",["caret","^"]),e.bindMacro("shift + 7",["ampersand","and","&"]),e.bindMacro("shift + 8",["asterisk","*"]),e.bindMacro("shift + 9",["openparen","("]),e.bindMacro("shift + 0",["closeparen",")"]),e.bindMacro("shift + -",["underscore","_"]),e.bindMacro("shift + =",["plus","+"]),e.bindMacro("shift + [",["opencurlybrace","opencurlybracket","{"]),e.bindMacro("shift + ]",["closecurlybrace","closecurlybracket","}"]),e.bindMacro("shift + \\",["verticalbar","|"]),e.bindMacro("shift + ;",["colon",":"]),e.bindMacro("shift + '",["quotationmark","'"]),e.bindMacro("shift + !,",["openanglebracket","<"]),e.bindMacro("shift + .",["closeanglebracket",">"]),e.bindMacro("shift + /",["questionmark","?"]),t.match("Mac")?e.bindMacro("command",["mod","modifier"]):e.bindMacro("ctrl",["mod","modifier"]);for(var i=65;i<=90;i+=1){var r=String.fromCharCode(i+32),s=String.fromCharCode(i);e.bindKeyCode(i,r),e.bindMacro("shift + "+r,s),e.bindMacro("capslock + "+r,s)}var o,a,l=n.match("Firefox")?59:186,d=n.match("Firefox")?173:189,u=n.match("Firefox")?61:187;t.match("Mac")&&(n.match("Safari")||n.match("Chrome"))?(o=91,a=93):t.match("Mac")&&n.match("Opera")?(o=17,a=17):t.match("Mac")&&n.match("Firefox")&&(o=224,a=224),e.bindKeyCode(l,["semicolon",";"]),e.bindKeyCode(d,["dash","-"]),e.bindKeyCode(u,["equal","equalsign","="]),e.bindKeyCode(o,["command","windows","win","super","leftcommand","leftwindows","leftwin","leftsuper"]),e.bindKeyCode(a,["command","windows","win","super","rightcommand","rightwindows","rightwin","rightsuper"]),e.setKillKey("command")})),d.Keyboard=l,d.Locale=a,d.KeyCombo=o,d}));

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs=e()}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

console.log('%c%s', 'color:blue', 'Auto-Task[Load]: 脚本开始加载');

(function() {
  var __webpack_modules__ = {
    108: function(__unused_webpack_module, exports) {
      !function(e, n) {
        true ? n(exports) : 0;
      }(this, function(e) {
        'use strict';
        var t = function() {
          return (t = Object.assign || function(e) {
            for (var n, o = 1, t = arguments.length; o < t; o++) {
              for (var r in n = arguments[o]) {
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
            }
            return e;
          }).apply(this, arguments);
        };
        function r(e, n, o) {
          if (o || 2 === arguments.length) {
            for (var t, r = 0, i = n.length; r < i; r++) {
              !t && r in n || ((t = t || Array.prototype.slice.call(n, 0, r))[r] = n[r]);
            }
          }
          return e.concat(t || Array.prototype.slice.call(n));
        }
        function d(e) {
          return '[object Object]' === n(e);
        }
        function l(e, n) {
          var o = r(r([], n || [], !0), [ '_' ], !1).join('|');
          return e.replace(new RegExp('(('.concat(o, ')[a-z])+'), 'g'), function(e, n) {
            return n.replace(new RegExp(o), '').toLocaleUpperCase();
          });
        }
        var n = function(e) {
          return Object.prototype.toString.call(e);
        };
        var o = (i.prototype.init = function() {
          try {
            this.getSystemName(), this.getBrowserName();
          } catch (e) {
            console.warn('[UA formatter error] '.concat(e));
          }
        }, i.prototype.getEngine = function() {
          var e = this.agent;
          return -1 !== e.indexOf('Trident') ? 'Trident' : -1 !== e.indexOf('Firefox') ? 'Gecko' : -1 !== e.indexOf('Presto') ? 'Presto' : 'WebKit';
        }, i.prototype.getSystemName = function() {
          var e, n = (this.agent.match(/^[a-z]+\/\d+\.\d+\s?\(([a-z\d\s:;./_-]+)\)/i) || [])[1];
          try {
            var o = '';
            if (/Windows/i.test(n)) {
              var t = (n.match(/NT\s(\d+\.\d+)/) || [])[1];
              switch (this.info.os = 'Windows', t) {
               case '6.3':
                o = '8.1';
                break;

               case '6.2':
                o = '8';
                break;

               case '6.1':
                o = '7';
                break;

               case '5.2':
               case '5.1':
                o = 'XP';
                break;

               default:
                o = t;
              }
              return this.info.device = 'PC', void (this.info.osVersion = o);
            }
            if (/^Macintosh/i.test(n)) {
              return o = (n.match(/X\s((\d+(_|\.))+\d+)/) || [])[1], this.info.os = 'Macintosh', 
              this.info.device = 'PC', void (this.info.osVersion = null !== (e = null == o ? void 0 : o.replace(/_/g, '.')) && void 0 !== e ? e : 'Unknown');
            }
            if (/^iPad/i.test(n)) {
              return o = (n.match(/((\d+_)+\d+)/) || [])[1], this.info.os = 'iPad', this.info.device = 'Tablet', 
              void (this.info.osVersion = o.replace(/_/g, '.'));
            }
            if (/^iPhone/i.test(n)) {
              return o = (n.match(/((\d+_)+\d+)/) || [])[1], this.info.os = 'iPhone', this.info.device = 'Mobile', 
              void (this.info.osVersion = o.replace(/_/g, '.'));
            }
            if (-1 !== n.indexOf('Android')) {
              var r = (n.match(/Android\s((\d+\.?)+\d?)/) || [])[1];
              return this.info.device = 'Mobile', this.info.os = 'Android', void (this.info.osVersion = r);
            }
            if (/Linux\s[a-z\d_]+/.test(n)) {
              return this.info.os = 'Linux', void (this.info.osVersion = 'Unknown');
            }
            this.info.os = 'Unknown', this.info.osVersion = 'Unknown';
          } catch (e) {
            this.info.os = 'Unknown', this.info.osVersion = 'Unknown';
          }
        }, i.prototype.getBrowserName = function() {
          var e = Object.keys(this.browserNameMap).map(function(e) {
            return new RegExp(''.concat(e, '(\\/|\\s)(\\d+\\.)+\\d+'));
          }), n = 1 < (n = (this.agent.match(/[a-z\d]+(\/|\s)(\d+\.)+\d+/gi) || []).filter(function(n) {
            return -1 !== e.findIndex(function(e) {
              return e.test(n);
            });
          })).length && !/^Safari/.test(n[n.length - 1]) ? n.reverse() : n;
          this.info = t(t({}, this.info), this._formatBrowserVersion(n[0]));
        }, i.prototype._formatBrowserVersion = function(e) {
          var n, o, t, r;
          try {
            for (var i = null !== (o = null === (n = e.match(/(?<name>[a-z\d]+)(\/|\s)(?<version>(\d+\.)+\d+)/i)) || void 0 === n ? void 0 : n.groups) && void 0 !== o ? o : {}, s = i.name, a = i.version, c = {}, f = 0, u = Object.entries(this.browserNameMap); f < u.length; f++) {
              var d = u[f], l = d[0], h = d[1];
              if (new RegExp(l).test(s)) {
                c = h;
                break;
              }
            }
            var p = {
              browserVersion: null != a ? a : 'Unknown',
              browser: null !== (t = c.en) && void 0 !== t ? t : 'Unknown',
              browserZH: null !== (r = (null == c ? void 0 : c.zh) || c.en) && void 0 !== r ? r : 'Unknown'
            };
            return 'Trident' === s && (p.browserVersion = {
              '4.0': 8,
              '5.0': 9,
              '6.0': 10,
              '7.0': 11
            }[a]), p;
          } catch (e) {
            return console.warn('[UA formatter error] '.concat(e)), {
              browser: 'Unknown',
              browserVersion: 'Unknown'
            };
          }
        }, i);
        function i(e) {
          this.agent = '', this.info = {
            browser: '',
            browserZH: '',
            browserVersion: '',
            os: '',
            osVersion: '',
            device: 'Unknown',
            engine: 'WebKit'
          }, this.browserNameMap = {
            MicroMessenger: {
              en: 'MicroMessenger',
              zh: '微信'
            },
            MetaSr: {
              en: 'MetaSr',
              zh: '搜狗浏览器'
            },
            'QQ(Browser)?': {
              en: 'QQBrowser',
              zh: 'QQ浏览器'
            },
            UCBrowser: {
              en: 'UCBrowser',
              zh: 'UC浏览器'
            },
            '2345Explorer': {
              en: '2345Explorer',
              zh: '2345极速浏览器'
            },
            Mb2345Browser: {
              en: 'Mb2345Browser',
              zh: '2345手机浏览器'
            },
            Trident: {
              en: 'Internet Explorer'
            },
            'Edge?': {
              en: 'Edge'
            },
            OPR: {
              en: 'Opera'
            },
            Vivaldi: {
              en: 'Vivaldi'
            },
            Firefox: {
              en: 'Firefox'
            },
            Chrome: {
              en: 'Chrome'
            },
            Safari: {
              en: 'Safari'
            }
          }, this.agent = e, this.init();
          var n = this.info, o = n.browser, e = n.browserVersion, n = n.osVersion;
          this.info = t(t({}, this.info), {
            engine: this.getEngine(),
            browserVersion: 'Safari' === o ? n : e
          });
        }
        function s() {
          this.cookies = {}, this.init();
        }
        var a = new (s.prototype.init = function() {
          var o = {};
          document.cookie.split(/;\s/).forEach(function(e) {
            var n = e.split(/=/), e = n[0], n = n[1];
            o[e] = n;
          }), this.cookies = o;
        }, s.prototype.getItem = function(e) {
          return this.cookies[e];
        }, s.prototype.getAllItems = function() {
          return this.cookies;
        }, s.prototype.setItem = function(e, n, o, t, r, i) {
          document.cookie = ''.concat(e, '=').concat(n).concat(o ? '; expires='.concat(o) : '').concat(t ? '; path='.concat(t) : '').concat(r ? '; domain='.concat(r) : '').concat(i ? '; secure' : '');
        }, s)();
        e.countDown = function e(n, o, t, r) {
          if (!window) {
            throw new Error('window is not defind.');
          }
          if (0 < n) {
            return r && r(), n--, window[o] = window.setTimeout(function() {
              e(n, o, t, r);
            }, 1e3), function() {
              return clearTimeout(window[o]);
            };
          }
          clearTimeout(window[o]), t && t();
        }, e.createRandomID = function(e) {
          void 0 === e && (e = 12);
          for (var n = [], o = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), t = o.length, r = 0; r < e; r++) {
            n.push(o[Math.round(Math.random() * t)]);
          }
          return n.join('');
        }, e.dCookie = a, e.debounce = function(o, t, r) {
          var i;
          void 0 === t && (t = 0);
          var s = r = void 0 === r ? !1 : r;
          return function() {
            var e = this, n = arguments;
            s && (o.apply(this, arguments), s = !1), clearTimeout(i), i = setTimeout(function() {
              r ? s = !0 : o.apply(e, n);
            }, t);
          };
        }, e.deepCopy = function e(n) {
          if (d(n) || Array.isArray(n)) {
            var o, t = Array.isArray(n) ? [] : {};
            for (o in n) {
              t[o] = e(n[o]);
            }
            return t;
          }
          return n;
        }, e.formatQueryParams = function(e) {
          e = null === (e = /\?(?<params>(.*)=.+)/.exec(decodeURIComponent(e))) || void 0 === e ? void 0 : e.groups;
          if (!e) {
            return {};
          }
          for (var n = e.params.split('&'), t = {}, o = 0; o < n.length; o++) {
            n[o].replace(/([^?&]*)=([^?&]*)/, function(e, n, o) {
              return t[n] = o, e;
            });
          }
          return t;
        }, e.formatThousandth = function(e) {
          var n = ''.concat(e).split('.'), e = n[0], n = n[1], n = void 0 === n ? '' : n, e = e.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
          return ''.concat(e).concat(n ? '.'.concat(n) : '');
        }, e.generateTree = function e(n, o, t, r) {
          for (var i = [], s = 0; s < n.length; s++) {
            var a = n[s];
            a[t] === o && (i.push(a), a.children = e(n, a[null != r ? r : 'id'], t, r));
          }
          return i;
        }, e.isEmpty = function(e) {
          return Array.isArray(e) ? 0 === e.length : d(e) ? 0 === Object.keys(e).length : [ '[object Set]', '[object Map]' ].includes(n(e)) ? 0 === e.size : [ null, void 0, '' ].includes(e);
        }, e.isFunction = function(e) {
          return '[object Function]' === n(e);
        }, e.isImageUrl = function(e) {
          return /\.((png)|(jpe?g)|(gif)|(svg)|(webp))$/gi.test(e);
        }, e.isObject = d, e.isRegexp = function(e) {
          return '[object RegExp]' === n(e);
        }, e.objectKeyToCamelCase = function e(n, o, t) {
          if (Array.isArray(n)) {
            for (var r = [], i = 0; i < n.length; i++) {
              r[i] = e(o && n[i][o] ? n[i][o] : n[i], o, t);
            }
          } else if (d(n)) {
            r = {};
            for (var s = o && n[o] ? n[o] : n, a = 0, c = Object.entries(s); a < c.length; a++) {
              var f = (u = c[a])[0], u = u[1];
              Array.isArray(u) || d(s) ? r[l(f, t)] = e(u, o, t) : r[l(f, t)] = u;
            }
          } else {
            r = n;
          }
          return r;
        }, e.realType = n, e.searchParams = function(e, n) {
          return void 0 === e && (e = null === location || void 0 === location ? void 0 : location.search), 
          new URLSearchParams(e).get(n);
        }, e.toLowerCamelCase = l, e.toUnderline = function(e) {
          return e.replace(/([A-Z])/g, function(e) {
            return '_'.concat(e.toLocaleLowerCase());
          });
        }, e.ua = function(e) {
          return void 0 === e && (e = navigator.userAgent), new o(e).info;
        }, Object.defineProperty(e, '__esModule', {
          value: !0
        });
      });
    },
    221: function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.d(__webpack_exports__, {
        Z: function() {
          return __WEBPACK_DEFAULT_EXPORT__;
        }
      });
      var _node_modules_pnpm_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(398);
      var _node_modules_pnpm_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_pnpm_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
      var _node_modules_pnpm_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
      var _node_modules_pnpm_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(_node_modules_pnpm_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
      var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_pnpm_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
      ___CSS_LOADER_EXPORT___.push([ module.id, '.colorful-button,#auto-task-buttons a.auto-task-website-btn,.show-button-div a.auto-task-website-btn,body.auto-task-options .auto-task-form table button{position:relative;padding:5px 10px;text-align:center;color:#fff;text-decoration:none;background:linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);border-radius:30px;background-size:400%;text-transform:capitalize}.colorful-button:hover,#auto-task-buttons a.auto-task-website-btn:hover,.show-button-div a.auto-task-website-btn:hover,body.auto-task-options .auto-task-form table button:hover{transform:scale(1.05);box-shadow:0 6px 20px rgba(0,0,0,.3);cursor:pointer}.colorful-button:hover::before,#auto-task-buttons a.auto-task-website-btn:hover::before,.show-button-div a.auto-task-website-btn:hover::before,body.auto-task-options .auto-task-form table button:hover::before{filter:blur(10px);opacity:1}.colorful-button::before,#auto-task-buttons a.auto-task-website-btn::before,.show-button-div a.auto-task-website-btn::before,body.auto-task-options .auto-task-form table button::before{content:"";position:absolute;top:-5px;left:-5px;right:-5px;bottom:-5px;z-index:-1;background:linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);border-radius:40px;background-size:400%;opacity:-1}#auto-task-info{position:fixed;bottom:10px;right:10px;width:60%;max-width:500px;max-height:60%;overflow-y:auto;color:#000;background-color:#fff;padding-left:5px;z-index:999999999 !important;border:solid 2px #add8e6;border-radius:10px}#auto-task-info li{text-align:left}#auto-task-info li a.high-light{color:#00aeff;font-weight:bold}#auto-task-info .success{color:green}#auto-task-info .error{color:red}#auto-task-info .warning{color:blue}#auto-task-info .info{color:#ff0}#auto-task-info .update-text{color:green;border:solid 2px #8dcb69;margin:5px 10px 5px 20px;border-radius:10px;padding:5px 20px}.auto-task-keylol{display:inline-block;text-transform:capitalize;margin-left:10px;text-decoration:none !important;border:solid 1px;border-radius:5px;padding:0 2px}.auto-task-keylol[selected=selected]{background-color:blue !important;color:#fff !important}.auto-task-form table{font-family:verdana,arial,sans-serif;font-size:11px;color:#333;border-width:1px;border-color:#999;border-collapse:collapse;width:100%}.auto-task-form table thead td{border-width:1px;padding:8px;border-style:solid;border-color:#a9c6c9;font-weight:bold;background-color:#fff}.auto-task-form table tbody tr{background-color:#d4e3e5}.auto-task-form table tbody tr:hover{background-color:#ff6 !important}.auto-task-form table tbody tr th{background-color:#c3dde0;border-width:1px;padding:8px;border-style:solid;border-color:#a9c6c9;text-transform:capitalize}.auto-task-form table tbody tr td{border-width:1px;padding:8px;border-style:solid;border-color:#a9c6c9}.swal2-modal{width:70% !important;max-width:1000px !important}body.auto-task-options{padding-top:10px;text-align:center}body.auto-task-options .auto-task-form{width:80%;max-width:1000px;margin:0 auto;padding-bottom:20px}body.auto-task-options .auto-task-form table input.editOption{width:80%}body.auto-task-options .auto-task-form table #getTwitterUserId,body.auto-task-options .auto-task-form table #getYoutubeChannelId{margin-top:5px}body.auto-task-options .auto-task-form table button{z-index:1}body.auto-task-options .auto-task-form table input[type=text]{outline-style:none;border:1px solid #ccc;border-radius:3px;padding:5px 10px;font-size:14px}body.auto-task-options .auto-task-form table input[type=text]:focus{border-color:#66afe9;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}body.auto-task-options .auto-task-form table label{position:relative;width:160px;height:80px;cursor:pointer;transform:scale(0.25);margin:-25% 0;top:-30px;display:inline-block}body.auto-task-options .auto-task-form table label input{position:relative;z-index:1;appearance:none}body.auto-task-options .auto-task-form table label input:checked~span{background:#05be05;box-shadow:0 15px 25px #05be0566}body.auto-task-options .auto-task-form table label input:checked~span i{left:84px}body.auto-task-options .auto-task-form table label input:checked~span i::before{background:#05be05;box-shadow:35px 0 0 #05be05}body.auto-task-options .auto-task-form table label input:checked~span i::after{bottom:12px;height:15px;border-bottom-left-radius:15px;border-bottom-right-radius:15px;background:#05be05}body.auto-task-options .auto-task-form table label span{position:absolute;top:0;left:0;width:100%;height:100%;background:#fe0000;border-radius:80px;transition:.5s;box-shadow:0 15px 25px #fe000066}body.auto-task-options .auto-task-form table label span i{position:absolute;top:4px;left:4px;width:72px;height:72px;background:#fff;border-radius:50%}body.auto-task-options .auto-task-form table label span i::before{content:"";position:absolute;top:22px;left:12px;width:12px;height:12px;border-radius:50%;background:#fe0000;box-shadow:35px 0 0 #fe0000;transition:.5s}body.auto-task-options .auto-task-form table label span i::after{content:"";position:absolute;bottom:15px;left:calc(50% - 15px);width:30px;height:6px;border-radius:6px;background:#fe0000;transition:.5s}body.auto-task-history{font-size:15px;font-weight:400;line-height:1.5}body.auto-task-history .container a{color:#007bff;text-decoration:none;background-color:transparent}body.auto-task-history .container .card{width:80%;max-width:800px;border-radius:10px;background:#7676761a;border-top:1px solid #ffffff80;-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);box-shadow:0 15px 25px #0000001a;margin:20px auto;position:relative;display:flex;flex-direction:column;word-wrap:break-word;-webkit-background-clip:border-box;background-clip:border-box;border:1px solid rgba(0,0,0,.125);border-radius:.25rem}body.auto-task-history .container .card .title{text-align:center;font-size:30px;font-weight:bold;margin:5px 0}body.auto-task-history .container .card .title a:hover{text-decoration:none;background:#93e1ff;border-radius:10px;padding:3px}body.auto-task-history .container .card ul{margin-bottom:25px}body.auto-task-history .container .card ul li{margin-bottom:5px;line-height:20px}body.auto-task-history .container .card ul a:hover{text-decoration:underline}body.auto-task-history .container .card .delete-task{right:10px;width:38px;height:35px;position:absolute;font-size:24px;cursor:pointer;border-radius:10px}body.auto-task-history .container .card .delete-task:hover{background:#fff}body.auto-task-history .container .card .time{right:5px;position:absolute;bottom:0;color:#e83e8c;font-family:\'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace\';font-size:15px}#auto-task-buttons,.show-button-div{position:fixed;top:30px;right:15px;width:124px;z-index:999999999 !important;transform:scale(0.85)}#auto-task-buttons p,.show-button-div p{line-height:30px;height:40px;text-align:center;margin:5px !important}#auto-task-buttons a.auto-task-website-btn,.show-button-div a.auto-task-website-btn{width:105px;line-height:27px;font-size:20px;display:block}.show-button-div{width:20px}.auto-task-capitalize{text-transform:capitalize !important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{box-shadow:inset 0px 0px 4px 1px rgba(100,150,200,.5) !important}.swal2-checkbox-custom{align-items:center;justify-content:center;background:#fff;color:inherit;margin:1em auto}.swal2-checkbox-custom input{flex-shrink:0;margin:0 .4em}.giveaway-actions #getKey{display:none !important}.auto-task-giveaway-status{color:#fff;border-radius:10px;padding:0 5px;margin-left:5px}.auto-task-giveaway-status.active{background-color:#5cb85c}.auto-task-giveaway-status.not-active{background-color:#d9534f}', '' ]);
      const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___.toString();
    },
    1: function(module) {
      'use strict';
      module.exports = function(cssWithMappingToString) {
        var list = [];
        list.toString = function toString() {
          return this.map(function(item) {
            var content = '';
            var needLayer = typeof item[5] !== 'undefined';
            if (item[4]) {
              content += '@supports ('.concat(item[4], ') {');
            }
            if (item[2]) {
              content += '@media '.concat(item[2], ' {');
            }
            if (needLayer) {
              content += '@layer'.concat(item[5].length > 0 ? ' '.concat(item[5]) : '', ' {');
            }
            content += cssWithMappingToString(item);
            if (needLayer) {
              content += '}';
            }
            if (item[2]) {
              content += '}';
            }
            if (item[4]) {
              content += '}';
            }
            return content;
          }).join('');
        };
        list.i = function i(modules, media, dedupe, supports, layer) {
          if (typeof modules === 'string') {
            modules = [ [ null, modules, undefined ] ];
          }
          var alreadyImportedModules = {};
          if (dedupe) {
            for (var k = 0; k < this.length; k++) {
              var id = this[k][0];
              if (id != null) {
                alreadyImportedModules[id] = true;
              }
            }
          }
          for (var _k = 0; _k < modules.length; _k++) {
            var item = [].concat(modules[_k]);
            if (dedupe && alreadyImportedModules[item[0]]) {
              continue;
            }
            if (typeof layer !== 'undefined') {
              if (typeof item[5] === 'undefined') {
                item[5] = layer;
              } else {
                item[1] = '@layer'.concat(item[5].length > 0 ? ' '.concat(item[5]) : '', ' {').concat(item[1], '}');
                item[5] = layer;
              }
            }
            if (media) {
              if (!item[2]) {
                item[2] = media;
              } else {
                item[1] = '@media '.concat(item[2], ' {').concat(item[1], '}');
                item[2] = media;
              }
            }
            if (supports) {
              if (!item[4]) {
                item[4] = ''.concat(supports);
              } else {
                item[1] = '@supports ('.concat(item[4], ') {').concat(item[1], '}');
                item[4] = supports;
              }
            }
            list.push(item);
          }
        };
        return list;
      };
    },
    398: function(module) {
      'use strict';
      module.exports = function(i) {
        return i[1];
      };
    }
  };
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      id: moduleId,
      exports: {}
    };
    __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    return module.exports;
  }
  !function() {
    __webpack_require__.n = function(module) {
      var getter = module && module.__esModule ? function() {
        return module['default'];
      } : function() {
        return module;
      };
      __webpack_require__.d(getter, {
        a: getter
      });
      return getter;
    };
  }();
  !function() {
    __webpack_require__.d = function(exports, definition) {
      for (var key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
        }
      }
    };
  }();
  !function() {
    __webpack_require__.o = function(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
  }();
  var __webpack_exports__ = {};
  !function() {
    'use strict';
    const external_Swal_namespaceObject = Swal;
    var external_Swal_default = __webpack_require__.n(external_Swal_namespaceObject);
    const external_Cookies_namespaceObject = Cookies;
    var auto_task = __webpack_require__(221);
    var javascript_utils_umd_min = __webpack_require__(108);
    const httpRequest = async (options, times = 0) => {
      if (window.TRACE) {
        console.trace('%cAuto-Task[Debug]:', 'color:blue');
      }
      try {
        const result = await new Promise(resolve => {
          if (options.dataType) {
            options.responseType = options.dataType;
          }
          const requestObj = {
            ...{
              timeout: 3e4,
              ontimeout(data) {
                resolve({
                  result: 'Error',
                  statusText: 'Timeout',
                  status: 601,
                  data: data,
                  options: options
                });
              },
              onabort(data) {
                resolve({
                  result: 'Error',
                  statusText: 'Aborted',
                  status: 602,
                  data: data,
                  options: options
                });
              },
              onerror(data) {
                resolve({
                  result: 'Error',
                  statusText: 'Error',
                  status: 603,
                  data: data,
                  options: options
                });
              },
              onload(data) {
                if (options.responseType === 'json' && data?.response && typeof data.response !== 'object') {
                  try {
                    data.response = JSON.parse(data.responseText);
                  } catch (error) {}
                }
                resolve({
                  result: 'Success',
                  statusText: 'Load',
                  status: 600,
                  data: data,
                  options: options
                });
              }
            },
            ...options
          };
          GM_xmlhttpRequest(requestObj);
        });
        if (window.DEBUG) {
          console.log('%cAuto-Task[httpRequest]:', 'color:blue', JSON.stringify(result));
        }
        if (result.status !== 600 && times < 2) {
          return await httpRequest(options, times + 1);
        }
        return result;
      } catch (error) {
        console.log('%cAuto-Task[httpRequest]:', 'color:red', JSON.stringify({
          errorMsg: error,
          options: options
        }));
        throwError(error, 'httpRequest');
        return {
          result: 'JsError',
          statusText: 'Error',
          status: 604,
          error: error,
          options: options
        };
      }
    };
    const tools_httpRequest = httpRequest;
    const echoLog = ({
      type,
      text,
      html,
      id
    }) => {
      const emptyStatus = {
        success: () => emptyStatus,
        error: () => emptyStatus,
        warning: () => emptyStatus,
        info: () => emptyStatus,
        view: () => emptyStatus
      };
      try {
        let ele;
        if (type) {
          switch (type) {
           case 'joiningSteamGroup':
           case 'leavingSteamGroup':
           case 'gettingSteamGroupId':
            ele = $(`<li>${i18n(type)}[<a href="https://steamcommunity.com/groups/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'joiningSteamOfficialGroup':
           case 'leavingSteamOfficialGroup':
           case 'gettingSteamOfficialGroupId':
            ele = $(`<li>${i18n(type)}[<a href="https://steamcommunity.com/games/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'subscribingForum':
           case 'unsubscribingForum':
           case 'gettingForumId':
            ele = $(`<li>${i18n(type)}[<a href="https://steamcommunity.com/app/${text}/discussions/" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'followingCurator':
           case 'unfollowingCurator':
           case 'gettingCuratorId':
            ele = $(`<li>${i18n(type)}[<a href="https://store.steampowered.com/${text?.includes('/') ? text : `curator/${text}`}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'addingToWishlist':
           case 'removingFromWishlist':
           case 'followingGame':
           case 'unfollowingGame':
           case 'gettingSubid':
           case 'addingFreeLicense':
           case 'requestingPlayTestAccess':
            ele = $(`<li>${i18n(type)}[<a href="https://store.steampowered.com/app/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'addingFreeLicenseSubid':
            ele = $(`<li>${i18n('addingFreeLicense')}[<a href="https://steamdb.info/sub/${text}/" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'favoritingWorkshop':
           case 'unfavoritingWorkshop':
           case 'gettingWorkshopAppId':
           case 'votingUpWorkshop':
            ele = $(`<li>${i18n(type)}[<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=${text}" target="_blank">
      ${text}</a>]...<font></font></li>`);
            break;

           case 'gettingAnnouncementParams':
           case 'likingAnnouncement':
            ele = $(`<li>${i18n(type)}[<a href="https://store.steampowered.com/news/app/${text}/view/${id}" target="_blank">
      ${id}</a>]...<font></font></li>`);
            break;

           case 'joiningDiscordServer':
           case 'gettingDiscordGuild':
            ele = $(`<li>${i18n(type)}[<a href="https://discord.com/invite/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'leavingDiscordServer':
            ele = $(`<li>${i18n(type)}[<a href="https://discord.com/channels/@me/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'updateDiscordAuth':
            ele = $(`<li style="color:red;">${i18n('updateDiscordAuth')}</li>`);
            break;

           case 'followingTwitchChannel':
           case 'unfollowingTwitchChannel':
           case 'gettingTwitchChannelId':
            ele = $(`<li>${i18n(type)}[<a href="https://www.twitch.tv/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'gettingInsUserId':
           case 'followingIns':
           case 'unfollowingIns':
            ele = $(`<li>${i18n(type)}[<a href="https://www.instagram.com/${text}/" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'gettingTwitterUserId':
           case 'followingTwitterUser':
           case 'unfollowingTwitterUser':
            ele = $(`<li>${i18n(type)}[<a href="https://x.com/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'retweetting':
           case 'unretweetting':
            ele = $(`<li>${i18n(type)}${text}...<font></font></li>`);
            break;

           case 'joiningReddit':
           case 'leavingReddit':
            ele = $(`<li>${i18n(type)}[<a href="https://www.reddit.com/r/${text}/" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'followingRedditUser':
           case 'unfollowingRedditUser':
            ele = $(`<li>${i18n(type)}[<a href="https://www.reddit.com/user/${text?.replace('u_', '')}" target="_blank">
      ${text?.replace('u_', '')}</a>]...<font></font></li>`);
            break;

           case 'followingYtbChannel':
           case 'unfollowingYtbChannel':
            ele = $(`<li>${i18n(type)}[<a href="https://www.youtube.com/channel/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'likingYtbVideo':
           case 'unlikingYtbVideo':
            ele = $(`<li>${i18n(type)}[<a href="https://www.youtube.com/watch?v=${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'gettingVkId':
           case 'joiningVkGroup':
           case 'leavingVkGroup':
           case 'joiningVkPublic':
           case 'leavingVkPublic':
           case 'sendingVkWall':
           case 'deletingVkWall':
            ele = $(`<li>${i18n(type)}[<a href="https://vk.com/${text}/" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'visitingLink':
            ele = $(`<li>${i18n('visitingLink')}[<a href="${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'verifyingInsAuth':
           case 'text':
            ele = $(`<li>${i18n(text)}<font></font></li>`);
            break;

           case 'html':
            ele = $(text || html);
            break;

           case 'whiteList':
            ele = $(`<li><font class="warning">${i18n('skipTask')}[${text}(${id})](${i18n('whiteList')})</font></li>`);
            break;

           case 'globalOptionsSkip':
            ele = $(`<li>${i18n('skipTaskOption')}<font class="warning">${text}</font></li>`);
            break;

           default:
            ele = $(`<li>${i18n('unKnown')}:${type}(${text})...<font></font></li>`);
            break;
          }
        } else if (text) {
          ele = $(`<li>${i18n(text)}<font></font></li>`);
        } else if (html) {
          ele = $(html);
        } else {
          ele = $('<li><font></font></li>');
        }
        ele.addClass('card-text');
        $('#auto-task-info').append(ele);
        ele[0]?.scrollIntoView();
        const font = ele.find('font');
        const status = {
          font: font,
          success(text = 'Success', html = false) {
            this.font?.attr('class', '').addClass('success');
            html ? this.font?.html(text) : this.font?.text(text);
            return this;
          },
          error(text = 'Error', html = false) {
            this.font?.attr('class', '').addClass('error');
            html ? this.font?.html(text) : this.font?.text(text);
            return this;
          },
          warning(text = 'Warning', html = false) {
            this.font?.attr('class', '').addClass('warning');
            html ? this.font?.html(text) : this.font?.text(text);
            return this;
          },
          info(text = 'Info', html = false) {
            this.font?.attr('class', '').addClass('info');
            html ? this.font?.html(text) : this.font?.text(text);
            return this;
          },
          view() {
            this.font?.[0].scrollIntoView();
            return this;
          }
        };
        return status;
      } catch (error) {
        throwError(error, 'echoLog');
        return emptyStatus;
      }
    };
    const scripts_echoLog = echoLog;
    const unique = array => {
      try {
        return [ ...new Set(array) ];
      } catch (error) {
        throwError(error, 'unique');
        return [];
      }
    };
    const delay = (time = 1e3) => new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
    const getRedirectLink = async link => {
      try {
        if (!link) {
          return null;
        }
        const redirectLinksCache = GM_getValue('redirectLinks') || {};
        if (redirectLinksCache[link]) {
          redirectLinksCache[link];
        }
        return await tools_httpRequest({
          url: link,
          method: 'GET'
        }).then(({
          data
        }) => {
          if (data?.finalUrl) {
            redirectLinksCache[link] = data.finalUrl;
            GM_setValue('redirectLinks', redirectLinksCache);
            return data.finalUrl;
          }
          return null;
        });
      } catch (error) {
        throwError(error, 'getRedirectLink');
        return null;
      }
    };
    const visitLink = async (link, options) => {
      try {
        const logStatus = scripts_echoLog({
          type: 'visitLink',
          text: link
        });
        return await tools_httpRequest({
          url: link,
          method: 'GET',
          ...options
        }).then(({
          result,
          statusText,
          status
        }) => {
          if (result === 'Success') {
            logStatus.success();
            return true;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        });
      } catch (error) {
        throwError(error, 'visitLink');
        return false;
      }
    };
    const getUrlQuery = url => {
      try {
        const query = {};
        if (url) {
          if (url.includes('?')) {
            url.split('?')[1].replace(/([^?&=]+)=([^&]+)/g, (str, key, value) => {
              query[key] = value;
              return str;
            });
          }
        } else {
          window.location.search.replace(/([^?&=]+)=([^&]+)/g, (str, key, value) => {
            query[key] = value;
            return str;
          });
        }
        return query;
      } catch (error) {
        throwError(error, 'getUrlQuery');
        return {};
      }
    };
    const getUuid = () => {
      const uuidUrl = URL.createObjectURL(new Blob()).toString();
      return uuidUrl.slice(uuidUrl.lastIndexOf('/') + 1);
    };
    const stringToColour = str => {
      try {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let colour = '#';
        for (let i = 0; i < 3; i++) {
          const value = hash >> i * 8 & 255;
          colour += `00${value.toString(16)}`.slice(-2);
        }
        return colour;
      } catch (error) {
        throwError(error, 'stringToColour');
        return '#fff';
      }
    };
    const defaultGlobalOptions = {
      doTask: {
        discord: {
          servers: true
        },
        instagram: {
          users: true
        },
        twitch: {
          channels: true
        },
        twitter: {
          users: true,
          retweets: true
        },
        vk: {
          names: true
        },
        youtube: {
          channels: true,
          likes: true
        },
        reddit: {
          reddits: true
        },
        steam: {
          groups: true,
          officialGroups: true,
          wishlists: true,
          follows: true,
          forums: true,
          workshops: true,
          curators: true,
          workshopVotes: true,
          announcements: true,
          licenses: true,
          playtests: true
        }
      },
      undoTask: {
        discord: {
          servers: true
        },
        instagram: {
          users: true
        },
        twitch: {
          channels: true
        },
        twitter: {
          users: true,
          retweets: true
        },
        vk: {
          names: true
        },
        youtube: {
          channels: true,
          likes: true
        },
        reddit: {
          reddits: true
        },
        steam: {
          groups: true,
          officialGroups: true,
          wishlists: true,
          follows: true,
          forums: true,
          workshops: true,
          curators: true
        }
      },
      ASF: {
        AsfEnabled: false,
        AsfIpcUrl: '',
        AsfIpcPassword: '',
        AsfBotname: 'asf'
      },
      position: {
        buttonSideX: 'right',
        buttonSideY: 'top',
        buttonDistance: '15,30',
        showButtonSideX: 'right',
        showButtonSideY: 'top',
        showButtonDistance: '15,30',
        logSideX: 'right',
        logSideY: 'bottom',
        logDistance: '10,10'
      },
      hotKey: {
        doTaskKey: 'alt + d',
        undoTaskKey: 'alt + u',
        toggleLogKey: 'alt + l'
      },
      other: {
        twitterVerifyId: '783214',
        youtubeVerifyChannel: 'UCrXUsMBcfTVqwAS7DKg9C0Q',
        autoUpdateSource: 'jsdelivr',
        language: 'zh',
        checkLogin: true,
        checkLeftKey: true,
        defaultShowButton: true,
        defaultShowLog: true,
        debug: false,
        receivePreview: true
      }
    };
    const userDefinedGlobalOptions = GM_getValue('globalOptions') || {};
    const assignObject = (obj1, obj2) => {
      try {
        const newObj = {};
        for (const [ key, value ] of Object.entries(obj1)) {
          if (Object.prototype.toString.call(value) === '[object Object]' && Object.prototype.toString.call(obj2[key]) === '[object Object]') {
            newObj[key] = assignObject(value, obj2[key]);
          } else {
            newObj[key] = obj2[key] ?? value;
          }
        }
        return newObj;
      } catch (error) {
        throwError(error, 'assignObject');
        return defaultGlobalOptions;
      }
    };
    const globalOptions = assignObject(defaultGlobalOptions, userDefinedGlobalOptions);
    const saveData = () => {
      try {
        const data = {};
        $('#globalOptionsForm').serializeArray().map(value => {
          data[value.name] = value.value;
          return value;
        });
        $.makeArray($('#globalOptionsForm input')).map(element => {
          const name = $(element).attr('name');
          const keys = name.split('.');
          if (keys.length === 3) {
            globalOptions[keys[0]][keys[1]][keys[2]] = data[name] ? data[name] === 'on' ? true : data[name] : false;
          } else if (keys.length === 2) {
            globalOptions[keys[0]][keys[1]] = data[name] ? data[name] === 'on' ? true : data[name] : false;
          }
          return element;
        });
        GM_setValue('globalOptions', globalOptions);
        external_Swal_default().fire({
          title: i18n('changeGlobalOptionsSuccess'),
          icon: 'success'
        });
      } catch (error) {
        throwError(error, 'saveData');
      }
    };
    const changeGlobalOptions = showType => {
      try {
        let globalOptionsForm = `<form id="globalOptionsForm" class="auto-task-form">
      <table class="auto-task-table"><thead><tr><td>${i18n('type')}</td><td>${i18n('option')}</td><td>${i18n('value')}</td></tr></thead><tbody>`;
        for (const [ type, data1 ] of Object.entries(globalOptions)) {
          for (const [ option, data2 ] of Object.entries(data1)) {
            if ([ 'other', 'position', 'hotKey', 'ASF' ].includes(type)) {
              if (typeof data2 === 'boolean') {
                globalOptionsForm += `<tr style="background-color: ${stringToColour(type)}44">${Object.keys(data1).indexOf(option) === 0 ? `<th rowspan="${Object.keys(data1).length}">${i18n(type)}</th>` : ''}<td>${i18n(option)}</td><td><label><input type="checkbox" name="${type}.${option}"${data2 ? ' checked="checked"' : ''}/><span><i></i></span></label></td></tr>`;
              } else {
                globalOptionsForm += `<tr style="background-color: ${stringToColour(type)}44">${Object.keys(data1).indexOf(option) === 0 ? `<th rowspan="${Object.keys(data1).length}" style="background-color: ${stringToColour(type)}66">${i18n(type)}</th>` : ''}<td>${i18n(option)}</td><td><input class="editOption" type="text" name="${type}.${option}" value="${data2}"/></td></tr>`;
              }
            } else {
              for (const [ socialType, data3 ] of Object.entries(data2)) {
                globalOptionsForm += `<tr style="background-color: ${stringToColour(option)}66">${Object.keys(data1).indexOf(option) === 0 ? `<th rowspan="${Object.keys(data1).map(key => Object.keys(data1[key]).length).reduce((acr, cur) => acr + cur)}" style="background-color: ${stringToColour(type)}66">${i18n(type)}</th>` : ''}<td>${option}.${i18n(socialType)}</td><td><label><input type="checkbox" name="${type}.${option}.${socialType}"${data3 ? ' checked="checked"' : ''}/><span><i></i></span></label></td></tr>`;
              }
            }
          }
        }
        globalOptionsForm += '</tbody></table></form>';
        if (showType === 'swal') {
          external_Swal_default().fire({
            title: i18n('globalOptions'),
            html: globalOptionsForm,
            showConfirmButton: true,
            confirmButtonText: i18n('save'),
            showCancelButton: true,
            cancelButtonText: i18n('close')
          }).then(({
            isConfirmed
          }) => {
            if (isConfirmed) {
              saveData();
            }
          });
        } else {
          $('body').append(`<h2>${i18n('globalOptions')}</h2>${globalOptionsForm}`);
        }
      } catch (error) {
        throwError(error, 'changeGlobalOptions');
      }
    };
    const data = {
      website: '网站',
      type: '类型',
      edit: '编辑',
      whiteList: '白名单',
      skipTask: '跳过撤销任务',
      whiteListOptions: '白名单设置',
      changeWhiteListOption: '设置白名单(%0)',
      whiteListNotFound: '找不到此项白名单: %0',
      changeWhiteListSuccess: '白名单修改成功，刷新生效！',
      changeWebsiteOptions: '网站设置',
      changeGlobalOptions: '全局设置',
      ok: '是',
      save: '保存',
      close: '关闭',
      return: '返回',
      option: '选项',
      value: '值',
      websiteOptions: '当前网站设置',
      changeWebsiteOptionsSuccess: '更改当前网站设置成功，刷新生效！',
      changeGlobalOptionsSuccess: '更改全局设置成功，刷新生效！',
      needLogin: '请先登录！',
      getTasksInfo: '正在获取并处理任务信息...',
      gettingKey: '正在获取Key...',
      verifyingTask: '正在验证任务',
      notice: '自动任务脚本提醒',
      noKeysLeft: '此页面已经没有剩余key了，是否关闭？',
      giveawayEnded: '此活动已结束，是否关闭？',
      giveawayNotWork: '此活动因某些原因(已结束/暂停/未开始...)不可用(如果是脚本误判请及时反馈)，是否关闭？',
      confirm: '确定',
      cancel: '取消',
      unKnown: '未知',
      unKnownTaskType: '未识别的任务',
      doing: '正在做任务',
      allTasksComplete: '所有任务已完成！',
      getTaskIdFailed: '获取任务Id失败！',
      initSuccess: '%0 初始化成功！',
      initFailed: '%0 初始化失败！',
      errorLink: '链接错误: %0',
      needInit: '请先初始化',
      verifyingAuth: '正在验证%0凭证...',
      updatingAuth: '正在更新%0凭证...',
      refreshingToken: '正在刷新%0凭证...',
      settingToken: '正在设置%0凭证...',
      initing: '正在初始化...',
      getFailed: '获取%0失败！',
      checkLoginFailed: '检测登录状态失败！',
      checkLeftKeyFailed: '检测剩余Key失败！',
      userId: '用户Id',
      joiningGiveaway: '正在加入赠Key',
      needJoinGiveaway: '需要先加入赠Key',
      cannotUndo: '此网站不支持取消任务',
      verifyAuth: '正在验证 %0 凭证...',
      closePageNotice: '如果此页面没有自动关闭，请自行关闭本页面。',
      errorReport: '检测到脚本报错，是否前往反馈BUG？',
      visitingLink: '正在访问链接: ',
      doTask: '做任务',
      undoTask: '撤销任务',
      verifyTask: '验证任务',
      getKey: '获取Key',
      selectAll: '全选',
      selectNone: '全不选',
      invertSelect: '反选',
      doFreeTask: '加入免费赠品',
      doPointTask: '加入点数赠品',
      skipTaskOption: '设置中已配置跳过任务',
      other: '其他',
      globalOptions: '全局设置',
      checkLogin: '登录检测</br>需要登录的网站自动登录，部分本网站支持',
      checkLeftKey: '剩余Key检测</br>赠Key活动结束提示是否关闭，部分本网站支持',
      twitterVerifyId: '通过尝试关注该账号验证Twitter凭证</br>默认为Twitter官方帐号 783214</br>不想关注官方账号可以改为自己的帐号',
      youtubeVerifyChannel: '通过尝试订阅该频道验证YouTube凭证</br>默认为YouTube官方频道 UCrXUsMBcfTVqwAS7DKg9C0Q</br>不想关注官方频道可以改为自己的频道',
      autoUpdateSource: '更新源</br>github: 需代理，实时更新</br>jsdelivr: 可不用代理，更新有延迟</br>standby: 备用</br>auto: 依次使用github, jsdelivr, standby源进行尝试更新',
      saveGlobalOptions: '保存全局设置',
      settingPage: '设置页面',
      name: '名称',
      version: '版本',
      scriptManager: '脚本管理器',
      script: '脚本',
      environment: '环境',
      os: '系统',
      browser: '浏览器',
      getId: '获取 %0 id',
      getTwitterUserId: '获取Twitter用户id(获取id功能仅在设置页面可用)',
      getYoutubeChannelId: '获取Youtube频道id(获取id功能仅在设置页面可用)',
      showButton: '显示按钮',
      hideButton: '隐藏按钮',
      showLog: '显示日志',
      hideLog: '隐藏日志',
      defaultShowButton: '默认显示按钮',
      defaultShowLog: '默认显示日志',
      debug: '输出调试日志，不要开启此选项！',
      receivePreview: '接收预览版更新',
      position: '组件位置',
      buttonSideX: '按钮区域水平方向定位(实时预览功能仅在设置页面可用)</br>left: 靠左 | right: 靠右',
      buttonSideY: '按钮区域垂直方向定位(实时预览功能仅在设置页面可用)</br>top: 靠上 | bottom: 靠下',
      buttonDistance: '按钮区域距边缘的距离(实时预览功能仅在设置页面可用)</br>格式: X距离,Y距离',
      showButtonSideX: '显示按钮水平方向定位(实时预览功能仅在设置页面可用)</br>left: 靠左 | right: 靠右',
      showButtonSideY: '显示按钮垂直方向定位(实时预览功能仅在设置页面可用)</br>top: 靠上 | bottom: 靠下',
      showButtonDistance: '显示按钮距边缘的距离(实时预览功能仅在设置页面可用)</br>格式: X距离,Y距离',
      logSideX: '日志区域水平方向定位(实时预览功能仅在设置页面可用)</br>left: 靠左 | right: 靠右',
      logSideY: '日志区域垂直方向定位(实时预览功能仅在设置页面可用)</br>top: 靠上 | bottom: 靠下',
      logDistance: '日志区域距边缘的距离(实时预览功能仅在设置页面可用)</br>格式: X距离,Y距离',
      hotKey: '快捷键',
      doTaskKey: '做任务快捷键</br>(实时预览功能仅在设置页面可用)',
      undoTaskKey: '撤销任务快捷键</br>(实时预览功能仅在设置页面可用)',
      toggleLogKey: '显示/隐藏日志快捷键</br>(实时预览功能仅在设置页面可用)',
      tasksHistory: '任务历史',
      clearHistory: '清空历史',
      clearHistoryFinished: '已清空任务历史！',
      deleteTask: '删除任务',
      lastChangeTime: '最后一次修改时间',
      clearTaskFinished: '删除以下任务完成！',
      clearTaskFailed: '删除任务失败，没有找到任务名！',
      syncData: '数据同步',
      settingData: '正在上传数据...',
      gettingData: '正在获取数据...',
      help: '帮助',
      fileName: '文件名',
      upload2gist: '同步到Gist',
      downloadFromGist: '从Gist同步',
      saveAndTest: '保存配置并测试',
      testSuccess: '测试成功！',
      testFailed: '测试失败！',
      saveAndTestNotice: '请先保存配置并测试！',
      processingData: '正在处理数据...',
      updatingData: '正在上传数据...',
      syncDataSuccess: '同步数据成功！',
      syncDataFailed: '同步数据失败，请在控制台查看错误信息！',
      downloadingData: '正在下载数据...',
      checkedNoData: '没有检测到远程数据，请确认配置是否正确！',
      savingData: '正在保存数据...',
      syncHistory: '同步任务历史',
      checkUpdateFailed: '检测更新失败',
      newVersionNotice: '检测到新版本V%0, <a class="high-light" href="%1" target="_blank">点此更新</a>',
      language: '语言</br>目前仅支持zh: 中文, en: 英文',
      gistOptions: 'Gist 设置',
      swalNotice: '检测到您第一次安装V4版本脚本，请前往阅读用前必读内容！',
      echoNotice: '检测到您第一次安装V4版本脚本，请<a class="high-light" href="%0" target="_blank">点此前往</a>阅读用前必读内容！',
      noticeLink: 'https://auto-task-doc.js.org/guide/#用前必读',
      toGithub: '前往Github反馈',
      toKeylol: '前往其乐论坛反馈',
      copySuccess: '错误信息已复制到剪切板，是否前往其乐论坛反馈？',
      copyFailed: '请复制下方错误信息后前往Keylol论坛反馈！',
      updateText: '%0 版本更新内容：',
      Active: '进行中',
      Ended: '已结束',
      Banned: '已封禁',
      Paused: '已暂停',
      notStart: '未开始',
      noRemoteData: '检测到远程无数据',
      errorRemoteDataFormat: '远程数据格式错误',
      updateHistory: '历史更新记录<a class="high-light" href="https://auto-task-doc.js.org/logs/" target="_blank">点此查看</a>',
      AsfEnabled: '使用ASF做Steam相关任务(需<a href="https://github.com/chr233/ASFEnhance" target="_blank">ASFEnhance</a>插件)',
      AsfIpcUrl: 'ASF IPC 地址',
      AsfIpcPassword: 'ASF IPC 密码',
      versionNotMatched: '脚本管理器版本过低，需TamperMonkey >= 5.2.0或TamperMonkey Beta >= 5.2.6196',
      groups: '组',
      officialGroups: '官方组',
      wishlists: '愿望单',
      follows: '游戏关注',
      forums: '论坛',
      workshops: '创意工坊收藏',
      curators: '鉴赏家',
      workshopVotes: '创意工坊点赞',
      announcements: '社区通知',
      steamCommunity: 'Steam社区',
      steamStore: 'Steam商店',
      licenses: '入库免费游戏',
      playtests: '请求访问权限',
      needLoginSteamStore: '请先<a href="https://store.steampowered.com/login/" target="_blank">登录Steam商店</a>',
      needLoginSteamCommunity: '请先<a href="https://steamcommunity.com/login/home/" target="_blank">登录Steam社区</a>',
      joiningSteamGroup: '正在加入Steam组',
      leavingSteamGroup: '正在退出Steam组',
      gettingSteamGroupId: '正在获取Steam组Id',
      joiningSteamOfficialGroup: '正在加入Steam官方组',
      leavingSteamOfficialGroup: '正在退出Steam官方组',
      gettingSteamOfficialGroupId: '正在获取Steam官方组Id',
      subscribingForum: '正在订阅Steam论坛',
      unsubscribingForum: '正在取消订阅Steam论坛',
      gettingForumId: '正在获取Steam论坛Id',
      followingCurator: '正在关注Steam鉴赏家',
      unfollowingCurator: '正在取关Steam鉴赏家',
      gettingCuratorId: '正在获取Steam鉴赏家Id',
      addingToWishlist: '正在添加游戏到Steam愿望单',
      removingFromWishlist: '正在从Steam愿望单移除游戏',
      followingGame: '正在关注Steam游戏',
      unfollowingGame: '正在取关Steam游戏',
      favoritingWorkshop: '正在收藏Steam创意工坊物品',
      unfavoritingWorkshop: '正在取消收藏Steam创意工坊物品',
      gettingWorkshopAppId: '正在获取Steam创意工坊物品Id',
      votingUpWorkshop: '正在点赞Steam创意工坊物品',
      gettingAnnouncementParams: '正在获取Steam通知信息',
      likingAnnouncement: '正在点赞Steam通知',
      changingArea: '正在更换Steam地区: %0...',
      notNeededChangeArea: '当前地区不需要更换',
      noAnotherArea: '请检测是否开启正确开启代理',
      gettingAreaInfo: '正在获取Steam地区信息...',
      changeAreaNotice: '疑似锁区游戏，尝试换区执行',
      steamFinishNotice: 'Steam任务完成，尝试将购物车地区换回CN',
      gettingSubid: '正在获取游戏subid',
      addingFreeLicense: '正在入库',
      missParams: '缺少参数',
      gettingLicenses: '正在获取Licenses...',
      requestingPlayTestAccess: '正在请求访问权限',
      tryChangeAreaNotice: '此功能无法检测游戏是否限区，因此会尝试换区后再入库，换区失败也不影响后续入库',
      gettingUserLink: '正在获取Steam用户社区链接...',
      retry: '重试',
      initingASF: '正在初始化ASF...',
      servers: '服务器',
      joiningDiscordServer: '正在加入Discord服务器',
      leavingDiscordServer: '正在退出Discord服务器',
      gettingDiscordGuild: '正在获取Discord服务器Id',
      getDiscordAuthFailed: '获取Discord凭证失败，请检测Discord帐号是否已登录',
      discordImportantNotice: '重要提醒！！！',
      discordImportantNoticeText: '由于Discord网站后台更新，目前使用此脚本加组后可能会导致Discord帐号被强制退出，且需要两步验证才能正常登录，请谨慎使用！！！',
      continue: '继续',
      skipDiscordTask: '跳过Discord任务',
      continueAndDontRemindAgain: '继续且不再提醒',
      users: '用户',
      loginIns: '请先<a href="https://www.instagram.com/accounts/login/" target="_blank">登录Instagram</a>',
      insBanned: '您的Instagram账户已被封禁',
      verifyingInsAuth: '正在验证Instagram凭证...',
      gettingInsUserId: '正在获取Instagram用户Id',
      followingIns: '正在关注Instagram用户',
      unfollowingIns: '正在取关Instagram用户',
      reddits: '社区/用户',
      loginReddit: '请先<a href="https://www.reddit.com/login/" target="_blank">登录Reddit</a>',
      changingRedditVersion: '正在切换Reddit为新版页面...',
      joiningReddit: '正在加入Reddit社区',
      leavingReddit: '正在退出Reddit社区',
      followingRedditUser: '正在关注Reddit用户',
      unfollowingRedditUser: '正在取关Reddit用户',
      channels: '频道',
      followingTwitchChannel: '正在关注Twitch频道',
      unfollowingTwitchChannel: '正在取关Twitch频道',
      gettingTwitchChannelId: '正在获取Twitch频道Id',
      checkingTwitchIntegrity: '正在检查Twitch完整性...',
      twitterUser: '推特用户',
      retweets: '转推',
      gettingTwitterUserId: '正在获取推特用户Id',
      followingTwitterUser: '正在关注推特用户',
      unfollowingTwitterUser: '正在取关推特用户',
      retweetting: '正在转推',
      unretweetting: '正在撤销转推',
      names: '组/社区/动态',
      loginVk: '请先<a href="https://vk.com/login/" target="_blank">登录Vk</a>',
      gettingVkId: '正在获取Vk任务Id',
      joiningVkGroup: '正在加入Vk组',
      leavingVkGroup: '正在退出Vk组',
      joiningVkPublic: '正在加入Vk社区',
      leavingVkPublic: '正在退出Vk社区',
      sendingVkWall: '正在转发Vk动态',
      deletingVkWall: '正在撤销转发Vk动态',
      youtubeChannel: 'YouTube频道',
      likes: '点赞',
      loginYtb: '请先<a href="https://accounts.google.com/ServiceLogin?service=youtube" target="_blank">登录YouTube</a>',
      tryUpdateYtbAuth: '请尝试<a href="https://www.youtube.com/#auth" target="_blank">更新YouTube凭证</a>',
      gettingYtbToken: '正在获取YouTube Token...',
      followingYtbChannel: '正在订阅YouTube频道',
      unfollowingYtbChannel: '正在退订YouTube频道',
      likingYtbVideo: '正在点赞YouTube视频',
      unlikingYtbVideo: '正在取消点赞YouTube视频',
      giveKeyNoticeBefore: '每次验证间隔15s',
      giveKeyNoticeAfter: '如果没有key, 请在<a href="https://givekey.ru/profile" target="_blank">https://givekey.ru/profile</a>查看',
      noPoints: '点数不够，跳过抽奖',
      getNeedPointsFailed: '获取所需点数失败，跳过抽奖',
      joiningLottery: '正在加入抽奖',
      doingGleamTask: '正在做Gleam任务...',
      gettingGleamLink: '正在获取Gleam任务链接...',
      gleamTaskNotice: '如果此页面长时间未关闭，请完成任一任务后自行关闭！',
      verifiedGleamTasks: '已尝试验证所有任务，验证失败的任务请尝试手动验证或完成！',
      campaign: '检测到人机验证，请完成验证后重新验证任务！',
      gsNotice: '为避免得到"0000-0000-0000"key, 已自动屏蔽"Grab Key"按钮，获取key时请关闭脚本！',
      giveeClubVerifyNotice: '正在验证任务...',
      giveeClubVerifyFinished: '请等待验证完成后自行加入赠Key',
      doingKeyhubTask: '正在做Keyhub任务...',
      SweepWidgetNotice: '正在处理并验证任务，每次验证任务有1~3s间隔防止触发验证过快警告...',
      confirmingTask: '正在跳过警告页面...'
    };
    const zh_CN = data;
    const en_US_data = {
      website: 'Website',
      type: 'Type',
      edit: 'Edit',
      whiteList: 'Whitelist',
      skipTask: 'Skip undo task',
      whiteListOptions: 'Whitelist options',
      changeWhiteListOption: 'Whitelist option(%0)',
      whiteListNotFound: 'Cannot find this whitelist: %0',
      changeWhiteListSuccess: 'The whitelist is successfully modified, and the page refresh will take effect!',
      changeWebsiteOptions: 'Website options',
      changeGlobalOptions: 'Global options',
      ok: 'OK',
      save: 'Save',
      close: 'Close',
      return: 'Return',
      option: 'Option',
      value: 'Value',
      websiteOptions: 'Current website settings',
      changeWebsiteOptionsSuccess: 'The current website setting is changed successfully, and the page refresh will take effect!',
      changeGlobalOptionsSuccess: 'The global setting is changed successfully, and the refresh will take effect!',
      needLogin: 'Please log in first!',
      getTasksInfo: 'Obtaining and processing task information...',
      gettingKey: 'Getting Key...',
      verifyingTask: 'Verifying task',
      notice: 'Automatic task script notice',
      noKeysLeft: 'There are no more keys left on this page. Do you want to close it?',
      giveawayEnded: 'This event has ended, do you want to close it?',
      giveawayNotWork: 'This activity is unavailable for some reasons (banned/ended/paused/not started...)' + ' (if it is a script misjudgment, please give us feedback in time), is it closed?',
      confirm: 'Confirm',
      cancel: 'Cancel',
      unKnown: 'Unknown',
      unKnownTaskType: 'Unrecognized task',
      doing: 'Doing a task',
      allTasksComplete: 'All tasks have been completed!',
      getTaskIdFailed: 'Failed to obtain task Id!',
      initSuccess: '%0 was initialized successfully!',
      initFailed: '%0 initialization failed!',
      errorLink: 'Link error: %0',
      needInit: 'Please initialize first',
      verifyingAuth: 'Verifying %0 token...',
      updatingAuth: 'Update %0 token...',
      initing: 'Initializing...',
      getFailed: 'Failed to get %0!',
      checkLoginFailed: 'Failed to detect login status!',
      checkLeftKeyFailed: 'Failed to detect the remaining keys!',
      userId: 'User Id',
      joiningGiveaway: 'Joining giveaway',
      needJoinGiveaway: 'Need to join the giveaway first',
      cannotUndo: 'This website does not support canceling tasks',
      verifyAuth: 'Verifying %0 token...',
      closePageNotice: 'f this page does not close automatically, please close this page yourself.',
      errorReport: 'A script error is detected, do you want to report the BUG?',
      visitingLink: 'Visiting link: ',
      doTask: 'DoTask',
      undoTask: 'UndoTask',
      verifyTask: 'Verify',
      getKey: 'GetKey',
      selectAll: 'SelectAll',
      selectNone: 'SelectNone',
      invertSelect: 'InvertSelect',
      doFreeTask: 'FreeTask',
      doPointTask: 'PointTask',
      skipTaskOption: 'Skip task has been configured in the settings',
      other: 'Other',
      globalOptions: 'Global Options',
      checkLogin: 'Login detection</br>Need to log in to the website automatically log in, part of this website supports.',
      checkLeftKey: 'Key remaining detection</br>The end of the giveaway event prompts whether to close or not, part of this website supports.',
      twitterVerifyId: 'Verify Twitter token by trying to follow the account.</br>The default is the official Twitter account 783214.</br>' + 'If you don\'t want to follow the official account, you can change it to your own account.',
      youtubeVerifyChannel: 'Verify YouTube token by trying to subscribe to the channel.</br>' + 'The default is the official YouTube channel UCrXUsMBcfTVqwAS7DKg9C0Q.</br>' + 'If you don\'t want to follow the official channel, you can change it to your own channel.',
      autoUpdateSource: 'The source to update</br>github: Fast update.</br>jsdelivr: Update is delayed.</br>' + 'standby: Standby source.</br>auto: Try to update using github, jsdelivr, standby sources in turn.',
      saveGlobalOptions: 'SaveSettings',
      settingPage: 'Setting Page',
      name: 'Name',
      version: 'Version',
      scriptManager: 'Script Manager',
      script: 'Script',
      environment: 'Environment',
      os: 'OS',
      browser: 'Browser',
      getId: 'Get %0 id',
      getTwitterUserId: 'Get Twitter user id (Get id function is only available on the settings page).',
      getYoutubeChannelId: 'Get Youtube channel id (Get id function is only available on the settings page).',
      showButton: 'ShowButton',
      hideButton: 'HideButton',
      showLog: 'ShowLog',
      hideLog: 'HideLog',
      defaultShowButton: 'Default display button',
      defaultShowLog: 'Display log by default',
      debug: 'Output debug log, do not enable this option!',
      receivePreview: 'Receive preview updates',
      position: 'Component position',
      buttonSideX: 'Horizontal positioning of the button area (real-time preview function is only available on the setting page).' + '</br>left: left | right: right',
      buttonSideY: 'The button area is positioned in the vertical direction (real-time preview function is only available on the settings page).' + '</br>top: top | bottom: bottom',
      buttonDistance: 'The distance between the button area and the edge (the real-time preview function is only available on the setting page).' + '</br> Format: X distance, Y distance',
      showButtonSideX: 'ShowButton horizontal positioning (real-time preview function is only available on the setting page).' + '</br>left: left | right: right',
      showButtonSideY: 'ShowButton vertical positioning (real-time preview function is only available on the setting page).' + '</br>top: top | bottom: bottom',
      showButtonDistance: 'The distance between the ShowButton and the edge (real-time preview function is only available on the setting page).' + '</br> Format: X distance, Y distance',
      logSideX: 'Horizontal positioning of the log area (real-time preview function is only available on the setting page).' + '</br>left: left | right: right',
      logSideY: 'Vertical positioning of the log area (real-time preview function is only available on the setting page).' + '</br>top: top | bottom: bottom',
      logDistance: 'The distance between the log area and the edge (the real-time preview function is only available on the setting page).' + '</br> Format: X distance, Y distance',
      hotKey: 'Shortcut key',
      doTaskKey: 'DoTask shortcut keys</br> (real-time preview function is only available on the settings page).',
      undoTaskKey: 'UndoTask shortcut keys</br> (real-time preview function is only available on the settings page).',
      toggleLogKey: 'ShowLog/HideLog shortcut keys</br> (real-time preview function is only available on the settings page).',
      tasksHistory: 'TasksHistory',
      clearHistory: 'Clear history',
      clearHistoryFinished: 'The mission history has been cleared!',
      deleteTask: 'Delete task',
      lastChangeTime: 'Last Change Time',
      clearTaskFinished: 'Delete the following tasks completed!',
      clearTaskFailed: 'Failed to delete the task, the task name was not found!',
      syncData: 'DataSync',
      settingData: 'Uploading data...',
      gettingData: 'Getting data...',
      help: 'Help',
      fileName: 'Filename',
      upload2gist: 'Sync to Gist',
      downloadFromGist: 'Sync from Gist',
      saveAndTest: 'Save configuration and test',
      testSuccess: 'Test success!',
      testFailed: 'Test failed!',
      saveAndTestNotice: 'Please save the configuration and test first!',
      processingData: 'Processing data...',
      updatingData: 'Uploading data...',
      syncDataSuccess: 'Synchronized data successfully!',
      syncDataFailed: 'Failed to synchronize data, please check the error message on the console!',
      downloadingData: 'Downloading data...',
      checkedNoData: 'No remote data is detected, please confirm whether the configuration is correct!',
      savingData: 'Saving data...',
      syncHistory: 'Synchronize tasks history',
      checkUpdateFailed: 'Check update failed',
      newVersionNotice: 'Checked a new version V%0, <a class="high-light" href="%1" target="_blank">click to update</a>',
      language: 'Language</br> Currently only supports zh: Chinese, en: English',
      gistOptions: 'Gist Settings',
      swalNotice: 'It is detected that you are installing the V4 version script for the first time' + ', please go to read the READ ME FIRST content before use!',
      echoNotice: 'It is detected that you are installing the V4 version script for the first time' + ', please <a class="high-light" href="%0" target="_blank">click here</a> to read the READ ME FIRST content before use!',
      noticeLink: 'https://auto-task-doc.js.org/en/guide/#read-me-first',
      toGithub: 'Feedback(Github)',
      toKeylol: 'Feedback(Keylol)',
      copySuccess: 'The error message has been copied to the clipboard. Do you want to go to the Keylol forum to give feedback?',
      copyFailed: 'Please copy the error information below and report back to the Keylol forum!',
      updateText: 'Updates in version %0:',
      Active: 'Active',
      Ended: 'Ended',
      Banned: 'Banned',
      Paused: 'Paused',
      notStart: 'notStart',
      noRemoteData: 'No data remotely',
      errorRemoteDataFormat: 'Remote data has wrong format',
      updateHistory: '<a class="high-light" href="https://auto-task-doc.js.org/logs/" target="_blank">Click here</a>' + ' to view the historical update record.',
      AsfEnabled: 'Use ASF to do Steam related tasks (requires <a href="https://github.com/chr233/ASFEnhance" target="_blank">ASFEnhance</a> plugin)',
      AsfIpcUrl: 'ASF IPC URL',
      AsfIpcPassword: 'ASF IPC Password',
      groups: 'Group',
      officialGroups: 'Official Group',
      wishlists: 'Wishlist',
      follows: 'Follow Game',
      forums: 'Forum',
      workshops: 'Favorite Workshop',
      curators: 'Curator',
      workshopVotes: 'Voteup Workshop',
      announcements: 'Announcement',
      steamCommunity: 'Steam Community',
      steamStore: 'Steam Store',
      licenses: 'Add License',
      playtests: 'Playtest Access',
      needLoginSteamStore: 'Please <a href="https://store.steampowered.com/login/" target="_blank">log in to the Steam Store</a>',
      needLoginSteamCommunity: 'Please <a href="https://steamcommunity.com/login/home/" target="_blank">log in to the Steam Community</a>',
      joiningSteamGroup: 'Joining Steam Group',
      leavingSteamGroup: 'Leaving Steam Group',
      gettingSteamGroupId: 'Getting Steam Group Id',
      joiningSteamOfficialGroup: 'Joining Steam Official Group',
      leavingSteamOfficialGroup: 'Leaving Steam Official Group',
      gettingSteamOfficialGroupId: 'Getting Steam Official Group Id',
      subscribingForum: 'Subscribing the Steam Forum',
      unsubscribingForum: 'Unsubscribing the Steam Forum',
      gettingForumId: 'Getting Steam Forum Id',
      followingCurator: 'Following Steam Curator',
      unfollowingCurator: 'Unfollowing Steam Curator',
      gettingCuratorId: 'Getting Steam Curator Id',
      addingToWishlist: 'Adding the game to the Steam wishlist',
      removingFromWishlist: 'Removing the game from the Steam wishlist',
      followingGame: 'Following Steam games',
      unfollowingGame: 'Unfollowing Steam games',
      favoritingWorkshop: 'Favouring Steam Workshop Items',
      unfavoritingWorkshop: 'Unfavoriting Steam Workshop Items',
      gettingWorkshopAppId: 'Getting Steam Workshop Item Id',
      votingUpWorkshop: 'Liking Steam workshop items',
      gettingAnnouncementParams: 'Getting Steam announcement information',
      likingAnnouncement: 'Liking Steam announcement',
      changingArea: 'Changing Steam area: %0...',
      notNeededChangeArea: 'The current area does not need to be changed',
      noAnotherArea: 'Please check whether the proxy is turned on correctly',
      gettingAreaInfo: 'Getting Steam area information...',
      changeAreaNotice: 'Suspected of a locked zone game, try to change the zone to execute',
      steamFinishNotice: 'Steam task completed, try to change the shopping cart area back to CN',
      gettingSubid: 'Getting subid',
      addingFreeLicense: 'Adding free license',
      missParams: 'Missing parameters',
      gettingLicenses: 'Getting licenses...',
      requestingPlayTestAccess: 'Requesting play test access',
      tryChangeAreaNotice: 'This function cannot detect whether the game is limited, so it will try to change the area before entering the library' + '. Failure to change the area will not affect the subsequent storage.',
      versionNotMatched: 'The script manager version is too low, requiring TamperMonkey >= 5.2.0 or TamperMonkey Beta >= 5.2.6196',
      gettingUserLink: 'Getting steam user community link...',
      retry: 'Retry',
      initingASF: 'Initing ASF...',
      servers: 'Server',
      joiningDiscordServer: 'Joining Discord Server',
      leavingDiscordServer: 'Leaving Discord Server',
      gettingDiscordGuild: 'Getting Discord server Id',
      getDiscordAuthFailed: 'Failed to get Discord token, please check whether the Discord account is logged in',
      discordImportantNotice: 'Important Reminder! ! !',
      discordImportantNoticeText: 'Due to the background update of the Discord website, currently using this script to join a group may cause the Discord account to be forcibly logged out, and two-step verification is required to log in normally, please use it with caution! ! !',
      continue: 'Continue',
      skipDiscordTask: 'Skip',
      continueAndDontRemindAgain: 'Continue without Reminders',
      users: 'User',
      loginIns: 'Please <a href="https://www.instagram.com/accounts/login/" target="_blank">log in to Instagram</a>',
      insBanned: 'Your Instagram account has been banned',
      verifyingInsAuth: 'Verifying Instagram token...',
      gettingInsUserId: 'Getting Instagram user Id',
      followingIns: 'Following Instagram user',
      unfollowingIns: 'Unfollowing Instagram user',
      reddits: 'Reddit/User',
      loginReddit: 'Please <a href="https://www.reddit.com/login/" target="_blank">log in to Reddit</a>',
      changingRedditVersion: 'Switching Reddit to a new version page...',
      joiningReddit: 'Joining the Reddit',
      leavingReddit: 'Leaving the Reddit',
      followingRedditUser: 'Following Reddit User',
      unfollowingRedditUser: 'Unfollowing Reddit User',
      channels: 'Channel',
      followingTwitchChannel: 'Following Twitch Channel',
      unfollowingTwitchChannel: 'Unfollowing Twitch Channel',
      gettingTwitchChannelId: 'Getting Twitch Channel Id',
      checkingTwitchIntegrity: 'Checking Twitch integrity...',
      twitterUser: 'Twitter User',
      retweets: 'Retweet',
      gettingTwitterUserId: 'Getting Twitter User Id',
      followingTwitterUser: 'Following Twitter User',
      unfollowingTwitterUser: 'Unfollowing Twitter User',
      retweetting: 'Retweetting',
      unretweetting: 'Unretweetting',
      names: 'Group/Public/Wall',
      loginVk: 'Please <a href="https://vk.com/login/" target="_blank">log in to Vk</a>',
      gettingVkId: 'Getting Vk task Id',
      joiningVkGroup: 'Joining Vk Group',
      leavingVkGroup: 'Leaving Vk Group',
      joiningVkPublic: 'Joining Vk Public',
      leavingVkPublic: 'Leaving Vk Public',
      sendingVkWall: 'Sending Vk Wall',
      deletingVkWall: 'Deleting Vk Wall',
      youtubeChannel: 'YouTube Channel',
      likes: 'Like',
      loginYtb: 'Please <a href="https://accounts.google.com/ServiceLogin?service=youtube" target="_blank">log in to YouTube</a>',
      tryUpdateYtbAuth: 'Please try to <a href="https://www.youtube.com/#auth" target="_blank">update YouTube token</a>',
      gettingYtbToken: 'Getting YouTube Token...',
      followingYtbChannel: 'Subscribing to YouTube channel',
      unfollowingYtbChannel: 'Unsubscribing to YouTube channel',
      likingYtbVideo: 'Liking YouTube video',
      unlikingYtbVideo: 'Unliking YouTube video',
      giveKeyNoticeBefore: 'Each verification interval is 15s',
      giveKeyNoticeAfter: 'If there is no key, please check at <a href="https://givekey.ru/profile" target="_blank">https://givekey.ru/profile</a>',
      noPoints: 'Not enough points, skip the lottery',
      getNeedPointsFailed: 'ailed to obtain the required points, skip the lottery',
      joiningLottery: 'Joining the lottery',
      doingGleamTask: 'Doing Gleam Task...',
      gettingGleamLink: 'Getting Gleam task link...',
      gleamTaskNotice: 'If this page has not been closed for a long time, please close it yourself after completing any task!',
      verifiedGleamTasks: 'Attempted to verify all tasks. If the verification fails, please try to verify manually or complete it!',
      campaign: 'ReCAPTCHA detected, please complete it and re-verify the tasks!',
      gsNotice: 'In order to avoid getting the "0000-0000-0000" key, the "Grab Key" button has been hidden,' + ' please close the script when obtaining the key!',
      giveeClubVerifyNotice: 'Verifying task...',
      giveeClubVerifyFinished: 'Wait for the verification to complete and join it by yourself',
      doingKeyhubTask: 'Doing Keyhub Task...',
      SweepWidgetNotice: 'The task is being processed and verified. ' + 'There is an interval of 1~3s for each verification task to prevent the triggering of too fast verification warning...',
      confirmingTask: 'Confirming task...'
    };
    const en_US = en_US_data;
    const languages = {
      zh: zh_CN,
      en: en_US
    };
    const language = [ 'zh', 'en' ].includes(globalOptions.other.language) ? globalOptions.other.language : 'en';
    const I18n = (key, ...argvs) => {
      if (!languages[language]?.[key]) {
        return key;
      }
      return languages[language][key].replace(/%([\d]+)/g, (match, index) => argvs[parseInt(index, 10)]);
    };
    const i18n = I18n;
    function throwError(error, name) {
      if (window.TRACE) {
        console.trace('%cAuto-Task[Debug]:', 'color:blue');
      }
      external_Swal_default().fire({
        title: i18n('errorReport'),
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: i18n('toGithub'),
        showDenyButton: true,
        denyButtonText: i18n('toKeylol'),
        cancelButtonText: i18n('close')
      }).then(({
        isDenied,
        isConfirmed
      }) => {
        if (isConfirmed) {
          window.open(`https://github.com/HCLonely/auto-task-v4/issues/new?title=${encodeURIComponent(`[BUG] 脚本报错: ${name}`)}&labels=bug&template=bug_report.yml&website=${encodeURIComponent(window.location.href)}&browser=${encodeURIComponent(JSON.stringify((0, 
          javascript_utils_umd_min.ua)(), null, 4))}&manager=${encodeURIComponent(`${GM_info.scriptHandler} ${GM_info.version}`)}&user-script=${encodeURIComponent(GM_info.script.version)}&logs=${encodeURIComponent(error.stack || 'null')}&run-logs=${encodeURIComponent($.makeArray($('#auto-task-info>li')).map(element => element.innerText).join('\n'))}`, '_blank');
        } else if (isDenied) {
          const text = `错误链接: [url=${window.location.href}]${window.location.href}[/url]

环境:

[code]${JSON.stringify((0, javascript_utils_umd_min.ua)(), null, 4)}[/code]

脚本管理器: ${GM_info.scriptHandler} ${GM_info.version}
脚本版本: ${GM_info.script.version}

报错信息:
[code]${error.stack}[/code]

执行日志:
[code]${$.makeArray($('#auto-task-info>li')).map(element => element.innerText).join('\n')}[/code]`;
          GM_setClipboard(text);
          external_Swal_default().fire({
            title: i18n('copySuccess'),
            icon: 'success',
            confirmButtonText: i18n('ok')
          }).then(() => {
            window.open('https://keylol.com/forum.php?mod=post&action=reply&fid=319&tid=777450', '_blank');
          });
        }
      });
      console.log('%c%s', 'color:white;background:red', `Auto-Task[Error]: ${name}\n${error.stack}`);
    }
    class Social {
      tasks;
      getRealParams(name, links, doTask, link2param) {
        try {
          let realParams = [];
          if (links.length > 0) {
            realParams = [ ...realParams, ...links.map(link => link2param(link)).filter(link => link) ];
          }
          if (!doTask && this.tasks[name].length > 0) {
            realParams = [ ...realParams, ...this.tasks[name] ];
          }
          return unique(realParams);
        } catch (error) {
          throwError(error, 'Social.getRealParams');
          return [];
        }
      }
    }
    const social_Social = Social;
    class Discord extends social_Social {
      tasks;
      whiteList;
      #auth = GM_getValue('discordAuth') || {};
      #cache = GM_getValue('discordCache') || {};
      #initialized = false;
      constructor() {
        super();
        const defaultTasksTemplate = {
          servers: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.discord || {}
        };
      }
      async init(action) {
        try {
          if (!GM_getValue('dontRemindDiscordAgain')) {
            const result = await external_Swal_default().fire({
              title: i18n('discordImportantNotice'),
              text: i18n('discordImportantNoticeText'),
              showCancelButton: true,
              showDenyButton: true,
              confirmButtonText: i18n('continue'),
              cancelButtonText: i18n('skipDiscordTask'),
              denyButtonText: i18n('continueAndDontRemindAgain')
            }).then(({
              isConfirmed,
              isDenied
            }) => {
              if (isConfirmed) {
                return true;
              }
              if (isDenied) {
                GM_setValue('dontRemindDiscordAgain', true);
                return true;
              }
              return false;
            });
            if (!result) {
              this.#initialized = false;
              return 'skip';
            }
          }
          if (GM_getValue('dontRemindDiscordAgain') || action === 'do' && !globalOptions.doTask.discord.servers || action === 'undo' && !globalOptions.undoTask.discord.servers) {
            this.#initialized = false;
            return 'skip';
          }
          if (this.#initialized) {
            return true;
          }
          if (!this.#auth.auth) {
            if (await this.#updateAuth()) {
              this.#initialized = true;
              return true;
            }
            return false;
          }
          const isVerified = await this.#verifyAuth();
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Discord'));
            this.#initialized = true;
            return true;
          }
          GM_setValue('discordAuth', {
            auth: null
          });
          if (await this.#updateAuth()) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Discord'));
            this.#initialized = true;
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Discord'));
          return false;
        } catch (error) {
          throwError(error, 'Discord.init');
          return false;
        }
      }
      async #verifyAuth() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('verifyingAuth', 'Discord')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://discord.com/api/v6/users/@me',
            method: 'HEAD',
            headers: {
              authorization: this.#auth.auth
            }
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Discord.verifyAuth');
          return false;
        }
      }
      async #updateAuth() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', 'Discord')
          });
          return await new Promise(resolve => {
            const newTab = GM_openInTab('https://discord.com/channels/@me#auth', {
              active: true,
              insert: true,
              setParent: true
            });
            newTab.onclose = async () => {
              const auth = GM_getValue('discordAuth')?.auth;
              if (auth) {
                this.#auth = {
                  auth: auth
                };
                logStatus.success();
                resolve(await this.#verifyAuth());
              } else {
                logStatus.error('Error: Update discord auth failed!');
                resolve(false);
              }
            };
          });
        } catch (error) {
          throwError(error, 'Discord.updateAuth');
          return false;
        }
      }
      async #joinServer(inviteId) {
        try {
          const logStatus = scripts_echoLog({
            type: 'joiningDiscordServer',
            text: inviteId
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://discord.com/api/v9/invites/${inviteId}`,
            method: 'POST',
            dataType: 'json',
            headers: {
              authorization: this.#auth.auth,
              origin: 'https://discord.com',
              referer: `https://discord.com/invite/${inviteId}`
            }
          });
          if (result === 'Success' && data?.status === 200) {
            logStatus.success();
            const guild = String(data.response?.guild?.id);
            if (guild) {
              this.#setCache(inviteId, guild);
              this.tasks.servers = unique([ ...this.tasks.servers, inviteId ]);
            }
            return true;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Discord.joinServer');
          return false;
        }
      }
      async #leaveServer(inviteId) {
        try {
          if (this.whiteList.servers.includes(inviteId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Discord.leaveServer',
              id: inviteId
            });
            return true;
          }
          const guild = await this.#getGuild(inviteId);
          if (!guild) {
            return false;
          }
          const logStatus = scripts_echoLog({
            type: 'leavingDiscordServer',
            text: guild
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://discord.com/api/v9/users/@me/guilds/${guild}`,
            method: 'DELETE',
            headers: {
              authorization: this.#auth.auth
            }
          });
          if (result === 'Success' && data?.status === 204) {
            logStatus.success();
            return true;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Discord.leaveServer');
          return false;
        }
      }
      async #getGuild(inviteId) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingDiscordGuild',
            text: inviteId
          });
          const guild = this.#cache[inviteId];
          if (guild) {
            logStatus.success();
            return guild;
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://discord.com/api/v9/invites/${inviteId}`,
            responseType: 'json',
            method: 'GET'
          });
          if (result === 'Success' && data?.status === 200) {
            const guild = data.response?.guild?.id;
            if (guild) {
              logStatus.success();
              this.#setCache(inviteId, guild);
              return guild;
            }
            logStatus.error(`${result}:${statusText}(${status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Discord.getGuild');
          return false;
        }
      }
      async toggle({
        doTask = true,
        serverLinks = []
      }) {
        try {
          if (!this.#initialized) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.discord.servers || !doTask && !globalOptions.undoTask.discord.servers) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'discord.servers'
            });
          } else {
            const realServers = this.getRealParams('servers', serverLinks, doTask, link => link.match(/invite\/(.+)/)?.[1]);
            if (realServers.length > 0) {
              for (const server of realServers) {
                if (doTask) {
                  prom.push(this.#joinServer(server));
                } else {
                  prom.push(this.#leaveServer(server));
                }
                await delay(1e3);
              }
            }
          }
          return await Promise.all(prom).then(() => true);
        } catch (error) {
          throwError(error, 'Discord.toggleServers');
          return false;
        }
      }
      #setCache(inviteId, guild) {
        try {
          this.#cache[inviteId] = guild;
          GM_setValue('discordCache', this.#cache);
        } catch (error) {
          throwError(error, 'Discord.setCache');
        }
      }
    }
    const social_Discord = Discord;
    class Instagram extends social_Social {
      tasks;
      whiteList;
      #cache = GM_getValue('instagramCache') || {};
      #auth = {};
      #initialized = false;
      constructor() {
        super();
        const defaultTasksTemplate = {
          users: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.instagram || {}
        };
      }
      async init() {
        try {
          if (this.#initialized) {
            return true;
          }
          const isVerified = await this.#getUserInfo();
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Instagram'));
            this.#initialized = true;
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Instagram'));
          return false;
        } catch (error) {
          throwError(error, 'Instagram.init');
          return false;
        }
      }
      async #getUserInfo(name = 'instagram') {
        try {
          const logStatus = scripts_echoLog({
            type: name === 'instagram' ? 'verifyingInsAuth' : 'gettingInsUserId',
            text: name
          });
          const userId = this.#cache[name];
          if (userId && name !== 'instagram') {
            logStatus.success();
            return userId;
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://www.instagram.com/${name}/`,
            method: 'GET'
          });
          if (result === 'Success') {
            if (data?.finalUrl.includes('accounts/login')) {
              logStatus.error(`Error:${i18n('loginIns')}`, true);
              return false;
            } else if (data?.finalUrl.includes('www.instagram.com/challenge')) {
              logStatus.error(`Error:${i18n('insBanned')}`);
              return false;
            }
            if (data?.status === 200) {
              const csrftoken = data.responseText.match(/"csrf_token":"(.+?)"/)?.[1];
              const hash = data.responseText.match(/"rollout_hash":"(.+?)"/)?.[1];
              if (name === 'instagram') {
                if (csrftoken && hash) {
                  this.#auth = {
                    csrftoken: csrftoken,
                    hash: hash
                  };
                  return true;
                }
                return false;
              }
              const id = data.responseText.match(/"profilePage_([\d]+?)"/)?.[1];
              if (id) {
                this.#setCache(name, id);
                logStatus.success();
                return id;
              }
              logStatus.error('Error: Get ins data error!');
              return false;
            }
            logStatus.error(`${result}:${statusText}(${status})`);
            return false;
          }
          return false;
        } catch (error) {
          throwError(error, 'Instagram.getUserInfo');
          return false;
        }
      }
      async #followUser(name) {
        try {
          const id = await this.#getUserInfo(name);
          if (!id) {
            return false;
          }
          const logStatus = scripts_echoLog({
            type: 'followingIns',
            text: name
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://www.instagram.com/web/friendships/${id}/follow/`,
            method: 'POST',
            dataType: 'json',
            headers: {
              'x-csrftoken': this.#auth.csrftoken,
              origin: 'https://www.instagram.com',
              referer: `https://www.instagram.com/${name}/`,
              'content-type': 'application/x-www-form-urlencoded',
              'sec-fetch-site': 'same-origin',
              'x-instagram-ajax': this.#auth.hash
            }
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.result === 'following') {
              logStatus.success();
              this.tasks.users = unique([ ...this.tasks.users, name ]);
              return true;
            }
            logStatus.error(`Error:${data?.response?.feedback_message || `${data?.statusText}(${data?.status})`}`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Instagram.followUser');
          return false;
        }
      }
      async #unfollowUser(name) {
        try {
          if (this.whiteList.users.includes(name)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Instagram.unfollowUser',
              id: name
            });
            return true;
          }
          const id = await this.#getUserInfo(name);
          if (!id) {
            return false;
          }
          const logStatus = scripts_echoLog({
            type: 'unfollowingIns',
            text: name
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://www.instagram.com/web/friendships/${id}/unfollow/`,
            method: 'POST',
            dataType: 'json',
            headers: {
              'x-csrftoken': this.#auth.csrftoken,
              origin: 'https://www.instagram.com',
              referer: `https://www.instagram.com/${name}/`,
              'content-type': 'application/x-www-form-urlencoded',
              'sec-fetch-site': 'same-origin',
              'x-instagram-ajax': this.#auth.hash
            }
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.status === 'ok') {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Instagram.unfollowUser');
          return false;
        }
      }
      async toggle({
        doTask = true,
        userLinks = []
      }) {
        try {
          if (!this.#initialized) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.instagram.users || !doTask && !globalOptions.undoTask.instagram.users) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'instagram.users'
            });
          } else {
            const realUsers = this.getRealParams('users', userLinks, doTask, link => link.match(/https:\/\/www\.instagram\.com\/(.+)?\//)?.[1]);
            if (realUsers.length > 0) {
              for (const username of realUsers) {
                if (doTask) {
                  prom.push(this.#followUser(username));
                } else {
                  prom.push(this.#unfollowUser(username));
                }
                await delay(1e3);
              }
            }
          }
          return await Promise.all(prom).then(() => true);
        } catch (error) {
          throwError(error, 'Instagram.toggleUsers');
          return false;
        }
      }
      #setCache(name, id) {
        try {
          this.#cache[name] = id;
          GM_setValue('instagramCache', this.#cache);
        } catch (error) {
          throwError(error, 'Instagram.setCache');
        }
      }
    }
    const social_Instagram = Instagram;
    class Reddit extends social_Social {
      tasks;
      whiteList;
      #auth;
      #initialized = false;
      constructor() {
        super();
        const defaultTasksTemplate = {
          reddits: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.reddit || {}
        };
      }
      async init() {
        try {
          if (this.#initialized) {
            return true;
          }
          const isVerified = await this.#updateAuth();
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Reddit'));
            this.#initialized = true;
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Reddit'));
          return false;
        } catch (error) {
          throwError(error, 'Reddit.init');
          return false;
        }
      }
      async #useBeta() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('changingRedditVersion')
          });
          GM_setValue('redditAuth', null);
          return await new Promise(resolve => {
            const newTab = GM_openInTab('https://www.reddit.com/#auth', {
              active: true,
              insert: true,
              setParent: true
            });
            newTab.onclose = async () => {
              logStatus.success();
              resolve(await this.#updateAuth(true));
            };
          });
        } catch (error) {
          throwError(error, 'Reddit.useBeta');
          return false;
        }
      }
      async #updateAuth(beta = false) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', 'Reddit')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://www.reddit.com/',
            method: 'GET',
            nochche: true,
            headers: {
              'Cache-Control': 'no-cache'
            }
          });
          if (result === 'Success') {
            if (data?.responseText.includes('www.reddit.com/login/')) {
              logStatus.error(`Error:${i18n('loginReddit')}`, true);
              return false;
            }
            if (data?.status === 200) {
              if (data.responseText.includes('redesign-beta-optin-btn') && !beta) {
                return await this.#useBeta();
              }
              const accessToken = data.responseText.match(/"accessToken":"(.*?)","expires":"(.*?)"/)?.[1];
              if (accessToken) {
                this.#auth = {
                  token: accessToken
                };
                logStatus.success();
                return true;
              }
              logStatus.error('Error: Parameter "accessToken" not found!');
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Reddit.updateAuth');
          return false;
        }
      }
      async toggleTask({
        name,
        doTask = true
      }) {
        try {
          if (!doTask && this.whiteList.reddits.includes(name)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Reddit.undoTask',
              id: name
            });
            return true;
          }
          let type = doTask ? 'joiningReddit' : 'leavingReddit';
          if (/^u_/.test(name)) {
            type = doTask ? 'followingRedditUser' : 'unfollowingRedditUser';
          }
          const logStatus = scripts_echoLog({
            type: type,
            text: name
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://oauth.reddit.com/api/subscribe?redditWebClient=desktop2x&app=desktop2x-client-production&raw_json=1&gilding_detail=1',
            method: 'POST',
            headers: {
              authorization: `Bearer ${this.#auth.token}`,
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: $.param({
              action: doTask ? 'sub' : 'unsub',
              sr_name: name,
              api_type: 'json'
            })
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              logStatus.success();
              if (doTask) {
                this.tasks.reddits = unique([ ...this.tasks.reddits, name ]);
              }
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Reddit.toggleTask');
          return false;
        }
      }
      async toggle({
        doTask = true,
        redditLinks = []
      }) {
        try {
          if (!this.#initialized) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.reddit.reddits || !doTask && !globalOptions.undoTask.reddit.reddits) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'reddit.reddits'
            });
          } else {
            const realReddits = this.getRealParams('reddits', redditLinks, doTask, link => {
              const name = link.match(/https?:\/\/www\.reddit\.com\/r\/([^/]*)/)?.[1];
              const userName = link.match(/https?:\/\/www\.reddit\.com\/user\/([^/]*)/)?.[1];
              if (userName) {
                return name || userName;
              }
              return name;
            });
            if (realReddits.length > 0) {
              for (const name of realReddits) {
                prom.push(this.toggleTask({
                  name: name,
                  doTask: doTask
                }));
                await delay(1e3);
              }
            }
          }
          return await Promise.all(prom).then(() => true);
        } catch (error) {
          throwError(error, 'Reddit.toggle');
          return false;
        }
      }
    }
    const social_Reddit = Reddit;
    class Twitch extends social_Social {
      tasks;
      whiteList;
      #auth = GM_getValue('twitchAuth') || {};
      #cache = GM_getValue('twitchCache') || {};
      #initialized = false;
      #integrityToken;
      constructor() {
        super();
        const defaultTasksTemplate = {
          channels: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.twitch || {}
        };
      }
      async init() {
        try {
          if (this.#initialized) {
            return true;
          }
          if (!this.#auth.authToken || !this.#auth.clientId || !this.#auth.clientVersion || !this.#auth.deviceId || !this.#auth.clientSessionId) {
            if (await this.#updateAuth()) {
              this.#initialized = true;
              return true;
            }
            return false;
          }
          const isVerified = await this.#verifyAuth(true);
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Twitch'));
            this.#initialized = true;
            return true;
          }
          GM_setValue('twitchAuth', null);
          if (await this.#updateAuth()) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Twitch'));
            this.#initialized = true;
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Twitch'));
          return false;
        } catch (error) {
          throwError(error, 'Twitch.init');
          return false;
        }
      }
      async #verifyAuth(isFirst) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('verifyingAuth', 'Twitch')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://gql.twitch.tv/gql',
            method: 'POST',
            dataType: 'json',
            headers: {
              Authorization: `OAuth ${this.#auth.authToken}`,
              'Client-Id': this.#auth.clientId
            },
            data: '[{"operationName":"FrontPageNew_User","variables":{"limit":1},"extensions":{"persistedQuery":{"version":1,' + '"sha256Hash":"64bd07a2cbaca80699d62636d966cf6395a5d14a1f0a14282067dcb28b13eb11"}}}]'
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.[0]?.data?.currentUser) {
              await this.#integrity(isFirst);
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Twitch.verifyAuth');
          return false;
        }
      }
      async #integrity(isFirst = true, ct = '') {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('checkingTwitchIntegrity')
          });
          if (isFirst && (!this.#auth.authToken || !this.#auth.clientId || !this.#auth.clientVersion || !this.#auth.deviceId || !this.#auth.clientSessionId)) {
            return await this.#updateAuth(false);
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://gql.twitch.tv/integrity',
            method: 'POST',
            dataType: 'json',
            anonymous: true,
            headers: {
              Origin: 'https://www.twitch.tv',
              Referer: 'https://www.twitch.tv/',
              Authorization: `OAuth ${this.#auth.authToken}`,
              'Client-Id': this.#auth.clientId,
              'Client-Version': this.#auth.clientVersion,
              'X-Device-Id': this.#auth.deviceId,
              'Client-Session-Id': this.#auth.clientSessionId,
              'x-kpsdk-ct': ct
            }
          });
          if (result === 'Success') {
            if (!ct && data?.responseHeaders?.['x-kpsdk-ct']) {
              return await this.#integrity(isFirst, data.responseHeaders['x-kpsdk-ct']);
            }
            if (data?.status === 200 && data.response?.token) {
              this.#integrityToken = data.response.token;
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Twitch.integrity');
          return false;
        }
      }
      async #updateAuth(isFirst = true) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', 'Twitch')
          });
          return await new Promise(resolve => {
            const newTab = GM_openInTab('https://www.twitch.tv/#auth', {
              active: true,
              insert: true,
              setParent: true
            });
            newTab.onclose = async () => {
              const auth = GM_getValue('twitchAuth');
              if (auth) {
                this.#auth = auth;
                logStatus.success();
                resolve(await this.#verifyAuth(isFirst));
              } else {
                logStatus.error('Error: Update twitch auth failed!');
                resolve(false);
              }
            };
          });
        } catch (error) {
          throwError(error, 'Twitch.updateAuth');
          return false;
        }
      }
      async #toggleChannel({
        name,
        doTask = true
      }) {
        try {
          if (!doTask && this.whiteList.channels.includes(name)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Twitch.unfollowChannel',
              id: name
            });
            return true;
          }
          const channelId = await this.#getChannelId(name);
          if (!channelId) {
            return false;
          }
          const logStatus = scripts_echoLog({
            type: `${doTask ? '' : 'un'}followingTwitchChannel`,
            text: name
          });
          const followData = `[{"operationName":"FollowButton_FollowUser","variables":{"input":{"disableNotifications":false,"targetID":"${channelId}` + '"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"800e7346bdf7e5278a3c1d3f21b2b56e2639928f86815677a7126b093b2fdd08"}}}]';
          const unfollowData = `[{"operationName":"FollowButton_UnfollowUser","variables":{"input":{"targetID":"${channelId}"}},` + '"extensions":{"persistedQuery":{"version":1,"sha256Hash":"f7dae976ebf41c755ae2d758546bfd176b4eeb856656098bb40e0a672ca0d880"}}}]';
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://gql.twitch.tv/gql',
            method: 'POST',
            dataType: 'json',
            anonymous: true,
            headers: {
              Origin: 'https://www.twitch.tv',
              Referer: 'https://www.twitch.tv/',
              Authorization: `OAuth ${this.#auth.authToken}`,
              'Client-Id': this.#auth.clientId,
              'Client-Version': this.#auth.clientVersion,
              'X-Device-Id': this.#auth.deviceId,
              'Client-Session-Id': this.#auth.clientSessionId,
              'Client-Integrity': this.#integrityToken
            },
            data: doTask ? followData : unfollowData
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.[0] && !data.response[0].errors) {
              logStatus.success();
              if (doTask) {
                this.tasks.channels = unique([ ...this.tasks.channels, name ]);
              }
              return true;
            }
            logStatus.error(`Error:${data?.response?.[0].errors?.[0]?.message || `${data?.statusText}(${data?.status})`}`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Twitch.toggleChannel');
          return false;
        }
      }
      async #getChannelId(name) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingTwitchChannelId',
            text: name
          });
          const channelId = this.#cache[name];
          if (channelId) {
            logStatus.success();
            return channelId;
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://gql.twitch.tv/gql',
            method: 'POST',
            headers: {
              Authorization: `OAuth ${this.#auth.authToken}`,
              'Client-Id': this.#auth.clientId
            },
            responseType: 'json',
            data: `[{"operationName":"ActiveWatchParty","variables":{"channelLogin":"${name}"},` + '"extensions":{"persistedQuery":{"version":1,"sha256Hash":"4a8156c97b19e3a36e081cf6d6ddb5dbf9f9b02ae60e4d2ff26ed70aebc80a30"}}}]'
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              const channelId = data.response?.[0]?.data?.user?.id;
              if (channelId) {
                this.#setCache(name, String(channelId));
                logStatus.success();
                return channelId;
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Twitch.getChannelId');
          return false;
        }
      }
      async toggle({
        doTask = true,
        channelLinks = []
      }) {
        try {
          if (!this.#initialized) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.twitch.channels || !doTask && !globalOptions.undoTask.twitch.channels) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'twitch.channels'
            });
          } else {
            const realChannels = this.getRealParams('channels', channelLinks, doTask, link => link.match(/https:\/\/(www\.)?twitch\.tv\/(.+)/)?.[2]);
            if (realChannels.length > 0) {
              for (const channel of realChannels) {
                prom.push(this.#toggleChannel({
                  name: channel,
                  doTask: doTask
                }));
                await delay(1e3);
              }
            }
          }
          return Promise.all(prom).then(() => true);
        } catch (error) {
          throwError(error, 'Twitch.toggle');
          return false;
        }
      }
      #setCache(name, id) {
        try {
          this.#cache[name] = id;
          GM_setValue('twitchCache', this.#cache);
        } catch (error) {
          throwError(error, 'Twitch.setCache');
        }
      }
    }
    const social_Twitch = Twitch;
    class Twitter extends social_Social {
      tasks;
      whiteList;
      #verifyId = globalOptions.other.twitterVerifyId;
      #auth = GM_getValue('twitterAuth') || {};
      #cache = GM_getValue('twitterCache') || {};
      #initialized = false;
      constructor() {
        super();
        const defaultTasksTemplate = {
          users: [],
          retweets: [],
          likes: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.twitter || {}
        };
      }
      async init() {
        try {
          if (this.#initialized) {
            return true;
          }
          if (!this.#auth.ct0) {
            if (await this.#updateAuth()) {
              this.#initialized = true;
              return true;
            }
            return false;
          }
          const isVerified = await this.#verifyAuth();
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Twitter'));
            this.#initialized = true;
            return true;
          }
          GM_setValue('twitterAuth', null);
          if (await this.#updateAuth()) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Twitter'));
            this.#initialized = true;
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Twitter'));
          return false;
        } catch (error) {
          throwError(error, 'Twitter.init');
          return false;
        }
      }
      async #verifyAuth() {
        try {
          return await this.#toggleUser({
            name: 'verify',
            doTask: true,
            verify: true
          });
        } catch (error) {
          throwError(error, 'Twitter.verifyAuth');
          return false;
        }
      }
      async #updateAuth() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', 'Twitter')
          });
          return await new Promise(resolve => {
            GM_cookie.list({
              url: 'https://x.com/settings/account'
            }, async (cookies, error) => {
              if (!error) {
                const [ ct0, isLogin ] = cookies.map(cookie => [ 'ct0', 'twid' ].includes(cookie.name) ? cookie.value : null).filter(cookie => cookie);
                if (isLogin && ct0) {
                  GM_setValue('twitterAuth', {
                    ct0: ct0
                  });
                  this.#auth = {
                    ct0: ct0
                  };
                  logStatus.success();
                  resolve(await this.#verifyAuth());
                } else {
                  logStatus.error(i18n('needLogin'));
                  resolve(false);
                }
              } else {
                logStatus.error('Error: Update twitter auth failed!');
                resolve(false);
              }
            });
          });
        } catch (error) {
          throwError(error, 'Twitter.updateToken');
          return false;
        }
      }
      async #toggleUser({
        name,
        doTask = true,
        verify = false
      }) {
        try {
          if (!doTask && !verify && this.whiteList.users.includes(name)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Twitter.unfollowUser',
              id: name
            });
            return true;
          }
          const userId = verify ? this.#verifyId : await this.userName2id(name);
          if (!userId) {
            return false;
          }
          const logStatus = verify ? scripts_echoLog({
            text: i18n('verifyingAuth', 'Twitter')
          }) : scripts_echoLog({
            type: `${doTask ? '' : 'un'}followingTwitterUser`,
            text: name
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://x.com/i/api/1.1/friendships/${doTask ? 'create' : 'destroy'}.json`,
            method: 'POST',
            headers: {
              authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
              'Content-Type': 'application/x-www-form-urlencoded',
              'x-csrf-token': this.#auth.ct0
            },
            responseType: 'json',
            data: $.param({
              include_profile_interstitial_type: 1,
              include_blocking: 1,
              include_blocked_by: 1,
              include_followed_by: 1,
              include_want_retweets: 1,
              include_mute_edge: 1,
              include_can_dm: 1,
              include_can_media_tag: 1,
              skip_status: 1,
              id: userId
            })
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              logStatus.success();
              if (doTask && !verify) {
                this.tasks.users = unique([ ...this.tasks.users, name ]);
              }
              return true;
            }
            if (verify && data?.status === 403 && data.response?.errors?.[0]?.code === 158) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Twitter.toggleUser');
          return false;
        }
      }
      async userName2id(name) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingTwitterUserId',
            text: name
          });
          const userId = this.#cache[name];
          if (userId) {
            logStatus.success();
            return userId;
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://x.com/i/api/graphql/mCbpQvZAw6zu_4PvuAUVVQ/UserByScreenName' + `?variables=%7B%22screen_name%22%3A%22${name}%22%2C%22withSafetyModeUserFields%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%7D`,
            method: 'GET',
            headers: {
              authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
              'content-type': 'application/json',
              referer: `https://x.com/${name}`,
              'x-csrf-token': this.#auth.ct0
            },
            responseType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              let response = data.response || (typeof data.responseText === 'object' ? data.responseText : null);
              if (!response) {
                try {
                  response = JSON.parse(data.responseText);
                } catch (error) {
                  response = null;
                }
              }
              const userId = String(response?.data?.user?.result?.rest_id);
              if (userId) {
                this.#setCache(name, userId);
                logStatus.success();
                return userId;
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Twitter.getUserId');
          return false;
        }
      }
      async #toggleRetweet({
        retweetId,
        doTask = true
      }) {
        try {
          if (!doTask && this.whiteList.retweets.includes(retweetId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Twitter.unretweet',
              id: retweetId
            });
            return true;
          }
          const logStatus = scripts_echoLog({
            type: `${doTask ? '' : 'un'}retweetting`,
            text: retweetId
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://x.com/i/api/graphql/${doTask ? 'ojPdsZsimiJrUGLR1sjUtA/CreateRetweet' : 'iQtK4dl5hBmXewYZuEOKVw/DeleteRetweet'}`,
            method: 'POST',
            headers: {
              authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
              'Content-Type': 'application/json',
              'x-csrf-token': this.#auth.ct0
            },
            data: `{"variables":{"tweet_id":"${retweetId}","dark_request":false},"queryId":"${doTask ? 'ojPdsZsimiJrUGLR1sjUtA' : 'iQtK4dl5hBmXewYZuEOKVw'}"}`,
            responseType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200 || data?.status === 403 && data.response?.errors?.[0]?.code === 327) {
              logStatus.success();
              if (doTask) {
                this.tasks.retweets = unique([ ...this.tasks.retweets, retweetId ]);
              }
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Twitter.toggleRetweet');
          return false;
        }
      }
      async toggle({
        doTask = true,
        userLinks = [],
        retweetLinks = []
      }) {
        try {
          if (!this.#initialized) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.twitter.users || !doTask && !globalOptions.undoTask.twitter.users) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'twitter.users'
            });
          } else {
            const realUsers = this.getRealParams('users', userLinks, doTask, link => link.match(/https:\/\/x\.com\/(.+)/)?.[1] || link.match(/https:\/\/twitter\.com\/(.+)/)?.[1]);
            if (realUsers.length > 0) {
              for (const user of realUsers) {
                prom.push(this.#toggleUser({
                  name: user,
                  doTask: doTask
                }));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.twitter.retweets || !doTask && !globalOptions.undoTask.twitter.retweets) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'twitter.retweets'
            });
          } else {
            const realRetweets = this.getRealParams('retweets', retweetLinks, doTask, link => link.match(/https:\/\/x\.com\/.*?\/status\/([\d]+)/)?.[1] || link.match(/https:\/\/twitter\.com\/.*?\/status\/([\d]+)/)?.[1]);
            if (realRetweets.length > 0) {
              for (const retweet of realRetweets) {
                prom.push(this.#toggleRetweet({
                  retweetId: retweet,
                  doTask: doTask
                }));
                await delay(1e3);
              }
            }
          }
          return Promise.all(prom).then(() => true);
        } catch (error) {
          throwError(error, 'Twitter.toggle');
          return false;
        }
      }
      #setCache(name, id) {
        try {
          this.#cache[name] = id;
          GM_setValue('twitterCache', this.#cache);
        } catch (error) {
          throwError(error, 'Twitter.setCache');
        }
      }
    }
    const social_Twitter = Twitter;
    class Vk extends social_Social {
      tasks;
      whiteList;
      #username = '';
      #cache = GM_getValue('vkCache') || {};
      #initialized = false;
      constructor() {
        super();
        const defaultTasksTemplate = {
          names: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.vk || {}
        };
      }
      async init() {
        try {
          if (this.#initialized) {
            return true;
          }
          const isVerified = await this.#verifyAuth();
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Vk'));
            this.#initialized = true;
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Vk'));
          return false;
        } catch (error) {
          throwError(error, 'Vk.init');
          return false;
        }
      }
      async #verifyAuth() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('verifyAuth', 'Vk')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://vk.com/im',
            method: 'GET'
          });
          if (result === 'Success') {
            if (data?.finalUrl.includes('vk.com/login')) {
              logStatus.error(`Error:${i18n('loginVk')}`, true);
              return false;
            }
            if (data?.status === 200) {
              this.#username = data.responseText.match(/TopNavBtn__profileLink" href="\/(.*?)"/)?.[1] || '';
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Vk.verifyAuth');
          return false;
        }
      }
      async #toggleGroup(name, dataParam, doTask = true) {
        try {
          const logStatus = scripts_echoLog({
            type: doTask ? 'joiningVkGroup' : 'leavingVkGroup',
            text: name
          });
          if (dataParam.groupAct === 'enter' && !doTask || dataParam.groupAct === 'leave' && doTask) {
            logStatus.success();
            return true;
          }
          const reqData = {
            act: doTask ? 'enter' : 'leave',
            al: 1,
            gid: dataParam.groupId,
            hash: dataParam.groupHash
          };
          if (doTask) {
            reqData.context = '_';
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://vk.com/al_groups.php',
            method: 'POST',
            headers: {
              origin: 'https://vk.com',
              referer: `https://vk.com/${name}`,
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: $.param(reqData)
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              logStatus.success();
              if (doTask) {
                this.tasks.names = unique([ ...this.tasks.names, name ]);
              }
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Vk.toggleGroup');
          return false;
        }
      }
      async #togglePublic(name, dataParam, doTask = true) {
        try {
          const logStatus = scripts_echoLog({
            type: doTask ? 'joiningVkPublic' : 'leavingVkPublic',
            text: name
          });
          if (dataParam.publicJoined && doTask || !dataParam.publicJoined && !doTask) {
            logStatus.success();
            return true;
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://vk.com/al_public.php',
            method: 'POST',
            headers: {
              origin: 'https://vk.com',
              referer: `https://vk.com/${name}`,
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: $.param({
              act: doTask ? 'a_enter' : 'a_leave',
              al: 1,
              pid: dataParam.publicPid,
              hash: dataParam.publicHash
            })
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              logStatus.success();
              if (doTask) {
                this.tasks.names = unique([ ...this.tasks.names, name ]);
              }
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Vk.togglePublic');
          return false;
        }
      }
      async #sendWall(name) {
        try {
          const logStatus = scripts_echoLog({
            type: 'sendingVkWall',
            text: name
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://vk.com/like.php',
            method: 'POST',
            headers: {
              origin: 'https://vk.com',
              referer: `https://vk.com/${name}`,
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: $.param({
              act: 'publish_box',
              al: 1,
              object: name
            })
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              const hash = data.responseText.match(/shHash:[\s]*'(.*?)'/)?.[1];
              if (hash) {
                const {
                  result: resultR,
                  statusText: statusTextR,
                  status: statusR,
                  data: dataR
                } = await tools_httpRequest({
                  url: 'https://vk.com/like.php',
                  method: 'POST',
                  headers: {
                    origin: 'https://vk.com',
                    referer: `https://vk.com/${name}`,
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: $.param({
                    Message: '',
                    act: 'a_do_publish',
                    al: 1,
                    close_comments: 0,
                    friends_only: 0,
                    from: 'box',
                    hash: hash,
                    list: '',
                    mark_as_ads: 0,
                    mute_notifications: 0,
                    object: name,
                    ret_data: 1,
                    to: 0
                  })
                });
                if (resultR === 'Success') {
                  if (dataR?.status === 200) {
                    const jsonData = JSON.parse(dataR.responseText?.replace('\x3c!--', '') || '{}');
                    if (jsonData?.payload?.[1]?.[1]?.share_my === true) {
                      logStatus.success();
                      const postId = String(jsonData?.payload?.[1]?.[1]?.post_id);
                      const ownerId = String(jsonData?.payload?.[1]?.[1]?.owner_id);
                      if (postId && ownerId) {
                        this.#setCache(name, `${ownerId}_${postId}`);
                      }
                      this.tasks.names = unique([ ...this.tasks.names, name ]);
                      return true;
                    }
                  }
                  logStatus.error(`Error:${dataR?.statusText}(${dataR?.status})`);
                  return false;
                }
                logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
                return false;
              }
              logStatus.error('Error: Get "hash" failed');
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Vk.sendWall');
          return false;
        }
      }
      async #deleteWall(name, dataParams) {
        try {
          const logStatus = scripts_echoLog({
            type: 'deletingVkWall',
            text: name
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://vk.com/al_wall.php?act=delete',
            method: 'POST',
            headers: {
              origin: 'https://vk.com',
              referer: `https://vk.com/${this.#username}?w=wall${this.#cache[name]}%2Fall`,
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: $.param({
              act: 'delete',
              al: 1,
              confirm: 0,
              from: 'wkview',
              hash: dataParams.wallHash,
              post: this.#cache[name]
            })
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              const jsonData = JSON.parse(data.responseText?.replace('\x3c!--', '') || '{}');
              if (jsonData?.payload?.[1]?.[1]) {
                logStatus.success();
                return true;
              }
              logStatus.error(`Error:${data?.statusText}(${data?.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Vk.deleteWall');
          return false;
        }
      }
      async #getId(name, doTask) {
        try {
          let url = `https://vk.com/${name}`;
          if (/^wall-/.test(name)) {
            if (doTask) {
              return {
                type: 'sendWall'
              };
            }
            if (!this.#cache[name]) {
              return {
                type: 'unSupport'
              };
            }
            url = `https://vk.com/${this.#username}?w=wall${this.#cache[name]}`;
          }
          const logStatus = scripts_echoLog({
            type: 'gettingVkId',
            text: name
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: url,
            method: 'GET'
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              const [ , groupAct, groupId, , groupHash ] = data.responseText.match(/Groups.(enter|leave)\(.*?,.*?([\d]+?), (&#39;|')(.*?)(&#39;|')/) || [];
              const publicHash = data.responseText.match(/"enterHash":"(.*?)"/)?.[1];
              const publicPid = data.responseText.match(/"public_id":([\d]+?),/)?.[1];
              const publicJoined = !data.responseText.includes('Public.subscribe');
              if (groupAct && groupId && groupHash) {
                logStatus.success();
                return {
                  groupAct: groupAct,
                  groupId: groupId,
                  groupHash: groupHash,
                  type: 'group'
                };
              } else if (publicHash && publicPid) {
                logStatus.success();
                return {
                  publicHash: publicHash,
                  publicPid: publicPid,
                  publicJoined: publicJoined,
                  type: 'public'
                };
              } else if (data.responseText.includes('wall.deletePost') && !doTask) {
                const wallHash = data.responseText.match(/wall\.deletePost\(this, '.*?', '(.*?)'\)/)?.[1];
                if (wallHash) {
                  logStatus.success();
                  return {
                    type: 'deleteWall',
                    wallHash: wallHash
                  };
                }
              } else if (name.includes('wall') && doTask) {
                logStatus.success();
                return {
                  type: 'sendWall'
                };
              }
              logStatus.error('Error: Parameters not found!');
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Vk.getId');
          return false;
        }
      }
      async #toggleVk({
        name,
        doTask = true
      }) {
        try {
          if (!doTask && this.whiteList.names.includes(name)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Vk.undoTask',
              id: name
            });
            return true;
          }
          const formatName = name.replace(/\/$/, '');
          const data = await this.#getId(formatName, doTask);
          if (!data) {
            return false;
          }
          switch (data.type) {
           case 'group':
            return await this.#toggleGroup(formatName, data, doTask);

           case 'public':
            return await this.#togglePublic(formatName, data, doTask);

           case 'sendWall':
            return doTask ? await this.#sendWall(formatName) : true;

           case 'deleteWall':
            return doTask ? true : await this.#deleteWall(formatName, data);

           default:
            return false;
          }
        } catch (error) {
          throwError(error, 'Vk.toggleVk');
          return false;
        }
      }
      async toggle({
        doTask = true,
        nameLinks = []
      }) {
        try {
          if (!this.#initialized) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.vk.names || !doTask && !globalOptions.undoTask.vk.names) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'vk.names'
            });
          } else {
            const realNames = this.getRealParams('names', nameLinks, doTask, link => link.match(/https:\/\/vk\.com\/([^/]+)/)?.[1]);
            if (realNames.length > 0) {
              for (const name of realNames) {
                prom.push(this.#toggleVk({
                  name: name,
                  doTask: doTask
                }));
                await delay(1e3);
              }
            }
          }
          return Promise.all(prom).then(() => true);
        } catch (error) {
          throwError(error, 'Vk.toggle');
          return false;
        }
      }
      #setCache(name, postId) {
        try {
          this.#cache[name] = postId;
          GM_setValue('vkCache', this.#cache);
        } catch (error) {
          throwError(error, 'Vk.setCache');
        }
      }
    }
    const social_Vk = Vk;
    const getInfo = async function(link, type) {
      try {
        const logStatus = scripts_echoLog({
          text: i18n('gettingYtbToken')
        });
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: link,
          method: 'GET'
        });
        if (result === 'Success') {
          if (data?.status === 200) {
            if (data.responseText.includes('accounts.google.com/ServiceLogin?service=youtube')) {
              logStatus.error(`Error:${i18n('loginYtb')}`, true);
              return {
                needLogin: true
              };
            }
            const apiKey = data.responseText.match(/"INNERTUBE_API_KEY":"(.*?)"/)?.[1];
            const context = (data.responseText.match(/\(\{"INNERTUBE_CONTEXT":([\w\W]*?)\}\)/) || data.responseText.match(/"INNERTUBE_CONTEXT":([\w\W]*?\}),"INNERTUBE/))?.[1] || '{}';
            const {
              client,
              request
            } = JSON.parse(context);
            if (apiKey && client && request) {
              client.hl = 'en';
              if (type === 'channel') {
                const channelId = data.responseText.match(/"channelId":"(.+?)"/)?.[1];
                if (channelId) {
                  logStatus.success();
                  return {
                    params: {
                      apiKey: apiKey,
                      client: client,
                      request: request,
                      channelId: channelId
                    }
                  };
                }
                logStatus.error('Error: Get "channelId" failed!');
                return {};
              } else if (type === 'likeVideo') {
                const videoId = data.responseText.match(/<link rel="shortlinkUrl" href="https:\/\/youtu\.be\/(.*?)">/)?.[1];
                const likeParams = data.responseText.match(/"likeParams":"(.*?)"/)?.[1];
                if (videoId) {
                  logStatus.success();
                  return {
                    params: {
                      apiKey: apiKey,
                      client: client,
                      request: request,
                      videoId: videoId,
                      likeParams: likeParams
                    }
                  };
                }
                logStatus.error('Error: Get "videoId" failed!');
                return {};
              }
              logStatus.error('Error: Unknown type');
              return {};
            }
            logStatus.error('Error: Parameter "apiKey" not found!');
            return {};
          }
          logStatus.error(`Error:${data?.statusText}(${data?.status})`);
          return {};
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return {};
      } catch (error) {
        throwError(error, 'Youtube.getInfo');
        return {};
      }
    };
    class Youtube extends social_Social {
      tasks;
      whiteList;
      #auth = GM_getValue('youtubeAuth') || {};
      #initialized = false;
      #verifyChannel = `https://www.youtube.com/channel/${globalOptions.other.youtubeVerifyChannel}`;
      constructor() {
        super();
        const defaultTasksTemplate = {
          channels: [],
          likes: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.youtube || {}
        };
      }
      async init() {
        try {
          if (this.#initialized) {
            return true;
          }
          if (!this.#auth.PAPISID) {
            if (await this.#updateAuth()) {
              this.#initialized = true;
              return true;
            }
            return false;
          }
          const isVerified = await this.#verifyAuth();
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Youtube'));
            this.#initialized = true;
            return true;
          }
          GM_setValue('youtubeAuth', null);
          if (await this.#updateAuth()) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Youtube'));
            this.#initialized = true;
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Youtube'));
          return false;
        } catch (error) {
          throwError(error, 'Youtube.init');
          return false;
        }
      }
      async #verifyAuth() {
        try {
          return await this.#toggleChannel({
            link: this.#verifyChannel,
            doTask: true,
            verify: true
          });
        } catch (error) {
          throwError(error, 'Youtube.verifyAuth');
          return false;
        }
      }
      async #updateAuth() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', 'Youtube')
          });
          return await new Promise(resolve => {
            GM_cookie.list({
              url: 'https://www.youtube.com/@YouTube'
            }, async (cookies, error) => {
              if (!error) {
                const PAPISID = cookies.find(cookie => cookie.name === '__Secure-3PAPISID')?.value;
                if (PAPISID) {
                  GM_setValue('youtubeAuth', {
                    PAPISID: PAPISID
                  });
                  this.#auth = {
                    PAPISID: PAPISID
                  };
                  logStatus.success();
                  resolve(await this.#verifyAuth());
                } else {
                  logStatus.error(i18n('needLogin'));
                  resolve(false);
                }
              } else {
                logStatus.error('Error: Update youtube auth failed!');
                resolve(false);
              }
            });
          });
        } catch (error) {
          throwError(error, 'Youtube.updateAuth');
          return false;
        }
      }
      #getInfo(link, type) {
        return getInfo(link, type);
      }
      async #toggleChannel({
        link,
        doTask = true,
        verify = false
      }) {
        try {
          const {
            params,
            needLogin
          } = await this.#getInfo(link, 'channel');
          const {
            apiKey,
            client,
            request,
            channelId
          } = params || {};
          if (needLogin) {
            scripts_echoLog({
              html: i18n('loginYtb')
            });
            return false;
          }
          if (!(apiKey && client && request && channelId)) {
            scripts_echoLog({
              text: '"getYtbToken" failed'
            });
            return false;
          }
          if (!doTask && !verify && this.whiteList.channels.includes(channelId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Youtube.unfollowChannel',
              id: channelId
            });
            return true;
          }
          const logStatus = verify ? scripts_echoLog({
            text: i18n('verifyingAuth', 'Youtube')
          }) : scripts_echoLog({
            type: doTask ? 'followingYtbChannel' : 'unfollowingYtbChannel',
            text: channelId
          });
          const nowTime = parseInt(String(new Date().getTime() / 1e3), 10);
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://www.youtube.com/youtubei/v1/subscription/${doTask ? '' : 'un'}subscribe?key=${apiKey}&prettyPrint=false`,
            method: 'POST',
            headers: {
              origin: 'https://www.youtube.com',
              referer: `https://www.youtube.com/channel/${channelId}`,
              'content-type': 'application/json',
              'x-goog-authuser': '0',
              'x-goog-visitor-id': client?.visitorData,
              'x-origin': 'https://www.youtube.com',
              authorization: `SAPISIDHASH ${nowTime}_${sha1(`${nowTime} ${this.#auth.PAPISID} https://www.youtube.com`)}`
            },
            data: JSON.stringify({
              context: {
                client: client,
                request: {
                  sessionId: request?.sessionId,
                  internalExperimentFlags: [],
                  consistencyTokenJars: []
                },
                user: {}
              },
              channelIds: [ channelId ],
              params: doTask ? 'EgIIAhgA' : 'CgIIAhgA'
            })
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              if (doTask && (/"subscribed":true/.test(data.responseText) || data.responseText.includes('The subscription already exists')) || !doTask && /"subscribed":false/.test(data.responseText)) {
                logStatus.success();
                if (doTask && !verify) {
                  this.tasks.channels = unique([ ...this.tasks.channels, link ]);
                }
                return true;
              }
              if (verify && data.responseText.includes('You may not subscribe to yourself')) {
                logStatus.success();
                return true;
              }
              logStatus.error(i18n('tryUpdateYtbAuth'), true);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Youtube.toggleChannel');
          return false;
        }
      }
      async #toggleLikeVideo({
        link,
        doTask = true
      }) {
        try {
          const {
            params,
            needLogin
          } = await this.#getInfo(link, 'likeVideo');
          const {
            apiKey,
            client,
            request,
            videoId,
            likeParams
          } = params || {};
          if (needLogin) {
            scripts_echoLog({
              html: `${i18n('loginYtb')}`
            });
            return false;
          }
          if (!(apiKey && client && request && videoId && likeParams)) {
            scripts_echoLog({
              text: '"getYtbToken" failed'
            });
            return false;
          }
          if (!doTask && this.whiteList.likes.includes(videoId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Youtube.unlikeVideo',
              id: videoId
            });
            return true;
          }
          const logStatus = scripts_echoLog({
            type: doTask ? 'likingYtbVideo' : 'unlikingYtbVideo',
            text: videoId
          });
          const nowTime = parseInt(String(new Date().getTime() / 1e3), 10);
          const likeVideoData = {
            context: {
              client: client,
              request: {
                sessionId: request.sessionId,
                internalExperimentFlags: [],
                consistencyTokenJars: []
              },
              user: {}
            },
            target: {
              videoId: videoId
            }
          };
          if (doTask) {
            if (likeParams) {
              likeVideoData.params = likeParams;
            } else {
              logStatus.error('Empty likeParams');
              return false;
            }
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://www.youtube.com/youtubei/v1/like/${doTask ? '' : 'remove'}like?key=${apiKey}`,
            method: 'POST',
            headers: {
              origin: 'https://www.youtube.com',
              referer: `https://www.youtube.com/watch?v=${videoId}`,
              'content-type': 'application/json',
              'x-goog-authuser': '0',
              'x-goog-visitor-id': client.visitorData,
              'x-origin': 'https://www.youtube.com',
              authorization: `SAPISIDHASH ${nowTime}_${sha1(`${nowTime} ${this.#auth.PAPISID} https://www.youtube.com`)}`
            },
            data: JSON.stringify(likeVideoData)
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              if (doTask && data.responseText.includes('Added to Liked videos') || !doTask && (data.responseText.includes('Removed from Liked videos') || data.responseText.includes('Dislike removed'))) {
                logStatus.success();
                if (doTask) {
                  this.tasks.likes = unique([ ...this.tasks.likes, link ]);
                }
                return true;
              }
              logStatus.error(i18n('tryUpdateYtbAuth'), true);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Youtube.toggleLikeVideo');
          return false;
        }
      }
      async toggle({
        doTask = true,
        channelLinks = [],
        videoLinks = []
      }) {
        try {
          if (!this.#initialized) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.youtube.channels || !doTask && !globalOptions.undoTask.youtube.channels) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'youtube.channels'
            });
          } else {
            const realChannels = this.getRealParams('channels', channelLinks, doTask, link => {
              if (/^https:\/\/(www\.)?google\.com.*?\/url\?.*?url=https:\/\/www\.youtube\.com\/.*/.test(link)) {
                return link.match(/url=(https:\/\/www\.youtube\.com\/.*)/)?.[1];
              }
              return link;
            });
            if (realChannels.length > 0) {
              for (const channel of realChannels) {
                prom.push(this.#toggleChannel({
                  link: channel,
                  doTask: doTask
                }));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.youtube.likes || !doTask && !globalOptions.undoTask.youtube.likes) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'youtube.likes'
            });
          } else {
            const realLikes = this.getRealParams('likes', videoLinks, doTask, link => {
              if (/^https:\/\/(www\.)?google\.com.*?\/url\?.*?url=https:\/\/www\.youtube\.com\/.*/.test(link)) {
                return link.match(/url=(https:\/\/www\.youtube\.com\/.*)/)?.[1];
              }
              return link;
            });
            if (realLikes.length > 0) {
              for (const video of realLikes) {
                prom.push(this.#toggleLikeVideo({
                  link: video,
                  doTask: doTask
                }));
                await delay(1e3);
              }
            }
          }
          return Promise.all(prom).then(() => true);
        } catch (error) {
          throwError(error, 'Youtube.toggle');
          return false;
        }
      }
    }
    class SteamASF {
      #asfOptions;
      #botName = 'asf';
      #groupInfo;
      async init() {
        try {
          const asfCommandsUrl = new URL('/Api/Command/', globalOptions.ASF.AsfIpcUrl);
          this.#asfOptions = {
            url: asfCommandsUrl.href,
            method: 'POST',
            responseType: 'json',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              Host: asfCommandsUrl.host,
              Origin: asfCommandsUrl.origin,
              Referer: asfCommandsUrl.href,
              Authentication: globalOptions.ASF.AsfIpcPassword
            }
          };
          if (globalOptions.ASF.AsfBotname) {
            this.#botName = globalOptions.ASF.AsfBotname;
          }
          const logStatus = scripts_echoLog({
            text: i18n('initingASF')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: '{"Command":"!stats"}'
          });
          if (result === 'Success') {
            if (data?.response?.Success === true && data.response.Message === 'OK' && data.response.Result) {
              logStatus.success();
              return true;
            }
            if (data?.response?.Result || data?.response?.Message) {
              logStatus.error(data?.response?.Result || data.response.Message);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.init');
          return false;
        }
      }
      async joinGroup(groupName) {
        try {
          const logStatus = scripts_echoLog({
            type: 'joiningSteamGroup',
            text: groupName
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!JOINGROUP ${this.#botName} ${groupName}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && [ '已加入', '已申请', 'Joined', 'Applied', 'Присоединился', 'costs' ].find(text => data.response?.Result?.includes(text))) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.joinGroup');
          return false;
        }
      }
      async leaveGroup(groupName) {
        try {
          if (!this.#groupInfo) {
            if (!await this.#getGroupId()) {
              return false;
            }
          }
          const groupId = await this.#groupInfo[groupName];
          if (!groupId) {
            return false;
          }
          const logStatus = scripts_echoLog({
            type: 'leavingSteamGroup',
            text: groupName
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!LEAVEGROUP ${this.#botName} ${groupId}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && [ '成功', 'Success', 'Успех' ].find(text => data.response?.Result?.includes(text))) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.leaveGroup');
          return false;
        }
      }
      async #getGroupId() {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingSteamGroupId',
            text: 'All'
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!GROUPLIST ${this.#botName}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.Result?.includes('|')) {
              this.#groupInfo = Object.fromEntries(data.response.Result.split('\n').map(line => {
                const [ , name, id ] = line.trim().split('|');
                if (name && id) {
                  return [ name, id ];
                }
                return null;
              }).filter(ele => ele));
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.getGroupID');
          return false;
        }
      }
      async addToWishlist(gameId) {
        try {
          const logStatus = scripts_echoLog({
            type: 'addingToWishlist',
            text: gameId
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!ADDWISHLIST ${this.#botName} ${gameId}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && [ '成功', 'Success', 'Успех' ].find(text => data.response?.Result?.includes(text))) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.addToWishlist');
          return false;
        }
      }
      async removeFromWishlist(gameId) {
        try {
          const logStatus = scripts_echoLog({
            type: 'removingFromWishlist',
            text: gameId
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!REMOVEWISHLIST ${this.#botName} ${gameId}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && [ '成功', 'Success', 'Успех' ].find(text => data.response?.Result?.includes(text))) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.removeFromWishlist');
          return false;
        }
      }
      async toggleFollowGame(gameId, doTask) {
        try {
          const logStatus = scripts_echoLog({
            type: `${doTask ? '' : 'un'}followingGame`,
            text: gameId
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!${doTask ? '' : 'UN'}FOLLOWGAME ${this.#botName} ${gameId}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && [ '成功', 'Success', 'Успех' ].find(text => data.response?.Result?.includes(text))) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.toggleFollowGame');
          return false;
        }
      }
      async toggleCurator(curatorId, doTask = true) {
        try {
          const logStatus = scripts_echoLog({
            type: doTask ? 'followingCurator' : 'unfollowingCurator',
            text: curatorId
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!${doTask ? '' : 'UN'}FOLLOWCURATOR ${this.#botName} ${curatorId}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && [ '成功', 'Success', 'Успех' ].find(text => data.response?.Result?.includes(text))) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.toggleCurator');
          return false;
        }
      }
      async addLicense(id) {
        try {
          const [ type, ids ] = id.split('-');
          if (type === 'appid') {
            const logStatus = scripts_echoLog({
              type: 'addingFreeLicense',
              text: ids
            });
            const {
              result,
              statusText,
              status,
              data
            } = await tools_httpRequest({
              ...this.#asfOptions,
              data: JSON.stringify({
                Command: `!addlicense ${this.#botName} app/${ids}`
              })
            });
            if (result === 'Success') {
              if (data?.status === 200 && [ 'AlreadyPurchased', 'OK' ].find(text => data.response?.Result?.includes(text))) {
                logStatus.success();
                return true;
              }
              logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
              return false;
            }
            logStatus.error(`${result}:${statusText}(${status})`);
            return false;
          } else if (type === 'subid') {
            const idsArr = ids.split(',');
            const logStatus = scripts_echoLog({
              type: 'addingFreeLicenseSubid',
              text: ids
            });
            const {
              result,
              statusText,
              status,
              data
            } = await tools_httpRequest({
              ...this.#asfOptions,
              data: JSON.stringify({
                Command: `!addlicense ${this.#botName} ${idsArr.map(id => `sub/${id}`).join(',')}`
              })
            });
            if (result === 'Success') {
              if (data?.status === 200 && data.response?.Result) {
                const resultLines = data.response.Result.split('\n');
                idsArr.forEach(subid => {
                  const targetLine = resultLines.find(text => text.includes(subid));
                  if (targetLine && [ '成功', 'Success', 'Успех' ].find(text => targetLine.includes(text))) {
                    scripts_echoLog({}).success(targetLine);
                  } else {
                    scripts_echoLog({}).error(targetLine);
                  }
                });
                return true;
              }
              logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
              return false;
            }
            logStatus.error(`${result}:${statusText}(${status})`);
            return false;
          }
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.addLicense');
          return false;
        }
      }
      async requestPlayTestAccess(id) {
        try {
          const logStatus = scripts_echoLog({
            type: 'requestingPlayTestAccess',
            text: id
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!REQUESTACCESS ${this.#botName} ${id}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && [ '成功', 'Success', 'Успех' ].find(text => data.response?.Result?.includes(text))) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.requestPlayTestAccess');
          return false;
        }
      }
    }
    const social_SteamASF = SteamASF;
    class Steam extends social_Social {
      tasks;
      whiteList;
      #cache = {
        ...{
          group: {},
          officialGroup: {},
          forum: {},
          workshop: {},
          curator: {}
        },
        ...GM_getValue('steamCache')
      };
      #auth = {};
      #storeInitialized = false;
      #communityInitialized = false;
      #area = 'CN';
      #areaStatus = 'end';
      #ASF;
      constructor() {
        super();
        const defaultTasksTemplate = {
          groups: [],
          officialGroups: [],
          wishlists: [],
          follows: [],
          forums: [],
          workshops: [],
          workshopVotes: [],
          curators: [],
          curatorLikes: [],
          announcements: [],
          licenses: [],
          playtests: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.steam || {}
        };
      }
      async init(type = 'all') {
        try {
          if (globalOptions.ASF.AsfEnabled && globalOptions.ASF.AsfIpcUrl && globalOptions.ASF.AsfIpcPassword) {
            this.#ASF = new social_SteamASF();
            if (await this.#ASF.init()) {
              this.#storeInitialized = true;
              this.#communityInitialized = true;
              return true;
            }
            return false;
          }
          if (type === 'store') {
            if (this.#storeInitialized) {
              return true;
            }
            let storeInitialized = await this.#updateStoreAuth();
            if (!storeInitialized) {
              storeInitialized = await this.#updateStoreAuthTab();
            }
            this.#storeInitialized = storeInitialized;
            if (!this.#storeInitialized) {
              scripts_echoLog({}).error(i18n('initFailed', 'Steam'));
              return false;
            }
            scripts_echoLog({}).success(i18n('initSuccess', 'SteamStore'));
            return true;
          }
          if (type === 'community') {
            if (this.#communityInitialized) {
              return true;
            }
            let communityInitialized = await this.#getUserLink();
            if (!communityInitialized) {
              communityInitialized = await this.#updateCommunityAuthTab();
            }
            this.#communityInitialized = communityInitialized;
            if (!this.#communityInitialized) {
              scripts_echoLog({}).error(i18n('initFailed', 'Steam'));
              return false;
            }
            scripts_echoLog({}).success(i18n('initSuccess', 'SteamCommunity'));
            return true;
          }
          if (this.#storeInitialized && this.#communityInitialized) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Steam'));
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Steam'));
          return false;
        } catch (error) {
          throwError(error, 'Steam.init');
          return false;
        }
      }
      async #refreshToken(type = 'steamStore') {
        try {
          const host = {
            steamStore: 'store.steampowered.com',
            steamCommunity: 'steamcommunity.com'
          };
          const logStatus = scripts_echoLog({
            text: i18n('refreshingToken', i18n(type))
          });
          const formData = new FormData();
          formData.append('redir', `https://${host[type]}/`);
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://login.steampowered.com/jwt/ajaxrefresh',
            method: 'POST',
            responseType: 'json',
            headers: {
              Host: 'login.steampowered.com',
              Origin: `https://${host[type]}`,
              Referer: `https://${host[type]}/`
            },
            data: formData
          });
          if (result === 'Success') {
            if (data?.response?.success) {
              if (await this.#setStoreToken(data.response, type)) {
                logStatus.success();
                return true;
              }
              logStatus.error('Error');
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.refreshToken');
          return false;
        }
      }
      async #setStoreToken(param, type) {
        try {
          const host = {
            steamStore: 'store.steampowered.com',
            steamCommunity: 'steamcommunity.com'
          };
          const logStatus = scripts_echoLog({
            text: i18n('settingToken', i18n(type))
          });
          const formData = new FormData();
          formData.append('steamID', param.steamID);
          formData.append('nonce', param.nonce);
          formData.append('redir', param.redir);
          formData.append('auth', param.auth);
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://${host[type]}/login/settoken`,
            method: 'POST',
            headers: {
              Accept: 'application/json, text/plain, */*',
              Host: host[type],
              Origin: `https://${host[type]}`
            },
            data: formData
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.setStoreToken');
          return false;
        }
      }
      async #updateStoreAuth(retry = false) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', i18n('steamStore'))
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://store.steampowered.com/',
            method: 'GET',
            headers: {
              Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
              'Cache-Control': 'max-age=0',
              'Sec-Fetch-Dest': 'document',
              'Sec-Fetch-Mode': 'navigate',
              'Upgrade-Insecure-Requests': '1'
            },
            fetch: false,
            redirect: 'manual'
          });
          if (data?.status === 200) {
            if (!data.responseText.includes('data-miniprofile=')) {
              if (await this.#refreshToken('steamStore')) {
                logStatus.warning(i18n('retry'));
                if (retry) {
                  logStatus.error(`Error:${i18n('needLoginSteamStore')}`, true);
                  return false;
                }
                return this.#updateStoreAuth(true);
              }
              logStatus.error(`Error:${i18n('needLoginSteamStore')}`, true);
              return false;
            }
            const storeSessionID = data.responseText.match(/g_sessionID = "(.+?)";/)?.[1];
            if (storeSessionID) {
              this.#auth.storeSessionID = storeSessionID;
              logStatus.success();
              return true;
            }
            logStatus.error('Error: Get "sessionID" failed');
            return false;
          }
          if ([ 301, 302 ].includes(data?.status)) {
            if (await this.#refreshToken('steamStore')) {
              logStatus.warning(i18n('retry'));
              if (retry) {
                logStatus.error(`Error:${i18n('needLoginSteamStore')}`, true);
                return false;
              }
              return this.#updateStoreAuth(true);
            }
            logStatus.error(`Error:${i18n('needLoginSteamStore')}`, true);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.updateStoreAuth');
          return false;
        }
      }
      async #updateStoreAuthTab() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', i18n('steamStore'))
          });
          return await new Promise(resolve => {
            const newTab = window.open('https://store.steampowered.com/', 'mozillaWindow', 'pop=1;');
            GM_setValue('steamStoreAuth', 'update');
            const listenerId = GM_addValueChangeListener('steamStoreAuth', (key, oldValue, newValue, remote) => {
              GM_removeValueChangeListener(listenerId);
              newTab?.close();
              if (newValue && JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
                this.#auth.storeSessionID = newValue.storeSessionID;
                logStatus.success();
                resolve(true);
                return;
              }
              logStatus.error('Failed');
              resolve(false);
            });
          });
        } catch (error) {
          throwError(error, 'Steam.updateStoreAuthTab');
          return false;
        }
      }
      async #updateCommunityAuthTab() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', i18n('steamCommunity'))
          });
          return await new Promise(resolve => {
            const newTab = window.open('https://steamcommunity.com/my', 'mozillaWindow', 'pop=1;');
            GM_setValue('steamCommunityAuth', 'update');
            const listenerId = GM_addValueChangeListener('steamCommunityAuth', (key, oldValue, newValue, remote) => {
              GM_removeValueChangeListener(listenerId);
              newTab?.close();
              if (newValue && JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
                this.#auth.steam64Id = newValue.steam64Id;
                this.#auth.userName = newValue.userName;
                this.#auth.communitySessionID = newValue.communitySessionID;
                logStatus.success();
                resolve(true);
                return;
              }
              logStatus.error('Failed');
              resolve(false);
            });
          });
        } catch (error) {
          throwError(error, 'Steam.updateCommunityAuthTab');
          return false;
        }
      }
      async #getUserLink(retry = false) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('gettingUserLink')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://steamcommunity.com/my',
            method: 'GET',
            headers: {
              Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
              'Cache-Control': 'max-age=0',
              'Sec-Fetch-Dest': 'document',
              'Sec-Fetch-Mode': 'navigate',
              'Upgrade-Insecure-Requests': '1'
            },
            fetch: false,
            redirect: 'manual'
          });
          if (data?.status === 200) {
            if (data.finalUrl.includes('https://steamcommunity.com/login/home')) {
              logStatus.error(`Error:${i18n('needLoginSteamCommunity')}`, true);
              return false;
            }
            const steam64Id = data.responseText.match(/g_steamID = "(.+?)";/)?.[1];
            const communitySessionID = data.responseText.match(/g_sessionID = "(.+?)";/)?.[1];
            const userName = data.responseText.match(/steamcommunity.com\/id\/(.+?)\/friends\//)?.[1];
            if (steam64Id) {
              this.#auth.steam64Id = steam64Id;
            }
            if (userName) {
              this.#auth.userName = userName;
            }
            if (communitySessionID) {
              this.#auth.communitySessionID = communitySessionID;
              logStatus.success();
              return true;
            }
            logStatus.error('Error: Get "sessionID" failed');
            return false;
          }
          if (data?.status === 302) {
            if (await this.#refreshToken('steamCommunity')) {
              if (retry) {
                logStatus.error(`Error:${i18n('needLoginSteamCommunity')}`, true);
                return false;
              }
              logStatus.warning(i18n('retry'));
              return this.#getUserLink(true);
            }
            logStatus.error(`Error:${i18n('needLoginSteamCommunity')}`, true);
            return false;
          }
          const location = data?.responseHeaders?.split('\n')?.find(header => header.includes('location') ? header.replace('loctation:', '').trim() : null);
          if (data?.status === 301 && location?.includes('steamcommunity.com/id')) {
            logStatus.success();
            return await this.#updateCommunityAuth(data.finalUrl);
          }
          if (data?.status === 301 && location?.includes('https://steamcommunity.com/login/home')) {
            logStatus.error(`Error:${i18n('needLoginSteamCommunity')}`, true);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.updateCommunityAuth');
          return false;
        }
      }
      async #updateCommunityAuth(url) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', i18n('steamCommunity'))
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: url,
            method: 'GET',
            headers: {
              Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
              'Cache-Control': 'max-age=0',
              'Sec-Fetch-Dest': 'document',
              'Sec-Fetch-Mode': 'navigate',
              'Upgrade-Insecure-Requests': '1'
            }
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              if (data.finalUrl.includes('https://steamcommunity.com/login/home')) {
                logStatus.error(`Error:${i18n('needLoginSteamCommunity')}`, true);
                return false;
              }
              const steam64Id = data.responseText.match(/g_steamID = "(.+?)";/)?.[1];
              const communitySessionID = data.responseText.match(/g_sessionID = "(.+?)";/)?.[1];
              const userName = data.responseText.match(/steamcommunity.com\/id\/(.+?)\/friends\//)?.[1];
              if (steam64Id) {
                this.#auth.steam64Id = steam64Id;
              }
              if (userName) {
                this.#auth.userName = userName;
              }
              if (communitySessionID) {
                this.#auth.communitySessionID = communitySessionID;
                logStatus.success();
                return true;
              }
              logStatus.error('Error: Get "sessionID" failed');
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.updateCommunityAuth');
          return false;
        }
      }
      async #getAreaInfo() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('gettingAreaInfo')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://store.steampowered.com/cart/',
            method: 'GET'
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              const cartConfigRaw = data.responseText.match(/data-cart_config="(.*?)"/)?.[1];
              const temp = document.createElement('div');
              temp.innerHTML = cartConfigRaw || '{}';
              const cartConfigStr = temp.textContent || temp.innerText;
              let cartConfig;
              try {
                cartConfig = JSON.parse(cartConfigStr);
              } catch (error) {
                logStatus.error('Error: get country info filed');
                console.error(error);
                return {};
              }
              if (!cartConfig.rgUserCountryOptions) {
                logStatus.warning('Warning: Area cannot be changed');
                return {};
              }
              const userInfoRaw = data.responseText.match(/data-userinfo="(.*?)"/)?.[1];
              const temp1 = document.createElement('div');
              temp1.innerHTML = userInfoRaw || '{}';
              const userInfoStr = temp1.textContent || temp1.innerText;
              let userInfo;
              try {
                userInfo = JSON.parse(userInfoStr);
              } catch (error) {
                logStatus.error('Error: get country info filed');
                console.error(error);
                return {};
              }
              const currentArea = userInfo.country_code;
              const areas = Object.keys(cartConfig.rgUserCountryOptions).filter(area => area !== 'help');
              if (currentArea && areas.length > 0) {
                this.#area = currentArea;
                logStatus.success();
                return {
                  currentArea: currentArea,
                  areas: areas
                };
              }
              logStatus.error('Error: get country info filed');
              return {};
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return {};
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return {};
        } catch (error) {
          throwError(error, 'Steam.getAreaInfo');
          return {};
        }
      }
      async #changeArea(area) {
        try {
          if (this.#areaStatus === 'waiting') {
            await new Promise(resolve => {
              const checker = setInterval(() => {
                if (this.#areaStatus !== 'waiting') {
                  clearInterval(checker);
                  resolve(true);
                }
              });
            });
          }
          if (this.#area === area || !area && this.#area !== 'CN') {
            return true;
          }
          this.#areaStatus = 'waiting';
          let aimedArea = area;
          if (!aimedArea) {
            const {
              currentArea,
              areas
            } = await this.#getAreaInfo();
            if (!currentArea || !areas) {
              this.#areaStatus = 'error';
              return false;
            }
            if (currentArea !== 'CN') {
              this.#areaStatus = 'skip';
              scripts_echoLog({
                text: 'notNeededChangeArea'
              });
              return 'skip';
            }
            const anotherArea = areas.filter(area => area && area !== 'CN');
            if (!anotherArea || anotherArea.length === 0) {
              this.#areaStatus = 'noAnotherArea';
              scripts_echoLog({
                text: 'noAnotherArea'
              });
              return false;
            }
            [ aimedArea ] = anotherArea;
          }
          const logStatus = scripts_echoLog({
            text: i18n('changingArea', aimedArea)
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://store.steampowered.com/country/setcountry',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
              cc: aimedArea,
              sessionid: this.#auth.storeSessionID
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.responseText === 'true') {
              const {
                currentArea
              } = await this.#getAreaInfo();
              if (currentArea === aimedArea) {
                this.#areaStatus = 'success';
                logStatus.success();
                return currentArea;
              }
              this.#areaStatus = 'error';
              logStatus.error('Error: change country filed');
              return 'CN';
            }
            this.#areaStatus = 'error';
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return 'CN';
          }
          this.#areaStatus = 'error';
          logStatus.error(`${result}:${statusText}(${status})`);
          return 'CN';
        } catch (error) {
          this.#areaStatus = 'error';
          throwError(error, 'Steam.changeArea');
          return false;
        }
      }
      async #joinGroup(groupName) {
        try {
          if (this.#ASF) {
            if (await this.#ASF.joinGroup(groupName)) {
              this.tasks.groups = unique([ ...this.tasks.groups, groupName ]);
              return true;
            }
            return false;
          }
          const logStatus = scripts_echoLog({
            type: 'joiningSteamGroup',
            text: groupName
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://steamcommunity.com/groups/${groupName}`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
              action: 'join',
              sessionID: this.#auth.communitySessionID
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && !data.responseText.includes('grouppage_join_area')) {
              logStatus.success();
              this.tasks.groups = unique([ ...this.tasks.groups, groupName ]);
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.joinGroup');
          return false;
        }
      }
      async #leaveGroup(groupName) {
        try {
          if (this.whiteList.groups.includes(groupName)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Steam.leaveGroup',
              id: groupName
            });
            return true;
          }
          if (this.#ASF) {
            return await this.#ASF.leaveGroup(groupName);
          }
          const groupId = await this.#getGroupId(groupName);
          if (!groupId) {
            return false;
          }
          const logStatus = scripts_echoLog({
            type: 'leavingSteamGroup',
            text: groupName
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://steamcommunity.com/id/${this.#auth.userName}/home_process`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
              sessionID: this.#auth.communitySessionID,
              action: 'leaveGroup',
              groupId: groupId
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.finalUrl.includes('groups') && $(data.responseText.replace(/<img.*?>/g, '').toLowerCase()).find(`a[href='https://steamcommunity.com/groups/${groupName.toLowerCase()}']`).length === 0) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.leaveGroup');
          return false;
        }
      }
      async #getGroupId(groupName) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingSteamGroupId',
            text: groupName
          });
          const groupId = this.#cache.group[groupName];
          if (groupId) {
            logStatus.success();
            return groupId;
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://steamcommunity.com/groups/${groupName}`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              const groupId = data.responseText.match(/OpenGroupChat\( '([0-9]+)'/)?.[1];
              if (groupId) {
                this.#setCache('group', groupName, groupId);
                logStatus.success();
                return groupId;
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.getGroupID');
          return false;
        }
      }
      async #joinOfficialGroup(gameId) {
        try {
          if (this.#ASF) {
            if (await this.#ASF.joinGroup(gameId)) {
              this.tasks.officialGroups = unique([ ...this.tasks.officialGroups, gameId ]);
              return true;
            }
            return false;
          }
          const logStatus = scripts_echoLog({
            type: 'joiningSteamOfficialGroup',
            text: gameId
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://steamcommunity.com/games/${gameId}?action=join&sessionID=${this.#auth.communitySessionID}`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          });
          if (result === 'Success') {
            if (data?.status === 200 && !data.responseText.includes('id="publicGroupJoin"')) {
              logStatus.success();
              this.tasks.officialGroups = unique([ ...this.tasks.officialGroups, gameId ]);
              const groupId = data.responseText.match(/steam:\/\/friends\/joinchat\/([0-9]+)/)?.[1];
              if (groupId) {
                this.#setCache('officialGroup', gameId, groupId);
              }
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.joinOfficialGroup');
          return false;
        }
      }
      async #leaveOfficialGroup(gameId) {
        try {
          if (this.whiteList.officialGroups.includes(gameId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Steam.leaveOfficialGroup',
              id: gameId
            });
            return true;
          }
          if (this.#ASF) {
            return await this.#ASF.leaveGroup(gameId);
          }
          const groupId = await this.#getOfficialGroupId(gameId);
          if (!groupId) {
            return false;
          }
          const logStatus = scripts_echoLog({
            type: 'leavingSteamOfficialGroup',
            text: gameId
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://steamcommunity.com/id/${this.#auth.userName}/home_process`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
              sessionID: this.#auth.communitySessionID,
              action: 'leaveGroup',
              groupId: groupId
            })
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              const {
                result: resultR,
                statusText: statusTextR,
                status: statusR,
                data: dataR
              } = await tools_httpRequest({
                url: `https://steamcommunity.com/games/${gameId}`,
                method: 'GET',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
              });
              if (resultR === 'Success') {
                if (dataR?.status === 200 && dataR.responseText.includes('id="publicGroupJoin"')) {
                  logStatus.success();
                  return true;
                }
                logStatus.error(`Error:${dataR?.statusText}(${dataR?.status})`);
                return false;
              }
              logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.leaveOfficialGroup');
          return false;
        }
      }
      async #getOfficialGroupId(gameId) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingSteamOfficialGroupId',
            text: gameId
          });
          const groupId = this.#cache.officialGroup[gameId];
          if (groupId) {
            logStatus.success();
            return groupId;
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://steamcommunity.com/games/${gameId}`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              const groupId = data.responseText.match(/steam:\/\/friends\/joinchat\/([0-9]+)/)?.[1];
              if (groupId) {
                this.#setCache('officialGroup', gameId, groupId);
                logStatus.success();
                return groupId;
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.getGroupID');
          return false;
        }
      }
      async #addToWishlist(gameId) {
        try {
          if (this.#ASF) {
            if (await this.#ASF.addToWishlist(gameId)) {
              this.tasks.wishlists = unique([ ...this.tasks.wishlists, gameId ]);
              return true;
            }
            return false;
          }
          const logStatus = scripts_echoLog({
            type: 'addingToWishlist',
            text: gameId
          });
          const {
            result,
            data
          } = await tools_httpRequest({
            url: 'https://store.steampowered.com/api/addtowishlist',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
              sessionid: this.#auth.storeSessionID,
              appid: gameId
            }),
            dataType: 'json'
          });
          if (result === 'Success' && data?.status === 200 && data.response?.success === true) {
            logStatus.success();
            this.tasks.wishlists = unique([ ...this.tasks.wishlists, gameId ]);
            return true;
          }
          const {
            result: resultR,
            statusText: statusTextR,
            status: statusR,
            data: dataR
          } = await tools_httpRequest({
            url: `https://store.steampowered.com/app/${gameId}`,
            method: 'GET'
          });
          if (resultR === 'Success') {
            if (dataR?.status === 200) {
              if (this.#area === 'CN' && dataR.responseText.includes('id="error_box"')) {
                logStatus.warning(i18n('changeAreaNotice'));
                if (!await this.#changeArea()) {
                  return false;
                }
                return await this.#addToWishlist(gameId);
              }
              if (dataR.responseText.includes('class="queue_actions_ctn"') && dataR.responseText.includes('class="already_in_library"')) {
                logStatus.success();
                this.tasks.wishlists = unique([ ...this.tasks.wishlists, gameId ]);
                return true;
              } else if (dataR.responseText.includes('class="queue_actions_ctn"') && dataR.responseText.includes('id="add_to_wishlist_area_success" style="display: none;') || !dataR.responseText.includes('class="queue_actions_ctn"')) {
                logStatus.error(`Error:${dataR.statusText}(${dataR.status})`);
                return false;
              }
              logStatus.success();
              this.tasks.wishlists = unique([ ...this.tasks.wishlists, gameId ]);
              return true;
            }
            logStatus.error(`Error:${dataR?.statusText}(${dataR?.status})`);
            return false;
          }
          logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.addToWishlist');
          return false;
        }
      }
      async #removeFromWishlist(gameId) {
        try {
          if (this.whiteList.wishlists.includes(gameId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Steam.removeFromWishlist',
              id: gameId
            });
            return true;
          }
          if (this.#ASF) {
            return await this.#ASF.removeFromWishlist(gameId);
          }
          const logStatus = scripts_echoLog({
            type: 'removingFromWishlist',
            text: gameId
          });
          const {
            result,
            data
          } = await tools_httpRequest({
            url: 'https://store.steampowered.com/api/removefromwishlist',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
              sessionid: this.#auth.storeSessionID,
              appid: gameId
            }),
            dataType: 'json'
          });
          if (result === 'Success' && data?.status === 200 && data.response?.success === true) {
            logStatus.success();
            return true;
          }
          const {
            result: resultR,
            statusText: statusTextR,
            status: statusR,
            data: dataR
          } = await tools_httpRequest({
            url: `https://store.steampowered.com/app/${gameId}`,
            method: 'GET'
          });
          if (resultR === 'Success') {
            if (dataR?.status === 200) {
              if (this.#area === 'CN' && dataR.responseText.includes('id="error_box"')) {
                logStatus.warning(i18n('changeAreaNotice'));
                const result = await this.#changeArea();
                if (!result || result === 'CN' || result === 'skip') {
                  return false;
                }
                return await this.#removeFromWishlist(gameId);
              }
              if (dataR.responseText.includes('class="queue_actions_ctn"') && (dataR.responseText.includes('ds_owned_flag ds_flag') || dataR.responseText.includes('add_to_wishlist_area'))) {
                logStatus.success();
                return true;
              }
              logStatus.error(`Error:${dataR.statusText}(${dataR.status})`);
              return false;
            }
            logStatus.error(`Error:${dataR?.statusText}(${dataR?.status})`);
            return false;
          }
          logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.removeFromWishlist');
          return false;
        }
      }
      async #toggleFollowGame(gameId, doTask) {
        try {
          if (!doTask && this.whiteList.follows.includes(gameId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Steam.unfollowGame',
              id: gameId
            });
            return true;
          }
          if (this.#ASF) {
            if (await this.#ASF.toggleFollowGame(gameId, doTask)) {
              if (doTask) {
                this.tasks.follows = unique([ ...this.tasks.follows, gameId ]);
              }
              return true;
            }
            return false;
          }
          const logStatus = scripts_echoLog({
            type: `${doTask ? '' : 'un'}followingGame`,
            text: gameId
          });
          const requestData = {
            sessionid: this.#auth.storeSessionID,
            appid: gameId
          };
          if (!doTask) {
            requestData.unfollow = '1';
          }
          const {
            result,
            data
          } = await tools_httpRequest({
            url: 'https://store.steampowered.com/explore/followgame/',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param(requestData)
          });
          if (result === 'Success' && data?.status === 200 && data.responseText === 'true') {
            logStatus.success();
            return true;
          }
          const followed = await this.#isFollowedGame(gameId);
          if (this.#area === 'CN' && followed === 'areaLocked') {
            logStatus.warning(i18n('changeAreaNotice'));
            if (!await this.#changeArea()) {
              return false;
            }
            return await this.#removeFromWishlist(gameId);
          }
          if (doTask === followed) {
            logStatus.success();
            if (doTask) {
              this.tasks.follows = unique([ ...this.tasks.follows, gameId ]);
            }
            return true;
          }
          logStatus.error(`Error:${data?.statusText}(${data?.status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.toggleFollowGame');
          return false;
        }
      }
      async #isFollowedGame(gameId) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: `https://store.steampowered.com/app/${gameId}`,
            method: 'GET'
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              if (this.#area === 'CN' && data.responseText.includes('id="error_box"')) {
                return 'areaLocked';
              }
              if ($(data.responseText.replace(/<img.*?>/g, '')).find('.queue_control_button.queue_btn_follow>.btnv6_blue_hoverfade.btn_medium.queue_btn_active').css('display') !== 'none') {
                return true;
              }
              return false;
            }
            return false;
          }
          return false;
        } catch (error) {
          throwError(error, 'Steam.isFollowedGame');
          return false;
        }
      }
      async #toggleForum(gameId, doTask = true) {
        try {
          if (!doTask && this.whiteList.forums.includes(gameId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Steam.unsubscribeForum',
              id: gameId
            });
            return true;
          }
          const forumId = await this.#getForumId(gameId);
          if (!forumId) {
            return false;
          }
          const logStatus = scripts_echoLog({
            type: `${doTask ? '' : 'un'}subscribingForum`,
            text: gameId
          });
          const [ id, feature ] = forumId.split('_');
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://steamcommunity.com/forum/${id}/General/${doTask ? '' : 'un'}subscribe/${feature || '0'}/`,
            method: 'POST',
            responseType: 'json',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
              sessionid: this.#auth.communitySessionID
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && (data.response?.success === 1 || data.response?.success === 29)) {
              if (doTask) {
                this.tasks.forums = unique([ ...this.tasks.forums, gameId ]);
              }
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return true;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return true;
        } catch (error) {
          throwError(error, 'Steam.toggleForum');
          return true;
        }
      }
      async #getForumId(gameId) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingForumId',
            text: gameId
          });
          const forumId = this.#cache.forum[gameId];
          if (forumId) {
            logStatus.success();
            return forumId;
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://steamcommunity.com/app/${gameId}/discussions/`,
            method: 'GET'
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              const forumId = data.responseText?.match(/General_([\d]+(_[\d]+)?)/)?.[1];
              if (forumId) {
                this.#setCache('forum', gameId, forumId);
                logStatus.success();
                return forumId;
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.getForumId');
          return false;
        }
      }
      async #toggleFavoriteWorkshop(id, doTask = true) {
        try {
          if (!doTask && this.whiteList.workshops.includes(id)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Steam.unfavoriteWorkshop',
              id: id
            });
            return true;
          }
          const appid = await this.#getWorkshopAppId(id);
          if (!appid) {
            return false;
          }
          const logStatus = scripts_echoLog({
            type: doTask ? 'favoritingWorkshop' : 'unfavoritingWorkshop',
            text: id
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://steamcommunity.com/sharedfiles/${doTask ? '' : 'un'}favorite`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
              id: id,
              appid: appid,
              sessionid: this.#auth.communitySessionID
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && !data.responseText) {
              if (doTask) {
                this.tasks.workshops = unique([ ...this.tasks.workshops, id ]);
              }
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.toggleFavoriteWorkshop');
          return false;
        }
      }
      async #getWorkshopAppId(id) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingWorkshopAppId',
            text: id
          });
          const appId = this.#cache.workshop[id];
          if (appId) {
            logStatus.success();
            return appId;
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`,
            method: 'GET'
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              const appId = data.responseText.match(/<input type="hidden" name="appid" value="([\d]+?)" \/>/)?.[1];
              if (appId) {
                this.#setCache('workshop', id, appId);
                logStatus.success();
                return appId;
              }
              logStatus.error('Error: getWorkshopAppId failed');
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.getWorkshopAppId');
          return false;
        }
      }
      async #voteUpWorkshop(id) {
        try {
          const logStatus = scripts_echoLog({
            type: 'votingUpWorkshop',
            text: id
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://steamcommunity.com/sharedfiles/voteup',
            method: 'POST',
            responseType: 'json',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
              id: id,
              sessionid: this.#auth.communitySessionID
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.success === 1) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return true;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return true;
        } catch (error) {
          throwError(error, 'Steam.voteupWorkshop');
          return true;
        }
      }
      async #toggleCurator(curatorId, doTask = true) {
        try {
          if (!doTask && this.whiteList.curators.includes(curatorId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Steam.unfollowCurator',
              id: curatorId
            });
            return true;
          }
          if (this.#ASF) {
            return await this.#ASF.toggleCurator(curatorId, doTask);
          }
          const logStatus = scripts_echoLog({
            type: doTask ? 'followingCurator' : 'unfollowingCurator',
            text: curatorId
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://store.steampowered.com/curators/ajaxfollow',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
              clanid: curatorId,
              sessionid: this.#auth.storeSessionID,
              follow: doTask
            }),
            dataType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.success?.success === 1) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.response?.success}` || `${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.toggleCurator');
          return false;
        }
      }
      async getCuratorId(path, name) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingCuratorId',
            text: `${path}/${name}`
          });
          const curatorId = this.#cache.curator[`${path}/${name}`];
          if (curatorId) {
            logStatus.success();
            return curatorId;
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://store.steampowered.com/${path}/${name}`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              const curatorId = data.responseText.match(/g_pagingData.*?"clanid":([\d]+)/)?.[1];
              if (curatorId) {
                this.#setCache('curator', `${path}/${name}`, curatorId);
                logStatus.success();
                return curatorId;
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.getCuratorID');
          return false;
        }
      }
      async #toggleCuratorLike(link, doTask = true) {
        try {
          const [ path, name ] = link.split('/');
          if (!(path && name)) {
            scripts_echoLog({
              text: i18n('errorLink', link)
            });
            return false;
          }
          const curatorId = await this.getCuratorId(path, name);
          if (curatorId) {
            return await this.#toggleCurator(curatorId, doTask);
          }
          return false;
        } catch (error) {
          throwError(error, 'Steam.toggleCuratorLike');
          return false;
        }
      }
      async #getAnnouncementParams(appId, viewId) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingAnnouncementParams',
            text: appId,
            id: viewId
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://store.steampowered.com/events/ajaxgetpartnerevent?appid=${appId}&announcement_gid=${viewId}&lang_list=6_0&last_modified_time=0&origin=https:%2F%2Fstore.steampowered.com&for_edit=false`,
            method: 'GET',
            responseType: 'json',
            headers: {
              Host: 'store.steampowered.com',
              Referer: `https://store.steampowered.com/news/app/${appId}/view/${viewId}`
            }
          });
          if (result === 'Success') {
            if (data?.status === 200 && data?.response?.success === 1) {
              const {
                clanid,
                gid
              } = data.response.event?.announcement_body || {};
              if (clanid) {
                logStatus.success();
                return {
                  clanId: clanid,
                  gid: gid
                };
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return {};
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return {};
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return {};
        } catch (error) {
          throwError(error, 'Steam.likeAnnouncement');
          return {};
        }
      }
      async #likeAnnouncement(id) {
        try {
          const [ appId, viewId ] = id.split('/');
          if (!(appId && viewId)) {
            scripts_echoLog({}).error(`${i18n('missParams')}(id)`);
            return false;
          }
          const {
            clanId,
            gid
          } = await this.#getAnnouncementParams(appId, viewId);
          if (!clanId) {
            return false;
          }
          const logStatus = scripts_echoLog({
            type: 'likingAnnouncement',
            text: appId,
            id: viewId
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://store.steampowered.com/updated/ajaxrateupdate/${gid || viewId}`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              Host: 'store.steampowered.com',
              Origin: 'https://store.steampowered.com',
              Referer: `https://store.steampowered.com/news/app/${appId}/view/${viewId}`
            },
            data: $.param({
              sessionid: this.#auth.storeSessionID,
              voteup: 1,
              clanid: clanId,
              ajax: 1
            }),
            dataType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response.success === 1) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.likeAnnouncement');
          return false;
        }
      }
      async #appid2subid(id) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingSubid',
            text: id
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://store.steampowered.com/app/${id}`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              if (this.#area === 'CN' && data.responseText.includes('id="error_box"')) {
                logStatus.warning(i18n('changeAreaNotice'));
                const result = await this.#changeArea();
                if (!result || result === 'CN' || result === 'skip') {
                  return false;
                }
                return await this.#appid2subid(id);
              }
              const subid = data.responseText.match(/name="subid" value="([\d]+?)"/)?.[1];
              if (subid) {
                logStatus.success();
                return subid;
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.appid2subid');
          return false;
        }
      }
      async #getLicenses() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('gettingLicenses')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://store.steampowered.com/dynamicstore/userdata/?t=${new Date().getTime()}`,
            method: 'GET',
            responseType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              logStatus.success();
              return data.response?.rgOwnedPackages;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.getLicenses');
          return false;
        }
      }
      async #addLicense(id) {
        try {
          if (this.#ASF) {
            return await this.#ASF.addLicense(id);
          }
          const [ type, ids ] = id.split('-');
          if (type === 'appid') {
            const subid = await this.#appid2subid(ids);
            if (!subid) {
              return false;
            }
            const logStatus = scripts_echoLog({
              type: 'addingFreeLicense',
              text: ids
            });
            if (!await this.#addFreeLicense(subid, logStatus)) {
              return false;
            }
            const {
              result,
              statusText,
              status,
              data
            } = await tools_httpRequest({
              url: `https://store.steampowered.com/app/${ids}`,
              method: 'GET'
            });
            if (result === 'Success') {
              if (data?.status === 200) {
                if (data.responseText.includes('ds_owned_flag ds_flag') || data.responseText.includes('class="already_in_library"')) {
                  logStatus.success();
                  return true;
                }
                logStatus.error(`Error:${data.statusText}(${data.status})`);
                return false;
              }
              logStatus.error(`Error:${data?.statusText}(${data?.status})`);
              return false;
            }
            logStatus.error(`${result}:${statusText}(${status})`);
            return false;
          } else if (type === 'subid') {
            if (this.#area === 'CN') {
              scripts_echoLog({}).success(i18n('tryChangeAreaNotice'));
              await this.#changeArea();
            }
            const logStatusArr = {};
            const idsArr = ids.split(',');
            for (const subid of idsArr) {
              const logStatus = scripts_echoLog({
                type: 'addingFreeLicenseSubid',
                text: subid
              });
              if (!await this.#addFreeLicense(subid, logStatus)) {
                return false;
              }
              logStatusArr[subid] = logStatus;
            }
            const licenses = await this.#getLicenses();
            if (!licenses) {
              return false;
            }
            for (const subid of idsArr) {
              if (licenses.includes(parseInt(subid, 10))) {
                logStatusArr[subid].success();
              } else {
                logStatusArr[subid].error();
              }
            }
            return true;
          }
          return false;
        } catch (error) {
          throwError(error, 'Steam.addLicense');
          return false;
        }
      }
      async #addFreeLicense(id, logStatusPre) {
        try {
          const logStatus = logStatusPre || scripts_echoLog({
            type: 'addingFreeLicenseSubid',
            text: id
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://store.steampowered.com/checkout/addfreelicense',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              Host: 'store.steampowered.com',
              Origin: 'https://store.steampowered.com',
              Referer: 'https://store.steampowered.com/account/licenses/'
            },
            data: $.param({
              action: 'add_to_cart',
              sessionid: this.#auth.storeSessionID,
              subid: id
            }),
            dataType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              if (this.#area === 'CN' && data.responseText.includes('id="error_box"')) {
                logStatus.warning(i18n('changeAreaNotice'));
                const result = await this.#changeArea();
                if (!result || result === 'CN') {
                  return false;
                }
                return await this.#addFreeLicense(id);
              }
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.addFreeLicense');
          return false;
        }
      }
      async #requestPlayTestAccess(id) {
        try {
          if (this.#ASF) {
            return await this.#ASF.requestPlayTestAccess(id);
          }
          const logStatus = scripts_echoLog({
            type: 'requestingPlayTestAccess',
            text: id
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://store.steampowered.com/ajaxrequestplaytestaccess/${id}`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              Host: 'store.steampowered.com',
              Origin: 'https://store.steampowered.com',
              Referer: `https://store.steampowered.com/app/${id}`
            },
            data: $.param({
              sessionid: this.#auth.storeSessionID
            }),
            dataType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200 && data?.response?.success === 1) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.requestPlayTestAccess');
          return false;
        }
      }
      async toggle({
        doTask = true,
        groupLinks = [],
        officialGroupLinks = [],
        wishlistLinks = [],
        followLinks = [],
        forumLinks = [],
        workshopLinks = [],
        workshopVoteLinks = [],
        curatorLinks = [],
        curatorLikeLinks = [],
        announcementLinks = [],
        licenseLinks = [],
        playtestLinks = []
      }) {
        try {
          if ([ ...groupLinks, ...officialGroupLinks, ...forumLinks, ...workshopLinks, ...workshopVoteLinks ].length > 0 && !this.#communityInitialized) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          if ([ ...wishlistLinks, ...followLinks, ...curatorLinks, ...curatorLikeLinks, ...announcementLinks, ...licenseLinks, ...playtestLinks ].length > 0 && !this.#storeInitialized) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.steam.groups || !doTask && !globalOptions.undoTask.steam.groups) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.groups'
            });
          } else {
            const realGroups = this.getRealParams('groups', groupLinks, doTask, link => link.match(/groups\/(.+)\/?/)?.[1]);
            if (realGroups.length > 0) {
              for (const group of realGroups) {
                if (doTask) {
                  prom.push(this.#joinGroup(group));
                } else {
                  prom.push(this.#leaveGroup(group));
                }
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.officialGroups || !doTask && !globalOptions.undoTask.steam.officialGroups) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.officialGroups'
            });
          } else {
            const realOfficialGroups = this.getRealParams('officialGroups', officialGroupLinks, doTask, link => link.match(/games\/(.+)\/?/)?.[1]);
            if (realOfficialGroups.length > 0) {
              for (const officialGroup of realOfficialGroups) {
                if (doTask) {
                  prom.push(this.#joinOfficialGroup(officialGroup));
                } else {
                  prom.push(this.#leaveOfficialGroup(officialGroup));
                }
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.wishlists || !doTask && !globalOptions.undoTask.steam.wishlists) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.wishlists'
            });
          } else {
            const realWishlists = this.getRealParams('wishlists', wishlistLinks, doTask, link => link.match(/app\/([\d]+)/)?.[1]);
            if (realWishlists.length > 0) {
              for (const game of realWishlists) {
                if (doTask) {
                  prom.push(this.#addToWishlist(game));
                } else {
                  prom.push(this.#removeFromWishlist(game));
                }
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.follows || !doTask && !globalOptions.undoTask.steam.follows) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.follows'
            });
          } else {
            const realFollows = this.getRealParams('follows', followLinks, doTask, link => link.match(/app\/([\d]+)/)?.[1]);
            if (realFollows.length > 0) {
              for (const game of realFollows) {
                prom.push(this.#toggleFollowGame(game, doTask));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.forums || !doTask && !globalOptions.undoTask.steam.forums) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.forums'
            });
          } else {
            const realForums = this.getRealParams('forums', forumLinks, doTask, link => link.match(/app\/([\d]+)/)?.[1]);
            if (realForums.length > 0) {
              for (const forum of realForums) {
                prom.push(this.#toggleForum(forum, doTask));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.workshops || !doTask && !globalOptions.undoTask.steam.workshops) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.workshops'
            });
          } else {
            const realWorkshops = this.getRealParams('workshops', workshopLinks, doTask, link => link.match(/\?id=([\d]+)/)?.[1]);
            if (realWorkshops.length > 0) {
              for (const workshop of realWorkshops) {
                prom.push(this.#toggleFavoriteWorkshop(workshop, doTask));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.workshopVotes) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.workshopVotes'
            });
          } else {
            const realworkshopVotes = this.getRealParams('workshopVotes', workshopVoteLinks, doTask, link => link.match(/\?id=([\d]+)/)?.[1]);
            if (doTask && realworkshopVotes.length > 0) {
              for (const workshop of realworkshopVotes) {
                prom.push(this.#voteUpWorkshop(workshop));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.curators || !doTask && !globalOptions.undoTask.steam.curators) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.curators'
            });
          } else {
            const realCurators = this.getRealParams('curators', curatorLinks, doTask, link => link.match(/curator\/([\d]+)/)?.[1]);
            const realCuratorLikes = this.getRealParams('curatorLikes', curatorLikeLinks, doTask, link => link.match(/https?:\/\/store\.steampowered\.com\/(.*?)\/([^/?]+)/)?.slice(1, 3).join('/'));
            if (realCurators.length > 0) {
              for (const curator of realCurators) {
                prom.push(this.#toggleCurator(curator, doTask));
                await delay(1e3);
              }
            }
            if (realCuratorLikes.length > 0) {
              for (const curatorLike of realCuratorLikes) {
                prom.push(this.#toggleCuratorLike(curatorLike, doTask));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.announcements) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.announcements'
            });
          } else {
            const realAnnouncements = this.getRealParams('announcements', announcementLinks, doTask, link => {
              if (link.includes('store.steampowered.com')) {
                return link.match(/store\.steampowered\.com\/news\/app\/([\d]+)\/view\/([\d]+)/)?.slice(1, 3).join('/');
              }
              return link.match(/steamcommunity\.com\/games\/([\d]+)\/announcements\/detail\/([\d]+)/)?.slice(1, 3).join('/');
            });
            if (doTask && realAnnouncements.length > 0) {
              for (const id of realAnnouncements) {
                prom.push(this.#likeAnnouncement(id));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.licenses) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.licenses'
            });
          } else if (doTask && globalOptions.doTask.steam.licenses && licenseLinks.length > 0) {
            for (const id of licenseLinks) {
              prom.push(this.#addLicense(id));
              await delay(1e3);
            }
          }
          if (doTask && !globalOptions.doTask.steam.playtests) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.playtests'
            });
          } else {
            const realPlaytests = this.getRealParams('playtests', playtestLinks, doTask, link => link.match(/app\/([\d]+)/)?.[1]);
            if (doTask && globalOptions.doTask.steam.playtests && realPlaytests.length > 0) {
              for (const id of realPlaytests) {
                prom.push(this.#requestPlayTestAccess(id));
                await delay(1e3);
              }
            }
          }
          return Promise.all(prom).then(async () => {
            if (this.#area !== 'CN') {
              scripts_echoLog({}).warning(i18n('steamFinishNotice'));
              await this.#changeArea('CN');
            }
            return true;
          });
        } catch (error) {
          throwError(error, 'Steam.toggle');
          return false;
        }
      }
      #setCache(type, name, id) {
        try {
          this.#cache[type][name] = id;
          GM_setValue('steamCache', this.#cache);
        } catch (error) {
          throwError(error, 'Steam.setCache');
        }
      }
    }
    const social_Steam = Steam;
    class Website {
      undoneTasks;
      socialTasks;
      giveawayId;
      socialInitialized = {
        discord: false,
        instagram: false,
        reddit: false,
        twitch: false,
        twitter: false,
        vk: false,
        youtube: false,
        steamStore: false,
        steamCommunity: false
      };
      initialized = false;
      social = {};
      async #bind(name, init) {
        try {
          return {
            name: name,
            result: await init
          };
        } catch (error) {
          throwError(error, 'Website.bind');
          return {
            name: name,
            result: false
          };
        }
      }
      async initSocial(action) {
        try {
          const pro = [];
          const tasks = action === 'do' ? this.undoneTasks : this.socialTasks;
          if (tasks.discord) {
            const hasDiscord = Object.values(tasks.discord).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasDiscord && (!this.socialInitialized.discord || !this.social.discord)) {
              this.social.discord = new social_Discord();
              pro.push(this.#bind('discord', this.social.discord.init(action)));
            }
          }
          if (tasks.instagram) {
            const hasInstagram = Object.values(tasks.instagram).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasInstagram && (!this.socialInitialized.instagram || !this.social.instagram)) {
              this.social.instagram = new social_Instagram();
              pro.push(this.#bind('instagram', this.social.instagram.init()));
            }
          }
          if (tasks.reddit) {
            const hasReddit = Object.values(tasks.reddit).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasReddit && (!this.socialInitialized.reddit || !this.social.reddit)) {
              this.social.reddit = new social_Reddit();
              pro.push(this.#bind('reddit', this.social.reddit.init()));
            }
          }
          if (tasks.twitch) {
            const hasTwitch = Object.values(tasks.twitch).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasTwitch && (!this.socialInitialized.twitch || !this.social.twitch)) {
              this.social.twitch = new social_Twitch();
              pro.push(this.#bind('twitch', this.social.twitch.init()));
            }
          }
          if (tasks.twitter) {
            const hasTwitter = Object.values(tasks.twitter).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasTwitter && (!this.socialInitialized.twitter || !this.social.twitter)) {
              this.social.twitter = new social_Twitter();
              pro.push(this.#bind('twitter', this.social.twitter.init()));
            }
          }
          if (tasks.vk) {
            const hasVk = Object.values(tasks.vk).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasVk && (!this.socialInitialized.vk || !this.social.vk)) {
              this.social.vk = new social_Vk();
              pro.push(this.#bind('vk', this.social.vk.init()));
            }
          }
          if (tasks.youtube) {
            const hasYoutube = Object.values(tasks.youtube).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasYoutube && (!this.socialInitialized.youtube || !this.social.youtube)) {
              this.social.youtube = new Youtube();
              pro.push(this.#bind('youtube', this.social.youtube.init()));
            }
          }
          if (tasks.steam) {
            const steamLength = Object.values(tasks.steam).reduce((total, arr) => [ ...total, ...arr ]).length;
            if (steamLength > 0) {
              if (!this.social.steam) {
                this.social.steam = new social_Steam();
              }
              const steamCommunityLength = Object.keys(tasks.steam).map(type => [ 'groupLinks', 'officialGroupLinks', 'forumLinks', 'workshopLinks', 'workshopVoteLinks' ].includes(type) ? tasks.steam?.[type]?.length || 0 : 0).reduce((total, number) => total + number, 0);
              if (steamLength - steamCommunityLength > 0 && !this.socialInitialized.steamStore) {
                pro.push(this.#bind('steamStore', this.social.steam.init('store')));
              }
              if (steamCommunityLength > 0 && !this.socialInitialized.steamCommunity) {
                pro.push(this.#bind('steamCommunity', this.social.steam.init('community')));
              }
            }
          }
          if (tasks.links && tasks.links.length > 0) {
            this.social.visitLink = visitLink;
          }
          return await Promise.all(pro).then(result => {
            let checked = true;
            for (const data of result) {
              if (data.result) {
                this.socialInitialized[data.name] = data.result;
              } else {
                checked = false;
              }
            }
            return checked;
          });
        } catch (error) {
          throwError(error, 'Website.initSocial');
          return false;
        }
      }
      uniqueTasks(allTasks) {
        const result = {};
        for (const [ social, types ] of Object.entries(allTasks)) {
          result[social] = {};
          for (const [ type, tasks ] of Object.entries(types)) {
            result[social][type] = unique(tasks);
          }
        }
        return result;
      }
      async toggleTask(action) {
        try {
          if (!this.initialized && !this.init()) {
            return false;
          }
          if (!await this.classifyTask(action)) {
            return false;
          }
          if (!await this.initSocial(action)) {
            return false;
          }
          const pro = [];
          const doTask = action === 'do';
          const tasks = doTask ? this.undoneTasks : this.socialTasks;
          if (this.socialInitialized.discord !== 'skip' && this.social.discord) {
            pro.push(this.social.discord.toggle({
              doTask: doTask,
              ...tasks.discord
            }));
          }
          if (this.social.instagram) {
            pro.push(this.social.instagram.toggle({
              doTask: doTask,
              ...tasks.instagram
            }));
          }
          if (this.social.reddit) {
            pro.push(this.social.reddit.toggle({
              doTask: doTask,
              ...tasks.reddit
            }));
          }
          if (this.social.twitch) {
            pro.push(this.social.twitch.toggle({
              doTask: doTask,
              ...tasks.twitch
            }));
          }
          if (this.social.twitter) {
            pro.push(this.social.twitter.toggle({
              doTask: doTask,
              ...tasks.twitter
            }));
          }
          if (this.social.vk) {
            pro.push(this.social.vk.toggle({
              doTask: doTask,
              ...tasks.vk
            }));
          }
          if (this.social.youtube) {
            pro.push(this.social.youtube.toggle({
              doTask: doTask,
              ...tasks.youtube
            }));
          }
          if (this.social.steam) {
            pro.push(this.social.steam.toggle({
              doTask: doTask,
              ...tasks.steam
            }));
          }
          if (this.social.visitLink && tasks.links && doTask) {
            for (const link of tasks.links) {
              pro.push(this.social.visitLink(link));
            }
          }
          if (doTask && tasks.extra && this.extraDoTask) {
            const hasExtra = Object.values(tasks.extra).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasExtra) {
              pro.push(this.extraDoTask(tasks.extra));
            }
          }
          await Promise.all(pro);
          scripts_echoLog({}).success(i18n('allTasksComplete'));
          return true;
        } catch (error) {
          throwError(error, 'Website.toggleTask');
          return false;
        }
      }
      async doTask() {
        try {
          return await this.toggleTask('do');
        } catch (error) {
          throwError(error, 'Website.doTask');
          return false;
        }
      }
      async undoTask() {
        try {
          return await this.toggleTask('undo');
        } catch (error) {
          throwError(error, 'Website.undoTask');
          return false;
        }
      }
    }
    const website_Website = Website;
    const defaultTasksTemplate = {
      steam: {
        groupLinks: [],
        wishlistLinks: [],
        curatorLinks: [],
        followLinks: []
      },
      vk: {
        nameLinks: []
      }
    };
    const defaultTasks = JSON.stringify(defaultTasksTemplate);
    class FreeAnyWhere extends website_Website {
      name = 'FreeAnyWhere';
      tasks = [];
      socialTasks = JSON.parse(defaultTasks);
      undoneTasks = JSON.parse(defaultTasks);
      buttons = [ 'doTask', 'undoTask', 'verifyTask', 'getKey' ];
      static test() {
        return window.location.host === 'freeanywhere.net';
      }
      async init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if ($('a[href="#/login"]').length > 0) {
            window.open('/#/login', '_self');
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (window.location.href.includes('/login')) {
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (!/^https?:\/\/freeanywhere\.net\/#\/giveaway\/[\d]+/.test(window.location.href)) {
            const id = window.location.href.match(/https?:\/\/freeanywhere\.net\/.*?#\/giveaway\/([\d]+)/)?.[1];
            if (!id) {
              logStatus.error(i18n('getFailed', 'Id'));
              return false;
            }
            window.location.href = `https://freeanywhere.net/#/giveaway/${id}`;
          }
          if (!this.#getGiveawayId()) {
            return false;
          }
          if (!await this.#checkLeftKey()) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
          this.initialized = true;
          logStatus.success();
          return true;
        } catch (error) {
          throwError(error, 'Freeanywhere.init');
          return false;
        }
      }
      async classifyTask(action) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('getTasksInfo')
          });
          if (action === 'undo') {
            this.socialTasks = GM_getValue(`fawTasks-${this.giveawayId}`)?.tasks || JSON.parse(defaultTasks);
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://freeanywhere.net/api/v1/giveaway/${this.giveawayId}/?format=json`,
            method: 'GET',
            headers: {
              authorization: `Token ${window.localStorage.getItem('token')}`,
              'x-csrftoken': external_Cookies_namespaceObject.get('csrftoken')
            },
            responseType: 'json'
          });
          if (result === 'Success') {
            const tasks = data?.response?.challenges;
            if (tasks) {
              if (action === 'verify') {
                this.tasks = [];
              }
              for (const task of tasks) {
                const type = task.challenge;
                const social = task.challenge_provider;
                const taskInfo = {
                  id: task.id,
                  title: task.title
                };
                if (action === 'verify' && !task.is_success) {
                  this.tasks.push(taskInfo);
                  continue;
                }
                switch (social) {
                 case 'steam':
                  taskInfo.social = 'steam';
                  switch (type) {
                   case 'WL':
                    if (action === 'undo') {
                      this.socialTasks.steam.wishlistLinks.push(task.link);
                    }
                    if (action === 'do' && !task.is_success) {
                      this.undoneTasks.steam.wishlistLinks.push(task.link);
                    }
                    break;

                   case 'JTG':
                    if (action === 'undo') {
                      this.socialTasks.steam.groupLinks.push(task.link);
                    }
                    if (action === 'do' && !task.is_success) {
                      this.undoneTasks.steam.groupLinks.push(task.link);
                    }
                    break;

                   case 'STC':
                    if (action === 'undo') {
                      this.socialTasks.steam.curatorLinks.push(task.link);
                    }
                    if (action === 'do' && !task.is_success) {
                      this.undoneTasks.steam.curatorLinks.push(task.link);
                    }
                    break;

                   case 'GF':
                    if (action === 'undo') {
                      this.socialTasks.steam.followLinks.push(task.link);
                    }
                    if (action === 'do' && !task.is_success) {
                      this.undoneTasks.steam.followLinks.push(task.link);
                    }
                    break;
                  }
                  break;

                 case 'vk-oauth2':
                  if (action === 'undo') {
                    this.socialTasks.vk.nameLinks.push(task.link);
                  }
                  if (action === 'do' && !task.is_success) {
                    this.undoneTasks.vk.nameLinks.push(task.link);
                  }
                  break;

                 case 'website':
                  break;

                 default:
                  scripts_echoLog({}).warning(`${i18n('unKnownTaskType')}: ${social}`);
                  break;
                }
              }
              logStatus.success();
              this.undoneTasks = this.uniqueTasks(this.undoneTasks);
              this.socialTasks = this.uniqueTasks(this.socialTasks);
              if (window.DEBUG) {
                console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
              }
              GM_setValue(`fawTasks-${this.giveawayId}`, {
                tasks: this.socialTasks,
                time: new Date().getTime()
              });
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Freeanywhere.classifyTask');
          return false;
        }
      }
      async verifyTask() {
        try {
          if (!this.initialized && !this.init()) {
            return false;
          }
          if (this.tasks.length === 0 && !await this.classifyTask('verify')) {
            return false;
          }
          const pro = [];
          for (const task of this.tasks) {
            pro.push(this.#verify(task));
            await delay(1e3);
          }
          await Promise.all(pro);
          scripts_echoLog({}).success(i18n('allTasksComplete'));
          return !!await this.getKey(true);
        } catch (error) {
          throwError(error, 'Freeanywhere.verifyTask');
          return false;
        }
      }
      async getKey(initialized) {
        try {
          if (!initialized && !this.initialized && !this.init()) {
            return false;
          }
          const logStatus = scripts_echoLog({
            text: i18n('gettingKey')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://freeanywhere.net/api/v1/giveaway/${this.giveawayId}/reward/?format=json`,
            method: 'GET',
            dataType: 'json',
            headers: {
              authorization: `Token ${window.localStorage.getItem('token')}`
            }
          });
          if (result === 'Success') {
            if (data?.response?.reward) {
              logStatus.success();
              scripts_echoLog({}).success(data.response.reward);
              return data.response.reward;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'FreeAnyWhere.getGiveawayId');
          return false;
        }
      }
      #getGiveawayId() {
        try {
          const giveawayId = window.location.href.match(/\/giveaway\/([\d]+)/)?.[1];
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({}).error(i18n('getFailed', 'GiveawayId'));
          return false;
        } catch (error) {
          throwError(error, 'FreeAnyWhere.getGiveawayId');
        }
      }
      async #verify(task) {
        try {
          const logStatus = scripts_echoLog({
            html: `<li>${i18n('verifyingTask')}${task.title.trim()}...<font></font></li>`
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://freeanywhere.net/api/v1/giveaway/${this.giveawayId}/challenge-status/${task.id}/?format=json`,
            method: 'GET',
            dataType: 'json',
            headers: {
              authorization: `Token ${window.localStorage.getItem('token')}`,
              'x-csrftoken': external_Cookies_namespaceObject.get('csrftoken')
            }
          });
          if (result === 'Success') {
            if (data?.response?.status) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Freeanywhere.verify');
          return false;
        }
      }
      async #checkLeftKey() {
        try {
          if (!globalOptions.other.checkLeftKey) {
            return true;
          }
          const {
            data
          } = await tools_httpRequest({
            url: 'https://freeanywhere.net/api/v1/widget/?format=json',
            method: 'GET',
            dataType: 'json',
            headers: {
              authorization: `Token ${window.localStorage.getItem('token')}`
            }
          });
          if (data?.response?.giveaways.find(giveaway => `${giveaway?.id}` === this.giveawayId)) {
            return true;
          }
          await external_Swal_default().fire({
            icon: 'warning',
            title: i18n('notice'),
            text: i18n('noKeysLeft'),
            confirmButtonText: i18n('confirm'),
            cancelButtonText: i18n('cancel'),
            showCancelButton: true
          }).then(({
            value
          }) => {
            if (value) {
              window.close();
            }
          });
          return true;
        } catch (error) {
          throwError(error, 'Giveawaysu.checkLeftKey');
          return false;
        }
      }
    }
    const Freeanywhere = FreeAnyWhere;
    const Giveawaysu_defaultTasks = {
      steam: {
        groupLinks: [],
        wishlistLinks: [],
        curatorLinks: [],
        curatorLikeLinks: [],
        followLinks: [],
        forumLinks: [],
        announcementLinks: [],
        workshopVoteLinks: [],
        playtestLinks: []
      },
      discord: {
        serverLinks: []
      },
      instagram: {
        userLinks: []
      },
      vk: {
        nameLinks: []
      },
      twitch: {
        channelLinks: []
      },
      reddit: {
        redditLinks: []
      },
      youtube: {
        channelLinks: [],
        likeLinks: []
      },
      twitter: {
        userLinks: [],
        retweetLinks: []
      }
    };
    class GiveawaySu extends website_Website {
      name = 'GiveawaySu';
      socialTasks = Giveawaysu_defaultTasks;
      undoneTasks = Giveawaysu_defaultTasks;
      buttons = [ 'doTask', 'undoTask' ];
      static test() {
        return /^https?:\/\/giveaway\.su\/giveaway\/view\/[\d]+/.test(window.location.href);
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          if (!await this.#checkLeftKey()) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
          scripts_echoLog({}).warning(i18n('gsNotice'));
        } catch (error) {
          throwError(error, 'Giveawaysu.after');
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if ($('a.steam-login').length > 0) {
            window.open('/steam/redirect', '_self');
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (!this.#getGiveawayId()) {
            return false;
          }
          this.initialized = true;
          logStatus.success();
          return true;
        } catch (error) {
          throwError(error, 'Giveawaysu.init');
          return false;
        }
      }
      async classifyTask(action) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('getTasksInfo')
          });
          if (action === 'undo') {
            this.socialTasks = GM_getValue(`gasTasks-${this.giveawayId}`)?.tasks || Giveawaysu_defaultTasks;
            return true;
          }
          const pro = [];
          const tasks = $('#actions tr');
          if ($('div.bind-discord').is(':visible')) {
            $('div.bind-discord a')[0].click();
          }
          if ($('div.bind-twitch').is(':visible')) {
            $('div.bind-twitch a')[0].click();
          }
          for (const task of tasks) {
            pro.push(new Promise(resolve => {
              const td = $(task).find('td:not(".hidden")');
              const colorfulTask = td.eq(1).find('a:not([data-trigger="link"])');
              const colorlessTask = td.eq(2).find('a:not([data-trigger="link"])');
              const taskDes = colorfulTask.length > 0 ? colorfulTask : colorlessTask;
              const taskIcon = td.eq(0).find('i').attr('class') || '';
              const taskName = taskDes.text().trim();
              if (taskIcon.includes('ban') || /disable adblock/gi.test(taskName)) {
                return resolve(true);
              }
              getRedirectLink(taskDes.attr('href')).then(taskLink => {
                if (!taskLink) {
                  return resolve(false);
                }
                if (taskIcon.includes('steam') && /join/gi.test(taskName)) {
                  this.undoneTasks.steam.groupLinks.push(taskLink);
                } else if (/like.*announcement/gi.test(taskName)) {
                  this.undoneTasks.steam.announcementLinks.push(taskLink);
                } else if (/(follow|subscribe).*curator/gim.test(taskName) && /^https?:\/\/store\.steampowered\.com\/curator\//.test(taskLink)) {
                  this.undoneTasks.steam.curatorLinks.push(taskLink);
                } else if (taskIcon.includes('steam') && /follow|subscribe/gim.test(taskName)) {
                  this.undoneTasks.steam.curatorLikeLinks.push(taskLink);
                } else if (/subscribe.*steam.*forum/gim.test(taskName)) {
                  this.undoneTasks.steam.forumLinks.push(taskLink);
                } else if (taskIcon.includes('thumbs-up') && /^https?:\/\/steamcommunity\.com\/sharedfiles\/filedetails\/\?id=[\d]+/.test(taskLink)) {
                  this.undoneTasks.steam.workshopVoteLinks.push(taskLink);
                } else if (taskIcon.includes('plus') && /request.*playtest/gim.test(taskName)) {
                  this.undoneTasks.steam.playtestLinks.push(taskLink);
                } else if (taskIcon.includes('discord') || /join.*discord/gim.test(taskName)) {
                  this.undoneTasks.discord.serverLinks.push(taskLink);
                } else if (taskIcon.includes('instagram') || /follow.*instagram/gim.test(taskName)) {
                  this.undoneTasks.instagram.userLinks.push(taskLink);
                } else if (taskIcon.includes('twitch') || /follow.*twitch.*channel/gim.test(taskName)) {
                  this.undoneTasks.twitch.channelLinks.push(taskLink);
                } else if (taskIcon.includes('reddit') || /subscribe.*subreddit/gim.test(taskName) || /follow.*reddit/gim.test(taskName)) {
                  this.undoneTasks.reddit.redditLinks.push(taskLink);
                } else if (/watch.*art/gim.test(taskName)) {
                  this.undoneTasks.steam.workshopVoteLinks.push(taskLink);
                } else if (/subscribe.*youtube.*channel/gim.test(taskName)) {
                  this.undoneTasks.youtube.channelLinks.push(taskLink);
                } else if (/(watch|like).*youtube.*video/gim.test(taskName) || (taskIcon.includes('youtube') || taskIcon.includes('thumbs-up')) && /(watch|like).*video/gim.test(taskName)) {
                  this.undoneTasks.youtube.likeLinks.push(taskLink);
                } else if (taskIcon.includes('vk') || /join.*vk.*group/gim.test(taskName)) {
                  this.undoneTasks.vk.nameLinks.push(taskLink);
                } else {
                  if (/(on twitter)|(Follow.*on.*Facebook)/gim.test(taskName)) {} else {
                    if (/wishlist.*game|add.*wishlist/gim.test(taskName)) {
                      this.undoneTasks.steam.wishlistLinks.push(taskLink);
                    }
                    if (/follow.*button/gim.test(taskName)) {
                      this.undoneTasks.steam.followLinks.push(taskLink);
                    }
                  }
                }
                resolve(true);
              }).catch(error => {
                throwError(error, 'Giveawaysu.classifyTask->getRedirectLink');
                return false;
              });
            }));
          }
          await Promise.all(pro);
          logStatus.success();
          this.undoneTasks = this.uniqueTasks(this.undoneTasks);
          this.socialTasks = this.undoneTasks;
          if (window.DEBUG) {
            console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          }
          GM_setValue(`gasTasks-${this.giveawayId}`, {
            tasks: this.socialTasks,
            time: new Date().getTime()
          });
          return true;
        } catch (error) {
          throwError(error, 'Giveawaysu.classifyTask');
          return false;
        }
      }
      #checkLogin() {
        try {
          if (!globalOptions.other.checkLogin) {
            return true;
          }
          if ($('a.steam-login').length > 0) {
            window.open('/steam/redirect', '_self');
          }
          return true;
        } catch (error) {
          throwError(error, 'Giveawaysu.checkLogin');
          return false;
        }
      }
      async #checkLeftKey() {
        try {
          if (!globalOptions.other.checkLeftKey) {
            return true;
          }
          if ($('.giveaway-ended').length > 0 && $('.giveaway-key').length === 0) {
            await external_Swal_default().fire({
              icon: 'warning',
              title: i18n('notice'),
              text: i18n('noKeysLeft'),
              confirmButtonText: i18n('confirm'),
              cancelButtonText: i18n('cancel'),
              showCancelButton: true
            }).then(({
              value
            }) => {
              if (value) {
                window.close();
              }
            });
          }
          return true;
        } catch (error) {
          throwError(error, 'Giveawaysu.checkLeftKey');
          return false;
        }
      }
      #getGiveawayId() {
        const giveawayId = window.location.href.match(/\/view\/([\d]+)/)?.[1];
        if (giveawayId) {
          this.giveawayId = giveawayId;
          return true;
        }
        scripts_echoLog({
          text: i18n('getFailed', 'GiveawayId')
        });
        return false;
      }
    }
    class Indiedb {
      name = 'Indiedb';
      buttons = [ 'doTask' ];
      static test() {
        return window.location.host === 'www.indiedb.com';
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          if (!await this.#checkLeftKey()) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
        } catch (error) {
          throwError(error, 'Indiedb.after');
        }
      }
      async doTask() {
        try {
          if (!await this.#join()) {
            return false;
          }
          return await this.#do();
        } catch (error) {
          throwError(error, 'Indiedb.doTask');
          return false;
        }
      }
      async #join() {
        try {
          if ($('a.buttonenter:contains(Register to join)').length > 0) {
            scripts_echoLog({}).error(i18n('needLogin'));
            return false;
          }
          const currentoption = $('a.buttonenter.buttongiveaway');
          if (/join giveaway/gim.test(currentoption.text())) {
            const logStatus = scripts_echoLog({
              text: `${i18n('joiningGiveaway')}...`
            });
            const {
              result,
              statusText,
              status,
              data
            } = await tools_httpRequest({
              url: currentoption.attr('href'),
              method: 'POST',
              data: 'ajax=t',
              dataType: 'json',
              headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                accept: 'application/json, text/javascript, */*; q=0.01',
                origin: window.location.origin
              }
            });
            if (result === 'Success') {
              if (data?.status === 200) {
                if (data.response?.success) {
                  currentoption.addClass('buttonentered').text('Success - Giveaway joined');
                  $('#giveawaysjoined').slideDown();
                  $('#giveawaysrecommend').slideDown();
                  logStatus.success(`Success${data.response?.text ? `:${data.response?.text}` : ''}`);
                  return true;
                }
                logStatus.error(`Error${data.response?.text ? `:${data.response?.text}` : ''}`);
                return false;
              }
              logStatus.error(`Error:${data?.statusText}(${data?.status})`);
              return false;
            }
            logStatus.error(`${result}:${statusText}(${status})`);
            return false;
          } else if (/success/gim.test($('a.buttonenter.buttongiveaway').text())) {
            return true;
          }
          scripts_echoLog({}).warning(i18n('needJoinGiveaway'));
          return false;
        } catch (error) {
          throwError(error, 'Indiedb.init');
          return false;
        }
      }
      async #do() {
        try {
          const id = $('script').map((index, script) => {
            if (/\$\(document\)/gim.test(script.innerHTML)) {
              return [ script.innerHTML.match(/"\/[\d]+"/gim)?.[0]?.match(/[\d]+/)?.[0], script.innerHTML.match(/"\/newsletter\/ajax\/subscribeprofile\/optin\/[\d]+"/gim)?.[0]?.match(/[\d]+/)?.[0] ];
            }
            return null;
          });
          if (id.length === 2) {
            const pro = [];
            const tasks = $('#giveawaysjoined a[class*=promo]');
            for (const task of tasks) {
              const promo = $(task);
              if (!promo.hasClass('buttonentered')) {
                const status = scripts_echoLog({
                  text: `${i18n('doing')}:${promo.parents('p').text()}...`
                });
                if (/facebookpromo|twitterpromo|visitpromo/gim.test(task.className)) {
                  let text = '';
                  if (promo.hasClass('facebookpromo')) {
                    text = 'facebookpromo';
                  } else if (promo.hasClass('twitterpromo')) {
                    text = 'twitterpromo';
                  } else {
                    text = 'visitpromo';
                  }
                  pro.push(new Promise(resolve => {
                    $.ajax({
                      type: 'POST',
                      url: urlPath(`/giveaways/ajax/${text}/${id[0]}`),
                      timeout: 6e4,
                      dataType: 'json',
                      data: {
                        ajax: 't'
                      },
                      error(response, error, exception) {
                        if (window.DEBUG) {
                          console.log('%cAuto-Task[Debug]:', 'color:red', {
                            response: response,
                            error: error,
                            exception: exception
                          });
                        }
                        status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                        resolve(true);
                      },
                      success(response) {
                        if (response.success) {
                          status.success(`Success:${response.text}`);
                          promo.addClass('buttonentered').closest('p').html(promo.closest('p').find('span').html());
                          resolve(true);
                        } else {
                          status.error(`Error:${response.text}`);
                          resolve(true);
                        }
                      }
                    });
                  }));
                } else if (promo.hasClass('emailoptinpromo')) {
                  pro.push(new Promise(resolve => {
                    $.ajax({
                      type: 'POST',
                      url: urlPath(`/newsletter/ajax/subscribeprofile/optin/${id[1]}`),
                      timeout: 6e4,
                      dataType: 'json',
                      data: {
                        ajax: 't',
                        emailsystoggle: 4
                      },
                      error(response, error, exception) {
                        if (window.DEBUG) {
                          console.log('%cAuto-Task[Debug]:', 'color:red', {
                            response: response,
                            error: error,
                            exception: exception
                          });
                        }
                        status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                        resolve(true);
                      },
                      success(response) {
                        if (response.success) {
                          status.success(`Success:${response.text}`);
                          promo.toggleClass('buttonentered').closest('p').html(promo.closest('p').find('span').html());
                          resolve(true);
                        } else {
                          status.error(`Error:${response.text}`);
                          resolve(true);
                        }
                      }
                    });
                  }));
                } else if (promo.hasClass('watchingpromo')) {
                  pro.push(new Promise(resolve => {
                    const data = getUrlQuery(promo.attr('href'));
                    data.ajax = 't';
                    $.ajax({
                      type: 'POST',
                      url: urlPath(promo.attr('href')?.split(/[?#]/)[0]),
                      timeout: 6e4,
                      dataType: 'json',
                      data: data,
                      error(response, error, exception) {
                        if (window.DEBUG) {
                          console.log('%cAuto-Task[Debug]:', 'color:red', {
                            response: response,
                            error: error,
                            exception: exception
                          });
                        }
                        status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                        resolve(true);
                      },
                      success(response) {
                        if (response.success) {
                          status.success(`Success:${response.text}`);
                          promo.toggleClass('buttonentered').closest('p').html(promo.closest('p').find('span').html());
                          resolve(true);
                        } else {
                          status.error(`Error:${response.text}`);
                          resolve(true);
                        }
                      }
                    });
                  }));
                } else if (!/the-challenge-of-adblock/gim.test(promo.attr('href'))) {
                  pro.push(new Promise(resolve => {
                    $.ajax({
                      type: 'POST',
                      url: urlPath(promo.attr('href')),
                      timeout: 6e4,
                      dataType: 'json',
                      data: {
                        ajax: 't'
                      },
                      error(response, error, exception) {
                        if (window.DEBUG) {
                          console.log('%cAuto-Task[Debug]:', 'color:red', {
                            response: response,
                            error: error,
                            exception: exception
                          });
                        }
                        status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                        resolve(true);
                      },
                      success(response) {
                        if (response.success) {
                          status.success(`Success:${response.text}`);
                          promo.toggleClass('buttonentered').closest('p').html(promo.closest('p').find('span').html());
                          resolve(true);
                        } else {
                          status.error(`Error:${response.text}`);
                          resolve(true);
                        }
                      }
                    });
                  }));
                } else {
                  status.error(`Error:${i18n('unKnownTaskType')}`);
                }
              }
            }
            await Promise.all(pro);
            scripts_echoLog({}).success(i18n('allTasksComplete'));
            return true;
          }
          scripts_echoLog({}).error(i18n('getFailed', 'TaskId'));
          return false;
        } catch (error) {
          throwError(error, 'Indiedb.classifyTask');
          return false;
        }
      }
      #checkLogin() {
        try {
          if (!globalOptions.other.checkLogin) {
            return true;
          }
          if ($('a.buttonenter:contains(Register to join)').length > 0) {
            window.open('/members/login', '_self');
          }
          return true;
        } catch (error) {
          throwError(error, 'Indiedb.checkLogin');
          return false;
        }
      }
      async #checkLeftKey() {
        try {
          if (!globalOptions.other.checkLeftKey) {
            return true;
          }
          if ($('a.buttonenter:contains("next time")，a.buttonenter:contains("Giveaway is closed")').length > 0) {
            await external_Swal_default().fire({
              icon: 'warning',
              title: i18n('notice'),
              text: i18n('giveawayEnded'),
              confirmButtonText: i18n('confirm'),
              cancelButtonText: i18n('cancel'),
              showCancelButton: true
            }).then(({
              value
            }) => {
              if (value) {
                window.close();
              }
            });
          }
          return true;
        } catch (error) {
          throwError(error, 'Indiedb.checkLeftKey');
          return false;
        }
      }
    }
    const website_Indiedb = Indiedb;
    const Keyhub_defaultTasksTemplate = {
      steam: {
        groupLinks: [],
        officialGroupLinks: [],
        wishlistLinks: [],
        curatorLinks: []
      },
      discord: {
        serverLinks: []
      },
      extra: {
        videoTasks: []
      },
      links: []
    };
    const Keyhub_defaultTasks = JSON.stringify(Keyhub_defaultTasksTemplate);
    class Keyhub extends website_Website {
      name = 'Keyhub';
      socialTasks = JSON.parse(Keyhub_defaultTasks);
      undoneTasks = JSON.parse(Keyhub_defaultTasks);
      buttons = [ 'doTask', 'undoTask' ];
      static test() {
        return window.location.host === 'key-hub.eu';
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          if (!await this.#checkLeftKey()) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
          $('.NSFW').hide();
        } catch (error) {
          throwError(error, 'Keyhub.after');
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if ($('a[href*="/connect/steam"]').length > 0) {
            window.open('/connect/steam', '_self');
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (!this.#getGiveawayId()) {
            return false;
          }
          $('#VPNoverlay').hide();
          $('#mainArticleSection').show();
          this.initialized = true;
          logStatus.success();
          return true;
        } catch (error) {
          throwError(error, 'Keyhub.init');
          return false;
        }
      }
      async classifyTask(action) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('getTasksInfo')
          });
          if (action === 'undo') {
            this.socialTasks = GM_getValue(`khTasks-${this.giveawayId}`)?.tasks || JSON.parse(Keyhub_defaultTasks);
          }
          const tasks = $('.task:not(".googleads")').filter((index, element) => action === 'do' ? $(element).find('i.fa-check-circle:visible').length === 0 : true).find('a');
          for (const task of tasks) {
            let link = $(task).attr('href');
            const taskDes = $(task).text().trim();
            if (!link) {
              continue;
            }
            if (/\/away\?data=/.test(link) || /steamcommunity\.com\/gid\//.test(link)) {
              link = await getRedirectLink(link) || link;
            }
            if (/https?:\/\/key-hub\.eu\/connect\/discord/.test(link)) {
              window.open(link, '_blank');
            } else if (/steamcommunity\.com\/groups\//.test(link)) {
              if (action === 'undo') {
                this.socialTasks.steam.groupLinks.push(link);
              }
              if (action === 'do') {
                this.undoneTasks.steam.groupLinks.push(link);
              }
            } else if (/steamcommunity\.com\/games\/[\d]+/.test(link)) {
              if (action === 'undo') {
                this.socialTasks.steam.officialGroupLinks.push(link);
              }
              if (action === 'do') {
                this.undoneTasks.steam.officialGroupLinks.push(link);
              }
            } else if (/store\.steampowered\.com\/app\//.test(link) && /wishlist/gim.test(taskDes)) {
              if (action === 'undo') {
                this.socialTasks.steam.wishlistLinks.push(link);
              }
              if (action === 'do') {
                this.undoneTasks.steam.wishlistLinks.push(link);
              }
            } else if (/store\.steampowered\.com\/curator\//.test(link)) {
              if (action === 'undo') {
                this.socialTasks.steam.curatorLinks.push(link);
              }
              if (action === 'do') {
                this.undoneTasks.steam.curatorLinks.push(link);
              }
            } else if (/^https?:\/\/discord\.com\/invite\//.test(link)) {
              if (action === 'undo') {
                this.socialTasks.discord.serverLinks.push(link);
              }
              if (action === 'do') {
                this.undoneTasks.discord.serverLinks.push(link);
              }
            } else if (/^javascript:videoTask.+/.test(link)) {
              if (action === 'do') {
                const taskData = link.match(/javascript:videoTask\('.+?','(.+?)'/)?.[1];
                if (taskData) {
                  this.undoneTasks.extra.videoTasks.push(taskData);
                }
              }
            } else if (/^https?:\/\/www\.instagram\.com\/.*/.test(link) || /^https?:\/\/twitter\.com\/.*/.test(link) || /^https?:\/\/www\.twitch\.tv\/.*/.test(link) || /^https?:\/\/www\.facebook\.com\/.*/.test(link) || /^https?:\/\/www\.youtube\.com\/.*/.test(link) || /^https?:\/\/store\.steampowered\.com\/developer\//.test(link) || /^https?:\/\/.*?\.itch\.io\/.*/.test(link) || /^https?:\/\/key-hub\.eu.*/.test(link) || /^https?:\/\/store\.steampowered\.com\/app\/.*/.test(link) || /^https?:\/\/qr\.streamelements\.com\/.*/.test(link) || /^https?:\/\/store\.steampowered\.com\/news\/app\/.*/.test(link)) {} else {
              scripts_echoLog({}).warning(`${i18n('unKnownTaskType')}: ${taskDes}(${link})`);
            }
          }
          logStatus.success();
          this.undoneTasks = this.uniqueTasks(this.undoneTasks);
          this.socialTasks = this.uniqueTasks(this.socialTasks);
          if (window.DEBUG) {
            console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          }
          GM_setValue(`khTasks-${this.giveawayId}`, {
            tasks: this.socialTasks,
            time: new Date().getTime()
          });
          return true;
        } catch (error) {
          throwError(error, 'Keyhub.classifyTask');
          return false;
        }
      }
      async #doScriptTask(data) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('doingKeyhubTask')
          });
          const {
            result,
            statusText,
            status,
            data: response
          } = await tools_httpRequest({
            url: `/away?data=${data}`,
            method: 'GET',
            headers: {
              origin: 'https://key-hub.eu',
              referer: 'https://key-hub.eu/'
            }
          });
          if (result === 'Success') {
            if (response?.status === 200) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${response?.statusText}(${response?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Keyhub.doScriptTask');
          return false;
        }
      }
      async extraDoTask({
        videoTasks
      }) {
        try {
          const pro = [];
          for (const data of videoTasks) {
            pro.push(this.#doScriptTask(data));
          }
          return Promise.all(pro).then(() => true);
        } catch (error) {
          throwError(error, 'Keyhub.extraDoTask');
          return false;
        }
      }
      #getGiveawayId() {
        try {
          const giveawayId = window.location.href.match(/giveaway\/([\d]+)/)?.[1];
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({}).error(i18n('getFailed', 'GiveawayId'));
          return false;
        } catch (error) {
          throwError(error, 'Keyhub.getGiveawayId');
          return false;
        }
      }
      async #checkLeftKey() {
        try {
          if (!globalOptions.other.checkLeftKey) {
            return true;
          }
          const leftKey = $('#keysleft').text().trim();
          if (leftKey === '0') {
            await external_Swal_default().fire({
              icon: 'warning',
              title: i18n('notice'),
              text: i18n('noKeysLeft'),
              confirmButtonText: i18n('confirm'),
              cancelButtonText: i18n('cancel'),
              showCancelButton: true
            }).then(({
              value
            }) => {
              if (value) {
                window.close();
              }
            });
          }
          return true;
        } catch (error) {
          throwError(error, 'Keyhub.checkLeftKey');
          return false;
        }
      }
      #checkLogin() {
        try {
          if (!globalOptions.other.checkLogin) {
            return true;
          }
          if ($('a[href*="/connect/steam"]').length > 0) {
            window.open('/connect/steam', '_self');
          }
          return true;
        } catch (error) {
          throwError(error, 'Keyhub.checkLogin');
          return false;
        }
      }
    }
    const website_Keyhub = Keyhub;
    const Givekey_defaultTasksTemplate = {
      steam: {
        groupLinks: [],
        wishlistLinks: [],
        curatorLinks: [],
        curatorLikeLinks: []
      },
      twitter: {
        userLinks: []
      },
      vk: {
        nameLinks: []
      },
      discord: {
        serverLinks: []
      }
    };
    const Givekey_defaultTasks = JSON.stringify(Givekey_defaultTasksTemplate);
    class Givekey extends website_Website {
      name = 'Givekey';
      tasks = [];
      socialTasks = JSON.parse(Givekey_defaultTasks);
      undoneTasks = JSON.parse(Givekey_defaultTasks);
      userId;
      buttons = [ 'doTask', 'undoTask', 'verifyTask' ];
      static test() {
        return window.location.host === 'givekey.ru';
      }
      async after() {
        try {
          await new Promise(resolve => {
            const checker = setInterval(() => {
              if ($('#navbarDropdown').length > 0) {
                clearInterval(checker);
                resolve(true);
              }
            });
          });
          if (!await this.#checkLeftKey()) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
        } catch (error) {
          throwError(error, 'Givekey.after');
          return false;
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if ($('a[href*="/auth/steam"]').length > 0) {
            window.open('/auth/steam', '_self');
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (!this.#getGiveawayId()) {
            return false;
          }
          const userId = $('meta[name="user-id"]').attr('content');
          if (!userId) {
            logStatus.error(i18n('getFailed', i18n('userId')));
            return false;
          }
          this.userId = userId;
          this.initialized = true;
          logStatus.success();
          return true;
        } catch (error) {
          throwError(error, 'Givekey.init');
          return false;
        }
      }
      async classifyTask(action) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('getTasksInfo')
          });
          if (action === 'undo') {
            this.socialTasks = GM_getValue(`gkTasks-${this.giveawayId}`)?.tasks || JSON.parse(Givekey_defaultTasks);
          }
          const tasks = $('.card-body:has("button") .row');
          for (const task of tasks) {
            const taskEle = $(task);
            const isSuccess = /Complete/i.test(taskEle.find('button').text().trim());
            if (isSuccess && action !== 'undo') {
              continue;
            }
            const checkButton = taskEle.find('#task_check');
            const taskId = checkButton.attr('data-id');
            if (taskId) {
              this.tasks.push(taskId);
            }
            if (action === 'verify') {
              continue;
            }
            let href = taskEle.find('a').attr('href') || null;
            const text = taskEle.find('a').text().trim();
            const icon = taskEle.find('i');
            if (!href || !text) {
              continue;
            }
            if (/^https?:\/\/givekey\.ru\/giveaway\/[\d]+\/execution_task/.test(href)) {
              href = await getRedirectLink(href);
            }
            if (!href) {
              continue;
            }
            if (/^https?:\/\/vk\.com\//.test(href)) {
              this.socialTasks.vk.nameLinks.push(href);
              if (action === 'do' && !isSuccess) {
                this.undoneTasks.vk.nameLinks.push(href);
              }
            } else if (/^https?:\/\/steamcommunity\.com\/groups/.test(href)) {
              this.socialTasks.steam.groupLinks.push(href);
              if (action === 'do' && !isSuccess) {
                this.undoneTasks.steam.groupLinks.push(href);
              }
            } else if (/^https?:\/\/store\.steampowered\.com\/app\//.test(href)) {
              this.socialTasks.steam.wishlistLinks.push(href);
              if (action === 'do' && !isSuccess) {
                this.undoneTasks.steam.wishlistLinks.push(href);
              }
            } else if (/Subscribe/gi.test(text) && icon.hasClass('fa-steam-square')) {
              if (/^https?:\/\/store\.steampowered\.com\/curator\//.test(href)) {
                this.socialTasks.steam.curatorLinks.push(href);
                if (action === 'do' && !isSuccess) {
                  this.undoneTasks.steam.curatorLinks.push(href);
                }
              } else {
                this.socialTasks.steam.curatorLikeLinks.push(href);
                if (action === 'do' && !isSuccess) {
                  this.undoneTasks.steam.curatorLikeLinks.push(href);
                }
              }
            } else if (/^https?:\/\/twitter\.com\//.test(href) && /Subscribe/gi.test(text)) {
              this.socialTasks.twitter.userLinks.push(href);
              if (action === 'do' && !isSuccess) {
                this.undoneTasks.twitter.userLinks.push(href);
              }
            } else if (icon.hasClass('fa-discord') || /^https?:\/\/discord\.com\/invite\//.test(href)) {
              this.socialTasks.discord.serverLinks.push(href);
              if (action === 'do' && !isSuccess) {
                this.undoneTasks.discord.serverLinks.push(href);
              }
            } else {
              scripts_echoLog({}).warning(`${i18n('unKnownTaskType')}: ${text}(${href})`);
            }
          }
          logStatus.success();
          this.tasks = unique(this.tasks);
          this.undoneTasks = this.uniqueTasks(this.undoneTasks);
          this.socialTasks = this.uniqueTasks(this.socialTasks);
          if (window.DEBUG) {
            console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          }
          GM_setValue(`gkTasks-${this.giveawayId}`, {
            tasks: this.socialTasks,
            time: new Date().getTime()
          });
          return true;
        } catch (error) {
          throwError(error, 'Givekey.classifyTask');
          return false;
        }
      }
      async verifyTask() {
        try {
          if (!this.initialized && !this.init()) {
            return false;
          }
          if (this.tasks.length === 0 && !await this.classifyTask('verify')) {
            return false;
          }
          scripts_echoLog({}).warning(i18n('giveKeyNoticeBefore'));
          const taskLength = this.tasks.length;
          for (let i = 0; i < taskLength; i++) {
            await this.#verify(this.tasks[i]);
            if (i < taskLength - 1) {
              await delay(15e3);
            }
          }
          scripts_echoLog({}).success(i18n('allTasksComplete'));
          scripts_echoLog({
            html: `<li><font class="warning">${i18n('giveKeyNoticeAfter')}</font></li>`
          });
          return true;
        } catch (error) {
          throwError(error, 'Givekey.verifyTask');
          return false;
        }
      }
      async #verify(task) {
        try {
          const logStatus = scripts_echoLog({
            html: `<li>${i18n('verifyingTask')}${task}...<font></font></li>`
          });
          return await new Promise(resolve => {
            $.ajax({
              url: 'https://givekey.ru/giveaway/task',
              method: 'POST',
              data: `id=${task}&user_id=${this.userId}`,
              dataType: 'json',
              headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              },
              success: data => {
                if (data.btn) {
                  $(`button[data-id=${this.userId}]`).html(data.btn);
                }
                if (data.status === 'ok') {
                  $(`.task_check_${data.id}`).html(`<button class="btn btn-success mb-2 btn-block" disabled>${data.btn}</button>`);
                  logStatus.success();
                  resolve(true);
                } else if (data.status === 'end') {
                  logStatus.success();
                  scripts_echoLog({}).success(data.key);
                  resolve(true);
                } else {
                  logStatus.error(`Error:${data.msg}`);
                  resolve(false);
                }
              },
              error: xhr => {
                logStatus.error(`Error:${xhr.statusText}(${xhr.status})`);
                resolve(false);
              }
            });
          });
        } catch (error) {
          throwError(error, 'Givekey.verify');
          return false;
        }
      }
      #getGiveawayId() {
        try {
          const giveawayId = window.location.href.match(/giveaway\/([\d]+)/)?.[1];
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({
            text: i18n('getFailed', 'GiveawayId')
          });
          return false;
        } catch (error) {
          throwError(error, 'Givekey.getGiveawayId');
          return false;
        }
      }
      async #checkLeftKey() {
        try {
          if (!globalOptions.other.checkLeftKey) {
            return true;
          }
          if (!$('#keys_count').text()) {
            await external_Swal_default().fire({
              icon: 'warning',
              title: i18n('notice'),
              text: i18n('noKeysLeft'),
              confirmButtonText: i18n('confirm'),
              cancelButtonText: i18n('cancel'),
              showCancelButton: true
            }).then(({
              value
            }) => {
              if (value) {
                window.close();
              }
            });
          }
          return true;
        } catch (error) {
          throwError(error, 'Givekey.checkLeftKey');
          return false;
        }
      }
    }
    const website_Givekey = Givekey;
    class GiveeClub extends GiveawaySu {
      name = 'GiveeClub';
      buttons = [ 'doTask', 'undoTask', 'verifyTask' ];
      static test() {
        return /^https?:\/\/givee\.club\/.*?\/event\/[\d]+/.test(window.location.href);
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          if (!await this.#checkLeftKey()) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
        } catch (error) {
          throwError(error, 'GiveeClub.after');
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if (!this.#checkLogin()) {
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (!this.#getGiveawayId()) {
            return false;
          }
          this.initialized = true;
          logStatus.success();
          return true;
        } catch (error) {
          throwError(error, 'GiveeClub.init');
          return false;
        }
      }
      async classifyTask(action) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('getTasksInfo')
          });
          if (action === 'undo') {
            this.socialTasks = GM_getValue(`gcTasks-${this.giveawayId}`)?.tasks || Giveawaysu_defaultTasks;
            return true;
          }
          const pro = [];
          const tasks = $('.event-actions tr');
          for (const task of tasks) {
            pro.push(new Promise(resolve => {
              const taskDes = $(task).find('.event-action-label a');
              const taskIcon = $(task).find('.event-action-icon i').attr('class') || '';
              const taskName = taskDes.text().trim();
              const taskType = $(task).find('button[data-type]')?.attr('data-type');
              const taskFinished = $(task).find('.event-action-buttons .btn-success')?.length;
              if (taskIcon.includes('ban') || /AdBlock/i.test(taskName) || taskIcon.includes('envelope') || taskFinished) {
                return resolve(true);
              }
              getRedirectLink(taskDes.attr('href')).then(taskLink => {
                if (!taskLink) {
                  return resolve(false);
                }
                if (taskType === 'steam.group.join' && /^https?:\/\/steamcommunity\.com\/groups/.test(taskLink)) {
                  this.undoneTasks.steam.groupLinks.push(taskLink);
                } else if (/like.*announcement/gi.test(taskName)) {
                  this.undoneTasks.steam.announcementLinks.push(taskLink);
                } else if (taskType === 'steam.game.wishlist' && /^https?:\/\/store\.steampowered\.com\/app\//.test(taskLink)) {
                  this.undoneTasks.steam.wishlistLinks.push(taskLink);
                } else if (taskType === 'steam.game.wishlist' && taskDes.attr('data-steam-wishlist-appid')) {
                  this.undoneTasks.steam.wishlistLinks.push(`https://store.steampowered.com/app/${taskDes.attr('data-steam-wishlist-appid')}`);
                } else if (taskType === 'steam.game.follow' && /^https?:\/\/store\.steampowered\.com\/app\//.test(taskLink)) {
                  this.undoneTasks.steam.followLinks.push(taskLink);
                } else if (/^https?:\/\/store\.steampowered\.com\/curator\//.test(taskLink)) {
                  this.undoneTasks.steam.curatorLinks.push(taskLink);
                } else if (taskIcon.includes('steam') && /follow|subscribe/gim.test(taskName)) {
                  this.undoneTasks.steam.curatorLikeLinks.push(taskLink);
                } else if (/subscribe.*steam.*forum/gim.test(taskName)) {
                  this.undoneTasks.steam.forumLinks.push(taskLink);
                } else if (taskIcon.includes('discord')) {
                  this.undoneTasks.discord.serverLinks.push(taskLink);
                } else if (taskIcon.includes('instagram')) {
                  this.undoneTasks.instagram.userLinks.push(taskLink);
                } else if (taskIcon.includes('twitch')) {
                  this.undoneTasks.twitch.channelLinks.push(taskLink);
                } else if (taskIcon.includes('reddit')) {
                  this.undoneTasks.reddit.redditLinks.push(taskLink);
                } else if (/watch.*art/gim.test(taskName)) {
                  this.undoneTasks.steam.workshopVoteLinks.push(taskLink);
                } else if (/subscribe.*youtube.*channel/gim.test(taskName)) {
                  this.undoneTasks.youtube.channelLinks.push(taskLink);
                } else if (/(watch|like).*youtube.*video/gim.test(taskName) || (taskIcon.includes('youtube') || taskIcon.includes('thumbs-up')) && /(watch|like).*video/gim.test(taskName)) {
                  this.undoneTasks.youtube.likeLinks.push(taskLink);
                } else if (taskIcon.includes('vk') || /join.*vk.*group/gim.test(taskName)) {
                  this.undoneTasks.vk.nameLinks.push(taskLink);
                } else if (taskIcon.includes('twitter')) {
                  if (/https?:\/\/twitter\.com\/[^/]+\/?$/gim.test(taskLink)) {
                    this.undoneTasks.twitter.userLinks.push(taskLink);
                  } else if (/https?:\/\/twitter\.com\/[^/]+?\/status\/[\d]+/gim.test(taskLink)) {
                    this.undoneTasks.twitter.retweetLinks.push(taskLink);
                  }
                } else {
                  if (/(on twitter)|(Follow.*on.*Facebook)/gim.test(taskName)) {} else {
                    if (/follow.*button/gim.test(taskName)) {
                      this.undoneTasks.steam.followLinks.push(taskLink);
                    }
                  }
                }
                resolve(true);
              }).catch(error => {
                throwError(error, 'GiveeClub.classifyTask->getRedirectLink');
                return false;
              });
            }));
          }
          await Promise.all(pro);
          logStatus.success();
          this.undoneTasks = this.uniqueTasks(this.undoneTasks);
          this.socialTasks = this.undoneTasks;
          if (window.DEBUG) {
            console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          }
          GM_setValue(`gcTasks-${this.giveawayId}`, {
            tasks: this.socialTasks,
            time: new Date().getTime()
          });
          return true;
        } catch (error) {
          throwError(error, 'GiveeClub.classifyTask');
          return false;
        }
      }
      async verifyTask() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('giveeClubVerifyNotice')
          });
          const taskButtons = $('.event-actions tr button').has('i.glyphicon-refresh').not('[data-type="user.adblock"]');
          for (const button of taskButtons) {
            button.click();
            if ($(button).attr('data-type') !== 'steam.game.wishlist') {
              await delay(1e3);
            }
          }
          logStatus.warning(i18n('giveeClubVerifyFinished'));
          return true;
        } catch (error) {
          throwError(error, 'Givekey.verifyTask');
          return false;
        }
      }
      #checkLogin() {
        try {
          if (!globalOptions.other.checkLogin) {
            return true;
          }
          if ($('a[href*="/account/auth"]').length > 0) {
            window.open($('a[href*="/account/auth"]').attr('href'), '_self');
          }
          return true;
        } catch (error) {
          throwError(error, 'GiveeClub.checkLogin');
          return false;
        }
      }
      #getGiveawayId() {
        const giveawayId = window.location.href.match(/\/event\/([\d]+)/)?.[1];
        if (giveawayId) {
          this.giveawayId = giveawayId;
          return true;
        }
        scripts_echoLog({
          text: i18n('getFailed', 'GiveawayId')
        });
        return false;
      }
      async #checkLeftKey() {
        try {
          if (!globalOptions.other.checkLeftKey) {
            return true;
          }
          if ($('.event-ended').length > 0 && $('.event-winner').length === 0) {
            await external_Swal_default().fire({
              icon: 'warning',
              title: i18n('notice'),
              text: i18n('giveawayEnded'),
              confirmButtonText: i18n('confirm'),
              cancelButtonText: i18n('cancel'),
              showCancelButton: true
            }).then(({
              value
            }) => {
              if (value) {
                window.close();
              }
            });
          }
          return true;
        } catch (error) {
          throwError(error, 'Giveawaysu.checkLeftKey');
          return false;
        }
      }
    }
    const website_GiveeClub = GiveeClub;
    const defaultOptions = {
      maxPoint: '99999999'
    };
    class OpiumPulses {
      name = 'OpiumPulses';
      options = {
        ...defaultOptions,
        ...GM_getValue('OpiumPulsesOptions')
      };
      maxPoints = 99999999;
      myPoints = 0;
      buttons = [ 'doFreeTask', 'doPointTask' ];
      static test() {
        return window.location.host === 'www.opiumpulses.com';
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          this.maxPoints = parseInt(this.options.maxPoint, 10);
        } catch (error) {
          throwError(error, 'OpiumPulses.after');
        }
      }
      async doFreeTask() {
        try {
          this.#toggleTask('FREE');
        } catch (error) {
          throwError(error, 'OpiumPulses.doFreeTask');
        }
      }
      async doPointTask() {
        try {
          this.myPoints = parseInt($('.page-header__nav-func-user-nav-items.points-items').text().match(/[\d]+/gim)?.[0] || '0', 10);
          this.#toggleTask('points');
        } catch (error) {
          throwError(error, 'OpiumPulses.doPointTask');
        }
      }
      async #toggleTask(type) {
        try {
          const items = $(`.giveaways-page-item:contains('${type}'):not(:contains('ENTERED'))`);
          for (const item of items) {
            const needPoints = parseInt($(item).find('.giveaways-page-item-header-points').text().match(/[\d]+/gim)?.[0] || '999999', 10);
            const name = $(item).find('.giveaways-page-item-footer-name').text().trim();
            if (type === 'points' && needPoints > this.myPoints) {
              scripts_echoLog({}).warning(`${i18n('noPoints')}: ${name}`);
            } else if (type === 'points' && !needPoints) {
              scripts_echoLog({}).warning(`${i18n('getNeedPointsFailed')}: ${name}`);
            } else if (!(type === 'points' && needPoints > this.maxPoints)) {
              const logStatus = scripts_echoLog({
                text: `${i18n('joiningLottery')}<a href="${$(item).find('a.giveaways-page-item-img-btn-more').attr('href')}" target="_blank">${name}</a>...`
              });
              const aElement = $(item).find('a.giveaways-page-item-img-btn-enter:contains(\'enter\')');
              if (aElement?.attr('onclick')?.includes('checkUser')) {
                const giveawayId = aElement.attr('onclick')?.match(/[\d]+/)?.[0];
                if (giveawayId) {
                  checkUser(giveawayId);
                }
              }
              if (!aElement.attr('href')) {
                logStatus.error('Error: No "href".');
                continue;
              }
              const {
                result,
                statusText,
                status,
                data
              } = await tools_httpRequest({
                url: aElement.attr('href'),
                method: 'GET'
              });
              if (result === 'Success') {
                const {
                  result: result0,
                  statusText: statusText0,
                  status: status0,
                  data: data0
                } = await tools_httpRequest({
                  url: data?.finalUrl,
                  method: 'GET'
                });
                if (data0?.responseText && /You've entered this giveaway/gim.test(data0.responseText)) {
                  logStatus.success();
                  const points = data0.responseText.match(/Points:[\s]*?([\d]+)/)?.[1];
                  if (type === 'points' && points) {
                    this.myPoints = parseInt(points, 10);
                  }
                } else if (data0?.responseText && /You're not eligible to enter/gim.test(data0.responseText)) {
                  logStatus.error('You\'re not eligible to enter');
                } else {
                  logStatus.error(`${result0}:${statusText0}(${status0})`);
                }
              } else {
                logStatus.error(`${result}:${statusText}(${status})`);
              }
            }
          }
          scripts_echoLog({
            text: '-----END-----'
          });
        } catch (error) {
          throwError(error, 'OpiumPulses.toggleTask');
        }
      }
      init() {
        return true;
      }
      classifyTask() {
        return true;
      }
      #checkLogin() {
        try {
          if (!globalOptions.other.checkLogin) {
            return true;
          }
          if ($('a[href*="/site/login"]').length > 1) {
            window.open('/site/login', '_self');
          }
          return true;
        } catch (error) {
          throwError(error, 'OpiumPulses.checkLogin');
          return false;
        }
      }
    }
    const website_OpiumPulses = OpiumPulses;
    const external_dayjs_namespaceObject = dayjs;
    var external_dayjs_default = __webpack_require__.n(external_dayjs_namespaceObject);
    const leftKeyChecker = {
      async classify(link) {
        try {
          if (/^https?:\/\/giveaway\.su\/giveaway\/view\/[\d]+/.test(link)) {
            return await this.giveawaySu(link);
          }
          if (/^https?:\/\/givee\.club\/[\w]+?\/event\/[\d]+/.test(link)) {
            return await this.giveeClub(link);
          }
          if (/^https?:\/\/gleam\.io\/.+?\/.+/.test(link)) {
            return await this.gleam(link);
          }
          if (/^https?:\/\/www\.indiedb\.com\/giveaways\/.+/.test(link)) {
            return await this.indieDb(link);
          }
          if (/^https?:\/\/key-hub\.eu\/giveaway\/[\d]+/.test(link)) {
            return await this.keyhub(link);
          }
          if (/^https?:\/\/opquests\.com\/quests\/[\d]+/.test(link)) {
            return await this.opquests(link);
          }
          if (/^https?:\/\/itch\.io\/s\/[\d]+?\/.*/.test(link)) {
            return await this.itch(link);
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.classify');
          return false;
        }
      },
      async giveawaySu(link) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: link,
            method: 'GET'
          });
          if (result === 'Success' && data?.status === 200) {
            if (data.responseText.includes('class="steam-login"')) {
              return false;
            }
            if (data.responseText.includes('class="giveaway-ended"')) {
              return 'Ended';
            }
            return 'Active';
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.giveawaySu');
          return false;
        }
      },
      async giveeClub(link) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: link,
            method: 'GET'
          });
          if (result === 'Success' && data?.status === 200) {
            if (data.responseText.includes('class="event-winner"')) {
              return 'Won';
            }
            if (data.responseText.includes('class="event-ended"')) {
              return 'Ended';
            }
            return 'Active';
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.giveeClub');
          return false;
        }
      },
      async gleam(link) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: link,
            method: 'GET'
          });
          if (result === 'Success' && data?.status === 200) {
            if (/incentives&quot;:{&quot;[\d]+?&quot;:\[&quot;.+?&quot;\]/.test(data.responseText)) {
              return 'Won';
            }
            const campaignDiv = data.responseText.match(/<div class='popup-blocks-container'[\w\W]+?'>/)?.[0];
            if (!campaignDiv) {
              return false;
            }
            const campaignString = $(campaignDiv).attr('ng-init')?.match(/initCampaign\(([\w\W]+?)\)$/)?.[1];
            if (!campaignString) {
              return false;
            }
            const {
              campaign
            } = JSON.parse(campaignString);
            if (campaign.banned) {
              return 'Banned';
            }
            if (campaign.finished) {
              return 'Ended';
            }
            if (campaign.paused) {
              return 'Paused';
            }
            if (new Date().getTime() < campaign.starts_at * 1e3) {
              return 'NotStart';
            }
            return 'Active';
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.gleam');
          return false;
        }
      },
      async indieDb(link) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: link,
            method: 'GET'
          });
          if (result === 'Success' && data?.status === 200) {
            if (data.responseText.includes('Congrats you WON')) {
              return 'Won';
            }
            if (data.responseText.includes('Giveaway is closed') || data.responseText.includes('next time')) {
              return 'Ended';
            }
            return 'Active';
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.indieDb');
          return false;
        }
      },
      async keyhub(link) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: link,
            method: 'GET'
          });
          if (result === 'Success' && data?.status === 200) {
            const keysleft = data.responseText.match(/<span id="keysleft">([\d]+?)<\/span>/)?.[1];
            if (!keysleft) {
              return false;
            }
            if (keysleft === '0') {
              return 'Ended';
            }
            return `Active(${keysleft})`;
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.keyhub');
          return false;
        }
      },
      async opquests(link) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: link,
            method: 'GET'
          });
          if (result === 'Success' && data?.status === 200) {
            const keysleft = data.responseText.match(/<div class="">[\s]*?([\d]+?)[\s]*?of/)?.[1];
            if (!keysleft) {
              return false;
            }
            if (keysleft === '0') {
              return 'Ended';
            }
            return `Active(${keysleft})`;
          } else if (data?.status === 404) {
            return 'Ended';
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.opquests');
          return false;
        }
      },
      async itch(link) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: link,
            method: 'GET'
          });
          if (result === 'Success' && data?.status === 200) {
            const endDate = data.responseText.match(/{"start_date":"[0-9A-Z-:]+?".*?"end_date":"([0-9A-Z-:]+?)".*?}/)?.[1];
            if (!endDate) {
              return false;
            }
            if (new Date().getTime() > new Date(endDate).getTime()) {
              return 'Ended';
            }
            return `Active(${external_dayjs_default()(endDate).format('YYYY-MM-DD HH:mm:ss')})`;
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.opquests');
          return false;
        }
      }
    };
    const website_leftKeyChecker = leftKeyChecker;
    const Keylol_defaultTasksTemplate = {
      steam: {
        groupLinks: [],
        wishlistLinks: [],
        curatorLinks: [],
        curatorLikeLinks: [],
        followLinks: [],
        forumLinks: [],
        announcementLinks: [],
        workshopVoteLinks: [],
        licenseLinks: []
      },
      discord: {
        serverLinks: []
      },
      instagram: {
        userLinks: []
      },
      vk: {
        nameLinks: []
      },
      twitch: {
        channelLinks: []
      },
      reddit: {
        redditLinks: []
      },
      twitter: {
        userLinks: [],
        retweetLinks: []
      },
      youtube: {
        channelLinks: [],
        likeLinks: []
      }
    };
    const Keylol_defaultTasks = JSON.stringify(Keylol_defaultTasksTemplate);
    class Keylol extends website_Website {
      name = 'Keylol';
      socialTasks = JSON.parse(Keylol_defaultTasks);
      undoneTasks = JSON.parse(Keylol_defaultTasks);
      buttons = [ 'doTask', 'undoTask', 'selectAll', 'selectNone', 'invertSelect' ];
      static test() {
        return window.location.host === 'keylol.com' && (!!$('.subforum_left_title_left_up a').eq(3).attr('href')?.includes('319') || !!$('.subforum_left_title_left_up a').eq(3).attr('href')?.includes('234'));
      }
      init() {
        return true;
      }
      after() {
        try {
          const selector = this.name === 'Keylol' ? '#postlist>div[id^="post_"]:first' : 'div.container';
          const mainPost = $(selector);
          const discordLinks = mainPost.find('a[href*="discord.com"]:visible');
          const redditLinks = mainPost.find('a[href*="reddit.com"]:visible');
          const insLinks = mainPost.find('a[href*="instagram.com"]:visible');
          const twitterLinks = mainPost.find('a[href*="twitter.com"]:visible,a[href*="x.com"]:visible');
          const twitchLinks = mainPost.find('a[href*="twitch.tv"]:visible');
          const vkLinks = mainPost.find('a[href*="vk.com"]:visible');
          const steamStoreLinks = mainPost.find('a[href*="store.steampowered.com"]:visible');
          const steamCommunityLinks = mainPost.find('a[href*="steamcommunity.com"]:visible');
          const ytbLinks = mainPost.find('a[href*="youtube.com"]:visible');
          if (discordLinks.length > 0) {
            for (const discordLink of discordLinks) {
              const link = $(discordLink).attr('href');
              if (!(link && /^https?:\/\/discord\.com\/invite\/.+/.test(link))) {
                continue;
              }
              this.#addBtn(discordLink, 'discord', 'serverLinks', link);
            }
          }
          if (redditLinks.length > 0) {
            for (const redditLink of redditLinks) {
              const link = $(redditLink).attr('href');
              if (!(link && /^https?:\/\/www\.reddit\.com\/(r|user)\/.+/.test(link))) {
                continue;
              }
              this.#addBtn(redditLink, 'reddit', 'redditLinks', link);
            }
          }
          if (insLinks.length > 0) {
            for (const insLink of insLinks) {
              const link = $(insLink).attr('href');
              if (!(link && /^https:\/\/www\.instagram\.com\/.+/.test(link))) {
                continue;
              }
              this.#addBtn(insLink, 'instagram', 'userLinks', link);
            }
          }
          if (twitterLinks.length > 0) {
            for (const twitterLink of twitterLinks) {
              const link = $(twitterLink).attr('href');
              if (!(link && /^https:\/\/twitter\.com\/.+/.test(link))) {
                continue;
              }
              if (/https:\/\/twitter\.com\/.*?\/status\/[\d]+/.test(link)) {
                this.#addBtn(twitterLink, 'twitter', 'retweetLinks', link);
              } else {
                this.#addBtn(twitterLink, 'twitter', 'userLinks', link);
              }
            }
          }
          if (twitchLinks.length > 0) {
            for (const twitchLink of twitchLinks) {
              const link = $(twitchLink).attr('href');
              if (!(link && /^https:\/\/(www\.)?twitch\.tv\/.+/.test(link))) {
                continue;
              }
              this.#addBtn(twitchLink, 'twitch', 'channelLinks', link);
            }
          }
          if (vkLinks.length > 0) {
            for (const vkLink of vkLinks) {
              const link = $(vkLink).attr('href');
              if (!(link && /^https:\/\/vk\.com\/.+/.test(link))) {
                continue;
              }
              this.#addBtn(vkLink, 'vk', 'nameLinks', link);
            }
          }
          if (steamStoreLinks.length > 0) {
            for (const steamStoreLink of steamStoreLinks) {
              const link = $(steamStoreLink).attr('href');
              if (!link) {
                continue;
              }
              if (/curator\/[\d]+/.test(link)) {
                this.#addBtn(steamStoreLink, 'steam', 'curatorLinks', link);
              } else if (/(publisher|developer|franchise)\/.+/.test(link)) {
                this.#addBtn(steamStoreLink, 'steam', 'curatorLikeLinks', link);
              } else if (/news(hub)?\/app\/[\d]+\/view\/[\d]+/.test(link)) {
                this.#addBtn(steamStoreLink, 'steam', 'announcementLinks', link);
              } else if (/app\/[\d]+/.test(link)) {
                this.#addBtn(steamStoreLink, 'steam', 'followLinks', link);
                this.#addBtn(steamStoreLink, 'steam', 'wishlistLinks', link);
              }
            }
          }
          if (steamCommunityLinks.length > 0) {
            for (const steamCommunityLink of steamCommunityLinks) {
              const link = $(steamCommunityLink).attr('href');
              if (!link) {
                continue;
              }
              if (/groups\/.+/.test(link)) {
                this.#addBtn(steamCommunityLink, 'steam', 'groupLinks', link);
              } else if (/announcements\/detail\/[\d]+/.test(link)) {
                this.#addBtn(steamCommunityLink, 'steam', 'announcementLinks', link);
              }
            }
          }
          if (ytbLinks.length > 0) {
            for (const ytbLink of ytbLinks) {
              const link = $(ytbLink).attr('href');
              if (!link) {
                continue;
              }
              this.#addBtn(ytbLink, 'youtube', 'channelLinks', link);
              this.#addBtn(ytbLink, 'youtube', 'likeLinks', link);
            }
          }
          const giveawayLinks = mainPost.find('a[href*="giveaway.su/giveaway/view/"]:visible,a[href*="givee.club/"]:visible,a[href*="gleam.io/"]:visible,a[href*="www.indiedb.com/giveaways/"]:visible,a[href*="key-hub.eu/giveaway/"]:visible,a[href*="opquests.com/quests/"]:visible,a[href*="itch.io/s/"]:visible');
          if (giveawayLinks.length > 0) {
            for (const giveawayLink of giveawayLinks) {
              const link = $(giveawayLink).attr('href');
              if (!link) {
                continue;
              }
              website_leftKeyChecker.classify(link).then(status => {
                if (!status) {
                  return;
                }
                if (/^Active/.test(status)) {
                  $(`a[href="${link}"]`).after(`<font class="auto-task-giveaway-status active" title="${i18n('Active')}">${status}</font>`);
                  return;
                }
                $(`a[href="${link}"]`).after(`<font class="auto-task-giveaway-status not-active" title="${i18n(status)}">${status}</font>`);
              }).catch(error => {
                throwError(error, 'keylol.after -> leftKeyChecker');
              });
            }
          }
          if (this.name === 'Keylol') {
            const asfLinks = mainPost.find('a[href^="#asf"]:visible');
            if (asfLinks.length > 0) {
              for (const asfLink of asfLinks) {
                const link = $(asfLink).attr('href');
                if (!link) {
                  continue;
                }
                this.#addBtn($(`a[href="${link}"]`).after('<span style="color: #ccc; margin: 0 -5px 0 5px"> | </span>').next()[0], 'steam', 'licenseLinks', `appid-${link.replace('#asf', '')}`);
              }
            }
            const subLinks = mainPost.find('a[href*="steamdb.info/sub/"]:visible');
            if (subLinks.length > 0) {
              for (const subLink of subLinks) {
                const link = $(subLink).attr('href');
                if (!link) {
                  continue;
                }
                const subid = link.match(/^https:\/\/steamdb\.info\/sub\/([\d]+)/)?.[1];
                if (!subid) {
                  continue;
                }
                this.#addBtn(subLink, 'steam', 'licenseLinks', `subid-${subid}`);
              }
            }
            const asfLinks2 = mainPost.find('.blockcode:contains("addlicense"):visible');
            if (asfLinks2.length > 0) {
              for (const asfLink of asfLinks2) {
                const subid = asfLink.innerText.match(/[\d]+/g);
                if (!subid || subid.length === 0) {
                  continue;
                }
                this.#addBtn($(asfLink).children('em')[0], 'steam', 'licenseLinks', `subid-${subid.join(',')}`);
              }
            }
          }
        } catch (error) {
          throwError(error, 'keylol.after');
        }
      }
      classifyTask(action) {
        try {
          this.socialTasks = JSON.parse(Keylol_defaultTasks);
          this.undoneTasks = JSON.parse(Keylol_defaultTasks);
          const selectedBtns = $('.auto-task-keylol[selected="selected"]:visible');
          for (const btn of selectedBtns) {
            const button = $(btn);
            const social = button.attr('data-social');
            const type = button.attr('data-type');
            const link = button.attr('data-link');
            if (!(social && type && link)) {
              continue;
            }
            if (action === 'do') {
              this.undoneTasks[social][type].push(link);
            }
            if (action === 'undo') {
              this.socialTasks[social][type].push(link);
            }
          }
          this.undoneTasks = this.uniqueTasks(this.undoneTasks);
          this.socialTasks = this.uniqueTasks(this.socialTasks);
          if (window.DEBUG) {
            console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          }
          return true;
        } catch (error) {
          throwError(error, 'Keylol.classifyTask');
          return false;
        }
      }
      selectAll() {
        try {
          $('.auto-task-keylol:visible').attr('selected', 'selected');
        } catch (error) {
          throwError(error, 'Keylol.selectAll');
        }
      }
      selectNone() {
        try {
          $('.auto-task-keylol:visible').removeAttr('selected');
        } catch (error) {
          throwError(error, 'Keylol.selectNone');
        }
      }
      invertSelect() {
        try {
          $('.auto-task-keylol:visible').each((index, element) => {
            element.getAttribute('selected') ? element.removeAttribute('selected') : element.setAttribute('selected', 'selected');
          });
        } catch (error) {
          throwError(error, 'Keylol.invertSelect');
        }
      }
      #addBtn(before, social, linkType, link) {
        try {
          $(before).after('<a href="javascript:void(0);" class="auto-task-keylol" target="_self"' + ' onclick="this.getAttribute(\'selected\') ? this.removeAttribute(\'selected\') : this.setAttribute(\'selected\', \'selected\')"' + ` data-social="${social}" data-type="${linkType}" data-link="${link}">${linkType.replace('Links', '')}</a>`);
        } catch (error) {
          throwError(error, 'keylol.addBtn');
        }
      }
    }
    const website_Keylol = Keylol;
    const Opquests_defaultTasks = {
      steam: {
        groupLinks: [],
        wishlistLinks: [],
        followLinks: [],
        curatorLikeLinks: []
      }
    };
    class Opquests extends website_Website {
      name = 'Opquests';
      undoneTasks = {
        ...Opquests_defaultTasks
      };
      buttons = [ 'doTask', 'verifyTask', 'getKey' ];
      static test() {
        return window.location.host === 'opquests.com';
      }
      async before() {
        const opquestsVerifyTasks = GM_getValue('opquestsVerifyTasks') || [];
        if (opquestsVerifyTasks.length > 0) {
          const taskId = opquestsVerifyTasks.pop();
          GM_setValue('opquestsVerifyTasks', opquestsVerifyTasks);
          $(`#task_id[value="${taskId}"]`).parent().children('button[type="submit"]')[0].click();
        } else {
          if (GM_getValue('opquestsVerifyTasks')) {
            GM_deleteValue('opquestsVerifyTasks');
          }
        }
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
        } catch (error) {
          throwError(error, 'Opquests.after');
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if ($('a[href*="/auth/redirect"]').length > 0) {
            window.open('/auth/redirect', '_self');
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (!this.#getGiveawayId()) {
            return false;
          }
          this.initialized = true;
          logStatus.success();
          return true;
        } catch (error) {
          throwError(error, 'Opquests.init');
          return false;
        }
      }
      async classifyTask(action) {
        try {
          if (action === 'undo') {
            scripts_echoLog({
              text: i18n('cannotUndo')
            });
            return false;
          }
          const logStatus = scripts_echoLog({
            text: i18n('getTasksInfo')
          });
          const tasks = $('.w-full:contains("Validate") .items-center');
          for (const task of tasks) {
            const link = $(task).find('a:contains("Open")').attr('href');
            const taskDes = $(task).find('div').eq(1).text().trim();
            if (!link) {
              continue;
            }
            if (/steamcommunity\.com\/groups\//.test(link)) {
              this.undoneTasks.steam.groupLinks.push(link);
            } else if (/store\.steampowered\.com\/app\//.test(link)) {
              if (/wishlist/gim.test(taskDes)) {
                this.undoneTasks.steam.wishlistLinks.push(link);
              } else if (/follow/gim.test(taskDes)) {
                this.undoneTasks.steam.followLinks.push(link);
              }
            } else if (/store\.steampowered\.com\/(publisher|developer|curator)\//.test(link) && /follow/gim.test(taskDes)) {
              this.undoneTasks.steam.curatorLikeLinks.push(link);
            } else {
              scripts_echoLog({}).warning(`${i18n('unKnownTaskType')}: ${taskDes}(${link})`);
            }
          }
          logStatus.success();
          this.undoneTasks = this.uniqueTasks(this.undoneTasks);
          if (window.DEBUG) {
            console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          }
          return true;
        } catch (error) {
          throwError(error, 'Opquests.classifyTask');
          return false;
        }
      }
      async verifyTask() {
        try {
          if (!this.initialized) {
            this.init();
          }
          const tasks = $.makeArray($('div.w-full').find('.items-center').has('button.submit-loader')).map(ele => $(ele).find('input[name="task_id"]').val());
          await this.#confirm();
          const taskId = tasks.pop();
          GM_setValue('opquestsVerifyTasks', tasks);
          $(`#task_id[value="${taskId}"]`).parent().children('button[type="submit"]')[0].click();
          return true;
        } catch (error) {
          throwError(error, 'Opquests.verifyTask');
          return false;
        }
      }
      async #confirm() {
        try {
          const logStatus = scripts_echoLog({
            html: `<li>${i18n('confirmingTask')}...<font></font></li>`
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://opquests.com/quests/${this.giveawayId}?confirm=1`,
            method: 'GET',
            nochche: true,
            headers: {
              origin: 'https://opquests.com',
              referer: `https://opquests.com/warning?id=${this.giveawayId}`
            }
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Opquests.confirm');
          return false;
        }
      }
      async getKey(isButton) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('gettingKey')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://opquests.com/keys',
            method: 'GET'
          });
          if (result === 'Success') {
            if (data?.responseText) {
              const key = $(data?.responseText).find(`div.items-center:contains("${$('h1.font-bold').text().trim().replace(' Quest', '')}")`).find('div.font-bold').next().text();
              if (!key) {
                logStatus.error('Error: Key was not found');
                if (isButton) {
                  window.open('https://opquests.com/keys', '_self');
                }
                return false;
              }
              logStatus.success();
              scripts_echoLog({}).success(key);
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Opquests.getGiveawayId');
          return false;
        }
      }
      #getGiveawayId() {
        try {
          const giveawayId = window.location.href.match(/quests\/([\d]+)/)?.[1];
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({}).error(i18n('getFailed', 'GiveawayId'));
          return false;
        } catch (error) {
          throwError(error, 'Opquests.getGiveawayId');
          return false;
        }
      }
      #checkLogin() {
        try {
          if (!globalOptions.other.checkLogin) {
            return true;
          }
          if ($('a[href*="/auth/redirect"]').length > 0) {
            window.open('/auth/redirect', '_self');
          }
          return true;
        } catch (error) {
          throwError(error, 'Opquests.checkLogin');
          return false;
        }
      }
    }
    const website_Opquests = Opquests;
    const Gleam_defaultTasksTemplate = {
      steam: {
        groupLinks: [],
        wishlistLinks: [],
        followLinks: [],
        curatorLinks: [],
        curatorLikeLinks: []
      },
      twitter: {
        userLinks: [],
        retweetLinks: []
      },
      twitch: {
        channelLinks: []
      },
      discord: {
        serverLinks: []
      },
      youtube: {
        channelLinks: []
      },
      extra: {
        gleam: []
      }
    };
    const Gleam_defaultTasks = JSON.stringify(Gleam_defaultTasksTemplate);
    const Gleam_defaultOptions = {
      vlootUsername: '',
      gameroundUsername: ''
    };
    class Gleam extends website_Website {
      name = 'Gleam';
      undoneTasks = JSON.parse(Gleam_defaultTasks);
      socialTasks = JSON.parse(Gleam_defaultTasks);
      options = {
        ...Gleam_defaultOptions,
        ...GM_getValue('GleamOptions')
      };
      buttons = [ 'doTask', 'undoTask', 'verifyTask' ];
      static test() {
        return window.location.host === 'gleam.io';
      }
      async after() {
        try {
          if (window.location.search.includes('8b07d23f4bfa65f9')) {
            const checkComplete = setInterval(() => {
              if ($('.entry-content .entry-method i.fa-check').length > 0) {
                clearInterval(checkComplete);
                window.close();
              }
            });
            for (const task of $('.entry-content .entry-method')) {
              const taskInfo = $(task).find('.user-links');
              const expandInfo = $(task).find('.expandable');
              const aElements = expandInfo.find('a.btn,a:contains(Continue),button:contains(Continue)');
              if (aElements.length > 0) {
                for (const element of aElements) {
                  const $element = $(element);
                  const href = $element.attr('href');
                  $element.removeAttr('href')[0].click();
                  $element.attr('href', href);
                  await delay(1e3);
                }
              }
              taskInfo[0].click();
              await delay(1e3);
            }
            scripts_echoLog({}).warning(i18n('gleamTaskNotice'));
          } else if (!await this.#checkLeftKey()) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
        } catch (error) {
          throwError(error, 'Gleam.after');
          return false;
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if (!this.#getGiveawayId()) {
            return false;
          }
          this.initialized = true;
          logStatus.success();
          return true;
        } catch (error) {
          throwError(error, 'Gleam.init');
          return false;
        }
      }
      async classifyTask(action) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('getTasksInfo')
          });
          if (action === 'undo') {
            this.socialTasks = GM_getValue(`gleamTasks-${this.giveawayId}`)?.tasks || JSON.parse(Gleam_defaultTasks);
          }
          const tasks = $('.entry-content .entry-method');
          for (const task of tasks) {
            const $task = $(task);
            if (action === 'do' && $task.find('i.fa-question').length === 0) {
              continue;
            }
            const socialIcon = $task.find('.icon-wrapper i');
            const taskInfo = $task.find('.user-links');
            const taskText = taskInfo.text().trim();
            const expandInfo = $task.find('.expandable');
            const aElements = expandInfo.find('a.btn');
            if (aElements.length > 0) {
              for (const element of aElements) {
                const $element = $(element);
                const href = $element.attr('href');
                $element.removeAttr('href')[0].click();
                $element.attr('href', href);
              }
            }
            if (socialIcon.hasClass('fa-twitter')) {
              const link = $task.find('a[href^="https://twitter.com/"],a[href^="https://x.com/"]').attr('href');
              if (!link) {
                continue;
              }
              if (/follow/gi.test(taskText)) {
                if (action === 'undo') {
                  this.socialTasks.twitter.userLinks.push(link);
                }
                if (action === 'do') {
                  this.undoneTasks.twitter.userLinks.push(link);
                }
              } else if (/retweet/gim.test(taskText)) {
                if (action === 'undo') {
                  this.socialTasks.twitter.retweetLinks.push(link);
                }
                if (action === 'do') {
                  this.undoneTasks.twitter.retweetLinks.push(link);
                }
              }
            } else if (socialIcon.hasClass('fa-twitch')) {
              if (/follow/gim.test(taskText)) {
                const link = $task.find('a[href^="https://twitch.tv/"]').attr('href');
                if (!link) {
                  continue;
                }
                if (action === 'undo') {
                  this.socialTasks.twitch.channelLinks.push(link);
                }
                if (action === 'do') {
                  this.undoneTasks.twitch.channelLinks.push(link);
                }
              }
            } else if (socialIcon.hasClass('fa-discord')) {
              if (/join/gim.test(taskText)) {
                let link = $task.find('a[href^="https://discord.com/invite/"]').attr('href');
                if (!link) {
                  const ggLink = $task.find('a[href^="https://discord.gg/"]').attr('href')?.match(/discord\.gg\/([^/]+)/)?.[1];
                  if (!ggLink) {
                    continue;
                  }
                  link = `https://discord.com/invite/${ggLink}`;
                }
                if (action === 'undo') {
                  this.socialTasks.discord.serverLinks.push(link);
                }
                if (action === 'do') {
                  this.undoneTasks.discord.serverLinks.push(link);
                }
              }
            } else if (socialIcon.hasClass('fa-external-link-square-alt')) {
              continue;
            } else if (socialIcon.hasClass('fa-youtube')) {
              if (/subscribe/gim.test(taskText)) {
                const link = $task.find('a[href^="https://www.youtube.com/channel/"]').attr('href');
                if (!link) {
                  continue;
                }
                if (action === 'undo') {
                  this.socialTasks.youtube.channelLinks.push(link);
                }
                if (action === 'do') {
                  this.undoneTasks.youtube.channelLinks.push(link);
                }
              }
            } else if (socialIcon.attr('class')?.includes('steam')) {
              if (/join.*group/gi.test(taskText)) {
                const link = $task.find('a[href^="https://steamcommunity.com/groups/"]').attr('href');
                if (!link) {
                  continue;
                }
                if (action === 'undo') {
                  this.socialTasks.steam.groupLinks.push(link);
                }
                if (action === 'do') {
                  this.undoneTasks.steam.groupLinks.push(link);
                }
              } else if (/follow.*curator/gi.test(taskText)) {
                const link = $task.find('a[href^="https://store.steampowered.com/curator/"]').attr('href');
                if (!link) {
                  continue;
                }
                if (action === 'undo') {
                  this.socialTasks.steam.curatorLinks.push(link);
                }
                if (action === 'do') {
                  this.undoneTasks.steam.curatorLinks.push(link);
                }
              }
            } else if (socialIcon.hasClass('fa-shield') && taskText.includes('vloot.io') || socialIcon.hasClass('fa-tiktok')) {
              const continueBtn = expandInfo.find('span:contains(Continue),button:contains(Continue)');
              for (const button of continueBtn) {
                button.click();
                await delay(500);
                expandInfo.find('input').val(this.options.vlootUsername);
              }
            } else if (socialIcon.hasClass('fa-gamepad-alt') && taskText.includes('Gameround')) {
              const continueBtn = expandInfo.find('span:contains(Continue),button:contains(Continue)');
              for (const button of continueBtn) {
                button.click();
                await delay(500);
                expandInfo.find('input').val(this.options.gameroundUsername);
              }
            } else if (socialIcon.hasClass('fa-bullhorn') && /Complete/gi.test(taskText)) {
              if (action !== 'do') {
                continue;
              }
              const gleamLink = await this.#getGleamLink(taskText);
              if (!gleamLink) {
                continue;
              }
              this.undoneTasks.extra.gleam.push(gleamLink);
            } else if (socialIcon.hasClass('fa-question') || socialIcon.hasClass('fa-reddit') || socialIcon.hasClass('fa-instagram') || socialIcon.hasClass('fa-facebook-f') || socialIcon.hasClass('fa-telegram-plane') || socialIcon.hasClass('fa-telegram') || socialIcon.hasClass('fa-vk') || socialIcon.hasClass('fa-envelope') || socialIcon.hasClass('fa-gift') || socialIcon.hasClass('fa-square-up-right') || socialIcon.hasClass('fa-gamepad-modern') || socialIcon.hasClass('fa-shield') && taskText.includes('one of our giveaways') || socialIcon.hasClass('fa-shield') && taskText.includes('Check out')) {} else {
              scripts_echoLog({}).warning(`${i18n('unKnownTaskType')}: ${taskText}`);
            }
          }
          logStatus.success();
          this.undoneTasks = this.uniqueTasks(this.undoneTasks);
          this.socialTasks = this.uniqueTasks(this.socialTasks);
          if (window.DEBUG) {
            console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          }
          GM_setValue(`gleamTasks-${this.giveawayId}`, {
            tasks: this.socialTasks,
            time: new Date().getTime()
          });
          return true;
        } catch (error) {
          throwError(error, 'Gleam.classifyTask');
          return false;
        }
      }
      async extraDoTask({
        gleam
      }) {
        try {
          const pro = [];
          for (const link of gleam) {
            pro.push(this.#doGleamTask(link));
          }
          return Promise.all(pro).then(() => true);
        } catch (error) {
          throwError(error, 'Gleam.extraDoTask');
          return false;
        }
      }
      async verifyTask() {
        try {
          scripts_echoLog({
            text: `${i18n('verifyingTask')}...`
          });
          const tasks = $('.entry-content .entry-method');
          unsafeWindow._OxA = '_OxA';
          for (const task of tasks) {
            if ($('[campaign-key="campaign.key"]').length > 0) {
              return scripts_echoLog({
                text: i18n('campaign')
              });
            }
            const $task = $(task);
            if ($task.find('i.fa-question').length === 0) {
              continue;
            }
            const taskInfo = $task.find('.user-links');
            taskInfo[0].click();
            unsafeWindow.$hookTimer?.setSpeed(1e3);
            await delay(3e3);
            unsafeWindow.$hookTimer?.setSpeed(1);
            await this.#checkSync();
            const continueBtn = $task.find('.expandable').find('span:contains(Continue),button:contains(Continue)');
            for (const button of continueBtn) {
              button.click();
              await delay(500);
              await this.#checkSync();
            }
          }
          scripts_echoLog({
            text: i18n('verifiedGleamTasks')
          });
        } catch (error) {
          throwError(error, 'Gleam.verifyTask');
          return false;
        }
      }
      async #checkSync() {
        try {
          return await new Promise(resolve => {
            const checker = setInterval(() => {
              if ($('.entry-content .entry-method i.fa-sync').length === 0) {
                clearInterval(checker);
                resolve(true);
              }
            }, 500);
          });
        } catch (error) {
          throwError(error, 'Gleam.checkSync');
          return false;
        }
      }
      async #doGleamTask(link) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('doingGleamTask')
          });
          return await new Promise(resolve => {
            GM_openInTab(`${link}?8b07d23f4bfa65f9`, {
              active: true,
              insert: true,
              setParent: true
            }).onclose = () => {
              logStatus.success();
              resolve(true);
            };
          });
        } catch (error) {
          throwError(error, 'Gleam.doGleamTask');
          return false;
        }
      }
      #getGiveawayId() {
        try {
          const giveawayId = window.location.pathname;
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({
            text: i18n('getFailed', 'GiveawayId')
          });
          return false;
        } catch (error) {
          throwError(error, 'Gleam.getGiveawayId');
          return false;
        }
      }
      async #getGleamLink(title) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('gettingGleamLink')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://www.vloot.io/api/v1/giveaways',
            method: 'GET',
            responseType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200 && data?.response?.Success === true && data?.response?.Data) {
              const {
                link
              } = data.response.Data.find(giveaway => title.replace(/[\s]/g, '').toLowerCase().includes(giveaway.title.replace(/[\s]/g, '').toLowerCase())) || {};
              if (link) {
                logStatus.success();
                return link;
              }
              logStatus.error(`Error:${i18n('getLinkFailed')}`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Gleam.getGleamLink');
          return false;
        }
      }
      async #checkLeftKey() {
        try {
          if (!globalOptions.other.checkLeftKey) {
            return true;
          }
          const campaignString = $('div.popup-blocks-container').attr('ng-init')?.match(/initCampaign\(([\w\W]+?)\)$/)?.[1];
          if (!campaignString) {
            return false;
          }
          const {
            campaign,
            incentive
          } = JSON.parse(campaignString);
          const controllerString = $('div.campaign.reward').attr('ng-init')?.match(/initContestant\(([\w\W]+?)\);/)?.[1];
          let ownedKey = false;
          if (controllerString) {
            if (JSON.parse(controllerString).contestant?.claims?.incentives?.[incentive.id]?.length) {
              ownedKey = true;
            }
          }
          if (campaign.banned || campaign.finished && !ownedKey || campaign.paused || new Date().getTime() < campaign.starts_at * 1e3) {
            await external_Swal_default().fire({
              icon: 'warning',
              title: i18n('notice'),
              text: i18n('giveawayNotWork'),
              confirmButtonText: i18n('confirm'),
              cancelButtonText: i18n('cancel'),
              showCancelButton: true
            }).then(({
              value
            }) => {
              if (value) {
                window.close();
              }
            });
          }
          return true;
        } catch (error) {
          throwError(error, 'Gleam.checkLeftKey');
          return false;
        }
      }
    }
    const website_Gleam = Gleam;
    const SweepWidget_defaultOptions = {
      username: '',
      email: ''
    };
    class SweepWidget extends website_Website {
      name = 'SweepWidget';
      options = {
        ...SweepWidget_defaultOptions,
        ...GM_getValue('SweepWidgetOptions')
      };
      buttons = [ 'doTask' ];
      static test() {
        return /^https?:\/\/sweepwidget\.com\/view\/[\d]+/.test(window.location.href);
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
        } catch (error) {
          throwError(error, 'SweepWidget.after');
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if (!this.#checkLogin()) {
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (!this.#getGiveawayId()) {
            return false;
          }
          this.initialized = true;
          logStatus.success();
          return true;
        } catch (error) {
          throwError(error, 'SweepWidget.init');
          return false;
        }
      }
      classifyTask() {
        return true;
      }
      async doTask() {
        try {
          if ($('#unlock_rewards_main_wrapper').length === 0) {
            if ($('input[name="sw__login_name"]:visible').length > 0) {
              $('input[name="sw__login_name"]').val(this.options.username);
            }
            if ($('input[name="sw__login_email"]:visible').length > 0) {
              $('input[name="sw__login_email"]').val(this.options.email);
            }
            if ($('#sw_login_button:visible').length > 0) {
              $('#sw_login_button')[0].click();
            }
            if (!await this.#checkEnter()) {
              return false;
            }
          }
          const logStatus = scripts_echoLog({
            text: i18n('SweepWidgetNotice')
          });
          const tasks = $('#sw_inner_entry_methods_l2_wrapper>div.sw_entry');
          for (const task of tasks) {
            const $task = $(task);
            if ($task.find('i.fa-check:visible').length > 0) {
              continue;
            }
            const title = $task.find('.sw_text_inner');
            title[0].click();
            const aElement = $task.find('a.sw_link');
            const link = aElement.attr('href');
            aElement.attr('href', '#a').attr('target', '_self');
            aElement[0]?.click();
            await delay(300);
            aElement.attr('href', link).attr('target', '_blank');
            $task.find('input[type="text"]').val('test');
            const verifyBtn = $task.find('input.sw_verify');
            if (verifyBtn.prop('disabled') === true) {
              title[0].click();
              await delay(300);
              title[0].click();
              await delay(300);
            }
            $task.find('input.sw_verify').removeAttr('disabled')[0]?.click();
            await this.#checkFinish($task);
            await delay(parseInt(`${Math.random() * (3e3 - 1e3 + 1) + 1e3}`, 10));
          }
          logStatus.success();
          return true;
        } catch (error) {
          throwError(error, 'SweepWidget.doTask');
          return false;
        }
      }
      #checkLogin() {
        try {
          if ($('#twitter_login_button').length > 0) {
            $('#twitter_login_button')[0].click();
          }
          return true;
        } catch (error) {
          throwError(error, 'SweepWidget.checkLogin');
          return false;
        }
      }
      #getGiveawayId() {
        try {
          const giveawayId = window.location.href.match(/\/view\/([\d]+)/)?.[1];
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({
            text: i18n('getFailed', 'GiveawayId')
          });
          return false;
        } catch (error) {
          throwError(error, 'SweepWidget.getGiveawayId');
          return false;
        }
      }
      async #checkEnter() {
        try {
          return new Promise(resolve => {
            const checker = setInterval(() => {
              if ($('#unlock_rewards_main_wrapper').length > 0) {
                clearInterval(checker);
                resolve(true);
              }
            });
          });
        } catch (error) {
          throwError(error, 'SweepWidget.checkEnter');
          return false;
        }
      }
      async #checkFinish($task) {
        try {
          return new Promise(resolve => {
            const checker = setInterval(() => {
              if ($task.find('i.fa-check:visible').length > 0 || $task.find('.sw_entry_input:visible').length === 0) {
                clearInterval(checker);
                resolve(true);
              }
            });
          });
        } catch (error) {
          throwError(error, 'SweepWidget.checkFinish');
          return false;
        }
      }
    }
    const website_SweepWidget = SweepWidget;
    const defaultWhiteList = {
      discord: {
        servers: []
      },
      instagram: {
        users: []
      },
      twitch: {
        channels: []
      },
      twitter: {
        users: [],
        retweets: [],
        likes: []
      },
      vk: {
        names: []
      },
      youtube: {
        channels: [],
        likes: []
      },
      reddit: {
        reddits: []
      },
      steam: {
        groups: [],
        officialGroups: [],
        wishlists: [],
        follows: [],
        forums: [],
        workshops: [],
        curators: [],
        workshopVotes: [],
        curatorLikes: [],
        announcements: [],
        licenses: [],
        playtests: []
      }
    };
    const link2id = async function(type) {
      try {
        const link = $('#socialLink').val();
        let id = '';
        switch (type) {
         case 'discord.servers':
          id = link.match(/invite\/(.+)/)?.[1] || '';
          break;

         case 'instagram.users':
          id = link.match(/https:\/\/www\.instagram\.com\/(.+)?\//)?.[1] || '';
          break;

         case 'twitch.channels':
          id = link.match(/https:\/\/(www\.)?twitch\.tv\/(.+)/)?.[2] || '';
          break;

         case 'twitter.users':
          id = link.match(/https:\/\/twitter\.com\/(.+)/)?.[1] || '';
          break;

         case 'twitter.retweets':
          id = link.match(/https:\/\/twitter\.com\/.*?\/status\/([\d]+)/)?.[1] || '';
          break;

         case 'vk.names':
          id = link.match(/https:\/\/vk\.com\/([^/]+)/)?.[1] || '';
          break;

         case 'youtube.channels':
          id = (await getInfo(link, 'channel'))?.params?.channelId || '';
          break;

         case 'youtube.likes':
          id = (await getInfo(link, 'likeVideo'))?.params?.videoId || '';
          break;

         case 'reddit.reddits':
          id = link.match(/https?:\/\/www\.reddit\.com\/user\/([^/]*)/)?.[1] || link.match(/https?:\/\/www\.reddit\.com\/r\/([^/]*)/)?.[1] || '';
          break;

         case 'steam.groups':
          id = link.match(/groups\/(.+)\/?/)?.[1] || '';
          break;

         case 'steam.wishlists':
         case 'steam.follows':
         case 'steam.forums':
          id = link.match(/app\/([\d]+)/)?.[1] || '';
          break;

         case 'steam.workshops':
          id = link.match(/\?id=([\d]+)/)?.[1] || '';
          break;

         case 'steam.curators':
          {
            if (link.includes('curator')) {
              id = link.match(/curator\/([\d]+)/)?.[1] || '';
            } else {
              const param = link.match(/https?:\/\/store\.steampowered\.com\/(.*?)\/([^/?]+)/)?.slice(1, 3);
              if (!param || param.length !== 2) {
                break;
              }
              const steam = new social_Steam();
              if (await steam.init()) {
                id = await steam.getCuratorId(param[0], param[1]) || '';
              }
            }
          }
          break;
        }
        return id;
      } catch (error) {
        throwError(error, 'link2id');
        return i18n('getFailed', 'id');
      }
    };
    const disabledType = {
      steam: [ 'workshopVotes', 'curatorLikes', 'announcements' ],
      twitter: [ 'likes' ]
    };
    const assignWhiteList = whiteList => {
      try {
        const newWhiteList = {};
        for (const [ key, value ] of Object.entries(defaultWhiteList)) {
          newWhiteList[key] = {
            ...value,
            ...whiteList[key]
          };
        }
        return newWhiteList;
      } catch (error) {
        throwError(error, 'assignWhiteList');
        return defaultWhiteList;
      }
    };
    const whiteListOptions = function(showType) {
      try {
        const whiteList = assignWhiteList(GM_getValue('whiteList') || {});
        let whiteListOptionsForm = `<form id="whiteListForm" class="auto-task-form">
  <table class="auto-task-table"><thead><tr><td>${i18n('website')}</td><td>${i18n('type')}</td><td>${i18n('edit')}</td></tr></thead><tbody>`;
        for (const [ social, types ] of Object.entries(whiteList)) {
          whiteListOptionsForm += Object.keys(types).map((type, index) => disabledType[social]?.includes(type) ? '' : `<tr style="background-color: ${stringToColour(social)}66">${index === 0 ? `<th rowspan="${Object.keys(types).length - (disabledType[social] || []).length}" style="background-color: ${stringToColour(social)}66">${social}</th>` : ''}<td>${i18n(type)}</td><td><button type="button" class="editWhiteList" data-value="${social}.${type}">${i18n('edit')}</button></td></tr>`).join('');
        }
        whiteListOptionsForm += '</tbody></table></form>';
        if (showType === 'swal') {
          external_Swal_default().fire({
            title: i18n('whiteListOptions'),
            html: whiteListOptionsForm,
            showConfirmButton: false,
            showCloseButton: true
          });
        } else {
          $('body').append(`<h2>${i18n('whiteList')}</h2>${whiteListOptionsForm}`);
        }
        $('.editWhiteList').on('click', function() {
          const value = $(this).attr('data-value');
          if (!value) {
            return;
          }
          const [ social, type ] = value.split('.');
          if (!whiteList?.[social]?.[type]) {
            scripts_echoLog({}).warning(i18n('whiteListNotFound', value));
            return;
          }
          external_Swal_default().fire({
            title: i18n('changeWhiteListOption', value),
            input: 'textarea',
            html: `<input id="socialLink" class="swal2-input" placeholder="在此处输入链接获取id">
        <button id="link2id" data-type="${value}" class="swal2-confirm swal2-styled">获取id</button>
        <p style="margin-bottom:0 !important;">在下方填写白名单，每行一个</p>`,
            inputValue: whiteList[social][type].join('\n'),
            showConfirmButton: true,
            confirmButtonText: i18n('save'),
            showCancelButton: true,
            cancelButtonText: i18n('close'),
            showDenyButton: true,
            denyButtonText: i18n('return')
          }).then(({
            isDenied,
            isConfirmed,
            value
          }) => {
            if (isDenied) {
              if (showType === 'swal') {
                whiteListOptions(showType);
              }
              return;
            } else if (isConfirmed) {
              whiteList[social][type] = value.split('\n');
              GM_setValue('whiteList', whiteList);
              external_Swal_default().fire({
                title: i18n('changeWhiteListSuccess'),
                icon: 'success'
              });
            }
          });
          $('#link2id').on('click', async function() {
            const type = $(this).attr('data-type');
            $('#socialLink').val(await link2id(type));
          });
        });
      } catch (error) {
        throwError(error, 'whiteListOptions');
      }
    };
    const whiteList = whiteListOptions;
    const setGistData = async (token, gistId, fileName, content) => {
      try {
        const logStatus = scripts_echoLog({
          text: i18n('settingData')
        });
        const contentData = JSON.stringify({
          files: {
            [fileName]: {
              content: JSON.stringify(content)
            }
          }
        });
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: `https://api.github.com/gists/${gistId}`,
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${token}`
          },
          data: contentData,
          responseType: 'json',
          method: 'POST',
          timeout: 3e4
        });
        if (result === 'Success') {
          if (data?.status === 200 && data.response.files?.[fileName]?.content === JSON.stringify(content)) {
            logStatus.success();
            return true;
          }
          logStatus.error(`Error:${data?.statusText}(${data?.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      } catch (error) {
        throwError(error, 'setGistData');
        return false;
      }
    };
    const getGistData = async (token, gistId, fileName, test = false) => {
      try {
        const logStatus = scripts_echoLog({
          text: i18n('gettingData')
        });
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: `https://api.github.com/gists/${gistId}`,
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${token}`
          },
          responseType: 'json',
          method: 'GET',
          timeout: 3e4
        });
        if (result === 'Success') {
          if (data?.status === 200) {
            const content = data.response?.files?.[fileName]?.content;
            let formatedContent;
            if (!content) {
              logStatus.error(`Error:${i18n('noRemoteData')}`);
              return false;
            }
            if (test) {
              logStatus.success();
              return true;
            }
            try {
              formatedContent = JSON.parse(content);
            } catch (error) {
              logStatus.error(`Error:${i18n('errorRemoteDataFormat')}`);
              return false;
            }
            logStatus.success();
            return formatedContent;
          }
          logStatus.error(`Error:${data?.statusText}(${data?.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      } catch (error) {
        throwError(error, 'getGistData');
        return false;
      }
    };
    const syncOptions = () => {
      try {
        const {
          TOKEN,
          GIST_ID,
          FILE_NAME,
          SYNC_HISTORY
        } = GM_getValue('gistOptions') || {
          TOKEN: '',
          GIST_ID: '',
          FILE_NAME: '',
          SYNC_HISTORY: true
        };
        external_Swal_default().fire({
          title: i18n('gistOptions'),
          html: `<p>Github Token<input id="github-token" class="swal2-input" placeholder="Github Token" value="${TOKEN}"></p>` + `<p>Gist ID<input id="gist-id" class="swal2-input" placeholder="Gist ID" value="${GIST_ID}"></p>` + `<p>${i18n('fileName')}<input id="file-name" class="swal2-input" placeholder="${i18n('fileName')}" value="${FILE_NAME}"></p>` + '<p><label for="sync-history" class="swal2-checkbox-custom" style="display: flex;">' + `<input id="sync-history" type="checkbox"${SYNC_HISTORY ? ' checked="checked"' : ''}/>` + `<span class="swal2-label">${i18n('syncHistory')}</span></label></p>` + `<p><button id="upload-data" type="button" class="swal2-confirm swal2-styled" style="display: inline-block;">
      ${i18n('upload2gist')}</button>` + `<button id="download-data" type="button" class="swal2-confirm swal2-styled" style="display: inline-block;">
      ${i18n('downloadFromGist')}</button></p>`,
          focusConfirm: false,
          showLoaderOnConfirm: true,
          footer: `<a href="https://auto-task-doc.js.org/guide/#%E6%95%B0%E6%8D%AE%E5%90%8C%E6%AD%A5" target="_blank">${i18n('help')}</a>`,
          preConfirm: async () => {
            const token = $('#github-token').val();
            const gistId = $('#gist-id').val();
            const fileName = $('#file-name').val();
            const syncHistory = $('#sync-history').prop('checked');
            GM_setValue('gistOptions', {
              TOKEN: token,
              GIST_ID: gistId,
              FILE_NAME: fileName,
              SYNC_HISTORY: syncHistory
            });
            return await getGistData(token, gistId, fileName, true);
          },
          allowOutsideClick: () => !external_Swal_default().isLoading(),
          confirmButtonText: i18n('saveAndTest'),
          showCancelButton: true,
          cancelButtonText: i18n('close')
        }).then(({
          value
        }) => {
          if (value) {
            external_Swal_default().fire({
              icon: 'success',
              title: i18n('testSuccess')
            }).then(syncOptions);
          } else if (value !== undefined) {
            external_Swal_default().fire({
              icon: 'error',
              title: i18n('testFailed')
            }).then(syncOptions);
          }
        });
        $('#upload-data').on('click', async () => {
          const {
            TOKEN,
            GIST_ID,
            FILE_NAME
          } = GM_getValue('gistOptions') || {};
          if (!(TOKEN && GIST_ID && FILE_NAME)) {
            return external_Swal_default().fire({
              icon: 'error',
              title: i18n('saveAndTestNotice')
            }).then(syncOptions);
          }
          external_Swal_default().fire({
            icon: 'info',
            title: i18n('processingData')
          });
          const data = {};
          const names = GM_listValues();
          const SYNC_HISTORY = $('#sync-history').prop('checked');
          for (const name of names) {
            if (name === 'gistOptions' || /^[\w]+?Auth$/.test(name)) {
              continue;
            }
            if (!SYNC_HISTORY && /^[\w]+?Tasks-/.test(name)) {
              continue;
            }
            data[name] = GM_getValue(name);
          }
          external_Swal_default().update({
            icon: 'info',
            title: i18n('updatingData')
          });
          if (await setGistData(TOKEN, GIST_ID, FILE_NAME, data)) {
            external_Swal_default().fire({
              icon: 'success',
              title: i18n('syncDataSuccess')
            });
          } else {
            external_Swal_default().fire({
              icon: 'error',
              title: i18n('syncDataFailed')
            });
          }
        });
        $('#download-data').on('click', async () => {
          const {
            TOKEN,
            GIST_ID,
            FILE_NAME
          } = GM_getValue('gistOptions') || {};
          if (!(TOKEN && GIST_ID && FILE_NAME)) {
            return external_Swal_default().fire({
              icon: 'error',
              title: i18n('saveAndTestNotice')
            }).then(syncOptions);
          }
          external_Swal_default().fire({
            icon: 'info',
            title: i18n('downloadingData')
          });
          const data = await getGistData(TOKEN, GIST_ID, FILE_NAME);
          if (!data) {
            return external_Swal_default().fire({
              icon: 'error',
              title: i18n('checkedNoData')
            }).then(syncOptions);
          }
          external_Swal_default().update({
            icon: 'info',
            title: i18n('savingData')
          });
          const SYNC_HISTORY = $('#sync-history').prop('checked');
          for (const [ name, value ] of Object.entries(data)) {
            if (!SYNC_HISTORY && /^[\w]+?Tasks-/.test(name)) {
              continue;
            }
            GM_setValue(name, value);
          }
          external_Swal_default().fire({
            icon: 'success',
            title: i18n('syncDataSuccess')
          });
        });
      } catch (error) {
        throwError(error, 'syncOptions');
      }
    };
    const dataSync = syncOptions;
    class Setting {
      name = 'Setting';
      buttons = [ 'saveGlobalOptions', 'syncData', 'tasksHistory' ];
      syncData = dataSync;
      tasksHistory() {
        window.open('https://auto-task-v4.hclonely.com/history.html', '_blank');
      }
      static test() {
        return window.location.host === 'auto-task-v4.hclonely.com' && window.location.pathname === '/setting.html';
      }
      before() {
        $('body').html('').addClass('auto-task-options');
      }
      after() {
        try {
          this.#environment();
          changeGlobalOptions('page');
          whiteList('page');
          $('input[name="other.twitterVerifyId"]').after(`<button id="getTwitterUserId" type="button">${i18n('getTwitterUserId')}</button>`);
          $('#getTwitterUserId').on('click', () => {
            this.#getId('twitterUser');
          });
          $('input[name="other.youtubeVerifyChannel"]').after(`<button id="getYoutubeChannelId" type="button">${i18n('getYoutubeChannelId')}</button>`);
          $('#getYoutubeChannelId').on('click', () => {
            this.#getId('youtubeChannel');
          });
          $('input[name^="position"]').on('input', function() {
            const type = $(this).attr('name').replace('position.', '');
            const xLabel = 'rightleft';
            const yLabel = 'topbottpm';
            switch (type) {
             case 'buttonSideX':
             case 'buttonSideY':
             case 'buttonDistance':
              {
                const distance = $('input[name="position.buttonDistance"]').val();
                const sideX = $('input[name="position.buttonSideX"]').val();
                const sideY = $('input[name="position.buttonSideY"]').val();
                if (![ 'right', 'left' ].includes(sideX)) {
                  break;
                }
                if (![ 'top', 'bottom' ].includes(sideY)) {
                  break;
                }
                if (!/^[\d]+?,[\d]+$/.test(distance)) {
                  break;
                }
                const distanceArr = distance.split(',');
                $('#auto-task-buttons').css(sideX, `${distanceArr[0]}px`).css(sideY, `${distanceArr[1]}px`).css(xLabel.replace(sideX, ''), '').css(yLabel.replace(sideY, ''), '');
                break;
              }

             case 'showButtonSideX':
             case 'showButtonSideY':
             case 'showButtonDistance':
              {
                const distance = $('input[name="position.showButtonDistance"]').val();
                const sideX = $('input[name="position.showButtonSideX"]').val();
                const sideY = $('input[name="position.showButtonSideY"]').val();
                if (![ 'right', 'left' ].includes(sideX)) {
                  break;
                }
                if (![ 'top', 'bottom' ].includes(sideY)) {
                  break;
                }
                if (!/^[\d]+?,[\d]+$/.test(distance)) {
                  break;
                }
                const distanceArr = distance.split(',');
                $('div.show-button-div').css(sideX, `${distanceArr[0]}px`).css(sideY, `${distanceArr[1]}px`).css(xLabel.replace(sideX, ''), '').css(yLabel.replace(sideY, ''), '');
                break;
              }

             case 'logSideX':
             case 'logSideY':
             case 'logDistance':
              {
                const distance = $('input[name="position.logDistance"]').val();
                const sideX = $('input[name="position.logSideX"]').val();
                const sideY = $('input[name="position.logSideY"]').val();
                if (![ 'right', 'left' ].includes(sideX)) {
                  break;
                }
                if (![ 'top', 'bottom' ].includes(sideY)) {
                  break;
                }
                if (!/^[\d]+?,[\d]+$/.test(distance)) {
                  break;
                }
                const distanceArr = distance.split(',');
                $('#auto-task-info').css(sideX, `${distanceArr[0]}px`).css(sideY, `${distanceArr[1]}px`).css(xLabel.replace(sideX, ''), '').css(yLabel.replace(sideY, ''), '');
                break;
              }

             default:
              break;
            }
          });
          $('input[name^="hotKey"]').attr('readonly', 'readonly').off('keydown').on('keydown', function(event) {
            let functionKey = '';
            if (event.altKey) {
              functionKey += 'alt + ';
            } else if (event.ctrlKey) {
              functionKey += 'ctrl + ';
            } else if (event.shiftKey) {
              functionKey += 'shift + ';
            }
            $(this).val(functionKey + (event.key.length === 1 ? event.key.toLowerCase() : ''));
          });
        } catch (error) {
          throwError(error, 'Setting.after');
        }
      }
      saveGlobalOptions() {
        saveData();
      }
      #getId(social) {
        try {
          external_Swal_default().fire({
            title: i18n('getId', i18n(social)),
            html: `<input id="socialLink" class="swal2-input" placeholder="在此处输入链接获取id">
        <button id="link2id" data-type="${social}" class="swal2-confirm swal2-styled">获取id</button>`,
            showCancelButton: true,
            cancelButtonText: i18n('close'),
            showConfirmButton: false
          });
          $('#link2id').on('click', async function() {
            const link = $('#socialLink').val();
            if (!link) {
              return;
            }
            const type = $(this).attr('data-type');
            if (type === 'twitterUser') {
              const name = link.match(/https:\/\/twitter\.com\/(.+)/)?.[1] || link;
              $('#socialLink').val(await new social_Twitter().userName2id(name) || '');
            } else if (type === 'youtubeChannel') {
              const name = /^https:\/\/(www\.)?google\.com.*?\/url\?.*?url=https:\/\/www.youtube.com\/.*/.test(link) ? link.match(/url=(https:\/\/www\.youtube\.com\/.*)/)?.[1] : link;
              $('#socialLink').val((await getInfo(name, 'channel'))?.params?.channelId || '');
            }
          });
        } catch (error) {
          throwError(error, 'Setting.getId');
        }
      }
      #environment() {
        try {
          const userAgent = (0, javascript_utils_umd_min.ua)();
          const environmentForm = `<form id="environmentForm" class="auto-task-form">
        <table class="auto-task-table"><thead><tr><td>${i18n('type')}</td><td>${i18n('name')}</td><td>${i18n('version')}</td></tr></thead><tbody>
        <tr><td>${i18n('os')}</td><td>${userAgent.os}</td><td>${userAgent.osVersion}</td></tr>
        <tr><td>${i18n('browser')}</td><td>${userAgent.browserZH}</td><td>${userAgent.browserVersion}</td></tr>
        <tr><td>${i18n('scriptManager')}</td><td>${GM_info.scriptHandler}</td><td>${GM_info.version}</td></tr>
        <tr><td>${i18n('script')}</td><td>${GM_info.script.name}</td><td>${GM_info.script.version}</td></tr>
        </tbody></table></form>`;
          $('body').append(`<h2>${i18n('environment')}</h2>${environmentForm}`);
        } catch (error) {
          throwError(error, 'Setting.environment');
        }
      }
    }
    const website_Setting = Setting;
    class History extends website_Keylol {
      name = 'History';
      buttons = [ 'doTask', 'undoTask', 'selectAll', 'selectNone', 'invertSelect', 'clearHistory' ];
      static test() {
        return window.location.host === 'auto-task-v4.hclonely.com' && window.location.pathname === '/history.html';
      }
      before() {
        try {
          $('body').html('<div class="container"></div>').addClass('auto-task-history');
          const data = GM_listValues() || [];
          const tasksHistory = data.map(value => /^[\w]+?Tasks-/.test(value) ? value : null).filter(value => value);
          for (const item of tasksHistory) {
            this.#addItem(item);
          }
        } catch (error) {
          throwError(error, 'History.before');
        }
      }
      clearHistory() {
        try {
          const data = GM_listValues() || [];
          const tasksHistory = data.map(value => /^[\w]+?Tasks-/.test(value) ? value : null).filter(value => value);
          for (const item of tasksHistory) {
            GM_deleteValue(item);
          }
          external_Swal_default().fire({
            title: i18n('clearHistoryFinished'),
            icon: 'success'
          });
        } catch (error) {
          throwError(error, 'History.after');
        }
      }
      #addItem(item) {
        try {
          const tasksData = GM_getValue(item);
          if (!tasksData?.tasks) {
            return;
          }
          let html = '';
          let title = '';
          let link = '';
          const [ website, id ] = item.split('-');
          switch (website) {
           case 'fawTasks':
            title = `Freeanywhere[${id}]`;
            link = `https://freeanywhere.net/#/giveaway/${id}`;
            break;

           case 'gasTasks':
            title = `Giveawaysu[${id}]`;
            link = `https://giveaway.su/giveaway/view/${id}`;
            break;

           case 'gcTasks':
            title = `GiveeClub[${id}]`;
            link = `https://givee.club/event/${id}`;
            break;

           case 'gkTasks':
            title = `Givekey[${id}]`;
            link = `https://givekey.ru/giveaway/${id}`;
            break;

           case 'gleamTasks':
            title = `Gleam[${id}]`;
            link = `https://gleam.io${id}`;
            break;

           case 'khTasks':
            title = `keyhub[${id}]`;
            link = `https://key-hub.eu/giveaway/${id}`;
            break;

           case 'prysTasks':
            title = `Prys[${id}]`;
            link = `https://prys.revadike.com/giveaway/?id=${id}`;
            break;

           default:
            return;
          }
          for (const [ social, types ] of Object.entries(tasksData.tasks)) {
            for (const [ type, tasks ] of Object.entries(types)) {
              for (const task of tasks) {
                html += `<li><font class="auto-task-capitalize">${social}.${i18n(type.replace('Link', ''))}: </font><a href="${task}" target="_blank">${task.length > 55 ? `${task.slice(0, 55)}...` : task}</a></li>`;
              }
            }
          }
          $('.container').append(`<div class="card" data-name="${item}"><div class="title"><a href="${link}" target="_blank">${title}</a><span class="delete-task" data-name="${item}" title="${i18n('deleteTask')}"><svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2734" width="32" height="32"><path d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z" p-id="2735" fill="#d81e06"></path><path d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z" p-id="2736" fill="#d81e06"></path><path d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z" p-id="2737" fill="#d81e06"></path><path d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z" p-id="2738" fill="#d81e06"></path></svg></span></div><ul>${html}</ul><span class="time">${i18n('lastChangeTime')}: ${external_dayjs_namespaceObject(tasksData.time).format('YYYY-MM-DD HH:mm:ss')}</span></div>`);
          $('span.delete-task').on('click', function() {
            const itemName = $(this).attr('data-name');
            if (itemName) {
              GM_deleteValue(itemName);
              $(`div.card[data-name="${itemName}"]`).remove();
              external_Swal_default().fire({
                title: i18n('clearTaskFinished'),
                text: itemName,
                icon: 'success'
              });
            } else {
              external_Swal_default().fire({
                title: i18n('clearTaskFailed'),
                icon: 'error'
              });
            }
          });
        } catch (error) {
          throwError(error, 'History.addItem');
        }
      }
    }
    const website_History = History;
    const Websites = [ Freeanywhere, GiveawaySu, website_Indiedb, website_Keyhub, website_Givekey, website_GiveeClub, website_OpiumPulses, website_Keylol, website_Opquests, website_Gleam, website_SweepWidget, website_Setting, website_History ];
    const websiteOptions = function(website, options) {
      try {
        let websiteOptionsForm = `<form id="websiteOptionsForm" class="auto-task-form">
  <table class="auto-task-table"><thead><tr><td>${i18n('option')}</td><td>${i18n('value')}</td></tr></thead><tbody>`;
        for (const [ option, value ] of Object.entries(options)) {
          websiteOptionsForm += `<tr><td>${option}</td><td><input class="editOption" type="text" name="${option}" value="${value}"/></td></tr>`;
        }
        websiteOptionsForm += '</tbody></table></form>';
        external_Swal_default().fire({
          title: i18n('websiteOptions'),
          html: websiteOptionsForm,
          showConfirmButton: true,
          confirmButtonText: i18n('save'),
          showCancelButton: true,
          cancelButtonText: i18n('close')
        }).then(({
          isConfirmed
        }) => {
          if (isConfirmed) {
            $('#websiteOptionsForm').serializeArray().map(value => {
              options[value.name] = value.value;
              return value;
            });
            GM_setValue(`${website}Options`, options);
            external_Swal_default().fire({
              title: i18n('changeWebsiteOptionsSuccess'),
              icon: 'success'
            });
          }
        });
      } catch (error) {
        throwError(error, 'websiteOptions');
      }
    };
    const options = websiteOptions;
    const external_keyboardJS_namespaceObject = keyboardJS;
    var external_keyboardJS_default = __webpack_require__.n(external_keyboardJS_namespaceObject);
    const checkUpdate = async (updateLink, auto) => {
      try {
        const checkUrl = `${updateLink}package.json?time=${new Date().getTime()}`;
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: checkUrl,
          responseType: 'json',
          method: 'GET',
          timeout: 3e4
        });
        if (result === 'Success') {
          if (data?.response?.version) {
            return data.response;
          }
          if (!auto) {
            scripts_echoLog({}).error(`${i18n('checkUpdateFailed')}[${data?.statusText}(${data?.status})]`);
          }
          return false;
        }
        if (!auto) {
          scripts_echoLog({}).error(`${i18n('checkUpdateFailed')}[${result}:${statusText}(${status})]`);
        }
        return false;
      } catch (error) {
        throwError(error, 'checkUpdate');
        return false;
      }
    };
    const hasNewVersion = (currentVersion, remoteVersion) => {
      try {
        const [ currentRealVersion ] = currentVersion.split('-');
        const [ remoteRealVersion, isPreview ] = remoteVersion.split('-');
        if (isPreview && !globalOptions.other.receivePreview) {
          return false;
        }
        const [ currentVersion1, currentVersion2, currentVersion3 ] = currentRealVersion.split('.').map(value => parseInt(value, 10));
        const [ remoteVersion1, remoteVersion2, remoteVersion3 ] = remoteRealVersion.split('.').map(value => parseInt(value, 10));
        if (remoteVersion1 > currentVersion1) {
          return true;
        }
        if (remoteVersion1 < currentVersion1) {
          return false;
        }
        if (remoteVersion2 > currentVersion2) {
          return true;
        }
        if (remoteVersion2 < currentVersion2) {
          return false;
        }
        if (remoteVersion3 > currentVersion3) {
          return true;
        }
        return false;
      } catch (error) {
        throwError(error, 'compareVersion');
        return false;
      }
    };
    const updateChecker = async () => {
      try {
        const currentVersion = GM_info.script.version;
        const updateSource = globalOptions.other.autoUpdateSource.toLowerCase();
        const updateLinks = {
          github: 'https://github.com/HCLonely/auto-task-new/raw/main/',
          jsdelivr: 'https://cdn.jsdelivr.net/gh/HCLonely/auto-task-v4@main/',
          standby: 'https://auto-task-v4.hclonely.com/'
        };
        let version;
        let updateLink = '';
        let packageData;
        if ([ 'github', 'jsdelivr', 'standby' ].includes(updateSource)) {
          updateLink = updateLinks[updateSource];
          packageData = await checkUpdate(updateLink, false);
        } else {
          updateLink = updateLinks.github;
          packageData = await checkUpdate(updateLink, true);
          if (!packageData) {
            updateLink = updateLinks.jsdelivr;
            packageData = await checkUpdate(updateLink, true);
            if (!packageData) {
              updateLink = updateLinks.standby;
              packageData = await checkUpdate(updateLink, true);
            }
          }
        }
        if (packageData) {
          version = packageData.version || currentVersion;
        } else {
          version = currentVersion;
          scripts_echoLog({}).error(i18n('checkUpdateFailed'));
        }
        if (packageData && hasNewVersion(currentVersion, version)) {
          scripts_echoLog({
            html: `<li><font>${i18n('newVersionNotice', version, `${updateLink}dist/${GM_info.script.name}.user.js`)}</font></li>`
          });
          scripts_echoLog({
            html: `<li>${i18n('updateText', version)}</li><ol class="update-text">${packageData.change?.map(change => `<li>${change}</li>`).join('')}<li>${i18n('updateHistory')}</li></ol>`
          });
        }
      } catch (error) {
        throwError(error, 'updateChecker');
      }
    };
    const scripts_updateChecker = updateChecker;
    window.STYLE = GM_addStyle(auto_task.Z + `.swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4!important;grid-row:1/4!important;grid-template-columns:1fr 99fr 1fr;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end";grid-template-rows:minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto);grid-template-rows:minmax(min-content,auto) minmax(min-content,auto) minmax(min-content,auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-bottom-start,.swal2-container.swal2-center-start,.swal2-container.swal2-top-start{grid-template-columns:minmax(0,1fr) auto auto}.swal2-container.swal2-bottom,.swal2-container.swal2-center,.swal2-container.swal2-top{grid-template-columns:auto minmax(0,1fr) auto}.swal2-container.swal2-bottom-end,.swal2-container.swal2-center-end,.swal2-container.swal2-top-end{grid-template-columns:auto auto minmax(0,1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-left>.swal2-popup,.swal2-container.swal2-center-start>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-left>.swal2-popup,.swal2-container.swal2-bottom-start>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-fullscreen>.swal2-popup,.swal2-container.swal2-grow-row>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none!important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0,100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px transparent;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:0}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto!important;height:.25em;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em 2em 3px}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px transparent;color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 3px;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:.25em solid transparent;border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .5s;animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .8s;animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-question-mark .8s;animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@-webkit-keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@-webkit-keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{background-color:transparent!important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:transparent;pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}`);
    window.DEBUG = !!globalOptions.other.debug;
    window.TRACE = !!globalOptions.other.debug && typeof console.trace === 'function';
    const loadScript = async () => {
      if (window.location.hostname === 'www.twitch.tv' && window.location.hash === '#auth') {
        const authToken = external_Cookies_namespaceObject.get('auth-token');
        const isLogin = !!external_Cookies_namespaceObject.get('login');
        if (isLogin) {
          GM_setValue('twitchAuth', {
            authToken: authToken,
            clientVersion: __twilightBuildID,
            clientId: commonOptions?.headers?.['Client-ID'],
            deviceId: commonOptions?.headers?.['Device-ID'],
            clientSessionId: window.localStorage.local_storage_app_session_id.replace(/"/g, '')
          });
          window.close();
          external_Swal_default().fire('', i18n('closePageNotice'));
        } else {
          external_Swal_default().fire('', i18n('needLogin'));
        }
        return;
      }
      if (window.location.hostname === 'www.reddit.com' && (window.location.hash === '#auth' || GM_getValue('redditAuth') === '#auth')) {
        const betaButton = $('#redesign-beta-optin-btn');
        if (betaButton.length > 0) {
          GM_setValue('redditAuth', '#auth');
          return betaButton[0].click();
        }
        GM_setValue('redditAuth', null);
        window.close();
        external_Swal_default().fire('', i18n('closePageNotice'));
        return;
      }
      let website;
      for (const Website of Websites) {
        if (Website.test()) {
          website = new Website();
          break;
        }
      }
      if (!website) {
        console.log('%c%s', 'color:#ff0000', 'Auto-Task[Warning]: 脚本停止加载，当前网站不支持！');
        return;
      }
      if (website?.before) {
        await website?.before();
      }
      $('body').append(`<div id="auto-task-info" style="display:${globalOptions.other.defaultShowLog ? 'block' : 'none'};${globalOptions.position.logSideX}:${globalOptions.position.logDistance.split(',')[0]}px;${globalOptions.position.logSideY}:${globalOptions.position.logDistance.split(',')[1]}px;"></div><div id="auto-task-buttons" style="display:${globalOptions.other.defaultShowButton ? 'block' : 'none'};${globalOptions.position.buttonSideX}:${globalOptions.position.buttonDistance.split(',')[0]}px;${globalOptions.position.buttonSideY}:${globalOptions.position.buttonDistance.split(',')[1]}px;"></div><div class="show-button-div" style="display:${globalOptions.other.defaultShowButton ? 'none' : 'block'};${globalOptions.position.showButtonSideX}:${globalOptions.position.showButtonDistance.split(',')[0]}px;${globalOptions.position.showButtonSideY}:${globalOptions.position.showButtonDistance.split(',')[1]}px;"><a class="auto-task-website-btn" href="javascript:void(0);" target="_self" title="${i18n('showButton')}"> </a></div>`);
      $('div.show-button-div').on('click', () => {
        $('#auto-task-buttons').show();
        $('div.show-button-div').hide();
      });
      const toggleLog = () => {
        const $this = $('#toggle-log');
        const status = $this.attr('data-status');
        if (status === 'show') {
          $('#auto-task-info').hide();
          $this.attr('data-status', 'hide').text(i18n('showLog'));
        } else {
          $('#auto-task-info').show();
          $this.attr('data-status', 'show').text(i18n('hideLog'));
        }
      };
      external_keyboardJS_default().bind(globalOptions.hotKey.doTaskKey, () => {
        if (website.doTask) {
          website.doTask();
        }
      });
      external_keyboardJS_default().bind(globalOptions.hotKey.undoTaskKey, () => {
        if (website.undoTask) {
          website.doTask();
        }
      });
      external_keyboardJS_default().bind(globalOptions.hotKey.toggleLogKey, toggleLog);
      if (website?.after) {
        await website?.after();
      }
      if (website?.buttons && $('#auto-task-buttons').children().length === 0) {
        $('#auto-task-buttons').addClass(`${website.name}-buttons`);
        for (const button of website.buttons) {
          if (website[button]) {
            const btnElement = $(`<p><a class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self">${i18n(button)}</a></p>`);
            btnElement.find('a.auto-task-website-btn').on('click', () => {
              website[button]();
            });
            $('#auto-task-buttons').append(btnElement);
          }
        }
      }
      const hideButtonElement = $(`<p><a class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self">
    ${i18n('hideButton')}</a></p>`);
      hideButtonElement.find('a.auto-task-website-btn').on('click', () => {
        $('#auto-task-buttons').hide();
        $('div.show-button-div').show();
      });
      const toggleLogElement = $(`<p><a id="toggle-log" class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self" data-status="${globalOptions.other.defaultShowLog ? 'show' : 'hide'}">
      ${globalOptions.other.defaultShowLog ? i18n('hideLog') : i18n('showLog')}</a></p>`);
      toggleLogElement.find('a.auto-task-website-btn').on('click', toggleLog);
      $('#auto-task-buttons').append(hideButtonElement).append(toggleLogElement);
      if (website?.options) {
        GM_registerMenuCommand(i18n('changeWebsiteOptions'), () => {
          options(website.name, website.options);
        });
      }
      if (website.name !== 'Setting') {
        GM_registerMenuCommand(i18n('changeGlobalOptions'), () => {
          changeGlobalOptions('swal');
        });
        GM_registerMenuCommand(i18n('settingPage'), () => {
          window.open('https://auto-task-v4.hclonely.com/setting.html', '_blank');
        });
      }
      console.log('%c%s', 'color:#1bbe1a', 'Auto-Task[Load]: 脚本加载完成');
      const [ v1, v2 ] = GM_info.version.split('.');
      if (!(parseInt(v1, 10) >= 5 && parseInt(v2, 10) >= 2)) {
        scripts_echoLog({}).error(i18n('versionNotMatched'));
      }
      if (!GM_getValue('notice')) {
        external_Swal_default().fire({
          title: i18n('swalNotice'),
          icon: 'warning'
        }).then(() => {
          window.open(i18n('noticeLink'), '_blank');
          GM_setValue('notice', new Date().getTime());
        });
        scripts_echoLog({
          html: `<li><font class="warning">${i18n('echoNotice', i18n('noticeLink'))}</font></li>`
        }).font?.find('a').on('click', () => {
          GM_setValue('notice', new Date().getTime());
        });
      }
      scripts_updateChecker();
    };
    if (window.location.hostname === 'discord.com') {
      const LocalStorage = window.localStorage;
      if (window.location.hash === '#auth') {
        window.localStorage.removeItem = () => true;
        const discordAuth = LocalStorage?.getItem('token')?.replace(/^"|"$/g, '');
        if (discordAuth && discordAuth.length > 0) {
          GM_setValue('discordAuth', {
            auth: discordAuth
          });
          window.close();
          external_Swal_default().fire('', i18n('closePageNotice'));
        } else {
          external_Swal_default().fire({
            text: i18n('getDiscordAuthFailed'),
            icon: 'error'
          });
        }
      } else {
        const discordAuth = LocalStorage?.getItem('token')?.replace(/^"|"$/g, '');
        if (discordAuth && discordAuth.length > 0) {
          GM_setValue('discordAuth', {
            auth: discordAuth
          });
        }
      }
    } else if (window.location.hostname === 'opquests.com') {
      loadScript();
    } else if (window.opener && window.location.host === 'store.steampowered.com' && window.location.pathname === '/') {
      $(() => {
        if ($('[data-miniprofile]').length === 0) {
          return;
        }
        window.onbeforeunload = function(event) {
          GM_setValue('steamStoreAuth', null);
          return null;
        };
        const storeSessionID = document.body.innerHTML.match(/g_sessionID = "(.+?)";/)?.[1];
        if (storeSessionID) {
          GM_setValue('steamStoreAuth', {
            storeSessionID: storeSessionID
          });
          return true;
        }
      });
    } else if (window.opener && window.location.host === 'steamcommunity.com' && window.location.pathname.includes('/id/')) {
      $(() => {
        window.onbeforeunload = function(event) {
          GM_setValue('steamCommunityAuth', null);
          return null;
        };
        const steam64Id = document.body.innerHTML.match(/g_steamID = "(.+?)";/)?.[1];
        const communitySessionID = document.body.innerHTML.match(/g_sessionID = "(.+?)";/)?.[1];
        const userName = document.body.innerHTML.match(/steamcommunity.com\/id\/(.+?)\/friends\//)?.[1];
        const data = {};
        if (steam64Id) {
          data.steam64Id = steam64Id;
        }
        if (userName) {
          data.userName = userName;
        }
        if (communitySessionID) {
          data.communitySessionID = communitySessionID;
          GM_setValue('steamCommunityAuth', data);
          return true;
        }
      });
    } else {
      if (window.location.hostname === 'key-hub.eu') {
        unsafeWindow.keyhubtracker = 1;
        unsafeWindow.gaData = {};
      }
      $(loadScript);
    }
  }();
})();