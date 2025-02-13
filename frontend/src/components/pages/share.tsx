import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

interface Content {
  id: string;
  title: string;
  link: string;
  type: string;
}

export const SharePage = () => {
  const { hash } = useParams<{ hash: string }>();
  const [content, setContent] = useState<Content[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/share/${hash}`);
        console.log('this is response.data.content' + response.data.content);
        setContent(response.data.content);
      } catch (err) {
        setError('Failed to fetch shared content');
        console.error('Error fetching shared content:', err);
      }
    };

    fetchSharedContent();
  }, [hash]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Shared Content</h1>
      <div className="flex gap-4 sm:col-span-1 col-span-4 flex-wrap">
        {content.map(({ id, title, link, type }) => (
          <div key={id} className="p-4 bg-white rounded-md border-gray-200 max-w-72">
            <h3>{title}</h3>
            <div>
          {type === "youtube" && (
            <iframe
              className="pt-4 w-full"
              src={link.replace("watch?v=", "embed/").split("&")[0]} // Remove additional parameters
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
          </div>
        ))}
      </div>
    </div>
  );
};

