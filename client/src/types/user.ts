export interface User {
	id: string;
	email: string;
	username: string;
	name: string | null;
	avatar_url: string | null;
	created_at: string;
	password_last_changed: string;
	is_deletion_requested: boolean;
}
