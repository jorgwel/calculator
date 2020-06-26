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
    def __init__(self, text=None, class_of_log=None):
        if text is not None:
            self.text = text
        if class_of_log is not None:
            self.log_type = self.get_log_type(class_of_log)

    def get_log_type(self, class_of_log):
        if self.is_error(class_of_log):
            log_type = PrintedLogType.ERROR
        else:
            log_type = PrintedLogType.NORMAL
        return log_type

    def is_error(self, class_of_log):
        return "error" in class_of_log

    def __str__(self) -> str:
        return f"PrintedLog: {self.text}, {self.log_type} "

    def __eq__(self, other):
        if isinstance(other, PrintedLog):
            return self.text == other.text and self.log_type == other.log_type
        return False


class CalculatorFacade:
    def __init__(self, driver):
        self.driver = driver
        self.body = self.driver.find_element_by_xpath("//body")

    def get_logs(self):
        elements = self.driver.find_elements_by_xpath("//*[contains(@class, 'printed_item')]")
        logs = list(map(lambda e: self.to_log(e), elements))
        return logs

    def to_log(self, e):
        return PrintedLog(e.text, e.get_attribute("class"))

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
