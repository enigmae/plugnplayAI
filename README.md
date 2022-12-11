# plugnplayAI


# Backend

```shell
$ sudo apt update
$ sudo apt install python3.9
$ sudo apt install python3-virtualenv

$ virtualenv --python="/usr/bin/python3.9" env
$ source env/bin/activate
(env) $ pip install -r requirements.txt

(env) backend$ uvicorn api:app --host 127.0.0.1 --port 8000 --reload
```
The swagger should be running at http://localhost:8000/docs

Public endpoint running on an EC2 instance with SSL: https://18.193.101.239/docs

Note: On Ubuntu make sure you got `sudo apt-get install portaudio19-dev` before installing `pyaudio`.


# Frontend

```
$ npm install
$ npm start
```


# Resources

https://www.assemblyai.com/blog/assemblyai-and-python-in-5-minutes/

https://platform.stability.ai/docs/features/text-to-image
