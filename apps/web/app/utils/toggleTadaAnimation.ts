const toggleTadaAnimation = (element: Element | null): void => {
    if (!element) {
      return;
    }
    if (element.classList.contains('animate-tada')) {
      // element.classList.remove('animate-tada');
      return;
    } else {
      element.classList.add('animate-tada');
      setTimeout(() => {
        element.classList.remove('animate-tada');
      }, 300);
    }
  }

  export { toggleTadaAnimation }