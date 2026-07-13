const SPREADSHEET_ID = "11gK7m5C7NgsEF8VZA64SGfexKy-MhH2Dqk1fd9Pu-XQ";
const SHEET_NAME = "Kat\u0131l\u0131m";

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const payload = JSON.parse(event.postData.contents);
    const expectedSecret =
      PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");

    if (!expectedSecret || payload.secret !== expectedSecret) {
      return jsonResponse({ success: false, error: "Unauthorized" });
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Kay\u0131t Tarihi",
        "Davet Kodu",
        "Davet T\u00fcr\u00fc",
        "\u0130sim Soyisim",
        "D\u00fc\u011f\u00fcn Ki\u015fi Say\u0131s\u0131"
      ]);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      safeCell(payload.invitationCode),
      payload.invitationType === "nikah_ve_dugun" ? "Nikah ve D\u00fc\u011f\u00fcn" : "Nikah",
      safeCell(payload.fullName),
      payload.dugunGuestCount === null ? "" : Number(payload.dugunGuestCount)
    ]);

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({ success: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function safeCell(value) {
  const text = String(value || "").trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON
  );
}

