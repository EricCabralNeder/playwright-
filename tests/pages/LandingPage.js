const {test, expect} = require('@playwright/test')

export class LandingPage {

    constructor(page){
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000')
    }

    async openLeadModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click()     // quando o texto esta em /ssdsd/ = contens
        await expect(this.page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera') //heading CABEÇALHP
    }

    async submitLeadForm(name,email) {
        //await page.locator('#name').fill('erik.ericcabral@mail.com')
        //await page.locator('input[name=name]').fill('erik.ericcabral@mail.com')
        //await page.locator('input[placeholder="Seu nome completo"]').fill('erik.ericcabral@mail.com')
        await this.page.getByPlaceholder('Informe seu nome').fill(name)
        await this.page.getByPlaceholder('Informe seu email').fill(email)

        await this.page.getByTestId('modal')
            .getByText('Quero entrar na fila!').click();
    }

    // async toastHaveText(message) {

    //     const toast = this.page.locator('.toast')
    //     //await this.page.getByText('seus dados conosco').click()
    //     // const content = await page.content() // pega o html de onde esta o foco
    //     // console.log(content)
    //    // await this.page.getByText('seus dados conosco').click()
    //     await expect(toast).toHaveText(message)
    //     //await expect(toast).toBeHidden({ timeout: 5000 })// verifica se esta invisivel em ate cinco segundos
    //     await expect(toast).not.toBeVisible({ timeout: 5000 })// verifica se esta invisivel em ate cinco segundos (pode esta no HTML)
    //     //await page.waitForTimeout(5000);
    // }

    async alertHaveText(target){
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}
