const {test, expect} = require('@playwright/test')

export class Toast {

    constructor(page){
        this.page = page
    }

    async containText(message) {
        const toast = this.page.locator('.toast', { hasText: message }) // utilizado  { hasText: message } mesmo que haja duas mensagens ele valida a mensagem focada por parametro
        await expect(toast).toHaveText(message)
        await expect(toast).not.toBeVisible({ timeout: 5000 })
    }
}
