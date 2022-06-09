//content.js   manifest匹配地址的页面在刷新时会直接执行这里的代码
chrome.runtime.sendMessage(chrome.runtime.id, {//当页面刷新时发送到bg
    fromContent: 'getDB'
});

chrome.runtime.onMessage.addListener(function(senderRequest) {//接收到bg
	sendResponse({msg: '接收到bg'});
    console.log('demo已运行');
    var LocalDB=senderRequest.LocalDB;
    console.log(LocalDB);
    switch(LocalDB.Direct){
        case 'TEST':
            console.log(123123);
        break;

        case 'removeAD':
        	//隐藏含有ad的元素，来达到去广告的效果
            $(".ad").hide();
        break;
    }
});