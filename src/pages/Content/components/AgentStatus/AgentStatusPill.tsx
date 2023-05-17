/** Agent status bar */

import React from "react";
import clsx from "clsx";
import { AgentState, IAgentInfo } from "./AgentStatusContainer";

export default function AgentStatusPill({ onClick, agent, agentState }: { onClick?: () => void, agent:IAgentInfo, agentState: AgentState}) {
  return (
    <div
      className={clsx(
        agentState === AgentState.THOUGHTS_GENERATED && "cursor-pointer background-white-hover background-white-active",
        "flex flex-row gap-2 px-3 py-2 background-white rounded-full border border-theme-90 w-fit drop-shadow-lg"
      )}
      onClick={onClick}
      style={{direction: "ltr"}}
    >
      <img
        src={agent.profileImgUrl}
        alt="agent profile"
        className="w-8 h-8 rounded-full object-cover"
      />
      <h3 className="font-poppins text-black font-medium text-[20px] tracking-tight">
        {agent.name} {agentState}
      </h3>
    </div>
  );
}
