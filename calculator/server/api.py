from bottle import Bottle, static_file

app = Bottle()


@app.route('/')
def serve_static_file():
    return static_file('index.html', '../static/')
