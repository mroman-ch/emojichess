<?php

if(!defined("EMOJICHESS")) {
  die("What are you trying to do?");
}

$PIECE_CIV = array(
  /* bugs */
  "S"=> "bugs",
  "A"=> "bugs",
  "B"=> "bugs",
  "b"=> "bugs",
  "C"=> "bugs",
  "s"=> "bugs",
  "c"=> "bugs",
  
  /* smileys */
  "P"=> "smileys",
  "N"=> "smileys",
  "p"=> "smileys",
  "R"=> "smileys",
  "Q"=> "smileys",
  "K"=> "smileys",
  
  /* birds */
  "v"=> "birds",
  "x"=> "birds",
  "V"=> "birds",
  "f"=> "birds",
  "k"=> "birds",
  
  /* people */
  "0"=> "people",
  "1"=> "people",
  "2"=> "people",
  "3"=> "people",
  "4"=> "people",
  "5"=> "people",
  
  /* clothes */
  "l"=> "clothes",
  "m"=> "clothes",
  "o"=> "clothes",
  "g"=> "clothes",
  
  /* vehicles */
  "T"=> "vehicles",
  "O"=> "vehicles",
  "F"=> "vehicles",
  "#"=> "vehicles",
  "@"=> "vehicles",
  "|"=> "vehicles",
  
  /* Smileys 2 */
  "y"=> "smileys2",
  "u"=> "smileys2",
  "G"=> "smileys2",
  "E"=> "smileys2",
  "e"=> "smileys2",
  
  /* sounds */
  "U"=> "sounds",
  "W"=> "sounds",
  "X"=> "sounds",
  "L"=> "sounds",
);

$PATTERN_BISHOP = array(array(1,1),array(-1,-1),array(1,-1),array(-1,1));
$PATTERN_ALLDIR = array(array(1,1),array(-1,-1),array(1,-1),array(-1,1),
                      array(1,0),array(0,1),array(-1,0),array(0,-1));
$PATTERN_ROOK = array(array(1,0),array(0,1),array(-1,0),array(0,-1));
$PATTERN_KNIGHT = array(array(2,1),array(-2,1),array(2,-1),array(-2,-1),
                      array(1,2),array(-1,2),array(1,-2),array(-1,-2));
$PATTERN_FAR_KNIGHT = array(array(3,1),array(-3,1),array(3,-1),array(-3,-1),
                      array(1,3),array(-1,3),array(1,-3),array(-1,-3));
$PATTERN_KNIGHT_BISHOP = array(array(2,1),array(-2,1),array(2,-1),array(-2,-1),
                             array(1,2),array(-1,2),array(1,-2),array(-1,-2),
                             array(1,1),array(-1,-1),array(1,-1),array(-1,1));
$PATTERN_KNIGHT_BISHOP_ROOK = array(array(2,1),array(-2,1),array(2,-1),array(-2,-1),
                             array(1,2),array(-1,2),array(1,-2),array(-1,-2),
                             array(1,1),array(-1,-1),array(1,-1),array(-1,1),
                             array(1,0),array(0,1),array(-1,0),array(0,-1));
$PATTERN_LEFT_RIGHT_BISHOP = array(array(1,0),array(-1,0),
                                 array(1,1),array(1,-1),array(-1,1),array(-1,-1));
$PATTERN_UP_DOWN_BISHOP = array(array(0,1),array(0,-1),
                              array(1,1),array(1,-1),array(-1,1),array(-1,-1));
$PATTERN_PAWN = array(array(0,1));
$PATTERN_PAWN_CAP =array(array(1,1),array(-1,1));

$PIECE_MOVEMENT = array(
  /* bugs */
  "S"=> array(array(1,0),array(0,1),array(-1,0)),
  "A"=> array(array(1,1),array(-1,1)),
  "B"=> $PATTERN_ROOK,
  "b"=> $PATTERN_ALLDIR,
  "C"=> array(array(2,1),array(2,-1),array(-2,1),array(-2,-1),
        array(1,2),array(-1,2),array(1,-2),array(-1,-2),
        array(4,0),array(0,4),array(0,-4),array(-4,0)),
  "s"=> $PATTERN_ALLDIR,
  "c"=> $PATTERN_BISHOP,
  
  /* smileys */
  "P"=>array(array(0,1)),
  "N"=> $PATTERN_KNIGHT,
  "p"=> $PATTERN_BISHOP,
  "R"=> $PATTERN_ROOK,
  "Q"=> $PATTERN_ALLDIR,
  "K"=> $PATTERN_ALLDIR,
  
  /* birds */
  "v"=> $PATTERN_ROOK,
  "x"=> $PATTERN_KNIGHT,
  "V"=> $PATTERN_PAWN,
  "f"=> $PATTERN_ALLDIR,
  "k"=> $PATTERN_ALLDIR,
  
  /* people */
  "0"=> $PATTERN_PAWN,
  "1"=> $PATTERN_ALLDIR,
  "2"=> $PATTERN_ALLDIR,
  "3"=> $PATTERN_BISHOP,
  "4"=> $PATTERN_KNIGHT_BISHOP,
  "5"=> $PATTERN_KNIGHT,
  
  /* clothes */
  "l"=> $PATTERN_PAWN,
  "m"=> $PATTERN_KNIGHT,
  "o"=> $PATTERN_ALLDIR,
  "g"=> $PATTERN_ALLDIR,
  
  /* vehicles */
  "T"=> $PATTERN_PAWN,
  "O"=> $PATTERN_ROOK,
  "F"=> $PATTERN_BISHOP,
  "#"=> $PATTERN_KNIGHT_BISHOP_ROOK,
  "@"=> $PATTERN_ROOK,
  "|"=> $PATTERN_ALLDIR,
  
  /* Smileys 2 */
  "y"=> $PATTERN_PAWN,
  "u"=> $PATTERN_LEFT_RIGHT_BISHOP,
  "G"=> $PATTERN_UP_DOWN_BISHOP,
  "E"=> $PATTERN_ALLDIR,
  "e"=> $PATTERN_ROOK,
  
  /* sounds */
  "U"=> $PATTERN_PAWN,
  "W"=> $PATTERN_FAR_KNIGHT,
  "X"=> $PATTERN_ALLDIR,
  "L"=> $PATTERN_ALLDIR,
);

$PIECE_RANGE = array(
  /* vehicles */
  "T"=> 1,
  "F"=> 8,
  "O"=> 8,
  "#"=> 1,
  "@"=> 8,
  "|"=> 1,
  
  /* bugs */
  "S"=> 1,
  "A"=> 1,
  "B"=> 8,
  "b"=> 2,
  "C"=> 1,
  "s"=> 1,
  "c"=> 8,
  
  /* smileys */
  "P"=> 1,
  "N"=> 1,
  "p"=> 8,
  "R"=> 8,
  "Q"=> 8,
  "K"=> 1,
  
  /* birds */
  "v"=> 3,
  "x"=> 1,
  "V"=> 1,
  "f"=> 8,
  "k"=> 1,
  
  /* people */
  "0"=> 1,
  "1"=> 2,
  "2"=> 4,
  "3"=> 8,
  "4"=> 1,
  "5"=> 1,
  
  /* clothes */
  "l"=> 1,
  "m"=> 1,
  "o"=> 8,
  "g"=> 8,
  
  /* Smileys 2 */
  "y"=> 1,
  "u"=> 8,
  "G"=> 8,
  "E"=> 1,
  "e"=> 1,
  
  /* sounds */
  "U"=> 1,
  "W"=> 1,
  "X"=> 8,
  "L"=> 3,
);

$PROMOTIONS = array(
  "vehicles"=> "@",
  "bugs"=> "C",
  "smileys"=> "Q",
  "birds"=> "f",
  "clothes"=> "o",
  "people"=> "4",
  "smileys2"=> "E",
  "sounds"=> "X",
);

$PIECE_TIER = array(
  /* vehicles */
  "T"=> 0,
  "F"=> 1,
  "O"=> 1,
  "#"=> 1,
  "@"=> 2,
  "|"=> 3,
  
  /* bugs */
  "S"=> 0,
  "A"=> 0,
  "B"=> 1,
  "b"=> 3,
  "C"=> 2,
  "s"=> 1,
  "c"=> 1,
  
  /* smileys */
  "P"=> 0,
  "N"=> 1,
  "p"=> 1,
  "R"=> 1,
  "Q"=> 2,
  "K"=> 3,
  
  /* birds */
  "V"=> 0,
  "v"=> 1,
  "f"=> 2,
  "k"=> 3,
  "x"=> 1,
  
  /* people */
  "0"=> 0,
  "1"=> 1,
  "2"=> 1,
  "3"=> 1,
  "4"=> 2,
  "5"=> 3,
  
  /* clothes */
  "l"=> 0,
  "m"=> 1,
  "o"=> 2,
  "g"=> 3,
  
  /* Smileys 2 */
  "y"=> 0,
  "u"=> 1,
  "G"=> 1,
  "E"=> 2,
  "e"=> 3,
  
  /* sounds */
  "U"=> 0,
  "W"=> 1,
  "X"=> 2,
  "L"=> 3,
);

$PIECE_CAPTURE = array(
  /* vehicles */
  "T"=> $PATTERN_PAWN_CAP,
  "O"=> $PATTERN_BISHOP,
  "F"=> $PATTERN_ROOK,
  "#"=> $PATTERN_KNIGHT_BISHOP_ROOK,
  "@"=> $PATTERN_ROOK,
  "|"=> $PATTERN_ALLDIR,
  
  /* bugs */
  "S"=> $PATTERN_PAWN_CAP,
  "A"=> array(array(0,1)),
  "B"=> $PATTERN_ROOK,
  "b"=> $PATTERN_ALLDIR,
  "C"=> $PATTERN_KNIGHT,
  "s"=> array(array(1,0),array(0,1),array(1,1),array(-1,-1),
        array(-1,0),array(0,-1),array(-1,1),array(1,-1),
        array(2,0),array(0,2),array(0,-2),array(-2,0)),
  "c"=> $PATTERN_BISHOP,
  
  /* smileys */
  "P"=> $PATTERN_PAWN_CAP,
  "N"=> $PATTERN_KNIGHT,
  "p"=> $PATTERN_BISHOP,
  "R"=> $PATTERN_ROOK,
  "Q"=> $PATTERN_ALLDIR,
  "K"=> $PATTERN_ALLDIR,
  
  /* birds */
  "v"=> $PATTERN_ROOK,
  "x"=> $PATTERN_KNIGHT,
  "V"=> $PATTERN_PAWN_CAP,
  "f"=> $PATTERN_ALLDIR,
  "k"=> $PATTERN_ALLDIR,
  
  /* people */
  "0"=> $PATTERN_PAWN_CAP,
  "1"=> $PATTERN_ALLDIR,
  "2"=> $PATTERN_BISHOP,
  "3"=> $PATTERN_BISHOP,
  "4"=> $PATTERN_KNIGHT_BISHOP,
  "5"=> $PATTERN_KNIGHT,
  
  /* clothes */
  "l"=> $PATTERN_PAWN_CAP,
  "m"=> $PATTERN_KNIGHT,
  "o"=> $PATTERN_ALLDIR,
  "g"=> $PATTERN_ALLDIR,
  
  /* Smileys 2 */
  "y"=> $PATTERN_PAWN_CAP,
  "u"=> $PATTERN_LEFT_RIGHT_BISHOP,
  "G"=> $PATTERN_UP_DOWN_BISHOP,
  "E"=> $PATTERN_ALLDIR,
  "e"=> $PATTERN_BISHOP,
  
  /* sounds */
  "U"=> $PATTERN_PAWN,
  "W"=> $PATTERN_FAR_KNIGHT,
  "X"=> $PATTERN_ALLDIR,
  "L"=> $PATTERN_ALLDIR,
);

$BUGS_START_1 = "AASSSSAA";
$BUGS_START_0 = "csBCbBsc";
$SMILEYS_START_1 = "PPPPPPPP";
$SMILEYS_START_0 = "RNpQKpNR";
$BIRDS_START_1 = "VVVVVVVV";
$BIRDS_START_0 = "vxvfkvxv";
$PEOPLE_START_1 = "00000000";
$PEOPLE_START_0 = "32145213";
$CLOTHES_START_1 = "llllllll";
$CLOTHES_START_0 = "mmmogmmm";
$VEHICLES_START_1 = "TTTTTTTT";
$VEHICLES_START_0 = "FO#@|#OF";
$SMILEYS2_START_1 = "yyyyyyyy";
$SMILEYS2_START_0 = "yGuEeuGy";


$CIVSTARTS = array(
  "bugs"=> array($BUGS_START_0, $BUGS_START_1),
  "smileys"=> array($SMILEYS_START_0, $SMILEYS_START_1),
  "birds"=> array($BIRDS_START_0, $BIRDS_START_1),
  "people"=> array($PEOPLE_START_0, $PEOPLE_START_1),
  "clothes"=> array($CLOTHES_START_0, $CLOTHES_START_1),
  "vehicles"=> array($VEHICLES_START_0, $VEHICLES_START_1),
  "smileys2"=> array($SMILEYS2_START_0, $SMILEYS2_START_1),
);

?>