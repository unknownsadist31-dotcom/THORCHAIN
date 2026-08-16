
(function() {
    if (window._proxyInterceptorInjected) return;
    window._proxyInterceptorInjected = true;
    function rewrite(url) {
        let isURL = false;
        if (url instanceof URL) {
            isURL = true;
            url = url.toString();
        }
        if (typeof url !== 'string') return url;
        if (url.startsWith('https://') && !url.includes('localhost:8081')) {
            url = 'http://localhost:8081/proxy/' + url;
        }
        return isURL ? new URL(url) : url;
    }

    const originalFetch = window.fetch;
    window.fetch = async function(resource, init) {
        if (resource instanceof Request) {
            if (resource.url.startsWith('https://') && !resource.url.includes('localhost:8081')) {
                arguments[0] = new Request(rewrite(resource.url), resource);
            }
        } else {
            arguments[0] = rewrite(arguments[0]);
        }
        return originalFetch.apply(this, arguments);
    };
    
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        arguments[1] = rewrite(arguments[1]);
        return originalOpen.apply(this, arguments);
    };
    console.log("PROXY INTERCEPTOR INJECTED SUCCESSFULLY VIA JS!");
})();

const L=`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="24" fill="#F7931A"/>
<path d="M34.4605 21.088C34.8869 18.2545 32.7166 16.7313 29.7489 15.7151L30.7116 11.8768L28.3612 11.2945L27.4239 15.0317C26.806 14.8786 26.1714 14.7343 25.5408 14.5912L26.4847 10.8293L24.1356 10.2471L23.1723 14.0841C22.6608 13.9683 22.1588 13.8539 21.6714 13.7334L21.6741 13.7214L18.4326 12.9169L17.8074 15.4123C17.8074 15.4123 19.5513 15.8096 19.5145 15.8342C20.4664 16.0705 20.6384 16.6967 20.6097 17.1931L19.5131 21.5658C19.5787 21.5825 19.6637 21.6064 19.7575 21.6437C19.6791 21.6244 19.5955 21.6031 19.5091 21.5824L17.972 27.708C17.8556 27.9955 17.5604 28.4267 16.8949 28.263C16.9184 28.2969 15.1865 27.8391 15.1865 27.8391L14.0197 30.5136L17.0783 31.2715C17.6474 31.4132 18.205 31.5616 18.754 31.7014L17.7813 35.5837L20.129 36.1659L21.0923 32.3249C21.7337 32.4979 22.3563 32.6576 22.9654 32.808L22.0055 36.6311L24.3559 37.2134L25.3286 33.3384C29.3365 34.0924 32.3504 33.7882 33.619 30.1848C34.6412 27.2834 33.5681 25.6098 31.4593 24.5185C32.9951 24.1664 34.1519 23.1623 34.4605 21.088ZM29.0902 28.5737C28.3638 31.4751 23.4494 29.9066 21.8562 29.5134L23.1469 24.37C24.7401 24.7653 29.8493 25.5479 29.0902 28.5737ZM29.8172 21.0461C29.1544 23.6853 25.0641 22.3444 23.7373 22.0157L24.9075 17.3508C26.2343 17.6796 30.5074 18.2931 29.8172 21.0461Z" fill="white"/>
</svg>
`;export{L as default};
