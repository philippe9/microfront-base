const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "myTestApp",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({

      // No remotes configured upfront anymore!
      // remotes: {
      //   'customerCore': "customerCore@http://localhost:3001/remoteEntry.js",
      //   'accountCore': "accountCore@http://localhost:3002/remoteEntry.js",
      //   'accountManagerCore': "accountManagerCore@http://localhost:3003/remoteEntry.js"
      // },
      remotes: {
        'customerCore': "customerCore@http://localhost/dist_prod/customer-core/remoteEntry.js",
        'accountCore': "accountCore@http://localhost/dist_prod/account-core/remoteEntry.js",
        'accountManagerCore': "accountManagerCore@http://localhost/dist_prod/account-manager-core/remoteEntry.js"
      },
      shared: share({
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/compiler": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/material": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/platform-browser-dynamic": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "primeng": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "primeicons": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        ...sharedMappings.getDescriptors()
      })

    }),
    sharedMappings.getPlugin()
  ],
};

