import os from 'os';
import { OS_ARGV, invalidInputMessage } from './consts.js';
import { getHomeDirectory } from './navigation.js';


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