const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), '.next');
const htmlFiles = [];

function findHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findHtmlFiles(filePath);
    } else if (file.endsWith('.html')) {
      htmlFiles.push(filePath);
    }
  });
}

findHtmlFiles(outDir);

htmlFiles.forEach(htmlFile => {
  let content = fs.readFileSync(htmlFile, 'utf8');
  
  if (!content.includes('dashboard-console-capture.js')) {
    content = content.replace(
      '</head>',
      '<script src="/dashboard-console-capture.js"></script></head>'
    );
    fs.writeFileSync(htmlFile, content);
    console.log(`Injected console capture script into: ${htmlFile}`);
  }
});

console.log(`Processed ${htmlFiles.length} HTML files`);