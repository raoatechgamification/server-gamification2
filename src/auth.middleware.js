import { verifyToken } from "./jwt";
import User from './user.model';
import Organization from "./organization.model";
import SuperAdmin from "./superadmin.model";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized access" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (role) => {
  return async (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(403).json({ message: 'No role found for user' });
    }

    if (role === 'admin' && userRole === 'superAdmin') {
      const superAdmin = await SuperAdmin.findById(req.user?.id);
      if (!superAdmin) {
        return res.status(403).json({ message: "SuperAdmin not found" });
      }
      req.superAdmin = superAdmin; 
      return next();
    }

    if (userRole === role) {
      if (role === 'admin') {
        const admin = await Organization.findById(req.user?.id);
        if (!admin) {
          return res.status(403).json({ message: "Admin not found" });
        }
        req.admin = admin; 
      }

      if (role === 'superAdmin') {
        const superAdmin = await SuperAdmin.findById(req.user?.id);
        if (!superAdmin) {
          return res.status(403).json({ message: "SuperAdmin not found" });
        }
        req.superAdmin = superAdmin; 
      }

      return next();
    }

    return res.status(403).json({ message: "Forbidden access" });
  };
};
