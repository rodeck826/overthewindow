!(function(w){
	var wating =new  function(){
		var root = this;
		
		this.showWatingView = function(){
			u$(".wating_wrap")[0].style.display="block";
		}
		this.hideWatingView = function(){
			u$(".wating_wrap")[0].style.display="none";
		}
	}
	w.wating = wating
})(window);