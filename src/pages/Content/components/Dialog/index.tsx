// Mouse icon that is positioned based on a target element

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useMousePosition } from "hooks";
import { MouseIcon } from "./styles";

interface Props {
  target: HTMLElement;
}

const MouseIcon: React.FC = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

// Nametag box on the bottom right of the cursor
const NameTag: React.FC = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const MouseTracker: React.FC<Props> = ({ target }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { x, y } = useMousePosition();

  useEffect(() => {
    setMousePosition({ x, y });
  }, [x, y]);

  return createPortal(
    <MouseIcon
      style={{
        top: mousePosition.y,
        left: mousePosition.x,
      }}
    />,
    target
  );
};
