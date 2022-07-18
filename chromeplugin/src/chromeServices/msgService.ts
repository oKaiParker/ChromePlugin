
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

class MessageService {
    constructor () {
        console.log('chrome message service setup.')
    }
}
const msgService = new MessageService()
export default msgService