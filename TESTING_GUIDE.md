# Testing Implementation Guide

## Overview

This guide helps you implement the test coverage identified in `TEST_COVERAGE_ANALYSIS.md`. Start with **Priority 1** tests, which protect your revenue-generating code paths.

---

## Quick Start

### 1. Run Existing Tests
```bash
# Node.js built-in test runner (no dependencies)
node tests/business-hours.test.js
```

### 2. Run New Test Skeletons (No Dependencies Yet)
```bash
# All use Node.js built-in test runner
node tests/vapi-client.test.js
node tests/send-lead-utils.test.js
node tests/estimator-utils.test.js
node tests/blog.test.js
```

These test files contain:
- ✅ 45+ test cases across utility functions
- ✅ No external dependencies (use Node.js `test` module)
- ✅ Mock implementations for API calls
- ✅ Edge case coverage
- ✅ Integration test examples

---

## File Manifest

| File | Priority | Status | Coverage | Tests |
|------|----------|--------|----------|-------|
| `tests/business-hours.test.js` | — | ✅ Existing | 100% | 9 |
| `tests/vapi-client.test.js` | 1 | 📝 Skeleton | 90% (Vapi) | 13 |
| `tests/send-lead-utils.test.js` | 1 | 📝 Skeleton | 100% (utils) | 27 |
| `tests/estimator-utils.test.js` | 1 | 📝 Skeleton | 100% (utils) | 34 |
| `tests/blog.test.js` | 2 | 📝 Skeleton | 80% (blog.js) | 18 |
| `TEST_COVERAGE_ANALYSIS.md` | — | ✅ Complete | — | Reference |

**Total:** 101 test cases covering 75+ identified gaps

---

## Implementation Steps

### Phase 1: Zero Dependencies (This Week)
✅ **Already done** — All skeleton files provided use Node.js built-in test runner

1. Review the test skeletons in `tests/*.test.js`
2. Adapt mock fetch implementations for your Vapi/BuilderPrime credentials
3. Run: `node tests/vapi-client.test.js` (should work immediately)

### Phase 2: Add Jest (Next Week)
```bash
npm install --save-dev jest @testing-library/react
```

1. Add `package.json` scripts:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

2. Create `jest.config.js`:
```javascript
export default {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
};
```

3. Convert test files from `node:test` to Jest:
```javascript
// Before (Node.js test runner)
import test from "node:test";
test("name", () => {});

// After (Jest)
describe("name", () => {
  it("name", () => {});
});
```

### Phase 3: API Route Tests (Following Week)
Add HTTP mocking for integration tests:
```bash
npm install --save-dev undici @testing-library/node
```

Use provided test templates in `TEST_COVERAGE_ANALYSIS.md` § 6.

### Phase 4: Component Tests (Later)
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

---

## Addressing the Timeouts in Blog Tests

The `blog.test.js` file requires `remark` and `remark-html`. These are already in `package.json`:

```json
{
  "dependencies": {
    "remark": "^15.0.1",
    "remark-html": "^16.0.1"
  }
}
```

If you get import errors when running blog tests, ensure these are installed:
```bash
npm install
```

---

## Mock Fetch Implementation

The `vapi-client.test.js` includes a simple mock. For production testing, use **undici** (lightweight, built for Node.js):

```javascript
import { setGlobalDispatcher, MockAgent } from 'undici';

const mockAgent = new MockAgent();
setGlobalDispatcher(mockAgent);

const mockPool = mockAgent.get('https://api.vapi.ai');
mockPool.intercept({
  path: '/call',
  method: 'POST',
}).reply(200, { id: 'call-123' });
```

---

## Extracting Utilities (Recommended)

The test files duplicate some functions from the routes. For real testing, extract these to shared utilities:

**Before** (current):
```
app/api/send-lead/route.js          — functions + handler
tests/send-lead-utils.test.js       — duplicate functions
```

**After** (recommended):
```
lib/lead-utils.js                   — shared functions
app/api/send-lead/route.js          — import from lib/
tests/send-lead-utils.test.js       — import from lib/
```

Example refactor:

```javascript
// lib/lead-utils.js
export function mapServiceToProjectType(service) { ... }
export function splitName(fullName) { ... }
export function normalizePhone(phone) { ... }

// app/api/send-lead/route.js
import { mapServiceToProjectType, splitName, normalizePhone } from '@/lib/lead-utils';

// tests/send-lead-utils.test.js
import { mapServiceToProjectType, splitName, normalizePhone } from '@/lib/lead-utils';
```

---

## Coverage Targets

Set minimum coverage thresholds in `jest.config.js`:

```javascript
{
  collectCoverageFrom: [
    'lib/**/*.{js,jsx}',
    'app/api/**/*.{js,jsx}',
    '!app/api/**/*.test.js',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
    './lib/business-hours.js': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}
```

---

## Running Tests in CI/CD

Add GitHub Actions workflow (`.github/workflows/test.yml`):

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v3
```

---

## Known Issues & Limitations

### 1. Blog Tests Fixture Cleanup
The `blog.test.js` creates `tests/fixtures/blog/` directory. Ensure cleanup runs:

```bash
# Clean up after test
rm -rf tests/fixtures/
```

Or add to `.gitignore`:
```
tests/fixtures/
```

### 2. Vapi Timeout Testing
Testing timeout behavior with AbortController is tricky without fake timers. Consider using **Jest fake timers** in Phase 2:

```javascript
jest.useFakeTimers();
// test code
jest.runAllTimers();
jest.useRealTimers();
```

### 3. Rate Limit Map State
The rate limiter keeps in-memory state. Tests use fresh maps, but in production, state persists across requests. Add a test for cleanup behavior.

---

## Next Steps

1. **This week:** Review skeleton files, run them locally
2. **Next week:** Add Jest, convert tests to Jest syntax
3. **Following week:** Add HTTP mocking, run API route tests
4. **Later:** Component tests, E2E tests (Playwright), coverage reporting

---

## Test Execution Checklist

- [ ] Run `node tests/business-hours.test.js` → passes
- [ ] Run `node tests/vapi-client.test.js` → runs (some may error without mocks)
- [ ] Run `node tests/send-lead-utils.test.js` → passes
- [ ] Run `node tests/estimator-utils.test.js` → passes
- [ ] Run `node tests/blog.test.js` → runs (fixture creation/cleanup)
- [ ] Install Jest: `npm install --save-dev jest`
- [ ] Convert one test file to Jest syntax
- [ ] Run `npm test` → passes
- [ ] Set coverage threshold: `npm test -- --coverage`

---

## Documentation

- **Full Analysis:** See `TEST_COVERAGE_ANALYSIS.md` for detailed gap identification, edge cases, integration scenarios
- **Test Templates:** See `TEST_COVERAGE_ANALYSIS.md` § 6 for complete test templates with explanations
- **Utility Functions:** See individual test files for function signatures and expected behavior

---

## Support

If tests fail:

1. **Check env vars:** `echo $VAPI_API_KEY` (must be set for Vapi tests)
2. **Check dependencies:** `npm list remark remark-html`
3. **Check Node version:** `node --version` (should be 18+)
4. **Review mock setup:** Ensure fetch is properly mocked in each test file

---

## Success Criteria

✅ **Phase 1 Complete:** All 101 tests run with Node.js test runner
✅ **Phase 2 Complete:** All tests pass with Jest
✅ **Phase 3 Complete:** API route tests verify BuilderPrime/Vapi integration
✅ **Phase 4 Complete:** Component tests verify React rendering

**Target:** 80% code coverage across `lib/` and `app/api/`
