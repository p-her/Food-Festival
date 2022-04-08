const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    entry: {
        app: './assets/js/script.js',
        events: './assets/js/events.js',
        schedule: './assets/js/schedule.js',
        tickets: './assets/js/tickets.js'

    },
    output: {
       
        filename: '[name].bundle.js',
        path: `${__dirname}/dist`
    },
    module: {
        rules: [
            {
                // using test property to find a regular expression
                // we are trying to process any image file with the file extension of .jpg
                // we could expand this expression to also search for other image file extension such as .png, .svg, .gif
                test: /\.(png|jpe?g|gif)$/i,
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
        })
    ],
    mode: 'development'
}