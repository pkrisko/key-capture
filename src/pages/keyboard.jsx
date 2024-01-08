import Keyboard from '../components/Keyboard';
import Header from '../components/Header';
import { useAuthContext } from '../providers/auth';

const KeyboardPage = () => {
  const auth = useAuthContext();

  return (
    <>
      <Header {...auth.user} />
      <Keyboard className="mt-8" />
    </>
  );
};

export default KeyboardPage;
