const productsControler = require('../../../src/controllers/productsController')

const sinonChai = require("sinon-chai");
const chai = require("chai");
const sinon = require("sinon");
const productsService = require('../../../src/services/productsService');
const dataMock = require("../../../__tests__/_dataMock");

chai.use(sinonChai);

const { expect } = chai;

describe('testes para productsController', async function () { 
  let response = {}

  beforeEach(function () {

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    
  });

  afterEach(function () {
    sinon.restore();
  });


  describe('testando metodo post', async function () {
    it('cadastra produto corretamente', async function () {
      //arrange
      const requestMock = dataMock.rightProductBody;
      const responseMock = dataMock.productCreateResponse;      
      const request = {
        body: {
          requestMock,
        },
      };     
      
      sinon.stub(productsService, "postProductsService").resolves(responseMock);

      //act

      await productsControler.postProducts(request, response)
    

      //assert

      expect(response.status).to.have.been.calledWith(201);
      expect(response.json).to.have.been.calledWith(responseMock);
    })
  })
  describe('retorno metodo getAll', async function () { 
    it('retorna lista de produtos corretamente', async function () {
      //arrange
       
       const responseMock = dataMock.allProductsResponse;
       
      sinon.stub(productsService, 'getAllProductsService').resolves(responseMock)
      
      //act
      await productsControler.getAllProducts(null, response)
    

      //assert
      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith(responseMock);
     })
  })
   describe("retorno metodo getId", async function () {
     it("retorna produto corretamente", async function () {
       //arrange

       const responseMock = {
         id: 1,
         name: "Martelo de Thor",
       };
       const request = { params: { id: "1" } };

       sinon
         .stub(productsService, "getProductIdService")
         .resolves(responseMock);

       //act
       await productsControler.getProductId(request, response);
    

       //assert
       expect(response.status).to.have.been.calledWith(200);
       expect(response.json).to.have.been.calledWith(responseMock);
       });    
     
     it("retorno de produto não encontrado", async function () {
       //arrange

       const responseMock = {
         message: "Product not found",
       };
       const request = { params: { id: "1" } };

       sinon
         .stub(productsService, "getProductIdService")
         .resolves(undefined);

       //act
       await productsControler.getProductId(request, response);
      

       //assert
       expect(response.status).to.have.been.calledWith(404);
       expect(response.json).to.have.been.calledWith(responseMock);
     });
     
   });
  describe("retorno metodo putProducts", async function () {
    it("retorna produto editado corretamente", async function () {
      //arrange

      const responseMock = dataMock.productUpdateBody;
      const request = { params: { id: "1" } };

      sinon
        .stub(productsService, "putProductsService")
        .resolves(responseMock);

      //act
      await productsControler.putProducts(request, response);

      //assert
      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith(responseMock);
    });
    it("retorno de produto não encontrado", async function () {
      //arrange

      const responseMock = {
        message: "Product not found",
      };
      const request = { params: { id: "9" } };

      sinon
        .stub(productsService, "putProductsService")
        .resolves('PRODUCT_NOT_FOUND');

      //act
      await productsControler.putProducts(request, response);

      //assert
      expect(response.status).to.have.been.calledWith(404);
      expect(response.json).to.have.been.calledWith(responseMock);
    });
  });

  describe("retorno metodo deleteProduts", async function () {
    it("retorna produto é deletado corretamente", async function () {
      //arrange

      const request = { params: { id: "1" } };

      sinon.stub(productsService, "deleteProductsService").resolves();

      //act
      await productsControler.deleteProducts(request, response);

      //assert
      expect(response.status).to.have.been.calledWith(204);
      expect(response.json).to.have.been.calledWith();
    });
    it("retorno de produto não encontrado", async function () {
      //arrange

      const responseMock = {
        message: "Product not found",
      };
      const request = { params: { id: "9" } };

      sinon
        .stub(productsService, "deleteProductsService")
        .resolves("PRODUCT_NOT_FOUND");

      //act
      await productsControler.deleteProducts(request, response);

      //assert
      expect(response.status).to.have.been.calledWith(404);
      expect(response.json).to.have.been.calledWith(responseMock);
    });
  });

  describe('retorno do metodo getByNameProducts', async function () {
    it('se retorna a busca corretamente', async function () {
     
        //arrange

        const responseMock = dataMock.allProductsResponse;
        

        sinon.stub(productsService, 'getByNameProductsService').resolves(responseMock)

        //act
        await productsControler.getByNameProducts(null, response)


        //assert
        expect(response.status).to.have.been.calledWith(200);
        expect(response.json).to.have.been.calledWith(responseMock);
      
    })
  })

  
})