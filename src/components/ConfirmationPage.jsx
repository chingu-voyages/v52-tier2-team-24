import React from 'react'
import check from '../../public/icons/check.png'

export const ConfirmationPage = () => {
    return (
        <div>
            <img
                src={check}
                style={{
                    position: "relative",
                    top: "-8rem",
                    margin: "auto",
                    height: "5rem"
                }}>
            </img>
            <p
                style={{
                    position: "relative",
                    top: "-5rem",
                    textAlign: "center"
                }}>
                Your appointment request is awaiting approval.<br /> You will receive confirmation 3 hours prior to your appointment time.<br /> Call 1-800-123-4567 to cancel.
            </p>
        </div>
    )
}
