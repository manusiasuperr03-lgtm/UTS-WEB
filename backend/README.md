# Backend Auth (Admin)

## Start
```bash
cd backend
npm install
npm run dev
```

## Default admin
- username: `admin`
- password: `admin123`

## API
- `POST /api/admin/login` -> `{ token }`
- `GET /api/admin/me` (Bearer token) -> `{ username, role }`
- `POST /api/admin/register` (optional)


