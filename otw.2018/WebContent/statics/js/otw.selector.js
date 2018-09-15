/*!
 * javascript util library JavaScript Library v0.0.1
 * http://www.overthewindow.net
 *
 * author : rodeck. 
 * 
 * 
 */
(function(wiondow,undefined){
	
	"use strict";
	
	var u$ = function(selector,context){
		return new u$.fn.init(selector,context);
	}
	
	u$.fn = u$.prototype = {
			version : "0.0.1",
			constructor:u$,
			init:function(sel,ctx){
				if(!sel) return this;
				
				if(typeof sel ==="string"){
					this.context = _getObj(sel,this);
					this.length = this.context.length;
					this.selector = sel;
					return this;
				}else if(typeof sel =="object"){
					this.context[0] = this[0] = sel;
					this.length = 1;
					this.selector = "object";
					return this;
				}
					
			},
			context:[],
			seleector:"",
			length:0,
			get:function(idx){
				this[0] = this.context[idx];
				this.context = [];
				this.context[0] = this[0];
				this.length = 1;
				this.selector = this.selector+":eq("+idx+")";
				return this;
			},
			css:function(type){
				return _getCssStyle(this[0],type);
			},
			isVisible:function(){
				if(this.length==1){
					return _isVisible(this[0]);
				}else{
					return false;
				}
			},
			find:function(selector){
				this.context = _getObj(selector,this,this.context[0]);
				this.length = this.context.length;
				this.selector = this.selector+" "+selector;
				return this;
			},
			forEach:function(fn){
				for(var i=0;i<this.length;i++){
					fn(this.context[i]);
				}
			},
			fadeIn:function(fn){
				
				_fadeIn(this.context[0],0,fn);
			},
			fadeOut:function(fn){
				_fadeOut(this.context[0],0,fn);
			},
			animate:function(type,st,ed,speed,fn,idx){
				_eventAnimate(this.context[0],type,st,ed,speed,fn,idx);
			},
			sort :[].sort,
			splice:[].splice
			
	};
	u$.promise = function(fn){
		var callback=null;
		var isCaller = false;
		fn(function(){
			if(typeof callback =='function'){
				callback();
			}else{
				isCaller = true;
			}
		});
		
		return {
			then:function(fn2){
				callback = fn2;
				if(isCaller) callback();
			}};
	};
	
	u$.ajax = function(url,data,fn){
		wating.showWatingView();
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function(){
			if(httpRequest.readyState==4 && httpRequest.status==200){
				setTimeout(function(){wating.hideWatingView();},500);
				fn(httpRequest.response);
			}
		}
		httpRequest.open('GET',url);
		httpRequest.send(data);
	};
	u$.post = function(url,data,fn){
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function(){
			if(httpRequest.readyState==4 && httpRequest.status==200){
				fn(httpRequest.response);
			}
		}
		httpRequest.open('POST',url);
		httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
		httpRequest.send(_objectToString(data));
	}
	function _getCssStyle(obj,style){
		var cssStyle="";
		if(obj.style[style]==""){
			cssStyle= window.getComputedStyle(obj).getPropertyValue(style)
		}else{
			cssStyle = obj.style[style];
		}
		return cssStyle;
		
	}
	function _objectToString(obj){
		return Object.keys(obj).reduce(function(str,key,i){
			var deli,val;
			deli = (i===0)?'':'&';
			val = obj[key];
			return [str,deli,key,"=",val].join('');
		},'');
	}
	function _fadeIn(obj,idx,fn){
		var step = 1/20;
		
		if(idx==0){
			obj.style.opacity=0;
			obj.style.display="block";
		}
		obj.style.opacity = step*idx;
		idx +=1;
		if(idx<21){
			setTimeout(function(){_fadeIn(obj,idx,fn)},25);
		}else{
			if(typeof fn ==="function") fn(obj);
		}
		
	}
	function _fadeOut(obj,idx,fn){
		var step = 1/20;
		
		if(idx==0){
			obj.style.opacity=1;
		}
		obj.style.opacity = (step*(20-idx));
		
		idx +=1;
		if(idx<21){
			setTimeout(function(){_fadeOut(obj,idx,fn)},25);
		}else{
			
			if(typeof fn ==="function") fn(obj);
			obj.style.display="none";
		}
		
	}
	
	function _getObj(sel,obj,elem){
		var result = [];
		
		if(typeof elem ==='undefined') elem = document;
		
		if(!sel) return result;
		
		result = elem.querySelectorAll(sel);
		for(var i=0;i<result.length;i++){
			obj[i] = result[i];
		}
		return result;
		
	}
	function _isVisible(elem){
		return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
	}
	
	function _eventAnimate(obj,type,st,ed,speed,fn,idx){
		var diff = st-ed;
		if(typeof speed =="undefined")speed = 50;
		var step =diff/speed;
		if(typeof idx =='undefined') idx=0;
		
		if(type=="top"){
			obj.style["transform"]="translate3d(0px, "+ (Number(st)-Number(step*idx))+"px, 0px)";
		}else if(type=="right"){
			obj.style["transform"]="translate3d("+(Number(st)-Number(step*idx))+"px, 0px, 0px)";
			
		}else if(type=="left"){
			obj.style["transform"]="translate3d("+(Number(st)-Number(step*idx))+"px, 0px, 0px)";
		}else if(type=="bottom"){
			obj.style["transform"]="translate3d(0px, "+ (Number(st)-Number(step*idx))+"px, 0px)";
			
		}else{
			obj.style[type] = (Number(st)-Number(step*idx))+"px";
		}
		idx=idx+1;
		if(idx<speed+1){
			var acc = 0;
			if(idx<(speed*0.2) || idx>(speed-(speed*0.2)))acc=15;
			else if(idx<(speed*0.26) || idx>(speed-(speed*0.26))) acc=6;
			else if(idx<(speed*0.36) || idx>(speed-(speed*0.36))) acc=3;
			else acc=-3;
			
			setTimeout(function(){_eventAnimate(obj,type,st,ed,speed,fn,idx)},10+acc) ;
		}else{
			if(typeof fn =="function")fn();
		}
	}
	
	
	
	u$.fn.init.prototype = u$.fn;
	
	wiondow.u$ = u$;
	
	if ( typeof define === "function" && define.amd && define.amd.u$ ) {
		define( "u$", [], function () { return u$; } );
	}
	
	
})(window);