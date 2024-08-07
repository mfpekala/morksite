import Dropdown from "./testdrop";
import SLink from "./slink";
import useGoTo from "../hooks/useGoTo";
import { useEffect, useRef, useState } from "react";
import { SpotifyWebApi } from "spotify-web-api-ts";

interface Props {
  isBlogPost?: boolean;
}

export default function Navbar({ isBlogPost }: Props) {
  const goTo = useGoTo();

  const spotifyRef = useRef<SpotifyWebApi | null>(null);

  const [lastSong, setLastSong] = useState<{
    title: string;
    artist: string;
    trackUrl: string;
    artistUrl: string;
    timeString1: string;
    timeString2: string;
    timeString3: string;
  } | null>(null);

  useEffect(() => {
    const doSpotify = async () => {
      try {
        const refreshToken = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH;
        const res = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          body: `refresh_token=${refreshToken}&grant_type=refresh_token&client_id=${process.env.NEXT_PUBLIC_SPOTIFY_ID}&client_secret=${process.env.NEXT_PUBLIC_SPOTIFY_SECRET}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        /// A NOTE TO ANYONE READING THIS:
        /// Yes I'm just putting this secret in plaintext and yes that's bad
        /// BUT this is a hobby fun site and I trust that Spotify devs have 
        /// fenced it so all you can do with this secret is read what songs I've
        /// listened to, so not that worried

        // const refreshToken = "AQAmxAJD3vfNcfYnDuu4rKlyHueABb7y653uIHZ3WOzxaljePKdURm8ZnI-hkUo_rfpX7aNFfF665eHKM-CI4qnZdOa067JevR5PyCwa06o5di3QXl5EWlZQjlDV2l4EPUw";
        // const res = await fetch("https://accounts.spotify.com/api/token", {
        //   method: "POST",
        //   body: `refresh_token=${refreshToken}&grant_type=refresh_token&client_id=8f81405b8d764a89849403cf4f30c625&client_secret=155e00d113994cdcb75ff18b7d993213`,
        //   headers: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //   },
        // });

        const clean = await res.json();

        spotifyRef.current = new SpotifyWebApi({
          accessToken: clean.access_token,
        });
        const trackRes =
          await spotifyRef.current.player.getRecentlyPlayedTracks({
            limit: 1,
          });
        const now = new Date();
        const then = new Date(trackRes.items[0].played_at);
        const diffMins = Math.floor(
          (now.getTime() - then.getTime()) / 1000 / 60
        );
        const diffHours = Math.floor(diffMins / 60);
        let timeString1 = "Right now, ";
        let timeString2 = "I'm";
        let timeString3 = " listening to ";
        if (diffMins > 10 && diffHours < 1) {
          timeString1 = `${diffMins} minutes ago `;
          timeString2 = "I";
          timeString3 = ` listened to `;
        } else if (diffHours >= 1) {
          timeString1 = `${diffHours} hours ago `;
          timeString2 = "I";
          timeString3 = ` listened to `;
        }
        const track = trackRes.items[0].track;
        setLastSong({
          title: track.name,
          trackUrl: track.external_urls.spotify,
          artist: track.artists[0].name,
          artistUrl: track.artists[0].external_urls.spotify,
          timeString1,
          timeString2,
          timeString3,
        });
      } catch (e) {
        const fallbackSong = {
          artist: "R.A.P. Ferreira",
          artistUrl: "https://open.spotify.com/artist/2U1vwQRYQmG7ypKJF1JTEb",
          title: "fighting back",
          trackUrl: "https://open.spotify.com/track/12WtBygLM06NOYXm3aiQoD",
          timeString1: `${Math.floor(Math.random() * 24) + 1} hours ago `,
          timeString2: `I`,
          timeString3: ` listened to `,
        };
        setLastSong(fallbackSong);
      }
    };
    doSpotify();
  }, []);

  return (
    <div className="w-full my-8">
      <div className="flex">
        <h1 className={`text-4xl mb-2 ${isBlogPost ? "cursor-pointer" : ""}`} onClick={isBlogPost ? undefined : goTo("/")}>
          {isBlogPost ? "Some(thoughts)" : "Mark.md"}
        </h1>
        <div className="flex-1" />
        <Dropdown
          className="sm:hidden"
          buttons={[
            { text: "About / Home", onClick: goTo("/") },
            { text: "Experience", onClick: goTo("/experience") },
            { text: "Projects", onClick: goTo("/projects") },
            { text: "Blog", onClick: goTo("/posts") },
            // { text: "Contact", onClick: goTo("/contact") },
          ]}
        />
      </div>
      <div className="">
        {lastSong ? (
          <div className="flex mb-4 items-center text-xs">
            <p className={`${lastSong ? "" : "hidden"}`}>
              {lastSong?.timeString1 || ""}
              <SLink
                className={`${lastSong ? "" : "hidden"}`}
                target="_blank"
                href="https://open.spotify.com/user/mpek66?si=8e586285aca84768"
                isBlogPost={isBlogPost}
              >
                {lastSong?.timeString2 || ""}
              </SLink>
              {lastSong?.timeString3 || ""}
              <SLink
                className={`${lastSong ? "" : "hidden"}`}
                target="_blank"
                href={lastSong?.trackUrl || ""}
                isBlogPost={isBlogPost}
              >
                {lastSong?.title || ""}
              </SLink>{" "}
              by{" "}
              <SLink
                className={`${lastSong ? "" : "hidden"}`}
                target="_blank"
                href={lastSong?.artistUrl || ""}
                isBlogPost={isBlogPost}
              >
                {lastSong?.artist || ""}
              </SLink>
              .
            </p>
          </div>
        ) : (
          <div className="flex w-2/3 h-4 mb-4 animate-pulse bg-slate-300" />
        )}
      </div>
      <div className="hidden sm:flex flex-row">
        <SLink className="text-lg mr-8" href="/" isBlogPost={isBlogPost}>
          About
        </SLink>
        <SLink
          className="text-lg mr-8"
          href="/experience"
          isBlogPost={isBlogPost}
        >
          Experience
        </SLink>
        <SLink
          className="text-lg mr-8"
          href="/projects"
          isBlogPost={isBlogPost}
        >
          Projects
        </SLink>
        <SLink className="text-lg mr-8" href="/posts" isBlogPost={isBlogPost}>
          Blog
        </SLink>
        {/* <SLink className="text-lg mr-8" href="/contact" isBlogPost={isBlogPost}>
          Contact
        </SLink> */}
      </div>
    </div>
  );
}
