export const KAKAO_CLIENT_ID = "c5407550af0c7580287fe58af1931b38";
export const KAKAO_REDIRECT_URI = "http://localhost:5173/auth/kakao/callback";
export const KAKAO_GRANT_TYPE = "authorization_code";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
