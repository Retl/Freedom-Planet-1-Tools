screenNames = [];
screenNames[16] = "AT1";
screenNames[17] = "AT2";
screenNames[18] = "AT3";
screenNames[19] = "AT4";

screenNames[20] = "DV1";
screenNames[21] = "DV2";
screenNames[22] = "DV3";
screenNames[23] = "DV4";

screenNames[24] = "RM1";
screenNames[25] = "RM2";
screenNames[26] = "RM3";
screenNames[27] = "RM4";
screenNames[28] = "RM5";

screenNames[29] = "FN1";
screenNames[30] = "FN2";
screenNames[31] = "FN3";
screenNames[32] = "FN4";
screenNames[33] = "FN5";
screenNames[34] = "FN6";

screenNames[35] = "SBHUB";
screenNames[36] = "SB1";
screenNames[37] = "SB2";
screenNames[38] = "SB3";

screenNames[39] = "JC1";
screenNames[40] = "JC2";
screenNames[41] = "JC3";
screenNames[42] = "JC4";
screenNames[43] = "JC5";

screenNames[44] = "TB1";
screenNames[45] = "TB2";
screenNames[46] = "TB3";
screenNames[47] = "TB4";
screenNames[48] = "TB5";
screenNames[49] = "TB6";

screenNames[50] = "PL1";
screenNames[51] = "PL2";
screenNames[52] = "PL3";
screenNames[53] = "PL4";
screenNames[54] = "PL5";
screenNames[55] = "PL6";

screenNames[56] = "TH1";
screenNames[57] = "TH2";
screenNames[58] = "TH3";

screenNames[59] = "BG1";
screenNames[60] = "BG2";
screenNames[61] = "BG3";
screenNames[62] = "BG4";
screenNames[63] = "BG5";
screenNames[64] = "BG6";

screenNames[65] = "FD1";
screenNames[66] = "FD2";
screenNames[67] = "FD3";
screenNames[68] = "FD4";
screenNames[69] = "FD5";
screenNames[70] = "FD6";
screenNames[71] = "FD7";
screenNames[72] = "FD8";

var levelEnds = [19, 23, 28, 34, 35, 43, 49, 55, 58, 64, 66, 68, 70, 72];

var i;
var baseStr = 'settings.Add("enableTKN_LVL_LE", true, "TKN_LVL - Enable to allow the automatic Level-End splits for TKN_LVL.", "enableLevelEndSplits");';

console.log('//--------------------------------------------------');

console.log('settings.Add("enableLevelEndSplits", true, "Enable to allow the automatic Level-End splits on the levels checked below. They will be ignored if this is unchecked.");');
/*console.log(baseStr.replace("TKN_LVL", screenNames[19]).replace("TKN_LVL", screenNames[19]));
console.log(baseStr.replace("TKN_LVL", screenNames[23]).replace("TKN_LVL", screenNames[23]));
console.log(baseStr.replace("TKN_LVL", screenNames[28]).replace("TKN_LVL", screenNames[28]));
console.log(baseStr.replace("TKN_LVL", screenNames[34]).replace("TKN_LVL", screenNames[34]));
console.log(baseStr.replace("TKN_LVL", screenNames[35]).replace("TKN_LVL", screenNames[35])); // REMEMBER THIS IS A SPECIAL CASE.
console.log(baseStr.replace("TKN_LVL", screenNames[43]).replace("TKN_LVL", screenNames[43]));
console.log(baseStr.replace("TKN_LVL", screenNames[49]).replace("TKN_LVL", screenNames[49]));
console.log(baseStr.replace("TKN_LVL", screenNames[55]).replace("TKN_LVL", screenNames[55]));
console.log(baseStr.replace("TKN_LVL", screenNames[58]).replace("TKN_LVL", screenNames[58]));
console.log(baseStr.replace("TKN_LVL", screenNames[64]).replace("TKN_LVL", screenNames[64]));
console.log(baseStr.replace("TKN_LVL", screenNames[66]).replace("TKN_LVL", screenNames[66]));
console.log(baseStr.replace("TKN_LVL", screenNames[68]).replace("TKN_LVL", screenNames[68]));
console.log(baseStr.replace("TKN_LVL", screenNames[70]).replace("TKN_LVL", screenNames[70]));
console.log(baseStr.replace("TKN_LVL", screenNames[72]).replace("TKN_LVL", screenNames[72]));
*/
levelEnds.forEach(function (item, ind) {
    console.log(baseStr.replace("TKN_LVL", screenNames[item]).replace("TKN_LVL", screenNames[item]).replace("TKN_LVL", screenNames[item]));
}); 
console.log('//--------------------------------------------------');

baseStr = 'settings.Add("enableTKN_LVL_Screen", true, "TKN_LVL - Enable to allow the automatic Screen-Transition splits for TKN_LVL.", "enableScreenSplits");';
console.log('settings.Add("enableScreenSplits", false, "Enable to allow the automatic Screen-Transition splits on the levels checked below. They will be ignored if this is unchecked.");');
for (i = 16; i < 72; i++) {
    console.log(baseStr.replace("TKN_LVL", screenNames[i]).replace("TKN_LVL", screenNames[i]).replace("TKN_LVL", screenNames[i]));
}

console.log('//--------------------------------------------------');


var baseStrAutoSplitBySettings = 'else if (settings["enableScreenSplits"]) \r\n    {\r\n        TKN_ALL_SPLITS\r\n    }\r\n    else if (settings["enableLevelEndSplits"]) \r\n    {\r\n        \r\n    }';
var baseStrRespectSplitSetting = 'if (old.frame == TKN_LVL_NUM && settings["TKN_LVL_SETTING"]) {vars.splitPlz = true;}';
var baseSettingName = "enableTKN_LVL_Screen";

// else if (settings["enableLevelEndSplits"]) 
for (i = 16; i < 72; i++) {
    var settingName = baseSettingName.replace("TKN_LVL", screenNames[i]);
    console.log(baseStrRespectSplitSetting.replace("TKN_LVL_NUM", i).replace("TKN_LVL_SETTING", settingName));
}
console.log('//--------------------------------------------------');

baseSettingName = "enableTKN_LVL_LE";

// else if (settings["enableLevelEndSplits"]) 
levelEnds.forEach(function (item, ind) {
    //console.log("item, ind: " + item + ", " + ind);
    var settingName = baseSettingName.replace("TKN_LVL", screenNames[item]);
    console.log(baseStrRespectSplitSetting.replace("TKN_LVL_NUM", item).replace("TKN_LVL_SETTING", settingName));
});
console.log('//--------------------------------------------------');