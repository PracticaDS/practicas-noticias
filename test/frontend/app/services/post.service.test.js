import chai from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"

chai.should()
chai.use(sinonChai)

import PostService from "../../../../src/frontend/app/services/post.service"

describe("PostService", () => {

  let http;
  let postService;

  beforeEach(async() => {
    http = {
      get() {
      }
    }

    sinon.stub(http, "get")
    http.get.withArgs("/noticias").returns(createAngularResponse([{
      "_id": "id1",
      "title": "A post",
      "body": "This is a post"
    }, {
      "_id": "id2",
      "title": "Another post",
      "body": "This is another post"
    }]));

    postService = new PostService(http);
    await tick();
  })

  describe("posts property", () => {
    it("Should contain objects retrieved from server", async() => {
      http.get.should.have.been.calledOnce
      postService.posts.should.have.lengthOf(2);
    })
  })

  describe("getPost(id)", () => {
    it("Should return a valid post", async() => {

      http.get.withArgs("/noticias/id1").returns(createAngularResponse({
        "_id": "id1",
        "title": "A post",
        "body": "This is a post"
      }));

      const post = await postService.getPost("id1")
      post._id.should.be.equal("id1")
      post.title.should.be.equal("A post")
    })
  })

})

function tick() {
  return Promise.resolve("")
}

function createAngularResponse(data) {
  return {
    toPromise() {
      return Promise.resolve({
        json() {
          return data
        }
      })
    }
  }
}
