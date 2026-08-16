
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

const l=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
  <path d="M11.945 11.055c0 .26-.14.4-.395.405l-.32.01c-.27.01-.41-.13-.405-.396L10.85 7.7l-.04-.02-4.505 4.506c-.185.185-.385.185-.57 0l-.29-.29c-.185-.185-.18-.38.005-.566l4.505-4.505-.02-.04-3.37.03C6.3 6.82 6.16 6.68 6.17 6.41l.005-.325c.01-.26.15-.39.405-.395l5.365.005z"/>
</svg>
`;export{l as default};
