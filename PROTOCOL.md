# Urja Portal — Protocol Notes

This file describes what I discovered while investigating the undocumented Urja Meter Ops portal. These internal endpoints may change.

## 1. Login and Session

**Endpoint:** `POST /login`

The portal accepts email and password as URL-encoded form data.

Required headers include:

- `Content-Type: application/x-www-form-urlencoded`
- `x-sveltekit-action: true`
- `Origin: https://urja-ops.flockenergy.tech`

After successful login, the portal returns a session cookie named `__Secure-better-auth.session_token`.

The observed session lifetime is one hour. The current implementation logs in before each data request.

## 2. Endpoints Discovered

Data                                Portal endpoint 

Meter listing and search            `GET /portal/meters/search?q={search}&page={page}` 
Meter details                       `GET /meters/{meterId}/__data.json?x-sveltekit-invalidated=001` 
Energy readings                     `GET /portal/meters/{meterId}/energy` 
Meter location                      `GET /portal/meters/{meterId}/geo` 
Transformer listing                 `GET /portal/dts?page={page}` 


The meter listing returns records inside a `data` array, along with pagination information.

Energy readings include fields such as `timestamp`, `kwh`, and `kvah`. The location endpoint returns latitude and longitude.

## 3. Meter Details Decoding

The meter details endpoint returns SvelteKit page data instead of ordinary nested JSON.

The relevant data is located in `nodes[2].data`. Some values are stored as indexes pointing to other entries in the array.

I implemented a decoder to extract the meter ID, meter attributes, and hierarchy.

The decoder depends on the response structure observed during investigation and may need updating if the portal changes its format.

## 4. Transformer Details

I did not confirm a separate upstream endpoint for individual transformer details.

Instead, the API fetches a page from `/portal/dts` and searches for a matching transformer code.

**Limitation:** The lookup searches only the specified page.

## 5. Limitations and Improvements

- Portal endpoints and response formats may change.
- Portal credentials are required to access protected resources.
- Session caching could reduce repeated login requests.
- Input validation and error handling could be improved.
- Additional tests could cover invalid inputs and upstream failures.
- Credentials and session cookies must never be logged or committed.

The public API endpoints are documented in `README.md` and `openapi.json`.