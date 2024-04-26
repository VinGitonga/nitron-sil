import { cn } from "@/lib/utils";
import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
	href: string;
	text: string;
}

const NavItem: FC<NavItemProps> = ({ href, text }) => {
	const location = useLocation();

	/**
	 * Check if the current route path is selected on the navbar
	 */
	const selected = useMemo(() => {
		if (href && location.pathname !== "/") {
			return location.pathname === `/${href}`;
		}

		return false;
	}, [href, location.pathname]);
	return (
		<Link to={href ? `/${href}` : "/"} className={cn("text-sm font-medium transition-colors hover:text-primary", selected ? "text-primary font-semibold" : "text-muted-foreground")}>
			{text}
		</Link>
	);
};

export default NavItem;
