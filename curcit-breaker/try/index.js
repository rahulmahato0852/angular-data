const CircuitBreaker = require('opossum');
const http = require('axios');

function asyncFunctionThatCouldFail(abortSignal) {
    return new Promise(async (resolve, reject) => {
        try {
            // Simulate failure by calling a non-existent service
            const result = await http.get('http://localhost:1000/');
            resolve(result.data);
        } catch (error) {
            reject(error.message);
        }
    });
}


const abortController = new AbortController();
const options = {
    abortController,
    errorThresholdPercentage: 50,
    timeout: 2010,
    resetTimeout: 5000, // 5 seconds before moving to half-open
};

const breaker = new CircuitBreaker(asyncFunctionThatCouldFail, options);

// Fallback function when circuit is open
breaker.fallback(() => {
    return { data: "Fallback data" };
});

// Listen for the 'open' event
breaker.on("open", () => {
    console.log("Circuit breaker is now open. All requests will be blocked temporarily.");
});

// Listen for the 'halfOpen' event
breaker.on("halfOpen", () => {
    console.log("Circuit breaker is half-open. Testing if service has recovered...");
});

// Listen for the 'close' event
breaker.on("close", () => {
    console.log("Circuit breaker is closed. Service has recovered.");
});

// Fire the circuit breaker multiple times to simulate the conditions
function runTest() {
    breaker.fire(abortController.signal)
        .then((data) => {
            console.log("Request succeeded:", data);
        })
        .catch((err) => {
            console.error("Request failed:", err);
        });
}

// Call the service multiple times to trigger the circuit breaker
setInterval(runTest, 1000);
