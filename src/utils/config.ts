const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export { delay };

export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK !== 'false';
