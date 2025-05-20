/**
 * Coin model class - represents a cryptocurrency
 */
export class Coin {
  private _id: string;
  private _symbol: string;
  private _name: string;
  private _nameid: string;
  private _rank: number;
  private _price_usd: string;
  private _percent_change_24h: string;
  private _percent_change_1h: string;
  private _percent_change_7d: string;
  private _price_btc: string;
  private _market_cap_usd: string;
  private _volume24: number;
  private _volume24a: number;
  private _csupply: string;
  private _tsupply: string;
  private _msupply: string;

  constructor(data: {
    id: string;
    symbol: string;
    name: string;
    nameid: string;
    rank: number;
    price_usd: string;
    percent_change_24h: string;
    percent_change_1h: string;
    percent_change_7d: string;
    price_btc: string;
    market_cap_usd: string;
    volume24: number;
    volume24a: number;
    csupply: string;
    tsupply: string;
    msupply: string;
  }) {
    this._id = data.id;
    this._symbol = data.symbol;
    this._name = data.name;
    this._nameid = data.nameid;
    this._rank = data.rank;
    this._price_usd = data.price_usd;
    this._percent_change_24h = data.percent_change_24h;
    this._percent_change_1h = data.percent_change_1h;
    this._percent_change_7d = data.percent_change_7d;
    this._price_btc = data.price_btc;
    this._market_cap_usd = data.market_cap_usd;
    this._volume24 = data.volume24;
    this._volume24a = data.volume24a;
    this._csupply = data.csupply;
    this._tsupply = data.tsupply;
    this._msupply = data.msupply;
  }

  // Getters and setters
  get id(): string { return this._id; }
  get symbol(): string { return this._symbol; }
  get name(): string { return this._name; }
  get nameid(): string { return this._nameid; }
  get rank(): number { return this._rank; }
  get price_usd(): string { return this._price_usd; }
  get percent_change_24h(): string { return this._percent_change_24h; }
  get percent_change_1h(): string { return this._percent_change_1h; }
  get percent_change_7d(): string { return this._percent_change_7d; }
  get price_btc(): string { return this._price_btc; }
  get market_cap_usd(): string { return this._market_cap_usd; }
  get volume24(): number { return this._volume24; }
  get volume24a(): number { return this._volume24a; }
  get csupply(): string { return this._csupply; }
  get tsupply(): string { return this._tsupply; }
  get msupply(): string { return this._msupply; }

  // Methods
  /**
   * Gets price in USD as number
   */
  getPriceAsNumber(): number {
    return parseFloat(this._price_usd);
  }

  /**
   * Gets 24h change as number
   */
  getChange24hAsNumber(): number {
    return parseFloat(this._percent_change_24h);
  }

  /**
   * Gets market cap in USD as number
   */
  getMarketCapAsNumber(): number {
    return parseFloat(this._market_cap_usd);
  }

  /**
   * Checks if the coin price is increasing (24h)
   */
  isPriceIncreasing(): boolean {
    return this.getChange24hAsNumber() > 0;
  }

  /**
   * Creates a Coin instance from API response data
   */
  static fromApiResponse(data: any): Coin {
    return new Coin({
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      nameid: data.nameid,
      rank: data.rank,
      price_usd: data.price_usd,
      percent_change_24h: data.percent_change_24h,
      percent_change_1h: data.percent_change_1h,
      percent_change_7d: data.percent_change_7d,
      price_btc: data.price_btc,
      market_cap_usd: data.market_cap_usd,
      volume24: data.volume24,
      volume24a: data.volume24a,
      csupply: data.csupply,
      tsupply: data.tsupply,
      msupply: data.msupply
    });
  }

  /**
   * Converts the model to a plain object
   */
  toObject(): any {
    return {
      id: this._id,
      symbol: this._symbol,
      name: this._name,
      nameid: this._nameid,
      rank: this._rank,
      price_usd: this._price_usd,
      percent_change_24h: this._percent_change_24h,
      percent_change_1h: this._percent_change_1h,
      percent_change_7d: this._percent_change_7d,
      price_btc: this._price_btc,
      market_cap_usd: this._market_cap_usd,
      volume24: this._volume24,
      volume24a: this._volume24a,
      csupply: this._csupply,
      tsupply: this._tsupply,
      msupply: this._msupply,
    };
  }
} 