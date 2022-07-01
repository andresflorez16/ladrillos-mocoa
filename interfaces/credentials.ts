export interface Credentials {
	email: string,
	password: string,
}

export interface User {
	user: UserInfo
}

export interface UserInfo {
	email: string,
	displayName: string | null,
	uid: string,
	photoURL: string | null
}
