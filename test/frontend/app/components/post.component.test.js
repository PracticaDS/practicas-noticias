import chai from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"

chai.should()
chai.use(sinonChai)

import { By } from "@angular/platform-browser"
import { TestBed } from "@angular/core/testing"

import PostComponent from "../../../../src/frontend/app/components/post.component"

describe("PostComponent", () => {

  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent]
    });
    fixture = TestBed.createComponent(PostComponent);
  })

  it("header should contain data.title as interpolated text", () => {
    fixture.componentInstance.data = {
      "_id": "id1",
      "title": "Some title",
      "body": "Some body"
    }
    fixture.detectChanges()

    fixture.debugElement.query(By.css("header")).nativeElement
          .innerHTML.should.be.equal("Some title")

    fixture.componentInstance.data.title = "Some title 2"
    fixture.detectChanges()

    fixture.debugElement.query(By.css("header")).nativeElement
          .innerHTML.should.be.equal("Some title 2")
  })




})
