# Disha Logistics API

Base URL: `http://localhost:5000/api/v1`

## Roles and access

| Capability | Customer | Transporter | Admin / Super admin |
| --- | --- | --- | --- |
| Create shipment | Yes | No | No |
| Track own shipment | Yes | Assigned loads | All shipments |
| Generate / mark invoice paid | No | No | Yes |
| View invoices | Own only | No | All |
| Manage users and partners | No | No | Yes |

## Default administrator

On startup, the API creates the configured `SUPER_ADMIN` once when no account exists for `DEFAULT_ADMIN_EMAIL`. It does not reset an existing user's password. Set the `DEFAULT_ADMIN_*` variables in `.env` before deployment and rotate the development password.

To deliberately repair/create the development admin account, run `npm run seed:admin`. This command resets the configured account password and role, so use it only for local setup or a controlled recovery.

## Invoice API

- `GET /invoices` — customer sees only their invoices; admin sees all.
- `GET /invoices/:id` — permission-checked invoice detail.
- `POST /invoices/shipment/:shipmentId` — admin-only invoice generation.
- `PATCH /invoices/:id/mark-paid` — admin-only settlement update.

Invoices derive the customer and freight data from a shipment, calculate 5% GST (IGST for interstate, otherwise CGST + SGST), and enforce one invoice per shipment.
