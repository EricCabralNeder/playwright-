const { test, expect } = require('@playwright/test')

export class Login {

    constructor(page) {
        this.page = page
    }

    async do(email, password, username) {
        this.visit()
        this.submit(email, password)
        this.isLoggedIn(username)
    }

    async visit() {
        await this.page.context().clearCookies();
        await this.page.addInitScript(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
        await this.page.goto('http://localhost:3000/admin/login');
        const currentUrl = this.page.url();

        if (currentUrl.includes('/admin/login')) {
            // Estamos na tela de login mesmo
            await expect(this.page).toHaveURL('http://localhost:3000/admin/login');
            await expect(this.page.locator('.login-form')).toBeVisible();
        } else {
            // Já redirecionou, possivelmente já logado
            console.warn('Usuário já autenticado, redirecionado para /admin/movies');
            await expect(this.page).toHaveURL('http://localhost:3000/admin/movies');
        }
    }

    async submit(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)

        //await this.page.locator('//button[text()="Entrar"]').click() xpath
        await this.page.getByText('Entrar').click()
    }

    async alertHaveText(message) {
        const alert = this.page.locator('span[class$=alert]') // seletor css
        await expect(alert).toHaveText(message)
    }

    async isLoggedIn(username) {
        // const loggedLink = this.page.locator('a[href="/logout"]')
        // await expect(loggedLink).toBeVisible()
        // await this.page.waitForLoadState('networkidle')
        // await expect(this.page).toHaveURL(/.*movies/)

        // const loggedLink = this.page.locator('a[href="/logout"]')

        const loggedUser = this.page.locator('.logged-user')

        // Espera até que o elemento esteja visível (timeout padrão: 30s, você pode ajustar)
        await loggedUser.waitFor({ state: 'visible', timeout: 10000 }); // espera até 10s

        await expect(loggedUser).toHaveText(`Olá, ${username}`)
        // await expect(this.page).locator('.logged-user').toHaveText('Olá, Admin')
    }
}
