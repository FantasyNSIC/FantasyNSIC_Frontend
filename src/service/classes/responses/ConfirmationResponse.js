/**
 * ConfirmationResponse class is used to represent a confirmation on the success or failure of a request.
 */
export class ConfirmationResponse {
    /**
     * Constructor for ConfirmationResponse class.
     * 
     * @param {boolean} success - The success value.
     * @param {string} message - The message value.
     */
    constructor(success, message) {
        this.success = success;
        this.message = message;
    }

    /**
     * Returns the success value.
     * 
     * @returns {boolean} The success value.
     */
    getSuccess() {
        return this._success;
    }

    /**
     * Sets the success value.
     * 
     * @param {boolean} success - The success value.
     */
    setSuccess(success) {
        this._success = success;
    }

    /**
     * Returns the message value.
     * 
     * @returns {string} The message value.
     */
    getMessage() {
        return this._message;
    }

    /**
     * Sets the message value.
     * 
     * @param {string} message - The message value.
     */
    setMessage(message) {
        this._message = message;
    }

    /**
     * Create a general response class to use.
     * 
     * @returns {ConfirmationResponse} The ConfirmationResponse object.
     */
    static createGeneralResponse() {
        return new ConfirmationResponse(false, 'An error occurred. Please try again later.');
    }

    /**
     * Converts the ConfirmationResponse object to JSON format.
     * 
     * @returns {object} The JSON representation of the ConfirmationResponse object.
     */
    toJson() {
        return {
            'success': this.success,
            'message': this.message
        };
    }

    /**
     * Creates a ConfirmationResponse object from a Response object.
     * 
     * @param {object} response - The Response object.
     * @returns {ConfirmationResponse} The ConfirmationResponse object.
     */
    static fromResponse(response) {
        return new ConfirmationResponse(response.data.success, response.data.message);
    }
}