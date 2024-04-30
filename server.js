/*
 * This script starts "serving server" with file watching and SCSS compilation
 * Useful, while developing with enabled tempermonkey userscript
 *
 * see README.md for more info
 */

const express = require('express');
const sass = require('sass');
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const package = require('./package.json');

const app = express();

const INPUT_FILE = path.join(__dirname, package.config.scssInput)
const OUTPUT_FILE = path.join(__dirname, package.config.scssOutput)

console.log(INPUT_FILE, OUTPUT_FILE)
console.log(path.dirname(INPUT_FILE), OUTPUT_FILE)
const watcher = chokidar.watch(path.dirname(INPUT_FILE))
setTimeout(() => {
    watcher.on("all", (e, p) => {
        console.log(e, p)
        sass.compileAsync(package.config.scssInput)
            .then(({css}) => {
                console.log("compiled")
                fs.writeFileSync(OUTPUT_FILE, css)
            })
            .catch(console.error)
    })
}, 2e3)

app.use(express.static(path.dirname(package.config.scssOutput)))

const port = process.env.PORT || 9999
app.listen(port, () => console.log(`Server is running on port :${port}`));