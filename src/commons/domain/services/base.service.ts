import { FilterQuery } from 'mongoose';
import { BaseRepository } from '../../infrastructure/repositories/base.repository';
import { IService } from '../../application/interfaces/IService';
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * MongoService is a generic implementation of service layer of MongoRepository,
 * this allow use the basic methods to do a CRUD and allow rewrite de methods that needed specific business logic
 * @template T
 * @template J
 */
export class BaseService<T, J extends BaseRepository<T>>
    implements IService<T>
{
    private readonly _repo: J;

    constructor(repository: J) {
        this._repo = repository;
    }

    /**
     * findAll allow get all records of MongoRepository
     * @param {QueryParamsDto} queryParams
     * @returns Promise<IPagination<T>> || this will respond a HttpException if occur a error
     */
    async findAll(queryParams: any): Promise<T[]> {
        const [results, error] = await this._repo.findAll(queryParams);
        if (error) {
            throw new HttpException(<string>error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return results;
    }

    /**
     * findOne allow find one record of MongoRepository
     * @param {FilterQuery<T>} query
     * @returns Promise<record | null> || this will respond a HttpException if occur a error
     */
    async findOne(query: FilterQuery<T>): Promise<T | null> {
        const [result, error] = await this._repo.findOne(query);
        if (error) {
            throw new HttpException(<string>error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!result) {
            throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    /**
     * findOneById allow find a document in MongoRepository by sourceId
     * @param {string} id - sourceId of document that you want find
     * @returns Promise<record | null> || this will respond a HttpException if occur a error
     */
    async findOneById(id: string): Promise<T | null> {
        const [result, error] = await this._repo.findOneById(id);
        if (error) {
            throw new HttpException(<string>error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!result) {
            throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    /**
     * create allow save a document in MongoRepository
     * @param document - document that you want save in MongoRepository
     * @returns Promise<record | null> || this will respond a HttpException if occur a error
     */
    async create(document: any): Promise<T | null> {
        const [result, error] = await this._repo.create(document);
        if (error) {
            throw new HttpException(<string>error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
    }

    /**
     * updateOneById allow update a document in MongoRepository by sourceId
     * @param id sourceId of document that you want update
     * @param document source that will replace that last saved document
     * @returns Promise<record | null> || this will respond a HttpException if occur a error
     */
    async updateOneById(id: string, document: any): Promise<T | null> {
        const [result, error] = await this._repo.updateOneById(id, document);
        if (error) {
            throw new HttpException(<string>error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!result) {
            throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    /**
     * removeOneById allow delete a document in MongoRepository by sourceId
     * @param id sourceId of document that you want delete
     * @returns Promise<record | null> || this will respond a HttpException if occur a error
     */
    async removeOneById(id: string): Promise<T | null> {
        const [result, error] = await this._repo.removeOneById(id);
        if (error) {
            throw new HttpException(<string>error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!result) {
            throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }
}
