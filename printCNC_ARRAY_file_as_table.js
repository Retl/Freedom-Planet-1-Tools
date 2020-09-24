var fs = require('fs');
var zlib = require('zlib');
//var Jimp = require("jimp");

var bytetools = require('./bytetools.js');
//var leveldata = require('./levelData.js');

var recordFileIn = './records.dat';
var cncArrayData = [];
var cncArrayOutputString = "";
var filenameOut = './records.formated.dat';
var filenameOutBytes = './records.formated.dat.bytes';
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
var writeStreamBytes;
var bytesOut;
var dictStream;

var imgDictStr = '';
var imgDict = '';

var main = function () {
    
    /*asdf = [];
    asdf[0] = [1,2,3];
    asdf[1] = [4,5,6];
    asdf[2] = [7,8,9];
    
    console.log("ASDF:");
    console.log(asdf);*/

  readStream = new fs.ReadStream(filename);
  writeStream = new fs.WriteStream(filenameOut);
  writeStreamBytes = new fs.WriteStream(filenameOutBytes);

  readStream.setEncoding('hex');
  readStream.on('open', function (chunk) {
  });
  
  // Actually read the file.
  readStream.on('data', function (chunk) {
    fullData += chunk;
  });

  // After getting the entire body.
  readStream.on('end', function () {
      
    var cursorIndex = indexOfStringHeaderEnd;
    
    var skipThisMany = indexOfStringHeaderEnd + 4 + 4 + 8 + 8 + 8 + 8;
    var bytesOutLen = fullData.length - skipThisMany;
    bytesOut = fullData.substr(skipThisMany, bytesOutLen);
    
    console.log('END. Final running data length in Bytes: ' + (fullData.length / 2));
    
    //console.log(fullData.substr(0, cursorIndex));
    //console.log(fullData.substr(cursorIndex, 4));
    
    //console.log(fullData.substr(cursorIndex, 4));
    
    var verMajor = bytetools.hexShortToInt(fullData.substr(cursorIndex, 4)); // Four characters make up 2 bytes here, don't forget.
    cursorIndex += 4;
    var verMinor = bytetools.hexShortToInt(fullData.substr(cursorIndex, 4));
    cursorIndex += 4;
    console.log('Version: ' + verMajor + '.' + verMinor)
    
    var xSize = bytetools.hexShortToInt(fullData.substr(cursorIndex, 8)); //Remember to double these values to get BYTES not single js text characters.
    cursorIndex += 8;
    
    var ySize = bytetools.hexShortToInt(fullData.substr(cursorIndex, 8));
    cursorIndex += 8;
    
    var zSize = bytetools.hexShortToInt(fullData.substr(cursorIndex, 8));
    cursorIndex += 8;
    
    var flags = bytetools.hexShortToInt(fullData.substr(cursorIndex, 8));
    cursorIndex += 8;
    
    console.log("xSize: " + xSize);
    console.log("ySize: " + ySize);
    console.log("zSize: " + zSize);
    console.log("flags: " + flags);
    
    var planes = [];
    var rows = [];
    var row = [];
    var currentVal = -1;
    // For each row
    for (k=0;k<zSize;k++) {
        rows = [];
        for (i=0;i<ySize;i++) {
            row = [];
            // For each column of the current row.
            for (j=0;j<xSize;j++) {
                currentVal = bytetools.hexIntToInt(fullData.substr(cursorIndex, 8));
                cursorIndex += 8;
                
                row.push(currentVal);
            }
            console.log("" + i + ": " + row);
            cncArrayOutputString += i + ": " + row + "\n";
            rows.push(row);
        }
        planes.push(rows);
    }
    
    cncArrayData = planes;
    
    var jsonOut = {};
    jsonOut.cncArrayData = cncArrayData;

    //writeStream.write(JSON.stringify(jsonOut, null, 2), 'utf8');
    writeStream.write(cncArrayOutputString, 'utf8');
    writeStream.end();
    
    writeStreamBytes.write(Buffer.from(bytesOut, 'hex'));
    writeStreamBytes.end();

  });

  readStream.on('error', function () {
    console.log('@@@AN ERROR OCCURED@@@');
  });
  
}

main();