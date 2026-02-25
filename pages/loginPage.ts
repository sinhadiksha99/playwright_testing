import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly loginLink: Locator;
    private readonly userName: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = this.page.locator('#login2');
        this.userName = this.page.locator("#loginusername");
        this.password = this.page.locator("#loginpassword");
        this.loginBtn = this.page.locator('button[onclick="logIn()"]');
    }

    async clickLoginLink() {
        await this.loginLink.click();
    }

    async enterUserName(name: string) {
        await this.userName.clear();
        await this.userName.fill(name);
    }

    async enterPassword(password: string) {
        await this.password.clear();
        await this.password.fill(password);
    }

    async clickLoginButton() {
        await this.loginBtn.click();
    }

    async performlogin(name: string, password: string) {
        await this.clickLoginLink();
        await this.enterUserName(name);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

}