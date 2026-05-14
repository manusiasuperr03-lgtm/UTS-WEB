import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'replace_this_secret_change_me';

// In-memory admin store (demo). Untuk produksi, ganti ke DB.
const admins = new Map();

async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  if (!admins.has(username)) {
    const hash = await bcrypt.hash(password, 10);
    admins.set(username, { username, passwordHash: hash, role: 'admin' });
    // eslint-disable-next-line no-console
    console.log(`[auth] seeded default admin -> ${username}/${password}`);
  }
}

function signToken({ username, role }) {
  return jwt.sign({ sub: username, role }, JWT_SECRET, { expiresIn: '2h' });
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  const token = header.slice('Bearer '.length);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { username: payload.sub, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

app.post('/api/admin/register', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: 'username and password required' });
  if (admins.has(username)) return res.status(409).json({ message: 'username already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  admins.set(username, { username, passwordHash, role: 'admin' });
  return res.status(201).json({ message: 'registered' });
});

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: 'username and password required' });

  const admin = admins.get(username);
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken({ username: admin.username, role: admin.role });
  return res.json({ token });
});

app.get('/api/admin/me', authMiddleware, (req, res) => {
  return res.json({ username: req.user.username, role: req.user.role });
});

app.get('/api/admin/ping', authMiddleware, (_req, res) => {
  return res.json({ ok: true, ts: Date.now() });
});



function validateGempaBody(body) {
  const { location, magnitude, depth, time, lat, lng } = body || {};
  if (!location || !magnitude || !depth || !time) {
    return { ok: false, message: 'location, magnitude, depth, time wajib' };
  }
  if (lat == null || lng == null) {
    return { ok: false, message: 'lat dan lng wajib' };
  }
  const latNum = Number(lat);
  const lngNum = Number(lng);
  if (Number.isNaN(latNum) || Number.isNaN(lngNum)) {
    return { ok: false, message: 'lat/lng harus angka' };
  }
  return { ok: true, value: { location: String(location), magnitude: String(magnitude), depth: String(depth), time: String(time), lat: latNum, lng: lngNum } };
}



await seedAdmin();
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`backend running at http://localhost:${PORT}`);
});


