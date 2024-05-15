build
```bash
docker build . -t ctnelson1997/cs571-su24-ice-api
docker push ctnelson1997/cs571-su24-ice-api
```

run
```bash
docker pull ctnelson1997/cs571-su24-ice-api
docker run --name=cs571_su24_ice_api -d --restart=always -p 39999:39999 -v /cs571/su24/ice:/cs571 ctnelson1997/cs571-su24-ice-api
```
