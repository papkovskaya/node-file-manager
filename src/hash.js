import path from 'path';
import { createHash } from 'crypto';
import * as fs from 'fs';
import { operationFailedMessage } from './consts.js';


export function calculateHash(pathToFile) {
    const hash = createHash("sha256");
    const readableStream = fs.createReadStream(path.resolve(pathToFile));
    readableStream.on('data', (chunk) => {
        hash.update(chunk);
    });
    readableStream.on('end', () => {
        console.log(hash.digest("hex"));
    });
    readableStream.on('error', () => console.log(operationFailedMessage));
}