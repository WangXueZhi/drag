function Drag(id,handle){
	console.info('拖拽对象为：'+id);

	var _this = this;
	
	this.oDiv = this.$(id);
	this.handle = handle ? this.$(handle) : this.oDiv;

	/*是否正在拖动*/
	this.istouching = false;

	/*保存元素每次拖动完成后的偏移量*/
	this.disX = 0;
	this.disY = 0;

	/*保存元素拖动过程中的偏移量*/
	this.translateX = 0;
	this.translateY = 0;

	/*保存鼠标或手指坐标*/
	this.mX = 0;
	this.mY = 0;

	/*初始化元素样式*/
	this.oDiv.style.position = 'absolute';
	this.oDiv.style.left = 0;
	this.oDiv.style.top = 0;

	/*是否支持touch事件*/
	this.touch = "ontouchend" in document ? true : false;
	console.info(this.touch ? '拖拽事件类型：touch' : '拖拽事件类型：mouse');

	/*设置触发事件类型*/
	this.dragstart = this.touch ? 'touchstart' : 'mousedown';
	this.dragmove = this.touch ? 'touchmove' : 'mousemove';
	this.dragend = this.touch ? 'touchend' : 'mouseup';

	//绑定事件
	this._moveDrag = this.dragMove.bind(this);
	this._endDrag = this.dragEnd.bind(this);

	/*监听拖拽触发*/
	this.addHandler(this.handle, this.dragstart, this.dragStart.bind(this));

}

Drag.prototype = {

	setEvent: function(ev){
		var oEvent = ev||event;
		oEvent = this.touch ? oEvent.touches[0] : oEvent;
		return oEvent;
	},

	updateMxAndMy: function(oEvent){
		this.mX = oEvent.clientX;
		this.mY = oEvent.clientY;
		console.info('触发点坐标为：'+this.mX+' , '+this.mY);
	},

	updateTranslate: function(oEvent){
		this.translateX = this.disX+oEvent.clientX-this.mX;
		this.translateY = this.disY+oEvent.clientY-this.mY;
		//console.info('更新Translate');
	},

	updateDis: function(){
		this.disX = this.translateX;
		this.disY = this.translateY;
	},

	dragStart: function(ev){
		console.info('开始拖拽');

		var _this = this;

		//设置回调参数(因为touch事件和mouse事件回调参数不同)
		var oEvent = this.setEvent(ev);

		this.updateMxAndMy(oEvent);

		this.addHandler(document, this.dragmove, this._moveDrag);
		this.addHandler(document, this.dragend, this._endDrag);

		//解决拖拽过程中会选中文本的问题
		event.preventDefault && event.preventDefault();
		this.handle.setCapture && this.handle.setCapture();
	},

	dragMove: function(ev){

		var oEvent = this.setEvent(ev);

		this.updateTranslate(oEvent);

		this.oDiv.style.WebkitTransform = 'translate('+this.translateX+'px,'+this.translateY+'px)';

		//解决拖拽过程中会选中文本的问题
		event.preventDefault && event.preventDefault();
	},

	dragEnd: function(){
		console.info('结束拖拽');
		this.updateDis();

		this.removeHandler(document, this.dragmove, this._moveDrag);
		this.removeHandler(document, this.dragend, this._endDrag);

		this.handle.releaseCapture && this.handle.releaseCapture();
	},

	//添加事件
	addHandler : function (oElement, sEventType, fnHandler)
	{
		return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
	},
	//删除事件
	removeHandler : function (oElement, sEventType, fnHandler)
	{
		return oElement.removeEventListener ? oElement.removeEventListener(sEventType, fnHandler, false) : oElement.detachEvent("on" + sEventType, fnHandler)
	},
	
	//获取id
	$ : function (id)
	{
		return typeof id === "string" ? document.getElementById(id) : id
	}
}


