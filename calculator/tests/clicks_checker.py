class EventsChecker:
    def __init__(self, calculator_facade):
        self.f = calculator_facade

    def check_clicks(self, clicks):
        fn = self.f.click
        self.check(clicks, fn)

    def check_typed_chars(self, clicks):
        fn = self.f.type_char
        self.check(clicks, fn)

    def check(self, clicks, fn):
        for c in clicks:
            button = c[0]
            expected = c[1]
            error = None
            if len(c) == 3:
                error = c[2]
            try:
                fn(button)
                assert self.f.get_result() == expected
                if error is not None:
                    assert self.f.get_error() == error
                else:
                    assert len(self.f.get_error()) == 0
            except:
                print(f"An exception checking button: {button}, "
                      f"expected: {expected} (found instead {self.f.get_result()}), "
                      f"error: {error}")
                raise
