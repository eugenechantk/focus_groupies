import React from "react";
import styled from "styled-components";

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
      {(quip && isQuipModalOpen) && (
        <div
          style={{
            paddingTop: "2rem",
            paddingRight: "1.25rem",
            paddingBottom: "1rem",
            paddingLeft: "1.25rem",
            backgroundColor: "black",
            border: "border: 1px solid",
            borderImageSource:
              "linear-gradient(221.02deg, #404040 63.16%, #1F1F1F 76.74%)",
            width: "100%",
            height: "170px",
            overflowY: "scroll",
            whiteSpace: 'pre-line',
            borderRadius: "0.5rem",
            backgroundImage:
              "linear-gradient(180deg, #404040 0%, #0D0D0D 68.82%)",
            boxShadow: "9px 18px 36px rgba(0, 0, 0, 0.25)",
            marginBottom: "1em",
            marginTop: "-1.5rem",
            marginRight: "-1.25rem",
            marginLeft: "-1.25rem",
            fontFamily: "'Inter', sans-serif",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "24px",
            lineHeight: "140%",
            color: "#F9FAFB",
          }}
        >
          {quip}
        </div>
      )}
    </>
  );
}
