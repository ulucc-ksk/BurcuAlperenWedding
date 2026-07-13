# Google Sheets RSVP setup

1. Open the provided Burcu & Alperen Google Sheet.
2. In the Sheet, open **Extensions > Apps Script**.
3. Replace the editor contents with `google-apps-script/Code.gs` from this project.
4. In Apps Script, open **Project Settings > Script properties**.
5. Add a property named `WEBHOOK_SECRET` with a long random value.
6. Select **Deploy > New deployment > Web app**.
7. Run the app as yourself and allow access for anyone who has the link.
8. Copy the production URL ending in `/exec`.
9. Create `.env.local` in the project and add:

```env
GOOGLE_SHEETS_WEB_APP_URL=YOUR_EXEC_URL
GOOGLE_SHEETS_WEBHOOK_SECRET=THE_SAME_SECRET
```

10. Restart the Next.js development server.

The script creates the RSVP worksheet and its column headers automatically on the first response.

