/**
 * Exchange model class - represents a cryptocurrency exchange
 */
export class Exchange {
  private _id: string;
  private _name: string;
  private _name_id: string;
  private _volume_usd: number;
  private _active_pairs: number;
  private _url: string;
  private _country: string;

  constructor(data: {
    id: string;
    name: string;
    name_id: string;
    volume_usd: number;
    active_pairs: number;
    url: string;
    country: string;
  }) {
    this._id = data.id;
    this._name = data.name;
    this._name_id = data.name_id;
    this._volume_usd = data.volume_usd;
    this._active_pairs = data.active_pairs;
    this._url = data.url;
    this._country = data.country;
  }

  // Getters
  get id(): string { return this._id; }
  get name(): string { return this._name; }
  get name_id(): string { return this._name_id; }
  get volume_usd(): number { return this._volume_usd; }
  get active_pairs(): number { return this._active_pairs; }
  get url(): string { return this._url; }
  get country(): string { return this._country; }

  // Methods
  /**
   * Gets a formatted volume string with USD symbol
   */
  getFormattedVolume(): string {
    return `$${this._volume_usd.toLocaleString()}`;
  }

  /**
   * Get the normalized URL with http/https prefix
   */
  getNormalizedUrl(): string {
    return this._url.startsWith('http') 
      ? this._url 
      : `https://${this._url}`;
  }

  /**
   * Checks if exchange has a valid URL
   */
  hasValidUrl(): boolean {
    return !!this._url && this._url.length > 0;
  }

  /**
   * Creates an Exchange instance from API response data
   */
  static fromApiResponse(id: string, data: any): Exchange {
    return new Exchange({
      id,
      name: data.name,
      name_id: data.name_id,
      volume_usd: data.volume_usd,
      active_pairs: data.active_pairs,
      url: data.url,
      country: data.country
    });
  }

  /**
   * Converts the model to a plain object
   */
  toObject(): any {
    return {
      id: this._id,
      name: this._name,
      name_id: this._name_id,
      volume_usd: this._volume_usd,
      active_pairs: this._active_pairs,
      url: this._url,
      country: this._country
    };
  }
} 