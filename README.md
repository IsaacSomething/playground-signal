# AngularBase

Basic project used for quickly cloning to test things out

```
git clone https://github.com/IsaacSomething/angular-base.git
```

```
cd angular-base/ && npm install
```

Or join [codeflow](https://stackblitz.com/codeflow/beta) | [short overview](https://www.youtube.com/watch?v=b7C_NGgPPTc)

```
https://pr.new/github.com/IsaacSomething/angular-base
```

- "@angular/core": "^16.0.4"
- "@angular/material": "^16.0.3"

<br />
<hr />

### Branch "memory-api"

Start a simple in memory api with podcast dummy data, checkout to branch `memory-api`

```
git clone -b memory-api --single-branch https://github.com/IsaacSomething/angular-base.git .
```

<br />

![alt text](./src/assets/demo.png)

### @base tsconfig Path

Imports can be added with `@base` as set in the `tsconfig.json` path property

```
import { ToolbarModule } from '@base/components/toolbar

or

import * as toolbar from '@base/component/toolbar
```
