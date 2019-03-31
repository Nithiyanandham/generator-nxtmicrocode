'use strict';

const RequestServiceDiscovery = require('request-service-discovery');

const config = require('konfig')({path: 'config'});

const ResourceNotFoundError = require('../errors/resource-not-found');

class ExampleService{

  constructor(){

    /*
     * Remove comment below to enable a zookeeper connected client.
     */

    // this.client = new RequestServiceDiscovery({
    //   connectionString: config.app.zookeeper.connectionString,
    //   basePath: 'services',
    //   serviceName: 'my/other/service/v1'
    // });
  }

  getExamples(){
   return new Promise( (resolve, reject) =>{

     let items = [{
       id: 1,
       name: 'movies'
     }, {
       id: 2,
       name: 'shows'
     }];

     resolve(items);

     /*
      * Remove comment below to use zookeeper connected client.
      */

      // this.client.get('example', null, (err, item) => {
      //   if(err) reject(err);
      //
      //   resolve(item);
      // });
    });
  }

  throwError(){
    return new Promise((resolve, reject) => {
      reject(new ResourceNotFoundError("Example Error thrown by Service"));
    })
  }
}

module.exports = new ExampleService();

