import React, { useState } from "react";
import AgentStatusBar from "./AgentStatusBar";
import QuipModal from "./QuipModal";

// TODO: change the state and interactivity of the status bar based on the step of the agent loop
// TODO: state management for pause/play button

export default function AgentStatusContainer() {
  const [isQuipModalOpen, setIsQuipModalOpen] = useState(false);
  const [agentPaused, setAgentPaused] = useState(false);
  return (
    <div className="mx-6 max-w-[600px] w-full">
      {/* Status */}
      <div className="flex flex-row gap-2 relative z-20 right-[calc(50%-130px)]" style={{direction: "rtl"}}>
        <button className="w-12 h-12 flex flex-row items-center justify-center rounded-full background-white drop-shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
          </svg>
        </button>
        <AgentStatusBar onClick={() => setIsQuipModalOpen(!isQuipModalOpen)} />
      </div>
      {/* Quip modal */}
      <QuipModal isQuipModalOpen={isQuipModalOpen} />
    </div>
  );
}
