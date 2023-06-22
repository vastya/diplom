const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { badRequest, cookieConfig } = require('./util');

const client = new PrismaClient();

exports.register = async (req, res) => {
  try {
    if (await findUser(req.body.email))
      return res.status(409).json({ message: 'user with this email already exists' }).end();
    const pwd = await bcrypt.hash(req.body.pwd, 10);
    const user = await client.users.create({ data: { ...req.body, pwd } });
    const token = generateJwt({ uid: user.id });
    createCookie(res, token);
    await client.members.create({ data: { userId: user.id, projectId: 1 } });
    res.json(user).end(); // send back newly created user obj
  } catch (err) {
    return badRequest(res);
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const user = await findUser(email);
    if (!user)
      return res.status(409).json({ message: 'no account was registered with this email' }).end();
    const isValidPwd = await bcrypt.compare(pwd, user.pwd);
    if (!isValidPwd) return res.status(401).json({ message: 'password is incorrect :(' }).end();
    const token = generateJwt({ uid: user.id });
    await client.users.update({
      where: { id: user.id },
      data: { lastLoggedIn: new Date().toISOString() },
    });
    createCookie(res, token);
    res.json(user).end();
  } catch (err) {
    return badRequest(res);
  }
};

exports.logOut = (req, res) => {
  res.clearCookie('task-manager', cookieConfig).end();
};

exports.changePwd = async (req, res) => {
  try {
    const { oldPwd, newPwd } = req.body;
    const id = +req.user.uid;
    const user = await client.users.findFirst({ where: { id } });
    const isValidPwd = await bcrypt.compare(oldPwd, user.pwd);
    if (!isValidPwd) return res.status(401).json({ message: 'old password is incorrect :(' }).end();
    const pwd = await bcrypt.hash(newPwd, 10);
    await client.users.update({ where: { id }, data: { pwd } });
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    return badRequest(res);
  }
};

exports.authMiddleware = (req, res, next) => {
  const cookie = req.cookies['task-manager'];
  if (!cookie)
    return res
      .status(401)
      .json({ status: 401, message: 'please log in to access this resource' })
      .end();
  const token = JSON.parse(cookie).token;
  try {
    req.user = jwt.verify(token, 'secret');
    next();
  } catch (err) {
    return res
      .clearCookie('task-manager', cookieConfig)
      .status(401)
      .json({ message: err.message })
      .end();
  }
};

const generateJwt = (payload) =>
  jwt.sign(payload, 'secret', { expiresIn: '15d' });

const findUser = async (email) => client.users.findFirst({ where: { email } });

function createCookie(res, token) {
  res.cookie('task-manager', JSON.stringify({ token }), {
    expires: new Date(Date.now() + 1296000000), // 15 days
    ...cookieConfig,
  });
}
