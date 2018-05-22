'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileParser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = require('stream');

var _fs = require('fs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileParser = exports.FileParser = function (_Transform) {
    _inherits(FileParser, _Transform);

    function FileParser() {
        _classCallCheck(this, FileParser);

        var _this = _possibleConstructorReturn(this, (FileParser.__proto__ || Object.getPrototypeOf(FileParser)).call(this, { objectMode: true }));

        _this.filePath;
        _this.fileReadStream;
        return _this;
    }

    _createClass(FileParser, [{
        key: '_transform',
        value: function _transform(chunk, encoding, callback) {
            var fileDataChunk = this.format(chunk);
            this.push(fileDataChunk);
            callback();
        }
    }, {
        key: 'format',
        value: function format(fileDataChunk) {
            /* convert fileDataChunk to a string, then trim 
              of leading and trailing spaces */
            var fileDataChunkString = String(fileDataChunk);
            fileDataChunkString = fileDataChunkString.trim();
            /* check if fileDataChunk has spaces */
            if (this.hasDelimiters(fileDataChunkString)) {
                /* return fileData after it has been split on spaces */
                return fileDataChunkString.split(/[\s,\t]+/);
            } else {
                /* fileDataChunk has no spaces, so return the string form of fileDataChunk */
                return fileDataChunkString;
            }
        }
    }, {
        key: 'hasDelimiters',
        value: function hasDelimiters(lineOfFileData) {
            return lineOfFileData.search(/[\s,\t]/);
        }
    }, {
        key: 'Path',
        get: function get() {
            return this.filePath;
        },
        set: function set(path) {
            this.filePath = path;
            this.fileReadStream = (0, _fs.createReadStream)(this.filePath);
            this.fileReadStream.pipe(this);
        }
    }]);

    return FileParser;
}(_stream.Transform);