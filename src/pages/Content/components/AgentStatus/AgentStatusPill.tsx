/** Agent status bar */

import React from "react";
import { AgentState, IAgentInfo } from "./AgentStatusContainer";
import styled, { css } from "styled-components";
interface IAgentStatusPillProps {
  onClick?: () => void;
  agent: IAgentInfo;
  agentState: AgentState;
  quip:string;
}

const PillContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding-left: 0.75rem; /* You can adjust the value to match your desired padding */
  padding-right: 0.75rem; /* You can adjust the value to match your desired padding */
  height: 48px;
  background-image: linear-gradient(180deg, #ffffff 39.58%, #e6e6e6 100%);
  border-radius: 9999px;
  border: 1px solid #f2f2f2; /* You can replace this with your desired border color */
  width: fit-content;
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
    drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  direction: ltr;
`;

export default function AgentStatusPill({
  onClick,
  agent,
  agentState,
  quip,
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
          fontSize: "20px",
          letterSpacing: "tight",
          lineHeight: "1",
          marginTop: "0px",
          marginBottom: "0px",
        }}
      >
        {agent.name} {quip ? 'thinks that...' : 'is browsing...'}
      </h3>
    </PillContainer>
  );
}
