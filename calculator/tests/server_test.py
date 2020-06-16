import threading
import unittest

from selenium import webdriver
from server.api import app
from server.server import Server

HOME = "http://localhost:3000"


class ServerTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Firefox()
        cls.start_test_server()
        cls.driver.get(HOME)

    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.server.stop()

    @classmethod
    def start_test_server(cls):
        cls.server = Server(port=3000)
        s = lambda: app.run(server=cls.server)
        t = threading.Thread(target=s, args=())
        t.start()
