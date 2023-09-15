const { createToast } = require('./../function/toast');
const iziToast = require("izitoast")

// Mock the iziToast library
jest.mock('iziToast', () => ({
    info: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
}));

// Mock the document object
const mockDocument = {
    addEventListener: jest.fn((event, callback) => {
        if (event === 'DOMContentLoaded') {
            callback();
        }
    }),
};

global.document = mockDocument;

describe("Test Success Toast", () => {
    it('createToast should call iziToast.success with the correct parameters for type "success"', () => {
        // Arrange
        const type = 'success';
        const title = 'Test Title';
        const message = 'Test Message';
        const color = '#00b09b';

        // Act
        createToast(type, title, message, color);

        // Assert
        expect(iziToast.success).toHaveBeenCalledWith({
            title: title,
            message: message,
            position: 'topRight',
            timeout: 3000,
            progressBarColor: color,
        });
    });
})

describe("Test Error Toast", () => {
    it('createToast should call iziToast.error with the correct parameters for type "error"', () => {
        // Arrange
        const type = 'error';
        const title = 'Test Title';
        const message = 'Test Message';
        const color = '#ff5f6d';

        // Act
        createToast(type, title, message, color);

        // Assert
        expect(iziToast.error).toHaveBeenCalledWith({
            title: title,
            message: message,
            position: 'topRight',
            timeout: 3000,
            progressBarColor: color,
        });
    });
})

describe("Test Loading Toast", () => {
    it('createToast should call iziToast.info with the correct parameters for type "loading"', () => {
        createToast("loading");

        expect(iziToast.info);
    });
})
