import request from "./request";

export const getProfile = (token: string) => {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  return request.get(`/user`, { headers });
}

export const updateProfile = (token: string) => {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  return request.put(`/user`, { headers });
}