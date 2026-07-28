export interface ILoginRequest {
  username: string;
  password: string;
}
export interface IRefreshTokenRequest {
  refresh_token: string;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
