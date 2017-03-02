$(document).ready(function() {
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $("#create-note").click(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: './php/db_connect.php',
            dataType: 'json',

            success: function(obj, textstatus) {
                if (!('error' in obj)) {
                    console.info(obj.success);
                    yourVariable = obj.success;
                } else {
                    console.log("Error with php");
                }
            }
        });
    });

    $("#create-account").click(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: './php/account.php',
            dataType: 'json',
            data: {
                operation: "create",
                FLAG: 1,
                EMAIL: "test@email.com",
                PASSWORD: "Password1",
                DISPLAYNAME: "Test"
            },

            success: function(obj, textstatus) {
                if ("success" in obj) {
                    console.info("obj.success");
                    console.info(obj.success);
                } else if ("error" in obj) {
                    console.info("obj.error");
                    console.info(obj.error);
                }
            }
        });
    });

    $("#log-in").click(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: './php/account.php',
            dataType: 'json',
            data: {
                operation: "login",
                EMAIL: "test@email.com",
                PASSWORD: "Password1"
            },

            success: function(obj, textstatus) {
                if ("success" in obj) {
                    console.info("obj.success");
                    console.info(obj.success);
                } else if ("error" in obj) {
                    console.info("obj.error");
                    console.info(obj.error);
                }
            }
        });
    });
});
