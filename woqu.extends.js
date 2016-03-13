(function(woqu){
	
	//原型继承
	woqu.extends = function(a,b){
		for(var i in a.prototype){
			b.prototype[i]=a.prototype[i];
		}
	}

}(window.woqu = window.woqu || {}))