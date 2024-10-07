import mongoose from "mongoose";


import { ATLAS_DB_URL, NODE_ENV} from './server.config.js';
async function connectToDB(){

    try{
        if(NODE_ENV == 'development'){
            await mongoose.connect(ATLAS_DB_URL);
        }
   
    }catch(error){
        console.log('unable to connect to db',error);

    }
}

export default connectToDB;