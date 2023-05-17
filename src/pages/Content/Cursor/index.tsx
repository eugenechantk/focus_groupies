// Mouse icon that is positioned based on a target element

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CursorIcon } from "./CursorIcon";
import styled from "styled-components";

interface Props {
  target: HTMLElement;
}

// Nametag box on the bottom right of the cursor
const NameTag = styled.div`
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 3.05663px 12.2265px;
  gap: 6.11px;

  position: absolute;
  width: 77.45px;
  height: 36.11px;
  left: 61.1px;
  top: 74.88px;

  /* theme/background-black */
  background: linear-gradient(180deg, #404040 0%, #0d0d0d 68.82%);
  /* gray/600 */
  border: 1.52832px solid #4b5563;
  border-radius: 3.05663px;
`;

const MouseIcon = ({ name }) => (
  <>
    <CursorIcon />
    <NameTag>{name}</NameTag>
  </>
);

const MouseTracker: React.FC<Props> = ({ target }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = (ev: MouseEvent) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  return createPortal(<MouseIcon name={"helloooo"} />, target);
};
