function setupPeerReviewSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Check and create 'Form Responses 1' sheet
  var formResponseSheet = ss.getSheetByName('Form Responses 1');
  if (!formResponseSheet) {
    formResponseSheet = ss.insertSheet('Form Responses 1');
    formResponseSheet.appendRow(['Timestamp', 'Name', 'Email', 'Department', 'Reviewer 1', 'Reviewer 2', 'Reviewer 3']);
  }
  
  // List of departments and their dummy data
  var departments = {
    'Accounts': [
      ['Employee', 'Name'],
      ['Accounts', 'John Doe'],
      ['Accounts', 'Jane Smith'],
      ['Accounts', 'Bob Johnson'],
      ['Accounts', 'Alice Brown']
    ],
    'Leadership': [
      ['Employee', 'Name'],
      ['Leadership', 'Mike Leader'],
      ['Leadership', 'Sarah Manager'],
      ['Leadership', 'Tom Director']
    ],
    'Production': [
      ['Employee', 'Name'],
      ['Production', 'Chris Producer'],
      ['Production', 'Emma Creator'],
      ['Production', 'David Maker'],
      ['Production', 'Olivia Builder']
    ]
  };
  
  // Check and create department sheets
  for (var dept in departments) {
    var sheet = ss.getSheetByName(dept);
    if (!sheet) {
      sheet = ss.insertSheet(dept);
      sheet.getRange(1, 1, departments[dept].length, departments[dept][0].length).setValues(departments[dept]);
    }
  }
  
  Logger.log('Peer review sheets setup complete!');
}