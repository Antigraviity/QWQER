const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: "mysql://admin:QwerDB%2312@qwqer-db.czcic6c4iepa.eu-north-1.rds.amazonaws.com:3306/qwqer_db"
      }
    }
  });

  try {
    await prisma.$connect();
    console.log("Connection successful!");
    const dbs = await prisma.$queryRaw`SHOW DATABASES;`;
    console.log("Databases:", dbs);
  } catch (e) {
    console.error("Connection failed:");
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
