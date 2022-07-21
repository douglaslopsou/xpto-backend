
# XPTO API

A empresa XPTO precisava de uma aplicação capaz de gerenciar o processo de compra de produtos
 de seus clientes. 
O gerente de projetos conversou com as partes interessadas e levantou o seguintes requisitos:

- A aplicação listar, cadastra, atualiza e deleta um produto, cliente e compra.
- A aplicação filtrar as compras por cliente.
- A aplicação listar as compras de um cliente por periodo.
- A aplicação listar de forma ordenada os produtos mais vendidos por dia, mês e ano.
- A aplicação lista de forma ordenada os clientes que mais gastam por dia, mês e ano.
- A quantidade em estoque de um produto é subtraída na efetivação de uma compra.


### Executar a API
- yarn (baixar dependencias)
- Configurar banco de dados no arquivo ormconfig.json (esta configurado com os dados do ElephantSQL)
- yarn typeorm migration:run (rodar migrations, no cenario atual nao precisa rodar pois ja esta tudo atualizado no ElephantSQL)
- yarn typeorm migration:rever (reverter uma migration)
- yarn dev (executar projeto)

### O projeto foi documentado utilizando o Swagger

- Para acessar a documentacao basta acessar a url http://localhost:3333/api-docs.

#### Node JS, Typescript, Postgres, TypeORM, ElephantSQL




