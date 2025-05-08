import { useState, useRef } from 'react';
import { useModal } from '../../hooks/useModal';
import { toast } from 'sonner';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function SendNotificationModal({ propertyId }) {
    const { closeModal } = useModal();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

        const { id } = useParams();

    const inputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/api/notify-prospects', {
                property_id: id,
                subject,
                message
            });

            toast.success('Notification envoyée avec succès');
            closeModal();
        } catch (error) {
            toast.error('Erreur lors de l\'envoi de la notification');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="max-w-[500px] searchModal flex flex-col items-stretch gap-6 md:w-[70%] w-[80%] bg-white mt-[300px] p-4 rounded-xl" 
            style={{boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)"}}
            ref={inputRef}
        >
            <div className="my-4 flex items-center justify-between">
                <span className="text-xl text-(--title-color)">Envoyer une notification</span>
                <button 
                    onClick={closeModal}
                    type="button"
                    className="cursor-pointer p-2 rounded-full bg-red-100 size-[30px] flex items-center justify-center"
                >
                    <i className="fa-solid fa-x text-sm text-red-800"></i>
                </button>
            </div>

            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Objet
                    </label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3 py-2 border border-(--light-green2) rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3 py-2 border border-(--light-green2) rounded min-h-[150px]"
                        required
                    />
                </div>
            </div>

            <button 
                type="submit"
                disabled={loading}
                className="w-full h-[40px] bg-(--primary-green) text-white rounded-xl hover:bg-green-600 disabled:opacity-50"
            >
                {loading ? 'Envoi en cours...' : 'Envoyer la notification'}
            </button>
        </form>
    );
}