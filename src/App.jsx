
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';
import { Provider } from 'react-redux';
import store from './redux/store';

// routing
import router from 'routes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import ThemeCustomization from 'themes';

// auth provider

// ==============================|| APP ||============================== //


export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeCustomization>
          <NavigationScroll>
            <RouterProvider router={router} />
          </NavigationScroll>
        </ThemeCustomization>
      </AuthProvider>
    </Provider>
  );
}
