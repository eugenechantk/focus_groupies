import React, { useEffect } from "react";
import "./CursorIcon.css";

import { styled, css } from "styled-components";

const Base = styled.div``;

const StyledDiv = styled(Base)<{ clicked: boolean }>`
  ${(props) =>
    props.clicked &&
    `@keyframes shrink {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.6);
    }
    100% {
      transform: scale(1);
    }
  }
  animation: shrink 0.3s;`}
`;

export const CursorIcon = ({ clicked }: { clicked: boolean }) => {
  return (
    <span
      style={{
        margin: "0em 5em -1.5em 0px",
        zIndex: 1001,
      }}
    >
      <StyledDiv clicked={clicked}>
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_2_2023)">
            <path
              d="M46.0881 51.5047C46.5391 52.587 46.1057 56.6863 43.7145 57.6365C41.3233 58.5868 38.2681 57.6365 38.2681 57.6365L32.7243 46.5489L23.1431 56.1302V12.8571L52.4939 42.208H41.5584C42.0951 43.237 45.5152 50.1296 46.0881 51.5047Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M25.7144 19.065V49.9221L33.4286 42.2079L39.8572 55.065C39.8572 55.065 41.5963 55.6199 42.4286 55.065C43.261 54.5101 44.0889 53.3925 43.7144 52.4936C41.9461 48.2496 37.2858 39.6364 37.2858 39.6364H46.2858L25.7144 19.065Z"
              fill="#202125"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_2_2023"
              x="18.5145"
              y="10.8"
              width="38.6082"
              height="54.4589"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="2.57143" />
              <feGaussianBlur stdDeviation="2.31429" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.65 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2_2023"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2_2023"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </StyledDiv>
    </span>
  );
};
