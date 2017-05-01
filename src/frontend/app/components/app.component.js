import { Component } from '@angular/core'
import template from './app.component.html'

import PostService from '../services/post.service'

@Component({
  selector: 'app-view',
  template: template,
  providers: [ PostService ]
})
export default class AppComponent {
  constructor() {
    this.name = 'Noticias UNQ'
  }
}
