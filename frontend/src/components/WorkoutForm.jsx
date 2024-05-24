import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';


const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [RIR, setRIR] = useState("");
    const [note, setNote] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return
        }

        const workout = { title, load, sets, reps, RIR, note };
        try {
            const response = await fetch('http://localhost:4000/api/workouts', {
                method: "POST",
                body: JSON.stringify(workout),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`

                }
            });

            if (!response.ok) {
                const json = await response.json();
                setError(json.error);
                setEmptyFields(json.emptyFields || []);
                return;
            }

            const json = await response.json();
            setEmptyFields([]);
            setError(null);
            setTitle("");
            setLoad("");
            setSets("");
            setReps("");
            setRIR("");
            setNote("");
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
            console.log("New workout added:", json);
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to add exercise. Please try again later.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add a New Exercise</h3>

            <label>Exercise Name:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? "error" : ""}
            />

            <label>Load (kg):</label>
            <input
                type="number"
                min={0}
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? "error" : ""}
            />

            <label>Sets:</label>
            <input
                type="number"
                min={0}
                onChange={(e) => setSets(e.target.value)}
                value={sets}
                className={emptyFields.includes('sets') ? "error" : ""}
            />

            <label>Reps:</label>
            <input
                type="number"
                min={0}
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? "error" : ""}
            />

            <label>RIR:</label>
            <input
                type="number"
                min={0}
                max={10}
                onChange={(e) => setRIR(e.target.value)}
                value={RIR}
                className={emptyFields.includes('RIR') ? "error" : ""}
            />

            <label>Note:</label>
            <input
                type="text"
                onChange={(e) => setNote(e.target.value)}
                value={note}
                className={emptyFields.includes('note') ? "error" : ""}
            />

            <button className='add-btn'>Add Exercise</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default WorkoutForm;
