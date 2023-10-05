# esbuild-plugin-time

simple time measuring of the build process  

## Installation

```
npm i --save-dev esbuild-plugin-time
```

## Usage

```javascript
import esbuild from 'esbuild';
import time from 'esbuild-plugin-time';

esbuild.build({
    entryPoints: ['./src/index.js'],
    bundle:      true,
    outfile:     './dist/index.js',
    plugins:     [
        time(),
    ]
});
```

```javascript
import esbuild from 'esbuild';
import time from 'esbuild-plugin-time';

esbuild.build({
    entryPoints: ['./src/index.js'],
    bundle:      true,
    outfile:     './dist/index.js',
    plugins:     [
        time('Bundle A'),
    ]
});

esbuild.build({
    entryPoints: ['./src/stuff.js'],
    bundle:      true,
    outfile:     './dist/stuff.js',
    plugins:     [
        time('Bundle B'),
    ]
});
```
