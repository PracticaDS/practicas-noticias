import chai from "chai"
const should = chai.should()

import sinon from "sinon"
import sinonChai from "sinon-chai"
chai.use(sinonChai)

import { Component } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing';

import { Router }  from '@angular/router';

import PostService from "../../../../src/frontend/app/services/post.service"
import PostListComponent from "../../../../src/frontend/app/components/postList.component"
import PostComponent from "../../../../src/frontend/app/components/post.component"

// Empty mock component for newPost
@Component({ selector: 'newPost', template: ''})
class EmptyComponent { }

describe("PostListComponent", () => {

  let fixture;

  beforeEach(() => {
    const postServiceMock = {
      posts: [{
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
      }]
    }

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ PostListComponent, PostComponent, EmptyComponent ],
      providers: [ {provide: PostService, useValue: postServiceMock } ]
    })

    fixture = TestBed.createComponent(PostListComponent);
    fixture.detectChanges()
  })

  it("should display two posts", () => {
    const postElements = fixture.debugElement.queryAll(By.css("post"))
    postElements.should.have.lengthOf(2)
    postElements[0].query(By.css("header")).nativeElement.innerHTML.should.have.string("Post #1 title")
    postElements[1].query(By.css("header")).nativeElement.innerHTML.should.have.string("Post #2 title")
  })

  it("adding a new post should render it", () => {
    TestBed.get(PostService).posts.push({
      _id: "590761c5c00daf0caa9b881f",
      title: "Post #3 title",
      content: "Post #3 content",
      author: "Post #3 author",
      upvotes: 10
    })
    fixture.detectChanges()

    const postElements = fixture.debugElement.queryAll(By.css("post"))
    postElements.should.have.lengthOf(3)
    postElements[2].query(By.css("header")).nativeElement.innerHTML.should.have.string("Post #3 title")
  })

  it("newPost component should be rendedered", () => {
    fixture.debugElement.query(By.css("newPost")).should.exist
  })

  it("clicking on a post should navigate to postDetail state", () => {
    const router = TestBed.get(Router)
    sinon.stub(router, "navigateByUrl")

    const firstPostElement = fixture.debugElement.queryAll(By.css("post"))[0]
    firstPostElement.triggerEventHandler('click', { button: 0}); //clicks the item, forces navigation

    router.navigateByUrl.should.have.been.called.once;
    router.navigateByUrl.firstCall.args[0].toString().should.be.equal("/noticia/590761c5c00daf0caa9b881a")
  })

  after(() => {
    const router = TestBed.get(Router)
    router.navigateByUrl.restore && router.navigateByUrl.restore()
  });

})
