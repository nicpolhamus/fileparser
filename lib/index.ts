import {createReadStream} from 'fs';
import {Readable} from 'stream';

class FileParser {
    private fileReadStream: Readable;
    constructor(private path: string) {
        this.fileReadStream = createReadStream(this.path)
    }

    get Path(): string {
        return this.path;
    }

    set Path(newPath: string) {
        this.path = newPath;
    }
    
}