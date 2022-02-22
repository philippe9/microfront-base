export interface OAuth2Token {
  access_token: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  refresh_expires_in: number;
  scope: string;
  request_password_change?: number;
}
