
import { gql, useQuery } from '@apollo/client';



const USER_FRAG = gql`
  fragment userFrag on User {
    id
    index
    picture
    age
    eyeColor
    name
    company
    email
    phone
    greeting
  }
`
const FIND_QUERY = gql`
  ${USER_FRAG}
  query FIND_QUERY($name:String){
    find(name:$name) {
      id
      name
      ...userFrag
      friends {
        ...userFrag
      }
    }
  }
`
export interface User {
  id: string
  index?: number
  picture?: string
  age?: string
  eyeColor?: string
  name?: string
  company?: string
  email?: string
  phone?: string
  friends?: [User]
  greeting?: string
}

//custom react-hook example using useQuery
function useFind({ name }: { name:string }): [User] | null {
  const { loading, error, data } = useQuery(FIND_QUERY, { variables: { name }, });
  if (loading) return null;
  if (error) //example error handling, could be swapped to something that handled and prevented an app crash
    throw new Error(`Failed to fetch users with query:  ${FIND_QUERY}, and variables: ${{ name }}`);
  return data.find;
}

//fetch example using apollo's client directly. for accessibility be used with WithApollo() HoF that inject client into props
// function find({ client, name } : { client: client , name:string }){

// }

export { 
  FIND_QUERY,
  useFind,
  // find
}