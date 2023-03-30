import { FC, InputHTMLAttributes, Ref, forwardRef } from 'react';

interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export const FormInput: FC<IFormInput> = forwardRef(
	({ label, name, ...rest }, ref: Ref<HTMLInputElement>) => (
		<div className='flex flex-col mb-6'>
			<label className='text-slate-500 mb-2' htmlFor={name}>
				{label}
			</label>
			<input
				className='rounded h-12 p-4 border-2'
				ref={ref}
				name={name}
				{...rest}
			/>
		</div>
	)
);
