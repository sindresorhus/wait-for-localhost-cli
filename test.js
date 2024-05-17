import test from 'ava';
import execa from 'execa';
import delay from 'delay';
import createTestServer from 'create-test-server';

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

test('use path option', async t => {
	t.plan(2);

	const server = await createTestServer();
	server.get('/health', async (request, response) => {
		await delay(1000);
		response.end();
		t.pass();
	});

	await execa('./cli.js', [server.port, '--path', '/health']);

	t.pass();

	await server.close();
});

test('use custom statusCode', async t => {
	t.plan(2);

	const server = await createTestServer();
	server.get('/', async (request, response) => {
		await delay(1000);
		response.status(201).end();
		t.pass();
	});

	await execa('./cli.js', [server.port, '--statusCode', '201']);

	t.pass();

	await server.close();
});

test('use custom statusCode list', async t => {
	t.plan(2);

	const server = await createTestServer();
	server.get('/health', async (request, response) => {
		await delay(1000);
		response.status(202).end();
		t.pass();
	});

	await execa('./cli.js', [server.port, '--statusCode', '201', '--statusCode', '202']);

	t.pass();

	await server.close();
});
