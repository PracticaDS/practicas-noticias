import { Component } from '@angular/core';
import template from './comment.component.html'

@Component({
  selector: 'comment',
  inputs: [ 'data' ],
  template: template
})
export default class CommentComponent {
}
