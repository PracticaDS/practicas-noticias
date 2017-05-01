import { setupMocha } from "../setup"

import chai from "chai"
const should = chai.should()

import Post from "../../../src/backend/models/Post"

describe("Post model object", () => {

  setupMocha()

  describe("save() method", () => {

    it("should store all fields", async() => {
      const post = new Post({
        title: "A title",
        content: "Some content",
        upvotes: 10,
        createdAt: new Date(2013, 7, 18)
      })

      const saved = await post.save()

      should.exist(saved)
      saved.should.have.property("_id")
      saved.should.have.property("title").equal("A title")
      saved.should.have.property("content").equal("Some content")
      saved.should.have.property("upvotes").equal(10)

      saved.should.have.property("createdAt")
      saved.createdAt.getTime().should.equal(new Date(2013, 7, 18).getTime())
    })

    it("upvotes should be defaulted to zero if not present", async() => {
      const post = new Post({
        title: "A title",
        content: "Some content"
      })

      const saved = await post.save()
      saved.should.have.property("upvotes").equal(0)
    })

    it("createdAt should be defaulted to now if not present", async() => {
      const now = new Date()

      const post = new Post({
        title: "A title",
        content: "Some content"
      })

      const saved = await post.save()
      saved.should.have.property("createdAt")

      saved.createdAt.getYear().should.equal(now.getYear())
      saved.createdAt.getMonth().should.equal(now.getMonth())
      saved.createdAt.getDate().should.equal(now.getDate())
      //good enough comparison, A better test should mock time so we can do
      //an exact assertion
    })
  })

  describe("upvote() method", () => {

    let saved;

    beforeEach(async() => {
      const post = new Post({
        title: "A title",
        content: "Some content",
        upvotes: 10
      })
      saved = await post.save()
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
