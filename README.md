#  Store Manager API 👨‍💻

## Descrição

Este repositório apresenta a implementação da Store Manager API, uma aplicação desenvolvida seguindo a arquitetura MSC (model-service-controller) para gerenciamento de vendas no formato dropshipping. Todos os requisitos obrigatórios foram atendidos, proporcionando funcionalidades como listar, cadastrar, atualizar e deletar produtos e vendas.

### Requisitos Obrigatórios

1. **Listagem de Produtos:**
   - Endpoints `/products` e `/products/:id` implementados.
   - Listagem ordenada por id.

2. **Testes Unitários:**
   - Cobertura de 5% de linhas atingida.
   - Pelo menos 2 funções escritas em cada camada da aplicação.
   - Mock do banco de dados nos testes da camada model.

3. **Cadastro de Produtos:**
   - Endpoint `/products` para cadastrar produtos.
   - Formato da requisição: `{ "name": "ProdutoX" }`.

4. **Validações de Produtos:**
   - Endpoint `/products` acessível.
   - Validação do formato da requisição sem acessar o banco de dados.

5. **Testes Unitários (Parte 2):**
   - Cobertura de 10% de linhas atingida.
   - Pelo menos 3 funções escritas em cada camada da aplicação.

6. **Cadastro de Vendas:**
   - Endpoint `/sales` para cadastrar vendas.
   - Requisição contendo lista de produtos e quantidades.

7. **Testes Unitários (Parte 3):**
   - Cobertura de 15% de linhas atingida.
   - Pelo menos 4 funções escritas em cada camada da aplicação.

8. **Listagem de Vendas:**
   - Endpoints `/sales` e `/sales/:id` implementados.
   - Ordenação por saleId e productId.

9. **Testes Unitários (Parte 4):**
   - Cobertura de 20% de linhas atingida.
   - Pelo menos 6 funções escritas em cada camada da aplicação.

10. **Atualização de Produto:**
    - Endpoint `/products/:id` para atualizar um produto.
    - Validação do corpo da requisição.

11. **Testes Unitários (Parte 5):**
    - Cobertura de 25% de linhas atingida.
    - Pelo menos 7 funções escritas em cada camada da aplicação.

12. **Deleção de Produto:**
    - Endpoint `/products/:id` para deletar um produto.

### Habilidades Técnicas

- **Linguagens Utilizadas:** JavaScript, Node.js
- **Banco de Dados:** MySQL
- **Testes:** Mocha, Chai
