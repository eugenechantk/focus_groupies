import React from "react";
import clsx from "clsx";

// TODO: Mimic the raw quip text format and set as prop
// TODO: add animation for expanding and collapsing
// TODO: add animation for showing text word by word
export default function QuipModal({
  isQuipModalOpen,
  quip,
}: {
  isQuipModalOpen: boolean;
  quip?: string;
}) {
  return (
    <>
      {quip && (
        <div
          className={clsx(
            !isQuipModalOpen && "hidden",
            "pt-8 px-5 pb-2 background-black border border-theme-12 drop-shadow-[9px_18px_36px_rgba(0,0,0,0.45)] w-full h-[170px] overflow-y-scroll rounded-lg text-2xl text-gray-50 leading-[1.4em] mb-[1em] -m-6"
          )}
        >
          {quip}
        </div>
      )}
    </>
  );
}
