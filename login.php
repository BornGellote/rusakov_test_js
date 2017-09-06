<?php 
	if($_POST["log_name"] == "") echo 0;
		else if($_POST["log_name"] == "admin") echo 1;
		else echo 2;
?>