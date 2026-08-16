
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

const n=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 41">
  <path fill="url(#a)" d="m0 41 28.507-12.054-9.018-9.187zm10.47-30.415 9.019 9.174L35.599 0z" />
  <defs>
    <linearGradient id="a" x1="0" x2="35.598" y1="20.5" y2="20.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0cf" />
      <stop offset="1" stop-color="#3f9" />
    </linearGradient>
  </defs>
</svg>
`;export{n as default};
