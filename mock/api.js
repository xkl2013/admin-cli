export function login(req, res) {
  const { password, username, type } = req.body;
  if (password === '123456' && username === 'admin') {
    res.send({
      status: 'ok',
      code: 2000,
      type,
      currentAuthority: 'admin',
      msg: '登录成功',
    });
    return;
  }
  res.send({
    status: 'error',
    type,
    code: 4001,
    msg: '输入信息有误',
    currentAuthority: 'guest',
  });
}
export function currentUser(req, res) {
  const { type } = req.body;
  res.send({
    status: 'ok',
    code: 2000,
    type,
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    msg: '成功',
  });
}
