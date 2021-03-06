import { Injectable } from '@angular/core';
import { Microfrontend } from './microfrontend';

@Injectable({ providedIn: 'root' })
export class LookupService {
  lookup(): Promise<Microfrontend[]> {
    return Promise.resolve([
      {
        // For Loading
        remoteEntry: 'http://localhost:3000/remoteEntry.js',
        remoteName: 'userCore',
        exposedModule: './Component',

        // For Routing
        displayName: 'User core',
        routePath: 'user',
        ngModuleName: 'AppModule'
      },
      {
        // For Loading
        remoteEntry: 'http://localhost:3001/remoteEntry.js',
        remoteName: 'customerCore',
        exposedModule: './Component',

        // For Routing
        displayName: 'Customer core',
        routePath: 'customer',
        ngModuleName: 'AppModule'
      }
    ] as Microfrontend[]);
  }
}
