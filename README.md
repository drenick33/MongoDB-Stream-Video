WIP on streaming videos stored in mongoDB.

api uses mongoose and gridfs-stream to get the file

currently it can only read one file, but will be an easy fix to implement.

We can also select where in the video to start by using the range header
