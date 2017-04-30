# RSS Reader Client

## Development

1. node_modules/.bin/json-server --watch src/db.json
1. ng serve

## References

https://github.com/Suhovft49/fresh-news/
https://github.com/webmaxru/pwa-workshop-angular
https://stackoverflow.com/questions/43029667/angular-service-worker-not-working-when-offline

## Deploy

1. ng build --prod --base-href "/rss-reader-ng-client/"
1. copy content from dist folder to ../rss-reader-ng-client-gh-pages/
1. change to that directory, git and push changes to gh-pages branch

## TODO

- Customize notification message with images or links and such
- When push occurs tie in PWA to automatically retrieve the new content
- Detect when refresh occurs, too force reload from server and not use cache
