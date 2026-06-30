/**
 * Jan Suvidha Kendra — Google Sheets lead receiver
 * --------------------------------------------------
 * SETUP (one time):
 * 1. Create a Google Sheet. First row headers (A1:F1):
 *      created_at | name | phone | city | experience | source
 * 2. Extensions > Apps Script. Delete any code, paste THIS file.
 * 3. Click "Deploy" > "New deployment" > type: "Web app".
 *      - Execute as:  Me
 *      - Who has access:  Anyone
 *      Deploy, authorize, and COPY the Web app URL.
 * 4. Paste that URL into CONFIG.SHEET_URL in index.html.
 *
 * The landing page posts JSON (mode:no-cors), so we read e.postData.contents.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = {};
    try { data = JSON.parse(e.postData.contents); } catch (err) { data = e.parameter || {}; }

    sheet.appendRow([
      data.created_at || new Date().toISOString(),
      data.name || '',
      data.phone || '',
      data.city || '',
      data.experience || '',
      data.source || 'landing-page'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you open the Web app URL in a browser to confirm it's live.
function doGet() {
  return ContentService.createTextOutput('Jan Suvidha Kendra lead endpoint is running.');
}
