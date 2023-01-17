import { FilterQuery } from 'mongoose';

export interface IRepository<T> {
    findAll(queryParams: any): Promise<[T[], unknown]>;

    findOne(query: FilterQuery<T>): Promise<[T | null, unknown | null]>;

    findOneById(id: string): Promise<[T | null, unknown | null]>;

    create(document: any): Promise<[T | null, unknown | null]>;

    updateOneById(id: string, document: any): Promise<[T | null, unknown | null]>;

    removeOneById(id: string): Promise<[T | null, unknown | null]>;
}
