
import * as fs from 'node:fs';


function check_file(path){
    console.log('Cokolwiek działa')
    var data = 'jestem tu'
    try {
        if (fs.lstatSync(path).isDirectory()){

            console.log(path + ' is a directory')
            data = path + ' is a directory'
            return data

        }
        else if (fs.lstatSync(path).isFile()){
            console.log(path + ' is a file')
            data = fs.readFileSync(path, {encoding:'utf8', flag:'r'})
            console.log('Zawartość podanego pliku to: ' + data)
            return data
        }

    } catch(error){
        console.log('Nie ma takiego pliku lub katalogu')
        data = 'Nie ma takiego pliku lub katalogu'
        return data
    }
    }


var path = process.argv[2]

// check_file(path)

export { check_file }

