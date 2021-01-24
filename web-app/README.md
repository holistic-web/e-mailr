# Web App
This is the PWA for the e-mailr project, written in react. It is based on https://github.com/eddedd88/react-firebase-template.

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