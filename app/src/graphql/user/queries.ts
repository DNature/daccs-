import { gql } from '@apollo/client';

export const GET_USER = gql`
	query GetUser {
		user(id: 1) {
			accountNumber
			city
			email
			firstName
			id
			lastName
			phoneNumber
		}
	}
`;
