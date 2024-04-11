export default () => ({
  jwt_secret: process.env.JWT_SECRET,
  bcrypt_salt: parseInt(process.env.BCRYPT_SALT),
});
