console.log("popup js start...", window.location);
window.bgCommunicationPort = chrome.runtime.connect(); //初始化bgCommunicationPort
$(".checkbtn").click(function () {
	bgCommunicationPort.postMessage({ //发送到bg,键值可以自由设置
		Direct: $(this).attr('id'), //目标
		Content: '测试内容', //内容
		step: 0 //步骤
	});
});
$(document).ready(function () { //打开popup时触发，读取之前存储的参数
	bgCommunicationPort.postMessage({
		fromPopup: 'getDB'
	}); //向background发送消息
	bgCommunicationPort.onMessage.addListener(function (receivedPortMsg) { //监听background
		console.log("onMessage", receivedPortMsg); //这是background发来的内容
		if (receivedPortMsg && receivedPortMsg.Direct) {
			$(".checkbtn").prop({
				'checked': false
			}); //初始化按钮
			$("#" + receivedPortMsg.Direct).prop({
				'checked': true
			});
		}
	});
});