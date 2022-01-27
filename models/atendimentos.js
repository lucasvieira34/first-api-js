const moment = require('moment')
const antendimentos = require('../controllers/antendimentos')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual.'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres.'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemError = erros.length

        if(existemError) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
        
            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }

    listar(res) {
        const sql = 'SELECT * from Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultado) => {
            const atendimento = resultado[0]
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }
}

module.exports = new Atendimento