import {FileParser} from '../lib/index';
import path from 'path';


describe('reading file data tests using .on(`data`)', () => {
    let fileParser;

    beforeEach(() => {
        fileParser = new FileParser();
    });

    test('file data should be `test`', done => {
        fileParser.Path = path.normalize(`${__dirname}/test.txt`);
        fileParser.on('data', (fileData) => {
            expect(fileData[0]).toBe('test');
        });
        fileParser.on('finish', () => {
            done();
        });
    });

    test('should be able to parse a space delimited file, [`test`, `test`, `test`]', done => {
        fileParser.Path = path.normalize(`${__dirname}/space-delimiter-test.txt`);
        fileParser.on('data', (fileData) => {
            expect(fileData).toEqual(['test', 'test', 'test']);
        });
        fileParser.on('finish', () => {
            done();
        });
    });

    test('should be able to parse a comma delimited file, [`test`, `test`, `test`]', done => {
        fileParser.Path = path.normalize(`${__dirname}/comma-delimiter-test.txt`);
        fileParser.on('data', (fileData) => {
            expect(fileData).toEqual(['test', 'test', 'test']);
        });
        fileParser.on('finish', () => {
            done();
        });
    });

    test('should be able to parse a tab delimited file, [`test`, `test`, `test`]', done => {
        fileParser.Path = path.normalize(`${__dirname}/tab-delimiter-test.txt`);
        fileParser.on('data', (fileData) => {
            expect(fileData).toEqual(['test', 'test', 'test']);
        });
        fileParser.on('finish', () => {
            done();
        });
    });
});