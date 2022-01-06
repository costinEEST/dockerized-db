import { createConnection } from "mysql2/promise";
import Koa from 'koa';

let db;
const server = new Koa();

async function go() {
  try {
    const con = await createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'example',
      database: 'pets'
    })

    db = con
  } catch (e) {
    console.log(e)
  }
}


go();

server.use(async (ctx) => {
  const [users] = await db.execute('SELECT * FROM users');

  ctx.body = `
  <ul>
    ${users.map(({ name }) => `<li>${name}</li>`).join('')}
  </ul>
  `
});

server.listen(3000, function () {
  console.log('Listening on: ', this.address());
})