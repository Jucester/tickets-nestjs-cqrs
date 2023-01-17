import { Model, FilterQuery, SchemaTypes, isValidObjectId } from 'mongoose';
import { Logger } from '@nestjs/common';
import { IRepository } from '../../application/interfaces/IRepository';


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


    async create(document: any): Promise<[T | null, unknown | null]> {
        try {
            const result = await this._entity.create(document);
            return [result, null];
        } catch (error) {
            this.logger.error(error);
            return [null, error];
        }
    }


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


    async removeOneById(id: string): Promise<[T | null, unknown]> {
        try {
            const result = await this._entity.findByIdAndDelete(id);
            return [result, null];
        } catch (error) {
            this.logger.error(error);
            return [null, error];
        }
    }
}
