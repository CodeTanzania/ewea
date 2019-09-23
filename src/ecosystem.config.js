module.exports = {
  apps: [
    {
      // name your app will have in PM2
      name: 'ewea',

      // path of your app
      script: 'server.js',

      // arguments given to your app when it is launched
      args: [],

      // arguments given to node when it is launched
      node_args: [],

      // run in cluster mode
      // see http://pm2.keymetrics.io/docs/usage/cluster-mode/
      exec_mode: 'cluster', // fork

      // run as many instances as number of cpus
      instances: 'max', // 2

      // fix multiple instance environment config sharing
      // see https://github.com/lorenwest/node-config/issues/244
      // see http://pm2.keymetrics.io/docs/usage/environment/#specific-environment-variables
      instance_var: 'INSTANCE_ID',

      // enables the watch feature, defaults to 'false'.
      // if true, it will restart your app everytime a file change is detected
      // on the folder or subfolder of your app.
      watch: false,

      // env variables which will appear in your app
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      // name your app will have in PM2
      name: 'ewea-worker',

      // path of your app
      script: 'worker.js',

      // arguments given to your app when it is launched
      args: [],

      // arguments given to node when it is launched
      node_args: [],

      // run in cluster mode
      // see http://pm2.keymetrics.io/docs/usage/cluster-mode/
      exec_mode: 'cluster', // fork

      // run as many instances as number of cpus
      instances: 2, // max

      // fix multiple instance environment config sharing
      // see https://github.com/lorenwest/node-config/issues/244
      // see http://pm2.keymetrics.io/docs/usage/environment/#specific-environment-variables
      instance_var: 'INSTANCE_ID',

      // enables the watch feature, defaults to 'false'.
      // if true, it will restart your app everytime a file change is detected
      // on the folder or subfolder of your app.
      watch: false,

      // env variables which will appear in your app
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
