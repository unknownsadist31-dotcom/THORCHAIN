
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
<g clip-path="url(#clip0_3846_67232)">
<path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="#F7931A"/>
<path d="M34.4603 21.0871C34.8868 18.2535 32.7164 16.7303 29.7488 15.7142L30.7115 11.8758L28.361 11.2935L27.4238 15.0307C26.8059 14.8777 26.1713 14.7333 25.5407 14.5902L26.4846 10.8284L24.1355 10.2461L23.1722 14.0831C22.6607 13.9673 22.1586 13.8529 21.6713 13.7324L21.674 13.7204L18.4325 12.9159L17.8073 15.4114C17.8073 15.4114 19.5512 15.8086 19.5143 15.8333C20.4663 16.0695 20.6383 16.6957 20.6095 17.1921L19.513 21.5648C19.5786 21.5815 19.6636 21.6054 19.7573 21.6427C19.679 21.6234 19.5953 21.6021 19.509 21.5815L17.9719 27.707C17.8554 27.9945 17.5602 28.4257 16.8948 28.262C16.9182 28.2959 15.1864 27.8381 15.1864 27.8381L14.0195 30.5126L17.0782 31.2705C17.6473 31.4123 18.2049 31.5606 18.7538 31.7004L17.7812 35.5827L20.1289 36.1649L21.0922 32.3239C21.7335 32.497 22.3561 32.6567 22.9653 32.8071L22.0053 36.6301L24.3558 37.2124L25.3285 33.3374C29.3364 34.0914 32.3503 33.7873 33.6189 30.1838C34.6411 27.2824 33.568 25.6088 31.4592 24.5175C32.9949 24.1655 34.1517 23.1613 34.4603 21.0871ZM29.0901 28.5728C28.3637 31.4742 23.4493 29.9057 21.856 29.5124L23.1467 24.3691C24.74 24.7643 29.8492 25.5469 29.0901 28.5728ZM29.8171 21.0451C29.1543 23.6843 25.064 22.3434 23.7372 22.0147L24.9074 17.3499C26.2342 17.6786 30.5073 18.2921 29.8171 21.0451Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3846_67232">
<rect width="48" height="48" fill="white"/>
</clipPath>
</defs>
</svg>
`;export{C as default};
