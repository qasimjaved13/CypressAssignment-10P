/// <reference types = "cypress"/>




describe('Account API Tests', () => {
    let token = null
    const partnerKey = 'ACCOUNTTEST-' + Math.random()
    const email = 'test' + Math.random() + '@qmail.com'

    before(() => {
        cy.GetAuthToken().then((access_token) => {
            token = access_token
        })
    })

    it('Add a subscriber account', () => {
        cy.fixture('SubscriberManagaement').then((data) => {
            cy.request({
                method: 'POST',
                url: '/api/v2/subscriber/account',
                headers: {
                    Authorization: 'Bearer ' + token,
                    accept: 'application/json'
                },
                body: {
                    PartnerKey: partnerKey,
                    PartnerSubKey: data.addAccount.PartnerSubKey,
                    PackageCode: data.addAccount.PackageCode,
                    CompanyName: data.addAccount.CompanyName,
                    FirstName: data.addAccount.FirstName,
                    LastName: data.addAccount.LastName,
                    Street1: data.addAccount.Street1,
                    Street2: data.addAccount.Street2,
                    City: data.addAccount.City,
                    State: data.addAccount.State,
                    Zip: data.addAccount.Zip,
                    PhoneNumber: data.addAccount.PhoneNumber,
                    Email: data.addAccount.Email,
                    EmailOptOut: data.addAccount.EmailOptOut,
                    DateOfBirth: data.addAccount.DateOfBirth,
                    SmsNumber: data.addAccount.SmsNumber,
                    SmsCountryCode: data.addAccount.SmsCountryCode,
                    Last4SSN: data.addAccount.Last4SSN,
                    TOSAcceptedDate: data.addAccount.TOSAcceptedDate
                }
            }).should((response) => {
                cy.log(partnerKey)
                expect(response.status).eq(201)
                expect(response.body.message).eq("Subscriber account added successfully.")
            })
        })
    })

    it('Update a subscriber account', () => {
        cy.fixture('SubscriberManagaement').then((data) => {
            cy.request({
                method: 'PUT',
                url: '/api/v2/subscriber/' + partnerKey + ' ' + data.addAccount.PartnerSubKey + '/account',
                headers: {
                    Authorization: 'Bearer ' + token,
                    accept: 'application/json'
                },
                body: {
                    CompanyName: data.UpdateAccount.CompanyName,
                    Street1: data.UpdateAccount.Street1,
                    Street2: data.UpdateAccount.Street2,
                    City: data.UpdateAccount.City,
                    State: data.UpdateAccount.State,
                    Zip: data.UpdateAccount.Zip,
                    PhoneNumber: data.UpdateAccount.PhoneNumber,
                    Email: email,
                    EmailOptOut: data.UpdateAccount.EmailOptOut,
                    DateOfBirth: data.UpdateAccount.DateOfBirth,
                    SmsNumber: data.UpdateAccount.SmsNumber,
                    SmsCountryCode: data.UpdateAccount.SmsCountryCode,
                    TOSAcceptedDate: data.UpdateAccount.TOSAcceptedDate
                }
            }).should((response) => {
                cy.log(partnerKey)
                expect(response.status).eq(200)
                expect(response.body.message).eq("Account updated successfully.")
            })
        })
    })

    it('Get subscriber account details', () => {
        cy.fixture('SubscriberManagaement').then((data) => {
            cy.request({
                method: 'GET',
                url: '/api/v2/subscriber/' + partnerKey + ' ' + data.addAccount.PartnerSubKey + '/account',
                headers: {
                    Authorization: 'Bearer ' + token,
                    accept: 'application/json'
                },
            }).should((response) => {
                cy.log(partnerKey)
                expect(response.status).eq(200)
                expect(response.body.message).eq("Subscriber found")
            })
        })
    })
})