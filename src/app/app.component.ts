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
    public feeds: Feeds[];
    public hasError: boolean;
    public hasResult: boolean;
    public notificationMessage: string;
    public isSubmitted: boolean;

    constructor(private feedServiceService: FeedServiceService) {
        this.hasError = false;
        this.hasResult = false;
        this.notificationMessage = '';
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
            this.retrieveRemoteFeeds();
        }
    }

    displayNewEntries() {
        if (/^Updates/.test(this.notificationMessage)) {
            const localFeeds = localStorage.getItem('feeds');
            this.feeds = JSON.parse(localFeeds);
        }

        if (!/^Checking/.test(this.notificationMessage)) {
            this.notificationMessage = '';
        }
    }

    private retrieveRemoteFeeds() {
        this.notificationMessage = 'Checking for updates';
        this.feedServiceService
            .getContent()
            .subscribe(feeds => {
                if (this.hasNewEntries(feeds)) {
                    this.notificationMessage = 'Updates to entries found';
                    localStorage.setItem('feeds', JSON.stringify(feeds));
                } else {
                    this.notificationMessage = '';
                }

            }, error => {
                this.notificationMessage = 'Could not check updates';
                console.log(error);
            });
    }

    private hasNewEntries(feeds: Feeds[]): boolean {
        const localFeeds: Feeds[] = JSON.parse(localStorage.getItem('feeds'));
        if (localFeeds.length !== feeds.length) return true;

        for (var i = 0; i < feeds.length; i++) {
            const currentFeeds = feeds[i].feeds;
            const currentLocalFeeds = localFeeds[i].feeds;

            if (currentFeeds.length !== currentLocalFeeds.length ||
                (currentFeeds.length > 0 &&
                    currentFeeds[currentFeeds.length - 1].title !== currentLocalFeeds[currentFeeds.length - 1].title)) return true;
        }
        return false;
    }
}
