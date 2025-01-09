import { Page, test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class RentagoHomePage {
  readonly page: Page;
  readonly signInButtonSelector: string;
  readonly signUpButtonSelector: string;
  readonly firstNameSelector: string;
  readonly lastNameSelector: string;
  readonly emailSelector: string;
  readonly textAreaSelector: string;
  readonly sendButtonSelector: string;
  readonly statusMessageSelector: string;

  constructor(page: Page) {
    this.page = page;
    this.signInButtonSelector = "//a[normalize-space()='sign in']"; 
    this.signUpButtonSelector = "//a[normalize-space()='sign up']";
    this.firstNameSelector = "//input[@name='first_name']";
    this.lastNameSelector = "//input[@name='last_name']";
    this.emailSelector = "//input[@placeholder='Enter your email address']";
    this.textAreaSelector = "//textarea[@placeholder='Enter your message']";
    this.sendButtonSelector = "//button[normalize-space()='Send Message']";
    this.statusMessageSelector = "//li[@role='status']";
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto('https://rentago-africa.vercel.app/');
  }

  async clickSignInButton(): Promise<void> {
    await this.page.click(this.signInButtonSelector);
  }

  async clickSignUpButton(): Promise<void> {
    await this.page.click(this.signUpButtonSelector);
  }

  async fillContactUsAndClickSendButton(type: string): Promise<void> {
    let firstName, lastName, email, message;

    switch (type) {
      case 'valid':
        firstName = faker.person.firstName();
        lastName = faker.person.lastName();
        email = faker.internet.email();
        message = faker.lorem.sentence();
        await this.page.fill(this.firstNameSelector, firstName);
        await this.page.fill(this.lastNameSelector, lastName);
        await this.page.fill(this.emailSelector, email);
        await this.page.fill(this.textAreaSelector, message);
        await this.page.click(this.sendButtonSelector);
        break;
      case 'invalidEmail':
        firstName = faker.person.firstName();
        lastName = faker.person.lastName();
        email = 'invalid-email';
        message = faker.lorem.sentence();
        await this.page.fill(this.firstNameSelector, firstName);
        await this.page.fill(this.lastNameSelector, lastName);
        await this.page.fill(this.emailSelector, email);
        await this.page.fill(this.textAreaSelector, message);
        break;
      case 'emptyFirstName':
        firstName = '';
        lastName = faker.person.lastName();
        email = faker.internet.email();
        message = faker.lorem.sentence();
        await this.page.fill(this.firstNameSelector, firstName);
        await this.page.fill(this.lastNameSelector, lastName);
        await this.page.fill(this.emailSelector, email);
        await this.page.fill(this.textAreaSelector, message);
        break;
      case 'emptylastname':
        firstName = faker.person.firstName();
        lastName = '';
        email = faker.internet.email();
        message = faker.lorem.sentence();
        await this.page.fill(this.firstNameSelector, firstName);
        await this.page.fill(this.lastNameSelector, lastName);
        await this.page.fill(this.emailSelector, email);
        await this.page.fill(this.textAreaSelector, message);
        break;
      case 'emptytextarea':
        firstName = faker.person.firstName();
        lastName = faker.person.lastName();
        email = faker.internet.email();
        message = '';
        await this.page.fill(this.firstNameSelector, firstName);
        await this.page.fill(this.lastNameSelector, lastName);
        await this.page.fill(this.emailSelector, email);
        await this.page.fill(this.textAreaSelector, message);
        break;
      case 'emptyFields':
        firstName = '';
        lastName = '';
        email = '';
        message = '';
        break;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }

  async getStatusMessage(): Promise<string> {
    await this.page.waitForSelector(this.statusMessageSelector,);
    const message = await this.page.textContent(this.statusMessageSelector);
    
    return message ?? '';
  }
}
