// Importar las respuestas del chatbot
import chatbotResponses from './chatbot-responses.json' assert { type: 'json' };

document.addEventListener('DOMContentLoaded', function() {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotModal = document.getElementById('chatbot-modal');
    const closeChatbot = document.getElementById('close-chatbot');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    // Función para abrir el chatbot
    function openChatbot() {
        chatbotModal.classList.remove('hidden');
        addMessage('bot', 'Hola, bienvenido a D\'Motors. ¿En qué puedo ayudarte hoy?');
    }

    // Función para cerrar el chatbot
    function closeChatbotModal() {
        chatbotModal.classList.add('hidden');
    }

    // Función para agregar un mensaje al chat
    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('mb-4', sender === 'user' ? 'text-right' : 'text-left');
        messageElement.innerHTML = `
            <div class="${sender === 'user' ? 'bg-primary' : 'bg-gray-700'} inline-block rounded-lg px-4 py-2 max-w-3/4">
                <p class="text-white">${message}</p>
            </div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Función para obtener la respuesta del chatbot
    function getChatbotResponse(message) {
        message = message.toLowerCase();
        for (const [key, value] of Object.entries(chatbotResponses)) {
            if (message.includes(key)) {
                return value;
            }
        }
        return "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla o preguntar sobre nuestros vehículos, servicios o proceso de compra?";
    }

    // Event listeners
    chatbotButton.addEventListener('click', openChatbot);
    closeChatbot.addEventListener('click', closeChatbotModal);

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            setTimeout(() => {
                const botResponse = getChatbotResponse(message);
                addMessage('bot', botResponse);
            }, 500);
        }
    });

    // Mostrar notificación después de 30 segundos
    setTimeout(() => {
        const notification = document.createElement('div');
        notification.textContent = "¿Necesitas ayuda? ¡Nuestro chatbot está listo para asistirte!";
        notification.className = "fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg";
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }, 30000);
});

console.log("Chatbot script loaded successfully!");