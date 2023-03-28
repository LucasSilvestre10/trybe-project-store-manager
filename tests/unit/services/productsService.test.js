const productsService = require('../../../src/services/productsService')

const sinonChai = require("sinon-chai");
const chai = require("chai");
const sinon = require("sinon");
const productsModel = require('../../../src/models/productsModel');
const dataMock = require("../../../__tests__/_dataMock");

chai.use(sinonChai);

const { expect } = chai;

describe('testes para productsService', async function () { 
 

  afterEach(function () {
    sinon.restore();
  });


  describe('testando  postProductsService', async function () {
    it('cadastra produto corretamente', async function () {
      //arrange
      const requestMock = dataMock.rightProductBody;
      const responseMock = dataMock.productCreateResponse;     
     const request = {
        body: {
          requestMock,
        },
      };
      
      sinon.stub(productsModel, "postProductsModel").resolves(responseMock);     

      //act
     const result =  await productsService.postProductsService(request)   

      //assert      
      expect(result).to.deep.equal(responseMock);
    })
  })
  describe('retorno getAllProductsModel', async function () { 
    it('retorna lista de produtos corretamente', async function () {
      //arrange
       
       const responseMock = dataMock.allProductsResponse;
       
      sinon.stub(productsModel, 'getAllProductsModel').resolves(responseMock)
      
      //act
      const result = await productsService.getAllProductsService(null)
    

      //assert
      expect(result).to.deep.equal(responseMock);
     })
  })
   describe("retorno  getProductIdService", async function () {
     it("retorna produto corretamente", async function () {
       //arrange

       const responseMock = {
         id: 1,
         name: "Martelo de Thor",
       };
       const request = { params: { id: "1" } };

       sinon
         .stub(productsModel, "getProductIdModel")
         .resolves(responseMock);

       //act
       const result = await productsService.getProductIdService(request);
    

       //assert
       expect(result).to.deep.equal(responseMock);
       });    
              
   });
  describe("retorno metodo putProducts", async function () {
    it("retorna produto editado corretamente", async function () {
      //arrange

      const responseMock = dataMock.productUpdateBody;
      const requestMock = dataMock.productUpdateBody;
      const request = { params: { id: "1" }, body: {
          requestMock,
        }};

      sinon
        .stub(productsModel, "putProductsModel")
        .resolves(responseMock);

      //act
      const result = await productsService.putProductsService(request);

      //assert
     expect(result).to.deep.equal(responseMock);
    });  
  });

  describe("retorno metodo deleteProduts", async function () {
    it("retorna produto e´deletado corretamente", async function () {
      //arrange

      const request = { params: { id: "1" } };

      sinon.stub(productsModel, "deleteProductsModel").resolves();

      //act
      const result = await productsService.deleteProductsService(request);

      //assert
      expect(result).to.deep.equal(responseMock);
    });    
  });
})