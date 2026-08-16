
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
<g clip-path="url(#clip0_3846_66907)">
<path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 24C0 10.7644 10.7644 0 24 0C37.2356 0 48 10.7644 48 24C48 37.2356 37.2356 48 24 48C10.7644 48 0 37.2356 0 24ZM32.5609 12.8622V16.5147L22.4027 30.2924H32.5609V35.1369H26.0124V39.1511H21.9876V35.1369H15.4391V31.4844L25.5867 17.7067H15.4391V12.8622H21.9876V8.83733H26.0124V12.8622H32.5609Z" fill="#F4B728"/>
</g>
<defs>
<clipPath id="clip0_3846_66907">
<rect width="48" height="48" fill="white"/>
</clipPath>
</defs>
</svg>
`;export{l as default};
