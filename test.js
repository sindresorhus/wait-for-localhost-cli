const test = require('ava');
const execa = require('execa');
const delay = require('delay');
const createTestServer = require('create-test-server');

test('main', async t => {
	t.plan(2);

	const server = await createTestServer();
	server.head('/', async (request, response) => {
		await delay(1000);
		response.end();
		t.pass();
	});

	await execa('./cli.js', [server.port]);

	t.pass();

	await server.close();
});

test('use get method', async t => {
	t.plan(2);

	const server = await createTestServer();
	server.get('/', async (request, response) => {
		await delay(1000);
		response.end();
		t.pass();
	});

	await execa('./cli.js', [server.port, '--use-get']);

	t.pass();

	await server.close();
});
