export const COMMANDS = {
    INFO: 'info',
    UP: 'up',
    CHANGE_DIRECTORY: 'cd',
    LIST: 'ls',
    CAT: 'cat',
    ADD: 'add',
    RENAME: 'rn',
    COPY: 'cp',
    MOVE: 'mv',
    DELETE: 'rm',
    OS: 'os',
    HASH: 'hash',
    COMPRESS: 'compress',
    DECOMPRESS: 'decompress',
    EXIT: '.exit'
};

export const OS_ARGV = {
    EOL: '--EOL',
    CPUS: '--cpus',
    HOME_DIRECTORY: '--homedir',
    USERNAME: '--username',
    ARCHITECTURE: '--architecture'
}

export const commandsInfoTable = [
    {Command: COMMANDS.INFO, Description: 'Show all commands'},
    {Command: COMMANDS.UP, Description: 'Go upper from current directory'},
    {Command: `${COMMANDS.CHANGE_DIRECTORY} path_to_directory`, Description: 'Go to dedicated folder'},
    {Command: COMMANDS.LIST, Description: 'Print in console list of all files and folders in current directory'},
    {Command: `${COMMANDS.CAT} path_to_file`, Description: 'Read and print content in console'},
    {Command: `${COMMANDS.ADD} new_file_name`, Description: 'Create empty file in current working directory'},
    {Command: `${COMMANDS.RENAME} path_to_file new_filename`, Description: 'Rename file'},
    {Command: `${COMMANDS.COPY} path_to_file path_to_new_directory`, Description: 'Copy file'},
    {Command: `${COMMANDS.MOVE} path_to_file path_to_new_directory`, Description: 'Move file'},
    {Command: `${COMMANDS.DELETE} path_to_file`, Description: 'Delete file'},
    {Command: `${COMMANDS.OS} ${OS_ARGV.EOL}`, Description: 'Get EOL info'},
    {Command: `${COMMANDS.OS} ${OS_ARGV.CPUS}`, Description: 'Get host machine CPUs info'},
    {Command: `${COMMANDS.OS} ${OS_ARGV.HOME_DIRECTORY}`, Description: 'Get home directory'},
    {Command: `${COMMANDS.OS} ${OS_ARGV.USERNAME}`, Description: 'Get current system user name'},
    {Command: `${COMMANDS.OS} ${OS_ARGV.ARCHITECTURE}`, Description: 'Get CPU architecture for which node.js binary has compiled'},
    {Command: `${COMMANDS.HASH} path_to_file`, Description: 'Calculate hash for file'},
    {Command: `${COMMANDS.COMPRESS} path_to_file path_to_destination`, Description: 'Compress file'},
    {Command: `${COMMANDS.DECOMPRESS} path_to_file path_to_destination`, Description: 'Decompress file'}
];

export const invalidInputMessage = 'Invalid input';
export const operationFailedMessage = 'Operation Failed';
