import Document, { Html, Head, Main, NextScript } from "next/document";
//import { RecoilRoot } from "recoil";

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
         <script dangerouslySetInnerHTML={{ __html: ` var analytics = window.analytics = window.analytics || [];if (!analytics.initialize)if (analytics.invoked)window.console && console.error && console.error("Segment snippet included twice."); else { analytics.invoked = !0; analytics.methods = ["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory = function (t) {return function () {var e = Array.prototype.slice.call(arguments); e.unshift(t); analytics.push(e); return analytics }}; for (var t = 0; t < analytics.methods.length; t++) { var e = analytics.methods[t]; analytics[e] = analytics.factory(e) }analytics.load = function (t) {var e = document.createElement("script"); e.type = "text/javascript"; e.async = !0; e.src = ("https:" === document.location.protocol ? "https://" : "http://") + "cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js"; var n = document.getElementsByTagName("script")[0]; n.parentNode.insertBefore(e,n)}; analytics.SNIPPET_VERSION = "4.0.0"; analytics.load("NxWwVQbYbPt1ZryDRMickVNeGqcsk5Rg"); analytics.page();} `}} /> 
        <Head />
        <body className="text-white  bg-white  ">
        
          <Main />
          <NextScript />
        
        </body>
      </Html>
    );
  }
}

export default CustomDocument;