
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

const C=`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3846_67077)">
<path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="#0AC18E"/>
<path d="M31.4862 15.9416C30.2801 13.2066 27.5086 12.6219 24.1157 13.1883L23.0253 8.96094L20.4548 9.6249L21.5268 13.8401C20.8507 14.0107 20.1563 14.1569 19.468 14.3518L18.3959 10.1609L15.8253 10.8249L16.9157 15.0523C16.3614 15.2107 11.7258 16.3985 11.7258 16.3985L12.4324 19.1518C12.4324 19.1518 14.3208 18.6219 14.3025 18.6645C15.3502 18.3904 15.8436 18.9142 16.0751 19.4076L19.072 30.9934C19.1086 31.3284 19.0477 31.901 18.3289 32.096C18.3715 32.1203 16.4588 32.5772 16.4588 32.5772L16.739 35.7873C16.739 35.7873 21.3319 34.6117 21.935 34.4594L23.0375 38.7356L25.6081 38.0716L24.5055 33.765C25.2121 33.6005 25.9004 33.43 26.5705 33.2533L27.6669 37.5356L30.2375 36.8716L29.135 32.6015C33.0944 31.6391 35.8903 29.1416 35.3177 25.3224C34.9522 23.0198 32.4365 21.1315 30.3472 20.9183C31.6324 19.7792 32.2842 18.1163 31.4862 15.9416ZM30.2497 26.0229C30.7614 29.8056 25.5045 30.2686 23.7685 30.7254L22.2578 25.0665C23.9999 24.6097 29.3847 22.6909 30.2497 26.0229ZM27.0822 18.3173C27.6243 21.6797 23.1289 22.0696 21.6791 22.4411L20.3025 17.3061C21.7583 16.9467 25.9796 15.2046 27.0822 18.3173Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3846_67077">
<rect width="48" height="48" fill="white"/>
</clipPath>
</defs>
</svg>
`;export{C as default};
