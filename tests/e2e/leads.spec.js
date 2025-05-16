const { test, expect } = require('../support')

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = page.faker.person.fullName()
  const leadEmail = page.faker.internet.email()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message)
});

test('não deve cadastrar quando o email ja existe', async ({ page, request }) => {
  const leadName = page.faker.person.fullName()
  const leadEmail = page.faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads',{
    data:{
       name: leadName,
      email: leadEmail
    }
  })
  
  expect(newLead.ok()).toBeTruthy()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message)
});

test('nao deve cadastrar um email incorreto', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('eric cabral neder', 'erik.ericcabralmail.com')
  await page.landing.alertHaveText('Email incorreto')
});

test('nao deve cadastrar quando o nome nao e preenchido', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'erik.ericcabral@mail.com')
  await page.landing.alertHaveText('Campo obrigatório')
});

test('nao deve cadastrar um o email nao e preenchido', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('eric cabral neder', '')
  await page.landing.alertHaveText('Campo obrigatório')
});

test('nao deve cadastrar quando nenhum campo e preenchido', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')
  await page.landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});

