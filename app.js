let fileSystem = {
  '/': {}
};

function getDir(path) {
  const parts = path.split('/').filter(Boolean);
  let dir = fileSystem['/'];
  for (let part of parts) {
    if (!dir[part] || typeof dir[part] !== 'object') return null;
    dir = dir[part];
  }
  return dir;
}


let currentPath = '/';
const allowedCommands = ['mkdir', 'ls', 'cd', 'rmdir', 'rm', 'touch', 'mv', 'cp', 'curl'];

function parseCommand(input) {
  const parts = input.trim().split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);

  if (!allowedCommands.includes(command)) {
    return { error: `Command not recognized: ${command}` };
  }

  return { command, args };
}
function mkdir(args) {
  const dirName = args[0];
  if (!dirName) return 'mkdir: missing operand';

  const dir = getDir(currentPath);
  if (!dir) return `mkdir: current directory not found`;

  if (dir[dirName]) return `mkdir: cannot create directory '${dirName}': File exists`;

  dir[dirName] = {};
  return '';
}

function ls() {
  const dir = getDir(currentPath);
  if (!dir) return 'ls: current directory not found';
  return Object.keys(dir).join('  ') || '';
}

function cd(args) {
  const dirName = args[0];
  if (!dirName) return 'cd: missing operand';

  if (dirName === '..') {
    if (currentPath === '/') return '';
    const parts = currentPath.split('/').filter(p => p);
    parts.pop();
    currentPath = '/' + parts.join('/');
    if (currentPath === '') currentPath = '/';
    return '';
  }

  const dir = getDir(currentPath);
  if (!dir || !dir[dirName] || typeof dir[dirName] !== 'object')
    return `cd: no such directory: ${dirName}`;

  currentPath = currentPath === '/' ? `/${dirName}` : `${currentPath}/${dirName}`;
  return '';
}


function rmdir(args) {
  const dirName = args[0];
  if (!dirName) return 'rmdir: missing operand';

  const dir = getDir(currentPath);
  if (!dir || !dir[dirName]) return `rmdir: failed to remove '${dirName}': No such directory`;
  if (typeof dir[dirName] !== 'object') return `rmdir: failed to remove '${dirName}': Not a directory`;
  if (Object.keys(dir[dirName]).length > 0) return `rmdir: failed to remove '${dirName}': Directory not empty`;

  delete dir[dirName];
  return '';
}
function rm(args) {
  const fileName = args[0];
  if (!fileName) return 'rm: missing operand';

  const dir = getDir(currentPath);
  if (!dir || !(fileName in dir)) return `rm: cannot remove '${fileName}': No such file`;

  if (typeof dir[fileName] === 'object') return `rm: cannot remove '${fileName}': Is a directory`;

  delete dir[fileName];
  return '';
}




function touch(args) {
  const fileName = args[0];
  if (!fileName) return 'touch: missing operand';

  const dir = getDir(currentPath);
  if (!dir) return 'touch: current directory not found';

  dir[fileName] = '';
  return '';
}


function mv(args) {
  const [oldName, newName] = args;
  if (!oldName || !newName) return 'mv: missing operand';

  const dir = getDir(currentPath);
  if (!dir || !(oldName in dir)) return `mv: cannot stat '${oldName}': No such file or directory`;

  dir[newName] = dir[oldName];
  delete dir[oldName];
  return '';
}



function cp(args) {
  const [src, dest] = args;
  if (!src || !dest) return 'cp: missing operand';

  const dir = getDir(currentPath);
  if (!dir || !(src in dir)) return `cp: cannot stat '${src}': No such file or directory`;

  dir[dest] = JSON.parse(JSON.stringify(dir[src]));
  return '';
}



function curl(args) {
  const url = args[0];
  if (!url) return 'curl: missing URL';
  return `{"message": "Fetched content from ${url}"}`;
}


function executeCommand(input) {
  const { command, args, error } = parseCommand(input);
  if (error) return error;

  switch (command) {
    case 'mkdir': return mkdir(args);
    case 'ls': return ls();
    case 'cd': return cd(args);
    case 'rmdir': return rmdir(args);
    case 'rm': return rm(args);
    case 'touch': return touch(args);
    case 'mv': return mv(args);
    case 'cp': return cp(args);
    case 'curl': return curl(args);
    default: return `Command not recognized: ${command}`;
  }
}
const terminal = document.getElementById('terminal');

function printPrompt() {
  const line = document.createElement('div');
  line.innerHTML = `<span>$ ${currentPath} </span><input type="text">`;
  terminal.appendChild(line);
  const input = line.querySelector('input');
  input.focus();

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const value = input.value.trim();
      if (value === '') {
        // If user just presses Enter, move to next prompt
        terminal.appendChild(document.createElement('div'));
        input.disabled = true;
        printPrompt();
        return;
      }

      const result = executeCommand(value);
      const outputLine = document.createElement('div');
      outputLine.textContent = result;
      terminal.appendChild(outputLine);

      input.disabled = true;
      terminal.scrollTop = terminal.scrollHeight;
      printPrompt();
    }
  });

  terminal.scrollTop = terminal.scrollHeight;
}

printPrompt();

