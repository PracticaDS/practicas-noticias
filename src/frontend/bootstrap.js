import 'reflect-metadata'
import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import AppComponent from './app/components/app.component'
import PostComponent from './app/components/post.component'


@NgModule({
  imports: [ BrowserModule ],
  styleUrls: ['./style.css'],
  declarations: [
    PostComponent,
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
