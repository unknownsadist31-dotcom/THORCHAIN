
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

const t=`<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="4" fill="#23292F"/>
<path d="M25.6265 7H28.9501L22.0307 14.1894C19.5252 16.7929 15.4634 16.7929 12.9636 14.1894L6.04276 7H9.36634L14.6211 12.4613C16.2102 14.108 18.7798 14.108 20.3647 12.4613L25.6265 7ZM9.32501 27H6L12.9636 19.7621C15.4691 17.1585 19.5309 17.1585 22.0364 19.7621L29 27H25.675L20.3761 21.4901C18.787 19.8435 16.2173 19.8435 14.6325 21.4901L9.32501 27Z" fill="white"/>
</svg>
`;export{t as default};
