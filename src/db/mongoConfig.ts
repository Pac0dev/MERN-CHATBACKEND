import {Db, MongoClient} from 'mongodb';

const uri= 'mongodb://localhost:27017';
//

const client = new MongoClient(uri);
export let db:Db; 

export async function connectMongo() {
	try {
		await client.connect();
		
		db = client.db('chat');
		console.log('connected succesfully');
	} catch( err ) {
		console.log(err);
	}
}
