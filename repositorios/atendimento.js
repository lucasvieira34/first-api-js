const query = require('../infraestrutura/database/queries')

class Atendimento {
    adicionar(atendimento) {
        const sql = 'INSERT INTO Atendimentos SET ?'
        return query(sql, atendimento)
    }

    listar() {
        const sql = 'SELECT * from Atendimentos'

        return query(sql)
    }
}

module.exports = new Atendimento()