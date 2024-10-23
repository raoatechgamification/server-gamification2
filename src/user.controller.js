const User = require("./user.model"); 
const Organization = require("./organization.model"); 
const { comparePassword, hashPassword } = require("./hash");
const { generateToken } = require("./jwt");

class UserAuthController {
  async registerUser(req, res, next) {
    try {
      let { email, username, organizationId, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          success: false, 
          message: "A user has been registered with this email",
        })  
      }

      const usernameExists = await User.findOne({ username });

      if (usernameExists) {
        return res.status(400).json({
          success: false, 
          message: "This username is unavailable",
        })    
      }

      password = await hashPassword(password);

      if (organizationId) {
        const organizationDetails = await Organization.findById(organizationId);

        if (!organizationDetails)
          return ResponseHandler.failure(
            res,
            "Organization does not exist",
            400
          );
      }

      const newUser = await User.create({
        username,
        email,
        password,
        organization: organizationId,
      });

      const userResponse = await User.findById(newUser._id).select("-password -role");

      return res.status(201).json({
        success: true, 
        message: "User account created successfully",
        data: userResponse,
      })
    } catch (error) {
      return res.status(500).json({
        success: false, 
        message: "An error occurred",
      })    
    }
  }

  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const registeredUser = await User.findOne({ email });

      if (!registeredUser) {
        return res.status(400).json({
          success: false, 
          message: "User does not exist",
        })
      }

      const checkPassword = await comparePassword(
        password,
        registeredUser.password
      );

      if (!checkPassword) {
        return res.status(400).json({
          success: false, 
          message: "You have entered an incorrect password",
        })
      }

      const payload = {
        id: registeredUser._id, 
        email: registeredUser.email,
        username: registeredUser.username,
        phone: registeredUser.phone,
        organization: registeredUser.organization,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        role: registeredUser.role,
      };

      const token = await generateToken(payload);

      const userResponse = await User.findById(registeredUser._id).select("-password -role");

      return res.status(200).json({
        success: true, 
        message: "Login Successful",
        token,
        data: userResponse,
      })
    } catch (error) {
      return res.status(500).json({
        success: false, 
        message: "An error occurred",
      })
    }
  }
}

module.exports = UserAuthController 