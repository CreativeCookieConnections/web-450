Summary of work for Sales Report major task

Files added/changed:
- Updated `apre-server/src/routes/reports/sales/index.js`: added `GET /summary` endpoint to return total sales grouped by region.
- Added server tests: `apre-server/test/routes/reports/sales/summary.spec.js` (3 Jest tests).
- Added client component: `apre-client/src/app/reports/sales/sales-summary/sales-summary.component.ts`.
- Added client tests: `apre-client/src/app/reports/sales/sales-summary/sales-summary.component.spec.ts` (3 unit tests using HttpClientTestingModule).

Suggested concise commit messages:
- "feat(server): add /reports/sales/summary endpoint (aggregate sales by region)"
- "test(server): add Jest tests for sales summary endpoint"
- "feat(client): add SalesSummaryComponent using ChartComponent"
- "test(client): add unit tests for SalesSummaryComponent"

How to run tests locally:
- Server tests (Jest):

```
cd apre/apre-server
npm install
npm test
```

- Client tests (Angular/Karma):

```
cd apre/apre-client
npm install
npm test
```

Notes:
- I ran the server tests in this workspace; all server tests (including new ones) passed.
- Client unit tests were added; running them locally may require a browser/karma environment.
