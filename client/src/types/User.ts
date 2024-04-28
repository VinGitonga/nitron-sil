export interface UserDocument {
	_id: string;
	name: string;
	username: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	albumCount?: number;
}

export interface IUser extends UserDocument {
	photoURL?: string;
}
