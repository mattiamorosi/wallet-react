import React from 'react';
import {useNavigate} from 'react-router';

export const TopBar = ({prevScreen}) => {
    const navigate = useNavigate();
    return (
        <view
            style={{
                padding: 10,
                backgroundColor: 'black',
                display: 'flex',
                flexDirection: 'row',
                //alignItems: 'center',
                justifyContent: 'space-around',//'space-between',
            }}>
            {/*<button
                backgroundColor="white"
                color="black"
                onClick={() => {
                    navigate(prevScreen.toString());
                }}
            >Back</button>*/}
            <text
                style={{
                    color: 'white',
                    fontFamily: 'arial, sans-serif',
                    fontSize: 30,
                    fontWeight: 'bold',
                }}>
                Wallet
            </text>
            {/*button
                backgroundColor="white"
                color="black"
                onClick={() => {}}
            >Profile</button>*/}
        </view>
    );
};
