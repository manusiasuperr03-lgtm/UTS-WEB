import { getBackendUrl } from './auth.js';

function authHeader() {
  const token = sessionStorage.getItem('admin_token');
  return {
    Authorization: `Bearer ${token}`,
  };
}

async function handleJson(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || `Request gagal (${res.status})`);
  return data;
}

export async function adminListGempa() {
  const res = await fetch(`${getBackendUrl()}/api/admin/gempa`, {
    headers: authHeader(),
  });
  return handleJson(res);
}

export async function adminCreateGempa(payload) {
  const res = await fetch(`${getBackendUrl()}/api/admin/gempa`, {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleJson(res);
}

export async function adminUpdateGempa(id, payload) {
  const res = await fetch(`${getBackendUrl()}/api/admin/gempa/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleJson(res);
}

export async function adminDeleteGempa(id) {
  const res = await fetch(`${getBackendUrl()}/api/admin/gempa/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
  return handleJson(res);
}

