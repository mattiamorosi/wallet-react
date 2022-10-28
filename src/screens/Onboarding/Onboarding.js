import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import * as bcrypt from 'bcryptjs';
import * as identity from '@iota/identity-wasm/web';
import {Bip39, Ed25519Seed} from '@iota/iota.js';
import bs58 from 'bs58';
//import * as fs from 'fs';
import logo from './logo.png'
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export const Onboarding = ({setPrevScreen, userInfo}) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    /*const styles = StyleSheet.create({
        tinyLogo: {
            width: 260,
            height: 260,
            alignSelf: 'center',
        },
        viewStyle: {
            paddingStart: 30,
            paddingEnd: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'space-around',
            height: '100%',
            backgroundColor: 'white',
        },

        inputField: {
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 30,
            marginBottom: 10,
            paddingStart: 10,
            fontSize: 21,
        },
    });*/

    // From vira wallet: function to create an identity
    const createIdentity = async () => {
        await identity.init();

        const mnemonic = Bip39.randomMnemonic();
        const baseSeed = Ed25519Seed.fromMnemonic(mnemonic);
        const basePair = baseSeed.keyPair();

        const pubKey = bs58.encode(basePair.publicKey);
        const prvKey = bs58.encode(basePair.privateKey);

        const keypair = identity.KeyPair.fromBase58(
            identity.KeyType.Ed25519,
            pubKey,
            prvKey,
        );

        const doc = identity.Document.fromKeyPair(keypair);

        doc.sign(keypair);

        const config = identity.Config.fromNetwork(identity.Network.mainnet());
        const client = identity.Client.fromConfig(config);

        const receipt = await client.publishDocument(doc.toJSON());
        doc.messageId = receipt.messageId;

        return {mnemonic, keypair: keypair.toJSON(), doc: doc.toJSON()};
    };

    async function handleRegistration() {
        if (
            user === undefined ||
            password === undefined ||
            user === '' ||
            password === ''
        ) {
            //Alert.alert('', 'Fill both username and password fields!');
        } else {
            // creation of an identity
            const did = createIdentity();
            const salt = await bcrypt.genSalt(7);
            const pwdHash = await bcrypt.hash(password, salt);
            const content =
                'export const userInfo =' +
                JSON.stringify({
                    doc: did.doc,
                    username: user,
                    password: pwdHash,
                }) +
                ';';
            console.log(content);
            fs.writeFile('../data/credendials.js', content, err => {
              if (err) {
                alert.show('An error occurred while storing credentials!');
              }
            });
        }
    }

    return (
        <React.Fragment>
            <div className= "viewStyle">
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
                </div>
                <button
                    onClick={handleRegistration}
                >Register</button>
            </div>
        </React.Fragment>
    );
};
