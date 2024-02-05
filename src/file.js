import path from 'path';
import * as fs from 'fs';
import { operationFailedMessage } from './consts.js';


export async function readFile(pathToFile) {
    const readableStream = fs.createReadStream(path.resolve(pathToFile), {encoding: 'utf8'});

    readableStream.on('error', () => console.log(operationFailedMessage));

    readableStream.on('data', (chunk) => {
        console.log(chunk);
    })
}

export async function createFile(fileName) {
    await fs.promises.writeFile(fileName, '');
}

export async function renameFile(pathToFile, fileName) {
    await fs.promises.rename(path.resolve(pathToFile), fileName);
}

export async function copyFile(pathToFile, pathToNewDirectory) {
    const fileName = pathToFile.split('/').pop();
    const resolvedPath = path.resolve(pathToNewDirectory + '/' + fileName);
    const readableStream = fs.createReadStream(path.resolve(pathToFile), 'utf8');
    const writableStream = fs.createWriteStream(resolvedPath);

    readableStream.on('error', () => console.log(operationFailedMessage));
    writableStream.on('error', () => console.log(operationFailedMessage));

    readableStream.pipe(writableStream);
}

export async function moveFile(pathToFile, pathToNewDirectory) {
    const fileName = pathToFile.split('/').pop();
    const resolvedPath = path.resolve(pathToNewDirectory + '/' + fileName);
    await fs.promises.rename(path.resolve(pathToFile), resolvedPath);
}

export async function deleteFile(pathToFile) {
    const resolvedPath = path.resolve(pathToFile);
    await fs.promises.rm(resolvedPath);
}