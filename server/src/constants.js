exports.PORT = 5000;
exports.DB_PASSWORD = "dev123";
exports.DB_USERNAME = "postgres";
exports.JWT_SECRET = "secret@123";
exports.COOKIE_NAME = "swupp-qid";
exports.SESSION_SECRET = "ilovecats";
exports.__prod__ = process.env.NODE_ENV === "production";
