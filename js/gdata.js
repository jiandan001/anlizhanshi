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

/* 处理楼层的数据获取与解析 */
var Gdata = null;
(function(){
	// 将$.ajax get进行封装
	function ajaxGet(args){
		// 进行参数的判断
		if(!args["url"]){
			console.error("[ajaxGet ERROR]: url is undefined!");
			return;
		}else{
			var url = args["url"];
		}
		
		if(!args["data"]){
			var data = {};
		}else{
			var data = args["data"];
		}
		
		if(!args["cache"]){
			var cache = false;
		}else{
			var cache = true;
		}
		
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[ajaxGet ERROR]: args['success'] is undefined or not function!");
			return;
		}
		
		// 发送ajax 请求
		$.ajax( {    
			url:url,// 跳转到 action    
			data:data,
			cache:cache,
			type:'get',      
			dataType:'json',    
			success:function(data) { 
				// 成功的回调函数
				//console.log("[ajaxGet SUCC]: success to ajaxGet!");
				// console.log(data);
				args["success"](data);
			},    
			error : function(error) {    
				// 失败的回调函数
				if(args["failed"] && typeof args["failed"] == "function"){
					args["failed"](error);
					return;
				}
				console.error("[ajaxGet ERROR]: failed to ajaxGet!");
				console.error(error);
				return;
			}    
		});  
	}

	// iframe 下载
	function downloadURL(url){
		
		var hiddenIFrameID = 'hiddenDownloader',
        iframe = document.getElementById(hiddenIFrameID);
	    if (iframe === null) {
	        iframe = document.createElement('iframe');
	        iframe.id = hiddenIFrameID;
	        iframe.style.display = 'none';
	        document.body.appendChild(iframe);
	    }
	    iframe.src = url;	

	}
	
	
	Gdata = new Object();
	
	// // 例子
	// Gdata.getHotExhibitions({
		// "offset" : 0,
		// "limit" : 6,
		// "success" : function(data){
			// console.log(data);
			// for(var key in data["data"]){
				// console.log(key);
				// console.log(data["data"][key]["visits"]);
			// }
		// }
	// });
	/* 获取热门展厅数据  ， 按访问量降序 */
	Gdata.getHotExhibitions = function(args){
		// 参数判断，已经参数的获取
		if(!args["limit"]){
			var limit = 0;
		}else{
			var limit = args["limit"];
		}
		
		if(!args["offset"]){
			var offset = 0;
		}else{
			var offset = args["offset"];
		}
		
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[getHotExhibitions ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		var url = "/web360/content/gen360/publish.searchByVisits";
		var data = {};
		data["limit"] = limit;
		data["offset"] = offset;
		// console.log(url);
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : true,
			"success" : function(data){
				// console.log(data);
				args["success"](data);
			}
		});
		
	}
	
	// // 测试
	// Gdata.getExhibitionByCategory({
		// "category" : "/content/gen360/category/a/a1",
		// "success" : function(data){
			// console.log(data);
		// }
	// });
	
	/* 获取餐饮美食数据  ， 更新时间降序 */
	
	/* 获取户外用品数据  ， 更新时间降序  */

	/* 获取珠宝玉器数据  ， 更新时间降序  */
	
	Gdata.getExhibitionByCategory = function(args){
		
		// 参数判断，已经参数的获取
		if(!args["category"]){
			console.error("[getExhibitionByCategory ERROR]: args['condition'] is undefined!");
			return;
		}else{
			var condition = args["category"];
		}
		
		if(!args["limit"]){
			var limit = 0;
		}else{
			var limit = args["limit"];
		}
		
		if(!args["offset"]){
			var offset = 0;
		}else{
			var offset = args["offset"];
		}
		
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[getExhibitionByCategory ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		var url = "/web360/content/gen360/publish.searchByCategory";
		var data = {};
		data["1_category"] = condition;
		data["limit"] = limit;
		data["offset"] = offset;

		// console.log(url);
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : true,
			"success" : function(data){
				// console.log(data);
				args["success"](data);
			}
		});
		
	}
	
	// // 测试
	// Gdata.getAllExhibition({
		// "success" : function(data){
			// console.log(data);
		// }
	// });
	/* 获取所有展品 */
	Gdata.getAllExhibition = function(args){
		
		// 参数判断，已经参数的获取
		if(!args["limit"]){
			var limit = 0;
		}else{
			var limit = args["limit"];
		}
		
		if(!args["offset"]){
			var offset = 0;
		}else{
			var offset = args["offset"];
		}
		
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[getAllExhibition ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		var url = "/web360/content/gen360/publish.searchByCategory";
		var data = {};
		data["limit"] = limit;
		data["offset"] = offset;

		// console.log(url);
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : true,
			"success" : function(data){
				// console.log(data);
				args["success"](data);
			}
		});
		
	}
	
	// // 测试
	// Gdata.getTop3Data({
		// "success" : function(data){
			// console.log(data);
		// }
	// });
	/* 获取置顶的三个展厅数据 */
	Gdata.getTop3Data = function(args){
		// 参数判断，已经参数的获取
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[getHotExhibitions ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		var url = "/web360/content/gen360/publish.searchByStick";
		var data = {};
		data["limit"] = 3;
		data["offset"] = 0;

		console.log(url);
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : true,
			"success" : function(data){
				// console.log(data);
				args["success"](data);
			}
		});
	}
	
	// // 实例
	// Gdata.login({
		// "username" : "admin",
		// "password" : "admin",
		// "success" : function(){
			// console.log("Gdata.login success!");
		// },
		// "error" : function(error){
			// console.log("Gdata.login failed",error);
		// }
	// });
	/* 登录glue360 */
	Gdata.login = function(args){
		// 参数判断
		if(!args["username"]){
			console.error("[Gdata.login ERROR]: args.username is undefined!");
			return;
		}
		if(!args["password"]){
			console.error("[Gdata.login ERROR]: args.password is undefined!");
			return;
		}
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.login ERROR]: args.success id undefined or not function!");
			return;
		}
		
		// 获取参数
		var username = args["username"];
		username = Spolo.encodeUname(username);
		var password = args["password"];
		// 对用户的密码进行编码
		password = encodeURIComponent(password);

		// 发送ajax 请求	
		$.ajax({
			type : 'POST',
			url : "/j_security_check",
			data : "_charset_=UTF-8&resource=/&selectedAuthType=form&j_username="+username+"&j_password="+password,
			success : function(data,textStatus){
				// window.location.href = "/index2.html";
				args["success"]();
				return;
			},
			error : function(error){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](error);
//					console.error("[Gdata.login failed]: login web360 failed");	
					return;
				}
				console.error("[Gdata.login failed]: login web360 failed");
				return;
			},
			dataType : 'text'
			
		});
		
	}
	
	// 实例
	// Gdata.register({
		// "userID" : "user1234567",
		// "password" : "1234567",
		// "phone" : "中国",
		// "company" : "科技",
		// "linkman" : "公司",	
		// "success" : function(data){
			// console.log("Gdata.register success");
			// console.log(data);
		// },
		// "error" : function(error){
			// console.log("Gdata.register failed");
			// console.log(error);
		// }
	// });
	
	
	/* web360 用户注册 */
	Gdata.register = function(args){
		// 参数判断
		if(!args["userID"]){
			console.error("[Gdata.register ERROR]: args.userID is undefined!");
			return;
		}
		if(!args["password"]){
			console.error("[Gdata.register ERROR]: args.password id undefined!");
			return;
		}
		
		// 获取参数
		var userID = args["userID"];
			// 将用户名进行编码处理
		userID = Spolo.encodeUname(userID);
		
		var password = args["password"];
		
		var data = {};
		data["userID"] = userID;
		data["password"] = password;
		
		if(args["phone"]){
			var phone = args["phone"];
			data["phone"] = phone;
		}
		
		if(args["company"]){
			var company = args["company"];
			data["company"] = company;
		}
		
		if(args["linkman"]){
			var linkman = args["linkman"];
			data["linkman"] = linkman;
		}
		
		// 发送ajax 请求	
		$.ajax({
			type : 'get',
			url : "/web360/content.createUser",
			data : data,
			success : function(data,textStatus){
				console.log(data);
				if(data.suc){
					args["success"](data);
					return;	
				}else{
					if(args["error"] && typeof args["error"] == "function"){
						args["error"](data);
						console.error("[Gdata.register failed]: register web360 failed");	
						return;
					}
					console.error("[Gdata.register failed]: register web360 failed");
					console.error(data);
					return;
				}
				
				return;
			},
			error : function(error){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](error);
					console.error("[Gdata.register failed]: register web360 failed");	
					return;
				}
				console.error("[Gdata.register failed]: register web360 failed");
				console.error(error);
				return;
			},
			dataType : 'json'
			
		});
		
	}
	
	// 实例
	// Gdata.validataUsername({
		// "username" : "admin",
		// "success" : function(data){
			// console.log(data);
		// }
	// });
	
	/* 判断用户名是否已经存在 */
	Gdata.validataUsername = function(args){
		// 参数判断
		if(!args["username"]){
			console.error("[Gdata.validataUsername ERROR]: args.username is undefined!");
			return;
		}
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.validataUsername ERROR]: args.success is undefined or not function!");
			return;
		}
		// 获取数据
		var username = args["username"];
		
		var url = "/web360/content.validateUsername";
		var data = {};
		data["username"] = Spolo.encodeUname(username);
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : false,
			"success" : function(data){
				args["success"](data.suc);
				return;	
			}
		});
	}
	
	// 实例
	// Gdata.logout({
		// "success" : function(){
			// console.log("Gdata.logout success!");
		// },
		// "error" : function(error){
			// console.log("Gdata.logout failed!");
			// console.log(error);
		// }
	// });
	/* 用户登出 */
	Gdata.logout = function(args){
		// 参数判断
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.logout ERROR]: args.success is undefined!");
			return;
		}
		
		var url = "/system/sling/logout.html";
		var data = {};
		
		// 发送ajax 请求
		$.ajax({
			"url" : url,
			"type" : "get",
			"cache" : false,
			"success" : function(){
				args["success"]();
				return;
			},
			"error" : function(error){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](error);
					return;
				}
				console.error("[Gdata.logout ERROR]: logout failed");
				console.error(error);
				return;
			},
			"dataType" : "text"
		});
		
	}
	
	// 实例
	// Gdata.setUserRole({
	// 	"userID" : "4@4.com",
	// 	"role" : "maker",
	// 	"success" : function(data){
	// 		console.log("Gdata.setUserRole success!");
	// 		console.log(data);
	// 	},
	// 	"error" : function(err){
	// 		console.log("Gdata.setUserRole failed!");
	// 		console.log(err);
	// 	}

	// });
	/* Gdata.setUserRole 设置用户的角色admin,normalAdmin,user、maker*/
	Gdata.setUserRole = function(args){
		
		// 参数判断
		if(!args["userID"]){
			console.error("[Gdata.setUserRole ERROR]: args.userID is undefined!");
			return;
		}

		if(!args["role"]){
			console.error("[Gdata.setUserRole ERROR]: args.role is undefined!");
			return;
		}

		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.setUserRole ERROR]: args.success is undefined or not function!");
			return;
		}

		var userID = args["userID"];
		userID = Spolo.encodeUname(userID);

		var role = args["role"];
		if(role != "admin" && role != "user" && role != "maker" && role !="normalAdmin"){
			console.error("[Gdata.setUserRole ERROR] args.role is not admin, normalAdmin,user or maker");
			return;	
		}

		var url = "/web360/content/users/" + userID + ".setUserRole";
		var data = {};
		data["userID"] = userID;
		data["role"] = role;

		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : false,
			"success" : function(data){
				// console.log(data);
				if(data.suc){
					args["success"](data);
					return;
				}
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](data);
					return;
				}
				console.error("[Gdata.setUserRole ERROR]: failed to setUserRole!");
				console.error(data);
				return;

			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.setUserRole ERROR]: failed to setUserRole!");
				console.error(err);
				return;
			}
		});

	} 
	// 实例
	// Gdata.getUserRole({
	// 	"userID" : "4@4.com",
	// 	"success" : function(data){
	// 		console.log("Gdata.getUserRole success!");
	// 		console.log(data);
	// 	},
	// 	"error" : function(err){
	// 		console.log("Gdata.getUserRole failed!");
	// 		console.log(err);
	// 	}

	// });
	/* Gdata.getUserRole 得到用户的role(admin,maker,user)*/
	Gdata.getUserRole = function(args){
		
		// 参数判断
		if(!args["userID"]){
			console.error("[Gdata.setUserRole ERROR]: args.userID is undefined!");
			return;
		}

		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.setUserRole ERROR]: args.success is undefined or not function!");
			return;
		}

		var userID = args["userID"];
		userID = Spolo.encodeUname(userID);

		var url = "/web360/content/users/" + userID + ".getRole";
		var data = {};
		data["userID"] = userID;

		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : false,
			"success" : function(data){

				args["success"](data);
				return;
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.getUserRole ERROR]: failed to getUserRole!");
				console.error(err);
				return;
			}
		});

	} 

	// 实例
	// Gdata.searchUser({
	// 	"offset" : "0",
	// 	"limit" : "1",
	// 	"condition" : "admin",
	// 	"success" : function(data,totalNum){
	// 		console.log("Gdata.searchUser success");
	// 		console.log(data);
	// 		console.log("matched result");
	// 	
	// 	}
	// });
	/* searchUser 搜索用户*/
	Gdata.searchUser = function(args){

		// 参数判断
		
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.searchUser ERROR]: args.success is undefined or not function!");
			return;
		}

		var url = "/web360/content/users.search"
		var data = {};
		data["sub"] = 0;
		data["isiframe"] = 0;

		if(args["condition"]){
			var condition = args["condition"];
			condition = Spolo.encodeUname(condition);
			data["0_userID"] = condition.substring(1);
		}

		if(args["offset"]){
			var offset = args["offset"];
			data["offset"] = offset;
		}

		if(args["limit"]){
			var limit = args["limit"];
			data["limit"] = limit;
		}

		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : false,
			"success" : function(data){
				// console.log(data);
				for(var username in data["data"]){
						
					var nodeName = data["data"][username]["nodeName"];
					nodeName = Spolo.decodeUname(nodeName);
					data["data"][username]["userID"] = nodeName;
													
				}

				args["success"](data);

				return;	
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.searchUser ERROR]: failed to searchUser!");
				console.error(err);
				return;
			}
		});



	}
	

	// 实例
	// Gdata.getUserByID({
	//	"condition" : "admin",
	// 	"success" : function(data){
	// 		console.log("Gdata.getUserByID success");
	// 		console.log(data);
	// 		for(var user in data){
	// 			console.log(user);
	// 			console.log(data[user]);
	// 		}
	// 	}
	// });
	/* getUserByID 根据用户名进行搜索信息*/
	Gdata.getUserByID = function(args){

		// 参数判断
		if(!args["condition"]){
			console.error("[Gdata.getUserByID ERROR]: args.condition is undefined!");
			return;
		}

		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.getUserByID ERROR]: args.success is undefined or not function!");
			return;
		}

		var url = "/web360/content/users.search"
		var data = {};
		data["sub"] = 0;
		data["isiframe"] = 0;
		
		var condition = args["condition"];
		condition = Spolo.encodeUname(condition);
		data["0_userID"] = condition;
		
		
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : true,
			"success" : function(data){
				// console.log(data);
					if(data && data["totalNum"]==1){
						var userData = {};
						var data = data["data"];
						for(var userpath in data){
							data = data[userpath];
							
							userData["userID"] = Spolo.decodeUname(data["nodeName"]);

							if(data["phone"]){
								userData["phone"] = data["phone"];
							}

							if(data["linkman"]){
								userData["linkman"] = data["linkman"];
							}

							if(data["company"]){
								userData["company"] = data["company"];
							}

							if(data["role"]){
								userData["role"] = data["role"];
							}
						}
					}

					args["success"](data);

					return;	
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.getUserByID ERROR]: failed to getUserByID!");
				console.error(err);
				return;
			}
		});



	}

	// 示例
	// Gdata.getAllOrders({
	// 	"success" : function(data){
	// 		console.log("Gdata.getAllOrders success!");
	// 		console.log(data);
	// 	},
	// 	"error" : function(err){
	// 		console.error("Gdata.getAllOrders failed!");
	// 		console.error(err);
	// 	}
	// });
	/* 获取所有的订单 */
	Gdata.getAllOrders = function(args){
		// 参数判断，已经参数的获取
		if(!args["limit"]){
			var limit = 0;
		}else{
			var limit = args["limit"];
		}
		
		if(!args["offset"]){
			var offset = 0;
		}else{
			var offset = args["offset"];
		}
		
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.getAllOrders ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		var url = "/web360/content/users.searchOrders";
		var data = {};
		data["limit"] = limit;
		data["offset"] = offset;
		
		// console.log(url);
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : false,
			"success" : function(data){
				// console.log(data);
				args["success"](data);
				return;
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.getAllOrders ERROR]: failed to getAllOrders!");
				console.error(err);
				return;
			}
		});
		
	}

	// 示例
	// Gdata.getOrdersByMaker({
	// 	"success" : function(data){
	// 		console.log("Gdata.getOrdersByMaker success!");
	// 		console.log(data);
	// 	},
	// 	"error" : function(err){
	// 		console.error("Gdata.getOrdersByMaker failed!");
	// 		console.error(err);
	// 	}
	// });
	/* 获取当前制作人员的订单 */
	Gdata.getOrdersByMaker = function(args){
		// 参数判断，已经参数的获取
		if(!args["limit"]){
			var limit = 0;
		}else{
			var limit = args["limit"];
		}
		
		if(!args["offset"]){
			var offset = 0;
		}else{
			var offset = args["offset"];
		}
		
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.getOrdersByMaker ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		var maker = Spolo.getUserId();
		if(maker && maker != "anonymous"){
			maker = maker;
		}else{
			console.error("[Gdata.getOrdersByMaker ERROR]: Maybe the login session is lost,please login again!");
			return;
		}

		var url = "/web360/content/users.searchOrdersByMaker";
		var data = {};
		data["limit"] = limit;
		data["offset"] = offset;
		data["1_maker"] = maker
		
		// console.log(url);
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : false,
			"success" : function(data){
				// console.log(data);
				args["success"](data);
				return;
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.getOrdersByMaker ERROR]: failed to getOrdersByMaker!");
				console.error(err);
				return;
			}
		});
		
	}

	// 示例
	// Gdata.getOrdersByUser({
	// 	"success" : function(data){
	// 		console.log("Gdata.getOrdersByUser success!");
	// 		console.log(data);
	// 	},
	// 	"error" : function(err){
	// 		console.error("Gdata.getOrdersByUser failed!");
	// 		console.error(err);
	// 	}
	// });
	/* 获取当前人员的订单 */
	Gdata.getOrdersByUser = function(args){
		// 参数判断，已经参数的获取
		if(!args["limit"]){
			var limit = 0;
		}else{
			var limit = args["limit"];
		}
		
		if(!args["offset"]){
			var offset = 0;
		}else{
			var offset = args["offset"];
		}
		
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.getOrdersByUser ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		var user = Spolo.getUserId();
		if(user && user != "anonymous"){
			user = user;
		}else{
			console.error("[Gdata.getOrdersByUser ERROR]: Maybe the login session is lost,please login again!");
			return;
		}

		var url = "/web360/content/users/" + user + "/orders.search";
		var data = {};
		data["type"] = "glue360/order";
		data["sub"] = 0;
		data["isiframe"] = 0;
		data["by"] = "jcr:created";
		data["order"] = "des";
		data["limit"] = limit;
		data["offset"] = offset;
		
		// console.log(url);
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : true,
			"success" : function(data){
				// console.log(data);
				args["success"](data);
				return;
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.getOrdersByUser ERROR]: failed to getOrdersByUser!");
				console.error(err);
				return;
			}
		});
		
	}

	// 示例
	// Gdata.setOrderStatus({
	//	"path" : "/web360/content/users/admin/orders/order1",
	//	"condition" : "1",
	// 	"success" : function(data){
	// 		console.log("Gdata.setOrderStatus success!");
	// 		console.log(data);
	// 	},
	// 	"error" : function(err){
	// 		console.error("Gdata.setOrderStatus failed!");
	// 		console.error(err);
	// 	}
	// });
	/* 设置订单状态 */
	Gdata.setOrderStatus = function(args){
		// 参数判断，已经参数的获取
		if(!args["path"]){
			console.error("[Gdata.setOrderStatus ERROR]: args['path'] is undefined!");
			return;
		}

		if(!args["condition"]){
			console.error("[Gdata.setOrderStatus ERROR]: args['condition'] is undefined!");
			return;
		}

		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.setOrderStatus ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		

		var path = args["path"];
		var condition = args["condition"];

		var url = path + ".setstatus";
		var data = {};
		data["condition"] = condition;
		
		// console.log(url);
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : true,
			"success" : function(data){
				// console.log(data);
				if(data.suc){
					args["success"](data);
					return;
				}else{
					if(args["error"] && typeof args["error"] == "function"){
						args["error"](data);
						return;
					}
					console.error("[Gdata.setOrderStatus ERROR]: failed to setOrderStatus!");
					console.error(data);
					return;
				}
				
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.setOrderStatus ERROR]: failed to setOrderStatus!");
				console.error(err);
				return;
			}
		});
		
	}

	// 示例
	// var path = "/web360/content/users/admin/orders/order1";
	// Gdata.downloadOrder(path);
	/* 下载订单 */
	Gdata.downloadOrder = function(path){
		// 参数判断
		if(!path){
			console.error("[Gdata.downloadOrder ERROR]: path is undefined!");
			return;
		}

		// 拼接url
		var url = path + ".download.zip";
		// download
		downloadURL(url);

	}

	/* 上传订单*/
	Gdata.uploadOrder = function(formID,option){
		
		// 参数判断
		if(!option){
			console.error("[Gdata.uploadOrder ERROR]: option is undefined!");
			return;
		}
		if(!option.path){
			console.error("[Gdata.uploadOrder ERROR]: option.path is undefined!");
			return;
		}
		if(!option.load || typeof option.load != "function"){
			console.error("[Gdata.uploadOrder ERROR]: option.load is undefined or not function!");
			return;
		}
		var path = option.path;
		var url = path + ".upload";
		$('#'+formID).ajaxForm({
			url : url,
			success : function(data){
				option.load(data);
				return;
			}
		});
		$('#'+formID).submit();
	}
	
	// 获取上传文件的大小
	// Gdata.uploadfilesize("myform",{
	// 	"load" : function(data){
	// 		console.log(data);
	// 	},
	// 	"error" : function(err){
	// 		console.log(err);
	// 	}
	// });
	Gdata.uploadfilesize = function(formID,option){
		
		// 参数判断
		if(!option){
			console.error("[Gdata.uploadfilesize ERROR]: option is undefined!");
			return;
		}
		if(!option.load || typeof option.load != "function"){
			console.error("[Gdata.uploadfilesize ERROR]: option.load is undefined or not function!");
			return;
		}

		var path = "/web360/content";
		var url = path + ".uploadfilesize";
		$('#'+formID).ajaxForm({
			url : url,
			dataType : "json",
			success : function(data){
				option.load(data);
				return;
			}
		});
		$('#'+formID).submit();
	}

	// 实例
	// Gdata.getExhibitionTemplate({
	//  "style" : "科技",	
	// 	"success" : function(data){	
	// 		console.log("Gdata.getExhibitionTemplate success");
	// 		console.log(data);
	// 	}
	// });
	/* 获取所有展厅模版 */
	Gdata.getExhibitionTemplate = function(args){
		// 参数判断，已经参数的获取
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.getExhibitionTemplate ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		var url = "/web360/content/gen360/templates/exhibitions.getExhibitionTemplate";
		var data = {};
		data["sub"] = 0;	
		if(args["limit"]){
			data["limit"] = args["limit"];
		}
		if(args["offset"]){
			data["offset"] = args["offset"];
		}

		// 可以通过style 进行数据的获取
		if(args["style"]){
			data["1_style"] = args["style"];
		}
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : false,
			"success" : function(data){
				
				args["success"](data);
				return;
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.getExhibitionTemplate ERROR]: failed to getExhibitionTemplate!");
				console.error(err);
				return;
			}
		});

		
		
	}
	// 示例
	// Gdata.getExhibitionCategory({
	// 	"success" : function(data){
	// 		console.log("Gdata.getExhibitionCategory success");
	// 		console.log(data);
	// 	}
	// });
	/* 获取展厅的分类 */
	Gdata.getExhibitionCategory = function(args){
		// 参数判断
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.getExhibitionCategory ERROR]: args.success is undefined or not function!");
			return;
		}

		var url = "/web360/content/gen360/category/exhibition.searchExhibitionCategory";
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"cache" : false,
			"success" : function(data){
				// console.log(data);
				args["success"](data);
				return;
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.getExhibitionCategory ERROR]: failed to getExhibitionCategory!");
				console.error(err);
				return;
			}
		});

	}

	// 示例
	// Gdata.changePwd({
	// 	"userID" : "song@song.com",
	// 	"password" : "123456",
	// 	"success" : function(data){
	// 		console.log("Gdata.changePwd success");
	// 		console.log(data);
	// 	}
	// });
	/* 用户密码修改 */
	Gdata.changePwd = function(args){
		// 参数判断
		if(!args["userID"]){
			console.error("[Gdata.changePwd ERROR]: args.userID is undefined!");
		}
		if(!args["password"]){
			console.error("[Gdata.changePwd ERROR]: args.password is undefined!");
			return;
		}
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.changePwd ERROR]: args.success is undefined or not function!");
			return;
		}

		// 参数获取
		var userID = Spolo.encodeUname(args["userID"]);
		var password = args["password"]; 

		var url = "/web360/content/users/admin.changePwd"; 
		var data = {};
		data["userName"] = userID;
		data["password"] = password;

		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"cache" : false,
			"data" : data,
			"success" : function(data){
				// console.log(data);
				if(data.success){
					args["success"](data);	
				}else{
					if(args["error"] && typeof args["error"] == "function"){
					args["error"](data.reason);
					return;
					}
					console.error("[Gdata.changePwd ERROR]: failed to changePwd!");
					console.error(data.reason);
					return;
				}
				
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.changePwd ERROR]: failed to changePwd!");
				console.error(err);
				return;
			}

		});

	}

	// 示例
	// Gdata.setExhibitionVisits({
	// 	"path" : "/web360/content/users/admin/exhibitions/exhibition2013624151869589610213",
	// 	"success" : function(data){
	// 		console.log("Gdata.setExhibitionVisits success");
	// 		console.log(data);
	// 	}
	// });
	/* 设置exhibition 的visits 属性值*/
	Gdata.setExhibitionVisits = function(args){
		// 参数判断
		if(!args["path"]){
			console.error("[Gdata.setExhibitionVisits ERROR]: args.path is undefined!");
			return;
		}
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.setExhibitionVisits ERROR]: args.success is undefined or not function!");
			return;
		}

		// 参数获取
		var path = args["path"];
		var url = path + ".setVisits";

		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"cache" : false,
			"success" : function(data){
				// console.log(data);
				if(data.suc){
					args["success"](data);	
				}else{
					if(args["error"] && typeof args["error"] == "function"){
						args["error"](data);
						return;
					}
					console.error("[Gdata.setExhibitionVisits ERROR]: failed to setExhibitionVisits!");
					console.error(data);
					return;
				}
				
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.setExhibitionVisits ERROR]: failed to setExhibitionVisits!");
				console.error(err);
				return;
			}

		});

	}

	// 实例
	// Gdata.deleteUsers({
	// 	"usersArr" : ["33@33.com","44@44.com","55@55.com"],
	// 	"success" : function(data){
	// 		console.log("Gdata.deleteUsers success!");
	// 		console.log(data);
	// 	}
	// });
	/* 删除用户 */
	Gdata.deleteUsers = function(args){
		// 参数判断
		if(!args["usersArr"]){
			console.error("[Gdata.deleteUsers ERROR]: args.usersArr is undefined!");
			return;
		}
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.setExhibitionVisits ERROR]: args.success is undefined or not function!");
			return;
		}

		// 获取参数
		var usersArr = args["usersArr"];
		for(var i=0; i<usersArr.length; i++){
			usersArr[i] = Spolo.encodeUname(usersArr[i]);
		}
		var userNames = usersArr.join(",");

		var url = "/web360/content/users/admin.deleteUsers";
		var data = {};
		data["userName"] = userNames;

		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"cache" : false,
			"data" : data,
			"success" : function(data){
				// console.log(data);
				if(data.success){
					args["success"](data);	
				}else{
					if(args["error"] && typeof args["error"] == "function"){
						args["error"](data);
						return;
					}
					console.error("[Gdata.deleteUsers ERROR]: failed to deleteUsers!");
					console.error(data);
					return;
				}
				
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.deleteUsers ERROR]: failed to deleteUsers!");
				console.error(err);
				return;
			}

		});
	}

	// 示例
	// Gdata.updateUserInfo({
	// 	"phone" : "123456789999",
	// 	"linkman" : "中国馆",
	// 	"company" : "飞鹿",
	// 	"success" : function(data){
	// 		console.log("Gdata.updateUserInfo success!");
	// 		console.log(data);
	// 	},
	// 	"error" : function(err){
	// 		console.log("Gdata.updateUserInfo failed!");
	// 		console.log(err);
	// 	}
	// });
	/* 更新用户信息 */
	Gdata.updateUserInfo = function(args){
		// 参数判断
		if(!args["userID"]){
			console.error("[Gdata.updateUserInfo ERROR]: args.userID is undefined!");
			return;
		}
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.updateUserInfo ERROR]: args.success is undefined or not function!");
			return;
		}

		// 获取参数
		var userID = Spolo.encodeUname(args["userID"]);
		var url = "/web360/content/users/"+ userID + ".updatePro";
		var data = {};
		if(typeof args["phone"] != "undefined"){
			data["phone"] = args["phone"];
		}
		if(typeof args["linkman"] != "undefined"){
			data["linkman"] = args["linkman"];
		}
		if(typeof args["company"] != "undefined"){
			data["company"] = args["company"];
		}

		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"cache" : false,
			"data" : data,
			"success" : function(data){
				// console.log(data);
				if(data.suc){
					args["success"](data);	
				}else{
					if(args["error"] && typeof args["error"] == "function"){
						args["error"](data);
						return;
					}
					console.error("[Gdata.updateUserInfo ERROR]: failed to updateUserInfo!");
					console.error(data);
					return;
				}
				
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.updateUserInfo ERROR]: failed to updateUserInfo!");
				console.error(err);
				return;
			}

		});

	}

	// 示例
	// Gdata.getExhiTempStyle({
	// 	"success" : function(data){
	// 		console.log("Gdat.getExhiTempStyle success!");
	// 		console.log(data);
	// 	}
	// });
	/*  获取展厅模版风格 */
	Gdata.getExhiTempStyle = function(args){
		// 参数判断
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.getExhiTempStyle ERROR]: args.success is undefined or not function!");
			return;
		}

		// 获取参数
		var url = "/web360/content/gen360/style/exhibition_template.getExhiTempStyle";
		
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"cache" : false,
			"success" : function(data){
				// console.log(data);
				args["success"](data);	
				return;	
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.getExhiTempStyle ERROR]: failed to getExhiTempStyle!");
				console.error(err);
				return;
			}

		});

	}


	// 示例
	// Gdata.searchProducts({
	// 	"success" : function(data){
	// 		console.log("Gdata.searchProducts success!");
	// 		console.log(data);
	// 	}
	// });
	/*  获取当前用户的产品 */
	Gdata.searchProducts = function(args){
		// 参数判断
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.searchProducts ERROR]: args.success is undefined or not function!");
			return;
		}

		var userId = Spolo.getUserId();
		if(userId=="anonymous"){
			console.error("[Gdata.searchProducts ERROR]: Maybe the login session is lost,please login again!");
			return;
		}
		// 获取参数
		var url = "/web360/content/users/" + userId + ".searchProducts";
		
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"cache" : false,
			"success" : function(data){
				// console.log(data);
				args["success"](data);	
				return;	
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.searchProducts ERROR]: failed to searchProducts!");
				console.error(err);
				return;
			}

		});

	}


	// 实例
	// Gdata.getProductTemplate({
	// 	"success" : function(data){	
	// 		console.log("Gdata.getProductTemplate success");
	// 		console.log(data);
	// 	}
	// });
	/* 获取所有产品模版 */
	Gdata.getProductTemplate = function(args){
		// 参数判断，已经参数的获取
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.getProductTemplate ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		
		var url = "/web360/content/gen360/templates/products.getProductTemplate";
		var data = {};
		data["sub"] = 0;	
		if(args["limit"]){
			data["limit"] = args["limit"];
		}
		if(args["offset"]){
			data["offset"] = args["offset"];
		}

		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : false,
			"success" : function(data){
				
				args["success"](data);
				return;
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.getProductTemplate ERROR]: failed to getProductTemplate!");
				console.error(err);
				return;
			}
		});
	}
	
	// 实例
	// Gdata.getExhibitionByInitial({
	// 	"success" : function(data){	
	// 		console.log("Gdata.getProductTemplate success");
	// 		console.log(data);
	// 	}
	// });
	
	/* 通过发布后展厅首字母获得后展厅展厅 */
	Gdata.getExhibitionByInitial = function(args){
		// 发送ajax 请求

		ajaxGet({
			"url" : "/web360/content.getExhibitionByInitial",
			"cache" : false,
			"success" : function(data){				
				args["success"](data);
				return;
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.getProductTemplate ERROR]: failed to getProductTemplate!");
				console.error(err);
				return;
			}
		});
	}
	
		// 示例
	// Gdata.searchAutoFalseOrder({
		
		// "state" : "MAKING",
		// "maker": "Tom",
		// "success" : function(data){
			// console.log("Gdata.searchAutoFalseOrder success!");
			// console.log(data);
		// },
		// "error" : function(err){
			// console.error("Gdata.searchAutoFalseOrder failed!");
			// console.error(err);
		// }
	// });
	/* 获取人工的不同状态订单*/
	Gdata.searchAutoFalseOrder = function(args){
		// 参数判断，已经参数的获取
		if(!args["success"] || typeof args["success"] != "function"){
			
			console.error("[Gdata.searchAutoFalseOrder ERROR]: args['success'] is undefined! or not function!");
			return;
		}
	
		var data = {};
		
		if(!args["limit"]){
			
			data["limit"] = 0;
			
		}else{
			
			data["limit"] = args["limit"];
			
		}
		
		if(!args["offset"]){
			
			data["offset"] = 0;
			
		}else{
			
			data["offset"] = args["offset"];
			
		}
		
		if(args["state"]){
			
			data["21_state"] = args["state"];
			
		}
		
		if(args["maker"]){

			data["21_maker"] = args["maker"];
			
		}		
	
		var url = "/web360/content.searchAutoFalseOrder";
		
		// console.log(url);
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : false,
			"success" : function(data){
				// console.log(data);
				args["success"](data);
				return;
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.getOrdersByMaker ERROR]: failed to getOrdersByMaker!");
				console.error(err);
				return;
			}
		});
		
	}	
	
	// 示例
	// Gdata.searchHotProducts({	
	// 	"path" : "content/gen360/publish/exhibitions/exhibition2013714150208739406183/index.html",
	// 	"success" : function(data){
	// 		console.log("Gdata.searchHotProducts success!");
	// 		console.log(data);
	// 	},
	// 	"error" : function(err){
	// 		console.error("Gdata.searchHotProducts failed!");
	// 		console.error(err);
	// 	}
	// });
	/* 获取热门展品*/
	Gdata.searchHotProducts = function(args){
		// 参数判断，已经参数的获取
		if(!args["limit"]){
			var limit = 0;
		}else{
			var limit = args["limit"];
		}
		
		if(!args["offset"]){
			var offset = 0;
		}else{
			var offset = args["offset"];
		}
		
		if(!args["path"]){
			console.error("[Gdata.searchHotProducts ERROR]: args['path'] is undefined!");	
			return;
		}	
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.searchHotProducts ERROR]: args['success'] is undefined! or not function!");
			return;
		}

		var url = "/web360/content/gen360/publish.searchHotProducts";
		var data = {};
		data["limit"] = limit;
		data["offset"] = offset;
		var path = args["path"];
		data["invalidData"] = path;
		
		// console.log(url);
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : false,
			"success" : function(data){
				// console.log(data);
				args["success"](data);
				return;
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.searchHotProducts ERROR]: failed to searchHotProducts!");
				console.error(err);
				return;
			}
		});
		
	}

	// 示例
	// Gdata.searchMoreProducts({	
	// 	"path" : "content/gen360/publish/exhibitions/exhibition2013714150208739406183/index.html",
	// 	"success" : function(data){
	// 		console.log("Gdata.searchMoreProducts success!");
	// 		console.log(data);
	// 	},
	// 	"error" : function(err){
	// 		console.error("Gdata.searchMoreProducts failed!");
	// 		console.error(err);
	// 	}
	// });
	/* 获取更多展品*/
	Gdata.searchMoreProducts = function(args){
		// 参数判断，已经参数的获取
		if(!args["limit"]){
			var limit = 0;
		}else{
			var limit = args["limit"];
		}
		
		if(!args["offset"]){
			var offset = 0;
		}else{
			var offset = args["offset"];
		}
		
		if(!args["path"]){
			console.error("[Gdata.searchMoreProducts ERROR]: args['path'] is undefined!");	
			return;
		}	
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.searchMoreProducts ERROR]: args['success'] is undefined! or not function!");
			return;
		}

		var url = "/web360/content/gen360/publish/products.searchMoreProducts";
		var data = {};
		data["limit"] = limit;
		data["offset"] = offset;
		var path = args["path"];
		data["invalidData"] = path;
		
		// console.log(url);
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : false,
			"success" : function(data){
				// console.log(data);
				args["success"](data);
				return;
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.searchMoreProducts ERROR]: failed to searchMoreProducts!");
				console.error(err);
				return;
			}
		});
		
	}
	
// 示例
	// Gdata.exhibitIsUnique({
		// "userID" : "5@5.com",
		// "parameter" : "uu",
		// "nodeName": "null", or "nodeName":"exhibit2013721180293980863106",
		// "success" : function(data){
			// console.log("Gdata.exhibitIsUnique success");
			// console.log(data);
		// }
	// });
	/* 验证展品名称是否唯一 */
	Gdata.exhibitIsUnique = function(args){
		// 参数判断
		if(!args["parameter"]){
			//console.error("[Gdata.exhibitIsUnique ERROR]: args.parameter is undefined!");
			return;
		}

		// 参数获取
		var userID = args["userID"];
		userID = Spolo.encodeUname(userID);
		
		var password = args["parameter"]; 
		var url = "/web360/content/users/"+userID+".proIsUnique"
		var data = {};
		data["nodeName"] = "exhibits";
		data["proName"] = "exhiName";
		data["parameter"] = args["parameter"];
		data["nodeN"] = args["nodeName"];

		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"cache" : false,
			"data" : data,
			"success" : function(data){

				// console.log(data);
				args["success"](data);	
				return;	
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.getExhiTempStyle ERROR]: failed to getExhiTempStyle!");
				console.error(err);
				return;
			}

		});

	}	


	// 示例
	// Gdata.acceptOrder({
	// 	"path" : "/web360/content/users/_songzhipengmune_40126.com/orders/order20137161251337842193290",
	// 	"maker" : "songzhipengmune@gmail.com",
	// 	"success" : function(data){
	// 		console.log("Gdata.acceptOrder success");
	// 		console.log(data);
	// 	},
	// 	"error" : function(err){
	// 		console.log("Gdata.acceptOrder failed!");
	// 		console.log(err);
	// 	}
	// });
	/* maker 接单 */
	Gdata.acceptOrder = function(args){
		// 参数判断
		if(!args["path"]){
			console.error("[Gdata.acceptOrder ERROR]: args['path'] is undefined!");	
			return;
		}	
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.acceptOrder ERROR]: args['success'] is undefined! or not function!");
			return;
		}

		var path = args["path"];
		if(!args["maker"]){
			var maker = Spolo.getUserId();			
		}else{
			var maker = Spolo.encodeUname(args["maker"]);
		}

 
		var url = "/web360/content/users/" + maker + ".acceptOrder";
		var data = {};
		data["path"] = path;
		data["maker"] = maker;

		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"cache" : false,
			"data" : data,
			"success" : function(data){
				// console.log(data);
				if(data["suc"]){
					args["success"](data);	
					return;		
				}else{
					if(args["error"] && typeof args["error"] == "function"){
						args["error"](data);
						return;
					}
					console.error("[Gdata.acceptOrder ERROR]: failed to acceptOrder!");
					console.error(data);
					return;
				}
				
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.acceptOrder ERROR]: failed to acceptOrder!");
				console.error(err);
				return;
			}

		});

	}	
	
		// 示例
	// Gdata.getGroupMembers({
		
		// "groupName" : "maker",

		// "success" : function(data){
			// console.log("Gdata.getGroupMembers success!");
			// console.log(data);
		// },
		// "error" : function(err){
			// console.error("Gdata.getGroupMembers failed!");
			// console.error(err);
		// }
	// });
	/* 根据组名获得组内成员*/
	Gdata.getGroupMembers = function(args){
		// 参数判断，已经参数的获取
		if(!args["success"] || typeof args["success"] != "function"){
			
			console.error("[Gdata.getGroupMembers ERROR]: args['success'] is undefined! or not function!");
			return;
		}
	
		var data = {};
		
		if(!args["groupName"]){
			
			console.error("[Gdata.getGroupMembers ERROR]: args.parameter is undefined!");
			
		}else{
			
			data["groupName"] = args["groupName"];
			
		}
		
		var url = "/web360/content.getMembers";
		
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : false,
			"success" : function(data){
				// console.log(data);
				args["success"](data);
				return;
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.getGroupMembers ERROR]: failed to getGroupMembers!");
				console.error(err);
				return;
			}
		});
		
	}		
	

	// 示例
	// Gdata.reMakerOrder({
	// 	"path" : "/web360/content/users/_1_401.com/orders/order20123452452452435",
	// 	"maker" : "songzhipengmune@gmail.com",
	// 	"success" : function(data){
	// 		console.log("Gdata.reMakerOrder success");
	// 		console.log(data);
	// 	},
	// 	"error" : function(err){
	// 		console.log("Gdata.reMakerOrder failed!");
	// 		console.log(err);
	// 	}
	// });
	/* maker 转单 */
	Gdata.reMakerOrder = function(args){
		// 参数判断
		if(!args["maker"]){
			console.error("[Gdata.reMakerOrder ERROR]: args['maker'] is undefined!");	
			return;
		}	
		if(!args["path"]){
			console.error("[Gdata.reMakerOrder ERROR]: args['path'] is undefined!");	
			return;
		}	
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.reMakerOrder ERROR]: args['success'] is undefined! or not function!");
			return;
		}

		var path = args["path"];
		var maker = Spolo.encodeUname(args["maker"]);

		var url = "/web360/content/users/" + Spolo.getUserId() + ".reMakerOrder";
		var data = {};
		data["path"] = path;
		data["maker"] = maker;

		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"cache" : false,
			"data" : data,
			"success" : function(data){
				// console.log(data);
				if(data["suc"]){
					args["success"](data);	
					return;		
				}else{
					if(args["error"] && typeof args["error"] == "function"){
						args["error"](data);
						return;
					}
					console.error("[Gdata.reMakerOrder ERROR]: failed to reMakerOrder!");
					console.error(data);
					return;
				}
				
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.reMakerOrder ERROR]: failed to reMakerOrder!");
				console.error(err);
				return;
			}

		});

	}	

	// 示例
	// Gdata.allItemsCount({
	// 	"success" : function(data){
	// 		console.log("Gdata.allItemsCount success");
	// 		console.log(data);
	// 	},
	// 	"error" : function(err){
	// 		console.log("Gdata.allItemsCount failed!");
	// 		console.log(err);
	// 	}
	// });
	/* 用户个人中心的统计数据 */
	Gdata.allItemsCount = function(args){
		// 参数判断
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.allItemsCount ERROR]: args['success'] is undefined! or not function!");
			return;
		}

		var userId = Spolo.getUserId();
		if(!userId || userId == "anonymous"){
			console.error("[Gdata.allItemsCount ERROR]: Maybe the login session is lost,please login again!");
			return;
		}

		var url = "/web360/content/users/" + userId + ".allItemsCount";
		var data = {};
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"cache" : false,
			"data" : data,
			"success" : function(data){
				// console.log(data);
				if(data["suc"]){
					args["success"](data);	
					return;		
				}else{
					if(args["error"] && typeof args["error"] == "function"){
						args["error"](data);
						return;
					}
					console.error("[Gdata.allItemsCount ERROR]: failed to allItemsCount!");
					console.error(data);
					return;
				}
				
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.allItemsCount ERROR]: failed to allItemsCount!");
				console.error(err);
				return;
			}

		});

	}	

	// 示例
	// Gdata.captchaSended({
	//  "userEmail" : "songzhipengmune@126.com",	
	// 	"success" : function(data){
	// 		console.log("Gdata.captchaSended success");
	// 		console.log(data);
	// 	},
	// 	"error" : function(err){
	// 		console.log("Gdata.captchaSended failed!");
	// 		console.log(err);
	// 	}
	// });
	/* 对用户邮箱进行验证 */
	Gdata.captchaSended = function(args){
		// 参数判断
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.captchaSended ERROR]: args['success'] is undefined! or not function!");
			return;
		}

		if(!args["userEmail"]){
			console.error("[Gdata.captchaSended ERROR]: args['userEmail'] is undefined!");
			return;
		}

		var url = "/web360/content.captchaSended";
		var data = {};
		var userEmail = args["userEmail"];
		data["userEmail"] = userEmail;
		
		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"cache" : false,
			"data" : data,
			"success" : function(data){
				// console.log(data);
				if(data["suc"]){
					args["success"](data);	
					return;		
				}else{
					if(args["error"] && typeof args["error"] == "function"){
						args["error"](data);
						return;
					}
					console.error("[Gdata.captchaSended ERROR]: failed to captchaSended!");
					console.error(data);
					return;
				}
				
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.captchaSended ERROR]: failed to captchaSended!");
				console.error(err);
				return;
			}

		});

	}	
	
	// 实例
	// Gdata.getExhibitsByPubE({
	//  "exhibitionID" : "exhibition201384213554402376200",
	//  "exhiName" : "测试",
	// 	"success" : function(data){	
	// 		console.log("Gdata.getExhibitsByPubE success");
	// 		console.log(data);
	// 	}
	// });
	/* 获取发布后展厅中的展品信息 */
	Gdata.getExhibitsByPubE = function(args){
		// 参数判断，已经参数的获取
		if(!args["success"] || typeof args["success"] != "function"){
			console.error("[Gdata.getExhibitsByPubE ERROR]: args['success'] is undefined! or not function!");
			return;
		}
		if(!args["exhiName"]){
			console.error("[Gdata.getExhibitsByPubE ERROR]: args['exhiName'] is undefined!");
			return;
		}		if(!args["exhibitionID"]){
			console.error("[Gdata.getExhibitsByPubE ERROR]: args['exhibitionID'] is undefined!");
			return;
		}
		var exhibitionID = args["exhibitionID"];	
		var url = "/web360/content/gen360/publish/exhibitions/"+exhibitionID+".getExhibitsByPubE";
		var data = {};
		data["sub"] = 0;
		data["0_exhiName"] = args["exhiName"];
		if(args["limit"]){
			data["limit"] = args["limit"];
		}
		if(args["offset"]){
			data["offset"] = args["offset"];
		}

		// 发送ajax 请求
		ajaxGet({
			"url" : url,
			"data" : data,
			"cache" : false,
			"success" : function(data){
				
				args["success"](data);
				return;
			},
			"error" : function(err){
				if(args["error"] && typeof args["error"] == "function"){
					args["error"](err);
					return;
				}
				console.error("[Gdata.getExhibitsByPubE ERROR]: failed to getExhibitsByPubE!");
				console.error(err);
				return;
			}
		});
				
	}		
	
})();