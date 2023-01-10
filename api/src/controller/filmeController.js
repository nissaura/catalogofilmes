import { inserirFilme, alterarImagem, listarTodosFilmes, deletarFilme, listarFilmeId, listarFilmeNome } from '../repository/filmeRepository.js'
   
import multer from 'multer'

import { Router } from 'express'
const server = Router();
const upload = multer({ dest: 'storage/capasfilmes'});

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

server.put('/filme/:id/imagem', upload.single('capa'),  async (req, resp) => {
    try{
        const { id } = req.params;
        const imagem = req.file.path;

        const resposta = await alterarImagem(imagem, id);
        
        if (resposta!=1)
            throw new Error('A imagem não pode ser salva');

        resp.status(204).send();

    }catch(err){
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.get('/filme', async (req, resp) => {
    try{
        const resposta = await listarTodosFilmes();
        resp.send(resposta);

    }catch(err){
        resp.status(400).send({
            erro: err.massage
        })
    }
})


server.delete('/filme/:id', async (req, resp) => {
    try{
        const { id } = req.params;

        const resposta = await  deletarFilme(id);
        resp.send(resposta);


    }catch(err){
        send.status(200).send({
            erro: err.massage
        })
    }
})

server.get('/filme/:id', async (req, resp) => {
    try{

        const {id } = req.params;

        const resposta = await listarFilmeId(id);
        resp.send(resposta);
    }catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filme/busca', async (req, resp) => {
    try{

        const { nome } = req.query;

        const resposta = await listarFilmeNome(nome);
        resp.send(resposta);

    }catch(err){
        resp.status(400).send({
            erro: err.massage
        })
    }
})


export default server;