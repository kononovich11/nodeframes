const Koa = require('koa');
const Router = require('koa-router');
const Joi = require('@hapi/joi');
const serve = require('koa-static');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const session = require('koa-generic-session');
const render = require('koa-ejs');
const path = require('path');

const app = new Koa();
const router = new Router();
let db = [];
app.keys = ['Shh, its a secret!'];


render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});


app.use(serve('./text'));
app.use(serve('./images'));
// app.use(serve(__dirname + '/public'));
app.use(session(app));


const schema = Joi.object({
  firstName: Joi.string()
      .min(3)
      .max(30)
      .required(),
  
  lastName: Joi.string()
      .min(3)
      .max(30)
      .required(),

  description: Joi.string()
      .min(3)
      .required(),
  
  mark: Joi.string()
      .required()
});


app.use(json());
app.use(bodyParser());

//index

// const page = async((ctx,next) => {

// });

// const layout = async (ctx, next) => {
//   await ctx.render('index', { sessionCounter: ctx.state.sessionCounter });
// }

router.get('/', async (ctx, next) => {
  await ctx.render('index',  { data: ctx.session.data });
});

router.post('/quiz', async (ctx, next) => {
  try {
    // const answer = await schema.validateAsync(ctx.request.body);
    // db.push(answer);
    // ctx.body = ctx.request.body;
    // print();
   
      const body = ctx.request.body;
      const { firstName, lastName, description, mark } = body;
      ctx.session.data = ctx.session.data || [];
      ctx.session.data.push({ firstName, lastName, description, mark });
      console.log(ctx.session.data);
  
      // return data(ctx, next);
 
  }
  catch (err) { 
    console.log(err);
  }
});

router.get('/answers', async ctx => {
  ctx.body = db;
});

async function print() {
  console.log(db);
}

// async function counter(ctx, next) {
//   let count = ctx.session.views || 0;
//   ctx.session.views = ++count;
//   ctx.body = count + 'views';
// }

// router.post('/', async ctx => {
//   await console.log(ctx.request.body);
// })

//simple middleware example
// app.use(async ctx => (ctx.body = {mes: 'hey'}));

// router.get('/test', async ctx => (ctx.body = 'get test'));
// router.post('/index.html', async ctx => (console.log(ctx.request.body)));
//router middleware

app
.use(router.routes())
.use(router.allowedMethods());



app.listen(3000);




















// const koa = require('koa');
// const router = require('koa-router');
// const serve = require('koa-static');
// const app = new koa();
// const session = require('koa-generic-session');
// const init = router();
// // const KoaBody = require('koa-body');

// // koaBody = convert(KoaBody());

// // init.get('/get', getData);

// // function getData(ctx, next) {
// //   console.log('nfj');
// //   ctx.body = 'get data';
// //   next();
// // }

// // app.use(init.routes());


// app.use(serve(__dirname + '/public'));

// app.use(async(ctx, next) => {
//   ctx.body = 'get data';
//   await next();
// });

// app.use(async(ctx, next) => {
//   ctx.body = 'change data';
//   await next();
// });

// app.keys = ['Shh, its a secret!'];
// app.use(session(app));
// app.use(async(ctx, next) => {
//   let count = ctx.session.views || 0;
//   ctx.session.views = ++count;
//   ctx.body = count + 'views';
//   next();
// });

// // init.post('/', async (ctx, next) => {
// //   console.log('lala');
// // });

// app.use(async(ctx) => {
//  if(ctx.method === 'POST') {
//    console.log(ctx.request.body); //bodyParser
//  }
// });

// // app.use(serve(__dirname + '/public'));

// app.listen(3000);