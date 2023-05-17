/** Agent status bar */

import React from "react";
import clsx from "clsx";
import { AgentState, IAgentInfo } from "./AgentStatusContainer";
import styled, { css } from "styled-components";

const PillContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding-left: 0.75rem; /* You can adjust the value to match your desired padding */
  padding-right: 0.75rem; /* You can adjust the value to match your desired padding */
  height: 48px;
  background-image: linear-gradient(180deg, #FFFFFF 39.58%, #E6E6E6 100%);
  border-radius: 9999px;
  border: 1px solid #F2F2F2; /* You can replace this with your desired border color */
  width: fit-content;
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
    drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  direction: ltr;
`;

interface IAgentStatusPillProps {
  onClick?: () => void;
  agent: IAgentInfo;
  agentState: AgentState;
}

export default function AgentStatusPill({
  onClick,
  agent,
  agentState,
}: IAgentStatusPillProps) {
  return (
    <PillContainer onClick={onClick}>
      <img
        src={agent.profileImgUrl}
        alt="agent profile"
        style={{
          width: "2rem",
          height: "2rem",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <h3
        style={{
          fontFamily: "Poppins",
          color: "black",
          fontWeight: "500",
          fontSize: "20px",
          letterSpacing: "tight",
          lineHeight: "1",
          marginTop: '0px',
          marginBottom: '0px',
        }}
      >
        {agent.name} {agentState}
      </h3>
    </PillContainer>
  );
}
