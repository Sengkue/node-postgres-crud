const { Op } = require('sequelize');
const config = require('../config/index');
const AuditLog = require('../models/audit_log.model');
const logger = require('../utils/logger');

function cutoffDate() {
  const days = Number(config.LOG_RETENTION_DAYS || 30);
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

async function runOnce() {
  try {
    const cutoff = cutoffDate();
    const deleted = await AuditLog.destroy({ where: { createdAt: { [Op.lt]: cutoff } } });
    if (deleted > 0) {
      logger.info({ deleted, cutoff }, 'Audit retention: old logs purged');
    }
  } catch (err) {
    logger.error({ err }, 'Audit retention job failed');
  }
}

function startAuditLogRetention() {
  // Run once on start
  runOnce();
  // Then run every 24 hours
  const intervalMs = 24 * 60 * 60 * 1000;
  setInterval(runOnce, intervalMs).unref();
}

module.exports = { startAuditLogRetention };
