//To run this> node fp_what_are_the_card_address.js
// basePointerOffset should be a pointer to the first card. Should be able to get this with one offset from base.
// basePointer First offset relative to the executable. Honestly I just end up finding this as a byproduct of 
// pointer-scanning for the first card's status repeatedly as I grab it, quit, reset card status, and repeats.
//
// Running this with no args defaults to printing the FP 1.21.5 windows beta offsets formated for a LiveSplit ASL script.
// Card Base, Card Offset, Achievement Base, and Achievement offset can be specified as well, in that order. As hex literals.

/*

Process for finding the offset for cards with CE: Touch card 1. Scan for aligned 4byte int value of 1. Quit the level, go to the gallery, and delete the cards. Go back into DV and scan for value 0 any time before collecting the card. Then collect the card and scan for 1 again. Repeat this process until there are 10 or less values. At which point you can try freezing the values to 1 or 0, restarting the level, and walking to where the card is to see if it looks like it's collected or not based on what you froze.

Once you're sure you've got the right value, do a pointer scan. Try to find a route with less than 3 additional pointers. Add a handful to your table, save the table, then restart the game and reattach. Confirm that the pointers are still valid at least while in-level. Sometimes these pointers bug out in menus.

Every card pointer after that just adding 80 bytes to that pointer (not an extra pointer, it's a different pointer in a different spot) (0x50)
--

Process for finding the offsets for Achievements, the fastest way is to: 
Clear all achievements
start Aqua Tunnel and immediately scan for 0
Find the digging spot on the floor one level below AT's first card (this is like 5 seconds away from the starting area, just flutter up and to the right immediately, but not to the highest spot.
Immediately after digging the spot up and seeing the treasure appear, search for int value 1.
Quit the level. The Achievement screen should pop up. After you CLOSE this screen and transition to the next, scan for 2.
Go to the Gallery menu and reset the achievements again. DO NOT SCAN ON THIS SCREEN, THIS TENDS TO BREAK FOR SOME REASON
Restart AT again and scan for 0 again. Repeat until there are few results left (this shouldn't take long).

To confirm you have the right one, you can't just force a 2 because Steam will verify your achievements and overwrite it. Instead, delete your achievements, start ANY level (even SMA), then set the achievement value to 1. Quit the level. On exit, the achievement should be "earned" and advance to 2 as expected.

Once you've confirmed it, used the PointerScan as before to try to find a route with 3 or less bounces to the pointing address. Add a handful of them, because some of them will be wrong. Close the game. Open it again. Reattach to the process. Confirm that the achievement is still being tracked properly or can be manipuilated as before.

However because the Digging Spot achievement is the 38th achievement, we need to work back to the first one (clearing as Lilac). As before, this is a 80 byte difference between each achievement (0x50). For this I just opened up the Windows Calculator, set it on hex mode, grabbed the last pointer value (in my case, B94) and subtracted B90 from it (0x50 * 0x25 or 80 * 37). The resulting pointer route should now be going to the first achievement. To find every achievement from there, just add the 0x50.

Every Achievement pointer after that just adding 80 bytes to that pointer (not an extra pointer, it's a different pointer in a different spot) (0x50)
--

Process for finding roomID address:
Main Menu: 3
Gallery: 10
Time Attack Stage Select: 5
Dragon Valley First Room:  20

This address is static unlike the others and should be trivial to relocate.

--

For room id, simply go to the corresponding room and check the id. Should be quick and easy: 

*/

var argCardBase = null;
var argCardOffset = null;
var argAchievementBase = null;
var argAchievementOffset = null;
var roomPointer = null;

if (process.argv.length >= 3) {argCardBase = process.argv[2];}
if (process.argv.length >= 4) {argCardOffset = process.argv[3];}
if (process.argv.length >= 5) {argAchievementBase = process.argv[4];}
if (process.argv.length >= 6) {argAchievementOffset = process.argv[5];}
if (process.argv.length >= 7) {argCardOffset = process.argv[6];}

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

console.log("// --------------------------------------------------");
console.log("// Card Addresses: ");
// "fp.exe"+0148902C, 4C => Codex Capture Card 1: 4 byte value. 0 = Unobtained. 1 = Obtained. 2 = Opened.
var basePointerOffset = "0x4C";
var cardDelta = "0x50";
var basePointer = "0x018D7BF8"; // On Retail 1.21.5, this is 0x018D7BF8. On 1.21.5 Beta, this is 0x0148902C
// Output it in a way that's easy to copypaste into a Livesplit ASL script.
for (i=0; i<100; i++) {
    console.log('int card' + (i+1) +' : ' + basePointer + ', 0x' + (parseInt(basePointerOffset) + (parseInt(cardDelta) * i)).toString(16) + ';');
    //console.log("Card " + (i+1))
}
console.log("// --------------------------------------------------");

console.log("// --------------------------------------------------");
console.log("// Achievement Addresses: ");
// The difference between the pointer offsets of the first card and first achievement is 0x48. First achievement is the smaller value.
// "fp.exe"+0148902C, 4C => Codex Capture Card 1: 4 byte value. 0 = Unobtained. 1 = Obtained. 2 = Opened.
    var basePointerOffsetAchievementsMillaDigspot = " 0xb94"; 
    var basePointerOffsetAchievements = (parseInt(basePointerOffsetAchievementsMillaDigspot) - parseInt("0xb90")).toString(16);
    //basePointerOffsetAchievements = "0x04";

// Output it in a way that's easy to copypaste into a Livesplit ASL script.
for (i=0; i<100; i++) {
    console.log('int achievement' + (i+1) +' : ' + basePointer + ', 0x' + (parseInt(basePointerOffsetAchievements) + (parseInt(cardDelta) * i)).toString(16) + ';');
    //console.log("Card " + (i+1))
}
console.log("// --------------------------------------------------");

//"fp.exe"+0148902C