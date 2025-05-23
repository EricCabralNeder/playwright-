const { test, expect } = require('../support')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.create

    executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn()

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)
    await page.toast.containText('UhullCadastro realizado com sucesso!')
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn()

    await page.movies.IdentityMovies(
        'Por favor, informe o título.', 
        'Por favor, informe a sinopse.', 
        'Por favor, informe a empresa distribuidora.', 
        'Por favor, informe o ano de lançamento.')
})
