/* 
 *  This file is part of the UGE(Uniform Game Engine).
 *  Copyright (C) by SanPolo Co.Ltd.
 *  All rights reserved.
 *
 *  See http://uge.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://uge.spolo.org/
 *  Any copyright issues, please contact: copr@spolo.org
 */

/**
 *  utils保存了未分类的函数集。
 *
 * @version $Rev: $, $Date: 2007-03-27 16:30:52 +0200 (Tue, 27 Mar 2007) $
 */

var Spolo;

// start spolo code scope
(function() {

//兼容其它名称空间给出的Spolo
if(!Spolo)
	Spolo = new Object();
	
// Spolo.NAME_OF_THIS_FILE = "spolo.js";
// Spolo.PATH_OF_THIS_FILE = "/script/spolo.js";

Spolo.DBROOT = '/web360/content';	// 数据库的根目录

/**
 * Protect window.console method calls, e.g. console is not defined on IE
 * unless dev tools are open, and IE doesn't define console.debug
 */
if (!window.console) {
    window.console = {};
  }
  // union of Chrome, FF, IE, and Safari console methods
  var m = [
    "log", "info", "warn", "error", "debug", "trace", "dir", "group",
    "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
    "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
  ];
  // define undefined methods as noops to prevent errors
  for (var i = 0; i < m.length; i++) {
    if (!window.console[m[i]]) {
      window.console[m[i]] = function() {};
    }    
  } 
  
// 设置需要实时更新的属性

	var userid = "anonymous";
	var encodeid = "anonymous";
	var workspace = "workspace";
	var currentNode = "/content";
	var createNode = "createNode";
	
	// 得到用户ID
	var getterUid = function(){
		var session = Spolo.getSessionInfo();
		if(session!=undefined)
			userid = session["userID"];
		return userid;
	}
	// 得到编码后的用户ID
	var getterEuid = function(){
		return Spolo.encodeUname(getterUid());
		//return encodeURIComponent(getterUid());
		//return getterUid();
	}
	// 得到用户工作区
	var getterWorkspace = function(){
		var session = Spolo.getSessionInfo();
		if(session!=undefined)
			workspace = session["workspace"];
		return workspace;
	}
	// 得到当前读取的节点
	var getterNode = function(){
		var __spolo_url = window.location.href.replace('http://','');
		var nodeName = __spolo_url.substr(__spolo_url.lastIndexOf('/'));
		nodeName = nodeName.substr(0,nodeName.indexOf('.'));
		__spolo_url = __spolo_url.substr(__spolo_url.indexOf('/'));
		__spolo_url = __spolo_url.substr(0,__spolo_url.lastIndexOf('/'));
		return __spolo_url + nodeName;
	}
	Spolo.getUserId = function(){
		var session = Spolo.getSessionInfo();
		if(session!=undefined)
			userid = session["userID"];
		return userid;
	}
	Spolo.getEncodeId = function(){
		return Spolo.encodeUname(getterUid());		
	}
	Spolo.getWorkspace = function(){
		var session = Spolo.getSessionInfo();
		if(session!=undefined)
			workspace = session["workspace"];
		return workspace;
	}
	Spolo.getCurrentNode = function(){
		var __spolo_url = window.location.href.replace('http://','');
		var nodeName = __spolo_url.substr(__spolo_url.lastIndexOf('/'));
		nodeName = nodeName.substr(0,nodeName.indexOf('.'));
		__spolo_url = __spolo_url.substr(__spolo_url.indexOf('/'));
		__spolo_url = __spolo_url.substr(0,__spolo_url.lastIndexOf('/'));
		return __spolo_url + nodeName;
	}
	
/**
 * ReplaceAll by Fagner Brack (MIT Licensed)
 * Replaces all occurrences of a substring in a string
 * Faster than using regex...
 */
String.prototype.replaceAll = function(token, newToken, ignoreCase) {
    var str, i = -1, _token;
    if((str = this.toString()) && typeof token === "string") {
        _token = ignoreCase === true? token.toLowerCase() : undefined;
        while((i = (
            _token !== undefined? 
                str.toLowerCase().indexOf( 
                            _token, 
                            i >= 0? i + newToken.length : 0
                ) : str.indexOf(
                            token,
                            i >= 0? i + newToken.length : 0
                )
        )) !== -1 ) {
            str = str.substring(0, i)
                    .concat(newToken)
                    .concat(str.substring(i + token.length));
        }
    }
	return str;
};	

//decode的栈:_ --> % ,then unescape.
Spolo.decodeUname = function(uname){
	if(uname!="admin"){
		uname = uname.substring(1);
	}
	return decodeURIComponent(uname.replaceAll("_","%"));
}

Spolo.encodeUname = function(uname){
	var retname = "";
	var unameArr = uname.split("");
	for(var i = 0 ; i < unameArr.length ; i++)
	{
		var c = unameArr[i];
		switch(c)
		{
		case '@':
		case '_':
		case '*':
			retname += '_';
			retname += c.charCodeAt(0).toString(16);
			break;
		default:
			retname += c;
		}
		
	}
	if(retname!="admin"){
		retname = "_"+retname;
	}
	
	return encodeURIComponent(retname).replaceAll("%","_");
}

//节点命名策略，node类型+当前毫秒数
Spolo.CreateNodeName = function(nodeType)
{
	var nodeDate = new Date();
	var year = nodeDate.getFullYear().toString();
	var month = nodeDate.getMonth().toString();
	var day = nodeDate.getDate().toString();
	var hour = nodeDate.getHours().toString();
	var minute = nodeDate.getMinutes().toString();
	var second = nodeDate.getSeconds().toString();
	var millisecond = nodeDate.getMilliseconds().toString();
	var random = Math.random(millisecond).toString().substring(2,9);
	return nodeType+year+month+day+hour+minute+second+millisecond+random;
}

//语言特性扩展:
Array.prototype.hasObject = (
  !Array.indexOf ? function (o)
  {
    var l = this.length + 1;
    while (l -= 1)
    {
        if (this[l - 1] === o)
        {
            return true;
        }
    }
    return false;
  } : function (o)
  {
    return (this.indexOf(o) !== -1);
  }
);

/**@brief 将\ 转义成_#_ ,防止json 串的不标准。
**/
Spolo.inputEncode = function(inputString){
	if(!inputString){
		// console.log("inputString is undefined!");
		return "";
	}
	var inputString = inputString.replaceAll("\n","_#n_");
	inputString = inputString.replaceAll("\\","_#_");
	//var inputString = escape(inputString);
	return inputString;
}

/**@brief 将_#_ 转义成 \ 防止json 串的不标准。
**/
Spolo.inputDecode = function(inputString){
	if(!inputString){
		// console.log("inputString is undefined!");
		return "";
	}
	var inputString = inputString.replaceAll("_#n_","\n");
	inputString = inputString.replaceAll("_#_","\\");
	//var inputString = unescape(inputString);
	return inputString;
}


/** 把地址栏的参数转换为 map
*/
Spolo.getUrlVars = function() 
{
	var map = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		map[key] = value;
	});
	return map;
};

/** 获取地址栏中的redirect 参数
*/
Spolo.getUrlRedirectPar = function()
{
	var map = {};
	var parts = window.location.href.replace(/[?&]+(redirect)=(.*)/gi, function(m,key,value) {
		// console.log(m);
		map[key] = value;
	});
	return map;
}

/**	把 map 转换为地址栏参数
	Usage:
	var data = { 'first name': 'George', 'last name': 'Jetson', 'age': 110 };
	var querystring = EncodeQueryData(data);
*/
Spolo.encodeQueryData = function(data)
{
   var ret = [];
   for (var d in data){
	  ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
	}  
   return ret.join("&");
};

/**	url 带参数跳转
*/
Spolo.redirectWithVars = function(url, map)
{
	if(!url){
		console.error("url is undefined!");
		return;
	}
	var querystring;
	if(map){
		querystring = Spolo.encodeQueryData(map);
	}
	if(querystring){
		querystring = decodeURIComponent(querystring);
		if(url.indexOf("?")!=-1 && url.indexOf("=")!=-1){
			url += "&";
		}else{
			url += "?";
		}
	}else{
		querystring = "";
	}
	// alert(url+querystring);
	// console.log(url+querystring);
	window.location.href = url + querystring;
};

/**@brief Spolo.redirect ： 实现带参数的url 跳转
*/
Spolo.redirect = function(url)
{	
	// 参数判断
	if(!url){
		console.error("[Spolo.redirect ERROR]: url is undefined!");
		return;
	}
	// 获取map参数
	var map = Spolo.getUrlVars();
	// 将获取的参数，同要跳转的url 进行拼接
	Spolo.redirectWithVars(url, map);
}


/**@brief Spolo.getSessionInfo : 获取sling sessionInfo
   @return session ：{"userID":"admin","workspace":"default","authType":"FORM"}	
**/
Spolo.getSessionInfo = function(){
	
	var session = null;
	
	var url = "/system/sling/info.sessionInfo.json";
	var data = {};
	var cache = false;
	
	
	$.ajax({    
		url:url,// 跳转到 action    
		data:data,
		cache:cache,
		type:'get',      
		dataType:'json',
		async:false,	
		success:function(data) { 
			session = data;
		},    
		error : function(error) {    
			console.error("[Spolo.getSessionInfo ERROR]: Maybe the login session is lost,need to login again!",error);
			// alert("[Spolo.getSessionInfo ERROR]: Maybe the login session is lost,need to login again!",error);
			return;
		}    
	}); 
	
	return session;
}

/**@brief Spolo.isLogined : 判断用户是否已经登录
   @return boolean  true,已经登录;false 未登录	
**/
Spolo.isLogined = function(){
	var session = Spolo.getSessionInfo();
	if(session){
		var userid = session["userID"];
		if(userid!="anonymous"){
			return true;
		}
	}
	return false;
}

/**@brief Spolo.getUser : 获取当前用户对象
   @return object ： 放回当前用户对象详细信息
**/
Spolo.getUser = function(){
	
	var userObj = {};
	var userId = Spolo.getUserId();
	if(userId == "anonymous"){
		return userObj;
	}
	
	var path = "/web360/content/users/" + userId;

	userObj["id"] = userId;
	userObj["username"] = Spolo.decodeUname(userId);
	userObj["userPath"] = path;
	userObj["exhibitionsPath"] = path + "/exhibitions";
	userObj["ordersPath"] = path + "/orders";
	userObj["exhibitsPath"] = path + "/exhibits";
	userObj["modelsPath"] = path + "/models";

	return userObj;

}


/*	把 jcr:created 转换成 */
/*	把JCR中的日期修改为 2013.08.05 12:47:59 格式*/
Spolo.parseJcrCreated = function(jcrCreated){
	if(!jcrCreated){
		return;
	}
	// 2013-08-06T23:46:13.935+08:00
	var yearStr = jcrCreated.split('T');
	var year = yearStr[0].split('-');
	var timeStr = yearStr[1].split('.');
	var hour = timeStr[0].split(':');
	var dateString = year[0]+"."+year[1]+"."+year[2]+" "+timeStr[0]
	return dateString;
}

// end spolo code scope 
})();