const mpesa = require('./index');

// --- Transaction Details ---
const amount = "200";
const msisdn = "258845037555"; // Using the number you provided
const transaction_ref = "TRX" + Date.now();
const thirdparty_ref = "REF" + Date.now();

console.log("Initiating C2B transaction with the following details:");
console.log("  - Amount:", amount);
console.log("  - Phone Number:", msisdn);
console.log("  - Transaction Ref:", transaction_ref);
console.log("  - Third-Party Ref:", thirdparty_ref);
console.log("--------------------------------------------------");

async function runTest() {
    try {
        const result = await mpesa.initiate_c2b(amount, msisdn, transaction_ref, thirdparty_ref);
        console.log("Transaction initiated successfully!");
        console.log("Response:", result);
    } catch (error) {
        console.error("Transaction failed!");
        console.error("Error:", error);
    }
}

runTest();
