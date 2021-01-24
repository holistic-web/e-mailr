# Web App
This is the PWA for the e-mailr project, written in react. It is based on https://github.com/eddedd88/react-firebase-template.

Dev: http://e-mailr-dev.web.app/
Live: http://e-mailr.web.app/

## Developing
To start developing this project, first open a shell in this folder, then:

Install dependencies using yarn
```
yarn install
```

Run the web-app
```
yarn start
```

## Deploying
Typically deployment to dev and live environments are managed through merge to the `development` or `master` branches, however if for some reason we need to deploy manually run the following from this folder:

Build the project
```
yarn build
```

Deploy the project
```
firebase deploy
```

If you need to deploy to live directly rather than development, be sure to update the `site` value in `./firebase.json` to: `e-mailr`.

## CI
As mentioned above, CI is configured for this project to run on merge to `development` or `master` branches to deploy to dev or live respectively.

The configuration for this can be found in the `./github/workflows/webapp-deploy.yml` file (from the root level of this project).

## Unknowns
Since this project is the first we've started from this template, there are a few areas where we aren't sure what's going on. It would be good to increase our understanding of what this logic does (and add to this list if we find anything surprising!):

- There are some files relating to a service worker, this sounds good to have in the long run but what is it doing currently?