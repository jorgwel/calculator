import threading
import unittest

from selenium import webdriver

from server.api import app
from server.server import Server

HOME = "http://localhost:3000"
RESULTS_PANEL_ID = 'results_panel'
OPERATIONS = ['plus_button', 'minus_button', 'multiplication_button',
              'division_button', 'clear_button', 'equals_button']
NUMBERS = ['zero_button', 'one_button', 'two_button',
           'three_button', 'four_button', 'five_button',
           'six_button', 'seven_button', 'eight_button',
           'nine_button', 'dot_button']


class CalculatorActions(unittest.TestCase):
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

    def setUp(self):
        print("Testing", self._testMethodName)
        self.click("clear_button")

    def test_calculator_exists(self):
        for id in self.get_calculator_elements_ids():
            self.verify_element_existence_by_id(self.driver, id)
        assert self.get_result() == '0'

    def test_five_plus_five_shows_ten_in_result_panel(self):
        self.click("five_button")
        assert self.get_result() == '5'
        self.click("plus_button")
        self.click("five_button")
        assert self.get_result() == '5'
        self.click("equals_button")
        assert self.get_result() == '10'

    def test_user_can_repeatedly_click_on_equals(self):
        self.click("one_button")
        assert self.get_result() == '1'
        self.click("zero_button")
        assert self.get_result() == '10'
        self.click("equals_button")
        assert self.get_result() == '10'
        self.click("equals_button")
        assert self.get_result() == '10'

    def test_five_then_five_shows_fifty_five_in_result_panel(self):
        self.click("five_button")
        assert self.get_result() == '5'
        self.click("five_button")
        assert self.get_result() == '55'
        self.click("equals_button")
        assert self.get_result() == '55'

    def test_zero_plus_seventeen(self):
        self.click("zero_button")
        assert self.get_result() == '0'
        self.click("plus_button")
        assert self.get_result() == '0'
        self.click("one_button")
        assert self.get_result() == '1'
        self.click("seven_button")
        assert self.get_result() == '17'
        self.click("equals_button")
        assert self.get_result() == '17'

    def test_zero_minus_three(self):
        self.click("zero_button")
        assert self.get_result() == '0'
        self.click("minus_button")
        assert self.get_result() == '0'
        self.click("three_button")
        assert self.get_result() == '3'
        self.click("equals_button")
        assert self.get_result() == '-3'

    def test_zero_dot_two_plus_three_dot_seven(self):
        self.click("zero_button")
        assert self.get_result() == '0'
        self.click("dot_button")
        assert self.get_result() == '0.'
        self.click("two_button")
        assert self.get_result() == '0.2'
        self.click("plus_button")
        assert self.get_result() == '0.2'
        self.click("three_button")
        assert self.get_result() == '3'
        self.click("dot_button")
        assert self.get_result() == '3.'
        self.click("seven_button")
        assert self.get_result() == '3.7'
        self.click("equals_button")
        assert self.get_result() == '3.9'

    def test_zero_dot_two_times_three_dot_seven(self):
        self.click("zero_button")
        assert self.get_result() == '0'
        self.click("dot_button")
        assert self.get_result() == '0.'
        self.click("two_button")
        assert self.get_result() == '0.2'
        self.click("multiplication_button")
        assert self.get_result() == '0.2'
        self.click("three_button")
        assert self.get_result() == '3'
        self.click("dot_button")
        assert self.get_result() == '3.'
        self.click("seven_button")
        assert self.get_result() == '3.7'
        self.click("equals_button")
        assert self.get_result() == '0.74'

    def test_zero_dot_two_times_three_dot_seven(self):
        self.click("zero_button")
        assert self.get_result() == '0'
        self.click("dot_button")
        assert self.get_result() == '0.'
        self.click("two_button")
        assert self.get_result() == '0.2'
        self.click("multiplication_button")
        assert self.get_result() == '0.2'
        self.click("three_button")
        assert self.get_result() == '3'
        self.click("dot_button")
        assert self.get_result() == '3.'
        self.click("seven_button")
        assert self.get_result() == '3.7'
        self.click("equals_button")
        assert self.get_result() == '0.74'

    def test_one_dot_five_divided_by_two(self):
        self.click("one_button")
        assert self.get_result() == '1'
        self.click("dot_button")
        assert self.get_result() == '1.'
        self.click("five_button")
        assert self.get_result() == '1.5'
        self.click("division_button")
        assert self.get_result() == '1.5'
        self.click("two_button")
        assert self.get_result() == '2'
        self.click("equals_button")
        assert self.get_result() == '0.75'

    def test_one_dot_five_minus_one_dot_three(self):
        self.click("one_button")
        assert self.get_result() == '1'
        self.click("dot_button")
        assert self.get_result() == '1.'
        self.click("five_button")
        assert self.get_result() == '1.5'
        self.click("minus_button")
        self.click("one_button")
        assert self.get_result() == '1'
        self.click("dot_button")
        assert self.get_result() == '1.'
        self.click("three_button")
        assert self.get_result() == '1.3'
        self.click("equals_button")
        assert self.get_result() == '0.2'

    def test_user_can_start_a_new_chain_of_operations(self):
        self.click("five_button")
        assert self.get_result() == '5'
        self.click("plus_button")
        self.click("five_button")
        assert self.get_result() == '5'
        self.click("equals_button")
        assert self.get_result() == '10'
        self.click("equals_button")
        assert self.get_result() == '10'
        self.click("plus_button")
        assert self.get_result() == '10'
        self.click("nine_button")
        assert self.get_result() == '9'
        self.click("equals_button")
        assert self.get_result() == '19'

    def test_user_can_type_only_one_dot(self):
        self.click("one_button")
        assert self.get_result() == '1'
        self.click("dot_button")
        assert self.get_result() == '1.'
        self.click("dot_button")
        assert self.get_result() == '1.'
        self.click("five_button")
        assert self.get_result() == '1.5'
        self.click("division_button")
        assert self.get_result() == '1.5'
        self.click("two_button")
        assert self.get_result() == '2'
        self.click("equals_button")
        assert self.get_result() == '0.75'

    def get_result(self):
        return self.get_text(RESULTS_PANEL_ID)

    def click(self, button_id):
        self.driver.find_element_by_id(button_id).click()

    def get_text(self, id):
        return self.driver.find_element_by_id(id).text

    def verify_element_existence_by_id(self, driver, id):
        assert len(driver.find_elements_by_id(id)) == 1

    def get_calculator_elements_ids(self):
        return OPERATIONS + NUMBERS + [RESULTS_PANEL_ID]


if __name__ == "__main__":
    unittest.main()
