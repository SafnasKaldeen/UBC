function DATA_CLEANER(JSON_STRING) {
  var JSON_STRING = JSON_STRING.replaceAll(
    `"Reference_Number"`,
    `      Borrow:"<a href = '#Borrow'><div class='buttons'><button class='btn-hover color-9'><i class='bi bi-bootstrap-fill'></i></i></button></div></a>",\n      Reference_Number`
  );
  var JSON_STRING = JSON_STRING.replaceAll(',"Title"', ",\n      Title");
  var JSON_STRING = JSON_STRING.replaceAll(',"Author"', ",\n      Author");
  var JSON_STRING = JSON_STRING.replaceAll(
    ',"Material_Type"',
    ",\n      Material_Type"
  );
  var JSON_STRING = JSON_STRING.replaceAll(
    ',"Availablity"',
    ",\n      Availablity"
  );
  //
  var JSON_STRING = JSON_STRING.replaceAll("{", "\n   {\n");
  var JSON_STRING = JSON_STRING.replaceAll("}", "\n   }\n");

  return JSON_STRING;
}

function DATA_CLEANER_2(JSON_STRING) {
  var JSON_STRING = JSON_STRING.replaceAll(
    "Reference_Number",
    ",\n      Reference_Number"
  );
  var JSON_STRING = JSON_STRING.replaceAll(
    ',"BorrowerID"',
    ",\n      BorrowerID"
  );

  var JSON_STRING = JSON_STRING.replaceAll(
    ',"Borrowed_Date"',
    ",\n      Borrowed_Date"
  );
  var JSON_STRING = JSON_STRING.replaceAll(',"Deadline"', ",\n      Deadline");
  var JSON_STRING = JSON_STRING.replaceAll(',"BorrowID"', ",\n      BorrowID");

  var JSON_STRING = JSON_STRING.replaceAll(
    ',"To_Be_Returned"',
    ",\n      To_Be_Returned"
  );
  var JSON_STRING = JSON_STRING.replaceAll(
    "Availablity",
    ",\n      Availablity"
  );
  var JSON_STRING = JSON_STRING.replaceAll("{", "\n   {\n");
  var JSON_STRING = JSON_STRING.replaceAll("}", "\n   }\n");

  return JSON_STRING;
}

const User_Columns = `

var columns = {
    Borrow: 'Borrow',
    Reference_Number: 'Reference_Number',
    Title: 'Title',
    Author: 'Author',
    Material_Type: 'Material_Type',
    Availablity: 'Availablity',
}`;

const Borrow_Columns = `

var columns = {
    Reference_Number: 'Reference_Number',
    BorrowerID: 'BorrowerID',
    Borrowed_Date: 'Borrowed_Date',
    Returned_Date: 'Returned_Date',
    Deadline: 'Deadline'
}`;

exports.DATA_CLEANER = DATA_CLEANER;
exports.DATA_CLEANER_2 = DATA_CLEANER_2;
exports.User_Columns = User_Columns;
exports.Borrow_Columns = Borrow_Columns;
