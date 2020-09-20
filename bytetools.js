function generateCreateObjectAOB(createObjectString) {
  // Assume 80386.
  var result = "";
  var pushByte = "6A";
  var pushDWord = "68";
  // "CreateObject(CreateCandy_345(123, 9999), 2)".match(/\((\d+), (\d+)\), (\d+)/);
  // generateCreateObjectAOB("CreateObject(CreateCandy_345(123, 9999), 2)");
  var valuesToFind = createObjectString.match(/\((\d+), (\d+)\), (\d+)/);
  var depth = valuesToFind.pop();
  var yPos = valuesToFind.pop();
  var xPos = valuesToFind.pop();

  var yPosBytes = hexIntToInt(yPos);
  var xPosBytes = hexIntToInt(xPos);

  console.log(depth);
  console.log(yPos);
  console.log(xPos);
  console.log(yPosBytes);
  console.log(xPosBytes);

  if (depth.length < 2) { depth = "0" + depth; }

  result += pushByte + " " + depth + "\n";
  result += pushDWord + " " + yPosBytes + "\n";
  result += pushDWord + " " + xPosBytes + "\n";

  return (result);
}

function generateCreateObjectAOBFromAO(ao) {
  // Assume 80386.
  var result = "";
  var pushByte = "6A";
  var pushHexInt = "68";
  var depth = ao.layer.toString();
  var yPos = ao.y.toString();
  var xPos = ao.x.toString();

  var yPosBytes = decToHexInt(yPos);
  var xPosBytes = decToHexInt(xPos);
  var depthBytes = decToHexByte(depth);

  result += pushByte + depthBytes;
  result += pushHexInt + yPosBytes;
  result += pushHexInt + xPosBytes;

  return (result);
}

function generateCreateObjectAOBxyz(x, y, z) {
  // Assume 80386.
  var result = "";
  var pushByte = "6A";
  var pushDWord = "68";

  var depth = z.toString();
  var yPos = y.toString();
  var xPos = x.toString();

  var yPosBytes = hexIntToInt(yPos);
  var xPosBytes = hexIntToInt(xPos);

  console.log(depth);
  console.log(yPos);
  console.log(xPos);
  console.log(yPosBytes);
  console.log(xPosBytes);

  if (depth.length < 2) { depth = "0" + depth; }

  result += pushByte + " " + depth + "\n";
  result += pushDWord + " " + yPosBytes + "\n";
  result += pushDWord + " " + xPosBytes + "\n";

  return (result);
}

function sliceIntoBytes(theString) {
  var result = "";
  if (theString.length % 2 > 0) {
    theString = "0" + theString;
  }
  var bytes = theString.match(/.{1,2}/g);
  bytes.reverse();
  //if (bytes[0].length < 2) {bytes[0] = "0" + bytes[0];}
  result = bytes.join("");


  return (result);
}

function decToHexDWord(decVal) {
  var result = parseInt(decVal, 10).toString(16);
  while (result.length < 8) { result = "0" + result; }
  return (result);
}

function hexDWordToHDec(hexVal) {
  var result = parseInt(hexVal, 16);
  while (result.length < 8) { result = "0" + result; }
  return (result);
}

function hexShortToInt(hexVal, signed, bigEndian) {
  // 2 Bytes
  if (!bigEndian) { hexVal = sliceIntoBytes(hexVal); }
  if (signed) {
    var binVal = hexToBinary(hexVal);
    if (binVal[0] == '1') {
      return -getTwosComp(binVal);
    }
  }
  var result = parseInt(hexVal, 16);
  //while (result.length < 4) {result = "0" + result;}
  return (result);
}

function hexIntToInt(hexVal, signed, bigEndian) {
  // 4 Bytes
  if (!bigEndian) { hexVal = sliceIntoBytes(hexVal); }
  if (signed) {
    var binVal = hexToBinary(hexVal);
    if (binVal[0] == '1') {
      return -getTwosComp(binVal);
    }
  }
  var result = parseInt(hexVal, 16);
  //while (result.length < 4) {result = "0" + result;}
  return (result);
}

function howDoIRelocateThisObjectTo(newX, newY, newDepth, createObjectString) {
  result = "AoB Search for: \n"
  result += generateCreateObjectAOB(createObjectString);
  result += "Then replace that with: ";
  var replacementString = createObjectString.replace(/\((\d+), (\d+)\), (\d+)/, "(" + newX + ", " + newY + "), " + newDepth);
  console.log(replacementString);
  result += generateCreateObjectAOB(replacementString);
  return (result);
}

function hexToBinary(hexVal, bigEndian) {
  var result = hexVal;
  //if (!bigEndian) {result = sliceIntoBytes(result);}
  result = parseInt(result, 16).toString(2);
  // Pad in Zeroes as necessary to prevent incorrect negation.
  while (result.length < (hexVal.length * 4)) {
    result = "0" + result;
  }
  return (result);
}

function decToHexByte(decVal, signed, bigEndian) {
  // 2 Bytes.
  if (signed) { console.log('SIGNED BYTE CONVERSION IS NOT IMPLEMENTED.'); }
  var isNegative = parseInt(decVal, 10) < 0 ? true : false;
  var result = Math.abs(parseInt(decVal, 10)).toString(16);
  while (result.length < 2) { result = "0" + result; }
  if (!bigEndian) { result = sliceIntoBytes(result); }
  return (result);
}

function decToHexShort(decVal, signed, bigEndian) {
  // 2 Bytes.
  if (signed) { console.log('SIGNED BYTE CONVERSION IS NOT IMPLEMENTED.'); }
  var isNegative = parseInt(decVal, 10) < 0 ? true : false;
  var result = Math.abs(parseInt(decVal, 10)).toString(16);
  while (result.length < 4) { result = "0" + result; }
  if (!bigEndian) { result = sliceIntoBytes(result); }
  return (result);
}

function decToHexInt(decVal, signed, bigEndian) {
  // 4 Bytes.
  if (signed) { console.log('SIGNED BYTE CONVERSION IS NOT IMPLEMENTED.'); }
  var isNegative = parseInt(decVal, 10) < 0 ? true : false;
  var result = Math.abs(parseInt(decVal, 10)).toString(16);
  while (result.length < 8) { result = "0" + result; }
  if (!bigEndian) { result = sliceIntoBytes(result); }
  return (result);
}

function getTwosComp(binVal) {
  var ones = '';
  while (ones.length < binVal.length) { ones += '1'; }
  var comp = (parseInt(binVal, 2) ^ parseInt(ones, 2)) + 1;
  return (comp);
}


if (typeof module !== 'undefined') {
  module.exports.sliceIntoBytes = sliceIntoBytes;
  module.exports.hexDWordToHDec = hexDWordToHDec;
  
  module.exports.hexToBinary = getTwosComp;
  module.exports.hexToBinary = hexToBinary;
  
  module.exports.decToHexDWord = decToHexDWord;
  module.exports.decToHexShort = decToHexShort;
  module.exports.decToHexShort = decToHexByte;
  module.exports.decToHexInt = decToHexInt;
  module.exports.hexShortToInt = hexShortToInt;
  module.exports.hexIntToInt = hexIntToInt;
  module.exports.sliceIntoBytes = sliceIntoBytes;
  module.exports.generateCreateObjectAOBFromAO = generateCreateObjectAOBFromAO;
}