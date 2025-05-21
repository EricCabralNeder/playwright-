const { test, expect } = require('@playwright/test')

export class Movies {

    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async create(title, overview, company, release_year) {
        await this.goForm()
        await this.page.getByLabel('Titulo do filme').fill(title)

        await this.page.getByLabel('Sinopse').fill(overview)
        await this.page.locator('#select_company_id .react-select__indicator').click()

        // const html = await this.page.content()
        // console.log(html)

        await this.page.locator('.react-select__option').filter({ hasText: company }).click()

        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click()
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }


    async IdentityMovies(título, sinopse, distribuidora, lançamento) {
        await this.goForm()
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()

        await this.alertHaveText([
            título,
            sinopse,
            distribuidora,
            lançamento
        ])

        // await this.page.getByPlaceholder(título).isVisible()
        // await this.page.getByPlaceholder(sinopse).isVisible()
        // await this.page.getByPlaceholder(distribuidora).isVisible()
        // await this.page.getByPlaceholder(lançamento).isVisible()
    }

    async alertHaveText(target){
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}
