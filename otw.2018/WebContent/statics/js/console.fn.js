!(function(w){
	var ConsoleFunction = new function(){
		var root = this;
		
		this.isHook = false;
		this.mov={isClick:false,base:{x:0,y:0},obj:null};
		
		this.print = function(str){
			if(typeof str != 'undefined'){
				var div = document.createElement("div");
				div.innerHTML = str;
				div.setAttribute("class","line")
				u$(".output_wrap")[0].appendChild(div);
			}
			
		};
		
		this.branch= function(msg){
			var root = this;
			u$.post("/json/message.otw",{msg:msg},function(data){
				var obj = eval(data);
				obj.forEach(function(item){
					root[item.func](item.arg);
				});
				
			});
		};
		
		this.view = function(type){
			var root = this;
			var url = "",fn=null,option={};
			if(type==="contact"){
				url="/layer/contact.otw";
				option.height="540px";
				option.width = "500px";
				option.top=(window.innerHeight/2-540/2)+"px";
				option.left = (window.innerWidth/2 - 500/2)+"px";
				option.title="Contact";
				option.id="contactLayer";
				fn = function(obj){
					var header = u$(obj).find(".contact_header").find("h1")[0];
					header.addEventListener("mouseover",function(){
						header.classList.add("animated");
						header.classList.add("rubberBand");
						setTimeout(function(){
							header.classList.remove("animated");
							header.classList.remove("rubberBand");
						},2000);
						
					});
					
					u$(obj)[0].parentNode.style.background="url(/storage/background/skills.jpg) no-repeat center center fixed";
					u$(obj)[0].parentNode.style["webkit-background-size"]="cover";
					u$(obj)[0].parentNode.style["-moz-background-size"]="cover";
					u$(obj)[0].parentNode.style["-o-background-size"]="cover";
					u$(obj)[0].parentNode.style["background-size"]="cover";
					
					u$(obj).find("input,textarea").forEach(function(item){
						item.addEventListener("focusin",function(){
							root.isHook=false;
						});
						item.addEventListener("focusout",function(){
							root.isHook=true;
						});
					});
					u$(obj).find("input").get(0)[0].focus();
					var mailSendBtn = u$(obj).find("#mailSend")[0];
					mailSendBtn.addEventListener("click",function(){
						var frm = document.getElementById("mailFrm");
						var data = new FormData(frm);
						{
							
							var reg=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
							
							if(u$(frm).find("[name=name]")[0].value==""){
								u$(frm).find("[name=name]")[0].focus();
								alert("Please Input your name");
								return false;
							}
							if(u$(frm).find("[name=email]")[0].value==""){
								u$(frm).find("[name=email]")[0].focus();
								alert("Please Input your email");
								return false;
							}else if(!reg.test(u$(frm).find("[name=email]")[0].value)){
								u$(frm).find("[name=email]")[0].focus();
								alert("Please Check your email");
								return false;
							}
							
							if(u$(frm).find("[name=subject]")[0].value==""){
								u$(frm).find("[name=subject]")[0].focus();
								alert("Please Input your subject");
								return false;
							}
							if(u$(frm).find("[name=context]")[0].value==""){
								u$(frm).find("[name=context]")[0].focus();
								alert("Please Input your messages");
								return false;
							}
							
						}
						wating.showWatingView();
						var httpRequest = new XMLHttpRequest();
						httpRequest.onreadystatechange = function(){
							if(httpRequest.readyState==4 && httpRequest.status==200){
								
								setTimeout(function(){wating.hideWatingView();},500);
								
								var d = eval("["+httpRequest.response+"]");
								
								d = d[0];
								if(d.result=="done") alert("Thank you for contact me.");
								else if(d.result=="error") alert("Error.");
								
								root.closePage();
								
								
							}
						}
						httpRequest.open('POST',frm.getAttribute("action"));
						httpRequest.send(data);
					});
					
				}
				u$.ajax(url,null,function(data){
					root.appendPage(data,option,fn);
				});
			}else if(type==="todo"){
				option.height="540px";
				option.width = "840px";
				option.top=(window.innerHeight/2-540/2)+"px";
				option.left = (window.innerWidth/2 - 840/2)+"px";
				option.title="What to do";
				option.id="todoLayer";
				
				url="/layer/todo.otw";
				fn = function(obj){
					var txtbody = u$(obj).find("b.strong")[0];
				
					u$(obj)[0].parentNode.style.background="url(/storage/background/skills.jpg) no-repeat center center fixed";
					u$(obj)[0].parentNode.style["webkit-background-size"]="cover";
					u$(obj)[0].parentNode.style["-moz-background-size"]="cover";
					u$(obj)[0].parentNode.style["-o-background-size"]="cover";
					u$(obj)[0].parentNode.style["background-size"]="cover";
					
					txtbody.addEventListener("mouseover",function(){
						txtbody.classList.add("animated");
						txtbody.classList.add("rubberBand");
						setTimeout(function(){
							txtbody.classList.remove("animated");
							txtbody.classList.remove("rubberBand");
						},2000);
						
					});
					txtbody.addEventListener("click",function(){
						window.location.href="#contact";
					});
				}
				u$.ajax(url,null,function(data){
					root.appendPage(data,option,fn);
				});
			}else if(type=="work"){
				option.height="80%";
				option.width = "80%";
				option.top=(window.innerHeight/2)-((window.innerHeight*0.8)/2)+"px";
				option.left = (window.innerWidth/2) - ((window.innerWidth*0.8)/2)+"px";
				option.title="Works";
				option.id="workLayer";
				
				url="/layer/work.otw";
				fn=function(obj){
					var activeObj=null;
					var closeBtn = u$(obj).find(".btn_page_close")[0];
					
					u$(obj)[0].parentNode.style.background="url(/storage/background/skills.jpg) no-repeat center center fixed";
					u$(obj)[0].parentNode.style["webkit-background-size"]="cover";
					u$(obj)[0].parentNode.style["-moz-background-size"]="cover";
					u$(obj)[0].parentNode.style["-o-background-size"]="cover";
					u$(obj)[0].parentNode.style["background-size"]="cover";
					
					timeline.init();
					u$(obj).find(".polio").forEach(function(item){
						item.addEventListener("click",function(e){
							
							if(!item.classList.contains("active") && !e.defaultPrevented){
								u$(obj).find(".polio.active")[0].classList.remove("active");
								u$(".layer_body").find(".row").get(1)[0].insertBefore(item,u$(".polio").get(0)[0]);
								item.classList.add("active");
								u$(item).find(".thum_img").get(0)[0].style="opacity:1;display:block";
								u$("#workLayer")[0].scrollTop=0;
								activeObj = item;
								
							}
						});
					});
					
					u$(obj).find("video")[0].addEventListener("ended",function(){
						var v = u$(".polio.active").find(".play_btn")[0];
						v.setAttribute("data-status","stop");
						v.children[0].classList.remove("fa-pause-circle-o");
						v.children[0].classList.add("fa-play-circle");
					});
					u$(obj).find(".prev_btn").forEach(function(item){
						item.addEventListener("click",function(e){
							var t = u$(".polio.active").find(".thum_img").get(u$(".polio.active").find(".thum_img").length-1)[0];
							
							u$(".polio.active").find(".thumb")[0].insertBefore(t,u$(".polio.active").find(".thum_img").get(0)[0]);
						
							u$(t).fadeIn();
							u$(".polio.active").find(".thum_img").get(1).fadeOut();
							
							e.preventDefault();
						});
					});
					u$(obj).find(".next_btn").forEach(function(item){
						item.addEventListener("click",function(e){
							u$(".polio.active").find(".thum_img").get(0).fadeOut(function(item){
								u$(".polio.active").find(".thumb")[0].appendChild(item);
							});
							u$(".polio.active").find(".thum_img").get(1).fadeIn();
							
							e.preventDefault();
						});
					});
					u$(obj).find(".play_btn").forEach(function(item){
						
						item.addEventListener("click",function(){
							var player = new videoPlayer(item.nextSibling.nextSibling.getAttribute("src"));
							player.show();
						});
					});
					u$(obj).find(".zoom_btn").forEach(function(item){
						
						item.addEventListener("click",function(){
							var opt={};
							opt.height="90%";
							opt.width = "90%";
							opt.top=(window.innerHeight/2)-((window.innerHeight*0.9)/2)+"px";
							opt.left = (window.innerWidth/2) - ((window.innerWidth*0.9)/2)+"px";
							opt.title="Images Viewer";
							opt.id="imgView";
							var html = "<img src='"+u$(item.parentNode).find("img")[0].src+"' style='width:100%;'/>";
							root.openLayer(html,opt);
						});
					});
					u$(obj).find(".poli_close").forEach(function(item){
						item.addEventListener("click",function(e){
							if(u$(item.parentNode).find("video").length>0)u$(item.parentNode).find("video")[0].pause();
							u$(item.parentNode).find("a.play_btn")[0].setAttribute("data-status","stop");
							u$(item.parentNode).find("a.play_btn")[0].children[0].classList.remove("fa-pause-circle-o");
							u$(item.parentNode).find("a.play_btn")[0].children[0].classList.add("fa-play-circle");
							u$(".polio.active")[0].setAttribute("class","polio");
							e.preventDefault();
						});
					});
				}
				u$.ajax(url,null,function(data){
					root.appendPage(data,option,fn,function(e){
						if(u$(".polio.active").length>0){
							u$(".polio.active").find(".thum_img").get(0)[0].style="opacity:0;display:none";
							u$(".polio.active")[0].setAttribute("class","polio");
						}else{
							u$(".wrap").animate("top",(window.innerHeight*-1),0,35,function(){
								u$("#"+option.id)[0].parentNode.style.background="rgba(255,255,255,0)";
								u$("#"+option.id)[0].parentNode.style.display="none";
								u$("#"+option.id)[0].remove();
								root.removeHash();
								root.closePageEvent();
								root.closePageEvent = function(){console.log("clear!");}
							});
						}
					});
				});
			}
			
			
		};
		
		this.clear = function(){
			return new u$.promise(function(res){
				u$(".output_wrap")[0].innerHTML = "";
				root.print("- SYSTEM : console clear done!");
				root.scrollUp();
				res();
			});
			
		};
		this.scrollUp = function(){
			var h = window.innerHeight*0.85;
			var b = u$(".input_wrap")[0].offsetTop;
			var diff = b-h;
			var t = u$(".console_container")[0].style.top.replace("px","");
			diff = -1*diff;
			
			if(diff<0){
				u$(".console_container")[0].style.top=diff+"px";
			}else{
				u$(".console_container")[0].style.top="0px";
			}
		}
		this.closePageEvent = function(){}
		this.closePage = function(){
			var evt = null;
			var obj = u$(".page_wrap")[0];
			var closeBtn = u$(obj).find(".btn_page_close")[0];
			
			if(document.createEventObject){
				evt = document.createEventObject();
				closeBtn.fireEvent("click",evt);
				closeBtn.dispatchEvent(evt);
			}else{
				evt = document.createEvent("Events");
				evt.initEvent("click",true,true);
				closeBtn.dispatchEvent(evt);
			}
		}
		this.appendPage = function(data,opt,fn,closeEvnt){
			
			var animate=["top","right","left","bottom"];
			var root = this;
			var div = document.createElement("div");
			var contentDiv = document.createElement("div");
			var close = document.createElement("a");
			
			if(typeof closeEvnt =="undefined" || typeof closeEvnt!="function"){
				closeEvnt = function(e){
					u$(".wrap").animate("top",(window.innerHeight*-1),0,35,function(){
						u$("#"+opt.id)[0].parentNode.style.background="rgba(255,255,255,0)";
						u$("#"+opt.id)[0].parentNode.style.display="none";
						u$("#"+opt.id)[0].remove();
						root.removeHash();
						root.closePageEvent();
						root.closePageEvent = function(){console.log("clear!");}
					});
				}
			}
			div.style.background="rgba(0,0,0,0.75)";
			div.style.width="100%";
			div.style.height="100%";
			div.setAttribute("id",opt.id);
			div.style["overflow-y"]="auto";
			div.style["overflow-x"]="hidden";
			
			
			close.setAttribute("href","javascript:;")
			close.innerHTML = "<img src='/statics/images/btn_close_white.png'/>";
			close.setAttribute("class","btn_page_close");
			
			close.addEventListener("click",closeEvnt);
			contentDiv.innerHTML = data;
			
			div.appendChild(close);
			div.appendChild(contentDiv);
			
			u$(".page_wrap")[0].appendChild(div);
			u$(".page_wrap")[0].style.display="block";
			
			fn(div);
			
			var ei = Math.floor(Math.random()*4);
			var et = 0;
			if(animate[ei]=="top"){
				u$(".wrap").animate("top",0,-window.innerHeight,30);
			}else if(animate[ei]=="right"){
				u$(".wrap").animate("right",0,window.innerWidth,30);
			}else if(animate[ei]=="left"){
				u$(".wrap").animate("left",0,-window.innerWidth,30);
			}else if(animate[ei]=="bottom"){
				u$(".wrap").animate("bottom",0,window.innerHeight,30);
			}
			
			
		}
		this.openLayer = function(data,opt,fn){
			if(u$("#"+opt.id).length>0) u$("#"+opt.id)[0].remove();
			var root = this;
			var div = document.createElement("div");
			var titleDiv = document.createElement("div");
			var contentDiv = document.createElement("div");
			
			
			contentDiv.innerHTML = data;
			contentDiv.setAttribute("class","open_layer_context");
			contentDiv.style["overflow-y"]="auto";
			contentDiv.style["overflow-x"]="hidden";
			contentDiv.style.width="100%";
			contentDiv.style.height = "calc(100% - 40px)";
			{
				var titTxtDiv = document.createElement("div"),
					close = document.createElement("a"),
					hide = document.createElement("a");
				close.setAttribute("class","close_btn");
				close.innerHTML = '<i class="fa fa-window-close fa-lg" aria-hidden="true"></i>';
				close.addEventListener("click",function(){
					div.remove();
				});
				hide.setAttribute("class","hide_btn");
				hide.innerHTML = '<i class="fa fa-minus-square fa-lg" aria-hidden="true"></i>';
				hide.addEventListener("click",function(){
					if(div.style.height!="40px"){
						div.style.height="40px";
						u$(hide).find("i")[0].classList.remove("fa-minus-square-o");
						u$(hide).find("i")[0].classList.add("fa-plus-square-o");
					}else{ 
						div.style.height=opt.height;
						u$(hide).find("i")[0].classList.add("fa-minus-square-o");
						u$(hide).find("i")[0].classList.remove("fa-plus-square-o");
					}
				});
				
				titTxtDiv.innerHTML = opt.title;
				titTxtDiv.setAttribute("class","cst_tit");
				titleDiv.appendChild(titTxtDiv);
				titleDiv.appendChild(hide);
				titleDiv.appendChild(close);
			}
			
			titleDiv.setAttribute("class","title");
			titleDiv.addEventListener("mousedown",function(e){
				root.mov.base.x = e.screenX;
				root.mov.base.y = e.screenY;
				root.mov.isClick=true;
				root.mov.obj= div;
			});
			titleDiv.addEventListener("mouseup",function(){
				root.mov.base.x=0;
				root.mov.base.y=0;
				root.mov.obj = null;
				root.mov.isClick=false;
			});
			
			document.body.addEventListener("mousemove",function(e){
				if(root.mov.isClick){
					var x = root.mov.base.x-e.screenX;
					var y = root.mov.base.y - e.screenY;
					var l = root.mov.obj.style.left.replace("px","");
					var t = root.mov.obj.style.top.replace("px","");
					root.mov.base.x = e.screenX;
					root.mov.base.y = e.screenY;
					
					root.mov.obj.style.left = (Number(l)-x)+"px";
					root.mov.obj.style.top = (Number(t)-y)+"px";
				}
			});
			
			div.style.opacity="0";
			div.setAttribute("class","open_layer");
			div.style.top = opt.top;
			div.style.left = opt.left;
			div.style.width = opt.width;
			div.style.height = opt.height;
			div.setAttribute("id",opt.id);
			
			div.appendChild(titleDiv);
			div.appendChild(contentDiv);
			u$("body")[0].appendChild(div);
			u$(div).fadeIn();
			
			//custom function
			if(typeof fn =="function")fn(div);
		}
		this.append = function(data,fn){
			var div = document.createElement("div");
			div.innerHTML = data;
			div.style.opacity="0";
			u$(".output_wrap")[0].appendChild(div);
			{
				var b = u$(".input_wrap")[0].offsetTop;
				var h = window.innerHeight*0.85;
				var diff = b-h;
				var t = u$(".console_container")[0].style.top.replace("px","");
				var step = 0;
				diff = diff+Number(t)
				
				diff = -1*diff;
				if(diff<0){
					step = diff/20;
					_append_view_scroll(1,step,t,div);
				}else{
					u$(div).fadeIn();
				}
				
				function _append_view_scroll(idx,step,base,obj){
					var oStep = 1/20;
				
					if(idx<21){
						
						u$(".console_container")[0].style.top=(Number(base)+(step*idx))+"px";
						obj.style.opacity=(oStep*idx);
						idx+=1;
						setTimeout(function(){_append_view_scroll(idx,step,base,obj);},50);
					}
					
				}
				
			}
			//custom function
			fn(div);
		}
		this.removeHash =function(){
			history.pushState("", document.title, window.location.pathname);
		}
		this.call = function(fn,args){
			this[fn](args);
		}
	}
	w.ConsoleFunction = ConsoleFunction;
})(window);

