import React, { useEffect, useState } from "react";
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
  quip: string;
  wasclicked: boolean;
  setWasclicked: (wasclicked: boolean) => void;
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
  width: 600px;
  z-index: 10000000;
  position: sticky;
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
  quip,
  wasclicked,
  setWasclicked
}: IAgentStatusContainerProps) {
  const [isQuipModalOpen, setIsQuipModalOpen] = useState(true);

  useEffect(() => {
    console.log("quip passed to container:",quip);
  }, [quip])
  return (
    <RootContainer>
      {/* Status */}
      <PillContainer>
        <PlayButton onClick={() => {console.log("wasclicked:",wasclicked);setWasclicked(!wasclicked);}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{width: "24px", height: "24px"}}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
            />
          </svg>
        </PlayButton>
        <AgentStatusPill
          onClick={() => setIsQuipModalOpen(!isQuipModalOpen)}
          agentState={agentState}
          agent={agent}
          quip={quip}
        />
      </PillContainer>
      {/* Quip modal */}
      {agentState === AgentState.THOUGHTS_GENERATED && (
        <QuipModal isQuipModalOpen={isQuipModalOpen} quip={quip} />
      )}
    </RootContainer>
  );
}
