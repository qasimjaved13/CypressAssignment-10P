/// <reference types = "cypress"/>

describe('Enrollment API Tests', () => {
    let token = null
    const partnerKey = 'ACCOUNTTESTENR-' + Math.random()
    const email = 'test' + Math.random() + '@qmail.com'

    before(() => {
        cy.GetAuthToken().then((access_token) => {
            token = access_token
        })
    })

    it('Add a subscriber', () => {
        cy.fixture('SubscriberManagaement').then((data) => {
            cy.request({
                method: 'POST',
                url: '/api/v2/subscriber/enrollment',
                headers: {
                    Authorization: 'Bearer ' + token,
                    accept: 'application/json'
                },
                body: {
                    PartnerKey: partnerKey,
                    PartnerSubKey: data.addEnrollment.PartnerSubKey,
                    PackageCode: data.addEnrollment.PackageCode,
                    FirstName: data.addEnrollment.FirstName,
                    LastName: data.addEnrollment.LastName,
                    Street1: data.addEnrollment.Street1,
                    City: data.addEnrollment.City,
                    State: data.addEnrollment.State,
                    Zip: data.addEnrollment.Zip,
                    PhoneNumber: data.addEnrollment.PhoneNumber,
                    Email: data.addEnrollment.Email,
                    EmailOptOut: data.addEnrollment.EmailOptOut,
                    DateOfBirth: data.addEnrollment.DateOfBirth,
                    Last4SSN: data.addEnrollment.Last4SSN,
                    AcceptedCreditMonitoringTandCs: data.addEnrollment.AcceptedCreditMonitoringTandCs,
                    SmsNumber: data.addEnrollment.SmsNumber,
                    SmsCountryCode: data.addEnrollment.SmsCountryCode,
                    EffectiveDate: data.addEnrollment.EffectiveDate,
                    EffectiveCancellationDate: data.addEnrollment.EffectiveCancellationDate,
                    Domain: data.addEnrollment.Domain,
                    NumberOfEmployees: data.addEnrollment.NumberOfEmployees
                }
            }).should((response) => {
                cy.log(partnerKey)
                expect(response.status).eq(200)
                expect(response.body.message).eq("Subscriber has been added successfully")
            })
        })
    })

    it('Update a subscriber', () => {
        cy.fixture('SubscriberManagaement').then((data) => {
            cy.request({
                method: 'PUT',
                url: '/api/v2/subscriber/' + partnerKey + ' ' + data.addEnrollment.PartnerSubKey + '/enrollment',
                headers: {
                    Authorization: 'Bearer ' + token,
                    accept: 'application/json'
                },
                body: {
                    PackageCode: data.updateEnrollment.PackageCode,
                    FirstName: data.updateEnrollment.FirstName,
                    LastName: data.updateEnrollment.LastName,
                    Street1: data.updateEnrollment.Street1,
                    City: data.updateEnrollment.City,
                    State: data.updateEnrollment.State,
                    Zip: data.updateEnrollment.Zip,
                    PhoneNumber: data.updateEnrollment.PhoneNumber,
                    Email: email,
                    EmailOptOut: data.updateEnrollment.EmailOptOut,
                    DateOfBirth: data.updateEnrollment.DateOfBirth,
                    Last4SSN: data.updateEnrollment.Last4SSN,
                    AcceptedCreditMonitoringTandCs: data.updateEnrollment.AcceptedCreditMonitoringTandCs,
                    SmsNumber: data.updateEnrollment.SmsNumber,
                    SmsCountryCode: data.updateEnrollment.SmsCountryCode,
                    EffectiveDate: data.updateEnrollment.EffectiveDate,
                    EffectiveCancellationDate: data.updateEnrollment.EffectiveCancellationDate,
                    Domain: data.updateEnrollment.Domain,
                    NumberOfEmployees: data.updateEnrollment.NumberOfEmployees
                }
            }).should((response) => {
                cy.log(partnerKey)
                expect(response.status).eq(200)
                expect(response.body.message).eq("Subscriber details updated successfully")
            })
        })
    })

    it('Get subscriber details', () => {
        cy.fixture('SubscriberManagaement').then((data) => {
            cy.request({
                method: 'GET',
                url: '/api/v2/subscriber/' + partnerKey + ' ' + data.addEnrollment.PartnerSubKey + '/enrollment',
                headers: {
                    Authorization: 'Bearer ' + token,
                    accept: 'application/json'
                }
            }).should((response) => {
                cy.log(partnerKey)
                expect(response.status).eq(200)
                expect(response.body.message).eq("Subscriber Found")
            })
        })
    })

    it('Get subscriber service details', () => {
        cy.fixture('SubscriberManagaement').then((data) => {
            cy.request({
                method: 'GET',
                url: '/api/v2/subscriber/' + partnerKey + ' ' + data.addEnrollment.PartnerSubKey + '/enrollment/services',
                headers: {
                    Authorization: 'Bearer ' + token,
                    accept: 'application/json'
                }
            }).should((response) => {
                cy.log(partnerKey)
                expect(response.status).eq(200)
                expect(response.body.message).eq("Subscriber Services Found")
            })
        })
    })

    it('Cancel Subscription', () => {
        cy.fixture('SubscriberManagaement').then((data) => {
            cy.request({
                method: 'DELETE',
                url: '/api/v2/subscriber/' + partnerKey + ' ' + data.addEnrollment.PartnerSubKey + '/enrollment',
                headers: {
                    Authorization: 'Bearer ' + token,
                    accept: 'application/json'
                }
            }).should((response) => {
                cy.log(partnerKey)
                expect(response.status).eq(200)
                expect(response.body.message).eq("Subscriber deleted successfully.")
            })
        })
    })
})