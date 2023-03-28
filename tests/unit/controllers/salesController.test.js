const salesController = require("../../../src/controllers/salesController");
const salesService = require("../../../src/services/salesServices");

const sinonChai = require("sinon-chai");
const chai = require("chai");
const sinon = require("sinon");
const dataMock = require("../../../__tests__/_dataMock");

chai.use(sinonChai);

const { expect } = chai;

describe("testes para salesControllers", async function () {
  let response = {};

  beforeEach(function () {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("testes para postSales", async function () {
    it("testa se realiza a venda corretamente", async function () {
      //arrange
      const requestMock = dataMock.rightSaleBody;
      const responseMock = dataMock.saleCreateResponse;
      const request = {
        body: {
          requestMock,
        },
      };

      sinon.stub(salesService, "postSalesService").resolves(responseMock);

      //act
      await salesController.postSales(request, response);

      //asserts
      expect(response.status).to.have.been.calledWith(201);
      expect(response.json).to.have.been.calledWith(responseMock);
    });
    it("testa retorno de erro caso algum protudo não for encontrado", async function () {
      //arrange
      const requestMock = dataMock.rightSaleBody;
      const responseMock = { message: "Product not found" };
      const request = {
        body: {
          requestMock,
        },
      };

      sinon
        .stub(salesService, "postSalesService")
        .resolves("PRODUCT_NOT_FOUND");

      //act
      await salesController.postSales(request, response);

      //asserts
      expect(response.status).to.have.been.calledWith(404);
      expect(response.json).to.have.been.calledWith(responseMock);
    });
    it("testa retorno de erro caso não houver um id de produto", async function () {
      //arrange
      const requestMock = dataMock.nonexistentProductIdBody;
      const responseMock = { message: '"productId" is required' };
      const request = {
        body: {
          requestMock,
        },
      };

      sinon
        .stub(salesService, "postSalesService")
        .resolves("PRODUCTID_IS_REQUIRED");

      //act
      await salesController.postSales(request, response);

      //asserts
      expect(response.status).to.have.been.calledWith(400);
      expect(response.json).to.have.been.calledWith(responseMock);
    });
    it("testa retorno de erro caso não houver uma quantidade de venda de produto", async function () {
      //arrange
      const requestMock = dataMock.wrongSaleNotQuantityBody;
      const responseMock = { message: '"quantity" is required' };
      const request = {
        body: {
          requestMock,
        },
      };

      sinon
        .stub(salesService, "postSalesService")
        .resolves("QUANTITY_IS_REQUIRED");

      //act
      await salesController.postSales(request, response);

      //asserts
      expect(response.status).to.have.been.calledWith(400);
      expect(response.json).to.have.been.calledWith(responseMock);
    });
    it("testa retorno de erro caso quantidade de venda de produto for 0 ou negativa", async function () {
      //arrange
      const requestMock = dataMock.wrongZeroNegativeBody;
      const responseMock = {
        message: '"quantity" must be greater than or equal to 1',
      };
      const request = {
        body: {
          requestMock,
        },
      };

      sinon.stub(salesService, "postSalesService").resolves("QUANTITY_INVALID");

      //act
      await salesController.postSales(request, response);

      //asserts
      expect(response.status).to.have.been.calledWith(422);
      expect(response.json).to.have.been.calledWith(responseMock);
    });
  });

  describe("testes para getSaleId", async function () {
    it("testa se a um retorno valido", async function () {
      //arrange
      const requestMock = { params: { id: "1" } };
      const responseMock = [
        {
          date: "2023-03-27T23:53:37.000Z",
          productId: 1,
          quantity: 5,
        },
        {
          date: "2023-03-27T23:53:37.000Z",
          productId: 2,
          quantity: 10,
        },
      ];
      const request = {
        body: {
          requestMock,
        },
      };

      sinon.stub(salesService, "getSaleidService").resolves(responseMock);

      //act
      await salesController.getSaleId(request, response);

      //asserts
      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith(responseMock);
    });
    it("testa retorno de erro casoa venda não for encontrada", async function () {
      //arrange
      const requestMock = { params: { id: "99" } };
      const responseMock = { message: "Sale not found" };
      const request = {
        body: {
          requestMock,
        },
      };

      sinon
        .stub(salesService, "getSaleidService")
        .resolves("SALE_NOT_FOUND");

      //act
      await salesController.getSaleId(request, response);

      //asserts
      expect(response.status).to.have.been.calledWith(404);
      expect(response.json).to.have.been.calledWith(responseMock);
    });
  });
  
  describe("testes para getAllSales", async function () {
    it('testa se um retorno valido', async function () {
      
        //arrange
        
        const responseMock = [
          {
            saleId: 1,
            date: "2023-03-27T23:53:37.000Z",
            productId: 1,
            quantity: 5,
          },
          {
            saleId: 1,
            date: "2023-03-27T23:53:37.000Z",
            productId: 2,
            quantity: 10,
          },
          {
            saleId: 2,
            date: "2023-03-27T23:53:37.000Z",
            productId: 3,
            quantity: 15,
          },
          {
            saleId: 3,
            date: "2023-03-27T23:53:40.000Z",
            productId: 1,
            quantity: 1,
          },
          {
            saleId: 3,
            date: "2023-03-27T23:53:40.000Z",
            productId: 2,
            quantity: 5,
          },
          {
            saleId: 4,
            date: "2023-03-28T00:19:18.000Z",
            productId: 1,
            quantity: 1,
          },
          {
            saleId: 4,
            date: "2023-03-28T00:19:18.000Z",
            productId: 2,
            quantity: 5,
          },
        ];
        
        sinon.stub(salesService, "getAllSalesService").resolves(responseMock);

        //act
        await salesController.getAllSales(null, response);

        //asserts
        expect(response.status).to.have.been.calledWith(200);
        expect(response.json).to.have.been.calledWith(responseMock);
    
    })
  })

  describe('testes para deleteSaleId', async function () {
    it("testa se a venda é deletada corretamente", async function () {
      //arrange
      const requestMock = { params: {id: "1"} };      
      const request = {
        body: {
          requestMock,
        },
      };

      sinon.stub(salesService, "deleteSaleIdService").resolves(undefined);

      //act
      await salesController.deleteSaleId(request, response);

      //asserts
      expect(response.status).to.have.been.calledWith(204);
      
    });
    it("testa se retorno de erro em caso de venda nao encontrada", async function () {
      //arrange
      const requestMock = { params: {id: "1"} };      
      const responseMock = {
        "message": "Sale not found"
      };
      const request = {
        body: {
          requestMock,
        },
      };

      sinon.stub(salesService, "deleteSaleIdService").resolves("SALE_NOT_FOUND");

      //act
      await salesController.deleteSaleId(request, response);

      //asserts
      expect(response.status).to.have.been.calledWith(404);
      expect(response.json).to.have.been.calledWith(responseMock);
    });
  })
});
