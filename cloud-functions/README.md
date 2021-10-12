# Cloud Functions

This folder defines the cloud functions we have set up in Firebase.

| Function          | Description                              | Trigger       |
|-------------------|------------------------------------------|---------------|
| onAccountCreation | Creates a record in the users collection | first sign in |

## Developing Locally

First you'll want to ensure you have the firebase local emulators configured:
https://firebase.google.com/docs/functions/local-emulator#web-v8

1. Build the project

   ```
   npm run build
   ```

2. Run the functions emulator:

   ```
   firebase emulators:start --only functions
   ```

The http functions will then be available at `localhost:5001/ritoplz/us-central1/{function name}`, eg:

```
localhost:5001/ritoplz/us-central1/ritoApi
```

