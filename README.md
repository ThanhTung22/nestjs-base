## Installation

```bash
yarn install
```

## Environment

```bash
Create new file ".env" based on ".env.example" 
and update variables or leave them to default

Create new file "docker-compose.yml" based on "docker-compose.example.yml"
and update variables or leave them to default
```

## Development

```bash
# prepare for dev
docker-compose up -d

# run the app
yarn start:dev
```

## Test

```bash
yarn test
```

## Generate new module

```bash
yarn generate
# 1. Input module name (kebab case), eg: user-setting
# 2. Select which files will be generated by arrow key and space (default: select all)
# 3. Enter to confirm and start generating
# 4. Import generated module to AppModule
```
