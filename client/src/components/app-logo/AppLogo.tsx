import { Link } from "react-router-dom";
import { TbRadioactive } from "react-icons/tb";

const AppLogo = () => {
	return (
		<Link to={"/"}>
			<div className="flex items-center space-x-2" data-cy="app-logo">
				<div className="p-2 bg-[#ff9900] rounded-full">
					<TbRadioactive className="text-white w-6 h-6" />
				</div>
				<h1 className="text-3xl font-bold">Nitron</h1>
			</div>
		</Link>
	);
};

export default AppLogo;
