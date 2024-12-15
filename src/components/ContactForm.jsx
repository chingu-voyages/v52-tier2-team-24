
import { useState } from 'react'
import contactImg from '../images/contact.png'
import PropTypes from 'prop-types';

export const ContactForm = ({ handleClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Sending...');

        const form = e.target;

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form)
        })
            .then((response) => {
                if (response.ok) {
                    setStatus('Message sent successfully!')
                }
                else {
                    setStatus('Something went wrong. Please try again later.')
                }
            })
            .catch(() => {
                setStatus('Something went wrong. Please try again later.')
            });
    };

    return (
        <div className='fixed inset-0 flex justify-center items-center'>
            <div className='max-w-4xl min-w-[25vh] max-h-[80vh] w-full bg-landing-blue p-8 m-5 rounded-lg shadow-lg flex flex-col sm:flex-row relative'>
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className='absolute top-4 right-4 text-2xl hover:text-white hover:text-gray-400'
                >
                    X
                </button>
                {/* Left side form */}
                <div className='w-full sm:w-1/2 p-6 flex-shrink-0'>
                    <h2 className='text-4xl text-center text-gray-700 mb-6'>Contact Us</h2>

                    <form
                        onSubmit={handleSubmit}
                        name='contact'
                        method='POST'
                        data-netlify='true'
                    >
                        {/* Hidden input for Netlify form submission */}
                        <input type='hidden' name='form-name' value='contact' />

                        <div className='mb-4'>
                            <label htmlFor="name" className='text-gray-700'></label>
                            <input
                                type="text"
                                placeholder='Name'
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className='w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="email" className='block text-gray-700'></label>
                            <input
                                type="email"
                                placeholder='Email'
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className='w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="message" className='block text-gray-700'></label>
                            <textarea
                                placeholder='Message'
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows='4'
                                className='w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500'
                            >
                            </textarea>
                        </div>
                        <p className="text-center">
                            <button
                                type='submit'
                                className='text-black border solid border-slate-500 hover:bg-slate-600 hover:text-white rounded-3xl inline-flex items-center justify-center px-6 py-3 text-xl w-full'
                            >
                                Submit
                            </button>
                        </p>
                    </form>

                    {status && <p className="mt-4 text-center text-gray-500">{status}</p>}
                </div>

                {/* Right side image*/}
                <div className='hidden sm:block sm:w-1/2 p-0 flex-grow'>
                    <img
                        src={contactImg}
                        alt="Contact Us"
                        className='w-full h-auto max-h-[70%] object-cover rounded-lg mt-12'
                    />
                </div>
            </div>
        </div >
    );
};


ContactForm.propTypes = {
    handleClose: PropTypes.func.isRequired
  };