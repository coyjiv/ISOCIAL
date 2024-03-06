import { useEffect, useRef } from "react";

const useClickOutside = (handler) => {
  const targetElRef = useRef();

  useEffect(() => {
    if (typeof handler === "function") {
      const listener = (event) => {
        if (
          !targetElRef.current ||
          targetElRef.current.contains(event.target)
        ) {
          return;
        }
        handler?.(event);
      };
      document.addEventListener("mousedown", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
      };
    }
  }, [targetElRef, handler]);

  return targetElRef;
};

export default useClickOutside;
