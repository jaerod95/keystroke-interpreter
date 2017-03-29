module.exports = function () {

    const fs = require('fs');
    const path = require('path');
    const keystrokeInterpreter = require(path.join(__dirname, "keystroke_interpreter.js"));

    var pathToFiles = path.join(__dirname,"..", "..", "raw");
    fs.readdir(pathToFiles, (err, files) => {
        files.forEach(file => {
            var interpreter = new keystrokeInterpreter();
            console.log(file);
            interpreter.init(JSON.parse(fs.readFileSync(path.join(pathToFiles, file), "utf8")));
        });
    });
}