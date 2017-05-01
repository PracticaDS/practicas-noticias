import chai from "chai"
const should = chai.should()

import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'

import PostComponent from "../../../../src/frontend/app/components/post.component"

describe("PostComponent", () => {

  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent]
    });

    fixture = TestBed.createComponent(PostComponent);

    const post = {
      title: "Post #1 title",
      content: "Post #1 content",
      author: "Post #1 author",
      upvotes: 3
    }
    fixture.componentInstance.data = post
    fixture.detectChanges()
  })

  it("should display the input post properties", () => {
    const headerContainer = fixture.debugElement.query(By.css("article header")).nativeElement
    headerContainer.innerHTML.should.have.string("Post #1 title")

    const footerContainer = fixture.debugElement.query(By.css("article footer")).nativeElement
    footerContainer.innerHTML.should.have.string("Post #1 author - 3")

    const bodyContainer = fixture.debugElement.query(By.css("article")).nativeElement
    bodyContainer.innerHTML.should.have.string("Post #1 content")
  });

})
