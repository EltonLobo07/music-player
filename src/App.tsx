import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { Header } from "~/components/Header";
import { SongList } from "~/components/SongList";
import { MusicPlayer } from "~/components/MusicPlayer";

export function App() {
	// const [songListType, setSongListType] = React.useState<"personalized" | "top-tracks">("personalized");

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
					styles.tw.maxWidthWrapper,
					helpers.formatClassName(
						`
							h-full
							overflow-y-auto
							border-8 border-yellow-500
							flex
							flex-col tabAndUp:flex-row
							tabAndUp:gap-x-[3.625rem] laptopAndUp:gap-x-[7.25rem]
							gap-y-[1.8125rem] tabAndUp:gap-y-0
						`
					)
				)}
			>
				<Header />
				<main
					className = {helpers.formatClassName(
						`
							flex
							grow
							border border-green-500
						`
					)}
				>
					<SongList
						className = {helpers.formatClassName(
							`
								hidden laptopAndUp:block
								grow
							`
						)}
					/>
					<MusicPlayer 
						className = {helpers.formatClassName(
							`
								grow
							`
						)}
					/>
				</main>
			</div>
		</div>
	);
}
