- [x] Criando o projeto React
- [X] ESLint, Prettier & EditorConfig
- [x] Roteamento no React
- [x] Styled Components
- [x] Estilos Globais
- [x] Estilizando Main
- [x] Adicionando repositórios
- [x] Listando repositórios
- [x] Utilizando LocalStorage
- [x] Navegação de rotas
- [x] Carregando dados da API
- [x] Definindo PropTypes
- [x] Exibindo repositõrios
- [x] Exibindo issues

------

:white_check_mark: check-list

Ver videos | Codar | Documentar| Revisar
-----------|-------|-----------|---------
:heavy_check_mark:|:heavy_check_mark:|:clock10:|:clock10:

------
# Conteudo presente nessa aplicação (Table of Contents)

Background
Install
Usage
Generator
Badge
Example Readmes
Related Efforts
Maintainers
Contributing
License

## __Eslint, Prettier e EditorConfig__

---
__EditorConfig__
- Generate EditorConfig, após instalar plugin do _VScode_
- Add `end_of_line = lf` final das linhas no padrão _Unix_

---
__Prettier e Eslint__
- Dependências de desenvolvimento:
  - __Eslint__: `yarn add eslint -D`
  - `yarn eslint --init`

  - __Prettier__: `yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D`

No arquivo `.eslintrc.js` fazer as seguintes modificações:
  - Add no extends: `'prettier','prettier/react'`
  - Add um _parser_ antes do _paserOptions_: `parser: 'babel-eslint'`
  - Add nos plugins: `prettier`
  - Sobrescrever algumar regras padrões no _rules_:
    ```js
      'prettier/prettier': 'error',
      'react/jsx-filename-extension':[
        'warn', {
          extensions:['.jsx', '.js']
        }
      ],
      'import/prefer-default-export': 'off'
    ```
Criar um arquivo `.prettierrc`:
  ```js
    {
    "singleQuote": true,
    "trailingComma": "es5"
    }
  ```

## Navegação

Já tá bom de configuração bora pro projeto
__Navegação em React__:
- Dependências:

  `yarn add react-router-dom`

- Criar um arquivo na raiz para referenciar as rotas `routes.js`
- Criar as páginas que estarão disponíveis para serem acessadas **_pages_/Main e _pages_/Repository**


## Componentes estilizados

__Styled Components__
- Dependências:

  `yarn add styled-components`

Biblioteca para fazer a estilização dos componentes, usando a sintaxe de _css_, mas num arquivo `.js`.
Importante ter a extensão do styled-components instalada no _vscode_ para ele entender a sintaxe de _css_ escrita dentro do arquivo `.js`

- Propriedade x:

   (Codigo javascript dentro da string css, para captar as propriedades que podem ser passam pelos componentes estilizados, a partir daí mostrar uma ou outra estilização dependendo da valor da propriedade). Ex: `color: ${props => (props.error ? 'red' : '#7159c1')};`

- Propriedade y (Estilos globais)
  - Criar uma pasta com os estilos globais __styles/global.js__
  - Definir dentro desse arquivo quais estilizações vai querer aplicar para todas as páginas
  - No arquivo App.js (*O pai de todos*) importar esse estilo global que foi definido e colocar no return para que todas as rotas tenha acesso.
    - Code:
    ```js
      function App() {
        return (
          <>
            <GlobalStyles />
            <Routes />;
          </>
        );
      }
    ```

## Construindo nossa primeira página
- Dependências
  `yarn add react-icons`
- Criar compontes na pagina Main
- Estilizar nos estilos dessa página

- Configurando uma api para acessar os serviços de api externas
  - `yarn add axios`

- Salvar os dados localmente usando __LocalStorage__.

  - Para que os dados não se percam toda vez que a pagina for atualizada, vamos fazer um cache para guardar as informações localmente no navegador.


    ```js
      // Carregar dados (Tem coisas no localStorge? então carrega aí)
      componentDidMount(){
        const repositories = localStorage.getItem('repositories')

        if (repositories){
          this.state({repositories: JSON.parse(repositories)})
        }
      }
      // Salvar dados localStorage (Tem dados novos? salva aí.)
      componentDidUpdate(_, prevState){
        const {repositories} = this.state;

        if (prevState.repositories !== repositories) {
          localStorage.setItem('repositories', JSON.stringify(repositories))
        }
      }
    ```
### Linkagem de paginas (Naveação por rotas)

Essa navegação poderia ser feita atravez de links do próprio HTML, porém dessa forma teriamos o recarregamento das paginas, o que não queremos que aconteça, então vamos fazer para essa caso usando o _Link_ da bilioteca para navegação entre rotas que já está instalada `react-router-dom`.

- ```js
    <Link to={`/repository/${repositorie.name}`}> Detalhes </Link>
  ```
  - Exemplo de rota para qual o link acima pode se direcionado:
  *`http://localhost:3000/repository/`_facebook/react_*

O código acima tem só um probleminha, pois como estamos passando o nome do repositório como um parâmetro de rotas, quando isso for pra a url vamos ver o nome do repositório separado por `/`, oque não é ideail, pois as barras representam um pasta ou endereço diferente e nesse caso a `/` é apenas um caracter especial dentro do nome do repsositório, então para isso precisamos fazer um __encoding__.

- Para que essa barra `/` seja contado apenas como um caracter especial fazemos o seguinte:
  - Usar uma função intrinsica do javacript para fazer esse enconde
  ```js
    <Link to={`/repository/${encodeURIComponent(repositorie.name)}`}> Detalhes </Link>
  ```
  - Agora, nesse caso, teremos a seguinte url de resposta:
  *`http://localhost:3000/repository/`facebook%2Freact*

- Agora, só pra finalizar, temos que falar para a rota lá onde a rota é criada, que essa rota recebe um parametro.
  ```js
    <Route path="/repository/:repository" component={Repository} />
  ```

- Obs: se que quiser usar as informações desse conteúdo do parâmetro que foi realizado o encode é preciso fazer um decode e isso é super simples, o javascript tambem tem uma função para fazer esse __decoding__.

```js
  decodeURIComponent(match.params.repository)
```

---
Carregando dados da API
- Primeiramente, nos casos onde temos que fazer requisições a mais de uma rota seguidas, pensamos. Okay, eu faço esse chamada a API, pego o que preciso, faço outra chamada, pego o restante do que preciso e agora eu posso fazer tudo que eu quero com esses dados:
```js
    const response = await api.get(`/repos/${repoName}`)
    const issues = await api.get(`/repos/${repoName}/issues`)
```
Porém nessa abordagem há um pequeno probleminha, que é uma requisição ter que esperar a anterior terminar para ela começar, mas elas não são dependentes uma da outra, elas poderia facilmente serem iniciadas mesmo que a resposta de uma ainda não tennha sido retornada. O importante é que eu tenha os dados de ambas para a proxima etapa, independente de quem foi mais rapida pra responder ou qualquer outra coisa.

Para resolver isso, vamos fazer as duas requisições serem chamadas ao mesmo tempo, da seguinte forma:

  ```js
  const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

  ```
### Prop-Types
Validação de propriedades (props)
  - `yarn add prop-types`

__Separar componentes que serão utilizados em mais de uma pagina__

- Criar no src uma pasta _components_ e colocar dentro todos os componentes que serão reutilizados, sendo um componente estilizado ou não
- Importar esses componentes sempre que precisarem ser utlizados, como já estava sendo feito na importação dos estilos, mas agora vamos importar das pastas componentes, pois assim não precisamos ficar repetindo codigo nos componentes estilizados de cada página

### Listagem de Issues

------
- Issues:
  - Quando coloco repositorio errado botão fica cinza pra sempre
