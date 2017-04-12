import { Component } from '@angular/core';

import { ReversePipe } from 'ngx-pipes/src/app/pipes/array/reverse';

import { FeedServiceService } from './feed-service.service'
import { Feeds } from './feeds'
import { FeedContent } from './feed-content'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [FeedServiceService, ReversePipe]
})

export class AppComponent {
    public feeds: Feeds;
    public hasError: boolean;
    public hasResult: boolean;
    public isSubmitted: boolean;

    constructor(private feedServiceService: FeedServiceService) {
        this.hasError = false;
        this.hasResult = false;
        this.isSubmitted = false;

        const localFeeds = localStorage.getItem('feeds');

        if (localFeeds === null) {

            this.isSubmitted = true;
            this.feedServiceService
                .getContent()
                .subscribe(feeds => {
                    console.log(feeds);
                    localStorage.setItem('feeds', JSON.stringify(feeds));
                    this.feeds = feeds;
                    this.hasResult = true;
                    this.isSubmitted = false;
                }, error => {
                    console.log(error);
                    this.hasError = true;
                    this.isSubmitted = false;
                });
        } else {
            console.log('loading from cache');
            this.hasResult = true;
            this.feeds = JSON.parse(localFeeds);
        }
    }
}
