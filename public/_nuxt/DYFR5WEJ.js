
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

const c=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  <path fill-rule="evenodd" d="M8.151 1.823c-1.613.216-3.187 1.02-4.331 2.212A7.47 7.47 0 0 0 1.798 8.3a9.7 9.7 0 0 0 0 1.733c.374 2.918 2.348 5.311 5.111 6.196a6.9 6.9 0 0 0 2.258.342c1.537 0 2.924-.425 4.177-1.281l.294-.201 1.906 1.904c1.451 1.449 1.942 1.92 2.056 1.971.399.18.877-.019 1.015-.425.066-.192.065-.287-.003-.491-.049-.149-.238-.349-1.964-2.081l-1.91-1.917.124-.137c.522-.583 1.085-1.606 1.367-2.489a7.53 7.53 0 0 0 .173-3.882 7.43 7.43 0 0 0-6.263-5.722 10 10 0 0 0-1.988.003m2.159 1.539c1.169.243 2.127.749 2.969 1.568a5.86 5.86 0 0 1 1.708 3.187c.089.474.089 1.625 0 2.1a5.83 5.83 0 0 1-1.742 3.216 5.5 5.5 0 0 1-1.428 1.016 5.9 5.9 0 0 1-4.492.338 5.95 5.95 0 0 1-3.777-3.776c-.214-.652-.265-1.003-.265-1.844s.051-1.193.265-1.845c.663-2.021 2.417-3.57 4.474-3.953.535-.099.507-.097 1.261-.085.542.008.774.026 1.027.078"/>
</svg>
`;export{c as default};
