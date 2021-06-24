import { gql } from '@apollo/client';

export const GET_USER = gql`
  query ($email: String!, $password: String!) {
    user(email: $email, password: $password) {
      name,
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation ($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      name,
      email
    }
  }
`;