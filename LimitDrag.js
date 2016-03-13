function LimitDrag(id,parentId,handle){
	//继承属性
	Drag.call(this,id,handle);

	this.parentDom = document.documentElement;

	if(parentId){
		this.parentDom = document.getElementById(parentId);
		//this.parentDom.style.position = 'relative';
		this.parentDom.appendChild(this.oDiv);
	}

}

//原型继承
woqu.extends(Drag,LimitDrag);

LimitDrag.prototype.dragMove = function(ev){
	var oEvent = this.setEvent(ev);

	this.updateTranslate(oEvent);

	var pX = this.translateX+this.oDiv.offsetLeft;
	var pY = this.translateY+this.oDiv.offsetTop;



	if (pX<0)
	{
		pX = 0;
	}
	else if(pX>this.parentDom.clientWidth-this.oDiv.offsetWidth)
	{
		pX = this.parentDom.clientWidth-this.oDiv.offsetWidth;
	}

	if (pY<0)
	{
		pY = 0
	}
	else if(pY>this.parentDom.clientHeight-this.oDiv.offsetHeight)
	{
		pY = this.parentDom.clientHeight-this.oDiv.offsetHeight;
	}

	this.oDiv.style.WebkitTransform = 'translate('+pX+'px,'+pY+'px)';

	this.translateX = pX-this.oDiv.offsetLeft;
	this.translateY = pY-this.oDiv.offsetTop;

	//解决拖拽过程中会选中文本的问题
	event.preventDefault && event.preventDefault();
}

