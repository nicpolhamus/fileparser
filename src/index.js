import {Transform} from 'stream';
import {createReadStream} from 'fs';

export class FileParser extends Transform {
    constructor(options) {
        super(options);
        this.filePath;
        this.fileReadStream;
    }

    _transform(chunk, encoding, callback) {
        console.log(chunk);
        this.push(chunk);
        callback();
    }

    get Path() {
        return this.filePath;
    }

    set Path(path) {
        this.filePath = path;
        this.fileReadStream = createReadStream(this.filePath);
        this.fileReadStream.pipe(this);
    }
}