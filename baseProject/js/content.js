//content.js   manifest匹配地址的页面在刷新时会直接执行这里的代码
window.console.log('this is content js...');

function DOMtoString(document_root) {
    console.log('html doc:', document_root);
    
    var html = '',
    node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
            case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
            case Node.CDATA_SECTION_NODE:
            html += '';
            break;
            case Node.COMMENT_NODE:
            html += '';
            break;
            case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += " DOCUMENT_TYPE_NODE";
            break;
        }
        node = node.nextSibling;
    }
    return html;
}


chrome.runtime.sendMessage(chrome.runtime.id, {//当页面刷新时发送到bg
    fromContent: 'getDB'
});

chrome.runtime.onMessage.addListener(function(senderRequest) {//接收到bg
	//sendResponse({msg: '接收到bg'});
    console.log('demo已运行');
    var LocalDB=senderRequest.LocalDB;
    console.log(LocalDB);
    switch(LocalDB.Direct){
        case 'TEST':
            console.log("TEST");
        break;

        case 'removeAD':
        	//隐藏含有ad的元素，来达到去广告的效果
            $(".ad").hide();
        break;
    }
});
const html_ = DOMtoString(document);
console.log('html:', html_);