import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;

export async function connect(): Promise<Db> {
  if (!client) {
    client = new MongoClient(process.env.MONGO_CONNECTION as string);
  }
  await client.connect();
  
  return client.db(process.env.DATABASE);
}

export async function disconnect(): Promise<boolean> {
  if (!client) return true;

  await client.close();
  client = null;

  return true;
}
