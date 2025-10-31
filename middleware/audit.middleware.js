const AuditLog = require('../models/audit_log.model');

function redact(obj) {
  try {
    const clone = JSON.parse(JSON.stringify(obj || {}));
    if (clone.password) clone.password = '[REDACTED]';
    return clone;
  } catch (_) {
    return undefined;
  }
}

function auditLogger(req, res, next) {
  const start = Date.now();
  const { method, originalUrl } = req;
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const query = redact(req.query);
  const body = redact(req.body);

  res.on('finish', async () => {
    try {
      const userId = req.user?.id || null;
      await AuditLog.create({
        userId,
        method,
        path: originalUrl,
        status: res.statusCode,
        ip,
        userAgent,
        query: query ? JSON.stringify(query) : null,
        body: body ? JSON.stringify(body) : null,
        durationMs: Date.now() - start,
      });
    } catch (err) {
      // Avoid throwing in logging path
    }
  });

  next();
}

module.exports = { auditLogger };
