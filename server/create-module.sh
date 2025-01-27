#!/bin/bash

create_file() {
    local filepath=$1
    local content=$2
    echo "$content" > "$filepath"
    echo "Created $filepath"
}

if [ -z "$1" ]; then
    echo "Please provide a module name"
    echo "Usage: ./create-module.sh <module-name>"
    exit 1
fi

MODULE_NAME=$(echo "$1" | tr '[:upper:]' '[:lower:]')
MODULE_NAME_CAPITAL="$(tr '[:lower:]' '[:upper:]' <<< ${MODULE_NAME:0:1})${MODULE_NAME:1}"

mkdir -p "src/modules/$MODULE_NAME"

CONTROLLER_CONTENT="
import Controller from '../../utils/controller';

import ${MODULE_NAME_CAPITAL}Service from './${MODULE_NAME}.service';

class ${MODULE_NAME_CAPITAL}Controller extends Controller {
    private ${MODULE_NAME}Service: ${MODULE_NAME_CAPITAL}Service;

    constructor() {
      super();
      this.${MODULE_NAME}Service = ${MODULE_NAME_CAPITAL}Service.getInstance();
    }
}

export default new ${MODULE_NAME_CAPITAL}Controller;
"

SERVICE_CONTENT="import Service from '../../utils/service';

class ${MODULE_NAME_CAPITAL}Service extends Service {
    private static instance: ${MODULE_NAME_CAPITAL}Service;
    
    private constructor() {
      super();
    }

    static getInstance() {
      if (!this.instance) {
        this.instance = new ${MODULE_NAME_CAPITAL}Service();
      }

      return this.instance;
    }
}

export default ${MODULE_NAME_CAPITAL}Service;
"

ROUTES_CONTENT="import { Router } from 'express';
import controller from './${MODULE_NAME}.controller';

const router = Router();

export default router;"

INDEX_CONTENT="
import ${MODULE_NAME}Routes from './${MODULE_NAME}.routes';

export { ${MODULE_NAME}Routes };
"

create_file "src/modules/$MODULE_NAME/${MODULE_NAME}.controller.ts" "$CONTROLLER_CONTENT"
create_file "src/modules/$MODULE_NAME/${MODULE_NAME}.service.ts" "$SERVICE_CONTENT"
create_file "src/modules/$MODULE_NAME/${MODULE_NAME}.routes.ts" "$ROUTES_CONTENT"
create_file "src/modules/$MODULE_NAME/index.ts" "$INDEX_CONTENT"

echo "Module '$MODULE_NAME' created successfully!"
