﻿import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-app-404',
    template: `
    <div class="container">
      <div class="row">
        <div class="span12">
          <div class="hero-unit center">
              <h1>Page Not Found <small><font face="Tahoma" color="red">Error 404</font></small></h1>
              <br />
              <p>The page you requested could not be found, either contact your webmaster or try again. Use your browsers <b>Back</b> button to navigate to the page you have prevously come from</p>
              <p><b>Or you could just press this neat little button:</b></p>
              <a href="#" class="btn btn-large btn-info"><i class="icon-home icon-white"></i> Take Me Home</a>
            </div>
            <br />
          <div class="thumbnail">
            <center><h2>Recent Content :</h2></center>
          </div>
      </div>
    </div>`,
    directives: [ROUTER_DIRECTIVES]
})

export class PageNotFoundComponent {
}