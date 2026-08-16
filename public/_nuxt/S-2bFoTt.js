
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

const h=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145 16">
  <path d="M4.463 2.5H0V.152h11.526v2.352H7.077V15.77H4.463zM17.113.152h2.594v6.755h6.557V.152h2.614v15.624h-2.614v-6.52h-6.557v6.52h-2.594zM37.86 15.296q-1.328-.606-2.003-2.3t-.674-4.985q0-3.282.684-5.017.685-1.736 2.014-2.369Q39.211.001 41.444 0q2.235-.001 3.595.625 1.338.625 2.014 2.35t.675 5.029q-.001 3.281-.686 4.985-.686 1.703-2.003 2.307t-3.595.604q-2.277.002-3.584-.604m5.808-2.17q.77-.424 1.108-1.598.337-1.174.337-3.528 0-2.435-.348-3.642-.35-1.206-1.107-1.61-.759-.4-2.214-.4-1.412 0-2.171.411-.76.412-1.117 1.61-.36 1.195-.359 3.63 0 2.371.326 3.529.327 1.157 1.094 1.598.758.423 2.235.423 1.448 0 2.216-.423M54.031.152h6.325q1.983 0 3.142 1.05 1.16 1.048 1.16 3.796 0 2.074-.729 3.026a3.94 3.94 0 0 1-1.907 1.356l2.994 6.392H62.38l-2.698-6.011q-1.287 0-3.057-.044v6.055H54.03zm5.883 7.516q1.012 0 1.57-.582.558-.58.562-2.084 0-1.44-.562-1.976-.562-.537-1.57-.53h-3.29v5.165zm13.009 7.607q-1.181-.625-1.804-2.361t-.62-5.016q0-3.116.632-4.838.632-1.723 1.855-2.392Q74.206 0 76.148 0q1.278 0 2.54.202 1.108.165 2.183.475v2.016q-.632-.126-1.803-.232a27 27 0 0 0-2.39-.105q-1.39 0-2.14.433t-1.085 1.62q-.338 1.185-.338 3.529 0 2.342.317 3.535.315 1.189 1.054 1.63.738.442 2.171.445 2.117.017 4.217-.233v2.011q-1.918.564-4.786.573-1.984 0-3.165-.624M87.007.152H89.6v6.755h6.557V.152h2.615v15.624h-2.615v-6.52H89.6v6.52h-2.593zm22.56 0h3.289l5.06 15.624h-2.72l-1.202-3.709h-5.622l-1.181 3.705h-2.67zm3.795 9.57-2.193-7.324-2.193 7.323zM123.63.152h2.593v15.624h-2.593zm9.465 0h2.087l7.084 11.157V.152h2.615v15.624h-2.088l-7.084-11.15v11.15h-2.614z"/>
</svg>
`;export{h as default};
