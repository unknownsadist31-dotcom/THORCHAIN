
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
<path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="#F5F5F5"/>
<path d="M23.9949 2.01758L10.5024 24.4076L23.9949 18.2751V2.01758Z" fill="#8A92B2"/>
<path d="M23.9949 18.2754L10.5024 24.4079L23.9949 32.3854V18.2754Z" fill="#62688F"/>
<path d="M37.4901 24.4076L23.9951 2.01758V18.2751L37.4901 24.4076Z" fill="#62688F"/>
<path d="M23.9951 32.3854L37.4901 24.4079L23.9951 18.2754V32.3854Z" fill="#454A75"/>
<path d="M10.5024 26.9668L23.9949 45.9818V34.9393L10.5024 26.9668Z" fill="#8A92B2"/>
<path d="M23.9951 34.9393V45.9818L37.4976 26.9668L23.9951 34.9393Z" fill="#62688F"/>
</svg>
`;export{l as default};
