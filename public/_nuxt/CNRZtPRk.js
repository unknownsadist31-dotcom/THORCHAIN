
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

const l=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <path d="M23.67 0c13.074 0 23.672 10.598 23.673 23.67l-.008.612c-.324 12.791-10.795 23.06-23.664 23.06l-.61-.007C10.27 47.011 0 36.54 0 23.671 0 10.598 10.598 0 23.67 0m0 4C12.808 4 4 12.807 4 23.67c0 10.865 8.807 19.673 19.67 19.673 10.865 0 19.673-8.808 19.673-19.672S34.535 4 23.67 4m10.395 12.367a2 2 0 1 1 2.881 2.774l-14.24 14.795a2 2 0 0 1-2.803.077l-7.952-7.398a2 2 0 0 1 2.725-2.928l6.512 6.057z"/>
</svg>
`;export{l as default};
