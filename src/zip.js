import path from 'path';
import * as fs from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export function compressFile(pathToFile, pathToDestination) {
    const fileName = pathToFile.split('/').pop();
    const resolvedPath = path.resolve(pathToDestination + '/' + fileName + '.br');
    const readableStream = fs.createReadStream(path.resolve(pathToFile));
    const writableStream = fs.createWriteStream(resolvedPath);
    readableStream.pipe(createBrotliCompress()).pipe(writableStream);
    readableStream.on('error', () => console.log(operationFailedMessage));
    writableStream.on('error', () => console.log(operationFailedMessage));
}

export function decompressFile(pathToFile, pathToDestination) {
    const fileName = pathToFile.split('/').pop().split('.br')[0];
    const resolvedPath = path.resolve(pathToDestination + '/' + fileName);
    const readableStream = fs.createReadStream(path.resolve(pathToFile));
    const writableStream = fs.createWriteStream(resolvedPath);
    readableStream.pipe(createBrotliDecompress()).pipe(writableStream);
    readableStream.on('error', () => console.log(operationFailedMessage));
    writableStream.on('error', () => console.log(operationFailedMessage));
}