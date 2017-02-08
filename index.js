import express from 'express'
import bodyParser from 'body-parser'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/news')

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

const Post = mongoose.model('Post', postSchema)

const app = express()

app.use(bodyParser.json())

app.get('/noticias', (req, res, next) => {
  Post.find()
    .then(noticias => res.json(noticias))
    .catch(next)
})

app.post('/noticias', (req, res, next) => {
  const noticia = new Post(req.body)

  noticia.save()
    .then(noticia => res.sendStatus(200))
    .catch(next)
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
