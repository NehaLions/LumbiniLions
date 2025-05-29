import React, { FC } from "react";
import Image from "next/image";

interface ScheduleProps {
  match: {
    id: string;
    opponent: string;
    opponentLogo: string;
    matchDate: Date;
    isCompleted: boolean;
    venue?: string;
    victory?: boolean;
    lionsRuns?: number;
    lionsWickets?: number;
    lionsOvers?: number;
    opponentRuns?: number;
    opponentWickets?: number;
    opponentOvers?: number;
    margin?: number;
    marginType?: string;
    ballsLeft?: number;
  };
}

const MatchCard1: FC<{ match: ScheduleProps["match"] }> = ({ match }) => {
  const isUpcoming = !match.isCompleted;
  match.margin =
    match.lionsRuns && match.opponentRuns
      ? Math.abs(match.lionsRuns - match.opponentRuns)
      : undefined;
  match.marginType = "run";

  function calculateMatchResult(match: Match): Match {
    if (!match.isCompleted) return match;

    const {
      lionsRuns,
      opponentRuns,
      lionsOvers,
      opponentOvers,
      opponentWickets,
    } = match;

    if (lionsRuns != null && opponentRuns != null) {
      if (lionsRuns > opponentRuns) {
        match.victory = true;
        match.margin = lionsRuns - opponentRuns;
        match.marginType = "runs";
      } else if (opponentRuns > lionsRuns) {
        match.victory = false;

        // Determine if opponent chased (used < 20 overs) or batted full 20
        const opponentChased = opponentOvers != null && opponentOvers < 20;

        if (opponentChased) {
          // opponent chased and won → margin = wickets left
          if (opponentWickets != null) {
            match.margin = 10 - opponentWickets;
            match.marginType = "wickets";
          }
        } else {
          // both played 20 overs → margin = runs
          match.margin = opponentRuns - lionsRuns;
          match.marginType = "runs";
        }
      } else {
        match.victory = undefined;
        match.margin = 0;
        match.marginType = "tie";
      }
    }

    return match;
  }

  const updatedMatch = calculateMatchResult(match); // Ensure this is done before render

  return (
    <div className="overflow-hidden py-5 bg-[#050C13] hover:bg-[#162339] transition-all duration-300 shadow-lg">
      {/* Logos section - same for both types */}
      <div className="flex flex-row justify-start w-full">
        <div className="flex-shrink-0 mr-[-8px]">
          <Image
            src="/logo.webp"
            alt="Lumbini Lions Logo"
            width={180}
            height={144}
            className="w-32 h-22 sm:w-32 sm:h-24 md:scale-120 object-contain drop-shadow-lg"
          />
        </div>
        <Image
          src={match.opponentLogo}
          alt={`${match.opponent} Logo`}
          width={120}
          height={120}
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg"
        />
      </div>

      {/* Team names with scores underneath */}
      <div className="flex justify-start px-7 mt-3">
        {/* Lions side */}
        <div className="flex flex-col ">
          <span className="text-white font-[poppins] mr-1 font-semibold text-[16px] text-xs sm:text-sm">
            Lumbini Lions <span className="mx-3 hidden md:inline"> vs </span>
          </span>

          {!isUpcoming ? (
            <span className="text-white opacity-70 text-xs sm:text-sm mt-2 font-[poppins]">
              {match.lionsRuns}/{match.lionsWickets}
              {match.lionsOvers && `(${match.lionsOvers})`}
            </span>
          ) : (
            <span className="font-[poppins] text-[14px] mt-2 opacity-60 ">
              Nepal Premier League
            </span>
          )}
        </div>

        {/* VS text
        <div className="flex items-center mt-[-3vh]">
          <span className="text-white mx-5 font-[poppins] font-semibold text-[16px] text-xs sm:text-sm">
            vs
          </span>
        </div> */}

        {/* Opponent side */}
        <div className="flex flex-col">
          <span className="text-white font-[poppins] font-semibold text-[16px] text-xs sm:text-sm">
            {match.opponent || "TBD"}
          </span>
          {!isUpcoming && (
            <span className="text-white opacity-70 text-xs mt-2 sm:text-sm font-[poppins]">
              {match.opponentRuns}/{match.opponentWickets}
              {match.opponentOvers && `(${match.opponentOvers})`}
            </span>
          )}
        </div>
      </div>

      {isUpcoming ? (
        // Upcoming match section
        <>
          <hr className="border-amber-500 mt-5 mx-7" />

          <div className="flex flex-row items-start justify-between mt-4 pb-3 text-white px-7">
            <span className="text-white text-[14px] opacity-60  font-medium">
              {new Date(match.matchDate)
                .toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })
                .replace(/(\d+)/, "$1\u1D57\u02B0")}
            </span>
            <span>
              <span className="text-white text-[14px] opacity-70 pr-[2px]">
                {new Date(match.matchDate).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                ,
              </span>
              {match.venue && (
                <span className="text-white opacity-70 text-sm mt-1">
                  {match.venue}
                </span>
              )}
            </span>
          </div>
        </>
      ) : (
        // Completed match section - just showing result now, scores moved up
        <>
          <hr className="border-amber-500 mt-5 mx-7" />
          <p className="text-amber-500 font-[poppins] font-medium pb-3 text-[14px] mt-4 ml-[1.7vw]">
            {updatedMatch.isCompleted ? (
              updatedMatch.victory === true ? (
                <>
                  Lumbini Lions won by {updatedMatch.margin}{" "}
                  {updatedMatch.marginType}
                  {updatedMatch.ballsLeft
                    ? ` (${updatedMatch.ballsLeft} balls left)`
                    : ""}
                </>
              ) : updatedMatch.victory === false ? (
                <>
                  Lumbini Lions lost by {updatedMatch.margin}{" "}
                  {updatedMatch.marginType}
                </>
              ) : (
                <>Match tied or no result</>
              )
            ) : (
              <>Match not completed</>
            )}
          </p>
        </>
      )}
    </div>
  );
};

export default MatchCard1;
