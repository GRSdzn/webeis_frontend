import { Avatar, Text } from "@mantine/core";
import classes from './PopOverTargetContent.module.css';
import { useAppSelector } from "@/store";

// Функция для получения инициалов из username
function getInitials(username: string): string {
  // Убираем домен (если есть) и разделяем по точке
  const nameParts = username.split('\\').pop()?.split('.') || [];

  // Берем первые буквы имени и фамилии
  const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
  const lastNameInitial = nameParts[1]?.charAt(0).toUpperCase() || '';

  // Возвращаем инициалы в формате "O.P"
  return `${firstNameInitial}${lastNameInitial ? '.' + lastNameInitial : ''}`;
}

export default function PopOverTargetContent() {
  const { username } = useAppSelector((state) => state.auth.user);

  // Получаем инициалы
  const initials = getInitials(username || '');

  return (
    <>
      <div className={classes.contentWrapper}>
        <Avatar color={'blue'} radius={'lg'}>
          {initials}
        </Avatar>
        <div>
          <Text style={{ fontWeight: 'bold' }} size="md">
            {username}
          </Text>
        </div>
      </div>
    </>
  );
}