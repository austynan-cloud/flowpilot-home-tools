// FlowPilot Mortgage Lab: regression tests against the actual index.html functions.
// Run: node --test mortgage-lab/tests/test_site_math.cjs
// No network, dependencies, browser, credentials or payments required.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const begin = html.indexOf('function minDownPayment(');
const end = html.indexOf('function displayDate(', begin);
assert.ok(begin > 0 && end > begin, 'Expected calculation function block not found; review source changes');
const source = html.slice(begin, end);
const modes = {monthly:{f:12},biweekly:{f:26},weekly:{f:52},accbiweekly:{f:26},accweekly:{f:52}};
const ctx = vm.createContext({modes, Math, Infinity, Error});
vm.runInContext(source, ctx, {timeout:1000});
const close = (a,b,tolerance=.02) => assert.ok(Math.abs(a-b)<=tolerance, `${a} differs from ${b}`);
test('down-payment thresholds at 500k and 1.5m',()=>{
 close(ctx.minDownPayment(500000),25000);
 close(ctx.minDownPayment(600000),35000);
 close(ctx.minDownPayment(1499999),124999.9);
 close(ctx.minDownPayment(1500000),300000);
});
test('Ontario and Toronto transfer tax example before rebates',()=>{
 close(ctx.ontarioTax(600000),8475);
 close(ctx.torontoTax(600000),8475);
});
test('zero-interest monthly mortgage amortizes exactly',()=>{
 close(ctx.monthlyPayment(120000,0,10),1000);
 const s=ctx.simulate(120000,0,10,'monthly',0,0);
 assert.equal(s.rows.length,120);
 close(s.interest,0);close(s.rows.at(-1).balance,0);
});
test('Canadian semiannual compounding example',()=>{
 const expected=400000*(Math.pow(1+.05/2,2/12)-1)/(1-Math.pow(1+(Math.pow(1+.05/2,2/12)-1),-300));
 close(ctx.monthlyPayment(400000,5,25),expected);
});
test('extra principal reduces total interest and duration',()=>{
 const base=ctx.simulate(400000,5,25,'monthly',0,0);
 const extra=ctx.simulate(400000,5,25,'monthly',200,0);
 assert.ok(extra.periods<base.periods);
 assert.ok(extra.interest<base.interest);
 close(extra.principal,400000);
});
test('accelerated biweekly pays down faster than regular biweekly',()=>{
 const regular=ctx.simulate(400000,5,25,'biweekly',0,0);
 const accelerated=ctx.simulate(400000,5,25,'accbiweekly',0,0);
 assert.ok(accelerated.periods<regular.periods);
});
test('schedule row invariants and CSV-compatible numeric fields',()=>{
 const s=ctx.simulate(300000,4.5,25,'monthly',0,0);
 assert.ok(s.rows.length>0);
 for(const r of s.rows){
  close(r.paid,r.principal+r.interest,.00001);
  assert.ok([r.period,r.year,r.paid,r.principal,r.interest,r.balance].every(Number.isFinite));
  assert.ok(r.balance>=0);
 }
 close(s.rows.at(-1).balance,0);
});
test('insurance model: 20% down zero premium; ineligible high-price insured case',()=>{
 close(ctx.insurancePremium(500000,100000,25),0);
 assert.ok(Number.isNaN(ctx.insurancePremium(1500000,150000,25)));
});
