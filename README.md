# To setup backend

```cd backend
npm install express
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
npm install axios
```

## Return back to the root of the project
``` cd .. ```

# To run the app

```
cd backend
node src/server.js
cd ../frontend
npm run dev
```