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

/* 左侧分类的相关处理代码 */

(function(){

	var currentCategory = "";
	
	$(document).ready(function(){
		var length = 0;
		// Gdata.getExhibitionCategory({
			// "success" : function(data){
				// console.log("Gdata.getExhibitionCategory success");
				// console.log(data);
				// for(var index in data){
					// for(var i in data[index]){
						// var bbb = data[index][i]["categoryname"];
						// length ++;
						// if(length%2){
							// $(".cate_list").append("<li id='" + i + "' class='cate_li li_b item1'><span></span>" + bbb + "</li>");
						// }else{
							// $(".cate_list").append("<li id='" + i + "' class='cate_li li_a item1'><span></span>" + bbb + "</li>");
						// }
					// }
				// }
				// $('.cate_list>li').mouseenter(function(){
					// currentCategory = $(this);
					// var text = currentCategory.context.childNodes[1].data.replace(/\s/g,'');
					// $('.cate_con_title').html(text);
					// $('.categoryTwo').remove();
					// for(var index in exhibitionName){
						// if(index == currentCategory[0].id){
							// for(var j in exhibitionName[index]["data"])
							// {
								// $(".category").append("<div class='categoryTwo' id='" + j + "'>" + exhibitionName[index]["data"][j]["exhibitionname"] + "</div>");
							// }
							// break;
						// }
					// } 
					
					// $('.categoryTwo').mouseenter(function(){
						// this.style["text-decoration"] = "underline";
						// this.style["cursor"] = "pointer";
					// });
					// $('.categoryTwo').mouseleave(function(){
						// this.style["text-decoration"] = "none";
						// this.style["cursor"] = "default";
					// });
					// $(".categoryTwo").click(function(){
						// var currentSonCategory = $(this);
						// console.log("当前点击的为：" + currentSonCategory[0].id);
						// window.open("exhibition.html"+"?url=" + currentSonCategory[0].id + "/index.html");
					// });
					// showCategoryDetail();
				// });
			// }
		// });
		$('.categoryTwo').mouseenter(function(){
			this.style["text-decoration"] = "underline";
			this.style["cursor"] = "pointer";
		});
		$('.categoryTwo').mouseleave(function(){
			this.style["text-decoration"] = "none";
			this.style["cursor"] = "default";
		});
		var isIE=/*@cc_on!@*/0;      //是否IE浏览器
		if(isIE){
			$(window).scroll(function(){
				var st = $(document).scrollTop();
				console.log(st);
				if(st < 80){
					$(".category_wrap").css("top", 0 );
				}else{
					$(".category_wrap").css("top", st - 80);
				}
			});
		}else{
			//获取要定位元素距离浏览器顶部的距离
			var navH = $(".category_wrap").offset().top;
			//滚动条事件
			$(window).scroll(function(){
				//获取滚动条的滑动距离
				var scroH = $(this).scrollTop();
				//滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
				if(scroH>=navH){
					$(".category_wrap").css({"position":"fixed","top":0});
				}else if(scroH<navH){
					$(".category_wrap").css({"position":"static"});
				}
			});
		}
		$('.cate_li').mouseenter(function(){
            return;//chenyang20141211 disable this feature;
			var html ="";
			if(this.id=="li_1"){
				html = "<div class='categoryTwo'><a target='_blank' href='javascript:;'> </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>上海三瑞信息技术有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>上海华申智能卡应用系统有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>上海华虹计通智能系统股份有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>上海坤锐电子科技有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>上海宝信软件股份有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>上海聚星仪器有限公司 </a></div>";
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>上海英内电子标签有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>中京复电（上海）电子标签集成技术有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>兴唐通讯科技有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>北京凌瑞智同科技有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>北京标准信源科技有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>北京烽火联拓科技有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>华旭金卡股份有限公司 </a></div>";
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>南京三宝科技集团有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>南京软仪测试技术有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>天津中兴智联科技有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>山东省射频识别应用工程技术研究中心有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>中国人民解放军第三二○九工厂 </a></div>";
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>成都九洲电子信息系统股份有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>江苏军一物联网股份有限公司 </a></div>"+
				        // "<div class='categoryTwo'><a target='_blank' href='javascript:;'>深圳中兴长天 </a></div>"
				        // +"<div class='categoryTwo'><a target='_blank' href='javascript:;'>深圳航天华拓科技有限公司 </a></div>"
				        // +"<div class='categoryTwo'><a target='_blank' href='javascript:;'>重庆市城投金卡信息产业股份有限公司 </a></div>";
				$(".category").html(html);
			};
			if(this.id=="li_2"){
				html = "<div class='categoryTwo'><a target='_blank' href='javascript:;'> </a></div>"
				        // +"<div class='categoryTwo'><a target='_blank' href='javascript:;'>复旦大学</a></div>"
				        // +"<div class='categoryTwo'><a target='_blank' href='javascript:;'>广东工业大学</a></div>"
				        // +"<div class='categoryTwo'><a target='_blank' href='javascript:;'>重庆大学</a></div>";
				
				$(".category").html(html);
			};
			if(this.id=="li_3"){
				html = "<div class='categoryTwo'><a target='_blank' href='javascript:;'> </a></div>"
				        // +"<div class='categoryTwo'><a target='_blank' href='javascript:;'>中国电子技术标准化研究院</a></div>"				
				        // +"<div class='categoryTwo'><a target='_blank' href='javascript:;'>中国科学院沈阳自动化研究所</a></div>"				
				        // +"<div class='categoryTwo'><a target='_blank' href='javascript:;'>中国科学院自动化研究所</a></div>"				
				        // +"<div class='categoryTwo'><a target='_blank' href='javascript:;'>中国航天科工集团第二研究院706所</a></div>"				
				        // +"<div class='categoryTwo'><a target='_blank' href='javascript:;'>交通部科学研究院</a></div>"				
				        // +"<div class='categoryTwo'><a target='_blank' href='javascript:;'>公安部第三研究所</a></div>";
		
				$(".category").html(html);
			};
			// if(this.id=="li_4"){
				// html = "<div class='categoryTwo'><a target='_blank' href='http://3dly.net/diannao/'>上海集成电路技术与产业促进中心</a></div>"
				        // +"<div class='categoryTwo'><a target='_blank' href='javascript:;'>中国物流与采购联合会应急物流专业委员会</a></div>"				
				        // +"<div class='categoryTwo'><a target='_blank' href='javascript:;'>中国物品编码中心</a></div>"	;	
						// $(".category").html(html);
			// };
			// if(this.id=="li_5"){
				// html = "<div class='categoryTwo'><a target='_blank' href='http://3dly.net/yidongdianhua/'>移动电话</a></div>";
				// $(".category").html(html);
			// };
			// if(this.id=="li_6"){
				// html = "<div class='categoryTwo'><a target='_blank' href='http://3dly.net/shumachengxiang/'>数码成像</a></div>";
				// $(".category").html(html);
			// };
			// if(this.id=="li_7"){
				// html = "<div class='categoryTwo'><a target='_blank' href='http://3dly.net/dianzishu/'>电子书</a></div>";
				// $(".category").html(html);
			// };
			// if(this.id=="li_8"){
				// html = "<div class='categoryTwo'><a target='_blank' href='http://3dly.net/dianziyule/'>电子娱乐</a></div>";
				// $(".category").html(html);
			// };
			// if(this.id=="li_9"){
				// html = "<div class='categoryTwo'><a target='_blank' href='http://3dly.net/dianziyueqi/'>电子乐器</a></div>";
				// $(".category").html(html);
			// };
			// if(this.id=="li_10"){
				// html = "<div class='categoryTwo'><a target='_blank' href='http://3dly.net/dianzilipin/'>电子礼品</a></div>";
				// $(".category").html(html);
			// };
			// if(this.id=="li_11"){
				// html = "<div class='categoryTwo'><a target='_blank' href='http://3dly.net/dianzibaojian/'>电子保健</a></div>"+
				       // "<div class='categoryTwo'><a target='_blank' href='http://3dly.net/kangtehuanbao/'>空气清新剂</a></div>"+
					   // "<div class='categoryTwo'><a target='_blank' href='http://3dly.net/jiankun/'>供暖产品</a></div>";
				// $(".category").html(html);
			// };
			// if(this.id=="li_12"){
				// html = "<div class='categoryTwo'><a target='_blank' href='http://3dly.net/dengju/'>灯具</a></div>";
				// $(".category").html(html);
			// };
			showCategoryDetail();
		});
		
		// $('.cate_li').mouseleave(function(){
		// });
		$('.category_wrap').mouseleave(function(){
			hideCategoryDetail();
		});
		
		
	});

	function showCategoryDetail(){
		// if(currentCategory==""){
			// return;
		// }
		//alert(1);
		//$('.category_detail').css({"width":"0px"});
		$('.category_detail').css("display","block");
		$('.category_detail').animate({
			'width':'745px'
		},300);
	}

	function hideCategoryDetail(){
		$('.category_detail').css({"display":"none","width":"0px"});
		// currentCategory = "";
	}
	
	/* 获取所有分类数据 */
	function getCategory(args){
		// 参数判断，已经参数的获取

		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[search ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		// 查询一级分类
		if(!args["url"]){
			var url = "/web360/content/gen360/category.search?limit=0&sub=0&type=glue360/folder";
		}else{
		// 查询二级分类 
			var url = args["url"];
			url += ".search?limit=0&sub=0&type=glue360/folder";
		}
		
		// 发送ajax 请求
		$.ajax( {    
			url:url,// 跳转到 action
			// data:data,
			// cache:false,
			type:'get',      
			dataType:'json',    
			success:function(data) {
				// 成功的回调函数
				console.log("[getCategory SUCC]: success to getCategory!");
				console.log(data);
				args["success"](data);
			},    
			error : function(error) {
				// 失败的回调函数
				if(args["failed"] && typeof args["failed"] == "function"){
					args["failed"](error);
					return;
				}
				console.error("[getCategory ERROR]: failed to getCategory!");
				console.error(error);
				return;
			}    
		});  
	
	}
	
	/* 获取指定分类下的所有展厅 */
	function getAllExhibitionbyCategory(args){
		// 参数的判断
		if(!args["condition"]){
			console.error("[getAllExhibitionbyCategory ERROR]: args['condition'] is undefined!");
			return;
		}
		
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[search ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		// 拼接查询参数
		var condition = args["condition"];
		var url = "/web360/content/gen360/exhibitionlib.searchByCategory?condition=" + condition;
		
		console.log(url);
		// 发送ajax 请求
		$.ajax( {    
			url:url,// 跳转到 action
			// data:data,
			// cache:false,
			type:'get',      
			dataType:'json',    
			success:function(data) {
				// 成功的回调函数
				console.log("[getAllExhibitionbyCategory SUCC]: success to getAllExhibitionbyCategory!");
				console.log(data);
				args["success"](data);
			},    
			error : function(error) {
				// 失败的回调函数
				if(args["failed"] && typeof args["failed"] == "function"){
					args["failed"](error);
					return;
				}
				console.error("[getAllExhibitionbyCategory ERROR]: failed to getAllExhibitionbyCategory!");
				console.error(error);
				return;
			}    
		});
	}
	

})();