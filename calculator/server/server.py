from wsgiref.simple_server import make_server, WSGIRequestHandler

from bottle import ServerAdapter

'''
Tomé el approach de:
https://stackoverflow.com/questions/11282218/bottle-web-framework-how-to-stop
'''


class Server(ServerAdapter):
    def run(self, handler):
        if self.quiet:
            class QuietHandler(WSGIRequestHandler):
                def log_request(*args, **kw): pass

            self.options['handler_class'] = QuietHandler
        self.server = make_server(self.host, self.port, handler, **self.options)
        self.server.serve_forever()

    def stop(self):
        self.server.shutdown()
