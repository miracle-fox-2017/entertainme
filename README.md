# entertainme

## API enpoint
| Endpoint | HTTP | Requirement | Description |
|----------|------|-------------|-------------|
| :3000    | GET  | -           | get entertainme |
| :3001/ver | GET | - | get movie version |
| :3001/movie | GET | - | get all movie |
| :3001/movie | POST | {json} | post new movie |
| :3001/movie/:id | PUT | params.id, {json} | edit specific movie |
| :3001/movie/:id | DELETE | params.id | delete specific movie |
| :3002/ver | GET | - | get tv version |
| :3002/tv | GET | - | get all tv |
| :3002/tv | POST | {json} | post new tv |
| :3002/tv/:id | PUT | params.id, {json} | edit specific tv |
| :3002/tv/:id | DELETE | params.id | delete specific tv |


## use this app?
1. Start movie server run on port 3001
```
$ cd movies
$ mv .env-template .env
$ yarn install
$ yarn dev
```

2. Start tv server run on port 3002
```
$ cd tv
$ mv .env-template .env
$ yarn install
$ yarn dev
```

3. Start redis server
```
$ redis-server
```

4. Start entertain-me server run on port 3000
```
$ cd entertain-me
$ yarn install
$ yarn dev
```

5. :rocket:
