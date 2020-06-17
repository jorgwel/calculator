import unittest

from tests.server_test import ServerTest

HOME = "http://localhost:3000"
RESULTS_PANEL_ID = 'results_panel'
OPERATIONS = {'+': 'plus_button', '-': 'minus_button',
              '*': 'multiplication_button', '/': 'division_button',
              'C': 'clear_button', '=': 'equals_button'}
NUMBERS = {'0': 'zero_button', '1': 'one_button', '2': 'two_button',
           '3': 'three_button', '4': 'four_button', '5': 'five_button',
           '6': 'six_button', '7': 'seven_button', '8': 'eight_button',
           '9': 'nine_button', '.': 'dot_button'}
ALL_BUTTONS = {**OPERATIONS, **NUMBERS}


class CalculatorActions(ServerTest):

    def setUp(self):
        print("Testing", self._testMethodName)

    def tearDown(self):
        self.click("C")

    def test_calculator_exists(self):
        for id in self.get_calculator_elements_ids():
            self.verify_element_existence_by_id(self.driver, id)
        assert self.get_result() == '0'

    def test_cannot_be_zeros_to_the_left_of_any_digit(self):
        self.checkClicks([
            ["0", "0"],
            ["0", "0"],
            ["1", "1"],
            ["=", "1"]
        ])

    def test_five_plus_five_shows_ten_in_result_panel(self):
        self.checkClicks([
            ["5", "5"],
            ["+", "5"],
            ["5", "5"],
            ["=", "10"]
        ])

    def test_user_can_repeatedly_click_on_equals(self):
        self.checkClicks([
            ["1", "1"],
            ["0", "10"],
            ["=", "10"],
            ["=", "10"]
        ])

    def test_five_then_five_shows_fifty_five_in_result_panel(self):
        self.checkClicks([
            ["5", "5"],
            ["5", "55"],
            ["=", "55"]
        ])

    def test_zero_plus_seventeen(self):
        self.checkClicks([
            ["0", "0"],
            ["+", "0"],
            ["1", "1"],
            ["7", "17"],
            ["=", "17"]
        ])

    def test_zero_minus_three(self):
        self.checkClicks([
            ["0", "0"],
            ["-", "0"],
            ["3", "3"],
            ["=", "-3"]
        ])

    def test_zero_dot_two_plus_three_dot_seven(self):
        self.checkClicks([
            ["0", "0"],
            [".", "0."],
            ["2", "0.2"],
            ["+", "0.2"],
            ["3", "3"],
            [".", "3."],
            ["7", "3.7"],
            ["=", "3.9"]
        ])

    def test_zero_dot_two_times_three_dot_seven(self):
        self.checkClicks([
            ["0", "0"],
            [".", "0."],
            ["2", "0.2"],
            ["*", "0.2"],
            ["3", "3"],
            [".", "3."],
            ["7", "3.7"],
            ["=", "0.74"]
        ])

    def test_one_dot_five_divided_by_two(self):
        self.checkClicks([
            ["1", "1"],
            [".", "1."],
            ["5", "1.5"],
            ["/", "1.5"],
            ["2", "2"],
            ["=", "0.75"]
        ])

    def test_one_dot_five_minus_one_dot_three(self):
        self.checkClicks([
            ["1", "1"],
            [".", "1."],
            ["5", "1.5"],
            ["-", "1.5"],
            ["1", "1"],
            [".", "1."],
            ["3", "1.3"],
            ["=", "0.2"]
        ])

    def test_user_can_start_a_new_chain_of_operations(self):
        self.checkClicks([
            ["5", "5"],
            ["+", "5"],
            ["5", "5"],
            ["=", "10"],
            ["=", "10"],
            ["+", "10"],
            ["9", "9"],
            ["=", "19"]
        ])

    def test_user_can_type_only_one_dot(self):
        self.checkClicks([
            ["1", "1"],
            [".", "1."],
            [".", "1."],
            [".", "1."],
            ["5", "1.5"],
            ["/", "1.5"],
            ["2", "2"],
            ["=", "0.75"]
        ])

    def get_result(self):
        return self.get_text(RESULTS_PANEL_ID)

    def click(self, button):
        self.driver.find_element_by_id(ALL_BUTTONS[button]).click()

    def get_text(self, id):
        return self.driver.find_element_by_id(id).text

    def verify_element_existence_by_id(self, driver, id):
        assert len(driver.find_elements_by_id(id)) == 1

    def get_calculator_elements_ids(self):
        return list(OPERATIONS.values()) + list(NUMBERS.values()) + [RESULTS_PANEL_ID]

    def checkClicks(self, clicks):
        for c in clicks:
            button = c[0]
            expected = c[1]
            try:
                self.click(button)
                assert self.get_result() == expected
            except:
                print(f"An exception checking click: {button},{expected}")
                raise


if __name__ == "__main__":
    unittest.main()
