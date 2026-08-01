# Module F1 + B1 — Authentication System

## What's included
- Users table (PostgreSQL) with role enum (CUSTOMER / SECURITY / ADMIN)
- Backend: register, login, get-current-user, change-password, logout
  (JWT + bcrypt, Zod validation, centralized error handling, role middleware
  ready for future modules)
- Frontend: Login page, Register page, AuthContext + useAuth hook, Axios
  instance with token injection, protected/role-based routing, placeholder
  dashboards per role (to be replaced by F2/F7/F8)

## Backend setup
```bash
cd backend
npm install
cp .env.example .env        # fill in DATABASE_URL and JWT_SECRET
psql "$DATABASE_URL" -f database/schema.sql
npm run dev                 # http://localhost:8080
```

## Frontend setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev                 # http://localhost:5173
```

## API endpoints
| Method | Endpoint                  | Auth        | Description             |
|--------|----------------------------|-------------|--------------------------|
| POST   | /api/auth/register         | Public      | Register a CUSTOMER      |
| POST   | /api/auth/login             | Public      | Login, returns JWT       |
| GET    | /api/auth/me                 | Bearer JWT  | Current user profile     |
| POST   | /api/auth/change-password    | Bearer JWT  | Change password          |
| POST   | /api/auth/logout             | Bearer JWT  | Logout (client discards) |

## Testing instructions
1. `curl -X POST http://localhost:8080/api/health` → `{ "success": true, ... }`
2. Register:
   ```bash
   curl -X POST http://localhost:8080/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"fullName":"Jane Doe","email":"jane@example.com","phone":"9876543210","password":"Passw0rd1"}'
   ```
3. Login with the same credentials → copy the returned `token`.
4. `curl http://localhost:8080/api/auth/me -H "Authorization: Bearer <token>"`
5. Frontend: visit `/register`, create an account → redirected to
   `/customer/dashboard`. Refresh the page → session persists (token in
   localStorage, validated against `/auth/me`). Click Logout → redirected
   to `/login`.
6. Try visiting `/admin/dashboard` while logged in as a customer →
   redirected to `/unauthorized`.

## Integration notes for future modules
- `req.user` is populated by `protect` middleware on every authenticated
  route — later modules (Vehicles, Bookings, etc.) reuse it directly.
- `authorize('ADMIN')` / `authorize('SECURITY','ADMIN')` middleware is ready
  to guard future admin/security-only routes.
- `app.set('io', ...)` in `server.js` exposes Socket.IO to later
  controllers for live parking-slot updates (F4/F7 modules).
- Frontend `api.ts` Axios instance and `AuthContext` are the base every
  future service/page will build on (e.g. `vehicleService.ts` will import
  the same `api` instance).
