// export interface AuthResponse {
//     access_token: string;
//     token_type:   string;
//     expires_in:   number;
// }

export interface AuthResponse {
    access_token: string;
    token_type:   string;
    expires_in:   number;
    user:         User;
}

export interface User {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: Date | null;
    nickname:          string | null;
    photo:             string | null;
    bio:               string | null;
    website:           string | null;
    background:        string | null;
    headline:          string | null;
    is_active:         number;
    is_verified:       number;
    is_deleted:        number;
    created_at:        Date;
    updated_at:        Date;
    deleted_at:        Date | null;
}


export interface AuthRevalidate {
    valid: boolean;
    user:  User;
}
