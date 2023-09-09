import mongoose, { Schema } from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

const CountSchema = new Schema({
    value: { type: Number },
});

async function setupDatabase() {
    const connection = mongoose.createConnection('mongodb://localhost:27107');

    connection.model('count', CountSchema);

    return connection;
}

export { setupDatabase };
