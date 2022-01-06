# comprose

> Compose written language in its ordinary form

## Installation

```sh
pnpm install comprose
```

## Usage

```ts
import { Comprose } from 'comprose';

const comprose = new Comprose({
  dataset: 'faker',
  locale: 'en',
});

comprose.personName();
// John Smith
```

### Credits

Data from faker.js

#### License

MIT
