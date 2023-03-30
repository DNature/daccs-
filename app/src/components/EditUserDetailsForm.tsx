import { useMutation } from '@apollo/client';
import { FC } from 'react';
import { X } from 'react-feather';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { UPDATE_USER } from '../graphql';
import { FormInput } from './FormInput';

interface IEditUserDetailsFormProps {
	firstName: string;
	lastName: string;
	email: string;
	city: string;
	handleClose: () => void;
}

export const EditUserDetailsForm: FC<IEditUserDetailsFormProps> = ({
	handleClose,
	firstName,
	lastName,
	email,
	city,
}) => {
	const { register, handleSubmit } = useForm();
	const [updateUser, { loading }] = useMutation(UPDATE_USER);

	/**
	 *
	 * In a real world scenario, I'd handle form errors as well as loading state.
	 */

	const onSubmit: SubmitHandler<FieldValues> = async (inputData) => {
		const { data } = await updateUser({
			variables: {
				data: inputData,
			},
		});
		// to ensure that it saves properly
		if (!loading && data.updateUser.__typename !== 'Error') {
			handleClose();
		} else {
			alert('An error ocurred.');
		}
	};

	return (
		<div className='absolute w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.3)]'>
			<div className='bg-white min-w-[400px] p-8 rounded-lg relative'>
				<button onClick={handleClose} className='absolute top-4 right-4 '>
					<X className='text-slate-500 cursor-pointer' />
				</button>

				<h2 className='text-xl mb-6 font-bold'>Edit details</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						label='First Name'
						{...register('firstName')}
						defaultValue={firstName}
					/>
					<FormInput
						label='Last Name'
						{...register('lastName')}
						defaultValue={lastName}
					/>
					<FormInput
						label='Email'
						{...register('email')}
						defaultValue={email}
					/>
					<FormInput label='City' {...register('city')} defaultValue={city} />
					<button
						type='submit'
						className='w-full py-4 rounded-md bg-indigo-800 text-white'
					>
						Save
					</button>
				</form>
			</div>
		</div>
	);
};
