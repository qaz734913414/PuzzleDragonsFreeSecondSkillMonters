var fso = new ActiveXObject("Scripting.FileSystemObject");
var osh = new ActiveXObject("WScript.Shell");
if (/wscript\.exe/ig.test(WScript.FullName))
{
    osh.run("cmd /c cscript.exe //nologo \"" + WScript.ScriptFullName + "\"");
    WScript.Quit();
}

//读取文件
function loadText(filePath,charset)
{
	var adostream = new ActiveXObject("ADODB.Stream");
	adostream.Type = 2;
	adostream.Open();
	adostream.Charset = charset;
	adostream.Position = 0;
	adostream.LoadFromFile(filePath);
	var strtemp = adostream.readtext;
	adostream.close;
	adostream = null;
	return strtemp;
}
//写入文件
function saveText(filePath,str,charset)
{
	var adostream = new ActiveXObject("ADODB.Stream");
	adostream.Type = 2;
	adostream.Open();
	adostream.Charset = charset;
	adostream.Position = 0;
	adostream.writetext(str);
	adostream.SaveToFile(filePath, 2);
	adostream.flush;
	adostream.close;
	adostream = null;
}
//写入文件
function saveBinary(filePath,stream)
{
	var adostream = new ActiveXObject("ADODB.Stream");
	adostream.Type = 1;//1=adTypeBinary
	adostream.Open();
	adostream.write(stream);
	adostream.SaveToFile(filePath, 2);
	adostream.close;
	adostream = null;
}
//建立XMLHTTP
function getRequest()
{
	var xmlHttp = false;
	try {
		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP.6.0");
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e2) {
			xmlHttp = false;
		}
	}
	if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
		xmlHttp = new XMLHttpRequest();
	}
	return xmlHttp;
}
//仿GM_xmlhttpRequest函数v1.3
function GM_xmlhttpRequest(GM_param) {
	var xhr = new getRequest(); //创建XMLHttpRequest对象
	xhr.open(GM_param.method, GM_param.url, true);
	if (GM_param.responseType) xhr.responseType = GM_param.responseType;
	if (GM_param.overrideMimeType) xhr.overrideMimeType(GM_param.overrideMimeType);
	xhr.onreadystatechange = function() //设置回调函数
		{
			if (xhr.readyState === 4) {
				if (xhr.status === 200 && GM_param.onload)
					GM_param.onload(xhr);
				if (xhr.status !== 200 && GM_param.onerror)
					GM_param.onerror(xhr);
			}
		}

	for (var header in GM_param.headers) {
		xhr.setRequestHeader(header, GM_param.headers[header]);
	}

	xhr.send(GM_param.data ? GM_param.data : null);
}

//读取JSON数据
var universal_json = loadText("universal_jsonobj.js","utf-8");
eval(universal_json);
GM_xmlhttpRequest({
	url: "http://localhost/index.html",
	method: "GET",
	onload: function(response) {
		saveBinary("觉醒图片.txt",response.responseBody);
	}
})

/*
var xmlHttp = new getRequest();
xmlHttp.open("GET", "http://localhost/index.html", true);
xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xmlHttp.onreadystatechange = function(){
	if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
		//二进制方式保存
		var adostream = new ActiveXObject("ADODB.Stream");
		adostream.Type = 1;//1=adTypeBinary
		adostream.Open();
		adostream.write(xmlHttp.responseBody);
		adostream.SaveToFile("觉醒图片.txt", 2);
		adostream.close;
		adostream = null;
	}
};
xmlHttp.send(null);
WScript.Echo(WScript.FullName + "成功运行");
*/
/*
function downOrbs(orbsArr, callback)
{
	if (orbsArr.length < 1)
	{
		callback();
		return;
	}
    var newOrbsArr = orbsArr.concat();
    var thisOrbs = newOrbsArr.shift(); //删除新数组的第一个元素
	
	var xmlHttp = new getRequest();
	xmlHttp.open("GET", thisOrbs.icon, true);
	xmlHttp.onreadystatechange = function(){
			UpdateMethod(xmlHttp);
		};
	xmlHttp.send();
}
for (var oi = 0; oi < orbs.length; oi++)
{
	WScript.Echo(orbs[oi].cname);
}
*/
/*

//进行参数发送
function DealWithData(RequestType,Async,RequestUrl,SendData,UpdateMethod)
{
	xmlHttp.open(RequestType, RequestUrl,Async);
	if(RequestType.toUpperCase()=="POST")
	{
		xmlHttp.setRequestHeader("Content-Length", "93");
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	xmlHttp.onreadystatechange = function(){
			UpdateMethod(xmlHttp);
		};
	if(SendData=='')
		SendData=null;
	xmlHttp.send(SendData);
}

//读取网页源二进制文件
function LoadURLSource(url)
{
	var xhp = new ActiveXObject("MSXML2.XMLHttp.6.0");
	xhp.open("get",url,false);
	xhp.send();
	var LoadWebPageSource = xhp.responseBody;
}
*/