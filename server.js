const express = require('express');

 
const userRoute = require('./routes/userRoute'); 
const campRoute = require('./routes/campRoute');
const annonceRoute = require('./routes/annonceRoute');
const authRoute = require('./routes/authRoute');


const authMiddleware = require('./authMiddleware/authMiddleware');


const { sendOTP, sendEmailNotification } = require('./services/emailService');
const { hashPassword, comparePassword, generateToken } = require('./services/securityService');
const { moderatePost } = require('./services/postService');
const { subscribeUser, isUserSubscribed, getUserSubscription } = require('./services/subscriptionService');

require('./config/connect');

const app = express();
app.use(express.json());


app.use('/userRoute', userRoute);
app.use('/annonceRoute', annonceRoute);
app.use('/campRoute', campRoute);
app.use('/authRoute', authRoute);


app.use('/secure', authMiddleware, (req, res) => {
    res.send("This is a secured route!");
});


app.post('/send-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        await sendOTP(email, otp);
        res.status(200).send("OTP sent successfully!");
    } catch (error) {
        res.status(400).send(error.message);
    }
});


app.post('/hash-password', async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = await hashPassword(password);
        res.status(200).json({ hashedPassword });
    } catch (error) {
        res.status(400).send(error.message);
    }
});


app.post('/moderate-post', (req, res) => {
    try {
        const post = req.body;
        const cleanPost = moderatePost(post);
        res.status(200).send(cleanPost);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


app.post('/subscribe', (req, res) => {
    const { userId, plan } = req.body;
    const subscription = subscribeUser(userId, plan);
    res.status(200).json(subscription);
});

app.get('/subscription/:userId', (req, res) => {
    const { userId } = req.params;
    const subscription = getUserSubscription(userId);
    res.status(200).json(subscription);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
