var fs = require('fs');
var zlib = require('zlib');
//var Jimp = require("jimp");

var bytetools = require('./bytetools.js');
//var leveldata = require('./levelData.js');

var recordFileIn = './records.dat';
var cncArrayData = [];
var filenameOut = './records.formated.dat';
var indexOfStringHeaderEnd = 20;

var ext = '.dat';
ext = '.imgs';

var pathToData = '../data/';
var pathImages = 'images/';
var filenamePrepend = 'Assets-';
var imgExt = '.png';

var fullData = '';

var filename = recordFileIn;
if (process.argv[2]) {
  filename = process.argv[2];
}

var fileVersion = "unknown";
var stats = fs.statSync(filename);
var fileSizeInBytes = stats["size"];
console.log("Filesize is: " + fileSizeInBytes);
// if (fileSizeInBytes == 30750285) { fileVersion = "steam-1-20-4"; }
// if (fileSizeInBytes == 39114496) { fileVersion = "steam-1-21-5"; }

// console.log(fileVersion);
// var filenameOut = pathToData + filenamePrepend + fileVersion + ext;
// var pathDataOut = pathToData + fileVersion + '/';
// var pathImageOut = pathToData + fileVersion + '/' + pathImages;

var segmentOffsetStart = 0;
var segmentOffsetEnd = 0;

var chunkCount = 1;

var inflate = zlib.createInflate();
var inflateRaw = zlib.createInflateRaw();
var readStream;
var writeStream;
var dictStream;

var imgDictStr = '';
var imgDict = '';

var main = function () {

  readStream = new fs.ReadStream(filename);
  writeStream = new fs.WriteStream(filenameOut);

  readStream.setEncoding('hex');
  readStream.on('open', function (chunk) {
  });
  
  // Actually read the file.
  readStream.on('data', function (chunk) {
    fullData += chunk;
  });

  // After getting the entire body.
  readStream.on('end', function () {
    console.log('END. Final running data length in Bytes: ' + (fullData.length / 2));
    
    console.log(fullData.substr(0, indexOfStringHeaderEnd));
    console.log(fullData.substr(indexOfStringHeaderEnd, 4));
    console.log(fullData.substr(indexOfStringHeaderEnd, 4 + 4));
    
    var verMajor = bytetools.hexShortToInt(fullData.substr(indexOfStringHeaderEnd, 4)); // Four characters make up 2 bytes here, don't forget.
    var verMinor = bytetools.hexShortToInt(fullData.substr(indexOfStringHeaderEnd + 4, 4));
    console.log('Version: ' + verMajor + '.' + verMinor)
    
    var xSize = bytetools.hexShortToInt(fullData.substr(indexOfStringHeaderEnd + 4 + 4, 8));
    var ySize = bytetools.hexShortToInt(fullData.substr(indexOfStringHeaderEnd + 4 + 4 + 8, 8));
    var zSize = bytetools.hexShortToInt(fullData.substr(indexOfStringHeaderEnd + 4 + 4 + 8  + 8, 8));
    console.log("xSize: " + xSize);
    console.log("ySize: " + ySize);
    console.log("zSize: " + zSize);
    
    var jsonOut = {};
    jsonOut.cncArrayData = cncArrayData;

    writeStream.write(JSON.stringify(jsonOut, null, 2), 'utf8');
    writeStream.end();


  });

  readStream.on('error', function () {
    console.log('@@@AN ERROR OCCURED@@@');
  });
  
}

main();