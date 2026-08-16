
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
<rect width="35" height="35" rx="4" fill="#F3BA2F"/>
<path d="M20.4766 28.7422L18.0166 30.25L15.5566 28.7422V25.7979L18.0166 27.3066L20.4766 25.7979V28.7422ZM9.45996 17.125V22.1729L13.6963 24.7393V27.6836L7 23.6807V15.6172L9.45996 17.125ZM29.0332 23.6807L22.3369 27.6836V24.7393L26.5732 22.1729V17.125L29.0332 15.6172V23.6807ZM24.7852 13.1113V16.0547L20.3936 18.6211V23.7549L18.0166 25.2178L15.6396 23.7549V18.6211L11.248 16.0547V13.1113L13.7803 11.6025L18.0166 14.1699L22.2529 11.6025L24.7852 13.1113ZM13.709 19.6797V22.624L11.248 21.1143V18.1709L13.709 19.6797ZM24.7852 21.1143L22.3252 22.624V19.6797L24.7852 18.1709V21.1143ZM11.9922 10.5557L9.45996 12.0645V15.0078L7 13.5V10.5557L9.45996 9.04785L11.9922 10.5557ZM29.0332 10.5557V13.5L26.5732 15.0078V12.0645L24.041 10.5557L26.5732 9.04785L29.0332 10.5557ZM20.4766 10.5557L18.0166 12.0645L15.5566 10.5557L18.0166 9.04785L20.4766 10.5557ZM24.7256 8.00195L22.2646 9.51074L18.0166 6.98633L13.7686 9.51074L11.3086 8.00195L18.0166 4L24.7256 8.00195Z" fill="white"/>
</svg>
`;export{L as default};
