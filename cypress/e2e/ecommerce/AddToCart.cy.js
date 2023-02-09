// For some reason I could not success to cy.visit("https://www.saucedemo.com")
// so after almost 1 hour of looking through the web I decided to write my own test
// on some other e-commerce dummy site
// I know it's not the cleanest code, but I wanted to deliver something 
// just to have this test done as I was short on time :)


describe(`Adding items to card`, () => {
    beforeEach(() => {
        cy.fixture("ecommerce/credentials.json").then(creds => {
            cy.visit(creds.url);
            cy.get('.nav-item').filter(':contains("Log in")').click();;
            cy.get('#loginusername').click().type(creds.user, { force: true });
            cy.get('#loginpassword').click().type(creds.password, { force: true });
            cy.get('button').filter(':contains("Log in")').click();
        })
    })
    it(`add cheapest phone to cart`, () => {
        const prices = [];
        cy.get('.list-group-item').filter(':contains("Phones")').click();
        cy.get('.card').get('h5').filter(':contains("$")').each(price => {
            const txt = price.text();
            const num = parseInt(txt.replace(/[^0-9]/, ''));
            prices.push(num);
        }).then(() => {
            prices.sort((a, b) => a - b);
        }).then(() => {
            cy.get('.card').filter(`:contains("$${prices[0]}")`)
                .find('img')
                .click();
            cy.get('a').filter(`:contains("Add to cart")`).click();
        })
    })
})