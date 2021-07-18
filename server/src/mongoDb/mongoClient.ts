import {Document, Model} from 'mongoose';

class MongoClient {

    public async save(document: Model<Document>, data: any) {
        try {
            const newDocument = new document(data);
            return await newDocument.save();
        } catch (e) {
            throw this.buildMongoError(e);
        }
    }

    public async find(document: Model<Document>, query?: any, project?: any) {
        try {
            return await document.find(query, project);
        } catch (e) {
            throw this.buildMongoError(e);
        }
    }

    public async findOne(document: Model<Document>, query: any, project?: any) {
        try {
            return await document.findOne(query, project);
        } catch (e) {
            throw this.buildMongoError(e);
        }
    }

  public async findById(document: Model<Document>, id: string, project?: any) {
    try {
      return await document.findById(id, project);
    } catch (e) {
      throw this.buildMongoError(e);
    }
  }

  public async update(document: Model<Document>, query: any, update: any, options?: any) {
        try {
            return await document.update(query, update, options);
        } catch (e) {
            throw e;
        }
    }

    public async updateOne(document: Model<Document>, query: any, update: any, options?: any) {
        try {
          return await document.updateOne(query, update, options);
        } catch (e) {
            throw e;
        }
    }

    public async updateMany(document: Model<Document>, query: any, update: any, options?: any) {
        try {
            return await document.updateMany(query, update, options);
        } catch (e) {
            throw e;
        }
    }

    public async delete(document: Model<Document>, key: any) {
        try {

        } catch (e) {
            throw e;
        }
    }

    public async deleteOne() {
        try {

        } catch (e) {
            throw e;
        }
    }

    public async findOneAndUpdate(document: Model<Document>, query: any, update: any, options?: any) {
        try {
            return await document.findOneAndUpdate(query, update, options);
        } catch (e) {
            throw e;
        }
    }


    buildMongoError(err: any) {
        const mongoErr: any = new Error(err);
        mongoErr.statusCode = 400;
        return mongoErr
    }
}


export const mongoClient: MongoClient = new MongoClient();
