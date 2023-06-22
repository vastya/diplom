const { PrismaClient } = require('@prisma/client');
const { badRequest } = require('./util');
const client = new PrismaClient();

exports.getComments = async (req, res) => {
  try {
    const { issueId } = req.params;
    const cmts = await client.comments.findMany({
      where: { issueId: +issueId },
      include: { Users: { select: { username: true, profileUrl: true } } },
    });
    const data = cmts.map(({ Users, ...d }) => ({ ...d, ...Users }));
    res.json(data).end();
  } catch (err) {
    return badRequest(res);
  }
};

exports.createComment = async (req, res) => {
  try {
    const { projectId, ...data } = req.body;
    const cmt = await client.comments.create({ data });
    res.json(cmt).end();
  } catch (err) {
    return badRequest(res);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await client.comments.delete({ where: { id: +req.params.id } });
    res.json({ message: 'The comment is deleted successfully' }).end();
  } catch (err) {
    return badRequest(res);
  }
};
