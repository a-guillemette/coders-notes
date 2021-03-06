@echo off

setlocal EnableDelayedExpansion

SET user="admin"
SET pwd="Password1"
SET /P nrun=Start scripts from number (###):

IF "!nrun!" == "" (
	echo No number provided
	pause
	exit
)

for %%a in (*.js) do (
    set filename=%%a
    set number=!filename:~0,3!

    IF /I !number! GEQ !nrun! (
        echo Run script #!number!
        mongo codersnotes --username "!user!" --password "!pwd!" "%%a"
		echo.
		echo.
    )
)
pause