const getToken = (authHeader) => {
  const token = authHeader && authHeader.split(" ")[1];
  return token;
};

module.exports = getToken;