const salesService = require('../../../src/services/salesServices');
const validateDataSales = require('../../../src/services/validations/validateDataSales')
const schema = require('../../../src/services/validations/schema')
const salesModel = require('../../../src/models/salesModel');
const dataMock = require("../../../__tests__/_dataMock");
const productsModel = require('../../../src/models/productsModel');

const sinonChai = require("sinon-chai");
const chai = require("chai");
const sinon = require("sinon");

chai.use(sinonChai);

const { expect } = chai;

describe('testes para salesService', async function () {


  afterEach(function () {
    sinon.restore();
  });

  describe('testando  getAllProductsService', async function () {
    it('se traz todas as vendas', async function () {
      //arrange

      const responseMock = [
        {
          "saleId": 2,
          "date": "2023-03-27T23:53:37.000Z",
          "productId": 3,
          "quantity": 15
        },
        {
          "saleId": 3,
          "date": "2023-03-27T23:53:40.000Z",
          "productId": 1,
          "quantity": 1
        },
        {
          "saleId": 3,
          "date": "2023-03-27T23:53:40.000Z",
          "productId": 2,
          "quantity": 5
        },
        {
          "saleId": 4,
          "date": "2023-03-28T00:19:18.000Z",
          "productId": 1,
          "quantity": 1
        },
        {
          "saleId": 4,
          "date": "2023-03-28T00:19:18.000Z",
          "productId": 2,
          "quantity": 5
        }
      ];


      sinon.stub(salesModel, "getAllSalesmodel").resolves(responseMock);

      //act
      const result = await salesService.getAllSalesService(null)

      //assert      
      expect(result).to.deep.equal(responseMock);
    })
  })

  describe('testando  postSalesService', async function () {
    it('se realiza vendas com sucesso', async function () {
      //arrange

      const requestMock = dataMock.rightSaleBody
      const request = {
        body:
          requestMock,

      };

      const responseMock = dataMock.saleCreateResponse
      sinon.stub(salesModel, "postSalesModel").resolves(responseMock);
      

      //act
      const result = await salesService.postSalesService(request)

      //assert      
      expect(result).to.deep.equal(responseMock);
    })
    it('se retorna erro em caso de produto não informado', async function () {
      //arrange
      const request = {
        body:
          [
            { quantity: 1 },
            { productId: 2, quantity: 3 },
          ],

      };
      
     

      //act
      const result = await salesService.postSalesService(request)

      //assert      
      expect(result).to.deep.equal({ error: 'PRODUCTID_IS_REQUIRED' });
    })
    it('se retorna erro em caso de produto não encontrado', async function () {
      //arrange
      const request = {
        body:
          [
            { productId: 1, quantity: 1 },
            { productId: 99, quantity: 5 },
          ],

      };      
      sinon.stub(salesModel, "postSalesModel").resolves('PRODUCT_NOT_FOUND');
      sinon.stub(validateDataSales, 'dataSalesValidation').returns(undefined)
      sinon.stub(schema, 'dataSalesSchema').returns(undefined)

      //act
      const result = await salesService.postSalesService(request)

      //assert      
      expect(result).to.deep.equal({ error: 'PRODUCT_NOT_FOUND' });
    })
    it('se retorna erro em caso de quantidade não informada', async function () {
      //arrange
      const request = {
        body:
          [
            { productId: 1, quantity: 1 },
            { productId: 2 },
          ],

      };
      sinon.stub(salesModel, "postSalesModel").resolves('QUANTITY_IS_REQUIRED');
      sinon.stub(schema, 'dataSalesSchema').returns('"quantity"')
      

      //act
      const result = await salesService.postSalesService(request)

      //assert      
      expect(result).to.deep.equal({ error: 'QUANTITY_IS_REQUIRED' });
    })
    it('se retorna erro em caso de quantidade invalida', async function () {
      //arrange
      const request = {
        body:
          [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 0},
          ],

      };
      
      //act
      const result = await salesService.postSalesService(request)

      //assert      
      expect(result).to.deep.equal({ error: 'QUANTITY_INVALID' });
    })
    
  })
  


  describe('testando getSaleidService', async function () {
    it('se retorna a venda de forma correta', async function () {
              //arrange
        const responseMock = [
          {
            "date": "2023-03-28T04:27:39.000Z",
            "productId": 1,
            "quantity": 5
          },
          {
            "date": "2023-03-28T04:27:39.000Z",
            "productId": 2,
            "quantity": 10
          }
        ];
        const request = {
          params: {id: 1}
        };

        sinon.stub(salesModel, "getSaleIdModel").resolves(responseMock);

        //act
        const result = await salesService.getSaleidService(request)

        //assert      
        expect(result).to.deep.equal(responseMock);
     
    })
  })

  describe('testando getSaleidService', async function () {
    it('se retorna a venda de forma correta', async function () {
      //arrange
      
      const request = {
        params: { id: 1 }
      };

      sinon.stub(salesModel, "deleteSaleIdModel").resolves('SALE_DELETED');

      //act
      const result = await salesService.deleteSaleIdService(request)

      //assert      
      expect(result).to.deep.equal('SALE_DELETED');

    })
  })

  describe('testando putSalesIdService', async function () {
    it('se realiza vendas com sucesso', async function () {
      //arrange

      const requestMock = dataMock.rightSaleBody
      const request = {
        params: {id: 1},
        body:
          requestMock,
      };

      const responseMock = {
        "saleId": 1,
        "itemsUpdated": [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      }
      sinon.stub(salesModel, "postSalesModel").resolves(responseMock);


      //act
      const result = await salesService.putSaleIdService(request)

      //assert      
      expect(result).to.deep.equal(responseMock);
    })
    it('se erro em caso de produto não encontrado', async function () {
      //arrange

      const requestMock = [
        { productId: 99, quantity: 1 },
        { productId: 2, quantity: 5 },
      ]
      const request = {
        params: { id: 1 },
        body:
          requestMock,
      };

      const responseMock = {
        error: 'PRODUCT_NOT_FOUND'
      }
      sinon.stub(salesModel, "postSalesModel").resolves(responseMock);
       //act
      const result = await salesService.putSaleIdService(request)

      //assert      
      expect(result).to.deep.equal(responseMock);
    })
    it('se erro em caso de id de produto não informado', async function () {
      //arrange

      const requestMock = [
        { quantity: 1 },
        { productId: 2, quantity: 5 },
      ]
      const request = {
        params: { id: 1 },
        body:
          requestMock,
      };

      const responseMock = { error: 'PRODUCTID_IS_REQUIRED' }
      sinon.stub(salesModel, "postSalesModel").resolves(responseMock);
      //act
      const result = await salesService.putSaleIdService(request)

      //assert      
      expect(result).to.deep.equal(responseMock);
    })
  })

})