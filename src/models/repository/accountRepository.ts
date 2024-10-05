const database = require('../../config/database');
import iUser from '../interfaces/iUser';

async function findByUser(user: iUser){
    const db = await database.connect();

    const result = await db.collection(process.env.COLLECTION_USER_NAME).findOne({
        usuario: user.usuario
    });

    database.disconnect();

    return result;
}


export default{
    findByUser
}