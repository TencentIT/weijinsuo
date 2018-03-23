/*
* @Author: Administrator
* @Date:   2017-11-10 20:34:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-20 20:20:05
*/

$(function(){	//入口函数 ，等文档加载完毕再执行
	function resize(){	//封装成一个resize函数，当浏览器宽度改变时就触发代码，可以多次执行，不封装成函数的话只能执行一次
		var windowWidth = $(window).width();
		 var isSmallScreen = windowWidth<768;
		 $('#main-ad > .carousel-inner > .item').each(function(i,item){
		 	 var $item = $(item);	//因为拿到的是DOM对象，需要转换
		 	 var imgSrc = $item.data(isSmallScreen ? 'image-sm' : 'image-lg');
		 	
 			$item.css('backgroundImage','url("'+imgSrc+'")');

 			// 需要小图时候，等比例缩放，所以加上img标签
		 	 if(isSmallScreen){
		 	 	$item.html('<img src="'+imgSrc+'" alt="" />');
		 	 }else{
		 	 	$item.empty();
		 	 }


		 });
	}

	$(window).on('resize',resize);
	//让window对象触发一下resize
	$(window).trigger('resize');

	//初始化tooltips插件
	$('[data-toggle="tooltip"]').tooltip();

	/**
	 * 控制标签页的标签宽度容器
	 */
	var $ulContainer  =  $('.nav-tabs');
	var width = 20;
	$ulContainer.children().each(function(index,element){
		// console.log(element.clientWidth);
		// console.log($(element).width());
		width += element.clientWidth;

	})
	console.log(width);
	// 判断当前ul宽度是否超过屏幕宽度，超过则显示滚动条
	if(width > $(window).width()){
		$ulContainer.css('width',width).parent().css('overflow-x','scroll');
	}

	// a注册点击事件
	var  $newsTitle = $('#news .news-title');
	$('#news .nav-pills li a').on('click',function(){
		var $this = $(this);
		var title = $this.data('title');
		$newsTitle.text(title);
	})

 

	//左滑右滑，判断左滑还是右滑，根据前后的x轴坐标来判断
	//1，获取界面上的轮播图容器，取到carousel元素
	var $carousel = $('.carousel');
	var startX;
	var endX;
	var offset=30;
	//注册滑动事件
	//手触摸开始时候记录所在的坐标X
	$carousel.on('touchstart',function(e){
		 startX =e.originalEvent.touches[0].clientX;
		console.log(startX);
	})
	//手触摸结束时候记录所在的坐标X
	$carousel.on('touchmove',function(e){
		 endX =e.originalEvent.touches[0].clientX;
		console.log(endX);
	})
	$carousel.on('touchend',function(e){
		var distance = Math.abs(startX-endX);
		if(distance > offset){
			// console.log(startX > endX ? '左':'右');
			// 根据获得的方向选择上一张  下一张
			// 用this   好点  避免多屏互动
			$(this).carousel(startX > endX ? 'next':'prev');  
		}
		
	})
});