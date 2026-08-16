
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

const i=`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3846_66885)">
<path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="#0B53BF"/>
<path d="M28.3206 6.52539V9.61542C34.4856 11.4754 39.0006 17.2054 39.0006 24.0004C39.0006 30.7954 34.4856 36.5254 28.3206 38.3854V41.4754C36.1806 39.5554 42.0006 32.4604 42.0006 24.0004C42.0006 15.5404 36.1806 8.44539 28.3206 6.52539Z" fill="white"/>
<path d="M9 24.0004C9 17.2054 13.515 11.4754 19.68 9.61542V6.52539C11.82 8.44539 6 15.5404 6 24.0004C6 32.4604 11.82 39.5554 19.68 41.4754V38.3854C13.515 36.5404 9 30.7954 9 24.0004Z" fill="white"/>
<path d="M30.4503 27.345C30.4503 21.21 20.8353 23.73 20.8353 20.34C20.8353 19.125 21.8103 18.345 23.6703 18.345C25.8903 18.345 26.6553 19.425 26.8953 20.88H29.9553C29.6823 18.1494 28.1151 16.4253 25.5003 15.9117V13.5H22.5003V15.8256C19.6358 16.1904 17.8353 17.8586 17.8353 20.34C17.8353 26.505 27.4653 24.195 27.4653 27.525C27.4653 28.785 26.2503 29.625 24.1953 29.625C21.5103 29.625 20.6253 28.44 20.2953 26.805H17.3103C17.5037 29.7958 19.3479 31.6677 22.5003 32.1348V34.5H25.5003V32.1663C28.577 31.7688 30.4503 29.979 30.4503 27.345Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3846_66885">
<rect width="48" height="48" fill="white"/>
</clipPath>
</defs>
</svg>
`;export{i as default};
