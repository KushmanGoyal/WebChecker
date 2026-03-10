# Search Bar — Technical Guide

## Overview

The search bar allows users to **filter scan results** by **site name** or **URL** in real-time. It sits between the dashboard stats section and the results table, so users can quickly narrow down the list of 80+ sites without scrolling.

---

## How It Works (Architecture)

### 1. State Management — `useState`

```tsx
const [searchQuery, setSearchQuery] = useState("");
```

- We store the user's search input in a single React state variable called `searchQuery`.
- Every keystroke triggers a **re-render** via `setSearchQuery`, which updates the input value and re-filters the results.
- This is a **controlled component** pattern — React owns the input value, not the DOM.

### 2. Filtering Logic — `Array.prototype.filter()`

```tsx
const filteredResults = results.filter((r) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
        r.name.toLowerCase().includes(query) ||
        r.url.toLowerCase().includes(query)
    );
});
```

**Step-by-step breakdown:**

| Step | What happens |
|------|-------------|
| `searchQuery.trim()` | Removes leading/trailing whitespace. If empty, returns **all** results (no filter). |
| `searchQuery.toLowerCase()` | Converts the query to lowercase so matching is **case-insensitive**. |
| `r.name.toLowerCase().includes(query)` | Checks if the site **name** contains the query as a substring. |
| `r.url.toLowerCase().includes(query)` | Checks if the site **URL** contains the query as a substring. |
| `\|\|` (logical OR) | A result matches if **either** the name or URL matches. |

**Key design decisions:**

- **Case-insensitive**: `"CSE"` matches `"CSE Department"` and `"cse.iiitb.ac.in"`.
- **Substring matching**: `"robot"` matches `"Machine Intelligence & Robotics (MINRO)"` — you don't need to type the full name.
- **No debounce**: The filter runs on every keystroke. This is intentional — since `Array.filter()` over ~80 items is microseconds (~0.01ms), debouncing would actually make the UX feel *slower* by introducing a delay. Debouncing is only useful for expensive operations (API calls, heavy computations with thousands of items).

### 3. Rendering — Swapping `results` for `filteredResults`

```tsx
{filteredResults.map((result, i) => (
    <tr key={i}>...</tr>
))}
```

- Instead of rendering `results.map(...)`, we render `filteredResults.map(...)`.
- When `searchQuery` is empty, `filteredResults === results` (every item passes the filter).
- When the user types something, only matching rows appear — the table updates instantly.

### 4. Results Counter

```tsx
{searchQuery && (
    <div className="search-results-count">
        {filteredResults.length} of {results.length} sites
    </div>
)}
```

- Only shows when a search query is active (conditional rendering with `&&`).
- Tells the user how many sites match vs. total — e.g., `"3 of 81 sites"`.

### 5. Clear Button

```tsx
{searchQuery && (
    <button className="search-clear" onClick={() => setSearchQuery("")}>
        ✕
    </button>
)}
```

- Only appears when the input has text (avoids visual clutter).
- Clicking it clears the state, which clears the input and removes the filter in a single re-render.

---

## Data Flow Diagram

```
User types "mosip"
        │
        ▼
setSearchQuery("mosip")  ← React state update
        │
        ▼
Component re-renders
        │
        ▼
filteredResults = results.filter(r =>
    r.name.toLowerCase().includes("mosip") ||
    r.url.toLowerCase().includes("mosip")
)
        │
        ▼
filteredResults = [{ name: "MOSIP", url: "https://www.mosip.io/", ... }]
        │
        ▼
Table renders 1 row instead of 81
```

---

## CSS Architecture

The search bar styling follows the same design system as the rest of the app:

| Class | Purpose |
|-------|---------|
| `.search-bar-wrapper` | Outer container, adds spacing between stats and table |
| `.search-bar` | Flex row containing the icon, input, and clear button |
| `.search-icon` | Search magnifying glass icon (SVG) |
| `.search-input` | The actual `<input>` element, transparent bg so it blends with the card |
| `.search-clear` | "×" button to clear the search |
| `.search-results-count` | "X of Y sites" counter in mono font |

### Key CSS techniques:

- **`:focus-within`**: When the input inside `.search-bar` is focused, the entire bar lights up (border color change + subtle box-shadow). This targets the parent container based on child focus state.
  ```css
  .search-bar:focus-within {
      border-color: var(--border-hover);
      background: var(--bg-card-hover);
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.03);
  }
  ```
- **CSS custom properties (variables)**: All colors come from `--bg-card`, `--border`, `--text-muted`, etc., ensuring visual consistency.
- **`transition: all var(--transition)`**: Smooth 180ms cubic-bezier easing on hover/focus states.

---

## Why This Approach? (First Principles)

### Why client-side filtering instead of server-side?

| Factor | Client-side (our approach) | Server-side |
|--------|---------------------------|-------------|
| **Latency** | Instant (0ms network) | 50-200ms per query |
| **Server load** | Zero | New API call per keystroke |
| **Dataset size** | ~80 items — trivially small | Needed for thousands+ |
| **Complexity** | 6 lines of logic | API endpoint + query params |

With only ~80 sites, client-side filtering is the correct architectural choice. The entire dataset is already in memory after the scan.

### Why `includes()` instead of regex?

- `String.includes()` is a simple substring check — fast, safe, no escaping needed.
- Regex would be overkill here and would require escaping user input (e.g., `.` in URLs would become a wildcard without escaping).
- For fuzzy matching (typo-tolerant search), you'd use a library like [Fuse.js](https://fusejs.io/) — but substring matching is sufficient for site names and URLs.

### Why no debounce?

Debouncing delays execution until the user stops typing (e.g., 300ms pause). This makes sense for:
- API calls (avoid flooding the server)
- Computationally expensive operations

But our filter runs `Array.filter()` over ~80 items — this takes **microseconds**. Adding a debounce would make the search feel sluggish for zero performance benefit.

---

## Technologies Used

| Technology | Role |
|-----------|------|
| **React `useState`** | Manages search query state |
| **React controlled input** | Input value is driven by React state, not DOM |
| **`Array.prototype.filter()`** | Native JS method to create a subset of matching results |
| **`String.prototype.includes()`** | Native JS method for case-insensitive substring matching |
| **`String.prototype.toLowerCase()`** | Normalizes both query and data for case-insensitive comparison |
| **CSS `:focus-within`** | Parent-level focus styling based on child input focus |
| **CSS Custom Properties** | Design system tokens for consistent theming |
| **SVG icons (inline)** | Lightweight vector icons for search and clear actions |

---

## Potential Enhancements

If you ever want to extend the search bar, here are some ideas:

1. **Fuzzy search** — Use [Fuse.js](https://fusejs.io/) to tolerate typos (e.g., "mospi" → "MOSIP").
2. **Filter by status** — Add dropdown filters for "UP only" or "DOWN only".
3. **Keyboard shortcut** — Press `/` or `Ctrl+K` to focus the search bar.
4. **Search highlighting** — Highlight matched text in the table rows using `<mark>` tags.
5. **URL query params** — Persist the search query in the URL (`?q=mosip`) so it survives page refreshes.
