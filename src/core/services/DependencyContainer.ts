import { IAPIService } from '../interfaces/IAPIService';
import { CoinloreService } from '../../infrastructure/api/CoinloreService';
import { CoinRepository } from '../../infrastructure/repositories/CoinRepository';
import { MarketRepository } from '../../infrastructure/repositories/MarketRepository';

/**
 * Dependency Container
 * Simple implementation of a dependency injection container
 */
export class DependencyContainer {
  private static instance: DependencyContainer;
  private services: Map<string, any> = new Map();

  /**
   * Get the singleton instance
   */
  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  private constructor() {
    this.registerDefaults();
  }

  /**
   * Register default service implementations
   */
  private registerDefaults(): void {
    // Register API service
    this.register<IAPIService>('apiService', new CoinloreService());
    
    // Register repositories
    this.register<CoinRepository>(
      'coinRepository',
      new CoinRepository(this.resolve<IAPIService>('apiService'))
    );
    
    this.register<MarketRepository>(
      'marketRepository',
      new MarketRepository(this.resolve<IAPIService>('apiService'))
    );
  }

  /**
   * Register a service implementation
   * @param key - Service identifier
   * @param implementation - Service instance
   */
  public register<T>(key: string, implementation: T): void {
    this.services.set(key, implementation);
  }

  /**
   * Resolve a service by key
   * @param key - Service identifier
   */
  public resolve<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service not registered: ${key}`);
    }
    return service as T;
  }

  /**
   * Check if a service is registered
   * @param key - Service identifier
   */
  public has(key: string): boolean {
    return this.services.has(key);
  }

  /**
   * Remove a registered service
   * @param key - Service identifier
   */
  public remove(key: string): boolean {
    return this.services.delete(key);
  }

  /**
   * Replace a service implementation
   * @param key - Service identifier
   * @param implementation - New service instance
   */
  public replace<T>(key: string, implementation: T): void {
    if (this.has(key)) {
      this.remove(key);
    }
    this.register(key, implementation);
  }
} 