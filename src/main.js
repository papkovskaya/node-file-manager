import { COMMANDS, invalidInputMessage } from './consts.js';
import { catchErrorWrapper, getUserName, showAllCommands, getCommandsInfo } from './utils.js';
import { navigateToHome, goUp, moveToDirectory, showAllDataInDirectory } from './navigation.js';
import { readFile, createFile, renameFile, copyFile, moveFile, deleteFile } from './file.js';
import { parseOsArgv } from './os.js';
import { calculateHash } from './hash.js';
import { compressFile, decompressFile} from './zip.js';


const username = getUserName();

const welcomeMessage = `Welcome to the File Manager, ${username}!\n`;
const endingMessage = `Thank you for using File Manager, ${username}, goodbye!\n`;

console.log(welcomeMessage);
navigateToHome();
showAllCommands();

process.on('SIGINT', () => {
    console.log(endingMessage);
    process.exit();
});

process.stdin.on("data", async (data) => {
    const commandInfo = getCommandsInfo(data);

    switch(commandInfo[0]) {
        case COMMANDS.INFO:
            showAllCommands();
            break;
        case COMMANDS.UP:
            goUp();
            break;
        case COMMANDS.CHANGE_DIRECTORY:
            catchErrorWrapper(() => moveToDirectory(commandInfo[1]));
            break;    
        case COMMANDS.LIST:
            catchErrorWrapper(async () => await showAllDataInDirectory());
            break;
        case COMMANDS.CAT:
            catchErrorWrapper(async () => await readFile(commandInfo[1]));
            break;
        case COMMANDS.ADD:
            catchErrorWrapper(async () => await createFile(commandInfo[1]));
            break;
        case COMMANDS.RENAME:
            catchErrorWrapper(async () => await renameFile(commandInfo[1], commandInfo[2]));
            break;
        case COMMANDS.COPY:
            catchErrorWrapper(async () =>  await copyFile(commandInfo[1], commandInfo[2]));
            break;
        case COMMANDS.MOVE:
            catchErrorWrapper(async () => await moveFile(commandInfo[1], commandInfo[2]));
            break;
        case COMMANDS.DELETE:
            catchErrorWrapper(async () => await deleteFile(commandInfo[1]));
            break;
        case COMMANDS.OS:
            catchErrorWrapper(() => parseOsArgv(commandInfo[1]));
            break;
        case COMMANDS.HASH:
            catchErrorWrapper(() => calculateHash(commandInfo[1]));
            break;
        case COMMANDS.COMPRESS:
            catchErrorWrapper(() => compressFile(commandInfo[1], commandInfo[2]));
            break;
        case COMMANDS.DECOMPRESS:
            catchErrorWrapper(() => decompressFile(commandInfo[1], commandInfo[2]));
            break;
        default:
            console.log(invalidInputMessage);
    }
});