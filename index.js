import express from 'express'

const app = express()

let noticias = []

app.get('/noticias', (req, res) => {
  res.status(200).send(noticias)
})

app.post('/noticias', (req, res) => {
  let noticia = req.body

  noticias.push(noticia)
  res.status(200).send(noticia)
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
