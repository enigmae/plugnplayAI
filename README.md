# plugnplayAI


# Backend

```shell
$ sudo apt install python3-virtualenv
$ virtualenv env
$ source env/bin/activate
(env) $ pip install -r requirements.txt

(env) backend$ uvicorn api:app --host 0.0.0.0 --port 8080 --reload
```
The swagger should be running at http://localhost:8080/docs

Public endpoint running on an EC2 instance: http://3.67.97.55/docs


# Frontend

```
$ npm install
$ npm start
```


# Resources

https://www.assemblyai.com/blog/assemblyai-and-python-in-5-minutes/
