const bcrypt = require("bcrypt");
const MongoLib = require("../../lib/mongo");
const { config } = require("../../config/index");

function buildAdminUser(password) {
  return {
    password,
    username: config.adminUser
  };
}

async function hasAdminUser(mongoDB) {
  const adminUser = await mongoDB.getAll("users", {
    username: config.adminUser
  });

  return adminUser && adminUser.length;
}

async function createAdminUser(mongoDB) {
  const hashedPassword = await bcrypt.hash(config.adminPassword, 10);
  const userId = await mongoDB.create("users", buildAdminUser(hashedPassword));
  return userId;
}

async function seedAdmin() {
  try {
    const mongoDB = new MongoLib();

    if (await hasAdminUser(mongoDB)) {
      console.log("Admin user already exists");
      return process.exit(1);
    }

    const adminUserId = await createAdminUser(mongoDB);
    console.log("Admin user created with id:", adminUserId);
    return process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seedAdmin();