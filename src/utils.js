import { commandsInfoTable, operationFailedMessage } from './consts.js';

export function catchErrorWrapper(func) {
    try {
        func();
    } catch {
        console.log(operationFailedMessage);
    }
}

export function getUserName() {
    const argv = process.argv.slice(2, 3).pop();
    const [usernameKey, username] = argv.split('=');
    if (usernameKey !== '--username' || !username) {
        console.log(operationFailedMessage);
    }
    return username;
}

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