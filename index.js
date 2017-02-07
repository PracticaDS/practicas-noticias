import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())

// This is temporal!
let noticias = []

app.get('/noticias', (req, res) => {
  res.json(noticias)
})

app.post('/noticias', (req, res) => {
  let noticia = req.body
  noticias.push(noticia)

  res.sendStatus(200)
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
