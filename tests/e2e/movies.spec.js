const { test, expect } = require('../support')
const data = require('../support/fixtures/covers/movies.json')
const { executeSQL } = require('../support/database')

test.beforeEach(async ({ page }) => {
  // Limpando cookies e storage antes de cada teste
  await page.context().clearCookies();
  await page.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

test.beforeAll(async () => {
  executeSQL(`DELETE FROM movies`)
})

test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.create
    //executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)
    await page.toast.containText('UhullCadastro realizado com sucesso!')
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
   
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.IdentityMovies(
        'Por favor, informe o título.', 
        'Por favor, informe a sinopse.', 
        'Por favor, informe a empresa distribuidora.', 
        'Por favor, informe o ano de lançamento.')
})

test('não deve cadastrar quando o titulo é duplicado', async ({ page }) => {
    const movie = data.duplicate
    //executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)

    await page.toast.containText('Oops!Este conteúdo já encontra-se cadastrado no catálogo')
})