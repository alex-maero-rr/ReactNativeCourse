export interface Client {
  id: string,
  name: string,
  email: string,
}

export interface Credentials {
  user: string;
  password: string;
}

// export interface AddCredentials {
//   user: string;
//   email: string
// }

export type RootStackParamList = {
  Login: {setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>} | undefined;
  Register: undefined;
  List: undefined;
  AddForm: {setIsAdded: React.Dispatch<React.SetStateAction<boolean>>} | undefined;
};
​
