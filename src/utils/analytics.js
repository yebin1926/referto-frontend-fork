export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}; 