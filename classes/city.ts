export class City {
    completed: boolean = false;
    neighbors: City[] = [];
    coins: number[];
    cache: number[];

    constructor(
      public coinTypesNumber: number,
      countryIndex: number,
      initialCoinsCount: number,
      public representativePortion: number,
    ) {
        this.coins = Array.from({ length: coinTypesNumber }, () => 0)
        this.cache = Array.from({ length: coinTypesNumber }, () => 0)

        this.coins[countryIndex] = initialCoinsCount;
    }

    transportCoinsToNeighbors(): void {
        if (this.coins.every(Boolean)) {
            this.completed = true;
        }

        for (const [index, coinCount] of this.coins.entries()) {
          if (coinCount >= this.representativePortion) {
            const share = Math.floor(coinCount / this.representativePortion);

            for (const city of this.neighbors) {
              city.cache[index] += share;
              this.coins[index] -= share;
            }
          }
        }
    }

    updateCoins(): void {
        for (let coinType = 0; coinType < this.coinTypesNumber; coinType++) {
            this.coins[coinType] += this.cache[coinType];
            this.cache[coinType] = 0;
        }
    }
}

export default City;
