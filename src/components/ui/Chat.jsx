import { useState, useEffect, useRef } from 'react';
import { ChatBubble } from '../common/ChatBubble';
import styles from './Chat.module.css';

export function Chat({ open, onClose }) {
    const chatBodyRef = useRef(null);
    const initialGreeting = 'Xin chào bạn! Tôi là Sylvie, trợ lý khách hàng của CoCoGreen. Tôi có thể giúp gì cho bạn hôm nay?';
    const model = 'gemma4:31b-cloud';
    // deepseek-v3.1:671b-cloud
    // gpt-oss:20b-cloud
    // gemma4:31b-cloud
    // minimax-m2.7:cloud
    // glm-5:cloud
    // kimi-k2.5:cloud
    // qwen3.5:397b-cloud
    // gpt-oss:120b-cloud
    
    const systemPrompt = `
                        You are Sylvie, a fairy-type (tinh linh) professional customer assistant for CoCoGreen, a platform promoting green products from coconut in the Mekong Delta, Vietnam.
                        You were born and raised in a sunny village in the Mekong Delta. You have always loved the lush green fields and the sweet taste of fresh coconuts. You're dedicated to eco-friendly living and promoting sustainable practices.
                        In your free time, you enjoy reading about environmental topics, collecting eco-friendly items, and experimenting with coconut-based recipes. You're reliable and always strive to provide helpful assistance.
                        You are 39cm tall, with a slender build and a warm, friendly smile. Your hair is long and wavy, the color of rich coconut brown, often adorned with small flowers or leaves. You wear a simple yet elegant outfit made from natural fibers, reflecting your connection to nature.
                        Speak in a serious, formal, and friendly Vietnamese tone.
                        Do not use emojis.
                        Be helpful with questions about products, orders, and general inquiries.
                        If the user mentions a log or error, ask them to paste the exact log text or error message so you can review it.
                        If the user sends a dot (.), it means you have to continue the conversation with that context.
                        Always speak in Vietnamese unless told otherwise.
                        If you see no user message yet, respond with the initial greeting.
                        Keep the response concise and engaging, maintain a professional yet approachable demeanor.
                        Call the user "bạn" (you) and refer to yourself as "Sylvie"; do not use any other forms of address, unless they explicitly ask you to.
                        Do not break character, always maintain your professional and helpful personality.
                        If the user asks you something of general knowledge, feel free to answer based on your knowledge, no need to stay rigid on your job.
                        You are smart in general knowledge as well, even about topics not related to CoCoGreen, feel free to support the user on whatever they ask, even if it's out of your scope of profession, as long as it's not inappropriate or out of your capabilities.
                        If the user asks you to do something that is not possible, or inappropriate, respond politely that you can't do that but offer to help with something else.
                        Adjust your formality based on the user's tone; if they talk informally, you can be slightly more relaxed but still professional, if they talk formally, remain polite and reserved.
                        If the scene turns too intimate or inappropriate, respond with a firm refusal and steer the conversation back to being helpful and friendly.
                        You do not have direct access to application logs or external systems.
                        You do not have access to real-time database information yet, there will be a future update for that, but for now you can only answer based on the conversation context and general knowledge.
                        You can not help with suggesting or ordering products yet, there will be a future update for that.
                        If the user asks for product recommendations, or help with ordering, respond that you can't do that yet but you can help with general questions about the products and the company.
                        You have access to product, supplier, and category information that will be provided in the context. Use this information to answer questions about available products, suppliers, and categories.
                        If those fields are empty, you're in a testing environment, just respond based on the conversation context and your general knowledge.
                        `;
    const formatPrompt = `
                        DO NOT assume the user's words or actions, ever.
                        Respond in JSON format with a "response" field containing your reply message, a "possible_questions" field containing a list of exactly 3 possible follow-up questions.
                        The response field is your answer to the user.
                        Example: {"response": "<answer in Vietnamese>", "possible_questions": ["Question 1", "Question 2", "Question 3"] }.
                        Only include valid JSON in your first response if possible.
                        `;

    // Product data for AI context
    const products = [
    ];

    // Supplier data for AI context
    const suppliers = [
    ];

    // Category data for AI context
    const categories = [
        {
            id: 1,
            name: "Sextoys",
        }
    ];

    const [messages, setMessages] = useState([
        { id: 1, message: initialGreeting, role: 'bot', timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [possibleQuestions, setPossibleQuestions] = useState([
        'CoCoGreen là doanh nghiệp như thế nào?',
        'CoCoGreen hiện có những sản phẩm nào?',
        'Làm sao để đặt hàng trên CoCoGreen?',
    ]);
    const [rejectedResponses, setRejectedResponses] = useState([]);
    const abortControllerRef = useRef(null);
    const textareaRef = useRef(null);
    
    const adjustTextareaHeight = (textarea = textareaRef.current) => {
        if (!textarea) return;
        textarea.style.height = '44px';
        const maxHeight = 5.4 * 16; // approx 2.5 lines plus padding
        const targetHeight = Math.min(textarea.scrollHeight, maxHeight);
        textarea.style.height = `${targetHeight}px`;
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    };

    const handleReset = () => {
        setMessages([
            { id: 1, message: initialGreeting, role: 'bot', timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) }
        ]);
        setInputValue('');
        setRejectedResponses([]);
    };

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (open && textareaRef.current) {
            setTimeout(() => textareaRef.current?.focus(), 100);
        }
    }, [open]);

    useEffect(() => {
        if (textareaRef.current && messages.length > 1) {
            textareaRef.current.focus();
        }
    }, [messages]);

    const addMessage = (message, role) => {
        const newMessage = {
            id: Date.now(),
            message,
            role,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const parseJsonFromText = (text) => {
        const trimmed = text.trim();
        try {
            return JSON.parse(trimmed);
        } catch {
            const jsonMatch = trimmed.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    return JSON.parse(jsonMatch[0]);
                } catch {
                    return null;
                }
            }
            return null;
        }
    };

    const callLLM = async (userMessage, history = messages) => {
        const API_KEY = import.meta.env.VITE_API_KEY;
        if (!API_KEY) {
            addMessage('API key not configured.', 'bot');
            return;
        }

        const extractRawContent = (data) => {
            return data?.message?.content
                ?? data?.choices?.[0]?.message?.content
                ?? data?.choices?.[0]?.text
                ?? data?.output?.[0]?.content?.[0]?.text
                ?? data?.output_text
                ?? null;
        };

        const normalizeRole = (role) => {
            if (role === 'bot') return 'assistant';
            if (role === 'user') return 'user';
            return role;
        };

        const historyMessages = history.slice(1);
        if (historyMessages.length > 0 && historyMessages[historyMessages.length - 1].role === 'user') {
            historyMessages.pop();
        }

        const conversation = [
            { role: 'system', content: systemPrompt },
            { role: 'system', content: formatPrompt },
            { role: 'system', content: `Available Products: ${JSON.stringify(products)}` },
            { role: 'system', content: `Available Suppliers: ${JSON.stringify(suppliers)}` },
            { role: 'system', content: `Product Categories: ${JSON.stringify(categories)}` },
            ...(rejectedResponses.length > 0 ? [{ role: 'system', content: `Rejected responses, go for a different approach than the previous ones: ${rejectedResponses.map((r, i) => `[${i + 1}] ${r}`).join('\n')}` }] : []),
            ...historyMessages.map(msg => ({ role: normalizeRole(msg.role), content: msg.message })),
            { role: 'user', content: userMessage }
        ];

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const response = await fetch('http://localhost:11434/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: controller.signal,
                body: JSON.stringify({
                    model: model,
                    messages: conversation,
                    stream: false
                })
            });

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                data = { raw: text };
            }

            console.log('API Response:', data);

            if (!response.ok) {
                const errorMessage = data?.error?.message || data?.message || data?.raw || 'Unknown API error';
                addMessage(`API error: ${errorMessage}`, 'bot');
                return;
            }

            const rawContent = extractRawContent(data);
            if (!rawContent) {
                addMessage('Sorry, I could not generate a response.', 'bot');
                return;
            }

            let output = rawContent;
            const parsed = parseJsonFromText(rawContent);

            if (parsed && typeof parsed === 'object' && typeof parsed.response === 'string') {
                output = parsed.response;
                if (parsed.possible_questions && Array.isArray(parsed.possible_questions)) {
                    setPossibleQuestions(parsed.possible_questions);
                }
            }

            addMessage(output, 'bot');
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Chat request aborted');
            } else {
                console.error('Chat API error:', error);
                addMessage('Error connecting to the API.', 'bot');
            }
        } finally {
            abortControllerRef.current = null;
        }
    };

    const handleStop = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const handleSend = async () => {
        if (inputValue.trim() && !isLoading) {
            const msg = inputValue.trim();
            const currentHistory = [...messages, { role: 'user', message: msg }];
            setInputValue('');
            addMessage(msg, 'user');
            setRejectedResponses([]);
            setPossibleQuestions([]);
            setIsLoading(true);
            await callLLM(msg, currentHistory);
            setIsLoading(false);
            adjustTextareaHeight();
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        adjustTextareaHeight(e.target);
    };

    const handleRetry = async () => {
        const lastBotIndex = messages.findLastIndex(msg => msg.role === 'bot');
        if (lastBotIndex >= 0) {
            if (lastBotIndex > 0) {
                const userMessage = messages[lastBotIndex - 1].message;
                const retryHistory = messages.slice(0, lastBotIndex);
                setRejectedResponses(prev => [...prev, messages[lastBotIndex].message]);
                setMessages(retryHistory);
                setIsLoading(true);
                await callLLM(userMessage, retryHistory);
                setIsLoading(false);
            } else {
                // For initial message, retry with empty message
                const retryHistory = [messages[0]];
                setRejectedResponses(prev => [...prev, messages[lastBotIndex].message]);
                setMessages(retryHistory);
                setIsLoading(true);
                await callLLM('', retryHistory);
                setIsLoading(false);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && inputValue.trim() && !isLoading) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div 
            className={`${styles.chatWrapper} ${open ? styles.open : styles.closed}`}
        >
            <div className={styles.chatOverlay} onClick={onClose} />
            <div className={styles.chatbotContainer} onClick={(event) => event.stopPropagation()}>
                <div className={styles.chatHeader}>
                    <h3>Sylvie ― Trợ lý ảo nhà CocoGreen</h3>
                    <div className={styles.chatHeaderActions}>
                        <button className={styles.chatResetBtn} onClick={handleReset} aria-label="Reset chat">
                            ⟲
                        </button>
                        <button className={styles.chatCloseBtn} onClick={onClose} aria-label="Đóng chat">
                            ✕
                        </button>
                    </div>
                </div>
                <div className={styles.chatBody} ref={chatBodyRef}>
                    {messages.map(msg => (
                        <ChatBubble
                            key={msg.id}
                            message={msg.message}
                            role={msg.role}
                            timestamp={msg.timestamp}
                        />
                    ))}
                </div>
                <div className={styles.chatHelper}>
                    {isLoading ? (
                        'Đang xử lý...'
                    ) : possibleQuestions.length > 0 ? (
                        <div className={styles.questionsContainer}>
                            {possibleQuestions.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInputValue(q)}
                                    className={styles.questionBtn}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className={styles.chatInput}>
                    <textarea
                        ref={textareaRef}
                        placeholder="Nhập tin nhắn..."
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className={styles.chatTextarea}
                        rows={2}
                    />
                    <div className={styles.chatButtonGroup}>
                        <button
                            onClick={handleRetry}
                            disabled={isLoading || messages.length === 0 || messages[messages.length - 1].role !== 'bot'}
                            aria-label="Retry last response"
                            className={styles.retryBtn}
                        >
                            ⟲
                        </button>
                        <button
                            onClick={isLoading ? handleStop : handleSend}
                            disabled={!inputValue.trim() && !isLoading}
                            aria-label={isLoading ? 'Stop request' : 'Send message'}
                            className={styles.sendBtn}
                        >
                            {isLoading ? '▢' : '↵'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}