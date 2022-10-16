import { keyboardKey } from "@testing-library/user-event";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Item from "./components/Item";
import items from "./items.json";

function App() {
  const itemsRef = useRef<HTMLElement>(null);
  const [cursor, setCursor] = useState(1);
  const numberOfColumns = 4;
  const totalNumberOfFiles = items.length;

  useEffect(() => {
    const handleKey = (event: keyboardKey) => {
      if (event.key === "ArrowRight") {
        setCursor((prevCursor) => {
          if (prevCursor === totalNumberOfFiles) {
            return totalNumberOfFiles;
          }

          return prevCursor + 1;
        });
      }

      if (event.key === "ArrowLeft") {
        setCursor((prevCursor) => {
          if (prevCursor === 0) {
            return 0;
          }

          return prevCursor - 1;
        });
      }

      if (event.key === "ArrowDown") {
        setCursor((prevCursor) => {
          if (prevCursor + numberOfColumns > totalNumberOfFiles) {
            return prevCursor;
          }

          return prevCursor + numberOfColumns;
        });
      }

      if (event.key === "ArrowUp") {
        setCursor((prevCursor) => {
          if (prevCursor - numberOfColumns < 0) {
            return prevCursor;
          }

          return prevCursor - numberOfColumns;
        });
      }
    };

    if (itemsRef.current) {
      const currentCursor = itemsRef.current;

      currentCursor.addEventListener("keyup", handleKey);

      return () => currentCursor.removeEventListener("keyup", handleKey);
    }
  }, [totalNumberOfFiles, numberOfColumns]);

  useEffect(() => {
    if (itemsRef.current) {
      const selectCursor = itemsRef.current.querySelector(
        `input[name='item ${cursor}']`
      );
      (selectCursor as HTMLInputElement)?.focus();
    }
  }, [cursor]);

  return (
    <main ref={itemsRef} className="main">
      <h1 className="title">Custom keyboard navigation</h1>

      <section className="items">
        {items.map((item) => {
          const tabIndex = cursor === item.id ? 0 : -1;

          return <Item {...item} tabIndex={tabIndex} />;
        })}
      </section>
    </main>
  );
}

export default App;
