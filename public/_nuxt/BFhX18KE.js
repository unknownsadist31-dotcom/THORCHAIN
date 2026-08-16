
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

const c=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28">
  <g clip-path="url(#a)">
    <path fill="#2775ca" d="M14 28c7.758 0 14-6.242 14-14S21.758 0 14 0 0 6.242 0 14s6.242 14 14 14" />
    <path fill="#fff" d="M17.85 16.217c0-2.042-1.225-2.742-3.675-3.033-1.75-.234-2.1-.7-2.1-1.517s.583-1.342 1.75-1.342c1.05 0 1.633.35 1.925 1.225a.44.44 0 0 0 .408.292h.933a.4.4 0 0 0 .409-.409v-.058a2.914 2.914 0 0 0-2.625-2.392v-1.4c0-.233-.175-.408-.467-.466h-.875c-.233 0-.408.175-.467.466v1.342c-1.75.233-2.858 1.4-2.858 2.858 0 1.926 1.167 2.684 3.617 2.976 1.633.291 2.158.641 2.158 1.575s-.817 1.575-1.925 1.575c-1.517 0-2.042-.642-2.217-1.517-.058-.233-.233-.35-.408-.35h-.992a.4.4 0 0 0-.408.408v.059c.233 1.458 1.167 2.508 3.092 2.8v1.4c0 .233.175.408.466.466h.875c.234 0 .409-.175.467-.466v-1.4c1.75-.292 2.917-1.517 2.917-3.092" />
    <path fill="#fff" d="M11.025 22.342c-4.55-1.633-6.883-6.708-5.191-11.2.875-2.45 2.8-4.317 5.191-5.192.233-.117.35-.292.35-.583V4.55c0-.233-.117-.408-.35-.466-.058 0-.175 0-.233.058-5.542 1.75-8.575 7.642-6.825 13.183a10.5 10.5 0 0 0 6.825 6.825c.233.117.466 0 .525-.233.058-.059.058-.117.058-.234v-.816c0-.175-.175-.409-.35-.525m6.184-18.2c-.234-.117-.467 0-.526.233-.058.059-.058.117-.058.234v.816c0 .234.175.467.35.583 4.55 1.634 6.883 6.709 5.192 11.2-.875 2.45-2.8 4.317-5.192 5.192-.233.117-.35.292-.35.584v.816c0 .233.117.409.35.467.058 0 .175 0 .233-.058 5.542-1.75 8.576-7.642 6.826-13.184a10.58 10.58 0 0 0-6.825-6.883" />
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h28v28H0z" />
    </clipPath>
  </defs>
</svg>
`;export{c as default};
