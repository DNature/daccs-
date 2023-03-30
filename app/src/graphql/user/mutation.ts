import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
	mutation UpdateUser($data: UserUpdateInput = {}) {
		updateUser(data: $data, id: 1) {
			... on Error {
				__typename
				message
			}
			... on MutationUpdateUserSuccess {
				__typename
				data {
					accountNumber
					city
					email
					firstName
					id
					lastName
					phoneNumber
				}
			}
		}
	}
`;
