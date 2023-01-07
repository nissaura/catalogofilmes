import { inserirFilme } from '../repository/filmeRepository.js'

import { Router } from 'express'
const server = Router();

server.post('/filme', async (req, resp) =>{
    try{
        const novoFilme =  req.body;

        if(!novoFilme.nome) throw new Error('Nome do filme é obrigatório');
        if(!novoFilme.sinopse) throw new Error('Sinopse do filme é obrigatório');
        if(!novoFilme.avaliacao) throw new Error('Avaliação do filme é obrigatória');
        if(!novoFilme.lancamento) throw new Error('Data de lançamento é obrigatório');
        if(!novoFilme.disponivel) throw new Error('Campo disponivel  é obrigatório');
        if(!novoFilme.usuario) throw new Error('Usuário  não logado');


        const filme = await inserirFilme(novoFilme);

        resp.send(filme);

    }catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})


export default server;