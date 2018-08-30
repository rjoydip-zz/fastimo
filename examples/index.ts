import { App } from "../src";

const app = App(3001);

app.then(() => {
  console.log('server is listining 3001');
});
