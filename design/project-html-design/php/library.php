<?php
	function concat($string, $stringToConcat, $separator) {
		if (is_null($stringToConcat) || $stringToConcat == "") {
			return "";
		} else {
			if (is_null($string)) {
				$string = "";
			}

			if (is_null($separator)) {
				$separator = " ";
			}

			if ($string == "") {
				return $stringToConcat;
			} else {
				return $string . $separator . $stringToConcat;
			}
		}
	}
?>
