class ClicksChecker:
    def __init__(self, calculator_facade):
        self.f = calculator_facade

    def check(self, clicks):
        for c in clicks:
            button = c[0]
            expected = c[1]
            error = None
            if len(c) == 3:
                error = c[2]
            try:
                self.f.click(button)
                assert self.f.get_result() == expected
                if error is not None:
                    assert self.f.get_error() == error
                else:
                    assert len(self.f.get_error()) == 0
            except:
                print(f"An exception checking click: {button},{expected},{error}")
                raise
