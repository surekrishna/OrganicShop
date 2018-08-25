# OrganicShop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Installation 
npm install --save @ng-bootstrap/ng-bootstrap

npm install ng2-validation --save

1. Install node.js latest version (Current Version : 8.11.3 LTS)
2. Install VisualStudio Code (Current Version : 1.24.1)
3. Install Angular CLI using cmd: npm install -g @angular/cli
4. Create new Angular Project cmd: ng new OrganicShop
5. Create new Firebase Project https://console.firebase.google.com
6. Copy config properties to environments from Add Firebase to your Web app
7. Install couple of node package wrt to firebase 
	cmd:npm i --save firebase@4.2.0
	cmd:npm i --save angularfire2@4.0.0-rc.1
Error: if you see can't fine rxjs blah blah install this(add respective version) 
cmd: npm install rxjs@6 rxjs-compact@6 --save
[cmd: npm install rxjs@6 --save,cms: npm install rxjs-compat@6 --save]
Error: Uncaught ReferenceError: global is not defined 
add code: (window as any).global = window; in polyfillis.ts
8. Install bootstrap cmd: npm i --save bootstrap
9. Install ngbootstrap cmd: npm install --save @ng-bootstrap/ng-bootstrap 
this ngbootstrap is required for dropdown and others
10. Deploy application in Firebase follow the steps
	install firebase cmd: npm install -g firebase-tools
	firebase --version(Check if able to see version of firebase installed properly)
	firebase login(System default browser opens to login)
	firebase init
	Select the project to deploy and click space bar finally enter
	public: dist (this is name of the folder that includes compiled application 
	when we compiled the result stored in this location)
	ng build --prod
	firebase deploy
	Hosting URL: https://organicshop10.firebaseapp.com

