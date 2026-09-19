# Project: sudmo comapny limited

## Problem
Kenyans plan leave around public holidays, but finding which holidays create long
weekends — where one day of leave buys you four or more consecutive days off —
requires cross-checking a wall calendar, counting days, and remembering which
weekdays each holiday falls on. Every January people do this by hand; most
miss opportunities.

## Solution
A single-page app that fetches Kenya's public holidays for any year from the
Nager.Date API, then detects bridge-day long weekends. It ranks results by
how many days off you get for how much leave taken, so you can see at a glance
"Take 1 day off in June and get 4 days free."

## Data
Nager.Date API (https://nagerholidays.com/api/v3) — free, no key required,
returns holidays by country code. The endpoint
`https://nagerholidays.com/api/v3/publicholidays/{year}/{countryCode}`
returns JSON arrays of holiday objects with `date`, `localName`, `name`,
`countryCode`, `fixed`, `global`, `counties`, and `types` fields.

## Features (MoSCoW)
**Must:**
- Fetch and render public holidays for a selected year (2024–2027)
- Detect and highlight bridge-day long weekends (holiday on Fri → Thu off;
  holiday on Mon → Fri off; etc.)
- Responsive layout (320px → 1440px), no horizontal scroll
- All three async UI states: loading, success, error

**Should:**
- Year switcher dropdown
- "Add to calendar" links for each long weekend
- Holiday type tags (Public, Bank, etc.)

**Could:**
- Compare two countries' holiday calendars
- Export long weekends as CSV

**Won't:**
- User accounts
- Push notifications
- Offline data persistence beyond localStorage cache

## Feasibility Check
- Is there data? Nager.Date API — free, no key, JSON over HTTPS.
- Is the core buildable in 4 days? Yes — one page, holiday table + long-weekend cards.
- Can I demo it in 3 minutes? Yes — pick a year, see the long weekends ranked.
- Does it use the course skills? Fetching external data, interactivity
  (year switcher, calendar links), responsive layout, XSS-safe DOM rendering.
