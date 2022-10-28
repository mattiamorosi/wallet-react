import React, {useState, useEffect} from 'react';
import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import {Card, Container} from "@material-ui/core";
//import axios from "axios";
//import socket from "socket.io-client";
import {useAlert} from "react-alert";
import "./Scan.css"
import {TopBar} from "./TopBar";

export const Scan = ({prevScreen}) => {
    const [result, setResult] = useState();
    const [verifying, setVerifying] = useState(false);
    const alert = useAlert();
    /*const joinSocket = (roomId: string) => {
          const sock = socket(share_service, { query: { roomId } });
          sock.emit("enter", "enter");
          setVerifying(() => true);
          sock.on("shareCred", (data) => {
              setVerifying(() => false);
              setResult(() => data);
          });
      };
  */
    const startScan = async () => {
        setVerifying(true);
        alert.show('Inside startScan function!');

        // Check camera permission
        // This is just a simple example, check out the better checks below
        await BarcodeScanner.checkPermission({ force: true });

        // make background of WebView transparent
        // note: if you are using ionic this might not be enough, check below
        //await BarcodeScanner.hideBackground();

        const result = await BarcodeScanner.startScan();

        if (result.hasContent) {
            //TODO: fare qualcosa con result.content
            setVerifying(false);
            await stopScan();
        }
        //const scan = JSON.parse(result.text);
    }; /*
        if (scan.type === "didScan") {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${scan.token}`,
                },
            };
            const { data }: any = await axios.post(
                `${scan.api}/api/users/assign-did`,
                { did: user.user.doc.id },
                config
            );
            const content = await readFile("endpoints").catch((error) => null);
            if (content) {
                const prevEndpoints = JSON.parse(content.data);
                const endpoint_exists = prevEndpoints.find(
                    (endpoint) => endpoint.api === scan.api
                );
                if (!endpoint_exists) {
                    const endpoints = [
                        ...prevEndpoints,
                        { api: scan.api, token: scan.token },
                    ];
                    await writeFile(JSON.stringify(endpoints), "endpoints");
                    console.log(endpoints);
                } else {
                    console.log(prevEndpoints);
                }
            } else {
                const endpoints = [{ api: scan.api, token: scan.token }];
                await writeFile(JSON.stringify(endpoints), "endpoints");
            }
        } else if (scan.type === "vcShare") {
            joinSocket(scan.roomId);
        }
    };
*/
    const stopScan = async () => {
        await BarcodeScanner.showBackground();
        await BarcodeScanner.stopScan();
    };
    return (/*
        <Container>
            <div className="scan">
                {!verifying && !result ? (
                    <Card>
                        <button onClick={startScan}>
                            START SCAN
                        </button>
                    </Card>
                ) : !result && verifying ? (
                    <Card extend={true}>
                        <h2 style={{ textAlign: "center" }}>Verifying...</h2>
                    </Card>
                ) : !verifying && result ? (
                    <Card extend={true}>
                        <React.Fragment>
                            <div className="issuer-logo">
                                {result.vc.id.split("//")[1][0].toUpperCase()}
                            </div>
                            <div className="issuer-title">
                                {result.vc.id.split("//")[1].split("/")[0]}
                            </div>
                            <div className="cred-title">{result.vc.type[1]}</div>
                            {Object.keys(result.vc.credentialSubject).map((key, index) => (
                                <div key={index} className="cred-prop">
                                    <div className="cred-prop-data">
                                        <div className="property">{key}</div>
                                        <div className="value">
                                            {result.vc.credentialSubject[key]}
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </React.Fragment>
                    </Card>
                ) : (
                    <div></div>
                )}
            </div>
        </Container>*/
        <>
            {!verifying && <><TopBar/><div className="scan_container"><button className="scan_button" onClick={startScan}>START SCAN</button></div></>}
        </>
    )
};
