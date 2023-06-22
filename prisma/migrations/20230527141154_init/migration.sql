-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "pwd" TEXT NOT NULL,
    "profileUrl" TEXT NOT NULL DEFAULT '',
    "lastLoggedIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "descr" VARCHAR(200),
    "repo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Members" (
    "id" SERIAL NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lists" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'unnamed list',
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issues" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "summary" VARCHAR(100) NOT NULL,
    "descr" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "listId" INTEGER NOT NULL,
    "reporterId" INTEGER NOT NULL,

    CONSTRAINT "Issues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignees" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "issueId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Assignees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "descr" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issueId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);
