function getTsConfigTemplate() {
  return `{
  "compilerOptions": {
    "moduleResolution": "node",
    "module": "esnext",
    "allowJs": true,
    "noEmit": true,
    "strict": false,
    "isolatedModules": true,
    "esModuleInterop": true,
    "strictNullChecks": true,
    "experimentalDecorators": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitAny": false,
    "skipLibCheck": true,
    "target": "es5",
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "jsx": "react",
    "plugins": [
      {
        "name": "typescript-styled-plugin"
      }
    ]
  },
  "include": [
    "src"
  ]
}
`;
}

module.exports = getTsConfigTemplate;
