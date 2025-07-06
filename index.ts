console.log("Hello World");

// Fixed Window Counter
export function fixedWindowCounter(limit: number, windowMs: number) {
  let count = 0;
  let windowStart = Date.now();
  return function allow(): boolean {
    const now = Date.now();
    if (now - windowStart > windowMs) {
      windowStart = now;
      count = 0;
    }
    if (count < limit) {
      count++;
      return true;
    }
    return false;
  };
}

// Sliding Window Log
export function slidingWindowLog(limit: number, windowMs: number) {
  let timestamps: number[] = [];
  return function allow(): boolean {
    const now = Date.now();
    timestamps = timestamps.filter(ts => now - ts < windowMs);
    if (timestamps.length < limit) {
      timestamps.push(now);
      return true;
    }
    return false;
  };
}

// Sliding Window Counter
export function slidingWindowCounter(limit: number, windowMs: number) {
  let currentWindowStart = Date.now();
  let currentCount = 0;
  let prevWindowStart = currentWindowStart - windowMs;
  let prevCount = 0;
  return function allow(): boolean {
    const now = Date.now();
    if (now - currentWindowStart >= windowMs) {
      prevWindowStart = currentWindowStart;
      prevCount = currentCount;
      currentWindowStart = now;
      currentCount = 0;
    }
    const elapsed = now - currentWindowStart;
    const weight = elapsed / windowMs;
    const total = currentCount + prevCount * (1 - weight);
    if (total < limit) {
      currentCount++;
      return true;
    }
    return false;
  };
}

// Token Bucket
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

// Leaky Bucket
export function leakyBucket(capacity: number, leakRatePerSec: number) {
  let water = 0;
  let lastLeak = Date.now();
  return function allow(): boolean {
    const now = Date.now();
    const elapsed = (now - lastLeak) / 1000;
    water = Math.max(0, water - elapsed * leakRatePerSec);
    lastLeak = now;
    if (water < capacity) {
      water += 1;
      return true;
    }
    return false;
  };
}