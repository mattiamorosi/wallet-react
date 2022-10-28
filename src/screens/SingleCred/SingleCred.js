import React, {useEffect, useState} from 'react';
import {Verifiable_credential} from '../../types/Verifiable_credential';
import {credentialSubject, Proof} from '../../types/Types';
import "./SingleCred.css";
import qrcode from "qrcode";
import sha1 from "js-sha1"
import socket from "socket.io-client";
import {useAlert} from "react-alert";
import {Hide, Show} from "../../icons/icons";

let hidden = [];

export const SingleCred = ({vc}) => {
    const [showShare, setShowShare] = useState(false);
    const [qr, setQR] = useState();
    const [hiddenFields, setHiddenFields] = useState([]);
    const alert = useAlert();

    const handleShowToggle = (key) => {
        const key_exists = hiddenFields.find((k) => k === key);
        if (key_exists) {
            const keys = hiddenFields.filter((k) => k !== key);
            setHiddenFields(() => keys);
        } else {
            setHiddenFields((keys) => [...keys, key]);
        }
    };

    /*const joinRoom = (room) => {
        const sock = socket(share_service, {
            query: { roomId: room },
        });
        sock.on("enter", (data) => {
            sock.emit("shareCred", { vc, hiddenFields: hidden });
        });
    };*/

    useEffect(() => {
        const setCode = async () => {
            const hash = `${sha1.create()
                .update('Message to hash')
                .hex()}${Math.floor(100000 + Math.random() * 900000)}`;
            const qrCode = await qrcode.toDataURL(
                JSON.stringify({ type: "vcShare", roomId: hash })
            );
            setQR(() => qrCode);
            //joinRoom(hash);
        };
        setCode();
    }, []);

    return (
        <>
        {!showShare ? (
        <>
        <view className="mainView">
            <view>
                <div className="issuer_and_type">
                    <h1
                        style={{
                            color: '#000000',
                            fontFamily: 'arial, sans-serif',
                            fontWeight: 'bold',
                            alignSelf: 'center',
                        }}>
                        {vc.credentialSubject.credentialIssuer}
                    </h1>
                    <h2
                        style={{
                            color: '#000000',
                            fontFamily: 'arial, sans-serif',
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            marginBottom: 20,
                        }}>
                        {vc.credentialSubject.credentialType}
                    </h2>
                </div>
                {vc.credentialSubject.properties.map((u, i) => {
                    return (
                        <div className="cred_div">
                            {hiddenFields.includes(u.toString().split(':')[0]) ? (
                                <Hide color={"gray"} onClick={() => handleShowToggle(u.toString().split(':')[0])} />
                            ) : (
                                <Show color={"black"} onClick={() => handleShowToggle(u.toString().split(':')[0])} />
                            )}
                            <p
                                key={i}
                                style={{
                                    color: '#000000',
                                    fontFamily: 'arial, sans-serif',
                                    fontSize: 16,
                                    marginLeft: 10,
                                    fontWeight: 'bold',
                                }}>
                                {u.toString().split(':')[0] + ': ' + u.toString().split(':')[1]}
                            </p>
                        </div>
                    );
                })}
            </view>
        </view>
         <div className="button_container"><button className="scan_button" onClick={()=>{setShowShare(true)}}>Share credential</button></div>
        </>
        ): (
        <div className="share">
            {qr && (
                <div className="qr_container">
                    <h3>Present the QR code to the verifier</h3>
                    <img src={qr} />
                </div>
            )}
        </div>
            )}
        </>

    );
};
