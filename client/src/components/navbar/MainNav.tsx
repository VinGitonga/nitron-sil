import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, ReactNode } from "react";

interface IProps extends HTMLAttributes<HTMLElement> {
	navItems: ReactNode | ReactNode[];
}

const MainNav: FC<IProps> = ({ navItems, className, ...props }) => {
	return (
		<nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
			{navItems}
		</nav>
	);
};

export default MainNav;
