/**
*This houses a mock endpoint for Merz Salesforce Developer Interview Project
*https://merzcommunities--mel.sandbox.my.salesforce-sites.com/services/apexrest/mockShipmentStatus?trackingNumber=anystringwilldo
**/
@RestResource(urlMapping='/mockShipmentStatus/*')
global class MockShippingStatusService {
    @HttpGet
    global static String doGet() {
        String trackingNumber = RestContext.request.params.get('trackingNumber');
        If (trackingNumber == null) {
            return 'Error - Must provide tracking number';
        }
        return 'Shipped - On Time';
    }
}