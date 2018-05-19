import {FileParser} from '../lib/index';
import path from 'path';

test('file data should be `test`', () => {
    let fileParser = new FileParser();
    fileParser.Path = path.normalize(`${__dirname}/../test.txt`);
    fileParser.on('data', (fileData) => {
        expect(String(fileData)).toBe('test');
    });
});