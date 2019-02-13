# A React Component, pull down the page to show an extra image.

## Installation
```bash
npm i -S rc-pull-to-show
```

## Usage
*Notes: you need to process the less file yourself.*
```javascript
import React from 'react';
import PullToShow from 'rc-pull-to-show';


export default function Container(props) {

  return <div className="wrapper">
    <PullToShow
      imgWidth={750}
      imgHeight={200}
      indicator={'http://cdn.sample.com/test.png'}
    >
      <p>this is the contents.</p>
    </PullToShow>
  </div>
}

```

## Demo
[demo](https://gw.alipayobjects.com/mdn/wealth_prod/afts/img/A*fnfYQaiAioAAAAAAAAAAAABjAQAAAQ/original)

## Compatibility
This component tested under React-15.5.4 and above. Lower versions might work but are not tested.
The CSS properties `transform` and `transition` are used in this component,
if you are supposed to support iOS 8 and below, do add browser verdor prefixes.

## License
[MIT](http://opensource.org/licenses/MIT)

