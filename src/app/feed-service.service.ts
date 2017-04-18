import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Feeds } from './feeds';
import { FeedContent } from './feed-content';

@Injectable()
export class FeedServiceService {

    constructor(private http: Http) { }

    getContent(): Observable<Feeds[]> {
        const headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

        const options = new RequestOptions({ headers: headers });

        return this.http
            .get('https://rss-reader.azurewebsites.net/api/QueryFeed', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Bad response status: ' + response.status);
        }
        let body = response.json() || [];
        let feeds = new Array<Feeds>();
        for (var i = 0; i < body.length; i++) {
            feeds[i] = { feeds: [] }
            for (var j = 0; j < body[i].length; j++) {
                feeds[i].feeds[j] = new FeedContent(body[i][j].title, body[i][j].link, body[i][j].feed, body[i][j].published);
            }
        }
        return feeds;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
