var fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("What is the name of your file? (Include Caps, Spaces and Tag (ex. Hello World.lrc)): ", (answer) => {

    console.log(`Your Filename: ${answer}`)
    console.log("Creating...")

    var fileName = answer

    try {
    var file = fs.readFileSync(`${fileName}`, 'utf8')
    } catch (error) {
        console.log("The file does not exit!")
    }
    

    var lines = file.split('\n');
    var newFile;

    //Change Line to 5
    for (var line = 0; line < lines.length; line++){
        if(lines[line].includes("[")) {
            var bracket = lines[line].slice(0, 10);
            var changeFirst = bracket.replace('[', '<')
            var changeSecond = changeFirst.replace(']', '>')

            var newTag = bracket+changeSecond
            var slicedLine = lines[line].slice(10)
            var newLine = newTag+slicedLine

            newFile = newFile + newLine
        }
    }

    setTimeout(() => {
        fs.writeFile("New-"+`${fileName}`, newFile.slice(9), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!")
        })
    }, 5000)

rl.close();
})