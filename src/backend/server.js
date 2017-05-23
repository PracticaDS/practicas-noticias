import app from "./app"

import mongoose from 'mongoose'
const MONGO_SERVER = process.env.MONGO_SERVER || 'localhost'
mongoose.connect(`mongodb://${MONGO_SERVER}/news`)

// Express startup
const port = 3001
app.listen(port, () => console.log(`Server running on port ${port}`))
