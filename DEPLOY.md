# DEPLOY

# LOCAL

1. Ensure latest Ubuntu updates

```sh
$ sudo apt-get autoclean && sudo apt-get autoremove && sudo apt-get update && sudo apt-get upgrade -y
```

2. Install `curl`, `make`, `g++`, `libkrb5-dev` and `git`

```sh
$ sudo apt-get install curl make g++ libkrb5-dev git -y
```

3. Install node version manager

```sh
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

4. Install latest available Node.js

```sh
$ nvm install node
```

5. Install PM2

```sh
$ npm install pm2 -g
```

6. Install redis-server

```sh
$ sudo add-apt-repository ppa:chris-lea/redis-server
$ sudo apt-get update && sudo apt-get upgrade -y
$ sudo apt-get install redis-server -y
```

7. Install MongoDB for your Ubuntu version.

```sh
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
$ sudo apt-get update && sudo apt-get upgrade -y
$ sudo apt-get install -y mongodb-org
```

8. Enable MongoDB to automatically startup when systems boots up

```sh
$ sudo shutdown -r now
$ sudo systemctl daemon-reload
$ sudo systemctl start mongod
$ sudo systemctl enable mongod
```

9. Deploy `ewea` into your server

```sh
$ git clone https://github.com/CodeTanzania/ewea.git
$ cd ewea
$ npm install
```

10. Copy and ensure correct environment variables

```sh
$ cp .env.example .env
```

11. Setup `ewea` into your server

```sh
$ npm run process:start
$ npm run process:save
$ npm run process:startup

You will receive directions to finalize setup by copy/paste given commands.
```

12. Whenever `source codes` updated make sure you update `running processes` by:

```sh
$ npm run process:reload
$ npm run process:restart
```

13. Verify everything is working

```sh
$ sudo shutdown -r now (optional)
$ curl http://0.0.0.0:5000
```
