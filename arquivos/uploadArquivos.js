const fs = require('fs')

fs.createReadStream('./assets/gato.jpg')
    .pipe(fs.createWriteStream('./assets/gato-stream.jpg'))
    .on('finish', () => console.log('Imagem escrita'))