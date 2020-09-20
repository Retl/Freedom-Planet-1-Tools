//To run this> node fp_what_are_the_card_address.js
// basePointerOffset should be a pointer to the first card. Should be able to get this with one offset from base.
// basePointer First offset relative to the executable. Honestly I just end up finding this as a byproduct of 
// pointer-scanning for the first card's status repeatedly as I grab it, quit, reset card status, and repeats.

var as = "50";
var bs = "0x4C";
var a = parseInt(as, 16); 
var b = parseInt(bs, 16);
var c = a + b;
console.log(a);
console.log(as);
console.log(b);
console.log(bs);
console.log(c);
console.log(c.toString(16));

console.log("--------------------------------------------------");
// "fp.exe"+0148902C, 4C => Codex Capture Card 1: 4 byte value. 0 = Unobtained. 1 = Obtained. 2 = Opened.
var basePointerOffset = "0x4C";
var cardDelta = "0x50";
var basePointer = "0x0148902C";
// Output it in a way that's easy to copypaste into a Livesplit ASL script.
for (i=0; i<100; i++) {
    console.log('int card' + (i+1) +' : ' + basePointer + ', 0x' + (parseInt(basePointerOffset) + (parseInt(cardDelta) * i)).toString(16) + ';');
    //console.log("Card " + (i+1))
}
console.log("--------------------------------------------------");