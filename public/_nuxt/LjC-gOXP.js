
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
<circle cx="24" cy="24" r="24" fill="#FF0000"/>
<path d="M13.0695 32.9545L17.6944 32.9545C18.7833 32.9545 19.3278 32.9545 19.8137 32.8201C20.3464 32.6619 20.8324 32.3814 21.2363 31.9953C21.6073 31.6423 21.875 31.1743 22.403 30.2511L22.4034 30.2506L22.4189 30.2234L28.4173 19.6314C28.95 18.7016 29.2135 18.2337 29.3305 17.7425C29.4593 17.2103 29.4593 16.6489 29.3305 16.1167C29.2143 15.6292 28.9482 15.1647 28.4234 14.2487L28.4114 14.2278L26.0638 10.1342C25.5779 9.28035 25.332 8.85344 25.0217 8.69555C24.688 8.52596 24.2899 8.52596 23.9562 8.69555C23.646 8.85344 23.4001 9.28035 22.9142 10.1342L11.4947 30.241C11.0146 31.0831 10.7746 31.5043 10.7922 31.8492C10.8156 32.2235 11.0088 32.5627 11.3249 32.7675C11.6176 32.9545 12.0977 32.9545 13.0695 32.9545Z" fill="white"/>
<path d="M36.0008 32.9545L29.3739 32.9545C28.3962 32.9545 27.9044 32.9545 27.6175 32.7675C27.3014 32.5627 27.1082 32.2178 27.0848 31.8435C27.0674 31.5012 27.3093 31.0839 27.7934 30.2491L27.7936 30.249L27.8049 30.2294L31.1126 24.5568C31.5985 23.7206 31.8444 23.3053 32.1488 23.1474C32.4824 22.9778 32.8749 22.9778 33.2084 23.1474C33.5106 23.3012 33.746 23.6988 34.212 24.4859L34.2127 24.4871L34.2505 24.551L37.57 30.2236C37.5862 30.2515 37.602 30.279 37.6179 30.306L37.618 30.3061C38.078 31.0992 38.3129 31.504 38.296 31.8378C38.2783 32.2118 38.0793 32.557 37.7632 32.7618C37.4704 32.9545 36.9785 32.9545 36.0008 32.9545Z" fill="white"/>
</svg>
`;export{C as default};
