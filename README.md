# plugnplayAI

# Run it

Backend
```shell
$ sudo apt install python3-virtualenv
$ virtualenv env
$ source env/bin/activate
(env) $ pip install -r requirements.txt

(env) backend$ uvicorn backend.api:app --host 0.0.0.0 --port 8080 --reload
```
The swagger should be running at http://0.0.0.0:8080/docs


Frontend
```
$ npm install
$ npm start
```



# Environment

Start a virtual environment
```shell
(base) $ conda create --name env python=3.9
(base) $ conda activate env
(env) $ pip install -r requirements.txt
```

# Resources

https://www.assemblyai.com/blog/assemblyai-and-python-in-5-minutes/
