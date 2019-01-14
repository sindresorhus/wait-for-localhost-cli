#!/usr/bin/env node
'use strict';
const meow = require('meow');
const waitForLocalhost = require('wait-for-localhost');

const cli = meow(`
	Usage
	  $ wait-for-localhost [port]

	Options
	  --use-get  Use the HTTP-method GET instead of HEAD to test if the server is ready

	Example
	  $ wait-for-localhost 8080 && echo 'Server is ready'
`, {
	input: {
		type: 'number',
		default: 80
	},
	flags: {
		useGet: {
			type: 'boolean'
		}
	}
});

const [port] = cli.input;

(async () => {
	try {
		await waitForLocalhost({
			port,
			...cli.flags
		});

		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(2);
	}
})();
