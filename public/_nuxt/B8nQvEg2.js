
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
<circle cx="24" cy="24" r="24" fill="#F3BA2F"/>
<path d="M15.1947 12.1677L23.9902 7.0127L32.7856 12.1677L29.4875 13.9788L23.9902 10.774L18.3556 13.9788L15.1947 12.1677ZM32.6471 18.5774L29.4862 16.7663L23.9902 19.9712L18.3556 16.7663L15.1947 18.5774V22.34L20.692 25.5449V32.0937L23.853 34.0439L27.0139 32.0937V25.684L32.5112 22.4792V18.5774H32.6471ZM32.6471 28.8875V25.1262L29.4875 27.0764V30.6986L32.6471 28.8875ZM34.9835 30.1422L29.4862 33.347V37.1083L38.2817 31.9532V21.6432L34.9835 23.7325V30.1422ZM31.8239 15.3726L34.9848 17.3228V21.0854L38.1458 19.1352V15.3726L34.9848 13.4224L31.8239 15.3726ZM20.692 34.7394V38.5007L23.853 40.4509L27.0139 38.5007V34.7394L23.853 36.6896L20.692 34.7394ZM15.1947 28.8875L18.3556 30.6986V26.9373L15.1947 24.9871V28.8875ZM20.692 15.3726L23.853 17.3228L27.1511 15.3726L23.9902 13.4224L20.692 15.3726ZM12.8583 17.3228L16.1565 15.3726L12.8583 13.4224L9.69871 15.3726V19.1339L12.8596 21.0841V17.3228H12.8583ZM12.8583 23.7325L9.69739 21.7823V32.0924L18.4929 37.2474V33.4861L12.9955 30.2813V23.7325H12.8583Z" fill="white"/>
</svg>
`;export{L as default};
