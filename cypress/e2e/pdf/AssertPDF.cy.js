describe(`PDF Content Assertion`, () => {
    it(`literal copies should be the same`, () => {
        cy.fixture('pdf/testData.json').then(({ filePaths }) => {
            cy.task("readPdf", { path: filePaths.main }).as("main");
            cy.task("readPdf", { path: filePaths.copy }).as("copy");
            cy.get("@main")
                .its('text')
                .then(main => {
                    cy.get("@copy")
                        .its('text')
                        .then(copy => {
                            expect(main).to.eq(copy);
                        })
                })
        })
    });

    it(`pdf file with same text and image should not be the same as file with text only`, () => {
        cy.fixture('pdf/testData.json').then(({ filePaths }) => {
            cy.task("readPdf", { path: filePaths.main }).as("main");
            cy.task("readPdf", { path: filePaths.copyWithImage }).as("copyWithImage");
            cy.get("@main").its('text')
                .then(main => {
                    cy.get("@copyWithImage")
                        .its('text')
                        .then(copy => {
                            expect(main).not.to.eq(copy);
                        })
                })
        })
    });

    it(`pure text contents of main file and file with image should be the same`, () => {
        cy.fixture('pdf/testData.json').then(({ filePaths }) => {
            cy.task("readPdf", { path: filePaths.main })
                .its('text')
                .then(text =>
                    cy.task('removeSpacesAndLineBreaks', { text }).as("mainTextOnly"));
            cy.task("readPdf", { path: filePaths.copyWithImage })
                .its('text')
                .then(text =>
                    cy.task('removeSpacesAndLineBreaks', { text }).as("copyTextOnly"));
            cy.get("@mainTextOnly").then(main => {
                cy.get("@copyTextOnly")
                    .then(copy => {
                        expect(main).to.eq(copy);
                    })
            })
        })
    })
})