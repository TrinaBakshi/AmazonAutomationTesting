Feature: Get optimal price of a product

  Background:
    Given User navigates to the application

  Scenario: Update product price for with exchange
    When User types the desired "<product_name>" inside the search bar
    And  User selects the search button
    And  User selects the "<product_name>" from the list
    Then product details page will be launched
    When User selects the size of the product as "<Product_Specification>"
    And  User selects the style name of the product as "<EMI>"
    And  User selects the color of the product as "<Colour>"
    And User selects with exchange radio button as "<Exchange_Option>"
    And User clicks on choose phone to exchange button
    And User selects brand as "<Exchange_Phone_Brand>" from the drop down option
    And User selects model as "<Exchange_Phone_Model>" from the drop down option
    And User selects RAM and storage as "<Exchange_Phone_Storage>" from the drop down option
    And User selects your phone condition as "<Exchange_Phone_Condition>"
    And User clicks on continue button
    And User enters IMEI number as "<Exchange_Phone_IMEI_number>"
    And User clicks on verify button
    And User clicks on Apply Exchange button
    And User applies coupon
    Then Product price will be updated

    Examples:
      | product_name                | Product_Specification | EMI                                | Colour         | Exchange_Option | Exchange_Phone_Brand | Exchange_Phone_Model | Exchange_Phone_Storage | Exchange_Phone_Condition | Exchange_Phone_IMEI_number |
      | samsung galaxy s25 ultra 5g | 12GB + 256GB          | with exchange bonus or No cost EMI | Titanium Black | With Exchange   | Oneplus              | Nord CE 5            | 8GB, 128 GB            | No damage                | 865597085984135            |