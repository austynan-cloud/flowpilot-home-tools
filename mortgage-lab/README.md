# FlowPilot Mortgage Lab (Canada)

A free, privacy-first, browser-only mortgage planning tool. No signup, tracking script, cookies, or transmission of financial inputs.

## Features

- Canadian nominal annual interest converted to the payment period from semiannual compounding.
- Monthly, regular weekly/biweekly and accelerated weekly/biweekly payment comparisons.
- Mortgage insurance estimate using standard CMHC loan-to-value premium bands, with an indicative 0.20 percentage-point surcharge for eligible insured 30-year amortizations.
- Minimum down payment validation and Ontario (including Toronto 2026 1–2-unit home) transfer tax estimates.
- Approximate upfront cash, Ontario insurance premium sales tax, optional closing and ongoing homeownership costs.
- OSFI uninsured mortgage qualifying-rate benchmark and +1/+2 percentage-point payment scenarios.
- Full amortization simulation with voluntary recurring and annual lump-sum extra principal, annual chart and period-level CSV export.
- Local-only scenario sharing through a URL query string (sharing reveals the numbers to recipients).

## Calculation basis

For nominal Canadian annual interest `j` as a percentage and `f` payment periods per year:

`r = (1 + j/200)^(2/f) - 1`

The scheduled payment is `P*r / (1 - (1+r)^(-years*f))` for loan principal `P` (or `P / (years*f)` at a 0% rate). Accelerated biweekly uses half of the regular monthly payment every two weeks; accelerated weekly uses one-quarter every week.

The calculator simulates each period using full precision and rounds only display values. Interest savings and payoff dates assume the quoted rate remains constant for the entire amortization, which is not guaranteed at renewal. It is not lender underwriting, pre-approval or personalized financial advice.

## Local QA

- Chromium headless rendered the page at 1440x980 and 390x844 without JavaScript exceptions.
- Example: $650,000 purchase, $130,000 down, 4.89% quoted rate, 25 years, monthly: regular scheduled principal-and-interest payment ~$2,991.87, before property ownership costs.
- Verified below-minimum down payment displays a validation error rather than a misleading payment estimate.
- Browser simulations validate changes to price, down payment, insurance and cash estimate.

## Official references (reviewed November 2026)

- [OSFI uninsured mortgage qualifying benchmark](https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages)
- [Government of Canada minimum down payment](https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html)
- [FCAC payment frequencies](https://www.canada.ca/en/financial-consumer-agency/services/mortgages/choose-mortgage.html)
- [CMHC mortgage insurance premiums](https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-for-consumers/cmhc-mortgage-loan-insurance-cost)
- [Toronto 2026 municipal land transfer tax](https://www.toronto.ca/services-payments/property-taxes-utilities/municipal-land-transfer-tax-mltt/municipal-land-transfer-tax-mltt-rates-and-fees/)

## Hosting

Netlify project: `flowpilot-mortgage-lab`, built from this repository's `mortgage-lab/` directory. New Netlify sites default to private until the owner explicitly changes **Project configuration → General → Visitor access → Project visibility** to **Public**. A read-only deploy key is used for repository cloning; GitHub's push webhook is configured for Netlify deployment events.
