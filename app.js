(() => {
 const cfg=window.UCCM_CONFIG, home=document.getElementById("home-screen"), opts=document.getElementById("options-screen"), player=document.getElementById("player-screen");
 const list=document.getElementById("option-list"), video=document.getElementById("presentation-video"), frame=document.getElementById("video-frame"), error=document.getElementById("video-error");
 let activeId=null, activeExperience=null, activeOption=null;
 function show(el){[home,opts,player].forEach(x=>x.classList.add("hidden"));el.classList.remove("hidden");}
 function setHomeIcons(){for(const id of Object.keys(cfg.experiences)){const el=document.getElementById("home-icon-"+id);if(el)el.src=cfg.experiences[id].homeIcon||cfg.experiences[id].logo;}}
 function openExperience(id){
  activeId=id;activeExperience=cfg.experiences[id];if(!activeExperience)return;
  if(id==="kpop"){play(activeExperience.options[0]);return;}
  document.getElementById("options-logo").src=activeExperience.logo;
  document.getElementById("options-logo").alt=activeExperience.title+" logo";
  document.getElementById("options-title").textContent=activeExperience.title;
  document.getElementById("options-eyebrow").textContent=id==="kerato"?"SELECT A CASE":"SELECT A MODEL";
  document.getElementById("options-description").textContent=activeExperience.description;list.replaceChildren();
  activeExperience.options.forEach(item=>{
   const b=document.createElement("button");b.className="option-card";
   const art=document.createElement("span");art.className="option-art";const img=document.createElement("img");img.src=item.image||activeExperience.logo;img.alt=item.label+" profile image";art.appendChild(img);
   const label=document.createElement("strong");label.textContent=item.label;const sub=document.createElement("small");sub.textContent=id==="kerato"?"OPEN CASE":"OPEN MODEL";
   b.append(art,label,sub);b.addEventListener("click",()=>play(item));list.appendChild(b);
  });show(opts);
 }
 async function enterFullscreen(){try{if(frame.requestFullscreen)await frame.requestFullscreen();else if(video.webkitEnterFullscreen)video.webkitEnterFullscreen();}catch(e){frame.classList.add("pseudo-fullscreen");}}
 async function exitFullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();}catch(e){}frame.classList.remove("pseudo-fullscreen");}
 function syncFullscreenButton(){const full=!!document.fullscreenElement||frame.classList.contains("pseudo-fullscreen");document.getElementById("fullscreen-button").textContent=full?"↙ Minimize":"⛶ Full screen";document.getElementById("minimize-button").classList.toggle("visible",full);}
 async function toggleFullscreen(){if(document.fullscreenElement||frame.classList.contains("pseudo-fullscreen"))await exitFullscreen();else await enterFullscreen();syncFullscreenButton();}
 function play(item){
  activeOption=item;document.getElementById("player-code").textContent=item.code;document.getElementById("player-title").textContent=activeExperience.title;
  document.getElementById("playing-label").innerHTML="<i></i> "+(activeId==="kpop"?"KPOP WORKFLOW":"NOW PLAYING");
  error.classList.add("hidden");video.pause();video.removeAttribute("src");video.load();video.src="./videos/"+encodeURIComponent(item.video);video.controls=false;video.loop=false;video.muted=true;show(player);
  const p=video.play();if(p&&p.catch)p.catch(()=>error.classList.remove("hidden"));
 }
 function goBackFromPlayer(){exitFullscreen();video.pause();if(activeId==="kpop"){homeAgain();return;}show(opts);}
 function homeAgain(){exitFullscreen();video.pause();video.removeAttribute("src");video.load();error.classList.add("hidden");activeId=null;activeExperience=null;activeOption=null;show(home);}
 video.addEventListener("ended",homeAgain);video.addEventListener("error",()=>{if(activeOption)error.classList.remove("hidden");});
 document.getElementById("retry-button").addEventListener("click",()=>{if(activeOption)play(activeOption);});
 document.getElementById("options-back").addEventListener("click",homeAgain);document.getElementById("player-back").addEventListener("click",goBackFromPlayer);
 document.getElementById("fullscreen-button").addEventListener("click",toggleFullscreen);document.getElementById("minimize-button").addEventListener("click",toggleFullscreen);
 document.addEventListener("fullscreenchange",syncFullscreenButton);
 document.querySelectorAll("[data-model]").forEach(b=>b.addEventListener("click",()=>openExperience(b.dataset.model)));setHomeIcons();
 if("serviceWorker" in navigator && location.protocol.startsWith("http")) addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
})();
