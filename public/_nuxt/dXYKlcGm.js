
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

const l=`<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="34" height="34" rx="3.5" fill="white" stroke="#EBEBEB"/>
<path d="M17.4944 3.99805L8.99536 18.1016L17.4944 14.2387V3.99805Z" fill="#8A92B2"/>
<path d="M17.4944 14.2402L8.99536 18.1031L17.4944 23.1282V14.2402Z" fill="#62688F"/>
<path d="M25.9953 18.1016L17.4946 3.99805V14.2387L25.9953 18.1016Z" fill="#62688F"/>
<path d="M17.4946 23.1282L25.9953 18.1031L17.4946 14.2402V23.1282Z" fill="#454A75"/>
<path d="M8.99536 19.7148L17.4944 31.6924V24.7367L8.99536 19.7148Z" fill="#8A92B2"/>
<path d="M17.4946 24.7367V31.6924L26 19.7148L17.4946 24.7367Z" fill="#62688F"/>
</svg>
`;export{l as default};
