import { Locator, Page } from '@playwright/test';

export class CartPage {
    private readonly page: Page;
    private productNamesInCartSelector: string;

    constructor(page:Page){
        this.page = page;
        this.productNamesInCartSelector = '#tbodyid tr td:nth-child(2)';
    }

    async checkProductInCart(prodName:string):Promise<boolean>{
        await this.page.waitForTimeout(3000);
        const products = await this.page.locator(this.productNamesInCartSelector).all();
        for(const prod of products){
            const name = await prod.textContent();
            console.log(name);
            if(name?.trim()===prodName){
                return true;
            }
        }

        return false;
    }
}