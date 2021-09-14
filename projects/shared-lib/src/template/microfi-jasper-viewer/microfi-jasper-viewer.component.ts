import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    visualize: any;
  }
}
@Component({
  selector: 'microfi-jasper-viewer',
  templateUrl: './microfi-jasper-viewer.component.html',
  styleUrls: ['./microfi-jasper-viewer.component.scss']
})
export class MicrofiJasperViewerComponent implements OnInit {
  scriptProps = {
    name: 'visualize',
    src: 'https://mobiledemo.jaspersoft.com/jasperserver-pro/client/visualize.js',
    loaded: false
  }
  constructor(private window: Window) { }

  ngOnInit(): void {
    this.loadScript('visualize').then((result: any) => {

      if (result.loaded) {
        let visualize = window.visualize;
        // console.log(visualize);
        // console.log(typeof (visualize))
        visualize({
          server: 'https://mobiledemo.jaspersoft.com/jasperserver-pro',
          auth: {
            name: "joeuser",
            password: "joeuser",
            organization: "organization_1"
          }
        }, (v) => {
          // console.log(v);
          var report = v.report({
            resource: "/public/Samples/Reports/States",
            container: '#container',
            error: handleError,
            events: {
              reportCompleted: (status) => {
                console.log(status);
                exportData()
              }
            }
          });
          function exportData() {
            report.export({
              outputFormat: 'pdf'
            }).done((link) => {
              console.log(link)
              this.window.open(link.href)
            }).fail((err) => {
              console.log(err.message);
            });
            console.log(report)
          }


          //show error
          function handleError(err) {
            alert(err.message);
          }
        }
        )
      }
    });
  }
  loadScript(name: string) {
    let that = this;
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      console.log(that.scriptProps);
      console.log(name);
      // console.log(that.scriptProps[name]);

      if (that.scriptProps.loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
      else {
        //load script
        let script = (document.createElement('script') as HTMLScriptElement);
        script.type = 'text/javascript';
        script.src = that.scriptProps.src;

        script.onload = () => {
          that.scriptProps.loaded = true;
          resolve({ script: name, loaded: true, status: 'Loaded' });
        };

        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }
}
