# plugnplayAI

<p align="center">
  <img src="https://github.com/joelescudefont/demo.gif?raw=true" alt="plugnplaing"/>
</p>

Use AI models in a node-based no-code platform to create AI powered projects and workflows.

Built during the 2-day AI Hackathon hosted by AssemblyAI

https://devpost.com/software/plugnplay-ai

https://hackathon.assemblyai.com/


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


# Frontend

```
$ npm install
$ npm start
```

![image](https://user-images.githubusercontent.com/33307/206912348-2f2b8f23-c26e-4824-a423-9243915d4a8e.png)


# Resources

https://www.assemblyai.com/blog/assemblyai-and-python-in-5-minutes/

https://platform.stability.ai/docs/features/text-to-image

https://github.com/rawandahmad698/PyChatGPT
