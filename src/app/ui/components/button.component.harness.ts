import { ComponentHarness } from '@angular/cdk/testing';

export class ButtonComponentHarness extends ComponentHarness {
  static hostSelector = 'app-button';

  private getButton = this.locatorFor('button');
  private getSpinner = this.locatorForOptional('.spinner');

  async click(): Promise<void> {
    return (await this.getButton()).click();
  }

  async getText(): Promise<string> {
    return (await this.getButton()).text();
  }

  async isDisabled(): Promise<boolean> {
    return (await this.getButton()).getProperty('disabled');
  }

  async isLoading(): Promise<boolean> {
    const spinner = await this.getSpinner();
    return spinner !== null;
  }

  async getVariant(): Promise<string> {
    const button = await this.getButton();
    const classes = await button.getAttribute('class');
    if (classes?.includes('primary')) return 'primary';
    if (classes?.includes('secondary')) return 'secondary';
    if (classes?.includes('danger')) return 'danger';
    return 'default';
  }
}