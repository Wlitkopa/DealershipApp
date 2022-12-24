import * as fs from 'node:fs';

function check_file(path, response){
    var data = 'jestem tu'
        fs.lstat(path, function (err, stats) {
            if (stats != undefined){
                if (stats.isDirectory()){
                    response.write('To jest folder')
                    response.end()
                }
    
                if (stats.isFile()){
                    fs.readFile(path, "utf8", function(err, data){
                        console.log("data: " + data)
                        response.write(`Zawartość pliku to: ${data}`)
                        console.log('Po response.write()')
                        response.end()
                    });
            }
            }

            else {
                response.write('Nie ma takiego pliku ani katalogu')
                response.end()
            }
            
})
}

export { check_file }

