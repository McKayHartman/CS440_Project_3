import './TextService.css';
import { useEffect, useState } from 'react';

export default function TextService() {
    const [text, setText] = useState({ content: '' });

    const userId = localStorage.getItem('userId');

    function loadNote() {
        if (!userId) return;

        fetch('http://localhost:4000/api/text', {
            headers: {
                'x-user-id': userId
            }
        })
        .then(res => res.json())
        .then(data => {
            // assuming backend returns ONE note
            if (data) {
                setText({ content: data.content });
            }
        })
        .catch(err => console.error(err));
    }

    function saveNote() {
        if (!userId) return;

        fetch('http://localhost:4000/api/text', {
            method: 'PUT',   // better than POST for overwrite
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': userId
            },
            body: JSON.stringify({ content: text.content })
        })
        .then(res => res.json())
        .then(() => {
            console.log('Note saved');
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        loadNote();
    }, [userId]);

    return (
        <div className="TextService">
            <h1>My Note</h1>

            <textarea
                placeholder="Write your note..."
                value={text.content}
                onChange={(e) =>
                    setText({ content: e.target.value })
                }
            />

            <button onClick={saveNote}>Save</button>
        </div>
    );
}