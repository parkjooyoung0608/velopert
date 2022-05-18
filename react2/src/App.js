import './App.css';
// import Counter from './Counter';
// import InputSample from './InputSample';
import UserList from './UserList';

function App() {
  const users=[
    {
        id: 1,
        username: 'velopert',
        email: 'mirkduddl@naver.com'
    },
    {
        id: 2,
        username: 'peddrtz',
        email: 'rdddl@naver.com'
    },
    {
        id: 3,
        username: 'opert',
        email: 'irkdl@naver.com'
    },
]
  return (
    <UserList users={users}/>  
  );
}

export default App;
