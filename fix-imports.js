const fs = require('fs');
const path = require('path');

const dirPath = "c:\\Users\\user\\OneDrive - Creare Sistemas\\Documentos\\lexa\\Lexa-Saas\\src\\features\\process-management\\ui\\components";

const replacements = [
    { search: /@\/components\/ui\//g, replace: "@/shared/ui/" },
    { search: /@\/components\/shared\//g, replace: "@/shared/ui/" },
    { search: /@\/features\/processos\//g, replace: "@/features/process-management/" },
    { search: /@\/lib\/utils/g, replace: "@/shared/lib/utils" },
    { search: /@\/lib\/formatters/g, replace: "@/shared/lib/formatters" },
    { search: /from "\.\.\/types"/g, replace: 'from "../../model/types"' },
    { search: /from "\.\.\/constants"/g, replace: 'from "../../model/constants"' },
    { search: /@\/hooks\/useDebounce/g, replace: "@/shared/lib/useDebounce" } // generic mapping
];

function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            for (const { search, replace } of replacements) {
                if (search.test(content)) {
                    content = content.replace(search, replace);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${file}`);
            }
        }
    }
}

processDirectory(dirPath);
console.log("Done.");
