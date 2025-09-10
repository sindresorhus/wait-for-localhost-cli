#!/usr/bin/env node
import process from 'node:process';
import meow from 'meow';
import waitForLocalhost from 'wait-for-localhost';

const cli = meow(`
	Usage
	  $ wait-for-localhost [port]

	Options
	  --use-get       Use the HTTP-method GET instead of HEAD to test if the server is ready.
	  --path          Use a custom path. For example, /health for a health-check endpoint.
	  --status-codes  Define status codes indicating the server is ready. [Default: 200]
	  --timeout       Maximum time to wait in milliseconds.

	Examples
	  $ wait-for-localhost 8080 && echo 'Server is ready'
	  $ wait-for-localhost 8080 --status-codes 200,201 && echo 'Server is ready'
	  $ wait-for-localhost 8080 --timeout 5000 && echo 'Server is ready'
`, {
	importMeta: import.meta,
	input: {
		type: 'number',
		default: 80,
	},
	flags: {
		useGet: {
			type: 'boolean',
		},
		path: {
			type: 'string',
			default: '/',
		},
		statusCodes: {
			type: 'string',
			default: '200',
		},
		timeout: {
			type: 'number',
		},
	},
});

const [port] = cli.input;

cli.flags.statusCodes = cli.flags.statusCodes.split(',').map(statusCode => Number.parseInt(statusCode, 10));

const options = {
	port,
	...cli.flags,
};

if (cli.flags.timeout) {
	options.signal = AbortSignal.timeout(cli.flags.timeout);
}

try {
	await waitForLocalhost(options);

	process.exit();
} catch (error) {
	console.error(error);
	process.exit(2);
}
