import dva from 'dva';
import browserHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import './index.css';

// 1. Initialize  // m默认使用browserHistory模式,如果使用hash请查看文档使用
const app = dva({ history: browserHistory() });

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./config/router.config').default);

// 5. Start
app.start('#root');
