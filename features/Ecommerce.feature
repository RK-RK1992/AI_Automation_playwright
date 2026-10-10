@CucumberScenarios
Feature: Ecommerce validation

  @Regression
  Scenario: Place order for login user
    Given A login to the ecommerce application with "rohitkush38@gmail.com" and "Password@1"
    When  Add "ZARA COAT 3" to the cart
    Then Validate the product is "ZARA COAT 3" added to the cart
    When Enter valid details and place the order
    Then Verify order is present in order history page


  @MultipleUsers
  Scenario Outline: Place order for different users
    Given A login to the ecommerce application with "<username>" and "<password>"
    When  Add "ZARA COAT 3" to the cart
    Then Validate the product is "ZARA COAT 3" added to the cart
    When Enter valid details and place the order
    Then Verify order is present in order history page

    Examples:
      | username              | password   |
      | rohitkush38@gmail.com | Password@1 |
      | rohit.k11@gmail.com   | Password@1 |

  @Validation
  Scenario: Place order for login user
    Given A login to the ecommerce2 application with "rohitkush38@gmail.com" and "Password@1"
    Then Verify the error message is displayed