import { Component } from '@angular/core';

@Component({
  selector: 'post',
  template: `<article>
              <header>{{post.title}}</header>
              {{post.content}}
              <footer>por {{post.author}} - {{post.upvotes}}</footer>
            </article>`
})
export default class PostComponent {
  constructor(post) {
    this.post = post
  }
}
