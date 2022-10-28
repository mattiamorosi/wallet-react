import React from 'react';
import {credentialSubject, Proof} from '../types/Types';
/*
 * VC:
 *   - id;
 *   - issuer id;
 *   - issuer name;
 *   - VC properties (list).
 *   - issuance date;
 *   - proof;
 *
 *  {
    "@context": "https://www.w3.org/2018/credentials/v1",
    id: "http://coodos.co/verify/vcdid:iota:GwtF4sXkUd5txKi4kFyrHYV29tcK5JHoy2sgseTzkpJV",
    type: ["VerifiableCredential", "License"],
    credentialSubject: {
      id: "did:iota:GwtF4sXkUd5txKi4kFyrHYV29tcK5JHoy2sgseTzkpJV",
      "Credential Issuer": "http://coodos.co",
      "Credential Type": "Farmer's License",
      "Date of Birth": "2021-11-17",
      "Farmer's Name": "Doggers",
      "Field Area in Hectares": "69420",
      expiresEpoch: "1795167876117",
      sign: "LE98WvNRDJmGrwzD3o1QVdTGZKpdXPidUMBtzinWm7bVWxuY4qFPz8YDg5oXmKxftDvqdBxbTooEvgaxNBPWHF9GLuFV19PSpvhPdAqsNrDdzaHGTLqw148zfqg65f39VKsJ2XR1EQPbgA76QYbJAzt4qxwEpuRczNCLsQQr7JEh121",
    },
    issuer: "did:iota:6JmJ5Bh1C974ksfCgjw6Tcs7Ry6aYrCSsen5oqD83rJp",
    issuanceDate: "2021-11-21T09:44:38Z",
    proof: {
      type: "JcsEd25519Signature2020",
      verificationMethod: "#signing",
      signatureValue:
        "5QwXyPWcRKg9JfFWVeGpS8A7QNhhUUf4bP616cFWjw4yknhFXxHQXEe9YQMAj3QxYF2PCcVunXrSc4XAABwGtats",
    },
  },
 * */

export const Verifiable_credential = (
    id,
    issuerId,
    credentialSubject,
    issuanceDate,
    proof,
    issuerLogo,
) => {
    return {
        id: id,
        issuerId: issuerId,
        credentialSubject: credentialSubject,
        issuanceDate: issuanceDate,
        proof: proof,
        issuerLogo: issuerLogo,
    };
};
