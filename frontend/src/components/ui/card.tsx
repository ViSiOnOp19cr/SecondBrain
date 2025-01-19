import { ShareIcon } from "../../assets/ShareIcon";
import { Delete } from "../../assets/Delete";
import { Video } from "../../assets/video";
import { Twitter } from "../../assets/twitter";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export const Card = (props: CardProps) => {
  return (
    <div>
      <div
        className="p-4 bg-white rounded-md border-gray-200 max-w-72
        border"
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="pr-2 text-gray-500 text-md">
              {props.type === "youtube" ? <Video /> : <Twitter />}
            </div>
            <h1>{props.title}</h1>
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={props.link}>
                <ShareIcon size="lg" />
              </a>
            </div>
            <div className="text-gray-500">
              <Delete />
            </div>
          </div>
        </div>

        <div>
          {props.type === "youtube" && (
            <iframe
              className="pt-4 w-full"
              src={props.link.replace("watch?v=", "embed/").split("&")[0]} // Remove additional parameters
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          {props.type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={props.link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};
