
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

const n=`<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="75" cy="75" r="75" fill="url(#paint0_linear_3846_67313)"/>
<path d="M27 132.5L103.861 98.6928L79.529 72.9217L27 132.5ZM55.2353 47.1902L79.5669 72.9217L123 17.5L55.2353 47.1902Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_3846_67313" x1="150" y1="75.1149" x2="-5.35759e-07" y2="75.1149" gradientUnits="userSpaceOnUse">
<stop stop-color="#33FF99"/>
<stop offset="1" stop-color="#00CCFF"/>
</linearGradient>
</defs>
</svg>
`;export{n as default};
