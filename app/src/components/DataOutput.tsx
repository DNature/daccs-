import { cloneElement, FC, ReactElement } from 'react';

interface IDataOutputProps {
	icon?: ReactElement;
	label: string;
	value: string;
	className?: string;
}

export const DataOutput: FC<IDataOutputProps> = ({
	icon,
	label,
	value,
	className,
}) => {
	return (
		<div className={`flex items-center ${className}`}>
			{icon &&
				cloneElement(icon, {
					className: 'text-slate-500 mr-4',
				})}
			<div className='max-w-[200px]'>
				<div className='mb-1 text-slate-500'>{label}</div>
				<div className='font-semibold break-words'>{value}</div>
			</div>
		</div>
	);
};
