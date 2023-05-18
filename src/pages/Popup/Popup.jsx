import React from "react";
import logo from "../../assets/img/logo.svg";
import "./Popup.css";
import styled from "styled-components";
import { scrapeDOM } from "../Content/modules/scraper";

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
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
        resolve(response);
      });
    });
  });
}

const requestDom = () => sendMessageToCurrentTab({ type: "getContent" });
const updateQuip = (quip) =>
  sendMessageToCurrentTab({ type: "updateQuip", quip });

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const onClick = async () => {
  console.log("sending request");
  const requestId = makeid(5);

  chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === requestId) {
      port.onMessage.addListener(function (msg) {
        updateQuip(msg.partial);
      });
    }
  });

  const response = await chrome.runtime.sendMessage({
    type: "getFeedback",
    persona: "angry steve jobs",
    domSummary: await requestDom(),
    requestId: requestId,
  });

  await updateQuip(response);
  console.log("got quip from background thread:" + response);
  await updateQuip(response);
};

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
                  style={{ width: "24px", height: "24px" }}
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
                  style={{ width: "24px", height: "24px" }}
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
          <svg
            width="176.4"
            height="95.4"
            viewBox="0 0 294 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M294 79.5C294 94 228.186 159 147 159C65.8141 159 0 97 0 79.5C0 62 65.8141 0 147 0C228.186 0 294 65 294 79.5Z"
              fill="url(#paint0_linear_82_621)"
            />
            <g clip-path="url(#clip0_82_621)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M140.829 33.5099C144.539 24.5542 146.464 14.9614 146.5 5.26956C146.535 14.9614 148.46 24.5542 152.17 33.5099C155.914 42.5487 161.402 50.7615 168.32 57.6795C175.238 64.5974 183.45 70.0851 192.489 73.829C201.514 77.5671 211.185 79.4939 220.952 79.5C211.185 79.5061 201.513 81.4329 192.489 85.171C183.45 88.9149 175.238 94.4026 168.32 101.321C161.402 108.238 155.914 116.451 152.17 125.49C148.46 134.446 146.535 144.039 146.5 153.73C146.464 144.039 144.539 134.446 140.829 125.49C137.085 116.451 131.597 108.238 124.679 101.321C117.762 94.4026 109.549 88.9149 100.51 85.171C91.4855 81.4329 81.8143 79.5061 72.0467 79.5C81.8143 79.4939 91.4855 77.5671 100.51 73.829C109.549 70.0851 117.761 64.5974 124.679 57.6795C131.597 50.7615 137.085 42.5487 140.829 33.5099ZM146.499 154H72L72 79.5L72 5H146.499H146.5H220.999V79.5V154H146.5H146.499Z"
                fill="url(#paint1_linear_82_621)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_82_621"
                x1="147"
                y1="0"
                x2="147"
                y2="109.429"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#404040" />
                <stop offset="1" stop-color="#0D0D0D" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_82_621"
                x1="146.031"
                y1="5"
                x2="146.499"
                y2="154"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="0.59375" stop-color="#E6E6E6" />
              </linearGradient>
              <clipPath id="clip0_82_621">
                <rect
                  x="72"
                  y="5"
                  width="149"
                  height="149"
                  rx="74.5"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
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
