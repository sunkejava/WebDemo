window.onload=function(){
	waterfall('main','box');
	var dataInt = {"data":[{"src":"bg-1.jpg"},{"src":"bg-2.jpg"},{"src":"bg-3.jpg"},{"src":"bg-4.jpg"},{"src":"bg-5.jpg"},{"src":"bg-6.jpg"},{"src":"bg-7.jpg"},{"src":"bg-8.jpg"},{"src":"bg-9.jpg"},{"src":"bg-10.jpg"},{"src":"bg-11.jpg"},{"src":"bg-12.jpg"},{"src":"bg-13.jpg"},{"src":"bg-14.jpg"},{"src":"bg-15.jpg"},{"src":"bg-16.jpg"}]};
	window.onscroll = function(){
		 if(checkScrollSlide()){
			var oParent = document.getElementById('main');
			//渲染数据
			for(var i = 0;i<dataInt.data.length;i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = 'backimg/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
				oParent.appendChild(oBox);
				
			}
			waterfall('main','box');
		 }
		
	}
}
function waterfall(parent,box){
	//将main下的所有class为box元素取出来
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	//计算整个页面显示的列数
	var oBoxw = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxw);
	//设置main的宽
	oParent.style.cssText='width:'+oBoxw*cols+'px;margin:0 auto';
	var hArr = [];
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getMinHindex(hArr,minH);
			oBoxs[i].style.position='absolute';
			//oBoxs[i].style.left = oBoxw*index+'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
			oBoxs[i].style.top = minH+'px';
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}
	
	
	
}
//根据class获取元素
function getByClass(parent,clsName){
	var boxArr = new Array(), //用来储存取到的所有class为box的元素
		oElements=parent.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className == clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}
function getMinHindex(arr,val){
	for(var i in arr){
		if(arr[i] == val){
			return i;
		}
	}
}
//检测是否具备滚动加载图片的条件
function checkScrollSlide(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	return (lastBoxH<=scrollTop+height)?true:false;
}