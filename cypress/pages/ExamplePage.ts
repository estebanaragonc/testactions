/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
export class ExamplePage {
  /**
   * Locators for all the UI Elements. Please follow the UI Naming convention standards
   * Buttons: btn_{description}
   * Sections/Containers: section_{description}
   * Links: lnk_{description}
   * Text inputs: input_{description}
   * Checkboxes: chk_{description}
   * Radio buttons: rad_{description}
   * Dropdowns/selects: dd_{description}
   * Date pickers: dtp_{description}
   * Modals: mdl_{description}
   * Tabs: tab_{description}
   * Accordion panels: acc_{description}
   * Tables: tbl_{description}
   * Labels: lbl_{description}
   * Images: img_{description}
   * Icons: ico_{description}
   * Tooltips: ttp_{description}
   * Progress bars: prg_{description}
   * Spinners: spn_{description}
   * Alerts: alt_{description}
   * Toasts: tst_{type}
   * Popovers: pop_{description}
   * Breadcrumbs: brc_{description}
   * Navigation menus: nav_{description}
   * Pagination: pag_{description}Carousels: crs_{description}
   * Sliders: sld_{description}
   */

  private input_username = '#user-name';

  private input_password = "//input[@id='password']";

  private btn_login = '#login-button';

  private header_title = "//div[@class='primary_header']";

  /**
   * Actions: The following functions are responsabile of the behaviour of the actiosn performed for this screen/page.
   * Note: Use cammelCase to name the functions.
   * Example: thisIsMyFunction
   */

  visit() {
    cy.visit('/');
  }

  login(username: string, password: string) {
    cy.get(this.input_username).type(username);
    cy.xpath(this.input_password).type(password);
    cy.get(this.btn_login).click();
  }

  getTitleHeader() {
    return cy.xpath(this.header_title);
  }
}
