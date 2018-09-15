/* 
 * http://www.overthewindow.net
 *
 * author : rodeck. 
 * 
 * 
 */
!(function(w){

	var cf = w.ConsoleFunction;
	var isCursor=false;
	var isDispatching=false;
	var isScroll = true;
	var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"; 
		
	document.addEventListener('DOMContentLoaded',function(){_init();});
	
	w.addEventListener('resize',function(){_evt_resize();cf.scrollUp();timeline.resize();}); 
	
	w.addEventListener('hashchange',function(e){
		console.log(e);
		if(e.type =="hashchange"){
			console.log("hashChange");
			_hashChangeEvent();
		}else{
			console.log("other event ");
		}
	})
	
	function _hashChangeEvent(){
		var menuNm = window.location.hash.replace('#','');
		console.log(menuNm + "<--");
		if(menu.isShow()=="true"){
			menu.hideDetailMenu(function(){
				u$("aside")[0].style.display="none";
				dispatchText(menuNm);
			});
		}else if(u$(".page_wrap")[0].children.length>0){
			cf.closePageEvent = function(){
				if(menuNm!="" && menuNm !=null) dispatchText(menuNm);
			}
			cf.closePage();
		}else{
			dispatchText(menuNm);
		}
	}
	function _init(){
		_evt_resize();
		
		u$("a.contact")[0].addEventListener("click",function(){
			if(!isDispatching){
				_dispatch_message("contact",0);
			}
			return false;
		});
		u$("a.contact")[0].addEventListener("mouseover",function(){
			u$("a.contact")[0].classList.add("rubberBand");
			u$("a.contact")[0].classList.add("animated");
			setTimeout(function(){
				u$("a.contact")[0].classList.remove("rubberBand");
				u$("a.contact")[0].classList.remove("animated");
			},1200);
		});
		u$(".container")[0].addEventListener(mousewheelevt,function(e){
			var delta = e.deltaY
			if(delta>0){
				_down_scroll();
			}else{
				_up_scroll();
				
			}
		});
		setTimeout(function(){
			_evt_console_show();
		},100); 
	}
	
	function _show_intro(){
		u$.ajax('/text/intro.otw',null,function(data){
			setTimeout(function(){__append_span(data,0)},200);
		});
		
		function __append_span(str,idx){
			var span = document.createElement("span");
			var char = str.charAt(idx);
			var code = str.charCodeAt(idx);
			
			
			if(code ==32)char = "&nbsp;";
			if(code ==58){
				_show_inputBox();
				menu.init();
				menu.showMenu();
				
				cf.isHook=true;
				isScroll=false;
				document.addEventListener('keydown',function(e){
					var code = 0;
					if(e.which) code = e.which;
					else code = e.keyCode;
					if(cf.isHook){
						cf.scrollUp();
						if((code > 64 && code <91) || (code >96 && code <123)){
							_print_input_box(String.fromCharCode(code).toLowerCase());
						}else if(code==8){
							_remove_input_box();
						}else if(code ==32){
							_print_input_box("&nbsp;");
						}else if(code ==13){
							_evt_console_message().then(function(){
								cf.scrollUp();
							});
						}else{
							return true;
						}
					}
				});
				
				u$("a.contact")[0].style.display="block";
				u$("a.contact")[0].classList.add("bounceIn");
				u$("a.contact")[0].classList.add("animated");
				setTimeout(function(){
					u$("a.contact")[0].classList.remove("bounceIn");
					u$("a.contact")[0].classList.remove("animated");
				},1200);
				if(window.location.hash==""){
					setTimeout(function(){
						menu.toggleDetailMenu();
					},1000);
				}else{
					_hashChangeEvent();
				}
				return false;
			}
			if(code ==10){
				span = document.createElement("br");
			}else{
				span.setAttribute("class","blast animated bounceIn");
				span.addEventListener('mouseover',function(){
					span.classList.add("rubberBand");
					span.classList.add("animated");
					setTimeout(function(){
						span.classList.remove("rubberBand");
						span.classList.remove("animated");
					},1200);
				});
				
				span.innerHTML  = char;
				span.style.opacity=1;
				setTimeout(function(){span.classList.remove("animated");span.classList.remove("bounceIn");},2000);
			}
			
			u$(".system_wrap")[0].insertBefore(span,u$(".cursor")[0]);
			idx +=1;
			if(idx<str.length){
				setTimeout(function(){__append_span(str,idx)},100);
			}
		}
		
	}
	
	
	function _show_inputBox(){
		var top = u$(".output_wrap")[0].offsetTop+u$(".output_wrap")[0].offsetHeight;
		u$(".input_box")[0].appendChild(u$(".cursor")[0]);
		u$(".input_box")[0].style.display="block";
	}
	
	
	function _remove_input_word(){
		var list = u$(".input_box > .blast");
		for(var i=0;i<list.length;i++){
			u$(".input_box")[0].removeChild(list[i]);
		}
	}
	
	
	/** common function **/
	
	function _down_scroll(){
		var t = u$(".input_wrap")[0].offsetTop;
		var base =Number(u$(".console_container")[0].style.top.replace("px",""));
		var h =window.innerHeight*0.85;
		var v =t-(h+Math.abs(base));
		var moveT = 0;
		if(v>0){
			if(Math.abs(v)<20)moveT = base-v;
			else moveT =base-20
			u$(".console_container")[0].style.top = moveT+"px";
		}
		
	}
	function _up_scroll(){
		var base = Number(u$(".console_container")[0].style.top.replace("px",""));
		var moveT = base+20;
		if(moveT >0)moveT = 0;
		
		u$(".console_container")[0].style.top = moveT+"px";
		
	}
	function _print_input_box(char){
		var span = document.createElement("span");
		span.setAttribute("class","blast animated bounceIn");
		span.innerHTML  = char;
		span.style.opacity=1;
		setTimeout(function(){span.classList.remove("animated");span.classList.remove("bounceIn");},2000);
		u$(".input_box")[0].insertBefore(span,u$(".cursor")[0]);
	}
	function _remove_input_box(){
		if(u$(".input_box > .blast").length>0){
			var de = u$(".input_box > .blast").get(u$(".input_box > .blast").length-1)[0]
			u$(".input_box")[0].removeChild(de);
		}
	}

	
	function _dispatch_message(msg,idx){
		var evt = null;
		var code = msg.charCodeAt(idx)
		if(idx==0)isDispatching=true;
		
		if(msg.length>idx){
			
			
			if(document.createEventObject){
				evt = document.createEventObject();
				evt.keyCode = code;
				document.fireEvent("onkeydown",evt);
				evt.keyCode = code;
				document.dispatchEvent(evt);
			}else{
				evt = document.createEvent("Events");
				evt.initEvent("keydown",true,true);
				evt.which = code;
				evt.keyCode = code;
				document.dispatchEvent(evt);
			}
			idx +=1; 
			setTimeout(function(){_dispatch_message(msg,idx)},100);
		}else{
			
			if(document.createEventObject){
				evt = document.createEventObject();
				evt.keyCode = 13;
				document.fireEvent("onkeydown",evt);
				evt.keyCode = 13;
				document.dispatchEvent(evt);
			}else{
				evt = document.createEvent("Events");
				evt.initEvent("keydown",true,true);
				evt.which = 13;
				evt.keyCode = 13;
				document.dispatchEvent(evt);
			}
			
			isDispatching=false;
		}
		
		
		
	}
	
	
	/*** evt line***/
	function _evt_console_message(){
		return new u$.promise(function(res,rej){
			var cnt = u$(".input_box > .blast").length;
			var msg = "";
			
			for(var i=0;i<cnt;i++){
				msg+=u$(".input_box > .blast").get(i)[0].innerText;
			}
			
			_remove_input_word();
			cf.print("GUEST : "+msg);
			cf.branch(msg)
			res();
		});
		
	}
	
	function _evt_resize(){
		
		var w = window.innerWidth,
		h = window.innerHeight,
		cont = u$(".container")[0],
		cons = u$(".console_wrap")[0];
		if(cont !=null){
			cont.style.width = w+"px";
			cont.style.height = h+"px";
		}
		
		if(cons!=null && cons.style.height=="2px"){
			cons.style.width = "0px";
			cons.style.left = "0px";
			cons.style.top = (h/2)+"px";
		}else{
			cons.style.height = h+"px";
			cons.style.top = "0px";
			cons.style.left = "0px";
			cons.style.width = w+"px";
		}
		
		if(u$(".page_wrap")[0].children.length>0){
			var vs = u$(".wrap")[0].style.transform.replace("translate3d","").replace("(","").replace(")","").replace(/px/gi,"").trim().split(",");
			var tv=0;
			
			if(Number(vs[0].trim())<0)vs[0] = -window.innerWidth;
			else if(Number(vs[0].trim())>0)vs[0] = window.innerWidth;
			
			if(Number(vs[1].trim())<0)vs[1] = -window.innerHeight;
			else if(Number(vs[1].trim())>0)vs[1] = window.innerHeight;
			
			u$(".wrap")[0].style["transform"]="translate3d("+vs[0]+"px,"+vs[1]+"px,"+vs[2]+"px)";
		}
	}
	
	function _evt_console_show(){
		setTimeout(function(){
			isCursor=true;
			_evt_cursor();
			_show_intro();
		},350);
		//u$(".console_wrap").fadeIn();
	}
	
	function _evt_console_animate(i){
		var h = window.innerHeight;
		var cons = u$(".console_wrap")[0];
		
		var tStep  =(h/2)/50;		
		var hStep = h/50;
		
		if(i<=50){
			cons.style.top = (tStep*(50-i))+"px";
			cons.style.height = hStep*i+"px";
			i +=1;
			setTimeout(function(){_evt_console_animate(i);},17);
		}else{
			setTimeout(function(){
				isCursor=true;
				_evt_cursor();
				_show_intro();
			},350);
		}
	}
	
	
	function _evt_cursor(){
		if(isCursor){
			if(u$(".cursor").isVisible()){
				u$(".cursor")[0].style.display ="none";
			}else{
				u$(".cursor")[0].style.display ="block";
			}
		}else{
			u$(".cursor")[0].style.display ="none";
		}
		setTimeout(function(){_evt_cursor()},350);
	}
	
	w.dispatchText = function(txt){
		if(!isDispatching){
			_dispatch_message(txt,0);
		}
		
	};
	
	
	
})(window);