export function tokenBucket(capacity: number, refillRatePerSec: number) {
  let tokens = capacity;
  let lastRefill = Date.now();
  return function allow(): boolean {
    const now = Date.now();
    const elapsed = (now - lastRefill) / 1000;
    tokens = Math.min(capacity, tokens + elapsed * refillRatePerSec);
    lastRefill = now;
    if (tokens >= 1) {
      tokens -= 1;
      return true;
    }
    return false;
  };
} 