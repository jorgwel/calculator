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
                self.perform_and_assert(button, error, expected, fn)
            except:
                print(f"An exception checking button: {button}, "
                      f"expected: {expected} (found instead {self.f.get_result()}), "
                      f"error: {error}")
                raise

    def perform_and_assert(self, button, error, expected, fn):
        fn(button)
        assert self.f.get_result() == expected
        if error is not None:
            assert self.f.get_error() == error
        else:
            assert len(self.f.get_error()) == 0
