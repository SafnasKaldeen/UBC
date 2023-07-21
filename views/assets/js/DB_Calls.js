const db = require('./DB_Connect');

function Add_Admin(email, password, fname, Uni, Age, Phone_No) {
    return new Promise((resolve, reject) => {
      db.query(
        'CALL Add_Admin(?, ?, ?, ?, ?, ?)',
        [email, password, fname, Uni, Age, Phone_No],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  
  function Add_User(Full_Name, Name_with_Initials, Email, Contact_Number, Whatsapp_Number, NIC_Number, Address, School, ID) {
    return new Promise((resolve, reject) => {
      db.query(
        'CALL Add_User(?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [Full_Name, Name_with_Initials, Email, Contact_Number, Whatsapp_Number, NIC_Number, Address, School, ID],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  
  function Add_Bio_Material(Material_Type , Title , Author , Reference_Number) {
      return new Promise((resolve, reject) => {
       db.query(
           'CALL Add_Bio_Material(?, ?, ?, ?)',
              [Material_Type , Title , Author , Reference_Number],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              }
          );
      });     
  }
  
  function Add_Maths_Material(Material_Type , Title , Author , Reference_Number) {
      return new Promise((resolve, reject) => {
       db.query(
           'CALL Add_Maths_Material(?, ?, ?, ?)',
              [Material_Type , Title , Author , Reference_Number],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              }
          );
      });     
  }
  
  function Add_Physics_Material(Material_Type , Title , Author , Reference_Number) {
      return new Promise((resolve, reject) => {
       db.query(
           'CALL Add_Physics_Material(?, ?, ?, ?)',
              [Material_Type , Title , Author , Reference_Number],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              }
          );
      });     
  }
  
  function Add_Chemistry_Material(Material_Type , Title , Author , Reference_Number) {
      return new Promise((resolve, reject) => {
       db.query(
           'CALL Add_Chemistry_Material(?, ?, ?, ?)',
              [Material_Type , Title , Author , Reference_Number],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              }
          );
      });     
  }
  
  function Edit_Bio_Material(Material_Type , Title , Author , Reference_Number) {
      return new Promise((resolve, reject) => {
       db.query(
           'CALL Edit_Bio_Material(?, ?, ?, ?)',
              [Material_Type , Title , Author , Reference_Number],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              }
          );
      });     
  }
  
  function Edit_Maths_Material(Material_Type , Title , Author , Reference_Number) {
      return new Promise((resolve, reject) => {
       db.query(
           'CALL Edit_Maths_Material(?, ?, ?, ?)',
              [Material_Type , Title , Author , Reference_Number],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              }
          );
      });     
  }
  
  function Edit_Physics_Material(Material_Type , Title , Author , Reference_Number) {
      return new Promise((resolve, reject) => {
       db.query(
           'CALL Edit_Physics_Material(?, ?, ?, ?)',
              [Material_Type , Title , Author , Reference_Number],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              }
          );
      });     
  }
  
  function Edit_Chemistry_Material(Material_Type , Title , Author , Reference_Number) {
      return new Promise((resolve, reject) => {
       db.query(
           'CALL Edit_Chemistry_Material(?, ?, ?, ?)',
              [Material_Type , Title , Author , Reference_Number],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              }
          );
      });     
  }
  
  function Delete_Maths_Material(Reference_Number) {
      return new Promise((resolve, reject) => {
       db.query(
           'CALL Delete_Maths_Material(?)',
              [Reference_Number],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              }
          );
      });     
  }
  
  function Delete_Bio_Material(Reference_Number) {
      return new Promise((resolve, reject) => {
       db.query(
           'CALL Delete_Bio_Material(?)',
              [Reference_Number],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              }
          );
      });     
  }
  
  function Delete_Physics_Material(Reference_Number) {
      return new Promise((resolve, reject) => {
       db.query(
           'CALL Delete_Physics_Material(?)',
              [Reference_Number],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              }
          );
      });     
  }
  
  function Delete_Chemistry_Material(Reference_Number) {
      return new Promise((resolve, reject) => {
       db.query(
           'CALL Delete_Chemistry_Material(?)',
              [Reference_Number],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              }
          );
      });     
  }

  function Add_Borrow_Details(Reference_Number , BorrowrID , Availability) {
    return new Promise((resolve, reject) => {
        db.query(
            'CALL Add_Borrow_Details(?, ?)',
            [Reference_Number , BorrowrID , Availability],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    });
}

  module.exports = {
    Add_Admin,
    Add_User,
    Add_Bio_Material,
    Add_Maths_Material,
    Add_Physics_Material,
    Add_Chemistry_Material,
    Edit_Bio_Material,
    Edit_Maths_Material,
    Edit_Physics_Material,
    Edit_Chemistry_Material,
    Delete_Maths_Material,
    Delete_Bio_Material,
    Delete_Physics_Material,
    Delete_Chemistry_Material,
    Add_Borrow_Details
  };
  