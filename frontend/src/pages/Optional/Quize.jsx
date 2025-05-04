import React, { useState } from 'react';
import { quizMatch } from '../../services/api';
import Dropdown from '../../components/Form/Dropdown';
import DefultButton from '../../components/Buttons/DefultButton';
import AdpotPet from '../../components/AdpotPet';


const Quize = () => {
    const [answers, setAnswers] = useState({});
    const [matchedPets, setMatchedPets] = useState([]);

    const questions = [
        {
            q: "What kind of companion do you prefer?",
            name: "q1",
            options: [
                { label: "A calm, cuddly friend", value: "a", traits: ["Lazy", "Loyal"] },
                { label: "A fun and active buddy", value: "b", traits: ["Energetic", "Playful"] },
                { label: "A low-maintenance pal", value: "c", traits: ["Independent", "Shy"] },
            ]
        },
        {
            q: "How social are you?",
            name: "q2",
            options: [
                { label: "Very outgoing and friendly", value: "a", traits: ["Friendly", "Playful"] },
                { label: "Quiet and introverted", value: "b", traits: ["Shy", "Independent"] },
                { label: "Protective and confident", value: "c", traits: ["Aggressive", "Protective"] },
            ]
        },
        {
            q: "How do you spend weekends?",
            name: "q3",
            options: [
                { label: "Relaxing or watching movies", value: "a", traits: ["Lazy", "Loyal"] },
                { label: "Exploring or hiking", value: "b", traits: ["Energetic", "Curious"] },
                { label: "Reading or doing solo hobbies", value: "c", traits: ["Independent", "Shy"] },
            ]
        },
        {
            q: "What do you expect from your pet?",
            name: "q4",
            options: [
                { label: "Loyalty and protection", value: "a", traits: ["Loyal", "Protective"] },
                { label: "Fun and games", value: "b", traits: ["Playful", "Energetic"] },
                { label: "Calm and quiet company", value: "c", traits: ["Lazy", "Shy"] },
            ]
        },
        {
            q: "How curious are you about new things?",
            name: "q5",
            options: [
                { label: "I love trying new things", value: "a", traits: ["Curious", "Energetic"] },
                { label: "Only sometimes", value: "b", traits: ["Friendly", "Loyal"] },
                { label: "Not really, I like routines", value: "c", traits: ["Lazy", "Shy"] },
            ]
        },
    ];

    const handleChange = (e, questionIndex) => {
        setAnswers({ ...answers, [questionIndex]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedTraits = [];

        Object.entries(answers).forEach(([qIndex, optionKey]) => {
            const question = questions[qIndex];
            const selectedOption = question.options.find(opt => opt.value === optionKey);
            if (selectedOption) {
                selectedTraits.push(...selectedOption.traits);
            }
        });

        const uniqueTraits = [...new Set(selectedTraits)];

        try {
            console.log(uniqueTraits)
            const res = await quizMatch(uniqueTraits);
            console.log(res.data.Result)

            setMatchedPets(res.data.result || res.data.Result || []);
        } catch (err) {
            console.error("Quiz submission error:", err);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 500, behavior: 'smooth' });
    };

    const [petadopt, setpetadopt] = useState(0)
    const headleAdoptPet = (id) => {
        setpetadopt(id)
    }

    return (
        <div className='xl:px-40 md:px-10 px-4 md:pt-20 pt-16 bg-gray-200/60 min-h-screen pb-16'>
            <h1 className="text-center md:text-4xl text-xl font-semibold text-gray-500">Start Quiz</h1>
            <p className="text-center text-gray-500 mt-4 mb-10">
                Get a Pet According to Your Needs
            </p>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
                {questions.map((q, index) => (
                    <Dropdown
                        key={index}
                        label={q.q}
                        name={q.name}
                        onChange={(e) => handleChange(e, index)}
                        required={true}
                        options={q.options.map(opt => ({
                            label: opt.label,
                            value: opt.value
                        }))}
                    />
                ))}

                <button
                    type="submit"
                    className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl transition duration-300"
                >
                    Find My Match
                </button>
            </form>

            <div className="">
                <AdpotPet PetID={petadopt} />
            </div>

            {matchedPets.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-center text-2xl font-bold text-gray-700 mb-8">🐾 Matching Pets</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {matchedPets.map((pet) => (
                            <div key={pet._id} className="bg-white shadow-md rounded-xl p-6 transition-transform hover:scale-105 hover:shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-yellow-600">{pet.name}</h3>
                                    <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full capitalize">{pet.species}</span>
                                </div>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li><strong>Personality:</strong> <span className="text-gray-800">{pet.personality}</span></li>
                                    <li><strong>Mood:</strong> <span className="text-gray-800">{pet.mood}</span></li>
                                    <li><strong>Status:</strong> <span className={`font-medium ${pet.adopted ? "text-green-600" : "text-red-500"}`}>{pet.adopted ? "Adopted" : "Available"}</span></li>
                                </ul>

                                <div className="mt-4">
                                    <DefultButton
                                        btntype={'button'}
                                        text='Adopt this Pet'
                                        onClick={() => {
                                            scrollToTop();
                                            headleAdoptPet(pet._id);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default Quize;
