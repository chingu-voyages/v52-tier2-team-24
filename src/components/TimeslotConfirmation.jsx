import React from 'react'
import { Button } from './Button.jsx'

export const TimeslotConfirmation = () => {
    return (
        <div className='fixed inset-0 bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-10 rounded-lg shadow-lg w-1/2'>
                <h2 className='text-3xl mb-6'>Timeslot Confirmation</h2>
                <p className='mb-6'>Your preferred timeslot is indicative. You will receive confirmation once you submit your request.</p>
                <Button
                    text={'Ok'}
                    isTransparent={true}
                />
            </div>
        </div>
    );
};