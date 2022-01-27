const fs = require('fs')

fs.readFile('./assets/gato.jpg', (erro, buffer) => {
    console.log("Imagem bufferizada.")

    fs.writeFile('./assets/gato2.jpg', buffer, (erro) => {
        console.log("Imagem escrita.")
    })
})