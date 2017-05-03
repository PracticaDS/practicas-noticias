import chai from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"

chai.should()
chai.use(sinonChai)

import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { By } from "@angular/platform-browser"
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"

import PostListComponent from "../../../../src/frontend/app/components/postList.component"
import PostComponent from "../../../../src/frontend/app/components/post.component"

import PostService from "../../../../src/frontend/app/services/post.service"

//Mock para mcoker NewPostComponent que no quiero probar
@Component({ selector: "newPost", template: "" })
class FakeNewPostComponent {}

describe("PostListComponent", () => {

  let fixture;

  beforeEach(() => {
    const postServiceMock = {
      posts: [{
        "_id": "id0",
        "title": "Some title",
        "body": "Some body",
        "author": "Some author",
        "upvotes": 3
      }, {
        "_id": "id1",
        "title": "Some title",
        "body": "Some body",
        "author": "Some author",
        "upvotes": 3
      }]
    }

    TestBed.configureTestingModule({
      declarations: [
        PostListComponent,
        PostComponent,
        FakeNewPostComponent
      ],
      imports: [RouterTestingModule],
      providers: [{
        provide: PostService,
        useValue: postServiceMock
      }]
    });

    fixture = TestBed.createComponent(PostListComponent);
  })

  it("post list should contain two posts inside", () => {
    fixture.detectChanges();

    const postElements = fixture.debugElement.queryAll(By.css("post"))
    postElements.should.have.lengthOf(2)
  })

  it("when new element is added to the service it should be rendered", () => {
    const postServiceQueEstaUsandoAngular = TestBed.get(PostService)
    postServiceQueEstaUsandoAngular.posts.push({
      "_id": "id3",
      "title": "Some title",
      "body": "Some body",
      "author": "Some author",
      "upvotes": 10
    })
    fixture.detectChanges();

    const postElements = fixture.debugElement.queryAll(By.css("post"))
    postElements.should.have.lengthOf(3)
  })

  it("when user click on any post it should navigate", () => {
    const router = TestBed.get(Router)
    sinon.stub(router, "navigateByUrl")

    fixture.detectChanges();

    const postElements = fixture.debugElement.queryAll(By.css("post"))
    postElements[0].triggerEventHandler("click", { button: 0 })

    router.navigateByUrl.should.have.been.called.once
    router.navigateByUrl.firstCall.args[0].toString().should.be.equal("/noticia/id0")
  })

  afterEach(() => {
    const router = TestBed.get(Router)
    router.navigateByUrl.restore && router.navigateByUrl.restore()
  });

})
