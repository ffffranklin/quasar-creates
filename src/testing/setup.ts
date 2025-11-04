import { setupServer } from 'msw/node';
import { restHandlers } from '@/testing/handlers';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

// mocks
vi.mock(import('@/config/env'));

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers());

export { server };
