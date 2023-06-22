const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  // Create Users
  const user1 = await prisma.users.create({
    data: {
      email: 'john.doe@example.com',
      username: 'johndoe',
      pwd: 'password1',
    },
  });

  const user2 = await prisma.users.create({
    data: {
      email: 'jane.smith@example.com',
      username: 'janesmith',
      pwd: 'password2',
    },
  });

  // Create Projects
  const project1 = await prisma.projects.create({
    data: {
      name: 'Project 1',
      descr: 'This is the first project',
      userId: user1.id,
    },
  });

  const project2 = await prisma.projects.create({
    data: {
      name: 'Project 2',
      descr: 'This is the second project',
      userId: user2.id,
    },
  });

  const project3 = await prisma.projects.create({
    data: {
      name: 'Project 3',
      descr: 'This is the third project',
      userId: user1.id,
    },
  });

  // Create Lists
  const list1 = await prisma.lists.create({
    data: {
      name: 'To Do',
      order: 1,
      projectId: project1.id,
    },
  });

  const list2 = await prisma.lists.create({
    data: {
      name: 'In Progress',
      order: 2,
      projectId: project1.id,
    },
  });

  const list3 = await prisma.lists.create({
    data: {
      name: 'Done',
      order: 3,
      projectId: project1.id,
    },
  });

  const list4 = await prisma.lists.create({
    data: {
      name: 'To Do',
      order: 1,
      projectId: project2.id,
    },
  });

  const list5 = await prisma.lists.create({
    data: {
      name: 'In Progress',
      order: 2,
      projectId: project2.id,
    },
  });

  const list6 = await prisma.lists.create({
    data: {
      name: 'Done',
      order: 3,
      projectId: project2.id,
    },
  });

  const list7 = await prisma.lists.create({
    data: {
      name: 'To Do',
      order: 1,
      projectId: project3.id,
    },
  });

  const list8 = await prisma.lists.create({
    data: {
      name: 'In Progress',
      order: 2,
      projectId: project3.id,
    },
  });

  const list9 = await prisma.lists.create({
    data: {
      name: 'Done',
      order: 3,
      projectId: project3.id,
    },
  });

  // Create Issues
  const issue1 = await prisma.issues.create({
    data: {
      order: 1,
      priority: 2,
      type: 1,
      summary: 'Implement user authentication',
      descr: 'Implement user authentication functionality using JWT',
      listId: list1.id,
      reporterId: user1.id,
    },
  });

  const issue2 = await prisma.issues.create({
    data: {
      order: 2,
      priority: 1,
      type: 1,
      summary: 'Create project management dashboard',
      descr: 'Create a dashboard to manage projects and tasks',
      listId: list1.id,
      reporterId: user2.id,
    },
  });

  const issue3 = await prisma.issues.create({
    data: {
      order: 3,
      priority: 3,
      type: 2,
      summary: 'Fix bug in data export module',
      descr: 'There is a bug causing data export to fail, investigate and fix it',
      listId: list2.id,
      reporterId: user1.id,
    },
  });

  const issue4 = await prisma.issues.create({
    data: {
      order: 1,
      priority: 1,
      type: 3,
      summary: 'Add search functionality',
      descr: 'Implement search functionality to allow users to search for projects and issues',
      listId: list4.id,
      reporterId: user2.id,
    },
  });

  // Create Comments
  const comment1 = await prisma.comments.create({
    data: {
      descr: 'This is a comment on Issue 1',
      issueId: issue1.id,
      userId: user1.id,
    },
  });

  const comment2 = await prisma.comments.create({
    data: {
      descr: 'This is a comment on Issue 2',
      issueId: issue2.id,
      userId: user2.id,
    },
  });

  const comment3 = await prisma.comments.create({
    data: {
      descr: 'This is a comment on Issue 3',
      issueId: issue3.id,
      userId: user1.id,
    },
  });

  const comment4 = await prisma.comments.create({
    data: {
      descr: 'This is a comment on Issue 4',
      issueId: issue4.id,
      userId: user2.id,
    },
  });

  console.log('Seed data created successfully.');
  await prisma.$disconnect();
}

seed().catch((error) => {
  console.error('Error seeding data:', error);
  process.exit(1);
});
