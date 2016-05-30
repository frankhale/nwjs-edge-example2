# nwjs-edge-example (Edge spawned via separate Node process)

An example using NW.js and Edge that involves spawning the Edge related code in
a separate Node process and then interfacing with NW.js via Socket.IO. This will
allow Edge to be built for regular Node and take away the complexity of building
it for NW.js. Additionally this will allow us to use the latest version of Node
that Edge is known to support.

## Status

Just started, code will be uploaded tonight!

## Dependencies

We'll need a copy of the `Node.exe` and `Node.lib`:

https://nodejs.org/dist/v5.9.1/win-x64/

NW.js:

http://nwjs.io/

## Author(s)

Frank Hale &lt;frankhale@gmail.com&gt;  
30 May 2016

## License

GNU GPL v3 - see [LICENSE](LICENSE)
