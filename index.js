const express = require('express')
const server = express()

server.use(express.json())

const musicas = []

// Middleware para verificar se existe musica
function verificarMusicaExiste(req, res, next){

  const { id } = req.params
 
  const musica = musicas.find(m => m.id == id)

  if(!musica){
    return res.status(400).json({error: 'Usuario não encontrado'})
  }

  return next()

}


// Cadastrar Musicas
server.post('/musicas', (req, res)=>{

  const { id, nome_musica, compositor} = req.body

  const musica = {
    id,
    nome_musica,
    compositor
  }

  musicas.push(musica)

  return res.json(musicas)

})

// Listar musicas
server.get('/musicas', (req, res)=>{

  return res.json(musicas)

})

// Alterar nome da musica
server.put('/musicas/:id', verificarMusicaExiste,  (req, res, next)=>{
  
  const { id } = req.params
  const {nome_musica, compositor} = req.body

  const musicaAlterar = musicas.find(m => m.id == id)

  musicaAlterar.nome_musica = nome_musica
  musicaAlterar.compositor = compositor 

  return res.json(musicas)

})

// Deletar musica
server.delete('/musicas/:id', verificarMusicaExiste, (req, res, next)=>{

  const { id } = req.params

  const musica = musicas.findIndex(m => m.id == id)

  musicas.splice(musica,1)

  return res.json(musicas)

})




server.listen(3000)