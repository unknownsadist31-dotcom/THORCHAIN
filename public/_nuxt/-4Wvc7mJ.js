
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
<g clip-path="url(#clip0_3846_67223)">
<path d="M35.2735 33.2404H21.9079L24.4067 24.8143L28.242 23.7102L29.0556 20.9208L25.2202 22.083L29.288 8.25253V8.0782C29.288 7.67142 28.9975 7.38086 28.5907 7.38086H23.4188C23.012 7.38086 22.6633 7.67142 22.5471 8.0782L17.782 24.4075L13.9466 25.5697L13.075 28.301L16.9103 27.1387L13.4817 38.8191H33.8788C34.2856 38.8191 34.6343 38.5286 34.7505 38.1799L35.9127 34.1702V33.9959C35.9708 33.531 35.6803 33.2404 35.2735 33.2404Z" fill="white"/>
<path d="M24 0C10.7506 0 0 10.7506 0 24C0 37.2494 10.7506 48 24 48C37.2494 48 48 37.2494 48 24C48.0581 10.7506 37.3075 0 24 0Z" fill="#345D9D"/>
<path d="M35.9127 34.1116L34.7505 38.1213C34.6343 38.5281 34.2856 38.7605 33.8788 38.7605H13.4817L16.9103 27.0801L13.075 28.2424L13.9466 25.5692L17.782 24.407L22.6052 8.0196C22.7214 7.61282 23.0701 7.38038 23.4769 7.32227H28.6488C29.0556 7.32227 29.3461 7.61282 29.3461 8.0196V8.19394L25.2783 22.0244L29.1137 20.8622L28.3001 23.6516L24.4067 24.8138L21.9079 33.2399H35.2735C35.6803 33.2399 35.9708 33.5305 35.9708 33.9373C35.9708 33.9954 35.9708 34.0535 35.9127 34.1116Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3846_67223">
<rect width="48" height="48" fill="white"/>
</clipPath>
</defs>
</svg>
`;export{L as default};
