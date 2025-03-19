import { useState } from 'react';
import Views from '@/components/Layout/Views';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from '@/components/Layout/LayoutTypes/SimpleSideBar.module.css';
import { Card, Input, UnstyledButton } from '@mantine/core';
import SimpleSideBarBottomContent from '@/components/Layout/LayoutTypes/SimpleSideBarBottomContent';
import { useTranslation } from 'react-i18next';
import MainMenu from '@/components/MainMenu/main_menu';
import { useAppSelector } from '@/store';
import { IconSearch } from '@tabler/icons-react';
import useDebounce from '@/utils/hooks/useDebounce';

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  // const [active, setActive] = useState('');
  const { t } = useTranslation();
  const menu = useAppSelector((state) => state.auth.user?.menu);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 600);
  const lowerQuery = debouncedSearchQuery.trim().toLowerCase();

  // useEffect(() => {
  //   const currentPath = location.pathname.split('/')[1];
  //   setActive(currentPath);
  // }, [location.pathname]);

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <UnstyledButton>
          <h2 onClick={() => navigate('/')}>Веб ЕИС</h2>
        </UnstyledButton>
        {/* {links} */}
        <Input
          key={'mainmenusearchinput'}
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          mb="md"
          leftSection={<IconSearch size={14} />}
          rightSection={
            searchQuery !== '' ? (
              <Input.ClearButton onClick={() => setSearchQuery('')} />
            ) : undefined
          }
          rightSectionPointerEvents="auto"
          size="sm"
        />
        {/* используем ссылки с меню */}
        <MainMenu menu={menu ?? []} lowerQuery={lowerQuery} />
      </div>
      <SimpleSideBarBottomContent />
    </nav>
  );
}

export default function SimpleSideBar() {
  return (
    <div
      style={{
        overflow: 'hidden',
        backgroundColor: 'rgb(236,236,236)',
        display: 'flex',
        flex: '1 1 auto',
        height: '100vh',
      }}
    >
      <SideBar />
      <div
        style={{
          padding: '2rem',
          backgroundColor: '#ffffff',
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Card
          style={{
            overflowY: 'auto',
            maxHeight: '100%',
            width: '100%',
            flex: 1,
          }}
          radius={15}
          withBorder
          p={40}
        >
          <Views />
        </Card>
      </div>
    </div>
  );
}
