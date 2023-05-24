import { createRoot } from 'react-dom/client';
import { App } from './App';
import 'mapbox-gl/dist/mapbox-gl.css';
import './assets/styles/index.css';


if(document.getElementById('root')){
    const Index = createRoot(document.getElementById('root'));

    Index.render(
        <App />
    );
}
