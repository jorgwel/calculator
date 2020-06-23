import enum

from selenium.webdriver.common.keys import Keys

RESULTS_PANEL_ID = 'results_panel'
ERROR_PANEL_ID = 'error_panel'
HISTORY_PANEL_ID = 'history_panel'

OPERATIONS = {'+': 'plus_button', '-': 'minus_button',
              '*': 'multiplication_button', '/': 'division_button',
              'C': 'clear_button', '=': 'equals_button', '<': 'delete_button'}
NUMBERS = {'0': 'zero_button', '1': 'one_button', '2': 'two_button',
           '3': 'three_button', '4': 'four_button', '5': 'five_button',
           '6': 'six_button', '7': 'seven_button', '8': 'eight_button',
           '9': 'nine_button', '.': 'dot_button'}
ALL_BUTTONS = {**OPERATIONS, **NUMBERS}


class PrintedLogType(enum.Enum):
    ERROR = 'Error'
    NORMAL = 'Normal'


class PrintedLog:
    def __init__(self, class_of_log, text):
        self.text = text
        if self.is_error(class_of_log):
            self.log_type = PrintedLogType.ERROR
        else:
            self.log_type = PrintedLogType.NORMAL

    def is_error(self, class_of_log):
        return "error" in class_of_log

class CalculatorFacade:
    def __init__(self, driver):
        self.driver = driver
        self.body = self.driver.find_element_by_xpath("//body")

    def get_logs(self):
        elements = self.driver.find_elements_by_xpath("//*[contains(@class, 'printed_item')]")
        logs = list(map(lambda e: self.to_log(e), elements))
        return logs

    def to_log(self, e):
        return PrintedLog(e.get_attribute("class"), e.text)

    def get_result(self):
        return self.get_text(RESULTS_PANEL_ID)

    def type_char(self, char):
        if char == '<':
            self.body.send_keys(Keys.BACKSPACE)
        else:
            self.body.send_keys(char)

    def get_error(self):
        return self.get_text(ERROR_PANEL_ID)

    def click(self, button):
        self.driver.find_element_by_id(ALL_BUTTONS[button]).click()

    def get_text(self, id):
        return self.driver.find_element_by_id(id).text

    def get_calculator_elements_ids(self):
        return list(OPERATIONS.values()) \
               + list(NUMBERS.values()) \
               + [RESULTS_PANEL_ID] \
               + [ERROR_PANEL_ID] \
               + [HISTORY_PANEL_ID]
