/* 
 *  This file is part of the SPP(Superpolo Platform).
 *  Copyright (C) by SanPolo Co.Ltd.
 *  All rights reserved.
 *
 *  See http://spp.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://spp.spolo.org/
 *  Any copyright issues, please contact: copr@spolo.org
 */

(function(){

	$(document).ready(function(){
			var varsMap = Spolo.getUrlVars();
			var cid = varsMap["cid"];
			var cname = varsMap["cname"];
			cname = decodeURIComponent(cname);
			getExhibitions.call(this, cid, cname, 1, true);
			$(".home").click(function(){
				//window.location.href = "list.html";
				window.location.href = "index.html";
			});
	});
		
		function getExhibitions(cid, cname, page, init){
			var limit = 20;
			var offset = ((page - 1) * limit).toString();
			var options = {
				currentPage: 1,
				totalPages: 1,
				size:"large",
				onPageClicked: function(e, originalEvent, type, page){
					getExhibitions.call(this, cid, cname, page, false);
				}
			}
			if(cid == "hot"){
				console.log("热门展厅展示信息");
				Gdata.getHotExhibitions({
					"offset" : offset,
					"limit" : limit,
					"success" : function(data){
						options.totalPages = Math.ceil(data["totalNum"]/limit);
						if(options.totalPages<1){
							options.totalPages = 1;
						}
						if(init){
							createCurPos.call(this, cname);
							$("#pagination").bootstrapPaginator(options);
						}
						createItem.call(this, data, options);
					}
				});
			}else if(!cid || cid == "newest"){
				console.log("显示所有的展厅信息");
				//Gdata.getAllExhibition({
				//	"offset" : offset,
				//	"limit" : limit,
				//	"success" : function(data){
        //  // fake data
        //  data = {
        //    "totalNum": 120
        //  };
				//	options.totalPages = Math.ceil(data["totalNum"]/limit);
				//	if(options.totalPages<1){
				//		options.totalPages = 1;
				//	}
				//	if(init){
				//		createCurPos.call(this, "所有展厅");
				//		$("#pagination").bootstrapPaginator(options);
				//	}
				//	//createItem.call(this, data, options);
				//	}
				//});
			}else{
				console.log(cid + "展厅展示信息");
				Gdata.getExhibitionByCategory({
					"offset" : offset,
					"limit" : limit,
					"category" : cid,
					"success" : function(data){
						options.totalPages = Math.ceil(data["totalNum"]/limit);
						if(options.totalPages<1){
							options.totalPages = 1;
						}
						if(init){
							createCurPos.call(this, cname);
							$("#pagination").bootstrapPaginator(options);
						}
						createItem.call(this, data, options);
					}
				});
			}
		}
		
		function createCurPos(stringName){
			$(".exhinfo").append("<a class='placea'>"+stringName+"</a>");
		}
		
		function removeItem()
		{
			var moreList = $("#moreList");
			for(var index = 0; index < moreList[0].childNodes.length; index ++)
			{
				$(moreList[0].childNodes[index]).remove();
				index --;
			}
		}
		
		function createItem(data, options){
			console.log(data["totalNum"]);
			console.log(data["data"]);
			removeItem();
			var arrayItems = [];
			for(var key in data["data"]){
				console.log(key);
				console.log(data["data"][key]["visits"]);
				data["data"][key]["address"] = key;
				// for(var i = 0; i < 5; i ++)
					arrayItems.push(data["data"][key]);
			}
			
				$.each(arrayItems, function(index, item){
					var Visits = 0;
					if(item["visits"]){
						Visits = item["visits"];
					}
					$("#moreList").append("<div class='floor_item'>" +
											"<div class='divImg' id='" + item["address"] + "' title='点击查看详细商品展览'>" +
												"<a href=\"exhibition.html?url=" + item["address"] + "/index.html\" target=\"_blank\" style=\"display:inline-block;\" >"+
												"<img src='" + item["info"]["thumbnailurl"] + "' class='exhibitionImg'></img>" +
												"</a>"+
											"</div>" +
											"<a href=\"exhibition.html?url=" + item["address"] + "/index.html\" target=\"_blank\" style=\"color: #000;display:inline-block;\" class='exhibitionName' id='" + item["address"] + "' title='点击查看详细商品展览'>" +
												item["exhibitionname"] +
											"</a>" +
										"</div>");
										
					$('.exhibitionName').mouseenter(function(){
						this.style["text-decoration"] = "underline";
						this.style["cursor"] = "pointer";
					});
					$('.exhibitionName').mouseleave(function(){
						this.style["text-decoration"] = "none";
						this.style["cursor"] = "default";
					});
				});
				$("#moreList").append("<div class='clear'></div>");
			
		}
})();
