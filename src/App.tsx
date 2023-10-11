import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";

export function App() {
	return (
		<div
			className = {helpers.formatClassName(
				`
					bg-blue-300
					h-full
				`
			)}
		>
			<div
				className = {twMerge(
					styles.maxWidthWrapper,
					helpers.formatClassName(
						`
							pt-8px tabAndUp:pt-16px laptopAndUp:pt-32px
							h-full
							overflow-y-auto
							border border-black
						`
					)
				)}
			>
				Hello world
			</div>
		</div>
	);
}
