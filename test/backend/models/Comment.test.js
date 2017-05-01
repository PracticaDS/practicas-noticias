import { setupMocha } from "../setup"

import chai from "chai"
import chaiAsPromised from "chai-as-promised"

const should = chai.should();
chai.use(chaiAsPromised)

import Post from "../../../src/backend/models/Post"
import Comment from "../../../src/backend/models/Comment"

describe("Comment model object", () => {

  let parentPost

  setupMocha()

  beforeEach(async() => {
    const post = new Post({
      title: "A title",
      content: "Some content"
    })
    parentPost = await post.save()
  })

  describe("save() method", () => {

    it("should store all fields", async() => {
      const comment = new Comment({
        body: "A body",
        author: "Somebody",
        upvotes: 10,
        createdAt: new Date(2013, 7, 18),
        post: parentPost
      })

      const saved = await comment.save()

      should.exist(saved)
      saved.should.have.property("_id")
      saved.should.have.property("body").equal("A body")
      saved.should.have.property("author").equal("Somebody")
      saved.should.have.property("upvotes").equal(10)
      saved.should.have.property("post").that.has.property("_id").equal(parentPost._id)

      saved.should.have.property("createdAt")
      saved.createdAt.getTime().should.equal(new Date(2013, 7, 18).getTime())
    })

    it("upvotes should be defaulted to zero if not present", async() => {
      const comment = new Comment({
        body: "A body",
        author: "Somebody",
        post: parentPost
      })

      const saved = await comment.save()
      saved.should.have.property("upvotes").equal(0)
    })

    it("createdAt should be defaulted to now if not present", async() => {
      const now = new Date()

      const comment = new Comment({
        body: "A body",
        author: "Somebody",
        post: parentPost
      })

      const saved = await comment.save()
      saved.should.have.property("createdAt")

      saved.createdAt.getYear().should.equal(now.getYear())
      saved.createdAt.getMonth().should.equal(now.getMonth())
      saved.createdAt.getDate().should.equal(now.getDate())
      //good enough comparison, A better test should mock time so we can do
      //an exact assertion
    })

    it("should fail if parent post not provided", () => {
      const now = new Date()

      const comment = new Comment({
        body: "A body",
        author: "Somebody"
      })

      return comment.save().should.be.rejected
    })
  })

  describe.skip("upvote() method", () => {

    let saved;

    beforeEach(async() => {
      const comment = new Comment({
        body: "A body",
        author: "Somebody",
        upvotes: 10
      })
      saved = await comment.save()
    })

    it("upvotes should be incremented", async() => {
      saved.upvote()
      saved.should.have.property("upvotes").equal(11)
    })

    it("upovotes should be saved property after calling save", async() => {
      saved.upvote()
      const saved2 = await saved.save()
      saved2.should.have.property("upvotes").equal(11)
    })
  })

})
