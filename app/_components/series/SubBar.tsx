"use client";
import { useEffect, useState } from "react";
import { IoMdFilm } from "react-icons/io";
import { MdMovie } from "react-icons/md";
import { PiFilmScript } from "react-icons/pi";
import Episode from "@/_components/series/Episode";
import Recommendations from "@/_components/series/Recommendations";
import Similiar from "@/_components/series/Similiar";

type Props = { id: number; season: number };
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Actor = {
  id: number;
  image: string | null;
  name: string;
  character: string;
};

type Series = {
  id: number;
  name: string;
  overview: string;
  episodeNumber: number;
  runtime: number;
  releaseDate: string;
  poster: string;
  rating: number;
  director: string;
  cast: Actor[];
};

type Recomend = {
  id: number;
  name: string;
  overview: string;
  poster: string;
  releaseDate: string;
  rating: number;
  genre: number[];
};

function SubBar({ id, season }: Props) {
  const [bar, setBar] = useState("episode");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [episodesBySeason, setEpisodesBySeason] = useState<
    Record<number, Series[]>
  >({});
  const [seasonNumber, setSeasonNumber] = useState<number>(1);
  const [recommendations, setRecommendations] = useState<Recomend[]>([]);
  const [similiar, setSimiliar] = useState<Recomend[]>([]);

  useEffect(() => {
    async function getEpisode() {
      if (episodesBySeason[seasonNumber]) return;
      setIsLoading(true);

      try {
        const res = await fetch(
          `${API_URL}/series/episode?seriesId=${id}&seasonNumber=${seasonNumber}`
        );
        if (!res.ok) throw new Error("Failed to fetch episodes");

        const data: Series[] = await res.json();

        setEpisodesBySeason((prev) => ({
          ...prev,
          [seasonNumber]: data,
        }));
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (bar === "episode") getEpisode();
  }, [id, seasonNumber, episodesBySeason, bar]);

  useEffect(() => {
    async function getRecommendations() {
      if (recommendations.length !== 0) return;
      setIsLoading(true);

      try {
        const res = await fetch(`${API_URL}/series/recommendations/${id}`);
        if (!res.ok) throw new Error("Failed to fetch episodes");

        const data: Recomend[] = await res.json();

        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (bar === "recommendations") getRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bar, id]);

  useEffect(() => {
    async function getSimiliar() {
      if (similiar.length !== 0) return;
      setIsLoading(true);

      try {
        const res = await fetch(`${API_URL}/series/similiar/${id}`);
        if (!res.ok) throw new Error("Failed to fetch episodes");

        const data: Recomend[] = await res.json();

        setSimiliar(data);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (bar === "similiar") getSimiliar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bar, id]);

  return (
    <div className="p-5 lg:pt-24 lg:p-0 z-10 w-full lg:w-2/3">
      <div className="border glases border-white/10 rounded-lg p-2 flex flex-wrap gap-2 h-fit w-fit mb-2">
        <div
          onClick={() => setBar("episode")}
          className="border glases border-white/10 rounded-lg p-2 cursor-pointer flex items-center gap-x-2"
        >
          <MdMovie className="size-4" />
          <p>Episode</p>
        </div>
        <div
          onClick={() => setBar("recommendations")}
          className="border glases border-white/10 rounded-lg p-2 cursor-pointer flex items-center gap-x-2"
        >
          <IoMdFilm className="size-4" />
          <p>Recommendations</p>
        </div>
        <div
          onClick={() => setBar("similiar")}
          className="border glases border-white/10 rounded-lg p-2 cursor-pointer flex items-center gap-x-2"
        >
          <PiFilmScript className="size-4" />
          <p>Similiar</p>
        </div>
      </div>
      {bar === "episode" && (
        <Episode
          isLoading={isLoading}
          seasonNumber={seasonNumber}
          setSeasonNumber={setSeasonNumber}
          episodesBySeason={episodesBySeason}
          seasonCount={season}
        />
      )}
      {bar === "recommendations" && (
        <Recommendations isLoading={isLoading} recomend={recommendations} />
      )}
      {bar === "similiar" && (
        <Similiar isLoading={isLoading} similiar={similiar} />
      )}
    </div>
  );
}

export default SubBar;
