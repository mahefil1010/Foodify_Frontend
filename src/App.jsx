import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';

// routing
import router from 'routes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import ThemeCustomization from 'themes';

// auth provider

// ==============================|| APP ||============================== //

export default function App() {
  return (
    <AuthProvider>
      <ThemeCustomization>
        <NavigationScroll>
          <RouterProvider router={router} />
        </NavigationScroll>
      </ThemeCustomization>
    </AuthProvider>
  );
}
