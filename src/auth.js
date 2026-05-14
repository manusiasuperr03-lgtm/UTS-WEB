export function getBackendUrl() {
  // Vite akan expose variabel yang diawali VITE_
  return import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
}

export function getStoredToken() {
  return sessionStorage.getItem('admin_token');
}

export function setStoredToken(token) {
  sessionStorage.setItem('admin_token', token);
}

export function clearStoredToken() {
  sessionStorage.removeItem('admin_token');
}


export async function loginAdmin(username, password) {
  const url = `${getBackendUrl()}/api/admin/login`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || 'Login gagal');
  }

  const data = await res.json();
  if (!data?.token) throw new Error('Token tidak diterima');
  setStoredToken(data.token);
  return data;
}

export async function fetchAdminMe() {
  const token = getStoredToken();
  if (!token) return null;

  const url = `${getBackendUrl()}/api/admin/me`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    clearStoredToken();
    return null;
  }

  const data = await res.json();
  return data;
}

