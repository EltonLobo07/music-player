import React from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { Header } from "~/components/Header";
import { SongList } from "~/components/SongList";
import { MusicPlayer } from "~/components/MusicPlayer";
import { songsService } from "~/services/songsService";
import { Song } from "~/types";

export function App() {
	const [selectedData, setSelectedData] = 
		React.useState<
			{
				category: "personalized" | "top-tracks",
				songIdx: number
			}
		>(
			{
				category: "personalized",
				songIdx: -1
			}
		);
	const [songs, setSongs] = React.useState<Song[]>([]);

	React.useEffect(() => {
		void (async () => {
			try {
				setSongs(await songsService.getByCategory(selectedData.category));
			}
			catch(error) {
				console.log(error);
			}
		})();
	}, [selectedData.category]);

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
						$category = {selectedData.category}
						$onCategoryChange = {newCategory => setSelectedData({
							category: newCategory,
							songIdx: -1
						})}
						$songIdx = {selectedData.songIdx}
						$songs = {songs}
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
