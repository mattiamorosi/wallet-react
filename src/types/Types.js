export const Proof = (
    ptype,
    verificationMethod,
    signatureValue,
) => {
    return {
        ptype: ptype,
        verificationMethod: verificationMethod,
        signatureValue: signatureValue,
    };
};

export const credentialSubject = (
    id,
    credentialIssuer,
    credentialType,
    properties,
    sign,
) => {
    return {
        id: id,
        credentialIssuer: credentialIssuer,
        credentialType: credentialType,
        properties: properties,
        sign: sign,
    };
};
