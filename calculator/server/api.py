from bottle import Bottle, static_file

app = Bottle()


@app.route('/index.css')
def serve_css():
    return static_file('index.css', root='static/')


@app.route('/')
def serve_index():
    return static_file('index.html', root='static/')


@app.route('/jquery-1.11.0.min.js')
def serve_jquery():
    return static_file('jquery-1.11.0.min.js', root='static/externallibs/')


@app.route('/main.js')
def serve_jquery():
    return static_file('main.js', root='static/')


@app.route('/big.min.js')
def serve_jquery():
    return static_file('big.min.js', root='static/externallibs/')


@app.route('/alu.js')
def serve_jquery():
    return static_file('alu.js', root='static/calculatorlibs/')


@app.route('/operation.js')
def serve_jquery():
    return static_file('operation.js', root='static/calculatorlibs/')


@app.route('/calculatorEngine.js')
def serve_jquery():
    return static_file('calculatorEngine.js', root='static/calculatorlibs/')


@app.route('/calculatorOuterBox.js')
def serve_jquery():
    return static_file('calculatorOuterBox.js', root='static/calculatorlibs/')


@app.route('/numberBuilder.js')
def serve_jquery():
    return static_file('numberBuilder.js', root='static/calculatorlibs/')


@app.route('/calculatorBuilder.js')
def serve_jquery():
    return static_file('calculatorBuilder.js', root='static/calculatorlibs/')
