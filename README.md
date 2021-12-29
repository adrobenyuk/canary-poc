# POC

Simple example of using several versions of ui application from single domain.

## How to start

1. Install UI dependencies in **/packages/frontend** run
   `npm install`
2. Create _public_ folder in **/packages/backend**.
3. Create main UI build in **/packages/frontend** run
   `npm run build`
4. Checkout to any other version of UI build.
   `git checkout 1.3.1`
5. Create _canary_ folder in **/packages/backend**.
6. Create main UI build in **/packages/frontend** run
   `npm run build`
7. Start server in **/packages/backend** run
   `npm start`

After application starts just click on login button and you will receive canary version of application.
