import * as commandsHelpers from './commands.js';
import { COMMANDS, invalidInputMessage } from './consts.js';
import { catchErrorWrapper, getUserName } from './utils.js';

const username = getUserName();

const welcomeMessage = `Welcome to the File Manager, ${username}!\n`;
const endingMessage = `Thank you for using File Manager, ${username}, goodbye!\n`;

console.log(welcomeMessage);
commandsHelpers.navigateToHome();
commandsHelpers.showAllCommands();

process.on('SIGINT', () => {
    console.log(endingMessage);
    process.exit();
});

process.stdin.on("data", async (data) => {
    const commandInfo = commandsHelpers.getCommandsInfo(data);

    switch(commandInfo[0]) {
        case COMMANDS.INFO:
            commandsHelpers.showAllCommands();
            break;
        case COMMANDS.UP:
            commandsHelpers.goUp();
            break;
        case COMMANDS.CHANGE_DIRECTORY:
            catchErrorWrapper(() => commandsHelpers.moveToDirectory(commandInfo[1]));
            break;    
        case COMMANDS.LIST:
            catchErrorWrapper(async () => await commandsHelpers.showAllDataInDirectory());
            break;
        case COMMANDS.CAT:
            catchErrorWrapper(async () => await commandsHelpers.readFile(commandInfo[1]));
            break;
        case COMMANDS.ADD:
            catchErrorWrapper(async () => await commandsHelpers.createFile(commandInfo[1]));
            break;
        case COMMANDS.RENAME:
            catchErrorWrapper(async () => await commandsHelpers.renameFile(commandInfo[1], commandInfo[2]));
            break;
        case COMMANDS.COPY:
            catchErrorWrapper(async () =>  await commandsHelpers.copyFile(commandInfo[1], commandInfo[2]));
            break;
        case COMMANDS.MOVE:
            catchErrorWrapper(async () => await commandsHelpers.moveFile(commandInfo[1], commandInfo[2]));
            break;
        case COMMANDS.DELETE:
            catchErrorWrapper(async () => await commandsHelpers.deleteFile(commandInfo[1]));
            break;
        case COMMANDS.OS:
            catchErrorWrapper(() => commandsHelpers.parseOsArgv(commandInfo[1]));
            break;
        case COMMANDS.HASH:
            catchErrorWrapper(() => commandsHelpers.calculateHash(commandInfo[1]));
            break;
        case COMMANDS.COMPRESS:
            catchErrorWrapper(() => commandsHelpers.compressFile(commandInfo[1], commandInfo[2]));
            break;
        case COMMANDS.DECOMPRESS:
            catchErrorWrapper(() => commandsHelpers.decompressFile(commandInfo[1], commandInfo[2]));
            break;
        default:
            console.log(invalidInputMessage);
    }
});