<?php

if(!defined("EMOJICHESS")) {
  die("What are you trying to do?");
}

function generateToken() {
    $abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $c = strlen($abc);
    
    $token = "";
    for($i = 0; $i < 16; $i++) {
        $token .= $abc[rand(0, $c-1)];
    }
    
    return $token;
}


function hProfile($a, $d, $uid, $db) {
  if($a == 'login') {
    return hProfileLogin($d, $uid, $db);
  }
}

function hProfileLogin($d, $uid, $db) {
  if(!isset($d['name']))
    return array("err"=>"`name` is missing!");
  
  if(!isset($d['pwd']))
    return array("err"=>"`pwd` is missing!");
  
  $pwd = md5($d['pwd']);
  
  try {
    $db->beginTransaction();
    $sql = "SELECT * FROM profiles WHERE name = :name AND password = :pwd";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(":name", $d['name'], PDO::PARAM_STR);
    $stmt->bindParam(":pwd", $pwd, PDO::PARAM_STR);
    $stmt->execute();
    
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($row !== FALSE) {
      $token = generateToken();
      $stmt = $db->prepare("INSERT INTO tokens(token, uid) VALUES(:token,:uid)");
      $stmt->bindParam(":token", $token, PDO::PARAM_STR);
      $stmt->bindParam(":uid", intval($row['id']), PDO::PARAM_INT);
      $stmt->execute();
      $db->commit();
      return array("token"=>$token, "uid"=>intval($row['id']));
    }
    
    $db->commit();
    return array("err"=>403);
  }
  catch(PDOException $ex) {
    $db->rollback();
    return array("err"=>"database error");
  }
}

$G_HANDLERS['profile'] = "hProfile";
?>