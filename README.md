# FederationDemo

Demonstrates webpack 5 Module Federation with Angular and the Angular Router.

## Start

- Install dependencies with yarn (!)
  - You need to use yarn until Angular 12 (May 2021) to use the experimental opt-in for webpack 5
  - Beginning with Angular 12, webpack 5 will be active by default
- Run Micro Frontend 1
  - ng serve mfe1 -o
- Run Micro Frontend 2
  - ng serve mfe2 -o
- Run the shell
  - ng serve shell -o

## New micro project

- Run at the root ng g application user-core --skip-install=true
- Add aot:true in the object of the project in angular.json, user-core->architect->build->options (add it here)
- Then run ng add @angular-architects/module-federation --project user-core --port 3000(new port)
- Add entry point in shell

## New Library project

- Run at the root ng new lib-demo --prefix ld

## Documentation

- To generate the documentation of an existing project, launch the compodoc command of the project from the package.json of the root

- To add the documentation of a new project, add the compodoc of the project in the root package.json of the root as follows: npx compodoc -p ./projects/project_name/tsconfig.doc.json -d ./documentation/project_name
