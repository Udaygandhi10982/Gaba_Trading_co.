/**
 * Lightweight SPA navigation utility.
 * Updates address bar and triggers popstate event to let the Router re-render.
 */
export const navigate = (path, scrollToTop = true) => {
  window.history.pushState(null, '', path);
  window.dispatchEvent(new Event('popstate'));
  if (scrollToTop) {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
};
