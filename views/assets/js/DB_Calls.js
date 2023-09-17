const db = require("./DB_Connect");

// Add_Admin
function Add_Admin(email, password, fname, Uni, Age, Phone_No) {
  return new Promise((resolve, reject) => {
    db.query(
      `
        INSERT INTO admins (Full_Name, Email_Address, Password, University, Age, Phone_Number)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
      [fname, email, password, Uni, Age, Phone_No],
      (err, results) => {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(results); // Resolve the promise with the results if successful
        }
      }
    );
  });
}

// Add_User
function Add_User(
  Full_Name,
  Name_with_Initials,
  Email,
  Contact_Number,
  Whatsapp_Number,
  NIC_Number,
  Address,
  School,
  ID
) {
  return new Promise((resolve, reject) => {
    db.query(
      `
        INSERT INTO users (Full_Name, Name_with_Initials, Email_Address, Contact_Number, Whatsapp_Number, NIC_Number, Address, School, Membership_ID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
      [
        Full_Name,
        Name_with_Initials,
        Email,
        Contact_Number,
        Whatsapp_Number,
        NIC_Number,
        Address,
        School,
        ID,
      ],
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

// Add_Bio_Material
function Add_Bio_Material(Material_Type, Title, Author, Reference_Number) {
  return new Promise((resolve, reject) => {
    db.query(
      `
        INSERT INTO biology (Material_Type, Title, Author, Reference_Number)
        VALUES (?, ?, ?, ?)
        `,
      [Material_Type, Title, Author, Reference_Number],
      (err, results) => {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(results); // Resolve the promise with the results if successful
        }
      }
    );
  });
}

// Add_Maths_Material
function Add_Maths_Material(Material_Type, Title, Author, Reference_Number) {
  return new Promise((resolve, reject) => {
    db.query(
      `
        INSERT INTO maths (Material_Type, Title, Author, Reference_Number)
        VALUES (?, ?, ?, ?)
        `,
      [Material_Type, Title, Author, Reference_Number],
      (err, results) => {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(results); // Resolve the promise with the results if successful
        }
      }
    );
  });
}

//Add_Physics_Material
function Add_Physics_Material(Material_Type, Title, Author, Reference_Number) {
  return new Promise((resolve, reject) => {
    db.query(
      `
        INSERT INTO physics (Material_Type, Title, Author, Reference_Number)
        VALUES (?, ?, ?, ?)
        `,
      [Material_Type, Title, Author, Reference_Number],
      (err, results) => {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(results); // Resolve the promise with the results if successful
        }
      }
    );
  });
}

//Add_Chemistry_Material
function Add_Chemistry_Material(
  Material_Type,
  Title,
  Author,
  Reference_Number
) {
  return new Promise((resolve, reject) => {
    db.query(
      `
        INSERT INTO chemistry (Material_Type, Title, Author, Reference_Number)
        VALUES (?, ?, ?, ?)
        `,
      [Material_Type, Title, Author, Reference_Number],
      (err, results) => {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(results); // Resolve the promise with the results if successful
        }
      }
    );
  });
}

//Edit_Bio_Material
function Edit_Bio_Material(Material_Type, Title, Author, Reference_Number) {
  return new Promise((resolve, reject) => {
    db.query(
      `
        UPDATE biology
        SET Material_Type = ?,
            Title = ?,
            Author = ?
        WHERE Reference_Number = ?
        `,
      [Material_Type, Title, Author, Reference_Number],
      (err, results) => {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(results); // Resolve the promise with the results if successful
        }
      }
    );
  });
}

//Edit_Maths_Material
function Edit_Maths_Material(Material_Type, Title, Author, Reference_Number) {
  return new Promise((resolve, reject) => {
    db.query(
      `
        UPDATE maths
        SET Material_Type = ?,
            Title = ?,
            Author = ?
        WHERE Reference_Number = ?
        `,
      [Material_Type, Title, Author, Reference_Number],
      (err, results) => {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(results); // Resolve the promise with the results if successful
        }
      }
    );
  });
}

//Edit_Physics_Material
function Edit_Physics_Material(Material_Type, Title, Author, Reference_Number) {
  return new Promise((resolve, reject) => {
    db.query(
      `
        UPDATE physics
        SET Material_Type = ?,
            Title = ?,
            Author = ?
        WHERE Reference_Number = ?
        `,
      [Material_Type, Title, Author, Reference_Number],
      (err, results) => {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(results); // Resolve the promise with the results if successful
        }
      }
    );
  });
}

//Edit_Chemistry_Material
function Edit_Chemistry_Material(
  Material_Type,
  Title,
  Author,
  Reference_Number
) {
  return new Promise((resolve, reject) => {
    db.query(
      `
        UPDATE chemistry
        SET Material_Type = ?,
            Title = ?,
            Author = ?
        WHERE Reference_Number = ?
        `,
      [Material_Type, Title, Author, Reference_Number],
      (err, results) => {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(results); // Resolve the promise with the results if successful
        }
      }
    );
  });
}

//Delete_Maths_Material
function Delete_Maths_Material(Reference_Number) {
  return new Promise((resolve, reject) => {
    // Define the SQL procedure
    const deleteProcedure = `
        CALL Delete_Maths_Material(?);
        DROP PROCEDURE IF EXISTS Delete_Maths_Material;
        CREATE PROCEDURE Delete_Maths_Material(IN p_Reference_Number VARCHAR(15))
        BEGIN
            DELETE FROM maths
            WHERE Reference_Number = p_Reference_Number;
        END;
      `;

    // Execute the SQL procedure
    db.query(deleteProcedure, [Reference_Number], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

//Delete_Bio_Material
function Delete_Bio_Material(Reference_Number) {
  return new Promise((resolve, reject) => {
    // Define the SQL procedure
    const deleteProcedure = `
        CALL Delete_Bio_Material(?);
        DROP PROCEDURE IF EXISTS Delete_Bio_Material;
        CREATE PROCEDURE Delete_Bio_Material(IN p_Reference_Number VARCHAR(25))
        BEGIN
            DELETE FROM biology
            WHERE Reference_Number = p_Reference_Number;
        END;
      `;

    // Execute the SQL procedure
    db.query(deleteProcedure, [Reference_Number], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

//Delete_Physics_Material
function Delete_Physics_Material(Reference_Number) {
  return new Promise((resolve, reject) => {
    // Define the SQL procedure
    const deleteProcedure = `
        CALL Delete_Physics_Material(?);
        DROP PROCEDURE IF EXISTS Delete_Physics_Material;
        CREATE PROCEDURE Delete_Physics_Material(IN p_Reference_Number VARCHAR(15))
        BEGIN
            DELETE FROM physics
            WHERE Reference_Number = p_Reference_Number;
        END;
      `;

    // Execute the SQL procedure
    db.query(deleteProcedure, [Reference_Number], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

//Delete_Chemistry_Material
function Delete_Chemistry_Material(Reference_Number) {
  return new Promise((resolve, reject) => {
    // Define the SQL procedure
    const deleteProcedure = `
        CALL Delete_Chemistry_Material(?);
        DROP PROCEDURE IF EXISTS Delete_Chemistry_Material;
        CREATE PROCEDURE Delete_Chemistry_Material(IN p_Reference_Number VARCHAR(15))
        BEGIN
            DELETE FROM chemistry
            WHERE Reference_Number = p_Reference_Number;
        END;
      `;

    // Execute the SQL procedure
    db.query(deleteProcedure, [Reference_Number], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

//Add_Borrow_Details
function Add_Borrow_Details(Reference_Number, BorrowerID, Availability) {
  return new Promise((resolve, reject) => {
    let Borrowed_Date, Deadline, Returned_Date;

    if (Availability === "Returned") {
      Returned_Date = new Date();
      Deadline = null;
      Borrowed_Date = null;
    } else {
      Borrowed_Date = new Date();
      const twoDaysLater = new Date();
      twoDaysLater.setDate(twoDaysLater.getDate() + 2);
      Deadline = twoDaysLater;
      Returned_Date = null;
    }

    db.query(
      `
          INSERT INTO borrow (Reference_Number, BorrowerID, Availablity, Borrowed_Date, Returned_Date, Deadline)
          VALUES (?, ?, ?, ?, ?, ?)
        `,
      [
        Reference_Number,
        BorrowerID,
        Availability,
        Borrowed_Date,
        Returned_Date,
        Deadline,
      ],
      (err, results) => {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(results); // Resolve the promise with the results if successful
        }
      }
    );
  });
}

function updateAvailabilityInSubjectTables(Reference_Number, Availability) {
  const subjectTables = ["maths", "physics", "chemistry", "biology"]; // Add more tables if needed

  const promises = subjectTables.map((table) => {
    return new Promise((resolve, reject) => {
      const subjectUpdateSQL = `
          UPDATE ${table}
          SET Availablity = ?
          WHERE Reference_Number = ?
        `;

      db.query(
        subjectUpdateSQL,
        [Availability, Reference_Number],
        (err, subjectUpdateResult) => {
          if (err) {
            reject(err);
          } else {
            resolve(subjectUpdateResult);
          }
        }
      );
    });
  });

  return Promise.all(promises);
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
  Add_Borrow_Details,
  updateAvailabilityInSubjectTables,
};
