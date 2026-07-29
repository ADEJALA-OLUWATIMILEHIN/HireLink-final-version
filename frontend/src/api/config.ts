const fallbackBackendUrl = "http://localhost:3005";

/**
 * Backend origin supplied at build time. Do not include `/api/v1` here.
 */
export const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL || fallbackBackendUrl
).replace(/\/+$/, "");

export const API_BASE_URL = `${BACKEND_URL}/api/v1`;
