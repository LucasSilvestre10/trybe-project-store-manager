
const sinonChai = require("sinon-chai");
const chai = require("chai");
const sinon = require("sinon");
const productsModel = require('../../../src/models/productsModel');
const dataMock = require("../../../__tests__/_dataMock");
const connection = require('../../../src/db/connection')

chai.use(sinonChai);

const { expect } = chai;

describe('testes para productsModel', async function () {


  afterEach(function () {
    sinon.restore();
  });

  describe('testes para getAllProductsModel', async function () {
    it('testa se traz todos os produtos corretamente', async function () {
      //arrange
      const responseMock = dataMock.allProductsResponse;
      sinon.stub(connection, "execute").resolves([responseMock]);

      //act
      const result = await productsModel.getAllProductsModel()

      //assert

      expect(result).to.deep.equal(responseMock);
    })    
  })  
  describe('testes para getProductIdModel', async function () {
    it('testa se traz o produto corretamente', async function () {
      //arrange
      const responseMock = dataMock.rightProductBody;
      const request = 1
      sinon.stub(connection, "execute").resolves([[responseMock]]);

      //act
      const result = await productsModel.getProductIdModel(request)

      //assert

      expect(result).to.deep.equal(responseMock);
    })
  })
  describe('testes para postProductsModel', async function () {
    it('testa se cadastra produtos corretamente', async function () {
      //arrange
      const request = dataMock.rightProductBody.name;
      const responseMock = dataMock.productCreateResponse;
      sinon.stub(connection, "execute").resolves([[responseMock]]);

      //act
      const result = await productsModel.postProductsModel(request)

      //assert

      expect(result).to.deep.equal(responseMock);
    })
  })
  describe('testes para putProductsModel', async function () {
    it('testa se atualiza produtos corretamente', async function () {
      //arrange
      const requestId = 4
      const requestBody = dataMock.productCreateResponse.name;
      const responseMock = dataMock.productCreateResponse;
      sinon.stub(connection, "execute").resolves([[responseMock]]);

      //act
      const result = await productsModel.putProductsModel(requestId, requestBody)

      //assert

      expect(result).to.deep.equal(responseMock);
    })
    it('testa se retorna erro em caso de produto não encontrado', async function () {
      //arrange
      const requestId = 99
      const requestBody = dataMock.productCreateResponse.name;
      const responseMock = { affectedRows: 0 };
      sinon.stub(connection, "execute").resolves([responseMock]);

      //act
      const result = await productsModel.putProductsModel(requestId, requestBody)

      //assert

      expect(result).to.deep.equal("PRODUCT_NOT_FOUND");
    })
  })
  describe('testes para deleteProductsModel', async function () {
    it('testa se deleta produtos corretamente', async function () {
      //arrange
      const requestId = 4
      const responseMock = { message: 'PRODUCT_DELETED' };
      sinon.stub(connection, "execute").resolves([[responseMock]]);

      //act
      const result = await productsModel.deleteProductsModel(requestId)

      //assert

      expect(result).to.deep.equal(responseMock);
    })
    it('testa se retorna erro em caso de produto não encontrado', async function () {
      //arrange
      const requestId = 99

      const responseMock = { affectedRows: 0 };
      sinon.stub(connection, "execute").resolves([responseMock]);

      //act
      const result = await productsModel.deleteProductsModel(requestId)

      //assert

      expect(result).to.deep.equal("PRODUCT_NOT_FOUND");
    })
  })
  describe('testes para getByNameProductsModel', async function () {
    it('testa se traz todos os produtos corretamente', async function () {
      //arrange
      const responseMock = dataMock.allProductsResponse;
      sinon.stub(connection, "execute").resolves([responseMock]);

      //act
      const result = await productsModel.getByNameProductsModel()

      //assert

      expect(result).to.deep.equal(responseMock);
    }) 
  })
})