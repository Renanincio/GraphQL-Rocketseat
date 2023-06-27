import { gql, useQuery } from '@apollo/client';
import { NewUserForm } from './components/NewUserForm';

type User = {
  id: string;
  name: string;
}

export const GET_USER = gql`

  query {
    users {
      id
      name
    }
  }
`;

function App() {

  const { data, loading } = useQuery<{users: User[]}>(GET_USER);

  console.log(data)

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <>
    <ul>
      {data?.users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
      <NewUserForm />
    </>
  )
}

export default App
