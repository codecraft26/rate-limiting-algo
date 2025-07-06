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