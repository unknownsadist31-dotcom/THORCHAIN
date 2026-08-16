
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

const l=`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3846_66842)">
<path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="white"/>
<path d="M26.9614 33.4188V21.1773C26.9614 18.1189 24.437 15.627 21.3787 15.627V35.1907C21.3787 39.0824 24.6797 40.3689 26.7186 40.3689C28.4096 40.3689 29.3644 40.0776 30.5133 39.2685C27.2931 38.9287 26.9614 36.9869 26.9614 33.4188Z" fill="black"/>
<path d="M15.1568 10.5059C12.3493 10.5059 10.0676 12.8279 10.0676 15.6355H32.8435C35.651 15.6355 37.9326 13.3134 37.9326 10.5059H15.1568Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_3846_66842">
<rect width="48" height="48" fill="white"/>
</clipPath>
</defs>
</svg>
`;export{l as default};
