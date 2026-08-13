const assert = require('node:assert/strict');
const ShipmentRepository = require('../src/repositories/shipment.repository');

assert.ok(ShipmentRepository.model, 'ShipmentRepository.model should be initialized');
assert.strictEqual(typeof ShipmentRepository.count, 'function');
console.log('shipment repository regression check passed');
