# uControl-It facial pottery sim 9000

### Running in a browser
The files have to be served from a webserver, running locally or at a distance, rather than locally by opening them directly through file:///. This is because browsers security tl;dr sandboxing blah blah who knows.

Easiest way to run a local server is through python's http server. Open a terminal and change directory (cd) to the place where the index.html is.

```bash
cd /somefolder/thisthing/someplace
python -m SimpleHTTPServer 8000
```

Then navigate in your browser to ```localhost:8000```, the browser should pop the 'allow the camera' banner.

If you have npm/node installed, you can ```npm install simple``` and just run ```simple``` in similar fashion.