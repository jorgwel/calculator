# Web Calculator
This is a classic calculator which is displayed on a web page. Has a small backend in python bottle which works to deliver static files. Uses jQuery and big.js. 

# How to start?
### 0. Get latest geckodriver for Firefox
a. Download gecko driver from here: https://github.com/mozilla/geckodriver/releases

b. Put `geckodriver` file in `/usr/bin` (or somewhere in your path)
### 1. Setup requirements
    pip3 install requirements.txt
### 2. Go to calculator/calculator folder
    cd calculator/calculator
### 3. Run tests (you need latest Firefox installed)
    python3 -m unittest discover -s tests/
### 4. Start the calculator
    python3 -m calculator
**You can open localhost:8000 in your web browser now.**
