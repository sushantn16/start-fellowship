const { Prisma } = require('@prisma/client');

const events = [
    {
        title: 'Event A',
        description: 'Description of Event A',
        location: 'Location A',
        date: new Date('2024-04-01T08:00:00Z'),
    },
    {
        title: 'Event B',
        description: 'Description of Event B',
        location: 'Location B',
        date: new Date('2024-04-15T10:00:00Z'),
    },
];

const users = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: '$2a$10$hX4uHAssr.xze.ld6uYhG.W.XtmjXgW/EHU2yVtQGtBTdFn9.PZyu',
        role: 'USER',
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: '$2a$10$hX4uHAssr.xze.ld6uYhG.W.XtmjXgW/EHU2yVtQGtBTdFn9.PZyu',
        role: 'ADMIN',
    },
];

const startups = [
    {
        name: 'Startup A',
        website: 'https://startupA.com',
        founder: 'Founder A',
        description: 'Description of Startup A',
        city: 'City A',
        country: 'Country A',
        stage: 'IDEA',
    },
    {
        name: 'Startup B',
        website: 'https://startupB.com',
        founder: 'Founder B',
        description: 'Description of Startup B',
        city: 'City B',
        country: 'Country B',
        stage: 'DEVELOPMENT',
    },
];

const messages = [
    {
        content: "Hello, how are you?",
        userId: 1,
        startupId: 1,
    },
    {
        content: "I'm doing well, thank you! How about you?",
        userId: 2,
        startupId: 1,
    },
    {
        content: "I'm great, thanks for asking!",
        userId: 1,
        startupId: 2,
    },
    {
        content: "Do you have any updates on the project?",
        userId: 2,
        startupId: 2,
    },
];

const notes = [
    {
        content: "Remember to follow up with the investor next week.",
        startupId: 1,
    },
    {
        content: "Prepare presentation slides for the upcoming meeting.",
        startupId: 1,
    },
    {
        content: "Discuss marketing strategy with the team.",
        startupId: 2,
    },
    {
        content: "Research potential partnerships for the new project.",
        startupId: 2,
    },
];

const milestones = [
    {
        title: "Launch Website",
        description: "Complete development and launch the company website.",
        startupId: 1,
    },
    {
        title: "Secure Funding",
        description: "Secure funding from investors for the next phase of growth.",
        startupId: 1,
    },
    {
        title: "Product Development",
        description: "Complete development of the product prototype.",
        startupId: 2,
    },
    {
        title: "Market Research",
        description: "Conduct market research to identify target demographics.",
        startupId: 2,
    },
];

const tasks = [
    {
        name: "Develop MVP",
        startupId: 1,
    },
    {
        name: "Create Marketing Plan",
        startupId: 1,
    },
    {
        name: "Prototype Testing",
        startupId: 2,
    },
    {
        name: "Design UI/UX",
        startupId: 2,
    },
    // Add more tasks as needed
];

const files = [
    {
        name: 'File1.jpg',
        userId: 1, // Corresponding to the first user in the users array
        startupId: 1, // Corresponding to the first startup in the startups array
    },
    {
        name: 'File2.jpg',
        userId: 2, // Corresponding to the second user in the users array
        startupId: 2, // Corresponding to the second startup in the startups array
    },
];

module.exports = {
    events,
    users,
    startups,
    messages,
    files,
    notes,
    milestones,
    tasks,
};
