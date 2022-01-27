const fs = require('fs')

module.exports = (caminho, nomeArquivo, callbackImagemCriada) => {
    const novoCaminho = `./assets/imagens/${nomeArquivo}`
    fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on('finish', () => callbackImagemCriada(novoCaminho))
}