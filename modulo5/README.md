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

---

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

