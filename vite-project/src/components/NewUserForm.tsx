import { FormEvent, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_USER } from "../App";

const CREATE_USER = gql`
  mutation($name: String!){
    createUser(name: $name){
      id
      name
    }
  }
`

export function NewUserForm() {

    const [name, setName] = useState('');
    const [createUser, { data }] = useMutation(CREATE_USER)

        async function HandleCreateUser(event:FormEvent){
            event.preventDefault();

            if(!name){
                return;
            }

            await createUser({
                variables: {
                    name: name
                },
                refetchQueries: [GET_USER]
            })
            

            console.log(data);
        }

    return (
        <form onSubmit={HandleCreateUser}>
            <label>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <button type="submit">Criar</button>
        </form>
    )

}