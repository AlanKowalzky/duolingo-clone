import { ComponentHarness } from '@angular/cdk/testing';

export class CardComponentHarness extends ComponentHarness {
  static hostSelector = 'app-card';

  private getTitle = this.locatorForOptional('.card-header h3');
  private getContent = this.locatorFor('.card-content');
  private getFooter = this.locatorForOptional('.card-footer');

  async getTitle(): Promise<string | null> {
    const title = await this.getTitle();
    return title ? title.text() : null;
  }

  async getContent(): Promise<string> {
    return (await this.getContent()).text();
  }

  async hasFooter(): Promise<boolean> {
    const footer = await this.getFooter();
    return footer !== null;
  }

  async getVariant(): Promise<string> {
    const host = await this.host();
    const classes = await host.getAttribute('class');
    if (classes?.includes('primary')) return 'primary';
    if (classes?.includes('secondary')) return 'secondary';
    return 'default';
  }
}