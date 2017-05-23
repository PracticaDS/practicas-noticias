import "babel-polyfill"

import chai from "chai"
chai.should()

const serverHost = process.env.APP_SERVER || 'localhost'

describe("Dashboard landing", () => {

  it("Should something", async() => {
    // test removing this line in docker
    browser.ignoreSynchronization = true;

    browser.get(`http://${serverHost}:3001`)

    const title = await browser.getTitle()
    title.should.be.equal("Noticias")

    const cantidadOriginal = await element.all(by.css("postlist post")).count()

    await browser.takeScreenshot()

    element(by.css("newpost input[name=title]")).sendKeys("Noticia extra extra!")
    element(by.css("newpost textarea[name=content]")).sendKeys("Este es el cuerpo de la noticia")
    await element(by.css("newpost button")).click()

    const cantidad = await element.all(by.css("postlist post")).count()
    cantidad.should.be.equal(cantidadOriginal + 1)
  });

})
