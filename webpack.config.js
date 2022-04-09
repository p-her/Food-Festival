const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackPwaManifest = require('webpack-pwa-manifest');


module.exports = {
    entry: {
        app: './assets/js/script.js',
        events: './assets/js/events.js',
        schedule: './assets/js/schedule.js',
        tickets: './assets/js/tickets.js'

    },
    output: {
       
        filename: '[name].bundle.js',
        path: __dirname + '/dist',
    },
    devServer: {
        static: {
          directory: path.join(__dirname, './'),
        },
        compress: true,
        port: 8080,
      },
  
    module: {
        rules: [
            {
                // using test property to find a regular expression
                // we are trying to process any image file with the file extension of .jpg
                // we could expand this expression to also search for other image file extension such as .png, .svg, .gif
                test: /\.jpg$/i,
                // use is where the actual loader is implemented
                use:[
                    {
                        loader: 'file-loader',
                        // options object that can rename our files and change the output path
                        options: {
                            esModule: false,
                            // name function, which returns the name of the file with the file extension
                            name(file){
                                return "[path][name].[ext]"
                            },
                            // a function that changes our assignment URL by replacing the ../ from our require() statement with /assets/
                            publicPath: function(url){
                                return url.replace("../", "/assets/")
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static', // the report outputs to an HTML file in the dist folder
        }),
        // new, we are invoking a constructor function
        // we instantiate our new WebpackPwaManifest, we provide an object as our only argument
        new WebpackPwaManifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events.",
            start_url: "../index.html", // start_url property to specify the homepage for the pwa relative to the location of the manifest file
            background_color: "#01579b",
            theme_color: "#ffffff",
            // fingerprints tell webpack whether or not it should generate unique fingerprints
            // so that each time a new manifest is generated. It looks like this: manifest.lhge325d.json
            // because we are not using fingerprints, we can also set inject to be false
            fingerprints: false, 
            inject: false,
            icons: [{
                src: path.resolve("assets/img/icons/icon-512x512.png"),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join("assets", "icons") // designate where the icons will be sent after the creation 
                                                        // of the web manifest is completed by the plugin
            }]
        })
    ],
    mode: 'development'
}