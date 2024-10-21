const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../Models/adminModel");
const mongoose = require("mongoose");


// encrypting passwords
const bcryptSalt = bcrypt.genSaltSync(10);

// Function to log details for debugging bcrypt
const debugBcrypt = async (plainTextPassword, hashedPassword) => {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    console.log(
      `Comparing passwords: entered: ${plainTextPassword}, stored (hashed): ${hashedPassword}, match: ${match}`
    );
  
    const manuallyHashedPassword = await bcrypt.hash(plainTextPassword, 10);
    console.log(`Manually hashed entered password: ${manuallyHashedPassword}`);
  
    const manualMatch = manuallyHashedPassword === hashedPassword;
    console.log(`Manual match: ${manualMatch}`);
  
    return match;
  };

class AuthenticationController {
  static async login(req, res) {
    try {
        const AdminDoc = await Admin.findOne({ email: req.body.email });
    
        if (!AdminDoc) {
          return res.status(404).send("Ce compte de Client nous le trouve pas");
        }
    
        const match = await debugBcrypt(req.body.password, AdminDoc.password);
    
        if (!match) {
          return res.status(401).send("Incorrect password");
        }
    
        const token = jwt.sign(
          { userId: AdminDoc._id,
            email: AdminDoc.email,
            name: AdminDoc.name
           },
           process.env.JWT_SECRET || "default_secret_key",
          { expiresIn: "72h" }
        );
        console.log("token", token);
    
        res.json({ token });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
  }

  static async register(req, res) {

    const { name, email, password } = req.body;
       // Check for missing fields
       if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }
    try {
      const userDoc = await Admin.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  }

  static async logout(req, res) {
    res.clearCookie("token").send("Logged out");
  }

    static async Getprofile(req, res) {
        try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { name, email, _id } = await Admin.findById(decoded.userId);
        res.json({ name, email, _id });
        }  catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = AuthenticationController;
