import { FilterQuery } from 'mongoose';

/**
 * IService is a interface that define the structure of service class that want
 * extends of MongoRepository class, T is a type of data that you will respond to client
 */
export interface IService<T> {
    findAll(queryParams: any): Promise<T[] | null>;

    findOne(query: FilterQuery<T>): Promise<T | null>;

    findOneById(id: string): Promise<T | null>;

    create(document: any): Promise<T | null>;

    updateOneById(id: string, document: any): Promise<T | null>;

    removeOneById(id: string): Promise<T | null>;
}
