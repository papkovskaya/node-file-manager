import path from 'path';
import os from 'os';
import * as fs from 'fs';

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
