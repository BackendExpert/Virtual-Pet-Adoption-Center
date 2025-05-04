import confetti from 'canvas-confetti';

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

export const triggerConfetti = () => {
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
    });
};