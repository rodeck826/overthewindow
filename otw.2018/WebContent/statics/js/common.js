!(function(w){
	
	Date.prototype.format = function(f){
		if(!this.valueOf()) return "";
		 
		var weekName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var d = this;
		 
		return f.replace(/(yyyy|yy|MM|dd|W|hh|mi|ss|a\/p)/gi, function($1) {
	        switch ($1) {
	            case "yyyy": return d.getFullYear();
	            case "yy": return (d.getFullYear().toString().substr(2,4));
	            case "MM": return (d.getMonth() + 1).toString().lpad("0",2);
	            case "mm": return (d.getMonth() + 1).toString().lpad("0",2);
	            case "dd": return d.getDate().toString().lpad("0",2);
	            case "W": return weekName[d.getDay()];
	            case "HH": return d.getHours().toString().lpad("0",2);
	            case "hh": return ((h = d.getHours() % 12) ? h : 12).toString().lpad("0",2);
	            case "mi": return d.getMinutes().toString().lpad("0",2);
	            case "ss": return d.getSeconds().toString().lpad("0",2);
	            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
	            default: return $1;
	        }
	    });
	};	
	String.prototype.lpad = function(len,size){var s='';for(i=0;i<size-this.length;i++){s+=len;}return s+""+this};
	
	String.prototype.rpad = function(len,size){var s='';for(i=0;i<size-this.length;i++){s+=len;}return this+""+s};


	if (!String.prototype.startsWith) {
	    String.prototype.startsWith = function(searchString, position){
	      position = position || 0;
	      return this.substr(position, searchString.length) === searchString;
	  };
	}

	Number.prototype.numberWithCommas = function(){return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");}
	
	if (!('remove' in Element.prototype)) {
	    Element.prototype.remove = function() {
	        if (this.parentNode) {
	            this.parentNode.removeChild(this);
	        }
	    };
	}
	
})(window);