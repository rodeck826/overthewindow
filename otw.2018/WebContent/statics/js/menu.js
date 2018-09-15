!(function(){
	var menu = new function(){
		var root = this;
		this.showMenu = function(){
			var per=1;
			if(window.innerWidth<600)per=0.7;
			setTimeout(function(){
				u$("header").find(".bar").get(0).animate("width",0,45*per,50,function(){
					var bar = u$("header").find(".bar").get(0)[0];
					bar.style["-moz-transition"] = "width 0.4s ease-in-out";
					bar.style["-o-transition"] = "width 0.4s ease-in-out";
					bar.style["-webkit-transition"] = "width 0.4s ease-in-out";
					bar.style["transition"] = "width 0.4s ease-in-out";
				});
			},100);
			setTimeout(function(){
				u$("header").find(".bar").get(1).animate("width",0,40*per,50,function(){
					var bar = u$("header").find(".bar").get(1)[0];
					bar.style["-moz-transition"] = "width 0.4s ease-in-out";
					bar.style["-o-transition"] = "width 0.4s ease-in-out";
					bar.style["-webkit-transition"] = "width 0.4s ease-in-out";
					bar.style["transition"] = "width 0.4s ease-in-out";
				});
			},350);
			setTimeout(function(){
				u$("header").find(".bar").get(2).animate("width",0,43*per,50,function(){
					var bar = u$("header").find(".bar").get(2)[0];
					bar.style["-moz-transition"] = "width 0.4s ease-in-out";
					bar.style["-o-transition"] = "width 0.4s ease-in-out";
					bar.style["-webkit-transition"] = "width 0.4s ease-in-out";
					bar.style["transition"] = "width 0.4s ease-in-out";
				});
			},600);
			
		}
		
		this.showDetailMenu=function(){
			u$("header").find("a.bug")[0].setAttribute("data-open","true");
			u$(".wrap").animate("left",0,-315,30);
			
		}
		this.hideDetailMenu=function(fn){
			u$("header").find("a.bug")[0].setAttribute("data-open","false");
			u$(".wrap").animate("left",-315,0,30,fn);
		}
		this.toggleDetailMenu = function(){
			var isOpen=u$("header").find("a.bug")[0].getAttribute("data-open");
			if(isOpen=="false"){
				u$("aside")[0].style.display="block";
				root.showDetailMenu();
			}else{
				root.hideDetailMenu(function(){u$("aside")[0].style.display="none";});
			}
		}
		this.isShow = function(){
			return u$("header").find("a.bug")[0].getAttribute("data-open");
		}
		this.init = function(){
			u$("header")[0].style.display="block";
			
			u$("aside").find("a.nav_close")[0].addEventListener("click",function(){
				root.hideDetailMenu(function(){u$("aside")[0].style.display="none";});
				u$("header").find("a.bug")[0].setAttribute("data-open","false");
			});
			u$("header").find("a.bug")[0].addEventListener("click",function(){
				u$("aside")[0].style.display="block";
				root.showDetailMenu();
				u$("header").find("a.bug")[0].setAttribute("data-open","true");
			});
			/*u$("aside .gnb_dept a").forEach(function(item){
				item.addEventListener("click",function(){
					var menu = item.href.split("#")[1];					
					root.hideDetailMenu(function(){
						u$("aside")[0].style.display="none";
						dispatchText(menu);
					});
					u$("header").find("a.bug")[0].setAttribute("data-open","false");
					
					
				});
			});*/
			
		}
		
		
	}

	
	window.menu = menu;
		
})(window);