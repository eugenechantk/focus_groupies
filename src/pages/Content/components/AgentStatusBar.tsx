/** Agent status bar */

import React from "react";

export default function AgentStatusBar() {
  return (
    <div className="flex flex-row gap-2 px-3 py-2 background-white rounded-full border border-theme-90 w-fit">
      <img
        src="https://images.pexels.com/photos/6274712/pexels-photo-6274712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="agent profile"
        className="w-8 h-8 rounded-full object-cover"
      />
      <h3 className="font-poppins text-black font-medium text-[20px] tracking-tight">
        John thinks...
      </h3>
    </div>
  );
}
