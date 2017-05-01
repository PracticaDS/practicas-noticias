import chai from "chai"
import sinon from "sinon"
const should = chai.should()

import { Http } from '@angular/http';

import PostService from "../../../../src/frontend/app/services/post.service"

describe("PostService", () => {

  let service;

  beforeEach(async() => {
    const http = sinon.createStubInstance(Http)

    http.get.withArgs("/noticias").callsFake(() => createResponse([{
      _id: "590761c5c00daf0caa9b881a",
      title: "Post #1 title",
      content: "Post #1 content",
      author: "Post #1 author",
      upvotes: 3
    }, {
      _id: "590761c5c00daf0caa9b881b",
      title: "Post #2 title",
      content: "Post #2 content",
      author: "Post #2 author",
      upvotes: 1
    }]));

    http.get.withArgs("/noticias/590761c5c00daf0caa9b881a").callsFake(() => createResponse({
      _id: "590761c5c00daf0caa9b881a",
      title: "Post #1 title",
      content: "Post #1 content",
      author: "Post #1 author",
      upvotes: 5 //somebody updated the uptvotes ;)
    }))

    service = new PostService(http)
    await http.get("/noticias").toPromise() //forces to wait for http service to resolve
  })

  describe("posts", () => {
    it("should return the posts fetched from server", () => {
      service.posts.should.have.lengthOf(2)
      service.posts[0].should.have.property("_id").that.equal("590761c5c00daf0caa9b881a")
      service.posts[1].should.have.property("_id").that.equal("590761c5c00daf0caa9b881b")

      service.posts[0].should.have.property("_id").equal("590761c5c00daf0caa9b881a")
      service.posts[0].should.have.property("title").equal("Post #1 title")
      service.posts[0].should.have.property("content").equal("Post #1 content")
      service.posts[0].should.have.property("author").equal("Post #1 author")
      service.posts[0].should.have.property("upvotes").equal(3)
    });
  });

  describe("getPost(id)", () => {
    it("should always fetch new state from server", async() => {
      const post = await service.getPost("590761c5c00daf0caa9b881a")

      post.should.have.property("_id").equal("590761c5c00daf0caa9b881a")
      post.should.have.property("title").equal("Post #1 title")
      post.should.have.property("content").equal("Post #1 content")
      post.should.have.property("author").equal("Post #1 author")
      post.should.have.property("upvotes").equal(5)
    });

    it.skip("should update posts property to the latest state", async() => {
      const id = "590761c5c00daf0caa9b881a"

      let post = service.posts.find(each => each._id === id)
      post.should.have.property("upvotes").equal(3)

      post = await service.getPost(id)
      post.should.have.property("_id").equal("590761c5c00daf0caa9b881a")
      post.should.have.property("title").equal("Post #1 title")
      post.should.have.property("content").equal("Post #1 content")
      post.should.have.property("author").equal("Post #1 author")
      post.should.have.property("upvotes").equal(5)

      post = service.posts.find(each => each._id === id)
      post.should.have.property("upvotes").equal(5)
    });
  });

  describe("create(post)", () => {
    it("should invoke the REST api")
    it("should add the new post into the posts field")
    it("new post should be semantically complete")
  })

})

function createResponse(data) {
  return {
    toPromise() {
      return Promise.resolve({
        json() {
          return data;
        }
      })
    }
  }
}
