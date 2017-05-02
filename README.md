# RSS Reader Client

## Development

1. node_modules/.bin/json-server --watch src/db.json
1. ng serve

## References

- https://github.com/Suhovft49/fresh-news/
- https://github.com/webmaxru/pwa-workshop-angular
- https://stackoverflow.com/questions/43029667/angular-service-worker-not-working-when-offline
- https://developer.mozilla.org/en-US/docs/Web/Events/notificationclick
- https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/display-a-notification

## Configure Chrome Dev

In chrome://flags enable:

- Enable improved add to Home screen
- Bypass user engagement checks

## Troubleshoot

- chrome://serviceworker-internals/
- https://ciwchris.github.io/rss-reader-ng-client/ngsw.log

## Deploy

1. npm run build:prod (npm run build:local)
1. copy content from dist folder to ../rss-reader-ng-client-gh-pages/
1. change to that directory, git and push changes to gh-pages branch

## TODO

- Don't display subscription buttons if not online
- Use material design
- When push occurs tie in PWA to automatically retrieve the new content
- Detect when refresh occurs, too force reload from server and not use cache
- Shadow notification
  - http://stackoverflow.com/questions/31108699/chrome-push-notification-this-site-has-been-updated-in-the-background
  - File issue
- Upgrade to beta 10
- Use deployments slots. Are they ready?
