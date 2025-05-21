const { test: base, expect } = require('@playwright/test')

const { Leads } = require('../actions/Leads')
const { Login } = require('../actions/Login')
const { Movies } = require('../actions/Movies')
const { Toast } = require('../actions/Components')
const { faker } = require('@faker-js/faker');

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page
        context['leads'] = new Leads(page)
        context['login'] = new Login(page)
        context['movies'] = new Movies(page)
        context['toast'] = new Toast(page)
        context['faker'] = faker

        await use(context)
    }
})

export { test, expect }