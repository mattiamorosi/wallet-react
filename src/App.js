import React, {useEffect, useState} from 'react';
//import type {Node} from 'react';
import {Cred_list} from './screens/Cred_list/Cred_list';
//import {Routes, Route} from 'react-router';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {TopBar} from './screens/TopBar/TopBar';
import {Verifiable_credential} from './types/Verifiable_credential';
import {credentialSubject, Proof} from './types/Types';
import {SingleCred} from './screens/SingleCred/SingleCred';
//import {Directory, Encoding, Filesystem} from '@capacitor/filesystem';
import Onboarding from './screens/Onboarding/Onboarding';
import {Scan} from "./screens/Scan/Scan";
import Login from "./screens/Login/Login";
import {Directory, Encoding, Filesystem} from "@capacitor/filesystem";
import {readFile, writeFile} from "./utils/filesystemutils";
import axios from "axios";

const credentials = [];
let storedCreds = [];

const App = () => {
  const [prevScreen, setPrevScreen] = useState();
  const [userInfo, setUserInfo] = useState();
  const [selectedVC, setSelectedVC] = useState();
  const [verifiableCreds, setVerifiableCreds] = useState();

  {
    /* If the credentials.js file is empty, then the user doesn't exist and the page to show will be the registration one*/
  }
  const [userExists, setUserExists] = useState(false);

    //TODO: cambiare vc con verifiableCred (usare le nuove credenziali)
    const checkCredentials = async () => {
        const endpointsMeta = await readFile("endpoints").catch(() => null);
        const credsMeta = await readFile("certificates").catch(() => null);
        if (credsMeta) {
            storedCreds = JSON.parse(credsMeta.data);
        }
        setVerifiableCreds(() => storedCreds);
        if (endpointsMeta) {
            const endpoints = JSON.parse(endpointsMeta.data);
            for await (const endpoint of endpoints) {
                const credsReceived = await axios
                    .get(`${endpoint.api}/api/applications/@me/current`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${endpoint.token}`,
                        },
                    })
                    .catch(() => null);
                if (credsReceived) {
                    for (const cred of credsReceived.data) {
                        if (cred.vc) credentials.push(cred.vc);
                    }
                    for (const cred of credentials) {
                        if (
                            !storedCreds.find((stored_cred) => cred.id === stored_cred.id)
                        ) {
                            storedCreds.push(cred);
                        }
                    }
                    setVerifiableCreds(() => storedCreds);
                    await writeFile(JSON.stringify(storedCreds), "certificates");
                }
            }
        }
    };

    useEffect(() => {
        checkCredentials();
    }, []);

  const vc = [
    Verifiable_credential(
        '0',
        'Issuer',
        credentialSubject(
            '0',
            'La Sapienza',
            'Laurea Triennale',
            [
              'Voto: 110',
              'Anno Accademico: 2019/2020',
              'Titolo della tesi: Tesi triennale',
              'Professore: Mario Rossi',
            ],
            'sign',
        ),
        '2022/02/02',
        Proof('typ2', 'verMethod', 'signvalue'),
        'https://static.wikia.nocookie.net/enciclopediadelleconomia/images/d/d6/Wanted-the-best_rif.jpg/revision/latest?cb=20150130105640&path-prefix=it',
    ),
    Verifiable_credential(
        '0',
        'Issuer',
        credentialSubject(
            '0',
            'Politecnico di Torino',
            'Laurea Magistrale',
            [
              'Voto: X',
              'Anno Accademico: 2022/2023',
              'Titolo della tesi: Tesi magistrale',
            ],
            'sign',
        ),
        '2022/02/02',
        Proof('typ2', 'verMethod', 'signvalue'),
        'data:image/jpeg;base64,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',
    ),
  ];

    const getUserInfo = async () => {
        const content = await readFile("credentials").catch(() => null);
        if (content) {
            setUserInfo(() => JSON.parse(content.data));
            setUserExists(() => true);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);


  //<Login setPrevScreen={setPrevScreen} userInfo={userInfo} />
    //
    //
  return (
      <React.Fragment>
        <BrowserRouter>
          <>
            <Routes>
              <Route
                  path="/"
                  element={
                    userExists ? (
                        <Login setPrevScreen={setPrevScreen} userInfo={userInfo} />
                    ) : (
                        <Onboarding setPrevScreen={setPrevScreen} userInfo={userInfo} />
                    )
                  }
              />
              <Route
                  path="/credentials"
                  element={
                    <>
                      <TopBar prevScreen={prevScreen} />
                      <Cred_list
                          vc={vc}
                          setVC={setSelectedVC}
                          setPrevScreen={setPrevScreen}
                      />
                    </>
                  }
              />
                <Route
                    path="/scan"
                    element={
                        <>
                            <TopBar/>
                            <Scan prevScreen={prevScreen} />
                        </>
                    }
                />
              <Route
                  path="/cred"
                  element={
                    <>
                      <TopBar prevScreen={prevScreen} />
                      <SingleCred vc={selectedVC} />
                    </>
                  }
              />
            </Routes>
          </>
        </BrowserRouter>
      </React.Fragment>
  );
};
export default App;
