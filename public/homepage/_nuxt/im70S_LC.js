import{p as o,v as t,g as i,L as r}from"./CZTMkqHr.js";import{i as m}from"./CVVGevBh.js";const n=i`
  type,
  defined(image) => {
    image {
      ${t}
    }
  },
  defined(lottie) => {
    lottie {
      "url": asset->url
    }
  }
`;function s(e){if(e){if(e.type==="image"&&e.image)return{type:"image",image:o(e.image)};if(e.type==="lottie"&&e.lottie?.url)return{type:"lottie",lottie:{path:e.lottie.url}}}}const y=i`
  _type == "block" => {
    ...,
    children[]{
      ...,
      _type == 'icon-text' => {
        icon { ${m} },
        text,
        "backgroundColor": backgroundColor.hex
      }
    }
  },
  _type == "image" => {
    _type,
    ${t}
  },
  _type == "embed" => {
    _type,
    embedCode
  },
  _type == "hr" => {
    _type
  },
  markDefs[] {
    ...,
    _type == "custom-link" => {
      "link": link {
        ${r}
      }
    },
    _type == "color" => {
      "color": color.hex
    }
  }
`;export{n as m,s as p,y as w};
