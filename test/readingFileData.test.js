import {FileParser} from '../lib/index';
import path from 'path';


describe('reading file data tests using .on(`data`)', () => {
    let fileParser;

    beforeEach(() => {
        fileParser = new FileParser();
    });

    test('file data should be `test`', done => {
        fileParser.Path = path.normalize(`${__dirname}/../test.txt`);
        fileParser.on('data', (fileData) => {
            expect(fileData).toBe('test');
        });
        fileParser.on('finish', () => {
            done();
        });
    });

    test('file data should be return as an array, [`test`, `test`, `test`]', done => {
        fileParser.Path = path.normalize(`${__dirname}/../array-test.txt`);
        fileParser.on('data', (fileData) => {
            expect(fileData).toEqual(['test', 'test', 'test']);
        });
        fileParser.on('finish', () => {
            done();
        });
    });
});