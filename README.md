# Project Documentation:
Merz Aesthetics Customer Service representatives must quickly get the updated status of a customer shipment. When viewing the standard Shipment page in Salesforce, the rep wants to be able to view a Lightning Web Component that displays the latest status of the Shipment based on the tracking number of the Shipment record.

## LWC - caseShipmentStatus

To fetch shipment status details based on the case tracking number and display on the case record page. This LWC takes the case record Id, gets the tracking number and fetches shipment status using the below apex class. This component also refreshes and displays latest shipment status when a tracking number is added/modified on the case record.

## Apex Class - Case_ShipmentStatusController

Methods to build the endpoint url, make the HTTP GET callout and fetches response from the endpoint.

## Apex Class - MockShippingStatusService

This houses the mock endpoint.

## Connected App, Auth Provider, Named Credentials

HTTP Callout architectural mechanisms and best practices to make a callout from Salesforce.

## Custom Field, Flexi Page, Layout and Profile

New field, added to layout, adjusted flexi page to add the LWC, and permissions for all new metadata.

## Manifest - package.xml

List of all components for this project