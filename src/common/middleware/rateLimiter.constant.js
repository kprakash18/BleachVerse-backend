 const RATE_LIMIT_DEFAULTS = {
  development: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 999999,
    expensiveMax: 999999,
  },
  production: {
    windowMs: 15 * 60 * 1000,
    max: 100,
    expensiveMax: 30,
  }
};

export default RATE_LIMIT_DEFAULTS ;