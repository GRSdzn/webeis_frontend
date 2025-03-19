import { Avatar, Text } from "@mantine/core";
import classes from './CollapsedUserPopOverContent.module.css'
import { useAppSelector } from "@/store";

export default function CollapsedUserPopOverContent() {
  const { username } = useAppSelector((state) => state.auth.user);


  return (
    <>
      <div className={classes.contentWrapper}>
        <Avatar color={'blue'} radius={'lg'}>A</Avatar>
        <div>
          <Text style={{ fontWeight: 'bold' }} size="md">
            {username}
          </Text>
        </div>
      </div>
    </>
  )
}
