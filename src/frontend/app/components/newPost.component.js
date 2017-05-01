import { Component } from '@angular/core';
import template from './newPost.component.html'

import PostService from '../services/post.service'

@Component({
  selector: 'newPost',
  template: template
})
export default class NewPostComponent {
  constructor(postService) {
    this.data = {}
    this.postService = postService
  }

  onSubmit() {
    this.postService.create(this.data)
    this.data = {}
  }
}

NewPostComponent.parameters = [
  PostService
]
