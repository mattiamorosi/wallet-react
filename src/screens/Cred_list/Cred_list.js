import React from 'react';
import {Verifiable_credential} from '../../types/Verifiable_credential';
import {credentialSubject, Proof} from '../../types/Types';
import {useNavigate} from 'react-router';
import "./Cred_list.css"
import {Directory, Encoding, Filesystem} from "@capacitor/filesystem";
import {useAlert} from "react-alert";
// Credentials

export const Cred = vc => {
    return (
        <React.Fragment>
            <view className="issuer-logo">
                <text>{vc.credentialSubject.credentialIssuer}</text>
            </view>
            <view className="issuer-name">
                <text>{vc.credentialSubject.credentialIssuer}</text>
            </view>
            <view className="cred-name">
                <text>{vc.credentialSubject.credentialType}</text>
            </view>
        </React.Fragment>
    );
};

export const Cred_list = ({vc, setVC, setPrevScreen}) => {
    const navigate = useNavigate();
    const alert = useAlert()

    // input: list of VC, output: a card for each VC
    return (
        <div className="cred_container">
            {vc.map((u, i) => {
                return (
                    <div
                        key={i}
                        className="main_div"
                        onClick={() => {
                            setVC(u);
                            setPrevScreen('/credentials');
                            navigate('/cred');
                        }}>
                        <div
                            onClick={() => {
                                setVC(u);
                                setPrevScreen('/credentials');
                                navigate('/cred');
                            }}>
                            <h3
                                style={{
                                    color: '#000000',
                                    fontFamily: 'arial, sans-serif',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}>
                                {u.credentialSubject.credentialIssuer}
                            </h3>
                            <h3
                                style={{
                                    color: '#000000',
                                    fontFamily: 'arial, sans-serif',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}>
                                {u.credentialSubject.credentialType}
                            </h3>
                        </div>
                        <h1 className="logo">{u.credentialSubject.credentialIssuer[0]}</h1>
                    </div>
                );
            })}
            <div className="button_container">
                <button
                    className="newScan_button"
                    onClick={() => {
                        setPrevScreen('/credentials');
                        navigate('/scan');
                    }}>Perform a new scan!</button>
            </div>
        </div>
    );
};
