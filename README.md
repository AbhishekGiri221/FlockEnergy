Flock Energy Meter API

A simple REST API built with Node.js, Express and TypeScript to access meter and transformer data from the Urja Meter Ops portal.

Setup:

npm install
Create a .env file:
PORT=3000
PORTAL_BASE_URL=https://urja-ops.flockenergy.tech
PORTAL_EMAIL=operator@urja.local 
PORTAL_PASSWORD=urja-ops-2026


Start the API:
npm run dev

API endpoints:
Method	    Endpoint	                                Description
GET	        /app/meters/export?page=1&search=J100000	List or search meters (search optional)
GET	        /app/meters/:meterId	                    Meter details
GET	        /app/meters/:meterId/energy	                Energy readings
GET	        /app/meters/:meterId/location	            Meter coordinates
GET	        /app/transformers?page=1	                List transformers
GET	        /app/transformers/:dtCode?page=1	        Find a transformer on a given page


Example: GET http://localhost:3000/app/meters/J100000

The transformer detail route only checks the requested page, not all pages. Transformer routes require page; meter listing defaults to page 1.


How it works:

The request goes through route → controller → service → portal API. The API logs into the portal using environment variables and sends the session cookie with data requests. A small decoder converts the portal's indexed SvelteKit meter-details response into readable JSON.

Tests:
npm test

The current tests cover meter decoding, meter listing, empty search results, search/pagination parameters, and meter details. API tests use mocked services, so they do not need portal access.
Decisions and limitations
- Used the portal endpoints observed during investigation; details are in PROTOCOL.md.
- Used controller-level try/catch for simplicity. Error responses could be made more consistent.
- The current code logs in for each portal request; session caching would improve performance.
- Transformer details are searched within one page only.
- Some energy and location values remain strings, as returned by the portal.
- More validation, error-case tests, and missing-record handling would improve reliability.
openapi.json describes the public API routes and expected responses. It should match the final implementation.