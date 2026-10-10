@CucumberScenarios
Feature: Ecommerce validation

    @Validation
    Scenario: Place order for login user
        Given A login to the ecommerce2 application with "rohitkush38@gmail.com" and "Password@1"
        Then Verify the error message is displayed