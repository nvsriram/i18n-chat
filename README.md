# i18n Chat

 A real-time asynchronous chat application that transcends language barriers

## :bulb: Inspiration

- Most chatroom applications have very limited multi-lingual support.
- The ones which have more support usually require you to install their app, or sign up, or go through an elaborate onboarding process

_What if all you wanted to do was practice your Duolingo skills with your friend(s) via a simple web application that is easy to setup and does not store any of your potentially embarassing linguistic efforts?_ :wink:

Look no further as this web application does exactly that! ;)

##  ✨ Key Features

- Allows users to choose their preferred langauge and chat in it
- Translates in real-time all other chat messages to chosen preferred language regardless of the source language of the message
- Supports creation of multiple chat rooms with multiple users at the same time without needing to sign-in
- Generates a unique avatar based on the username to provide visual aid in the chatroom
- Animated chat background that changes based on the number of active languages in the chatroom
- Deletes the chatroom along with all its chat messages once the chatroom is inactive (when all users have left the chatroom) to ensure no user privacy is breached

## 💻 Tech Stack

<ol>
 <li><details>
  <summary>Backend</summary>

  - The backend is setup using Django
  - It also uses [Django Channels](https://channels.readthedocs.io/en/stable/) to make use of WebSockets
  - Models:
    | Name         | Description                     | Fields                                                        
    | ------------ | ------------------------------- | --
    | `ChatUser`   | This represents the chat user.  | `name`: username of the chat user in the chat room.           
    |              |                                 | `lang`: chosen preferred langauge of the user.                
    | `Message`    | This represents a chat message. | `author`: user who posted the chat message.                   
    |              |                                 | `room`: name of the `Room` where the chat message was posted. 
    |              |                                 | `content`: text content of the chat message.                  
    |              |                                 | `lang`: chosen preferred langauge of the user.                
    |              |                                 | `timestamp`: backend server timestamp of the received message.
    | `Room`       | This represents a chat room.    | `name`:  identifier of the chat room.                         
    |              |                                 | `users`: list of `ChatUser`s that are a part of the chat room.
  - Websocket API route: `/ws/chat/<Room Name>`
  - On `connect`:
    - Creates chat room if not done so previously
    - Adds the user to the chat room group
  - On `disconnect`:
    - Removes the user from the chat room group
    - Deletes the chat room if all users have left the chat room
  - On `send`:
    - Sends JSON data with `msg_type` ("joined" | "leave" | "message"), `message` (text content if "message" `msg_type`), `user_id`, `username`, `lang` (chosen preferred language), `timestamp` (backend server timestamp of event)
  - On `receive`:
    - Performs the appropriate action based on the `msg_type` of the incoming JSON data
    - Transmits the received event to the entire chat room by performing a `send`
    </details></li>
    <li><details>
    <summary>Frontend</summary>
    
    - The frontend is setup using React - Typescript using [Vite](https://vitejs.dev/) as a SPA.
    - The `JoinRoom` component allows the user to enter the chat room they wish to join (or create), their name, and their preferred language and join the chat room.
    - The `Chatroom` component allows the user to chat and displays the chat room events and translated chat messages of everyone else in the chat room. Users can optionally toggle the Translation switch to have the chat messages be displayed without translation.
     
    </details></li>
    <li><details><summary>Database</summary>
    
     - Currently the database is a SQLite3 DB
     - The database would only need to store the messages and events for a single chat room session. Hence, high database scalability is not a requirement.
     </details></li>
   </ol>
    
  ## 🛠️ Workflow

1. When the user tries to join a new chat room, the client initiates a WebSocket connection with the server using the `/ws/chat/<Room Name>` route
2. The server accepts the `connect` request, creates the chat room and adds the user to the chat room
3. When the client connects, it sends a "joined" `msg_type` message to the server
4. The server `receive`s the message, generates the `timestamp`, and transmits the "joined" message to the entire chat room
5. The client receives the "joined" message and displays it in the `Chatroom` component
6. When the user sends a message, the client send a "message" `msg_type` message to the server
7. The server `receives`s the message, generates the `timestamp`, and transmits the "message" message to the entire chat room
8. The client receives the "message" message and displays it in the `Chatroom` component (translating to the user's chosen `lang` based on the Translation switch)
9. When the client disconnects, the server accepts the `disconnect` request, generates the `timestamp` and transmits the "leave" message to the entire chat room
10. Once all users have left the chat room, the chat room is deleted

## 🧑‍💻 Getting Started

### Backend

1. Navigate to the `django` directory and install all dependencies using `pip install -r requirements.txt` <br />**NOTE:** Highly recommend using `venv` for the backend setup
2. Run `python manage.py makemigrations` followed by `python manage.py migrate` to create the tables in the SQLite3 DB and migrate
3. Run `python manage.py runserver` to start the backend Django server

### Frontend

1. Navigate to the `react/chat` directory and install all dependencies using `npm install`
2. Create a `.env` file and add the following to it:
```
VITE_SERVER_URL='127.0.0.1:8000' // replace it with the backend server URL
```
3. Run `npm run dev` to start the frontend server (defaults to `http://localhost:5173`)

