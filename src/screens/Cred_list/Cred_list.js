import React from 'react';
import {Verifiable_credential} from './Verifiable_credential';
import {credentialSubject, Proof} from '../types/Types';
import {useNavigate} from 'react-router';
import "./Cred_list.css"
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
    /*const styles = StyleSheet.create({
        // TODO: insert all the styles here
        tinyLogo: {
            width: 60,
            height: 60,
        },
    });*/

    // input: list of VC, output: a card for each VC
    return (
        <div className="cred_container">
            {vc.map((u, i) => {
                return (
                    <div
                        key={i}
                        style={{
                            marginEnd: 1,
                            marginStart: 1,
                            marginTop: 5,
                            marginBottom: 5,
                            padding: 12.5,
                            borderRadius: 10,
                            position: 'relative',
                            background: '#495f6f',
                            flexDirection: 'row',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderColor: '#000000',
                            borderWidth: 1,
                        }}>
                        <touchableOpacity
                            onClick={() => {
                                setVC(u);
                                setPrevScreen('/credentials');
                                navigate('/cred');
                            }}>
                            <text
                                style={{
                                    color: '#000000',
                                    fontFamily: 'arial, sans-serif',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}>
                                {u.credentialSubject.credentialIssuer}
                            </text>
                            <text
                                style={{
                                    color: '#000000',
                                    fontFamily: 'arial, sans-serif',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}>
                                {u.credentialSubject.credentialType}
                            </text>
                        </touchableOpacity>
                        <img
                            source={{
                                uri: u.issuerLogo,
                            }}
                        />
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
