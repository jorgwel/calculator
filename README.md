# Web Calculator
This is a classic calculator which is displayed on a web page. It has a small backend in python **bottle** to deliver static files. Uses **big.js** for calculations. 

# How to start?


### 0. Setup
- Clone the repo:

        git clone https://github.com/jorgwel/calculator.git
        
- Download gecko driver from here: 

        https://github.com/mozilla/geckodriver/releases

  unzip it and put `geckodriver` file in `/usr/bin` (or somewhere in your path)
- Install requirements: 

        pip3 install -r requirements.txt
    
### 1. Go to calculator/calculator folder
    cd calculator/calculator
### 2. Run selenium tests (you need Firefox installed)
    python3 -m unittest discover -s tests/
### 3. Start the calculator
    python3 -m calculator
### 4. You can open localhost:8000 in your web browser 
- Use your mouse, your fingers (in touchscreen or phone) or your keyboard (use C key for clear).  

# Changelog
- V.05 User can type calculator's numbers and symbols in her physical keyboard
    - Refactors & BugFixing
- V.04 When an operation ends in error (as divide by zero) a signifier is shown in screen
    - Refactors & BugFixing
- V.03 User can delete digits if he has made a mistake
    - Refactors & BugFixing
- V.02 Received some CSS love
    - Refactors & BugFixing
- V.01 Minimal implementation working
    - Refactors & BugFixing
    
## Note about Tests
- Tests are being done in selenium-python

# Small diagram for classes 
- The software was taken to a place where the problem was fully understood, using TDD. Then with tests taking care of my back, I refactored it many times to take it to this structure.


                    ,----.                                                        
                    |Main|                                                        
                    |----|                                                        
                    |----|                                                        
                    `----'                                                        
                       |                                                          
                       |                                                          
             ,-----------------.                                                  
             |CalculatorBuilder|                                                  
             |-----------------|                                                  
             |-----------------|                                                  
             `-----------------'                                                  
                                                                                  
    ,----------------.   ,--------------.                                         
    |CalculatorEngine|   |EngineCircuits|                                         
    |----------------|   |--------------|                                         
    |----------------|---|--------------|                                         
    `----------------'   `--------------'                                         
                                 |                                                
                                                                                  
    ,---------.  ,---.   ,-------------.   ,----------------.   ,----------------.
    |Operation|  |ALU|   |NumberBuilder|   |NumberDismantler|   |CalculatorScreen|
    |---------|  |---|   |-------------|   |----------------|   |----------------|
    |---------|  |---|   |-------------|   |----------------|   |----------------|
    `---------'  `---'   `-------------'   `----------------'   `----------------'


# Small diagram of project

        
                                     ,------.                  
                                     |jQuery|                  
                                     |------|                  
                                     |------|                  
                                     `------'                  
                                         |                     
                                         |                     
    ,-------------.  ,---.   ,---------------------.   ,------.
    |Color Palette|  |CSS|   |Calculator WebPage 🖩|   |Big.js|
    |-------------|--|---|---|---------------------|---|------|
    |-------------|  |---|   |---------------------|   |------|
    `-------------'  `---'   `---------------------'   `------'
                                         |                     
                                     ,------.                  
                                     |Bottle|                  
                                     |------|                  
                                     |------|                  
                                     `------'                  
                                         |                     
         ,--------.   ,--------.   ,---------.   ,---.         
         |Selenium|   |Unittest|   |Python 🐍|   |TDD|
         |--------|---|--------|---|---------|---|---|
         |--------|   |--------|   |---------|   |---|
         `--------'   `--------'   `---------'   `---'         