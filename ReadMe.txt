how to run the server:
- Download the code.
- Make sure you have Mongo DB installed on your system.
- Run the following commands
    - mongod (in seperate terminal window)
    - npm init
    - npm start
- You should see this message on console ("bird registry app listening on port 3000!")
- Now your server is up and running.

APIs you can test on this REST server:
    - GET /birds - List all birds
    - POST /birds - Add a new bird
    - GET /birds/{id} - Get details on a specific bird
    - DELETE /birds/{id} - Delete a bird by id