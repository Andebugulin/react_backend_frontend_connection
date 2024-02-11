# To setup backend

```
cd backend
npm install
sudo systemctl start mongodb.service
vim .env
```

### Add those lines to the file:
```
DATABASE_URL=mongodb://localhost/datka
PORT=3001
```


## Return back to the root of the project
```
cd .. 
```

# To setup frontend

```
cd frontend
npm install
```

## Return back to the root of the project
```
cd ..
```

# To run the app

```
cd backend
node src/server.js
```
create new terminal
```
cd ../frontend
npm run dev
```
