/**
 * Created by wang1 on 15/12/25.
 */
function ScrollBox(id,parentid,option){

    LimitDrag.call(this,id,parentid);

    this.dom = document.getElementById(option.domID);
    this.cWidth = option.containWidth;
    this.bWidth = option.barWidth;

    this.box = this.dom.getElementsByClassName('woqu-scrollbox')[0];
    this.contain = this.box.getElementsByClassName('woqu-scrollcontain')[0];
    this.bar = this.box.getElementsByClassName('woqu-scrollbar')[0];
    this.handle = this.bar.getElementsByClassName('woqu-scrollbar-handle')[0];

    this.box.style.overflow = 'hidden';
    this.contain.style.width = this.cWidth;
    this.bar.style.width = this.bWidth;
    this.handle.style.height = this.dom.offsetHeight/this.contain.offsetHeight*this.dom.offsetHeight+'px';

    //this.init();
}

//原型继承
woqu.extends(LimitDrag,ScrollBox);

ScrollBox.prototype.dragMove = function(ev){
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

    var scroll = pY/(this.dom.offsetHeight-this.handle.offsetHeight)*(this.dom.offsetHeight-this.contain.offsetHeight);

    this.contain.style.WebkitTransform = 'translate(0,'+(scroll)+'px)';

    //解决拖拽过程中会选中文本的问题
    event.preventDefault && event.preventDefault();
}