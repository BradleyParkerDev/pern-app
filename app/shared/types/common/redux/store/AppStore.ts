import { createStore } from '@shared/redux/store.js';

// The actual store type
export type AppStore = ReturnType<typeof createStore>;
