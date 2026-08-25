const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// ASTRIVIX SECURE ARCHITECTURE
// 1. Helmet sets strict HTTP headers and Content Security Policies
app.use(helmet());

// 2. Strict CORS - Only allow the Astrivix frontend to communicate with this API
app.use(cors({
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200
}));

// 3. Rate Limiting to prevent DDoS and Brute Force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, connection throttled.' }
});
app.use('/api/', limiter);

// 4. Payload size limits to prevent buffer overflow attacks
app.use(express.json({ limit: '10kb' })); 

app.get('/api/system/status', (req, res) => {
    res.status(200).json({ 
        status: 'online', 
        security_level: 'maximum',
        message: 'Astrivix Core Backend is operational.' 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[ASTRIVIX] Secure Backend running on port ${PORT}`);
});
