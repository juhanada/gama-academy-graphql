import { readFile, writeFile } from "fs";
import { resolve } from 'path';

function createRepository (name) {
    const path = resolve(__dirname, `../../data/${name}.json`)

//    console.log(path);
  
    return {
        read: () => new Promise ((resolve, reject) => {
            //console.log('read promise');
            readFile(path, (error, data) => {
                if (error) {
                    console.log('erro no read file');
                    reject(error);
                    return;
                }
                // console.log('read file promise')
                // console.log(JSON.parse(data));
                resolve(JSON.parse(data));
            })
        }),

        write: (data) => new Promise ((resolve, reject) => {
            writeFile(path, JSON.stringify(data), (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            })
        })
    }
}

export default createRepository;