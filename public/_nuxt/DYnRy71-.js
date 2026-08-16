
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

const n=`<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="4" fill="white"/>
<path d="M28.9522 21.7363C29.2911 21.7367 29.4607 22.1471 29.2208 22.3867L25.5411 26.0635C25.3983 26.2061 25.2048 26.2861 25.003 26.2861H6.38094C6.04208 26.2858 5.87278 25.8765 6.11238 25.6367L9.79207 21.96C9.93484 21.8173 10.1283 21.7363 10.3302 21.7363H28.9522ZM25.003 14.8252C25.2048 14.8252 25.3983 14.9053 25.5411 15.0479L29.2208 18.7246C29.4607 18.9643 29.2911 19.3747 28.9522 19.375H10.3302C10.1283 19.375 9.93484 19.2941 9.79207 19.1514L6.11238 15.4756C5.87254 15.2359 6.042 14.8255 6.38094 14.8252H25.003ZM28.9522 8C29.2911 8.00034 29.4607 8.41069 29.2208 8.65039L25.5411 12.3271C25.3983 12.4697 25.2048 12.5498 25.003 12.5498H6.38094C6.042 12.5495 5.87254 12.1391 6.11238 11.8994L9.79207 8.22266C9.93482 8.08015 10.1285 8 10.3302 8H28.9522Z" fill="url(#paint0_linear_3832_26538)"/>
<defs>
<linearGradient id="paint0_linear_3832_26538" x1="21.7745" y1="2.98403" x2="8.88575" y2="27.6699" gradientUnits="userSpaceOnUse">
<stop stop-color="#00FFA3"/>
<stop offset="1" stop-color="#DC1FFF"/>
</linearGradient>
</defs>
</svg>
`;export{n as default};
