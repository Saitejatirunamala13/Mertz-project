import { LightningElement, api, wire } from 'lwc';
import getShipmentDetails from '@salesforce/apex/Case_ShipmentStatusController.getShipmentDetails';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

// Define the fields to retrieve from the case record
const FIELDS = ["Case.Shipment_Tracking_Number__c"];

export default class CaseShipmentStatus extends LightningElement {
    _ShipmentInfo; // Stores shipment information
    error; // Stores any error information
    @api recordId; // The ID of the case record passed to the component
    _case;
    _class=''; // CSS class for styling
    
    // Wire service to fetch case data based on the provided record ID and fields which will refresh LWC when tracking number is updated
    @wire(getRecord, { recordId: "$recordId", fields: FIELDS })
    wiredRecord({ error, data }) {
        if (error) {
            // Handle errors when retrieving case data
            console.log(error)
            let message = "Unknown error";
            if (Array.isArray(error.body)) {
                message = error.body.map((e) => e.message).join(", ");
            } else if (typeof error.body.message === "string") {
                message = error.body.message;
            }
            // Display an error toast message
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Error loading Case",
                    message,
                    variant: "error",
                }),
            );
        } else if (data) {
            // Handle successful retrieval of case data
            console.log(data, 'data');
            this.handleLoad(data.fields.Shipment_Tracking_Number__c.value);
           
        }
    }
    
    // Fetch shipment details based on the tracking number
    async handleLoad(trackNumber) {
        try {
            console.log(trackNumber, "trackNumber")
            var res = await getShipmentDetails({ 'trackNumber': trackNumber });
            var obj = JSON.parse(JSON.stringify(res));
            console.log(obj,"obj")
            console.log(obj.hasError,"obj hasError")
            console.log(obj.message,"obj message")
            if (obj.hasError) {
                // Handle the scenario where there's an error in shipment details
                console.log(obj.hasError,"obj error")
                this._ShipmentInfo = obj.message;
                this._class = 'slds-box slds-theme_error';
            } else {
                // Handle the scenario where shipment details are successfully retrieved
                console.log(obj.message,"obj else")
                this._ShipmentInfo = obj.message;
                this._class = 'slds-box slds-theme_success';
            }

            this.error = undefined;
        } catch (error) {
            // Handle exceptions when fetching shipment details
            this._ShipmentInfo = undefined;
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Error while Tracking Case ShipmentDetails",
                    message: JSON.stringify(error),
                    variant: "error",
                }),
            );
        }
    }

}