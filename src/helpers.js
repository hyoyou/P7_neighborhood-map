// Add Google Map to page dynamically through asynchronous code injection
// Lazy Load Async Pattern from https://friendlybit.com/js/lazy-loading-asyncronous-javascript/
export const lazyLoad = function(url) {
    let script = window.document.createElement('script');
    script.defer = true;
    script.onload = "this.checkError()";
    script.onerror = "this.gm_authFailure()";
  
    script.src = url;
    document.body.appendChild(script);     
}