const path = require('path');
const fs = require('fs');
const glob = require('glob');

const BASE_PATH = path.join(__dirname, '../docs');
const SIDEBAR_PATH = path.join(__dirname, '../sidebars.json');

const sortDocFiles = (files, dirPath) => {
    return files.sort((a, b) => {
        const aName = a.replace(`${dirPath}/`, '');
        const bName = b.replace(`${dirPath}/`, '');
        if (aName === 'readme.md' || aName === 'readme.mdx') {
            return -1;
        }
        if (bName === 'readme.md' || bName === 'readme.mdx') {
            return -1;
        }
        const aNum = aName.split('_')[0];
        const bNum = bName.split('_')[0];
        return bNum - aNum;
    }).reverse();
}

const transformSidebarPath = (file, dir, dirPath) => {
    return file.replace(/\/\d+_/g, '/').replace(`${dirPath}/`, `${dir}/`).replace('.mdx', '').replace('.md', '');
}

const main = async () => {
    const dirs = fs.readdirSync(BASE_PATH);
    console.log(dirs)
    const docs = {};
    for (const dir of dirs) {
        const dirPath = path.join(BASE_PATH, dir);
        const files = glob.sync(`${dirPath}/**/*.md?(x)`);
        docs[dir] = sortDocFiles(files, dirPath).map((file) => {
            return transformSidebarPath(file, dir, dirPath);
        });
    }
    fs.writeFileSync(SIDEBAR_PATH, JSON.stringify(docs, null, 4));
}

main()
