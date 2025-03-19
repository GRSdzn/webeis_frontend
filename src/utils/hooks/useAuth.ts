import {
  setUser,
  signInSuccess,
  signOutSuccess,
  useAppSelector,
  useAppDispatch,
  setUserMenu,
} from '@/store';
import appConfig from '@/configs/app.config';
import { REDIRECT_URL_KEY } from '@/constants/app.constant';
import { useNavigate } from 'react-router-dom';
import { SignInCredential } from '@/@types/auth';
import { AuthService } from '@/services/auth/auth.service';
import useQuery from './useQuery';

type Status = 'success' | 'failed';

function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, signedIn } = useAppSelector((state) => state.auth.session);
  const query = useQuery();

  const signIn = async (
    values: SignInCredential
  ): Promise<
    | {
        status: Status;
        message: string;
      }
    | undefined
  > => {
    try {
      const resp = await AuthService.signIn(values.username, values.password);
      const { user, menu_data } = resp;
      dispatch(
        signInSuccess({
          token: user.token,
          refreshToken: '',
          expireTime: 0,
        })
      );
      dispatch(
        setUser({
          token: user.token,
          uuid: user.uuid,
          username: user.username,
        })
      );
      dispatch(
        setUserMenu({
          token: user.token,
          uuid: user.uuid,
          username: user.username,

          menu: menu_data,
        })
      );
      const redirectUrl = query.get(REDIRECT_URL_KEY);
      navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
      return {
        status: 'success',
        message: '',
      };
    } catch (errors: any) {
      return {
        status: 'failed',
        message: errors?.response?.data?.description || errors.toString(),
      };
    }
  };

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    dispatch(
      setUser({
        token: '',
        uuid: '',
        username: '',
        menu: [
          {
            menuname: '',
            real_name: '',
            visible: false,
            idmenu: '',
            menu_item_data: [],
          },
        ],
      })
    );
    navigate(appConfig.unAuthenticatedEntryPath);
  };

  const signOut = async () => {
    // await apiSignOut()
    localStorage.clear();
    handleSignOut();
  };

  return {
    authenticated: token && signedIn,
    signIn,
    signOut,
  };
}

export default useAuth;
