import app from "./app"

import mongoose from 'mongoose'
const MONGO_SERVER = process.env.MONGO_SERVER || `mongodb://localhost/news`
mongoose.connect(MONGO_SERVER)

// Express startup
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server running on port ${port}`))
