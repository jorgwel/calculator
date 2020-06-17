import unittest

from tests.calculator_facade import CalculatorFacade
from tests.clicks_checker import ClicksChecker
from tests.server_test import ServerTest


class CalculatorActions(ServerTest):

    def setUp(self):
        print("Testing", self._testMethodName)
        self.calculator_facade = CalculatorFacade(self.driver)
        self.checker = ClicksChecker(self.calculator_facade)

    def tearDown(self):
        self.calculator_facade.click("C")

    def test_calculator_has_all_components_available(self):
        for id in self.calculator_facade.get_calculator_elements_ids():
            self.verify_element_existence_by_id(id)
        assert self.calculator_facade.get_result() == '0'
        assert self.calculator_facade.get_error() == ''

    def test_calculator_can_delete_from_first_number(self):
        self.check([
            ["1", "1"],
            ["<", "0"]
        ])

    def test_division_by_zero_shows_error(self):
        self.check([
            ["1", "1"],
            ["/", "1"],
            ["0", "0"],
            ["=", "0", "E"],
        ])

    def test_calculator_can_delete_from_second_number(self):
        self.check([
            ["5", "5"],
            ["+", "5"],
            ["9", "9"],
            ["<", "0"],
            ["6", "6"],
            ["=", "11"]
        ])

    def test_calculator_can_delete_after_an_operation(self):
        self.check([
            ["5", "5"],
            ["+", "5"],
            ["5", "5"],
            ["=", "10"],
            ["<", "0"],
            ["1", "1"],
            ["+", "1"],
            ["1", "1"],
            ["=", "2"]
        ])

    def test_cannot_be_zeros_to_the_left_of_any_digit(self):
        self.check([
            ["0", "0"],
            ["0", "0"],
            ["1", "1"],
            ["=", "1"]
        ])

    def test_five_plus_five_shows_ten_in_result_panel(self):
        self.check([
            ["5", "5"],
            ["+", "5"],
            ["5", "5"],
            ["=", "10"]
        ])

    def test_user_can_repeatedly_click_on_equals(self):
        self.check([
            ["1", "1"],
            ["0", "10"],
            ["=", "10"],
            ["=", "10"]
        ])

    def test_five_then_five_shows_fifty_five_in_result_panel(self):
        self.check([
            ["5", "5"],
            ["5", "55"],
            ["=", "55"]
        ])

    def test_zero_plus_seventeen(self):
        self.check([
            ["0", "0"],
            ["+", "0"],
            ["1", "1"],
            ["7", "17"],
            ["=", "17"]
        ])

    def test_zero_minus_three(self):
        self.check([
            ["0", "0"],
            ["-", "0"],
            ["3", "3"],
            ["=", "-3"]
        ])

    def test_zero_dot_two_plus_three_dot_seven(self):
        self.check([
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
        self.check([
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
        self.check([
            ["1", "1"],
            [".", "1."],
            ["5", "1.5"],
            ["/", "1.5"],
            ["2", "2"],
            ["=", "0.75"]
        ])

    def test_one_dot_five_minus_one_dot_three(self):
        self.check([
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
        self.check([
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
        self.check([
            ["1", "1"],
            [".", "1."],
            [".", "1."],
            [".", "1."],
            ["5", "1.5"],
            ["/", "1.5"],
            ["2", "2"],
            ["=", "0.75"]
        ])

    def verify_element_existence_by_id(self, id):
        try:
            assert len(self.driver.find_elements_by_id(id)) == 1
        except:
            print(f"Element with id was not found: {id}")
            raise

    def check(self, clicks):
        self.checker.check(clicks)


if __name__ == "__main__":
    unittest.main()
