import * as fs from 'fs';
import MapGrid from './classes/map';
import Country from './classes/country';

const parseInputFile = (filename: string): string[][] => {
    if (!filename) {
        throw new Error('Filename is required');
    }
    const countryStrings: string[][] = [];
    const lines = fs.readFileSync(filename).toString().split('\n').map((line) => line.replace('\r', ''));

    let lineIndex = 0;
    while (lineIndex < lines.length - 2) {
        const currentLine = lines[lineIndex];
        const countryNumber = parseInt(currentLine);
        if (!countryNumber) {
            throw new Error(`Error in input file at '${lines[lineIndex]}'. Expected a number of countries`);
        }
        lineIndex += 1;
        const countries = [];
        for (let countryLineIndex = lineIndex; countryLineIndex < countryNumber + lineIndex; countryLineIndex++) {
            countries.push(lines[countryLineIndex]);
        }
        lineIndex += countryNumber;
        countryStrings.push(countries);
    }

    if (lines[lines.length - 1] !== '0') {
        throw new Error("Input file must end with '0' line");
    }

    return countryStrings;
};

const processCase = (countriesStrings: string[]) => {
    try {
        const countries: Country[] = [];
        countriesStrings.forEach((countryString) => {
            countries.push(Country.parseCountryString(countryString));
        });
        const result = new MapGrid(countries).startDiffusionEmulation();
        for (const [countryName, days] of result.entries()) {
            console.log(countryName, days);
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

const main = () => {
    const countryStrings = parseInputFile('inputFile');
    countryStrings.forEach((caseCountries: string[], caseNumber) => {
        console.log(`Case Number ${caseNumber + 1}`);
        processCase(caseCountries);
    });
};

main();
