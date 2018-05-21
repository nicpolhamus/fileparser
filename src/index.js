import {Transform} from 'stream';
import {createReadStream} from 'fs';

export class FileParser extends Transform {
    constructor() {
        super({objectMode: true});
        this.filePath;
        this.fileReadStream;
    }

    _transform(chunk, encoding, callback) {
        let fileDataChunk = this.format(chunk);
        this.push(fileDataChunk);
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

    format(fileDataChunk) {
        /* convert fileDataChunk to a string, then trim 
          of leading and trailing spaces */
        let fileDataChunkString = String(fileDataChunk);
        fileDataChunkString = fileDataChunkString.trim();
        /* check if fileDataChunk has spaces */
        const fileDataChunkHasSpaces = fileDataChunkString.includes(' ');
        if (fileDataChunkHasSpaces) {
            /* return fileData after it has been split on spaces */
            return fileDataChunkString.split(' ');
        } else {
            /* fileDataChunk has no spaces, so return the string form of fileDataChunk */
            return fileDataChunkString;
        }
    }
}