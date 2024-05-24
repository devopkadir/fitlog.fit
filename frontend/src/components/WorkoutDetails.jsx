import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { formatDistanceToNow } from 'date-fns';
import { useAuthContext } from '../hooks/useAuthContext';


const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json });
        }
    }

    return (
        <div className="fitness-program">
            <div className="workout-details">
                <h4>{workout.title}</h4>
                <div className="details-row">
                    <div className="detail">
                        <strong>Load(kg): </strong>{workout.load}
                    </div>
                    <div className="detail">
                        <strong>Sets: </strong>{workout.sets}
                    </div>
                    <div className="detail">
                        <strong>Reps: </strong>{workout.reps}
                    </div>
                    <div className="detail">
                        <strong>RIR: </strong>{workout.RIR}
                    </div>
                    <div className="detail">
                        <strong>Note: </strong>{workout.note}
                    </div>
                    <div className="detail">
                        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
                    </div>
                </div>
                <span onClick={handleClick}><RiDeleteBin6Fill className='trash-icon' /></span>
            </div>
        </div>
    )
}

export default WorkoutDetails