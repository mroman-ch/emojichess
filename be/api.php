<?php

define("EMOJICHESS","");

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

require_once("pieces.php");

$dbConnection = null;

function hDefault($a, $uid, $dbConnection) {
  return array("uid"=>$uid);
}

$G_HANDLERS = array("default"=>"hDefault");

require_once('hgame.php');
require_once('hprofile.php');

$CFG_DBO_CONNECTION_STRING = 'mysql:host=localhost;dbname=web55';
$CFG_DBO_CONNECTION_USER = 'web55_';
$CFG_DBO_CONNECTION_PASSWORD = 'web55_';

try {
    $dbConnection = new PDO(
    $CFG_DBO_CONNECTION_STRING,
    $CFG_DBO_CONNECTION_USER,
    $CFG_DBO_CONNECTION_PASSWORD);	
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $ex) {
  die('Connection to database could not be established!');
}

if($_SERVER['REQUEST_METHOD'] != 'POST') {
  echo json_encode(array("err"=>"Only accepting post requests!"));
  exit(0);
}

$request = json_decode(file_get_contents("php://input"), true);

if (!isset($request['p'])) {
  echo json_encode(array("err"=>"`p` field is missing!"));
  exit(0);
}

if (!isset($request['a'])) {
  echo json_encode(array("err"=>"`a` field is missing!"));
  exit(0);
}

$uid = 0;

try {
  $dbConnection->beginTransaction();
  $stmt = $dbConnection->prepare("SELECT * FROM tokens WHERE token = :key");
  $stmt->bindParam(":key", $request['ecapi-key'], PDO::PARAM_STR);
  $stmt->execute();
  
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  
  if ($row !== FALSE) {
    $uid = intval($row['uid']);
  }
  $dbConnection->commit();
}
catch(PDOException $ex) {
  $dbConnection->rollback();
}

if (!isset($request['d'])) {
  echo json_encode(array("err"=>"`d` field is missing!"));
  exit(0);
}

$p = $request['p'];
$a = $request['a'];

if (!isset($G_HANDLERS[$p])) {
  echo json_encode(array("err"=>"Unknown `p` value!"));
  exit(0);
}

$obj = call_user_func_array($G_HANDLERS[$p], array($a, $request['d'], $uid, $dbConnection));

if (!isset($obj['err']))
  $obj['err'] = 0;

$obj['uid'] = $uid;

echo json_encode($obj);
exit(0);

?>