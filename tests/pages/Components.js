import { expect } from '@playwright/test';

export class Toast {

    constructor(page){
        this.page = page
    }

    async toastHaveText(message) {
        const toast = this.page.locator('.toast')
        await expect(toast).toHaveText(message)
        await expect(toast).not.toBeVisible({ timeout: 5000 })
    }
}