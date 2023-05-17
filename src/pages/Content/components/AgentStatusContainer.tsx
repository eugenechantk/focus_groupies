import React from "react";
import AgentStatusBar from "./AgentStatusBar";

export default function AgentStatusContainer() {
  return (
    <>
      {/* Status */}
      <div className="flex flex-row gap-2">
        <AgentStatusBar />
        <button className="w-12 h-12 flex flex-row items-center justify-center rounded-full background-white">
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
      </div>
      
    </>
  );
}
