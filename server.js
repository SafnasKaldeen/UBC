const { urlencoded } = require("body-parser");
const bodyParser = require("body-parser");
const express = require("express");
const { engine } = require("express-handlebars");
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./views/assets/js/DB_Connect.js");
const https = require("https");
const axios = require("axios");
const {
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
} = require("./views/assets/js/DB_Calls.js");
const {
  DATA_CLEANER,
  DATA_CLEANER_2,
  User_Columns,
  Borrow_Columns,
} = require("./views/assets/js/Data_Refiner.js");

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

require("./views/assets/js/prod.js")(app);

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
  })
);

// Function to perform a database query and return a Promise
function queryDatabase(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// Initialize the variables
let mathsCount = 0;
let physicsCount = 0;
let chemistryCount = 0;
let biologyCount = 0;

// Function to retrieve counts from the database
async function updateCounts() {
  try {
    const [mathsResult, physicsResult, chemistryResult, biologyResult] =
      await Promise.all([
        queryDatabase("SELECT COUNT(*) FROM maths"),
        queryDatabase("SELECT COUNT(*) FROM physics"),
        queryDatabase("SELECT COUNT(*) FROM chemistry"),
        queryDatabase("SELECT COUNT(*) FROM biology"),
      ]);

    mathsCount = Math.round(mathsResult[0]["count(*)"]);
    physicsCount = Math.round(physicsResult[0]["count(*)"]);
    chemistryCount = Math.round(chemistryResult[0]["count(*)"]);
    biologyCount = Math.round(biologyResult[0]["count(*)"]);
  } catch (error) {
    console.error("Error querying database:", error);
    throw error; // You can choose to handle or propagate the error
  }
}

// Export a function to retrieve the values
module.exports = () => {
  return {
    getMathsCount: () => mathsCount,
    getPhysicsCount: () => physicsCount,
    getChemistryCount: () => chemistryCount,
    getBiologyCount: () => biologyCount,
  };
};

app.use(express.static("views"));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index", {
    mathsCount: mathsCount,
    physicsCount: physicsCount,
    chemistryCount: chemistryCount,
    biologyCount: biologyCount,
    mathsPercentage: Math.round(
      (mathsCount /
        (mathsCount + physicsCount + chemistryCount + biologyCount)) *
        100
    ),
    physicsPercentage: Math.round(
      (physicsCount /
        (mathsCount + physicsCount + chemistryCount + biologyCount)) *
        100
    ),
    BioPercentage: Math.round(
      (biologyCount /
        (mathsCount + physicsCount + chemistryCount + biologyCount)) *
        100
    ),
    chemistryPercentage: Math.round(
      (chemistryCount /
        (mathsCount + physicsCount + chemistryCount + biologyCount)) *
        100
    ),
  });
});

app.post("/FormPosting", (req, res) => {
  axios
    .post("https://formspree.io/f/xpzgzkla", req.body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  return res.status(200).render("SuccessMsg", {
    showSuccessCard: true,
    message: "Our team will contact you!",
  });
});

app.get("/Admin_Login", (req, res) => {
  res.render("Admin_login");
});

app.get("/User_Login", (req, res) => {
  res.render("User_Login");
});

// Middleware for Admin authentication
const authenticateAdminToken = (req, res, next) => {
  let storedTKN = req.cookies.jwt;

  if (!storedTKN) {
    return res.status(401).render("SuccessMsg", {
      showSuccessCard: false,
      message: "Connection Lost. Please Login Again.",
    });
  }

  try {
    jwt.verify(storedTKN, "jwt_Admin_privateKey");
    next();
  } catch (err) {
    return res.status(403).render("Admin_login");
  }
};

// Middleware for User authentication
const authenticateUserToken = (req, res, next) => {
  let storedTKN = req.cookies.jwt;

  if (!storedTKN) {
    return res.status(401).render("SuccessMsg", {
      showSuccessCard: false,
      message: "No Token Provided !",
    });
  }

  try {
    jwt.verify(storedTKN, "jwt_User_privateKey");
    next();
  } catch (err) {
    return res.status(403).render("User_login");
  }
};

app.post("/Admin_Mode", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM admin WHERE Email_Address = ? AND Password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      res.status(400).render("SuccessMsg", {
        showSuccessCard: false,
        message: "No Token Provided !",
      });
    }

    if (result.length >= 1) {
      const token = jwt.sign(
        { email: email, Role: "Admin" },
        "jwt_Admin_privateKey",
        { expiresIn: "20m" }
      );

      // Set the token as an HTTP-only cookie
      res.cookie("jwt", token, { httpOnly: true }); // Token will expire in 20 min (1200000 ms)
      res.redirect("/admin_portfolio");
    } else {
      res.status(400).render("Admin_login");
    }
  });
});

app.post("/Add_Maths_Rec", authenticateAdminToken, (req, res) => {
  const { Reference_Number, Title, Author, Material_Type } = req.body;
  console.log(req.body);

  Add_Maths_Material(Material_Type, Title, Author, Reference_Number)
    .then((results) => {
      res.render("SuccessMsg", {
        showSuccessCard: true,
        message: "Maths Record Added Successfully.!",
      });
    })

    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .render("SuccessMsg", { showSuccessCard: false, message: "" });
    });
});

app.post("/Edit_Maths_Rec", authenticateAdminToken, (req, res) => {
  const { Reference_Number, Title, Author, Material_Type } = req.body;
  console.log(req.body);

  Edit_Maths_Material(Material_Type, Title, Author, Reference_Number)
    .then((results) => {
      res.render("SuccessMsg", {
        showSuccessCard: true,
        message: "Maths Record Edited Successfully.!",
      });
    })

    .catch((err) => {
      res
        .status(500)
        .render("SuccessMsg", { showSuccessCard: false, message: "" });
    });
});

app.post("/Delete_Maths_Rec", authenticateAdminToken, (req, res) => {
  const { Reference_Number } = req.body;
  console.log(req.body);

  Delete_Maths_Material(Reference_Number)
    .then((results) => {
      res.render("SuccessMsg", {
        showSuccessCard: true,
        message: "Maths Record Deleted Successfully.!",
      });
    })

    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .render("SuccessMsg", { showSuccessCard: false, message: "" });
    });
});

app.post("/Add_Physics_Rec", authenticateAdminToken, (req, res) => {
  const { Reference_Number, Title, Author, Material_Type } = req.body;

  Add_Physics_Material(Material_Type, Title, Author, Reference_Number)
    .then((results) => {
      res.render("SuccessMsg", {
        showSuccessCard: true,
        message: "Physics Record Added Successfully.!",
      });
    })

    .catch((err) => {
      res
        .status(500)
        .render("SuccessMsg", { showSuccessCard: false, message: "" });
    });
});

app.post("/Edit_Physics_Rec", authenticateAdminToken, (req, res) => {
  const { Reference_Number, Title, Author, Material_Type } = req.body;
  console.log(req.body);

  Edit_Physics_Material(Material_Type, Title, Author, Reference_Number)
    .then((results) => {
      res.render("SuccessMsg", {
        showSuccessCard: true,
        message: "Physics Record Editted Successfully.!",
      });
    })

    .catch((err) => {
      res
        .status(500)
        .render("SuccessMsg", { showSuccessCard: false, message: "" });
    });
});

app.post("/Delete_Physics_Rec", authenticateAdminToken, (req, res) => {
  const { Reference_Number } = req.body;

  Delete_Physics_Material(Reference_Number)
    .then((results) => {
      res.render("SuccessMsg", {
        showSuccessCard: true,
        message: "Physics Record Deleted Successfully.!",
      });
    })

    .catch((err) => {
      res
        .status(500)
        .render("SuccessMsg", { showSuccessCard: false, message: "" });
    });
});

app.post("/Add_Bio_Rec", authenticateAdminToken, (req, res) => {
  const { Reference_Number, Title, Author, Material_Type } = req.body;
  console.log(req.body);

  Add_Bio_Material(Material_Type, Title, Author, Reference_Number)
    .then((results) => {
      res.render("SuccessMsg", {
        showSuccessCard: true,
        message: "Biology Record Added Successfully.!",
      });
    })

    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .render("SuccessMsg", { showSuccessCard: false, message: "" });
    });
});

app.post("/Edit_Bio_Rec", authenticateAdminToken, (req, res) => {
  const { Reference_Number, Title, Author, Material_Type } = req.body;

  Edit_Bio_Material(Material_Type, Title, Author, Reference_Number)
    .then((results) => {
      res.render("SuccessMsg", {
        showSuccessCard: true,
        message: "Biology Record Edited Successfully.!",
      });
    })

    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .render("SuccessMsg", { showSuccessCard: false, message: "" });
    });
});

app.post("/Delete_Bio_Rec", authenticateAdminToken, (req, res) => {
  const { Reference_Number } = req.body;
  console.log(req.body);

  Delete_Bio_Material(Reference_Number)
    .then((results) => {
      res.render("SuccessMsg", {
        showSuccessCard: true,
        message: "Biology Record Deleted Successfully.!",
      });
    })

    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .render("SuccessMsg", { showSuccessCard: false, message: "" });
    });
});

app.post("/Add_Chemistry_Rec", authenticateAdminToken, (req, res) => {
  const { Material_Type, Title, Author, Reference_Number } = req.body;
  console.log(req.body);

  Add_Chemistry_Material(Material_Type, Title, Author, Reference_Number)
    .then((results) => {
      res.render("SuccessMsg", {
        showSuccessCard: true,
        message: "Chemistry Record Added Successfully.!",
      });
    })

    .catch((err) => {
      res
        .status(500)
        .render("SuccessMsg", { showSuccessCard: false, message: "" });
    });
});

app.post("/Edit_Chemistry_Rec", authenticateAdminToken, (req, res) => {
  const { Material_Type, Title, Author, Reference_Number } = req.body;

  Edit_Chemistry_Material(Material_Type, Title, Author, Reference_Number)
    .then((results) => {
      res.render("SuccessMsg", {
        showSuccessCard: true,
        message: "Chemistry Record Edited Successfully.!",
      });
    })

    .catch((err) => {
      res
        .status(500)
        .render("SuccessMsg", { showSuccessCard: false, message: "" });
    });
});

app.post("/Delete_Chemistry_Rec", authenticateAdminToken, (req, res) => {
  const { Reference_Number } = req.body;

  Delete_Chemistry_Material(Reference_Number)
    .then((results) => {
      res.render("SuccessMsg", {
        showSuccessCard: true,
        message: "Chemistry Record Deleted Successfully.!",
      });
    })

    .catch((err) => {
      res
        .status(500)
        .render("SuccessMsg", { showSuccessCard: false, message: "" });
    });
});

app.post("/Add_Borrow_Rec", authenticateAdminToken, async (req, res) => {
  const { Reference_Number, BorrowerID, Availability } = req.body;

  try {
    // Add the borrow record
    await Add_Borrow_Details(Reference_Number, BorrowerID, Availability);

    // Update availability in subject tables
    await updateAvailabilityInSubjectTables(Reference_Number, Availability);

    // Render success message after both operations are completed
    res.render("SuccessMsg", {
      showSuccessCard: true,
      message: "Borrow Record Added Successfully!",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("SuccessMsg", { showSuccessCard: false, message: "" });
  }
});

app.post("/Admin_Register", authenticateAdminToken, (req, res) => {
  const {
    email,
    password,
    OTP_of_Admin1,
    OTP_of_Admin2,
    OTP_of_Admin3,
    fname,
    Uni,
    Age,
    Phone_No,
  } = req.body;

  Add_Admin(email, password, fname, Uni, Age, Phone_No)
    .then((results) => {
      res.render("SuccessMsg", {
        showSuccessCard: true,
        message: "Admin Added Successfully !",
      });
    })

    .catch((err) => {
      res.send(err);
      res.status(500).render("SuccessMsg", {
        showSuccessCard: false,
        message: "There is an error in Adding this admin!",
      });
    });
});

app.post("/User_Register", (req, res) => {
  const {
    Full_Name,
    Name_with_Initials,
    Email,
    Contact_Number,
    Whatsapp_Number,
    NIC_Number,
    Address,
    School,
    ID,
  } = req.body;

  Add_User(
    Full_Name,
    Name_with_Initials,
    Email,
    Contact_Number,
    Whatsapp_Number,
    NIC_Number,
    Address,
    School,
    ID
  )
    .then((results) => {
      res.render("SuccessMsg", {
        showSuccessCard: true,
        message: "User Added Successfully !",
      });
    })
    .catch((err) => {
      res.send(err);
      res.status(500).render("SuccessMsg", {
        showSuccessCard: false,
        message: "There is an error in Adding this user!",
      });
    });
});
app.get("/admin_portfolio", authenticateAdminToken, (req, res) => {
  res.render("Admin_portfolio-details");
});

app.get("/admin_Maths", authenticateAdminToken, (req, res) => {
  let sql = "SELECT * FROM maths;";

  db.query(sql, (err, result) => {
    if (err) console.log(err, " is Detected");

    var Maths_DB_string =
      "var data = " + DATA_CLEANER(JSON.stringify(result)) + User_Columns;

    fs.writeFile(
      "views/assets/js/Maths_dataSet.js",
      Maths_DB_string,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully...");
      }
    );
  });

  res.render("Admin_Maths");
});

app.get("/admin_Chemistry", authenticateAdminToken, (req, res) => {
  let sql = "SELECT * FROM chemistry;";

  db.query(sql, (err, result) => {
    if (err) console.log(err, " is Detected");

    var Chemistry_DB_string =
      "var data = " + DATA_CLEANER(JSON.stringify(result)) + User_Columns;

    fs.writeFile(
      "views/assets/js/Chemistry_dataSet.js",
      Chemistry_DB_string,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully...");
      }
    );
  });

  res.render("Admin_Chemistry");
});

app.get("/admin_Physics", authenticateAdminToken, (req, res) => {
  let sql = "SELECT * FROM physics;";

  db.query(sql, (err, result) => {
    if (err) console.log(err, " is Detected");

    var Physics_DB_string =
      "var data = " + DATA_CLEANER(JSON.stringify(result)) + User_Columns;

    fs.writeFile(
      "views/assets/js/Physics_dataSet.js",
      Physics_DB_string,
      function (err) {
        if (err) throw err;
      }
    );
  });

  res.render("Admin_Physics");
});

app.get("/admin_Bio", authenticateAdminToken, (req, res) => {
  let sql = "SELECT * FROM biology;";

  db.query(sql, (err, result) => {
    if (err) console.log(err, " is Detected");

    var Biology_DB_string =
      "var data = " + DATA_CLEANER(JSON.stringify(result)) + User_Columns;

    fs.writeFile(
      "views/assets/js/Biology_dataSet.js",
      Biology_DB_string,
      function (err) {
        if (err) throw err;
      }
    );
  });

  res.render("Admin_Bio");
});

app.get("/admin_Borrowers", authenticateAdminToken, (req, res) => {
  let sql = "SELECT * FROM borrow;";

  db.query(sql, (err, result) => {
    if (err) console.log(err, " is Detected");
    console.log("Logging Biology Database...");

    var Borrower_DB_string =
      "var data = " + DATA_CLEANER_2(JSON.stringify(result)) + Borrow_Columns;

    fs.writeFile(
      "views/assets/js/Borrower_dataSet.js",
      Borrower_DB_string,
      function (err) {
        if (err) throw err;
      }
    );
  });

  res.render("Borrow_Details");
});

app.get("/Register_Admin", authenticateAdminToken, (req, res) => {
  res.render("AdminRegister");
});

app.get("/Register_User", authenticateAdminToken, (req, res) => {
  res.render("UserRegister");
});

app.post("/User_Mode", (req, res) => {
  const { email, ID } = req.body;

  console.log(req.body);

  const sql =
    "SELECT * FROM users WHERE Email_Address = ? AND Membership_ID = ?";
  db.query(sql, [email, ID], (err, result) => {
    if (err) {
      res.render("SuccessMsg", {
        showSuccessCard: false,
        message: "No Token Provided !",
      });
    }

    if (result.length >= 1) {
      const token = jwt.sign(
        { email: email, Role: "User" },
        "jwt_User_privateKey",
        { expiresIn: "20m" }
      );

      // Set the token as an HTTP-only cookie
      res.cookie("jwt", token, { httpOnly: true }); // Token will expire in 20 min (1200000 ms)
      res.redirect("/user_portfolio");
    } else {
      res.status(400).render("User_login");
    }
  });
});

app.get("/user_portfolio", authenticateUserToken, (req, res) => {
  res.render("User_portfolio-details");
});

app.get("/user_Maths", authenticateUserToken, (req, res) => {
  let sql = "SELECT * FROM maths;";

  db.query(sql, (err, result) => {
    if (err) console.log(err, " is Detected");

    var Maths_DB_string =
      "var data = " + DATA_CLEANER(JSON.stringify(result)) + User_Columns;

    fs.writeFile(
      "views/assets/js/Maths_dataSet.js",
      Maths_DB_string,
      function (err) {
        if (err) throw err;
      }
    );
  });

  res.render("User_Maths");
});

app.get("/user_Chemistry", authenticateUserToken, (req, res) => {
  let sql = "SELECT * FROM chemistry;";

  db.query(sql, (err, result) => {
    if (err) console.log(err, " is Detected");
    console.log("Logging Chemistry Database...");

    var Chemistry_DB_string =
      "var data = " + DATA_CLEANER(JSON.stringify(result)) + User_Columns;

    fs.writeFile(
      "views/assets/js/Chemistry_dataSet.js",
      Chemistry_DB_string,
      function (err) {
        if (err) throw err;
      }
    );
  });

  res.render("User_Chemistry");
});

app.get("/user_Physics", authenticateUserToken, (req, res) => {
  let sql = "SELECT * FROM physics;";

  db.query(sql, (err, result) => {
    if (err) console.log(err, " is Detected");
    console.log("Logging Physics Database...");

    var Physics_DB_string =
      "var data = " + DATA_CLEANER(JSON.stringify(result)) + User_Columns;

    fs.writeFile(
      "views/assets/js/Physics_dataSet.js",
      Physics_DB_string,
      function (err) {
        if (err) throw err;
      }
    );
  });

  res.render("User_Physics");
});

app.get("/user_Bio", authenticateUserToken, (req, res) => {
  let sql = "SELECT * FROM biology;";

  db.query(sql, (err, result) => {
    if (err) console.log(err, " is Detected");
    console.log("Logging Biology Database...");

    var Biology_DB_string =
      "var data = " + DATA_CLEANER(JSON.stringify(result)) + User_Columns;

    fs.writeFile(
      "views/assets/js/Biology_dataSet.js",
      Biology_DB_string,
      function (err) {
        if (err) throw err;
      }
    );
  });

  res.render("User_Bio");
});

app.get("/Log_out", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

// Custom 404 page... If the user tries to access a page that doesn't exist... so It should be placed at the end of the file...
app.use((req, res) => {
  res.status(404).render("404");
});

// custom 500 page... to detect the server error...
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).render("500");
});

app.get("/PlayGround", (req, res) => {
  res.render("PlayGround");
});

// Call the function to initially update the counts
updateCounts().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
});
