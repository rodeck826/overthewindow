!(function(w){
	var videoPlayer = vp = function(src){
		return vp.init(src);
	}
	var g={};
	vp.init = function(path){
		
		var player = getTemplate();
		if(u$(".video_wrap").find(".video_player").length>0) u$(".video_wrap").find(".video_player")[0].remove();
		u$(".video_wrap")[0].appendChild(player);
		
		g = {
			path :null,
			wrap : u$(".video_wrap")[0],
			player :  u$(".video_player")[0],
			video : u$(".video_player").find("video")[0],
			time : u$(".video_player").find(".time")[0],
			progress : u$(".video_player").find(".progress")[0],
			btn : {
				play : 'fa-play',
				stop : 'fa-stop',
				pause : 'fa-pause' 
			},
			played:false
		}
		g.video.src = path;
		wating.showWatingView();
		g.video.addEventListener("loadeddata",function(){
			wating.hideWatingView();
		});
		g.status = g.player.getAttribute("data-status");
		
		var playEvent = function(){
			var btn = u$(g.player).find(".btn_player")[0];
			
			if(g.video.paused){				
				g.video.play();
				runningTime();
				btn.children[0].classList.add(g.btn.pause);
				btn.children[0].classList.remove(g.btn.play);
				btn.children[0].classList.remove(g.btn.stop);
			}else{
				btn.children[0].classList.add(g.btn.play);
				btn.children[0].classList.remove(g.btn.pause);
				btn.children[0].classList.remove(g.btn.stop);
				g.video.pause();
			}
		}
		u$(g.player).find(".btn_player")[0].addEventListener("click",playEvent); 
		
		u$(g.wrap).find(".btn_page_close")[0].addEventListener("click",function(){
			var btn = u$(g.player).find(".btn_player")[0];
			g.video.src="";
			g.time.innerText="";
			g.progress.style.width="0";
			g.wrap.style.display="none";
			
			btn.children[0].classList.add(g.btn.play);
			btn.children[0].classList.remove(g.btn.pause);
			btn.children[0].classList.remove(g.btn.stop);
			btn.removeEventListener("click",playEvent);
			g.video.pause();
		});
		
		
		g.video.addEventListener("ended",function(){
			var btn = u$(g.player).find(".btn_player")[0];
			g.progress.style.width = "100%";
			btn.children[0].classList.add(g.btn.play);
			btn.children[0].classList.remove(g.btn.pause);
			btn.children[0].classList.remove(g.btn.stop);
			g.time.innerText=getSecondToTime(g.video.duration);
		});
		return vp;
	}
	vp.show = function(){
		g.wrap.style.display="block";
	}
	w.videoPlayer = videoPlayer;
	
	function getTemplate(){
		var player = document.createElement("div"),
			videoDiv = document.createElement("div"),
			video = document.createElement("video"),
			navigator = document.createElement("div"),
			btn = document.createElement("a"),
			ico = document.createElement("i"),
			bar = document.createElement("div"),
			prog = document.createElement("span"),
			time = document.createElement("span");
		
		player.setAttribute("class","video_player");
		videoDiv.setAttribute("class","video");
		navigator.setAttribute("class","video_navigator");
		btn.setAttribute("href","javascript:;");
		btn.setAttribute("class","btn_player");
		ico.setAttribute("class","fa fa-play");
		bar.setAttribute("class","bar");
		prog.setAttribute("class","progress");
		time.setAttribute("class","time");
		
		bar.appendChild(prog);
		btn.appendChild(ico);
		
		navigator.appendChild(btn);
		navigator.appendChild(bar);
		navigator.appendChild(time);	
		
		videoDiv.appendChild(video);
		
		player.appendChild(videoDiv);
		player.appendChild(navigator);
		
		return player;
		
	}
	
	function runningTime(){
		if(!g.video.paused){
			g.time.innerText =getSecondToTime(Math.floor(g.video.currentTime));
			var per = Math.floor((g.video.currentTime/g.video.duration)*100);
			g.progress.style.width = per+"%";
			setTimeout(runningTime,1000);
		}
	}
	function getSecondToTime(sec){
		var strSec = sec%60
		var minSec = Math.floor(sec/60);
		return (minSec+"").lpad("0",2)+":"+(strSec+"").lpad("0",2);
	}
})(window);