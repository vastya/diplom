const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { badRequest, cookieConfig } = require('./util');

const client = new PrismaClient();

exports.getUsers = async (req, res) => {
  try {
    const { q } = req.query;
    const users = await client.users.findMany({
      where: { username: { contains: q } },
      select: { id: true, username: true, email: true, profileUrl: true },
    });
    res.json(users).end();
  } catch (err) {
    return badRequest(res);
  }
};

exports.getAuthUser = async (req, res) => {
  try {
    const { pwd, ...user } = await client.users.findFirst({ where: { id: req.user.uid } });
    res.json(user).end();
  } catch (err) {
    return res.clearCookie('task-manager', cookieConfig).status(401).end();
  }
};

exports.updateAuthUser = async (req, res) => {
  try {
    const user = await client.users.update({ where: { id: req.user.uid }, data: req.body });
    res.json(user).end();
  } catch (err) {
    return badRequest(res);
  }
};

exports.deleteAuthUser = async (req, res) => {
  try {
    const { pwd } = req.body;
    const user = await client.users.findFirst({ where: { id: req.user.uid } });
    const isValidPwd = await bcrypt.compare(pwd, user.pwd);
    if (!isValidPwd) return res.status(401).json({ message: 'password is incorrect :(' }).end();
    const result = await client.users.delete({ where: { id: req.user.uid } });
    res.clearCookie('task-manager').json(result).end();
  } catch (err) {
    return badRequest(res);
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await client.users.findFirst({
      where: { id: +userId },
      select: { id: true, username: true, email: true, profileUrl: true },
    });
    res.json(user).end();
  } catch (err) {
    return badRequest(res);
  }
};
