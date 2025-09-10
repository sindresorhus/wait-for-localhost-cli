import test from 'ava';
import {execa} from 'execa';
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

test('use statusCodes option', async t => {
	t.plan(2);

	const server = await createTestServer();
	server.get('/', async (request, response) => {
		await delay(1000);
		response.status(201).end();
		t.pass();
	});

	await execa('./cli.js', [server.port, '--status-codes', '201']);

	t.pass();

	await server.close();
});

test('use multiple statusCodes options', async t => {
	t.plan(2);

	const server = await createTestServer();
	server.get('/', async (request, response) => {
		await delay(1000);
		response.status(202).end();
		t.pass();
	});

	await execa('./cli.js', [server.port, '--status-codes', '201,202']);

	t.pass();

	await server.close();
});

test('timeout option', async t => {
	const server = await createTestServer();
	server.get('/', async (request, response) => {
		// Never respond
		await delay(10_000);
		response.end();
	});

	// Should timeout after 1 second
	await t.throwsAsync(
		execa('./cli.js', [server.port, '--timeout', '1000']),
		{message: /aborterror|signal|timeout/i},
	);

	await server.close();
});
