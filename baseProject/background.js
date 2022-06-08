//background.js
console.log('background js start...');

//插件用的数据都存储在storage.local中
function DBdata(mode,callback,data){//操作本地存储的函数
    if(mode=="set"){//保存本地数据
        console.log('set-LocalDB');
        chrome.storage.local.set({LocalDB: data});
    }else if(mode=="get"){//获取
        chrome.storage.local.get('LocalDB', function(response) {
            typeof callback == 'function' ? callback(response) : null;
        });
    }else if(mode=="clear"){//清空
        chrome.storage.local.clear();
    }
}

chrome.runtime.onInstalled.addListener(() => {
    console.log('chrome.runtime.onInstalled...');
    DBdata("clear");//清除插件保存的本地数据
});
chrome.runtime.onConnect.addListener(function(port) {//接收到popup
    console.log('chrome.runtime.onConnect...');
    port.onMessage.addListener(function(receivedMsg) {//监听popup发来的内容receivedMsg
        console.log("background recvmsg:", receivedMsg);
        if (receivedMsg.fromPopup && receivedMsg.fromPopup=='setDB') {//如果接收到了getDB，这里读取数据并返回相当于初始化popup页面
            DBdata('get',function(res){
                port.postMessage(res.LocalDB);//发送到popup
            });
        } else if (receivedMsg.fromPopup && receivedMsg.fromPopup=='getDB') {//如果接收到了getDB，这里读取数据并返回相当于初始化popup页面
            DBdata('get',function(res){
                port.postMessage(res.LocalDB);//发送到popup
            });
        } else {//如果不是，则说明是收到来自popup手动点击设置的数据，存入以用于popup打开时展示
            DBdata('set','',receivedMsg)
        }
    })
});
