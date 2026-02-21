import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../../app/server/src/app.js';

describe('GET /', () => {
	it('returns rendered HTML shell', async () => {
		const res = await (request(app) as any).get('/');

		expect(res.statusCode).toBe(200);
		expect(res.text.toLowerCase()).toContain('<!doctype html>');
		expect(res.text).toContain('<title>Express + React App</title>');
		expect(res.text).toContain('id="root"');
	});
});
