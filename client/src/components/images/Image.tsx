import { FC, ImgHTMLAttributes } from "react";
import { useImage } from "react-image";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	srcList: Array<string>;
}

/**
 * Custom Image component that uses react-image to load images with a placeholder and optional loading spinner and optimizes image loading
 * @param srcList - List of image sources to load in order of priority
 * @param props - HTMLImageElement props - https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
 * @returns  Image component with optimized image loading
 * 
 * @example
 * ```tsx
 * <Suspense fallback={<Loader2 size={32} />}>
 * 	<Image srcList={["/images/1.jpg", "/images/2.jpg"]} alt="Image" />
 * </Suspense>
 * ```
 * 
 * @note
 * This component is used in the ImageGallery component and you can use it in other components as well.
 * 
 * Accepts all the props of an HTMLImageElement and the srcList prop which is an array of image sources to load in order of priority.
 */

const Image: FC<ImageProps> = ({ srcList, ...props }) => {
	// inject out only the src attribute and pass the rest of the props to the img element
	const { src: _, ...rest } = props;
	const { src } = useImage({
		srcList,
	});
	return <img src={src} {...rest} />;
};

export default Image;
