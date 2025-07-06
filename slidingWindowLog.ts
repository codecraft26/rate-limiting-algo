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