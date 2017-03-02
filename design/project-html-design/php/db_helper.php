<?php
define("DBSERVERNAME", "");
define("DBUSERNAME", "");
define("DBPASSWORD", "");
$TABLE_ACCOUNT = "accounts"

function dbConnect() {
	return new mysqli(DBSERVERNAME, DBUSERNAME, DBPASSWORD, DBUSERNAME);
}

function dbClose($conn) {
	mysqli_close($conn);
}

function insert() {

}

function update() {

}

function select() {

}
?>
