const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({});

prisma.user.count()
    .then(count => {
        console.log('User count:', count);
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
