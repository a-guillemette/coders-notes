<?php
	$servername = "";
	$username = "";
	$password = "";

    header('Content-Type: application/json');

    $aResult = array();
	// Create connection
	$conn = new mysqli($servername, $username, $password);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	
	$aResult['success'] = "Connected successfully";

    echo json_encode($aResult);
?>
