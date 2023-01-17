import { FilterQuery } from 'mongoose';

/**
 * IRepository<T> define the structure of any repository, define de basic methods that a repository must have,
 * T is a type of data that the class method must return
 */
export interface IRepository<T> {
    findAll(
        queryParams: any,
    ): Promise<[T[], unknown]>;

    findOne(query: FilterQuery<T>): Promise<[T | null, unknown | null]>;

    findOneById(id: string): Promise<[T | null, unknown | null]>;

    create(document: any): Promise<[T | null, unknown | null]>;

    updateOneById(id: string, document: any): Promise<[T | null, unknown | null]>;

    removeOneById(id: string): Promise<[T | null, unknown | null]>;
}
