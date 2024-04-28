import { FC, ImgHTMLAttributes } from "react";
import { useImage } from "react-image";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	srcList: Array<string>;
}

const Image: FC<ImageProps> = ({ srcList, ...props }) => {
	const { src: _, ...rest } = props;
	const { src } = useImage({
		srcList,
	});
	return <img src={src} {...rest} />;
};

export default Image;
