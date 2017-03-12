import express from 'express'

import Post from '../models/Post.js'
import Comment from '../models/Comment.js'

let router = express.Router()

//Express parameters
router.param('noticia', (req, res, next, value) => {
  Post.findById(value)
    .then(noticia => {
      if (! noticia ) {
        throw new Error(`Noticia no encontrada ${value}`)
      }

      req.noticia = noticia
      next()
    })
    .catch(next)
})

// Express routes
router.get('/noticias', (req, res, next) => {
  Post.find()
    .then(noticias => res.json(noticias))
    .catch(next)
})

router.post('/noticias', (req, res, next) => {
  const noticia = new Post(req.body)

  noticia.save()
    .then(noticia => res.json(noticia.id))
    .catch(next)
})

router.get('/noticias/:noticia', (req, res, next) => {
  req.noticia.populate('comments').execPopulate()
    .then(noticiaCompleta => res.json(noticiaCompleta))
    .catch(next)
})

router.put('/noticias/:noticia/upvote', (req, res, next) => {
  const noticia = req.noticia
  noticia.upvote()

  noticia.save()
    .then(noticiaGuardada => res.json(noticiaGuardada))
    .catch(next)
})

router.post('/noticias/:noticia/comentarios', (req, res, next) => {
  const noticia = req.noticia
  let comentario = new Comment(req.body)
  comentario.post = noticia

  comentario.save()
    .then(comentarioGuardado => {
      comentario = comentarioGuardado
      noticia.comments.push(comentario)
      return noticia.save()
    })
    .then(noticiaGuardada => res.json(comentario))
    .catch(next)
})

export default router
