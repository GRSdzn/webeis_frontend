import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CardViewMenuItemData } from '@/@types/Client Types/CardViewTypes';
import { encodeMenuItem } from '@/utils/encodingUtils';
import classes from './MenuItemTable.module.css';

type MenuItemTableProps = {
  menuItems: CardViewMenuItemData[];
  type: number;
};

const MenuItemTable: React.FC<MenuItemTableProps> = ({ menuItems, type }) => {
  if (!menuItems || menuItems.length === 0) return null;

  const [searchParams] = useSearchParams();

  // Generates a link for each menu item and opens in a new tab
  const handleItemClick = (item: CardViewMenuItemData) => {
    const mergedMenuItem = {
      ...item,
      p_param: item.p_param ?? {},
    };

    console.log(
      'item.id_object:',
      item.id_object,
      'p_param:',
      item.p_param,
      'frametype:',
      item.frametype
    );

    console.log('mergedMenuItem', mergedMenuItem);
    const pagin = {
      limit: 10,
      page: 1,
    };
    const encodedItem = encodeMenuItem(mergedMenuItem, item.p_param, pagin);

    // Open the encoded link in a new tab
    window.open(`/client/${item.id_object}?data=${encodedItem}`, '_blank');
  };

  return (
    <nav className={classes.menu}>
      <ul className={classes.menuList}>
        {menuItems.map((item) => {
          const isActive = searchParams.get('data') === encodeMenuItem(item, item.p_param ?? {});

          return (
            <li key={item.idmenuitem} onClick={() => handleItemClick(item)}>
              <span
                className={isActive ? `${classes.menuItem} ${classes.active}` : classes.menuItem}
              >
                {item.caption}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MenuItemTable;
