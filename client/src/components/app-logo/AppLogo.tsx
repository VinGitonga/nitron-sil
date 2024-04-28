import { SiMagic } from "react-icons/si";
import { Link } from "react-router-dom";

const AppLogo = () => {
	return (
		<Link to={"/"}>
			<div className="flex items-center space-x-2">
				<div className="p-2 bg-[#ff9900] rounded-full">
					<SiMagic />
				</div>
				<h1 className="text-3xl font-bold">Nitron</h1>
			</div>
		</Link>
	);
};

export default AppLogo;
