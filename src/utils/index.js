export function scrollToTop() {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const topPosition = rootElement.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: topPosition,
      behavior: 'smooth',
    });
  }
}
