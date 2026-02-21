// app/shared/axios/index.ts
import axios from 'axios';

// Detect if running in Vite (browser/client)
const isClient = typeof window !== 'undefined';

const api = axios.create({
	baseURL: isClient
		? import.meta.env.VITE_API_URL
		: process.env.API_URL || 'http://localhost:3001/api',

	withCredentials: true,
});

export default api;
