// Mouse icon that is positioned based on a target element

import React, { useState, useEffect, useRef } from "react";
import { CursorIcon } from "./CursorIcon";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

const CursorBase = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 150px;
  left: 150px;
  transition: all 0.3s ease;
  z-index: 10000;
`;

const StyledCursor = styled(CursorBase)<{ top: number; left: number }>`
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

// const StyledCursor = styled(CursorBase)<{ previousPosition: {x: number, y: number}, newPosition: {x: number, y: number} }>`
//   @keyframes moveCursor {
//     from {
//       top: ${(props) => props.previousPosition.y}px;
//       left: ${(props) => props.previousPosition.x}px;
//     }
//     to {
//       top: ${(props) => props.newPosition.y}px;
//       left: ${(props) => props.newPosition.x}px;
//     }
//   }
//   animation: moveCursor 0.3s ease;
// `;

export const Cursor = ({
  name,
  position,
  timeout,
}: {
  name: string;
  position: { x: number; y: number };
  timeout: number;
}) => {
  console.log("coordinates passed to cursor", position);
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // const ref = useRef(null);
  // const [xCoord, setXCoord] = useState(x);
  // const [yCoord, setYCoord] = useState(y);

  // useEffect(() => {
  //   if (position.y > window.innerHeight) {
  //     (ref.current! as HTMLElement).scroll({top: position.y, behavior: 'smooth'});
  //   }
  // }, [position])

  // useEffect(() => {
  //   setPosition({
  //     top: yCoord - window.scrollY,
  //     left: xCoord - window.scrollX,
  //   });
  //   setActive(true);
  // }, [xCoord, yCoord]);

  // for animation when simulating a click
  // const handleClick = () => {
  //   setYCoord(yCoord + 100);
  //   setXCoord(xCoord + 100);

  //   setTimeout(() => {
  //     clicked === false && setClicked(!clicked);
  //     console.log("click!!");
  //     setTimeout(() => {
  //       setClicked(false);
  //     }, 300);
  //   }, 1000);
  // };

  return (
    <CSSTransition
      in={active}
      timeout={timeout}
      onExited={() => setActive(false)}
    >
      <StyledCursor
        top={position.y}
        left={position.x}
        // onClick={handleClick}
        // ref={ref}
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

const NameTag = ({ name }: { name: string }) => {
  return (
    <div
      style={{
        fontFamily: "monospace",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        letterSpacing: "0.02em",
        textTransform: "uppercase",

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
