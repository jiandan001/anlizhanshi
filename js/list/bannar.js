/**
 *  This file is part of the Glue(Superpolo Glue).
 *  Copyright (C) by SanPolo Co.Ltd.
 *  All rights reserved.
 *
 *  See http://www.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://www.spolo.org/
 *  Any copyright issues, please contact: spolo@spolo.org
 *
 *  author : [caobin]
 **/


/* 处理置顶的三个展厅 */

$(document).ready(function() {

	// 初始化大图列表，设置默认显示的大图
	var curIndex = 0;
	// 图片切换的计时器
	var changeTimer;
	var previewList = $('.content.preview360>li');
	showPreview(previewList[curIndex]);
	$(".top3 a").removeClass("top3selected")
		.eq(curIndex).addClass("top3selected");

	// var p3handle = setInterval(function(){
	// 	playTop3();
	// },5000);

	/* 获取置顶的三个展厅数据 */

	function getTop3Data(suc) {
		// Gdata.getTop3Data({
			// success: function(data) {
				// suc(data);
			// }
		// });
	}

	/* 初始化置顶的三个展厅 */
	function initTop3(data){
		var $top3Huge = $(".top3_wrap .preview360 li");
		var $top3HugeLink = $top3Huge.find("a");
		var $top3Thumbnail = $(".top3_wrap .top3 img");

		var top3Data = data["data"];
		var top3Index = 0;
		for (var exhibitionUrl in top3Data) {
			if(top3Index >= 3){
				break;
			}
			var top3Obj = top3Data[exhibitionUrl];
			var infoData = top3Obj["info"];
			var url = "/web360/exhibition.html?url="+exhibitionUrl;
			var hugeImg = infoData["thumbnailurl"];
			var thumbnail = infoData["thumbnailurl"];
			//$($top3Huge[top3Index]).css("backgroundImage","url("+hugeImg+")");
			//$($top3Thumbnail[top3Index]).css("backgroundImage","url("+thumbnail+")");
			$($top3HugeLink[top3Index]).attr("href",url);
			top3Index++;
		}
	}

	function playTop3() {
		var index = parseInt(curIndex) + 1;
		if (index == previewList.length) {
			index = 0;
		}
		var id = "preview_" + index;
		var src = $('#' + id).attr('src');
		if (curIndex != index) {
			$(".top3 a").removeClass("top3selected")
				.eq(index).addClass("top3selected");
			hidePreview(previewList[curIndex]);
			showPreview(previewList[index]);
			$(previewList[index]).css("backgroundImage", src);
			curIndex = index;
		}
	}

	function changePreview(index, previewList, delay) {
		if (!index || isNaN(index)) {
			console.error('changePreview index parameter is invalid!');
			return;
		}
		if (curIndex != index) {
			changeTimer = setTimeout(function() {
				var id = "preview_" + index;
				var src = $('#' + id).attr('src');
				$(".top3 a").removeClass("top3selected")
					.eq(index).addClass("top3selected");
				hidePreview(previewList[curIndex]);
				showPreview(previewList[index]);
				curIndex = index;
			}, delay);
		}
	}

	function hidePreview(domObj) {
		$domObj = $(domObj);
		$domObj.css("zIndex", 1);
		$domObj.stop(true, false).animate({
			opacity: 0
		}, 250);
	}

	function showPreview(domObj) {
		$domObj = $(domObj);
		$domObj.css("zIndex", 9);
		$domObj.stop(true, false).animate({
			opacity: 1
		}, 250);
	}
	//初始化热门前三
	getTop3Data(initTop3);

	$('.top3').find('img').hover(
		function() {
			var index = $(this).attr('id').replace('preview_', '');
			changePreview(index, previewList, 500);
		},
		function() {
			if (changeTimer) {
				clearTimeout(changeTimer);
			}
		}
	);
	$('.top3').find('img').click(
		function() {
			if (changeTimer) {
				clearTimeout(changeTimer);
			}
			var index = $(this).attr('id').replace('preview_', '');
			changePreview(index, previewList, 0);
		}
	);
	//滑入 停止动画，滑出开始动画.
	$('.top3_wrap').hover(function() {
		clearInterval(adTimer);
	}, function() {
		adTimer = setInterval(function() {
			playTop3();
		}, 5000);
	}).trigger("mouseleave");
}); 