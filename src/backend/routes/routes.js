import express from 'express'
import Post from '../models/Post.js'

let router = express.Router()

// Express routes
router.get('/noticias', (req, res, next) => {
  Post.find()
    .then(noticias => res.json(noticias))
    .catch(next)
})

router.post('/noticias', (req, res, next) => {
  const noticia = new Post(req.body)

  noticia.save()
    .then(noticia => res.sendStatus(200))
    .catch(next)
})

export default router
