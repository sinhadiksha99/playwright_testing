import { Locator, Page } from '@playwright/test';

export class HomePage {
    private readonly page: Page;
    private readonly productList: Promise<Array<Locator>>;
    private readonly addToCartBtn: Locator;
    private readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productList = this.page.locator("div#tbodyid div.card h4.card-title a").all();
        this.addToCartBtn = this.page.locator("a:has-text('Add to cart')");
        this.cartLink = this.page.locator("#cartur");
    }

    async addProductToCart(productName: string): Promise<void> {
        const productElements = await this.productList;
        for (const element of productElements) {
            const name = await element.textContent();
            if (name?.trim() === productName) {
                await element.click();
                break;
            }
        }

        this.page.once('dialog', async dialog => {
            if (dialog.message().includes('added')) {
                await dialog.accept();
            }
        })
        await this.addToCartBtn.waitFor({state:'visible', timeout:50000})
        await this.addToCartBtn.click();
    }

    async goToCart(){
        await this.cartLink.click();
    }
}