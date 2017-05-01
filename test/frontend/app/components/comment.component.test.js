import chai from "chai"
const should = chai.should()

import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'

import CommentComponent from "../../../../src/frontend/app/components/comment.component"

describe("CommentComponent", () => {

  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentComponent]
    });

    fixture = TestBed.createComponent(CommentComponent);

    const comment = {
      body: "Some comment body",
      author: "Somebody"
    }
    fixture.componentInstance.data = comment
    fixture.detectChanges()
  })

  it("should display the input comment properties", () => {
    const commentContainer = fixture.debugElement.query(By.css(".comment")).nativeElement
    commentContainer.innerHTML.should.have.string("Some comment body")

    const authorContainer = fixture.debugElement.query(By.css(".author")).nativeElement
    authorContainer.innerHTML.should.have.string("Somebody")
  })

})
