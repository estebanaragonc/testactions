export class ExamplePage {
  // locators
  private usernameTxt = '#user-name';
  private passwordTxt = "//input[@id='password']";
  private loginBtn = '#login-button';
  private headerTitle = "//div[@class='primary_header']";

  // actions
  visit() {
    cy.visit('/');
  }

  login(username: string, password: string) {
    cy.get(this.usernameTxt).type(username);
    cy.xpath(this.passwordTxt).type(password);
    cy.get(this.loginBtn).click();
  }

  getTitleHeader() {
    return cy.xpath(this.headerTitle);
  }
}
