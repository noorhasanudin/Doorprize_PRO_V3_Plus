@echo off

:: Open the IP address in Chrome
start chrome "http://127.0.0.1:5000"

:: Run app.py
pip install -r requirements.txt
python app.py



