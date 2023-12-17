import React from "react";

function useKeydown(key: string, callback: any) {
  React.useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.code === key) {
        callback(event);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, callback]);
}

export default useKeydown;
