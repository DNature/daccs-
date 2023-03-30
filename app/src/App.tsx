import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Link, Mail, MapPin, MoreHorizontal, Phone } from 'react-feather';
import { DataOutput } from './components';
import { EditUserDetailsForm } from './components/EditUserDetailsForm';
import { GET_USER } from './graphql';

function App() {
	const [openEditModal, setOpenEditModal] = useState(false);
	const { loading, data } = useQuery(GET_USER);

	if (loading) {
		/// this can be replaced with a spinner
		return <span>Loading ...</span>;
	}

	if (!data) {
		return <span>Opps... an error ocurred.</span>;
	}

	const { email, city, firstName, lastName, phoneNumber, accountNumber } =
		data.user;

	return (
		<div className='flex justify-center items-center h-screen w-screen bg-slate-100'>
			{openEditModal && (
				<EditUserDetailsForm
					firstName={firstName}
					lastName={lastName}
					city={city}
					email={email}
					handleClose={() => setOpenEditModal(false)}
				/>
			)}
			<div className='bg-white rounded-lg py-8'>
				<div className='flex items-center justify-between px-8'>
					<div className='flex'>
						<div className='flex items-center font-bold text-xl uppercase rounded-md bg-indigo-100 text-indigo-800 p-3'>
							{firstName[0]}
							{lastName[0]}
						</div>
						<DataOutput
							className='ml-6'
							label='Name'
							value={`${firstName} ${lastName}`}
						/>
					</div>
					<MoreHorizontal className='text-slate-500' />
				</div>
				<div className='inline-grid grid-cols-2 gap-8 p-8 my-8 border-t border-b border-solid border-slate-200'>
					<DataOutput label='Address' value={city} icon={<MapPin />} />
					<DataOutput
						label='IBAN bank account'
						value={accountNumber}
						icon={<Link />}
					/>
					<DataOutput label='Email address' value={email} icon={<Mail />} />
					<DataOutput
						label='Phone number'
						value={phoneNumber}
						icon={<Phone />}
					/>
				</div>

				<div className='px-8'>
					<button
						onClick={() => setOpenEditModal(true)}
						className='w-full py-4 rounded-md bg-indigo-800 text-white'
					>
						Edit profile
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
