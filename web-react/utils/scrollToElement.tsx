const scrollToElement = (id: string) => {
  if (!id && !document && !window) return;

  const element = document.getElementById(id);
  if (!element) return;

  const elementRect = element.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const middle = absoluteElementTop - window.innerHeight / 2;

  element.focus();
  window.scrollTo(0, middle);
};

export default scrollToElement;
