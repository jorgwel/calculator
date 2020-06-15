from calculator.server.api import app
from calculator.server.server import Server

if __name__ == '__main__':
    server = Server(port=8000)
    app.run(server=server)
