import mongoose from 'mongoose'

// Mongoose models and schemas
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

/**
 * Increments the number of votes by one
 */
postSchema.methods.upvote = function() {
  this.upvotes++
}

const Post = mongoose.model('Post', postSchema)

export default Post
