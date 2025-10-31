# Granular Permission System Guide

## Overview
- superAdmin: bypasses all checks
- admin: can manage permissions
- user: needs explicit permissions

## Database
- UserPermission: userId, resource, action (view/create/update/delete)

## API Endpoints

### Permission Management (admin/superAdmin)
- POST /api/permissions/grant - Grant permission
- POST /api/permissions/revoke - Revoke permission
- GET /api/permissions/user/:userId - List user permissions
- GET /api/permissions - List all

### Protected Resources
- /api/users - requires users:view/create/update/delete
- /api/sales - requires sales:view/create/update/delete
- /api/reports - requires reports:view

## Examples

User A (sales only):
POST /api/permissions/grant { userId, resource: "sales", action: "create" }

User B (reports only):
POST /api/permissions/grant { userId, resource: "reports", action: "view" }

Admin (users CRUD except delete):
Grant users:view, users:create, users:update

superAdmin: No permissions needed, full access

## Frontend Integration
Fetch permissions on login, conditionally render UI and guard routes
