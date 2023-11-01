#!/usr/bin/env node
import process from 'node:process';
import meow from 'meow';
import waitForLocalhost from 'wait-for-localhost';

const cli = meow(`
	Usage
	  $ wait-for-localhost [port]

	Options
	  --use-get  Use the HTTP-method GET instead of HEAD to test if the server is ready
	  --path     Use a custom path. For example, /health for a health-check endpoint.

	Example
	  $ wait-for-localhost 8080 && echo 'Server is ready'
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
	},
});

const [port] = cli.input;

(async () => {
	try {
		await waitForLocalhost({
			port,
			...cli.flags,
		});

		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(2);
	}
})();
