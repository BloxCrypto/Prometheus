// Example JavaScript file to obfuscate

function processPayment(amount, cardNumber, cvv) {
    const merchantID = "merchant_12345";
    const apiSecret = "secret_api_key_xyz";
    
    // Validate inputs
    if (amount <= 0) {
        console.error("Invalid amount");
        return false;
    }
    
    // Create request
    const paymentData = {
        amount: amount,
        card: cardNumber,
        security: cvv,
        merchant: merchantID,
        timestamp: Date.now()
    };
    
    // Make API call
    const response = fetch("/api/process", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + apiSecret,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
    });
    
    return response;
}

// User profile manager
class UserProfile {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.passwordHash = this.hashPassword(password);
        this.isAdmin = false;
    }
    
    hashPassword(pwd) {
        // Simple hash (not secure, for demo only)
        let hash = 0;
        for (let i = 0; i < pwd.length; i++) {
            hash = ((hash << 5) - hash) + pwd.charCodeAt(i);
        }
        return hash.toString(16);
    }
    
    updateProfile(newData) {
        this.name = newData.name || this.name;
        this.email = newData.email || this.email;
        return this;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { processPayment, UserProfile };
}
