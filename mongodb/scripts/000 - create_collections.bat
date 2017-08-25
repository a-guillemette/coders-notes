@Echo Off
SET user="codersnotes-api"
SET pwd="Password1"
SET /P nrun=Start scripts from number (###):
mongo codersnotes --username %user% --password %pwd% "001 - theme.collection.js"
mongo codersnotes --username %user% --password %pwd% "002 - status.collection.js"
pause