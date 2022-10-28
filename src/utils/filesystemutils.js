import {Directory, Encoding, Filesystem} from "@capacitor/filesystem";

const readFile = async (document) => {
    return await Filesystem.readFile({
        path: document,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
    });
};

const writeFile = async (data, document) => {
    await Filesystem.writeFile({
        path: document,
        data: data,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
    });
};

export { readFile, writeFile };
