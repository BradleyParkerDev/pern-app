// app/shared/axios/index.ts
import axios from 'axios';

const isClient = typeof window !== 'undefined';

const api = axios.create({
	baseURL: isClient
		? '/api'
		: process.env.API_URL || 'http://localhost:3001/api',
	withCredentials: true,
});

export default api;
