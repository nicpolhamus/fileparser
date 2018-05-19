import {FileParser} from '../lib/index';

test('file path should be test', () => {
    let fileParser = new FileParser();
    expect(fileParser.Path).toBe(undefined);
});