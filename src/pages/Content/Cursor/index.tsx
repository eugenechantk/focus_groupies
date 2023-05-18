// Mouse icon that is positioned based on a target element

import React, { useState, useEffect } from "react";
import { CursorIcon } from "./CursorIcon";
import { CSSTransition } from "react-transition-group";

import styled from "styled-components";

const StyledCursor = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  transition: top 300ms ease, left 300ms ease;
`;

export const Cursor = ({
  name,
  x,
  y,
}: {
  name: string;
  x: number;
  y: number;
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [xCoord, setXCoord] = useState(x);
  const [yCoord, setYCoord] = useState(y);

  useEffect(() => {
    setPosition({
      top: yCoord - window.scrollY,
      left: xCoord - window.scrollX,
    });
    setActive(true);
  }, [xCoord, yCoord]);

  const handleClick = () => {
    setYCoord(yCoord + 100);
    setXCoord(xCoord + 100);

    setTimeout(() => {
      clicked === false && setClicked(!clicked);
      console.log("click!!");
      setTimeout(() => {
        setClicked(false);
      }, 300);
    }, 1000);
  };

  return (
    <CSSTransition in={active} timeout={300} onExited={() => setActive(false)}>
      <StyledCursor
        top={position.top}
        left={position.left}
        onClick={handleClick}
      >
        <NameTag name={name} />
        <CursorIcon clicked={clicked} />
      </StyledCursor>
    </CSSTransition>
  );
};

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
