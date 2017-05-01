import { Component } from '@angular/core'
import template from './postList.component.html'

import PostService from '../services/post.service'

@Component({
  selector: 'postList',
  template: template
})
export default class PostListComponent {
  constructor(postService) {
    this.posts = postService.posts
  }
}

PostListComponent.parameters = [
  PostService
]
