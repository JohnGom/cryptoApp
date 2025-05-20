/**
 * Market model class - represents a trading market for a cryptocurrency
 */
export class Market {
  private _name: string;
  private _base: string;
  private _quote: string;
  private _price: number;
  private _price_usd: number;
  private _volume: number;
  private _volume_usd: number;
  private _time: number;
  private _exchange_url?: string;
  private _exchange_id?: string;

  constructor(data: {
    name: string;
    base: string;
    quote: string;
    price: number;
    price_usd: number;
    volume: number;
    volume_usd: number;
    time: number;
    exchange_url?: string;
    exchange_id?: string;
  }) {
    this._name = data.name;
    this._base = data.base;
    this._quote = data.quote;
    this._price = data.price;
    this._price_usd = data.price_usd;
    this._volume = data.volume;
    this._volume_usd = data.volume_usd;
    this._time = data.time;
    this._exchange_url = data.exchange_url;
    this._exchange_id = data.exchange_id;
  }

  // Getters
  get name(): string { return this._name; }
  get base(): string { return this._base; }
  get quote(): string { return this._quote; }
  get price(): number { return this._price; }
  get price_usd(): number { return this._price_usd; }
  get volume(): number { return this._volume; }
  get volume_usd(): number { return this._volume_usd; }
  get time(): number { return this._time; }
  get exchange_url(): string | undefined { return this._exchange_url; }
  get exchange_id(): string | undefined { return this._exchange_id; }

  // Methods
  /**
   * Gets the trading pair as a string (e.g., "BTC/USDT")
   */
  get tradingPair(): string {
    return `${this._base}/${this._quote}`;
  }

  /**
   * Checks if the market has an exchange URL
   */
  hasExchangeUrl(): boolean {
    return !!this._exchange_url;
  }

  /**
   * Gets a formatted price string with USD symbol
   */
  getFormattedPrice(): string {
    return `$${this._price_usd.toFixed(2)}`;
  }

  /**
   * Gets a formatted volume string with USD symbol
   */
  getFormattedVolume(): string {
    return `$${this._volume_usd.toLocaleString()}`;
  }

  /**
   * Gets a readable date string from the timestamp
   */
  getTimeAsDate(): Date {
    return new Date(this._time * 1000);
  }

  /**
   * Creates a Market instance from API response data
   */
  static fromApiResponse(data: any): Market {
    return new Market({
      name: data.name,
      base: data.base,
      quote: data.quote,
      price: data.price,
      price_usd: data.price_usd,
      volume: data.volume,
      volume_usd: data.volume_usd,
      time: data.time,
      exchange_url: data.exchange_url,
      exchange_id: data.exchange_id
    });
  }

  /**
   * Converts the model to a plain object
   */
  toObject(): any {
    return {
      name: this._name,
      base: this._base,
      quote: this._quote,
      price: this._price,
      price_usd: this._price_usd,
      volume: this._volume,
      volume_usd: this._volume_usd,
      time: this._time,
      exchange_url: this._exchange_url,
      exchange_id: this._exchange_id
    };
  }
} 