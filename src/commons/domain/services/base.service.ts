import { FilterQuery } from 'mongoose';
import { BaseRepository } from '../../infrastructure/repositories/base.repository';
import { IService } from '../../application/interfaces/IService';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseService<T, J extends BaseRepository<T>>
    implements IService<T>
{
    private readonly _repo: J;

    constructor(repository: J) {
        this._repo = repository;
    }

    async findAll(queryParams: any): Promise<T[]> {
        const [results, error] = await this._repo.findAll(queryParams);
        if (error) {
            throw new HttpException(<string>error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return results;
    }

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

    async create(document: any): Promise<T | null> {
        const [result, error] = await this._repo.create(document);
        if (error) {
            throw new HttpException(<string>error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
    }

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
