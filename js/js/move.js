function getStyleAttr(obj,attr) {
  	if(window.getComputedStyle) { //支持IE9+, 谷歌, 火狐..	
  		return getComputedStyle(obj,null)[attr];
  	}else{
		return obj.currentStyle[attr]; //支持IE8-
    }
}
//obj 对象
//attr 属性
//target 目标值
//s 定时器速度
//fn 回调函数
function move(obj,attr,target,s,fn){
	clearInterval(obj.timer);
	//1.目标值
	if(attr=="opacity"){
		target = target*100;
	}else{
		target = target;
	}	
	obj.timer = setInterval(function(){			
		//2.获取当前值
		if(attr=="opacity"){
			var start = parseFloat(getStyleAttr(obj,attr))*100;
		}else{
			var start = parseInt(getStyleAttr(obj,attr));
		}
		//3.给一个速度
		var speed = (target-start)/5;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		console.log(target+","+start);
		//4.开始运动
		if(start==target){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}else{
			if(attr=="opacity"){
				obj.style.opacity = (start+speed)/100;
				obj.style.filter="alpha(opacity="+start+speed+")";
			}else{
				obj.style[attr] = start+speed+"px";
			}			
		}
	},s)
}
