# e-mailr
An app to send analogue messages, digitally!

| **Environment** | **URL**                     |
|-----------------|-----------------------------|
| live            | https://e-mailr.web.app     |
| dev             | https://e-mailr-dev.web.app |


## Infrastructure
This project depends on:
| **Technology** | **Description**                                 | **Project Name** |
|----------------|-------------------------------------------------|------------------|
| firebase       | Manages hosting and cloud functions deployments | `e-mailr`        |

## Project
The project is made up of the following components:
| **Component** | **Function**                                    |
|---------------|-------------------------------------------------|
| `/firestore`  | Configures firestore database rules and indexes |
| `/web-app`    | React user facing UI                            |

## Continuous Integration
Our CI is defined in the `.github/workflows` directory.

### Firestore
Firestore rules and indexes are updated when a change is merged into the master branch.

### Web App
The web app deploys to devlopment URL when changes are made to the development branch, and to live when changes are made to the master branch.