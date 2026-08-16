
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

const t=`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3926_76573)">
<path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="white"/>
<path d="M39.768 32.008L34.5079 37.5037C34.3936 37.6231 34.2552 37.7183 34.1014 37.7833C33.9477 37.8484 33.7819 37.8819 33.6143 37.8818H8.67878C8.5598 37.8818 8.44341 37.8479 8.34391 37.7844C8.24442 37.7208 8.16615 37.6303 8.11872 37.524C8.0713 37.4177 8.05678 37.3002 8.07696 37.186C8.09714 37.0718 8.15113 36.9658 8.2323 36.881L13.4964 31.3853C13.6104 31.2663 13.7483 31.1713 13.9016 31.1063C14.0548 31.0412 14.2201 31.0075 14.3873 31.0072H39.3214C39.4404 31.0072 39.5568 31.0411 39.6563 31.1047C39.7557 31.1682 39.834 31.2587 39.8816 31.365C39.9289 31.4713 39.9434 31.5888 39.9232 31.703C39.9031 31.8173 39.8491 31.9233 39.768 32.008ZM34.5079 20.9413C34.3936 20.8219 34.2552 20.7267 34.1014 20.6617C33.9477 20.5966 33.7819 20.5631 33.6143 20.5632H8.67878C8.5598 20.5632 8.44341 20.5971 8.34391 20.6606C8.24442 20.7242 8.16615 20.8147 8.11872 20.921C8.0713 21.0273 8.05678 21.1448 8.07696 21.259C8.09714 21.3732 8.15113 21.4792 8.2323 21.564L13.4964 27.0597C13.6104 27.1787 13.7483 27.2737 13.9016 27.3387C14.0548 27.4038 14.2201 27.4375 14.3873 27.4377H39.3214C39.4404 27.4377 39.5568 27.4039 39.6563 27.3403C39.7557 27.2767 39.834 27.1863 39.8816 27.08C39.9289 26.9737 39.9434 26.8562 39.9232 26.7419C39.9031 26.6277 39.8491 26.5217 39.768 26.437L34.5079 20.9413ZM8.67878 16.9937H33.6143C33.7819 16.9938 33.9477 16.9603 34.1014 16.8952C34.2552 16.8302 34.3936 16.735 34.5079 16.6156L39.768 11.1199C39.8491 11.0352 39.9031 10.9292 39.9232 10.8149C39.9434 10.7007 39.9289 10.5832 39.8816 10.4769C39.834 10.3706 39.7557 10.2801 39.6563 10.2166C39.5568 10.153 39.4404 10.1191 39.3214 10.1191H14.3873C14.2201 10.1194 14.0548 10.1531 13.9016 10.2182C13.7483 10.2832 13.6104 10.3782 13.4964 10.4972L8.23366 15.9929C8.15256 16.0776 8.0986 16.1835 8.07837 16.2976C8.05815 16.4117 8.07255 16.5291 8.11981 16.6353C8.16707 16.7416 8.24513 16.8321 8.34442 16.8957C8.44371 16.9594 8.55991 16.9934 8.67878 16.9937Z" fill="url(#paint0_linear_3926_76573)"/>
</g>
<defs>
<linearGradient id="paint0_linear_3926_76573" x1="10.7578" y1="38.5435" x2="36.1441" y2="9.16757" gradientUnits="userSpaceOnUse">
<stop offset="0.08" stop-color="#9945FF"/>
<stop offset="0.3" stop-color="#8752F3"/>
<stop offset="0.5" stop-color="#5497D5"/>
<stop offset="0.6" stop-color="#43B4CA"/>
<stop offset="0.72" stop-color="#28E0B9"/>
<stop offset="0.97" stop-color="#19FB9B"/>
</linearGradient>
<clipPath id="clip0_3926_76573">
<rect width="48" height="48" fill="white"/>
</clipPath>
</defs>
</svg>
`;export{t as default};
