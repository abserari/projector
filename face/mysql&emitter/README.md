

### emitter
[detail install](https://www.yuque.com/abser/process/rfwpqu)

```bash
docker run -d --name emitter -p 8080:8080 -e EMITTER_LICENSE=uppD0PFIcNK6VY-7PTo7uWH8EobaOGgRAAAAAAAAAAI --restart=unless-stopped emitter/server
```

secret ：JUoOxjoXLc4muSxXynOpTc60nWtwUI3o


### mysql
```bash
docker-compose up -d
```