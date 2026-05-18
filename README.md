# inst377-Final Project

INST377 Final Project



Cyber Security Threat Detector



With the world of the internet constantly evolving as time goes on, so does the threats that lurk

within the cyber world. Most people and small businesses lack access to real-time threat

intelligence. Data that exists of these threats are stored away in government databases or

behind a expensive paywall, leaving users without any true actionable insights.



The target users is for more iOS users and web browsers.



































Developer Manual



1\. What This App Does

\- This is a cybersecurity threat search app.

\- Users can search for CVEs (vulnerabilities) from the NVD database on threats.html.

\- Users can save CVEs to a watchlist (in memory only, no database).



2\. How to Install and Run



2.1. Prerequisites

\- Node.js (v14 or newer)

\- npm (comes with Node.js)



2.2. Install Dependencies

\- Open a terminal in the project folder:

&#x20;   inst377-FINAL PROJECT/

\- Run:

&#x20;   npm install



2.3. Start the Server

\- In the same folder, run:

&#x20;   node server.js

\- You should see:

&#x20;   Server running on http://localhost:3000



2.4. Open the Pages

\- In a browser, open:

&#x20; - Home: http://localhost:3000/home.html

&#x20; - About: http://localhost:3000/about.html

&#x20; - Search threats: http://localhost:3000/threats.html



3\. API Endpoints



All API endpoints are in server.js.



3.1. GET /api/cves

\- Purpose: search CVEs from NVD.

\- URL: GET /api/cves?keyword=...

\- If no keyword is given, it uses "software" by default.

\- Used by app.js on threats.html to show results.



3.2. GET /api/saved

\- Purpose: get the saved CVEs (watchlist).

\- Returns: \[] (empty array, no persistence).



3.3. POST /api/saved

\- Purpose: save a CVE to the watchlist.

\- URL: POST /api/saved

\- Request body (JSON):

&#x20;   {

&#x20;       "cve\_id": "CVE-...",

&#x20;       "title": "CVE-...",

&#x20;       "description": "..."

&#x20;   }

\- Response: the same object with status 201.



4\. Known Bugs



\- Saved CVEs are lost when the server restarts (no database).

\- If the NVD API fails, the app shows a basic error and no retry or better UX.

\- No pagination; only a small number of results are shown even if NVD returns many.



5\. Future Roadmap



\- Add a database (e.g., SQLite or MongoDB) to save watchlists permanently.

\- Add pagination so users can load more CVEs instead of limiting to a fixed number.

\- Add tests for the API endpoints (/api/cves, /api/saved).

\- Add filters (by CVSS score, product, vendor, or date).

\- Add export (save watchlist as JSON or CSV).





























































