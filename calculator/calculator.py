from server.api import app
from server.server import Server

if __name__ == '__main__':
    server = Server(port=8000)
    app.run(server=server)
