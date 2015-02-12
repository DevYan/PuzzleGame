$(function(){
	var box_height=0 ,
		box_width ;


	$('#pic').load(function(){
		//将游戏区域定为和图片同等大小
		$('#container')
			.height($(this).height()+2)
			.width($(this).width()+2);

		//给每一个拼图区块分配大小
		box_height = $(this).height()/4-4;
		box_width = $(this).width()/3-4;

		$('.box')
			.height(box_height)
			.width(box_width);
	})

	for (var i = 0; i < 12; i++) {
		var index = i+1;
		$('#container').append('<div class="box" id="box-'+index+'"></div>')
	}

	function place_pic(){
		if (box_width) {
			clearTimeout(t_img);
			for (var i = 0; i < 12; i++) {
				var index = i+1;
				$('#box-'+ index).css('background-position',(-1)*(i%3)*box_width+'px '
					+ Math.floor(i/3)*(-1)*box_height+'px');
			}
			$('#box-12').css('background',"#ddd");
		}
		else{
			var t_img = setTimeout(function(){place_pic()},500);
		}
	}
	place_pic();

	function randomBox(){
		var length = $('.box').length;
		while(length-1){
			var pop = parseInt(length*Math.random());
			$('#container').append(($('.box').eq(pop).remove()));
			//console.log($('.box').eq(pop).remove());
			length-=1;
		}
	}
	randomBox();

	$('.init').click(function(){
		randomBox();
	})

	$('.origin').click(function(){
		$('#pic').toggle();
	})

	$(document).on("click",".box",function(){
		var target_index = $('.box').index($(this)),
			target_x = Math.floor(target_index/3),
			target_y = target_index%3,
			blank_index = $('.box').index($('#box-12')),
			blank_x = Math.floor(blank_index/3),
			blank_y = blank_index%3;

		if ((target_x==blank_x)&&(Math.abs(target_y-blank_y)==1) ||
			(target_y==blank_y)&&(Math.abs(target_x-blank_x)==1)) {
			var target = $('.box').eq(target_index),
				blank = $('.box').eq(blank_index),
				tmp = $('<span/>').insertBefore(target);

			target.insertBefore(blank);
			blank.insertBefore(tmp);
			tmp.remove();
		}
	});
})