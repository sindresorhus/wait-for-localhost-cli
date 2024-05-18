# wait-for-localhost-cli

> Wait for localhost to be ready from the command-line

Useful if you need a local server to be ready to accept requests before executing the next command.

I personally use this to wait for [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) to be ready before launching Electron.

## Install

```
$ npm install --global wait-for-localhost-cli
```

## Usage

```
$ wait-for-localhost --help

  Usage
    $ wait-for-localhost [port]

  Options
    --use-get       Use the HTTP-method GET instead of HEAD to test if the server is ready
    --path          Use a custom path. For example, /health for a health-check endpoint.
    --status-codes  Define status codes indicating the server is ready. 

  Examples
    $ wait-for-localhost 8080 && echo 'Server is ready'
    $ wait-for-localhost 8080 --status-codes 200,201 && echo 'Server is ready'
```

## Related

- [wait-for-localhost](https://github.com/sindresorhus/wait-for-localhost) - API for this module
- [delay-cli](https://github.com/sindresorhus/delay-cli) - Delay execution for a given amount of seconds
