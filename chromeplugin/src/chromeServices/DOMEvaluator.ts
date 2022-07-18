//import { DOMMessage, DOMMessageResponse } from 'chrome';
import domAnalyze from "./DOMAnalyze";

// Function called when a new message is received
const messagesFromReactAppListener = (
    msg: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void) => {

    console.log('[content.js]. Message app received', msg);

    const headlines = Array.from(document.getElementsByTagName<"h1">("h1"))
        .map(h1 => h1.innerText);

    // Prepare the response object with information about the site
    const response: any = {
        title: document.title,
        headlines
    };

    sendResponse(response);
}

/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

class DomEvaluator {
    constructor () {
        domAnalyze.init()
    }
}
const domEvaluator = new DomEvaluator()
export default domEvaluator