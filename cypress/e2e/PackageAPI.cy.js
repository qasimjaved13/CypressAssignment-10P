/// <reference types = "cypress"/>

describe('Package API Tests', () => {
    let token = null

    before(() => {
        cy.GetAuthToken().then((access_token) => {
            token = access_token
        })
    })

    it('Update subscriber package', () => {
        cy.fixture('SubscriberManagaement').then((data) => {
            cy.request({
                method: 'PUT',
                url: '/api/v2/subscriber/' + data.updatePackage.partnerKey + ' ' + data.updatePackage.PartnerSubKey + '/package',
                headers: {
                    Authorization: 'Bearer ' + token,
                    accept: 'application/json'
                },
                body: {
                    PackageCode: data.updatePackage.PackageCode
                }
            }).should((response) => {
                expect(response.status).eq(200)
                expect(response.body.message).eq("Package has been updated successfully.")
            })
        })
    })

    it('Cancel package associated with a subscriber account', () => {
        cy.fixture('SubscriberManagaement').then((data) => {
            cy.request({
                method: 'DELETE',
                url: '/api/v2/subscriber/' + data.updatePackage.partnerKey + ' ' + data.updatePackage.PartnerSubKey + '/package',
                headers: {
                    Authorization: 'Bearer ' + token,
                    accept: 'application/json'
                }
            }).should((response) => {
                expect(response.status).eq(200)
                expect(response.body.message).eq("Package has been cancelled successfully")
            })
        })
    })

    it('/api/v2/subscriber/{key}/package/reactivate', () => {
        cy.fixture('SubscriberManagaement').then((data) => {
            cy.request({
                method: 'POST',
                url: '/api/v2/subscriber/' + data.updatePackage.partnerKey + ' ' + data.updatePackage.PartnerSubKey + '/package/reactivate',
                headers: {
                    Authorization: 'Bearer ' + token,
                    accept: 'application/json'
                }
            }).should((response) => {
                expect(response.status).eq(200)
                expect(response.body.message).eq("Package has been reactivated successfully")
            })
        })
    })
})