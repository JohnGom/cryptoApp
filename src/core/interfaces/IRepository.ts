/**
 * Generic Repository Interface
 * Defines standard CRUD operations for any data type
 * @template T - The type of entity this repository manages
 * @template ID - The type of the entity's identifier
 */
export interface IRepository<T, ID> {
  /**
   * Find all entities
   */
  findAll(): Promise<T[]>;

  /**
   * Find entity by ID
   * @param id - Entity identifier
   */
  findById(id: ID): Promise<T | null>;

  /**
   * Find entities by criteria
   * @param criteria - Search criteria
   */
  findByCriteria(criteria: Partial<T>): Promise<T[]>;
}
