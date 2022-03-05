class User {

	private username: string;
	private email: string;
	private password: string;

	constructor(username:string, email:string, password:string) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	get _username() {
		return this.username;
	}

	get _email() {
		return this.email;
	}
	get _password() {
		return this.password;
	}

	setUsername(username:string) {
		this.username = username;
	}
	setEmail(email:string) {
		this.email = email;
	}
	setPassword(password:string) {
		this.password = password;
	}
}
export default User;
