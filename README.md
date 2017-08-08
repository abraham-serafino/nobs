## Node Bootstrap (No.BS)

Quickly generate fullstack ESNext apps with support for browser-autorefresh and
Websocket-based APIs.

### Usage

To install, type:

```
npm install -g nodebs
```

To create a new No.BS project, type:
 
 ```
nobs my-new-project
```

**warning** `nobs` currently CLOBBERS existing directories. 

This will create a new working directory with your project bootstrapped inside. To
start a development server, `cd` to your new project and enter:
 
```
yarn dev
```

When it is time to do a production build, enter:

```
yarn build
```
