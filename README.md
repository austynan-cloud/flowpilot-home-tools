# FlowPilot Home Tools

Free Canadian homebuyer planning tools maintained by FlowPilot.

## FlowLyon storefront

[`index.html`](index.html) is the FlowLyon homepage (intended domain flowlyon.com). GitHub Pages publishes this repository from [`.github/workflows/static.yml`](.github/workflows/static.yml) at https://austynan-cloud.github.io/flowpilot-home-tools/ .

FlowLyon links to FlowPilot Mortgage Lab, the Home Tools calculators, and the Express Content Pack. The content pack is CA$25 by Interac e-Transfer to austyn.an@icloud.com, memo `YourName Content Pack`, then email flowpilot27@gmail.com. The offer page is [`content/index.html`](content/index.html). The mortgage payment calculator is [`mortgage-calculator.html`](mortgage-calculator.html).

## Use Mortgage Lab

**[Open FlowPilot Mortgage Lab — free](https://flowpilot-mortgage-lab.netlify.app/)**

Mortgage Lab helps Canadian homebuyers explore mortgage payments and the financial picture around buying a home. It includes:

- Canadian nominal mortgage-rate calculations with semi-annual compounding
- Estimated minimum down payments and insured-mortgage premium scenarios
- Ontario and Toronto land transfer tax estimates and upfront cash planning
- Qualifying-rate and higher-interest-rate scenario comparisons
- Accelerated or regular repayment frequencies, optional principal prepayments
- Estimated interest savings, balance visualization and downloadable repayment CSV
- Browser-only calculations — no user account, credit card or personal mortgage data submission needed

**Free guides:**

- [Ontario home buying costs beyond the down payment](https://flowpilot-mortgage-lab.netlify.app/guides/ontario-home-buying-costs/)
- [Canadian mortgage stress test and qualifying rate](https://flowpilot-mortgage-lab.netlify.app/guides/canadian-mortgage-stress-test/)

[Mortgage Lab sitemap](https://flowpilot-mortgage-lab.netlify.app/sitemap.xml)

## Source and deployment

- Mortgage Lab source: [`mortgage-lab/index.html`](mortgage-lab/index.html)
- Original mortgage calculator: [`mortgage-calculator.html`](mortgage-calculator.html)
- FlowLyon homepage: [`index.html`](index.html)
- Ontario buyer tools: [Down-payment calculator](down-payment.html) and [land-transfer-tax calculator](land-transfer-tax.html)
- Live Mortgage Lab: https://flowpilot-mortgage-lab.netlify.app/
- A separate, smaller historical prototype is hosted elsewhere; the URL above is the primary project.

The primary Mortgage Lab website deploys from the `mortgage-lab` directory of the `main` branch via Netlify.

## Accuracy and limitations

These are **educational estimates**, not mortgage offers, lender approvals, legal advice or guaranteed tax calculations. Actual premiums, taxes, rebates, lender qualifying rules, prepayment privileges and mortgage renewal rates can differ. Verify decisions with a lender or qualified professional. Underlying estimates use currently documented Canadian public rules, and guide pages link to authoritative sources.

The full mathematical and export features were sanity-checked in local desktop and mobile browser runs; the deployed site has been checked publicly for accessibility. Individual financial outcomes are not guaranteed.

## Feedback

If you discover a calculation issue or have a suggestion, open a GitHub issue or contact **flowpilot27@gmail.com**. Please avoid sharing account credentials, detailed financial records or other sensitive personal information.
