import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

export function useContent() {
    const [content, setContent] = useState([]);
  
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
  
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            Authorization: token
          }
        });
        console.log('thi is response.data' + response.data);
            console.log('this is respons.data.condten' + response.data.content);
  
        setContent(response.data.content);
      } catch (err) {
        console.error('Error fetching content:', err);
      }
    };
  
    useEffect(() => {
      fetchContent();
    }, []);

    return {content,fetchContent};
}
