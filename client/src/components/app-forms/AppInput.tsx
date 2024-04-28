import { Control } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ChangeEvent } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface IProps {
	label: string;
	name: string;
	control?: Control<any>;
	placeholder?: string;
	value?: string | number;
	type?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	helperText?: string;
}
/**
 * A reusable input component for forms in the application
 * @param label - The label for the input
 * @param name - The name of the input
 * @param control - The control object from react-hook-form for form validation
 * @param placeholder - The placeholder for the input
 * @param value - The value of the input in controlled mode without react-hook-form
 * @param type - The type of the input
 * @param onChange - The change event handler for the input in controlled mode without react-hook-form
 * @param helperText - The helper text for the input field to provide additional information
 * @returns  A reusable input component for forms in the application
 */

const AppInput = ({ label, name, control, placeholder, value, onChange, type = "text", helperText }: IProps) => {
	return control ? (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input {...field} placeholder={placeholder} type={type} />
					</FormControl>
					{helperText && <FormDescription>{helperText}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	) : (
		<div className="flex flex-col space-y-2">
			<Label htmlFor={name}>{label}</Label>
			<Input name={name} placeholder={placeholder} value={value} onChange={onChange} type={type} />
			{helperText && <p className="text-sm text-gray-500">{helperText}</p>}
		</div>
	);
};

export default AppInput;
