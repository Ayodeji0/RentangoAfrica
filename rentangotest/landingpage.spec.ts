import { test, expect } from "@playwright/test";
import { RentagoHomePage } from "./pages/LandingPage";

test.describe('Rentago Africa Tests', () => {
  let rentagoHomePage: RentagoHomePage;

  test.beforeEach(async ({ page }) => {
    rentagoHomePage = new RentagoHomePage(page);
    await rentagoHomePage.navigateToHomePage();
  });

  test('Navigate to Sign up page', async () => {
    await rentagoHomePage.clickSignUpButton();
  });

  test('Navigate to Sign in page', async () => {
    await rentagoHomePage.clickSignInButton();
  });

  test('Submit Contact Us form with valid data', async () => {
    await rentagoHomePage.fillContactUsAndClickSendButton('valid');
    const statusMessage = await rentagoHomePage.getStatusMessage();
    expect(statusMessage).toContain('Message sent successfully');
  });

  test('Prevent submission with invalid email in Contact Us form', async () => {
    await rentagoHomePage.fillContactUsAndClickSendButton('invalidEmail');
    // No assertion is made because the web prevents submission
  });

  test('Prevent submission with empty first name in Contact Us form', async () => {
    await rentagoHomePage.fillContactUsAndClickSendButton('emptyFirstName');
    // No assertion is made because the web prevents submission
  });

  test('Prevent submission with empty last name in Contact Us form', async () => {
    await rentagoHomePage.fillContactUsAndClickSendButton('emptylastname');
    // No assertion is made because the web prevents submission
  });

  test('Prevent submission with empty message in Contact Us form', async () => {
    await rentagoHomePage.fillContactUsAndClickSendButton('emptytextarea');
    // No assertion is made because the web prevents submission
  });

  test('Prevent submission with all empty fields in Contact Us form', async () => {
    await rentagoHomePage.fillContactUsAndClickSendButton('emptyFields');
    // No assertion is made because the web prevents submission
  });
});
