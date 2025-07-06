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