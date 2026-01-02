import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    // 1. Token Headers se nikalna
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        // 2. Token Verify karna
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // --- CRITICAL FIX FOR GET REQUESTS ---
        // Agar request GET hai, to req.body undefined ho sakta hai.
        // Hum usay manually initialize kar rahe hain taake crash na ho.
        if (!req.body) {
            req.body = {}; 
        }

        // 3. User ID ko body main attach karna
        req.body.userId = token_decode.id;
        
        next();

    } catch (error) {
        console.log("JWT Error:", error.message);
        
        // Agar token expire ho gya hai to frontend ko batao
        return res.json({ success: false, message: "Session Expired. Please Login Again." });
    }
}

export default authMiddleware;