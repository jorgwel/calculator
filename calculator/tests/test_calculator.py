import threading
import unittest

from selenium import webdriver

from calculator.server.api import app
from calculator.server.server import Server


class CalculatorActions(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.start_test_server()

    def start_test_server(self):
        self.server = Server(port=3000)
        s = lambda: app.run(server=self.server)
        t = threading.Thread(target=s, args=())
        t.start()

    def test_calculator_exists(self):
        driver = self.driver
        driver.get("http://localhost:3000")
        assert "Hola calculadora" in driver.page_source

    def tearDown(self):
        self.driver.close()
        self.server.stop()


if __name__ == "__main__":
    unittest.main()
