import { Component } from '@angular/core'
import template from './post.component.html'

@Component({
  selector: 'post',
  inputs: [ 'data' ],
  template: template
})
export default class PostComponent {
}
