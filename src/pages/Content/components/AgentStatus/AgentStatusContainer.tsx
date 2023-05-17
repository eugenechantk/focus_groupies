import React, { useState } from "react";
import AgentStatusPill from "./AgentStatusPill";
import QuipModal from "./QuipModal";
import root from "react-shadow";
import styled from "styled-components";

// TODO: change the state and interactivity of the status bar based on the step of the agent loop
// TODO: change this to reflect the agent info from the backend
export interface IAgentInfo {
  id: string;
  name: string;
  profileImgUrl: string;
  prompt: string;
}
interface IAgentStatusContainerProps {
  agent: IAgentInfo;
  agentState: AgentState;
  isAgentPaused: boolean;
  setIsAgentPaused: () => void;
  quip?: string;
}

// TODO: change this to reflect the agent state from the backend
export enum AgentState {
  PENDING = "is browsing...",
  THOUGHTS_GENERATED = "thinks that...",
  PROCEED_TO_NEXT_STEP = "is continuing...",
}

const sampleAgent = {
  id: "012345",
  name: "John",
  profileImgUrl:
    "https://images.pexels.com/photos/6274712/pexels-photo-6274712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  prompt: "You are john",
};

const sampleQuip =
  "As of my knowledge cutoff in September 2021, the Google homepage is known for its simplicity and ease of use. However, here are a few suggestions for potential improvements in the design of the Google page:\n1. Enhance visual appeal: While simplicity is a core aspect of Google's design, introducing subtle visual improvements could make the page more visually engaging. This could involve refining the color palette, adding more whitespace, or incorporating tasteful animations to create a more modern look and feel.\n2. Customizable interface: Allowing users to personalize certain elements of the Google page, such as background themes or layout options, could enhance the user experience. Offering different customization options could make the page feel more tailored to individual preferences.";

const RootContainer = styled.div`
  margin-left: 48px;
  margin-right: 48px;
  max-width: 600px;
  width: 100%;
`;

const PillContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  position: relative;
  z-index: 20;
  right: calc(50% - 130px);
  direction: rtl;
`;

const PlayButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 16px;
  width: 48px;
  height: 48px;
  background: linear-gradient(180deg, #ffffff 39.58%, #e6e6e6 100%);
  border-radius: 1000px;
  border: 1px solid #f2f2f2; /* You can replace this with your desired border color */
  cursor: pointer;
  &:hover {
    background: linear-gradient(180deg, #f2f2f2 39.58%, #e6e6e6 100%);
    border: 1px solid #f9fafb;
  }
  &:active {
    background: linear-gradient(180deg, #ebebeb 39.58%, #d9d9d9 100%);
    border: 1px solid #f3f4f6;
  }
`;

export default function AgentStatusContainer({
  agent = sampleAgent,
  agentState = AgentState.THOUGHTS_GENERATED,
  isAgentPaused,
  setIsAgentPaused,
  quip = sampleQuip,
}: IAgentStatusContainerProps) {
  const [isQuipModalOpen, setIsQuipModalOpen] = useState(true);
  return (
    <RootContainer>
      {/* Status */}
      <PillContainer>
        <PlayButton onClick={setIsAgentPaused}>
          {isAgentPaused ? (
            // Play icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: "24px", height: "24px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
          ) : (
            // Pause icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: "24px", height: "24px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
              />
            </svg>
          )}
        </PlayButton>
        <AgentStatusPill
          onClick={() => setIsQuipModalOpen(!isQuipModalOpen)}
          agentState={agentState}
          agent={agent}
        />
      </PillContainer>
      {/* Quip modal */}
      {agentState === AgentState.THOUGHTS_GENERATED && (
        <QuipModal isQuipModalOpen={isQuipModalOpen} quip={quip} />
      )}
    </RootContainer>
  );
}
