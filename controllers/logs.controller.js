const AuditLog = require('../models/audit_log.model');

async function list(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize || '20', 10)));
    const offset = (page - 1) * pageSize;

    const { rows, count } = await AuditLog.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset,
    });

    res.json({
      data: rows,
      pagination: { page, pageSize, total: count, totalPages: Math.ceil(count / pageSize) },
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs', error: err.message });
  }
}

module.exports = { list };
