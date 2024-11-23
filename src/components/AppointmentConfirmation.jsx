import React from 'react'
import { Button } from './Button.jsx'

export const AppointmentConfirmation = () => {
    return (
        <div className='fixed inset-0 bg-white-500 bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-10 rounded-lg shadow-lg w-25'>
                <h2 className='text-3xl mb-12'>Appointment Confirmation</h2>
                <p className='mb-6'>You will receive confirmation a few hours before the scheduled visit.</p>
                <p className='mb-6 text-slate-400'>If you need to cancel your appointment, please call 1-800-123-4567</p>
                <Button
                    text={'Ok'}
                    isTransparent={true}
                />
            </div>
        </div>
    );
};