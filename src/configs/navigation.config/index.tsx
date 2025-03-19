import type { NavigationTree } from '@/@types/navigation';
import { IconDashboard, IconFile, IconUser } from '@tabler/icons-react';

const navigationConfig: NavigationTree[] = [
  {
    key: 'dashboard',
    path: '/dashboard',
    title: 'Панель управления',
    translateKey: '',
    icon: IconDashboard,
    authority: [],
    subMenu: []
  },
  {
    key: 'users',
    path: '/users',
    title: 'Пользователи',
    translateKey: '',
    icon: IconUser,
    authority: [],
    subMenu: []
  },
  {
    key: 'client',
    path: '/client/4',
    title: 'Вьюер',
    translateKey: '',
    icon: IconFile,
    authority: [],
    subMenu: []
  },
];

export default navigationConfig;
