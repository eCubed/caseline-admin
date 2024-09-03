export interface Login {
  username: string;
  password: string;
}

export interface TokenResponse {
  username: string;
  roles: string[];
  accessToken: string;
}