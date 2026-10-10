const fs = require('fs');
const path = require('path');

function cleanFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('<<<<<<<')) return;

  let lines = content.split(/\r?\n/);
  let newLines = [];
  let mode = 'NORMAL'; 

  for (let line of lines) {
    if (line.startsWith('<<<<<<< ')) {
      mode = 'HEAD';
      continue;
    } else if (line === '=======') {
      mode = 'REMOTE';
      continue;
    } else if (line.startsWith('>>>>>>> ')) {
      mode = 'NORMAL';
      continue;
    }

    if (mode === 'NORMAL' || mode === 'HEAD') {
      newLines.push(line);
    }
  }

  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  console.log(`Nettoyé avec succès : ${filePath}`);
}

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    let fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
        walk(fullPath);
      }
    } else {
      cleanFile(fullPath);
    }
  });
}

walk('.');
console.log('✨ Tous les conflits ont été nettoyés avec succès dans tout le projet !');