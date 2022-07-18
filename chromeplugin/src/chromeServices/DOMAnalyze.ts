class DomAnalyze {
    init() {
        const html_ = this.DOMtoString(document);
        console.log('html:', html_);
    }
    DOMtoString(document_root: any) : string {
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
}

const domAnalyze = new DomAnalyze()
export default domAnalyze