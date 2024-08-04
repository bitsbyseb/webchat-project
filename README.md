# **Webchat Project by Johan Puentes**
Hello everyone, this is a short project in order to learn
the fundamental items about websockets, i have been learning
socket.io by a platzi course, so this project was made to
challenge myself to learn something new, i'd like that you
push your changes and mark this repository with a star.

## **How to run the project:**

* clone this project using git:
```
git clone https://github.com/bitsbyseb/webchat-project.git
```

* then, get in that folder:
```
cd ./webchat-project
```

* and run the project, and enjoy it:
```
node --run start
```

> if you want to share this project in a local network,follow this steps

* check your IPv4 address, in windows you do it using the "ipconfig" command in a terminal, then go to the project folder and search the index.js file inside src folder, change the value of host constant to your IPv4 address, like this:

```javascript
const host = "192.168.0.4";
```

and finally, run the project:
```
node --run start
```

now, you can visit the project in every device connected to your local network and write messages between your friends or family.