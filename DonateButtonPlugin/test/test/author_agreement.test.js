const allFunction = require('../function/all_function.js');

// Mock the document object
const mockDocument = {
    addEventListener: jest.fn((event, callback) => {
        if (event === 'DOMContentLoaded') {
            callback();
        }
    }),
};

global.document = mockDocument;

//-----------------------------AUTHOR_AGREEMENT.JS-----------------------------

describe('getPublications', () => {
    it('should fetch and return publication data with submission id 54', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        data: [
                            {
                                "publication_id": "54",
                                "access_status": "0",
                                "date_published": null,
                                "last_modified": "2023-07-17 07:13:29",
                                "locale": null,
                                "primary_contact_id": "85",
                                "section_id": "2",
                                "seq": "0.00",
                                "submission_id": "54",
                                "status": "1",
                                "url_path": null,
                                "version": "1",
                                "author_agreement": "1",
                                "reviewer_agreement": "1",
                                "publisher_agreement": "1",
                                "publisher_id": null
                            }
                        ],
                    }),
            })
        );


        const submissionId = 54;
        const result = await allFunction.getPublications(submissionId);

        // Verify the fetch function is called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost/ojs/plugins/generic/DonateButtonPlugin/request/publications.php?submissionId=' + submissionId
        );

        // Verify the result is the expected percentage value
        expect(result).toEqual({
            "publication_id": "54",
            "access_status": "0",
            "date_published": null,
            "last_modified": "2023-07-17 07:13:29",
            "locale": null,
            "primary_contact_id": "85",
            "section_id": "2",
            "seq": "0.00",
            "submission_id": "54",
            "status": "1",
            "url_path": null,
            "version": "1",
            "author_agreement": "1",
            "reviewer_agreement": "1",
            "publisher_agreement": "1",
            "publisher_id": null
        });
    });
})


describe('getAuthorWallet', () => {
    it('should fetch and return author data with id 2', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        "data": [
                            {
                                "author_id": "2",
                                "email": "justin.laurenso166@gmail.com",
                                "include_in_browse": "1",
                                "publication_id": "2",
                                "seq": "0.00",
                                "user_group_id": "19",
                                "wallet_address": null,
                                "percentage": "0"
                            }
                        ]
                    }),
            })
        );


        const author_id = 2;
        const result = await allFunction.getAuthorWallet(author_id);

        // Verify the fetch function is called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            `http://localhost/ojs/plugins/generic/DonateButtonPlugin/request/authors.php?author_id=${author_id}&type=getById`
        );

        // Verify the result is the expected percentage value
        expect(result).toEqual({
            "author_id": "2",
            "email": "justin.laurenso166@gmail.com",
            "include_in_browse": "1",
            "publication_id": "2",
            "seq": "0.00",
            "user_group_id": "19",
            "wallet_address": null,
            "percentage": "0"
        });
    });
})

describe('editAuthorWallet', () => {
    it('should update author wallet address and return success', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        success: true,
                    }),
            })
        );

        // Define the sample percentage_settings object
        const data = {
            username: "justin",
            wallet_address: "0x102B1d7D03bC57527c49A61DBFc5721F51c7dB59"
        }

        // Call the function
        const result = await allFunction.editAuthorWallet("update_percentage", data);

        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost/ojs/plugins/generic/DonateButtonPlugin/request/authors.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );

        // Verify the result is true (success)
        expect(result).toBe(true);
    });
})

describe('getAllAuthorData', () => {
    it('should fetch and return all author data with submission id 54', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        "data": [
                            {
                                "author_id": "85",
                                "email": "justin.laurenso166@gmail.com",
                                "include_in_browse": "1",
                                "publication_id": "54",
                                "seq": "0.00",
                                "user_group_id": "31",
                                "wallet_address": "0x102B1d7D03bC57527c49A61DBFc5721F51c7dB59",
                                "percentage": "100"
                            }
                        ]
                    }),
            })
        );


        const author_id = 2;
        const submissionId = 54;
        const result = await allFunction.getAllAuthorData(author_id, submissionId);

        // Verify the fetch function is called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            `http://localhost/ojs/plugins/generic/DonateButtonPlugin/request/authors.php?author_id=${author_id}&submission_id=${submissionId}&type=getAllAuthorData`
        );

        // Verify the result is the expected percentage value
        expect(result).toEqual([{
            "author_id": "85",
            "email": "justin.laurenso166@gmail.com",
            "include_in_browse": "1",
            "publication_id": "54",
            "seq": "0.00",
            "user_group_id": "31",
            "wallet_address": "0x102B1d7D03bC57527c49A61DBFc5721F51c7dB59",
            "percentage": "100"
        }]);
    });
})

describe('updateAgreement', () => {
    it('should update author agreement and return success', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        success: true,
                    }),
            })
        );

        // Define the sample percentage_settings object
        const data = {
            submissionId: 54,
            agreement: true,
        }

        // Call the function
        const result = await allFunction.updateAgreement(data);

        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost/ojs/plugins/generic/DonateButtonPlugin/request/publications.php?type=updateAuthorAgreement',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );

        // Verify the result is true (success)
        expect(result).toBe(true);
    });
})