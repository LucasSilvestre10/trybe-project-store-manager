
const sinonChai = require("sinon-chai");
const chai = require("chai");
const sinon = require("sinon");
const salesModel = require('../../../src/models/salesModel');
const dataMock = require("../../../__tests__/_dataMock");
const connection = require('../../../src/db/connection');
const { execute } = require("../../../src/db/connection");

chai.use(sinonChai);

const { expect } = chai;

describe('testes para salesModel', async function () {


  afterEach(function () {
    sinon.restore();
  });

  describe('testes para postSalesModel', async function () {
    it('se realiza um cadastro com sucesso', async function () {
      //arrange
      const responseMock = dataMock.saleCreateResponse;
      const request = dataMock.rightSaleBody
      sinon.stub(connection, "execute").resolves([{ insertId : 3}])
      
      //act
      const result = await salesModel.postSalesModel(request)

      //assert

      expect(result).to.deep.equal(responseMock);
    })   
  })
  describe('testes para getSaleIdModel', async function () {
    it('se retorna as vendas corretamente pelo id de venda', async function () {
      //arrange
      const responseMock = [
        {
          "date": "2023-03-28T20:02:27.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "date": "2023-03-28T20:02:27.000Z",
          "productId": 2,
          "quantity": 10
        }
      ];
      const request = 1
      sinon.stub(connection, "execute").resolves([responseMock])

      //act
      const result = await salesModel.getSaleIdModel(request)

      //assert

      expect(result).to.deep.equal(responseMock);
    });
    it('se retorna erro em caso de id não encontrado', async function () {
      //arrange
      
      const request = 99
      sinon.stub(connection, "execute").resolves([''])

      //act
      const result = await salesModel.getSaleIdModel(request)

      //assert

      expect(result).to.deep.equal("SALE_NOT_FOUND");
    });
  })
  describe('testes para getAllSalesmodel', async function () {
    it('se retorna todas as vendas corretamente', async function () { 
      
      const responseMock = [
        {
          "saleId": 1,
          "date": "2023-03-28T20:02:27.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "saleId": 1,
          "date": "2023-03-28T20:02:27.000Z",
          "productId": 2,
          "quantity": 10
        },
        {
          "saleId": 2,
          "date": "2023-03-28T20:02:27.000Z",
          "productId": 3,
          "quantity": 15
        },
        {
          "saleId": 3,
          "date": "2023-03-29T03:49:20.000Z",
          "productId": 1,
          "quantity": 1
        },
        {
          "saleId": 3,
          "date": "2023-03-29T03:49:20.000Z",
          "productId": 2,
          "quantity": 3
        }
      ]
      sinon.stub(connection, "execute").resolves([responseMock])

      //act
      const result = await salesModel.getAllSalesmodel()

      //assert

      expect(result).to.deep.equal(responseMock);
    })
  })
  describe('testes para deleteSaleIdModel', async function () {
    it('se deleta uma venda corretamente', async function () {

      const responseMock = { message: 'SALE_DELETED' }
      sinon.stub(connection, "execute").resolves([responseMock])

      //act
      const result = await salesModel.deleteSaleIdModel(1)

      //assert

      expect(result).to.deep.equal(responseMock);
    });
    it('se retorna um erro de venda não encontrada', async function () {

      const responseMock = { affectedRows: 0 }
      sinon.stub(connection, "execute").resolves([responseMock])

      //act
      const result = await salesModel.deleteSaleIdModel(99)

      //assert

      expect(result).to.deep.equal('SALE_NOT_FOUND');
    })
  })

  

  
})