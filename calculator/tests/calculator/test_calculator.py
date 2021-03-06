import unittest

from .calculator_facade import CalculatorFacade
from .calculator_events_checker import CalculatorEventsChecker
from ..server_test import ServerTest

from .calculator_facade import PrintedLogType

HOME = "http://localhost:3000"

class CalculatorActions(ServerTest):

    @classmethod
    def get_page(cls):
        return HOME

    def setUp(self):
        print("Testing", self._testMethodName)
        self.calculator_facade = CalculatorFacade(self.driver)
        self.checker = CalculatorEventsChecker(self.calculator_facade)

    def tearDown(self):
        self.calculator_facade.click("C")

    def test_calculator_has_all_components_available(self):
        for id in self.calculator_facade.get_calculator_elements_ids():
            self.verify_existence_by_id(id)
        assert self.calculator_facade.get_result() == '0'
        assert self.calculator_facade.get_error() == ''

    def test_calculator_saves_operations(self):
        self.checker.check_clicks([
            ["+", "0"],
            ["1", "1"],
            ["=", "1"],
            ["C", "0"],
            ["+", "0"],
            ["2", "2"],
            ["=", "2"],
        ])
        self.checker.check_logs([
            ["0+1", PrintedLogType.NORMAL],
            ["=1", PrintedLogType.NORMAL],
            ["0+2", PrintedLogType.NORMAL],
            ["=2", PrintedLogType.NORMAL]
        ])

    def test_calculator_saves_operations(self):
        self.checker.check_clicks([
            ["1", "1"],
            ["+", "1"],
            ["2", "2"],
            ["=", "3"],
            ["9", "9"],
            ["9", "99"],
            ["/", "99"],
            ["0", "0"],
            ["=", "0", "E"],
            ["9", "9"],
            ["9", "99"],
            ["=", "1"],
        ])

        self.checker.check_logs([
            ["1+2", PrintedLogType.NORMAL],
            ["=3", PrintedLogType.NORMAL],
            ["99/0", PrintedLogType.ERROR],
            ["Division by zero", PrintedLogType.ERROR],
            ["99/99", PrintedLogType.NORMAL],
            ["=1", PrintedLogType.NORMAL]
        ])

    def test_calculator_receives_keyboard_events(self):
        self.checker.check_typed_chars([
            ["0", "0"],
            ["1", "1"],
            ["2", "12"],
            ["3", "123"],
            ["4", "1234"],
            ["5", "12345"],
            ["6", "123456"],
            ["7", "1234567"],
            ["8", "12345678"],
            ["9", "123456789"],
            ["0", "1234567890"],
            [".", "1234567890."],
            ["1", "1234567890.1"],
            ["<", "1234567890."],
            ["<", "1234567890"],
            ["+", "1234567890"],
            ["1", "1"],
            ["=", "1234567891"],
            ["-", "1234567891"],
            ["9", "9"],
            ["1", "91"],
            ["=", "1234567800"],
            ["/", "1234567800"],
            ["2", "2"],
            ["=", "617283900"],
            ["*", "617283900"],
            [".", "."],
            ["5", ".5"],
            ["=", "308641950"],
            ["C", "0"]
        ])

    def test_calculator_can_delete_from_first_number(self):
        self.checker.check_clicks([
            ["1", "1"],
            ["<", "0"]
        ])

    def test_division_by_zero_shows_error(self):
        self.checker.check_clicks([
            ["1", "1"],
            ["/", "1"],
            ["0", "0"],
            ["=", "0", "E"],
        ])

    def test_calculator_can_delete_from_second_number(self):
        self.checker.check_clicks([
            ["5", "5"],
            ["+", "5"],
            ["9", "9"],
            ["<", "0"],
            ["6", "6"],
            ["=", "11"]
        ])

    def test_calculator_can_delete_after_an_operation(self):
        self.checker.check_clicks([
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
        self.checker.check_clicks([
            ["0", "0"],
            ["0", "0"],
            ["1", "1"],
            ["=", "1"]
        ])

    def test_five_plus_five_shows_ten_in_result_panel(self):
        self.checker.check_clicks([
            ["5", "5"],
            ["+", "5"],
            ["5", "5"],
            ["=", "10"]
        ])

    def test_user_can_repeatedly_click_on_equals(self):
        self.checker.check_clicks([
            ["1", "1"],
            ["0", "10"],
            ["=", "10"],
            ["=", "10"]
        ])

    def test_five_then_five_shows_fifty_five_in_result_panel(self):
        self.checker.check_clicks([
            ["5", "5"],
            ["5", "55"],
            ["=", "55"]
        ])

    def test_zero_plus_seventeen(self):
        self.checker.check_clicks([
            ["0", "0"],
            ["+", "0"],
            ["1", "1"],
            ["7", "17"],
            ["=", "17"]
        ])

    def test_zero_minus_three(self):
        self.checker.check_clicks([
            ["0", "0"],
            ["-", "0"],
            ["3", "3"],
            ["=", "-3"]
        ])

    def test_zero_dot_two_plus_three_dot_seven(self):
        self.checker.check_clicks([
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
        self.checker.check_clicks([
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
        self.checker.check_clicks([
            ["1", "1"],
            [".", "1."],
            ["5", "1.5"],
            ["/", "1.5"],
            ["2", "2"],
            ["=", "0.75"]
        ])

    def test_one_dot_five_minus_one_dot_three(self):
        self.checker.check_clicks([
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
        self.checker.check_clicks([
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
        self.checker.check_clicks([
            ["1", "1"],
            [".", "1."],
            [".", "1."],
            [".", "1."],
            ["5", "1.5"],
            ["/", "1.5"],
            ["2", "2"],
            ["=", "0.75"]
        ])

    def verify_existence_by_id(self, id):
        try:
            assert len(self.driver.find_elements_by_id(id)) == 1
        except:
            print(f"Element with id was not found: {id}")
            raise


if __name__ == "__main__":
    unittest.main()
