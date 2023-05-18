import React from "react";
import logo from "../../assets/img/logo.svg";
import "./Popup.css";
import styled from "styled-components";
import {scrapeDOM} from "../Content/modules/scraper";

const agentProfilePic =
    "https://images.pexels.com/photos/6274712/pexels-photo-6274712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  gap: 10px;
  width: 320px;
  height: 72px;
  background: linear-gradient(180deg, #404040 0%, #0d0d0d 68.82%);
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: linear-gradient(180deg, #595959 0%, #262626 68.82%);
  }

  &:active {
    background: linear-gradient(180deg, #8c8c8c 0%, #333333 68.82%);
  }
`;

// This controls the state of the popup and what to show
// 'persona_created' | 'loading' | 'landing'
const step = "landing";

function sendMessageToCurrentTab(message) {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message,
                (response) => {
                    resolve(response)
                });
        });
    })
}

const requestDom = () =>
    sendMessageToCurrentTab({type: 'getContent'})
const updateQuip = (quip) =>
    sendMessageToCurrentTab({type: 'updateQuip', quip})

const onClick = async () => {
    console.log("sending request")
    const response = await chrome.runtime.sendMessage({
        type: 'getFeedback',
        persona: "angry steve jobs",
        domSummary: await requestDom()
    });
    console.log("got quip from background thread:" + response);
    await updateQuip(response)
}

const Popup = () => {
    return (
        <>
            {/* Persona card */}
            {step === "persona_created" && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0px",
                        gap: "32px",
                    }}
                >
                    {/* Title */}
                    <h4
                        style={{
                            width: "322px",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "20px",
                            lineHeight: "140%",
                            textAlign: "center",
                            color: "#4B5563",
                            marginTop: "0px",
                            marginBottom: "0px",
                        }}
                    >
                        We found the right person to test your website for you
                    </h4>
                    {/* Persona info */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "0px",
                            gap: "24px",
                            width: "416px",
                        }}
                    >
                        {/* Image and key info */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "0px",
                                gap: "16px",
                                width: "416px",
                            }}
                        >
                            <img
                                src={agentProfilePic}
                                alt="agent-profile"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "9999px",
                                    objectFit: "cover",
                                }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    padding: "0px",
                                    gap: "0px",
                                    width: "416px",
                                }}
                            >
                                <h3
                                    style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        fontSize: "24px",
                                        lineHeight: "140%",
                                        textAlign: "center",
                                        color: "#1F2937",
                                        marginTop: "0px",
                                        marginBottom: "0px",
                                    }}
                                >
                                    John Peterson
                                </h3>
                                <p
                                    style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        fontSize: "20px",
                                        lineHeight: "140%",
                                        textAlign: "center",
                                        color: "#9CA3AF",
                                        marginTop: "0px",
                                        marginBottom: "0px",
                                    }}
                                >
                                    32 y/o ・ Business executive
                                </p>
                            </div>
                        </div>
                        {/* Characteristic */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                padding: "0px",
                                gap: "20px",
                                width: "416px",
                            }}
                        >
                            {/* Location */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                    padding: "0px",
                                    gap: "16px",
                                }}
                            >
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
                                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                    />
                                </svg>
                                <p
                                    style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "20px",
                                        lineHeight: "140%",
                                        color: "#1F2937",
                                        marginTop: "0px",
                                        marginBottom: "0px",
                                    }}
                                >
                                    San Francisco, California
                                </p>
                            </div>
                            {/* Personality */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                    padding: "0px",
                                    gap: "16px",
                                }}
                            >
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
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                    />
                                </svg>
                                <p
                                    style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "20px",
                                        lineHeight: "140%",
                                        color: "#1F2937",
                                        marginTop: "0px",
                                        marginBottom: "0px",
                                    }}
                                >
                                    His interest is fishing, films, music and poker
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Start button */}
                    <Button onClick={() => console.log("clicked")}>
                        <p
                            style={{
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: 500,
                                fontSize: "24px",
                                lineHeight: "24px",
                                color: "#FFFFFF",
                            }}
                        >
                            See John In Action
                        </p>
                    </Button>
                </div>
            )}
            {/* Loading card */}
            {step === "loading" && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0px",
                        gap: "32px",
                    }}
                >
                    <h3
                        style={{
                            width: "275px",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "24px",
                            lineHeight: "140%",
                            textAlign: "center",
                            color: "#4B5563",
                        }}
                    >
                        Finding the right person to test your website...
                    </h3>
                </div>
            )}
            {/* Landing card */}
            {step === "landing" && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0px",
                        gap: "32px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "0px",
                            gap: "8px",
                            width: "480px",
                        }}
                    >
                        <h2
                            style={{
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: 500,
                                fontSize: "40px",
                                lineHeight: "140%",
                                textAlign: "center",
                                color: "#0c0c0c",
                                marginTop: "0px",
                                marginBottom: "0px",
                            }}
                        >
                            FocusGroupies
                        </h2>
                        <h3
                            style={{
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: "24px",
                                lineHeight: "140%",
                                textAlign: "center",
                                color: "#374151",
                                marginTop: "0px",
                                marginBottom: "0px",
                            }}
                        >
                            Simulate a persona to test your website, so you can get critical
                            insights
                        </h3>
                    </div>
                    <Button onClick={() => onClick()}>
                        <p
                            style={{
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: 500,
                                fontSize: "24px",
                                lineHeight: "140%",
                                color: "#FFFFFF",
                            }}
                        >
                            Simulate User Testing
                        </p>
                    </Button>
                </div>
            )}
        </>
    );
};


export default Popup;

