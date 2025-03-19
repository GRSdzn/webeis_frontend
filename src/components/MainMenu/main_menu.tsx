import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Box, UnstyledButton, Text, ThemeIcon, Collapse, Group, Flex } from '@mantine/core';
import { MenuItemData, MenuData } from '@/store/slices/auth/user.types';
import { IconFolder } from '@tabler/icons-react';
import classes from '@/components/Layout/LayoutTypes/SimpleSideBar.module.css';
import { decodeMenuItem, encodeMenuItem } from '@/utils/encodingUtils';

type MainMenuProps = {
  menu: MenuData[];
  lowerQuery: string;
};

const MainMenu: React.FC<MainMenuProps> = ({ menu, lowerQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [openMenu, setOpenMenu] = useState<{ [key: string]: boolean }>(() => {
    const storedMenus = JSON.parse(localStorage.getItem('openMenus') || '[]');
    return storedMenus.reduce((acc: { [key: string]: boolean }, id: string) => {
      acc[id] = true;
      return acc;
    }, {});
  });

  useEffect(() => {
    const openMenusArray = Object.keys(openMenu).filter((id) => openMenu[id]);
    localStorage.setItem('openMenus', JSON.stringify(openMenusArray));
  }, [openMenu]);

  const hasMatchingDescendant = useCallback(
    (items: MenuItemData[], parentId: string, query: string): boolean => {
      return items.some((item) => {
        if (item.idmenuitemparent !== parentId) return false;
        const captionMatches = (item.caption || '').toLowerCase().includes(query);
        return captionMatches || hasMatchingDescendant(items, item.idmenuitem, query);
      });
    },
    []
  );

  const toggleMenu = (id: string) => {
    setOpenMenu((prev) => ({
      ...prev,
      [id]: !prev[id], // Переключаем состояние для данного ID
    }));
  };

  const closeAllMenu = () => {
    setOpenMenu({});
    localStorage.removeItem('openMenus');
  };

  const renderMenuItems = (items: MenuItemData[], parentId: string | null = null) => {
    const filteredItems = items.filter((item) => {
      if (item.idmenuitemparent !== parentId) return false;
      const captionMatches = (item.caption || '').toLowerCase().includes(lowerQuery);
      const descendantMatches = hasMatchingDescendant(items, item.idmenuitem, lowerQuery);
      return lowerQuery === '' || captionMatches || descendantMatches;
    });

    if (!filteredItems.length) return null;

    const handleNavigate = (item: MenuItemData) => {
      // console.log('mainmenu data', item);
      const pag = { page: 1, limit: 10 };
      const encodedItem = encodeMenuItem(item, undefined, pag);
      navigate(`/client/${item.id_object}?data=${encodedItem}`);
    };
    return (
      <ul>
        {filteredItems.map((item) => {
          const hasChildren = items.some((child) => child.idmenuitemparent === item.idmenuitem);
          const isActive = location.pathname.includes(item.id_object);

          return (
            <Box key={item.idmenuitem}>
              <UnstyledButton
                className={classes.link}
                style={{
                  width: '100%',
                  display: 'flex',
                  gap: '10px',
                  background: openMenu[item.idmenuitem] ? 'var(--mantine-color-blue-light)' : '',
                }}
                onClick={() => (hasChildren ? toggleMenu(item.idmenuitem) : handleNavigate(item))}
              >
                {hasChildren && (
                  <ThemeIcon variant={openMenu[item.idmenuitem] ? 'filled' : 'light'} size={30}>
                    <IconFolder />
                  </ThemeIcon>
                )}
                <Text variant={isActive || openMenu[item.idmenuitem] ? 'gradient' : 'text'}>
                  {item.caption || 'Без названия'}
                </Text>
              </UnstyledButton>
              <Collapse transitionDuration={150} in={openMenu[item.idmenuitem]}>
                {renderMenuItems(items, item.idmenuitem)}
              </Collapse>
            </Box>
          );
        })}
      </ul>
    );
  };

  const renderParentMenu = () =>
    menu
      .filter((menuData) => {
        const parentMatches = menuData.menuname.toLowerCase().includes(lowerQuery);
        const childrenMatch = menuData.menu_item_data.some(
          (item) =>
            (item.caption || '').toLowerCase().includes(lowerQuery) ||
            hasMatchingDescendant(menuData.menu_item_data, item.idmenuitem, lowerQuery)
        );
        return lowerQuery === '' || parentMatches || childrenMatch;
      })
      .map((menuData) => (
        <Box
          key={menuData.idmenu}
          style={{
            background: openMenu[menuData.idmenu] ? 'var(--mantine-color-gray-light)' : '',
          }}
        >
          <UnstyledButton
            bg={openMenu[menuData.idmenu] ? 'var(--mantine-color-blue-light)' : ''}
            className={classes.link}
            onClick={() => toggleMenu(menuData.idmenu)}
          >
            <Group justify="space-between" display="flex">
              <Flex justify="space-between" align="center">
                <ThemeIcon variant={openMenu[menuData.idmenu] ? 'filled' : 'light'} size={30}>
                  <IconFolder />
                </ThemeIcon>
                <Text ml="md" variant={openMenu[menuData.idmenu] ? 'gradient' : 'text'}>
                  {menuData.menuname}
                </Text>
              </Flex>
            </Group>
          </UnstyledButton>
          {openMenu[menuData.idmenu] && renderMenuItems(menuData.menu_item_data)}
        </Box>
      ));

  return (
    <Box style={{ maxWidth: '280px' }}>
      {menu.length > 0 && (
        <UnstyledButton
          display={'flex'}
          c={'var(--mantine-color-blue-filled)'}
          td={'underline'}
          onClick={closeAllMenu}
          mt="sm"
        >
          Закрыть список
        </UnstyledButton>
      )}
      {renderParentMenu()}
    </Box>
  );
};

export default MainMenu;
