import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/products/[id]/photos/route';

describe('/api/products/:id/photos', () => {
  it('should be defined', () => {
    expect(POST).toBeTruthy();
  });

  describe('when invalid product id provided', () => {
    it.skip('should return 404 not found error', () => {});
  });

  describe('when invalid photos uploaded', () => {
    it.skip('should throw error', () => {});
  });

  describe('when photos uploaded', () => {
    it.skip('should save photos to s3', () => {});
  });
});
