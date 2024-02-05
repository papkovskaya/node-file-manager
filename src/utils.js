import { operationFailedMessage } from './consts.js';

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
