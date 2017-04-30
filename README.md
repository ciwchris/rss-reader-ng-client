# RSS Reader Client

## Development

1. node_modules/.bin/json-server --watch src/db.json
1. ng serve

## References

- https://github.com/Suhovft49/fresh-news/
- https://github.com/webmaxru/pwa-workshop-angular
- https://stackoverflow.com/questions/43029667/angular-service-worker-not-working-when-offline
- https://developer.mozilla.org/en-US/docs/Web/Events/notificationclick

## Configure Chrome Dev

In chrome://flags enable:

- Enable improved add to Home screen
- Bypass user engagement checks

## Deploy

1. npm run build:prod (npm run build:local)
1. copy content from dist folder to ../rss-reader-ng-client-gh-pages/
1. change to that directory, git and push changes to gh-pages branch

## TODO

- When push occurs tie in PWA to automatically retrieve the new content
- Detect when refresh occurs, too force reload from server and not use cache
