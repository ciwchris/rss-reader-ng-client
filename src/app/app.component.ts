import { Component } from '@angular/core';

import { FeedServiceService } from './feed-service.service'
import { Feeds } from './feeds'
import { FeedContent } from './feed-content'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [FeedServiceService]
})

export class AppComponent {
    public feeds: Feeds;

    constructor(private feedServiceService: FeedServiceService) {
        this.feedServiceService
            .getContent()
            .subscribe(feeds => {
                console.log(feeds);
                this.feeds = feeds;
            }, error => {
                console.log(error);
            });
    }
    title = 'app works!';
}
