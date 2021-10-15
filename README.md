# e-mailr
An app to send analogue messages, digitally!

| **Environment** | **URL**                     |
|-----------------|-----------------------------|
| live            | https://e-mailr.web.app     |
| dev             | https://e-mailr-dev.web.app |

## Project
The project is made up of the following components:
| **Component**      | **Function**                                    |
|--------------------|-------------------------------------------------|
| `/cloud-functions` | Firebase cloud functions and event triggers     |
| `/firestore`       | Configures firestore database rules and indexes |
| `/web-app`         | Nuxt user facing UI                             |

Infrastructure is managed through Firebase, under the project name "e-mailr".

## Continuous Integration
Our CI is defined in the `.github/workflows` directory. Changes to the master branch are deployed directly to live.

| **Job**                  | **Purpose**                                                | **Branch(es)**               |
|--------------------------|------------------------------------------------------------|------------------------------|
| `cloud-functions_deploy` | Deploys the cloud functions to the relevant environment    | `master`                     |
| `cloud-functions_lint`   | Lints the cloud functions and checks it builds succesfully | _everything except `master`_ |
| `firestore_deploy`       | Updates firestore rules and indexes                        | `master`                     |
| `webapp_deploy`          | Deploys the web-app to the relevant environment            | `development` / `master`     |
| `webapp_lint`            | Lints the web-app and checks it builds succesfully         | _everything except `master`_ |

## External Dependencies
The project is made up of the following components:
| **Name** | **Description**                            |
|----------|--------------------------------------------|
| Stannp   | Print on demand API, see `/docs/Stannp.md` |