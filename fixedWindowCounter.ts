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