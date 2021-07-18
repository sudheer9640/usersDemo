"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoClient = void 0;
class MongoClient {
    save(document, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDocument = new document(data);
                return yield newDocument.save();
            }
            catch (e) {
                throw this.buildMongoError(e);
            }
        });
    }
    find(document, query, project) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield document.find(query, project);
            }
            catch (e) {
                throw this.buildMongoError(e);
            }
        });
    }
    findOne(document, query, project) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield document.findOne(query, project);
            }
            catch (e) {
                throw this.buildMongoError(e);
            }
        });
    }
    findById(document, id, project) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield document.findById(id, project);
            }
            catch (e) {
                throw this.buildMongoError(e);
            }
        });
    }
    update(document, query, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield document.update(query, update, options);
            }
            catch (e) {
                throw e;
            }
        });
    }
    updateOne(document, query, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield document.updateOne(query, update, options);
            }
            catch (e) {
                throw e;
            }
        });
    }
    updateMany(document, query, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield document.updateMany(query, update, options);
            }
            catch (e) {
                throw e;
            }
        });
    }
    delete(document, key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (e) {
                throw e;
            }
        });
    }
    deleteOne() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (e) {
                throw e;
            }
        });
    }
    findOneAndUpdate(document, query, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield document.findOneAndUpdate(query, update, options);
            }
            catch (e) {
                throw e;
            }
        });
    }
    buildMongoError(err) {
        const mongoErr = new Error(err);
        mongoErr.statusCode = 400;
        return mongoErr;
    }
}
exports.mongoClient = new MongoClient();
