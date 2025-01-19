import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

export function useContent() {
    const [content, setContent] = useState([]);
    

    useEffect(() => {
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

                setContent(response.data.content);
            } catch (err) {
                
                console.error('Error fetching content:');
            }
        };

        fetchContent();
    }, []);

    return content;
}