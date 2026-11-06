"""Independent reference checks for the educational Mortgage Lab examples.

Run: python3 -m unittest mortgage-lab/tests/test_reference_math.py
No dependencies, network, credentials or paid services. These reference calculations
do NOT exercise the website JavaScript; compare browser output separately.
"""
import math
import unittest


def canadian_payment(principal, annual_percent, years):
    if principal < 0 or years <= 0 or annual_percent < 0:
        raise ValueError("invalid loan inputs")
    n = round(years * 12)
    if annual_percent == 0:
        return principal / n
    monthly = (1 + annual_percent / 200) ** (1 / 6) - 1
    return principal * monthly / (1 - (1 + monthly) ** -n)


def progressive_tax(price, brackets):
    if price < 0:
        raise ValueError("negative purchase price")
    total = 0
    previous = 0
    for ceiling, rate in brackets:
        amount = min(price, ceiling) - previous
        if amount > 0:
            total += amount * rate
        previous = ceiling
        if price <= ceiling:
            break
    return round(total, 2)


ONTARIO = [(55000, .005), (250000, .01), (400000, .015),
           (2000000, .02), (float("inf"), .025)]
TORONTO = [(55000, .005), (250000, .01), (400000, .015),
           (2000000, .02), (3000000, .025), (4000000, .035),
           (5000000, .045), (10000000, .055), (20000000, .065),
           (float("inf"), .075)]


class ReferenceMathTests(unittest.TestCase):
    def test_monthly_payment(self):
        self.assertAlmostEqual(canadian_payment(520000, 4.89, 25), 2991.87, places=2)

    def test_zero_rate(self):
        self.assertAlmostEqual(canadian_payment(520000, 0, 25), 1733.3333333, places=5)

    def test_zero_principal(self):
        self.assertEqual(canadian_payment(0, 4.89, 25), 0)

    def test_invalid_inputs(self):
        for args in [(-1, 4, 25), (100, -1, 25), (100, 4, 0)]:
            with self.assertRaises(ValueError):
                canadian_payment(*args)

    def test_ontario_transfer_tax(self):
        self.assertEqual(progressive_tax(600000, ONTARIO), 8475)

    def test_toronto_transfer_tax(self):
        self.assertEqual(progressive_tax(600000, TORONTO), 8475)

    def test_zero_purchase(self):
        self.assertEqual(progressive_tax(0, ONTARIO), 0)


if __name__ == "__main__":
    unittest.main()
