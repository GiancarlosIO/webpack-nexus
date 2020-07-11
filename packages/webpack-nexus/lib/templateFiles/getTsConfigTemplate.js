function getTsConfigTemplate() {
  return `{
  "compilerOptions": {
    "moduleResolution": "node",
    "allowJs": true,
    "noEmit": true,
    "strict": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "strictNullChecks": true,
    "experimentalDecorators": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitAny": false,
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "jsx": "react",
    "baseUrl": "./",
    "paths": {
      "*": [
        "*"
      ]
    },
    "plugins": [
      {
        "name": "typescript-styled-plugin"
      }
    ]
  },
  "include": [
    "src/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
`;
}

module.exports = getTsConfigTemplate;
