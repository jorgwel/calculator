RESULTS_PANEL_ID = 'results_panel'
ERROR_PANEL_ID = 'error_panel'

OPERATIONS = {'+': 'plus_button', '-': 'minus_button',
              '*': 'multiplication_button', '/': 'division_button',
              'C': 'clear_button', '=': 'equals_button', '<': 'delete_button'}
NUMBERS = {'0': 'zero_button', '1': 'one_button', '2': 'two_button',
           '3': 'three_button', '4': 'four_button', '5': 'five_button',
           '6': 'six_button', '7': 'seven_button', '8': 'eight_button',
           '9': 'nine_button', '.': 'dot_button'}
ALL_BUTTONS = {**OPERATIONS, **NUMBERS}


class CalculatorFacade:
    def __init__(self, driver):
        self.driver = driver

    def get_result(self):
        return self.get_text(RESULTS_PANEL_ID)

    def get_error(self):
        return self.get_text(ERROR_PANEL_ID)

    def click(self, button):
        self.driver.find_element_by_id(ALL_BUTTONS[button]).click()

    def get_text(self, id):
        return self.driver.find_element_by_id(id).text

    def get_calculator_elements_ids(self):
        return list(OPERATIONS.values()) + list(NUMBERS.values()) + [RESULTS_PANEL_ID] + [ERROR_PANEL_ID]