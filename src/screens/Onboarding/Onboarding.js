import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import * as bcrypt from 'bcryptjs';
import * as identity from '@iota/identity-wasm/web';
import {Ed25519Seed} from "@iota/iota.js";
import bs58 from 'bs58';
//import * as fs from 'fs';
import logo from '../logo.png'
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import {useAlert} from "react-alert";
import "../Login/Login.css"
import * as bip39 from "bip39";
import axios from "axios";


const Onboarding = ({setPrevScreen, userInfo}) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [document, setDocument] = useState('');
    const alert = useAlert()
    const navigate = useNavigate();

    // From vira wallet: function to create an identity
    const createIdentity = async () => {
        alert.show("Inside createidentity");
        await identity.init();

        const mnemonic = bip39.generateMnemonic();
        const baseSeed = Ed25519Seed.fromMnemonic(mnemonic);
        const basePair = baseSeed.keyPair();

        alert.show("before keys");
        const pubKey = bs58.encode(basePair.publicKey);
        const prvKey = bs58.encode(basePair.privateKey);

        const keypair = await identity.KeyPair.fromBase58(
            identity.KeyType.Ed25519,
            pubKey,
            prvKey,
        );

        alert.show("before document");
        const doc = await identity.Document.fromKeyPair(keypair);

        doc.sign(keypair);

        const config = await identity.Config.fromNetwork(identity.Network.mainnet());
        const client = await identity.Client.fromConfig(config);
        alert.show("tutto ok fino a prima di publishDOcument!");

        // il document è pubblicato nel Tangle
        const receipt = await client.publishDocument(doc.toJSON());
        alert.show("document created!");
        setDocument(doc.toJSON())

        doc.messageId = receipt.messageId;

        return {mnemonic, keypair: keypair.toJSON(), doc: doc.toJSON()};
    };

    async function handleRegistration() {
        if (
            user === '' ||
            password === '' ||
            repeatPassword === ''
        ) {
            alert.show('Fill all the fields!');
        }
        else if (password !== repeatPassword) {
            alert.show('The passwords are not the same!');
        }
        else {
            // creation of an identity
            /*const did = await createIdentity();
            alert.show(did.did().toString())
            const salt = await bcrypt.genSalt(7);
            const pwdHash = await bcrypt.hash(password, salt);
            alert.show("Hash generated");
            const content =
                JSON.stringify({
                    doc: did.doc,
                    username: user,
                    password: pwdHash,
                    mnemonic: did.mnemonic,
                    keypair: did.keypair
                });
            alert.show("content created");
            console.log(content);
            alert.show("Prima di writeFile")
            await Filesystem.writeFile({
                path: 'credentials',
                data: content,
                directory: Directory.Data,
                encoding: Encoding.UTF8,
            });
            */
            alert.show("Before post")
            const userData = await axios.post(
                "http://127.0.0.1:5000/api/admin/createIdentity",
                {
                    alias: "alias"
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(userData.data)
            alert.show(userData.data);
        }
    }

    return (
        <React.Fragment>
            <div className= "viewStyle">
                <h1>Welcome!</h1>
                <img
                    className="tinyLogo"
                    src={logo}
                    alt={"Logo"}/>
                <div>
                    <input
                        onChange={(e) => setUser(e.target.value)}
                        placeholder="Username"
                        className="inputField"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="inputField"
                        type="password"
                    />
                    <input
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        placeholder="Repeat Password"
                        className="inputField"
                        type="password"
                    />
                </div>
                <button
                    onClick={handleRegistration}
                    className="login_button"
                >Register</button>
            </div>
        </React.Fragment>

    );
};

export default Onboarding;
