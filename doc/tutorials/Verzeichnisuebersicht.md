# Verzeichnisübersicht - Express

Der Befehl ist die SQL Abfrage die im Hintergrund ausgeführt wird

**Testbefehl:** http://localhost:3001/test/

## SELECT *

Adresse: http://localhost:3001/clubs/select/
Benötigt: -
Befehl: SELECT * FROM clubs

Adresse: http://localhost:3001/games/select/
Benötigt: -
Befehl: SELECT * FROM games

Adresse: http://localhost:3001/leagues/select/
Benötigt: -
Befehl: SELECT * FROM leagues

Adresse: http://localhost:3001/stadiums/select/
Benötigt: -
Befehl: SELECT * FROM stadiums

Adresse: http://localhost:3001/ratingtypes/select/
Benötigt: -
Befehl: SELECT * FROM ratingtypes

Adresse: http://localhost:3001/following/select/
Benötigt: -
Befehl: SELECT * FROM following

Adresse: http://localhost:3001/likes/select/
Benötigt: -
Befehl: SELECT * FROM likes

Adresse: http://localhost:3001/ratings/select/
Benötigt: -
Befehl: SELECT * FROM ratings

Adresse: http://localhost:3001/users/select/
Benötigt: -
Befehl: SELECT * FROM users

## INSERT

Adresse: http://localhost:3001/following/insert/
Benötigt: {userid}, {follwingid}
Befehl: INSERT INTO following (userid, follwingid) VALUES ({userid}, {follwingid})

Adresse: http://localhost:3001/likes/insert/
Benötigt: {userid}, {ratingid}
Befehl: INSERT INTO likes (userid, ratingid) VALUES ({userid}, {ratingid})

Adresse: http://localhost:3001/ratings/insert/
Benötigt: {userid}, {gameid}, {typeid}, {rating}, {message}
Befehl: INSERT INTO ratings (userid, gameid, typeid, rating, message) VALUES ({userid}, {gameid}, {typeid}, {rating}, {message})

Adresse: http://localhost:3001/users/insert/
Benötigt: {username}, {password}, {mail}, {firstname}, {lastname}, {favclubid}, {favstadiumid}
Befehl: INSERT INTO users (username, password, mail, firstname, lastname, favclubid, favstadiumid) VALUES ({username}, {password}, {mail}, {firstname}, {lastname}, {favclubid}, {favstadiumid})

## UPDATE

Adresse: http://localhost:3001/ratings/update/
Benötigt: {userid}, {gameid}, {typeid}, {rating}, {message}, {id}
Befehl: UPDATE ratings SET userid = {userid}, gameid = {gameid}, typeid = {typeid}, rating = {rating}, message = {message} WHERE id = {id}

Adresse: http://localhost:3001/users/update/
Benötigt: {username}, {password}, {mail}, {firstname}, {lastname}, {favclubid}, {favstadiumid}, {id}
Befehl: UPDATE users SET username = {username}, password = {password}, mail = {mail}, firstname = {firstname}, lastname = {lastname}, favclubid = {favclubid}, favstadiumid = {favstadiumid} WHERE id = {id}

## DELETE

Adresse: http://localhost:3001/following/delete/${id}
Benötigt: {id}
Befehl: DELETE FROM following WHERE id = {id}

Adresse: http://localhost:3001/likes/delete/${id}
Benötigt: {id}
Befehl: DELETE FROM likes WHERE id = {id}

Adresse: http://localhost:3001/ratings/delete/${id}
Benötigt: {id}
Befehl: DELETE FROM ratings WHERE id = {id}

Adresse: http://localhost:3001/ratings/delete/${username}
Benötigt: {username}
Befehl: DELETE FROM users WHERE username = {username}