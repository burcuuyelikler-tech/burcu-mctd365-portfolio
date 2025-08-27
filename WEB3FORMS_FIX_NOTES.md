# Web3Forms Integration Fix

- Rewrote `/api/contact.js` to work on Vercel serverless with a Vite/static frontend.
- Manually parses JSON body; maps fields to Web3Forms canonical `name`, `email`, `message`.
- Returns actionable error messages from Web3Forms.
- Frontend `App.jsx` catch block now surfaces error messages.

**Env:** Keep `WEB3FORMS_ACCESS_KEY` defined on Vercel (server-side only).