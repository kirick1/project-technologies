import City from './city';

export interface CountryCoordinates {
    xl: number;
    yl: number;
    xh: number;
    yh: number;
}

export class Country {
    cities: City[] = [];

    static MAX_COORDINATE = 10;
    static NAME_MAX_LENGTH = 25;

    constructor(public name: string, public coordinates: CountryCoordinates) {
        if (!Country.areCoordinatesValid(this.coordinates)) {
            throw new Error('Coordinates not valid!');
        }
        if (this.name.length > Country.NAME_MAX_LENGTH) {
            throw new Error('Name max length is' + Country.NAME_MAX_LENGTH);
        }
    }

    static areCoordinatesValid({ xl, yl, xh, yh }: CountryCoordinates): boolean {
        const isCorrectLowHighRange = (low: number, high: number) => {
            return low <= high;
        };

        const isInBounds = (coordinate: number) => {
            return ((coordinate >= 0) && (coordinate <= Country.MAX_COORDINATE));
        };

        return [
          isInBounds(xl),
          isInBounds(yl),
          isInBounds(xh),
          isInBounds(yh),
          isCorrectLowHighRange(xl, xh),
          isCorrectLowHighRange(yl, yh)
        ].every(Boolean);
    }

    addCity(city: City): void {
        this.cities.push(city);
    }

    isCompleted(): boolean {
        return this.cities.every((city) => city.completed);
    }

    static parseCountryString(countryName: string): Country {
        const [name, ...coordinates] = countryName.split(' ');
        const [xl, yl, xh, yh] = coordinates.map((c) => +c - 1);
        return new Country(name, { xl, yl, xh, yh });
    }
}

export default Country;
