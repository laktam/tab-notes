(()=>{"use strict";console.log("from content"),chrome.runtime.onMessage.addListener((function(e,t,o){if(console.log(e),"open-note"===e.action)(function(){const e=document.createElement("div");e.classList.add("note-container"),Object.assign(e.style,{position:"absolute",top:"20px",left:"20px",width:"300px",border:"2px solid #ccc",backgroundColor:"#f9f9f9",boxShadow:"0 0 10px rgba(0,0,0,0.1)",resize:"both",overflow:"auto",zIndex:"1000"});const t=document.createElement("div");t.classList.add("note-header"),t.innerText="Drag here",Object.assign(t.style,{width:"100%",padding:"5px",cursor:"move",backgroundColor:"#ddd",borderBottom:"2px solid #ccc"}),e.appendChild(t);const o=document.createElement("input");o.type="text",o.placeholder="Title",o.classList.add("note-title"),Object.assign(o.style,{width:"100%",fontSize:"16px",marginBottom:"10px",boxSizing:"border-box"}),e.appendChild(o);const n=document.createElement("textarea");n.placeholder="Your note here...",n.classList.add("note-content"),Object.assign(n.style,{width:"100%",height:"100px",boxSizing:"border-box"}),e.appendChild(n);const l=document.createElement("button");l.innerText="Save",l.style.float="right",l.style.border="solid 2px gray",l.style.padding="3px",l.style.margin="5px",l.addEventListener("click",(()=>{let e=window.location.href;!function(e){let t=location.hostname,o=document.title+" ["+t+"]";console.log("noteskey ",o),chrome.storage.local.get("notes").then((t=>{console.log("before Value is ",t.notes);const n=t.notes||{};n[o]?n[o].push(e):n[o]=[e],chrome.storage.local.set({notes:n}).then((()=>{console.log("Value is set ",n)}))}))}({title:o.value,content:n.value,link:e}),o.value="",n.value=""})),e.appendChild(l),document.body.appendChild(e),function(e,t){let o=0,n=0,l=0,c=0;function s(t){(t=t||window.event).preventDefault(),o=l-t.clientX,n=c-t.clientY,l=t.clientX,c=t.clientY,e.style.top=e.offsetTop-n+"px",e.style.left=e.offsetLeft-o+"px"}function i(){document.onmouseup=null,document.onmousemove=null}t.onmousedown=function(e){(e=e||window.event).preventDefault(),l=e.clientX,c=e.clientY,document.onmouseup=i,document.onmousemove=s}}(e,t)})(),o();else if("get-note-key"===e.action){let e=location.hostname;o({notesKey:document.title+" ["+e+"]"})}return!0}))})();