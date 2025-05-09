// @ts-check
import { test } from '@playwright/test';
const { LandingPage } = require('../pages/LandingPage')
const { Toast } = require('../pages/Components')
const { MoviesPage } = require('../pages/MoviesPage')
const { faker } = require('@faker-js/faker');

let landingPage
let moviesPage
let toast

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  moviesPage = new MoviesPage(page)
  toast = new Toast(page)
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(faker.person.firstName(), faker.internet.email())
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.toastHaveText(message)

});

test('nao deve cadastrar um email incorreto', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('eric cabral neder', 'erik.ericcabralmail.com')
  await landingPage.alertHaveText('Email incorreto')
});

test('nao deve cadastrar quando o nome nao e preenchido', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'erik.ericcabral@mail.com')
  await landingPage.alertHaveText('Campo obrigatório')
});

test('nao deve cadastrar um o email nao e preenchido', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('eric cabral neder', '')
  await landingPage.alertHaveText('Campo obrigatório')

});

test('nao deve cadastrar quando nenhum campo e preenchido', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')
  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});