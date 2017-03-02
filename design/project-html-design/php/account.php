<?php
	require_once('db_helper.php');
	require_once('library.php');
    header("Content-Type: application/json");
    $aResult = array();
	#Error and success message used in this file
	$aMessage = array(
		"success0001" => "Account created",
		"error0001" => "Unknown operation variable",
		"error0002" => "Operation variable not set",
		"error0003" => "Database connection error",
		"error0004" => "Missing variable for create operation",
		"error0005" => "Invalid values:",
		"error0006" => "This email is already in use"
	);
	#Check if operation variable is set
	if (isset($_POST["operation"])) {
		#Connect to the database
		$connection = dbConnect();
		if ($connection->connect_error) $aResult["error"] = $aMessage["error0003"];
		#Depending on the operation, create account or log in or log out or edit account
		if ($_POST["operation"] == "create") {
			#Check the necessary variable to create an account
			if (isset($_POST["FLAG"]) && isset($_POST["EMAIL"]) && isset($_POST["PASSWORD"]) && isset($_POST["DISPLAYNAME"])) {
				#Get the variables and trim
				$flag			= $_POST["FLAG"];
				$email			= trim($_POST["EMAIL"]);
				$password		= $_POST["PASSWORD"];
				$displayname	= trim($_POST["DISPLAYNAME"]);
				#Check if the variables are valid
				$invalidValues = "";
				if (!is_numeric($flag))			$invalidValues = concat("", '[$flag]', ",");
				if (!is_string($email))			$invalidValues = concat("", '[$email]', ",");
				if (!is_string($password))		$invalidValues = concat("", '[$password]', ",");
				if (!is_string($displayname))	$invalidValues = concat("", '[$displayname]', ",");
				#If they are valid
				if ($invalidValues == "") {
					#Check if the account already exists
					$getAccountQuery = "SELECT * FROM $TABLE_ACCOUNT WHERE EMAIL = '$email'";
					$getAccountQueryResult = $connection->query($getAccountQuery);
					$aResult["error"] = "Error: " . $query . "<br>" . $connection->error;
					if ($getAccountQueryResult->num_rows == 0) {
						#If it does not exist attempt to create the account
						$hashed_password = password_hash($password, PASSWORD_DEFAULT);
						$insertQuery = "INSERT INTO $TABLE_ACCOUNT (FLAG, EMAIL, PASSWORD, DISPLAYNAME) VALUES ($flag,'$email','$hashed_password','$displayname')";
						if ($connection->query($insertQuery) === TRUE) {
							#Return a success message
							$aResult["success"] = $aMessage["success0001"];
						} else {
							#Return an error message with the query information
							$aResult["error"] = "Error: " . $query . "<br>" . $connection->error;
						}
					} else {
						#Return an error message if account already exists
						$aResult["error"] = $aMessage["error0006"];
					}
				} else {
					#Return an error message if the values are invalid
					$aResult["error"] = $aMessage["error0005"] . $invalidValues;
				}
			} else {
				#Return an error message if a variable is missing
				$aResult["error"] = $aMessage["error0004"];
			}
		} elseif ($_POST["operation"] == "login") {
			/*if (isset($_POST["EMAIL"]) && isset($_POST["PASSWORD"])) {
				$email			= $_POST["EMAIL"];
				$password		= $_POST["PASSWORD"];

				$invalidValues = "";
				if (!is_string($email))			$invalidValues = concat("", '[$email]', ",");
				if (!is_string($password))		$invalidValues = concat("", '[$password]', ",");

				if ($invalidValues == "") {
					$query = "INSERT INTO accounts(FLAG, EMAIL, PASSWORD, DISPLAYNAME) VALUES ($flag,'$email','$hashed_password','$displayname')";
					$hashed_password = password_hash($password, PASSWORD_DEFAULT);
					if ($connection->query($query) === TRUE) {

					} else {
						$aResult["error"] = "Error: " . $query . "<br>" . $connection->error;
					}
				} else {
					$aResult["error"] = $aMessage["error0005"] . $invalidValues;
				}
			} else {
				$aResult["error"] = $aMessage["error0004"];
			}*/
		} elseif ($_POST["operation"] == "editprofile") {

		} else {
			$aResult["error"] = $aMessage["error0001"];
		}
		#Close connection to the database
		dbClose($connection);
	} else {
		$aResult["error"] = $aMessage["error0002"];
	}

	#echo json_encode($aResult);
?>
