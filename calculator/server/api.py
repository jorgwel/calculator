from bottle import Bottle, static_file

app = Bottle()


@app.route('/')
def serve_index():
    return static_file('index.html', root='static/')


@app.route('/jquery-1.11.0.min.js')
def serve_jquery():
    return static_file('jquery-1.11.0.min.js', root='static/')


@app.route('/script.js')
def serve_jquery():
    return static_file('script.js', root='static/')


@app.route('/big.min.js')
def serve_jquery():
    return static_file('big.min.js', root='static/')


@app.route('/ui.js')
def serve_jquery():
    return static_file('ui.js', root='static/')


@app.route('/math.operations.js')
def serve_jquery():
    return static_file('math.operations.js', root='static/')


@app.route('/operation.js')
def serve_jquery():
    return static_file('operation.js', root='static/')


@app.route('/calculatorEngine.js')
def serve_jquery():
    return static_file('calculatorEngine.js', root='static/')


@app.route('/calculatorOuterBox.js')
def serve_jquery():
    return static_file('calculatorOuterBox.js', root='static/')
