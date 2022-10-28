import React from 'react';
import {Verifiable_credential} from '../types/Verifiable_credential';
import {credentialSubject, Proof} from '../types/Types';
// Credentials

export const SingleCred = ({vc}) => {
    /*const styles = StyleSheet.create({
        // TODO: insert all the styles here
        tinyLogo: {
            width: 150,
            height: 150,
            alignSelf: 'center',
        },
    });*/

    // input: list of VC, output: a card for each VC
    return (
        <view
            style={{
                marginEnd: 10,
                marginStart: 10,
                marginTop: 10,
                marginBottom: 5,
                padding: 12.5,
                borderRadius: 10,
                position: 'relative',
                background: '#495f6f',
                display: 'flex',
                borderColor: '#000000',
                borderWidth: 1,
            }}>
            <view>
                <image
                    className="tinyLogo"
                    source={{
                        uri: vc.issuerLogo,
                    }}
                />
                <text
                    style={{
                        color: '#000000',
                        fontFamily: 'arial, sans-serif',
                        fontSize: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                    }}>
                    {vc.credentialSubject.credentialIssuer}
                </text>
                <text
                    style={{
                        color: '#000000',
                        fontFamily: 'arial, sans-serif',
                        fontSize: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        marginBottom: 20,
                    }}>
                    {vc.credentialSubject.credentialType}
                </text>

                {vc.credentialSubject.properties.map((u, i) => {
                    return (
                        <text
                            key={i}
                            style={{
                                color: '#000000',
                                fontFamily: 'arial, sans-serif',
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                            {u.toString().split(':')[0] + ': ' + u.toString().split(':')[1]}
                        </text>
                    );
                })}
            </view>
        </view>
    );
};
