# Refund

Aplicação web para solicitação de reembolso de despesas. O usuário informa o nome, a categoria e o valor da despesa, e ela é adicionada a uma lista com o total atualizado automaticamente.

## Demonstração

Acesse o projeto online: [https://acgs1133-ai.github.io/refund-rocktseat-main/](https://acgs1133-ai.github.io/refund-rocktseat-main/)

## Funcionalidades

- Cadastro de despesas com nome, categoria e valor
- Máscara de moeda em Real (BRL) no campo de valor, formatada enquanto o usuário digita
- Ícone específico para cada categoria (Alimentação, Hospedagem, Serviços, Transporte e Outros)
- Lista de despesas renderizada dinamicamente no DOM
- Contador de despesas e valor total atualizados a cada alteração
- Remoção de despesas pelo ícone de lixeira (event delegation no `ul`)
- Tratamento de erros com `try/catch` e alertas ao usuário

## Tecnologias

- HTML5
- CSS3
- JavaScript (vanilla, sem frameworks)
- Fonte Open Sans (Google Fonts)

## Estrutura do projeto

```
refund-rocktseat-main/
├── img/              # Logo e ícones (categorias e remover)
├── index.html        # Estrutura da página
├── styles.css        # Estilos
├── scripts.js        # Lógica da aplicação
└── README.md
```

## Conceitos praticados

- Seleção e manipulação do DOM
- Eventos (`input`, `submit`, `click`)
- Expressões regulares para limpar e converter valores
- `toLocaleString` com `Intl` para formatação de moeda
- Criação de elementos com `createElement` e `append`
- Delegação de eventos

## Próximos passos

- Salvar as despesas no `localStorage`
- Limpar o formulário após adicionar
- Validar a categoria e o valor antes de adicionar

## Autor

Feito por Alexandre.
