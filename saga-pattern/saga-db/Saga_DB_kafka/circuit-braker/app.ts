import CircuitBreaker from "opossum"

const processMessage = async (message: any) => {
    console.log(`Received message: ${message}`);
    // Simulate processing logic
    return `Processed message: ${message}`;
};

const options = {
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, open the circuit
    resetTimeout: 5000 // After 5 seconds, try again.
};

const breaker = new CircuitBreaker(processMessage, options);

// Event listeners for the circuit breaker
breaker.on('open', () => console.log('Circuit is open'));
breaker.on('halfOpen', () => console.log('Circuit is half-open'));
breaker.on('close', () => console.log('Circuit is closed'));

export default { breaker }
