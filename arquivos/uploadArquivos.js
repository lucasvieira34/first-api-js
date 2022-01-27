const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeArquivo, callbackImagemCriada) => {

    const tipoValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminho)
    const tipoValido = tipoValidos.indexOf(tipo.substring(1)) !== -1

    if (tipoValido) {
        const novoCaminho = `./assets/imagens/${nomeArquivo}${tipo}`

        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImagemCriada(false, novoCaminho))
    } else {
        const erro = "Tipo é inválido"
        console.error('Erro. Tipo inválido.')
        callbackImagemCriada(erro)
    }
}