// Contains the code of all icon components.
// The props have the same meaning as they would have in an svg tag.
// To make svg icons compatible with react-native-svg, use this webpage: https://react-svgr.com/playground/?native=true&typescript=true

import React from "react";
import Svg, { Path, Circle } from "react-native-svg-web";

export const Show = (props) => {
    return (
        <Svg width={24} height={18} viewBox="0 0 24 18" fill="none" {...props}>
            <Path
                d="M1.335 10.256a2.522 2.522 0 010-2.512C3.685 3.651 7.444 1 11.68 1c4.236 0 7.995 2.65 10.345 6.744a2.522 2.522 0 010 2.512C19.675 14.349 15.915 17 11.68 17c-4.236 0-7.995-2.65-10.345-6.744z"
                stroke={props.color}
                strokeWidth={2}
            />
            <Circle cx={11.68} cy={9} r={3} stroke={props.color} strokeWidth={2} />
        </Svg>
    );
};

export const Hide = (props) => {
    return (
        <Svg width={24} height={20} viewBox="0 0 24 20" fill="none" {...props}>
            <Path
                d="M5.68 1l16 16"
                stroke="#fff"
                strokeOpacity={0.5}
                strokeWidth={2}
                strokeLinecap="round"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.055 2.79a1 1 0 011.271-.619c3.122 1.077 5.758 3.482 7.566 6.632.475.827.588 1.798.34 2.694a1 1 0 01-1.928-.534 1.522 1.522 0 00-.147-1.165c-1.618-2.818-3.906-4.847-6.483-5.736a1 1 0 01-.62-1.272zm-5.305.151a1 1 0 01-.55 1.303C5.822 5.21 3.717 7.16 2.202 9.798c-.27.47-.27 1.047 0 1.517 2.223 3.87 5.691 6.242 9.478 6.242 2.687 0 5.2-1.188 7.235-3.258a1 1 0 011.426 1.402c-2.345 2.386-5.351 3.855-8.661 3.855-4.686 0-8.735-2.93-11.212-7.246a3.522 3.522 0 010-3.507C2.162 5.85 4.582 3.555 7.448 2.39a1 1 0 011.302.55z"
                fill="#fff"
                fillOpacity={0.5}
            />
            <Path
                d="M14.59 9.825a3 3 0 11-2.291-2.204"
                stroke="#fff"
                strokeOpacity={0.5}
                strokeWidth={2}
            />
        </Svg>
    );
};

export const TickInCircle = (props) => {
    return (
        <Svg width={95} height={95} viewBox="0 0 95 95" fill="none" {...props}>
            <Path
                d="M25.489 49.511L40.47 64.492 70.433 34.53"
                stroke={props.color}
                strokeWidth={8}
                strokeLinecap="round"
            />
            <Circle
                cx={47.5}
                cy={47.5}
                r={43.5}
                stroke={props.color}
                strokeWidth={8}
            />
        </Svg>
    );
};

export const CrossInCircle = (props) => {
    return (
        <Svg width={95} height={95} viewBox="0 0 95 95" fill="none" {...props}>
            <Path
                d="M35.413 35.752l24.495 24.495M35.413 60.248l24.495-24.496"
                stroke={props.color}
                strokeWidth={8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Circle
                cx={47.5}
                cy={47.5}
                r={43.5}
                stroke={props.color}
                strokeWidth={8}
            />
        </Svg>
    );
};
