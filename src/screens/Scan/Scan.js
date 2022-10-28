import React, {useState, useEffect} from 'react';
import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import {Card, Container} from "@material-ui/core";
import {useAlert} from "react-alert";
import "./Scan.css"
import {TopBar} from "../TopBar/TopBar";
import axios from "axios";
import {readFile, writeFile} from "../../utils/filesystemutils";
import socket from "socket.io-client";
import {CrossInCircle, Hide, Show, TickInCircle} from "../../icons/icons";

export const Scan = ({user}) => {
    const [result, setResult] = useState();
    const [scanning, setScanning] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const alert = useAlert();
    const share_service = "http://192.168.1.23:6969";//5000?

    const joinSocket = (roomId) => {
        const sock = socket(share_service, { query: { roomId } });
        sock.emit("enter", "enter");
        setVerifying(() => true);
        sock.on("shareCred", (data) => {
            setVerifying(() => false);
            setResult(() => data);
        });
    };

    const startScan = async () => {
        setScanning(true);

        // Check camera permission
        await BarcodeScanner.checkPermission({ force: true });

        const result = await BarcodeScanner.startScan();

        if (result.hasContent) {
            setScanning(false);
            await stopScan();
        }
        const scan = JSON.parse(result.content);

        if (scan.type === "didScan") {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${scan.token}`,
                },
            };
            const { data } = await axios.post(
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

    const stopScan = async () => {
        await BarcodeScanner.showBackground();
        await BarcodeScanner.stopScan();
    };

    return (
        <Container>
            <div className="scan">
                {!verifying && !result && !scanning ? (
                    <><div className="scan_container"><button className="scan_button" onClick={startScan}>START SCAN</button></div></>
                ) : !result && verifying && !scanning ? (
                    <div>
                        <TopBar/>
                        <h2 style={{ textAlign: "center" }}>Verifying...</h2>
                    </div>
                ) : !verifying && result && !scanning ? (
                    <view className="mainView">

                    </view>
                ) : (
                    <div></div>
                )}
            </div>
        </Container>
    )
};
