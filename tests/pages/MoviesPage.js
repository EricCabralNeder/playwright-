import { expect } from '@playwright/test';

export class MoviesPage {

    constructor(page) {
        this.page = page
    }

    async isLoggedIn(){
        // const loggedLink = this.page.locator('a[href="/logout"]')
        // await expect(loggedLink).toBeVisible()
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*movies/)
    }
}