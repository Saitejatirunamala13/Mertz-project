public class Case_ShipmentStatusController {
    // Define an AuraEnabled method to fetch shipment details
    @AuraEnabled
    public static Map<String,Object> getShipmentDetails(STring trackNumber){
        
        try{
            // Create an HTTP request object
            HttpRequest req = new HttpRequest();  
            
            // Set the endpoint for the external service
            String endpoint = 'callout:SelfOrg2/services/apexrest/mockShipmentStatus';
            
            // If a tracking number is provided, append it to the endpoint
            if(String.isNotBlank(trackNumber)){
                endpoint+='?trackingNumber='+trackNumber;
            }
            
            // Set the HTTP method to GET
            req.setEndpoint(endpoint);
            req.setMethod('GET');
            
            // Create an HTTP client
            Http http = new Http();
            
            // Send the HTTP request and capture the response
            HTTPResponse res = http.send(req);
            
            // Log the response body for debugging purposes
            System.debug(res.getBody());
            
            // Check if the response status code is 200 (OK)
            if(res.getStatusCode() == 200){
                // If the response body contains 'Error', return an error map
                if(res.getBody().contains('Error')){
                    return new Map<String,Object>{'hasError'=>TRUE, 'message'=>res.getBody()};
                        }
                 // Otherwise, return a success map
                return new Map<String,Object>{'hasError'=>FALSE, 'message'=>res.getBody()};
                    }
            // If the response status code is not 200, return an error map
            return new Map<String,Object>{'hasError'=>TRUE, 'message'=>res.getBody()};
                }catch(exception ex){
                    // If an exception is caught, return an error map with the exception message
                    return new Map<String,Object>{'hasError'=>TRUE, 'message'=>ex.getMessage()};
                        }
    }
    
}