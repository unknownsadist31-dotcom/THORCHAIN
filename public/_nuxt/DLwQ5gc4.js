
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

const L=`<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="4" fill="#EF0027"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 4L15.359 30.25L29.7917 12.5401L24.682 7.64787L5 4ZM8.6724 6.08804L22.8593 8.71789L17.3524 13.3389L8.6724 6.08804ZM7.6886 7.06471L16.7347 14.6216L15.3203 26.4054L7.6886 7.06471ZM24.3652 9.25496L27.3759 12.1377L19.1417 13.6396L24.3652 9.25496ZM18.0441 15.2467L27.1623 13.5841L16.7036 26.4178L18.0441 15.2467Z" fill="#FEFEFE"/>
</svg>
`;export{L as default};
