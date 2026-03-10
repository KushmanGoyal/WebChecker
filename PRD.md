# Product Requirements Document (PRD)

## Product: College Website Integrity Scanner

## Version: MVP v1.0

## Primary Goal: Stateless, one-click website scanner

## Deployment: Vercel (Free Tier)

## Users: College Admin (single user, internal)

---

# 1. Purpose

Provide a simple web interface where the admin can click a button to scan a predefined list of college website URLs and immediately see which are working and which are broken.

The system does not store data. It does not run automatically. It does not require login. It performs a single scan and displays results.

The system acts as a diagnostic tool, not a monitoring system.

---

# 2. Core Functional Requirements

## FR-1: Display Dashboard Page

The system must display a webpage containing:

* Title
* One "Run Scan" button
* Empty results table initially

No automatic scanning on page load.

---

## FR-2: Run Scan on Button Click

When admin clicks "Run Scan":

* System sends request to backend scan endpoint
* Backend checks all configured URLs
* Backend returns results immediately
* Frontend displays results in table

Scan must complete in a single request cycle.

---

## FR-3: Check Website Availability

For each website URL, system must attempt HTTP request using GET method.

System must record:

* URL name
* URL address
* Status (UP or DOWN)
* HTTP status code (if available)
* Response time in milliseconds

---

## FR-4: Display Results Table

After scan completes, dashboard must display table containing:

| Field         | Description              |
| ------------- | ------------------------ |
| Name          | Human-readable site name |
| URL           | Website address          |
| Status        | UP or DOWN               |
| Response Time | Milliseconds or blank    |
| Status Code   | HTTP code or blank       |

No sorting required. No filtering required.

---

## FR-5: Handle Failures Gracefully

If website cannot be reached due to:

* DNS failure
* Connection failure
* Timeout
* Server error

System must display:

* Status = DOWN
* Status code = blank or error code
* Response time = blank or measured time

System must not crash.

---

# 3. Non-Functional Requirements

## NFR-1: Stateless Operation

System must not store any data.

No database allowed.

All results exist only in memory during scan.

---

## NFR-2: Minimal Code Complexity

System must use:

* Native fetch()
* No external scanning libraries
* No unnecessary abstractions
* No complex architecture patterns

Code must remain readable and small.

Target total code size:

< 200 lines for MVP

---

## NFR-3: Fast Execution

Scan must complete within:

1–5 seconds for up to 50 URLs

Requests must execute in parallel.

---

## NFR-4: Free Hosting Compatibility

System must run fully within:

* Vercel free tier
* Serverless function execution limits

No background processes.

---

## NFR-5: Simple UI

UI must use:

* Plain HTML elements
* Basic table
* Basic button

No heavy design libraries.

No animations required.

No charts required.

No graphics required.

---

# 4. Technical Architecture

## High-Level Flow

```
Admin opens dashboard
Admin clicks Run Scan
Frontend calls /api/scan
Backend scans URLs
Backend returns results
Frontend displays results
```

Single request-response cycle.

No persistence layer.

---

# 5. System Components

## Component 1: URL List

Static file containing URLs.

Example:

```
/lib/sites.ts
```

Contains array of:

* name
* url

Hardcoded.

---

## Component 2: Scan API Endpoint

Location:

```
/api/scan
```

Responsibilities:

* Read sites list
* Send HTTP requests
* Measure response time
* Determine UP or DOWN
* Return results as JSON

---

## Component 3: Dashboard Page

Location:

```
/app/page.tsx
```

Responsibilities:

* Display Run Scan button
* Call scan endpoint
* Display results table

---

# 6. Data Model (In-Memory Only)

Scan Result Object:

```
{
  name: string
  url: string
  status: "UP" | "DOWN"
  statusCode: number | null
  responseTime: number | null
}
```

Array returned to frontend.

No storage.

---

# 7. Error Handling Requirements

System must handle:

DNS failures
Connection failures
Timeouts
Invalid URLs
Server errors

System must continue scanning remaining URLs even if one fails.

System must never terminate early due to single failure.

---

# 8. Performance Requirements

Maximum supported URLs (MVP):

50 URLs per scan

Expected scan duration:

1–5 seconds

Parallel execution required using Promise.all.

---

# 9. Security Requirements

No authentication required.

No user input required.

URLs defined only in code.

No external write operations.

System is read-only scanner.

---

# 10. Deployment Requirements

System must deploy on Vercel using:

Next.js default configuration

No additional infrastructure required.

No environment variables required.

No database setup required.

---

# 11. Explicit Non-Goals (Out of Scope)

The following features must NOT be implemented in MVP:

* Database
* Login system
* User accounts
* Scheduled scans
* Email alerts
* Historical tracking
* Charts
* Crawl functionality
* Dynamic URL input

These increase complexity and are unnecessary for current use case.

---

# 12. Definition of Done

System is complete when admin can:

Open dashboard
Click Run Scan
See list of sites marked UP or DOWN
Scan completes successfully
No crashes occur
System runs on Vercel free tier

---

# 13. Acceptance Criteria

Example test case:

Input URLs:

* google.com
* fake-domain-xyz.com

Expected output:

```
Google         UP      200     120ms
Fake Domain    DOWN    null    null
```

System must produce correct result reliably.

---

# 14. Engineering Philosophy for This MVP

This system prioritizes:

* Simplicity over flexibility
* Reliability over features
* Clarity over abstraction

The goal is not to build a platform.

The goal is to build a tool that answers one question correctly:

"Which pages are broken right now?"

Every extra feature is postponed until that question is answered perfectly.

