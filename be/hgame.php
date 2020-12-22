<?php

if(!defined("EMOJICHESS")) {
  die("What are you trying to do?");
}

function hGame($a, $d, $uid, $db) {
  if ($a == 'new') {
    return hGameNew($d, $uid, $db);
  }
  if ($a == 'get') {
    return hGameGet($d, $uid, $db);
  }
  if ($a == 'ack') {
    return hGameAck($d, $uid, $db);
  }
}

function hGameAck($d, $uid, $db) {
  if(!isset($d['gid'])) 
    return array("err"=>"Missing `gid`!");
  
  $gid = intval($d['gid']);
  
  $retv = NULL;
  
  try {
    $db->beginTransaction();
    
    $stmt = $db->prepare("SELECT * FROM games WHERE id = :gid");
    $stmt->bindParam(":gid", $gid);
    $stmt->execute();
    
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if($result !== FALSE) {
      // So this game actually exists. 
      
      // But is it in 'c' mode?
      if ($result['result'] == 'c') {
        
        // and I'm not already in it?
        if ($result['alpha'] != $uid && $result['beta'] != $uid) {
        
          if ($result['alpha'] == NULL) { // Then I'm alpha
            $stmt = $db->prepare("UPDATE games SET result = :result,".
                                 "alpha = :alpha WHERE id = :gid");
            $result_ = 'a';
            $stmt->bindParam(":alpha", $uid);
            $stmt->bindParam(":gid", $gid);
            $stmt->bindParam(":result", $result_);
            
            $stmt->execute();
                                 
          } else if ($result['beta'] == NULL) { // Then I'm beta
            $stmt = $db->prepare("UPDATE games SET result = :result,".
                                 "beta = :beta WHERE id = :gid");
            $result_ = 'a';
            $stmt->bindParam(":beta", $uid);
            $stmt->bindParam(":gid", $gid);
            $stmt->bindParam(":result", $result_);
            
            $stmt->execute();
          }
          
          $retv = array("code"=>0);
        
        } else {
          $retv = array("code"=>403);
        }
        
      } else {
        $retv = array("code"=>403);
      }
    } else {
      $retv = array("code"=>404);
    }
    
    $db->commit();
    
    return $retv;
  }
  catch(PDOException $ex) {
    $db->rollback();
    return array("err"=>"database error");
  }
}

function hGameGet($d, $uid, $db) {
  
  if(!isset($d['gid'])) 
    return array("err"=>"Missing `gid`!");
  
  $gid = intval($d['gid']);
  
  try {
    $db->beginTransaction();
    
    $stmt = $db->prepare("SELECT * FROM games WHERE id = :gid");
    $stmt->bindParam(":gid", $gid);
    $stmt->execute();
    
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    $db->commit();
    
    if($result === FALSE) {
      return array("code"=>404);
    }
    
    if ($result['result'] == 'c')
      return array("gid"=>$result['id'],"alpha"=>$result['alpha'],"beta"=>$result['beta'],
                   "created_on"=>$result['created_on'],"result"=>$result['result']);
    else {
      return array("gid"=>$result['id'],"alpha"=>$result['alpha'],"beta"=>$result['beta'],
                   "created_on"=>$result['created_on'],"alpha_civ"=>$result['alpha_civ'],
                   "beta_civ"=>$result['beta_civ'],"board"=>$result['board'],"result"=>$result['board']);
    }
  }
  catch(PDOException $ex) {
    $db->rollback();
    return array("err"=>"database error");
  }
}

function hGameNew($d, $uid, $db) {
  try {
    $db->beginTransaction();
    
    $stmt = $db->prepare("INSERT INTO games(alpha, beta, alpha_civ, beta_civ, board)".
                         "VALUES (:alpha, :beta, :alpha_civ, :beta_civ, :board)");
    
    $alpha = $uid;
    $beta = NULL;
    $alpha_civ = "shoes";
    $beta_civ = "people";
    
    if (rand(0,1) == 0) {
      $alpha = NULL;
      $beta = $uid;
    }
    
    $board = "HEHEHE";
    $stmt->bindParam(":alpha", $alpha);
    $stmt->bindParam(":beta", $beta);
    $stmt->bindParam(":alpha_civ", $alpha_civ);
    $stmt->bindParam(":beta_civ", $beta_civ);
    $stmt->bindParam(":board", $board);
    $stmt->execute();
    $lastId = $db->lastInsertId();
    $db->commit();
    
    return array("gid"=>$lastId);
  }
  catch(PDOException $ex) {
    $db->rollback();
    return array("err"=>"database error");
  }
}

$G_HANDLERS['game'] = "hGame";

?>