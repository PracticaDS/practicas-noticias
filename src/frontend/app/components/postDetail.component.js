  import { Component } from '@angular/core'
  import template from './postDetail.component.html'

  import { ActivatedRoute } from '@angular/router'
  import PostService from "../services/post.service"

  @Component({
    selector: 'postDetail',
    inputs: [ 'post' ],
    template: template
  })
  export default class PostDetailComponent {

    constructor(route, postService) {
      this.route = route
      this.postService = postService
    }

    ngOnInit() {
      this.post = {}
      this.route.params.subscribe(params => {
        //cuando algo un parametro cambia
        this.postService.getPost(params.id)
            .then(post => this.post = post)
            .catch(e => console.log(e))
      });
    }

  }

  PostDetailComponent.parameters = [
    ActivatedRoute, PostService
  ]
