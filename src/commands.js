import path from 'path';
import os from 'os';
import * as fs from 'fs';
import { createHash } from 'crypto';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { commandsInfoTable, OS_ARGV, invalidInputMessage, operationFailedMessage } from './consts.js';


export function showAllCommands() {
    console.log('NOTE: if your path has a space, wrap it with quotes, for example: "C:/example dir"\n');
    console.table(commandsInfoTable);
    console.log('Print commands and wait for results\n');
}

export function getCommandsInfo(data) {
    const dataString = data.toString().replace(/\r\n$/, '');
    let info;
    info = dataString.split(/\s*"\s*/);
    if (info.length <= 1) {
        info = dataString.split(" ");
    }
    return info.filter((str) => str.length);
}

export function showCurrentDirectory() {
    console.log(`You are currently in ${path.resolve()}\n`);
}

export function getHomeDirectory() {
    return os.homedir();
}

export function navigateToHome() {
    moveToDirectory(getHomeDirectory());
}

export function goUp() {
    process.chdir('../');
    showCurrentDirectory();
}

export function moveToDirectory(pathToDirectory) {
    process.chdir(path.resolve(pathToDirectory));
    showCurrentDirectory();
}

export async function showAllDataInDirectory() {
    const content = await fs.promises.readdir(path.resolve(), {withFileTypes: true});
    const folders = [];
    const files = [];
    let response = [];
    content.forEach((item) => {
        if (item.isDirectory()) {
            folders.push(item.name);
        } else if (item.isFile()) {
            files.push(item.name);
        }
    });
    folders.sort();
    files.sort();
    folders.forEach(item => {
        response = [
            ...response,
            {Name: item, Type: "directory"}
        ]
    });
    files.forEach(item => {
        response = [
            ...response,
            {Name: item, Type: "file"}
        ]
    });
    console.table(response);
}

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

export function parseOsArgv(argv) {
    switch(argv) {
        case OS_ARGV.EOL:
            console.log(os.EOL);
            break;
        case OS_ARGV.CPUS:
            getCPUInfo();
            break;
        case OS_ARGV.USERNAME:
            console.log(os.userInfo().username);
            break;
        case OS_ARGV.HOME_DIRECTORY:
            console.log(getHomeDirectory());
            break;
        case OS_ARGV.ARCHITECTURE:
            console.log(os.arch());
            break;
        default:
            console.log(invalidInputMessage);
    }
}

export function getCPUInfo() {
    const cpus = os.cpus();
    const parsedResult = cpus.map((item) => ({
        model: item.model,
        'clock rate in GHz': item.speed / 1000
    }));
    console.table(parsedResult);
}

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