const { PrismaClient } = require('@prisma/client');
const { events, users, startups, messages, files, notes, milestones, tasks } = require('./data.js');
const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.event.deleteMany();
        console.log('Deleted records in event table');

        await prisma.file.deleteMany();
        console.log('Deleted records in file table');

        await prisma.message.deleteMany();
        console.log('Deleted records in message table');

        await prisma.task.deleteMany();
        console.log('Deleted records in task table');

        await prisma.note.deleteMany();
        console.log('Deleted records in note table');

        await prisma.milestone.deleteMany();
        console.log('Deleted records in milestone table');

        await prisma.startup.deleteMany();
        console.log('Deleted records in startup table');

        await prisma.user.deleteMany();
        console.log('Deleted records in user table');

        // Reset auto increment to 1
        await prisma.$executeRaw`ALTER SEQUENCE "Milestone_id_seq" RESTART WITH 1`;
        console.log('Reset milestone auto increment to 1');

        await prisma.$executeRaw`ALTER SEQUENCE "Task_id_seq" RESTART WITH 1`;
        console.log('Reset task auto increment to 1');

        await prisma.$executeRaw`ALTER SEQUENCE "Note_id_seq" RESTART WITH 1`;
        console.log('Reset note auto increment to 1');

        await prisma.$executeRaw`ALTER SEQUENCE "Message_id_seq" RESTART WITH 1`;
        console.log('Reset message auto increment to 1');

        await prisma.$executeRaw`ALTER SEQUENCE "File_id_seq" RESTART WITH 1`;
        console.log('Reset file auto increment to 1');

        await prisma.$executeRaw`ALTER SEQUENCE "Event_id_seq" RESTART WITH 1`;
        console.log('Reset event auto increment to 1');

        await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
        console.log('Reset user auto increment to 1');

        await prisma.$executeRaw`ALTER SEQUENCE "Startup_id_seq" RESTART WITH 1`;
        console.log('Reset startup auto increment to 1');

        await prisma.event.createMany({
            data: events,
        });
        console.log('Added event data');

        await prisma.user.createMany({
            data: users,
        });
        console.log('Added user data');

        await prisma.event.update({
            where: { id: 1 },
            data: {
                users: {
                    connect: { id: 1 },
                },
            },
        })

        await prisma.event.update({
            where: { id: 2 },
            data: {
                users: {
                    connect: { id: 2 },
                },
            },
        })

        await prisma.startup.createMany({
            data: startups,
        });
        console.log('Added startup data');

        await prisma.startup.update({
            where: { id: 1 },
            data: {
                users: {
                    connect: { id: 1 },
                },
            },
        })

        await prisma.startup.update({
            where: { id: 2 },
            data: {
                users: {
                    connect: { id: 2 },
                },
            },
        })

        await prisma.file.createMany({
            data: files,
        });
        console.log('Added file data');

        await prisma.message.createMany({
            data: messages,
        });
        console.log('Added messages data');

        await prisma.note.createMany({
            data: notes,
        });
        console.log('Added notes data');

        await prisma.milestone.createMany({
            data: milestones,
        });
        console.log('Added milestones data');

        await prisma.task.createMany({
            data: tasks,
        });
        console.log('Added tasks data');

    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();