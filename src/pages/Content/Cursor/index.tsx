// Mouse icon that is positioned based on a target element

import React, { useState, useEffect } from "react";
import { CursorIcon } from "./CursorIcon";
import { CSSTransition } from "react-transition-group";

interface Props {
  target: HTMLElement;
}

const NameTag = ({ name }) => {
  return (
    <div
      style={{
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "22px",
        letterSpacing: "0.02em",

        /* gray/50 */
        color: "#F9FAFB",
        boxSizing: "border-box",

        // Auto layout

        textAlign: "center",
        // padding: "3.05663px 12.2265px",
        gap: "6.11px",

        width: "77.45px",
        height: "36.11px",
        left: "61.1px",
        top: "74.88px",

        // theme/background-black
        background: "linear-gradient(180deg, #404040 0%, #0d0d0d 68.82%)",
        // gray/600
        border: "1.52832px solid #4b5563",
        borderRadius: "3.05663px",
      }}
      className="cursorNameTag"
    >
      {name}
    </div>
  );
};

export const Cursor = ({ targetRef, name }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (targetRef && targetRef.current) {
      const targetElement = targetRef.current;
      const { top, left, width, height } =
        targetElement.getBoundingClientRect();
      setPosition({
        top: top + window.scrollY - height / 2,
        left: left + window.scrollX - width / 2,
      });
      setActive(true);
    }
  }, [targetRef]);

  const handleClick = () => {
    clicked === false && setClicked(!clicked);
    setTimeout(() => {
      setClicked(false);
    }, 300);
  };

  return (
    <CSSTransition
      in={active}
      timeout={300}
      classNames="circle"
      onExited={() => setActive(false)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          ...position,
        }}
        onClick={handleClick}
      >
        <NameTag name={name} />
        <CursorIcon clicked={clicked} />
      </div>
    </CSSTransition>
  );
};
