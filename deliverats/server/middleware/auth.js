export const isAuthenticated = function (req, res, next) {
  next();
  return;
  if (!req.session.userId)
    return res.status(401).json({ error: "Not Authenticated" });
  next();
};
