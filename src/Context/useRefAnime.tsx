import { useState, useEffect } from "react";

function useRefAnime<T extends HTMLElement>(
  ref: React.RefObject<T>,
  options?: IntersectionObserverInit
) {
  const [inViewport, setInViewport] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.map((entry) => setInViewport(entry.isIntersecting));
      console.log(entries);
    }, options);
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options, ref]);
  return inViewport;
}
export default useRefAnime;
