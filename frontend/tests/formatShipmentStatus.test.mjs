import assert from 'node:assert/strict';
import { formatShipmentStatus } from '../src/utils/formatShipmentStatus.js';

assert.equal(formatShipmentStatus('PENDING'), 'Pending');
assert.equal(formatShipmentStatus('ASSIGNED'), 'Accepted');
assert.equal(formatShipmentStatus('DELIVERED'), 'Delivered');
console.log('shipment status formatting regression check passed');
