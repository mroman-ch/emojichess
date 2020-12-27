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
  if ($a == 'move') {
    return hGameMove($d, $uid, $db);
  }
  if ($a == 'list') {
    return hGameList($d, $uid, $db);
  }
  if ($a == 'list2') {
    return hGameList2($d, $uid, $db);
  }
  if ($a == 'lobby') {
    return hGameLobby($d, $uid, $db);
  }
}

function hGameLobby($d, $uid, $db) {
  $retv = NULL;
  
  try {
    $db->beginTransaction();
    $stmt = $db->prepare(
<<<SQL
SELECT
  g1.id AS id,
  p1.name AS alpha,
  p2.name AS beta,
  g1.alpha_civ AS alpha_civ,
  g1.beta_civ AS beta_civ,
  g1.created_on AS created_on,
  g1.result AS result,
  g1.board AS board,
  p1.id AS alpha_id,
  p2.id AS beta_id,
  g1.poll_alpha AS poll_alpha,
  g1.poll_beta AS poll_beta,
  g1.last_fx AS last_fx,
  g1.last_fy AS last_fy,
  g1.last_tx AS last_tx,
  g1.last_ty AS last_ty
FROM
  `games` g1
LEFT JOIN PROFILES
  p1 ON p1.id = g1.alpha
LEFT JOIN PROFILES
  p2 ON p2.id = g1.beta
WHERE g1.result = 'c'
ORDER BY g1.created_on ASC
LIMIT 12
SQL
    );
    $stmt->bindParam(":uid", $uid, PDO::PARAM_INT);
    $stmt->execute();
    
    $rows = array();
    
    while(TRUE) {
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if($row === FALSE)
        break;
      
      $user = $row['alpha'];
      
      if ($user == NULL) {
        $user = $row['beta'];
      }
      
      $user_id = $row['alpha_id'];
      if ($user_id == NULL)
        $user_id = $row['beta_id'];
      
      $row_ = array("gid" => intval($row['id']),
                    "opponent" => $user,
                    "opponent_id" => $user_id);
      array_push($rows, $row_);
    }
    
    $retv = array("games"=>$rows);
    
    $db->commit();
  }
  catch(PDOException $ex) {
    return array("err"=>"database error");
  }
  
  return $retv;
}

function hGameList($d, $uid, $db) {
  if (!isset($d['uid'])) {
    $d['uid'] = $uid;
  }
  
  $retv = NULL;
  
  try {
    $db->beginTransaction();
    $stmt = $db->prepare(
<<<SQL
SELECT
  g1.id AS id,
  p1.name AS alpha,
  p2.name AS beta,
  g1.alpha_civ AS alpha_civ,
  g1.beta_civ AS beta_civ,
  g1.created_on AS created_on,
  g1.result AS result,
  g1.board AS board,
  p1.id AS alpha_id,
  p2.id AS beta_id,
  g1.poll_alpha AS poll_alpha,
  g1.poll_beta AS poll_beta,
  g1.last_fx AS last_fx,
  g1.last_fy AS last_fy,
  g1.last_tx AS last_tx,
  g1.last_ty AS last_ty
FROM
  `games` g1
LEFT JOIN PROFILES
  p1 ON p1.id = g1.alpha
LEFT JOIN PROFILES
  p2 ON p2.id = g1.beta
WHERE (p1.id = :usrid OR p2.id = :usrid)
  AND (g1.result = 'v' OR g1.result = 'V')
ORDER BY g1.created_on DESC
LIMIT 12
SQL
    );
    $stmt->bindParam(":usrid", intval($d['uid']), PDO::PARAM_INT);
    $stmt->execute();
    
    $rows = array();
    
    while(TRUE) {
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if($row === FALSE)
        break;
      
      $row_ = array("gid" => intval($row['id']),
                    "result" => $row['result'],
                    "alpha"=> $row['alpha'],
                    "beta" => $row['beta']);
      array_push($rows, $row_);
    }
    
    $retv = array("games"=>$rows);
    
    $db->commit();
  }
  catch(PDOException $ex) {
    return array("err"=>"database error");
  }
  
  return $retv;
}

function hGameList2($d, $uid, $db) {
  if (!isset($d['uid'])) {
    $d['uid'] = $uid;
  }
  
  $retv = NULL;
  
  try {
    $db->beginTransaction();
    $stmt = $db->prepare(
<<<SQL
SELECT
  g1.id AS id,
  p1.name AS alpha,
  p2.name AS beta,
  g1.alpha_civ AS alpha_civ,
  g1.beta_civ AS beta_civ,
  g1.created_on AS created_on,
  g1.result AS result,
  g1.board AS board,
  p1.id AS alpha_id,
  p2.id AS beta_id,
  g1.poll_alpha AS poll_alpha,
  g1.poll_beta AS poll_beta,
  g1.last_fx AS last_fx,
  g1.last_fy AS last_fy,
  g1.last_tx AS last_tx,
  g1.last_ty AS last_ty
FROM
  `games` g1
LEFT JOIN PROFILES
  p1 ON p1.id = g1.alpha
LEFT JOIN PROFILES
  p2 ON p2.id = g1.beta
WHERE (p1.id = :usrid OR p2.id = :usrid)
  AND (g1.result != 'v' AND g1.result != 'V')
ORDER BY g1.created_on DESC
LIMIT 12
SQL
    );
    $stmt->bindParam(":usrid", intval($d['uid']), PDO::PARAM_INT);
    $stmt->execute();
    
    $rows = array();
    
    while(TRUE) {
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if($row === FALSE)
        break;
      
      $row_ = array("gid" => intval($row['id']),
                    "result" => $row['result'],
                    "alpha"=> $row['alpha'],
                    "beta" => $row['beta'],
                    "alpha_id" => intval($row['alpha_id']),
                    "beta_id" => intval($row['beta_id']));
      array_push($rows, $row_);
    }
    
    $retv = array("games"=>$rows);
    
    $db->commit();
  }
  catch(PDOException $ex) {
    return array("err"=>"database error");
  }
  
  return $retv;
}

// CONTRACT: - Valid coordinates
//           - Civ's move
//           - Within beginTransaction
function hGameMoveInsert($d, $uid, $db, $civ, $fx, $fy, $tx, $ty, $game, $next) {

  if (strlen($game['board']) != 64)
    return array("err"=>"Corrupt board state!");
  
  $fidx = $fy * 8 + $fx;
  $tidx = $ty * 8 + $tx;
  
  $deltaX = $tx - $fx;
  $deltaY = $ty - $fy;
  
  $board = $game['board'];
  
  if ($board[$fidx] == ' ')
    return array("err"=>"Move from empty square!");
  
  // Ok, now let's see if this move is legal. 
  
  global $PIECE_CAPTURE, $PIECE_CIV, $PIECE_TIER, $PIECE_MOVEMENT, $PIECE_RANGE;
  
  $piece = $board[$fidx];
  $pieceCiv = $PIECE_CIV[$piece];
  $pieceTier = $PIECE_TIER[$piece];
  $pieceMovePattern = $PIECE_MOVEMENT[$piece];
  $pieceCapPattern = $PIECE_CAPTURE[$piece];
  $pieceRange = $PIECE_RANGE[$piece];
  
  if ($pieceCiv != $civ) {
    return array("err"=>"Trying to move an opponent's piece!");
  }
  
  $moveValid = false;
  $reason = $piece . " . ";
  
  if ($board[$tidx] == ' ') { // Move to empty square 
  
    for($i = 0; $i < count($pieceMovePattern); $i++) {
      for($d = 1; $d <= $pieceRange; $d++) {
        
        $px = $pieceMovePattern[$i][0];
        $py = $pieceMovePattern[$i][1];
        
        if ($pieceTier == 0) {
          if ($pieceCiv == $game['alpha_civ']) {
            $py *= -1;
          }
        }
        
        $sx = $px * $d + $fx;
        $sy = $py * $d + $fy;
        
        if ($sx < 0 || $sx >= 8 || $sy < 0 || $sy >= 8)
          break; // out of board
        
        $sidx = $sy*8 + $sx;
        
        if ($board[$sidx] != ' ') {
          $reason .= "Blocked";
          break; // piece in the way
        }
        
        if ($sx == $tx && $sy == $ty) {
          $moveValid = true;
          break;
        }
      }
      
      if ($moveValid)
        break; // abort outter loop as well
    }
  } else { // Capture
    
    for($i = 0; $i < count($pieceMovePattern); $i++) {
      for($d = 0; $d < $pieceRange; $d++) {
        $sx = $pieceCapPattern[$i][0]*$d + $fx;
        $sy = $pieceCapPattern[$i][1]*$d + $fy;
        
        $sidx = $sy*8 + $sx;
        
        if ($board[$sidx] != ' ') {
          // Enemy piece?
          $pieceCiv_ = $PIECE_CIV[$board[$sidx]];
          
          if ($pieceCiv_ == $pieceCiv) { // can't capture own pieces
            $reason .= "Can't capture own pieces";
            break;
          } else {
            if ($sx == $tx && $sy == $ty) {
              $moveValid = true;
            }
            break;
          }
        }
      }
      
      if ($moveValid)
        break; // abort outter loop as well
    }
  }
  
  if (!$moveValid) {
    return array("err"=>69,"reason"=>$reason);
  }
  
  $board[$tidx] = $board[$fidx];
  $board[$fidx] = ' ';
  
  // Now insert the move 
  $stmt = $db->prepare("INSERT INTO MOVES(gid, uid, civ, fx, fy, tx, ty, board) ".
                       "VALUES(:gid, :uid, :civ, :fx, :fy, :tx, :ty, :board)");
  $stmt->bindParam(":gid", $game['id'], PDO::PARAM_INT);
  $stmt->bindParam(":uid", $uid, PDO::PARAM_INT);
  $stmt->bindParam(":civ", $civ, PDO::PARAM_STR);
  $stmt->bindParam(":fx", $fx, PDO::PARAM_INT);
  $stmt->bindParam(":fy", $fy, PDO::PARAM_INT);
  $stmt->bindParam(":tx", $tx, PDO::PARAM_INT);
  $stmt->bindParam(":ty", $ty, PDO::PARAM_INT);
  $stmt->bindParam(":board", $board, PDO::PARAM_STR);
  
  $stmt->execute();
  
  // Win or Draw?
  
  $enemyPieces = 0;
  $enemy3 = FALSE;
  
  for($ix = 0; $ix < 64; $ix++) {
    if ($board[$ix] == ' ')
      continue;
    
    if ($PIECE_CIV[$board[$ix]] != $civ) {
      $enemyPieces++;
      
      if ($PIECE_TIER[$board[$ix]] == 3) {
        $enemy3 = TRUE;
      }
    }
  }
  
  if ($enemyPieces < 2 || !$enemy3) {
    // We win.
    if ($civ == $game['beta_civ'])
      $next = 'v';
    else if ($civ == $game['alpha_civ'])
      $next = 'V';
  }
  
  // Update the board in the game
  $stmt = $db->prepare("UPDATE games SET board = :board, result = :result, ".
                       "last_fx = :fx, last_fy = :fy, last_tx = :tx, last_ty = :ty, ".
                       "poll_alpha = NULL, poll_beta = NULL ".
                       "WHERE id = :gid");
  $stmt->bindParam(":board", $board, PDO::PARAM_STR);
  $stmt->bindParam(":result", $next, PDO::PARAM_STR);
  $stmt->bindParam(":gid", intval($game['id']), PDO::PARAM_INT);
  $stmt->bindParam(":fx", $fx, PDO::PARAM_INT);
  $stmt->bindParam(":fy", $fy, PDO::PARAM_INT);
  $stmt->bindParam(":tx", $tx, PDO::PARAM_INT);
  $stmt->bindParam(":ty", $ty, PDO::PARAM_INT);
  $stmt->execute();
  
  
  return array("err"=>0,"board"=>$board,"result"=>$next);
}

function hGameMove($d, $uid, $db) {
  if ($uid == 0)
    return array("err"=>403);
  
  if(!isset($d['gid'])) 
    return array("err"=>"Missing `gid`!");
  
  $gid = intval($d['gid']);
  
   if(!isset($d['from']))
    return array("err"=>"Missing `from`!");
  
  if(!isset($d['to']))
    return array("err"=>"Missing `to`!");
  
  if(!isset($d['from']['x']) || !isset($d['from']['y']))
    return array("err"=>"Missing `from.x` or `from.y`!");
  
  if(!isset($d['to']['x']) || !isset($d['to']['y']))
    return array("err"=>"Missing `to.x` or `to.y`!");
  
  $fx = intval($d['from']['x']);
  $fy = intval($d['from']['y']);
  $tx = intval($d['to']['x']);
  $ty = intval($d['to']['y']);
  
  if ($fx < 0 || $fx >= 8 || $fy < 0 || $fy >= 8)
    return array("err"=>"Invalid `from` coordinates!");
  
  if ($tx < 0 || $tx >= 8 || $ty < 0 || $ty >= 8)
    return array("err"=>"Invalid `to` coordinates!");
  
  $retv = NULL;
  
  try {
    $db->beginTransaction();
    
    $stmt = $db->prepare("SELECT * FROM games WHERE id = :gid");
    $stmt->bindParam(":gid", $gid);
    $stmt->execute();
    
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if($result !== FALSE) {
      if($result['result'] != 'c') {
        // Are we alpha or beta and is it actually our turn?
        if ($result['alpha'] == $uid && $result['result'] == 'a') {
          $retv = hGameMoveInsert($d, $uid, $db, $result['alpha_civ'], $fx, $fy, $tx, $ty, $result, 'b');
        } else if ($result['beta'] == $uid && $result['result'] == 'b') {
          $retv = hGameMoveInsert($d, $uid, $db, $result['beta_civ'], $fx, $fy, $tx, $ty, $result, 'a');
        } else {
          $retval = array("err"=>403);
        }
      } else {
        $retval = array("err"=>403);
      }
    }
    else {
      $retval = array("err"=>404);
    }
    
    $db->commit();
  }
  catch(PDOException $ex) {
    $db->rollback();
    return array("err"=>"database error: ".$ex);
  }
  
  return $retv;
}

function hGameAck($d, $uid, $db) {
  if ($uid == 0) {
    return array("err"=>403);
  }
  
  if(!isset($d['gid'])) 
    return array("err"=>"Missing `gid`!");
  
  $gid = intval($d['gid']);
  
  $retv = NULL;
  
  try {
    $db->beginTransaction();
    
    $stmt = $db->prepare("SELECT * FROM games WHERE id = :gid");
    $stmt->bindParam(":gid", $gid, PDO::PARAM_INT);
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
            $stmt->bindParam(":alpha", $uid, PDO::PARAM_INT);
            $stmt->bindParam(":gid", $gid, PDO::PARAM_INT);
            $stmt->bindParam(":result", $result_, PDO::PARAM_STR);
            
            $stmt->execute();
                                 
          } else if ($result['beta'] == NULL) { // Then I'm beta
            $stmt = $db->prepare("UPDATE games SET result = :result,".
                                 "beta = :beta WHERE id = :gid");
            $result_ = 'a';
            $stmt->bindParam(":beta", $uid, PDO::PARAM_INT);
            $stmt->bindParam(":gid", $gid, PDO::PARAM_INT);
            $stmt->bindParam(":result", $result_, PDO::PARAM_STR);
            
            $stmt->execute();
          }
          
          $retv = array("err"=>0, "gid"=>$gid);
        
        } else {
          $retv = array("err"=>403);
        }
        
      } else {
        $retv = array("err"=>403);
      }
    } else {
      $retv = array("err"=>404);
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
  
  $retv = NULL;
  
  try {
    $db->beginTransaction();
    
    $stmt = $db->prepare(
<<<SQL
SELECT
  g1.id AS id,
  p1.name AS alpha,
  p2.name AS beta,
  g1.alpha_civ AS alpha_civ,
  g1.beta_civ AS beta_civ,
  g1.created_on AS created_on,
  g1.result AS result,
  g1.board AS board,
  p1.id AS alpha_id,
  p2.id AS beta_id,
  g1.poll_alpha AS poll_alpha,
  g1.poll_beta AS poll_beta,
  g1.last_fx AS last_fx,
  g1.last_fy AS last_fy,
  g1.last_tx AS last_tx,
  g1.last_ty AS last_ty
FROM
  `games` g1
LEFT JOIN PROFILES
  p1 ON p1.id = g1.alpha
LEFT JOIN PROFILES
  p2 ON p2.id = g1.beta
WHERE g1.id = :gid
SQL
    );
    $stmt->bindParam(":gid", $gid, PDO::PARAM_INT);
    $stmt->execute();
    
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if($result === FALSE) {
      $retv = array("err"=>404);
    }
    else

    if ($result['result'] == 'c')
      // INFO: If the game is still a challenge and not running then we MUST NOT
      //       spoil the civs - thus we set them to "?"
      $retv = array("gid"=>intval($result['id']),"alpha"=>$result['alpha'],"beta"=>$result['beta'],
                   "created_on"=>$result['created_on'],"result"=>$result['result'],
                   "alpha_civ"=>"?","beta_civ"=>"?","alpha_id"=>$result['alpha_id'],
                   "beta_id"=>$result['beta_id']);
    else {
      $turn_uid = 0;
      
      if ($result['result'] == 'a') {
        $turn_uid = intval($result['alpha_id']);
        
        if ($turn_uid == $uid) {
          // It's the pollers turn!
          // That means we gotta set the poll time for that player!
          $stmt = $db->prepare("UPDATE games SET poll_alpha = CURRENT_TIMESTAMP, ".
                               "poll_beta = NULL WHERE id = :gid AND poll_alpha IS NULL");
          $stmt->bindParam(":gid", $gid, PDO::PARAM_INT);
          $stmt->execute();
        }
      }
      
      if ($result['result'] == 'b') {
        $turn_uid = intval($result['beta_id']);
        
        if ($turn_uid == $uid) {
          // It's the pollers turn!
          // That means we gotta set the poll time for that player!
          $stmt = $db->prepare("UPDATE games SET poll_beta = CURRENT_TIMESTAMP, ".
                               "poll_alpha = NULL WHERE id = :gid AND poll_beta IS NULL");
          $stmt->bindParam(":gid", $gid, PDO::PARAM_INT);
          $stmt->execute();
        }
      }
      
      $retv =  array("gid"=>intval($result['id']),"alpha"=>$result['alpha'],"beta"=>$result['beta'],
                   "created_on"=>$result['created_on'],"alpha_civ"=>$result['alpha_civ'],
                   "beta_civ"=>$result['beta_civ'],"board"=>$result['board'],"result"=>$result['result'],
                   "alpha_id"=>intval($result['alpha_id']),"beta_id"=>intval($result['beta_id']),
                   "turn_uid"=>intval($turn_uid),"poll_alpha"=>$result['poll_alpha'],"poll_beta"=>$result['poll_beta'],
                   "last_move"=>array("fx"=>intval($result['last_fx']),
                                      "fy"=>intval($result['last_fy']),
                                      "tx"=>intval($result['last_tx']),
                                      "ty"=>intval($result['last_ty'])));
    }
    
    $db->commit();
  }
  catch(PDOException $ex) {
    $db->rollback();
    return array("err"=>"database error");
  }
  
  return $retv;
}

function hGameNew($d, $uid, $db) {
  if ($uid == 0)
    return array("err"=>403);
  
  try {
    $db->beginTransaction();
    
    $stmt = $db->prepare("INSERT INTO games(alpha, beta, alpha_civ, beta_civ, board)".
                         "VALUES (:alpha, :beta, :alpha_civ, :beta_civ, :board)");
    
    $alpha = $uid;
    $beta = NULL;
    $alpha_civ = "clothes";
    $beta_civ = "people";
    
    if (rand(0,1) == 0) {
      $alpha = NULL;
      $beta = $uid;
    }
    
    $board = "                                                                ";
    $board = fillBoardCiv($board, $alpha_civ, TRUE);
    $board = fillBoardCiv($board, $beta_civ, FALSE);
    $stmt->bindParam(":alpha", $alpha, PDO::PARAM_INT);
    $stmt->bindParam(":beta", $beta, PDO::PARAM_INT);
    $stmt->bindParam(":alpha_civ", $alpha_civ, PDO::PARAM_STR);
    $stmt->bindParam(":beta_civ", $beta_civ, PDO::PARAM_STR);
    $stmt->bindParam(":board", $board, PDO::PARAM_STR);
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