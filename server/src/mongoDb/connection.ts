import mongoose from 'mongoose';
import {constants} from "../constants/constants";
import {envConstants} from "../config/envConfig";

export const connectToDB = () => {
    try {
        const mongoOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        };
        mongoose.connect(envConstants.MONGO_URI, mongoOptions);
        const conn = mongoose.connection;
        conn.once('open', () => {
          return;
        });
        conn.on('error', (err) => {
            console.error('There was a db connection error', err.message);
            process.exit(1);
        });
        conn.once('connected', () => {
            console.log('Successfully connected to ' + envConstants.MONGO_URI);
        });
        conn.once('disconnected', (ev) => {
            console.error('Disconnected from ' + envConstants.MONGO_URI);
            process.exit(1);
        });
    } catch (e) {
        console.log('error connecting to db', e);
        process.exit(1);
    }
};
