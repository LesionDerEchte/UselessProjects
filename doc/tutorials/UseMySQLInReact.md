# Verbindung zwischen React und MySQL 

## Vorbereitung

Zu Beginn muss in der MySQL Datenbank folgender Befehl ausgeführt werden: 'ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Litec321!';'
Nun muss der Express Server gestartet werden, dazu im Terminal mit cd in den server Ordner gehen. In diesem 'npm run devStart' eingeben, um zu Testen ob der Server läuft im Explorer auf http://localhost:3001/test/ gehen, dort sollte "working!" stehen. In der App.js vom Client ist es außerdem wichtig Axios zu importieren. (import Axios from "axios";)

## Einleitung

Grundsätzlich muss immer mit einer Axios Methode auf http://localhost:3001 zugegriffen werden, dort läuft der Express Server.
Je nachdem was wo gemacht werden soll, muss auf unterschiedliche Verzeichnisse zugegriffen werden.

## Select *

Im Beispiel werden alle User der users Tabelle ausgewählt.
Für ein Select wird Axios.get verwendet und http://localhost:3001/users/select/ wird aufgerufen um alle User aus users zu selecten.
Die Daten sind dannach auf response.data als json gespeichert.
Ganz unten wäre noch eine Möglichkeit die Daten auzugeben.

```
const [userList, setUserList] = useState([]) 

const getAllUsers = () => {
	Axios.get('http://localhost:3001/users/select/').then((response) => {
		setUserList(response.data)
	});
};

<button onClick={getAllUsers}>Select All</button>

{userList.map((val)=> {
	return <h1>Username: {val.username}</h1>
})};
```

Im Backend ausgeführter SQL-Command:

```
SELECT * FROM users
```

## Select

Im Beispiel wird der User "Test1" der users Tabelle ausgewählt.
Grundsätzlich ist das Meiste gleich wie bei Select *, lediglich beim Verzeichnis wird die Variable des gesuchten Users hinzugefügt, dabei ist es wichtig diese Anführungszeichen zu verwenden: `
Es wäre theoretisch auch möglich direkt auf http://localhost:3001/users/select/Test1 zuzugreifen, es ist aber eher unpraktikabel.
Weiters ist es wichtig, die Funktion nicht einfach aufzurüfen sondern die Variable für das Verzeichnis mit zu übergeben. 

```
const [username, setUsername] = useState("Test1")
const [userList, setUserList] = useState([]) 

const getUser = () => {
	Axios.get(`http://localhost:3001/users/select/${username}`).then((response) => {
   		setUserList(response.data)
	});
};

<button onClick={() => {getUser(username)}}>Create</button>
```

Im Backend ausgeführter SQL-Command:

```
SELECT * FROM users WHERE username = {username}
```

## Insert

Im Beispiel wird ein User in die users Tabelle eingefügt.
Für ein Insert wird Axios.post verwendet und http://localhost:3001/users/insert/  wird aufgerufen um einen User einzufügen. Dafür werden die Variablen username, password, mail, firstname, lastname, favclubid und favstadiumid benötigt, diese werden als json übergeben.
.then wird ausgeführt wenn der Insert funktioniert hat, es bietet sich also an, dort einen alert zu machen, um anzuzeigen, dass es funktioniert hat. Dies ist auch bei allen anderen möglich, wird aber bei den Folgenden nicht mehr verwendet.

```
const [username, setUsername] = useState("Test1")
const [password, setPassword] = useState("123")
const [mail, setMail] = useState("test@gmail.com")

const createUser = () => {
	Axios.post('http://localhost:3001/users/insert/', {
       	username: username,
       	password: password,
       	mail: mail,
       	firstname: null,
       	lastname: null,
       	favclubid: null,
		favstadiumid:null
	}).then(() => {
        alert("successful insert");
	});
};

<button onClick={createUser}>Create</button>
```

Im Backend ausgeführter SQL-Command:

```
INSERT INTO users (username, password, mail, firstname, lastname, favclubid, favstadiumid) VALUES ({username}, {password}, {mail}, {firstname}, {lastname}, {favclubid}, {favstadiumid})
```

## Update

Im Beispiel wird das Passwort des Users "Test1" der users Tabelle geändert.
Für ein Select wird Axios.put verwendet und http://localhost:3001/users/update/ wird aufgerufen um das Passwort eines Users zu verändern.
Der Rest ist gleich wie bei Insert

```
const [id, setId] = useState("5")
const [username, setUsername] = useState("Test1")
const [password, setPassword] = useState("1234")
const [mail, setMail] = useState("test@gmail.com")

const updateUser = () => {
	Axios.put('http://localhost:3001/users/update/', {
		id: id
		username: username,
       	password: password,
       	mail: mail,
       	firstname: null,
       	lastname: null,
       	favclubid: null,
		favstadiumid:null
	});
};

<button onClick={updateUser}>Update</button>
```

Im Backend ausgeführter SQL-Command:

```
UPDATE users SET username = {username}, password = {password}, mail = {mail}, firstname = {firstname}, lastname = {lastname}, favclubid = {favclubid}, favstadiumid = {favstadiumid} WHERE id = {id}
```

## Delete

Im Beispiel wird der User "Test1" der users Tabelle gelöscht.
Für ein Delete wird Axios.delete verwendet und http://localhost:3001/users/delete/Test1/ wird aufgerufen um einen User aus users zu löschen.

```
const [username, setUsername] = useState("Test1")

const deleteUser = (username) => {
    Axios.delete(`http://localhost:3001/users/delete/${username}`)
}

<button onClick={() => {deleteUser(username)}}>Delete</button>
```

Im Backend ausgeführter SQL-Command:

```
DELETE FROM users WHERE username = {username}
```

