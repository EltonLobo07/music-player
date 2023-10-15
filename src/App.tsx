import React from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { Header } from "~/components/Header";
import { SongList } from "~/components/SongList";
import { MusicPlayer } from "~/components/MusicPlayer";
import { songsService } from "~/services/songsService";
import { Song } from "~/types";
import { FilterCustomProps } from "~/type-helpers";
import { Background } from "~/components/Background";

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

	const songListPropCommonCustomProps: FilterCustomProps<React.ComponentProps<typeof SongList>> = {
		$category: selectedData.category,
		$onCategoryChange: newCategory => setSelectedData({
			category: newCategory,
			songIdx: -1
		}),
		$songs: songs,
		$onSongClick: newSongIdx => setSelectedData({...selectedData, songIdx: newSongIdx})
	};

	return (
		<div
			className = {helpers.formatClassName(
				`
					text-white
					h-full
					relative
					isolate
					font-inter
				`
			)}
		>
			{/*
				For performance reasons, 
					I prefer using transitions only for "transform" and "opacity",
					that's why I have made a resuable Background component
			*/}
			<Background 
				$background = {
					`linear-gradient(108.18deg, ${selectedData.songIdx !== -1 ? songs[selectedData.songIdx].bgAccent : "black"} 2.46%, black 99.84%)`
				}
				className = "z-0"
			/>
			<div
				className = {twMerge(
					styles.tw.maxWidthWrapper,
					helpers.formatClassName(
						`
							flex
							flex-col tabAndUp:flex-row
							tabAndUp:gap-x-[1.8125rem] laptopAndUp:gap-x-[7.25rem]
							gap-y-[1.8125rem] tabAndUp:gap-y-0
							h-full
							z-10
						`
					)
				)}
			>
				<Header 
					{...songListPropCommonCustomProps}
				/>
				<main
					className = {helpers.formatClassName(
						`
							flex
							grow
							overflow-y-auto
							tabAndUp:max-h-full
						`
					)}
				>
					<SongList
						{...songListPropCommonCustomProps}
						className = {helpers.formatClassName(
							`
								hidden laptopAndUp:flex
                        		laptopAndUp:flex-col
								mr-[10.125rem]
							`
						)}
					/>
					<MusicPlayer 
						$song = {selectedData.songIdx === -1 ? null : songs[selectedData.songIdx]}
						$onNextSongBtnClick = {() => {
							if (songs.length > 1 && selectedData.songIdx !== -1) {
								setSelectedData({
									...selectedData,
									songIdx: (selectedData.songIdx + 1) % songs.length
								});
							}
						}}
						$onPrevSongBtnClick = {() => {
							if (songs.length > 1 && selectedData.songIdx !== -1) {
								setSelectedData({
									...selectedData,
									songIdx: 
										selectedData.songIdx === 0
										? songs.length - 1
										: selectedData.songIdx - 1
								});
							}
						}}
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
