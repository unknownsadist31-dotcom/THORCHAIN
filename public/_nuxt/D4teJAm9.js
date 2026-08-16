
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
<g clip-path="url(#clip0_3846_66892)">
<path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="#009393"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.0293 25.7158C28.1567 25.7158 31.6061 25.018 32.4491 24.0856C31.7333 23.2948 29.1443 22.672 25.8563 22.5016V24.4714C25.2677 24.502 24.6557 24.517 24.0287 24.517C23.4017 24.517 22.7897 24.502 22.1999 24.4714V22.5016C18.9131 22.672 16.3229 23.2948 15.6071 24.0856C16.4513 25.018 19.9013 25.7158 24.0287 25.7158H24.0293ZM31.3625 16.444V19.1566H25.8563V21.0376C29.7239 21.2386 32.6261 22.0654 32.6477 23.0548V25.1176C32.6261 26.107 29.7239 26.932 25.8563 27.1336V31.75H22.2005V27.1336C18.3329 26.9326 15.4319 26.107 15.4103 25.1176V23.0548C15.4319 22.0654 18.3329 21.2386 22.2005 21.0376V19.1566H16.6943V16.444H31.3631H31.3625ZM14.5289 12.127H33.8585C34.3205 12.127 34.7459 12.37 34.9763 12.7648L40.6073 22.4344C40.8989 22.936 40.8125 23.569 40.3961 23.9752L24.8957 39.106C24.3929 39.5962 23.5853 39.5962 23.0837 39.106L7.60254 23.9956C7.17714 23.5792 7.09674 22.9282 7.41054 22.4242L13.4303 12.7348C13.6649 12.358 14.0813 12.1276 14.5295 12.1276L14.5289 12.127Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3846_66892">
<rect width="48" height="48" fill="white"/>
</clipPath>
</defs>
</svg>
`;export{l as default};
