import { render } from 'react-dom';
import App from './App';





import {Provider} from 'react-redux'
import ConfigureStore from './Store';
import "frappe-gantt/dist/frappe-gantt.js";

const store = ConfigureStore();

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

