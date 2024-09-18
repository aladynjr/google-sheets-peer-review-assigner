function onFormSubmit(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var responseSheet = ss.getSheetByName('Form Responses 1');
  var lastRow = responseSheet.getLastRow();
  var lastRowData = responseSheet.getRange(lastRow, 1, 1, responseSheet.getLastColumn()).getValues()[0];
  
  var timestamp = lastRowData[0];
  var name = lastRowData[1];
  var email = lastRowData[2];
  var department = lastRowData[3];
  
  var deptSheet = ss.getSheetByName(department);
  
  if (!deptSheet) {
    Logger.log('Department sheet not found: ' + department);
    return;
  }
  
  var deptData = deptSheet.getDataRange().getValues();
  var employees = deptData.slice(1).map(function(row) { return row[1]; });
  
  var submitterIndex = employees.indexOf(name);
  if (submitterIndex > -1) {
    employees.splice(submitterIndex, 1);
  }
  
  var reviewers = [];
  for (var i = 0; i < 3 && employees.length > 0; i++) {
    var randomIndex = Math.floor(Math.random() * employees.length);
    reviewers.push(employees[randomIndex]);
    employees.splice(randomIndex, 1);
  }
  
  responseSheet.getRange(lastRow, 5, 1, 3).setValues([reviewers]);
  
  Logger.log('Assigned reviewers for ' + name + ': ' + reviewers.join(', '));
}

function assignReviewersToExistingResponses() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var responseSheet = ss.getSheetByName('Form Responses 1');
  var lastRow = responseSheet.getLastRow();
  
  for (var i = 2; i <= lastRow; i++) {
    var rowData = responseSheet.getRange(i, 1, 1, responseSheet.getLastColumn()).getValues()[0];
    if (rowData[4] === '' && rowData[5] === '' && rowData[6] === '') {
      onFormSubmit({values: rowData});
    }
  }
}