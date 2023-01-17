import { Model, FilterQuery, SchemaTypes, isValidObjectId } from 'mongoose';
import { Logger } from '@nestjs/common';
import { IRepository } from '../../application/interfaces/IRepository';


/**
 * MongoRepository is generic implementation of MongoDB with Mongoose ODM, this
 * allow use a basic methods to do a CRUD and more, T is model's interface that was created
 * with Mongoose
 * @template T
 */
export class BaseRepository<T> implements IRepository<T> {
    private readonly _entity: Model<T>;
    private readonly logger = new Logger();

    constructor(entity: Model<T>) {
        this._entity = entity;
    }

    /**
     *
     */
    async findAll(
        queryParams: any,

    ): Promise<[T[], unknown]> {
        try {
            const results = await this._entity.find(queryParams)
            return [results, null];
        } catch (error) {
            this.logger.error(error);
            return [null, error];
        }
    }

    /**
     * findOne allow find one record on mongo databases using the filterQueries, also allow selects the
     * field that you want get in the response
     * @param {FilterQuery<T>} query - filterQuery, default is {}
     * @param {Array<string>} selects - selects - default is []
     * @returns [record, error]
     */
    async findOne(
        query: FilterQuery<T> = {},
        selects: string[] = [],
    ): Promise<[T | null, unknown]> {
        try {
            const result = await this._entity.findOne(query).select(selects);
            return [result, null];
        } catch (error) {
            this.logger.error(error);
            return [null, error];
        }
    }

    /**
     * findOneById allow find a record in the mongo database, this method will find
     * a record that his _id match with the received id
     * @param {string} id - id to find
     * @param selects - field that you want hidden or show
     * @returns [record, error]
     */
    async findOneById(
        id: string,
        selects: string[] = [],
    ): Promise<[T | null, unknown]> {
        try {
            const result = await this._entity.findById(id).select(selects);
            if (!result) {
                return [null, null];
            }
            return [result, null];
        } catch (error) {
            this.logger.error(error);
            return [null, error];
        }
    }

    /**
     * create allow create a record in a mongo database
     * @param document - document that you want save
     * @returns [record, error]
     */
    async create(document: any): Promise<[T | null, unknown | null]> {
        try {
            const result = await this._entity.create(document);
            return [result, null];
        } catch (error) {
            this.logger.error(error);
            return [null, error];
        }
    }

    /**
     * updateOneById allow update a document with his sourceId
     * @param id - sourceId of source that you want update
     * @param document - source that will replace the before saved data
     * @returns [record, error] - record could be a null or empty document, it's mean that mongo didn't find the document with this sourceId
     */
    async updateOneById(id: string, document: any): Promise<[T | null, unknown]> {
        try {
            const result = await this._entity.findByIdAndUpdate(id, document, {
                new: true,
            });
            return [result, null];
        } catch (error) {
            this.logger.error(error);
            return [null, error];
        }
    }

    /**
     * removeOneById allow delete the document in mongo database
     * @param id - sourceId of document that you want delete
     * @returns [record, error] - record could be a null or empty document, it's mean that mongo didn't find the document with this sourceId
     */
    async removeOneById(id: string): Promise<[T | null, unknown]> {
        try {
            // Check if be enable plugin SoftDelete
            const result = await this._entity.findByIdAndDelete(id);
            return [result, null];
        } catch (error) {
            this.logger.error(error);
            return [null, error];
        }
    }
}
