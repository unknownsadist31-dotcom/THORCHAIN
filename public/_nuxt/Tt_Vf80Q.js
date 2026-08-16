
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

const t=`<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="4" fill="#FF0000"/>
<path d="M18.7518 7.60309C18.309 6.80372 17.1619 6.79783 16.7106 7.5924L6.15439 26.1787C5.71144 26.9587 6.27441 27.9269 7.17124 27.9272H12.2554C13.451 27.9272 14.5565 27.2883 15.1532 26.2524L21.3109 15.5638C21.8961 14.5482 21.9066 13.3004 21.3387 12.275L18.7518 7.60309ZM25.6283 19.8041C25.1885 19.0151 24.0584 19.0009 23.5988 19.7785L19.8284 26.1615C19.3676 26.9416 19.9296 27.9272 20.8357 27.9272H28.1618C29.0543 27.9269 29.6184 26.9671 29.1841 26.1872L25.6283 19.8041Z" fill="white"/>
</svg>
`;export{t as default};
