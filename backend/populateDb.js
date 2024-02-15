require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const { Map, Character } = require("./models");
const characters = [
  {
    name: "jason13",
    url: "characters/jason13.jpg",
    region: { x1: 1214, y1: 732, x2: 1285, y2: 820 },
  },
  {
    name: "kratos",
    url: "characters/kratos.jpg",
    region: { x1: 843, y1: 853, x2: 939, y2: 933 },
  },
  {
    name: "knight",
    url: "characters/knight.jpg",
    region: { x1: 1253, y1: 500, x2: 1344, y2: 611 },
  },
  {
    name: "johnnyBravo",
    url: "characters/johnnyBravo.jpg",
    region: { x1: 718, y1: 952, x2: 779, y2: 1022 },
  },
  {
    name: "ironGiant",
    url: "characters/ironGiant.jpg",
    region: { x1: 659, y1: 917, x2: 724, y2: 990 },
  },
  {
    name: "demon",
    url: "characters/demon.jpg",
    region: { x1: 554, y1: 991, x2: 596, y2: 1050 },
  },
  {
    name: "futurama",
    url: "characters/futurama.jpg",
    region: { x1: 696, y1: 454, x2: 730, y2: 482 },
  },
  {
    name: "policeman",
    url: "characters/policeman.jpg",
    region: { x1: 615, y1: 646, x2: 673, y2: 753 },
  },
  {
    name: "robodog",
    url: "characters/robodog.jpg",
    region: { x1: 514, y1: 985, x2: 547, y2: 1030 },
  },
  {
    name: "pinhead",
    url: "characters/pinhead.jpg",
    region: { x1: 483, y1: 1019, x2: 526, y2: 1110 },
  },
  {
    name: "bowser",
    url: "characters/bowser.jpg",
    region: { x1: 806, y1: 964, x2: 985, y2: 1096 },
  },
  {
    name: "catdog",
    url: "characters/catdog.jpg",
    region: { x1: 586, y1: 1235, x2: 629, y2: 1293 },
  },
  {
    name: "assassin",
    url: "characters/assassin.jpg",
    region: { x1: 317, y1: 1126, x2: 359, y2: 1165 },
  },
  {
    name: "mandelorian",
    url: "characters/mandelorian.jpg",
    region: { x1: 836, y1: 1112, x2: 883, y2: 1181 },
  },
  {
    name: "wormman",
    url: "characters/wormman.jpg",
    region: { x1: 760, y1: 1174, x2: 821, y2: 1260 },
  },
  {
    name: "wizard",
    url: "characters/wizard.jpg",
    region: { x1: 1113, y1: 970, x2: 1163, y2: 1018 },
  },
  {
    name: "brainiac",
    url: "characters/brainiac.jpg",
    region: { x1: 1453, y1: 889, x2: 1510, y2: 949 },
  },
  {
    name: "r2d2",
    url: "characters/r2d2.jpg",
    region: { x1: 304, y1: 1307, x2: 341, y2: 1348 },
  },
  {
    name: "squansh",
    url: "characters/squansh.jpg",
    region: { x1: 1487, y1: 1125, x2: 1522, y2: 1179 },
  },
  {
    name: "crash",
    url: "characters/crash.jpg",
    region: { x1: 1248, y1: 1268, x2: 1280, y2: 1301 },
  },
  {
    name: "agent1",
    url: "characters/agent1.jpg",
    region: { x1: 1295, y1: 1242, x2: 1330, y2: 1299 },
  },
  {
    name: "pacman",
    url: "characters/pacman.jpg",
    region: { x1: 447, y1: 1350, x2: 484, y2: 1386 },
  },
  {
    name: "courage",
    url: "characters/courage.jpg",
    region: { x1: 590, y1: 1392, x2: 621, y2: 1438 },
  },
  {
    name: "finn",
    url: "characters/finn.jpg",
    region: { x1: 236, y1: 1373, x2: 268, y2: 1452 },
  },
  {
    name: "jake",
    url: "characters/jake.jpg",
    region: { x1: 269, y1: 1359, x2: 293, y2: 1415 },
  },
  {
    name: "mobPsycho",
    url: "characters/mobPsycho.jpg",
    region: { x1: 291, y1: 1546, x2: 317, y2: 1617 },
  },
  {
    name: "mantis",
    url: "characters/mantis.jpg",
    region: { x1: 551, y1: 1220, x2: 583, y2: 1310 },
  },
  {
    name: "oldWaldo",
    url: "characters/oldWaldo.jpg",
    region: { x1: 273, y1: 1704, x2: 312, y2: 1776 },
  },
  {
    name: "saitama",
    url: "characters/saitama.jpg",
    region: { x1: 575, y1: 1714, x2: 609, y2: 1754 },
  },
  {
    name: "genos",
    url: "characters/genos.jpg",
    region: { x1: 611, y1: 1751, x2: 633, y2: 1797 },
  },
  {
    name: "fartmon",
    url: "characters/fartmon.jpg",
    region: { x1: 862, y1: 1754, x2: 911, y2: 1801 },
  },
  {
    name: "zack",
    url: "characters/zack.jpg",
    region: { x1: 704, y1: 1611, x2: 727, y2: 1653 },
  },
  {
    name: "spawn",
    url: "characters/spawn.jpg",
    region: { x1: 576, y1: 1569, x2: 659, y2: 1631 },
  },
  {
    name: "minion",
    url: "characters/minion.jpg",
    region: { x1: 718, y1: 1675, x2: 743, y2: 1705 },
  },
  {
    name: "arnold",
    url: "characters/arnold.jpg",
    region: { x1: 805, y1: 1681, x2: 835, y2: 1714 },
  },
  {
    name: "bart",
    url: "characters/bart.jpg",
    region: { x1: 769, y1: 1701, x2: 792, y2: 1735 },
  },
  {
    name: "stewart",
    url: "characters/stewart.jpg",
    region: { x1: 676, y1: 1653, x2: 699, y2: 1679 },
  },
  {
    name: "plant",
    url: "characters/plant.jpg",
    region: { x1: 677, y1: 1681, x2: 716, y2: 1730 },
  },
  {
    name: "hacker",
    url: "characters/hacker.jpg",
    region: { x1: 799, y1: 1988, x2: 842, y2: 2050 },
  },
  {
    name: "scp173",
    url: "characters/scp-173.jpg",
    region: { x1: 239, y1: 1842, x2: 272, y2: 1935 },
  },
  {
    name: "cthulu",
    url: "characters/cthulu.jpg",
    region: { x1: 292, y1: 2067, x2: 343, y2: 2144 },
  },
  {
    name: "hellboy",
    url: "characters/hellboy.jpg",
    region: { x1: 356, y1: 2067, x2: 391, y2: 2132 },
  },
  {
    name: "groot",
    url: "characters/groot.jpg",
    region: { x1: 1125, y1: 1942, x2: 1156, y2: 1986 },
  },
  {
    name: "beeves",
    url: "characters/beeves.jpg",
    region: { x1: 1172, y1: 1949, x2: 1191, y2: 2033 },
  },
  {
    name: "butthead",
    url: "characters/butthead.jpg",
    region: { x1: 1196, y1: 1960, x2: 1219, y2: 2043 },
  },
  {
    name: "fatAlien",
    url: "characters/fatAlien.jpg",
    region: { x1: 930, y1: 2056, x2: 987, y2: 2148 },
  },
  {
    name: "lizardman",
    url: "characters/lizardman.jpg",
    region: { x1: 698, y1: 2114, x2: 737, y2: 2199 },
  },
  {
    name: "agent2",
    url: "characters/agent2.jpg",
    region: { x1: 1156, y1: 1657, x2: 1196, y2: 1726 },
  },
  {
    name: "tom",
    url: "characters/tom.jpg",
    region: { x1: 1075, y1: 1793, x2: 1102, y2: 1840 },
  },
  {
    name: "jerry",
    url: "characters/jerry.jpg",
    region: { x1: 1058, y1: 1806, x2: 1071, y2: 1823 },
  },
  {
    name: "keanuReeves",
    url: "characters/keanuReeves.jpg",
    region: { x1: 1023, y1: 1750, x2: 1063, y2: 1851 },
  },
  {
    name: "billCipher",
    url: "characters/billCipher.jpg",
    region: { x1: 1350, y1: 1752, x2: 1387, y2: 1801 },
  },
  {
    name: "godzilla",
    url: "characters/godzilla.jpg",
    region: { x1: 1506, y1: 1713, x2: 1638, y2: 1824 },
  },
  {
    name: "sonic",
    url: "characters/sonic.jpg",
    region: { x1: 1373, y1: 1807, x2: 1424, y2: 1889 },
  },
  {
    name: "guts",
    url: "characters/guts.jpg",
    region: { x1: 878, y1: 2402, x2: 1001, y2: 2506 },
  },
  {
    name: "alien",
    url: "characters/alien.jpg",
    region: { x1: 1241, y1: 2285, x2: 1309, y2: 2354 },
  },
  {
    name: "xenomorph",
    url: "characters/xenomorph.jpg",
    region: { x1: 790, y1: 2318, x2: 850, y2: 2421 },
  },
  {
    name: "predator",
    url: "characters/predator.jpg",
    region: { x1: 1129, y1: 2266, x2: 1182, y2: 2351 },
  },
  {
    name: "shock",
    url: "characters/shock.jpg",
    region: { x1: 860, y1: 2191, x2: 892, y2: 2278 },
  },
  {
    name: "ceberaus",
    url: "characters/ceberaus.jpg",
    region: { x1: 586, y1: 2350, x2: 680, y2: 2479 },
  },
];

const wallpaper = "universe-113";
const populateData = async (characters) => {
  let map = await Map.findOne({ name: wallpaper });
  if (!map) {
    map = new Map({
      name: wallpaper,
    });
    await map.save();
  }
  characters.forEach(async (character) => {
    const imageBuffer = fs
      .readFileSync(`maps/${wallpaper}/${character.url}`)
      .toString("base64");
    const datum = new Character({
      name: character.name,
      image: imageBuffer,
      region: character.region,
      map: map._id,
    });
    await datum.save();
  });
  console.log("done");
};
populateData(characters);
