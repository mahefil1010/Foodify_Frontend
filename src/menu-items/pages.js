// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const lookups = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'lookup',
      title: 'Lookups',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'menu',
          title: 'Menu',
          type: 'item',
          url: '/pages/menu',
          target: true
        }
      ]
    }
  ]
};

export default lookups;
