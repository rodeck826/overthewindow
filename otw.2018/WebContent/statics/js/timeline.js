!(function(w){
	var timeline = new function(){
		var root = this;
		this.times = [
			[201307,201312,'OPEN TOP','Web Developer','rgba(154,202,39,1)'],
			[201404,new Date().format("yyyyMM"),'KI(Knowledge Information)','Full Stack Engineer','rgba(39, 67, 202,1)'],
			[201401,new Date().format("yyyyMM"),'Freelance','Full Stack Engineer','rgba(202, 92, 39,1)'],
		];
		
		this.resize = function(){
			
		}
		this.init = function(){
			var step =u$(".timeline")[0].offsetWidth/6;
			
			u$(".timeline")[0].addEventListener("resize",function(){
				console.log("resize");
			});
			this.times.forEach(function(item){
				var stYear =  (item[0]+"").substr(0,4);
				var stMonth = (item[0]+"").substr(4,2);
				var edYear =  (item[1]+"").substr(0,4);
				var edMonth = (item[1]+"").substr(4,2);
				
				var dStep = step/12;
				var stBase = stYear-2013;
				stBase = (stBase*step)+(Number(stMonth)*dStep);
				
				var edBase = edYear-2013;
				edBase = (edBase*step)+(Number(edMonth)*dStep);
				edBase = edBase-stBase;
				
				{
					var bar = document.createElement("span"),
						year = document.createElement("span"),
						comp = document.createElement("span"),
						dept = document.createElement("span"),
						dates = document.createElement("div");
					bar.setAttribute("class","bar");
					bar.style.width =edBase+"px";
					bar.style["background-color"]=item[4];
					
					year.setAttribute("class","year");
					year.innerText=stYear+"."+stMonth+" ~ "+edYear+"."+edMonth;
					
					comp.setAttribute("class","comp");
					comp.innerText=item[2];
					
					dept.setAttribute("class","dept");
					dept.innerText=item[3];
					
					dates.setAttribute("class","dates");
					dates.style.left = stBase+"px";
					dates.appendChild(bar);
					dates.appendChild(year);
					dates.appendChild(comp);
					dates.appendChild(dept);
					u$(".time_body")[0].appendChild(dates);
				}
			});
		}
		
			
		
	}
	w.timeline = timeline
})(window);