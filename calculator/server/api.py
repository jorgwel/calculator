from bottle import Bottle, static_file

app = Bottle()


@app.route('/')
def serve_index():
    return static_file('index.html', '../static/')


@app.route('/jquery-1.11.0.min.js')
def serve_jquery():
    return static_file('jquery-1.11.0.min.js', '../static/')


@app.route('/script.js')
def serve_jquery():
    return static_file('script.js', '../static/')


@app.route('/big.min.js')
def serve_jquery():
    return static_file('big.min.js', '../static/')
