export class FeedContent {
    title: string;
    link: string;
    feed: string;
    published: string;

    constructor(title: string, link: string, feed: string, published: string) {
        this.title = title;
        this.link = link;
        this.feed = feed;
        this.published = published;
    }
}
