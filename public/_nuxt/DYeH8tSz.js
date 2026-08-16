
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
<g clip-path="url(#clip0_3846_66848)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#EA0029"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.8393 13.7526L8.448 10.4648L21.5125 42.8027L39.5209 19.7537L31.8393 13.7526ZM35.1652 19.3321L27.563 20.9587L31.5169 16.4823L35.1642 19.3321H35.1652ZM29.0461 15.7317L24.1665 21.2562L14.4742 13.6845L29.0461 15.7327V15.7317ZM21.2858 35.9736L13.0287 15.535L23.058 23.3704L21.2868 35.9736H21.2858ZM23.6123 36.2995L25.3651 23.8298L34.9585 21.7775L23.6133 36.2995H23.6123Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3846_66848">
<rect width="48" height="48" fill="white"/>
</clipPath>
</defs>
</svg>
`;export{l as default};
