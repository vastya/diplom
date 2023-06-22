const { PrismaClient } = require('@prisma/client');
const { badRequest } = require('./util');

const client = new PrismaClient();

exports.getMembersInProject = async (req, res) => {
  try {
    const { projectId } = req.customParams;
    const members = await client.members.findMany({
      where: { projectId: +projectId },
      orderBy: { createdAt: 'asc' },
      include: { Users: { select: { username: true, email: true, profileUrl: true } } },
    });
    const users = members.map(({ Users, ...memberData }) => ({
      ...memberData,
      ...Users,
    }));
    res.json(users).end();
  } catch (err) {
    return badRequest(res);
  }
};

exports.addMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;
    const member = client.members.create({
      data: { userId, projectId: +projectId },
    });
    const project = client.projects.update({
      where: { id: projectId },
      data: { updatedAt: new Date(Date.now()).toISOString() },
    });
    await Promise.all([member, project]);
    res.json(member).end();
  } catch (err) {
    return badRequest(res);
  }
};

exports.removeMember = async (req, res) => {
  try {
    const { memberId: id, projectId, userId } = req.body;
    const member = client.members.delete({ where: { id } });
    const removeAssignees = client.assignees.deleteMany({ where: { AND: { userId, projectId } } });
    const project = client.projects.update({
      where: { id: projectId },
      data: { updatedAt: new Date(Date.now()).toISOString() },
    });
    await Promise.all([member, removeAssignees, project]);
    res.json(member).end();
  } catch (err) {
    return badRequest(res);
  }
};
